import React from "react";
import type { ICartItem } from "@/@types/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent } from "@/components/ui/card";

interface Props {
  item: ICartItem;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<Props> = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="flex gap-4 p-4 mb-4 max-sm:flex-col">
      <div className="w-24 h-24 max-sm:w-full max-sm:h-40 max-sm:p-3  flex-shrink-0 rounded-md overflow-hidden border flex justify-center items-center">
        <img
          src={item.imageUrl || "/placeholder.svg"}
          alt={item.name}
          className="w-full h-full  object-cover max-sm:object-contain object-center"
        />
      </div>

      <CardContent className="flex-1 p-0 flex flex-col justify-between">
        <div>
          <div className="flex justify-between text-base font-semibold text-foreground">
            <h3 className="line-clamp-2">{item.name}</h3>
            <p>${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <p className="text-sm text-muted-foreground capitalize">
            {item.category}
          </p>
          <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Qty:</span>
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  onQuantityChange(item.productId, item.quantity - 1)
                }
                className="text-muted-foreground hover:text-foreground"
              >
                −
              </Button>
              <Input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  onQuantityChange(
                    item.productId,
                    parseInt(e.target.value) || 1
                  )
                }
                className="w-14 text-center text-black px-2 py-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  onQuantityChange(item.productId, item.quantity + 1)
                }
                className="text-muted-foreground hover:text-foreground"
              >
                +
              </Button>
            </div>
          </div>

          <Button
            variant="ghost"
            className="text-red-600 hover:text-red-500 text-sm"
            onClick={() => onRemove(item.productId)}
          >
            Remove
          </Button>
        </div>
      </CardContent>
    </div>
  );
};

export default CartItem;
