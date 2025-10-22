import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const categories = [
  {
    id: 1,
    title: "Medicamente OTC",
    subtitle: "Fără prescripție medicală",
    count: "2,500+",
    image: "https://images.unsplash.com/photo-1585435557343-3b092031d886?w=1200&auto=format&fit=crop",
    slug: "medicamente-otc",
    gradient: "from-green-600/90 to-green-700/90"
  },
  {
    id: 2,
    title: "Suplimente",
    subtitle: "Vitamine & Minerale",
    count: "1,200+",
    image: "https://images.unsplash.com/photo-1550572017-4fade1c9b01b?w=800&auto=format&fit=crop",
    slug: "suplimente",
    gradient: "from-orange-500/90 to-orange-600/90"
  },
  {
    id: 3,
    title: "Dermato-Cosmetice",
    subtitle: "Îngrijire specializată",
    count: "800+",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&auto=format&fit=crop",
    slug: "dermato-cosmetice",
    gradient: "from-blue-500/90 to-blue-600/90"
  },
  {
    id: 4,
    title: "Mama & Copilul",
    subtitle: "Îngrijire pentru familie",
    count: "600+",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&auto=format&fit=crop",
    slug: "mama-copil",
    gradient: "from-pink-500/90 to-pink-600/90"
  },
  {
    id: 5,
    title: "Echipamente Medicale",
    subtitle: "Dispozitive & Ortopedice",
    count: "400+",
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=800&auto=format&fit=crop",
    slug: "echipamente-medicale",
    gradient: "from-indigo-500/90 to-indigo-600/90"
  },
  {
    id: 6,
    title: "Produse Naturiste",
    subtitle: "Remedii naturale",
    count: "300+",
    image: "https://images.unsplash.com/photo-1622540743802-4056c8e14173?w=800&auto=format&fit=crop",
    slug: "produse-naturiste",
    gradient: "from-green-500/90 to-emerald-600/90"
  }
];

const HeroCategories = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-6 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-600">Categorii de Produse</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
            Găsește exact ce ai nevoie
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Gamă completă de produse farmaceutice și de îngrijire pentru toată familia
          </p>
        </div>

        {/* Categories Grid - Bento Box Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {/* Large Card - Medicamente OTC */}
          <Link 
            to={`/produse?categorie=${categories[0].slug}`}
            className="group relative overflow-hidden rounded-3xl col-span-2 row-span-2 h-[400px] md:h-[500px] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            <img 
              src={categories[0].image} 
              alt={categories[0].title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${categories[0].gradient} mix-blend-multiply`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 group-hover:bg-white/20 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-sm font-semibold text-white/90">{categories[0].count} produse</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold mb-2 group-hover:translate-x-2 transition-transform">
                  {categories[0].title}
                </h3>
                <p className="text-white/90 text-lg mb-4">{categories[0].subtitle}</p>
                <div className="flex items-center gap-2 text-white font-semibold">
                  Explorează
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          {/* Medium Cards - Rest of categories */}
          {categories.slice(1).map((category, index) => (
            <Link
              key={category.id}
              to={`/produse?categorie=${category.slug}`}
              className={`group relative overflow-hidden rounded-3xl ${
                index === 0 ? 'col-span-2' : 'col-span-1'
              } h-[240px] shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2`}
            >
              <img 
                src={category.image} 
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} mix-blend-multiply opacity-90`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                  <span className="text-xs font-semibold text-white/80">{category.count} produse</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-1 group-hover:translate-x-1 transition-transform">
                  {category.title}
                </h3>
                <p className="text-white/90 text-sm mb-3">{category.subtitle}</p>
                <div className="flex items-center gap-1 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Vezi mai mult
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Nu găsești ceea ce cauți? <Link to="/contact" className="text-green-600 hover:text-green-700 font-semibold">Contactează-ne</Link> pentru recomandări personalizate.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span>✓ Consiliere farmaceutică gratuită</span>
            <span>✓ Produse certificate</span>
            <span>✓ Prețuri competitive</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCategories;
