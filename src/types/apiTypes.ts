export interface User {
  id?: string
  fullName?: string
  emailAddress?: string
  profileImage?: string
}

export interface Provider {
  id?: string
  name: string
  logo: string
  slogan: string
  pricePerMonth: number
  pricePerYear: number
  dataLimit: string
  roaming: boolean
  roamingPrice: number
  firewall: boolean
  firewallPrice: number
  vpn: boolean
  support: boolean
  supportPrice: number
  router: boolean
  routerPrice: number
  createdAt?: string
  updatedAt?: string
}

export interface FormFieldOption {
  label: string
  value: string
}

export interface FormField {
  name: string
  type: 'text' | 'email' | 'select' | 'radio' | 'checkbox' | 'date' | 'textarea'
  label: string
  placeholder?: string
  required: boolean
  options?: FormFieldOption[]
  validation?: {
    minLength?: number
    maxLength?: number
    pattern?: string
    message?: string
  }
  defaultValue?: any
  dependsOn?: {
    field: string
    value: any
  }
  fullWidth?: boolean // Indicates if field should take full row width
}

// Provider purchase form types
export interface ProviderDetailsForm {
  firstName: string
  lastName: string
  address: string
  dataPerMonth: string
  contractStartDate: number
  additionalServices?: string[]
  currentProvider?: string
  needsRouter?: string
}

export interface PaymentForm {
  cardNumber: string
  expiryDate: string
  nameOnCard: string
  cvv: string
}

export interface ProviderPurchaseRequest {
  providerId: string
  details: ProviderDetailsForm
  payment: PaymentForm
}

export interface ProviderPurchaseResponse {
  message: string
  orderId?: string
}


// New interfaces for realistic flow
export interface ConnectProviderRequest {
  providerId: string;
  redirectUri?: string;
}

export interface ConnectProviderResponse {
  success: boolean;
  authUrl?: string;
  provider: Provider;
  message: string;
}

export interface UserAccountData {
  user: User;
  eligiblePlans: Array<{
    id: string;
    name: string;
    price: number;
    recommended?: boolean;
  }>;
  currentProvider?: string;
  existingAddress?: string;
  hasActiveService: boolean;
}