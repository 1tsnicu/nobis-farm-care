import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Pill, 
  Sparkles, 
  Heart, 
  Baby, 
  Stethoscope, 
  Leaf, 
  User, 
  Droplet, 
  Sun, 
  Scissors,
  Palette
} from "lucide-react";

// Category data with accurate product counts from the image
const categories = [
  {
    slug: "medicamente-otc",
    name: "Medicamente OTC",
    productCount: 1296,
    icon: Pill,
    color: "bg-blue-50 hover:bg-blue-100 border-blue-200",
    iconBg: "bg-blue-100",
    badgeColor: "bg-blue-500"
  },
  {
    slug: "vitamine-minerale",
    name: "Vitamine și Minerale",
    productCount: 835,
    icon: Sparkles,
    color: "bg-purple-50 hover:bg-purple-100 border-purple-200",
    iconBg: "bg-purple-100",
    badgeColor: "bg-blue-500"
  },
  {
    slug: "parafarmaceutice",
    name: "Parafarmaceutice",
    productCount: 393,
    icon: Heart,
    color: "bg-pink-50 hover:bg-pink-100 border-pink-200",
    iconBg: "bg-pink-100",
    badgeColor: "bg-blue-500"
  },
  {
    slug: "mama-copil",
    name: "Mamă și Copil",
    productCount: 190,
    icon: Baby,
    color: "bg-amber-50 hover:bg-amber-100 border-amber-200",
    iconBg: "bg-amber-100",
    badgeColor: "bg-blue-500"
  },
  {
    slug: "echipamente-medicale",
    name: "Echipamente Medicale",
    productCount: 63,
    icon: Stethoscope,
    color: "bg-teal-50 hover:bg-teal-100 border-teal-200",
    iconBg: "bg-teal-100",
    badgeColor: "bg-blue-500"
  },
  {
    slug: "plante-medicinale",
    name: "Plante Medicinale",
    productCount: 46,
    icon: Leaf,
    color: "bg-green-50 hover:bg-green-100 border-green-200",
    iconBg: "bg-green-100",
    badgeColor: "bg-blue-500"
  },
  {
    slug: "ingrijire-corp-fata",
    name: "Îngrijire Corp/Față",
    productCount: 33,
    icon: User,
    color: "bg-rose-50 hover:bg-rose-100 border-rose-200",
    iconBg: "bg-rose-100",
    badgeColor: "bg-blue-500"
  },
  {
    slug: "igiena-personala",
    name: "Igienă Personală",
    productCount: 31,
    icon: Droplet,
    color: "bg-cyan-50 hover:bg-cyan-100 border-cyan-200",
    iconBg: "bg-cyan-100",
    badgeColor: "bg-blue-500"
  },
  {
    slug: "protectie-solara",
    name: "Protecție Solară",
    productCount: 26,
    icon: Sun,
    color: "bg-orange-50 hover:bg-orange-100 border-orange-200",
    iconBg: "bg-orange-100",
    badgeColor: "bg-blue-500"
  },
  {
    slug: "ingrijire-par",
    name: "Îngrijire Păr",
    productCount: 17,
    icon: Scissors,
    color: "bg-violet-50 hover:bg-violet-100 border-violet-200",
    iconBg: "bg-violet-100",
    badgeColor: "bg-blue-500"
  },
  {
    slug: "dermatocosmetica",
    name: "Dermato-Cosmetică",
    productCount: 11,
    icon: Sparkles,
    color: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200",
    iconBg: "bg-emerald-100",
    badgeColor: "bg-blue-500"
  },
  {
    slug: "cosmetica-decorativa",
    name: "Cosmetică Decorativă",
    productCount: 1,
    icon: Palette,
    color: "bg-fuchsia-50 hover:bg-fuchsia-100 border-fuchsia-200",
    iconBg: "bg-fuchsia-100",
    badgeColor: "bg-blue-500"
  }
];

const Categories = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Categorii de Produse
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explorează gama noastră completă de produse farmaceutice și cosmetice organizate pe categorii
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.slug}
                to={`/categorie/${category.slug}`}
                className="group"
              >
                <div className={`${category.color} border-2 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
                  {/* Icon */}
                  <div className={`${category.iconBg} w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-gray-700" />
                  </div>
                  
                  {/* Category Name */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  
                  {/* Product Count Badge */}
                  <div className="inline-block">
                    <span className={`${category.badgeColor} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md`}>
                      {category.productCount} produse
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Nu găsești ce cauți? Încearcă căutarea globală
          </p>
          <Link
            to="/produse"
            className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            Toate produsele →
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
