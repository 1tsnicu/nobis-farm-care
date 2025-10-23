import { supabase } from "@/integrations/supabase/client";

export const importProductsFromData = async (productsData: any[]) => {
  try {
    const { data, error } = await supabase.functions.invoke('import-products', {
      body: { products: productsData }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Import error:', error);
    throw error;
  }
};