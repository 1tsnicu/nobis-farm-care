import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Percent, Star, Trophy, Crown, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: Gift,
    title: "Puncte de loialitate",
    description: "Câștigi 5% din valoarea fiecărei comenzi în puncte",
    color: "text-primary"
  },
  {
    icon: Percent,
    title: "Reduceri exclusive",
    description: "Acces anticipat la oferte speciale și reduceri",
    color: "text-secondary"
  },
  {
    icon: Star,
    title: "Birthday bonus",
    description: "Primești 100 de puncte bonus de ziua ta",
    color: "text-gold"
  },
  {
    icon: Trophy,
    title: "Niveluri premium",
    description: "Cu cât cumperi mai mult, cu atât beneficiile cresc",
    color: "text-accent"
  },
];

const LoyaltyProgram = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-loyalty" />
      <div className="absolute inset-0 backdrop-blur-sm" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-40 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse delay-75" />
        <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-white rounded-full blur-2xl animate-pulse delay-150" />
        <div className="absolute bottom-40 right-20 w-36 h-36 bg-white rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <Crown className="w-5 h-5 text-gold animate-pulse" />
            <span className="text-white font-bold text-sm tracking-wider">PROGRAM VIP</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            💎 FAMILIA NOBIS
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Alătură-te programului nostru de loialitate și bucură-te de beneficii exclusive, reduceri speciale și premii surpriză
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <Card 
              key={benefit.title} 
              className="relative border-none shadow-xl bg-white/95 backdrop-blur hover:bg-white hover:scale-105 hover:shadow-2xl transition-all duration-500 group overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-8 text-center">
                {/* Floating icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-md">
                  <benefit.icon className={`w-10 h-10 ${benefit.color}`} />
                </div>
                
                <h3 className="font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-gold to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border-2 border-white/30 shadow-2xl max-w-3xl mx-auto">
          <div className="text-center">
            <Sparkles className="w-12 h-12 text-gold mx-auto mb-6 animate-pulse" />
            
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Începe să economisești astăzi!
            </h3>
            <p className="text-white/90 mb-8 text-lg">
              Înscrierea este gratuită și primești instant 50 de puncte cadou
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-xl text-lg px-10 transform hover:scale-105 transition-all"
              >
                <Crown className="w-5 h-5 mr-2" />
                Devino Membru GRATUIT
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8"
              >
                Află mai multe
              </Button>
            </div>

            <p className="text-white/70 mt-6 text-sm flex items-center justify-center gap-2">
              <Star className="w-4 h-4" />
              Durează mai puțin de 1 minut • Fără taxe ascunse
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoyaltyProgram;
