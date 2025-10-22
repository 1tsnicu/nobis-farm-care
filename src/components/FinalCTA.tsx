import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail, MapPin, Clock, Stethoscope } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-green-600 to-blue-600 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <Stethoscope className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">Consiliere Farmaceutică Personalizată</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ai nevoie de sfaturi pentru <span className="text-yellow-300">sănătatea ta</span>?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Echipa noastră de farmaciști cu experiență de peste 15 ani este gata să răspundă la toate întrebările tale 
            și să te ghideze către cele mai potrivite soluții pentru sănătatea familiei tale.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 shadow-xl font-semibold">
                <MessageCircle className="h-5 w-5 mr-2" />
                Contactează-ne pentru Consiliere
              </Button>
            </Link>
            <a href="tel:+373-22-123456">
              <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-green-600 shadow-xl backdrop-blur-sm font-semibold">
                <Phone className="h-5 w-5 mr-2" />
                Sună pentru Urgențe
              </Button>
            </a>
          </div>

          {/* Contact Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
              <Phone className="h-8 w-8 text-white mx-auto mb-3" />
              <div className="text-white font-semibold mb-2">Telefon Farmacia</div>
              <a href="tel:+373-22-123456" className="text-white/80 hover:text-white transition-colors text-lg font-medium">
                +373 22 123-456
              </a>
              <div className="text-white/60 text-sm mt-1">Luni - Sâmbătă: 8:00 - 20:00</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
              <Mail className="h-8 w-8 text-white mx-auto mb-3" />
              <div className="text-white font-semibold mb-2">Email</div>
              <a href="mailto:contact@nobisfarm.md" className="text-white/80 hover:text-white transition-colors">
                contact@nobisfarm.md
              </a>
              <div className="text-white/60 text-sm mt-1">Răspuns în 24h</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors md:col-span-2 lg:col-span-1">
              <MapPin className="h-8 w-8 text-white mx-auto mb-3" />
              <div className="text-white font-semibold mb-2">Locația</div>
              <div className="text-white/80">Str. Ștefan cel Mare 123</div>
              <div className="text-white/60 text-sm mt-1">Satul Horești, raionul Ialoveni</div>
            </div>
          </div>

          {/* Special Services */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Servicii Specializate Nobis Farm</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-yellow-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Stethoscope className="h-8 w-8 text-yellow-900" />
                </div>
                <h4 className="text-white font-semibold mb-2">Consiliere Farmaceutică</h4>
                <p className="text-white/80 text-sm">Sfaturi profesionale pentru medicație și sănătate</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Phone className="h-8 w-8 text-blue-900" />
                </div>
                <h4 className="text-white font-semibold mb-2">Consultații Telefonice</h4>
                <p className="text-white/80 text-sm">Răspunsuri rapide la întrebările tale</p>
              </div>
              <div className="text-center">
                <div className="bg-green-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-8 w-8 text-green-900" />
                </div>
                <h4 className="text-white font-semibold mb-2">Program Extins</h4>
                <p className="text-white/80 text-sm">Deschis zilnic pentru comoditatea ta</p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-sm">15+ ani experiență</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-sm">25.000+ clienți mulțumiți</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-sm">Farmacii autorizate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
