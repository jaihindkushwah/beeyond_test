import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { usePartnerContext } from "@/context/PartnerContext";

function PartnerOrderHistory() {
  const { myOrders, loading } = usePartnerContext();
  const currentOrders = useMemo(
    () => myOrders.filter((order) => order.status !== "delivered"),
    [myOrders]
  );
  const pastOrders = useMemo(
    () => myOrders.filter((order) => order.status === "delivered"),
    [myOrders]
  );
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-100px)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-100px)] bg-gradient-to-br from-gray-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Current Orders */}
          <div className="bg-white rounded-lg p-6 shadow-md min-h-40">
            <h2 className="text-xl font-semibold mb-4 text-black">
              Current Orders
            </h2>
            <div className="space-y-4">
              {currentOrders.length === 0 && (
                <p className="text-gray-600 text-center mt-10">
                  No current orders found.
                </p>
              )}
              {currentOrders.map((order) => (
                <Card
                  key={order._id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <CardHeader>
                    <p className="text-gray-600">Order ID: {order._id}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Order Date:{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">
                      Order Status: {order.status}
                    </p>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Past Orders */}
          <div className="bg-white rounded-lg p-6 shadow-md min-h-40">
            <h2 className="text-xl font-semibold mb-4 text-black">
              Past Orders
            </h2>
            <div className="space-y-4">
              {pastOrders.length === 0 && (
                <p className="text-gray-600 text-center mt-10">
                  No past orders found.
                </p>
              )}
              {pastOrders.map((order) => (
                <div
                  key={order._id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <p className="text-gray-600">Order ID: {order._id}</p>
                  <p className="text-gray-600">
                    Order Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">Order Status: {order.status}</p>
                  <p className="text-gray-600">
                    Delivery Date:{" "}
                    {new Date(order.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartnerOrderHistory;
