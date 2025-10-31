import { supabase } from '@/integrations/supabase/client';

export const moveSkinCareProducts = async () => {
  try {
    // Get the OTC category ID
    const { data: otcCategory } = await supabase
      .from('categories')
      .select('id')
      .eq('name', 'Sănătate - Medicamente OTC')
      .single();

    // Get the Skin Care category ID
    const { data: skinCareCategory } = await supabase
      .from('categories')
      .select('id')
      .eq('name', 'Frumusețe și Igienă - Îngrijire Corp/Față')
      .single();

    if (!otcCategory || !skinCareCategory) {
      throw new Error('Categoriile nu au fost găsite');
    }

    // Find products in OTC that are actually skin care products
    const { data: otcProducts } = await supabase
      .from('products')
      .select('id, name')
      .eq('category_id', otcCategory.id);

    if (!otcProducts) {
      return { moved: 0 };
    }

    // Filter products that look like skin care products
    const skinCareKeywords = [
      'crema', 'gel', 'ser', 'apa micelara', 'balsam', 'ulei', 'masca', 'lotiune',
      'bioderma', 'isispharma', 'noreva', 'acm', 'ivatherm', 'elm', 'laroche',
      'depil', 'bepansept', 'bepanthen', 'cicastim', 'primalona', 'teimurov',
      'depiwhite', 'gerocossen', 'le petit', 'lovea', 'lululun', 'metroruboril',
      'neotone', 'pantenol', 'ricina', 'ruboril', 'sare baie', 'sebocalm',
      'secalia', 'sensylia', 'servetele', 'cistotel', 'teen derm', 'zuccari',
      'belkosmex', 'parasoftin', 'vaselina', 'emplastru', 'crio dr.protec',
      'ziaja', 'planter', 'revox', 'galbenele', 'azelaic', 'acid'
    ];
    const productsToMove = otcProducts.filter(p =>
      skinCareKeywords.some(keyword => p.name.toLowerCase().includes(keyword))
    );

    if (productsToMove.length === 0) {
      return { moved: 0 };
    }

    // Move these products to the correct category
    const { error } = await supabase
      .from('products')
      .update({ category_id: skinCareCategory.id })
      .in('id', productsToMove.map(p => p.id));

    if (error) throw error;

    console.log(`Moved ${productsToMove.length} products to Îngrijire Corp/Față`);
    return { moved: productsToMove.length };
  } catch (error) {
    console.error('Error moving skin care products:', error);
    throw error;
  }
};
