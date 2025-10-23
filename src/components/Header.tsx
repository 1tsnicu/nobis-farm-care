import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ShoppingCart, Heart, User, Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  display_order: number;
}

const Header = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showCategories, setShowCategories] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems: cartItems } = useCart();
  const { totalItems: wishlistItems } = useWishlist();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('display_order');
    
    if (data) {
      setCategories(data);
    }
  };

  const topCategories = categories.slice(0, 6);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        {/* Main Header */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.jpeg" alt="Nobis Farm" className="h-10 w-10 rounded-full" />
            <span className="text-xl font-bold">Nobis Farm</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <div 
              className="relative"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              <Button variant="ghost" className="flex items-center gap-1">
                Categorii
                <ChevronDown className={`h-4 w-4 transition-transform ${showCategories ? 'rotate-180' : ''}`} />
              </Button>

              {showCategories && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-background border rounded-lg shadow-lg py-2 z-50">
                  {topCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/categorie/${cat.slug}`}
                      className="block px-4 py-2.5 hover:bg-muted transition-colors"
                      onClick={() => setShowCategories(false)}
                    >
                      <span className="mr-2 text-lg">{cat.icon}</span>
                      <span className="text-sm">{cat.name}</span>
                    </Link>
                  ))}
                  <div className="border-t my-2"></div>
                  <Link
                    to="/produse"
                    className="block px-4 py-2.5 hover:bg-muted transition-colors text-primary font-semibold text-sm"
                    onClick={() => setShowCategories(false)}
                  >
                    Vezi toate produsele →
                  </Link>
                </div>
              )}
            </div>

            <Link to="/produse" className="hover:text-primary transition-colors">
              Toate Produsele
            </Link>
            <Link to="/despre" className="hover:text-primary transition-colors">
              Despre
            </Link>
            <Link to="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link to="/favorite">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistItems}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/cos">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link 
                    to="/produse" 
                    className="text-lg font-semibold hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Toate Produsele
                  </Link>

                  <div className="border-t pt-4">
                    <p className="text-sm font-semibold text-muted-foreground mb-3">Categorii</p>
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/categorie/${cat.slug}`}
                        className="block py-2 hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="mr-2">{cat.icon}</span>
                        {cat.name}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <Link 
                      to="/despre" 
                      className="block py-2 hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Despre
                    </Link>
                    <Link 
                      to="/contact" 
                      className="block py-2 hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Contact
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;