import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const deliveryCost = subtotal >= 349 ? 0 : 45;
  const total = subtotal + deliveryCost;

  const handleRemoveItem = (id: number, name: string) => {
    removeItem(id);
    toast({
      title: "Produs șters",
      description: `${name} a fost șters din coș`,
    });
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Coș gol",
        description: "Adaugă produse pentru a continua",
        variant: "destructive",
      });
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continuă cumpărăturile
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-8">Coșul tău</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    Coșul tău este gol
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Adaugă produse pentru a începe cumpărăturile
                  </p>
                  <Link to="/produse">
                    <Button>Explorează produsele</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">{item.brand}</p>
                        <h3 className="font-semibold text-foreground mb-2">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-border rounded-lg">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-4 font-medium">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-lg font-bold text-primary">
                            {item.price} MDL
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive hover:text-destructive/80"
                          onClick={() => handleRemoveItem(item.id, item.name)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                        <p className="text-lg font-bold text-foreground">
                          {item.price * item.quantity} MDL
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  Rezumat comandă
                </h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-foreground">
                    <span>Subtotal:</span>
                    <span className="font-medium">{subtotal} MDL</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Livrare:</span>
                    <span className="font-medium">
                      {deliveryCost === 0 ? 'Gratuit' : `${deliveryCost} MDL`}
                    </span>
                  </div>
                </div>

                {subtotal < 349 && (
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 mb-4">
                    <p className="text-sm text-foreground">
                      Adaugă încă <strong>{349 - subtotal} MDL</strong> pentru livrare gratuită!
                    </p>
                    <div className="w-full bg-muted rounded-full h-2 mt-2">
                      <div
                        className="bg-accent h-2 rounded-full transition-all"
                        style={{ width: `${(subtotal / 349) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                <Separator className="my-4" />

                <div className="flex justify-between mb-6">
                  <span className="text-lg font-bold text-foreground">Total:</span>
                  <span className="text-2xl font-bold text-primary">{total} MDL</span>
                </div>

                <Button 
                  className="w-full mb-3" 
                  size="lg"
                  onClick={handleCheckout}
                  disabled={items.length === 0}
                >
                  Continuă spre plată
                </Button>
                
                <Link to="/">
                  <Button variant="outline" className="w-full">
                    Continuă cumpărăturile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
