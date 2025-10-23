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
      'Sănătate - Parafarmaceutice': 'Frumusețe și Igienă',
      'Mamă și Copil': 'Mamă și Copil',
      'Sănătate - Echipamente Medicale': 'Sănătate',
      'Dermato-Cosmetică': 'Dermatocosmetică',
    };
    return shortNames[name] || name;
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
