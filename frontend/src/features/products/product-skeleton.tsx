import { Skeleton } from "@/components/ui/skeleton";

function ProductSkeleton() {
  return (
    <div className="p-4 border rounded-xl w-full max-w-full space-y-2 ">
      {/* Image Placeholder */}
      <Skeleton className="w-full bg-slate-200 h-[200px] rounded-lg" />

      {/* Title Placeholder */}
      <Skeleton className="h-[20px] bg-slate-200  w-[70%] rounded" />

      {/* Price Placeholder */}
      <Skeleton className="h-[16px] bg-slate-200  w-[40%] rounded" />

      {/* Button or Rating Placeholder */}
      <Skeleton className="h-[20px] bg-slate-200  w-full rounded-md" />
    </div>
  );
}

export default ProductSkeleton;
