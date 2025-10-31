import { supabase } from "@/integrations/supabase/client";

export const moveVitaminsToCorrectCategory = async () => {
  try {
    // Get category IDs
    const { data: otcCategory } = await supabase
      .from('categories')
      .select('id')
      .eq('name', 'Sănătate - Medicamente OTC')
      .single();

    const { data: vitaminsCategory } = await supabase
      .from('categories')
      .select('id')
      .eq('name', 'Vitamine și Minerale')
      .single();

    if (!otcCategory || !vitaminsCategory) {
      throw new Error('Categories not found');
    }

    // Get ALL products from OTC category
    const { data: otcProducts, error: fetchError } = await supabase
      .from('products')
      .select('id, name')
      .eq('category_id', otcCategory.id);

    if (fetchError) throw fetchError;

    if (!otcProducts || otcProducts.length === 0) {
      return { moved: 0, message: 'No products found in OTC category' };
    }

    console.log(`Moving ${otcProducts.length} products from OTC to Vitamins`);

    // Move ALL products to vitamins category
    const { error: updateError } = await supabase
      .from('products')
      .update({ category_id: vitaminsCategory.id })
      .eq('category_id', otcCategory.id);

    if (updateError) throw updateError;

    return {
      moved: otcProducts.length,
      products: otcProducts.map(p => p.name)
    };
  } catch (error) {
    console.error('Error moving products:', error);
    throw error;
  }
};
