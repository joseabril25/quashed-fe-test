import { baseApi, mockDelay } from './index';
import type { Provider } from '../../types/apiTypes';

// Mock data
const mockProviders: Provider[] = [
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
    name: 'TechCorp',
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

// Inject endpoints into base API
export const providersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all providers
    getProviders: builder.query<Provider[], void>({
      queryFn: async () => {
        await mockDelay(800);
        return { data: mockProviders };
      },
      providesTags: ['Providers'],
    }),
    
    // Get provider by ID
    getProvider: builder.query<Provider, string>({
      queryFn: async (id) => {
        await mockDelay(500);
        const provider = mockProviders.find(p => p.id === id);
        if (!provider) {
          return { error: { status: 404, data: 'Provider not found' } };
        }
        return { data: provider };
      },
      providesTags: ['Providers'],
    }),
  }),
  overrideExisting: false,
});

// Export hooks
export const {
  useGetProvidersQuery,
  useGetProviderQuery,
} = providersApi;