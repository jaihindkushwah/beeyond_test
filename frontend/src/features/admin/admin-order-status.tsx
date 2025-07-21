import { useParams } from "react-router-dom";
import { OrderStatusDetails } from "../orders/components/OrderStatusDetails";
import { useAdminContext } from "@/context/AdminContext";

function AdminOrderStatus() {
  const { id } = useParams() as { id: string };
  const { allOrders } = useAdminContext();
  const order = allOrders.find((o) => o._id === id);
  if (!order)
    return (
      <div className="text-red-500 text-center font-semibold">
        Order not found
      </div>
    );
  return (
    order && (
      <OrderStatusDetails
        order={order}
        role="admin"
        onStatusChange={() => {}}
      />
    )
  );
}

export default AdminOrderStatus;
