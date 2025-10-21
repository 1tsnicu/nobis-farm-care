import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    brand: "Nestle",
    name: "Nestle Nan Confort 1",
    weight: "800g",
    price: 487.78,
    image: "https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=400&auto=format&fit=crop",
    rating: 4.8,
    reviews: 234,
    inStock: true
  },
  {
    id: 2,
    brand: "Abbott Healthcare",
    name: "Similac Gold 1 Amestec uscat",
    weight: "900g",
    price: 404.00,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop",
    rating: 4.9,
    reviews: 187,
    inStock: true
  },
  {
    id: 3,
    brand: "Nestle",
    name: "Nestle Nan Confort 2",
    weight: "800g",
    price: 487.78,
    image: "https://images.unsplash.com/photo-1610648199748-bbef250d3d6e?w=400&auto=format&fit=crop",
    rating: 4.7,
    reviews: 156,
    inStock: true
  },
  {
    id: 4,
    brand: "Holle Baby Food",
    name: "Holle batonas de portocale",
    weight: "100g",
    price: 88.37,
    oldPrice: 98.19,
    discount: 10,
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&auto=format&fit=crop",
    rating: 4.6,
    reviews: 92,
    inStock: true
  },
  {
    id: 5,
    brand: "Hipp",
    name: "Hipp 3311 Terci cu lapte Fructe",
    weight: "250g",
    price: 101.69,
    oldPrice: 119.63,
    discount: 15,
    image: "https://images.unsplash.com/photo-1599785209796-786432b228bc?w=400&auto=format&fit=crop",
    rating: 4.8,
    reviews: 143,
    inStock: true
  }
];

const BestSellers = () => {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Cele mai vândute
            </h2>
            <p className="text-muted-foreground">Produse preferate de clienții noștri</p>
          </div>
          <Link to="/produse">
            <Button variant="outline" className="hidden sm:flex border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Vezi toate
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-card rounded-xl shadow-card hover:shadow-hover border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative aspect-square bg-muted overflow-hidden">
                {product.discount && (
                  <Badge className="absolute top-3 left-3 z-10 bg-accent text-accent-foreground font-bold">
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
                <p className="text-xs text-primary font-semibold mb-1">{product.brand}</p>
                <h3 className="text-sm font-semibold text-foreground mb-1 line-clamp-2 h-10">
                  {product.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">{product.weight}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-3 h-3 fill-gold text-gold" />
                  <span className="text-xs font-semibold text-foreground">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="mb-3">
                  {product.oldPrice ? (
                    <div className="flex items-baseline gap-2">
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
          <Link to="/produse">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Vezi toate produsele
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
