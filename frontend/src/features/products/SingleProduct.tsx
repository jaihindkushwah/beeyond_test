import type { ICart } from "@/@types/cart";
import type { IProduct } from "@/@types/product"; // adjust path as needed
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { customerSocketService } from "@/services/sockets/customer.socket.service";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import { CustomerService } from "@/services/customer.service";
import { getDataFromSessionStorage } from "@/lib/utils";

export default function SingleProduct() {
  const { setCartData } = useCartContext();
  const [product, setProduct] = useState<
    (IProduct & { isInCart?: boolean }) | null
  >(null);
  const { id } = useParams() as { id: string };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const customerService = CustomerService.init(
          getDataFromSessionStorage("token")
        );
        const data = await customerService.getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const handleUpdatedCart = (data: ICart) => {
      setCartData(data);
      const inTheCart = data.items.map((item) => item.productId).includes(id);
      setProduct((prev) => (prev ? { ...prev, isInCart: inTheCart } : prev));
    };
    customerSocketService?.socket?.on("updatedCartData", handleUpdatedCart);
    return () => {
      customerSocketService?.socket?.off("updatedCartData", handleUpdatedCart);
    };
  }, [id, setCartData]);
  const addToCart = useCallback(() => {
    try {
      customerSocketService.emitAddToCart({ productId: id, quantity: 1 });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl space-y-4">
      <div className="flex justify-self-center">
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="eager"
            className="w-fit max-h-80 object-fill rounded-xl"
          />
        )}
      </div>

      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
        {product.isAvailable && product.stock > 0 ? (
          <Badge className="bg-green-100 text-green-700">Available</Badge>
        ) : (
          <Badge variant="destructive">Out of Stock</Badge>
        )}
      </div>

      <p className="text-gray-600">
        {product.description || "No description available."}
      </p>

      <div className="flex justify-between items-center">
        <span className="text-xl font-semibold text-primary">
          $ {product.price}
        </span>
        <span className="text-sm text-gray-500 font-medium">
          <span className="font-bold">Stock: </span>
          {product.stock}
        </span>
      </div>

      {product.category && (
        <p className="text-sm text-gray-500">
          <span className="font-bold">Category: &nbsp;</span>
          {product.category}
        </p>
      )}

      <Button
        onClick={addToCart}
        className="w-full mt-4"
        disabled={
          !product.isAvailable || product.stock === 0 || product.isInCart
        }
      >
        {product.isInCart
          ? "Added in the Cart"
          : product.isAvailable
          ? "Add to Cart"
          : "Notify Me"}
      </Button>
    </div>
  );
}
