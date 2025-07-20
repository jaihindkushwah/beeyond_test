import { useState } from "react";
import { usePartnerContext } from "@/context/PartnerContext";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Clock,
  Package,
  Truck,
  MapPin,
  AlertCircle,
  User,
  Phone,
  Mail,
  ShoppingBag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { IOrder, OrderStatus } from "@/@types/order";

// Define order statuses with their properties - updated to include 'accepted'
const ORDER_STATUSES = [
  {
    key: "placed" as OrderStatus,
    label: "Order Placed",
    description: "Order has been received",
    icon: Clock,
    color: "bg-blue-500",
  },
  {
    key: "accepted" as OrderStatus,
    label: "Accepted",
    description: "Order accepted by restaurant",
    icon: CheckCircle,
    color: "bg-green-500",
  },
  {
    key: "confirmed" as OrderStatus,
    label: "Confirmed",
    description: "Order confirmed and processing",
    icon: CheckCircle,
    color: "bg-green-600",
  },
  {
    key: "preparing" as OrderStatus,
    label: "Preparing",
    description: "Food is being prepared",
    icon: Package,
    color: "bg-orange-500",
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

function PartnerOrderStatus() {
  const { id } = useParams() as { id: string };
  const { myOrders, orderStatusChangeHandler } = usePartnerContext();
  const [isUpdating, setIsUpdating] = useState(false);

  const order: IOrder | undefined = myOrders.find(
    (order: IOrder) => order._id === id
  );

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Order Not Found</h3>
          <p className="text-muted-foreground">
            The order you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const currentStatusIndex = ORDER_STATUSES.findIndex(
    (status) => status.key === order.status
  );

  const handleStatusUpdate = async (newStatus: OrderStatus) => {
    setIsUpdating(true);
    try {
      await orderStatusChangeHandler({ orderId: order._id, status: newStatus });
    } catch (error) {
      console.error("Failed to update order status:", error);
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

  const formatAddress = (address: typeof order.deliveryAddressInfo) => {
    return `${address.street}, ${address.city}, ${address.state} ${address.zip}, ${address.country}`;
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Order Header */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">
                Order #{order._id.slice(-8).toUpperCase()}
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Ordered on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <Badge className={`text-sm ${getStatusBadgeVariant(order.status)}`}>
              {ORDER_STATUSES.find((s) => s.key === order.status)?.label ||
                order.status}
            </Badge>
          </div>
        </CardHeader>
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
            <div className="space-y-3">
              <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                Customer Information
              </h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{order.customerInfo.name}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{order.customerInfo.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{order.deliveryAddressInfo.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="mt-6 pt-4 border-t">
            <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2">
              Delivery Address
            </h4>
            <div className="flex items-start space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <span>{formatAddress(order.deliveryAddressInfo)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Stepper */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
          <p className="text-muted-foreground">
            Click on the next status to update the order progress
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ORDER_STATUSES.map((status, index) => {
              const isCompleted = index <= currentStatusIndex;
              const isCurrent = index === currentStatusIndex;
              const isNext = index === currentStatusIndex + 1;
              const isClickable = isNext && !isUpdating;
              const IconComponent = status.icon;

              return (
                <div key={status.key} className="relative">
                  <div className="flex items-center space-x-4">
                    {/* Status Icon */}
                    <div
                      className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200",
                        isCompleted
                          ? `${status.color} border-transparent text-white`
                          : isCurrent
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-muted-foreground/30 bg-background text-muted-foreground",
                        isClickable &&
                          "cursor-pointer hover:border-primary hover:bg-primary/10"
                      )}
                      onClick={
                        isClickable
                          ? () => handleStatusUpdate(status.key)
                          : undefined
                      }
                    >
                      <IconComponent className="h-5 w-5" />
                    </div>

                    {/* Status Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4
                            className={cn(
                              "font-medium",
                              isCompleted
                                ? "text-foreground"
                                : "text-muted-foreground"
                            )}
                          >
                            {status.label}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {status.description}
                          </p>
                          {isCurrent && (
                            <p className="text-xs text-primary font-medium mt-1">
                              Current Status
                            </p>
                          )}
                        </div>

                        {isNext && (
                          <Button
                            onClick={() => handleStatusUpdate(status.key)}
                            disabled={isUpdating}
                            size="sm"
                            className="ml-4"
                          >
                            {isUpdating
                              ? "Updating..."
                              : "Mark as " + status.label}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Connector Line */}
                  {index < ORDER_STATUSES.length - 1 && (
                    <div
                      className={cn(
                        "absolute left-5 top-10 w-0.5 h-6 transition-colors",
                        isCompleted ? "bg-primary" : "bg-border"
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <Separator className="my-6" />
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Order Items ({order.items.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div
                key={item._id || index}
                className="flex gap-4 py-4 border-b last:border-b-0"
              >
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg border"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "/placeholder.svg?height=64&width=64&text=No+Image";
                    }}
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-4">
                      <h4 className="font-medium text-sm leading-tight mb-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="capitalize">
                          Category: {item.category}
                        </span>
                        <span>Stock: {item.stock}</span>
                        <span
                          className={cn(
                            "font-medium",
                            item.isAvailable ? "text-green-600" : "text-red-600"
                          )}
                        >
                          {item.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </div>

                      <div className="mt-2 text-sm">
                        <span className="text-muted-foreground">
                          Qty: {item.quantity} ×{" "}
                        </span>
                        <span className="font-medium">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Total */}
            <div className="flex justify-between items-center pt-4 border-t font-semibold">
              <span>Total Amount:</span>
              <span className="text-lg">${order.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PartnerOrderStatus;
