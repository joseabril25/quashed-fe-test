import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ error, errorMessage, className = '', ...props }, ref) => {    
    const stateStyles = {
      default: 'border-gray-300 bg-white placeholder-gray-500 hover:border-[rgb(var(--color-primary))]-100 focus:border-[rgb(var(--color-primary))]-100',
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
  }
);

Input.displayName = 'Input';
