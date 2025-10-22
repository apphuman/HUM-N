import React from 'react';
import { IconProps } from '../../types';

export const LiveIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112zM12 21a9 9 0 100-18 9 9 0 000 18z" />
    {/* Secondary path for a 'broadcasting' feel, optional */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.071 4.929c3.905 3.905 3.905 10.237 0 14.142M16.243 7.757c2.343 2.343 2.343 6.143 0 8.486" opacity="0.5"/>
  </svg>
);