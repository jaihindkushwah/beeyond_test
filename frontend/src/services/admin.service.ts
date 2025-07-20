import type { IPartners } from "@/@types/auth";
import type { IOrder } from "@/@types/order";
import type { IProduct } from "@/@types/product";
import { API_BASE_URL } from "@/lib/config";
import type { AxiosInstance } from "axios";
import axios from "axios";

export class AdminService {
  private axiosInstance!: AxiosInstance;
  constructor(token: string) {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  static init(token: string) {
    return new AdminService(token);
  }
  async getAllOrders(): Promise<IOrder[] | []> {
    const res = await this.axiosInstance.get("/admin/orders");
    return res.data?.data;
  }
  async getAllPartners(): Promise<IPartners[] | []> {
    const res = await this.axiosInstance.get("/admin/partners");
    return res.data?.data;
  }
  async createProduct(data: Omit<IProduct, "_id">): Promise<IProduct> {
    const res = await this.axiosInstance.post("/admin/create-product", data);
    return res.data?.data;
  }
  async liveOrderStatus(): Promise<IOrder[] | []> {
    const res = await this.axiosInstance.get("/admin/order-live-status");
    return res.data?.data;
  }
}
