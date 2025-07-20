import { AdminController } from "@/controller/admin";
import { roleBased } from "@/middleware/rolebased";
import { AdminService } from "@/service/admin";
import { OrderService } from "@/service/order";
import { PartnerService } from "@/service/partner";
import { ProductService } from "@/service/product";
import { Router } from "express";

export class AdminRoutes {
  private router = Router();
  private adminController: AdminController;
  constructor() {
    const orderService = new OrderService();
    const partnerService = new PartnerService(orderService);
    const productService = new ProductService();
    const adminService = new AdminService(
      orderService,
      partnerService,
      productService
    );
    this.adminController = new AdminController(adminService);
  }
  routes() {
    this.router.post(
      "/create-product",
      roleBased("admin"),
      this.adminController.createNewProduct
    );
    this.router.get(
      "/orders",
      roleBased("admin"),
      this.adminController.getAllOrders
    );
    this.router.get(
      "/partners",
      roleBased("admin"),
      this.adminController.getAllPartners
    );
    this.router.get(
      "/order-live-status",
      roleBased("admin"),
      this.adminController.getAllOrderLiveStatus
    );
    return this.router;
  }
}
export const adminRoutes = new AdminRoutes();
