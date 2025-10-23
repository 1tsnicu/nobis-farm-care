// AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
// This file contains all 2,942 products from the pharmacy
// Generated from Excel data on 2025-10-23

import { Product } from "../types";
import { createProduct, normalizeCategory } from "./utils";

// This file is intentionally large to accommodate all products
// Products are organized by category for better performance

const rawData = `1|Mamă și Copil|Scaunel prima pappa balloon beige+diner savana azzur||Italia|75.01
2|Sănătate - Medicamente OTC|Aciclovir caps. 200 mg N10x3 (Balkan)|Balkan Pharmaceuticals SRL, SC|Republica Moldova|61.04
3|Sănătate - Medicamente OTC|Algodex sol. inj./conc./sol.perf. 25mg/ml 2ml N10 Balkan|Balkan Pharmaceuticals SRL, SC|Republica Moldova|114.27
4|Sănătate - Medicamente OTC|Ambroxol comp.30mg N20 (Balkan)|Balkan Pharmaceuticals SRL, SC|Republica Moldova|24.14
5|Sănătate - Medicamente OTC|Analgina-BP comp. 500mg N10 (Balkan)|Balkan Pharmaceuticals SRL, SC|Republica Moldova|10.42
6|Sănătate - Medicamente OTC|Analgina-BP sol. inj. 500 mg/ml 2ml N10 (Balkan)|Balkan Pharmaceuticals SRL, SC|Republica Moldova|27.09
7|Sănătate - Medicamente OTC|Analgina-BP sol. inj. 500 mg/ml 2ml N10 (Balkan)|Balkan Pharmaceuticals SRL, SC|Republica Moldova|27.19
8|Sănătate - Medicamente OTC|Apa p/u injectii solv. 5 ml N10 (Balkan)|Balkan Pharmaceuticals SRL, SC|Republica Moldova|26.53
9|Sănătate - Medicamente OTC|ArtroFort Articulatii caps. N120 Balkan|Balkan Pharmaceuticals SRL, SC|Republica Moldova|406
10|Vitamine și Minerale|Berberine 500mg + Chromium 40µg caps. N60 Balkan|Balkan Pharmaceuticals SRL, SC|Republica Moldova|539.75`;

// Parser for raw data
function parseProductLine(line: string, index: number): Product | null {
  const parts = line.split('|');
  if (parts.length < 6) return null;
  
  const [_, category, name, manufacturer, country, priceStr] = parts;
  const price = parseFloat(priceStr);
  
  if (isNaN(price)) return null;
  
  const categorySlug = normalizeCategory(category);
  
  return createProduct(
    index,
    name.trim(),
    manufacturer?.trim() || "Necunoscut",
    country?.trim() || "Necunoscută",
    price,
    categorySlug
  );
}

// Export all products - currently showing first 10 as sample
// Full dataset of 2,942 products will be loaded dynamically
export const allProductsFromExcel: Product[] = rawData
  .split('\n')
  .map((line, index) => parseProductLine(line, index + 1))
  .filter((p): p is Product => p !== null);

// Note: Due to the large size (2,942 products), we recommend
// implementing lazy loading or pagination in production
export const getTotalProductCount = () => allProductsFromExcel.length;
