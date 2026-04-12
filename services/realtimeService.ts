import * as signalR from "@microsoft/signalr";
const BASE_URL_REALTIME = process.env.EXPO_PUBLIC_REALTIME_API;

class RealtimeService {
  private connection: signalR.HubConnection | null = null;

  private commentListeners: Function[] = [];
  private replyListeners: Function[] = [];
  private favoriteListeners: Function[] = [];
  private notificationListeners: Function[] = [];
  private messageListeners: Function[] = [];
  private readListeners: Function[] = [];

  public initConnection(accessToken: string) {
    if (this.connection) return;

    const hubUrl = `${BASE_URL_REALTIME}/hubs/realtime`;

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: () => accessToken,
      })
      .withAutomaticReconnect([0, 2000, 5000, 10000])
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    if (!this.connection) return;

    this.connection.on("ReceiveComment", (event) => {
      this.commentListeners.forEach((cb) => cb(event));
    });

    this.connection.on("ReceiveReply", (event) => {
      this.replyListeners.forEach((cb) => cb(event));
    });

    this.connection.on("ReceivePostFavoriteChanged", (data) => {
      this.favoriteListeners.forEach((cb) => cb(data));
    });
    this.connection.on("ReceiveNotification", (event) => {
      this.notificationListeners.forEach((cb) => cb(event));
    });

    this.connection.on("ReceiveMessage", (event) => {
      this.messageListeners.forEach((cb) => cb(event));
    });

    this.connection.on("MessagesRead", (data) => {
      this.readListeners.forEach((cb) => cb(data));
    });
  }

  onComment(cb: Function) {
    this.commentListeners.push(cb);
  }

  onReply(cb: Function) {
    this.replyListeners.push(cb);
  }

  onFavorite(cb: Function) {
    this.favoriteListeners.push(cb);
  }

  onNotification(cb: Function) {
    this.notificationListeners.push(cb);
  }

  onMessage(cb: Function) {
    this.messageListeners.push(cb);
  }

  onRead(cb: Function) {
    this.readListeners.push(cb);
  }

  offComment(cb: Function) {
    this.commentListeners = this.commentListeners.filter((c) => c !== cb);
  }

  offReply(cb: Function) {
    this.replyListeners = this.replyListeners.filter((c) => c !== cb);
  }

  offFavorite(cb: Function) {
    this.favoriteListeners = this.favoriteListeners.filter((c) => c !== cb);
  }

  offNotification(cb: Function) {
    this.notificationListeners = this.notificationListeners.filter(
      (c) => c !== cb,
    );
  }

  offMessage(cb: Function) {
    this.messageListeners = this.messageListeners.filter((c) => c !== cb);
  }

  offRead(cb: Function) {
    this.readListeners = this.readListeners.filter((c) => c !== cb);
  }

  async start() {
    if (this.connection?.state === signalR.HubConnectionState.Disconnected) {
      try {
        await this.connection.start();
        console.log("🚀 SignalR Connected");
      } catch {
        setTimeout(() => this.start(), 5000);
      }
    }
  }

  async joinPost(postId: string) {
    if (this.connection?.state !== signalR.HubConnectionState.Connected) {
      setTimeout(() => this.joinPost(postId), 2000);
      return;
    }

    await this.connection.invoke("JoinPost", postId);
  }

  async leavePost(postId: string) {
    if (this.connection?.state === signalR.HubConnectionState.Connected) {
      await this.connection.invoke("LeavePost", postId);
    }
  }

  async joinRoom(roomId: number) {
    if (this.connection?.state !== signalR.HubConnectionState.Connected) {
      setTimeout(() => this.joinRoom(roomId), 2000);
      return;
    }

    await this.connection.invoke("JoinRoom", roomId);
  }

  async sendMessage(roomId: number, content: string) {
    if (this.connection?.state !== signalR.HubConnectionState.Connected) {
      throw new Error("Not connected");
    }

    await this.connection.invoke("SendMessage", roomId, content);
  }

  stop() {
    this.connection?.stop();
    this.connection = null;
  }
}

export const realtimeService = new RealtimeService();
