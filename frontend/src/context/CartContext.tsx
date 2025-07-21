import type { ICart, ICartContextType } from "@/@types/cart";
import type { IOrder, ISocketOrderChangeResponse } from "@/@types/order";
import { useAuthContext } from "@/context/AuthContext";
import { getDataFromSessionStorage } from "@/lib/utils";
import { CustomerService } from "@/services/customer.service";
import { customerSocketService } from "@/services/sockets/customer.socket.service";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  return context;
};

export const CartContext = createContext<ICartContextType | null>(null);

export function CartContextProvider({ children }: any) {
  const { user } = useAuthContext();
  const [cartData, setCartData] = useState<ICart>({} as ICart);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const token = user?.token || getDataFromSessionStorage("token");
    const fetchCartItems = async (token: string) => {
      try {
        setLoading(true);
        const customerService = CustomerService.init(token);
        const data = await customerService.getCartItems();
        setCartData(data);
      } catch {
        setError("Failed to load cart items.");
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchCartItems(token);
    }
    customerSocketService.setupConnections();
    const handleUpdatedCart = (data: ICart) => {
      setCartData(data);
    };
    const orderStatusHandler = (data: ISocketOrderChangeResponse) => {
      setOrders((prev) =>
        prev.map((order) => {
          if (order._id === data.orderId) {
            return {
              ...order,
              status: data.status,
              deliveryPartnerId: data.updatedBy,
            };
          }
          return order;
        })
      );
    };
    const orderPlacedHandler = (data: IOrder) => {
      console.log("🛒 Order placed:", data);
      setOrders((prev) => [data, ...prev]);
    };
    customerSocketService.socket.on("updatedCartData", handleUpdatedCart);
    customerSocketService.socket.on("orderStatusChanged", orderStatusHandler);
    customerSocketService.socket.on("orderPlaced", orderPlacedHandler);
    return () => {
      customerSocketService.socket.off("updatedCartData", handleUpdatedCart);
      customerSocketService.socket.off(
        "orderStatusChanged",
        orderStatusHandler
      );
      customerSocketService.socket.off("orderPlaced", orderPlacedHandler);
      customerSocketService.disconnect();
    };
  }, [user?.token]);

  const handleAddToCart = (cart: ICart) => setCartData(cart);
  const handeUpdateCart = useCallback(async (id: string, quantity: number) => {
    try {
      setLoading(true);
      customerSocketService.emitAddToCart({ productId: id, quantity });
    } catch (error) {
      console.error(error);
      setError("Failed to update cart.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRemoveFromCart = async (id: string) => {
    try {
      setLoading(true);
      customerSocketService.emitRemoveFromCart({
        productId: id,
        cartId: cartData._id,
      });
    } catch (error) {
      console.log(error);
      setError("Failed to remove from cart.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearCart = () => setCartData({} as ICart);

  return (
    <CartContext.Provider
      value={{
        cartData,
        setCartData,
        handleAddToCart,
        handeUpdateCart,
        handleRemoveFromCart,
        handleClearCart,
        loading,
        error,
        setOrders,
        orders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
