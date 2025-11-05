import { supabase } from "@/integrations/supabase/client";

// Keywords to identify products that belong to other categories
const categoryKeywords: Record<string, { keywords: string[], categoryName: string }> = {
  'vitamins': {
    keywords: ['vitamin', 'vitamine', 'minerale', 'mineral', 'supplement', 'supliment', 'omega', 'probiotice', 'coenzym', 'zinc', 'magneziu', 'calciu', 'fier', 'iod'],
    categoryName: 'Vitamine și Minerale'
  },
  'skincare': {
    keywords: ['vichy', 'creme', 'crema', 'gel', 'ser', 'balsam', 'loțiune', 'hidratant', 'anti-rid', 'dermatologic', 'care', 'serum', 'mască', 'mască'],
    categoryName: 'Frumusețe și Igienă - Îngrijire Corp/Față'
  },
  'haircare': {
    keywords: ['șampon', 'sampon', 'balsam par', 'lac par', 'tratament par', 'mască par', 'hair', 'scalp'],
    categoryName: 'Frumusețe și Igienă - Îngrijire Păr'
  },
  'babycare': {
    keywords: ['bebe', 'copil', 'pampers', 'scutec', 'lactate', 'nan confort', 'piure', 'materna', 'bébé'],
    categoryName: 'Mamă și Copil'
  },
  'medicinedevices': {
    keywords: ['termometru', 'tensiometru', 'glucometru', 'lantetă', 'compresă', 'bandă', 'staif', 'genuncher', 'cot', 'spate', 'ortopedic', 'suport', 'protezeă'],
    categoryName: 'Sănătate - Articole Ortopedice'
  },
  'personal_hygiene': {
    keywords: ['protecție solară', 'sun', 'spf', 'sapun', 'săpun', 'gel spalare', 'sampun', 'deodorant', 'pasta de dinti', 'apa de gura', 'oral care', 'soins'],
    categoryName: 'Frumusețe și Igienă - Igienă Personală'
  },
  'herbal': {
    keywords: ['plante', 'ceai', 'infuzie', 'plant', 'herbal', 'naturală', 'naturala', 'fitopreparate', 'extract', 'plante medicinale'],
    categoryName: 'Sănătate - Plante Medicinale'
  },
  'sexual_health': {
    keywords: ['sexual', 'sex', 'cuplu', 'preservativ', 'intim', 'igiena intima'],
    categoryName: 'Sănătate - Parafarmaceutice'
  }
};

async function identifyCorrectCategory(productName: string, manufacturer: string | null): Promise<string | null> {
  const searchText = `${productName.toLowerCase()} ${manufacturer?.toLowerCase() || ''}`;
  
  for (const [_key, config] of Object.entries(categoryKeywords)) {
    for (const keyword of config.keywords) {
      if (searchText.includes(keyword.toLowerCase())) {
        return config.categoryName;
      }
    }
  }
  
  return null;
}

export const fixMiscategorizedProducts = async () => {
  try {
    // Get ALL categories from database
    const { data: allCategories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name');

    if (categoriesError || !allCategories) {
      throw new Error('Cannot fetch categories');
    }

    console.log('📊 Available categories:', allCategories.map(c => c.name));

    // Find main "Medicamente" category (should be "Sănătate - Medicamente OTC")
    const mainMedicineCategory = allCategories.find(c => 
      c.name === 'Sănătate - Medicamente OTC' || 
      c.name === 'Medicamente' ||
      c.name.includes('Medicamente')
    );
    
    if (!mainMedicineCategory) {
      throw new Error('Medicamente category not found in database');
    }

    console.log(`🔍 Searching in category: "${mainMedicineCategory.name}" (ID: ${mainMedicineCategory.id})`);

    // Get ALL products from "Medicamente" category
    const { data: products, error: fetchError } = await supabase
      .from('products')
      .select('id, name, manufacturer, category_id')
      .eq('category_id', mainMedicineCategory.id)
      .limit(1000);

    if (fetchError) throw fetchError;

    if (!products || products.length === 0) {
      return { checked: 0, moved: 0, details: [] };
    }

    console.log(`📊 Checking ${products.length} products in Medicamente category...`);

    const movedProducts: Array<{ id: string; name: string; from: string; to: string }> = [];
    let movedCount = 0;

    for (const product of products) {
      const correctCategoryName = await identifyCorrectCategory(product.name, product.manufacturer);

      if (correctCategoryName) {
        // Find the target category
        const targetCategory = allCategories.find(c => c.name === correctCategoryName);

        if (targetCategory && targetCategory.id !== product.category_id) {
          // Move the product
          const { error: updateError } = await supabase
            .from('products')
            .update({ category_id: targetCategory.id })
            .eq('id', product.id);

          if (!updateError) {
            movedCount++;
            movedProducts.push({
              id: product.id,
              name: product.name,
              from: 'Medicamente',
              to: correctCategoryName
            });
            console.log(`✅ Moved: "${product.name}" → ${correctCategoryName}`);
          } else {
            console.error(`❌ Failed to move "${product.name}":`, updateError);
          }
        }
      }
    }

    return {
      checked: products.length,
      moved: movedCount,
      details: movedProducts
    };
  } catch (error) {
    console.error('Error fixing miscategorized products:', error);
    throw error;
  }
};
