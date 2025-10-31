import { supabase } from '@/integrations/supabase/client';

export const moveHairCareProducts = async () => {
  try {
    // Get the OTC category ID
    const { data: otcCategory } = await supabase
      .from('categories')
      .select('id')
      .eq('name', 'Sănătate - Medicamente OTC')
      .single();

    // Get the Hair Care category ID
    const { data: hairCareCategory } = await supabase
      .from('categories')
      .select('id')
      .eq('name', 'Frumusețe și Igienă - Îngrijire Păr')
      .single();

    if (!otcCategory || !hairCareCategory) {
      throw new Error('Categoriile nu au fost găsite');
    }

    // Find products in OTC that are actually hair care products
    const { data: otcProducts } = await supabase
      .from('products')
      .select('id, name')
      .eq('category_id', otcCategory.id);

    if (!otcProducts) {
      return { moved: 0 };
    }

    // Filter products that look like hair care products
    const hairCareKeywords = [
      'sampon', 'shampoo', 'conditioner', 'masca par', 'ulei par', 'spray par',
      'tratament par', 'balm par', 'serum par', 'gel par', 'lotion par',
      'forcapil', 'ketoral', 'minoxicapil', 'nitolic', 'paranix', 'vichy dercos',
      'bio 12', 'dermazole', 'gerocossen', 'ilcapil', 'rinfoltil', 'sulsena',
      'dermomed', 'noreva sebodiane', 'evalar', 'viorica', 'ricina', 'brusture',
      'cocos', 'hypericum', 'argan', 'keratin', 'protectie termic'
    ];
    const productsToMove = otcProducts.filter(p =>
      hairCareKeywords.some(keyword => p.name.toLowerCase().includes(keyword))
    );

    if (productsToMove.length === 0) {
      return { moved: 0 };
    }

    // Move these products to the correct category
    const { error } = await supabase
      .from('products')
      .update({ category_id: hairCareCategory.id })
      .in('id', productsToMove.map(p => p.id));

    if (error) throw error;

    console.log(`Moved ${productsToMove.length} products to Îngrijire Păr`);
    return { moved: productsToMove.length };
  } catch (error) {
    console.error('Error moving hair care products:', error);
    throw error;
  }
};
