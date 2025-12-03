import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { 
  Pill, 
  Apple, 
  Leaf, 
  Baby, 
  Sparkles, 
  Sun, 
  Scissors, 
  Bath, 
  Eye, 
  Stethoscope, 
  Heart
} from "lucide-react";

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

  const getCategoryIcon = (name: string) => {
    const iconClass = "w-4 h-4";
    const iconMap: { [key: string]: React.ReactNode } = {
      'Sănătate - Medicamente OTC': <Pill className={iconClass} />,
      'Vitamine și Minerale': <Apple className={iconClass} />,
      'Sănătate - Plante Medicinale': <Leaf className={iconClass} />,
      'Mamă și Copil': <Baby className={iconClass} />,
      'Frumusețe și Igienă - Îngrijire Corp/Față': <Sparkles className={iconClass} />,
      'Frumusețe și Igienă - Protecție Solară': <Sun className={iconClass} />,
      'Frumusețe și Igienă - Îngrijire Păr': <Scissors className={iconClass} />,
      'Frumusețe și Igienă - Igienă Personală': <Bath className={iconClass} />,
      'Sănătate - Echipamente Medicale': <Eye className={iconClass} />,
      'Sănătate - Articole Ortopedice': <Stethoscope className={iconClass} />,
      'Sănătate - Parafarmaceutice': <Heart className={iconClass} />,
    };
    return iconMap[name] || <Pill className={iconClass} />;
  };

  const isActive = (slug: string) => {
    return location.pathname === `/categorie/${slug}`;
  };

  const handleCategoryClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="hidden lg:block w-full bg-gradient-to-b from-white to-green-50/30 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex items-center gap-2 py-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categorie/${category.slug}`}
                onClick={handleCategoryClick}
                className={`group flex items-center gap-2.5 py-2.5 px-4 rounded-xl transition-all duration-200 whitespace-nowrap ${
                  isActive(category.slug)
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'hover:bg-green-50 hover:shadow-sm text-gray-700 hover:text-green-700'
                }`}
              >
                <span className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
                  isActive(category.slug)
                    ? 'bg-white/20'
                    : 'bg-green-100/50 group-hover:bg-green-100'
                }`}>
                  {getCategoryIcon(category.name)}
                </span>
                <span className="font-medium text-sm">{getCategoryShortName(category.name)}</span>
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="h-1.5" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default HorizontalCategories;
