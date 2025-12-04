import { Link, useLocation } from "react-router-dom";
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

interface CategoryItem {
  name: string;
  slug: string;
  icon: React.ReactNode;
}

const HorizontalCategories = () => {
  const location = useLocation();
  const iconClass = "w-4 h-4";

  const categories: CategoryItem[] = [
    { name: "Medicamente", slug: "medicamente-otc", icon: <Pill className={iconClass} /> },
    { name: "Vitamine și Minerale", slug: "vitamine-minerale", icon: <Apple className={iconClass} /> },
    { name: "Plante Medicinale", slug: "plante-medicinale", icon: <Leaf className={iconClass} /> },
    { name: "Mamă și Copil", slug: "mama-copil", icon: <Baby className={iconClass} /> },
    { name: "Îngrijire Corp/Față", slug: "ingrijire-corp-fata", icon: <Sparkles className={iconClass} /> },
    { name: "Protecție Solară", slug: "protectie-solara", icon: <Sun className={iconClass} /> },
    { name: "Îngrijire Păr", slug: "ingrijire-par", icon: <Scissors className={iconClass} /> },
    { name: "Igienă Personală", slug: "igiena-personala", icon: <Bath className={iconClass} /> },
    { name: "Optică", slug: "echipamente-medicale", icon: <Eye className={iconClass} /> },
    { name: "Articole Ortopedice", slug: "sanate-articole-ortopedice", icon: <Stethoscope className={iconClass} /> },
    { name: "Cuplu și Sex", slug: "parafarmaceutice", icon: <Heart className={iconClass} /> },
  ];

  const isActive = (slug: string) => {
    return location.pathname === `/categorie/${slug}`;
  };

  const handleCategoryClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="hidden lg:block w-full bg-gradient-to-b from-white to-green-50/30 border-b border-gray-100">
      <div className="container mx-auto px-2">
        <div className="flex items-center justify-between py-1.5">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/categorie/${category.slug}`}
              onClick={handleCategoryClick}
              className={`group flex items-center gap-1 py-1 px-1.5 rounded transition-all duration-200 whitespace-nowrap ${
                isActive(category.slug)
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-green-50 text-gray-700 hover:text-green-700'
              }`}
            >
              <span className={`${isActive(category.slug) ? 'text-primary-foreground' : 'text-primary'}`}>
                {category.icon}
              </span>
              <span className="font-medium text-[11px]">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCategories;
