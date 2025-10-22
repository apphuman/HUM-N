
import React from 'react';
import { UserProfile } from '../types';
import { StarIcon } from './icons';

interface AvatarProps {
  name: string;
  imageUrl?: string; // New prop for profile picture
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  size?: 'sm' | 'md'; 
  className?: string;
  isAI?: boolean;
  gender?: UserProfile['gender'];
  isPremium?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ name, imageUrl, onClick, size = 'md', className = '', isAI = false, gender, isPremium = false }) => {
  const sizeClasses = size === 'sm' ? 'w-8 h-8 text-sm' : 'w-10 h-10 text-base';

  // Fallback DiceBear avatar URL construction
  const getDiceBearUrl = () => {
    const avatarStyle = isAI ? 'bottts' : 'micah';
    const aiBackgroundColors = ['b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf'];
    const userFemaleBackgroundColors = ['ffb6c1', 'ffc0cb', 'dda0dd', 'ffa07a', 'ffb169'];
    const userMaleBackgroundColors = ['add8e6', '87cefa', '90ee90', 'afeeee', 'b0e0e6'];
    const defaultUserBackgroundColors = ['ffdfbf', 'ffd5a1', 'ffc585', 'f5b058', 'silver', 'lightgray'];

    let selectedColors: string[];
    if (isAI) {
      selectedColors = aiBackgroundColors;
    } else {
      if (gender === 'female') selectedColors = userFemaleBackgroundColors;
      else if (gender === 'male') selectedColors = userMaleBackgroundColors;
      else selectedColors = defaultUserBackgroundColors;
    }
    
    const bgColorParam = selectedColors.join(',');
    const seed = encodeURIComponent(name);
    return `https://api.dicebear.com/8.x/${avatarStyle}/svg?seed=${seed}&radius=50&backgroundColor=${bgColorParam}`;
  };

  const finalImageUrl = imageUrl || getDiceBearUrl();

  const commonImageClasses = "w-full h-full object-cover rounded-full";
  const premiumIcon = isPremium && !isAI ? (
    <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-yellow-400 p-1 rounded-full shadow-md border-2 border-white" title="Membre Premium">
      <StarIcon className="w-3 h-3 text-white" />
    </div>
  ) : null;

  if (onClick) {
    return (
      <button
        type="button"
        id={`avatar-button-${name}`}
        onClick={onClick}
        className={`relative flex-shrink-0 ${sizeClasses} rounded-full overflow-visible focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 cursor-pointer hover:opacity-90 transition-opacity ${className}`}
        aria-label={`Options pour ${name}`}
      >
        <img src={finalImageUrl} alt={`Avatar de ${name}`} className={commonImageClasses} />
        {premiumIcon}
      </button>
    );
  }

  return (
    <div
      className={`relative flex-shrink-0 ${sizeClasses} rounded-full overflow-visible cursor-default ${className}`}
      aria-label={`Avatar de ${name}`}
    >
      <img src={finalImageUrl} alt={`Avatar de ${name}`} className={commonImageClasses} />
      {premiumIcon}
    </div>
  );
};

export default Avatar;