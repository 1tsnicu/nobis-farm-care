import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";

interface Product {
  id: string;
  name: string;
  manufacturer: string;
  country: string;
  price: number;
  stock_quantity: number;
  image_url: string | null;
}

interface ProductGridProps {
  categoryId?: string;
  showFilters?: boolean;
  itemsPerPage?: number;
}

const ProductGrid = ({ categoryId, showFilters = true, itemsPerPage = 20 }: ProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filters
  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 3500]);
  const [maxPrice, setMaxPrice] = useState(3500);

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

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
      
      // Extract unique manufacturers and countries
      const uniqueManufacturers = [...new Set(productsData?.map(p => p.manufacturer).filter(Boolean))] as string[];
      const uniqueCountries = [...new Set(productsData?.map(p => p.country).filter(Boolean))] as string[];
      setManufacturers(uniqueManufacturers.sort());
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
    .filter(p => selectedManufacturer === "all" || p.manufacturer === selectedManufacturer)
    .filter(p => selectedCountry === "all" || p.country === selectedCountry)
    .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "stock") return b.stock_quantity - a.stock_quantity;
      return a.name.localeCompare(b.name);
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-80" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Product Count */}
      <div className="flex items-center justify-between">
        <p className="text-lg text-muted-foreground">
          <span className="font-semibold text-primary">{filteredProducts.length}</span> produse disponibile
        </p>
      </div>

      {showFilters && (
        <div className="bg-card rounded-lg p-6 shadow-sm border space-y-4">
          {/* Filters Title */}
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtre
            </h3>
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              <X className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Manufacturer Filter */}
            <Select value={selectedManufacturer} onValueChange={setSelectedManufacturer}>
              <SelectTrigger>
                <SelectValue placeholder="Producător" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toți producătorii</SelectItem>
                {manufacturers.map(mfg => (
                  <SelectItem key={mfg} value={mfg}>{mfg}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Country Filter */}
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger>
                <SelectValue placeholder="Țară" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate țările</SelectItem>
                {countries.map(country => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sortare" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nume (A-Z)</SelectItem>
                <SelectItem value="price-asc">Preț (Crescător)</SelectItem>
                <SelectItem value="price-desc">Preț (Descrescător)</SelectItem>
                <SelectItem value="stock">Stoc disponibil</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Preț: {priceRange[0]} - {priceRange[1]} MDL
            </label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={maxPrice}
              step={10}
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="🔍 Caută produs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Products Grid */}
      {paginatedProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedProducts.map(product => {
              const stockBadge = getStockBadge(product.stock_quantity);
              return (
                <div key={product.id} className="relative">
                  <ProductCard
                    id={parseInt(product.id)}
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
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                ← Precedent
              </Button>
              
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
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
  );
};

export default ProductGrid;