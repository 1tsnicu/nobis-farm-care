// Parsed data from Excel file - 2,942 products
export const excelProductsData = `Nr.|Categorie|Produs|Producător|Țară|Preț (MDL)
1|Mamă și Copil|Scaunel prima pappa balloon beige+diner savana azzur||Italia|75.01
2|Sănătate - Medicamente OTC|Aciclovir caps. 200 mg N10x3 (Balkan)|Balkan Pharmaceuticals SRL, SC|Republica Moldova|61.04
3|Sănătate - Medicamente OTC|Algodex sol. inj./conc./sol.perf. 25mg/ml 2ml N10 Balkan|Balkan Pharmaceuticals SRL, SC|Republica Moldova|114.27
4|Sănătate - Medicamente OTC|Ambroxol comp.30mg N20 (Balkan)|Balkan Pharmaceuticals SRL, SC|Republica Moldova|24.14
5|Sănătate - Medicamente OTC|Analgina-BP comp. 500mg N10 (Balkan)|Balkan Pharmaceuticals SRL, SC|Republica Moldova|10.42
6|Sănătate - Medicamente OTC|Analgina-BP sol. inj. 500 mg/ml 2ml N10 (Balkan)|Balkan Pharmaceuticals SRL, SC|Republica Moldova|27.09
7|Sănătate - Medicamente OTC|Analgina-BP sol. inj. 500 mg/ml 2ml N10 (Balkan)|Balkan Pharmaceuticals SRL, SC|Republica Moldova|27.19
8|Sănătate - Medicamente OTC|Apa p/u injectii solv. 5 ml N10 (Balkan)|Balkan Pharmaceuticals SRL, SC|Republica Moldova|26.53`;

export const parseProductsData = (rawData: string) => {
  const lines = rawData.trim().split('\n');
  const headers = lines[0].split('|');
  
  return lines.slice(1).map(line => {
    const values = line.split('|');
    return {
      'Nr.': parseInt(values[0]),
      'Categorie': values[1]?.trim() || '',
      'Produs': values[2]?.trim() || '',
      'Producător': values[3]?.trim() || '',
      'Țară': values[4]?.trim() || '',
      'Preț (MDL)': parseFloat(values[5]) || 0
    };
  });
};