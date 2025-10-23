import { Product } from "@/data/types";
import { ProductCard } from "./ProductCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Package } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  viewMode?: 'grid' | 'list';
}

export const ProductGrid = ({ products, viewMode = 'grid' }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <Alert>
        <Package className="h-4 w-4" />
        <AlertDescription>
          Nu am găsit produse care să corespundă criteriilor tale de căutare.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className={
      viewMode === 'grid'
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        : "flex flex-col gap-4"
    }>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
