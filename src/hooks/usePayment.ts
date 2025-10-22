import { useState } from 'react';
import PaymentService, { CardData, PaymentResult, OnlinePaymentData } from '@/services/PaymentService';

export type PaymentMethod = 'cash' | 'card' | 'online' | 'transfer';

export interface PaymentState {
  isProcessing: boolean;
  result: PaymentResult | null;
  method: PaymentMethod | null;
}

export const usePayment = () => {
  const [paymentState, setPaymentState] = useState<PaymentState>({
    isProcessing: false,
    result: null,
    method: null
  });

  const processCardPayment = async (cardData: CardData, amount: number) => {
    setPaymentState({
      isProcessing: true,
      result: null,
      method: 'card'
    });

    try {
      const result = await PaymentService.processCardPayment(cardData, amount);
      
      setPaymentState({
        isProcessing: false,
        result,
        method: 'card'
      });

      return result;
    } catch (error) {
      const errorResult: PaymentResult = {
        success: false,
        error: 'PROCESSING_ERROR',
        message: 'Eroare în procesarea plății cu cardul'
      };

      setPaymentState({
        isProcessing: false,
        result: errorResult,
        method: 'card'
      });

      return errorResult;
    }
  };

  const processOnlinePayment = async (paymentData: OnlinePaymentData, amount?: number) => {
    setPaymentState({
      isProcessing: true,
      result: null,
      method: 'online'
    });

    try {
      const result = await PaymentService.processOnlinePayment(paymentData);
      
      setPaymentState({
        isProcessing: false,
        result,
        method: 'online'
      });

      return result;
    } catch (error) {
      const errorResult: PaymentResult = {
        success: false,
        error: 'PROCESSING_ERROR',
        message: 'Eroare în procesarea plății online'
      };

      setPaymentState({
        isProcessing: false,
        result: errorResult,
        method: 'online'
      });

      return errorResult;
    }
  };

  const processBankTransfer = async (transferData: any, amount?: number) => {
    setPaymentState({
      isProcessing: true,
      result: null,
      method: 'transfer'
    });

    try {
      const result = await PaymentService.processBankTransfer(transferData.amount, transferData.bankDetails);
      
      setPaymentState({
        isProcessing: false,
        result,
        method: 'transfer'
      });

      return result;
    } catch (error) {
      const errorResult: PaymentResult = {
        success: false,
        error: 'PROCESSING_ERROR',
        message: 'Eroare în procesarea transferului bancar'
      };

      setPaymentState({
        isProcessing: false,
        result: errorResult,
        method: 'transfer'
      });

      return errorResult;
    }
  };

  const processCashPayment = () => {
    const reference = PaymentService.generateCashPaymentReference();
    
    const result: PaymentResult = {
      success: true,
      transactionId: reference,
      message: 'Comanda va fi plătită la livrare'
    };

    setPaymentState({
      isProcessing: false,
      result,
      method: 'cash'
    });

    return result;
  };

  const resetPayment = () => {
    setPaymentState({
      isProcessing: false,
      result: null,
      method: null
    });
  };

  const validateCard = (cardNumber: string) => {
    return PaymentService.validateCard(cardNumber);
  };

  const validateExpiry = (month: string, year: string) => {
    return PaymentService.validateExpiry(month, year);
  };

  const validateCVV = (cvv: string, cardType: string) => {
    return PaymentService.validateCVV(cvv, cardType);
  };

  const formatCardNumber = (cardNumber: string) => {
    return PaymentService.formatCardNumber(cardNumber);
  };

  return {
    // State
    paymentState,
    isProcessing: paymentState.isProcessing,
    result: paymentState.result,
    method: paymentState.method,

    // Actions
    processCardPayment,
    processOnlinePayment,
    processBankTransfer,
    processCashPayment,
    resetPayment,

    // Validation helpers
    validateCard,
    validateExpiry,
    validateCVV,
    formatCardNumber
  };
};
