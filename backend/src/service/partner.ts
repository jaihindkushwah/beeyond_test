import { IOrder, IUser } from "@/@types/schema";
import { UserModel } from "@/models/user";
import { OrderService } from "./order";
import mongoose, { Types } from "mongoose";
import { OrderStatusEnum } from "./customer";

export class PartnerService {
  private readonly userModel = UserModel;
  constructor(private readonly orderService: OrderService) {}
  async getAllPartners() {
    return await this.userModel.find({ role: "partner" }, "-password");
  }
  async getPartnerById(id: string) {
    return await this.userModel.findById(id);
  }
  async updatePartnerById(id: string, data: Partial<IUser>) {
    return await this.userModel.findByIdAndUpdate(id, data, { new: true });
  }
  async getOrdersByPartnerId(partnerId: string) {
    return await this.orderService.getOrdersByDeliveryPartnerId(partnerId);
  }
  async getUnassignedOrders() {
    return await this.orderService.getAllPendingOrders();
  }
  async acceptOrder(orderId: string, deliveryPartnerId: string) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const updatedOrder = await this.orderService.acceptOrderById(
        orderId,
        {
          status: OrderStatusEnum.ACCEPTED,
          deliveryPartnerId: new Types.ObjectId(deliveryPartnerId),
        },
        session
      );
      await session.commitTransaction();
      return updatedOrder;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
  async rejectOrder(id: string, deliveryPartnerId: string) {
    console.log(id, deliveryPartnerId);
    // const session = await mongoose.startSession();
    // session.startTransaction();
    // try {
    //   const updatedOrder = await this.orderService.acceptOrderById(
    //     id,
    //     {
    //       status: OrderStatusEnum.CANCELLED,
    //       deliveryPartnerId: new Types.ObjectId(deliveryPartnerId),
    //     },
    //     session
    //   );
    //   await session.commitTransaction();
    //   return updatedOrder;
    // } catch (error) {
    //   await session.abortTransaction();
    //   throw error;
    // } finally {
    //   session.endSession();
    // }
  }
  async updateOrderStatus(orderId: string, data: Partial<IOrder>) {
    return await this.orderService.updateOrderById(orderId, data);
  }
}
