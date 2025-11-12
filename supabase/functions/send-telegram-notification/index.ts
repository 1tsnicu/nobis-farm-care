import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const orderData: OrderData = await req.json();
    
    const botToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
    const chatId = Deno.env.get('TELEGRAM_CHAT_ID');

    if (!botToken || !chatId) {
      throw new Error('Telegram credentials not configured');
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
    const message = `
🆕 *COMANDĂ NOUĂ PLASATĂ!*

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
})}
    `.trim();

    console.log('Sending Telegram notification...');
    
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    );

    const telegramData = await telegramResponse.json();
    
    if (!telegramResponse.ok) {
      console.error('Telegram API error:', telegramData);
      throw new Error(`Telegram API error: ${JSON.stringify(telegramData)}`);
    }

    console.log('Telegram notification sent successfully');

    return new Response(
      JSON.stringify({ success: true, message: 'Notification sent' }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error sending Telegram notification:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
