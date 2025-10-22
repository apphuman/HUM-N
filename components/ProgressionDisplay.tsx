
import React from 'react';
import { XP_LEVELS, BENEFITS_BY_LEVEL } from '../constants';
import { StarIcon } from './icons/StarIcon'; // For benefits list

interface LevelInfo {
  name: string;
  minXP: number;
  maxXP: number;
  description: string;
  emoji: string; // Added emoji for direct use
}

interface ProgressionDisplayProps {
  xp: number;
  currentLevel: LevelInfo;
  nextLevel: LevelInfo | null;
}

const ProgressionDisplay: React.FC<ProgressionDisplayProps> = ({ xp, currentLevel, nextLevel }) => {
  const progressPercentage = nextLevel 
    ? Math.max(0, Math.min(100, ((xp - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100))
    : 100;

  const benefits = BENEFITS_BY_LEVEL[currentLevel.name] || [];

  return (
    <div className="bg-[var(--card-background-color)] p-6 rounded-[var(--border-radius-lg)] shadow-[var(--shadow-lg)] border border-[var(--border-color)] mb-8">
      <div className="mb-5">
        <div className="flex justify-between items-baseline mb-1">
          <h2 className="text-xl font-bold text-[var(--text-color)]">
            Niveau : <span className="text-[var(--primary-color)]">{currentLevel.emoji} {currentLevel.name}</span>
          </h2>
          <p className="text-3xl font-extrabold text-[var(--text-color)]">{xp} <span className="text-lg font-semibold text-[var(--text-color-lighter)]">XP</span></p>
        </div>
        <p className="text-sm text-[var(--text-color-light)] italic mb-3">{currentLevel.description}</p>
      </div>

      {nextLevel && (
        <div className="mb-5">
          <div className="flex justify-between text-xs text-[var(--text-color-lighter)] mb-1.5">
            <span>Vers {nextLevel.name}</span>
            <span>{Math.max(0, nextLevel.minXP - xp)} XP restants</span>
          </div>
          <div className="w-full bg-[var(--secondary-color)] rounded-full h-3.5 shadow-inner">
            <div
              className="bg-[var(--primary-color)] h-3.5 rounded-full transition-all duration-500 ease-out flex items-center justify-end"
              style={{ width: `${progressPercentage}%` }}
              aria-valuenow={progressPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
            >
             {progressPercentage > 10 && <span className="text-white text-[10px] font-medium pr-1.5">{Math.floor(progressPercentage)}%</span>}
            </div>
          </div>
        </div>
      )}

      {benefits.length > 0 && (
        <div className="mt-4">
          <h3 className="text-md font-semibold text-[var(--text-color)] mb-2">Avantages de ton niveau :</h3>
          <ul className="space-y-1.5 text-sm text-[var(--text-color-light)]">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <StarIcon className="w-4 h-4 text-[var(--primary-color-light)] mr-2 mt-0.5 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {currentLevel.name === XP_LEVELS[XP_LEVELS.length - 1].name && (
         <p className="mt-4 text-sm font-semibold text-[var(--success-color)] flex items-center">
            <StarIcon className="w-5 h-5 mr-2 text-yellow-400 fill-current" />
            Félicitations, tu as atteint le plus haut niveau ! Tu es une véritable source d'inspiration.
         </p>
      )}
    </div>
  );
};

export default ProgressionDisplay;