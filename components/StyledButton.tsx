import React from 'react';

interface StyledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-[var(--border-radius-md)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background-color)] transition-all duration-200 ease-in-out inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none';

  const variantStyles = {
    primary: 'bg-[var(--primary-color)] hover:bg-[var(--primary-color-dark)] text-white focus-visible:ring-[var(--primary-color)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] active:bg-[#B45309] hover:translate-y-[-1px]', // amber-700 for active
    secondary: 'bg-[var(--secondary-color)] hover:bg-[var(--secondary-color-hover)] text-[var(--secondary-text-color)] focus-visible:ring-[var(--secondary-text-color)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] active:bg-[var(--border-color-strong)]',
    outline: 'bg-transparent hover:bg-[var(--primary-color)]/10 text-[var(--primary-color)] border border-[var(--primary-color)] focus-visible:ring-[var(--primary-color)] hover:text-[var(--primary-color-dark)]',
    ghost: 'bg-transparent hover:bg-[var(--primary-color)]/10 text-[var(--primary-color)] focus-visible:ring-[var(--primary-color)] hover:text-[var(--primary-color-dark)]',
    danger: 'bg-[var(--error-color)] hover:bg-[var(--error-color-dark)] text-white focus-visible:ring-[var(--error-color)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]',
    success: 'bg-[var(--success-color)] hover:bg-[var(--success-color-dark)] text-white focus-visible:ring-[var(--success-color)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]',
  };

  const sizeStyles = {
    sm: 'px-3.5 py-2 text-xs', 
    md: 'px-5 py-2.5 text-sm', 
    lg: 'px-6 py-3 text-base', 
  };
  
  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default StyledButton;