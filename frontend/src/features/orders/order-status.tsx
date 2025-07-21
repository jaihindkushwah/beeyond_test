import { useParams } from "react-router-dom";
import { OrderStatusDetails } from "../orders/components/OrderStatusDetails";
import type { IOrder } from "@/@types/order";
import { useEffect, useState } from "react";
import { useCartContext } from "@/context/CartContext";

function CustomerOrderStatus() {
  const { id } = useParams() as { id: string };
  const { orders } = useCartContext();
  const [order, setOrder] = useState<IOrder | null>(null);
  useEffect(() => {
    const order = orders.find((order) => order._id === id);
    setOrder(order);
  }, [id, orders]);
  const orderStatusChangeHandler = async () => {};
  if (!order)
    return (
      <div className="text-red-500 text-sm text-center">Order not found </div>
    );
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
