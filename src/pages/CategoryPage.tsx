import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ChevronRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  manufacturer: string;
  country: string;
  price: number;
  stock_quantity: number;
  image_url: string | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

const CategoryPage = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    fetchCategoryAndProducts();
  }, [slug]);

  const fetchCategoryAndProducts = async () => {
    setLoading(true);
    
    // Get category info
    const { data: categoryData, error: catError } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (catError) {
      console.error('Category error:', catError);
      setLoading(false);
      return;
    }

    setCategory(categoryData);

    // Get products for this category
    const { data: productsData, error: prodError } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', categoryData.id)
      .eq('is_available', true);

    if (prodError) {
      console.error('Products error:', prodError);
    } else {
      setProducts(productsData || []);
    }

    setLoading(false);
  };

  const filteredProducts = products
    .filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Skeleton className="h-12 w-64 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-80" />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Categorie negăsită</h1>
          <Link to="/produse" className="text-primary hover:underline">
            ← Înapoi la toate produsele
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Acasă</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/produse" className="hover:text-foreground">Produse</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{category.name}</span>
        </div>

        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-5xl">{category.icon}</span>
            <div>
              <h1 className="text-4xl font-bold text-foreground">{category.name}</h1>
              <p className="text-muted-foreground mt-1">{category.description}</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground">
            <span className="font-semibold text-primary">{filteredProducts.length}</span> produse disponibile
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg p-4 mb-6 shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Caută produse..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sortare" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nume (A-Z)</SelectItem>
                <SelectItem value="price-asc">Preț (Crescător)</SelectItem>
                <SelectItem value="price-desc">Preț (Descrescător)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                id={parseInt(product.id)}
                name={product.name}
                price={product.price}
                image={product.image_url || '/placeholder.svg'}
                rating={4.5}
                reviews={Math.floor(Math.random() * 200) + 10}
                inStock={product.stock_quantity > 0}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nu s-au găsit produse {searchTerm && `pentru "${searchTerm}"`}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;