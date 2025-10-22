import React from 'react';
import { Badge } from '../types';

interface BadgeDisplayProps {
  badges: Badge[];
  disableContainer?: boolean;
}

const BadgeItem: React.FC<{ badge: Badge }> = ({ badge }) => (
  <div className="flex items-center space-x-3 bg-[var(--background-color)] p-3 rounded-[var(--border-radius-md)] border border-[var(--border-color)] hover:bg-[var(--secondary-color)]/80 transition-colors">
    <span className="text-2xl" role="img" aria-label="badge icon">{badge.icon}</span>
    <div>
      <h4 className="text-sm font-semibold text-[var(--text-color)]">{badge.name}</h4>
      {badge.description && <p className="text-xs text-[var(--text-color-light)]">{badge.description}</p>}
    </div>
  </div>
);


const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ badges, disableContainer = false }) => {
  if (badges.length === 0) {
    return (
      <div className="bg-[var(--card-background-color)] p-4 rounded-[var(--border-radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)] text-center">
        <p className="text-[var(--text-color-light)]">Aucun badge pour le moment.</p>
      </div>
    );
  }

  const content = (
     <div className="space-y-3">
        {badges.map((badge) => (
          <BadgeItem key={badge.id} badge={badge} />
        ))}
      </div>
  );

  if (disableContainer) {
    return content;
  }

  return (
    <div className="bg-[var(--card-background-color)] p-4 rounded-[var(--border-radius-lg)] shadow-[var(--shadow-sm)] border border-[var(--border-color)]">
      {content}
    </div>
  );
};

export default BadgeDisplay;