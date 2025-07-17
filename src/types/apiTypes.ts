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