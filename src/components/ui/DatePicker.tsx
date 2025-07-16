import { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import { getFormStateStyles, getFormState } from '../../utils/formStyles';

interface DatePickerProps {
  label: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  dateFormat?: string;
}

export const DatePicker = ({ 
  label, 
  value, 
  onChange, 
  placeholder = "Select a date",
  error, 
  errorMessage,
  disabled,
  dateFormat = "MM/dd/yyyy"
}: DatePickerProps) => {
  const stateStyles = getFormStateStyles();
  const currentState = getFormState(disabled, error);
  
  // Custom input component that matches our form style
  const CustomInput = forwardRef<HTMLInputElement, any>(({ value, onClick, placeholder }, ref) => (
    <div className="relative">
      <input
        ref={ref}
        value={value}
        onClick={onClick}
        placeholder={placeholder}
        readOnly
        className={stateStyles[currentState]}
      />
      {/* Calendar icon placeholder */}
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg 
          className="w-4 h-4 text-[rgb(var(--color-border))]" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
      </div>
    </div>
  ));
  
  CustomInput.displayName = 'CustomInput';
  
  return (
    <div className="inline-block">
      <label>{label}</label>
      <ReactDatePicker
        selected={value}
        onChange={onChange}
        dateFormat={dateFormat}
        placeholderText={placeholder}
        disabled={disabled}
        customInput={<CustomInput />}
        popperClassName="z-50"
        calendarClassName="shadow-lg border border-gray-200 rounded-md"
      />
      {error && errorMessage && (
        <div className="mt-1 text-sm text-red-600">{errorMessage}</div>
      )}
    </div>
  );
};