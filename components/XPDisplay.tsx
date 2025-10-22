
import React from 'react';

interface XPDisplayProps {
  xp: number;
}

const XPDisplay: React.FC<XPDisplayProps> = ({ xp }) => {
  return (
    <div className="bg-[var(--card-background-color)] p-4 rounded-[var(--border-radius-lg)] shadow-[var(--shadow-md)] border border-[var(--border-color)]">
      <h3 className="text-sm font-semibold text-[var(--primary-color)] mb-1">Points d'Expérience</h3>
      <p className="text-3xl font-bold text-[var(--text-color)]">{xp} <span className="text-lg text-[var(--text-color-light)]">XP</span></p>
    </div>
  );
};

export default XPDisplay;