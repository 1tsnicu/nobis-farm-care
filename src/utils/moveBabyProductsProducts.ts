import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const moveBabyProductsProducts = async (): Promise<void> => {
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
      .eq('name', 'Mamă și Copil')
      .single();

    if (targetError || !targetData) {
      toast.error('Nu s-a putut găsi categoria "Mamă și Copil"');
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

    // Keywords for baby products detection
    const babyKeywords = [
      // Baby hygiene
      'copii', 'baby', 'bebe', 'pireu', 'terci', 'sampon', 'gel dus', 'pudra',
      'scutece', 'lantisor', 'suzeta', 'tetina', 'sticluta', 'aspirator nazal',
      'inel dentitie', 'perie', 'pasta dinti', 'sapun copii', 'teether', 'jucarie dentitie',
      'jucarie pentru dentitie', 'infantino', 'bratara antitintari', 'sopirla',
      // Baby food - very specific
      'gerber', 'nestle nan', 'maliutca', 'hipp', 'fruto neanea', 'biscuiti copii',
      'amestec lactat', 'formula copii', 'cogda ia virastu', 'nestogen', 'biscuiti cu banane',
      'biscuiti cu pere', 'biscuiti cu capsuna', 'pireu de brocoli', 'pireu de curcan',
      'pireu de mar', 'pireu de mere', 'pireu de prune', 'pireu organic', 'mango pireu',
      'terci multicereale', 'terci de orez', 'terci de ovas', 'terci 8 cereale',
      'fructe cu cereale', '4luni+', '5luni+', '6luni+', '8luni+', 'bebi kolinska',
      'vinni terci', 'farmalakt', 'progres', 'istra-nutricia', 'nestle terci',
      // Baby care - expanded
      'bepanthen', 'sudocrem', 'bioderma abcderm', 'chicco', 'nuk', 'pampers',
      'moltex', 'bepanthen ung', 'bepanthen crema', 'marimer', 'anaftin',
      'dologel', 'dentinox', 'dydus', 'nuby', 'babycoccole', 'canpol',
      'tommee tippee', 'weebaby', 'hipp ceai', 'emplastru medrull aroma patches',
      'ulei copii', 'pudra copii', 'crema copii', 'discuri copii', 'servetele copii',
      'foarfece baby', 'zatia gingival', 'nazomarin', 'antibiotic',
      'betisoare vata copii', 'betisoare bambino', 'discuri bambino',
      // Baby gear
      'scaunel prima pappa', 'canuta', 'castron copii', 'disc copii',
      // Pregnancy/nursing
      'succipompa', 'absorbante sutien', 'ceai lactatiei', 'macro-re baby', 'nuk absorbante',
      // Specific brands - expanded
      'chicco', 'artsana', 'depofarm', 'viorica-cosmetic', 'betafarma',
      'bayer consumer care', 'mapa gmbh', 'ontex', 'proctor gamble', 'gilbert',
      'alpina-plast', 'ipek', 'nevscaia', 'ono p.a.', 'burda bebek', 'droga kolinska',
      'alima-gerber', 'istra-nutricia', 'nestlé', 'nestle', 'curasept', 'hipp',
      'betafarma', 'bayer', 'actavis', 'mapa', 'lacalut', 'lacalut activ',
      'president baby', 'anaftin baby', 'infantino', 'crasota i zdorovie'
    ];

    // Filter products by keywords
    const productsToMove = otcProducts.filter((product: any) => {
      const productName = product.name.toLowerCase();
      return babyKeywords.some(keyword => 
        productName.includes(keyword.toLowerCase())
      );
    });

    if (productsToMove.length === 0) {
      toast.info('Nu s-au găsit produse pentru bebeluși pentru mutare');
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

    toast.success(`✅ ${productsToMove.length} produse mutate la "Mamă și Copil"`);
  } catch (error) {
    console.error('Error moving baby products:', error);
    toast.error('Eroare la mutarea produselor pentru bebeluși');
  }
};
