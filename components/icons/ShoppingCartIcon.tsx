import React from 'react';
import { IconProps } from '../../types';

export const ShoppingCartIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.328 1.09-.821l-4.87-9.117A1.5 1.5 0 0011.218 3H4.5M4.5 4.5l.487 1.833A1.5 1.5 0 006.487 8.25h11.026a1.5 1.5 0 011.45 1.95l-1.488 4.463a1.5 1.5 0 01-1.45.987H7.5M7.5 14.25h11.218M15 18.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zM8.25 18.75a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
);
