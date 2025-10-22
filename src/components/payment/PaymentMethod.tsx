import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Building, Smartphone, AlertCircle, CheckCircle, Copy } from "lucide-react";
import { CardForm } from "./CardForm";
import { usePayment } from "@/hooks/usePayment";
import { useToast } from "@/hooks/use-toast";

interface PaymentMethodProps {
  total: number;
  onPaymentComplete: (result: any) => void;
  disabled?: boolean;
}

export const PaymentMethod = ({ total, onPaymentComplete, disabled = false }: PaymentMethodProps) => {
  const { processCardPayment, processOnlinePayment, processBankTransfer, isProcessing } = usePayment();
  const { toast } = useToast();
  
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'online' | 'bank'>('card');
  const [cardData, setCardData] = useState<any>({});
  const [cardValid, setCardValid] = useState(false);
  const [onlineProvider, setOnlineProvider] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const bankDetails = {
    iban: 'MD24AG000000225100001310',
    bank: 'Moldova Agroindbank',
    beneficiary: 'NOBIS FARM SRL',
    reference: `COMANDA-${Date.now()}`
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiat!",
      description: `${type} a fost copiat în clipboard`,
    });
  };

  const handlePayment = async () => {
    let result;

    try {
      switch (selectedMethod) {
        case 'card':
          if (!cardValid) {
            toast({
              title: "Eroare",
              description: "Vă rugăm să completați corect toate datele cardului",
              variant: "destructive"
            });
            return;
          }
          result = await processCardPayment({
            ...cardData,
            cardNumber: cardData.cardNumber?.replace(/\s/g, '') || ''
          }, total);
          break;

        case 'online':
          if (!onlineProvider) {
            toast({
              title: "Eroare", 
              description: "Vă rugăm să selectați un furnizor de plată online",
              variant: "destructive"
            });
            return;
          }
          result = await processOnlinePayment({
            provider: onlineProvider,
            amount: total,
            currency: 'MDL',
            phoneNumber: phoneNumber
          });
          break;

        case 'bank':
          result = await processBankTransfer({
            amount: total,
            currency: 'MDL',
            bankDetails: bankDetails
          });
          break;
      }

      onPaymentComplete(result);

      if (result.success) {
        toast({
          title: "Plata a fost procesată cu succes!",
          description: `Tranzacția ${result.transactionId} a fost finalizată`,
        });
      } else {
        toast({
          title: "Eroare la procesarea plății",
          description: result.error || "A apărut o eroare. Încercați din nou.",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Eroare",
        description: error.message || "A apărut o eroare neașteptată",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Selectați metoda de plată</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card Payment */}
          <button
            onClick={() => setSelectedMethod('card')}
            disabled={disabled}
            className={`p-4 border-2 rounded-lg text-left transition-colors ${
              selectedMethod === 'card'
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-gray-300'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="h-6 w-6 text-primary" />
              <div>
                <div className="font-medium">Card bancar</div>
                <div className="text-sm text-gray-500">Visa, Mastercard</div>
              </div>
            </div>
          </button>

          {/* Online Payment */}
          <button
            onClick={() => setSelectedMethod('online')}
            disabled={disabled}
            className={`p-4 border-2 rounded-lg text-left transition-colors ${
              selectedMethod === 'online'
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-gray-300'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-center gap-3">
              <Smartphone className="h-6 w-6 text-primary" />
              <div>
                <div className="font-medium">Plată online</div>
                <div className="text-sm text-gray-500">PayPal, Apple Pay</div>
              </div>
            </div>
          </button>

          {/* Bank Transfer */}
          <button
            onClick={() => setSelectedMethod('bank')}
            disabled={disabled}
            className={`p-4 border-2 rounded-lg text-left transition-colors ${
              selectedMethod === 'bank'
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-gray-300'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-center gap-3">
              <Building className="h-6 w-6 text-primary" />
              <div>
                <div className="font-medium">Transfer bancar</div>
                <div className="text-sm text-gray-500">IBAN</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Payment Details */}
      <div className="border rounded-lg p-6">
        {selectedMethod === 'card' && (
          <div className="space-y-4">
            <h4 className="font-medium">Datele cardului</h4>
            <CardForm
              onDataChange={(data, isValid) => {
                setCardData(data);
                setCardValid(isValid);
              }}
              disabled={disabled}
            />
          </div>
        )}

        {selectedMethod === 'online' && (
          <div className="space-y-4">
            <h4 className="font-medium">Plată online</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Furnizor de plată</Label>
                <Select value={onlineProvider} onValueChange={setOnlineProvider} disabled={disabled}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectați furnizorul" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="apple-pay">Apple Pay</SelectItem>
                    <SelectItem value="google-pay">Google Pay</SelectItem>
                    <SelectItem value="revolut">Revolut</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {onlineProvider && (
                <div className="space-y-2">
                  <Label htmlFor="phone">Număr de telefon (opțional)</Label>
                  <Input
                    id="phone"
                    placeholder="026 85x xxx"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={disabled}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {selectedMethod === 'bank' && (
          <div className="space-y-4">
            <h4 className="font-medium">Detalii transfer bancar</h4>
            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                Comanda va fi procesată după confirmarea plății în contul nostru bancar.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">IBAN:</span>
                <div className="flex items-center gap-2">
                  <code className="bg-white px-2 py-1 rounded text-sm">
                    {bankDetails.iban}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(bankDetails.iban, 'IBAN')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Banca:</span>
                <span>{bankDetails.bank}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Beneficiar:</span>
                <span>{bankDetails.beneficiary}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Referință:</span>
                <div className="flex items-center gap-2">
                  <code className="bg-white px-2 py-1 rounded text-sm">
                    {bankDetails.reference}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(bankDetails.reference, 'Referința')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Suma:</span>
                <span>{total.toFixed(2)} MDL</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Process Payment Button */}
      <Button
        onClick={handlePayment}
        disabled={disabled || isProcessing || (selectedMethod === 'card' && !cardValid)}
        className="w-full py-6 text-lg"
        size="lg"
      >
        {isProcessing ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Procesăm plata...
          </div>
        ) : (
          `Plătește ${total.toFixed(2)} MDL`
        )}
      </Button>

      {/* Security Notice */}
      <Alert className="bg-green-50 border-green-200">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800 text-sm">
          <strong>Plata securizată:</strong> Utilizăm protocoale de securitate standard pentru protejarea datelor dumneavoastră.
        </AlertDescription>
      </Alert>
    </div>
  );
};
