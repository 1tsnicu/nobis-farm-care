import { useState, useEffect } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  manufacturer: string;
  country: string;
  price: number;
  stock_quantity: number;
  image_url: string | null;
}

const BestSellers = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addItem } = useCart();

  useEffect(() => {
    fetchBestSellers();
  }, []);

  const fetchBestSellers = async () => {
    setLoading(true);
    
    try {
      // Încarcă produsele cu offset pentru a fi diferite de HotOffers
      // Ordonează după preț descrescător pentru a simula "cele mai vândute" (produse populare)
      const { data: productsData, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_available', true)
        .order('price', { ascending: true })
        .range(6, 11); // Skip first 6 products (shown in HotOffers)

      if (error) {
        console.error('Best sellers error:', error);
      } else {
        setProducts(productsData || []);
      }
    } catch (error) {
      console.error('Error fetching best sellers:', error);
    }

    setLoading(false);
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      image: product.image_url || '/placeholder.svg',
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
      image: product.image_url || '/placeholder.svg',
      brand: product.manufacturer,
      name: product.name,
      price: product.price,
      originalPrice: undefined,
      rating: 4.5, // Default rating
      reviews: Math.floor(Math.random() * 200) + 10,
      discount: undefined,
      inStock: product.stock_quantity > 0
    });
    toast({
      title: isInWishlist(product.id) ? "Eliminat din favorite" : "Adăugat la favorite",
      description: product.name,
    });
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
          <Link to="/categorie/medicamente-otc">
            <Button variant="outline" className="hidden sm:flex border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Vezi toate
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
                <Skeleton className="aspect-square" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/produs/${product.id}`}
                className="group bg-card rounded-xl shadow-card hover:shadow-hover border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1 block"
              >
                {/* Image Container */}
                <div className="relative aspect-square bg-muted overflow-hidden">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleToggleWishlist(product);
                    }}
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
                    src={product.image_url || '/placeholder.svg'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-xs text-primary font-semibold mb-1">{product.manufacturer}</p>
                  <h3 className="text-sm font-semibold text-foreground mb-1 line-clamp-2 h-10">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">{product.country}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-3 h-3 fill-gold text-gold" />
                    <span className="text-xs font-semibold text-foreground">4.5</span>
                    <span className="text-xs text-muted-foreground">({Math.floor(Math.random() * 200) + 10})</span>
                  </div>

                  {/* Price */}
                  <div className="mb-3">
                    <span className="text-lg font-bold text-foreground">{product.price.toFixed(2)} MDL</span>
                  </div>

                  {/* Add to Cart Button */}
                  <Button 
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Adaugă în coș
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link to="/categorie/medicamente-otc">
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
