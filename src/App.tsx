import { Icons } from './components/Icons';
import { Navbar } from './components/Navbar';
import { PriceBox } from './components/PriceBox';
import { Card } from './components/ui/Card';
import { useGetProvidersQuery } from './store/api/providersApi';

const App = () => {
  const { data: providers, isLoading, error } = useGetProvidersQuery();

  const getIcon = (isTrue: boolean) => {
    return (
      <Icons name={isTrue ? 'check' : 'close'} width={32} height={32} color='rgb(var(--color-mono))' />
    );
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
                          onClick={() => console.log(`Selected provider: ${provider.name}`)}
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
                        {
                          provider.roamingPrice !== 0 ? (
                            <PriceBox 
                              price={provider.roamingPrice}
                              perMonth="month"
                              shortenedMonth={false}
                              label='Gb'
                            />
                          ) : (
                            getIcon(provider.roaming)
                          )
                        }
                        {/* {provider.roaming ? provider.roamingLimit : 'No'} */}
                      </td>
                      
                      {/* Firewall Column */}
                      <td>
                        {
                          provider.firewallPrice !== 0 ? (
                            <PriceBox 
                              price={provider.firewallPrice}
                              perMonth="month"
                              shortenedMonth={false}
                            />
                          ) : (
                            getIcon(provider.firewall)
                          )
                        }
                      </td>
                      
                      {/* VPN Column */}
                      <td>
                        {getIcon(provider.vpn)}
                      </td>
                      
                      {/* 24h Support Column */}
                      <td>
                        {
                          provider.supportPrice !== 0 ? (
                            <PriceBox 
                              price={provider.supportPrice}
                              perMonth="month"
                              shortenedMonth={false}
                            />
                          ) : (
                            getIcon(provider.support)
                          )
                        }
                      </td>
                      
                      {/* Router Column */}
                      <td>
                        {
                          provider.routerPrice !== 0 ? (
                            <PriceBox 
                              price={provider.routerPrice}
                              perMonth="month"
                              shortenedMonth={false}
                            />
                          ) : (
                            getIcon(provider.router)
                          )
                        }
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