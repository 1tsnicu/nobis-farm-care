import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Users, Target, Heart, Award, CheckCircle } from "lucide-react";

const teamMembers = [
  {
    name: "Dr. Elena Popescu",
    role: "Farmacist Șef",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
    description: "20 de ani de experiență în farmacie clinică"
  },
  {
    name: "Dr. Ion Moraru",
    role: "Farmacist Principal",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
    description: "Specialist în dermato-cosmetică"
  },
  {
    name: "Dr. Maria Ciobanu",
    role: "Farmacist",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400",
    description: "Expert în suplimente naturiste"
  },
  {
    name: "Dr. Andrei Rusu",
    role: "Farmacist",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400",
    description: "Specialist în nutriție și wellness"
  }
];

const values = [
  {
    icon: Heart,
    title: "Grijă pentru Clienți",
    description: "Fiecare client este unic și merită atenție personalizată"
  },
  {
    icon: CheckCircle,
    title: "Calitate Garantată",
    description: "Doar produse certificate și verificate de la producători de încredere"
  },
  {
    icon: Users,
    title: "Profesionalism",
    description: "Echipă de farmaciști calificați cu experiență vastă"
  },
  {
    icon: Award,
    title: "Inovație",
    description: "Adoptăm cele mai noi tehnologii pentru servicii superioare"
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Despre Nobis Farm Care
              </h1>
              <p className="text-xl text-primary-foreground/90">
                Mai mult decât o farmacie – partenerul tău de încredere pentru o viață sănătoasă
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Povestea Noastră</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Nobis Farm Care a fost fondată în 2009 cu o viziune simplă dar puternică: 
                    să oferim comunității noastre acces la produse farmaceutice de cea mai înaltă calitate, 
                    însoțite de consiliere profesionistă și personalizată.
                  </p>
                  <p>
                    De-a lungul anilor, am crescut de la o farmacie mică de cartier la o rețea de încredere 
                    care servește mii de familii în toată Moldova. Succesul nostru se bazează pe încrederea 
                    pe care ne-o acordă clienții zi de zi.
                  </p>
                  <p>
                    Astăzi, continuăm să investim în formarea continuă a echipei noastre, în cele mai noi 
                    tehnologii și în extinderea gamei de produse, menținând întotdeauna aceleași valori 
                    fundamentale: calitate, încredere și grijă pentru oameni.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800"
                  alt="Interior farmacie Nobis Farm"
                  className="rounded-2xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="p-8 border-primary/20">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Misiunea Noastră</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Să oferim servicii farmaceutice de excepție, asigurând accesul la medicamente și 
                  produse de sănătate de calitate superioară, împreună cu consiliere profesionistă 
                  personalizată pentru fiecare client, contribuind astfel la îmbunătățirea sănătății 
                  și calității vieții în comunitatea noastră.
                </p>
              </Card>
              
              <Card className="p-8 border-primary/20">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mb-6">
                  <Award className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Viziunea Noastră</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Să devenim cea mai de încredere rețea de farmacii din Moldova, recunoscută pentru 
                  excelența serviciilor, inovație în domeniul farmaceutic și contribuția activă la 
                  promovarea unui stil de viață sănătos în comunitate, fiind prima alegere pentru 
                  nevoile de sănătate ale familiilor moldovenești.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Valorile Noastre
              </h2>
              <p className="text-lg text-muted-foreground">
                Principiile care ne ghidează fiecare zi
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
                    <value.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Echipa Noastră
              </h2>
              <p className="text-lg text-muted-foreground">
                Farmaciști dedicați, pregătiți să te ajute
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-2">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {member.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Galerie Foto
              </h2>
              <p className="text-lg text-muted-foreground">
                O privire în interiorul farmaciei noastre
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=600"
                  alt="Interior farmacie"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600"
                  alt="Consiliere farmaceutică"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600"
                  alt="Produse farmaceutice"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600"
                  alt="Echipa la lucru"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600"
                  alt="Zona de consultații"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1584362917165-526a968579e8?w=600"
                  alt="Produse organizate"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
