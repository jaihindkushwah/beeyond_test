import type { ISocketResponse } from "@/@types/product";
import { SocketService } from "./socket.service";

export class PartnerSocketService extends SocketService {
  constructor() {
    super();
  }
  emitAcceptOrder(
    data: { orderId: string },
    callback?: (response: ISocketResponse) => void
  ): void {
    if (this.socket?.connected) {
      this.socket.emit(
        "acceptOrder",
        data,
        (response: { success: boolean; message?: string }) => {
          if (callback) callback(response);
        }
      );
    } else {
      console.warn("⚠️ Socket not connected. Cannot emit accept order.");
      if (callback) {
        callback({ success: false, message: "Socket not connected" });
      }
    }
  }
  emitOrderStatusChange(
    data: { orderId: string; status: string },
    callback?: (response: ISocketResponse) => void
  ): void {
    if (this.socket?.connected) {
      this.socket.emit(
        "changeOrderStatus",
        data,
        (response: ISocketResponse) => {
          if (callback) callback(response);
        }
      );
    } else {
      console.warn("⚠️ Socket not connected. Cannot emit order status change.");
      if (callback) {
        callback({ success: false, message: "Socket not connected" });
      }
    }
  }
}
export const partnerSocketService = new PartnerSocketService();
