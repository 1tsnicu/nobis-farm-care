import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram, 
  MessageCircle, 
  Stethoscope,
  Car,
  Shield,
  Users,
  Calendar
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mesajul tău a fost trimis cu succes! Echipa Nobis Farm te va contacta în curând.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Farmacia Horești",
      info: "026 858 762",
      description: "Farmacia principală",
      link: "tel:026858762",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Phone,
      title: "Filiala Zîmbreni",
      info: "026 856 283",
      description: "Farmacia filială",
      link: "tel:026856283",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Mail,
      title: "Email Contact",
      info: "nobisfarmsrl@gmail.com",
      description: "Răspundem în 24h",
      link: "mailto:nobisfarmsrl@gmail.com",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: MapPin,
      title: "Locația Principală",
      info: "Str. Ștefan cel Mare 138",
      description: "Satul Horești, raionul Ialoveni",
      link: "https://maps.google.com",
      color: "from-orange-500 to-orange-600"
    }
  ];

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
                <span className="text-white font-semibold">Contact Farmacia Nobis Farm</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-yellow-300">Contactează-ne</span> pentru Consiliere
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Echipa noastră de farmaciști cu experiență de peste 15 ani este gata să răspundă 
                la toate întrebările tale despre sănătate și medicație
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">24/6</div>
                  <div className="text-white/80 text-sm">Consiliere Disponibilă</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">8+</div>
                  <div className="text-white/80 text-sm">Ani Experiență</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">GRATUIT</div>
                  <div className="text-white/80 text-sm">Consultația</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Methods Cards */}
        <section className="py-12 -mt-12 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {contactMethods.map((method, index) => (
                <Card key={index} className="border-gray-200 shadow-xl hover:shadow-2xl transition-shadow group">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                      <method.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">{method.title}</h3>
                    <a href={method.link} className="text-green-600 hover:text-green-700 font-semibold block">
                      {method.info}
                    </a>
                    <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              {/* Contact Form */}
              <div>
                <div className="mb-8">
                  <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Formular Contact</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
                    Trimite-ne un <span className="text-green-600">mesaj</span>
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Completează formularul de mai jos pentru întrebări despre produse, servicii sau pentru a programa o consultație. 
                    Te vom contacta în cel mai scurt timp posibil.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-gray-700 font-semibold">Nume complet *</Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        placeholder="Ion Popescu"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-2 border-gray-300 focus:border-green-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-gray-700 font-semibold">Telefon *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        placeholder="026 858 762"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-2 border-gray-300 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-semibold">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="ion.popescu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-2 border-gray-300 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-gray-700 font-semibold">Subiectul mesajului *</Label>
                    <select
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:border-green-500 focus:outline-none"
                    >
                      <option value="">Selectează subiectul</option>
                      <option value="consiliere">Consiliere farmaceutică</option>
                      <option value="produse">Întrebări despre produse</option>
                      <option value="rețete">Eliberare rețete</option>
                      <option value="comenzi">Comenzi speciale</option>
                      <option value="altele">Altele</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-700 font-semibold">Mesajul tău *</Label>
                    <Textarea
                      id="message"
                      required
                      placeholder="Descrie în detaliu întrebarea ta sau situația pentru care ai nevoie de consiliere..."
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-2 border-gray-300 focus:border-green-500"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white">
                    <MessageCircle className="mr-2 w-5 h-5" />
                    Trimite Mesajul
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    * Prin trimiterea acestui formular, accepți să fii contactat de echipa Nobis Farm
                  </p>
                </form>
              </div>

              {/* Pharmacy Info & Map */}
              <div>
                <div className="mb-8">
                  <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Vizitează Farmacia</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
                    Locația <span className="text-green-600">Nobis Farm</span>
                  </h2>
                </div>
                
                {/* Map */}
                <div className="aspect-video rounded-xl overflow-hidden shadow-xl mb-6 border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2719.234!2d28.755833!3d46.947222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDU2JzUwLjAiTiAyOMKwNDUnMjEuMCJF!5e0!3m2!1sro!2smd!4v1620000000000!5m2!1sro!2smd"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Nobis Farm - Str. Ștefan cel Mare 138, Horești"
                  ></iframe>
                </div>

                {/* Location Details */}
                <Card className="mb-6 border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <MapPin className="h-6 w-6 text-green-600" />
                      <h3 className="text-xl font-bold text-gray-800">Adresa Completă</h3>
                    </div>
                    <div className="space-y-2 text-gray-600">
                      <p className="text-lg font-semibold text-gray-800">Strada Ștefan cel Mare 138</p>
                      <p>Satul Horești, raionul Ialoveni</p>
                      <p>Republica Moldova</p>
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="font-semibold text-blue-800 mb-2">Filiala Zîmbreni:</div>
                        <p className="text-blue-700">Satul Zîmbreni, raionul Ialoveni</p>
                        <p className="text-blue-700">Tel: 026 856 283</p>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Car className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Parcare disponibilă în zonă</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Schedule */}
                <Card className="mb-6 border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="h-6 w-6 text-blue-600" />
                      <h3 className="text-xl font-bold text-gray-800">Program de Lucru</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Luni - Vineri:</span>
                        <span className="font-semibold text-gray-800 bg-green-100 px-3 py-1 rounded-full text-sm">8:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Sâmbătă:</span>
                        <span className="font-semibold text-gray-800 bg-blue-100 px-3 py-1 rounded-full text-sm">9:00 - 13:00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Duminică:</span>
                        <span className="font-semibold text-gray-800 bg-purple-100 px-3 py-1 rounded-full text-sm">9:00 - 13:00</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                      <p className="text-red-700 text-sm">
                        <strong>Urgențe:</strong> Pentru urgențe farmaceutice în timpul programului, sunați la 026 858 762
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Services & Social */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Shield className="h-6 w-6 text-green-600" />
                        <h3 className="text-lg font-bold text-gray-800">Servicii Disponibile</h3>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Consiliere farmaceutică</li>
                        <li>• Măsurarea tensiunii</li>
                        <li>• Teste rapide</li>
                        <li>• Comenzi speciale</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Users className="h-6 w-6 text-blue-600" />
                        <h3 className="text-lg font-bold text-gray-800">Urmărește-ne</h3>
                      </div>
                      <div className="flex gap-3">
                        <a
                          href="https://www.facebook.com/nobisfarmhoresti/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors"
                        >
                          <Facebook className="h-6 w-6 text-white" />
                        </a>
                        <a
                          href="#"
                          className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors"
                        >
                          <Instagram className="h-6 w-6 text-white" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500 rounded-full mb-6">
                <Phone className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-red-800 mb-4">
                Linie de Urgență Farmaceutică
              </h3>
              <p className="text-red-700 mb-6 text-lg">
                Pentru urgențe farmaceutice, întrebări critice despre medicamente sau efecte adverse severe
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="tel:026858762" className="inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-xl hover:bg-red-700 transition-colors font-semibold text-lg">
                  <Phone className="h-6 w-6" />
                  <span>026 858 762</span>
                </a>
                <div className="text-red-600 font-medium self-center">
                  Disponibil în programul farmaciei
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
