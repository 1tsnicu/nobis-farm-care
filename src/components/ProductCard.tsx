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
    <Card className="group relative overflow-hidden border-border hover:border-primary transition-all duration-300 hover:shadow-hover">
      {discount && (
        <Badge className="absolute top-3 right-3 z-10 bg-accent text-accent-foreground">
          -{discount}%
        </Badge>
      )}
      
      <CardContent className="p-0">
        {/* Image */}
        <Link to={`/produse/${id}`}>
          <div className="relative aspect-square bg-muted/30 overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          
          {/* Hover Actions */}
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Button size="icon" variant="secondary" className="shadow-lg">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
          </div>
        </Link>

        {/* Content */}
        <div className="p-4">
          <p className="text-sm text-muted-foreground mb-1">{brand}</p>
          <Link to={`/produse/${id}`}>
            <h3 className="font-semibold text-foreground mb-2 line-clamp-2 min-h-[3rem] hover:text-primary transition-colors">
              {name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">
              ({reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-primary">
              {price} MDL
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {originalPrice} MDL
              </span>
            )}
          </div>

          {/* Stock & CTA */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className={`h-2 flex-1 rounded-full ${inStock ? 'bg-primary' : 'bg-destructive'}`}>
                <div className="h-full w-3/4 bg-primary-light rounded-full" />
              </div>
              <span className={`text-xs font-medium ${inStock ? 'text-primary' : 'text-destructive'}`}>
                {inStock ? 'În stoc' : 'Stoc limitat'}
              </span>
            </div>
            
            <Button className="w-full bg-primary hover:bg-primary/90" disabled={!inStock}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Adaugă în coș
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
