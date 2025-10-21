import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Heart, User, Menu, X, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { categories } from "@/lib/data/categories";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm">
      <div className="container mx-auto px-4">
        {/* Main Header */}
        <div className="flex items-center justify-between py-4 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center shadow-md">
              <span className="text-2xl font-bold text-primary-foreground">NF</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl font-bold text-primary block leading-tight">
                NOBIS FARM
              </span>
              <span className="text-xs text-muted-foreground">Sănătatea familiei tale</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Caută produse, categorii sau articole"
                className="w-full h-11 pr-24 border-primary/30"
              />
              <Button 
                size="sm" 
                variant="outline" 
                className="absolute right-1 top-1 h-9 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Search className="h-4 w-4 mr-1" />
                Caută
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden lg:flex gap-1 text-muted-foreground">
              <Globe className="h-4 w-4" />
              Română
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>
            <Link to="/cos">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  0
                </span>
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:block border-t border-border">
          <div className="flex items-center justify-between py-2">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {categories.map((category) => (
                  <NavigationMenuItem key={category.id}>
                    <NavigationMenuTrigger className="text-sm font-medium h-auto py-2">
                      {category.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[500px] p-4 bg-background">
                        <div className="grid grid-cols-2 gap-2">
                          <Link
                            to={`/produse?categorie=${category.slug}`}
                            className="block p-2 hover:bg-muted rounded-md transition-colors"
                          >
                            <div className="font-semibold text-sm text-primary">
                              Toate produsele
                            </div>
                            {category.productCount && (
                              <div className="text-xs text-muted-foreground">
                                {category.productCount} produse
                              </div>
                            )}
                          </Link>
                          {category.subcategories.map((sub) => (
                            <Link
                              key={sub.id}
                              to={`/produse?categorie=${category.slug}&subcategorie=${sub.slug}`}
                              className="block p-2 hover:bg-muted rounded-md transition-colors"
                            >
                              <div className="text-sm text-foreground hover:text-primary">{sub.name}</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-6">
              <Link to="/produse?oferte=true" className="text-sm text-accent hover:text-accent/80 transition-colors font-semibold py-2">
                Oferte
              </Link>
              <Link to="/cont" className="text-sm text-foreground hover:text-primary transition-colors font-medium py-2 flex items-center gap-1">
                <User className="h-4 w-4" />
                Contul meu
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background max-h-[80vh] overflow-y-auto">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <div className="pb-3">
              <Input
                type="search"
                placeholder="Caută produse..."
                className="w-full"
              />
            </div>
            {categories.map((category) => (
              <div key={category.id} className="border-b border-border pb-3 last:border-0">
                <Link
                  to={`/produse?categorie=${category.slug}`}
                  className="block py-2 text-foreground hover:text-primary transition-colors font-semibold flex items-center justify-between"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                  <ChevronDown className="h-4 w-4" />
                </Link>
                <div className="pl-4 space-y-1 mt-2">
                  {category.subcategories.slice(0, 6).map((sub) => (
                    <Link
                      key={sub.id}
                      to={`/produse?categorie=${category.slug}&subcategorie=${sub.slug}`}
                      className="block py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {sub.name}
                    </Link>
                  ))}
                  {category.subcategories.length > 6 && (
                    <Link
                      to={`/produse?categorie=${category.slug}`}
                      className="block py-1.5 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Vezi toate ({category.subcategories.length}) →
                    </Link>
                  )}
                </div>
              </div>
            ))}
            <Link
              to="/produse?oferte=true"
              className="py-2 text-accent hover:text-accent/80 transition-colors font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Oferte
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
