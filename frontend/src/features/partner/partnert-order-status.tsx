import { useParams } from "react-router-dom";
import { usePartnerContext } from "@/context/PartnerContext";
import { OrderStatusDetails } from "../orders/components/OrderStatusDetails";

function PartnerOrderStatus() {
  const { id } = useParams() as { id: string };
  const { myOrders, orderStatusChangeHandler } = usePartnerContext();
  const order = myOrders.find((o) => o._id === id);

  return (
    order && (
      <OrderStatusDetails
        order={order}
        role="partner"
        onStatusChange={orderStatusChangeHandler}
      />
    )
  );
}

export default PartnerOrderStatus;
