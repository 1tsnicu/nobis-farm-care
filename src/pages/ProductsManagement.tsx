import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Upload, Filter, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  name: string;
  manufacturer: string;
  country: string;
  price: number;
  stock_quantity: number;
  sku: string;
  is_available: boolean;
  category_id: string;
  categories?: { name: string };
}

const ProductsManagement = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 50;

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [selectedCategory]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('display_order');
    
    if (error) {
      toast.error("Eroare la încărcarea categoriilor");
      return;
    }
    setCategories(data || []);
  };

  const fetchProducts = async () => {
    setLoading(true);
    let query = supabase
      .from('products')
      .select('*, categories(name)')
      .order('name');

    if (selectedCategory !== "all") {
      query = query.eq('category_id', selectedCategory);
    }

    const { data, error } = await query;

    if (error) {
      toast.error("Eroare la încărcarea produselor");
      setLoading(false);
      return;
    }

    setProducts(data || []);
    setLoading(false);
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    navigate('/admin/produse');
  };

  const getStockBadge = (stock: number) => {
    if (stock > 50) return <Badge className="bg-green-500">În stoc</Badge>;
    if (stock > 10) return <Badge className="bg-orange-500">Stoc limitat</Badge>;
    return <Badge className="bg-red-500">Stoc redus</Badge>;
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Gestionare Produse
          </h1>
          <p className="text-muted-foreground">
            Total produse: <span className="font-semibold">{products.length}</span>
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg p-6 mb-6 shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Caută produse..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Toate categoriile" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate categoriile</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleImport}
                className="hidden"
                id="file-upload"
              />
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/admin/produse')}
              >
                <Upload className="w-4 h-4 mr-2" />
                Import CSV
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-card rounded-lg shadow-sm border overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">
              Se încarcă produsele...
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SKU</TableHead>
                      <TableHead>Nume Produs</TableHead>
                      <TableHead>Categorie</TableHead>
                      <TableHead>Producător</TableHead>
                      <TableHead>Țară</TableHead>
                      <TableHead>Preț (MDL)</TableHead>
                      <TableHead>Stoc</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedProducts.map(product => (
                      <TableRow key={product.id}>
                        <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.categories?.name || '-'}</TableCell>
                        <TableCell>{product.manufacturer || '-'}</TableCell>
                        <TableCell>{product.country || '-'}</TableCell>
                        <TableCell className="font-semibold">{product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.stock_quantity}</TableCell>
                        <TableCell>{getStockBadge(product.stock_quantity)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between p-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Pagina {currentPage} din {totalPages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => p - 1)}
                    >
                      Anterior
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(p => p + 1)}
                    >
                      Următor
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsManagement;