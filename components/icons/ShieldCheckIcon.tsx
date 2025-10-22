import React from 'react';
import { IconProps } from '../../types';

export const ShieldCheckIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.602-3.751m-.228-1.141A11.955 11.955 0 0012 2.25c-2.305 0-4.408.867-6 2.292m10.228 4.282c.367.527.67 1.09.907 1.685" />
  </svg>
);