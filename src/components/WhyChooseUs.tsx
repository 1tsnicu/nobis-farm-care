import { Shield, Award, Truck, Headphones } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Produse 100% autentice",
    description: "Garantăm autenticitatea fiecărui produs"
  },
  {
    icon: Award,
    title: "Prețuri competitive",
    description: "Cele mai bune oferte de pe piață"
  },
  {
    icon: Truck,
    title: "Livrare rapidă",
    description: "24h în Chișinău, 48-72h în toată țara"
  },
  {
    icon: Headphones,
    title: "Suport 24/7",
    description: "Echipa noastră este mereu aici pentru tine"
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            De ce să ne alegi pe noi?
          </h2>
          <p className="text-lg text-muted-foreground">
            Îți oferim cele mai bune servicii și produse
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-hero rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
