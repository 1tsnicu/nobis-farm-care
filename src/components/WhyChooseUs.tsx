import { Shield, Stethoscope, Heart, Clock, Users, Award } from "lucide-react";

const features = [
  {
    icon: Stethoscope,
    title: "Consiliere Specializată",
    description: "Farmaciști cu experiență pentru sfaturi personalizate și profesionale",
    color: "bg-green-500"
  },
  {
    icon: Heart,
    title: "Gamă Variată de Produse", 
    description: "Peste 5000 de produse certificate pentru toate nevoile de sănătate",
    color: "bg-blue-500"
  },
  {
    icon: Award,
    title: "Prețuri Competitive",
    description: "Cele mai bune oferte și promoții pentru familiile din Moldova",
    color: "bg-green-500"
  },
  {
    icon: Clock,
    title: "Program Extins", 
    description: "Deschis zilnic cu program extins pentru comoditatea ta",
    color: "bg-blue-500"
  },
  {
    icon: Shield,
    title: "100% Autentice",
    description: "Garantăm autenticitatea și calitatea fiecărui produs vândut",
    color: "bg-green-500"
  },
  {
    icon: Users,
    title: "Echipă Dedicată",
    description: "15+ ani de experiență în îngrijirea sănătății comunității noastre",
    color: "bg-blue-500"
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Avantajele Nobis Farm</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
            De ce să ne alegi pe <span className="text-green-600">noi</span>?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Farmacia Nobis Farm îți oferă cele mai bune servicii farmaceutice cu o abordare personalizată pentru fiecare client
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="group p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300">
              <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.color} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 max-w-3xl mx-auto border border-green-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Descoperă diferența Nobis Farm
            </h3>
            <p className="text-gray-600 mb-6">
              Alătură-te celor peste 25.000 de clienți mulțumiți care au ales să aibă încredere în expertiza noastră farmaceutică.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white rounded-lg p-4 border border-green-200 text-center">
                <div className="text-2xl font-bold text-green-600">4.9★</div>
                <div className="text-sm text-gray-600">Rating Google</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-200 text-center">
                <div className="text-2xl font-bold text-blue-600">15+</div>
                <div className="text-sm text-gray-600">Ani experiență</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200 text-center">
                <div className="text-2xl font-bold text-green-600">25K+</div>
                <div className="text-sm text-gray-600">Clienți</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
