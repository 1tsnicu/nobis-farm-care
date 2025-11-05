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
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-green-100 hover:border-green-400 hover:shadow-lg hover:shadow-green-200/50 transition-all duration-300 group text-center hover:-translate-y-1">
                <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-full w-14 h-14 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <Stethoscope className="w-7 h-7 text-green-600" />
                </div>
                <p className="font-bold text-sm text-gray-800">Consiliere</p>
                <p className="text-xs text-gray-500 font-medium">Specializată</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-blue-100 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-300 group text-center hover:-translate-y-1">
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-full w-14 h-14 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <Heart className="w-7 h-7 text-blue-600" />
                </div>
                <p className="font-bold text-sm text-gray-800">Gamă Variată</p>
                <p className="text-xs text-gray-500 font-medium">5000+ produse</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-green-100 hover:border-green-400 hover:shadow-lg hover:shadow-green-200/50 transition-all duration-300 group text-center hover:-translate-y-1">
                <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-full w-14 h-14 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <Award className="w-7 h-7 text-green-600" />
                </div>
                <p className="font-bold text-sm text-gray-800">Prețuri</p>
                <p className="text-xs text-gray-500 font-medium">Competitive</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-blue-100 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-300 group text-center hover:-translate-y-1">
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-full w-14 h-14 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <Clock className="w-7 h-7 text-blue-600" />
                </div>
                <p className="font-bold text-sm text-gray-800">Program</p>
                <p className="text-xs text-gray-500 font-medium">Extins</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Link to="/categorie/medicamente-otc" className="flex-1 sm:flex-none">
                <Button size="lg" className="w-full bg-gradient-to-r from-green-600 via-green-600 to-emerald-600 hover:from-green-700 hover:via-green-700 hover:to-emerald-700 text-white text-lg px-10 py-6 rounded-xl group shadow-lg hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-1">
                  Vezi Produsele Noastre
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact" className="flex-1 sm:flex-none">
                <Button size="lg" variant="outline" className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-lg px-10 py-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/30">
                  <Phone className="mr-2 w-5 h-5" />
                  Contactează-ne
                </Button>
              </Link>
            </div>

            {/* Trust Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-8 pt-8">
              <div className="text-center">
                <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">8+</p>
                <p className="text-sm text-gray-600 font-medium mt-1">Ani experiență</p>
              </div>
              <div className="w-px h-14 bg-gradient-to-b from-green-200 to-blue-200" />
              <div className="text-center">
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">25K+</p>
                <p className="text-sm text-gray-600 font-medium mt-1">Clienți mulțumiți</p>
              </div>
              <div className="w-px h-14 bg-gradient-to-b from-blue-200 to-green-200" />
              <div className="text-center">
                <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">5★</p>
                <p className="text-sm text-gray-600 font-medium mt-1">Rating Google</p>
              </div>
            </div>
          </div>

          {/* Right Side - Hero Image */}
          <div className="relative group">
            {/* Background Glow Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/25 to-blue-400/25 rounded-3xl blur-3xl group-hover:blur-4xl transition-all duration-700 opacity-0 group-hover:opacity-100" />
            <div className="absolute -inset-2 bg-gradient-to-r from-green-300/20 via-blue-300/20 to-green-300/20 rounded-4xl blur-2xl opacity-50 group-hover:opacity-70 transition-all duration-700" />
            
            <div className="relative bg-gradient-to-br from-white/98 via-green-50/95 to-blue-50/95 rounded-4xl shadow-2xl border border-green-100/80 backdrop-blur-xl overflow-hidden hover:shadow-3xl hover:border-green-300 transition-all duration-500">
              {/* Premium Decorative Background Elements */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-green-200/50 to-blue-200/30 rounded-full blur-3xl -translate-y-40 translate-x-40 group-hover:scale-125 transition-transform duration-700 animate-pulse" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-200/50 to-green-200/30 rounded-full blur-3xl translate-y-40 -translate-x-40 group-hover:scale-125 transition-transform duration-700 animate-pulse" style={{ animationDelay: '1s' }} />
              
              {/* Floating Accent Shapes */}
              <div className="absolute top-10 left-8 w-20 h-20 bg-gradient-to-br from-green-400/20 to-transparent rounded-3xl blur-xl group-hover:rotate-12 transition-transform duration-500" />
              <div className="absolute top-1/3 right-12 w-16 h-16 bg-gradient-to-bl from-blue-400/20 to-transparent rounded-full blur-xl group-hover:-rotate-12 transition-transform duration-500" />
              <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-tr from-green-300/15 to-transparent rounded-2xl blur-2xl group-hover:scale-110 transition-transform duration-500" />
              
              <div className="relative z-10 space-y-6 p-4 md:p-8">
                {/* Hero Image - Larger */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-300/30 to-blue-300/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                  <div className="relative aspect-[5/4] md:aspect-[16/12] bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl flex items-center justify-center overflow-hidden shadow-2xl border-4 border-white/50 hover:shadow-2xl hover:shadow-green-200/50 transition-all duration-500">
                    <img 
                      src="/poza cu farmacia.jpeg" 
                      alt="Farmacia Nobis Farm - Interior modern și primitor"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-105"
                    />
                    {/* Image Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Trust Badge at Bottom */}
                <div className="flex items-center justify-center gap-4 pt-2 px-4">
                  <div className="flex items-center gap-2 text-center">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-xs md:text-sm font-semibold text-gray-700">100% Sigur</span>
                  </div>
                  <div className="w-px h-6 bg-gray-300" />
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    <span className="text-xs md:text-sm font-semibold text-gray-700">Autorizat</span>
                  </div>
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
