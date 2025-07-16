import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  errorMessage?: string;
}

export const Input = ({ label, error, errorMessage, className = '', ref, ...props }: InputProps & { ref?: React.Ref<HTMLInputElement> }) => {
    const stateStyles = {
      default: 'placeholder-[rgb(var(--color-border))] hover:border-[rgb(var(--color-primary))] focus:border-[rgb(var(--color-primary))] focus:outline-none',
      error: 'border-[rgb(var(--color-error))] bg-white hover:border-[rgb(var(--color-error))]',
      disabled: 'border-gray-200 bg-gray-50 placeholder-gray-300 cursor-not-allowed opacity-60 focus:none'
    };
    
    const currentState = props.disabled ? 'disabled' : error ? 'error' : 'default';
    
    return (
      <div className="inline-block">
        <label className="block text-sm font-normal text-[rgb(var(--color-neutral))] mb-2">{label}</label>
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
