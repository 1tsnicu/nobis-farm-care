import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAdmin } from '@/hooks/useAdmin';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { ProductImageUpload } from '@/components/admin/ProductImageUpload';
import { toast } from 'sonner';
import { Upload, Search, Image as ImageIcon, Loader2, Trash2, Edit2 } from 'lucide-react';

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
  old_price?: number;
  discount?: number;
  categories?: {
    name: string;
  };
}

const CATEGORY_MAPPINGS: { [key: string]: string } = {
  'cuplu_si_sex': 'Sănătate - Parafarmaceutice',
  'Cuplu și sex': 'Sănătate - Parafarmaceutice',
  'vitamine și minerale': 'Vitamine și Minerale',
  'vitamine si minerale': 'Vitamine și Minerale',
  'Vitamine_si_minerale': 'Vitamine și Minerale',
  'protectie solara': 'Frumusețe și Igienă - Protecție Solară',
  'protecție solară': 'Frumusețe și Igienă - Protecție Solară',
  'Protecție solară': 'Frumusețe și Igienă - Protecție Solară',
  'Protectie solara': 'Frumusețe și Igienă - Protecție Solară',
  'Protecție_solară': 'Frumusețe și Igienă - Protecție Solară',
  'Dispozitive_medicale_-_articole_ortopedice': 'Sănătate - Articole Ortopedice',
  'Dispozitive medicale - articole ortopedice': 'Sănătate - Articole Ortopedice',
  'Igiena_personala': 'Frumusețe și Igienă - Igienă Personală',
  'Igiena personala': 'Frumusețe și Igienă - Igienă Personală',
  'Igienă_personală': 'Frumusețe și Igienă - Igienă Personală',
  'Igienă personală': 'Frumusețe și Igienă - Igienă Personală',
  'Frumusețe și Igienă - Igienă Personală': 'Frumusețe și Igienă - Igienă Personală',
  'Frumusete si igiena - igiena personala': 'Frumusețe și Igienă - Igienă Personală',
  'Îngrejire_corp-față': 'Frumusețe și Igienă - Îngrijire Corp/Față',
  'Îngrejire corp-față': 'Frumusețe și Igienă - Îngrijire Corp/Față',
  'Îngrijire_păr': 'Frumusețe și Igienă - Îngrijire Păr',
  'Îngrijire păr': 'Frumusețe și Igienă - Îngrijire Păr',
  'Mama_și_copil': 'Mamă și Copil',
  'Mama și copil': 'Mamă și Copil',
  'Medicamente': 'Sănătate - Medicamente OTC',
  'Optica': 'Sănătate - Echipamente Medicale',
  'Optic': 'Sănătate - Echipamente Medicale',
  'Sănătate-plante_medicinale': 'Sănătate - Plante Medicinale',
  'Sănătate-plante medicinale': 'Sănătate - Plante Medicinale',
  'Sănătate': 'Sănătate - Medicamente OTC',
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
  const [fixingCategories, setFixingCategories] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Product>>({});

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
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      toast.error('Eroare la încărcarea produselor');
    } else {
      setProducts(data || []);
      setFilteredProducts(data || []);
    }
    setLoadingProducts(false);
  };

  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };

  const parseCSV = (text: string): any[] => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];

    const headerLine = lines[0];
    const headers = parseCSVLine(headerLine);
    const products = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      const product: any = {};
      headers.forEach((header, index) => {
        product[header] = values[index] || '';
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
      const csvProducts = parseCSV(text);

      console.log('CSV Headers:', Object.keys(csvProducts[0] || {}));
      console.log('Sample product:', csvProducts[0]);
      console.log('Total rows:', csvProducts.length);

      if (csvProducts.length === 0) {
        toast.error('Fișierul CSV este gol sau invalid');
        return;
      }

      // Extract category from filename with better matching
      const fileName = selectedFile.name.replace('.csv', '').toLowerCase();
      
      // Try exact matches first
      let categoryName = 'Sănătate - Medicamente OTC'; // default
      
      for (const [key, value] of Object.entries(CATEGORY_MAPPINGS)) {
        if (fileName.includes(key.toLowerCase().replace(/_/g, ' '))) {
          categoryName = value;
          break;
        }
      }
      
      console.log('File name:', fileName);
      console.log('Detected category:', categoryName);

      // Get category ID
      const { data: categoryData } = await supabase
        .from('categories')
        .select('id')
        .eq('name', categoryName)
        .single();

      if (!categoryData) {
        toast.error(`Categoria "${categoryName}" nu a fost găsită`);
        return;
      }

      // Transform CSV data to match product schema
      // Support multiple CSV formats (both Latin and Cyrillic headers)
      const productsToInsert = csvProducts
        .filter((p: any) => {
          // Check for product name in any of the possible columns
          const productName = p.Produs || p.Товар || p['Product'] || '';
          return productName && productName.toString().trim();
        })
        .map((p: any, idx: number) => {
          // Map headers to values - support both Latin and Cyrillic
          const productName = (p.Produs || p.Товар || p['Product'] || '').toString().trim();
          const manufacturer = (p.Producător || p.Производитель || p['Manufacturer'] || '').toString().trim() || null;
          const country = (p.Țară || p.Страна || p['Country'] || '').toString().trim() || null;
          
          // Parse price - handle comma as decimal separator
          let priceStr = (p['Prețul MDL'] || p['Preț MDL'] || p['Prețul'] || '0').toString().trim();
          priceStr = priceStr.replace(/['"]/g, '').replace(',', '.'); // Remove quotes and convert comma to dot
          const price = parseFloat(priceStr) || 0;
          
          // Get image URL
          const imageUrl = (p['link poza'] || p['link_poza'] || p['image_url'] || '').toString().trim() || null;
          
          return {
            category_id: categoryData.id,
            name: productName || 'Produs fără nume',
            manufacturer: manufacturer,
            country: country,
            price: price,
            image_url: imageUrl,
            stock_quantity: Math.floor(Math.random() * 50) + 10,
            sku: `${categoryData.id.substring(0, 4).toUpperCase()}-${String(Date.now() + idx).slice(-8)}`,
            is_available: true
          };
        });

      if (productsToInsert.length === 0) {
        console.log('Filtered products:', csvProducts.slice(0, 3));
        toast.error(`Nu s-au găsit produse valide în fișier. Verifică că fișierul are coloanele: Produs/Товар, Prețul MDL, Categorii, link poza`);
        return;
      }

      // Insert in batches of 100
      const batchSize = 100;
      let totalInserted = 0;

      for (let i = 0; i < productsToInsert.length; i += batchSize) {
        const batch = productsToInsert.slice(i, i + batchSize);
        const { error } = await supabase
          .from('products')
          .insert(batch);

        if (error) throw error;
        totalInserted += batch.length;
      }

      toast.success(`${totalInserted} produse importate cu succes în categoria "${categoryName}"!`);
      fetchProducts();
      setSelectedFile(null);
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Eroare la import: ' + (error as Error).message);
    } finally {
      setImporting(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setEditFormData({
      name: product.name,
      manufacturer: product.manufacturer,
      price: product.price,
      old_price: product.old_price,
      discount: product.discount,
      stock_quantity: product.stock_quantity,
      category_id: product.category_id,
    });
  };

  const handleSaveProduct = async () => {
    if (!editingProduct) return;

    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: editFormData.name,
          manufacturer: editFormData.manufacturer,
          price: editFormData.price,
          old_price: editFormData.old_price,
          discount: editFormData.discount,
          stock_quantity: editFormData.stock_quantity,
          category_id: editFormData.category_id,
        })
        .eq('id', editingProduct.id);

      if (error) {
        toast.error('Eroare la salvare: ' + error.message);
      } else {
        toast.success('Produs actualizat cu succes!');
        setEditingProduct(null);
        fetchProducts();
      }
    } catch (error) {
      toast.error('Eroare: ' + (error as Error).message);
    }
  };

  const handleDeleteProduct = async () => {
    if (!deletingProductId) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', deletingProductId);

      if (error) {
        toast.error('Eroare la ștergere: ' + error.message);
      } else {
        toast.success('Produs șters cu succes!');
        setDeletingProductId(null);
        fetchProducts();
      }
    } catch (error) {
      toast.error('Eroare: ' + (error as Error).message);
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
              <div className="bg-muted/50 p-4 rounded-lg text-sm space-y-3">
                <p className="font-semibold">📋 Format CSV așteptat:</p>
                <code className="text-xs bg-background p-2 rounded block overflow-x-auto whitespace-nowrap">
                  Produs,Producător,Țară,Prețul MDL,Categorii,link poza
                </code>
                <p className="text-xs text-muted-foreground space-y-1">
                  <div>✓ Coloane suportate (oricare din variantele Cyrilice sau Latin):</div>
                  <div className="ml-3">• Produs / Товар (obligatoriu)</div>
                  <div className="ml-3">• Producător / Производитель</div>
                  <div className="ml-3">• Țară / Страна</div>
                  <div className="ml-3">• Prețul MDL / Prețul (cu virgulă: 15,50 → 15.50)</div>
                  <div className="ml-3">• link poza / link_poza (URL imagine)</div>
                  <div className="mt-2">✓ Detectare categorie din nume fișier:</div>
                  <div className="ml-3">Ex: "Cuplu și sex - Cuplu și sex.csv" → Sănătate - Parafarmaceutice</div>
                </p>
              </div>
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
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Nu au fost găsite produse.
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">Imagine</TableHead>
                        <TableHead>Nume</TableHead>
                        <TableHead>Producător</TableHead>
                        <TableHead>Preț</TableHead>
                        <TableHead>Categorie</TableHead>
                        <TableHead>Stoc</TableHead>
                        <TableHead className="text-right">Acțiuni</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="w-10 h-10">
                              {product.image_url ? (
                                <img
                                  src={product.image_url}
                                  alt={product.name}
                                  className="w-full h-full object-cover rounded"
                                />
                              ) : (
                                <div className="w-full h-full bg-muted rounded flex items-center justify-center">
                                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">{product.name}</TableCell>
                          <TableCell>{product.manufacturer || '-'}</TableCell>
                          <TableCell>{product.price} MDL</TableCell>
                          <TableCell className="text-sm">{product.categories?.name || '-'}</TableCell>
                          <TableCell>{product.stock_quantity}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Dialog open={editingProduct?.id === product.id} onOpenChange={(open) => !open && setEditingProduct(null)}>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEditProduct(product)}
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-md">
                                  <DialogHeader>
                                    <DialogTitle>Editează produs</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label htmlFor="name">Nume</Label>
                                      <Input
                                        id="name"
                                        value={editFormData.name || ''}
                                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="manufacturer">Producător</Label>
                                      <Input
                                        id="manufacturer"
                                        value={editFormData.manufacturer || ''}
                                        onChange={(e) => setEditFormData({ ...editFormData, manufacturer: e.target.value })}
                                      />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label htmlFor="price">Preț</Label>
                                        <Input
                                          id="price"
                                          type="number"
                                          value={editFormData.price || ''}
                                          onChange={(e) => setEditFormData({ ...editFormData, price: parseFloat(e.target.value) })}
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="old_price">Preț vechi</Label>
                                        <Input
                                          id="old_price"
                                          type="number"
                                          value={editFormData.old_price || ''}
                                          onChange={(e) => setEditFormData({ ...editFormData, old_price: parseFloat(e.target.value) })}
                                        />
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label htmlFor="discount">Discount %</Label>
                                        <Input
                                          id="discount"
                                          type="number"
                                          value={editFormData.discount || ''}
                                          onChange={(e) => setEditFormData({ ...editFormData, discount: parseFloat(e.target.value) })}
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="stock">Stoc</Label>
                                        <Input
                                          id="stock"
                                          type="number"
                                          value={editFormData.stock_quantity || ''}
                                          onChange={(e) => setEditFormData({ ...editFormData, stock_quantity: parseInt(e.target.value) })}
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <Label htmlFor="category">Categorie</Label>
                                      <select
                                        id="category"
                                        value={editFormData.category_id || ''}
                                        onChange={(e) => setEditFormData({ ...editFormData, category_id: e.target.value })}
                                        className="w-full border rounded-md px-3 py-2 bg-background"
                                      >
                                        <option value="">Selectați categorie</option>
                                        {categories.map((cat) => (
                                          <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 pt-4">
                                      <Button
                                        variant="outline"
                                        onClick={() => setEditingProduct(null)}
                                      >
                                        Anulează
                                      </Button>
                                      <Button
                                        onClick={handleSaveProduct}
                                      >
                                        Salvează
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <AlertDialog open={deletingProductId === product.id} onOpenChange={(open) => !open && setDeletingProductId(null)}>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive hover:text-destructive"
                                    onClick={() => setDeletingProductId(product.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Ești sigur?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Aceasta va șterge permanent produsul "{product.name}". Această acțiune nu poate fi anulată.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <div className="flex gap-2">
                                    <AlertDialogCancel>Anulează</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={handleDeleteProduct}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Șterge
                                    </AlertDialogAction>
                                  </div>
                                </AlertDialogContent>
                              </AlertDialog>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <ImageIcon className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
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
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
