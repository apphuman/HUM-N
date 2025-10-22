
import React from 'react';
import { IconProps } from '../../types'; // IconProps can be used for className or other shared props

export const HumanLogo: React.FC<IconProps & {isAnimatedLoader?: boolean}> = ({ className, isAnimatedLoader }) => {
  const baseClassName = "inline-block";
  const loaderClassName = isAnimatedLoader ? "human-logo-animated-loader text-6xl sm:text-7xl" : (className || 'text-2xl');

  return (
    <div className={`${baseClassName} ${loaderClassName}`} aria-label="HUMĀN Logo">
      <span className="font-bold tracking-tight">
        <span className="logo-hum text-stone-700">hum</span>
        <span className="logo-aa text-orange-500">ā</span>
        <span className="logo-n text-stone-700">n</span>
      </span>
    </div>
  );
};