import { Icons } from './Icons';

import { Card } from './ui/Card';
import type { Provider } from '../types/apiTypes';
import { PriceBox } from './ui/PriceBox';

interface TableColumn {
  key: string;
  label: string;
  render: (provider: Provider, index: number) => React.ReactNode;
  width?: number;
}

interface ProviderTableProps {
  providers: Provider[];
  onClickProvider: (provider: Provider) => void;
}

export const ProviderTable = ({ providers, onClickProvider }: ProviderTableProps) => {
  const getIcon = (isTrue: boolean) => {
    return (
      <Icons name={isTrue ? 'check' : 'close'} width={32} height={32} color='rgb(var(--color-mono))' />
    );
  };

  const renderFeatureCell = (hasFeature: boolean, price: number, label?: string) => {
    if (price !== 0) {
      return (
        <PriceBox 
          price={price}
          perMonth="month"
          shortenedMonth={false}
          label={label}
        />
      );
    }
    return getIcon(hasFeature);
  };

  const tableColumns: TableColumn[] = [
    {
      key: 'provider',
      label: 'Provider',
      width: 400,
      render: (provider, index) => (
        <Card 
          name={provider.name}
          logo={provider.logo}
          price={provider.pricePerMonth}
          subtext={provider.slogan}
          perMonth="month"
          shortenedMonth
          timestamp={provider.createdAt ? new Date(provider.createdAt).getTime() : undefined}
          onClick={() => onClickProvider(provider)}
          bestDeal={index === 1} // Make second provider the best deal
        />
      )
    },
    {
      key: 'yearlyPayment',
      label: 'Yearly Payment',
      render: (provider) => (
        <PriceBox 
          price={provider.pricePerYear}
          perMonth="year"
        />
      )
    },
    {
      key: 'data',
      label: 'Data',
      render: (provider) => provider.dataLimit
    },
    {
      key: 'roaming',
      label: 'Roaming',
      render: (provider) => renderFeatureCell(provider.roaming, provider.roamingPrice, 'Gb')
    },
    {
      key: 'firewall',
      label: 'Firewall',
      render: (provider) => renderFeatureCell(provider.firewall, provider.firewallPrice)
    },
    {
      key: 'vpn',
      label: 'VPN',
      render: (provider) => getIcon(provider.vpn)
    },
    {
      key: 'support',
      label: '24h Support',
      render: (provider) => renderFeatureCell(provider.support, provider.supportPrice)
    },
    {
      key: 'router',
      label: 'Router',
      render: (provider) => renderFeatureCell(provider.router, provider.routerPrice)
    }
  ];

  return (
    <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
      <table className="w-full border-collapse">
        {/* Table Headers */}
        <thead>
          <tr>
            {tableColumns.map((column) => (
              <th 
                key={column.key}
                className={column.width ? `min-w-[${column.width}px]` : ''}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        
        {/* Table Body */}
        <tbody>
          {providers?.map((provider, index) => (
            <tr key={provider.id}>
              {tableColumns.map((column, _index) => (
                <td key={`${provider.id}-${column.key}`} className={`${_index === 0 ? 'min-w-[400px] min-h-[194px]' : ''}`}>
                  {column.render(provider, index)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};