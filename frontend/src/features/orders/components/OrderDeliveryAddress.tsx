import { MapPin } from "lucide-react";
import type { IOrder } from "@/@types/order";

export function OrderDeliveryAddress({ order }: { order: IOrder }) {
  const formatAddress = (address: typeof order.deliveryAddressInfo) => {
    return Object.entries(address)
      .map(([, value]) => `${value}`)
      .join(", ");
  };
  return (
    <div className="mt-6 pt-4 border-t">
      <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2">
        Delivery Address
      </h4>
      <div className="flex items-start space-x-2 text-sm">
        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
        <span>{formatAddress(order.deliveryAddressInfo)}</span>
      </div>
    </div>
  );
}
