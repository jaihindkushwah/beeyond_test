import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, Truck, MapPin } from "lucide-react";
import type { IOrder, OrderStatus } from "@/@types/order";

import { OrderCustomerInfo } from "./OrderCustomerInfo";
import { OrderDeliveryAddress } from "./OrderDeliveryAddress";
import { OrderItemsList } from "./OrderItemsList";
import { OrderHeader } from "./OrderHeader";
import { OrderStepper } from "./OrderStepper";

const ORDER_STATUSES = [
  {
    key: "pending" as OrderStatus,
    label: "Order Placed",
    description: "Order has been received",
    icon: Clock,
    color: "bg-blue-500",
  },
  {
    key: "accepted" as OrderStatus,
    label: "Accepted",
    description: "Order accepted by partner",
    icon: CheckCircle,
    color: "bg-green-500",
  },
  {
    key: "pickedup" as OrderStatus,
    label: "Ready",
    description: "Order is ready for pickup/delivery",
    icon: CheckCircle,
    color: "bg-purple-500",
  },
  {
    key: "on_the_way" as OrderStatus,
    label: "Out for Delivery",
    description: "Order is on the way",
    icon: Truck,
    color: "bg-indigo-500",
  },
  {
    key: "delivered" as OrderStatus,
    label: "Delivered",
    description: "Order has been delivered",
    icon: MapPin,
    color: "bg-green-700",
  },
];

interface Props {
  order: IOrder;
  role: "partner" | "admin" | "customer";
  onStatusChange: (data: { orderId: string; status: OrderStatus }) => void;
}

export function OrderStatusDetails({ order, role, onStatusChange }: Props) {
  const [isUpdating, setIsUpdating] = useState(false);
  const currentStatusIndex = ORDER_STATUSES.findIndex(
    (s) => s.key === order.status
  );

  const allowedToUpdate = (nextStatus: OrderStatus): boolean => {
    const map = {
      partner: ["accepted", "pickedup", "on_the_way", "delivered"],
      admin: ORDER_STATUSES.map((s) => s.key),
      customer: [""],
    };
    return map[role].includes(nextStatus);
  };

  const handleStatusUpdate = async (status: OrderStatus) => {
    setIsUpdating(true);
    try {
      await onStatusChange({ orderId: order._id, status });
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadgeVariant = (status: OrderStatus) => {
    switch (status) {
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      case "pickedup":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "accepted":
        return "bg-green-50 text-green-700 border-green-200";
      case "on_the_way":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-gray-200";
    }
  };

  const getStatusLabel = (status: OrderStatus) =>
    ORDER_STATUSES.find((s) => s.key === status)?.label || status;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Order Header */}
      <Card className="mb-6">
        <OrderHeader
          order={order}
          getStatusBadgeVariant={getStatusBadgeVariant}
          getStatusLabel={getStatusLabel}
        />
        <Separator />
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Order Details */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                Order Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Total Amount:</span>
                  <span className="font-semibold">
                    ${order.totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Items:</span>
                  <span>
                    {order.items.length} item
                    {order.items.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Last Updated:</span>
                  <span>{new Date(order.updatedAt).toLocaleString()}</span>
                </div>
                {order.deliveryPartnerId && (
                  <div className="flex justify-between">
                    <span className="font-medium">Delivery Partner:</span>
                    <span className="text-xs font-mono">
                      {order.deliveryPartnerId.slice(-8)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Customer Info */}
            <OrderCustomerInfo order={order} />
          </div>

          {/* Delivery Address */}
          <OrderDeliveryAddress order={order} />
        </CardContent>
      </Card>

      {/* Status Stepper */}
      <Card className="mb-6">
        <OrderStepper
          order={order}
          orderStatuses={ORDER_STATUSES}
          currentIndex={currentStatusIndex}
          isUpdating={isUpdating}
          onStatusUpdate={handleStatusUpdate}
          canUpdateStatus={allowedToUpdate}
        />
      </Card>

      {/* Items List */}
      <Card>
        <OrderItemsList order={order} />
      </Card>
    </div>
  );
}
