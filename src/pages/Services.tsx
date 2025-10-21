import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Stethoscope, 
  Activity, 
  FlaskConical, 
  Pill, 
  Phone,
  ClipboardList,
  Heart,
  Package
} from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "Consiliere Farmaceutică Personalizată",
    description: "Farmaciștii noștri certificați oferă consultații detaliate pentru alegerea corectă a medicamentelor și tratamentelor.",
    features: [
      "Evaluarea interacțiunilor medicamentoase",
      "Recomandări personalizate de tratament",
      "Explicații detaliate despre administrare",
      "Monitorizarea efectelor adverse"
    ],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600"
  },
  {
    icon: Activity,
    title: "Măsurarea Parametrilor Vitali",
    description: "Servicii gratuite de monitorizare a sănătății pentru pacienții noștri.",
    features: [
      "Măsurarea tensiunii arteriale",
      "Monitorizarea glicemiei",
      "Măsurarea temperaturii",
      "Evaluarea saturației de oxigen"
    ],
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=600"
  },
  {
    icon: FlaskConical,
    title: "Testări Rapide",
    description: "Teste medicale rapide și precise, efectuate în condiții optime de siguranță.",
    features: [
      "Test rapid COVID-19",
      "Test de sarcină",
      "Test nivelul colesterolului",
      "Test nivel de vitamina D"
    ],
    image: "https://images.unsplash.com/photo-1579154204845-f49e236aea53?w=600"
  },
  {
    icon: Pill,
    title: "Eliberare Rețete Electronice",
    description: "Procesare rapidă și eficientă a rețetelor electronice și fizice.",
    features: [
      "Verificarea automată a rețetelor",
      "Înlocuirea cu produse generice",
      "Suport pentru rețete cronice",
      "Consultație farmaceutică inclusă"
    ],
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600"
  },
  {
    icon: Package,
    title: "Comenzi Speciale",
    description: "Comandăm produse care nu sunt în stoc pentru nevoile tale specifice.",
    features: [
      "Medicamente rare și specializate",
      "Echipamente medicale personalizate",
      "Produse importate",
      "Livrare în maxim 72 ore"
    ],
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600"
  },
  {
    icon: ClipboardList,
    title: "Program de Monitorizare",
    description: "Te ajutăm să ții sub control tratamentele cronice și administrarea corectă.",
    features: [
      "Planificare tratamente cronice",
      "Reminder-uri pentru administrare",
      "Monitorizare aderență la tratament",
      "Rapoarte pentru medicul curant"
    ],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600"
  }
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Serviciile Noastre
              </h1>
              <p className="text-xl text-primary-foreground/90">
                Servicii farmaceutice complete pentru sănătatea și bunăstarea ta
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-16 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-hero rounded-full mb-6">
                      <service.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                      {service.title}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Heart className="h-3 w-3 text-primary fill-primary" />
                          </div>
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact">
                      <Button size="lg">
                        <Phone className="h-5 w-5 mr-2" />
                        Programează-te
                      </Button>
                    </Link>
                  </div>
                  
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto border-primary/20">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Ai nevoie de mai multe informații?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Contactează-ne pentru detalii suplimentare despre serviciile noastre sau pentru a programa o consultație.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/contact">
                    <Button size="lg">
                      Contactează-ne
                    </Button>
                  </Link>
                  <a href="tel:+37360123456">
                    <Button size="lg" variant="outline">
                      <Phone className="h-5 w-5 mr-2" />
                      +373 60 123 456
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
