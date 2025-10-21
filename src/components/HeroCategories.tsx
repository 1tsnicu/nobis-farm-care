import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: 1,
    title: "Sănătate",
    count: "4,767 articole",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
    slug: "sanatate",
    size: "large"
  },
  {
    id: 2,
    title: "Frumusețe și Igienă",
    count: "4,470 articole",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&auto=format&fit=crop",
    slug: "frumusete-igiena",
    size: "medium"
  },
  {
    id: 3,
    title: "Dermatocosmetică",
    count: "883 articole",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&auto=format&fit=crop",
    slug: "dermatocosmetica",
    size: "small"
  },
  {
    id: 4,
    title: "Vitamine și Minerale",
    count: "824 articole",
    image: "https://images.unsplash.com/photo-1550572017-4fade1c9b01b?w=800&auto=format&fit=crop",
    slug: "vitamine-minerale",
    size: "small"
  }
];

const HeroCategories = () => {
  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 auto-rows-fr">
          {/* Large Category - Takes full left column */}
          <Link 
            to={`/produse?categorie=${categories[0].slug}`}
            className="group relative overflow-hidden rounded-2xl h-[500px] lg:row-span-2 shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <img 
              src={categories[0].image} 
              alt={categories[0].title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h2 className="text-5xl font-bold mb-2 group-hover:translate-x-2 transition-transform">
                {categories[0].title}
              </h2>
              <p className="text-white/90 text-lg mb-4">{categories[0].count}</p>
              <Button 
                variant="secondary" 
                className="bg-white/20 backdrop-blur-sm border border-white/40 text-white hover:bg-white hover:text-primary group"
              >
                Explorează
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Link>

          {/* Right Column - 3 Categories */}
          <div className="grid grid-rows-2 gap-4">
            {/* Medium Category - Top Right */}
            <Link 
              to={`/produse?categorie=${categories[1].slug}`}
              className="group relative overflow-hidden rounded-2xl h-[242px] shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <img 
                src={categories[1].image} 
                alt={categories[1].title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-3xl font-bold mb-1 group-hover:translate-x-2 transition-transform">
                  {categories[1].title}
                </h3>
                <p className="text-white/90">{categories[1].count}</p>
              </div>
            </Link>

            {/* Bottom Right - Two Small Categories */}
            <div className="grid grid-cols-2 gap-4">
              {categories.slice(2).map((category) => (
                <Link
                  key={category.id}
                  to={`/produse?categorie=${category.slug}`}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-bold mb-1 group-hover:translate-x-1 transition-transform leading-tight">
                      {category.title}
                    </h3>
                    <p className="text-white/80 text-sm">{category.count}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCategories;
