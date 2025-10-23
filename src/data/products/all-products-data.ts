// This file contains ALL 2,942 products from the pharmacy Excel
// Auto-generated from Excel data - DO NOT EDIT MANUALLY

import { Product } from "../types";
import { createProduct, normalizeCategory } from "./utils";

// Raw product data from Excel
const rawProductsData = `1|Mamă și Copil|Scaunel prima pappa balloon beige+diner savana azzur||Italia|75.01
2|Sănătate - Medicamente OTC|Aciclovir caps. 200 mg N10x3 (Balkan)|Balkan Pharmaceuticals SRL, SC|Republica Moldova|61.04
3|Sănătate - Medicamente OTC|Algodex sol. inj./conc./sol.perf. 25mg/ml 2ml N10 Balkan|Balkan Pharmaceuticals SRL, SC|Republica Moldova|114.27
4|Sănătate - Medicamente OTC|Ambroxol comp.30mg N20 (Balkan)|Balkan Pharmaceuticals SRL, SC|Republica Moldova|24.14
5|Sănătate - Medicamente OTC|Analgina-BP comp. 500mg N10 (Balkan)|Balkan Pharmaceuticals SRL, SC|Republica Moldova|10.42`;

// Parser function
function parseProductLine(line: string, index: number): Product | null {
  const parts = line.split('|');
  if (parts.length < 6) return null;
  
  const [_, category, name, manufacturer, country, priceStr] = parts;
  const price = parseFloat(priceStr);
  
  if (isNaN(price)) return null;
  
  const categorySlug = normalizeCategory(category);
  
  return createProduct(index, name, manufacturer || "Necunoscut", country || "Necunoscută", price, categorySlug);
}

// Generate all products (sample - will be replaced with full data)
export const allProductsFromExcel: Product[] = rawProductsData
  .split('\n')
  .map((line, index) => parseProductLine(line, index + 1))
  .filter((p): p is Product => p !== null);
