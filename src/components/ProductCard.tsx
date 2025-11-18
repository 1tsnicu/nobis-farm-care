import { useState } from "react";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: string;
  image: string;
  brand?: string;
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
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(id);

  const handleAddToCart = () => {
    addItem({ id, image, brand: brand || '', name, price, inStock });
    toast({
      title: "Produs adăugat în coș",
      description: `${name} a fost adăugat în coșul tău`,
    });
  };

  const handleToggleWishlist = () => {
    toggleWishlist({ id, image, brand: brand || '', name, price, originalPrice, rating, reviews, discount, inStock });
    toast({
      title: isWishlisted ? "Eliminat din favorite" : "Adăugat la favorite",
      description: name,
    });
  };

  return (
    <Card className="group relative overflow-hidden border-border hover:border-primary/30 transition-all duration-500 hover:shadow-hover bg-card">
      {/* Wishlist & Discount Badge */}
      <div className="absolute top-2 left-2 right-2 sm:top-3 sm:left-3 sm:right-3 z-10 flex justify-between items-start">
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.preventDefault();
            handleToggleWishlist();
          }}
          className={`h-7 w-7 sm:h-10 sm:w-10 rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:scale-110 transition-all ${
            isWishlisted ? 'text-accent' : 'text-muted-foreground'
          }`}
        >
          <Heart className={`h-3 w-3 sm:h-4 sm:w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </Button>
        
        {discount && (
          <Badge variant="destructive" className="rounded-full px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm font-bold shadow-md bg-accent">
            -{discount}%
          </Badge>
        )}
      </div>

      {/* Product Image */}
      <Link 
        to={`/produs/${id}`}
        state={{ from: window.location.pathname + window.location.search }}
        onClick={() => {
          // Save scroll position and current page before navigating to product
          sessionStorage.setItem(`scroll-${window.location.pathname}`, window.scrollY.toString());
          sessionStorage.setItem('lastCategoryPage', window.location.pathname + window.location.search);
        }}
      >
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
      <div className="p-3 sm:p-5">
        <Link 
          to={`/produs/${id}`}
          state={{ from: window.location.pathname + window.location.search }}
          onClick={() => {
            // Save scroll position and current page before navigating to product
            sessionStorage.setItem(`scroll-${window.location.pathname}`, window.scrollY.toString());
            sessionStorage.setItem('lastCategoryPage', window.location.pathname + window.location.search);
          }}
        >
          <div className="mb-2 sm:mb-3">
            {brand && (
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-1 uppercase tracking-wide">{brand}</p>
            )}
            <h3 className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
              {name}
            </h3>
          </div>
        </Link>

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 sm:w-4 sm:h-4 ${
                    i < Math.floor(rating)
                      ? 'fill-gold text-gold'
                      : 'fill-muted text-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] sm:text-xs text-muted-foreground">
              ({rating}) {reviews}
            </span>
          </div>
        )}

        {/* Price */}
        <div className="mb-2 sm:mb-4">
          <div className="flex items-baseline gap-1 sm:gap-2 mb-1">
            <span className="text-lg sm:text-2xl font-bold text-primary">{price} MDL</span>
            {originalPrice && (
              <span className="text-xs sm:text-sm text-muted-foreground line-through">
                {originalPrice} MDL
              </span>
            )}
          </div>
          {originalPrice && (
            <p className="text-[10px] sm:text-xs text-accent font-medium">
              Economisești {originalPrice - price} MDL
            </p>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-4">
          <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${inStock ? 'bg-primary animate-pulse' : 'bg-muted'}`} />
          <span className={`text-[10px] sm:text-xs font-medium ${inStock ? 'text-primary' : 'text-muted-foreground'}`}>
            {inStock ? 'În stoc' : 'Stoc epuizat'}
          </span>
        </div>

        {/* Add to Cart Button */}
        <Button
          className="w-full text-xs sm:text-sm shadow-md hover:shadow-lg transform hover:scale-105 transition-all h-8 sm:h-10"
          disabled={!inStock}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          {inStock ? 'Adaugă în coș' : 'Indisponibil'}
        </Button>
      </div>

      {/* Hover overlay gradient */}
      <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </Card>
  );
};

export default ProductCard;
