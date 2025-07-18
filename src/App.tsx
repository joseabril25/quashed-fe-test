import { ProviderTable } from './components/ProviderTable';
import { ProviderModal } from './components/ProviderModal';
import { FeedbackModal } from './components/FeedbackModal';
import { useGetProvidersQuery, usePostConnectProviderMutation, useLazyGetProviderFormFieldsQuery } from './store/api/providersApi';
import { useAppDispatch } from './store/hooks';
import { openModalWithProvider, setCurrentStep, setSelectedProvider, setFormFields } from './store/slices/providersSlice';
import type { Provider } from './types/apiTypes';

export const App = () => {
  const { data: providers, isLoading, error } = useGetProvidersQuery();
  const [connectProvider] = usePostConnectProviderMutation();
  const [getFormFields] = useLazyGetProviderFormFieldsQuery();

  const dispatch = useAppDispatch();

  const onClickProvider = async (provider: Provider) => {
    if (!provider.id) return;
    
    try {
      // Step 1: Open modal and set to connecting
      dispatch(openModalWithProvider(provider));
      
      // Step 2: CONNECTING - Establish OAuth/API connection with provider
      console.log('🔌 CONNECTING: Establishing OAuth/API connection...');
      const connectionResult = await connectProvider({ providerId: provider.id }).unwrap();
      
      dispatch(setCurrentStep('retrieving'));
      dispatch(setSelectedProvider(connectionResult.provider));
      
      // Step 3: RETRIEVING - Get form fields and user data
      console.log('📡 RETRIEVING: Fetching form configuration...');
      // TODO: In real scenario, this would also pull user eligibility, existing account data, etc.
      const formFieldsResult = await getFormFields(provider.id).unwrap();
      
      // Step 4: Ready for form submission
      dispatch(setCurrentStep('details'));
      dispatch(setFormFields(formFieldsResult));
      
    } catch (error) {
      console.error('Failed to connect to provider:', error);
      // Handle error appropriately
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-96">
          <p className="text-lg text-gray-600">Loading providers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-96">
          <p className="text-lg text-red-600">Error loading providers</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen">
        <div className="p-6">
          <div className="max-w-full mx-auto">
            <ProviderTable providers={providers || []} onClickProvider={onClickProvider} />
          </div>
        </div>
      </div>
      <ProviderModal />
      <FeedbackModal />
    </>
  );
};