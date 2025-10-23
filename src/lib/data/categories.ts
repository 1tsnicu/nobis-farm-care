import { LucideIcon, Pill, Heart, Sparkles, Baby, Users, Stethoscope } from "lucide-react";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  color: string;
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
    productCount: 2500,
    brands: ["Farmacia Tei", "Zentiva", "Roche"]
  },
  {
    id: "2",
    name: "Frumusețe și Igienă",
    slug: "frumusete-igiena",
    description: "Produse pentru wellness și frumusețe",
    icon: Sparkles,
    color: "text-secondary",
    productCount: 1800,
    brands: ["L'Oreal", "Nivea", "Garnier"]
  },
  {
    id: "3",
    name: "Dermatocosmetică",
    slug: "dermatocosmetica",
    description: "Îngrijire specializată pentru piele",
    icon: Sparkles,
    color: "text-accent",
    productCount: 800,
    brands: ["Vichy", "La Roche-Posay", "Avene", "CeraVe", "Efect"]
  },
  {
    id: "4",
    name: "Vitamine și Minerale",
    slug: "vitamine-minerale",
    description: "Nutriție și energie pentru fiecare zi",
    icon: Pill,
    color: "text-primary",
    productCount: 824,
    brands: ["Equilibra", "Bitonic", "DHC", "Forcapil", "Alevia", "Solgar", "Nordic Naturals"]
  },
  {
    id: "5",
    name: "Mamă și Copil",
    slug: "mama-copil",
    description: "Tot ce ai nevoie pentru familia ta",
    icon: Baby,
    color: "text-secondary",
    productCount: 600,
    brands: ["Nestle", "Abbott Healthcare", "Holle Baby Food", "Hipp", "AVENT", "CHICCO"]
  },
  {
    id: "6",
    name: "Cuplu și Sex",
    slug: "cuplu-sex",
    description: "Sănătate intimă și relații",
    icon: Heart,
    color: "text-accent",
    productCount: 166,
    brands: ["Durex", "Control", "Satisfyer"]
  }
];
