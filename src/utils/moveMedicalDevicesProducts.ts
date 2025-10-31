import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const moveMedicalDevicesProducts = async (): Promise<void> => {
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

    // Get target category
    const { data: targetData, error: targetError } = await supabase
      .from('categories')
      .select('id')
      .eq('name', 'Sănătate - Articole Ortopedice')
      .single();

    if (targetError || !targetData) {
      toast.error('Nu s-a putut găsi categoria "Articole Ortopedice"');
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

    // Keywords for medical devices detection
    const medicalDeviceKeywords = [
      // Bandages and medical tapes
      'bandaj', 'emplastru', 'pansament', 'tifon', 'gaz', 'steril',
      // Medical equipment
      'inhalator', 'termometru', 'tonometru', 'glucometru', 'pulsoximetru', 'nebulizer',
      'stetoscop', 'manseta', 'cuff', 'cateter', 'seringa', 'ac', 'fluturas',
      // Orthotics and support devices
      'orteza', 'briu', 'genunchiera', 'ciorap elastic', 'corset', 'baston', 'cirja',
      'degetar', 'protexa', 'suport', 'fixare', 'imobilizare',
      // Containers and accessories
      'container', 'pungi', 'pipeta', 'servetele', 'manusi', 'boneta', 'masca',
      // Other medical devices
      'test', 'lantete', 'ac steril', 'bisturiu', 'trusa medicala', 'irigator',
      'vata medicala', 'parafina', 'termofor', 'scutece',
      // Specific brands
      'rossmax', 'romed', 'ersamed', 'medica', 'belpa-med', 'farmacerotto',
      'urgo', 'pharma doct', 'eurosirel', 'tonus elast', 'mediprof',
      'tesla', 'moretti', 'titania', 'fly cat', 'greetmed'
    ];

    // Filter products by keywords
    const productsToMove = otcProducts.filter((product: any) => {
      const productName = product.name.toLowerCase();
      return medicalDeviceKeywords.some(keyword => 
        productName.includes(keyword.toLowerCase())
      );
    });

    if (productsToMove.length === 0) {
      toast.info('Nu s-au găsit produse medicale pentru mutare');
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

    toast.success(`✅ ${productsToMove.length} produse mutate la "Articole Ortopedice"`);
  } catch (error) {
    console.error('Error moving medical devices products:', error);
    toast.error('Eroare la mutarea produselor medicale');
  }
};
