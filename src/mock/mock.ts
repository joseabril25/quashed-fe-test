import type { FormField, Provider, User } from "../types/apiTypes";

// Mock data
export const mockUser: User = {
  id: '1',
  fullName: 'John Doe',
  emailAddress: 'john@quashed.co.nz',
  profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
};

export const mockProviders: Provider[] = [
  {
    id: '1',
    name: 'Cloudid',
    logo: '/src/assets/images/cloudid.png',
    slogan: 'Best cloud storage solution',
    pricePerMonth: 106.88,
    pricePerYear: 1189.99,
    dataLimit: 'Unlimited',
    roaming: false,
    roamingPrice: 0,
    firewall: true,
    firewallPrice: 0,
    vpn: true,
    support: true,
    supportPrice: 10,
    router: true,
    routerPrice: 12,
    createdAt: new Date(Date.now() - 13 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Pronete',
    logo: '/src/assets/images/pronete.png',
    slogan: 'Unlimited data for your convenience',
    pricePerMonth: 89.99,
    pricePerYear: 999.99,
    dataLimit: 'Unlimited',
    roaming: true,
    roamingPrice: 100,
    firewall: true,
    firewallPrice: 0,
    vpn: false,
    support: true,
    supportPrice: 0,
    router: false,
    routerPrice: 0,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Tebiobio',
    logo: '/src/assets/images/tebiobio.png',
    slogan: 'Enterprise-grade connectivity',
    pricePerMonth: 129.99,
    pricePerYear: 1439.99,
    dataLimit: '500GB',
    roaming: true,
    roamingPrice: 0,
    firewall: true,
    firewallPrice: 15,
    vpn: true,
    support: false,
    supportPrice: 0,
    router: true,
    routerPrice: 12,
    createdAt: new Date(Date.now() - 30000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock form fields for each provider
export const mockFormFields: Record<string, FormField[]> = {
  '1': [ // CloudId
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      placeholder: 'Enter your first name',
      required: true,
      validation: {
        minLength: 2,
        maxLength: 50,
        message: 'First name must be between 2 and 50 characters'
      }
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      placeholder: 'Enter your last name',
      required: true,
      validation: {
        minLength: 2,
        maxLength: 50,
        message: 'Last name must be between 2 and 50 characters'
      }
    },
    {
      name: 'address',
      type: 'text',
      label: 'Address',
      placeholder: 'Enter your full address',
      required: true,
      fullWidth: true,
      validation: {
        minLength: 10,
        maxLength: 200,
        message: 'Please provide a valid address'
      }
    },
    {
      name: 'dataPerMonth',
      type: 'radio',
      label: 'Data per Month',
      required: true,
      options: [
        { label: '10GB', value: '10GB' },
        { label: '20GB', value: '20GB' },
        { label: '30GB', value: '30GB' }
      ]
    },
    {
      name: 'contractStartDate',
      type: 'date',
      label: 'Contract Start Date',
      required: true
    },
    {
      name: 'additionalServices',
      type: 'checkbox',
      label: 'Additional Services',
      required: false,
      options: [
        { label: 'VPN', value: 'vpn' },
        { label: 'Dedicated IP', value: 'dedicated_ip' },
        { label: '24/7 Support', value: 'support_24_7' }
      ]
    },
    {
      name: 'currentProvider',
      type: 'select',
      label: 'What is your current internet provider?',
      required: true,
      options: [
        { label: 'Vodafone', value: 'vodafone' },
        { label: 'Spark', value: 'spark' },
        { label: 'Sky', value: 'sky' },
        { label: 'My Republic', value: 'my_republic' }
      ]
    }
  ],
  '2': [ // Pronete
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      placeholder: 'Enter your first name',
      required: true,
      validation: {
        minLength: 2,
        maxLength: 50,
        message: 'First name must be between 2 and 50 characters'
      }
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      placeholder: 'Enter your last name',
      required: true,
      validation: {
        minLength: 2,
        maxLength: 50,
        message: 'Last name must be between 2 and 50 characters'
      }
    },
    {
      name: 'address',
      type: 'text',
      label: 'Address',
      placeholder: 'Enter your full address',
      required: true,
      fullWidth: true,
      validation: {
        minLength: 10,
        maxLength: 200,
        message: 'Please provide a valid address'
      }
    },
    {
      name: 'dataPerMonth',
      type: 'radio',
      label: 'Data per Month',
      required: true,
      options: [
        { label: '10GB', value: '10GB' },
        { label: '20GB', value: '20GB' },
        { label: '30GB', value: '30GB' }
      ]
    },
    {
      name: 'contractStartDate',
      type: 'date',
      label: 'Contract Start Date',
      required: true
    },
    {
      name: 'needsRouter',
      type: 'radio',
      label: 'Do you need a router?',
      required: true,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    }
  ],
  '3': [ // Tebiobio
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      placeholder: 'Enter your first name',
      required: true,
      validation: {
        minLength: 2,
        maxLength: 50,
        message: 'First name must be between 2 and 50 characters'
      }
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      placeholder: 'Enter your last name',
      required: true,
      validation: {
        minLength: 2,
        maxLength: 50,
        message: 'Last name must be between 2 and 50 characters'
      }
    },
    {
      name: 'address',
      type: 'text',
      label: 'Address',
      placeholder: 'Enter your full address',
      required: true,
      fullWidth: true,
      validation: {
        minLength: 10,
        maxLength: 200,
        message: 'Please provide a valid address'
      }
    },
    {
      name: 'dataPerMonth',
      type: 'radio',
      label: 'Data per Month',
      required: true,
      options: [
        { label: '10GB', value: '10GB' },
        { label: '20GB', value: '20GB' },
        { label: '30GB', value: '30GB' }
      ]
    },
    {
      name: 'contractStartDate',
      type: 'date',
      label: 'Contract Start Date',
      required: true
    },
    {
      name: 'additionalServices',
      type: 'checkbox',
      label: 'Additional Services',
      required: false,
      options: [
        { label: 'VPN', value: 'vpn' },
        { label: 'Dedicated IP', value: 'dedicated_ip' },
        { label: '24/7 Support', value: 'support_24_7' }
      ]
    },
    {
      name: 'currentProvider',
      type: 'select',
      label: 'What is your current internet provider?',
      required: true,
      options: [
        { label: 'Vodafone', value: 'vodafone' },
        { label: 'Spark', value: 'spark' },
        { label: 'Sky', value: 'sky' },
        { label: 'My Republic', value: 'my_republic' }
      ]
    }
  ]
};