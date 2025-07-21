import { partnerSocketService } from "@/services/sockets/partner.socket.service";
import { PartnerService } from "@/services/partner.service";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import type { IOrder, ISocketOrderChangeResponse } from "@/@types/order";
import { useAuthContext } from "./AuthContext";

interface IPartnerContextType {
  acceptOrderHandler: (id: string) => void;
  orderStatusChangeHandler: (data: { orderId: string; status: string }) => void;
  myOrders: IOrder[];
  setMyOrders: React.Dispatch<React.SetStateAction<IOrder[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  unassignedOrders: IOrder[];
  setUnassignedOrders: React.Dispatch<React.SetStateAction<IOrder[]>>;
}

export const PartnerContext = createContext<IPartnerContextType>(
  {} as IPartnerContextType
);

export function usePartnerContext() {
  const context = useContext(PartnerContext);
  if (!context) {
    throw new Error(
      "usePartnerContext must be used within a PartnerContextProvider"
    );
  }
  return context;
}

export function PartnerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [myOrders, setMyOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [unassignedOrders, setUnassignedOrders] = useState<IOrder[]>([]);
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user?.token) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const partnerService = PartnerService.init(user.token || "");
        const allOrders = await partnerService.getMyOrders();
        const data = await partnerService.getUnassignedOrders();
        setUnassignedOrders(data);
        setMyOrders(allOrders);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
    partnerSocketService.setupConnections();

    const handlePlacedOrder = (orderNew: IOrder) => {

      const orders=[orderNew];
      setMyOrders((prev) => {
        const existingIds = new Set(prev.map((order) => order._id));
        const newUniqueOrders = orders.filter(
          (order) => !existingIds.has(order._id)
        );
        return [...newUniqueOrders, ...prev];
      });

      setUnassignedOrders((prev) => {
        const existingIds = new Set(prev.map((order) => order._id));
        const newUniqueOrders = orders.filter(
          (order) => !existingIds.has(order._id)
        );
        return [...newUniqueOrders, ...prev];
      });
    };

    const handleOrderStatusChange = (data: ISocketOrderChangeResponse) => {
      let acceptedOrder: IOrder = {} as any;

      // Remove from unassignedOrders and extract it
      setUnassignedOrders((prev) => {
        const filtered = prev.filter((order) => {
          const isMatch = order._id === data.orderId;
          if (isMatch) acceptedOrder = order;
          return !isMatch;
        });
        return filtered;
      });
      if (data.updatedBy !== user.id) return;

      if (data.status === "accepted") {
        if (acceptedOrder) {
          setMyOrders((prev) =>
            [
              { ...acceptedOrder, status: data.status },
              ...prev.filter((order) => order._id !== data.orderId),
            ].filter(Boolean)
          );
        }
      } else {
        setMyOrders((prev) =>
          prev.map((order) =>
            order._id === data.orderId
              ? { ...order, status: data.status }
              : order
          )
        );
      }
    };
    const socket = partnerSocketService.socket;
    socket?.on("orderPlaced", handlePlacedOrder);
    socket?.on("orderStatusChanged", handleOrderStatusChange);

    return () => {
      socket?.off("orderPlaced", handlePlacedOrder);
      socket?.off("orderStatusChanged", handleOrderStatusChange);
      partnerSocketService.disconnect();
    };
  }, [user?.id, user?.token]);

  const acceptOrderHandler = (id: string) => {
    partnerSocketService.emitAcceptOrder({ orderId: id }, (res) => {
      if (res.success) {
        toast.success(res.message);
      } else toast.error(res.message);
    });
  };

  const orderStatusChangeHandler = (data: {
    orderId: string;
    status: string;
  }) => {
    partnerSocketService.emitOrderStatusChange(
      { orderId: data.orderId, status: data.status },
      (res) => {
        if (res.success) toast.success(res.message);
        else toast.error(res.message);
      }
    );
  };

  return (
    <PartnerContext.Provider
      value={{
        acceptOrderHandler,
        orderStatusChangeHandler,
        myOrders,
        setMyOrders,
        loading,
        setLoading,
        unassignedOrders,
        setUnassignedOrders,
      }}
    >
      {children}
    </PartnerContext.Provider>
  );
}
