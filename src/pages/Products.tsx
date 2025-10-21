import { useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data - va veni din API
const allProducts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop",
    brand: "Paracetamol",
    name: "Paracetamol 500mg - 20 tablete",
    price: 45,
    originalPrice: 60,
    rating: 4.5,
    reviews: 128,
    discount: 25,
    inStock: true,
    category: "medicamente"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1550572017-4725f1f5b8f5?w=500&h=500&fit=crop",
    brand: "Vitamin C",
    name: "Vitamin C 1000mg - Complex cu zinc",
    price: 89,
    originalPrice: 120,
    rating: 5,
    reviews: 245,
    discount: 26,
    inStock: true,
    category: "vitamine"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500&h=500&fit=crop",
    brand: "Omega-3",
    name: "Omega-3 Fish Oil - 60 capsule",
    price: 129,
    rating: 4.8,
    reviews: 89,
    inStock: true,
    category: "vitamine"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop",
    brand: "Probiotice",
    name: "Probiotice Premium - 30 capsule",
    price: 159,
    originalPrice: 199,
    rating: 4.7,
    reviews: 156,
    discount: 20,
    inStock: true,
    category: "vitamine"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop",
    brand: "Ibuprofen",
    name: "Ibuprofen 400mg - 30 tablete",
    price: 52,
    rating: 4.3,
    reviews: 94,
    inStock: false,
    category: "medicamente"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop",
    brand: "Cremă",
    name: "Cremă hidratantă cu Aloe Vera - 50ml",
    price: 75,
    originalPrice: 95,
    rating: 4.6,
    reviews: 67,
    discount: 21,
    inStock: true,
    category: "cosmetice"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1616671276746-6ff1a6a55b6e?w=500&h=500&fit=crop",
    brand: "Magneziu",
    name: "Magneziu + B6 - 60 tablete",
    price: 95,
    rating: 4.9,
    reviews: 203,
    inStock: true,
    category: "vitamine"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop",
    brand: "Aspirina",
    name: "Aspirina 500mg - 10 tablete",
    price: 38,
    rating: 4.2,
    reviews: 112,
    inStock: true,
    category: "medicamente"
  }
];

const categories = [
  { id: "medicamente", name: "Medicamente OTC" },
  { id: "vitamine", name: "Vitamine & Suplimente" },
  { id: "cosmetice", name: "Produse cosmetice" },
  { id: "ingrijire", name: "Îngrijire personală" }
];

const brands = ["Paracetamol", "Vitamin C", "Omega-3", "Probiotice", "Ibuprofen", "Cremă", "Magneziu", "Aspirina"];

const Products = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 200]);
    setMinRating(0);
    setInStockOnly(false);
  };

  // Filter and sort products
  let filteredProducts = allProducts.filter(product => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    if (product.rating < minRating) return false;
    if (inStockOnly && !product.inStock) return false;
    return true;
  });

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "reviews":
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Search in filters */}
      <div>
        <Label className="text-sm font-semibold text-foreground mb-3 block">🔍 Caută în filtre</Label>
        <input
          type="text"
          placeholder="Caută brand, categorie..."
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Categories */}
      <div className="pb-6 border-b border-border">
        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
          <span className="text-lg">📦</span>
          Categorii
        </h3>
        <div className="space-y-3">
          {categories.map(category => (
            <div key={category.id} className="flex items-center gap-3 group">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
                className="rounded border-2"
              />
              <Label 
                htmlFor={category.id} 
                className="text-sm cursor-pointer group-hover:text-primary transition-colors flex-1"
              >
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="pb-6 border-b border-border">
        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
          <span className="text-lg">🏷️</span>
          Brand
        </h3>
        <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
          {brands.map(brand => (
            <div key={brand} className="flex items-center gap-3 group">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
                className="rounded border-2"
              />
              <Label 
                htmlFor={brand} 
                className="text-sm cursor-pointer group-hover:text-primary transition-colors flex-1"
              >
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="pb-6 border-b border-border">
        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
          <span className="text-lg">💰</span>
          Preț
        </h3>
        <div className="space-y-6 px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={200}
            step={5}
            className="w-full"
          />
          <div className="flex items-center justify-between">
            <div className="bg-primary/10 rounded-lg px-4 py-2">
              <span className="text-sm font-bold text-primary">{priceRange[0]} MDL</span>
            </div>
            <span className="text-muted-foreground">—</span>
            <div className="bg-primary/10 rounded-lg px-4 py-2">
              <span className="text-sm font-bold text-primary">{priceRange[1]} MDL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="pb-6 border-b border-border">
        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
          <span className="text-lg">⭐</span>
          Rating minim
        </h3>
        <div className="space-y-3">
          {[4, 3, 2, 1].map(rating => (
            <div key={rating} className="flex items-center gap-3 group">
              <Checkbox
                id={`rating-${rating}`}
                checked={minRating === rating}
                onCheckedChange={(checked) => setMinRating(checked ? rating : 0)}
                className="rounded border-2"
              />
              <Label 
                htmlFor={`rating-${rating}`} 
                className="text-sm cursor-pointer flex items-center gap-2 group-hover:text-primary transition-colors"
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < rating ? 'text-gold' : 'text-muted'}>★</span>
                  ))}
                </div>
                <span className="text-muted-foreground">& mai mult</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Stock */}
      <div className="pb-6">
        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
          <span className="text-lg">📦</span>
          Disponibilitate
        </h3>
        <div className="flex items-center gap-3 group">
          <Checkbox
            id="in-stock"
            checked={inStockOnly}
            onCheckedChange={(checked) => setInStockOnly(!!checked)}
            className="rounded border-2"
          />
          <Label 
            htmlFor="in-stock" 
            className="text-sm cursor-pointer group-hover:text-primary transition-colors flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Doar în stoc
          </Label>
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full border-2 hover:bg-accent hover:text-white hover:border-accent"
        onClick={clearFilters}
      >
        <X className="h-4 w-4 mr-2" />
        Șterge toate filtrele
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Toate produsele
          </h1>
          <p className="text-lg text-muted-foreground flex items-center justify-center lg:justify-start gap-2">
            <span className="inline-flex items-center gap-1 bg-primary/10 rounded-full px-3 py-1 text-primary font-semibold">
              {filteredProducts.length}
            </span>
            produse găsite
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 bg-card border-2 border-border rounded-2xl p-6 shadow-card">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5 text-primary" />
                  Filtre
                </h2>
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-bold">
                  {(selectedCategories.length + selectedBrands.length + (minRating > 0 ? 1 : 0) + (inStockOnly ? 1 : 0))}
                </span>
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and Mobile Filter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden border-2">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filtre
                    {(selectedCategories.length + selectedBrands.length) > 0 && (
                      <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full font-bold">
                        {selectedCategories.length + selectedBrands.length}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <SlidersHorizontal className="h-5 w-5 text-primary" />
                      Filtre produse
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground hidden sm:inline">Sortează:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[220px] border-2">
                    <SelectValue placeholder="Sortează după" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">✨ Relevanță</SelectItem>
                    <SelectItem value="price-asc">💰 Preț crescător</SelectItem>
                    <SelectItem value="price-desc">💰 Preț descrescător</SelectItem>
                    <SelectItem value="rating">⭐ Rating</SelectItem>
                    <SelectItem value="reviews">🔥 Cele mai populare</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters Pills */}
            {(selectedCategories.length > 0 || selectedBrands.length > 0 || minRating > 0 || inStockOnly) && (
              <div className="flex flex-wrap gap-2 mb-6 p-4 bg-muted/30 rounded-xl border border-border">
                <span className="text-sm font-semibold text-foreground">Filtre active:</span>
                {selectedCategories.map(cat => (
                  <Button
                    key={cat}
                    variant="secondary"
                    size="sm"
                    onClick={() => toggleCategory(cat)}
                    className="h-7 text-xs"
                  >
                    {categories.find(c => c.id === cat)?.name}
                    <X className="h-3 w-3 ml-1" />
                  </Button>
                ))}
                {selectedBrands.map(brand => (
                  <Button
                    key={brand}
                    variant="secondary"
                    size="sm"
                    onClick={() => toggleBrand(brand)}
                    className="h-7 text-xs"
                  >
                    {brand}
                    <X className="h-3 w-3 ml-1" />
                  </Button>
                ))}
                {minRating > 0 && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setMinRating(0)}
                    className="h-7 text-xs"
                  >
                    {minRating}+ ⭐
                    <X className="h-3 w-3 ml-1" />
                  </Button>
                )}
                {inStockOnly && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setInStockOnly(false)}
                    className="h-7 text-xs"
                  >
                    În stoc
                    <X className="h-3 w-3 ml-1" />
                  </Button>
                )}
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-border">
                <div className="text-6xl mb-4">😕</div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Nu am găsit produse
                </h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-md mx-auto">
                  Nu există produse care să corespundă filtrelor tale. Încearcă să ajustezi criteriile de căutare.
                </p>
                <Button onClick={clearFilters} size="lg" className="shadow-lg">
                  <X className="h-4 w-4 mr-2" />
                  Șterge toate filtrele
                </Button>
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2 bg-card border-2 border-border rounded-xl p-2 shadow-sm">
                  <Button variant="ghost" size="sm" disabled className="rounded-lg">
                    <ChevronDown className="h-4 w-4 rotate-90" />
                  </Button>
                  <Button variant="default" size="sm" className="rounded-lg min-w-[40px]">1</Button>
                  <Button variant="ghost" size="sm" className="rounded-lg min-w-[40px]">2</Button>
                  <Button variant="ghost" size="sm" className="rounded-lg min-w-[40px]">3</Button>
                  <span className="px-2 text-muted-foreground">...</span>
                  <Button variant="ghost" size="sm" className="rounded-lg min-w-[40px]">10</Button>
                  <Button variant="ghost" size="sm" className="rounded-lg">
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
