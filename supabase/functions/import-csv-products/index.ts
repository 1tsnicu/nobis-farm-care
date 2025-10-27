import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CSVProduct {
  Товар: string;
  Производитель: string;
  Страна: string;
  'Prețul MDL': string;
  Categorii?: string;
  categorii?: string;
  CategorÎngrejire?: string;
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

    // Verify admin role
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabase.auth.getUser(token)
    
    if (userError || !user) {
      throw new Error('Unauthorized')
    }

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single()

    if (!roleData) {
      throw new Error('User is not an admin')
    }

    const { products, categoryName } = await req.json()
    console.log(`Starting import of ${products.length} products for category: ${categoryName}`)

    // Get category by name
    const { data: category, error: catError } = await supabase
      .from('categories')
      .select('id, name')
      .ilike('name', `%${categoryName}%`)
      .single()
    
    if (catError || !category) {
      throw new Error(`Category not found: ${categoryName}`)
    }

    // Get or create manufacturers
    const manufacturersSet = new Set(
      products
        .map((p: CSVProduct) => p.Производитель?.trim())
        .filter((m: string) => m && m.length > 0)
    )
    
    const manufacturersData = Array.from(manufacturersSet).map((name) => ({
      name,
      country: products.find((p: CSVProduct) => p.Производитель?.trim() === name)?.Страна?.trim() || '',
      products_count: products.filter((p: CSVProduct) => p.Производитель?.trim() === name).length
    }))

    // Upsert manufacturers
    if (manufacturersData.length > 0) {
      const { error: mfgError } = await supabase
        .from('manufacturers')
        .upsert(manufacturersData, { onConflict: 'name' })

      if (mfgError) {
        console.error('Manufacturer error:', mfgError)
        throw mfgError
      }
    }

    // Get all manufacturers
    const { data: allManufacturers } = await supabase
      .from('manufacturers')
      .select('id, name')

    const manufacturerMap = new Map(allManufacturers?.map(m => [m.name, m.id]))

    // Prepare products for insert
    const productsToInsert = products
      .map((p: CSVProduct, idx: number) => {
        const manufacturerName = p.Производитель?.trim()
        const manufacturerId = manufacturerName ? manufacturerMap.get(manufacturerName) : null
        
        // Parse price - remove quotes and convert comma to dot
        let priceStr = p['Prețul MDL']?.toString().trim() || '0'
        priceStr = priceStr.replace(/"/g, '').replace(/,/g, '.')
        const price = parseFloat(priceStr) || 0
        
        return {
          category_id: category.id,
          manufacturer_id: manufacturerId,
          name: p.Товар?.trim() || 'Produs fără nume',
          manufacturer: manufacturerName || '',
          country: p.Страна?.trim() || '',
          price: price,
          stock_quantity: Math.floor(Math.random() * 50) + 10,
          sku: `${category.name.substring(0, 3).toUpperCase()}-${String(Date.now() + idx).slice(-8)}`,
          is_available: true
        }
      })
      .filter((p: any) => p.name !== 'Produs fără nume')

    // Insert in batches of 100
    const batchSize = 100
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
        category: category.name,
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