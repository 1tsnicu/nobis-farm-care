import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Heart, User, Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/lib/data/categories";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useSearch } from "@/hooks/useSearch";
import { SearchBar } from "@/components/SearchBar";

// Mock data pentru demonstrație - în realitate ar veni din API
const mockProducts = [
  { id: 1, name: "Paracetamol 500mg", category: "Medicamente", brand: "Farmacia Tei", price: 15, image: "", inStock: true, description: "Analgezic și antipiretic", tags: ["durere", "febra"], rating: 4.5, reviews: 234 },
  { id: 2, name: "Vitamina C 1000mg", category: "Vitamine", brand: "Solgar", price: 45, image: "", inStock: true, description: "Supliment vitamina C", tags: ["imunitate", "antioxidant"], rating: 4.8, reviews: 189 },
  { id: 3, name: "Aspenter 100mg", category: "Medicamente", brand: "Zentiva", price: 22, image: "", inStock: true, description: "Antiagregant plachetar", tags: ["inima", "preventie"], rating: 4.2, reviews: 156 },
  { id: 4, name: "Omega 3", category: "Suplimente", brand: "Nordic Naturals", price: 89, image: "", inStock: false, description: "Acizi grași omega 3", tags: ["inima", "creier"], rating: 4.7, reviews: 298 },
  { id: 5, name: "Magneziu B6", category: "Vitamine", brand: "Magne B6", price: 35, image: "", inStock: true, description: "Supliment magneziu cu vitamina B6", tags: ["stres", "oboseala"], rating: 4.3, reviews: 127 },
  { id: 6, name: "Balsam Спасатель 30g", category: "Dermato-Cosmetice", brand: "Efect", price: 158.48, image: "", inStock: true, description: "Balsam universal pentru regenerarea pielii", tags: ["balsam", "regenerare", "piele"], rating: 4.7, reviews: 45 }
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems: cartItems } = useCart();
  const { totalItems: wishlistItems } = useWishlist();
  
  // Inițializăm hook-ul de search
  const {
    searchTerm,
    setSearchTerm,
    performSearch,
    clearSearch,
    searchHistory,
    removeFromHistory,
    getSearchSuggestions,
    isSearching
  } = useSearch({ 
    products: mockProducts,
    onResultsChange: (results) => {
      // Callback opțional pentru când se schimbă rezultatele
      console.log(`Found ${results.length} products`);
    }
  });

  // Generăm sugestii în timp real
  const suggestions = searchTerm.length > 1 ? getSearchSuggestions(searchTerm, 5) : [];

  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm">
      <div className="container mx-auto px-4">
        {/* Main Header */}
        <div className="flex items-center justify-between py-4 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
              <img 
                src="/logo.jpeg" 
                alt="NOBIS FARM" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl font-bold text-nobis-green-700 block leading-tight">
                NOBIS FARM
              </span>
              <span className="text-xs text-nobis-gray-600">Sănătatea familiei tale</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-2xl">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onSearch={performSearch}
              onClear={clearSearch}
              suggestions={suggestions}
              searchHistory={searchHistory}
              onRemoveFromHistory={removeFromHistory}
              placeholder="Caută medicamente, suplimente sau produse de îngrijire..."
              isLoading={isSearching}
              showSuggestions={true}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden lg:flex gap-1 text-muted-foreground">
              <Globe className="h-4 w-4" />
              Română
            </Button>
            <Link to="/favorite">
              <Button variant="ghost" size="icon" className="hidden md:flex relative">
                <Heart className="h-5 w-5" />
                {wishlistItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {wishlistItems}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/cos">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
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
            <div className="flex items-center gap-1">
              {categories.map((category) => (
                <div key={category.id} className="relative group">
                  <Link 
                    to={`/produse?categorie=${category.slug}`}
                    className="text-sm font-medium h-auto py-2 px-4 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-1"
                  >
                    {category.name}
                    {category.productCount && (
                      <span className="text-xs text-muted-foreground ml-1">({category.productCount})</span>
                    )}
                  </Link>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6">
              <Link to="/blog" className="text-sm text-foreground hover:text-primary transition-colors font-medium py-2">
                Blog
              </Link>
              <Link to="/contact" className="text-sm text-foreground hover:text-primary transition-colors font-medium py-2">
                Contact
              </Link>
              <Link to="/produse?oferte=true" className="text-sm text-accent hover:text-accent/80 transition-colors font-semibold py-2">
                Oferte
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
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onSearch={(term) => {
                  performSearch(term);
                  setMobileMenuOpen(false);
                }}
                onClear={clearSearch}
                suggestions={suggestions}
                searchHistory={searchHistory}
                onRemoveFromHistory={removeFromHistory}
                placeholder="Caută produse..."
                isLoading={isSearching}
                showSuggestions={true}
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
                  {category.productCount && (
                    <span className="text-xs text-muted-foreground">({category.productCount})</span>
                  )}
                </Link>
              </div>
            ))}
            <div className="border-t border-border pt-3 space-y-3">
              <Link
                to="/blog"
                className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className="block py-2 text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/favorite"
                className="block py-2 text-foreground hover:text-primary transition-colors font-medium flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Heart className="h-4 w-4" />
                Favorite {wishlistItems > 0 && `(${wishlistItems})`}
              </Link>
              <Link
                to="/cos"
                className="block py-2 text-foreground hover:text-primary transition-colors font-medium flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingCart className="h-4 w-4" />
                Coș {cartItems > 0 && `(${cartItems})`}
              </Link>
              <Link
                to="/produse?oferte=true"
                className="block py-2 text-accent hover:text-accent/80 transition-colors font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Oferte
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
