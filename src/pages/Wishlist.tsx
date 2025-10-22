import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingBag, ArrowLeft } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";

const Wishlist = () => {
  const { items, clearWishlist, totalItems } = useWishlist();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continuă cumpărăturile
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="bg-accent/10 rounded-full p-3">
            <Heart className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Lista mea de favorite</h1>
            <p className="text-muted-foreground">
              {totalItems === 0 ? 'Nu ai produse favorite' : `${totalItems} produs${totalItems === 1 ? '' : 'e'} favorite`}
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Lista ta de favorite este goală
              </h2>
              <p className="text-muted-foreground mb-6">
                Explorează produsele noastre și adaugă-le la favorite pentru a le găsi mai ușor
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/produse">
                  <Button>
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Explorează produsele
                  </Button>
                </Link>
                <Link to="/oferte">
                  <Button variant="outline">
                    <Heart className="h-4 w-4 mr-2" />
                    Vezi ofertele speciale
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {totalItems} produs{totalItems === 1 ? '' : 'e'} în lista de favorite
                </span>
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={clearWishlist}
                  className="text-destructive hover:text-destructive"
                >
                  Șterge toate
                </Button>
                <Link to="/produse">
                  <Button variant="outline" size="sm">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Adaugă mai multe
                  </Button>
                </Link>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {items.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard {...product} />
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-2">
                Gata să cumperi?
              </h3>
              <p className="text-muted-foreground mb-4">
                Transformă-ți favoritele în cumpărături și bucură-te de livrare rapidă
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/cos">
                  <Button>
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Vezi coșul de cumpărături
                  </Button>
                </Link>
                <Link to="/oferte">
                  <Button variant="outline">
                    Vezi ofertele zilei
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
