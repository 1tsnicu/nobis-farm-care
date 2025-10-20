import { Star, ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: number;
  image: string;
  brand: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  discount?: number;
  inStock: boolean;
}

const ProductCard = ({
  id,
  image,
  brand,
  name,
  price,
  originalPrice,
  rating,
  reviews,
  discount,
  inStock
}: ProductCardProps) => {
  return (
    <Card className="group relative overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg bg-white">
      {/* Wishlist Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-white shadow-sm"
      >
        <Heart className="h-4 w-4" />
      </Button>

      {/* Discount Badge */}
      {discount && (
        <Badge className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground font-semibold">
          -{discount}%
        </Badge>
      )}
      
      <CardContent className="p-0">
        {/* Image */}
        <Link to={`/produse/${id}`}>
          <div className="relative aspect-square bg-white overflow-hidden p-4">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        {/* Content */}
        <div className="p-4 space-y-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">{brand}</p>
          
          <Link to={`/produse/${id}`}>
            <h3 className="font-semibold text-sm text-foreground line-clamp-2 min-h-[2.5rem] hover:text-primary transition-colors leading-tight">
              {name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">
              ({reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">
              {price.toFixed(2)}
            </span>
            <span className="text-sm font-semibold text-primary">MDL</span>
          </div>
          {originalPrice && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground line-through">
                {originalPrice.toFixed(2)} MDL
              </span>
              <span className="text-xs text-accent font-medium">
                Economisești {(originalPrice - price).toFixed(2)} MDL
              </span>
            </div>
          )}

          {/* Stock Status */}
          <div className="flex items-center gap-2 text-xs">
            <div className={`w-2 h-2 rounded-full ${inStock ? 'bg-secondary' : 'bg-orange'}`} />
            <span className={`font-medium ${inStock ? 'text-secondary' : 'text-orange'}`}>
              {inStock ? '✓ În stoc' : '⚠ Stoc limitat'}
            </span>
          </div>
            
          {/* CTA Button */}
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm" 
            disabled={!inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Adaugă în coș
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
