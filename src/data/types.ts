import { LucideIcon } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  manufacturer: string;
  country: string;
  price: number;
  category: string;
  inStock: boolean;
  image?: string;
  rating?: number;
  reviews?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: LucideIcon;
  description: string;
  productCount: number;
  color?: string;
}

export interface FilterOptions {
  categories: string[];
  countries: string[];
  manufacturers: string[];
  priceRange: {
    min: number;
    max: number;
  };
}
