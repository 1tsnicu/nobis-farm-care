import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Stethoscope, 
  Activity, 
  FlaskConical, 
  Pill, 
  Phone,
  ClipboardList,
  Heart,
  Package,
  Clock,
  Shield,
  Users,
  MapPin,
  Thermometer,
  CheckCircle
} from "lucide-react";
import consultation from "@/assets/consultation.jpg";
import vitalSigns from "@/assets/vital-signs.jpg";
import pharmacyShelves from "@/assets/pharmacy-shelves.jpg";
import pharmacyInterior from "@/assets/pharmacy-interior-1.jpg";

const services = [
  {
    icon: Stethoscope,
    title: "Consiliere Farmaceutică Personalizată",
    description: "Farmaciștii noștri cu experiență de peste 8 ani oferă consultații profesionale pentru alegerea corectă a medicamentelor și tratamentelor.",
    features: [
      "Evaluarea interacțiunilor medicamentoase",
      "Recomandări personalizate de tratament", 
      "Explicații detaliate despre administrare și efecte",
      "Monitorizarea efectelor adverse și aderența la tratament"
    ],
    image: consultation,
    color: "from-green-500 to-green-600",
    price: "GRATUIT"
  },
  {
    icon: Activity,
    title: "Măsurarea Parametrilor Vitali",
    description: "Servicii gratuite de monitorizare a sănătății cu echipamente profesionale calibrate și certificate.",
    features: [
      "Măsurarea tensiunii arteriale (tensiometru digital)",
      "Monitorizarea glicemiei (glucometru de precizie)",
      "Măsurarea temperaturii (termometru infraroșu)",
      "Evaluarea saturației de oxigen (pulsoximetru)"
    ],
    image: vitalSigns,
    color: "from-blue-500 to-blue-600",
    price: "GRATUIT"
  },
  {
    icon: FlaskConical,
    title: "Testări Rapide Certificate",
    description: "Teste medicale rapide și precise, efectuate în condiții optime de siguranță de către personal calificat.",
    features: [
      "Test rapid COVID-19 (antigen și anticorpi)",
      "Test de sarcină (rezultat în 5 minute)",
      "Test nivelul colesterolului total și HDL/LDL",
      "Test nivel vitamina D și B12"
    ],
    image: pharmacyShelves,
    color: "from-purple-500 to-purple-600",
    price: "de la 50 MDL"
  },
  {
    icon: Pill,
    title: "Eliberare Rețete & Consultații",
    description: "Procesare rapidă și sigură a rețetelor electronice și fizice cu verificare completă și consiliere inclusă.",
    features: [
      "Verificarea automată și manuală a rețetelor",
      "Înlocuirea cu produse generice echivalente",
      "Suport pentru rețete cronice și repetitive",
      "Consultație farmaceutică inclusă la fiecare eliberare"
    ],
    image: pharmacyShelves,
    color: "from-orange-500 to-orange-600",
    price: "conform rețetei"
  },
  {
    icon: Package,
    title: "Comenzi Speciale & Import",
    description: "Comandăm produse care nu sunt în stoc pentru nevoile tale specifice, inclusiv medicamente rare și echipamente specializate.",
    features: [
      "Medicamente rare și specializate din import",
      "Echipamente medicale personalizate",
      "Produse dermato-cosmetice premium",
      "Ridicare garantată în maxim 24 ore lucrătoare"
    ],
    image: pharmacyInterior,
    color: "from-indigo-500 to-indigo-600",
    price: "preț la comandă"
  },
  {
    icon: ClipboardList,
    title: "Program de Monitorizare Cronică",
    description: "Te ajutăm să ții sub control tratamentele cronice cu un sistem complet de monitorizare și urmărire.",
    features: [
      "Planificare și organizare tratamente cronice",
      "Reminder-uri personalizate pentru administrare",
      "Monitorizare aderență la tratament",
      "Rapoarte detaliate pentru medicul curant"
    ],
    image: consultation,
    color: "from-teal-500 to-teal-600",
    price: "GRATUIT"
  }
];

const additionalServices = [
  {
    icon: Phone,
    title: "Consultații Telefonice",
    description: "Răspunsuri rapide la întrebări despre medicamente și tratamente"
  },
  {
    icon: Clock,
    title: "Program Extins",
    description: "Deschis zilnic: Luni-Vineri 8:00-18:00, Weekend 9:00-13:00"
  },
  {
    icon: Shield,
    title: "Garanția Calității",
    description: "Toate produsele sunt certificate și cu garanție de autenticitate"
  },
  {
    icon: MapPin,
    title: "Locație Centrală",
    description: "Amplasare convenabilă în centrul orașului cu parcare disponibilă"
  }
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-green-600 to-blue-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200')] bg-cover bg-center opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
                <Stethoscope className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">Servicii Farmaceutice Nobis Farm</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Servicii <span className="text-yellow-300">Complete</span> pentru Sănătatea Ta
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                De la consiliere farmaceutică specializată până la testări rapide și monitorizare cronică - 
                toate sub un singur acoperiș, cu experiența de 8+ ani.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">6</div>
                  <div className="text-white/80 text-sm">Servicii Principale</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">8+</div>
                  <div className="text-white/80 text-sm">Ani Experiență</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">25K+</div>
                  <div className="text-white/80 text-sm">Clienți Mulțumiți</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="space-y-24 max-w-7xl mx-auto">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl mb-6 shadow-lg`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <h2 className="text-3xl font-bold text-gray-800">
                        {service.title}
                      </h2>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {service.price}
                      </span>
                    </div>
                    
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-4 mb-8">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                          <span className="text-gray-700 leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link to="/contact">
                        <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                          <Phone className="h-5 w-5 mr-2" />
                          Programează-te Acum
                        </Button>
                      </Link>
                      <a href="tel:026858762">
                        <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                          <Phone className="h-5 w-5 mr-2" />
                          Sună pentru Info
                        </Button>
                      </a>
                    </div>
                  </div>
                  
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow group">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Servicii Suplimentare</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
                Avantaje <span className="text-green-600">Nobis Farm</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Beneficiile suplimentare care fac diferența în experiența ta
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {additionalServices.map((service, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border-gray-200 bg-white/80 backdrop-blur-sm">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl mb-4">
                    <service.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Services */}
        <section className="py-16 bg-red-50 border-l-4 border-red-500">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="bg-red-500 rounded-full p-3 flex-shrink-0">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-red-800 mb-2">
                    Servicii de Urgență Farmaceutică
                  </h3>
                  <p className="text-red-700 mb-4">
                    Pentru urgențe farmaceutice sau întrebări critice despre medicamente, suntem disponibili la:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="tel:026858762" className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
                      <Phone className="h-5 w-5" />
                      <span className="font-semibold">026 858 762</span>
                    </a>
                    <span className="text-red-600 font-medium self-center">
                      Disponibil: Luni-Vineri 8:00-18:00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto border-green-200 shadow-xl">
              <CardContent className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-6">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Ai nevoie de mai multe informații?
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Echipa noastră de farmaciști cu experiență este gata să răspundă la toate întrebările tale. 
                  Contactează-ne pentru detalii suplimentare sau pentru a programa o consultație gratuită.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/contact">
                    <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                      <MapPin className="h-5 w-5 mr-2" />
                      Vizitează Farmacia
                    </Button>
                  </Link>
                  <a href="tel:026858762">
                    <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                      <Phone className="h-5 w-5 mr-2" />
                      026 858 762
                    </Button>
                  </a>
                </div>
                
                {/* Trust Indicators */}
                <div className="mt-8 flex flex-wrap justify-center gap-6 text-gray-500 text-sm">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>Farmacii autorizate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span>8+ ani experiență</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-green-600" />
                    <span>25.000+ clienți</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
