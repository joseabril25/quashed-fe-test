import { baseApi, mockDelay } from './index';
import type { Provider, FormField, ProviderPurchaseRequest, ProviderPurchaseResponse, ConnectProviderResponse, ConnectProviderRequest, UserAccountData } from '../../types/apiTypes';
import { mockFormFields, mockProviders, mockUser } from '../../mock/mock';
import { setCurrentStep } from '../slices/providersSlice';



// Inject endpoints into base API
export const providersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all providers
    getProviders: builder.query<Provider[], void>({
      queryFn: async () => {
        try {
          await mockDelay(800);
          return { data: mockProviders };
        } catch (error: any) {
          return { 
            error: { 
              status: error?.response?.status || error?.status || 500, 
              data: error?.response?.data || error?.message || 'Failed to fetch providers' 
            } 
          };
        }
      },
      providesTags: ['Providers'],
    }),
    getProvider: builder.query<Provider, string>({
      queryFn: async (providerId) => {
        try {
          await mockDelay(800);
          const provider = mockProviders.find(p => p.id === providerId);
          if (!provider) {
            return { error: { status: 404, data: 'Provider not found' } };
          }
          return { data: provider };
        } catch (error: any) {
          return { 
            error: { 
              status: error?.response?.status || error?.status || 500, 
              data: error?.response?.data || error?.message || 'Failed to fetch provider' 
            } 
          };
        }
      },
      providesTags: (_result, _error, providerId) => [{ type: 'Providers', id: providerId }],
    }),
    
    // Connect to provider (OAuth/API connection)
    postConnectProvider: builder.mutation<ConnectProviderResponse, ConnectProviderRequest>({
      queryFn: async ({ providerId }) => {
        try {
          await mockDelay(800);
          const provider = mockProviders.find(p => p.id === providerId);
          if (!provider) {
            return { error: { status: 404, data: 'Provider not found' } };
          }

          // In real world, this would:
          // 1. Initiate OAuth flow
          // 2. Get provider's API connection
          // 3. Validate user permissions
          console.log(`Connecting to provider ${provider.name}...`);
          
          return { 
            data: {
              success: true,
              provider,
              message: `Successfully connected to ${provider.name}`,
              authUrl: `https://api.${provider.name.toLowerCase()}.com/oauth/authorize?client_id=123&redirect_uri=...`
            }
          };
        } catch (error: any) {
          return { 
            error: { 
              status: error?.response?.status || error?.status || 500, 
              data: error?.response?.data || error?.message || 'Failed to connect to provider' 
            } 
          };
        }
      },
      invalidatesTags: ['Providers'],
    }),

    // Get user account data from connected provider
    getUserAccountData: builder.query<UserAccountData, string>({
      queryFn: async (providerId) => {
        try {
          await mockDelay(800);
          const provider = mockProviders.find(p => p.id === providerId);
          
          // In real world, this would:
          // 1. Fetch user's existing account data
          // 2. Check eligibility for plans
          // 3. Get current service status
          console.log(`Retrieving user account data for ${provider?.name}...`);
          
          return { 
            data: {
              user: mockUser,
              eligiblePlans: [
                { id: '10gb', name: '10GB Plan', price: 25.99, recommended: true },
                { id: '20gb', name: '20GB Plan', price: 39.99 },
                { id: '30gb', name: '30GB Plan', price: 49.99 }
              ],
              currentProvider: 'Spark',
              existingAddress: '123 Main Street, Auckland, New Zealand',
              hasActiveService: true
            }
          };
        } catch (error: any) {
          return { 
            error: { 
              status: error?.response?.status || error?.status || 500, 
              data: error?.response?.data || error?.message || 'Failed to retrieve user account data' 
            } 
          };
        }
      },
      providesTags: ['Providers'],
    }),
    // Get form fields for a specific provider
    getProviderFormFields: builder.query<FormField[], string>({
      queryFn: async (providerId) => {
        try {
          await mockDelay(800);
          const fields = mockFormFields[providerId];
          if (!fields) {
            return { error: { status: 404, data: 'Form fields not found for this provider' } };
          }

          return { data: fields };
        } catch (error: any) {
          return { 
            error: { 
              status: error?.response?.status || error?.status || 500, 
              data: error?.response?.data || error?.message || 'Failed to fetch form fields' 
            } 
          };
        }
      },
      providesTags: ['Providers'],
    }),
    postSubmitProvider: builder.mutation<ProviderPurchaseResponse, ProviderPurchaseRequest>({
      queryFn: async ({ providerId, details, payment }, { dispatch}) => {
        try {
          await mockDelay(800);
          // Simulate form submission logic
          console.log(`Submitting form for provider ${providerId} with details:`, details, 'and payment:', payment);
          
          // Here you would typically send the data to your backend
          dispatch(setCurrentStep('confirmation'));

          return { 
            data: { 
              message: 'Form submitted successfully',
              orderId: `ORDER-${Date.now()}`,
            } 
          };
        } catch (error: any) {
          return { 
            error: { 
              status: error?.response?.status || error?.status || 500, 
              data: error?.response?.data || error?.message || 'Failed to submit provider form' 
            } 
          };
        }
      },
      invalidatesTags: ['Providers'],
    }),
  }),
  overrideExisting: false,
});

// Export hooks
export const {
  useGetProvidersQuery,
  useGetProviderQuery,
  useGetProviderFormFieldsQuery,
  usePostSubmitProviderMutation,
  usePostConnectProviderMutation,
  useGetUserAccountDataQuery,
} = providersApi;