import type { ICart } from "@/@types/cart";
import type { IAddress, IOrder } from "@/@types/order";
import type { IProduct } from "@/@types/product";
import { API_BASE_URL } from "@/lib/config";
import type { AxiosInstance } from "axios";
import axios from "axios";

export class CustomerService {
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
    return new CustomerService(token);
  }
  async addToCart(data: {
    productId: string;
    quantity: number;
  }): Promise<ICart> {
    const res = await this.axiosInstance.post("/customer/add-to-cart", data);
    return res.data.data;
  }
  async getCartItems(): Promise<ICart> {
    const res = await this.axiosInstance.get("/customer/cart");
    return res.data.data;
  }
  async removeFromCart(data: {
    productId: string;
    cartId: string;
  }): Promise<ICart> {
    const res = await this.axiosInstance.post(
      "/customer/remove-from-cart",
      data
    );
    return res.data.data;
  }
  async clearCart(): Promise<ICart> {
    const res = await this.axiosInstance.post("/customer/clear-cart");
    return res.data.data;
  }
  async updateCart(data: {
    productId: string;
    quantity: number;
  }): Promise<ICart> {
    const res = await this.axiosInstance.post("/customer/update-cart", data);
    return res.data.data;
  }
  async getMyOrders(): Promise<IOrder[] | []> {
    const res = await this.axiosInstance.get("/customer/orders");
    return res.data?.data;
  }
  async getAllProducts(): Promise<IProduct[] | []> {
    const res = await this.axiosInstance.get("/customer/products");
    return res.data?.data;
  }
  async getProductById(
    id: string
  ): Promise<(IProduct & { isInCart?: boolean }) | null> {
    const res = await this.axiosInstance.get(`/customer/products/${id}`);
    return res.data?.data;
  }
  async getCustomerAddresses(): Promise<IAddress[] | []> {
    const res = await this.axiosInstance.get("/customer/addresses");
    return res.data?.data;
  }
  async createAddress(
    data: Omit<IAddress, "_id" | "userId">
  ): Promise<IAddress> {
    const res = await this.axiosInstance.post("/customer/create-address", data);
    return res.data?.data;
  }
}

