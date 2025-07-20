import { useParams } from "react-router-dom";
import { OrderStatusDetails } from "../orders/components/OrderStatusDetails";
import type { IOrder } from "@/@types/order";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { CustomerService } from "@/services/customer.service";

function CustomerOrderStatus() {
  const { id } = useParams() as { id: string };
  const { user } = useAuthContext();
  const [order, setOrder] = useState<IOrder | null>(null);
  useEffect(() => {
    if (!user?.token) return;
    const fetchOrder = async () => {
      try {
        const customerService = CustomerService.init(user.token!);
        const data = await customerService.getOrderByOrderId(id);
        // console.log(data);
        setOrder(data);
      } catch (error) {
        console.error("Failed to fetch order", error);
      }
    };
    fetchOrder();
  }, [id, user?.token]);
  const orderStatusChangeHandler = async () => {};
  if (!order) return null;
  return (
    order && (
      <OrderStatusDetails
        order={order}
        role={"customer"}
        onStatusChange={orderStatusChangeHandler}
      />
    )
  );
}

export default CustomerOrderStatus;
