import type { IOrder } from "@/@types/order";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OrderCard from "@/components/order-card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function CustomOrderCard({ order }: { order: IOrder }) {
  const navigate = useNavigate();
  const totalQuantity = order.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const uniqueProducts = order.items.length;
  const handleOrderClick = (id: string) => {
    navigate(`/order/${id}`);
  };
  return (
    <OrderCard order={order}>
      <div className="my-2 pt-2 mb-2">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem
            value="items"
            className="border border-gray-200 rounded-lg"
          >
            <AccordionTrigger className="hover:no-underline px-4 py-3 hover:bg-gray-50 rounded-t-lg data-[state=open]:rounded-b-none">
              <div className="flex items-center justify-between w-full mr-4">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-blue-50 rounded-md">
                    <Package className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Order Items</h3>
                    <p className="text-sm text-gray-500">
                      {uniqueProducts}{" "}
                      {uniqueProducts === 1 ? "product" : "products"} •{" "}
                      {totalQuantity} total items
                    </p>
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-0 pb-0">
              <div className="border-t">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50">
                      <TableHead className="w-12 pl-4">#</TableHead>
                      <TableHead className="font-semibold">Product</TableHead>
                      <TableHead className="text-center font-semibold">
                        Quantity
                      </TableHead>
                      <TableHead className="text-center font-semibold">
                        Unit Price
                      </TableHead>
                      <TableHead className="text-right font-semibold pr-4">
                        Subtotal
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item, index) => {
                      // Mock unit price calculation (you can replace with actual data)
                      const unitPrice = item.price.toFixed(2);
                      const subtotal = (
                        Number.parseFloat(unitPrice) * item.quantity
                      ).toFixed(2);

                      return (
                        <TableRow
                          key={item.productId}
                          className="hover:bg-gray-50/50"
                        >
                          <TableCell className="pl-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                              <span className="text-xs font-semibold text-blue-600">
                                {index + 1}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-900">
                                {item.name}
                              </span>
                              <span className="text-xs text-gray-500 font-mono">
                                ID: {item.productId.slice(-8)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant="outline"
                              className="font-mono bg-gray-50"
                            >
                              {item.quantity}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="font-mono text-sm">
                              ${unitPrice}
                            </span>
                          </TableCell>
                          <TableCell className="text-right pr-4">
                            <span className="font-semibold text-gray-900">
                              ${subtotal}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>

                {/* Enhanced Summary Section */}
                <div className="border-t bg-gray-50/50 p-4 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Items Summary:</span>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600">
                        {uniqueProducts} unique products
                      </span>
                      <span className="text-gray-600">
                        {totalQuantity} total quantity
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <span className="font-semibold text-gray-900">
                      Order Total:
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      ${order.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <div className="w-full flex justify-end mt-2">
          <Button
            onClick={() => handleOrderClick(order._id)}
            title="Update Order"
            className=" mt-2 w-1/4  bg-blue-600 text-white hover:text-white hover:bg-blue-600 rounded-none"
            variant={"outline"}
          >
            View Order
          </Button>
        </div>
      </div>
    </OrderCard>
  );
}

export default CustomOrderCard;
