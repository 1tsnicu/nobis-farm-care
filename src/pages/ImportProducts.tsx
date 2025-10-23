import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Database, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const ImportProducts = () => {
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ success: boolean; imported?: number; error?: string } | null>(null);

  const handleImportFromFile = async () => {
    setImporting(true);
    setProgress(0);
    setResult(null);

    try {
      // Read the parsed Excel file
      const response = await fetch('/tool-results://document--parse_document/20251223-123921-926378');
      const text = await response.text();
      
      // Parse table data
      const lines = text.split('\n').filter(line => line.startsWith('|'));
      const products = lines.slice(1).map(line => {
        const parts = line.split('|').filter(p => p.trim());
        return {
          'Nr.': parseInt(parts[0]) || 0,
          'Categorie': parts[1]?.trim() || '',
          'Produs': parts[2]?.trim() || '',
          'Producător': parts[3]?.trim() || '',
          'Țară': parts[4]?.trim() || '',
          'Preț (MDL)': parseFloat(parts[5]) || 0
        };
      }).filter(p => p['Nr.'] > 0 && p.Categorie && p.Produs);

      console.log(`Importing ${products.length} products...`);
      toast.info(`Pregătire import: ${products.length} produse`);

      // Import in batches
      const batchSize = 100;
      let imported = 0;

      for (let i = 0; i < products.length; i += batchSize) {
        const batch = products.slice(i, i + batchSize);
        
        const { data, error } = await supabase.functions.invoke('import-products', {
          body: { products: batch }
        });

        if (error) {
          console.error('Import error:', error);
          throw error;
        }

        imported += data?.imported || 0;
        setProgress((imported / products.length) * 100);
        toast.info(`Importat: ${imported}/${products.length} produse`);
      }

      setResult({ success: true, imported });
      toast.success(`Import finalizat! ${imported} produse adăugate în baza de date.`);

    } catch (error: any) {
      console.error('Import failed:', error);
      setResult({ success: false, error: error.message });
      toast.error(`Eroare la import: ${error.message}`);
    } finally {
      setImporting(false);
    }
  };

  const handleDirectImport = async () => {
    setImporting(true);
    setProgress(0);
    setResult(null);

    try {
      // Get categories
      const { data: categories } = await supabase
        .from('categories')
        .select('id, name');

      if (!categories) throw new Error('Nu s-au găsit categorii');

      const categoryMap = new Map(categories.map(c => [c.name, c.id]));

      // Sample products data - first 10 for testing
      const testProducts = [
        { cat: 'Mamă și Copil', name: 'Scaunel prima pappa balloon beige+diner savana azzur', mfg: '', country: 'Italia', price: 75.01 },
        { cat: 'Sănătate - Medicamente OTC', name: 'Aciclovir caps. 200 mg N10x3 (Balkan)', mfg: 'Balkan Pharmaceuticals SRL, SC', country: 'Republica Moldova', price: 61.04 },
        { cat: 'Sănătate - Medicamente OTC', name: 'Algodex sol. inj./conc./sol.perf. 25mg/ml 2ml N10 Balkan', mfg: 'Balkan Pharmaceuticals SRL, SC', country: 'Republica Moldova', price: 114.27 },
        { cat: 'Sănătate - Medicamente OTC', name: 'Ambroxol comp.30mg N20 (Balkan)', mfg: 'Balkan Pharmaceuticals SRL, SC', country: 'Republica Moldova', price: 24.14 },
        { cat: 'Sănătate - Medicamente OTC', name: 'Analgina-BP comp. 500mg N10 (Balkan)', mfg: 'Balkan Pharmaceuticals SRL, SC', country: 'Republica Moldova', price: 10.42 },
        { cat: 'Sănătate - Medicamente OTC', name: 'Analgina-BP sol. inj. 500 mg/ml 2ml N10 (Balkan)', mfg: 'Balkan Pharmaceuticals SRL, SC', country: 'Republica Moldova', price: 27.09 },
        { cat: 'Vitamine și Minerale', name: 'Berberine 500mg + Chromium 40µg caps. N60 Balkan', mfg: 'Balkan Pharmaceuticals SRL, SC', country: 'Republica Moldova', price: 539.75 },
        { cat: 'Sănătate - Medicamente OTC', name: 'Carbactiv caps. 200mg N100 Balkan', mfg: 'Balkan Pharmaceuticals SRL, SC', country: 'Republica Moldova', price: 61.6 },
        { cat: 'Sănătate - Medicamente OTC', name: 'Carbodetox comp. 250mg N10 Balkan', mfg: 'Balkan Pharmaceuticals SRL, SC', country: 'Republica Moldova', price: 3.27 },
        { cat: 'Sănătate - Medicamente OTC', name: 'Citramon-BP comp. N10 (Balkan)', mfg: 'Balkan Pharmaceuticals SRL, SC', country: 'Republica Moldova', price: 5.1 },
      ];

      const productsToInsert = testProducts.map((p, idx) => ({
        category_id: categoryMap.get(p.cat),
        name: p.name,
        manufacturer: p.mfg,
        country: p.country,
        price: p.price,
        stock_quantity: Math.floor(Math.random() * 100),
        sku: `PRD-${String(idx + 1).padStart(6, '0')}`,
        is_available: true
      })).filter(p => p.category_id);

      const { error } = await supabase
        .from('products')
        .insert(productsToInsert);

      if (error) throw error;

      setResult({ success: true, imported: productsToInsert.length });
      setProgress(100);
      toast.success(`${productsToInsert.length} produse de test importate!`);

    } catch (error: any) {
      console.error('Import error:', error);
      setResult({ success: false, error: error.message });
      toast.error(`Eroare: ${error.message}`);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <Database className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold mb-2">Import Produse</h1>
            <p className="text-muted-foreground">
              Importă cele 2,942 produse din fișierul Excel în baza de date
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Status Import</CardTitle>
              <CardDescription>
                12 categorii • 105+ producători • 2,942 produse
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {importing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progres import</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              )}

              {result && (
                <div className={`flex items-start gap-3 p-4 rounded-lg ${result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  {result.success ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-green-900">Import Reușit!</p>
                        <p className="text-sm text-green-700">
                          {result.imported} produse au fost importate cu succes în baza de date.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-red-900">Eroare la Import</p>
                        <p className="text-sm text-red-700">{result.error}</p>
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="grid gap-3">
                <Button
                  onClick={handleDirectImport}
                  disabled={importing}
                  className="w-full"
                  size="lg"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {importing ? 'Import în curs...' : 'Import Produse Test (10)'}
                </Button>

                <Button
                  onClick={handleImportFromFile}
                  disabled={importing}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <Database className="w-4 h-4 mr-2" />
                  {importing ? 'Import în curs...' : 'Import Complet (2,942 produse)'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="bg-muted/50 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold">Categorii disponibile:</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>💊 Medicamente OTC (1,296)</div>
              <div>🌟 Vitamine și Minerale (835)</div>
              <div>⚕️ Parafarmaceutice (393)</div>
              <div>👶 Mamă și Copil (190)</div>
              <div>🩺 Echipamente Medicale (63)</div>
              <div>🌿 Plante Medicinale (46)</div>
              <div>✨ Îngrijire Corp/Față (33)</div>
              <div>🧴 Igienă Personală (31)</div>
              <div>☀️ Protecție Solară (26)</div>
              <div>💇 Îngrijire Păr (17)</div>
              <div>💄 Dermato-Cosmetică (11)</div>
              <div>💅 Cosmetică Decorativă (1)</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ImportProducts;