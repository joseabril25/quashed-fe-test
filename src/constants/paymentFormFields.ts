import type { FormField } from '../types/apiTypes';

export const paymentFormFields: FormField[] = [
  {
    name: 'cardNumber',
    type: 'text',
    label: 'Card Number',
    placeholder: '1234 5678 9012 3456',
    required: true,
    validation: {
      pattern: '^[0-9]{16}$',
      message: 'Please enter a valid 16-digit card number'
    }
  },
  {
    name: 'expiryDate',
    type: 'date',
    label: 'Expiry Date',
    placeholder: 'MM/YY',
    required: true,
    validation: {
      pattern: '^(0[1-9]|1[0-2])\/[0-9]{2}$',
      message: 'Please enter a valid expiry date (MM/YY)'
    }
  },
  {
    name: 'nameOnCard',
    type: 'text',
    label: 'Name on Card',
    placeholder: 'John Doe',
    required: true,
    validation: {
      minLength: 3,
      maxLength: 50,
      message: 'Please enter the name as it appears on your card'
    }
  },
  {
    name: 'cvv',
    type: 'text',
    label: 'CVV',
    placeholder: '123',
    required: true,
    validation: {
      pattern: '^[0-9]{3,4}$',
      message: 'Please enter a valid CVV (3 or 4 digits)'
    }
  }
];