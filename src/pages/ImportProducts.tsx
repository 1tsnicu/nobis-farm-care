import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Database, Upload, CheckCircle2, AlertCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

// Sample of products data - în producție, aceasta ar veni din fișierul Excel complet
const SAMPLE_PRODUCTS = [
  { cat: 'Mamă și Copil', name: 'Scaunel prima pappa balloon beige+diner savana azzur', mfg: '', country: 'Italia', price: 75.01 },
  { cat: 'Sănătate - Medicamente OTC', name: 'Aciclovir caps. 200 mg N10x3 (Balkan)', mfg: 'Balkan Pharmaceuticals SRL, SC', country: 'Republica Moldova', price: 61.04 },
  { cat: 'Sănătate - Medicamente OTC', name: 'Algodex sol. inj./conc./sol.perf. 25mg/ml 2ml N10 Balkan', mfg: 'Balkan Pharmaceuticals SRL, SC', country: 'Republica Moldova', price: 114.27 },
  { cat: 'Sănătate - Medicamente OTC', name: 'Ambroxol comp.30mg N20 (Balkan)', mfg: 'Balkan Pharmaceuticals SRL, SC', country: 'Republica Moldova', price: 24.14 },
  { cat: 'Sănătate - Medicamente OTC', name: 'Analgina-BP comp. 500mg N10 (Balkan)', mfg: 'Balkan Pharmaceuticals SRL, SC', country: 'Republica Moldova', price: 10.42 },
  { cat: 'Vitamine și Minerale', name: 'Berberine 500mg + Chromium 40µg caps. N60 Balkan', mfg: 'Balkan Pharmaceuticals SRL, SC', country: 'Republica Moldova', price: 539.75 },
  { cat: 'Sănătate - Medicamente OTC', name: 'Carbactiv caps. 200mg N100 Balkan', mfg: 'Balkan Pharmaceuticals SRL, SC', country: 'Republica Moldova', price: 61.6 },
  { cat: 'Vitamine și Minerale', name: 'Immuno Veda comp. N30', mfg: 'Konark Ayurveda', country: 'India', price: 140 },
  { cat: 'Vitamine și Minerale', name: 'Join Support Ultra pulbere 14g N30 Balkan', mfg: 'Balkan Pharmaceuticals SRL, SC', country: 'Republica Moldova', price: 1050 },
  { cat: 'Sănătate - Medicamente OTC', name: 'Citramon-BP comp. N10 (Balkan)', mfg: 'Balkan Pharmaceuticals SRL, SC', country: 'Republica Moldova', price: 5.1 },
];

const ImportProducts = () => {
  const [importing, setImporting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [productCount, setProductCount] = useState<number | null>(null);
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
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

      if (error) throw error;

      toast.success('Toate produsele au fost șterse!');
      setProductCount(0);
    } catch (error: any) {
      toast.error(`Eroare: ${error.message}`);
    } finally {
      setDeleting(false);
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

      // Prepare products with unique SKUs
      const existingCount = productCount || 0;
      const productsToInsert = SAMPLE_PRODUCTS.map((p, idx) => ({
        category_id: categoryMap.get(p.cat),
        name: p.name,
        manufacturer: p.mfg,
        country: p.country,
        price: p.price,
        stock_quantity: Math.floor(Math.random() * 100),
        sku: `PRD-${String(existingCount + idx + 1).padStart(6, '0')}`,
        is_available: true
      })).filter(p => p.category_id);

      const { error } = await supabase
        .from('products')
        .insert(productsToInsert);

      if (error) throw error;

      setResult({ success: true, imported: productsToInsert.length });
      setProgress(100);
      toast.success(`${productsToInsert.length} produse importate!`);
      checkProductCount();

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
              Importă produse din fișierul Excel în baza de date
            </p>
            {productCount !== null && (
              <div className="mt-4 inline-block bg-primary/10 px-6 py-2 rounded-full">
                <span className="text-lg font-semibold text-primary">
                  {productCount} produse în baza de date
                </span>
              </div>
            )}
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Status Import</CardTitle>
              <CardDescription>
                12 categorii • Import câte 10 produse odată pentru test
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
                  disabled={importing || deleting}
                  className="w-full"
                  size="lg"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {importing ? 'Import în curs...' : 'Importă 10 Produse Sample'}
                </Button>

                <Button
                  onClick={handleDeleteAll}
                  disabled={importing || deleting || productCount === 0}
                  variant="destructive"
                  className="w-full"
                  size="lg"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {deleting ? 'Ștergere în curs...' : 'Șterge Toate Produsele'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="bg-muted/50 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold">📝 Instrucțiuni:</h3>
            <ol className="text-sm space-y-2 list-decimal list-inside">
              <li>Apasă butonul "Importă 10 Produse Sample" pentru a adăuga produse de test</li>
              <li>Poți apăsa butonul de mai multe ori pentru a adăuga mai multe loturi</li>
              <li>Vizualizează produsele la /admin/produse</li>
              <li>Folosește "Șterge Toate" pentru a reseta baza de date</li>
            </ol>
            
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold mb-3">Categorii disponibile:</h3>
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