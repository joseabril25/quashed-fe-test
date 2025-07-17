import Modal from './components/Modal';
import { Navbar } from './components/Navbar';
import { ProviderTable } from './components/ProviderTable';
import { useGetProvidersQuery } from './store/api/providersApi';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { toggleModalStatus } from './store/slices/appSlice';
import type { Provider } from './types/apiTypes';

const App = () => {
  const { data: providers, isLoading, error } = useGetProvidersQuery();
  const { isModalOpen } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch()

  const onClickProvider = (provider: Provider) => {
    console.log(`Selected provider: ${provider.name}`);
    dispatch(toggleModalStatus({ isOpen: true }));
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
        <Navbar />
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
      <Modal
        isOpen={isModalOpen}
        onClose={() => dispatch(toggleModalStatus({ isOpen: false }))}
      >
        <p>Your modal content goes here</p>
      </Modal>
    </>
  );
};

export default App;