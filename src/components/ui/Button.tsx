import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'tertiary';
}

export const Button = ({ variant = 'primary', className = '', children, ref, ...props }: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }) => {
    const baseStyles = 'w-[120px] h-12 font-medium rounded transition-all duration-200 outline-none';
    
    const variantStyles = {
      primary: {
        default: 'text-white bg-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary-light))] hover:shadow-[2px_2px_2px_0px_rgba(0,0,0,0.2)] active:bg-[rgb(var(--color-primary-dark))] active:shadow-none disabled:bg-[#E8E9ED] disabled:text-gray-400 disabled:shadow-none disabled:cursor-not-allowed',
      },
      tertiary: {
        default: 'text-[rgb(var(--color-neutral))] bg-transparent hover:text-[rgb(var(--color-primary))] active:text-[rgb(var(--color-primary-dark))]',
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