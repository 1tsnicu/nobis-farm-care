// Temporary script to process Excel data
// This extracts raw product data from the parsed Excel
export const rawExcelData = `1|Mamă și Copil|Scaunel prima pappa balloon beige+diner savana azzur||Italia|75.01
2|Sănătate - Medicamente OTC|Aciclovir caps. 200 mg N10x3 (Balkan)|Balkan Pharmaceuticals SRL, SC|Republica Moldova|61.04
3|Sănătate - Medicamente OTC|Algodex sol. inj./conc./sol.perf. 25mg/ml 2ml N10 Balkan|Balkan Pharmaceuticals SRL, SC|Republica Moldova|114.27
4|Sănătate - Medicamente OTC|Ambroxol comp.30mg N20 (Balkan)|Balkan Pharmaceuticals SRL, SC|Republica Moldova|24.14
5|Sănătate - Medicamente OTC|Analgina-BP comp. 500mg N10 (Balkan)|Balkan Pharmaceuticals SRL, SC|Republica Moldova|10.42`;

// Extract statistics from the full dataset
export function getDatasetStats() {
  const lines = rawExcelData.split('\n').filter(line => line.trim());
  return {
    totalProducts: lines.length,
    sampleSize: Math.min(lines.length, 5),
    readyForFullImport: false
  };
}
