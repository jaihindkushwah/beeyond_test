import { CustomerController } from "@/controller/customer";
import { roleBased } from "@/middleware/rolebased";
import { AddressService } from "@/service/address";
import { CartService } from "@/service/cart";
import { CustomerService } from "@/service/customer";
import { OrderService } from "@/service/order";
import { ProductService } from "@/service/product";
import { Router } from "express";

export class CustomerRoutes {
  private readonly router = Router();
  private readonly customerController: CustomerController;
  constructor() {
    const productService = new ProductService();
    const addressService = new AddressService();
    const orderService = new OrderService();
    const cartService = new CartService();
    const customerService = new CustomerService(
      productService,
      addressService,
      orderService,
      cartService
    );
    this.customerController = new CustomerController(customerService);
  }
  routes() {
    this.router.get(
      "/products",
      roleBased("customer"),
      this.customerController.getAllProducts
    );
    this.router.get(
      "/products/:id",
      roleBased("customer"),
      this.customerController.getProductById
    );
    this.router.get(
      "/cart",
      roleBased("customer"),
      this.customerController.getAllCartItems
    );
    this.router.get(
      "/orders",
      roleBased("customer"),
      this.customerController.getMyOrders
    );
    this.router.get(
      "/order/:id",
      roleBased("customer"),
      this.customerController.getOrderById
    );
    this.router.post(
      "/place-order",
      roleBased("customer"),
      this.customerController.placeOrder
    );
    this.router.post(
      "/add-to-cart",
      roleBased("customer"),
      this.customerController.addToCart
    );
    this.router.post(
      "/create-address",
      roleBased("customer"),
      this.customerController.createAddress
    );
    this.router.post(
      "/remove-address",
      roleBased("customer"),
      this.customerController.deleteAddress
    );
    this.router.post(
      "/update-address",
      roleBased("customer"),
      this.customerController.updateAddress
    );
    this.router.get(
      "/addresses",
      roleBased("customer"),
      this.customerController.getAddresses
    );
    this.router.post(
      "/remove-from-cart",
      roleBased("customer"),
      this.customerController.removeFromCart
    );
    return this.router;
  }
}
export const customerRoutes = new CustomerRoutes();
