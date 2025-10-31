import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const movePersonalHygieneProducts = async (): Promise<void> => {
  try {
    // Get OTC category
    const { data: otcData, error: otcError } = await supabase
      .from('categories')
      .select('id')
      .eq('name', 'Sănătate - Medicamente OTC')
      .single();

    if (otcError || !otcData) {
      toast.error('Nu s-a putut găsi categoria OTC');
      return;
    }

    // Fetch ALL categories to debug
    const { data: allCategories, error: allCategoriesError } = await supabase
      .from('categories')
      .select('id, name, slug');

    if (allCategoriesError) {
      toast.error('Eroare la încărcarea categoriilor');
      return;
    }

    console.log('All categories:', allCategories);

    // Get target category - try multiple name variations
    let targetData;
    
    const categoryNames = [
      'Frumusețe și Igienă - Igienă Personală',
      'Frumusete si igiena - igiena personala',
      'Igienă Personală',
      'Igiena personala',
      'Igienă Personală - Igiena Personala',
      'frumusete-si-igiena-igiena-personala'
    ];
    
    targetData = allCategories?.find((cat: any) => 
      categoryNames.some(name => 
        cat.name.toLowerCase().includes(name.toLowerCase()) ||
        cat.name === name
      )
    );

    if (!targetData) {
      toast.error('Nu s-a putut găsi categoria "Igienă Personală". Categoriile disponibile sunt: ' + 
        (allCategories?.map((c: any) => c.name).join(', ') || 'niciuna'));
      return;
    }

    // Fetch all OTC products
    const { data: otcProducts, error: fetchError } = await supabase
      .from('products')
      .select('id, name')
      .eq('category_id', otcData.id);

    if (fetchError) {
      toast.error('Eroare la încărcarea produselor OTC');
      return;
    }

    if (!otcProducts || otcProducts.length === 0) {
      toast.info('Nu sunt produse în categoria OTC');
      return;
    }

    // Move ALL products from OTC to Igienă Personală category
    const productsToMove = otcProducts;

    if (productsToMove.length === 0) {
      toast.info('Nu sunt produse în categoria OTC');
      return;
    }

    // Update products category in batches
    const batchSize = 50;
    for (let i = 0; i < productsToMove.length; i += batchSize) {
      const batch = productsToMove.slice(i, i + batchSize);
      const productIds = batch.map((p: any) => p.id);

      const { error: updateError } = await supabase
        .from('products')
        .update({ category_id: targetData.id })
        .in('id', productIds);

      if (updateError) {
        toast.error(`Eroare la mutarea produselor: ${updateError.message}`);
        return;
      }
    }

    toast.success(`✅ ${productsToMove.length} produse mutate la "Igienă Personală"`);
  } catch (error) {
    console.error('Error moving personal hygiene products:', error);
    toast.error('Eroare la mutarea produselor de igienă personală');
  }
};
