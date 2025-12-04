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
  email: string | null; // Email este opțional
  notes?: string;
  products: OrderProduct[];
  total: number;
  deliveryMethod?: string;
  address?: string;
  city?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 200,
      headers: corsHeaders 
    });
  }

  try {
    const orderData: OrderData = await req.json();
    
    const whatsappToken = Deno.env.get('WHATSAPP_TOKEN');
    const phoneNumberId = Deno.env.get('WHATSAPP_PHONE_NUMBER_ID');
    const whatsappNumber = Deno.env.get('YOUR_WHATSAPP_NUMBER');

    if (!whatsappToken || !phoneNumberId || !whatsappNumber) {
      throw new Error('WhatsApp credentials not configured');
    }

    console.log('Sending WhatsApp notification...');
    
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

    // Send using the approved template
    const templateResponse = await fetch(whatsappUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${whatsappToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
                { type: 'text', text: orderData.email || '-' }, // Afișăm "-" dacă email-ul nu este completat
                { type: 'text', text: deliveryMethodText },
                { type: 'text', text: productsListShort },
                { type: 'text', text: orderData.total.toFixed(2) },
                { type: 'text', text: timestamp }
              ]
            }
          ]
        }
      }),
    });

    const templateData = await templateResponse.json();
    
    if (!templateResponse.ok) {
      console.error('WhatsApp template API error:', templateData);
      throw new Error(`WhatsApp template API error: ${JSON.stringify(templateData)}`);
    }

    console.log('WhatsApp notification sent successfully:', templateData);

    return new Response(
      JSON.stringify({ success: true, message: 'Notification sent', data: templateData }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error sending WhatsApp notification:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
