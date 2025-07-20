import type { IOrder } from "@/@types/order";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, User, Package, DollarSign } from "lucide-react";
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

function OrderCard({ order }: { order: IOrder }) {
  const fullAddress = Object.entries(order.deliveryAddressInfo)
    .map(([, value]) => `${value}`)
    .join(", ");
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "accepted":
        return "bg-blue-200 text-blue-800 border-blue-200";
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const totalQuantity = order.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const uniqueProducts = order.items.length;

  return (
    <Card className="w-full hover:shadow-lg p-4 gap-2 transition-shadow duration-200 border-l-4">
      <CardHeader className="pb-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Order #{order._id.slice(10)}
              </h2>
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                <CalendarDays className="h-4 w-4" />
                {formatDate(order.createdAt)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(order.status)} variant="outline">
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 mt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
            <User className="h-4 w-4 text-gray-600" />
            <div className="text-xs">
              <p className=" text-gray-500">Customer</p>
              <p className="font-medium  text-gray-900">
                #{order.customerInfo.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <DollarSign className="h-4 w-4 text-gray-600" />
            <div>
              <p className="text-xs text-gray-500">Total</p>
              <p className="font-medium text-gray-900">
                ${order.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <MapPin className="h-5 w-5 text-gray-600" />
            <div>
              <p className="text-xs text-gray-500">Delivery</p>
              <p className="font-medium text-xs text-gray-900">
                #{fullAddress}
              </p>
            </div>
          </div>
        </div>
        <div className="border-t pt-2 mb-2">
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
                      <h3 className="font-semibold text-gray-900">
                        Order Items
                      </h3>
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
      </CardContent>
    </Card>
  );
}

export default OrderCard;
