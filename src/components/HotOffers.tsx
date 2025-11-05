import { Heart, ShoppingCart, Star, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  manufacturer: string;
  price: number;
  old_price?: number;
  discount?: number;
  image_url?: string;
  rating?: number;
  reviews?: number;
  stock_quantity: number;
}

const HotOffers = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addItem } = useCart();

  useEffect(() => {
    const fetchHotOffers = async () => {
      try {
        setLoading(true);
        // Fetch any 6 products from database
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .limit(6);

        if (error) throw error;

        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching hot offers:", error);
        toast({
          title: "Eroare",
          description: "Nu am putut încărca ofertele",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHotOffers();
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      image: product.image_url || "https://via.placeholder.com/400",
      brand: product.manufacturer,
      name: product.name,
      price: product.price,
      inStock: product.stock_quantity > 0
    });
    toast({
      title: "Produs adăugat în coș",
      description: `${product.name} a fost adăugat în coșul tău`,
    });
  };

  const handleToggleWishlist = (product: Product) => {
    toggleWishlist({
      id: product.id,
      image: product.image_url || "https://via.placeholder.com/400",
      brand: product.manufacturer,
      name: product.name,
      price: product.price,
      originalPrice: product.old_price,
      rating: product.rating,
      reviews: product.reviews,
      discount: product.discount,
      inStock: product.stock_quantity > 0
    });
    toast({
      title: isInWishlist(product.id) ? "Eliminat din favorite" : "Adăugat la favorite",
      description: product.name,
    });
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-accent/5 to-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-accent/10 rounded-full p-2">
              <Flame className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Cele mai fierbinți oferte
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-muted rounded-xl aspect-square animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

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
          <Link to="/categorie/medicamente-otc">
            <Button variant="outline" className="hidden sm:flex border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              Vezi toate
            </Button>
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-card rounded-xl shadow-card hover:shadow-hover border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative aspect-square bg-muted overflow-hidden">
                  {product.discount && product.discount > 0 && (
                    <Badge className="absolute top-3 left-3 z-10 bg-accent text-accent-foreground font-bold shadow-lg">
                      -{product.discount}%
                    </Badge>
                  )}
                  <button
                    onClick={() => handleToggleWishlist(product)}
                    className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors shadow-md"
                  >
                    <Heart 
                      className={`w-4 h-4 transition-colors ${
                        isInWishlist(product.id) 
                          ? 'fill-accent text-accent' 
                          : 'text-muted-foreground'
                      }`}
                    />
                  </button>
                  <img
                    src={product.image_url || "https://via.placeholder.com/400"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/400";
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-xs text-secondary font-semibold mb-1">{product.manufacturer || "Producător"}</p>
                  <h3 className="text-sm font-semibold text-foreground mb-1 line-clamp-2 h-10">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-3 h-3 fill-gold text-gold" />
                      <span className="text-xs font-semibold text-foreground">{product.rating.toFixed(1)}</span>
                      {product.reviews && (
                        <span className="text-xs text-muted-foreground">({product.reviews})</span>
                      )}
                    </div>
                  )}

                  {/* Price */}
                  <div className="mb-3">
                    {product.old_price && product.old_price > product.price ? (
                      <div className="flex flex-col gap-1">
                        <span className="text-lg font-bold text-accent">{product.price.toFixed(2)} MDL</span>
                        <span className="text-xs text-muted-foreground line-through">{product.old_price.toFixed(2)} MDL</span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-foreground">{product.price.toFixed(2)} MDL</span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <Button 
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock_quantity <= 0}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {product.stock_quantity > 0 ? "Adaugă în coș" : "Nu e în stoc"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Nu sunt oferte disponibile în acest moment</p>
            <Link to="/categorie/medicamente-otc">
              <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                Vezi toate produsele
              </Button>
            </Link>
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link to="/categorie/medicamente-otc">
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
