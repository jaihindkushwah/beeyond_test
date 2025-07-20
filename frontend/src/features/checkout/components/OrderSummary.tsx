import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  itemTotal: number;
  itemCount: number;
  handleCheckout: () => void;
}

const OrderSummary: React.FC<Props> = ({
  itemTotal,
  itemCount,
  handleCheckout,
}) => {
  const shipping = 5.99;
  const tax = itemTotal * 0.08;
  const discount = shipping + tax;
  const total = itemTotal;

  return (
    <div className="bg-white rounded-lg shadow-sm px-4 py-4 sm:px-6">
      <h2 className="text-lg font-semibold text-foreground">Order Summary</h2>

      <div className="mt-6 space-y-2 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <p>Items ({itemCount})</p>
          <p className="font-medium text-foreground">${itemTotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <p>Shipping</p>
          <p className="font-medium text-foreground">${shipping.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <p>Tax</p>
          <p className="font-medium text-foreground">${tax.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <p>Discount</p>
          <p className="font-semibold text-emerald-600">
            -${discount.toFixed(2)}
          </p>
        </div>
        <div className="border-t border-gray-200 pt-4 flex justify-between text-base font-medium text-foreground">
          <p>Order Total</p>
          <p>${total.toFixed(2)}</p>
        </div>
      </div>

      <Button onClick={handleCheckout} className="w-full mt-6">
        Complete Order
      </Button>
    </div>
  );
};

export default OrderSummary;
