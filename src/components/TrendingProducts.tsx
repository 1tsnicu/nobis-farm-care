import { useState } from "react";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";

import paracetamolOTC from "@/assets/paracetamol-otc.jpg";
import vitaminC from "@/assets/vitamin-c-supplement.jpg";
import omega3 from "@/assets/omega3-natural.jpg";
import probiotics from "@/assets/probiotics-natural.jpg";

// Mock data - în producție, acestea vor veni din API/database
const products = [
  {
    id: "1",
    image: paracetamolOTC,
    brand: "Paracetamol",
    name: "Paracetamol 500mg - 20 tablete",
    price: 45,
    originalPrice: 60,
    rating: 4.5,
    reviews: 128,
    discount: 25,
    inStock: true
  },
  {
    id: "2",
    image: vitaminC,
    brand: "Vitamin C",
    name: "Vitamin C 1000mg - Complex cu zinc",
    price: 89,
    originalPrice: 120,
    rating: 5,
    reviews: 245,
    discount: 26,
    inStock: true
  },
  {
    id: "3",
    image: omega3,
    brand: "Omega-3",
    name: "Omega-3 Fish Oil - 60 capsule",
    price: 129,
    rating: 4.8,
    reviews: 89,
    inStock: true
  },
  {
    id: "4",
    image: probiotics,
    brand: "Probiotice",
    name: "Probiotice Premium - 30 capsule",
    price: 159,
    originalPrice: 199,
    rating: 4.7,
    reviews: 156,
    discount: 20,
    inStock: true
  }
];

const TrendingProducts = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const itemsPerPage = 4;
  const canScrollLeft = startIndex > 0;
  const canScrollRight = startIndex + itemsPerPage < products.length;

  const handleScroll = (direction: 'left' | 'right') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    if (direction === 'left' && canScrollLeft) {
      setStartIndex(Math.max(0, startIndex - itemsPerPage));
    } else if (direction === 'right' && canScrollRight) {
      setStartIndex(Math.min(products.length - itemsPerPage, startIndex + itemsPerPage));
    }
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-2 mb-4">
            <Flame className="w-5 h-5 text-accent" />
            <span className="text-accent font-semibold text-sm">HOT DEALS</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Cele mai vândute săptămâna aceasta
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Produsele preferate de clienții noștri, cu reduceri speciale
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft || isAnimating}
              className="w-12 h-12 rounded-full bg-background shadow-lg hover:shadow-xl disabled:opacity-30 border-2"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </div>
          
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight || isAnimating}
              className="w-12 h-12 rounded-full bg-background shadow-lg hover:shadow-xl disabled:opacity-30 border-2"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Products Grid */}
          <div className="overflow-hidden">
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500"
              style={{
                transform: isAnimating ? 'scale(0.95)' : 'scale(1)',
                opacity: isAnimating ? 0.7 : 1
              }}
            >
              {visibleProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(products.length / itemsPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setStartIndex(index * itemsPerPage);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  Math.floor(startIndex / itemsPerPage) === index
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-border hover:bg-primary/50'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
