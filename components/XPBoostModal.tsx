import React from 'react';
import StyledButton from './StyledButton';
import { BoltIcon } from './icons/BoltIcon';
import { XIcon } from './icons/XIcon';

interface XPBoostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (amount: number) => void;
}

const XPBoostModal: React.FC<XPBoostModalProps> = ({ isOpen, onClose, onPurchase }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-[700]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="xp-boost-title"
    >
      <div
        className="relative bg-[var(--modal-background-color)] rounded-[var(--border-radius-xl)] shadow-2xl w-full max-w-md mx-auto transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalShow flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ animationName: 'modalShowAnim', animationDuration: '0.3s', animationFillMode: 'forwards' }}
      >
        <div className="p-6 text-center">
          <div className="mx-auto w-12 h-12 flex items-center justify-center bg-orange-100 rounded-full mb-3">
            <BoltIcon className="w-7 h-7 text-orange-500" />
          </div>
          <h2 id="xp-boost-title" className="text-xl font-bold text-gray-800">
            Tu y es presque !
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Tu as déjà parcouru une grande partie du chemin vers le prochain niveau. Besoin d’un petit coup de boost ?
          </p>
        </div>
        
        <div className="px-6 py-4 space-y-3">
          <button 
            onClick={() => onPurchase(20)}
            className="w-full text-left p-4 border-2 border-orange-200 hover:border-orange-400 bg-orange-50 rounded-lg flex justify-between items-center transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            <div>
              <p className="font-semibold text-orange-700">+20 XP</p>
              <p className="text-xs text-orange-600">Passe à l’étape supérieure</p>
            </div>
            <span className="text-lg font-bold text-orange-800 bg-orange-200/50 px-3 py-1 rounded-md">2,99 €</span>
          </button>

          <button 
            onClick={() => onPurchase(50)}
            className="w-full text-left p-4 border-2 border-orange-200 hover:border-orange-400 bg-orange-50 rounded-lg flex justify-between items-center transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            <div>
              <p className="font-semibold text-orange-700">+50 XP</p>
              <p className="text-xs text-orange-600">Débloque de nouvelles fonctionnalités</p>
            </div>
            <span className="text-lg font-bold text-orange-800 bg-orange-200/50 px-3 py-1 rounded-md">5,99 €</span>
          </button>
        </div>

        <div className="p-6 text-center">
            <p className="text-xs text-gray-500 italic">
                (Ce boost est unique pour chaque niveau. Profite-en pour franchir un cap, le reste se gagne dans l’échange et la sincérité).
            </p>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl text-right">
          <StyledButton onClick={onClose} variant="secondary" size="sm">
            Non merci
          </StyledButton>
        </div>
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full text-gray-400 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label="Fermer"
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>
       <style>{`
        @keyframes modalShowAnim {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modalShow {
          opacity: 0;
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
};

export default XPBoostModal;