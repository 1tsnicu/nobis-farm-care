import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Sparkles, Timer, TrendingUp } from "lucide-react";

const Tombola = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 11,
    minutes: 23,
    seconds: 45,
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
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <Card className="relative bg-gradient-tombola overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group">
          {/* Animated background particles */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-2xl animate-pulse" />
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse delay-75" />
            <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full blur-xl animate-pulse delay-150" />
          </div>

          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                  <Sparkles className="w-5 h-5 text-white animate-pulse" />
                  <span className="text-white font-semibold text-sm">Tombola Zilnică</span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  Comandă azi și<br />
                  <span className="text-gold">câștigă 500 MDL!</span>
                </h2>

                <p className="text-white/90 text-lg mb-8 max-w-lg">
                  Fiecare comandă te înscrie automat în tombola zilnică. Cu cât cumperi mai mult, cu atât ai mai multe șanse să câștigi!
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                  <Button 
                    size="lg" 
                    className="bg-white text-orange hover:bg-white/90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all group-hover:animate-pulse"
                  >
                    <Gift className="w-5 h-5 mr-2" />
                    Participă Acum
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-white text-white hover:bg-white hover:text-orange"
                  >
                    Vezi Regulament
                  </Button>
                </div>

                {/* Stats */}
                <div className="flex gap-8 justify-center lg:justify-start">
                  <div className="text-center lg:text-left">
                    <div className="flex items-center gap-2 text-white mb-1">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-2xl font-bold">1,247</span>
                    </div>
                    <p className="text-white/80 text-sm">Participanți azi</p>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="flex items-center gap-2 text-white mb-1">
                      <Gift className="w-4 h-4" />
                      <span className="text-2xl font-bold">500</span>
                    </div>
                    <p className="text-white/80 text-sm">MDL premiu</p>
                  </div>
                </div>
              </div>

              {/* Right - Countdown */}
              <div className="flex justify-center lg:justify-end">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border-2 border-white/30 shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <Timer className="w-6 h-6 text-white" />
                    <p className="text-white font-semibold text-lg">Tragerea în:</p>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <div className="flex flex-col items-center">
                      <div className="bg-white rounded-2xl shadow-xl p-4 w-20 h-24 flex items-center justify-center mb-2 transform hover:scale-110 transition-transform">
                        <span className="text-4xl font-bold bg-gradient-tombola bg-clip-text text-transparent">
                          {String(timeLeft.hours).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="text-white text-sm font-medium">Ore</span>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <span className="text-4xl text-white font-bold mb-8">:</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="bg-white rounded-2xl shadow-xl p-4 w-20 h-24 flex items-center justify-center mb-2 transform hover:scale-110 transition-transform">
                        <span className="text-4xl font-bold bg-gradient-tombola bg-clip-text text-transparent">
                          {String(timeLeft.minutes).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="text-white text-sm font-medium">Minute</span>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <span className="text-4xl text-white font-bold mb-8">:</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="bg-white rounded-2xl shadow-xl p-4 w-20 h-24 flex items-center justify-center mb-2 transform hover:scale-110 transition-transform">
                        <span className="text-4xl font-bold bg-gradient-tombola bg-clip-text text-transparent">
                          {String(timeLeft.seconds).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="text-white text-sm font-medium">Secunde</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Tombola;
