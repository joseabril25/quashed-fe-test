import { Navbar } from './components/Navbar';
import { ProviderTable } from './components/ProviderTable';
import { useGetProvidersQuery } from './store/api/providersApi';

const App = () => {
  const { data: providers, isLoading, error } = useGetProvidersQuery();

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
    <div className="min-h-screen">
      <div className="p-6">
        <div className="max-w-full mx-auto">
          <ProviderTable providers={providers || []} />
        </div>
      </div>
    </div>
  );
};

export default App;