import { Truck, MapPin, Store, Clock, Shield, Heart, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const deliveryOptions = [
  {
    icon: Store,
    title: "Ridicare din Farmacie",
    time: "Imediat disponibil",
    cost: "GRATUIT",
    details: "Consiliere farmaceutică inclusă",
    color: "from-green-500 to-green-600",
    highlight: true
  },
  {
    icon: Truck,
    title: "Livrare în Chișinău",
    time: "2-4 ore",
    cost: "25 MDL",
    details: "Gratuită pentru comenzi > 300 MDL",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: MapPin,
    title: "Livrare în țară",
    time: "24-48 ore",
    cost: "35 MDL",
    details: "Gratuită pentru comenzi > 500 MDL",
    color: "from-purple-500 to-purple-600"
  }
];

const DeliveryInfo = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Opțiuni de Livrare</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
            Primește <span className="text-green-600">medicamentele</span> rapid și sigur
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Alege opțiunea care ți se potrivește cel mai bine pentru a primi produsele farmaceutice de care ai nevoie
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {deliveryOptions.map((option, index) => (
            <Card key={index} className={`border-gray-200 hover:shadow-xl transition-all duration-300 group ${option.highlight ? 'ring-2 ring-green-500' : ''}`}>
              <CardContent className="p-8 text-center relative">
                {option.highlight && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Recomandat
                    </span>
                  </div>
                )}
                
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${option.color} rounded-xl mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <option.icon className="h-10 w-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {option.title}
                </h3>
                
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <p className="text-lg font-medium text-gray-700">
                    {option.time}
                  </p>
                </div>
                
                <p className="text-2xl font-bold text-green-600 mb-2">
                  {option.cost}
                </p>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {option.details}
                </p>

                {option.highlight && (
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
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-gray-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Informații Importante despre Livrare
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    Siguranța Produselor
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Toate medicamentele sunt transportate în condiții optime</li>
                    <li>• Produse refrigerate în containere speciale</li>
                    <li>• Ambalare sigură și discretă</li>
                    <li>• Verificare validitate la livrare</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Programul de Livrare
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Luni-Vineri: 9:00 - 18:00</li>
                    <li>• Sâmbătă: 10:00 - 16:00</li>
                    <li>• Livrări urgente disponibile</li>
                    <li>• Notificare SMS înainte de livrare</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    <strong>Pentru urgențe farmaceutice sau întrebări despre livrare:</strong>
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a href="tel:+373-22-123456">
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        <Phone className="mr-2 w-5 h-5" />
                        Sună pentru Livrare Urgentă
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

export default DeliveryInfo;
