import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Heart, User, Menu, X, Pill, Apple, Leaf, Baby, Sparkles, Sun, Scissors, Bath, Eye, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { QuickSearch } from "@/components/QuickSearch";

interface CategoryItem {
  name: string;
  slug: string;
  icon: React.ReactNode;
}

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems: cartItems } = useCart();
  const { totalItems: wishlistItems } = useWishlist();
  const location = useLocation();

  const iconClass = "w-5 h-5";

  const categories: CategoryItem[] = [
    { name: "Medicamente", slug: "medicamente-otc", icon: <Pill className={iconClass} /> },
    { name: "Vitamine și Minerale", slug: "vitamine-minerale", icon: <Apple className={iconClass} /> },
    { name: "Plante Medicinale", slug: "plante-medicinale", icon: <Leaf className={iconClass} /> },
    { name: "Mamă și Copil", slug: "mama-copil", icon: <Baby className={iconClass} /> },
    { name: "Îngrijire Corp/Față", slug: "ingrijire-corp-fata", icon: <Sparkles className={iconClass} /> },
    { name: "Protecție Solară", slug: "protectie-solara", icon: <Sun className={iconClass} /> },
    { name: "Îngrijire Păr", slug: "ingrijire-par", icon: <Scissors className={iconClass} /> },
    { name: "Igienă Personală", slug: "igiena-personala", icon: <Bath className={iconClass} /> },
    { name: "Optică", slug: "echipamente-medicale", icon: <Eye className={iconClass} /> },
    { name: "Articole Ortopedice", slug: "sanate-articole-ortopedice", icon: <Stethoscope className={iconClass} /> },
    { name: "Cuplu și Sex", slug: "parafarmaceutice", icon: <Heart className={iconClass} /> },
  ];

  const isActiveCategory = (slug: string) => {
    return location.pathname === `/categorie/${slug}`;
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="border-b">
          <div className="container mx-auto px-4">
            {/* Main Header */}
            <div className="flex h-20 2xl:h-24 items-center justify-between gap-4 2xl:gap-6">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
                <img src="/logo.jpeg" alt="Nobis Farm" className="h-20 w-20 rounded-full" />
                <div className="hidden sm:block">
                  <div className="font-bold text-primary text-xl">NOBIS FARM</div>
                  <div className="text-xs text-muted-foreground">Sănătatea familiei tale</div>
                </div>
              </Link>

              {/* Search Bar */}
              <div className="hidden md:flex flex-1 max-w-2xl 2xl:max-w-3xl">
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
                  <SheetContent side="left" className="w-[85vw] sm:w-[400px] md:w-[450px] lg:w-[500px] max-w-[500px] overflow-y-auto p-0">
                    <div className="flex flex-col h-full">
                      {/* Header */}
                      <div className="flex items-center gap-3 p-4 sm:p-6 border-b bg-muted/30">
                        <img src="/logo.jpeg" alt="Nobis Farm" className="h-10 w-10 sm:h-12 sm:w-12 rounded-full" />
                        <div>
                          <h2 className="text-lg sm:text-xl font-bold text-primary">NOBIS FARM</h2>
                          <p className="text-xs sm:text-sm text-muted-foreground">Categorii Produse</p>
                        </div>
                      </div>

                      {/* Categories */}
                      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                          {categories.length} Categorii disponibile
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                          {categories.map((cat) => (
                            <Link
                              key={cat.slug}
                              to={`/categorie/${cat.slug}`}
                              className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl transition-all duration-200 ${
                                isActiveCategory(cat.slug)
                                  ? 'bg-primary text-primary-foreground font-semibold shadow-md'
                                  : 'bg-muted/50 hover:bg-muted hover:shadow-sm'
                              }`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-100/50 flex-shrink-0">{cat.icon}</span>
                              <span className="text-sm sm:text-base font-medium leading-tight">{cat.name}</span>
                            </Link>
                          ))}
                        </div>
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