import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  products_count?: number;
}

const HeroCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategoriesWithCount();
  }, []);

  const fetchCategoriesWithCount = async () => {
    // Fetch categories
    const { data: categoriesData } = await supabase
      .from('categories')
      .select('*')
      .order('display_order');

    if (categoriesData) {
      // Fetch product counts for each category
      const categoriesWithCount = await Promise.all(
        categoriesData.map(async (cat) => {
          const { count } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', cat.id);
          
          return {
            ...cat,
            products_count: count || 0
          };
        })
      );
      
      setCategories(categoriesWithCount);
    }
  };

  const getCategoryShortName = (name: string) => {
    const shortNames: { [key: string]: string } = {
      'Sănătate - Medicamente OTC': 'Medicamente OTC',
      'Vitamine și Minerale': 'Vitamine și Minerale',
      'Sănătate - Parafarmaceutice': 'Cuplu și sex',
      'Mamă și Copil': 'Mamă și Copil',
      'Sănătate - Echipamente Medicale': 'Echipamente Medicale',
      'Sănătate - Articole Ortopedice': 'Articole Ortopedice',
      'Frumusețe și Igienă - Igienă Personală': 'Igienă Personală',
      'Frumusețe și Igienă - Protecție Solară': 'Protecție Solară',
      'Frumusețe și Igienă - Îngrijire Corp/Față': 'Îngrijire Corp/Față',
      'Frumusețe și Igienă - Îngrijire Păr': 'Îngrijire Păr',
      'Sănătate - Plante Medicinale': 'Plante Medicinale',
      'Dermato-Cosmetică': 'Dermatocosmetică',
    };
    return shortNames[name] || name;
  };

  const getProtectionSolareSlug = () => {
    const protectionCategory = categories.find(
      cat => cat.name === 'Frumusețe și Igienă - Protecție Solară'
    );
    return protectionCategory?.slug || 'frumusete-si-igiena-protectie-solara';
  };

  const getMedicinalPlantsSlug = () => {
    const plantsCategory = categories.find(
      cat => cat.name === 'Sănătate - Plante Medicinale'
    );
    return plantsCategory?.slug || 'sanate-plante-medicinale';
  };

  const getOpticsSlug = () => {
    const opticsCategory = categories.find(
      cat => cat.name === 'Sănătate - Echipamente Medicale'
    );
    return opticsCategory?.slug || 'sanate-echipamente-medicale';
  };

  const getSkinCareSlug = () => {
    const skinCareCategory = categories.find(
      cat => cat.name === 'Frumusețe și Igienă - Îngrijire Corp/Față'
    );
    return skinCareCategory?.slug || 'frumusete-si-igiena-ingrijire-corp-fata';
  };

  const getHairCareSlug = () => {
    const hairCareCategory = categories.find(
      cat => cat.name === 'Frumusețe și Igienă - Îngrijire Păr'
    );
    return hairCareCategory?.slug || 'frumusete-si-igiena-ingrijire-par';
  };

  const getMedicalDevicesSlug = () => {
    const medicalDevicesCategory = categories.find(
      cat => cat.name === 'Sănătate - Articole Ortopedice'
    );
    return medicalDevicesCategory?.slug || 'sanate-articole-ortopedice';
  };

  const getBabyProductsSlug = () => {
    const babyCategory = categories.find(
      cat => cat.name === 'Mamă și Copil'
    );
    return babyCategory?.slug || 'mama-si-copil';
  };

  const getPersonalHygieneSlug = () => {
    const hygieneCategory = categories.find(
      cat => cat.name === 'Frumusețe și Igienă - Igienă Personală'
    );
    return hygieneCategory?.slug || 'frumusete-si-igiena-igiena-personala';
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-8 overflow-x-auto py-4 scrollbar-hide">
          {categories.slice(0, 6).map((cat) => (
            <Link
              key={cat.id}
              to={`/categorie/${cat.slug}`}
              className="flex items-center gap-2 whitespace-nowrap text-sm hover:text-primary transition-colors group"
            >
              <span className="font-medium group-hover:font-semibold">
                {getCategoryShortName(cat.name)}
              </span>
              <span className="text-muted-foreground">
                ({cat.products_count || 0})
              </span>
            </Link>
          ))}
          
          {/* Direct link to Protecție Solară */}
          <Link
            to={`/categorie/${getProtectionSolareSlug()}`}
            className="flex items-center gap-2 whitespace-nowrap text-sm hover:text-primary transition-colors group font-medium border-l pl-8"
          >
            <span>☀️ Protecție Solară</span>
          </Link>

          {/* Direct link to Plante Medicinale */}
          <Link
            to={`/categorie/${getMedicinalPlantsSlug()}`}
            className="flex items-center gap-2 whitespace-nowrap text-sm hover:text-primary transition-colors group font-medium"
          >
            <span>🌿 Plante Medicinale</span>
          </Link>

          {/* Direct link to Optica */}
          <Link
            to={`/categorie/${getOpticsSlug()}`}
            className="flex items-center gap-2 whitespace-nowrap text-sm hover:text-primary transition-colors group font-medium"
          >
            <span>👓 Optică</span>
          </Link>

          {/* Direct link to Îngrijire Corp/Față */}
          <Link
            to={`/categorie/${getSkinCareSlug()}`}
            className="flex items-center gap-2 whitespace-nowrap text-sm hover:text-primary transition-colors group font-medium"
          >
            <span>✨ Îngrijire Corp/Față</span>
          </Link>

          {/* Direct link to Îngrijire Păr */}
          <Link
            to={`/categorie/${getHairCareSlug()}`}
            className="flex items-center gap-2 whitespace-nowrap text-sm hover:text-primary transition-colors group font-medium"
          >
            <span>💇 Îngrijire Păr</span>
          </Link>

          {/* Direct link to Articole Ortopedice */}
          <Link
            to={`/categorie/${getMedicalDevicesSlug()}`}
            className="flex items-center gap-2 whitespace-nowrap text-sm hover:text-primary transition-colors group font-medium"
          >
            <span>🏥 Articole Ortopedice</span>
          </Link>

          {/* Direct link to Mamă și Copil */}
          <Link
            to={`/categorie/${getBabyProductsSlug()}`}
            className="flex items-center gap-2 whitespace-nowrap text-sm hover:text-primary transition-colors group font-medium"
          >
            <span>👶 Mamă și Copil</span>
          </Link>

          {/* Direct link to Igienă Personală */}
          <Link
            to={`/categorie/${getPersonalHygieneSlug()}`}
            className="flex items-center gap-2 whitespace-nowrap text-sm hover:text-primary transition-colors group font-medium"
          >
            <span>🧼 Igienă Personală</span>
          </Link>
          
          <Link
            to="/blog"
            className="whitespace-nowrap text-sm hover:text-primary transition-colors font-medium"
          >
            Blog
          </Link>
          <Link
            to="/contact"
            className="whitespace-nowrap text-sm hover:text-primary transition-colors font-medium"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HeroCategories;
