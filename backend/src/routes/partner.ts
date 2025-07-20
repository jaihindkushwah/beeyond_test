import { PartnerController } from "@/controller/partner";
import { roleBased } from "@/middleware/rolebased";
import { OrderService } from "@/service/order";
import { PartnerService } from "@/service/partner";
import { Router } from "express";

export class PartnerRoutes {
  private readonly router = Router();
  private readonly partnerController: PartnerController;
  constructor() {
    const orderService = new OrderService();
    const partnerService = new PartnerService(orderService);
    this.partnerController = new PartnerController(partnerService);
  }
  routes() {
    this.router.get(
      "/my-orders",
      roleBased("partner"),
      this.partnerController.getMyOrders
    );
    this.router.get(
      "/unassigned-orders",
      roleBased("partner"),
      this.partnerController.getUnassignedOrders
    );
    this.router.get(
      "/accept-order/:id",
      roleBased("partner"),
      this.partnerController.acceptOrder
    );
    this.router.get(
      "/reject-order/:id",
      roleBased("partner"),
      this.partnerController.rejectOrder
    );
    return this.router;
  }
}
export const partnerRoutes = new PartnerRoutes();
