import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAdmin } from '@/hooks/useAdmin';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ProductImageUpload } from '@/components/admin/ProductImageUpload';
import { toast } from 'sonner';
import { Upload, Search, Image as ImageIcon, Loader2 } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  category_id: string;
  manufacturer: string;
  stock_quantity: number;
  categories?: {
    name: string;
  };
}

const CATEGORY_MAPPINGS: { [key: string]: string } = {
  'cuplu_si_sex': 'Sănătate',
  'Cuplu și sex': 'Sănătate',
  'Dispozitive_medicale_-_articole_ortopedice': 'Sănătate - Echipamente Medicale',
  'Dispozitive medicale - articole ortopedice': 'Sănătate - Echipamente Medicale',
  'Igiena_personala': 'Sănătate - Parafarmaceutice',
  'Igiena personala': 'Sănătate - Parafarmaceutice',
  'Îngrejire_corp-față': 'Dermato-Cosmetică',
  'Îngrejire corp-față': 'Dermato-Cosmetică',
  'Îngrijire_păr': 'Dermato-Cosmetică',
  'Îngrijire păr': 'Dermato-Cosmetică',
  'Mama_și_copil': 'Mamă și Copil',
  'Mama și copil': 'Mamă și Copil',
  'Medicamente': 'Sănătate - Medicamente OTC',
  'Optica': 'Sănătate - Echipamente Medicale',
  'Protecție_solară': 'Dermato-Cosmetică',
  'Protecție solară': 'Dermato-Cosmetică',
  'Sănătate-plante_medicinale': 'Vitamine și Minerale',
  'Sănătate-plante medicinale': 'Vitamine și Minerale',
};

export default function AdminProducts() {
  const { isAdmin, loading: adminLoading } = useAdmin();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      toast.error('Acces interzis. Trebuie să fiți administrator.');
      navigate('/');
    }
  }, [isAdmin, adminLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchCategories();
      fetchProducts();
    }
  }, [isAdmin]);

  useEffect(() => {
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, slug')
      .order('name');

    if (error) {
      console.error('Error fetching categories:', error);
      toast.error('Eroare la încărcarea categoriilor');
    } else {
      setCategories(data || []);
    }
  };

  const fetchProducts = async () => {
    setLoadingProducts(true);
    const { data, error } = await supabase
      .from('products')
      .select('id, name, price, image_url, category_id, manufacturer, stock_quantity, categories(name)')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Error fetching products:', error);
      toast.error('Eroare la încărcarea produselor');
    } else {
      setProducts(data || []);
      setFilteredProducts(data || []);
    }
    setLoadingProducts(false);
  };

  const parseCSV = (text: string): any[] => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];

    const headers = lines[0].split(',');
    const products = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const product: any = {};
      headers.forEach((header, index) => {
        product[header.trim()] = values[index]?.trim() || '';
      });
      products.push(product);
    }

    return products;
  };

  const handleCSVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast.error('Vă rugăm să selectați un fișier CSV');
      return;
    }

    setSelectedFile(file);
  };

  const handleImport = async () => {
    if (!selectedFile) {
      toast.error('Vă rugăm să selectați un fișier CSV');
      return;
    }

    setImporting(true);

    try {
      const text = await selectedFile.text();
      const products = parseCSV(text);

      if (products.length === 0) {
        toast.error('Fișierul CSV este gol sau invalid');
        return;
      }

      // Extract category from filename
      const fileName = selectedFile.name.replace('.csv', '');
      const categoryKey = Object.keys(CATEGORY_MAPPINGS).find(key => 
        fileName.includes(key.replace(/_/g, ' ')) || fileName.includes(key)
      );
      
      const categoryName = categoryKey ? CATEGORY_MAPPINGS[categoryKey] : 'Sănătate - Medicamente OTC';

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Sesiune expirată. Vă rugăm să vă autentificați din nou.');
        return;
      }

      const { data, error } = await supabase.functions.invoke('import-csv-products', {
        body: { products, categoryName },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) throw error;

      toast.success(`${data.imported} produse importate cu succes în categoria ${data.category}!`);
      fetchProducts();
      setSelectedFile(null);
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Eroare la import: ' + (error as Error).message);
    } finally {
      setImporting(false);
    }
  };

  if (adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Administrare Produse</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Import Produse CSV</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <Input
                    type="file"
                    accept=".csv"
                    onChange={handleCSVUpload}
                    disabled={importing}
                  />
                  {selectedFile && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Fișier selectat: {selectedFile.name}
                    </p>
                  )}
                </div>
                <Button
                  onClick={handleImport}
                  disabled={!selectedFile || importing}
                >
                  {importing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Se importă...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Importă Produse
                    </>
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Încărcați fișiere CSV cu produse. Categoria va fi detectată automat din numele fișierului.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Produse ({filteredProducts.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Căutați produse..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {loadingProducts ? (
                <div className="text-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredProducts.map((product) => (
                    <Dialog key={product.id}>
                      <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="w-16 h-16 flex-shrink-0">
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="w-full h-full object-cover rounded"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted rounded flex items-center justify-center">
                              <ImageIcon className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {product.manufacturer} • {product.price} MDL
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {product.categories?.name}
                          </p>
                        </div>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <ImageIcon className="mr-2 h-4 w-4" />
                            Adaugă Poză
                          </Button>
                        </DialogTrigger>
                      </div>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Adaugă imagine pentru {product.name}</DialogTitle>
                        </DialogHeader>
                        <ProductImageUpload
                          productId={product.id}
                          currentImageUrl={product.image_url}
                          onImageUpdated={(url) => {
                            setProducts(prev =>
                              prev.map(p =>
                                p.id === product.id ? { ...p, image_url: url } : p
                              )
                            );
                          }}
                        />
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
