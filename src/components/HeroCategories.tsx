import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ChevronRight } from "lucide-react";

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
      // Fetch ALL products in one query and count by category
      const { data: allProducts } = await supabase
        .from('products')
        .select('category_id');
      
      // Count products per category
      const productCounts: { [key: string]: number } = {};
      allProducts?.forEach(product => {
        productCounts[product.category_id] = (productCounts[product.category_id] || 0) + 1;
      });
      
      // Add counts to categories
      const categoriesWithCount = categoriesData.map(cat => ({
        ...cat,
        products_count: productCounts[cat.id] || 0
      }));
      
      setCategories(categoriesWithCount);
    }
  };

  const getCategoryShortName = (name: string) => {
    const shortNames: { [key: string]: string } = {
      'Sănătate - Medicamente OTC': 'Sănătate',
      'Vitamine și Minerale': 'Vitamine și Minerale',
      'Sănătate - Parafarmaceutice': 'Frumusețe și Igienă',
      'Mamă și Copil': 'Mamă și Copil',
      'Sănătate - Echipamente Medicale': 'Cuplu și Sex',
      'Dermato-Cosmetică': 'Dermatocosmetică',
    };
    return shortNames[name] || name;
  };

  const getGradientClass = (index: number) => {
    const gradients = [
      'from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 border-primary/20',
      'from-blue-500/10 to-blue-500/5 hover:from-blue-500/20 hover:to-blue-500/10 border-blue-500/20',
      'from-green-500/10 to-green-500/5 hover:from-green-500/20 hover:to-green-500/10 border-green-500/20',
      'from-purple-500/10 to-purple-500/5 hover:from-purple-500/20 hover:to-purple-500/10 border-purple-500/20',
      'from-orange-500/10 to-orange-500/5 hover:from-orange-500/20 hover:to-orange-500/10 border-orange-500/20',
      'from-pink-500/10 to-pink-500/5 hover:from-pink-500/20 hover:to-pink-500/10 border-pink-500/20',
    ];
    return gradients[index % gradients.length];
  };

  return (
    <nav className="bg-gradient-to-b from-background to-muted/20 border-b">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 py-6">
          {categories.slice(0, 6).map((cat, index) => (
            <Link
              key={cat.id}
              to={`/categorie/${cat.slug}`}
              className={`group relative flex flex-col items-center justify-center p-4 rounded-xl border bg-gradient-to-br ${getGradientClass(index)} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
            >
              {/* Icon */}
              <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
              </div>
              
              {/* Category Name */}
              <div className="text-center">
                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                  {getCategoryShortName(cat.name)}
                </h3>
                
                {/* Product Count Badge */}
                <div className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="font-medium">{cat.products_count || 0}</span>
                  <span>produse</span>
                </div>
              </div>

              {/* Hover Arrow */}
              <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-primary" />
              
              {/* Shine effect on hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full" style={{ transition: 'transform 0.6s ease-in-out' }} />
            </Link>
          ))}
        </div>

        {/* Bottom Links */}
        <div className="flex items-center justify-center gap-6 pb-4 text-sm border-t pt-4">
          <Link
            to="/blog"
            className="flex items-center gap-1 hover:text-primary transition-colors font-medium"
          >
            📝 Blog
          </Link>
          <Link
            to="/contact"
            className="flex items-center gap-1 hover:text-primary transition-colors font-medium"
          >
            📞 Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HeroCategories;
