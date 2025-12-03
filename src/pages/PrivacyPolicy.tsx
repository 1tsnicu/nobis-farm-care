import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, FileText, Users, Bell } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-nobis-green-100 rounded-full mb-4">
              <Shield className="h-8 w-8 text-nobis-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Politica de Confidențialitate
            </h1>
            <p className="text-muted-foreground">
              Ultima actualizare: Decembrie 2024
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Introduction */}
            <section className="bg-card rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-nobis-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-nobis-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-3">Introducere</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Farmacia Nobis Farm SRL respectă confidențialitatea datelor dumneavoastră personale. 
                    Această politică descrie modul în care colectăm, utilizăm și protejăm informațiile 
                    pe care ni le furnizați când utilizați site-ul nostru web și serviciile noastre.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Collection */}
            <section className="bg-card rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-nobis-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-nobis-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-3">Datele pe care le colectăm</h2>
                  <p className="text-muted-foreground mb-4">
                    Colectăm următoarele categorii de date personale:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-nobis-green-500 mt-1">•</span>
                      <span><strong>Date de identificare:</strong> Nume, prenume, adresă de email, număr de telefon</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-nobis-green-500 mt-1">•</span>
                      <span><strong>Date de livrare:</strong> Adresa de livrare pentru comenzile plasate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-nobis-green-500 mt-1">•</span>
                      <span><strong>Date de tranzacție:</strong> Istoricul comenzilor, produsele achiziționate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-nobis-green-500 mt-1">•</span>
                      <span><strong>Date tehnice:</strong> Adresa IP, tipul browserului, pagini vizitate</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Purpose of Data Processing */}
            <section className="bg-card rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-nobis-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="h-5 w-5 text-nobis-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-3">Scopul prelucrării datelor</h2>
                  <p className="text-muted-foreground mb-4">
                    Utilizăm datele dumneavoastră în următoarele scopuri:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-nobis-green-500 mt-1">•</span>
                      <span>Procesarea și livrarea comenzilor dumneavoastră</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-nobis-green-500 mt-1">•</span>
                      <span>Comunicarea privind starea comenzilor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-nobis-green-500 mt-1">•</span>
                      <span>Îmbunătățirea serviciilor și experienței pe site</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-nobis-green-500 mt-1">•</span>
                      <span>Respectarea obligațiilor legale</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-nobis-green-500 mt-1">•</span>
                      <span>Trimiterea de informații promoționale (doar cu acordul dumneavoastră)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Protection */}
            <section className="bg-card rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-nobis-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="h-5 w-5 text-nobis-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-3">Protecția datelor</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Implementăm măsuri tehnice și organizatorice adecvate pentru a proteja datele 
                    dumneavoastră personale împotriva accesului neautorizat, pierderii sau distrugerii:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-nobis-green-500 mt-1">•</span>
                      <span>Criptare SSL pentru toate transmisiile de date</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-nobis-green-500 mt-1">•</span>
                      <span>Acces restricționat la datele personale</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-nobis-green-500 mt-1">•</span>
                      <span>Backup-uri regulate ale bazelor de date</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-nobis-green-500 mt-1">•</span>
                      <span>Monitorizarea sistemelor de securitate</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* User Rights */}
            <section className="bg-card rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-nobis-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bell className="h-5 w-5 text-nobis-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-3">Drepturile dumneavoastră</h2>
                  <p className="text-muted-foreground mb-4">
                    În conformitate cu legislația privind protecția datelor, aveți următoarele drepturi:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-nobis-green-500 mt-1">•</span>
                      <span><strong>Dreptul de acces:</strong> Puteți solicita o copie a datelor dumneavoastră</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-nobis-green-500 mt-1">•</span>
                      <span><strong>Dreptul la rectificare:</strong> Puteți cere corectarea datelor inexacte</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-nobis-green-500 mt-1">•</span>
                      <span><strong>Dreptul la ștergere:</strong> Puteți solicita ștergerea datelor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-nobis-green-500 mt-1">•</span>
                      <span><strong>Dreptul la portabilitate:</strong> Puteți primi datele în format electronic</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-nobis-green-500 mt-1">•</span>
                      <span><strong>Dreptul de opoziție:</strong> Puteți refuza prelucrarea în anumite scopuri</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section className="bg-card rounded-xl p-6 shadow-sm border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-nobis-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-nobis-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-3">Cookie-uri</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Site-ul nostru utilizează cookie-uri pentru a îmbunătăți experiența de navigare. 
                    Cookie-urile sunt fișiere text mici stocate pe dispozitivul dumneavoastră. 
                    Utilizăm cookie-uri esențiale pentru funcționarea site-ului și cookie-uri analitice 
                    pentru a înțelege cum este utilizat site-ul. Puteți gestiona preferințele cookie-urilor 
                    din setările browserului dumneavoastră.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-nobis-green-50 rounded-xl p-6 border border-nobis-green-200">
              <h2 className="text-xl font-semibold text-foreground mb-3">Contact</h2>
              <p className="text-muted-foreground mb-4">
                Pentru orice întrebări legate de această politică sau pentru exercitarea drepturilor 
                dumneavoastră, ne puteți contacta la:
              </p>
              <div className="space-y-2 text-foreground">
                <p><strong>Farmacia Nobis Farm SRL</strong></p>
                <p>Adresa: Str. Ștefan cel Mare 138, Satul Horești, raionul Ialoveni</p>
                <p>Email: <a href="mailto:nobisfarmsrl@gmail.com" className="text-nobis-green-600 hover:underline">nobisfarmsrl@gmail.com</a></p>
                <p>Telefon: <a href="tel:026858762" className="text-nobis-green-600 hover:underline">026 858 762</a></p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
