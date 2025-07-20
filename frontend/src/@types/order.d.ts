import type { IProduct } from "./product";

export type OrderStatus =
  | "pending"
  | "accepted"
  | "pickedup"
  | "on_the_way"
  | "delivered"
  | "cancelled";

export interface IOrderItem extends Optional<IProduct> {
  productId: Types.ObjectId;
  quantity: number;
}

export interface IAddress {
  _id: string;
  userId: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country?: string;
  phone: string;
  isDefault?: boolean;
}

export interface IOrderItem {
  _id: string;
  productId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  category: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  quantity: number;
}

export interface ICustomerInfo {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface IOrder {
  _id: string;
  items: IOrderItem[];
  status: OrderStatus; // you can expand this
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  customerInfo: ICustomerInfo;
  deliveryAddressInfo: IAddress;
  deliveryPartnerId?: string;
}

export interface ISocketOrderChangeResponse {
  orderId: string;
  status: OrderStatus;
  updatedBy: string;
}
