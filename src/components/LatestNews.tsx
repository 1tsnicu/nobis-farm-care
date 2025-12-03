import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import healthBlog from "@/assets/health-blog-1.jpg";
import skincareBlog from "@/assets/skincare-blog.jpg";
import promoVitamins from "@/assets/promo-vitamins.jpg";


const newsItems = [
  {
    id: 1,
    title: "Cum să-ți crești imunitatea în sezonul rece",
    excerpt: "Descoperă metodele naturale și suplimentele esențiale pentru a-ți întări sistemul imunitar în această perioadă.",
    image: healthBlog,
    category: "Sănătate",
    date: "15 Dec 2024",
    isPromo: false
  },
  {
    id: 2,
    title: "OFERTĂ SPECIALĂ: -30% la toate vitaminele",
    excerpt: "Profită de reducerea noastră specială la întreaga gamă de vitamine și suplimente până pe 31 decembrie!",
    image: promoVitamins,
    category: "Promoție",
    date: "10 Dec 2024",
    isPromo: true
  },
  {
    id: 3,
    title: "Ghid complet pentru o piele sănătoasă iarna",
    excerpt: "Sfaturi de la dermatologi și recomandări de produse pentru îngrijirea pielii în sezonul rece.",
    image: skincareBlog,
    category: "Îngrijire",
    date: "5 Dec 2024",
    isPromo: false
  }
];

const LatestNews = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ultimele Noutăți & Oferte
          </h2>
          <p className="text-lg text-muted-foreground">
            Rămâi la curent cu cele mai noi articole și promoții
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8 mb-8">
          {newsItems.map((item) => (
            <Card key={item.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                {item.isPromo && (
                  <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground shadow-md">
                    🔥 Ofertă Limitată
                  </Badge>
                )}
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="secondary">{item.category}</Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {item.date}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {item.excerpt}
                </p>
                <Link to={`/blog/${item.id}`}>
                  <Button variant="ghost" className="group/btn p-0 h-auto hover:bg-transparent">
                    Citește mai mult
                    <ArrowRight className="h-4 w-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/blog">
            <Button size="lg" variant="outline">
              Vezi Toate Articolele
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
