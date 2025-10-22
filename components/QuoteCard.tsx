
import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { DEFAULT_QUOTE } from '../constants';


interface QuoteCardProps {
  quote: string | null;
  isLoading: boolean;
  error: string | null;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, isLoading, error }) => {
  const cardBaseStyle = "bg-gradient-to-br from-orange-50 via-red-50 to-amber-50 p-6 rounded-[var(--border-radius-lg)] shadow-[var(--shadow-lg)] border border-[var(--border-color)] transition-all duration-300 hover:shadow-[var(--shadow-xl)]";

  if (isLoading) {
    return (
      <div className={`${cardBaseStyle} min-h-[120px] flex items-center justify-center`}>
        <LoadingSpinner />
      </div>
    );
  }

  const displayQuote = error ? DEFAULT_QUOTE : quote;

  return (
    <div className={`${cardBaseStyle}`}>
      {error && <p className="text-xs text-[var(--error-color)] mb-2 text-center">{error}</p>}
      <blockquote className="text-center">
        <p className="text-lg italic text-[var(--text-color-light)] leading-relaxed relative">
          <span className="absolute -left-3 -top-1 text-4xl text-[var(--primary-color)]/30 font-serif">“</span>
          {displayQuote}
          <span className="absolute -right-3 -bottom-1 text-4xl text-[var(--primary-color)]/30 font-serif">”</span>
        </p>
        {/* Author could be added here if available */}
      </blockquote>
    </div>
  );
};

export default QuoteCard;