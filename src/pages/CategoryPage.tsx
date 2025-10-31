import { useParams, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

const CategoryPage = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  const getCategoryDisplayName = (name: string) => {
    const displayNames: { [key: string]: string } = {
      'Sănătate - Parafarmaceutice': 'Cuplu și sex',
      'Sănătate - Medicamente OTC': 'Medicamente OTC',
      'Vitamine și Minerale': 'Vitamine și Minerale',
      'Frumusețe și Igienă - Protecție Solară': 'Protecție Solară',
      'Frumusețe și Igienă - Îngrijire Corp/Față': 'Îngrijire Corp/Față',
      'Frumusețe și Igienă - Îngrijire Păr': 'Îngrijire Păr',
      'Frumusețe și Igienă - Igienă Personală': 'Igienă Personală',
      'Mamă și Copil': 'Mamă și Copil',
      'Sănătate - Echipamente Medicale': 'Echipamente Medicale',
      'Sănătate - Articole Ortopedice': 'Articole Ortopedice',
      'Sănătate - Plante Medicinale': 'Plante Medicinale',
    };
    return displayNames[name] || name;
  };

  useEffect(() => {
    fetchCategory();
    // Scroll to top when category changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const fetchCategory = async () => {
    setLoading(true);
    
    const { data: categoryData, error: catError } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (catError) {
      console.error('Category error:', catError);
    } else {
      setCategory(categoryData);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Skeleton className="h-12 w-64 mb-6" />
          <Skeleton className="h-8 w-96 mb-8" />
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
          <Link to="/" className="text-primary hover:underline">
            ← Înapoi la pagina principală
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
          <span className="text-foreground">{getCategoryDisplayName(category.name)}</span>
        </div>

        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-5xl">{category.icon}</span>
            <div>
              <h1 className="text-4xl font-bold text-foreground">{getCategoryDisplayName(category.name)}</h1>
              <p className="text-muted-foreground mt-1">{category.description}</p>
            </div>
          </div>
        </div>

        {/* Product Grid Component */}
        <ProductGrid 
          categoryId={category.id}
          showFilters={true}
          itemsPerPage={20}
        />
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;