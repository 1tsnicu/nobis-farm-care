// Payment service pentru procesarea plăților
export interface CardData {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardholderName: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
  message: string;
}

export interface OnlinePaymentData {
  provider: string;
  amount: number;
  currency: string;
  phoneNumber?: string;
}

export class PaymentService {
  // Validare număr card (algoritm Luhn)
  static validateCard(cardNumber: string): { isValid: boolean; cardType: string } {
    // Eliminăm spațiile și caracterele non-numerice
    const cleanNumber = cardNumber.replace(/\D/g, '');
    
    if (cleanNumber.length < 13 || cleanNumber.length > 19) {
      return { isValid: false, cardType: 'unknown' };
    }

    // Algoritm Luhn pentru validare
    let sum = 0;
    let alternate = false;
    
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let n = parseInt(cleanNumber.charAt(i), 10);
      
      if (alternate) {
        n *= 2;
        if (n > 9) {
          n = (n % 10) + 1;
        }
      }
      
      sum += n;
      alternate = !alternate;
    }
    
    const isValid = (sum % 10) === 0;
    
    // Detectăm tipul cardului
    const cardType = this.detectCardType(cleanNumber);
    
    return { isValid, cardType };
  }

  // Detectare tip card
  private static detectCardType(cardNumber: string): string {
    const patterns = {
      visa: /^4/,
      mastercard: /^5[1-5]|^2[2-7]/,
      amex: /^3[47]/,
      discover: /^6(?:011|5)/,
      diners: /^3[0689]/,
      jcb: /^35/
    };

    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(cardNumber)) {
        return type;
      }
    }
    
    return 'unknown';
  }

  // Validare dată expirare
  static validateExpiry(month: string, year: string): boolean {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    const expMonth = parseInt(month, 10);
    const expYear = parseInt(year, 10);
    
    // Verificăm dacă luna este validă
    if (expMonth < 1 || expMonth > 12) {
      return false;
    }
    
    // Verificăm dacă data nu a expirat
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      return false;
    }
    
    return true;
  }

  // Validare CVV
  static validateCVV(cvv: string, cardType: string): boolean {
    const cleanCvv = cvv.replace(/\D/g, '');
    
    // American Express are CVV de 4 cifre, restul 3
    if (cardType === 'amex') {
      return cleanCvv.length === 4;
    }
    
    return cleanCvv.length === 3;
  }

  // Procesare plată cu card
  static async processCardPayment(cardData: CardData, amount: number): Promise<PaymentResult> {
    try {
      // Validăm datele cardului
      const cardValidation = this.validateCard(cardData.cardNumber);
      if (!cardValidation.isValid) {
        return {
          success: false,
          error: 'INVALID_CARD',
          message: 'Numărul cardului nu este valid'
        };
      }

      // Validăm data expirării
      if (!this.validateExpiry(cardData.expiryMonth, cardData.expiryYear)) {
        return {
          success: false,
          error: 'EXPIRED_CARD',
          message: 'Cardul a expirat sau data nu este validă'
        };
      }

      // Validăm CVV
      if (!this.validateCVV(cardData.cvv, cardValidation.cardType)) {
        return {
          success: false,
          error: 'INVALID_CVV',
          message: 'Codul CVV nu este valid'
        };
      }

      // Simulăm procesarea plății (în realitate aici ar fi un API call)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulăm diferite scenarii (95% succes)
      const random = Math.random();
      if (random < 0.05) {
        // 5% șanse de eșec pentru testare
        const errors = [
          { error: 'INSUFFICIENT_FUNDS', message: 'Fonduri insuficiente pe card' },
          { error: 'DECLINED', message: 'Plata a fost refuzată de bancă' },
          { error: 'NETWORK_ERROR', message: 'Eroare de rețea. Încearcă din nou.' }
        ];
        
        const randomError = errors[Math.floor(Math.random() * errors.length)];
        return {
          success: false,
          ...randomError
        };
      }

      // Generăm un ID de tranzacție
      const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      return {
        success: true,
        transactionId,
        message: `Plata de ${amount} MDL a fost procesată cu succes`
      };

    } catch (error) {
      return {
        success: false,
        error: 'PROCESSING_ERROR',
        message: 'Eroare în procesarea plății. Încearcă din nou.'
      };
    }
  }

  // Procesare plată online (prin diverse gateway-uri)
  static async processOnlinePayment(paymentData: OnlinePaymentData): Promise<PaymentResult> {
    try {
      // Simulăm redirect către gateway de plată
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulăm procesarea (98% succes pentru plăți online)
      const random = Math.random();
      if (random < 0.02) {
        return {
          success: false,
          error: 'PAYMENT_CANCELLED',
          message: 'Plata a fost anulată de utilizator'
        };
      }

      const transactionId = `ONL_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      return {
        success: true,
        transactionId,
        message: `Plata online de ${paymentData.amount} ${paymentData.currency} a fost procesată cu succes`
      };

    } catch (error) {
      return {
        success: false,
        error: 'ONLINE_PAYMENT_ERROR',
        message: 'Eroare în procesarea plății online'
      };
    }
  }

  // Procesare transfer bancar
  static async processBankTransfer(amount: number, bankDetails: any): Promise<PaymentResult> {
    try {
      // Simulăm procesarea transferului
      await new Promise(resolve => setTimeout(resolve, 1000));

      const transactionId = `BANK_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      return {
        success: true,
        transactionId,
        message: `Transfer bancar de ${amount} MDL a fost inițiat cu succes. Vei primi confirmarea în 1-2 zile lucrătoare.`
      };

    } catch (error) {
      return {
        success: false,
        error: 'BANK_TRANSFER_ERROR',
        message: 'Eroare în procesarea transferului bancar'
      };
    }
  }

  // Formatare număr card pentru afișare (mascare)
  static formatCardNumber(cardNumber: string): string {
    const clean = cardNumber.replace(/\D/g, '');
    if (clean.length < 4) return clean;
    
    const masked = '*'.repeat(clean.length - 4) + clean.slice(-4);
    return masked.replace(/(.{4})/g, '$1 ').trim();
  }

  // Generare număr de referință pentru plata la livrare
  static generateCashPaymentReference(): string {
    return `CASH_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  }
}

// Export pentru utilizare în componente
export default PaymentService;
