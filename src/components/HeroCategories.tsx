import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
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
      setCategories(categoriesData);
    }
  };

  const getCategoryShortName = (name: string) => {
    const shortNames: { [key: string]: string } = {
      'Sănătate - Medicamente OTC': 'Medicamente',
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
          {categories
            .filter(cat => cat.name !== 'Sănătate - Echipamente Medicale')
            .slice(0, 6)
            .map((cat) => (
            <Link
              key={cat.id}
              to={`/categorie/${cat.slug}`}
              className="flex items-center gap-2 whitespace-nowrap text-sm hover:text-primary transition-colors group"
            >
              <span className="font-medium group-hover:font-semibold">
                {getCategoryShortName(cat.name)}
              </span>
            </Link>
          ))}
          
          {/* Direct link to Protecție Solară */}
          <Link
            to={`/categorie/${getProtectionSolareSlug()}`}
            className="flex items-center gap-2 whitespace-nowrap text-sm hover:text-primary transition-colors group font-medium border-l pl-8"
          >
            <span>Protecție Solară</span>
          </Link>

          {/* Direct link to Optica */}
          <Link
            to={`/categorie/${getOpticsSlug()}`}
            className="flex items-center gap-2 whitespace-nowrap text-sm hover:text-primary transition-colors group font-medium"
          >
            <span>Optică</span>
          </Link>

          {/* Direct link to Îngrijire Corp/Față */}
          <Link
            to={`/categorie/${getSkinCareSlug()}`}
            className="flex items-center gap-2 whitespace-nowrap text-sm hover:text-primary transition-colors group font-medium"
          >
            <span>Îngrijire Corp/Față</span>
          </Link>

          {/* Direct link to Îngrijire Păr */}
          <Link
            to={`/categorie/${getHairCareSlug()}`}
            className="flex items-center gap-2 whitespace-nowrap text-sm hover:text-primary transition-colors group font-medium"
          >
            <span>Îngrijire Păr</span>
          </Link>

          {/* Direct link to Igienă Personală */}
          <Link
            to={`/categorie/${getPersonalHygieneSlug()}`}
            className="flex items-center gap-2 whitespace-nowrap text-sm hover:text-primary transition-colors group font-medium"
          >
            <span>Igienă Personală</span>
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
