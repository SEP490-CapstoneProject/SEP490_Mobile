import * as signalR from "@microsoft/signalr";

const BASE_URL_REALTIME = process.env.EXPO_PUBLIC_CHAT_API;

class ChatRealtimeService {
  private connection: signalR.HubConnection | null = null;

  private receiveMessageListeners: Function[] = [];
  private messagesReadListeners: Function[] = [];
  private reconnectedListeners: Function[] = [];
  private roomUpdatedListeners: Function[] = [];

  public initConnection(accessToken: string) {
    if (this.connection) return;

    const hubUrl = `${BASE_URL_REALTIME}/hubs/chat`;

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: () => accessToken,
      })
      .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    if (!this.connection) return;

    this.connection.on("ReceiveMessage", (event) => {
      this.receiveMessageListeners.forEach((cb) => cb(event));
    });

    this.connection.on("MessagesRead", (data) => {
      this.messagesReadListeners.forEach((cb) => cb(data));
    });

    this.connection.on("RoomUpdated", (data) => {
      this.roomUpdatedListeners.forEach((cb) => cb(data));
    });

    this.connection.onreconnected(() => {
      this.reconnectedListeners.forEach((cb) => cb());
    });
  }

  onReceiveMessage(cb: Function) {
    this.receiveMessageListeners.push(cb);
  }

  offReceiveMessage(cb: Function) {
    this.receiveMessageListeners = this.receiveMessageListeners.filter(
      (c) => c !== cb,
    );
  }

  onMessagesRead(cb: Function) {
    this.messagesReadListeners.push(cb);
  }

  offMessagesRead(cb: Function) {
    this.messagesReadListeners = this.messagesReadListeners.filter(
      (c) => c !== cb,
    );
  }

  onReconnected(cb: Function) {
    this.reconnectedListeners.push(cb);
  }

  offReconnected(cb: Function) {
    this.reconnectedListeners = this.reconnectedListeners.filter(
      (c) => c !== cb,
    );
  }

  onRoomUpdated(cb: Function) {
    this.roomUpdatedListeners.push(cb);
  }

  offRoomUpdated(cb: Function) {
    this.roomUpdatedListeners = this.roomUpdatedListeners.filter(
      (c) => c !== cb,
    );
  }

  async start() {
    if (this.connection?.state === signalR.HubConnectionState.Disconnected) {
      try {
        await this.connection.start();
        console.log("🚀 Chat Connected");
      } catch (error) {
        console.error("❌ Chat connection failed:", error);
        setTimeout(() => this.start(), 5000);
      }
    }
  }

  async joinRoom(roomId: number) {
    if (this.connection?.state !== signalR.HubConnectionState.Connected) {
      setTimeout(() => this.joinRoom(roomId), 2000);
      return;
    }

    try {
      await this.connection.invoke("JoinRoom", roomId);
      console.log(`Joined room ${roomId}`);
    } catch (error) {
      console.error(`Failed to join room ${roomId}:`, error);
    }
  }

  async leaveRoom(roomId: number) {
    if (this.connection?.state === signalR.HubConnectionState.Connected) {
      try {
        await this.connection.invoke("LeaveRoom", roomId);
        console.log(`Left room ${roomId}`);
      } catch (error) {
        console.error(`Failed to leave room ${roomId}:`, error);
      }
    }
  }

  async sendMessage(roomId: number, content: string) {
    if (this.connection?.state !== signalR.HubConnectionState.Connected) {
      throw new Error("Not connected");
    }

    try {
      await this.connection.invoke("SendMessage", roomId, content);
    } catch (error) {
      console.error(" Failed to send message:", error);
      throw error;
    }
  }

  stop() {
    this.connection?.stop();
    this.connection = null;
  }
}

export const chatRealtimeService = new ChatRealtimeService();
