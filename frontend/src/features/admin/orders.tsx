import OrderCard from "../../components/order-card";
import { useAdminContext } from "@/context/AdminContext";

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
          {allOrders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
