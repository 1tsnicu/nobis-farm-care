import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Shield, 
  Clock, 
  ArrowRight, 
  Star, 
  Stethoscope,
  Users,
  Award,
  Phone
} from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-100/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-green-50/30 to-blue-50/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Trust Badge */}
            <div className="flex justify-center lg:justify-start">
              <Badge className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 text-sm font-semibold shadow-lg hover:scale-105 transition-transform">
                <Shield className="w-4 h-4 mr-2 inline" />
                Farmacie autorizată
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-green-700">Nobis Farm:</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Sănătate și Bunăstare
                </span>
                <br />
                <span className="text-gray-800">la Îndemâna Ta</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                Farmacia ta de încredere cu <span className="text-green-700 font-bold">peste 8 ani</span> de experiență în îngrijirea sănătății familiei tale
              </p>
            </div>

            {/* Key Benefits Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-2xl mx-auto lg:mx-0">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-green-100 hover:border-green-300 transition-colors group text-center">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                  <Stethoscope className="w-6 h-6 text-green-600" />
                </div>
                <p className="font-semibold text-sm text-gray-800">Consiliere</p>
                <p className="text-xs text-gray-600">Specializată</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100 hover:border-blue-300 transition-colors group text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-semibold text-sm text-gray-800">Gamă Variată</p>
                <p className="text-xs text-gray-600">5000+ produse</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-green-100 hover:border-green-300 transition-colors group text-center">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <p className="font-semibold text-sm text-gray-800">Prețuri</p>
                <p className="text-xs text-gray-600">Competitive</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100 hover:border-blue-300 transition-colors group text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-semibold text-sm text-gray-800">Program</p>
                <p className="text-xs text-gray-600">Extins</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/produse">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-lg px-8 py-6 rounded-xl group shadow-lg">
                  Vezi Produsele Noastre
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-lg px-8 py-6 rounded-xl">
                  <Phone className="mr-2 w-5 h-5" />
                  Contactează-ne
                </Button>
              </Link>
            </div>

            {/* Trust Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-8 pt-4">
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">8+</p>
                <p className="text-sm text-gray-600">Ani experiență</p>
              </div>
              <div className="w-px h-12 bg-gray-300" />
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">25K+</p>
                <p className="text-sm text-gray-600">Clienți mulțumiți</p>
              </div>
              <div className="w-px h-12 bg-gray-300" />
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">5★</p>
                <p className="text-sm text-gray-600">Rating Google</p>
              </div>
            </div>
          </div>

          {/* Right Side - Hero Image */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-white/90 to-green-50/90 rounded-3xl p-8 shadow-2xl border border-green-100 backdrop-blur-xl overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-200/30 to-blue-200/30 rounded-full blur-3xl -translate-y-32 translate-x-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-200/30 to-green-200/30 rounded-full blur-3xl translate-y-32 -translate-x-32" />
              
              <div className="relative z-10 space-y-6">
                {/* Hero Image */}
                <div className="aspect-[4/3] bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl flex items-center justify-center overflow-hidden">
                  <img 
                    src="/poza cu farmacia.jpeg" 
                    alt="Farmacia Nobis Farm - Interior modern și primitor"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Quick Contact Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-green-200">
                  <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Consiliere Farmaceutică Gratuită
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Echipa noastră de farmaciști cu experiență îți oferă consiliere personalizată pentru toate nevoile tale de sănătate.
                  </p>
                  <Link to="/contact">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg">
                      Contactează-ne pentru Consiliere
                    </Button>
                  </Link>
                </div>

                {/* Emergency Contact */}
                <div className="text-center bg-red-50 rounded-xl p-4 border border-red-200">
                  <p className="text-sm text-red-800 font-semibold">
                    🚨 Urgență? Sună-ne acum: 
                    <a href="tel:026858762" className="block text-lg font-bold hover:underline">
                      026 858 762
                    </a>
                  </p>
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
