import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomerService } from "@/services/customer.service";
import { useEffect, useMemo, useState } from "react";
import CustomOrderCard from "./components/CustomOrderCard";
import { useCartContext } from "@/context/CartContext";
import { useAuthContext } from "@/context/AuthContext";

function CustomerOrderHistory() {
  const { orders, setOrders } = useCartContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = user?.token;
    if (!token) return;
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const customerService = CustomerService.init(token);
        const allOrders = await customerService.getMyOrders();
        setOrders(allOrders);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [setOrders, user?.token]);

  const currentOrders = useMemo(
    () => orders.filter((order) => order.status !== "delivered"),
    [orders]
  );
  const pastOrders = useMemo(
    () =>
      orders.filter(
        (order) => order.status === "delivered" || order.status === "cancelled"
      ),
    [orders]
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
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Current Orders */}
          <div className="bg-white rounded-lg p-6 shadow-md min-h-40">
            <Tabs defaultValue="current" className="w-full">
              <TabsList className="mb-2 gap-2 bg-transparent p-0">
                <TabsTrigger
                  value="current"
                  className="text-base font-semibold text-black bg-transparent border-none rounded-none px-3 py-1 
              data-[state=active]:bg-gray-200 data-[state=active]:text-black data-[state=active]:shadow-none"
                >
                  Current Orders
                </TabsTrigger>
                <TabsTrigger
                  value="past"
                  className="text-base font-semibold text-black bg-transparent border-none rounded-none px-3 py-1 
              data-[state=active]:bg-gray-200 data-[state=active]:text-black data-[state=active]:shadow-none"
                >
                  Past Orders
                </TabsTrigger>
              </TabsList>

              <TabsContent value="current">
                <div className="space-y-4">
                  {currentOrders.length === 0 && (
                    <p className="text-gray-600 text-center mt-10">
                      No current orders found.
                    </p>
                  )}
                  {currentOrders.map((order) => (
                    <CustomOrderCard key={order._id} order={order} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="past">
                <div className="space-y-4">
                  {pastOrders.length === 0 && (
                    <p className="text-gray-600 text-center mt-10">
                      No past orders found.
                    </p>
                  )}
                  {pastOrders.map((order) => (
                    <CustomOrderCard key={order._id} order={order} />
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
