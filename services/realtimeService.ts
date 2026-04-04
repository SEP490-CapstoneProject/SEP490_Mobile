import * as signalR from "@microsoft/signalr";
const BASE_URL_REALTIME = process.env.EXPO_PUBLIC_REALTIME_API;

class RealtimeService {
  private connection: signalR.HubConnection | null = null;

  private commentListeners: Function[] = [];
  private replyListeners: Function[] = [];
  private favoriteListeners: Function[] = [];

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

  offComment(cb: Function) {
    this.commentListeners = this.commentListeners.filter((c) => c !== cb);
  }

  offReply(cb: Function) {
    this.replyListeners = this.replyListeners.filter((c) => c !== cb);
  }

  offFavorite(cb: Function) {
    this.favoriteListeners = this.favoriteListeners.filter((c) => c !== cb);
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

  stop() {
    this.connection?.stop();
    this.connection = null;
  }
}

export const realtimeService = new RealtimeService();
