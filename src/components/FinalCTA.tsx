import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary-foreground rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary-foreground rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ai nevoie de consiliere personalizată?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Echipa noastră de farmaciști calificați este gata să răspundă la toate întrebările tale 
            și să te ghideze către cele mai potrivite soluții pentru sănătatea ta.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="shadow-xl">
                <MessageCircle className="h-5 w-5 mr-2" />
                Trimite Mesaj
              </Button>
            </Link>
            <a href="tel:+37360123456">
              <Button size="lg" variant="outline" className="bg-primary-foreground/10 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary shadow-xl backdrop-blur-sm">
                <Phone className="h-5 w-5 mr-2" />
                Sună Acum
              </Button>
            </a>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20">
              <Phone className="h-8 w-8 text-primary-foreground mx-auto mb-3" />
              <div className="text-primary-foreground font-semibold mb-1">Telefon</div>
              <a href="tel:+37360123456" className="text-primary-foreground/80 hover:text-primary-foreground">
                +373 60 123 456
              </a>
            </div>
            
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20">
              <Mail className="h-8 w-8 text-primary-foreground mx-auto mb-3" />
              <div className="text-primary-foreground font-semibold mb-1">Email</div>
              <a href="mailto:contact@nobisfarm.md" className="text-primary-foreground/80 hover:text-primary-foreground">
                contact@nobisfarm.md
              </a>
            </div>
            
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20">
              <MessageCircle className="h-8 w-8 text-primary-foreground mx-auto mb-3" />
              <div className="text-primary-foreground font-semibold mb-1">Chat Online</div>
              <div className="text-primary-foreground/80">Luni - Vineri: 9:00 - 18:00</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
