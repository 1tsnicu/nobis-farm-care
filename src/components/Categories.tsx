import { Pill, Heart, Sparkles, Droplet, Package, Stethoscope } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = [
  {
    icon: Pill,
    title: "Medicamente OTC",
    description: "Remedii pentru sănătatea ta",
    color: "text-primary"
  },
  {
    icon: Heart,
    title: "Vitamine & Suplimente",
    description: "Nutriție și energie",
    color: "text-accent"
  },
  {
    icon: Sparkles,
    title: "Îngrijire personală",
    description: "Produse pentru wellness",
    color: "text-secondary"
  },
  {
    icon: Droplet,
    title: "Produse cosmetice",
    description: "Frumusețe naturală",
    color: "text-primary"
  },
  {
    icon: Package,
    title: "Parafarmaceutice",
    description: "Soluții pentru toată familia",
    color: "text-accent"
  },
  {
    icon: Stethoscope,
    title: "Articole medicale",
    description: "Echipament profesional",
    color: "text-secondary"
  }
];

const Categories = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explorează produsele noastre
          </h2>
          <p className="text-lg text-muted-foreground">
            Alege categoria potrivită nevoilor tale
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="group cursor-pointer border-border hover:border-primary transition-all duration-300 hover:shadow-hover bg-gradient-card"
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="p-4 bg-primary-light rounded-full group-hover:scale-110 transition-transform duration-300">
                    <category.icon className={`h-8 w-8 ${category.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    <Button variant="link" className="text-primary p-0 h-auto">
                      Explorează →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
