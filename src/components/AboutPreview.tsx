import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Target, Award } from "lucide-react";

const AboutPreview = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Despre Nobis Farm Care
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Suntem mai mult decât o farmacie – suntem partenerul tău de încredere în călătoria către o viață sănătoasă. 
              Cu o echipă de farmaciști dedicați și o gamă variată de produse de cea mai înaltă calitate, 
              ne angajăm să oferim consiliere specializată și servicii personalizate pentru fiecare client.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-3">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">15+</div>
                <div className="text-sm text-muted-foreground">Ani de experiență</div>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-3">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">5000+</div>
                <div className="text-sm text-muted-foreground">Produse certificate</div>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-3">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Clienți mulțumiți</div>
              </div>
            </div>

            <Link to="/despre">
              <Button size="lg" className="shadow-lg">
                Află Mai Multe Despre Noi
              </Button>
            </Link>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800"
                alt="Echipa Nobis Farm Care"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-xl border border-border max-w-[280px]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-bold text-foreground">Certificat de Calitate</div>
                  <div className="text-sm text-muted-foreground">ISO 9001:2015</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
