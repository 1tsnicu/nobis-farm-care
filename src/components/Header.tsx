import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { QuickSearch } from "@/components/QuickSearch";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  display_order: number;
}

const Header = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems: cartItems } = useCart();
  const { totalItems: wishlistItems } = useWishlist();
  const location = useLocation();

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

  const isActiveCategory = (slug: string) => {
    return location.pathname === `/categorie/${slug}`;
  };

  const getCategoryShortName = (name: string) => {
    // Scurtează numele pentru header
    const shortNames: { [key: string]: string } = {
      'Sănătate - Medicamente OTC': 'Medicamente OTC',
      'Vitamine și Minerale': 'Vitamine',
      'Sănătate - Parafarmaceutice': 'Cuplu și sex',
      'Mamă și Copil': 'Mamă & Copil',
      'Sănătate - Echipamente Medicale': 'Echipamente',
      'Sănătate - Plante Medicinale': 'Plante',
      'Frumusețe și Igienă - Îngrijire Corp/Față': 'Corp/Față',
      'Frumusețe și Igienă - Igienă Personală': 'Igienă',
      'Frumusețe și Igienă - Protecție Solară': 'Protecție Solară',
      'Frumusețe și Igienă - Îngrijire Păr': 'Păr',
      'Dermato-Cosmetică': 'Dermatocosmetică',
      'Frumusețe și Igienă - Cosmetică Decorativă': 'Cosmetică'
    };
    return shortNames[name] || name;
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="border-b">
          <div className="container mx-auto px-4">
            {/* Main Header */}
            <div className="flex h-20 items-center justify-between gap-4">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
                <img src="/logo.jpeg" alt="Nobis Farm" className="h-20 w-20 rounded-full" />
                <div className="hidden sm:block">
                  <div className="font-bold text-primary text-xl">NOBIS FARM</div>
                  <div className="text-xs text-muted-foreground">Sănătatea familiei tale</div>
                </div>
              </Link>

              {/* Search Bar */}
              <div className="hidden md:flex flex-1 max-w-2xl">
                <QuickSearch className="w-full" showResults={true} />
              </div>

              {/* Desktop Links */}
              <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                <Button variant="ghost" size="sm" className="text-sm">
                  🌐 Română
                </Button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link to="/favorite">
                  <Button variant="ghost" size="icon" className="relative md:h-10 md:w-10 lg:h-11 lg:w-11 [&_svg]:!h-5 [&_svg]:!w-5 md:[&_svg]:!h-[22px] md:[&_svg]:!w-[22px] lg:[&_svg]:!h-6 lg:[&_svg]:!w-6">
                    <Heart className="h-5 w-5 md:h-[22px] md:w-[22px] lg:h-6 lg:w-6" />
                    {wishlistItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {wishlistItems}
                      </span>
                    )}
                  </Button>
                </Link>
                <Link to="/cos">
                  <Button variant="ghost" size="icon" className="relative md:h-10 md:w-10 lg:h-11 lg:w-11 [&_svg]:!h-5 [&_svg]:!w-5 md:[&_svg]:!h-[22px] md:[&_svg]:!w-[22px] lg:[&_svg]:!h-6 lg:[&_svg]:!w-6">
                    <ShoppingCart className="h-5 w-5 md:h-[22px] md:w-[22px] lg:h-6 lg:w-6" />
                    {cartItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItems}
                      </span>
                    )}
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="ghost" size="icon" className="md:h-10 md:w-10 lg:h-11 lg:w-11 [&_svg]:!h-5 [&_svg]:!w-5 md:[&_svg]:!h-[22px] md:[&_svg]:!w-[22px] lg:[&_svg]:!h-6 lg:[&_svg]:!w-6">
                    <User className="h-5 w-5 md:h-[22px] md:w-[22px] lg:h-6 lg:w-6" />
                  </Button>
                </Link>

                {/* Mobile Menu */}
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild className="lg:hidden">
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <div className="flex flex-col space-y-4 mt-8">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold">Meniu</h2>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>

                      <div className="border-t pt-4">
                        <p className="text-sm font-semibold text-muted-foreground mb-3">
                          📦 Categorii ({categories.length})
                        </p>
                        <div className="space-y-1">
                          {categories.map((cat) => (
                            <Link
                              key={cat.id}
                              to={`/categorie/${cat.slug}`}
                              className={`block py-2.5 px-3 rounded-md transition-colors ${
                                isActiveCategory(cat.slug)
                                  ? 'bg-primary text-primary-foreground font-semibold'
                                  : 'hover:bg-muted'
                              }`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <span className="mr-2">{cat.icon}</span>
                              {cat.name}
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <Link 
                          to="/despre" 
                          className="block py-2 hover:text-primary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Despre Noi
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
        </div>
      </header>
    </>
  );
};

export default Header;