import type { IOrder } from "@/@types/order";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { usePartnerContext } from "@/context/PartnerContext";

function OrderCard({ order }: { order: IOrder }) {
  const { acceptOrderHandler } = usePartnerContext();
  const [acceptingOrder, setAcceptingOrder] = useState<string | null>(null);
  const fullAddress = useMemo(
    () =>
      Object.entries(order.deliveryAddressInfo)
        .map(([, value]) => `${value}`)
        .join(", "),
    [order.deliveryAddressInfo]
  );
  const handleAcceptOrder = async (orderId: string) => {
    try {
      setAcceptingOrder(orderId);
      acceptOrderHandler(orderId);
    } catch (error) {
      console.error("Failed to accept order", error);
    } finally {
      setAcceptingOrder(null);
    }
  };
  return (
    <Card key={order._id}>
      <CardHeader>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-lg">#{order._id}</div>
            <div className="text-right">
              <div className="font-medium text-lg">${order.totalPrice}</div>
              <div className="text-sm text-muted-foreground">
                {order.items.length} items
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-medium">{order.customerInfo.name}</div>
            <div className="text-sm text-muted-foreground">{fullAddress}</div>
            <div className="text-sm text-muted-foreground">
              {order.customerInfo.phone}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button
          variant={"outline"}
          onClick={() => handleAcceptOrder(order._id)}
          disabled={acceptingOrder === order._id}
          className="w-full bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center hover:text-white"
        >
          {acceptingOrder === order._id ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Accepting...
            </>
          ) : (
            <>
              <Check className="w-4 h-4 mr-2" />
              Accept Order
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

function Notifications() {
  const { unassignedOrders } = usePartnerContext();

  return (
    <div className="min-h-[calc(100vh-100px)] bg-gradient-to-br from-gray-50 to-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Accept order notifications
          </h1>
          <p className="text-gray-600 text-sm">
            View and manage your order notifications
          </p>
        </div>
        <div className="space-y-2">
          {unassignedOrders.length === 0 && (
            <div className="text-red-500 text-center text-sm">
              You have no new order notifications
            </div>
          )}
          {unassignedOrders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
