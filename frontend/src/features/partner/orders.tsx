import { useMemo } from "react";
import { usePartnerContext } from "@/context/PartnerContext";
import OrderCard from "@/components/order-card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function PartnerOrderHistory() {
  const navigate = useNavigate();
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
                <OrderCard key={order._id} order={order}>
                  <div className="w-full flex justify-end mt-2">
                    <Button
                      onClick={() => navigate(`/partner/order/${order._id}`)}
                      title="Update Order"
                      className=" mt-2 w-1/3  bg-blue-600 text-white hover:text-white hover:bg-blue-600 rounded-none"
                      variant={"outline"}
                    >
                      Action
                    </Button>
                  </div>
                </OrderCard>
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
                <OrderCard key={order._id} order={{ ...order }}></OrderCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartnerOrderHistory;
