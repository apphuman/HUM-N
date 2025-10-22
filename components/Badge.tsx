import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'premium' | 'default';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const baseClasses = 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide';
  
  const variantClasses = {
    premium: 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/50',
    default: 'bg-gray-100 text-gray-800 border border-gray-300',
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
