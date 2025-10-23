import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, Heart, Award, CheckCircle, MapPin, Phone, Mail, Clock, Shield, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import pharmacyTeam from "@/assets/pharmacy-team.jpg";
import pharmacyInterior from "@/assets/pharmacy-interior-1.jpg";
import pharmacyShelves from "@/assets/pharmacy-shelves.jpg";
import consultationRoom from "@/assets/consultation-room.jpg";

const teamMembers = [
  {
    name: "Dr. Elena Popescu",
    role: "Farmacist Șef",
    experience: "20+ ani experiență",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
    description: "Specializată în farmacie clinică și consiliere pentru boli cronice",
    specialties: ["Diabet", "Hipertensiune", "Cardiologie"]
  },
  {
    name: "Dr. Maria Ionescu", 
    role: "Farmacist Senior",
    experience: "8+ ani experiență",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400",
    description: "Expert în dermato-cosmetică și produse pentru îngrijirea pielii",
    specialties: ["Dermatologie", "Cosmetică", "Alergii"]
  },
  {
    name: "Dr. Andrei Moraru",
    role: "Farmacist",
    experience: "12+ ani experiență", 
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
    description: "Specialist în suplimente nutritive și medicina naturistă",
    specialties: ["Nutriție", "Naturiste", "Wellness"]
  },
  {
    name: "Dr. Ana Rusu",
    role: "Farmacist",
    experience: "8+ ani experiență",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400",
    description: "Specializată în îngrijirea mamei și copilului",
    specialties: ["Pediatrie", "Maternitate", "Familie"]
  }
];

const values = [
  {
    icon: Heart,
    title: "Grijă pentru Clienți",
    description: "Fiecare client este unic și merită atenție personalizată pentru nevoile sale de sănătate"
  },
  {
    icon: Shield,
    title: "Calitate Garantată",
    description: "Doar produse certificate și verificate de la producători autorizați și de încredere"
  },
  {
    icon: Stethoscope,
    title: "Profesionalism",
    description: "Echipă de farmaciști calificați cu experiență vastă în domeniul farmaceutic"
  },
  {
    icon: Award,
    title: "Inovație Continuă",
    description: "Adoptăm cele mai noi tehnologii și practici pentru servicii farmaceutice superioare"
  }
];

const achievements = [
  { number: "8+", label: "Ani de experiență" },
  { number: "25,000+", label: "Clienți mulțumiți" },
  { number: "5,000+", label: "Produse certificate" },
  { number: "4.9★", label: "Rating Google Reviews" }
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-green-600 to-blue-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200')] bg-cover bg-center opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
                <Heart className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">Despre Farmacia Nobis Farm</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Povestea Noastră de <span className="text-yellow-300">8 Ani</span>
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Suntem mai mult decât o farmacie – suntem partenerul tău de încredere pentru o viață sănătoasă, 
                dedicați îngrijirii și bunăstării familiei tale.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-yellow-300">{achievement.number}</div>
                    <div className="text-white/80 text-sm">{achievement.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Povestea Nobis Farm</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-6">
                  O călătorie dedicată <span className="text-green-600">sănătății tale</span>
                </h2>
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p className="text-lg">
                    <strong className="text-gray-800">Farmacia Nobis Farm a fost fondată în 2009</strong> cu o viziune clară: 
                    să oferim comunității noastre din Moldova acces la produse farmaceutice de cea mai înaltă calitate, 
                    însoțite de consiliere profesionistă și personalizată.
                  </p>
                  <p>
                    De-a lungul acestor <strong>8 ani de activitate</strong>, am crescut constant, evoluând de la o farmacie 
                    locală la o rețea de încredere care servește peste 25.000 de familii în toată Moldova. 
                    Fiecare zi ne-a adus mai aproape de clienții noștri și ne-a întărit convingerea că sănătatea este cea mai prețioasă avere.
                  </p>
                  <p>
                    <strong className="text-gray-800">Succesul nostru se bazează pe încrederea</strong> pe care ne-o acordă clienții zi de zi, 
                    pe dedicarea echipei noastre de farmaciști calificați și pe angajamentul nostru constant de a oferi 
                    servicii farmaceutice de excelență.
                  </p>
                  <p>
                    Astăzi, continuăm să investim în formarea continuă a echipei, în cele mai noi tehnologii farmaceutice 
                    și în extinderea gamei de produse, menținând întotdeauna aceleași valori fundamentale: 
                    <strong className="text-green-600"> calitate, încredere și grijă pentru oameni</strong>.
                  </p>
                </div>
                <div className="mt-8">
                  <Link to="/contact">
                    <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                      <Phone className="mr-2 w-5 h-5" />
                      Contactează Echipa Noastră
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={pharmacyTeam}
                    alt="Interior farmacie Nobis Farm - modern și primitor"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating Cards */}
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-green-200 max-w-[250px]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Award className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">Farmacii Autorizate</div>
                      <div className="text-sm text-gray-600">Ministerul Sănătății RM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Misiunea & Viziunea</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
                Ce ne <span className="text-green-600">motivează</span> în fiecare zi
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="p-8 border-green-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Misiunea Noastră</h3>
                <p className="text-gray-600 leading-relaxed">
                  Să oferim servicii farmaceutice de excepție prin asigurarea accesului la medicamente și 
                  produse de sănătate de calitate superioară, împreună cu consiliere profesionistă 
                  personalizată pentru fiecare client. Ne dedicăm îmbunătățirii sănătății și calității vieții 
                  în comunitatea moldovenească, fiind un partener de încredere pentru familiile noastre.
                </p>
              </Card>
              
              <Card className="p-8 border-blue-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Viziunea Noastră</h3>
                <p className="text-gray-600 leading-relaxed">
                  Să devenim cea mai de încredere rețea de farmacii din Moldova, recunoscută pentru 
                  excelența serviciilor, inovație în domeniul farmaceutic și contribuția activă la 
                  promovarea unui stil de viață sănătos. Aspirăm să fim prima alegere pentru nevoile 
                  de sănătate ale fiecărei familii moldovenești.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Valorile Nobis Farm</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
                Principiile care ne <span className="text-green-600">ghidează</span> fiecare zi
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Valorile noastre fundamentale definesc modul în care interacționăm cu clienții și comunitatea
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl mb-6 group-hover:shadow-lg transition-shadow">
                    <value.icon className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Echipa Nobis Farm</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
                Farmaciști <span className="text-green-600">dedicați</span> sănătății tale
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Echipa noastră de profesioniști este pregătită să îți ofere cea mai bună consiliere farmaceutică
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-gray-200">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-green-600 font-medium mb-1">
                      {member.role}
                    </p>
                    <p className="text-sm text-blue-600 font-medium mb-3">
                      {member.experience}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      {member.description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-1">
                      {member.specialties.map((specialty, idx) => (
                        <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Galerie Foto</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
                O privire în <span className="text-green-600">farmacia</span> noastră
              </h2>
              <p className="text-lg text-gray-600">
                Descoperă spațiul modern și primitor al farmaciei Nobis Farm
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { src: pharmacyInterior, alt: "Interior farmacie modern și organizat" },
                { src: consultationRoom, alt: "Consiliere farmaceutică personalizată" },
                { src: pharmacyShelves, alt: "Gamă variată de produse certificate" },
                { src: pharmacyTeam, alt: "Echipa de farmaciști la lucru" },
                { src: consultationRoom, alt: "Zona de consultații private" },
                { src: pharmacyShelves, alt: "Produse organizate pe categorii" }
              ].map((image, index) => (
                <div key={index} className="aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Vrei să afli mai multe despre noi?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Vizitează farmacia noastră sau contactează-ne pentru orice întrebare despre produsele și serviciile noastre.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                    <MapPin className="mr-2 w-5 h-5" />
                    Vezi Locația Noastră
                  </Button>
                </Link>
                <a href="tel:026858762">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                    <Phone className="mr-2 w-5 h-5" />
                    Sună pentru Informații
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
