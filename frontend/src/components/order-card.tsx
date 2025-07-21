import { useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Calendar,
  CreditCard,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import type { IOrder } from "@/@types/order";
import { Badge } from "@/components/ui/badge";

export default function OrderCard({
  order,
  children,
  isTrackable = true,
}: {
  order: IOrder;
  children?: React.ReactNode;
  isTrackable?: boolean;
}) {
  const orderStatusConfig = useMemo(() => {
    switch (order.status) {
      case "cancelled":
        return {
          styles: "bg-red-50 text-red-700 border-red-200",
          icon: <XCircle className="w-3 h-3" />,
          label: "Cancelled",
        };
      case "pickedup":
        return {
          styles: "bg-orange-50 text-orange-700 border-orange-200",
          icon: <Package className="w-3 h-3" />,
          label: "Picked Up",
        };
      case "accepted":
        return {
          styles: "bg-green-50 text-green-700 border-green-200",
          icon: <CheckCircle className="w-3 h-3" />,
          label: "Accepted",
        };
      case "on_the_way":
        return {
          styles: "bg-blue-50 text-blue-700 border-blue-200",
          icon: <Truck className="w-3 h-3" />,
          label: "On the Way",
        };
      case "delivered":
        return {
          styles: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: <CheckCircle className="w-3 h-3" />,
          label: "Delivered",
        };
      default:
        return {
          styles: "bg-yellow-100 text-yellow-800 border-gray-200",
          icon: <Clock className="w-3 h-3" />,
          label: "Pending",
        };
    }
  }, [order.status]);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-gradient-to-br from-white to-gray-50/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Package className="w-4 h-4" />
              <span className="font-medium">Order ID:</span>
              <code className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">
                #{order._id.slice(-8).toUpperCase()}
              </code>
            </div>
            <Badge
              variant="outline"
              className={`${orderStatusConfig.styles} font-medium border`}
            >
              {orderStatusConfig.icon}
              <span className="ml-1">{orderStatusConfig.label}</span>
            </Badge>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-lg font-bold text-gray-900">
              <CreditCard className="w-4 h-4 text-gray-500" />$
              {order.totalPrice?.toFixed(2)}
            </div>
            <p className="text-xs text-gray-500">Total Amount</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Ordered on</span>
          <time className="font-medium text-gray-900">
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
          <Package className="w-4 h-4" />
          <span>Total Items:</span>
          <span className="font-medium text-gray-900">
            {order.items.length || 0}
          </span>
        </div>
        {isTrackable ? (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Track your order</span>
              <div className="flex gap-1">
                <div
                  className={`w-2 h-2 rounded-full ${
                    ["accepted", "on_the_way", "delivered"].includes(
                      order.status
                    )
                      ? "bg-green-400"
                      : "bg-gray-300"
                  }`}
                />
                <div
                  className={`w-2 h-2 rounded-full ${
                    ["on_the_way", "delivered"].includes(order.status)
                      ? "bg-blue-400"
                      : "bg-gray-300"
                  }`}
                />
                <div
                  className={`w-2 h-2 rounded-full ${
                    order.status === "delivered"
                      ? "bg-emerald-400"
                      : "bg-gray-300"
                  }`}
                />
              </div>
            </div>
          </div>
        ) : null}
        {children}
      </CardContent>
    </Card>
  );
}
