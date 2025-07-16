import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button = ({ variant = 'primary', className = '', children, ref, ...props }: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }) => {
    const baseStyles = 'w-[120px] h-12 font-medium text-white rounded transition-all duration-200 outline-none';
    
    const variantStyles = {
      primary: {
        default: 'bg-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary-light))] hover:shadow-[2px_2px_2px_0px_rgba(0,0,0,0.2)] active:bg-[rgb(var(--color-primary-dark))] active:shadow-none disabled:bg-[#E8E9ED] disabled:text-gray-400 disabled:shadow-none disabled:cursor-not-allowed',
      },
      secondary: {
        default: 'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed',
      }
    };
    
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant].default} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
};