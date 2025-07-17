import { Button } from './Button';
import { PriceBox } from '../PriceBox';
import { Chip } from './Chip';

interface CardProps {
  name: string;
  logo: string;
  price: number;
  subtext: string
  perMonth?: 'month' | 'year';
  shortenedMonth?: boolean;
  timestamp?: number;
  onGetStarted?: () => void;
  className?: string;
  bestDeal?: boolean; // Optional prop to indicate if this is the best deal
}

export const Card = ({ 
  name, 
  logo, 
  price, 
  subtext,
  perMonth = 'month', 
  shortenedMonth = true,
  timestamp,
  onGetStarted,
  className = '',
  bestDeal = false // Default to false if not provided
}: CardProps) => {
  return (
    <div className={`w-[400px] min-h-[194px] bg-white p-6  ${className}`}>
      {/* Top row: Chip and Subtext */}
      <div className="flex justify-between items-start">
        <div>
          {bestDeal && (
            <Chip 
              label="Cheapeast" 
              size="sm"
              variant='selected'
            />
          )}
        </div>
        <p className="text-sm font-normal text-[rgb(var(--color-neutral))] text-left max-w-[160px]">{subtext}</p>
      </div>

      {/* Middle row: Image */}
      <div className="mb-6">
        <img 
          src={logo} 
          alt={`${name} logo`} 
          className="w-[162px] h-auto object-contain"
        />
      </div>

      {/* Bottom row: PriceBox and Button */}
      <div className="flex justify-between items-end">
        <PriceBox 
          price={price} 
          perMonth={perMonth} 
          shortenedMonth={shortenedMonth}
          timestamp={timestamp}
        />
        
        <Button 
          showArrow 
          onClick={onGetStarted}
          size="md"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};