import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-pharmacy.jpg";

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 11,
    hours: 6,
    minutes: 21
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59 };
        }
        return prev;
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left - Content */}
          <div className="space-y-6 animate-fade-in">
            <Badge className="bg-accent text-accent-foreground">Tombola</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Comandă online și poți câștiga 500 lei!
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Fă o comandă online și intră automat în tombola zilnică, unde poți câștiga un certificat cadou de 500 lei.
            </p>
            
            {/* Countdown Timer */}
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <div className="text-xs text-muted-foreground uppercase mt-1">zile</div>
              </div>
              <div className="text-3xl font-bold text-primary">:</div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-xs text-muted-foreground uppercase mt-1">ore</div>
              </div>
              <div className="text-3xl font-bold text-primary">:</div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-xs text-muted-foreground uppercase mt-1">minute</div>
              </div>
            </div>

            <Button variant="link" className="text-primary p-0 h-auto">
              Afișează un meniu →
            </Button>
          </div>

          {/* Right - Image */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Produse farmacie online" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
