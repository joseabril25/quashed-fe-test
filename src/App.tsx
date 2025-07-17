import { Navbar } from './components/Navbar';
import { PriceBox } from './components/PriceBox';
import { Card } from './components/ui/Card';
import { useGetProvidersQuery } from './store/api/providersApi';

function App() {
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
          {/* Horizontal scrollable table container */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              {/* Table Headers */}
              <thead>
                <tr>
                  <th className="min-w-[400px]">
                    Provider
                  </th>
                  <th>Yearly Payment</th>
                  <th>Data</th>
                  <th>Roaming</th>
                  <th>Firewall</th>
                  <th>VPN</th>
                  <th>24h Support</th>
                  <th>Router</th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody>
                {providers?.map((provider, index) => {
                  return (
                    <tr key={provider.id}>
                      {/* Provider Card Column */}
                      <td className='bg-white w-[400px] min-h-[194px]'>
                        <Card 
                          name={provider.name}
                          logo={provider.logo}
                          price={provider.pricePerMonth}
                          subtext={provider.slogan}
                          perMonth="month"
                          shortenedMonth
                          timestamp={provider.createdAt ? new Date(provider.createdAt).getTime() : undefined}
                          onGetStarted={() => console.log(`Get Started clicked for ${provider.name}`)}
                          bestDeal={index === 1} // Make second provider the best deal
                        />
                      </td>
                      
                      {/* Yearly Payment Column */}
                      <td>
                        <PriceBox 
                          price={provider.pricePerYear}
                          perMonth="year"
                          shortenedMonth={false}
                        />
                      </td>
                      
                      {/* Data Column */}
                      <td>
                        {provider.dataLimit}
                      </td> 
                      
                      {/* Roaming Column */}
                      <td>
                        {provider.roaming ? provider.roamingLimit : 'No'}
                      </td>
                      
                      {/* Firewall Column */}
                      <td>
                        {provider.firewall ? provider.firewallLimit : 'No'}
                      </td>
                      
                      {/* VPN Column */}
                      <td>
                        {provider.vpn ? 'Yes' : 'No'}
                      </td>
                      
                      {/* 24h Support Column */}
                      <td>
                        {provider.support ? provider.supportLimit : 'No'}
                      </td>
                      
                      {/* Router Column */}
                      <td>
                        {provider.router ? `$${provider.routerPrice.toFixed(2)}` : 'No'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;