import { Product } from "../types";

export function generateProductId(index: number, category: string): string {
  return `${category}-${index.toString().padStart(5, '0')}`;
}

export function normalizeCategory(categoryName: string): string {
  const categoryMap: Record<string, string> = {
    "Sănătate - Medicamente OTC": "medicamente-otc",
    "Vitamine și Minerale": "vitamine-minerale",
    "Sănătate - Parafarmaceutice": "parafarmaceutice",
    "Mamă și Copil": "mama-copil",
    "Sănătate - Echipamente Medicale": "echipamente-medicale",
    "Sănătate - Plante Medicinale": "plante-medicinale",
    "Frumusețe și Igienă - Îngrijire Corp/Față": "ingrijire-corp-fata",
    "Frumusețe și Igienă - Igienă Personală": "igiena-personala",
    "Frumusețe și Igienă - Protecție Solară": "protectie-solara",
    "Frumusețe și Igienă - Îngrijire Păr": "ingrijire-par",
    "Dermato-Cosmetică": "dermato-cosmetica",
    "Frumusețe și Igienă - Cosmetică Decorativă": "cosmetica-decorativa"
  };
  
  return categoryMap[categoryName] || categoryName.toLowerCase().replace(/\s+/g, '-');
}

export function createProduct(
  index: number,
  name: string,
  manufacturer: string,
  country: string,
  price: number,
  category: string
): Product {
  return {
    id: generateProductId(index, category),
    name,
    manufacturer: manufacturer || "Necunoscut",
    country: country || "Necunoscută",
    price,
    category,
    inStock: true,
    rating: 4 + Math.random(),
    reviews: Math.floor(Math.random() * 500) + 10
  };
}
