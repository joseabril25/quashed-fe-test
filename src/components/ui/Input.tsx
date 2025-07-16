import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
}

export const Input = ({ error, errorMessage, className = '', ref, ...props }: InputProps & { ref?: React.Ref<HTMLInputElement> }) => {    
    const stateStyles = {
      default: 'border-[rgb(var(--color-border))] bg-white placeholder-gray-500 hover:border-[rgb(var(--color-primary))] focus:border-[rgb(var(--color-primary))] focus:ring-2 focus:ring-blue-100',
      error: 'border-[rgb(var(--color-error))] bg-white placeholder-gray-500 hover:border-[rgb(var(--color-error))]',
      disabled: 'border-gray-200 bg-gray-50 placeholder-gray-300 cursor-not-allowed opacity-60 focus:none'
    };
    
    const currentState = props.disabled ? 'disabled' : error ? 'error' : 'default';
    
    return (
      <div className="inline-block">
        <input
          ref={ref}
          className={`${stateStyles[currentState]} ${className}`}
          {...props}
        />
        {error && errorMessage && (
          <div className="mt-1 text-sm text-red-600">{errorMessage}</div>
        )}
      </div>
    );
};
