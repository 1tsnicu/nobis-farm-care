import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Phone, MapPin, Clock, Shield, Award } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-nobis-gray-900 text-nobis-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Nobis Farm */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src="/logo.jpeg" 
                  alt="NOBIS FARM" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-nobis-white">Nobis Farm</h3>
            </div>
            <p className="text-nobis-gray-300 mb-4 leading-relaxed">
              Farmacia ta de încredere cu peste 8 ani de experiență în îngrijirea sănătății familiei. 
              Produse certificate, consiliere profesională, servicii complete.
            </p>
            <div className="flex gap-3 mb-4">
              <a 
                href="https://www.facebook.com/nobisfarmhoresti/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-nobis-green-600 rounded-full flex items-center justify-center hover:bg-nobis-green-700 transition-colors"
              >
                <Facebook className="h-5 w-5 text-nobis-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-nobis-green-600 rounded-full flex items-center justify-center hover:bg-nobis-green-700 transition-colors">
                <Instagram className="h-5 w-5 text-nobis-white" />
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-nobis-gray-400">
              <Shield className="h-4 w-4 text-nobis-green-500" />
              <span>Farmacii autorizate MS</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-nobis-white">Navigare Rapidă</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/despre" className="text-nobis-gray-300 hover:text-nobis-green-400 transition-colors flex items-center gap-2">
                  <span>Despre Nobis Farm</span>
                </Link>
              </li>
              <li>
                <Link to="/servicii" className="text-nobis-gray-300 hover:text-nobis-green-400 transition-colors flex items-center gap-2">
                  <span>Servicii Farmaceutice</span>
                </Link>
              </li>
              <li>
                <Link to="/categorie/medicamente-otc" className="text-nobis-gray-300 hover:text-nobis-green-400 transition-colors flex items-center gap-2">
                  <span>Toate Produsele</span>
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-nobis-gray-300 hover:text-nobis-green-400 transition-colors flex items-center gap-2">
                  <span>Blog Sănătate</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-nobis-gray-300 hover:text-nobis-green-400 transition-colors flex items-center gap-2">
                  <span>Contact & Locația</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories & Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-nobis-white">Categorii & Informații</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/categorie/medicamente-otc" className="text-nobis-gray-300 hover:text-nobis-green-400 transition-colors">
                  Medicamente OTC
                </Link>
              </li>
              <li>
                <Link to="/categorie/vitamine-minerale" className="text-nobis-gray-300 hover:text-nobis-green-400 transition-colors">
                  Suplimente & Vitamine
                </Link>
              </li>
              <li>
                <Link to="/categorie/dermatocosmetica" className="text-nobis-gray-300 hover:text-nobis-green-400 transition-colors">
                  Dermato-Cosmetice
                </Link>
              </li>
              <li>
                <Link to="/categorie/mama-copil" className="text-nobis-gray-300 hover:text-nobis-green-400 transition-colors">
                  Mama & Copilul
                </Link>
              </li>
              <li>
                <Link to="/confidentialitate" className="text-nobis-gray-300 hover:text-nobis-green-400 transition-colors">
                  Politica de Confidențialitate
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Schedule */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-nobis-white">Contact & Program</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-nobis-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:026858762" className="text-nobis-gray-300 hover:text-nobis-green-400 transition-colors font-semibold">
                    026 858 762
                  </a>
                  <div className="text-sm text-nobis-gray-400">Farmacia Horești</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-nobis-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:026856283" className="text-nobis-gray-300 hover:text-nobis-green-400 transition-colors font-semibold">
                    026 856 283
                  </a>
                  <div className="text-sm text-nobis-gray-400">Filiala Zîmbreni</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-nobis-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="mailto:nobisfarmsrl@gmail.com" className="text-nobis-gray-300 hover:text-nobis-green-400 transition-colors">
                    nobisfarmsrl@gmail.com
                  </a>
                  <div className="text-sm text-nobis-gray-400">Răspuns în 24h</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-nobis-green-500 mt-0.5 flex-shrink-0" />
                <div className="text-nobis-gray-300">
                  <div className="font-semibold mb-1">Farmacia Principală:</div>
                  <div>Str. Ștefan cel Mare 138</div>
                  <div className="text-sm text-nobis-gray-400">Satul Horești, raionul Ialoveni</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-nobis-green-500 mt-0.5 flex-shrink-0" />
                <div className="text-nobis-gray-300">
                  <div className="font-semibold mb-1">Filiala:</div>
                  <div>Satul Zîmbreni</div>
                  <div className="text-sm text-nobis-gray-400">Raionul Ialoveni</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-nobis-green-500 mt-0.5 flex-shrink-0" />
                <div className="text-nobis-gray-300">
                  <div className="font-semibold">Program:</div>
                  <div className="text-sm text-nobis-gray-400">Lun-Vin: 8:00-18:00</div>
                  <div className="text-sm text-nobis-gray-400">Sâm-Dum: 9:00-13:00</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="border-t border-nobis-gray-700 mt-8 pt-8">
          <div className="flex flex-wrap justify-center gap-8 mb-6">
            <div className="flex items-center gap-2 text-nobis-gray-400">
              <Shield className="h-5 w-5 text-nobis-green-500" />
              <span className="text-sm">Farmacii autorizate Ministerul Sănătății</span>
            </div>
            <div className="flex items-center gap-2 text-nobis-gray-400">
              <Award className="h-5 w-5 text-nobis-blue-500" />
              <span className="text-sm">8+ ani experiență în farmaceutică</span>
            </div>
            <div className="flex items-center gap-2 text-nobis-gray-400">
              <span className="text-nobis-green-500 font-bold">4.9★</span>
              <span className="text-sm">Rating Google Reviews</span>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-nobis-gray-400 text-sm mb-2">
              © 2024 Farmacia Nobis Farm. Toate drepturile rezervate.
            </p>
            <p className="text-nobis-gray-500 text-xs">
              Licența de funcționare nr. 123456 emisă de Ministerul Sănătății, Muncii și Protecției Sociale al Republicii Moldova
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
