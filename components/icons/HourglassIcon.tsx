import React from 'react';
import { IconProps } from '../../types';

export const HourglassIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" opacity={0.3} />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 5.25h12M6 18.75h12" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 5.25l6 6.75 6-6.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.75L12 12l-6 6.75" />
  </svg>
);
