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
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Categorii</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category.id} className="flex items-center gap-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
              />
              <Label htmlFor={category.id} className="text-sm cursor-pointer">
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Brand</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map(brand => (
            <div key={brand} className="flex items-center gap-2">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <Label htmlFor={brand} className="text-sm cursor-pointer">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Preț (MDL)</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={200}
            step={5}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{priceRange[0]} MDL</span>
            <span>{priceRange[1]} MDL</span>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Rating minim</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map(rating => (
            <div key={rating} className="flex items-center gap-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={minRating === rating}
                onCheckedChange={(checked) => setMinRating(checked ? rating : 0)}
              />
              <Label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer flex items-center gap-1">
                {rating}+ ★
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Stock */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Disponibilitate</h3>
        <div className="flex items-center gap-2">
          <Checkbox
            id="in-stock"
            checked={inStockOnly}
            onCheckedChange={(checked) => setInStockOnly(!!checked)}
          />
          <Label htmlFor="in-stock" className="text-sm cursor-pointer">
            Doar în stoc
          </Label>
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full"
        onClick={clearFilters}
      >
        <X className="h-4 w-4 mr-2" />
        Șterge filtre
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Toate produsele
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} produse găsite
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">Filtre</h2>
                <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and Mobile Filter */}
            <div className="flex items-center justify-between mb-6">
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filtre
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filtre produse</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Sortează după" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevanță</SelectItem>
                  <SelectItem value="price-asc">Preț crescător</SelectItem>
                  <SelectItem value="price-desc">Preț descrescător</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="reviews">Cele mai populare</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-4">
                  Nu am găsit produse care să corespundă filtrelor tale
                </p>
                <Button onClick={clearFilters}>
                  Șterge toate filtrele
                </Button>
              </div>
            )}

            {/* Pagination Placeholder */}
            {filteredProducts.length > 0 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2">
                  <Button variant="outline" disabled>Anterior</Button>
                  <Button variant="default">1</Button>
                  <Button variant="outline">2</Button>
                  <Button variant="outline">3</Button>
                  <Button variant="outline">Următor</Button>
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
