import { User, Phone, Mail } from "lucide-react";
import type { IOrder } from "@/@types/order";

export function OrderCustomerInfo({ order }: { order: IOrder }) {
  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
        Customer Information
      </h4>
      <div className="space-y-2 text-sm">
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{order.customerInfo.name}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span>{order.customerInfo.email}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span>{order.deliveryAddressInfo.phone}</span>
        </div>
      </div>
    </div>
  );
}
