import { 
  Pill, 
  Heart, 
  Sparkles, 
  Baby, 
  Stethoscope, 
  Syringe,
  Leaf,
  User,
  Droplet,
  Sun,
  Scissors,
  Palette
} from "lucide-react";
import { Category } from "./types";

export const categories: Category[] = [
  {
    id: "medicamente-otc",
    name: "Medicamente OTC",
    slug: "medicamente-otc",
    icon: Pill,
    description: "Medicamente fără prescripție medicală",
    productCount: 1296,
    color: "text-primary"
  },
  {
    id: "vitamine-minerale",
    name: "Vitamine și Minerale",
    slug: "vitamine-minerale",
    icon: Sparkles,
    description: "Suplimente nutritive pentru sănătate",
    productCount: 835,
    color: "text-orange"
  },
  {
    id: "parafarmaceutice",
    name: "Parafarmaceutice",
    slug: "parafarmaceutice",
    icon: Heart,
    description: "Produse de îngrijire și wellness",
    productCount: 393,
    color: "text-secondary"
  },
  {
    id: "mama-copil",
    name: "Mamă și Copil",
    slug: "mama-copil",
    icon: Baby,
    description: "Produse pentru îngrijirea mamei și copilului",
    productCount: 190,
    color: "text-accent"
  },
  {
    id: "echipamente-medicale",
    name: "Echipamente Medicale",
    slug: "echipamente-medicale",
    icon: Stethoscope,
    description: "Echipamente și aparatură medicală",
    productCount: 63,
    color: "text-primary"
  },
  {
    id: "plante-medicinale",
    name: "Plante Medicinale",
    slug: "plante-medicinale",
    icon: Leaf,
    description: "Ceaiuri și extracte din plante",
    productCount: 46,
    color: "text-green-600"
  },
  {
    id: "ingrijire-corp-fata",
    name: "Îngrijire Corp/Față",
    slug: "ingrijire-corp-fata",
    icon: User,
    description: "Creme, loțiuni și produse cosmetice",
    productCount: 33,
    color: "text-purple-500"
  },
  {
    id: "igiena-personala",
    name: "Igienă Personală",
    slug: "igiena-personala",
    icon: Droplet,
    description: "Produse pentru igienă zilnică",
    productCount: 31,
    color: "text-blue-500"
  },
  {
    id: "protectie-solara",
    name: "Protecție Solară",
    slug: "protectie-solara",
    icon: Sun,
    description: "Creme și loțiuni cu protecție solară",
    productCount: 26,
    color: "text-yellow-500"
  },
  {
    id: "ingrijire-par",
    name: "Îngrijire Păr",
    slug: "ingrijire-par",
    icon: Scissors,
    description: "Șampoane, balsame și tratamente pentru păr",
    productCount: 17,
    color: "text-pink-500"
  },
  {
    id: "dermato-cosmetica",
    name: "Dermato-Cosmetică",
    slug: "dermato-cosmetica",
    icon: Sparkles,
    description: "Produse dermatologice specializate",
    productCount: 11,
    color: "text-indigo-500"
  },
  {
    id: "cosmetica-decorativa",
    name: "Cosmetică Decorativă",
    slug: "cosmetica-decorativa",
    icon: Palette,
    description: "Produse de machiaj și cosmetică",
    productCount: 1,
    color: "text-red-500"
  }
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(cat => cat.slug === slug);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(cat => cat.id === id);
};
