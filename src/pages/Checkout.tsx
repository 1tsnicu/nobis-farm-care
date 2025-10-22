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
              <Button onClick={() => window.location.href = "/produse"}>
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
                  Telefon: +373 22 123-456
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

              <div className="flex gap-4">
                <Button onClick={() => window.location.href = "/produse"} className="flex-1">
                  Continuă cumpărăturile
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = "/contact"}
                  className="flex-1"
                >
                  Contactează-ne
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              {[1, 2].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step}
                  </div>
                  {step < 2 && (
                    <div className={`w-16 h-1 mx-2 ${
                      currentStep > step ? 'bg-primary' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">
                {currentStep === 1 && "Informații de contact"}
                {currentStep === 2 && "Revizuire comandă"}
                {currentStep === 3 && "Confirmare"}
              </h1>
              <Progress value={(currentStep / 2) * 100} className="w-1/2 mx-auto mt-2" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Step 1: Contact Information */}
              {currentStep === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Informații de contact pentru ridicare
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold text-blue-800">Adresa farmaciei:</span>
                      </div>
                      <p className="text-blue-700">
                        Satul Horești, raionul Ialoveni<br/>
                        Strada Ștefan cel Mare 138<br/>
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prenume *</Label>
                        <Input
                          id="firstName"
                          value={orderData.deliveryInfo.firstName}
                          onChange={(e) => setOrderData(prev => ({
                            ...prev,
                            deliveryInfo: { ...prev.deliveryInfo, firstName: e.target.value }
                          }))}
                          placeholder="Ion"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nume *</Label>
                        <Input
                          id="lastName"
                          value={orderData.deliveryInfo.lastName}
                          onChange={(e) => setOrderData(prev => ({
                            ...prev,
                            deliveryInfo: { ...prev.deliveryInfo, lastName: e.target.value }
                          }))}
                          placeholder="Popescu"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon *</Label>
                        <Input
                          id="phone"
                          value={orderData.deliveryInfo.phone}
                          onChange={(e) => setOrderData(prev => ({
                            ...prev,
                            deliveryInfo: { ...prev.deliveryInfo, phone: e.target.value }
                          }))}
                          placeholder="+373 6xx xxx xxx"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={orderData.deliveryInfo.email}
                          onChange={(e) => setOrderData(prev => ({
                            ...prev,
                            deliveryInfo: { ...prev.deliveryInfo, email: e.target.value }
                          }))}
                          placeholder="ion.popescu@email.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Observații (opțional)</Label>
                      <Textarea
                        id="notes"
                        value={orderData.notes}
                        onChange={(e) => setOrderData(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="Observații pentru comandă..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Order Review */}
              {currentStep === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Revizuire comandă
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Contact Info */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Informații de contact</h3>
                      <div className="text-sm space-y-1">
                        <div>{orderData.deliveryInfo.firstName} {orderData.deliveryInfo.lastName}</div>
                        <div>{orderData.deliveryInfo.phone}</div>
                        <div>{orderData.deliveryInfo.email}</div>
                      </div>
                      <div className="mt-2 pt-2 border-t">
                        <div className="text-sm">
                          <strong>Ridicare din farmacie:</strong> Gratuit
                        </div>
                        <div className="text-sm text-gray-600">
                          Satul Horești, raionul Ialoveni, strada Ștefan cel Mare 138
                        </div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h3 className="font-semibold mb-2 text-green-800">Modalitate de plată</h3>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-green-600" />
                        <span className="text-green-700 font-medium">Plată la ridicare din farmacie</span>
                      </div>
                      <p className="text-sm text-green-600 mt-1">
                        Veți plăti comanda în numerar sau cu cardul direct în farmacie.
                      </p>
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

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Sumar comandă
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div>
                        <div className="font-medium truncate pr-2">{item.name}</div>
                        <div className="text-gray-500">{item.quantity} x {item.price.toFixed(2)} MDL</div>
                      </div>
                      <div className="font-semibold">
                        {(item.quantity * item.price).toFixed(2)} MDL
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>{finalTotal.toFixed(2)} MDL</span>
                  </div>

                  <div className="text-xs text-green-600 font-medium">
                    Plata se face la ridicare din farmacie
                  </div>

                  {currentStep < 3 && (
                    <Button 
                      onClick={handleNextStep} 
                      className="w-full"
                      disabled={isProcessing}
                    >
                      {currentStep === 1 ? "Continuă către revizuire" : "Confirmă comanda"}
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
