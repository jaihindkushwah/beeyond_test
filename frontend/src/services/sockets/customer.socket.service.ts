import type { ISocketResponse } from "@/@types/product";
import { SocketService } from "./socket.service";

export class CustomerSocketService extends SocketService {
  constructor() {
    super();
  }
  socketConnectionEvents(): void {
    this.socket.on("cart:update", (data) => {
      console.log("🛒 Cart update received:", data);
    });

    this.socket.on("cart:broadcast", (data) => {
      console.log("📢 Cart broadcast received:", data);
    });
  }
  emitAddToCart(data: { productId: string; quantity: number }): void {
    if (this.socket?.connected) {
      this.socket.emit("addToCart", data);
    } else {
      console.warn("⚠️ Socket not connected. Cannot emit cart broadcast.");
    }
  }
  emitRemoveFromCart(data: { productId: string; cartId: string }): void {
    if (this.socket?.connected) {
      this.socket.emit("removeFromCart", data);
    } else {
      console.warn("⚠️ Socket not connected. Cannot emit cart broadcast.");
    }
  }

  emitCartUpdate(cart: unknown): void {
    if (this.socket?.connected) {
      this.socket.emit("addToCart", cart);
    } else {
      console.warn("⚠️ Socket not connected. Cannot emit cart update.");
    }
  }

  emitPlaceOrder(
    data: { cartId: string; addressId: string },
    callback?: (response: ISocketResponse) => void
  ): void {
    if (this.socket?.connected) {
      this.socket.emit("placeOrder", data, (response: ISocketResponse) => {
        console.log("🛒 Order placed:", response);
        if (callback) callback(response);
      });
    } else {
      console.warn("⚠️ Socket not connected. Cannot emit place order.");
      if (callback) {
        callback({ success: false, message: "Socket not connected" });
      }
    }
  }
}

export const customerSocketService = new CustomerSocketService();
