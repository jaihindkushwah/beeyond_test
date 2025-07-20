import React from "react";
import CartItem from "./CartItem";
import type { ICartItem } from "@/@types/cart";

interface Props {
  items: ICartItem[];
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItemList: React.FC<Props> = ({
  items,
  onQuantityChange,
  onRemove,
}) => {
  return (
    <ul className="-my-6 divide-y divide-gray-200">
      {items.map((item) => (
        <CartItem
          key={item.productId}
          item={item}
          onQuantityChange={onQuantityChange}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
};

export default CartItemList;
