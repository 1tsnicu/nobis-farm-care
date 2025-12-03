import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, Clock, ArrowLeft, ArrowRight, Share2, Facebook, Linkedin } from "lucide-react";
import blogKidsVitamins from "@/assets/blog-kids-vitamins.jpg";

const blogPosts = [
  {
    id: 1,
    title: "Cum să-ți crești imunitatea în sezonul rece",
    excerpt: "Descoperă metodele naturale și suplimentele esențiale pentru a-ți întări sistemul imunitar în această perioadă.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800",
    category: "Sănătate",
    author: "Dr. Elena Popescu",
    date: "15 Dec 2024",
    readTime: "5 min",
    content: `
      <h2>Introducere</h2>
      <p>Sistemul imunitar joacă un rol crucial în protejarea organismului împotriva infecțiilor și bolilor. În sezonul rece, când virusurile și bacteriile sunt mai active, este esențial să luăm măsuri pentru a ne întări apărarea naturală a corpului.</p>
      
      <h2>1. Alimentația echilibrată - fundația imunității</h2>
      <p>O dietă bogată în vitamine și minerale este esențială pentru un sistem imunitar puternic. Includeți în alimentația zilnică:</p>
      <ul>
        <li><strong>Fructe citrice</strong> - portocale, lămâi, grapefruit - bogate în vitamina C</li>
        <li><strong>Legume verzi</strong> - spanac, broccoli, kale - surse excelente de vitamine și antioxidanți</li>
        <li><strong>Usturoi și ceapă</strong> - proprietăți antibacteriene și antivirale naturale</li>
        <li><strong>Ghimbir și turmeric</strong> - efecte antiinflamatorii puternice</li>
      </ul>
      
      <h2>2. Suplimente esențiale pentru imunitate</h2>
      <p>Pe lângă o alimentație sănătoasă, anumite suplimente pot oferi un sprijin suplimentar sistemului imunitar:</p>
      <ul>
        <li><strong>Vitamina C (500-1000mg/zi)</strong> - susține producția de globule albe</li>
        <li><strong>Vitamina D (1000-2000 UI/zi)</strong> - esențială mai ales iarna când expunerea la soare este redusă</li>
        <li><strong>Zinc (15-25mg/zi)</strong> - crucial pentru funcția imunitară</li>
        <li><strong>Probiotice</strong> - 70% din sistemul imunitar se află în intestin</li>
        <li><strong>Echinaceea</strong> - poate reduce durata răcelilor</li>
      </ul>
      
      <h2>3. Somnul de calitate</h2>
      <p>Somnul insuficient poate slăbi semnificativ sistemul imunitar. Adulții ar trebui să doarmă 7-9 ore pe noapte. În timpul somnului, corpul produce citokine, proteine care ajută la combaterea infecțiilor și inflamațiilor.</p>
      
      <h2>4. Exercițiul fizic moderat</h2>
      <p>Activitatea fizică regulată stimulează circulația sângelui și ajută celulele imunitare să se deplaseze mai eficient prin organism. Se recomandă:</p>
      <ul>
        <li>30 de minute de mers pe jos zilnic</li>
        <li>Yoga sau stretching pentru reducerea stresului</li>
        <li>Evitarea antrenamentelor foarte intense care pot suprima temporar imunitatea</li>
      </ul>
      
      <h2>5. Gestionarea stresului</h2>
      <p>Stresul cronic eliberează cortizol, un hormon care suprimă funcția imunitară. Tehnici eficiente de reducere a stresului includ meditația, respirația profundă și petrecerea timpului în natură.</p>
      
      <h2>Concluzii</h2>
      <p>Îmbunătățirea sistemului imunitar necesită o abordare holistică. Combinând o alimentație sănătoasă, suplimentarea adecvată, somnul de calitate și gestionarea stresului, veți fi mult mai pregătiți să înfruntați sezonul rece. Consultați întotdeauna un farmacist sau medic înainte de a începe orice suplimentare.</p>
    `
  },
  {
    id: 2,
    title: "Ghid complet pentru o piele sănătoasă iarna",
    excerpt: "Sfaturi de la dermatologi și recomandări de produse pentru îngrijirea pielii în sezonul rece.",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800",
    category: "Îngrijire",
    author: "Dr. Maria Ciobanu",
    date: "12 Dec 2024",
    readTime: "7 min",
    content: `
      <h2>De ce suferă pielea iarna?</h2>
      <p>Iarna aduce cu sine provocări speciale pentru sănătatea pielii. Aerul rece de afară combinat cu aerul uscat din interior din cauza încălzirii centrale poate deshidrata pielea, ducând la uscăciune, descuamare și iritații.</p>
      
      <h2>Rutina de îngrijire pentru sezonul rece</h2>
      
      <h3>Dimineața</h3>
      <ul>
        <li><strong>Curățare blândă</strong> - Folosiți un gel sau o spumă de curățare fără sulfați, care nu usucă pielea</li>
        <li><strong>Ser hidratant</strong> - Acid hialuronic pentru a reține umiditatea în piele</li>
        <li><strong>Cremă hidratantă</strong> - O formulă mai bogată decât vara, cu ceramide și glicerină</li>
        <li><strong>Protecție solară SPF 30+</strong> - Esențială chiar și iarna!</li>
      </ul>
      
      <h3>Seara</h3>
      <ul>
        <li><strong>Demachiere completă</strong> - Ulei sau balsam de curățare pentru a elimina machiajul și impuritățile</li>
        <li><strong>Curățare secundară</strong> - Gel blând pentru o curățare profundă</li>
        <li><strong>Tratament</strong> - Retinol (2-3 ori pe săptămână) sau vitamina C</li>
        <li><strong>Cremă de noapte</strong> - O formulă nutritivă, regenerantă</li>
      </ul>
      
      <h2>Ingrediente cheie pentru iarnă</h2>
      <p>Căutați produse care conțin:</p>
      <ul>
        <li><strong>Acid hialuronic</strong> - Atrage și reține apa în piele</li>
        <li><strong>Ceramide</strong> - Refac bariera naturală a pielii</li>
        <li><strong>Niacinamidă</strong> - Reduce inflamația și îmbunătățește textura</li>
        <li><strong>Unt de shea și ulei de jojoba</strong> - Hrănesc și protejează pielea</li>
        <li><strong>Pantenol (vitamina B5)</strong> - Calmează și hidratează</li>
      </ul>
      
      <h2>Sfaturi suplimentare</h2>
      <ul>
        <li>Folosiți un umidificator în casă pentru a menține nivelul de umiditate al aerului</li>
        <li>Beți suficientă apă - cel puțin 2 litri pe zi</li>
        <li>Evitați dușurile foarte fierbinți care usucă pielea</li>
        <li>Aplicați cremă de mâini după fiecare spălare</li>
        <li>Nu uitați de buze - folosiți un balsam de buze cu SPF</li>
      </ul>
      
      <h2>Când să consultați un specialist</h2>
      <p>Dacă experimentați uscăciune extremă, crăpături adânci, mâncărimi persistente sau semne de eczemă, este important să consultați un dermatolog. Anumite afecțiuni ale pielii necesită tratament medical specific.</p>
    `
  },
  {
    id: 3,
    title: "Vitaminele esențiale pentru copii",
    excerpt: "Tot ce trebuie să știi despre suplimentarea corectă cu vitamine la copii.",
    image: blogKidsVitamins,
    category: "Pediatrie",
    author: "Dr. Andrei Rusu",
    date: "8 Dec 2024",
    readTime: "6 min",
    content: `
      <h2>Importanța vitaminelor în dezvoltarea copiilor</h2>
      <p>Dezvoltarea sănătoasă a copiilor depinde de o nutriție echilibrată și de aportul adecvat de vitamine și minerale. În perioadele de creștere intensă, nevoile nutriționale ale copiilor sunt crescute.</p>
      
      <h2>Vitaminele esențiale și rolul lor</h2>
      
      <h3>Vitamina D - "Vitamina soarelui"</h3>
      <p>Esențială pentru:</p>
      <ul>
        <li>Absorbția calciului și formarea oaselor sănătoase</li>
        <li>Funcția sistemului imunitar</li>
        <li>Dezvoltarea musculară</li>
      </ul>
      <p><strong>Doză recomandată:</strong> 400-600 UI/zi pentru copii</p>
      
      <h3>Vitamina C</h3>
      <p>Beneficii:</p>
      <ul>
        <li>Întărește sistemul imunitar</li>
        <li>Ajută la vindecarea rănilor</li>
        <li>Îmbunătățește absorbția fierului</li>
      </ul>
      <p><strong>Surse naturale:</strong> Citrice, căpșuni, kiwi, ardei gras</p>
      
      <h3>Vitaminele din complexul B</h3>
      <p>Importante pentru:</p>
      <ul>
        <li>Metabolism energetic</li>
        <li>Funcția sistemului nervos</li>
        <li>Formarea globulelor roșii</li>
      </ul>
      
      <h3>Vitamina A</h3>
      <p>Necesară pentru:</p>
      <ul>
        <li>Vedere sănătoasă</li>
        <li>Creșterea și dezvoltarea normală</li>
        <li>Funcția imunitară</li>
      </ul>
      
      <h2>Minerale importante pentru copii</h2>
      <ul>
        <li><strong>Fier</strong> - Pentru prevenirea anemiei și funcția cognitivă</li>
        <li><strong>Calciu</strong> - Pentru oase și dinți puternici</li>
        <li><strong>Zinc</strong> - Pentru creștere și imunitate</li>
        <li><strong>Omega-3</strong> - Pentru dezvoltarea creierului</li>
      </ul>
      
      <h2>Când este necesară suplimentarea?</h2>
      <p>Suplimentarea poate fi recomandată în următoarele situații:</p>
      <ul>
        <li>Diete restrictive sau selective (copii mofturoși la mâncare)</li>
        <li>Boli cronice care afectează absorbția nutrienților</li>
        <li>Perioade de creștere intensă</li>
        <li>Recuperare după boli</li>
        <li>Sezonul rece pentru vitamina D</li>
      </ul>
      
      <h2>Sfaturi pentru părinți</h2>
      <ul>
        <li>Consultați pediatrul înainte de a începe orice suplimentare</li>
        <li>Alegeți formule potrivite vârstei copilului</li>
        <li>Nu depășiți dozele recomandate</li>
        <li>Preferați suplimentele fără zahăr adăugat și coloranți artificiali</li>
        <li>Păstrați suplimentele la loc sigur, inaccesibil copiilor</li>
      </ul>
    `
  },
  {
    id: 4,
    title: "Mituri și adevăruri despre antibiotice",
    excerpt: "Clarificăm cele mai comune neînțelegeri despre utilizarea antibioticelor.",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800",
    category: "Medicație",
    author: "Dr. Ion Moraru",
    date: "5 Dec 2024",
    readTime: "8 min",
    content: `
      <h2>Ce sunt antibioticele?</h2>
      <p>Antibioticele sunt printre cele mai prescrise medicamente din lume și au salvat milioane de vieți de la descoperirea penicilinei în 1928. Cu toate acestea, există multe neînțelegeri despre cum și când trebuie folosite.</p>
      
      <h2>Mituri comune despre antibiotice</h2>
      
      <h3>MIT #1: "Antibioticele vindecă răceala și gripa"</h3>
      <p><strong>ADEVĂR:</strong> Răceala și gripa sunt cauzate de virusuri, iar antibioticele acționează DOAR împotriva bacteriilor. Luarea antibioticelor pentru infecții virale nu va accelera vindecarea și poate provoca efecte secundare inutile.</p>
      
      <h3>MIT #2: "Pot să opresc tratamentul când mă simt mai bine"</h3>
      <p><strong>ADEVĂR:</strong> Este crucial să terminați întregul tratament prescris, chiar dacă simptomele dispar. Oprirea prematură poate duce la:</p>
      <ul>
        <li>Reapariția infecției</li>
        <li>Dezvoltarea rezistenței bacteriene</li>
        <li>Infecții mai dificil de tratat în viitor</li>
      </ul>
      
      <h3>MIT #3: "Antibioticele mai puternice sunt mai bune"</h3>
      <p><strong>ADEVĂR:</strong> Cel mai bun antibiotic este cel potrivit pentru tipul specific de bacterie care cauzează infecția. Un antibiotic "mai puternic" poate fi ineficient dacă bacteria nu este sensibilă la el.</p>
      
      <h3>MIT #4: "Pot folosi antibioticele rămase de la alt tratament"</h3>
      <p><strong>ADEVĂR:</strong> Niciodată nu folosiți antibiotice fără prescripție medicală. Fiecare infecție poate necesita un antibiotic diferit, iar dozele și durata tratamentului sunt stabilite de medic în funcție de situația specifică.</p>
      
      <h2>Utilizarea responsabilă a antibioticelor</h2>
      <ul>
        <li>Luați antibioticele exact cum au fost prescrise</li>
        <li>Nu săriți peste doze și nu dublați dozele</li>
        <li>Nu păstrați antibiotice "pentru altădată"</li>
        <li>Nu oferiți antibioticele dumneavoastră altei persoane</li>
        <li>Informați medicul despre alergii sau reacții anterioare</li>
      </ul>
      
      <h2>Efecte secundare frecvente</h2>
      <p>Antibioticele pot cauza:</p>
      <ul>
        <li>Tulburări digestive (diaree, greață)</li>
        <li>Infecții fungice (candidoză)</li>
        <li>Reacții alergice</li>
        <li>Sensibilitate la soare (anumite antibiotice)</li>
      </ul>
      <p>Pentru a minimiza efectele asupra florei intestinale, luați probiotice la 2 ore distanță de antibiotic.</p>
      
      <h2>Rezistența la antibiotice - o amenințare globală</h2>
      <p>Utilizarea excesivă și inadecvată a antibioticelor a dus la apariția "superbacteriilor" - bacterii rezistente la multiple antibiotice. Aceasta este considerată una dintre cele mai mari amenințări pentru sănătatea publică la nivel mondial.</p>
    `
  },
  {
    id: 5,
    title: "Managementul stresului: tehnici naturale",
    excerpt: "Metode dovedite științific pentru reducerea stresului fără medicamente.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
    category: "Wellness",
    author: "Dr. Elena Popescu",
    date: "1 Dec 2024",
    readTime: "10 min",
    content: `
      <h2>Înțelegerea stresului</h2>
      <p>Stresul cronic poate avea efecte negative majore asupra sănătății fizice și mentale. Din fericire, există numeroase metode naturale și eficiente pentru gestionarea stresului, validate de cercetarea științifică.</p>
      
      <h2>Efectele stresului asupra organismului</h2>
      <p>Stresul prelungit poate cauza:</p>
      <ul>
        <li>Probleme cardiovasculare</li>
        <li>Slăbirea sistemului imunitar</li>
        <li>Tulburări de somn</li>
        <li>Probleme digestive</li>
        <li>Anxietate și depresie</li>
        <li>Probleme de memorie și concentrare</li>
      </ul>
      
      <h2>Tehnici de respirație</h2>
      
      <h3>Respirația 4-7-8</h3>
      <p>O tehnică simplă și foarte eficientă:</p>
      <ol>
        <li>Inspirați pe nas numărând până la 4</li>
        <li>Țineți respirația numărând până la 7</li>
        <li>Expirați pe gură numărând până la 8</li>
        <li>Repetați de 4 ori</li>
      </ol>
      
      <h3>Respirația diafragmatică</h3>
      <p>Așezați o mână pe piept și una pe abdomen. Respirați astfel încât mâna de pe abdomen să se ridice, în timp ce cea de pe piept rămâne relativ nemișcată.</p>
      
      <h2>Meditația și mindfulness</h2>
      <p>Studiile arată că meditația regulată poate:</p>
      <ul>
        <li>Reduce nivelul de cortizol (hormonul stresului)</li>
        <li>Îmbunătăți calitatea somnului</li>
        <li>Crește capacitatea de concentrare</li>
        <li>Reduce anxietatea și depresia</li>
      </ul>
      <p>Începeți cu doar 5 minute pe zi și creșteți treptat durata.</p>
      
      <h2>Exercițiul fizic</h2>
      <p>Activitatea fizică eliberează endorfine - "hormonii fericirii". Cele mai eficiente pentru reducerea stresului sunt:</p>
      <ul>
        <li><strong>Yoga</strong> - combină mișcarea cu respirația și meditația</li>
        <li><strong>Mersul pe jos</strong> - mai ales în natură</li>
        <li><strong>Înotul</strong> - efect calmant și meditativ</li>
        <li><strong>Dansul</strong> - combină mișcarea cu exprimarea emoțională</li>
      </ul>
      
      <h2>Suplimente naturale pentru stres</h2>
      <ul>
        <li><strong>Ashwagandha</strong> - adaptogen care reduce cortizolul</li>
        <li><strong>Magneziu</strong> - relaxează mușchii și calmează sistemul nervos</li>
        <li><strong>Vitamina B complex</strong> - susține funcția nervoasă</li>
        <li><strong>L-teanină</strong> - aminoacid din ceaiul verde cu efect calmant</li>
        <li><strong>Valeriana și passiflora</strong> - pentru relaxare și somn</li>
      </ul>
      
      <h2>Stilul de viață anti-stres</h2>
      <ul>
        <li>Mențineți un program regulat de somn (7-8 ore)</li>
        <li>Limitați consumul de cofeină și alcool</li>
        <li>Petreceți timp în natură</li>
        <li>Cultivați relații sociale pozitive</li>
        <li>Practicați hobby-uri care vă relaxează</li>
        <li>Stabiliți limite sănătoase la serviciu</li>
      </ul>
    `
  },
  {
    id: 6,
    title: "Suplimente pentru sănătatea articulațiilor",
    excerpt: "Ghid complet despre cele mai eficiente suplimente pentru articulații sănătoase.",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800",
    category: "Suplimente",
    author: "Dr. Andrei Rusu",
    date: "28 Nov 2024",
    readTime: "6 min",
    content: `
      <h2>De ce contează sănătatea articulațiilor?</h2>
      <p>Sănătatea articulațiilor este esențială pentru mobilitate și calitatea vieții. Odată cu înaintarea în vârstă sau în urma unor traumatisme, cartilajul articular se poate deteriora, ducând la durere, rigiditate și limitarea mișcărilor.</p>
      
      <h2>Suplimente dovedite științific</h2>
      
      <h3>Glucozamina</h3>
      <p>Unul dintre cele mai studiate suplimente pentru articulații:</p>
      <ul>
        <li>Susține formarea și repararea cartilajului</li>
        <li>Poate reduce durerea și rigiditatea</li>
        <li>Doza recomandată: 1500mg/zi</li>
        <li>Efectele se văd după 4-6 săptămâni de utilizare</li>
      </ul>
      
      <h3>Condroitina</h3>
      <p>Adesea combinată cu glucozamina:</p>
      <ul>
        <li>Ajută la menținerea elasticității cartilajului</li>
        <li>Reduce degradarea cartilajului</li>
        <li>Doza recomandată: 800-1200mg/zi</li>
      </ul>
      
      <h3>MSM (Metilsulfonilmetan)</h3>
      <ul>
        <li>Sursă naturală de sulf pentru țesuturile conjunctive</li>
        <li>Proprietăți antiinflamatorii</li>
        <li>Reduce durerea și îmbunătățește mobilitatea</li>
        <li>Doza: 1000-3000mg/zi</li>
      </ul>
      
      <h3>Colagen tip II</h3>
      <ul>
        <li>Proteină structurală principală a cartilajului</li>
        <li>Colagenul nedenaturat (UC-II) este cel mai eficient</li>
        <li>Studiile arată îmbunătățiri semnificative ale mobilității</li>
        <li>Doza: 40mg/zi de colagen nedenaturat</li>
      </ul>
      
      <h3>Omega-3</h3>
      <p>Acizii grași esențiali din ulei de pește:</p>
      <ul>
        <li>Puternice proprietăți antiinflamatorii</li>
        <li>Reduce rigiditatea matinală</li>
        <li>Doza: 2-3g/zi de EPA+DHA</li>
      </ul>
      
      <h3>Curcumina (din turmeric)</h3>
      <ul>
        <li>Antiinflamator natural puternic</li>
        <li>Comparabilă cu unele antiinflamatorii nesteroidiene</li>
        <li>Alegeți formule cu piper negru pentru absorbție optimă</li>
      </ul>
      
      <h2>Sfaturi pentru sănătatea articulațiilor</h2>
      <ul>
        <li><strong>Mențineți o greutate sănătoasă</strong> - Fiecare kg în plus pune presiune suplimentară pe articulații</li>
        <li><strong>Exerciții cu impact redus</strong> - Înot, bicicletă, yoga</li>
        <li><strong>Hidratare adecvată</strong> - Apa ajută la lubrifierea articulațiilor</li>
        <li><strong>Încălzire înainte de exerciții</strong> - Previne traumatismele</li>
        <li><strong>Poziție corectă</strong> - La birou și în timpul somnului</li>
      </ul>
      
      <h2>Când să consultați un medic</h2>
      <p>Consultați un specialist dacă experimentați:</p>
      <ul>
        <li>Durere articulară persistentă peste 2 săptămâni</li>
        <li>Umflături sau roșeață la nivelul articulațiilor</li>
        <li>Limitarea severă a mișcărilor</li>
        <li>Durere nocturnă care vă trezește din somn</li>
      </ul>
    `
  }
];

const BlogPost = () => {
  const { id } = useParams();
  const postId = parseInt(id || "1");
  const post = blogPosts.find(p => p.id === postId);
  
  const currentIndex = blogPosts.findIndex(p => p.id === postId);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  
  const relatedPosts = blogPosts
    .filter(p => p.id !== postId && p.category === post?.category)
    .slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">Articol negăsit</h1>
            <p className="text-muted-foreground mb-8">Ne pare rău, articolul pe care îl căutați nu există.</p>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Înapoi la Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Image */}
        <section className="relative h-[50vh] min-h-[400px]">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto max-w-4xl">
              <Badge className="mb-4">{post.category}</Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} citire</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back Button & Share */}
        <section className="py-6 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <Link to="/blog">
                <Button variant="ghost">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Înapoi la Blog
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground mr-2">Distribuie:</span>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div 
                className="prose prose-lg max-w-none
                  prose-headings:text-foreground prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                  prose-ul:my-4 prose-ul:pl-6
                  prose-li:text-muted-foreground prose-li:mb-2
                  prose-ol:my-4 prose-ol:pl-6
                  prose-strong:text-foreground prose-strong:font-semibold"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </article>

        {/* Author Box */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{post.author}</h3>
                      <p className="text-sm text-muted-foreground">
                        Specialist în sănătate la Nobis Farm. Experiență de peste 10 ani în consiliere farmaceutică.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Separator className="max-w-4xl mx-auto" />

        {/* Navigation */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prevPost && (
                  <Link to={`/blog/${prevPost.id}`} className="group">
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <ArrowLeft className="h-4 w-4" />
                          Articolul anterior
                        </div>
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {prevPost.title}
                        </h4>
                      </CardContent>
                    </Card>
                  </Link>
                )}
                {nextPost && (
                  <Link to={`/blog/${nextPost.id}`} className="group md:ml-auto">
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardContent className="p-6 text-right">
                        <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mb-2">
                          Articolul următor
                          <ArrowRight className="h-4 w-4" />
                        </div>
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {nextPost.title}
                        </h4>
                      </CardContent>
                    </Card>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-foreground mb-8">Articole similare</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`}>
                      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <CardContent className="p-4">
                          <Badge variant="secondary" className="mb-2 text-xs">{relatedPost.category}</Badge>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h3>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 bg-gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ai nevoie de consiliere?</h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Specialiștii noștri sunt aici să te ajute cu recomandări personalizate pentru sănătatea ta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" variant="secondary">
                  Contactează-ne
                </Button>
              </Link>
              <Link to="/categorie/medicamente-otc">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Vezi Produsele
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
