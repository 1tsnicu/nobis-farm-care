import { Product } from "@/data/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      inStock: product.inStock
    });
    toast.success("Produs adăugat în coș!");
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-hover transition-shadow duration-300">
      <div className="aspect-square bg-muted relative overflow-hidden rounded-t-lg">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center p-4">
              <p className="text-sm">Imagine indisponibilă</p>
            </div>
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive">Stoc epuizat</Badge>
          </div>
        )}
      </div>

      <CardContent className="flex-1 p-4">
        <div className="mb-2">
          <p className="text-xs text-muted-foreground mb-1">{product.manufacturer}</p>
          <h3 className="font-medium text-sm line-clamp-2 mb-2">{product.name}</h3>
          <p className="text-xs text-muted-foreground">{product.country}</p>
        </div>

        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-3 w-3 fill-gold text-gold" />
            <span className="text-xs font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">
              ({product.reviews} recenzii)
            </span>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between gap-2">
        <div>
          <p className="text-lg font-bold text-primary">{product.price.toFixed(2)} MDL</p>
        </div>
        <Button 
          size="sm"
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="hidden sm:inline">Adaugă</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
