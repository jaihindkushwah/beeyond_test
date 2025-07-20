import type { IOrder, ISocketOrderChangeResponse } from "@/@types/order";
import { AdminService } from "@/services/admin.service";
import { adminSocketService } from "@/services/sockets/admin.socket.service";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
interface IAdminContextType {
  allOrders: IOrder[];
  setAllOrders: React.Dispatch<React.SetStateAction<IOrder[]>>;
}
const AdminContext = createContext<IAdminContextType>({} as IAdminContextType);
export function useAdminContext() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error(
      "useAdminContext must be used within a AdminContextProvider"
    );
  }
  return context;
}

export function AdminContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthContext();
  const [allOrders, setAllOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const token = user?.token;
    if (!token) return;

    const fetchOrders = async () => {
      try {
        const adminService = AdminService.init(token);
        const data = await adminService.getAllOrders();
        setAllOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };
    fetchOrders();

    adminSocketService.setupConnections();
    const handleOrderStatusChange = (data: ISocketOrderChangeResponse) => {
      console.log("🛒 Order accepted:", data);
      setAllOrders((prev) =>
        prev.map((order) => {
          if (order._id === data.orderId)
            return {
              ...order,
              status: data.status,
            };
          return order;
        })
      );
    };
    const handlePlacedOrder = (orders: IOrder[]) => {
      setAllOrders((prev) => {
        const existingIds = new Set(prev.map((order) => order._id));
        const newUniqueOrders = orders.filter(
          (order) => !existingIds.has(order._id)
        );
        return [...newUniqueOrders, ...prev];
      });
    };

    adminSocketService.socket?.on(
      "orderStatusChanged",
      handleOrderStatusChange
    );
    adminSocketService.socket?.on("orderPlaced", handlePlacedOrder);
    return () => {
      adminSocketService.socket?.off(
        "orderStatusChanged",
        handleOrderStatusChange
      );
      adminSocketService.socket?.off("orderPlaced", handlePlacedOrder);
      adminSocketService.disconnect();
    };
  }, []);
  return (
    <AdminContext.Provider
      value={{
        allOrders,
        setAllOrders,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
