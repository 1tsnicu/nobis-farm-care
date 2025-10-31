import { supabase } from '@/integrations/supabase/client';

export const moveProtectionSolareProducts = async () => {
  try {
    // Get the OTC category ID
    const { data: otcCategory } = await supabase
      .from('categories')
      .select('id')
      .eq('name', 'Sănătate - Medicamente OTC')
      .single();

    // Get the Protecție Solară category ID
    const { data: protectionCategory } = await supabase
      .from('categories')
      .select('id')
      .eq('name', 'Frumusețe și Igienă - Protecție Solară')
      .single();

    if (!otcCategory || !protectionCategory) {
      throw new Error('Categoriile nu au fost găsite');
    }

    // Find products in OTC that are actually sun protection products
    const { data: otcProducts } = await supabase
      .from('products')
      .select('id, name')
      .eq('category_id', otcCategory.id);

    if (!otcProducts) {
      return { moved: 0 };
    }

    // Filter products that look like sun protection products
    const sunProtectionKeywords = ['protectie', 'protecție', 'spf', 'solar', 'soare', 'crema soare', 'sunscreen'];
    const productsToMove = otcProducts.filter(p =>
      sunProtectionKeywords.some(keyword => p.name.toLowerCase().includes(keyword))
    );

    if (productsToMove.length === 0) {
      return { moved: 0 };
    }

    // Move these products to the correct category
    const { error } = await supabase
      .from('products')
      .update({ category_id: protectionCategory.id })
      .in('id', productsToMove.map(p => p.id));

    if (error) throw error;

    console.log(`Moved ${productsToMove.length} products to Protecție Solară`);
    return { moved: productsToMove.length };
  } catch (error) {
    console.error('Error moving protection solaire products:', error);
    throw error;
  }
};
