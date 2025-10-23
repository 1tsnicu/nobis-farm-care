import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ProductRow {
  Nr: number;
  Categorie: string;
  Produs: string;
  Producător: string;
  Țară: string;
  'Preț (MDL)': number;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { products } = await req.json()
    console.log(`Starting import of ${products.length} products`)

    // Get categories map
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('id, name')
    
    if (catError) throw catError

    const categoryMap = new Map(categories.map(c => [c.name, c.id]))

    // Get or create manufacturers
    const manufacturersSet = new Set(products.map((p: ProductRow) => p.Producător).filter(Boolean))
    const manufacturersData = Array.from(manufacturersSet).map((name, idx) => ({
      name,
      country: products.find((p: ProductRow) => p.Producător === name)?.Țară || '',
      products_count: products.filter((p: ProductRow) => p.Producător === name).length
    }))

    // Upsert manufacturers
    const { data: insertedManufacturers, error: mfgError } = await supabase
      .from('manufacturers')
      .upsert(manufacturersData, { onConflict: 'name' })
      .select()

    if (mfgError) {
      console.error('Manufacturer error:', mfgError)
      throw mfgError
    }

    // Refresh manufacturers
    const { data: allManufacturers } = await supabase
      .from('manufacturers')
      .select('id, name')

    const manufacturerMap = new Map(allManufacturers?.map(m => [m.name, m.id]))

    // Prepare products for insert
    const productsToInsert = products.map((p: ProductRow, idx: number) => {
      const categoryId = categoryMap.get(p.Categorie)
      const manufacturerId = manufacturerMap.get(p.Producător)
      
      return {
        category_id: categoryId,
        manufacturer_id: manufacturerId,
        name: p.Produs || 'Produs fără nume',
        manufacturer: p.Producător || '',
        country: p.Țară || '',
        price: Number(p['Preț (MDL)']) || 0,
        stock_quantity: Math.floor(Math.random() * 100),
        sku: `PRD-${String(idx + 1).padStart(6, '0')}`,
        is_available: true
      }
    }).filter((p: any) => p.category_id) // Only insert products with valid category

    // Insert in batches of 500
    const batchSize = 500
    let inserted = 0
    
    for (let i = 0; i < productsToInsert.length; i += batchSize) {
      const batch = productsToInsert.slice(i, i + batchSize)
      const { error: insertError } = await supabase
        .from('products')
        .insert(batch)
      
      if (insertError) {
        console.error(`Error inserting batch ${i}-${i + batchSize}:`, insertError)
        throw insertError
      }
      
      inserted += batch.length
      console.log(`Inserted ${inserted}/${productsToInsert.length} products`)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        imported: inserted,
        manufacturers: manufacturersData.length 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Import error:', error)
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})