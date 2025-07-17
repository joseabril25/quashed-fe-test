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
  roamingLimit: string
  firewall: boolean
  firewallLimit: string
  vpn: boolean
  support: boolean
  supportLimit: string
  router: boolean
  routerPrice: number
  createdAt?: string
  updatedAt?: string
}