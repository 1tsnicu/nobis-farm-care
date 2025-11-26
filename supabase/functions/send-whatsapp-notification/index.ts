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
  email: string;
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

    // Build products list
    const productsList = orderData.products
      .map((produs, index) => 
        `${index + 1}. ${produs.name} - ${produs.quantity}x - ${produs.price} MDL`
      )
      .join('\n');

    // Build delivery info
    let deliveryInfo = '';
    if (orderData.deliveryMethod === 'delivery' && orderData.address) {
      deliveryInfo = `\n📦 *Livrare:*\n• Oraș: ${orderData.city || 'N/A'}\n• Adresă: ${orderData.address}`;
    } else {
      deliveryInfo = '\n📦 *Ridicare din farmacie*';
    }

    // Build the message
    const message = `🆕 *COMANDĂ NOUĂ PLASATĂ!*

👤 *Date Client:*
• Prenume: ${orderData.firstName}
• Nume: ${orderData.lastName}
• 📞 Telefon: ${orderData.phone}
• 📧 Email: ${orderData.email}
${orderData.notes ? `• 💬 Observații: ${orderData.notes}` : ''}
${deliveryInfo}

🛒 *Produse Comandate:*
${productsList}

💰 *TOTAL: ${orderData.total.toFixed(2)} MDL*

⏰ Data: ${new Date().toLocaleString('ro-RO', { 
  timeZone: 'Europe/Chisinau',
  dateStyle: 'short',
  timeStyle: 'short'
})}`;

    console.log('Sending WhatsApp notification...');
    
    // WhatsApp Business Cloud API endpoint
    const whatsappUrl = `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`;
    
    const whatsappResponse = await fetch(whatsappUrl, {
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
          name: 'hello_world',
          language: {
            code: 'en_US'
          }
        }
      }),
    });

    const whatsappData = await whatsappResponse.json();
    
    if (!whatsappResponse.ok) {
      console.error('WhatsApp API error:', whatsappData);
      throw new Error(`WhatsApp API error: ${JSON.stringify(whatsappData)}`);
    }

    console.log('WhatsApp notification sent successfully:', whatsappData);

    return new Response(
      JSON.stringify({ success: true, message: 'Notification sent', data: whatsappData }),
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
