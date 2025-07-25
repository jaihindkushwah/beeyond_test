import { IOrder } from "@/@types/schema";
import { OrderModel } from "@/models/order";
import mongoose from "mongoose";
import { OrderStatusEnum } from "./customer";
import loash from "lodash";

export class OrderService {
  constructor(private readonly orderModel = OrderModel) {}
  async createNewOrder(
    order: Omit<IOrder, "_id">,
    session?: mongoose.ClientSession
  ): Promise<IOrder> {
    const newOrder = new this.orderModel(order);
    await newOrder.save({ session });
    return newOrder as IOrder;
  }

  async getOrders(order: IOrder, populate?: boolean): Promise<IOrder[]> {
    if (populate) {
      const orders = await this.orderModel
        .find({ ...order })
        .populate({
          path: "customerId",
          select: "_id name email",
        })
        .populate("items.productId")
        .populate({
          path: "deliveryAddressId",
          select: " street city state country zip phone -_id",
        })
        .sort({ updatedAt: -1 })
        .lean();

      const flattenedOrders = orders.map((order) => ({
        ...loash.omit(order, ["customerId", "deliveryAddressId"]),
        items: order.items.map((item: any) => ({
          ...item.productId,
          quantity: item.quantity,
          productId: item.productId._id,
        })),
        customerInfo: order.customerId,
        deliveryAddressInfo: order.deliveryAddressId,
      }));
      return flattenedOrders as unknown as IOrder[];
    }
    return await this.orderModel.find();
  }
  async getOrderById(orderId: string): Promise<IOrder[]> {
    return (await this.getOrders(
      { _id: orderId } as any,
      true
    )) as unknown as IOrder[];
  }
  async deleteOrderById(orderId: string): Promise<IOrder> {
    return (await this.orderModel.findByIdAndDelete(orderId)) as IOrder;
  }
  async updateOrderById(
    orderId,
    order: Partial<IOrder>,
    session?: mongoose.ClientSession
  ): Promise<IOrder> {
    const filteredOrder = Object.fromEntries(
      Object.entries(order).filter(([key, value]) => value !== undefined)
    );
    return (await this.orderModel.findByIdAndUpdate(orderId, filteredOrder, {
      new: true,
      session,
    })) as IOrder;
  }
  async getAllPendingOrders(): Promise<IOrder[]> {
    return (await this.getOrders(
      {
        status: OrderStatusEnum.PENDING,
      } as any,
      true
    )) as IOrder[];
  }
  async acceptOrderById(
    orderId: string,
    order: Partial<IOrder>,
    session?: mongoose.ClientSession
  ): Promise<IOrder | null> {
    const filteredOrder = Object.fromEntries(
      Object.entries(order).filter(([_, value]) => value !== undefined)
    );

    return await this.orderModel.findOneAndUpdate(
      { _id: orderId, status: OrderStatusEnum.PENDING },
      filteredOrder,
      {
        new: true,
        session,
      }
    );
  }
  async getOrdersByCustomerId(customerId: string): Promise<IOrder[]> {
    return (await this.getOrders({ customerId } as any, true)) as IOrder[];
  }
  async getOrdersByDeliveryPartnerId(
    deliveryPartnerId: string
  ): Promise<IOrder[]> {
    if (!deliveryPartnerId) return [];
    return (await this.getOrders(
      { deliveryPartnerId } as any,
      true
    )) as IOrder[];
  }
}
