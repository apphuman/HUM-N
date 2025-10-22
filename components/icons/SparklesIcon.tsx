
import React from 'react';
import { IconProps } from '../../types';

export const SparklesIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 14.188V12.062h-1.188L14.25 11.25v2.813L13.063 15.75l-1.188-1.5v-2.812L10.125 10.5l1.5-1.188h2.813L15.75 9l1.188 1.5h2.813l1.5 1.188L19.438 14.25z" />
  </svg>
);
