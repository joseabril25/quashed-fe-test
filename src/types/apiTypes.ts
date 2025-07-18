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
}