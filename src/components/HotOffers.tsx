import { useState } from "react";
import { Heart, ShoppingCart, Star, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const offers = [
  {
    id: 1,
    brand: "Vichy",
    name: "Vichy Capital Soleil Autobronzant",
    volume: "100ml",
    price: 587.00,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&auto=format&fit=crop",
    rating: 4.7,
    reviews: 89,
    discount: 0,
    inStock: true
  },
  {
    id: 2,
    brand: "La Roche-Posay",
    name: "La Roche Posay Apa termala",
    volume: "300ml",
    price: 460.00,
    image: "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=400&auto=format&fit=crop",
    rating: 4.9,
    reviews: 234,
    discount: 0,
    inStock: true
  },
  {
    id: 3,
    brand: "Vichy",
    name: "Vichy Aqualia Thermal Riche Crema hidratare",
    volume: "50ml",
    price: 602.70,
    oldPrice: 861.00,
    discount: 30,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop",
    rating: 4.8,
    reviews: 156,
    inStock: true
  },
  {
    id: 4,
    brand: "Vichy",
    name: "Vichy Capital Soleil Lapte-Gel hidratant",
    volume: "300ml",
    price: 645.00,
    image: "https://images.unsplash.com/photo-1556228994-230e1b7f0e8b?w=400&auto=format&fit=crop",
    rating: 4.6,
    reviews: 92,
    discount: 0,
    inStock: true
  },
  {
    id: 5,
    brand: "Avene",
    name: "Avene Hydrance Optimale Legere Crem",
    volume: "40ml",
    price: 466.40,
    oldPrice: 583.00,
    discount: 20,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&auto=format&fit=crop",
    rating: 4.9,
    reviews: 178,
    inStock: true
  },
  {
    id: 6,
    brand: "CeraVe",
    name: "CeraVe Gel de spălat hidratant piele normala",
    volume: "1000ml",
    price: 576.00,
    image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&auto=format&fit=crop",
    rating: 4.8,
    reviews: 267,
    discount: 0,
    inStock: true
  }
];

const HotOffers = () => {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="py-16 bg-gradient-to-b from-accent/5 to-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-accent/10 rounded-full p-2">
                <Flame className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Cele mai fierbinți oferte
              </h2>
            </div>
            <p className="text-muted-foreground">Reduceri speciale la produsele tale preferate</p>
          </div>
          <Link to="/produse?oferte=true">
            <Button variant="outline" className="hidden sm:flex border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              Vezi toate
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {offers.map((product) => (
            <div
              key={product.id}
              className="group bg-card rounded-xl shadow-card hover:shadow-hover border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative aspect-square bg-muted overflow-hidden">
                {product.discount > 0 && (
                  <Badge className="absolute top-3 left-3 z-10 bg-accent text-accent-foreground font-bold shadow-lg">
                    -{product.discount}%
                  </Badge>
                )}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors shadow-md"
                >
                  <Heart 
                    className={`w-4 h-4 transition-colors ${
                      wishlist.includes(product.id) 
                        ? 'fill-accent text-accent' 
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs text-secondary font-semibold mb-1">{product.brand}</p>
                <h3 className="text-sm font-semibold text-foreground mb-1 line-clamp-2 h-10">
                  {product.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">{product.volume}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-3 h-3 fill-gold text-gold" />
                  <span className="text-xs font-semibold text-foreground">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="mb-3">
                  {product.oldPrice ? (
                    <div className="flex flex-col gap-1">
                      <span className="text-lg font-bold text-accent">{product.price.toFixed(2)} MDL</span>
                      <span className="text-xs text-muted-foreground line-through">{product.oldPrice.toFixed(2)} MDL</span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold text-foreground">{product.price.toFixed(2)} MDL</span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <Button 
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  size="sm"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Adaugă în coș
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link to="/produse?oferte=true">
            <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              Vezi toate ofertele
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HotOffers;
