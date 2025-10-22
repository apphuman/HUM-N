
import React from 'react';
import { IconProps } from '../../types';

export const HumanLogo: React.FC<IconProps & {isAnimatedLoader?: boolean}> = ({ className, isAnimatedLoader }) => {
  const baseClassName = "inline-block";
  // Logic to determine the final className based on isAnimatedLoader and the passed className
  // If isAnimatedLoader is true, use specific loader classes.
  // Otherwise, use the passed className or a default.
  const resolvedClassName = isAnimatedLoader 
    ? "human-logo-animated-loader text-6xl sm:text-7xl" 
    : (className || 'text-2xl');

  return (
    <div className={`${baseClassName} ${resolvedClassName}`} aria-label="HUMĀN Logo">
      <span className="font-bold tracking-tight">
        <span className="logo-hum text-stone-700">hum</span>
        <span className="logo-aa text-orange-500">ā</span>
        <span className="logo-n text-stone-700">n</span>
      </span>
    </div>
  );
};
