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
    
    // First, send template to open conversation
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
          name: 'hello_world',
          language: {
            code: 'en_US'
          }
        }
      }),
    });

    const templateData = await templateResponse.json();
    
    if (!templateResponse.ok) {
      console.error('WhatsApp template API error:', templateData);
      throw new Error(`WhatsApp template API error: ${JSON.stringify(templateData)}`);
    }

    console.log('WhatsApp template sent successfully:', templateData);

    // Wait a bit before sending the actual message
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Now send the actual order details message
    const messageResponse = await fetch(whatsappUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${whatsappToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: whatsappNumber,
        type: 'text',
        text: {
          body: message
        }
      }),
    });

    const messageData = await messageResponse.json();
    
    if (!messageResponse.ok) {
      console.error('WhatsApp message API error:', messageData);
      throw new Error(`WhatsApp message API error: ${JSON.stringify(messageData)}`);
    }

    console.log('WhatsApp order details sent successfully:', messageData);

    return new Response(
      JSON.stringify({ success: true, message: 'Notification sent', data: { template: templateData, message: messageData } }),
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
