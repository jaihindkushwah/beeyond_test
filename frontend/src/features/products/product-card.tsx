import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { IProduct } from "@/@types/product";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }: { product: IProduct }) {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/products/${product._id}`);
  return (
    <div onClick={handleClick} className="cursor-pointer">
      <Card className="flex flex-col justify-between">
        <CardHeader className="flex items-center justify-center p-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-contain h-40 w-40"
            loading="lazy"
          />
        </CardHeader>
        <CardContent className="space-y-2">
          <h2 className="text-sm font-semibold line-clamp-2">{product.name}</h2>
          <p className="text-xs text-muted-foreground line-clamp-3">
            {product.description}
          </p>
          <p className="text-base font-bold">${product.price}</p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button size="sm">View Details</Button>
          <Button size="sm" variant="outline">
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ProductCard;
