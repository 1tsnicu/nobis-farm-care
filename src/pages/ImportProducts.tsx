import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Database, Upload, CheckCircle2, AlertCircle, Trash2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const ImportProducts = () => {
  const [importing, setImporting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [productCount, setProductCount] = useState<number | null>(null);
  const [importedCount, setImportedCount] = useState(0);
  const [result, setResult] = useState<{ success: boolean; imported?: number; error?: string } | null>(null);

  const checkProductCount = async () => {
    const { count, error } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });
    
    if (!error) {
      setProductCount(count || 0);
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm('Sigur vrei să ștergi TOATE produsele din baza de date? Această acțiune este ireversibilă!')) {
      return;
    }

    setDeleting(true);
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      if (error) throw error;

      toast.success('Toate produsele au fost șterse!');
      setProductCount(0);
      setImportedCount(0);
    } catch (error: any) {
      toast.error(`Eroare: ${error.message}`);
    } finally {
      setDeleting(false);
    }
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

  const handleFullImport = async () => {
    setImporting(true);
    setProgress(0);
    setResult(null);
    setImportedCount(0);

    try {
      // Fetch CSV file
      const response = await fetch('/data/products.csv');
      const csvText = await response.text();
      const lines = csvText.split('\n').filter(line => line.trim());
      
      console.log(`CSV loaded: ${lines.length} lines`);
      
      // Skip header
      const dataLines = lines.slice(1);
      console.log(`Processing ${dataLines.length} products`);

      // Get categories
      const { data: categories } = await supabase
        .from('categories')
        .select('id, name');

      if (!categories) throw new Error('Nu s-au găsit categorii');

      const categoryMap = new Map(categories.map(c => [c.name, c.id]));

      // Process in batches of 100
      const batchSize = 100;
      let totalImported = 0;

      for (let i = 0; i < dataLines.length; i += batchSize) {
        const batch = dataLines.slice(i, i + batchSize);
        const productsToInsert: any[] = [];

        for (const line of batch) {
          const fields = parseCSVLine(line);
          if (fields.length < 6) continue;

          const [_, category, name, manufacturer, country, priceStr] = fields;
          
          // Convert price (virgulă -> punct)
          const price = parseFloat(priceStr.replace(',', '.')) || 0;
          if (price <= 0) continue;

          const categoryId = categoryMap.get(category.trim());
          if (!categoryId) {
            console.warn(`Category not found: ${category}`);
            continue;
          }

          productsToInsert.push({
            category_id: categoryId,
            name: name.trim(),
            manufacturer: manufacturer.trim() || null,
            country: country.trim() || null,
            price: price,
            stock_quantity: Math.floor(Math.random() * 100),
            sku: `PRD-${String(totalImported + productsToInsert.length + 1).padStart(6, '0')}`,
            is_available: true
          });
        }

        if (productsToInsert.length > 0) {
          const { error } = await supabase
            .from('products')
            .insert(productsToInsert);

          if (error) {
            console.error('Batch insert error:', error);
            throw error;
          }

          totalImported += productsToInsert.length;
          setImportedCount(totalImported);
          setProgress((totalImported / dataLines.length) * 100);
          
          console.log(`Imported ${totalImported}/${dataLines.length}`);
        }
      }

      setResult({ success: true, imported: totalImported });
      toast.success(`${totalImported} produse importate cu succes!`);
      await checkProductCount();

    } catch (error: any) {
      console.error('Import error:', error);
      setResult({ success: false, error: error.message });
      toast.error(`Eroare: ${error.message}`);
    } finally {
      setImporting(false);
    }
  };

  useState(() => {
    checkProductCount();
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <Database className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold mb-2">Import Produse</h1>
            <p className="text-muted-foreground">
              Importă 2,942 produse din fișierul CSV în baza de date
            </p>
            {productCount !== null && (
              <div className="mt-4 inline-block bg-primary/10 px-6 py-3 rounded-full">
                <span className="text-2xl font-bold text-primary">
                  {productCount}
                </span>
                <span className="text-sm text-muted-foreground ml-2">produse în DB</span>
              </div>
            )}
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Import Complet</CardTitle>
              <CardDescription>
                Toate cele 2,942 produse din Excel • 12 categorii • 105+ producători
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {importing && (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Progres import</span>
                    <span>{importedCount} / 2,942 ({Math.round(progress)}%)</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <p className="text-xs text-muted-foreground text-center">
                    Se importă în loturi de 100 produse...
                  </p>
                </div>
              )}

              {result && (
                <div className={`flex items-start gap-3 p-4 rounded-lg ${result.success ? 'bg-green-50 dark:bg-green-950 border border-green-200' : 'bg-red-50 dark:bg-red-950 border border-red-200'}`}>
                  {result.success ? (
                    <>
                      <CheckCircle2 className="w-6 h-6 text-green-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold text-green-900 dark:text-green-100 text-lg">
                          ✅ Import Reușit!
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                          <span className="font-bold">{result.imported}</span> produse au fost importate cu succes în baza de date.
                        </p>
                        <Button
                          variant="link"
                          className="text-green-700 dark:text-green-300 p-0 h-auto mt-2"
                          onClick={() => window.location.href = '/admin/produse'}
                        >
                          Vezi produsele →
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-6 h-6 text-red-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-red-900 dark:text-red-100">Eroare la Import</p>
                        <p className="text-sm text-red-700 dark:text-red-300">{result.error}</p>
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="grid gap-3">
                <Button
                  onClick={handleFullImport}
                  disabled={importing || deleting}
                  className="w-full"
                  size="lg"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  {importing ? `Import în curs... ${importedCount} produse` : 'Importă Toate Produsele (2,942)'}
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={checkProductCount}
                    disabled={importing || deleting}
                    variant="outline"
                    size="lg"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Actualizează
                  </Button>

                  <Button
                    onClick={handleDeleteAll}
                    disabled={importing || deleting || productCount === 0}
                    variant="destructive"
                    size="lg"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {deleting ? 'Ștergere...' : 'Șterge Tot'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-muted/50 rounded-lg p-6 space-y-4">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Database className="w-4 h-4" />
                Despre Import
              </h3>
              <p className="text-sm text-muted-foreground">
                Sistemul va importa toate produsele din fișierul CSV în loturi de 100.
                Fiecare produs primește automat un SKU unic și stoc generat aleatoriu (0-100 bucăți).
              </p>
            </div>
            
            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-3">📦 Categorii (12):</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>💊 Medicamente OTC</div>
                <div>🌟 Vitamine și Minerale</div>
                <div>⚕️ Parafarmaceutice</div>
                <div>👶 Mamă și Copil</div>
                <div>🩺 Echipamente Medicale</div>
                <div>🌿 Plante Medicinale</div>
                <div>✨ Îngrijire Corp/Față</div>
                <div>🧴 Igienă Personală</div>
                <div>☀️ Protecție Solară</div>
                <div>💇 Îngrijire Păr</div>
                <div>💄 Dermato-Cosmetică</div>
                <div>💅 Cosmetică Decorativă</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ImportProducts;