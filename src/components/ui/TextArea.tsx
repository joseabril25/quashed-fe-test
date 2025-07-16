import type { TextareaHTMLAttributes } from 'react';
import { getFormStateStyles, getFormState } from '../../utils/formStyles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: boolean;
  errorMessage?: string;
}

export const TexAarea = ({ label, error, errorMessage, className = '', ref, ...props }: TextareaProps & { ref?: React.Ref<HTMLTextAreaElement> }) => {
  const stateStyles = getFormStateStyles();
  const currentState = getFormState(props.disabled, error);
  
  return (
    <div className="inline-block">
      <label>{label}</label>
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