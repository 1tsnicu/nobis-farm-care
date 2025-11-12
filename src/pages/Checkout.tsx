import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { ShoppingCart, MapPin, Phone, Mail, CreditCard, Package, Truck, CheckCircle, AlertCircle } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface OrderData {
  deliveryInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  notes: string;
  deliveryMethod: 'pickup';
}

export const Checkout = () => {
  const { items, clearCart } = useCart();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState<OrderData>({
    deliveryInfo: {
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
    },
    notes: '',
    deliveryMethod: 'pickup'
  });
  const [orderResult, setOrderResult] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate total manually
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Nu mai avem cost de livrare - ridicare din farmacie este gratuită
  const finalTotal = total;

  const validateDeliveryInfo = () => {
    const { deliveryInfo } = orderData;
    const required = ['firstName', 'lastName', 'phone', 'email'];
    
    for (const field of required) {
      if (!deliveryInfo[field as keyof typeof deliveryInfo].trim()) {
        toast({
          title: "Informații incomplete",
          description: "Vă rugăm să completați toate câmpurile obligatorii",
          variant: "destructive"
        });
        return false;
      }
    }

    // Validare email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(deliveryInfo.email)) {
      toast({
        title: "Email invalid",
        description: "Vă rugăm să introduceți o adresă de email validă",
        variant: "destructive"
      });
      return false;
    }

    // Validare telefon (Moldova format)
    const phoneRegex = /^[0-9+\-\s]{8,}$/;
    if (!phoneRegex.test(deliveryInfo.phone)) {
      toast({
        title: "Telefon invalid",
        description: "Vă rugăm să introduceți un număr de telefon valid",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !validateDeliveryInfo()) {
      return;
    }
    if (currentStep === 2) {
      // Trecem direct la confirmare pentru că plata se face în farmacie
      handlePharmacyPayment();
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleDownloadOrder = () => {
    if (!orderResult) return;

    // Creăm conținutul HTML pentru descărcare/print
    const orderDate = new Date(orderResult.createdAt).toLocaleDateString('ro-RO');
    const orderTime = new Date(orderResult.createdAt).toLocaleTimeString('ro-RO');
    
    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Confirmarea Comenzii ${orderResult.id}</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #22c55e; padding-bottom: 20px; }
          .logo { color: #22c55e; font-size: 24px; font-weight: bold; }
          .title { color: #16a34a; font-size: 20px; margin: 10px 0; }
          .section { margin: 20px 0; padding: 15px; border: 1px solid #e5e7eb; border-radius: 8px; }
          .section-title { font-weight: bold; color: #374151; margin-bottom: 10px; font-size: 16px; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
          .info-item { margin: 5px 0; }
          .info-label { font-weight: bold; color: #6b7280; }
          .pharmacy-info { background: #f0fdf4; border-color: #22c55e; }
          .products-table { width: 100%; border-collapse: collapse; margin: 10px 0; }
          .products-table th, .products-table td { border: 1px solid #e5e7eb; padding: 8px; text-align: left; }
          .products-table th { background: #f9fafb; font-weight: bold; }
          .total-row { background: #f0fdf4; font-weight: bold; }
          .status-badge { background: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 4px; font-size: 14px; }
          .footer { margin-top: 30px; text-align: center; font-size: 14px; color: #6b7280; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🏥 NOBIS FARM</div>
          <div class="title">Confirmarea Comenzii</div>
          <div style="color: #6b7280;">${orderDate} la ${orderTime}</div>
        </div>

        <div class="section">
          <div class="section-title">📋 Detalii Comandă</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Număr comandă:</span> ${orderResult.id}
            </div>
            <div class="info-item">
              <span class="info-label">Status:</span> 
              <span class="status-badge">${orderResult.status === 'pending_pickup' ? 'În așteptarea ridicării' : orderResult.status}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Total de plată:</span> ${orderResult.total.toFixed(2)} MDL
            </div>
            <div class="info-item">
              <span class="info-label">Modalitate plată:</span> La ridicare din farmacie
            </div>
          </div>
        </div>

        <div class="section pharmacy-info">
          <div class="section-title">🏪 Informații Farmacie</div>
          <div><strong>Adresa:</strong> Satul Horești, raionul Ialoveni</div>
          <div><strong>Strada:</strong> Ștefan cel Mare 138</div>
          <div><strong>Telefon:</strong> 026 858 762</div>
          <div style="margin-top: 10px; font-weight: bold; color: #16a34a;">
            Vă rugăm să vă prezentați la farmacie pentru ridicare și plată.
          </div>
        </div>

        <div class="section">
          <div class="section-title">👤 Informații Contact</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Nume complet:</span> ${orderResult.deliveryInfo.firstName} ${orderResult.deliveryInfo.lastName}
            </div>
            <div class="info-item">
              <span class="info-label">Telefon:</span> ${orderResult.deliveryInfo.phone}
            </div>
            <div class="info-item">
              <span class="info-label">Email:</span> ${orderResult.deliveryInfo.email}
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">🛒 Produse Comandate</div>
          <table class="products-table">
            <thead>
              <tr>
                <th>Produs</th>
                <th>Cantitate</th>
                <th>Preț unitar</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${orderResult.items.map((item: any) => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>${item.price.toFixed(2)} MDL</td>
                  <td>${(item.quantity * item.price).toFixed(2)} MDL</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td colspan="3"><strong>TOTAL DE PLATĂ:</strong></td>
                <td><strong>${orderResult.total.toFixed(2)} MDL</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        ${orderResult.notes ? `
        <div class="section">
          <div class="section-title">📝 Observații</div>
          <div>${orderResult.notes}</div>
        </div>
        ` : ''}

        <div class="footer">
          <div>Nobis Farm - Farmacia ta de încredere</div>
          <div>Generat la ${new Date().toLocaleDateString('ro-RO')} ${new Date().toLocaleTimeString('ro-RO')}</div>
        </div>
      </body>
      </html>
    `;

    // Creăm un blob și îl descărcăm
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Comanda_${orderResult.id}_${orderDate.replace(/\//g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Confirmarea a fost descărcată!",
      description: "Fișierul a fost salvat în folderul de descărcări",
    });
  };

  const handlePrintOrder = () => {
    if (!orderResult) return;

    const orderDate = new Date(orderResult.createdAt).toLocaleDateString('ro-RO');
    const orderTime = new Date(orderResult.createdAt).toLocaleTimeString('ro-RO');
    
    const printContent = `
      <html>
      <head>
        <title>Confirmarea Comenzii ${orderResult.id}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #22c55e; padding-bottom: 20px; }
          .logo { color: #22c55e; font-size: 24px; font-weight: bold; }
          .title { color: #16a34a; font-size: 20px; margin: 10px 0; }
          .section { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
          .section-title { font-weight: bold; color: #374151; margin-bottom: 10px; font-size: 16px; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
          .info-item { margin: 5px 0; }
          .info-label { font-weight: bold; }
          .pharmacy-info { background: #f0fdf4; }
          .products-table { width: 100%; border-collapse: collapse; margin: 10px 0; }
          .products-table th, .products-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          .products-table th { background: #f9fafb; font-weight: bold; }
          .total-row { background: #f0fdf4; font-weight: bold; }
          .footer { margin-top: 30px; text-align: center; font-size: 14px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🏥 NOBIS FARM</div>
          <div class="title">Confirmarea Comenzii</div>
          <div>${orderDate} la ${orderTime}</div>
        </div>

        <div class="section">
          <div class="section-title">Detalii Comandă</div>
          <div class="info-grid">
            <div class="info-item"><strong>Număr comandă:</strong> ${orderResult.id}</div>
            <div class="info-item"><strong>Status:</strong> ${orderResult.status === 'pending_pickup' ? 'În așteptarea ridicării' : orderResult.status}</div>
            <div class="info-item"><strong>Total de plată:</strong> ${orderResult.total.toFixed(2)} MDL</div>
            <div class="info-item"><strong>Modalitate plată:</strong> La ridicare din farmacie</div>
          </div>
        </div>

        <div class="section pharmacy-info">
          <div class="section-title">Informații Farmacie</div>
          <div><strong>Adresa:</strong> Satul Horești, raionul Ialoveni</div>
          <div><strong>Strada:</strong> Ștefan cel Mare 138</div>
          <div><strong>Telefon:</strong> 026 858 762</div>
          <div style="margin-top: 10px; font-weight: bold;">
            Vă rugăm să vă prezentați la farmacie pentru ridicare și plată.
          </div>
        </div>

        <div class="section">
          <div class="section-title">Informații Contact</div>
          <div class="info-grid">
            <div class="info-item"><strong>Nume:</strong> ${orderResult.deliveryInfo.firstName} ${orderResult.deliveryInfo.lastName}</div>
            <div class="info-item"><strong>Telefon:</strong> ${orderResult.deliveryInfo.phone}</div>
            <div class="info-item"><strong>Email:</strong> ${orderResult.deliveryInfo.email}</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Produse Comandate</div>
          <table class="products-table">
            <thead>
              <tr>
                <th>Produs</th>
                <th>Cantitate</th>
                <th>Preț unitar</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${orderResult.items.map((item: any) => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>${item.price.toFixed(2)} MDL</td>
                  <td>${(item.quantity * item.price).toFixed(2)} MDL</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td colspan="3"><strong>TOTAL DE PLATĂ:</strong></td>
                <td><strong>${orderResult.total.toFixed(2)} MDL</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        ${orderResult.notes ? `
        <div class="section">
          <div class="section-title">Observații</div>
          <div>${orderResult.notes}</div>
        </div>
        ` : ''}

        <div class="footer">
          <div>Nobis Farm - Farmacia ta de încredere</div>
          <div>Generat la ${new Date().toLocaleDateString('ro-RO')} ${new Date().toLocaleTimeString('ro-RO')}</div>
        </div>
      </body>
      </html>
    `;

    // Deschidere fereastră nouă pentru print
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }

    toast({
      title: "Fereastră de print deschisă!",
      description: "Puteți tipări sau salva confirmarea ca PDF",
    });
  };

  const handlePharmacyPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulăm procesarea comenzii pentru plata în farmacie
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const order = {
        id: `ORD-${Date.now()}`,
        items: items,
        total: finalTotal,
        deliveryInfo: orderData.deliveryInfo,
        deliveryMethod: 'pickup',
        notes: orderData.notes,
        payment: {
          success: true,
          method: 'pharmacy',
          transactionId: `PAY-${Date.now()}`,
          message: 'Comanda rezervată pentru ridicare și plată în farmacie'
        },
        status: 'pending_pickup',
        createdAt: new Date().toISOString()
      };

      // Trimite notificarea în Telegram
      try {
        const { error: telegramError } = await supabase.functions.invoke('send-telegram-notification', {
          body: {
            firstName: orderData.deliveryInfo.firstName,
            lastName: orderData.deliveryInfo.lastName,
            phone: orderData.deliveryInfo.phone,
            email: orderData.deliveryInfo.email,
            notes: orderData.notes,
            products: items.map(item => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price
            })),
            total: finalTotal,
            deliveryMethod: 'pickup'
          }
        });

        if (telegramError) {
          console.error('Error sending Telegram notification:', telegramError);
        }
      } catch (telegramError) {
        console.error('Failed to send Telegram notification:', telegramError);
        // Nu blocăm comanda dacă notificarea eșuează
      }

      setOrderResult(order);
      setCurrentStep(3); // Pas final de confirmare
      clearCart();

      toast({
        title: "Comandă rezervată cu succes!",
        description: `Comanda ${order.id} este gata pentru ridicare`,
      });
    } catch (error) {
      toast({
        title: "Eroare",
        description: "A apărut o eroare la procesarea comenzii",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentComplete = async (paymentResult: any) => {
    setIsProcessing(true);
    
    try {
      // Simulăm procesarea comenzii
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (paymentResult.success) {
        const order = {
          id: `ORD-${Date.now()}`,
          items: items,
          total: finalTotal,
          deliveryInfo: orderData.deliveryInfo,
          deliveryMethod: orderData.deliveryMethod,
          notes: orderData.notes,
          payment: paymentResult,
          status: 'confirmed',
          createdAt: new Date().toISOString()
        };

        setOrderResult(order);
        setCurrentStep(4);
        clearCart();

        toast({
          title: "Comandă plasată cu succes!",
          description: `Comanda ${order.id} a fost înregistrată`,
        });
      } else {
        toast({
          title: "Eroare la procesarea plății",
          description: paymentResult.error || "A apărut o eroare. Încercați din nou.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Eroare",
        description: "A apărut o eroare la procesarea comenzii",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0 && !orderResult) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="pt-6">
              <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Coșul este gol</h2>
              <p className="text-gray-600 mb-4">
                Adăugați produse în coș pentru a continua cu comanda.
              </p>
              <Button onClick={() => window.location.href = "/categorie/medicamente-otc"}>
                Continuă cumpărăturile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Success Page
  if (orderResult) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">
                Comandă rezervată cu succes!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center text-gray-600">
                Comanda a fost rezervată! Vă rugăm să vă prezentați la farmacie pentru ridicare și plată.
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">Adresa farmaciei:</h3>
                <p className="text-green-700">
                  <strong>Satul Horești, raionul Ialoveni</strong><br/>
                  <strong>Strada Ștefan cel Mare 138</strong><br/>
                  Telefon: 026 858 762
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Număr comandă:</span>
                  <span className="font-mono">{orderResult.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Total de plată:</span>
                  <span className="font-bold">{orderResult.total.toFixed(2)} MDL</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Status:</span>
                  <Badge variant="secondary">
                    {orderResult.status === 'pending_pickup' ? 'În așteptarea ridicării' : orderResult.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Modalitate plată:</span>
                  <span className="text-green-600 font-medium">La ridicare din farmacie</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Produse comandate:</h3>
                {orderResult.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.quantity} x {item.price.toFixed(2)} MDL</div>
                    </div>
                    <div className="font-semibold">
                      {(item.quantity * item.price).toFixed(2)} MDL
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Informații de contact:</h3>
                <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-1">
                  <div>{orderResult.deliveryInfo.firstName} {orderResult.deliveryInfo.lastName}</div>
                  <div>{orderResult.deliveryInfo.phone}</div>
                  <div>{orderResult.deliveryInfo.email}</div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => window.location.href = "/categorie/medicamente-otc"} className="flex-1" size="default">
                    Continuă cumpărăturile
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => window.location.href = "/contact"}
                    className="flex-1"
                    size="default"
                  >
                    Contactează-ne
                  </Button>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    variant="secondary" 
                    onClick={() => handleDownloadOrder()}
                    className="flex-1"
                    size="default"
                  >
                    📄 Descarcă confirmarea
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={() => handlePrintOrder()}
                    className="flex-1"
                    size="default"
                  >
                    🖨️ Tipărește confirmarea
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-16">
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-6xl mx-auto">
          {/* Compact Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-3 shadow-lg">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-1">
              Finalizează Comanda
            </h1>
            <p className="text-gray-600 text-sm">
              Doar câțiva pași simpli până la ridicarea din farmacie
            </p>
          </div>

          {/* Compact Progress Steps */}
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-4 mb-3">
              {[
                { step: 1, icon: MapPin, label: "Contact" },
                { step: 2, icon: Package, label: "Revizuire" }
              ].map(({ step, icon: Icon, label }) => (
                <div key={step} className="flex items-center">
                  <div className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                    currentStep >= step
                      ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-md'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}>
                    <Icon className={`w-4 h-4 ${currentStep >= step ? 'text-white' : 'text-gray-500'}`} />
                    {currentStep >= step && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                        <CheckCircle className="w-2 h-2 text-green-500" />
                      </div>
                    )}
                  </div>
                  <div className="ml-2 text-left">
                    <div className={`text-sm font-medium ${currentStep >= step ? 'text-green-600' : 'text-gray-500'}`}>
                      {label}
                    </div>
                  </div>
                  {step < 2 && (
                    <div className={`w-12 h-1 mx-3 rounded-full transition-all duration-300 ${
                      currentStep > step 
                        ? 'bg-gradient-to-r from-green-400 to-green-600' 
                        : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {currentStep === 1 && "📋 Informații de Contact"}
                {currentStep === 2 && "🔍 Revizuire Comandă"}
                {currentStep === 3 && "✅ Confirmare"}
              </h2>
              <div className="w-full max-w-xs mx-auto bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(currentStep / 2) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* Step 1: Enhanced Contact Information */}
              {currentStep === 1 && (
                <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b p-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                      <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                        Informații de Contact pentru Ridicare
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-4">
                    {/* Compact Pharmacy Info Card */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 p-3 rounded-lg border border-blue-200 shadow-sm">
                      <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2 text-sm">
                        🏥 Adresa Farmaciei NOBIS FARM
                      </h3>
                      <div className="space-y-1 text-sm text-blue-800">
                        <p className="text-xs">📍 Satul Horești, raionul Ialoveni, strada Ștefan cel Mare 138</p>
                        <p className="flex items-center gap-2 text-xs">
                          <Phone className="h-3 w-3" />
                          026 858 762
                        </p>
                      </div>
                    </div>

                    {/* Compact Form Fields */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-lg border border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        👤 Datele Dumneavoastră
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="firstName" className="text-xs font-medium text-gray-700">
                            Prenume *
                          </Label>
                          <Input
                            id="firstName"
                            value={orderData.deliveryInfo.firstName}
                            onChange={(e) => setOrderData(prev => ({
                              ...prev,
                              deliveryInfo: { ...prev.deliveryInfo, firstName: e.target.value }
                            }))}
                            placeholder="Ex: Ion"
                            className="h-9 border-2 border-gray-200 rounded-lg focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all text-sm"
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor="lastName" className="text-xs font-medium text-gray-700">
                            Nume de Familie *
                          </Label>
                          <Input
                            id="lastName"
                            value={orderData.deliveryInfo.lastName}
                            onChange={(e) => setOrderData(prev => ({
                              ...prev,
                              deliveryInfo: { ...prev.deliveryInfo, lastName: e.target.value }
                            }))}
                            placeholder="Ex: Popescu"
                            className="h-9 border-2 border-gray-200 rounded-lg focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                        <div className="space-y-1">
                          <Label htmlFor="phone" className="text-xs font-medium text-gray-700 flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            Telefon *
                          </Label>
                          <Input
                            id="phone"
                            value={orderData.deliveryInfo.phone}
                            onChange={(e) => setOrderData(prev => ({
                              ...prev,
                              deliveryInfo: { ...prev.deliveryInfo, phone: e.target.value }
                            }))}
                            placeholder="026 85x xxx"
                            className="h-9 border-2 border-gray-200 rounded-lg focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all text-sm"
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor="email" className="text-xs font-medium text-gray-700 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={orderData.deliveryInfo.email}
                            onChange={(e) => setOrderData(prev => ({
                              ...prev,
                              deliveryInfo: { ...prev.deliveryInfo, email: e.target.value }
                            }))}
                            placeholder="ion.popescu@email.com"
                            className="h-9 border-2 border-gray-200 rounded-lg focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 mt-3">
                        <Label htmlFor="notes" className="text-xs font-medium text-gray-700 flex items-center gap-1">
                          💬 Observații (opțional)
                        </Label>
                        <Textarea
                          id="notes"
                          value={orderData.notes}
                          onChange={(e) => setOrderData(prev => ({ ...prev, notes: e.target.value }))}
                          placeholder="Observații pentru comandă..."
                          rows={2}
                          className="border-2 border-gray-200 rounded-lg focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all resize-none text-sm"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Enhanced Order Review */}
              {currentStep === 2 && (
                <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg border-b p-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                        <Package className="h-4 w-4 text-white" />
                      </div>
                      <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                        Revizuire Finală a Comenzii
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 p-4">
                    {/* Compact Contact Info */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 p-3 rounded-lg border border-blue-200">
                      <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2 text-sm">
                        👤 Informații Contact
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="bg-white/70 p-2 rounded">
                          <div className="text-xs text-gray-500 mb-1">Nume</div>
                          <div className="font-semibold text-gray-800 text-xs">{orderData.deliveryInfo.firstName} {orderData.deliveryInfo.lastName}</div>
                        </div>
                        <div className="bg-white/70 p-2 rounded">
                          <div className="text-xs text-gray-500 mb-1">Telefon</div>
                          <div className="font-semibold text-gray-800 text-xs flex items-center gap-1">
                            <Phone className="h-3 w-3 text-blue-600" />
                            {orderData.deliveryInfo.phone}
                          </div>
                        </div>
                        <div className="bg-white/70 p-2 rounded md:col-span-2">
                          <div className="text-xs text-gray-500 mb-1">Email</div>
                          <div className="font-semibold text-gray-800 text-xs flex items-center gap-1">
                            <Mail className="h-3 w-3 text-blue-600" />
                            {orderData.deliveryInfo.email}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-2 p-2 bg-green-100 rounded border border-green-300">
                        <div className="font-semibold text-green-800 text-xs flex items-center gap-1">
                          🏥 Ridicare GRATUITĂ
                        </div>
                        <p className="text-xs text-green-700 mt-1">
                          📍 Satul Horești, raionul Ialoveni, strada Ștefan cel Mare 138
                        </p>
                      </div>
                    </div>

                    {/* Compact Payment Method */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-100 p-3 rounded-lg border border-green-200">
                      <h3 className="font-bold text-green-900 mb-2 flex items-center gap-2 text-sm">
                        💳 Modalitate de Plată
                      </h3>
                      <div className="bg-white/80 p-2 rounded border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <CreditCard className="h-3 w-3 text-green-600" />
                          <div className="font-semibold text-green-800 text-xs">Plată la Ridicare</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-center p-1.5 bg-green-100 rounded text-xs">
                            💵 Numerar
                          </div>
                          <div className="text-center p-1.5 bg-green-100 rounded text-xs">
                            💳 Card
                          </div>
                        </div>
                        <p className="text-xs text-green-600 mt-1 text-center bg-green-50 p-1 rounded">
                          ✨ Plătiți la ridicarea din farmacie
                        </p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-4">
                      <h3 className="font-semibold">Produse comandate</h3>
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center py-3 border-b">
                          <div className="flex items-center gap-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-gray-500">
                                {item.quantity} x {item.price.toFixed(2)} MDL
                              </div>
                            </div>
                          </div>
                          <div className="font-semibold">
                            {(item.quantity * item.price).toFixed(2)} MDL
                          </div>
                        </div>
                      ))}
                    </div>

                    {orderData.notes && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Observații</h3>
                        <p className="text-sm">{orderData.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Payment - Removed, now handled automatically */}
            </div>

            {/* Compact Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4 shadow-xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-green-700 p-3 text-white">
                  <CardTitle className="flex items-center gap-2 text-base font-bold">
                    <ShoppingCart className="h-4 w-4" />
                    <span>Rezumat Comandă</span>
                  </CardTitle>
                  <p className="text-green-100 text-xs">
                    Verificați produsele selectate
                  </p>
                </div>
                <CardContent className="space-y-3 p-3">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-800 flex items-center gap-1 text-xs">
                      🛍️ Produse ({items.length})
                    </h3>
                    {items.map((item, index) => (
                      <div key={item.id} className="hover:bg-gray-50 p-1.5 rounded transition-colors">
                        <div className="flex justify-between items-center">
                          <div className="flex-1 pr-2">
                            <div className="font-medium text-gray-800 text-xs leading-tight">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                              <span className="bg-green-100 text-green-700 px-1 py-0.5 rounded text-xs">
                                {item.quantity}
                              </span>
                              × {item.price.toFixed(2)} MDL
                            </div>
                          </div>
                          <div className="font-bold text-green-600 text-xs">
                            {(item.quantity * item.price).toFixed(2)} MDL
                          </div>
                        </div>
                        {index < items.length - 1 && <div className="border-b border-gray-100 mt-1"></div>}
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-dashed border-gray-200 pt-2">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-2 rounded">
                      <div className="flex justify-between items-center text-xs text-gray-600 mb-1">
                        <span>Subtotal:</span>
                        <span>{finalTotal.toFixed(2)} MDL</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-green-600 mb-1">
                        <span>🚚 Ridicare:</span>
                        <span className="font-semibold">GRATUIT</span>
                      </div>
                      <div className="border-t border-gray-300 pt-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-gray-800 text-sm">TOTAL:</span>
                          <span className="text-lg font-bold text-green-600">{finalTotal.toFixed(2)} MDL</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded p-2">
                    <div className="flex items-center gap-1 text-green-700">
                      <span>💰</span>
                      <span className="font-medium text-xs">Plată la ridicare</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                      Numerar sau card bancar
                    </p>
                  </div>

                  {currentStep < 3 && (
                    <Button 
                      onClick={handleNextStep} 
                      className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 text-sm"
                      disabled={isProcessing}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {isProcessing ? (
                          <>
                            <div className="animate-spin w-3 h-3 border-2 border-white border-t-transparent rounded-full"></div>
                            <span className="text-xs">Se procesează...</span>
                          </>
                        ) : (
                          <>
                            <span className="text-xs">{currentStep === 1 ? "🔍 Continuă către revizuire" : "✅ Confirmă comanda"}</span>
                            <span>→</span>
                          </>
                        )}
                      </div>
                    </Button>
                  )}

                  {currentStep > 1 && currentStep < 3 && (
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      className="w-full mt-2"
                      disabled={isProcessing}
                    >
                      Înapoi
                    </Button>
                  )}

                  {currentStep === 2 && isProcessing && (
                    <Alert className="mt-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Se procesează comanda... Vă rugăm să așteptați.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
