import { supabase } from '@/integrations/supabase/client';

export const moveMedicinalPlantsProducts = async () => {
  try {
    // Get the OTC category ID
    const { data: otcCategory } = await supabase
      .from('categories')
      .select('id')
      .eq('name', 'Sănătate - Medicamente OTC')
      .single();

    // Get the Medicinal Plants category ID
    const { data: plantsCategory } = await supabase
      .from('categories')
      .select('id')
      .eq('name', 'Sănătate - Plante Medicinale')
      .single();

    if (!otcCategory || !plantsCategory) {
      throw new Error('Categoriile nu au fost găsite');
    }

    // Find products in OTC that are actually medicinal plants
    const { data: otcProducts } = await supabase
      .from('products')
      .select('id, name')
      .eq('category_id', otcCategory.id);

    if (!otcProducts) {
      return { moved: 0 };
    }

    // Filter products that look like medicinal plants
    const medicinalPlantsKeywords = [
      'ceai', 'ulei', 'tinctura', 'extract', 'seminte', 'flori', 'scoarta', 'roinita', 'muguri',
      'alevia', 'hypericum', 'fares', 'depofarm', 'evalar', 'doctor-farm', 'megan',
      'praf', 'plantă', 'medicinală', 'herbal', 'masline', 'chimen', 'cicoare', 'armurariu',
      'levantica', 'mandarine', 'melisa', 'menta', 'portocala', 'propolis', 'germeni',
      'dovleac', 'pin', 'rozmarin', 'marar', 'mustar', 'în', 'argan', 'catina', 'zuccari',
      'celuloza', 'griu', 'очищающ'
    ];
    const productsToMove = otcProducts.filter(p =>
      medicinalPlantsKeywords.some(keyword => p.name.toLowerCase().includes(keyword))
    );

    if (productsToMove.length === 0) {
      return { moved: 0 };
    }

    // Move these products to the correct category
    const { error } = await supabase
      .from('products')
      .update({ category_id: plantsCategory.id })
      .in('id', productsToMove.map(p => p.id));

    if (error) throw error;

    console.log(`Moved ${productsToMove.length} products to Plante Medicinale`);
    return { moved: productsToMove.length };
  } catch (error) {
    console.error('Error moving medicinal plants products:', error);
    throw error;
  }
};
