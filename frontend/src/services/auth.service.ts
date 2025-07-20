import type { IUser } from "@/@types/auth";
import { API_BASE_URL } from "@/lib/config";
import { clearDataFromSessionStorage, setDataToSessionStorage } from "@/lib/utils";
import axios from "axios";
import type { AxiosInstance } from "axios";

export class AuthService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
    });
  }

  async login(credentials: Partial<IUser>) {
    if(!credentials.email || !credentials.password || !credentials.role){
        throw new Error("Email, password and role are required");
    }
    const res = await this.axiosInstance.post("/auth/login", credentials);
    setDataToSessionStorage("token", res.data.data);
    return res.data;
  }

  async register(userData: Partial<IUser>) {
    userData.role = userData.role || "customer";
    if(!userData.email || !userData.password || !userData.name || !userData.role){
        throw new Error("Email, password, role and name are required");
    }
    const res = await this.axiosInstance.post("/auth/register", userData);
    setDataToSessionStorage("token", res.data.data);
    return res.data;
  }

  async logout() {
    const res = await this.axiosInstance.post("/auth/logout");
    clearDataFromSessionStorage("token");
    return res.data;
  }

  async getUser(userId: string) {
    const res = await this.axiosInstance.get(`/users/${userId}`);
    return res.data;
  }

  async isAuthenticated() {
    const res = await this.axiosInstance.get("/auth/check");
    return res.data.isAuthenticated;
  }

  async resetPassword(email: string) {
    const res = await this.axiosInstance.post("/auth/reset-password", {
      email,
    });
    return res.data;
  }

  async verifyOtp(otp: string) {
    const res = await this.axiosInstance.post("/auth/verify-otp", { otp });
    return res.data;
  }

  async resendOtp(email: string) {
    const res = await this.axiosInstance.post("/auth/resend-otp", { email });
    return res.data;
  }
}
export const authService = new AuthService();