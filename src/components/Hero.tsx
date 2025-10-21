import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Truck, ShieldCheck, Clock, ArrowRight, Star } from "lucide-react";

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 12,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            {/* Top Badge */}
            <div className="flex justify-center lg:justify-start">
              <Badge className="bg-gradient-tombola text-white px-6 py-2 text-sm font-semibold shadow-lg hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 mr-2 inline" />
                Oferte exclusive online
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
                  Sănătatea ta
                </span>
                <br />
                <span className="text-foreground">începe aici</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
                Peste <span className="text-primary font-bold">10,000</span> de produse autentice cu livrare rapidă în toată Moldova
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 border border-border/50 hover:border-primary/50 transition-colors group">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <p className="font-semibold text-sm text-foreground">Livrare Gratuită</p>
                <p className="text-xs text-muted-foreground">peste 350 MDL</p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-4 border border-border/50 hover:border-secondary/50 transition-colors group">
                <div className="bg-secondary/10 rounded-full w-12 h-12 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-secondary" />
                </div>
                <p className="font-semibold text-sm text-foreground">100% Autentice</p>
                <p className="text-xs text-muted-foreground">Garanție calitate</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary-dark hover:shadow-hover text-white text-lg px-8 py-6 rounded-xl group">
                Explorează Produsele
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6 rounded-xl">
                <Star className="mr-2 w-5 h-5" />
                Program Loialitate
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-8 pt-4">
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">10K+</p>
                <p className="text-sm text-muted-foreground">Produse</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">15K+</p>
                <p className="text-sm text-muted-foreground">Clienți</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">4.9</p>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>

          {/* Right Side - Promo Card */}
          <div className="relative animate-scale-in">
            <div className="relative bg-gradient-to-br from-white to-primary/5 rounded-3xl p-8 shadow-2xl border border-primary/20 backdrop-blur-xl overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl -translate-y-32 translate-x-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-full blur-3xl translate-y-32 -translate-x-32" />
              
              <div className="relative z-10 space-y-6">
                <div className="text-center">
                  <Badge className="bg-accent text-accent-foreground mb-4 text-base px-6 py-2">
                    🎁 Ofertă Specială
                  </Badge>
                  <h3 className="text-3xl font-bold text-foreground mb-2">
                    Tombola Zilnică
                  </h3>
                  <p className="text-xl text-primary font-bold mb-6">
                    Câștigă până la 500 MDL
                  </p>
                </div>

                {/* Countdown Timer */}
                <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 shadow-xl">
                  <p className="text-white/90 text-sm mb-4 flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4" />
                    Oferta expiră în:
                  </p>
                  <div className="flex gap-3 justify-center">
                    <div className="text-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[70px]">
                        <span className="text-3xl font-bold text-white block">
                          {String(timeLeft.hours).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="text-white/80 text-xs mt-2 block">Ore</span>
                    </div>
                    <div className="text-white text-3xl font-bold self-center">:</div>
                    <div className="text-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[70px]">
                        <span className="text-3xl font-bold text-white block">
                          {String(timeLeft.minutes).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="text-white/80 text-xs mt-2 block">Min</span>
                    </div>
                    <div className="text-white text-3xl font-bold self-center">:</div>
                    <div className="text-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[70px]">
                        <span className="text-3xl font-bold text-white block">
                          {String(timeLeft.seconds).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="text-white/80 text-xs mt-2 block">Sec</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-tombola hover:shadow-xl text-white text-lg py-6 rounded-xl font-semibold group">
                  Participă Acum
                  <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  * Participă gratuit la tombola zilnică
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
