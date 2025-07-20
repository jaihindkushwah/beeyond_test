import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  itemTotal: number;
  itemCount: number;
}

const OrderSummary: React.FC<Props> = ({ itemTotal, itemCount }) => {
  const shipping = 5.99;
  const tax = itemTotal * 0.08;
  const total = itemTotal;
  const navigate = useNavigate();
  const hadndleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm px-4 py-6 sm:px-6">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <p>Items ({itemCount})</p>
          <p className="font-medium text-gray-900">${itemTotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <p>Shipping</p>
          <p className="font-medium text-gray-900">${shipping.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <p>Tax</p>
          <p className="font-medium text-gray-900">${tax.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-sm text-gray-700">
          <p className="text-muted-foreground">Discount</p>
          <p className="font-semibold text-emerald-600">
            ${(tax + shipping).toFixed(2)}
          </p>
        </div>

        <div className="border-t border-gray-200 pt-4 flex justify-between text-base font-medium text-gray-900">
          <p>Order Total</p>
          <p>${total.toFixed(2)}</p>
        </div>
      </div>
      <Button onClick={hadndleCheckout} className="w-full mt-6 text-white py-3 px-4 rounded-md ">
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default OrderSummary;
