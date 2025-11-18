import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

interface CategoryItem {
  name: string;
  slug: string | null;
}

const CategoriesSidebar = () => {
  const [categories, setCategories] = useState<Category[]>([]);

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

  // Structura categoriilor în ordinea specificată - toate ca categorii separate
  const categoryStructure: CategoryItem[] = useMemo(() => [
    {
      name: "Medicamente",
      slug: getCategorySlug("Sănătate - Medicamente OTC"),
    },
    {
      name: "Vitamine și Minerale",
      slug: getCategorySlug("Vitamine și Minerale"),
    },
    {
      name: "Plante Medicinale",
      slug: getCategorySlug("Sănătate - Plante Medicinale"),
    },
    {
      name: "Mamă și Copil",
      slug: getCategorySlug("Mamă și Copil"),
    },
    {
      name: "Îngrijire Corp/Față",
      slug: getCategorySlug("Frumusețe și Igienă - Îngrijire Corp/Față"),
    },
    {
      name: "Protecție Solară",
      slug: getCategorySlug("Frumusețe și Igienă - Protecție Solară"),
    },
    {
      name: "Îngrijire Păr",
      slug: getCategorySlug("Frumusețe și Igienă - Îngrijire Păr"),
    },
    {
      name: "Igienă Personală",
      slug: getCategorySlug("Frumusețe și Igienă - Igienă Personală"),
    },
    {
      name: "Optică",
      slug: getCategorySlug("Sănătate - Echipamente Medicale"),
    },
    {
      name: "Articole Ortopedice și Dispozitive Medicale",
      slug: getCategorySlug("Sănătate - Articole Ortopedice"),
    },
    {
      name: "Cuplu și Sex",
      slug: getCategorySlug("Sănătate - Parafarmaceutice"),
    },
  ], [categories]);

  const handleCategoryClick = () => {
    // Force scroll to top immediately when clicking a category
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    // Also scroll after a short delay to ensure it works
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
  };

  const renderCategoryItem = (item: CategoryItem) => {
    if (item.slug) {
      return (
        <Link
          key={item.name}
          to={`/categorie/${item.slug}`}
          onClick={handleCategoryClick}
          className="block py-2.5 px-4 rounded-md hover:bg-green-50 hover:text-green-700 transition-colors font-semibold text-sm text-gray-900"
        >
          {item.name}
        </Link>
      );
    }

    return (
      <div
        key={item.name}
        className="py-2.5 px-4 rounded-md text-gray-500 font-semibold text-sm"
      >
        {item.name}
      </div>
    );
  };

  return (
    <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
      <nav className="p-4 space-y-1">
        {categoryStructure.map((item) => renderCategoryItem(item))}
      </nav>
    </aside>
  );
};

export default CategoriesSidebar;

