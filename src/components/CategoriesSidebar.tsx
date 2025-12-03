import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
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
  Heart,
  ChevronRight
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

interface CategoryItem {
  name: string;
  slug: string | null;
  icon: React.ReactNode;
}

const CategoriesSidebar = () => {
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

  const getCategorySlug = (categoryName: string): string | null => {
    const category = categories.find(cat => cat.name === categoryName);
    return category?.slug || null;
  };

  const iconClass = "w-5 h-5 transition-transform group-hover:scale-110";

  // Structura categoriilor cu icoane
  const categoryStructure: CategoryItem[] = useMemo(() => [
    {
      name: "Medicamente",
      slug: getCategorySlug("Sănătate - Medicamente OTC"),
      icon: <Pill className={iconClass} />,
    },
    {
      name: "Vitamine și Minerale",
      slug: getCategorySlug("Vitamine și Minerale"),
      icon: <Apple className={iconClass} />,
    },
    {
      name: "Plante Medicinale",
      slug: getCategorySlug("Sănătate - Plante Medicinale"),
      icon: <Leaf className={iconClass} />,
    },
    {
      name: "Mamă și Copil",
      slug: getCategorySlug("Mamă și Copil"),
      icon: <Baby className={iconClass} />,
    },
    {
      name: "Îngrijire Corp/Față",
      slug: getCategorySlug("Frumusețe și Igienă - Îngrijire Corp/Față"),
      icon: <Sparkles className={iconClass} />,
    },
    {
      name: "Protecție Solară",
      slug: getCategorySlug("Frumusețe și Igienă - Protecție Solară"),
      icon: <Sun className={iconClass} />,
    },
    {
      name: "Îngrijire Păr",
      slug: getCategorySlug("Frumusețe și Igienă - Îngrijire Păr"),
      icon: <Scissors className={iconClass} />,
    },
    {
      name: "Igienă Personală",
      slug: getCategorySlug("Frumusețe și Igienă - Igienă Personală"),
      icon: <Bath className={iconClass} />,
    },
    {
      name: "Optică",
      slug: getCategorySlug("Sănătate - Echipamente Medicale"),
      icon: <Eye className={iconClass} />,
    },
    {
      name: "Articole Ortopedice",
      slug: getCategorySlug("Sănătate - Articole Ortopedice"),
      icon: <Stethoscope className={iconClass} />,
    },
    {
      name: "Cuplu și Sex",
      slug: getCategorySlug("Sănătate - Parafarmaceutice"),
      icon: <Heart className={iconClass} />,
    },
  ], [categories]);

  const handleCategoryClick = () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  };

  const isActive = (slug: string | null) => {
    if (!slug) return false;
    return location.pathname === `/categorie/${slug}`;
  };

  const renderCategoryItem = (item: CategoryItem, index: number) => {
    const active = isActive(item.slug);
    
    if (item.slug) {
      return (
        <Link
          key={item.name}
          to={`/categorie/${item.slug}`}
          onClick={handleCategoryClick}
          className={`group flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-200 ${
            active 
              ? 'bg-primary text-primary-foreground shadow-md' 
              : 'hover:bg-green-50 hover:shadow-sm text-gray-700 hover:text-green-700'
          }`}
          style={{ animationDelay: `${index * 30}ms` }}
        >
          <span className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
            active 
              ? 'bg-white/20' 
              : 'bg-green-100/50 group-hover:bg-green-100'
          }`}>
            {item.icon}
          </span>
          <span className="font-medium text-sm flex-1">{item.name}</span>
          <ChevronRight className={`w-4 h-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 ${
            active ? 'opacity-100 translate-x-0' : ''
          }`} />
        </Link>
      );
    }

    return (
      <div
        key={item.name}
        className="group flex items-center gap-3 py-3 px-4 rounded-xl text-gray-400 cursor-not-allowed"
      >
        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100">
          {item.icon}
        </span>
        <span className="font-medium text-sm">{item.name}</span>
      </div>
    );
  };

  return (
    <aside className="hidden lg:block w-72 bg-gradient-to-b from-white to-green-50/30 border-r border-gray-100 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
      <div className="p-5">
        {/* Categories List */}
        <nav className="space-y-1">
          {categoryStructure.map((item, index) => renderCategoryItem(item, index))}
        </nav>
      </div>
    </aside>
  );
};

export default CategoriesSidebar;
