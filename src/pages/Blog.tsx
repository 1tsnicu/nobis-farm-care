import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import { useState } from "react";

const blogPosts = [
  {
    id: 1,
    title: "Cum să-ți crești imunitatea în sezonul rece",
    excerpt: "Descoperă metodele naturale și suplimentele esențiale pentru a-ți întări sistemul imunitar în această perioadă.",
    content: "Sistemul imunitar joacă un rol crucial în protejarea organismului...",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800",
    category: "Sănătate",
    author: "Dr. Elena Popescu",
    date: "15 Dec 2024",
    readTime: "5 min"
  },
  {
    id: 2,
    title: "Ghid complet pentru o piele sănătoasă iarna",
    excerpt: "Sfaturi de la dermatologi și recomandări de produse pentru îngrijirea pielii în sezonul rece.",
    content: "Iarna aduce cu sine provocări speciale pentru sănătatea pielii...",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800",
    category: "Îngrijire",
    author: "Dr. Maria Ciobanu",
    date: "12 Dec 2024",
    readTime: "7 min"
  },
  {
    id: 3,
    title: "Vitaminele esențiale pentru copii",
    excerpt: "Tot ce trebuie să știi despre suplimentarea corectă cu vitamine la copii.",
    content: "Dezvoltarea sănătoasă a copiilor depinde de o nutriție echilibrată...",
    image: "https://images.unsplash.com/photo-1550572017-4a1f501c2bc6?w=800",
    category: "Pediatrie",
    author: "Dr. Andrei Rusu",
    date: "8 Dec 2024",
    readTime: "6 min"
  },
  {
    id: 4,
    title: "Mituri și adevăruri despre antibiotice",
    excerpt: "Clarificăm cele mai comune neînțelegeri despre utilizarea antibioticelor.",
    content: "Antibioticele sunt printre cele mai prescrise medicamente...",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800",
    category: "Medicație",
    author: "Dr. Ion Moraru",
    date: "5 Dec 2024",
    readTime: "8 min"
  },
  {
    id: 5,
    title: "Managementul stresului: tehnici naturale",
    excerpt: "Metode dovedite științific pentru reducerea stresului fără medicamente.",
    content: "Stresul cronic poate avea efecte negative majore asupra sănătății...",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
    category: "Wellness",
    author: "Dr. Elena Popescu",
    date: "1 Dec 2024",
    readTime: "10 min"
  },
  {
    id: 6,
    title: "Suplimente pentru sănătatea articulațiilor",
    excerpt: "Ghid complet despre cele mai eficiente suplimente pentru articulații sănătoase.",
    content: "Sănătatea articulațiilor este esențială pentru mobilitate...",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800",
    category: "Suplimente",
    author: "Dr. Andrei Rusu",
    date: "28 Nov 2024",
    readTime: "6 min"
  }
];

const categories = ["Toate", "Sănătate", "Îngrijire", "Pediatrie", "Medicație", "Wellness", "Suplimente"];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("Toate");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "Toate" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Blog & Sfaturi de Sănătate
              </h1>
              <p className="text-xl text-primary-foreground/90">
                Articole utile, sfaturi de la specialiști și ultimele noutăți din domeniul sănătății
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-background sticky top-[73px] z-40 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Caută articole..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="cursor-pointer px-4 py-2 text-sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-foreground mb-6">Articol Recomandat</h2>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="aspect-video lg:aspect-auto overflow-hidden">
                      <img
                        src={filteredPosts[0].image}
                        alt={filteredPosts[0].title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-8 flex flex-col justify-center">
                      <Badge className="w-fit mb-4">{filteredPosts[0].category}</Badge>
                      <h3 className="text-3xl font-bold text-foreground mb-4">
                        {filteredPosts[0].title}
                      </h3>
                      <p className="text-muted-foreground mb-6 text-lg">
                        {filteredPosts[0].excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {filteredPosts[0].author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {filteredPosts[0].date}
                        </div>
                        <div>{filteredPosts[0].readTime} citire</div>
                      </div>
                      <Link to={`/blog/${filteredPosts[0].id}`}>
                        <Button size="lg">
                          Citește Articolul
                          <ArrowRight className="h-5 w-5 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Blog Grid */}
        <section className="py-12 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Toate Articolele ({filteredPosts.length})
              </h2>
              
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.slice(1).map((post) => (
                    <Card key={post.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-6">
                        <Badge variant="secondary" className="mb-3">{post.category}</Badge>
                        <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {post.date}
                          </div>
                          <div>{post.readTime}</div>
                        </div>
                        <Link to={`/blog/${post.id}`}>
                          <Button variant="ghost" className="group/btn p-0 h-auto hover:bg-transparent">
                            Citește mai mult
                            <ArrowRight className="h-4 w-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-xl text-muted-foreground">
                    Nu am găsit articole care să corespundă criteriilor tale de căutare.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
