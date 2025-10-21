import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-background">Despre Nobis Farm</h3>
            <p className="text-background/80 mb-4">
              Farmacie online de încredere, dedicată sănătății și bunăstării tale. 
              Produse autentice, livrare rapidă, prețuri competitive.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
                <Facebook className="h-5 w-5 text-primary-foreground" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
                <Instagram className="h-5 w-5 text-primary-foreground" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-background">Navigare rapidă</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/despre" className="text-background/80 hover:text-primary transition-colors">
                  Despre Noi
                </Link>
              </li>
              <li>
                <Link to="/servicii" className="text-background/80 hover:text-primary transition-colors">
                  Servicii
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-background/80 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-background/80 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/produse" className="text-background/80 hover:text-primary transition-colors">
                  Toate Produsele
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-background">Informații</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/servicii" className="text-background/80 hover:text-primary transition-colors">
                  Serviciile Noastre
                </Link>
              </li>
              <li>
                <Link to="/produse?oferte=true" className="text-background/80 hover:text-primary transition-colors">
                  Oferte Speciale
                </Link>
              </li>
              <li>
                <Link to="/confidentialitate" className="text-background/80 hover:text-primary transition-colors">
                  Politica de Confidențialitate
                </Link>
              </li>
              <li>
                <Link to="/termeni" className="text-background/80 hover:text-primary transition-colors">
                  Termeni și Condiții
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-background/80 hover:text-primary transition-colors">
                  Politica Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-background">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <a href="mailto:contact@nobisfarm.md" className="text-background/80 hover:text-primary transition-colors">
                  contact@nobisfarm.md
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <a href="tel:+37360123456" className="text-background/80 hover:text-primary transition-colors">
                  +373 60 123 456
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-background/80">
                  Str. Mihai Eminescu 47, Chișinău, Moldova
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-background/70">
            © 2024 Nobis Farm. Toate drepturile rezervate.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
