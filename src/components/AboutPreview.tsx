import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Heart, Award, ArrowRight } from "lucide-react";
import pharmacyImage from "@/assets/poza-farmacia.jpeg";

const AboutPreview = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="mb-6">
              <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Despre Nobis Farm</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
                Povestea Noastră de <span className="text-green-600">8 Ani</span>
              </h2>
            </div>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Farmacia Nobis Farm s-a născut din dorința de a oferi comunității noastre 
              <strong className="text-gray-800"> cea mai bună îngrijire farmaceutică</strong>. 
              De peste 8 ani, echipa noastră de farmaciști calificați pune pe primul loc 
              sănătatea și bunăstarea fiecărui client.
            </p>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              <strong className="text-gray-800">Misiunea noastră</strong> este să fim mai mult decât o farmacie – 
              să fim partenerul tău de încredere în călătoria către o viață sănătoasă, oferind 
              consiliere specializată și produse de cea mai înaltă calitate.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-white/80 rounded-lg shadow-sm border border-green-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">8+</div>
                <div className="text-sm text-gray-600">Ani de experiență</div>
              </div>
              
              <div className="text-center p-4 bg-white/80 rounded-lg shadow-sm border border-blue-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-3">
                  <Heart className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">5000+</div>
                <div className="text-sm text-gray-600">Produse certificate</div>
              </div>
              
              <div className="text-center p-4 bg-white/80 rounded-lg shadow-sm border border-green-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">25K+</div>
                <div className="text-sm text-gray-600">Clienți mulțumiți</div>
              </div>
            </div>

            <Link to="/despre">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg group">
                Află Mai Multe Despre Noi
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-green-100 to-blue-100">
              <img
                src={pharmacyImage}
                alt="Farmacia Nobis Farm - Echipa de farmaciști profesioniști"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-green-200 max-w-[280px]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-800">Farmacii Autorizate</div>
                  <div className="text-sm text-gray-600">Ministerul Sănătății</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-blue-200 max-w-[200px]">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">4.9★</div>
                <div className="text-sm text-gray-600">Rating Google Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
