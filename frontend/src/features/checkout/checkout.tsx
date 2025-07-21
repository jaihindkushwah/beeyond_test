import { AddressCard } from "../cart/components/AddressCard";
import type { IAddress } from "@/@types/order";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { AddressFormModal } from "../cart/components/AddressFormModel";
import OrderSummary from "./components/OrderSummary";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import { customerSocketService } from "@/services/sockets/customer.socket.service";
import { toast } from "sonner";
import { CustomerService } from "@/services/customer.service";
import { getDataFromSessionStorage } from "@/lib/utils";
import type { ICart } from "@/@types/cart";

function Checkout() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [addressId, setAddressId] = useState<IAddress["_id"] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cartData, setCartData } = useCartContext();

  useEffect(() => {
    const fetchAddresses = async () => {
      const customerService = CustomerService.init(
        getDataFromSessionStorage("token")
      );
      const res = await customerService.getCustomerAddresses();
      setAddresses(res);
    };
    fetchAddresses();
  }, []);
  const handleAddAddress = useCallback(
    async (data: Omit<IAddress, "_id" | "userId">) => {
      try {
        console.log("add address");
        const customerService = CustomerService.init(
          getDataFromSessionStorage("token")
        );
        const res = await customerService.createAddress(data);
        console.log(res);
        setAddresses((prev) => [...prev, res]);
      } catch (error: any) {
        console.log(error);
        toast.error(error.message);
      }
    },
    []
  );
  const handleCompleteOrder = useCallback(async () => {
    try {
      if (!addressId) {
        toast.error("Please select an address");
        return;
      }
      if (!cartData || !cartData._id) {
        toast.error("Cart not found");
        return;
      }
      customerSocketService.emitPlaceOrder(
        { addressId, cartId: cartData._id },
        (response) => {
          if (!response.success) {
            toast.error(response.message);
            return;
          }
          toast.success("Order placed successfully");
          setCartData({} as ICart);
          navigate("/");
        }
      );
    } catch (error) {
      console.log(error);
    }
  }, [addressId, cartData, navigate, setCartData]);

  return (
    <div className="w-full mt-4 min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600 text-sm">
            Select a shipping address to complete your order
          </p>
        </div>
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8">
          <div className="mt-2">
            {/* For shipping address*/}
            <div className="bg-white rounded-lg shadow-sm px-4 py-6 sm:px-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">
                  Shipping Address
                </h2>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="outline"
                  className="flex text-black gap-2 items-center"
                >
                  <Plus className="h-4 w-4" />
                  Add a new address
                </Button>
              </div>
              <div className="mt-6 space-y-4">
                {addresses.length === 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    You have not added any shipping address yet
                  </p>
                )}
                {addresses.map((address) => (
                  <AddressCard
                    key={address._id}
                    address={address}
                    isSelected={address._id === addressId}
                    onSelect={() => {
                      setAddressId(address._id);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="max-sm:mt-8 mt-2">
            <OrderSummary
              handleCheckout={handleCompleteOrder}
              itemTotal={cartData?.totalPrice || 0}
              itemCount={cartData?.items?.length || 0}
            />
          </div>
        </div>
      </div>

      <AddressFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddAddress}
      />
    </div>
  );
}

export default Checkout;
