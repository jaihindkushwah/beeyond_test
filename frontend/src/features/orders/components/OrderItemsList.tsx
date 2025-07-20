import { ShoppingBag } from "lucide-react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { IOrder } from "@/@types/order";
import { cn } from "@/lib/utils";

export function OrderItemsList({ order }: { order: IOrder }) {
  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Order Items ({order.items.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div
              key={item._id || index}
              className="flex gap-4 py-4 border-b last:border-b-0"
            >
              <div className="flex-shrink-0">
                <img
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg border"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/placeholder.svg?height=64&width=64&text=No+Image";
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    <h4 className="font-medium text-sm mb-1">{item.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Category: {item.category}</span>
                      <span>Stock: {item.stock}</span>
                      <span
                        className={cn(
                          "font-medium",
                          item.isAvailable ? "text-green-600" : "text-red-600"
                        )}
                      >
                        {item.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </div>
                    <div className="mt-2 text-sm">
                      Qty: {item.quantity} ×{" "}
                      <span className="font-medium">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4 border-t font-semibold">
            <span>Total Amount:</span>
            <span className="text-lg">${order.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </>
  );
}
