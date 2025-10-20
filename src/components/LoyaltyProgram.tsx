import { Button } from "@/components/ui/button";
import { Check, Gift, Truck, Star, Heart } from "lucide-react";

const benefits = [
  {
    icon: Gift,
    text: "Puncte de loialitate la fiecare cumpărătură"
  },
  {
    icon: Star,
    text: "Reduceri exclusive pentru membri"
  },
  {
    icon: Heart,
    text: "Acces la oferte speciale și produse noi"
  },
  {
    icon: Truck,
    text: "Livrare gratuită pentru comenzi peste 349 MDL"
  }
];

const LoyaltyProgram = () => {
  return (
    <section className="py-16 bg-gradient-loyalty">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block p-3 bg-primary-foreground/10 rounded-full mb-6">
            <Heart className="h-12 w-12 text-primary-foreground" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Devino membru al Familiei Nobis
          </h2>
          
          <p className="text-xl text-primary-foreground/95 mb-8">
            Bucură-te de beneficii exclusive și oferite speciale
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-primary-foreground/10 p-4 rounded-lg backdrop-blur-sm"
              >
                <div className="flex-shrink-0 mt-1">
                  <benefit.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <p className="text-left text-primary-foreground font-medium">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg"
            >
              Devino membru gratuit
            </Button>
            <p className="text-sm text-primary-foreground/80">
              Durează mai puțin de 1 minut
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoyaltyProgram;
