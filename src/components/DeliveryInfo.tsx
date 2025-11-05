import { MapPin, Store, Clock, Shield, Heart, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PickupInfo = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Ridicare din Farmacie</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
            Primește <span className="text-green-600">medicamentele</span> rapid și sigur
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comandă online și ridică produsele farmaceutice de care ai nevoie direct din farmacia noastră
          </p>
        </div>

        <div className="grid grid-cols-1 max-w-2xl mx-auto mb-12">
          <Card className="border-gray-200 hover:shadow-xl transition-all duration-300 group ring-2 ring-green-500">
            <CardContent className="p-8 text-center relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Disponibil acum
                </span>
              </div>
              
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-xl mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Store className="h-10 w-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Ridicare din Farmacie
              </h3>
              
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-gray-500" />
                <p className="text-lg font-medium text-gray-700">
                  Gata în 2-3 ore
                </p>
              </div>
              
              <p className="text-2xl font-bold text-green-600 mb-2">
                GRATUIT
              </p>
              
              <div className="mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <p className="text-gray-600 font-semibold">
                    Satul Horești, raionul Ialoveni
                  </p>
                </div>
                <p className="text-gray-600">
                  Strada Ștefan cel Mare 138
                </p>
              </div>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center justify-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>Consiliere farmaceutică gratuită</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Verificare calitate produse</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="border-gray-200 overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2726.049687!2d28.868423776543896!3d46.8269749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c99b824248acbb%3A0x70eb9821ab9d6ade!2sFarmacia%20Nobis%20Farm!5e0!3m2!1sro!2s!4v1699112345678!5m2!1sro!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Nobis Farm - Str. Ștefan cel Mare 138, Horești, Ialoveni"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-gray-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Informații Importante despre Ridicare
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    Siguranța Produselor
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Toate medicamentele sunt păstrate în condiții optime</li>
                    <li>• Produse refrigerate în frigidere speciale</li>
                    <li>• Ambalare sigură și discretă</li>
                    <li>• Verificare validitate la ridicare</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Program Farmacie
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Luni-Vineri: 8:00 - 18:00</li>
                    <li>• Sâmbătă: 9:00 - 13:00</li>
                    <li>• Duminică: 9:00 - 13:00</li>
                    <li>• Notificare SMS când comanda e gata</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    <strong>Pentru urgențe farmaceutice sau întrebări:</strong>
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a href="tel:026858762">
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        <Phone className="mr-2 w-5 h-5" />
                        Sună pentru Urgențe
                      </Button>
                    </a>
                    <Link to="/contact">
                      <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                        Contactează-ne
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PickupInfo;
