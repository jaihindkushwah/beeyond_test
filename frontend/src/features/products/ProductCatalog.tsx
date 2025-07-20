import { useEffect, useState } from "react";
import ProductSkeleton from "./product-skeleton";
import ProductCard from "./product-card";
import type { IProduct } from "@/@types/product";
import { CustomerService } from "@/services/customer.service";
import { getDataFromSessionStorage } from "@/lib/utils";

function ProductCatalog() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const customerService = CustomerService.init(
          getDataFromSessionStorage("token")
        );
        const data = await customerService.getAllProducts();
        setProducts(data);
      } catch {
        setError("Failed to load products.");
      } finally {
        setTimeout(() => setLoading(false), 1000); // Simulate delay
      }
    };
    fetchCartItems();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-black">Product Catalogs</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading &&
          Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}

        {!loading &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
}

export default ProductCatalog;
