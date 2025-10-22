import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CreditCard, AlertCircle, CheckCircle } from "lucide-react";
import { usePayment } from "@/hooks/usePayment";

interface CardFormProps {
  onDataChange: (cardData: any, isValid: boolean) => void;
  disabled?: boolean;
}

export const CardForm = ({ onDataChange, disabled = false }: CardFormProps) => {
  const { validateCard, validateExpiry, validateCVV } = usePayment();
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: ''
  });
  
  const [validation, setValidation] = useState({
    cardNumber: { isValid: false, cardType: 'unknown', error: '' },
    expiry: { isValid: false, error: '' },
    cvv: { isValid: false, error: '' },
    cardholderName: { isValid: false, error: '' }
  });

  // Formatare input pentru numărul cardului
  const formatCardInput = (value: string) => {
    const clean = value.replace(/\D/g, '');
    const match = clean.match(/.{1,4}/g);
    return match ? match.join(' ') : '';
  };

  // Validare în timp real
  useEffect(() => {
    const newValidation = { ...validation };

    // Validare număr card
    if (formData.cardNumber) {
      const cardValidation = validateCard(formData.cardNumber);
      newValidation.cardNumber = {
        isValid: cardValidation.isValid,
        cardType: cardValidation.cardType,
        error: cardValidation.isValid ? '' : 'Numărul cardului nu este valid'
      };
    }

    // Validare data expirării
    if (formData.expiryMonth && formData.expiryYear) {
      const isValidExpiry = validateExpiry(formData.expiryMonth, formData.expiryYear);
      newValidation.expiry = {
        isValid: isValidExpiry,
        error: isValidExpiry ? '' : 'Data expirării nu este validă'
      };
    }

    // Validare CVV
    if (formData.cvv) {
      const isValidCvv = validateCVV(formData.cvv, newValidation.cardNumber.cardType);
      newValidation.cvv = {
        isValid: isValidCvv,
        error: isValidCvv ? '' : 'Codul CVV nu este valid'
      };
    }

    // Validare nume posesor
    if (formData.cardholderName) {
      const isValidName = formData.cardholderName.trim().length >= 2;
      newValidation.cardholderName = {
        isValid: isValidName,
        error: isValidName ? '' : 'Numele posesorului trebuie să aibă cel puțin 2 caractere'
      };
    }

    setValidation(newValidation);

    // Verificăm dacă toate câmpurile sunt valide
    const allValid = Object.values(newValidation).every(field => field.isValid);
    onDataChange(formData, allValid);

  }, [formData, validateCard, validateExpiry, validateCVV, onDataChange]);

  const handleInputChange = (field: string, value: string) => {
    let processedValue = value;

    if (field === 'cardNumber') {
      processedValue = formatCardInput(value);
      if (processedValue.replace(/\s/g, '').length > 19) return;
    } else if (field === 'expiryMonth') {
      processedValue = value.replace(/\D/g, '').slice(0, 2);
      if (parseInt(processedValue) > 12) processedValue = '12';
    } else if (field === 'expiryYear') {
      processedValue = value.replace(/\D/g, '').slice(0, 4);
    } else if (field === 'cvv') {
      processedValue = value.replace(/\D/g, '').slice(0, 4);
    } else if (field === 'cardholderName') {
      processedValue = value.toUpperCase();
    }

    setFormData(prev => ({ ...prev, [field]: processedValue }));
  };

  const getCardIcon = () => {
    const { cardType } = validation.cardNumber;
    const cardIcons: Record<string, string> = {
      visa: '💳',
      mastercard: '💳',
      amex: '💳',
      discover: '💳',
      unknown: '💳'
    };
    return cardIcons[cardType] || '💳';
  };

  return (
    <div className="space-y-4">
      {/* Card Number */}
      <div className="space-y-2">
        <Label htmlFor="card-number">Număr card</Label>
        <div className="relative">
          <Input
            id="card-number"
            placeholder="1234 5678 9012 3456"
            value={formData.cardNumber}
            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
            disabled={disabled}
            className={`pr-12 ${
              formData.cardNumber && !validation.cardNumber.isValid 
                ? 'border-destructive' 
                : formData.cardNumber && validation.cardNumber.isValid 
                ? 'border-green-500' 
                : ''
            }`}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {validation.cardNumber.cardType !== 'unknown' && (
              <Badge variant="secondary" className="text-xs">
                {validation.cardNumber.cardType.toUpperCase()}
              </Badge>
            )}
            <span className="text-lg">{getCardIcon()}</span>
          </div>
        </div>
        {formData.cardNumber && validation.cardNumber.error && (
          <Alert variant="destructive" className="py-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              {validation.cardNumber.error}
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Expiry Date */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry-month">Luna</Label>
          <Input
            id="expiry-month"
            placeholder="MM"
            value={formData.expiryMonth}
            onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
            disabled={disabled}
            className={
              formData.expiryMonth && formData.expiryYear && !validation.expiry.isValid 
                ? 'border-destructive' 
                : formData.expiryMonth && formData.expiryYear && validation.expiry.isValid 
                ? 'border-green-500' 
                : ''
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expiry-year">Anul</Label>
          <Input
            id="expiry-year"
            placeholder="YYYY"
            value={formData.expiryYear}
            onChange={(e) => handleInputChange('expiryYear', e.target.value)}
            disabled={disabled}
            className={
              formData.expiryMonth && formData.expiryYear && !validation.expiry.isValid 
                ? 'border-destructive' 
                : formData.expiryMonth && formData.expiryYear && validation.expiry.isValid 
                ? 'border-green-500' 
                : ''
            }
          />
        </div>
      </div>
      {formData.expiryMonth && formData.expiryYear && validation.expiry.error && (
        <Alert variant="destructive" className="py-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            {validation.expiry.error}
          </AlertDescription>
        </Alert>
      )}

      {/* CVV */}
      <div className="space-y-2">
        <Label htmlFor="cvv">CVV</Label>
        <Input
          id="cvv"
          placeholder="123"
          value={formData.cvv}
          onChange={(e) => handleInputChange('cvv', e.target.value)}
          disabled={disabled}
          type="password"
          className={`max-w-24 ${
            formData.cvv && !validation.cvv.isValid 
              ? 'border-destructive' 
              : formData.cvv && validation.cvv.isValid 
              ? 'border-green-500' 
              : ''
          }`}
        />
        {formData.cvv && validation.cvv.error && (
          <Alert variant="destructive" className="py-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              {validation.cvv.error}
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Cardholder Name */}
      <div className="space-y-2">
        <Label htmlFor="card-name">Nume posesor</Label>
        <Input
          id="card-name"
          placeholder="ION POPESCU"
          value={formData.cardholderName}
          onChange={(e) => handleInputChange('cardholderName', e.target.value)}
          disabled={disabled}
          className={
            formData.cardholderName && !validation.cardholderName.isValid 
              ? 'border-destructive' 
              : formData.cardholderName && validation.cardholderName.isValid 
              ? 'border-green-500' 
              : ''
          }
        />
        {formData.cardholderName && validation.cardholderName.error && (
          <Alert variant="destructive" className="py-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              {validation.cardholderName.error}
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Security Notice */}
      <Alert className="bg-blue-50 border-blue-200">
        <CheckCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800 text-sm">
          Datele cardului sunt procesate în siguranță. Nu le stocăm pe serverele noastre.
        </AlertDescription>
      </Alert>
    </div>
  );
};
