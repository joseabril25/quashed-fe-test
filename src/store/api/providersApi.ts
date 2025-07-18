import { baseApi, mockDelay } from './index';
import type { Provider, FormField } from '../../types/apiTypes';
import { mockFormFields, mockProviders } from '../../mock/mock';

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
        await mockDelay(800);
        const provider = mockProviders.find(p => p.id === id);
        if (!provider) {
          return { error: { status: 404, data: 'Provider not found' } };
        }

        return { data: provider };
      },
      providesTags: ['Providers'],
    }),
    
    // Get form fields for a specific provider
    getProviderFormFields: builder.query<FormField[], string>({
      queryFn: async (providerId) => {
        await mockDelay(800);
        const fields = mockFormFields[providerId];
        if (!fields) {
          return { error: { status: 404, data: 'Form fields not found for this provider' } };
        }

        return { data: fields };
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
  useGetProviderFormFieldsQuery,
} = providersApi;