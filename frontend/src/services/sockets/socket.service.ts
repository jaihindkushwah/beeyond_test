import { WS_BASE_URL } from "@/lib/config";
import { getDataFromSessionStorage } from "@/lib/utils";
import { io, Socket } from "socket.io-client";

export class SocketService {
  public socket!: Socket;

  setupConnections(): void {
    console.log("🔌 Setting up socket connections...", WS_BASE_URL);
    const token = getDataFromSessionStorage("token");
    this.socket = io(WS_BASE_URL, {
      path: "/ws",
      transports: ["websocket"],
      secure: false,
      withCredentials: true,
      auth: {
        token: token,
      },
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 5000,
    });

    this.registerDefaultEvents();
  }
  private registerDefaultEvents(): void {
    this.socket.on("connect", () => {
      console.log("✅ Socket connected:", this.socket.id);
    });

    this.socket.on("disconnect", (reason) => {
      console.warn("🔌 Socket disconnected:", reason);
    });

    this.socket.on("connect_error", (err) => {
      console.error("❌ Connection error:", err);
    });
  }
  disconnect(): void {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      console.log("❎ Socket disconnected and cleaned up");
    }
  }
}
