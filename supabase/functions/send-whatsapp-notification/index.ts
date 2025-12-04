const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface OrderProduct {
  name: string;
  quantity: number;
  price: number;
}

interface OrderData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string | null;
  notes?: string;
  products: OrderProduct[];
  total: number;
  deliveryMethod?: string;
  address?: string;
  city?: string;
}

Deno.serve(async (req) => {
  console.log('Request received - Method:', req.method, 'URL:', req.url);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 200,
      headers: corsHeaders 
    });
  }

  // Handle GET requests (browser/health check)
  if (req.method === 'GET') {
    return new Response(
      JSON.stringify({ status: 'ok', message: 'WhatsApp notification service is running. Use POST to send notifications.' }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    // Check if request has a body
    const contentLength = req.headers.get('content-length');
    const contentType = req.headers.get('content-type');
    
    console.log('Request received - Content-Length:', contentLength, 'Content-Type:', contentType);
    
    // Read the raw body first to check if it's empty
    const rawBody = await req.text();
    
    if (!rawBody || rawBody.trim() === '') {
      console.error('Empty request body received');
      return new Response(
        JSON.stringify({ error: 'Request body is empty' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    console.log('Raw body received:', rawBody.substring(0, 200) + '...');
    
    // Parse the JSON
    let orderData: OrderData;
    try {
      orderData = JSON.parse(rawBody);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    console.log('Order data parsed:', JSON.stringify({
      firstName: orderData.firstName,
      lastName: orderData.lastName,
      phone: orderData.phone,
      productsCount: orderData.products?.length,
      total: orderData.total
    }));
    
    const whatsappToken = Deno.env.get('WHATSAPP_TOKEN');
    const phoneNumberId = Deno.env.get('WHATSAPP_PHONE_NUMBER_ID');
    const whatsappNumber = Deno.env.get('YOUR_WHATSAPP_NUMBER');

    if (!whatsappToken || !phoneNumberId || !whatsappNumber) {
      console.error('Missing WhatsApp credentials');
      throw new Error('WhatsApp credentials not configured');
    }

    console.log('Sending WhatsApp notification to:', whatsappNumber);
    
    // WhatsApp Business Cloud API endpoint
    const whatsappUrl = `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`;
    
    // Build products list for template
    const productsListShort = orderData.products
      .map((p) => `${p.name} x${p.quantity}`)
      .join(', ');

    // Build delivery info for template
    const deliveryMethodText = orderData.deliveryMethod === 'delivery' 
      ? `Livrare la ${orderData.city || ''}, ${orderData.address || ''}`
      : 'Ridicare din farmacie';

    // Format timestamp
    const timestamp = new Date().toLocaleString('ro-RO', { 
      timeZone: 'Europe/Chisinau',
      dateStyle: 'short',
      timeStyle: 'short'
    });

    const templatePayload = {
      messaging_product: 'whatsapp',
      to: whatsappNumber,
      type: 'template',
      template: {
        name: 'nobis_colect_lead',
        language: {
          code: 'ro'
        },
        components: [
          {
            type: 'body',
            parameters: [
              { type: 'text', text: `${orderData.firstName} ${orderData.lastName}` },
              { type: 'text', text: orderData.phone },
              { type: 'text', text: orderData.email || '-' },
              { type: 'text', text: deliveryMethodText },
              { type: 'text', text: productsListShort },
              { type: 'text', text: orderData.total.toFixed(2) },
              { type: 'text', text: timestamp }
            ]
          }
        ]
      }
    };

    console.log('Sending template payload:', JSON.stringify(templatePayload));

    // Send using the approved template
    const templateResponse = await fetch(whatsappUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${whatsappToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(templatePayload),
    });

    const templateData = await templateResponse.json();
    
    if (!templateResponse.ok) {
      console.error('WhatsApp template API error:', JSON.stringify(templateData));
      throw new Error(`WhatsApp template API error: ${JSON.stringify(templateData)}`);
    }

    console.log('WhatsApp notification sent successfully:', JSON.stringify(templateData));

    return new Response(
      JSON.stringify({ success: true, message: 'Notification sent', data: templateData }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error sending WhatsApp notification:', error.message || error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
