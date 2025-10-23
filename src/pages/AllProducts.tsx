import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CategoryNav } from "@/components/products/CategoryNav";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductSort } from "@/components/products/ProductSort";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { categories } from "@/data/categories";
import { allProducts, getUniqueCountries, getUniqueManufacturers, getPriceRange, filterProducts, sortProducts } from "@/data/products";

const AllProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("rating-desc");
  
  const countries = useMemo(() => getUniqueCountries(), []);
  const manufacturers = useMemo(() => getUniqueManufacturers(), []);
  const priceRange = useMemo(() => getPriceRange(), []);
  
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>(() => {
    const range = getPriceRange();
    return [range.min, range.max];
  });

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = filterProducts(allProducts, {
      category: selectedCategory,
      countries: selectedCountries,
      manufacturers: selectedManufacturers,
      priceRange: selectedPriceRange,
      searchQuery,
    });
    return sortProducts(filtered, sortBy as any);
  }, [selectedCategory, selectedCountries, selectedManufacturers, selectedPriceRange, searchQuery, sortBy]);

  const handleClearFilters = () => {
    setSelectedCountries([]);
    setSelectedManufacturers([]);
    setSelectedPriceRange([priceRange.min, priceRange.max]);
    setSelectedCategory(undefined);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Toate Produsele</h1>

        <CategoryNav
          categories={categories}
          activeCategory={selectedCategory}
          onCategoryClick={setSelectedCategory}
        />

        <div className="flex gap-6">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 shrink-0">
            <ProductFilters
              countries={countries}
              manufacturers={manufacturers}
              priceRange={priceRange}
              selectedCountries={selectedCountries}
              selectedManufacturers={selectedManufacturers}
              selectedPriceRange={selectedPriceRange}
              onCountryChange={(country, checked) => {
                setSelectedCountries(prev =>
                  checked ? [...prev, country] : prev.filter(c => c !== country)
                );
              }}
              onManufacturerChange={(manufacturer, checked) => {
                setSelectedManufacturers(prev =>
                  checked ? [...prev, manufacturer] : prev.filter(m => m !== manufacturer)
                );
              }}
              onPriceRangeChange={setSelectedPriceRange}
              onClearFilters={handleClearFilters}
            />
          </aside>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Caută produse..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <ProductSort value={sortBy} onChange={setSortBy} />
              
              {/* Mobile Filters */}
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <ProductFilters
                    countries={countries}
                    manufacturers={manufacturers}
                    priceRange={priceRange}
                    selectedCountries={selectedCountries}
                    selectedManufacturers={selectedManufacturers}
                    selectedPriceRange={selectedPriceRange}
                    onCountryChange={(country, checked) => {
                      setSelectedCountries(prev =>
                        checked ? [...prev, country] : prev.filter(c => c !== country)
                      );
                    }}
                    onManufacturerChange={(manufacturer, checked) => {
                      setSelectedManufacturers(prev =>
                        checked ? [...prev, manufacturer] : prev.filter(m => m !== manufacturer)
                      );
                    }}
                    onPriceRangeChange={setSelectedPriceRange}
                    onClearFilters={handleClearFilters}
                  />
                </SheetContent>
              </Sheet>
            </div>

            <div className="mb-4 text-sm text-muted-foreground">
              {filteredAndSortedProducts.length} produse găsite
            </div>

            <ProductGrid products={filteredAndSortedProducts} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllProducts;
