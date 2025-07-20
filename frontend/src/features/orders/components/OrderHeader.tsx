import { Badge } from "@/components/ui/badge";
import { CardHeader, CardTitle } from "@/components/ui/card";
import type { IOrder, OrderStatus } from "@/@types/order";

interface Props {
  order: IOrder;
  getStatusBadgeVariant: (status: OrderStatus) => string;
  getStatusLabel: (status: OrderStatus) => string;
}

export function OrderHeader({
  order,
  getStatusBadgeVariant,
  getStatusLabel,
}: Props) {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-2xl">
            Order #{order._id.slice(-8).toUpperCase()}
          </CardTitle>
          <p className="text-muted-foreground mt-1">
            Ordered on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <Badge className={`text-sm ${getStatusBadgeVariant(order.status)}`}>
          {getStatusLabel(order.status)}
        </Badge>
      </div>
    </CardHeader>
  );
}
