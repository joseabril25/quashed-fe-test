import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: boolean;
  errorMessage?: string;
}

export const TexAarea = ({ label, error, errorMessage, className = '', ref, ...props }: TextareaProps & { ref?: React.Ref<HTMLTextAreaElement> }) => {
  const stateStyles = {
    default: 'placeholder-[rgb(var(--color-border))] hover:border-[rgb(var(--color-primary))] focus:border-[rgb(var(--color-primary))] focus:outline-none',
    error: 'border-[rgb(var(--color-error))] bg-white hover:border-[rgb(var(--color-error))]',
    disabled: 'border-gray-200 bg-gray-50 placeholder-gray-300 cursor-not-allowed opacity-60 focus:none'
  };
  
  const currentState = props.disabled ? 'disabled' : error ? 'error' : 'default';
  
  return (
    <div className="inline-block">
      <label className="block text-sm font-normal text-[rgb(var(--color-neutral))] mb-2">{label}</label>
      <textarea
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