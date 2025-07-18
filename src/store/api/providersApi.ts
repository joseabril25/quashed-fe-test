import { baseApi } from './index';
import type { Provider, FormField, ProviderPurchaseRequest, ProviderPurchaseResponse, ConnectProviderResponse, ConnectProviderRequest } from '../../types/apiTypes';
import { setCurrentStep } from '../slices/providersSlice';

// Inject endpoints into base API
export const providersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all providers
    getProviders: builder.query<Provider[], void>({
      query: () => '/providers',
      providesTags: ['Providers'],
    }),
    getProvider: builder.query<Provider, string>({
      query: (providerId) => `/providers/${providerId}`,
      providesTags: (_result, _error, providerId) => [{ type: 'Providers', id: providerId }],
    }),
    
    // Connect to provider (OAuth/API connection)
    postConnectProvider: builder.mutation<ConnectProviderResponse, ConnectProviderRequest>({
      query: ({ providerId }) => ({
        url: `/providers/${providerId}/connect`,
        method: 'POST',
      }),
      invalidatesTags: ['Providers'],
    }),
    // Get form fields for a specific provider
    getProviderFormFields: builder.query<FormField[], string>({
      query: (providerId) => `/providers/${providerId}/form-fields`,
      providesTags: ['Providers'],
    }),
    postSubmitProvider: builder.mutation<ProviderPurchaseResponse, ProviderPurchaseRequest>({
      query: ({ providerId, details, payment }) => ({
        url: `/providers/${providerId}/purchase`,
        method: 'POST',
        body: { details, payment },
      }),
      async onQueryStarted(_, { dispatch }) {
        // Dispatch the step change after successful submission
        dispatch(setCurrentStep('confirmation'));
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
} = providersApi;