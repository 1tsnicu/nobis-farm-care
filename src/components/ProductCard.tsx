import { useState } from "react";
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
  rating = 0,
  reviews = 0,
  discount,
  inStock = true,
}: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <Card className="group relative overflow-hidden border-border hover:border-primary/30 transition-all duration-500 hover:shadow-hover bg-card">
      {/* Wishlist & Discount Badge */}
      <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-start">
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className={`rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:scale-110 transition-all ${
            isWishlisted ? 'text-accent' : 'text-muted-foreground'
          }`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </Button>
        
        {discount && (
          <Badge variant="destructive" className="rounded-full px-3 py-1 font-bold shadow-md bg-accent">
            -{discount}%
          </Badge>
        )}
      </div>

      {/* Product Image */}
      <Link to={`/produs/${id}`}>
        <div className="aspect-square overflow-hidden bg-muted/30 relative">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          {!inStock && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
              <Badge variant="secondary" className="text-sm px-4 py-2">Stoc epuizat</Badge>
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-5">
        <Link to={`/produs/${id}`}>
          <div className="mb-3">
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">{brand}</p>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem]">
              {name}
            </h3>
          </div>
        </Link>

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? 'fill-gold text-gold'
                      : 'fill-muted text-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({rating}) {reviews} reviews
            </span>
          </div>
        )}

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-bold text-primary">{price} MDL</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {originalPrice} MDL
              </span>
            )}
          </div>
          {originalPrice && (
            <p className="text-xs text-accent font-medium">
              Economisești {originalPrice - price} MDL
            </p>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-2 h-2 rounded-full ${inStock ? 'bg-primary animate-pulse' : 'bg-muted'}`} />
          <span className={`text-xs font-medium ${inStock ? 'text-primary' : 'text-muted-foreground'}`}>
            {inStock ? 'În stoc' : 'Stoc epuizat'}
          </span>
        </div>

        {/* Add to Cart Button */}
        <Button
          className="w-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
          disabled={!inStock}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {inStock ? 'Adaugă în coș' : 'Indisponibil'}
        </Button>
      </div>

      {/* Hover overlay gradient */}
      <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </Card>
  );
};

export default ProductCard;
