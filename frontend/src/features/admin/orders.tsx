// import OrderCard from "@/components/order-card";
import { useAdminContext } from "@/context/AdminContext";
import CustomOrderCard from "./CustomOrderCard";

function AdminOrders() {
  const { allOrders } = useAdminContext();
  return (
    <div className="w-full mt-4 min-h-screen min-sm:px-4">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Orders</h1>
          <p className="text-gray-600 text-sm">View and manage your orders</p>
        </div>
        <div className="space-y-2">
          {allOrders.length === 0 && (
            <div className="text-red-500 text-center text-sm font-semibold">
              You have no new orders
            </div>
          )}
          {allOrders.map((order) => (
            <CustomOrderCard order={order} key={order._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
