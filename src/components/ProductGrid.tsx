import { useState, useEffect, useRef } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, SlidersHorizontal, X, Package, MapPin, DollarSign } from "lucide-react";

interface Product {
  id: string;
  name: string;
  manufacturer: string;
  manufacturer_id: string | null;
  country: string;
  price: number;
  stock_quantity: number;
  image_url: string | null;
}

interface Manufacturer {
  id: string;
  name: string;
  products_count: number;
}

interface ProductGridProps {
  categoryId?: string;
  showFilters?: boolean;
  itemsPerPage?: number;
}

const ProductGrid = ({ categoryId, showFilters = true, itemsPerPage = 20 }: ProductGridProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const scrollPositionRef = useRef<number>(0);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  
  // Get page from URL or default to 1
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  
  // Filters
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 3500]);
  const [maxPrice, setMaxPrice] = useState(3500);

  // Save scroll position before navigation
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem(`scroll-${location.pathname}`, window.scrollY.toString());
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [location.pathname]);

  // Save scroll position when leaving page
  useEffect(() => {
    return () => {
      sessionStorage.setItem(`scroll-${location.pathname}`, window.scrollY.toString());
    };
  }, [location.pathname]);

  // Restore scroll position only when coming back from product detail (back navigation)
  useEffect(() => {
    // Check if this is a back navigation (flag set by ProductDetail)
    const isBackNavigation = sessionStorage.getItem(`back-nav-${location.pathname}`);
    const savedScroll = sessionStorage.getItem(`scroll-${location.pathname}`);
    
    if (isBackNavigation && savedScroll) {
      // Only restore if we have both the back flag and saved scroll
      // Wait for content to load - use a longer delay to ensure ScrollToTop doesn't interfere
      const timer = setTimeout(() => {
        const scrollY = parseInt(savedScroll, 10);
        if (scrollY > 0) {
          window.scrollTo({ top: scrollY, behavior: 'auto' });
          document.documentElement.scrollTop = scrollY;
          document.body.scrollTop = scrollY;
        }
      }, 400);
      return () => clearTimeout(timer);
    } else if (!isBackNavigation && savedScroll) {
      // If it's not a back navigation but we have saved scroll, clear it
      // This happens when navigating to a new category
      sessionStorage.removeItem(`scroll-${location.pathname}`);
    }
  }, [location.pathname, currentPage]);

  useEffect(() => {
    fetchProducts();
    fetchManufacturers();
  }, [categoryId]);

  // Track previous filter values to detect actual changes
  const prevFiltersRef = useRef({ searchTerm, sortBy, selectedManufacturer, selectedCountry, priceRange: priceRange.join(',') });
  
  useEffect(() => {
    // Only reset to page 1 when filters actually change (not on initial load or page change)
    const currentFilters = { searchTerm, sortBy, selectedManufacturer, selectedCountry, priceRange: priceRange.join(',') };
    const filtersChanged = 
      prevFiltersRef.current.searchTerm !== currentFilters.searchTerm ||
      prevFiltersRef.current.sortBy !== currentFilters.sortBy ||
      prevFiltersRef.current.selectedManufacturer !== currentFilters.selectedManufacturer ||
      prevFiltersRef.current.selectedCountry !== currentFilters.selectedCountry ||
      prevFiltersRef.current.priceRange !== currentFilters.priceRange;
    
    if (filtersChanged) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('page', '1');
      setSearchParams(newParams, { replace: true });
      prevFiltersRef.current = currentFilters;
    }
  }, [searchTerm, sortBy, selectedManufacturer, selectedCountry, priceRange, searchParams, setSearchParams]);

  // Update URL when page changes (but don't scroll)
  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams, { replace: true });
    // Save current scroll position
    scrollPositionRef.current = window.scrollY;
  };

  const fetchManufacturers = async () => {
    const { data } = await supabase
      .from('manufacturers')
      .select('*')
      .order('products_count', { ascending: false });
    
    if (data) {
      setManufacturers(data);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    
    let query = supabase
      .from('products')
      .select('*')
      .eq('is_available', true);

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    const { data: productsData, error } = await query;

    if (error) {
      console.error('Products error:', error);
    } else {
      setProducts(productsData || []);
      
      // Extract unique countries
      const uniqueCountries = [...new Set(productsData?.map(p => p.country).filter(Boolean))] as string[];
      setCountries(uniqueCountries.sort());

      // Set max price
      const prices = productsData?.map(p => p.price) || [];
      const max = Math.max(...prices, 3500);
      setMaxPrice(max);
      setPriceRange([0, max]);
    }

    setLoading(false);
  };

  const filteredProducts = products
    .filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(p => selectedManufacturer === "all" || p.manufacturer_id === selectedManufacturer)
    .filter(p => selectedCountry === "all" || p.country === selectedCountry)
    .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "stock") return b.stock_quantity - a.stock_quantity;
      return a.name.localeCompare(b.name);
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const hasActiveFilters = selectedManufacturer !== "all" || selectedCountry !== "all" || priceRange[0] > 0 || priceRange[1] < maxPrice;

  const resetFilters = () => {
    setSelectedManufacturer("all");
    setSelectedCountry("all");
    setPriceRange([0, maxPrice]);
    setSearchTerm("");
  };

  const getStockBadge = (stock: number) => {
    if (stock > 50) return { text: "În stoc", color: "bg-green-500" };
    if (stock > 10) return { text: "Stoc limitat", color: "bg-orange-500" };
    return { text: "Ultimele bucăți", color: "bg-red-500" };
  };

  if (loading) {
    return (
      <div className="flex gap-6">
        {showFilters && <Skeleton className="w-80 h-[600px]" />}
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-80" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Mobile Filter Button */}
      {showFilters && (
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filtre
                {hasActiveFilters && (
                  <Badge variant="default" className="ml-2 rounded-full">
                    {[selectedManufacturer !== "all", selectedCountry !== "all", (priceRange[0] > 0 || priceRange[1] < maxPrice)].filter(Boolean).length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <FiltersContent
                selectedManufacturer={selectedManufacturer}
                setSelectedManufacturer={setSelectedManufacturer}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                maxPrice={maxPrice}
                manufacturers={manufacturers}
                countries={countries}
                hasActiveFilters={hasActiveFilters}
                resetFilters={resetFilters}
              />
            </SheetContent>
          </Sheet>
        </div>
      )}

      {/* Desktop Sidebar Filters */}
      {showFilters && (
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <div className="border rounded-lg p-4 bg-card sticky top-20">
            <FiltersContent
              selectedManufacturer={selectedManufacturer}
              setSelectedManufacturer={setSelectedManufacturer}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              maxPrice={maxPrice}
              manufacturers={manufacturers}
              countries={countries}
              hasActiveFilters={hasActiveFilters}
              resetFilters={resetFilters}
            />
          </div>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Sort */}
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sortează:</span>
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Relevanță" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">✨ Relevanță</SelectItem>
                <SelectItem value="price-asc">Preț crescător</SelectItem>
                <SelectItem value="price-desc">Preț descrescător</SelectItem>
                <SelectItem value="name-asc">Nume A-Z</SelectItem>
                <SelectItem value="name-desc">Nume Z-A</SelectItem>
                <SelectItem value="stock">Stoc</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        {paginatedProducts.length > 0 ? (
          <>
            <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
              {paginatedProducts.map(product => {
                const stockBadge = getStockBadge(product.stock_quantity);
                return (
                  <div key={product.id} className="relative">
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.image_url || '/placeholder.svg'}
                      rating={4.5}
                      reviews={Math.floor(Math.random() * 200) + 10}
                      inStock={product.stock_quantity > 0}
                    />
                    <div className={`absolute top-2 right-2 ${stockBadge.color} text-white text-xs px-2 py-1 rounded-full font-semibold`}>
                      {stockBadge.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  ← Precedent
                </Button>
                
                {/* Dynamic Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const maxPagesToShow = 5;
                  
                  // Calculează range-ul de pagini de afișat
                  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
                  let endPage = startPage + maxPagesToShow - 1;
                  
                  if (endPage > totalPages) {
                    endPage = totalPages;
                    startPage = Math.max(1, endPage - maxPagesToShow + 1);
                  }
                  
                  // Afișează dots la început dacă nu e pagina 1
                  if (page === 1 && startPage > 1) {
                    return (
                      <span key="dots-start" className="px-2 text-muted-foreground">...</span>
                    );
                  }
                  
                  // Afișează pagina dacă e în range
                  if (page >= startPage && page <= endPage) {
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    );
                  }
                  
                  // Afișează dots la sfârșit dacă nu e ultima pagină
                  if (page === totalPages && endPage < totalPages) {
                    return (
                      <span key="dots-end" className="px-2 text-muted-foreground">...</span>
                    );
                  }
                  
                  return null;
                })}

                <Button
                  variant="outline"
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Următor →
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nu s-au găsit produse {searchTerm && `pentru "${searchTerm}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Filters Content Component (reused for mobile and desktop)
interface FiltersContentProps {
  selectedManufacturer: string;
  setSelectedManufacturer: (value: string) => void;
  selectedCountry: string;
  setSelectedCountry: (value: string) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  maxPrice: number;
  manufacturers: Manufacturer[];
  countries: string[];
  hasActiveFilters: boolean;
  resetFilters: () => void;
}

const FiltersContent = ({
  selectedManufacturer,
  setSelectedManufacturer,
  selectedCountry,
  setSelectedCountry,
  priceRange,
  setPriceRange,
  maxPrice,
  manufacturers,
  countries,
  hasActiveFilters,
  resetFilters
}: FiltersContentProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Filtre</h3>
        </div>
        {hasActiveFilters && (
          <Badge variant="default" className="rounded-full">
            {[selectedManufacturer !== "all", selectedCountry !== "all", (priceRange[0] > 0 || priceRange[1] < maxPrice)].filter(Boolean).length}
          </Badge>
        )}
      </div>

      {/* Search in Filters */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Caută brand, categorie..."
          className="pl-10"
        />
      </div>

      {/* Manufacturer Filter */}
      <div className="mb-4">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <Package className="w-4 h-4" />
          Brand
        </h4>
        <Select value={selectedManufacturer} onValueChange={setSelectedManufacturer}>
          <SelectTrigger>
            <SelectValue placeholder="Selectează producător" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toate brandurile</SelectItem>
            {manufacturers.map((m) => (
              <SelectItem key={m.id} value={m.id}>
                {m.name} ({m.products_count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Country Filter */}
      <div className="mb-4">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Țară
        </h4>
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger>
            <SelectValue placeholder="Selectează țara" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toate țările</SelectItem>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          Interval Preț
        </h4>
        <div className="space-y-4">
          <Slider
            min={0}
            max={maxPrice}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{priceRange[0]} MDL</span>
            <span>{priceRange[1]} MDL</span>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <Button 
        variant="outline" 
        onClick={resetFilters}
        disabled={!hasActiveFilters}
        className="w-full"
      >
        <X className="w-4 h-4 mr-2" />
        Reset Filtre
      </Button>
    </div>
  );
};

export default ProductGrid;
