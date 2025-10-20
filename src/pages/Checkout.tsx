import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBanner from "@/components/TopBanner";

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState("chisinau");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const subtotal = 404.0;
  const deliveryFee = subtotal >= 349 ? 0 : 45;
  const total = subtotal + deliveryFee;

  if (step === 4) {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBanner />
        <Header />
        
        <main className="flex-1 bg-muted/30 py-12">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <Card className="shadow-lg">
              <CardContent className="pt-12 pb-8">
                <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-12 h-12 text-secondary" />
                </div>
                
                <h1 className="text-3xl font-bold text-foreground mb-4">
                  Comandă plasată cu succes!
                </h1>
                
                <div className="bg-muted/50 rounded-lg p-6 space-y-3 text-left max-w-md mx-auto mb-8">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nr. comandă:</span>
                    <span className="font-bold">#12345678</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Data comenzii:</span>
                    <span className="font-medium">{new Date().toLocaleDateString('ro-RO')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email confirmare:</span>
                    <span className="font-medium">user@email.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimare livrare:</span>
                    <span className="font-semibold text-primary">Mâine, 15:00-18:00</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-8">
                  Mulțumim pentru cumpărătură! Verifică email-ul pentru confirmarea comenzii.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild>
                    <Link to="/cont/comenzi">Urmărește comanda</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/produse">Continuă cumpărăturile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TopBanner />
      <Header />
      
      <main className="flex-1 bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          {/* Progress */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    s <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {s}
                  </div>
                  {s < 3 && (
                    <div className={`h-1 w-16 md:w-32 ${s < step ? 'bg-primary' : 'bg-muted'}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs md:text-sm">
              <span>Livrare</span>
              <span>Plată</span>
              <span>Confirmare</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Left - Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {step === 1 && "Informații livrare"}
                    {step === 2 && "Metoda de plată"}
                    {step === 3 && "Confirmare comandă"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {step === 1 && (
                    <>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nume complet *</Label>
                          <Input id="name" placeholder="Ion Popescu" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefon *</Label>
                          <Input id="phone" placeholder="+373 69 123 456" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" placeholder="ion@exemplu.com" />
                      </div>

                      <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 border rounded-lg p-4">
                            <RadioGroupItem value="chisinau" id="chisinau" />
                            <Label htmlFor="chisinau" className="flex-1 cursor-pointer">
                              <div className="font-semibold">Livrare Chișinău 24h</div>
                              <div className="text-sm text-muted-foreground">
                                {subtotal >= 349 ? 'Gratuit' : '45 MDL'}
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 border rounded-lg p-4">
                            <RadioGroupItem value="moldova" id="moldova" />
                            <Label htmlFor="moldova" className="flex-1 cursor-pointer">
                              <div className="font-semibold">Livrare restul țării 48h</div>
                              <div className="text-sm text-muted-foreground">
                                {subtotal >= 649 ? 'Gratuit' : '50 MDL'}
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 border rounded-lg p-4">
                            <RadioGroupItem value="pickup" id="pickup" />
                            <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                              <div className="font-semibold">Ridicare din farmacie</div>
                              <div className="text-sm text-muted-foreground">Gratuit</div>
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">Oraș *</Label>
                          <Input id="city" placeholder="Chișinău" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="street">Stradă și nr. *</Label>
                          <Input id="street" placeholder="Str. Stefan cel Mare 1" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="apartment">Apartament/Bloc</Label>
                        <Input id="apartment" placeholder="Ap. 10, Bl. 5" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">Notă pentru curier</Label>
                        <Textarea id="notes" placeholder="Ex: Sunați înainte de livrare" />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="save-address" />
                        <label htmlFor="save-address" className="text-sm cursor-pointer">
                          Salvează adresa pentru viitor
                        </label>
                      </div>

                      <Button onClick={() => setStep(2)} className="w-full" size="lg">
                        Continuă →
                      </Button>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 border rounded-lg p-4">
                            <RadioGroupItem value="cash" id="cash" />
                            <Label htmlFor="cash" className="flex-1 cursor-pointer">
                              <div className="font-semibold">Plată la livrare (Ramburs)</div>
                              <Badge variant="secondary" className="mt-1">Recomandat</Badge>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 border rounded-lg p-4">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex-1 cursor-pointer">
                              <div className="font-semibold">Card bancar</div>
                              <div className="text-sm text-muted-foreground">Visa, Mastercard, AmEx</div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 border rounded-lg p-4">
                            <RadioGroupItem value="online" id="online" />
                            <Label htmlFor="online" className="flex-1 cursor-pointer">
                              <div className="font-semibold">Plată online</div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 border rounded-lg p-4">
                            <RadioGroupItem value="transfer" id="transfer" />
                            <Label htmlFor="transfer" className="flex-1 cursor-pointer">
                              <div className="font-semibold">Transfer bancar</div>
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>

                      {paymentMethod === 'card' && (
                        <div className="space-y-4 pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-number">Număr card</Label>
                            <Input id="card-number" placeholder="1234 5678 9012 3456" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Data expirare</Label>
                              <Input id="expiry" placeholder="MM/YY" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input id="cvv" placeholder="123" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="card-name">Nume posesor</Label>
                            <Input id="card-name" placeholder="ION POPESCU" />
                          </div>
                        </div>
                      )}

                      <div className="flex gap-3">
                        <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                          ← Înapoi
                        </Button>
                        <Button onClick={() => setStep(3)} className="flex-1">
                          Continuă →
                        </Button>
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div className="space-y-4">
                        <div className="bg-muted/50 rounded-lg p-4">
                          <h3 className="font-semibold mb-2">Livrare</h3>
                          <p className="text-sm">Str. Stefan cel Mare 1, Ap. 10</p>
                          <p className="text-sm text-muted-foreground">Chișinău, Moldova</p>
                          <p className="text-sm text-primary mt-1">Livrare Chișinău - 24h • {deliveryFee === 0 ? 'Gratuit' : `${deliveryFee} MDL`}</p>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-4">
                          <h3 className="font-semibold mb-2">Plată</h3>
                          <p className="text-sm">Plată la livrare (Ramburs)</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox id="accept-terms" className="mt-1" />
                        <label htmlFor="accept-terms" className="text-sm cursor-pointer">
                          Accept{" "}
                          <Link to="/termeni" className="text-primary hover:underline">
                            Termenii și Condițiile
                          </Link>
                        </label>
                      </div>

                      <div className="flex gap-3">
                        <Button onClick={() => setStep(2)} variant="outline" className="flex-1">
                          ← Înapoi
                        </Button>
                        <Button onClick={() => setStep(4)} className="flex-1 bg-secondary hover:bg-secondary/90" size="lg">
                          Finalizează comanda
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right - Summary */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Rezumat comandă</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal (3 produse)</span>
                      <span className="font-medium">{subtotal.toFixed(2)} MDL</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Livrare</span>
                      <span className={`font-medium ${deliveryFee === 0 ? 'text-secondary' : ''}`}>
                        {deliveryFee === 0 ? 'Gratuit' : `${deliveryFee.toFixed(2)} MDL`}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between">
                    <span className="text-lg font-bold">TOTAL</span>
                    <span className="text-2xl font-bold text-primary">{total.toFixed(2)} MDL</span>
                  </div>

                  {subtotal < 349 && (
                    <div className="bg-orange/10 border border-orange/30 rounded-lg p-3">
                      <p className="text-xs text-orange font-medium">
                        Adaugă {(349 - subtotal).toFixed(2)} MDL și primești livrare GRATUITĂ în Chișinău!
                      </p>
                      <div className="w-full bg-orange/20 h-2 rounded-full mt-2">
                        <div 
                          className="bg-orange h-full rounded-full transition-all"
                          style={{ width: `${(subtotal / 349) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
