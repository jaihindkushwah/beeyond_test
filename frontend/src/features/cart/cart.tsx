import CartItemList from "./components/CartItemList";
import OrderSummary from "./components/OrderSummary";
import PromoCode from "./components/PromoCode";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import EmptyCart from "./components/EmptyCart";
import { useCartContext } from "../../context/CartContext";

export default function CartPage() {
  const { cartData, handleRemoveFromCart, handeUpdateCart, error, loading } =
    useCartContext();

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    handeUpdateCart(id, quantity);
  };

  const removeItem = (id: string) => {
    console.log("removeItem", id);
    handleRemoveFromCart(id);
  };

  const totalItems =
    cartData?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  if (!cartData?.items || cartData?.items?.length === 0) return <EmptyCart />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="lg:col-span-7 bg-white rounded-lg shadow-sm px-4 py-6 sm:px-6">
            <CartItemList
              items={cartData.items}
              onQuantityChange={updateQuantity}
              onRemove={removeItem}
            />
          </div>

          <div className="mt-16 lg:mt-0 lg:col-span-5 space-y-6">
            <OrderSummary
              itemTotal={cartData.totalPrice || 0}
              itemCount={totalItems}
            />
            <PromoCode />
          </div>
        </div>
      </div>
    </div>
  );
}
