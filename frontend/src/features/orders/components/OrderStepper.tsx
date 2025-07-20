import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { OrderStatus, IOrder } from "@/@types/order";

interface Step {
  key: OrderStatus;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

interface Props {
  order: IOrder;
  orderStatuses: Step[];
  currentIndex: number;
  isUpdating: boolean;
  onStatusUpdate: (status: OrderStatus) => void;
  canUpdateStatus: (status: OrderStatus) => boolean;
}

export function OrderStepper({
  orderStatuses,
  currentIndex,
  isUpdating,
  onStatusUpdate,
  canUpdateStatus,
}: Props) {
  return (
    <CardContent>
      <div className="space-y-4">
        {orderStatuses.map((status, index) => {
          const Icon = status.icon;
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          const isNext = index === currentIndex + 1;
          const isClickable =
            isNext && !isUpdating && canUpdateStatus(status.key);

          return (
            <div key={status.key} className="relative">
              <div className="flex items-center space-x-4">
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all",
                    isCompleted
                      ? `${status.color} border-transparent text-white`
                      : isCurrent
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-muted-foreground/30 bg-background text-muted-foreground",
                    isClickable &&
                      "cursor-pointer hover:border-primary hover:bg-primary/10"
                  )}
                  onClick={
                    isClickable ? () => onStatusUpdate(status.key) : undefined
                  }
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4
                        className={cn(
                          "font-medium",
                          isCompleted
                            ? "text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {status.label}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {status.description}
                      </p>
                      {isCurrent && (
                        <p className="text-xs text-primary font-medium mt-1">
                          Current Status
                        </p>
                      )}
                    </div>
                    {isNext && canUpdateStatus(status.key) && (
                      <Button
                        onClick={() => onStatusUpdate(status.key)}
                        disabled={isUpdating}
                        size="sm"
                      >
                        {isUpdating ? "Updating..." : "Mark as " + status.label}
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {index < orderStatuses.length - 1 && (
                <div
                  className={cn(
                    "absolute left-5 top-10 w-0.5 h-6 transition-colors",
                    isCompleted ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
      <Separator className="my-6" />
    </CardContent>
  );
}
