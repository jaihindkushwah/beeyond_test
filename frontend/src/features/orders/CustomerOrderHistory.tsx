import type { IOrder } from "@/@types/order";
import OrderCard from "@/components/order-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDataFromSessionStorage } from "@/lib/utils";
import { CustomerService } from "@/services/customer.service";
import { useEffect, useState } from "react";

function CustomerOrderHistory() {
  const [currentOrders, setCurrentOrders] = useState<IOrder[]>([]);
  const [pastOrders, setPastOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const customerService = CustomerService.init(
          getDataFromSessionStorage("token")
        );
        const allOrders = await customerService.getMyOrders();
        const current = allOrders.filter(
          (order) => order.status !== "delivered"
        );
        const past = allOrders.filter(
          (order) =>
            order.status === "delivered" || order.status === "cancelled"
        );
        setCurrentOrders(current);
        setPastOrders(past);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-100px)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-100px)] bg-gradient-to-br from-gray-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Current Orders */}
          <div className="bg-white rounded-lg p-6 shadow-md min-h-40">
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="mb-2 gap-6">
                <TabsTrigger
                  value="account"
                  className="text-base  data-[state=active]:shadow-none mb-1 font-semibold  text-black bg-inherit border-none"
                >
                  Current Orders
                </TabsTrigger>
                <TabsTrigger
                  value="password"
                  className="text-base  data-[state=active]:shadow-none mb-1 font-semibold  text-black bg-inherit border-none"
                >
                  Past Orders
                </TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <div className="space-y-4">
                  {currentOrders.length === 0 && (
                    <p className="text-gray-600 text-center mt-10">
                      No current orders found.
                    </p>
                  )}
                  {currentOrders.map((order) => (
                    <OrderCard key={order._id} order={order} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="password">
                {/* <h2 className="text-xl font-semibold mb-4 text-black">
                  Past Orders
                </h2> */}
                <div className="space-y-4">
                  {pastOrders.length === 0 && (
                    <p className="text-gray-600 text-center mt-10">
                      No past orders found.
                    </p>
                  )}
                  {pastOrders.map((order) => (
                    <OrderCard key={order._id} order={order} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerOrderHistory;
