import { LucideIcon, Pill, Heart, Sparkles, Baby, Users, Stethoscope } from "lucide-react";

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  productCount?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  color: string;
  subcategories: Subcategory[];
  productCount?: number;
  brands?: string[];
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Sănătate",
    slug: "sanatate",
    description: "Produse pentru sănătatea ta",
    icon: Stethoscope,
    color: "text-primary",
    subcategories: [
      { id: "1-1", name: "Articole ortopedice", slug: "articole-ortopedice" },
      { id: "1-2", name: "Dietă", slug: "dieta" },
      { id: "1-3", name: "Medicamente", slug: "medicamente" },
      { id: "1-4", name: "Plante medicinale", slug: "plante-medicinale" },
      { id: "1-5", name: "Parafarmaceutice", slug: "parafarmaceutice" },
      { id: "1-6", name: "Tehnică medicală", slug: "tehnica-medicala" },
      { id: "1-7", name: "Trusa medicală de vacanță", slug: "trusa-vacanta" },
      { id: "1-8", name: "Trusa medicală de acasă", slug: "trusa-acasa" },
    ],
  },
  {
    id: "2",
    name: "Frumusețe și Igienă",
    slug: "frumusete-igiena",
    description: "Produse pentru wellness și frumusețe",
    icon: Sparkles,
    color: "text-secondary",
    subcategories: [
      { id: "2-1", name: "Branduri Exclusive", slug: "branduri-exclusive" },
      { id: "2-2", name: "Creme", slug: "creme" },
      { id: "2-3", name: "Cosmetică bărbați", slug: "cosmetica-barbati" },
      { id: "2-4", name: "Cosmetică decorativă", slug: "cosmetica-decorativa" },
      { id: "2-5", name: "Îngrijire buze", slug: "ingrijire-buze" },
      { id: "2-6", name: "Îngrijire față", slug: "ingrijire-fata" },
      { id: "2-7", name: "Îngrijire mâini", slug: "ingrijire-maini" },
      { id: "2-8", name: "Îngrijire picioare", slug: "ingrijire-picioare" },
      { id: "2-9", name: "Îngrijire corp", slug: "ingrijire-corp" },
      { id: "2-10", name: "Îngrijire păr", slug: "ingrijire-par" },
      { id: "2-11", name: "Îngrijire cavitate bucală", slug: "ingrijire-cavitate-bucala" },
      { id: "2-12", name: "Protecție solară", slug: "protectie-solara" },
      { id: "2-13", name: "Produse de peeling", slug: "produse-peeling" },
      { id: "2-14", name: "Produse igienice", slug: "produse-igienice" },
      { id: "2-15", name: "Tratamente față și corp", slug: "tratamente-fata-corp" },
      { id: "2-16", name: "Repelenți", slug: "repelenti" },
      { id: "2-17", name: "Sare și uleiuri esențiale", slug: "sare-uleiuri" },
      { id: "2-18", name: "Seturi cadou", slug: "seturi-cadou" },
      { id: "2-19", name: "Certificate cadou", slug: "certificate-cadou" },
      { id: "2-20", name: "PHILIPS Personal Care", slug: "philips-personal-care" },
    ],
  },
  {
    id: "3",
    name: "Dermatocosmetică",
    slug: "dermatocosmetica",
    description: "Îngrijire specializată pentru piele",
    icon: Sparkles,
    color: "text-accent",
    subcategories: [
      { id: "3-1", name: "Bărbați", slug: "barbati" },
      { id: "3-2", name: "Îngrijire buze", slug: "ingrijire-buze" },
      { id: "3-3", name: "Îngrijire corp", slug: "ingrijire-corp" },
      { id: "3-4", name: "Îngrijire față", slug: "ingrijire-fata" },
      { id: "3-5", name: "Tratamente față și corp", slug: "tratamente-fata-corp" },
      { id: "3-6", name: "Îngrijire mâini", slug: "ingrijire-maini" },
      { id: "3-7", name: "Îngrijire păr", slug: "ingrijire-par" },
      { id: "3-8", name: "Îngrijire picioare", slug: "ingrijire-picioare" },
      { id: "3-9", name: "Protecție solară", slug: "protectie-solara" },
    ],
  },
  {
    id: "4",
    name: "Vitamine și Minerale",
    slug: "vitamine-minerale",
    description: "Nutriție și energie pentru fiecare zi",
    icon: Pill,
    color: "text-primary",
    productCount: 824,
    brands: ["Equilibra", "Bitonic", "DHC", "Forcapil", "Alevia"],
    subcategories: [
      { id: "4-1", name: "Aminoacizi", slug: "aminoacizi" },
      { id: "4-2", name: "Antianemice", slug: "antianemice" },
      { id: "4-3", name: "Alimentație enterală", slug: "alimentatie-enterala" },
      { id: "4-4", name: "Afecțiuni ale glandei tiroide", slug: "afectiuni-tiroida" },
      { id: "4-5", name: "Colagen", slug: "colagen" },
      { id: "4-6", name: "Iod", slug: "iod" },
      { id: "4-7", name: "Minerale", slug: "minerale" },
      { id: "4-8", name: "Omega 3", slug: "omega-3" },
      { id: "4-9", name: "Osteoporoză", slug: "osteoporoza" },
      { id: "4-10", name: "Pentru copii", slug: "pentru-copii" },
      { id: "4-11", name: "Pentru bărbați", slug: "pentru-barbati" },
      { id: "4-12", name: "Pentru diabetici", slug: "pentru-diabetici" },
      { id: "4-13", name: "Pentru femei", slug: "pentru-femei" },
      { id: "4-14", name: "Pentru gravide", slug: "pentru-gravide" },
      { id: "4-15", name: "Pentru imunitate", slug: "pentru-imunitate" },
      { id: "4-16", name: "Pentru lactație", slug: "pentru-lactatie" },
      { id: "4-17", name: "Pentru memorie", slug: "pentru-memorie" },
      { id: "4-18", name: "Pentru păr", slug: "pentru-par" },
      { id: "4-19", name: "Pentru sportivi", slug: "pentru-sportivi" },
      { id: "4-20", name: "Pentru ochi", slug: "pentru-ochi" },
      { id: "4-21", name: "Tonizante", slug: "tonizante" },
      { id: "4-22", name: "Vitamine grupa B", slug: "vitamine-grupa-b" },
      { id: "4-23", name: "Vitamina C", slug: "vitamina-c" },
      { id: "4-24", name: "Vitamina D3", slug: "vitamina-d3" },
      { id: "4-25", name: "Vitamine + Magneziu", slug: "vitamine-magneziu" },
    ],
  },
  {
    id: "5",
    name: "Mamă și Copil",
    slug: "mama-copil",
    description: "Tot ce ai nevoie pentru familia ta",
    icon: Baby,
    color: "text-secondary",
    productCount: 3516,
    subcategories: [
      { id: "5-1", name: "Accesorii", slug: "accesorii" },
      { id: "5-2", name: "AVENT", slug: "avent" },
      { id: "5-3", name: "BABYZEN", slug: "babyzen" },
      { id: "5-4", name: "CHICCO", slug: "chicco" },
      { id: "5-5", name: "Cărucioare", slug: "carucioare" },
      { id: "5-6", name: "Detergenți", slug: "detergenti" },
      { id: "5-7", name: "Dispozitive", slug: "dispozitive" },
      { id: "5-8", name: "Dermatită atopică copil", slug: "dermatita-atopica" },
      { id: "5-9", name: "Îngrijire copil", slug: "ingrijire-copil" },
      { id: "5-10", name: "Îngrijire mamă", slug: "ingrijire-mama" },
      { id: "5-11", name: "Produse alimentare", slug: "produse-alimentare" },
      { id: "5-12", name: "Produse igienice copii", slug: "produse-igienice-copii" },
      { id: "5-13", name: "STOKKE", slug: "stokke" },
    ],
  },
  {
    id: "6",
    name: "Cuplu și Sex",
    slug: "cuplu-sex",
    description: "Sănătate intimă și relații",
    icon: Heart,
    color: "text-accent",
    productCount: 166,
    subcategories: [
      { id: "6-1", name: "Contraceptive/Prezervative", slug: "contraceptive" },
      { id: "6-2", name: "Disfuncție erectilă", slug: "disfunctie-erectila" },
      { id: "6-3", name: "Lubrifiante", slug: "lubrifiante" },
      { id: "6-4", name: "Tonice pentru potență masculină", slug: "tonice-potenta" },
      { id: "6-5", name: "Tonice sexuale pentru femei", slug: "tonice-femei" },
      { id: "6-6", name: "Teste sarcină", slug: "teste-sarcina" },
      { id: "6-7", name: "Teste ovulație", slug: "teste-ovulatie" },
      { id: "6-8", name: "Menopauză", slug: "menopauza" },
      { id: "6-9", name: "Vibratoare", slug: "vibratoare" },
    ],
  },
];
