import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

const HorizontalCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const location = useLocation();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
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
      'Vitamine și Minerale': 'Vitamine',
      'Sănătate - Parafarmaceutice': 'Cuplu și Sex',
      'Mamă și Copil': 'Mamă & Copil',
      'Sănătate - Echipamente Medicale': 'Echipamente',
      'Sănătate - Plante Medicinale': 'Plante',
      'Frumusețe și Igienă - Îngrijire Corp/Față': 'Corp/Față',
      'Frumusețe și Igienă - Igienă Personală': 'Igienă',
      'Frumusețe și Igienă - Protecție Solară': 'Protecție Solară',
      'Frumusețe și Igienă - Îngrijire Păr': 'Păr',
      'Sănătate - Articole Ortopedice': 'Ortopedice',
    };
    return shortNames[name] || name;
  };

  const isActive = (slug: string) => {
    return location.pathname === `/categorie/${slug}`;
  };

  const handleCategoryClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="hidden lg:block w-full bg-gradient-to-r from-green-50 to-emerald-50/50 border-b border-green-100/50">
      <div className="container mx-auto px-4">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex items-center gap-1 py-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categorie/${category.slug}`}
                onClick={handleCategoryClick}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-200 text-sm font-medium whitespace-nowrap ${
                  isActive(category.slug)
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'hover:bg-white hover:shadow-sm text-gray-700 hover:text-green-700'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{getCategoryShortName(category.name)}</span>
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="h-2" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default HorizontalCategories;
