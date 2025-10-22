
import React from 'react';
import { WorkshopTheme } from '../types';
import { ExploreIcon } 
from './icons/ExploreIcon';

interface WorkshopItemProps {
  theme: WorkshopTheme;
  actionText?: string;
  onActionClick?: () => void;
  isCompleted?: boolean;
}

const WorkshopItem: React.FC<WorkshopItemProps> = ({ theme, actionText, onActionClick, isCompleted }) => {
  const IconComponent = theme.icon || ExploreIcon;

  return (
    <div className="bg-[var(--card-background-color)] p-5 rounded-[var(--border-radius-lg)] shadow-[var(--shadow-lg)] border border-[var(--border-color)] hover:shadow-[var(--shadow-xl)] transition-all duration-300 flex flex-col h-full">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 mt-1 p-2 bg-[var(--primary-color)]/10 rounded-full">
          <IconComponent className="w-7 h-7 text-[var(--primary-color)]" />
        </div>
        <div className="flex-grow">
          <h3 className="text-md font-semibold text-[var(--text-color)]">{theme.title}</h3>
          <p className="text-sm text-[var(--text-color-light)] mt-1 mb-3 line-clamp-3">{theme.description}</p>
          
          {!isCompleted && theme.progress !== undefined && (
            <>
              <div className="w-full bg-[var(--secondary-color)] rounded-full h-2">
                <div
                  className="bg-[var(--primary-color)] h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${theme.progress}%` }}
                  aria-valuenow={theme.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
              <p className="text-xs text-[var(--text-color-lighter)] mt-1 text-right">{theme.progress}% complété</p>
            </>
          )}
          {isCompleted && (
            <p className="text-sm font-medium text-[var(--success-color)]">Terminé ! 🎉 (+{theme.xpGainedByUser || 0} XP)</p>
          )}
        </div>
      </div>
      {actionText && onActionClick && (
        <div className="mt-auto pt-4 text-right"> {/* mt-auto pushes button to bottom */}
           <button 
            onClick={onActionClick}
            className="px-4 py-2 text-sm font-medium text-[var(--primary-color)] bg-[var(--primary-color)]/10 rounded-[var(--border-radius-md)] hover:bg-[var(--primary-color)]/20 transition-colors"
           >
            {actionText}
           </button>
        </div>
      )}
    </div>
  );
};

export default WorkshopItem;