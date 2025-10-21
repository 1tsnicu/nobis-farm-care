import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mesajul tău a fost trimis cu succes! Te vom contacta în curând.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Contactează-ne
              </h1>
              <p className="text-xl text-primary-foreground/90">
                Suntem aici pentru a răspunde la toate întrebările tale
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 -mt-12 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="border-primary/20 shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">Telefon</h3>
                  <a href="tel:+37360123456" className="text-primary hover:underline">
                    +373 60 123 456
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">Luni - Duminică: 8:00 - 22:00</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">Email</h3>
                  <a href="mailto:contact@nobisfarm.md" className="text-primary hover:underline">
                    contact@nobisfarm.md
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">Răspundem în 24h</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">Adresă</h3>
                  <p className="text-muted-foreground">
                    Str. Mihai Eminescu 47<br />
                    Chișinău, Moldova
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Trimite-ne un mesaj
                </h2>
                <p className="text-muted-foreground mb-8">
                  Completează formularul de mai jos și te vom contacta cât mai curând posibil.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Nume complet *</Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      placeholder="Ion Popescu"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="ion.popescu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+373 60 123 456"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Mesaj *</Label>
                    <Textarea
                      id="message"
                      required
                      placeholder="Scrie mesajul tău aici..."
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-2"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Trimite Mesajul
                  </Button>
                </form>
              </div>

              {/* Map & Info */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Locația farmaciei
                </h2>
                
                {/* Map */}
                <div className="aspect-video rounded-xl overflow-hidden shadow-xl mb-8">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2719.8747374996894!2d28.8336!3d47.0105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDAwJzM3LjgiTiAyOMKwNTAnMDEuMyJF!5e0!3m2!1sen!2s!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Nobis Farm Location"
                  ></iframe>
                </div>

                {/* Schedule */}
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="h-6 w-6 text-primary" />
                      <h3 className="text-xl font-bold text-foreground">Program de lucru</h3>
                    </div>
                    <div className="space-y-2 text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Luni - Vineri:</span>
                        <span className="font-semibold text-foreground">8:00 - 22:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sâmbătă:</span>
                        <span className="font-semibold text-foreground">9:00 - 21:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duminică:</span>
                        <span className="font-semibold text-foreground">10:00 - 20:00</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-4">Urmărește-ne</h3>
                    <div className="flex gap-4">
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
                      >
                        <Facebook className="h-6 w-6 text-primary-foreground" />
                      </a>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
                      >
                        <Instagram className="h-6 w-6 text-primary-foreground" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
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
