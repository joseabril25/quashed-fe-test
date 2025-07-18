import { ProviderTable } from './components/ProviderTable';
import { ProviderModal } from './components/ProviderModal';
import { FeedbackModal } from './components/FeedbackModal';
import { useGetProvidersQuery } from './store/api/providersApi';
import { useAppDispatch } from './store/hooks';
import { selectProviderAndLoadData } from './store/slices/providersSlice';
import type { Provider } from './types/apiTypes';

export const App = () => {
  const { data: providers, isLoading, error } = useGetProvidersQuery();

  const dispatch = useAppDispatch();

  const onClickProvider = (provider: Provider) => {
    if (provider.id) {
      dispatch(selectProviderAndLoadData(provider));
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