import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Truck, ShieldCheck, Clock } from "lucide-react";
import heroImage from "@/assets/hero-pharmacy.jpg";

const promos = [
  { icon: Sparkles, text: "🎁 Tombola zilnică - Câștigă 500 MDL" },
  { icon: Truck, text: "🚚 Livrare gratuită peste 350 MDL" },
  { icon: ShieldCheck, text: "⭐ 15,000+ clienți mulțumiți" },
  { icon: Clock, text: "💊 Produse 100% autentice" }
];

const Hero = () => {
  const [currentPromo, setCurrentPromo] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 15,
    minutes: 34,
  });

  useEffect(() => {
    const promoTimer = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promos.length);
    }, 4000);

    return () => clearInterval(promoTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59 };
        }
        return prev;
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-0">
        <div className="grid lg:grid-cols-2 gap-0 min-h-[500px] lg:min-h-[600px]">
          {/* Left Side - Content */}
          <div className="flex flex-col justify-center py-12 lg:py-16 px-6 lg:px-12 bg-gradient-to-br from-background via-primary-light/20 to-background relative z-10">
            <Badge variant="secondary" className="w-fit mb-6 bg-gradient-tombola text-gold-foreground shadow-md px-4 py-1.5">
              <Sparkles className="w-4 h-4 mr-2" />
              Ofertă specială
            </Badge>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 leading-tight">
              Sănătatea ta
              <span className="block text-primary mt-2">începe aici</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-xl">
              Peste 10,000 de produse autentice, consiliere gratuită și livrare rapidă în toată Moldova
            </p>

            {/* Dynamic Promo Carousel */}
            <div className="mb-8 h-12 relative overflow-hidden">
              {promos.map((promo, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex items-center gap-3 transition-all duration-500 ${
                    index === currentPromo
                      ? 'opacity-100 translate-y-0'
                      : index < currentPromo
                      ? 'opacity-0 -translate-y-full'
                      : 'opacity-0 translate-y-full'
                  }`}
                >
                  <div className="bg-primary/10 rounded-full p-2">
                    <promo.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm lg:text-base font-medium text-foreground">{promo.text}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="shadow-lg hover:shadow-xl transition-all bg-primary hover:bg-primary-dark text-lg px-8">
                Explorează produsele
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8">
                Devino Membru
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
              <div className="text-center">
                <p className="text-2xl lg:text-3xl font-bold text-primary">10,000+</p>
                <p className="text-xs lg:text-sm text-muted-foreground">Produse</p>
              </div>
              <div className="text-center">
                <p className="text-2xl lg:text-3xl font-bold text-primary">15,000+</p>
                <p className="text-xs lg:text-sm text-muted-foreground">Clienți</p>
              </div>
              <div className="text-center">
                <p className="text-2xl lg:text-3xl font-bold text-primary">4.9/5</p>
                <p className="text-xs lg:text-sm text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>

          {/* Right Side - Image with Overlay */}
          <div className="relative h-[400px] lg:h-auto">
            <img
              src={heroImage}
              alt="Farmacia Nobis Farm"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-primary/5 to-background/30" />
            
            {/* Floating Countdown Card */}
            <div className="absolute bottom-6 right-6 bg-background/95 backdrop-blur-md rounded-2xl shadow-xl p-6 max-w-sm border border-border">
              <p className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Oferta expiră în:
              </p>
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-primary bg-primary-light rounded-lg px-3 py-2">
                    {String(timeLeft.days).padStart(2, "0")}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">Zile</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-primary bg-primary-light rounded-lg px-3 py-2">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">Ore</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-primary bg-primary-light rounded-lg px-3 py-2">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">Min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
