
import React from 'react';
import StyledButton from './StyledButton';
import { LevelInfo } from '../types';
import { LockClosedIcon } from './icons/LockClosedIcon';
import { LightBulbIcon } from './icons/LightBulbIcon';

interface LevelGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  userLevel: LevelInfo | null;
  requiredLevel: LevelInfo | null;
}

const LevelGateModal: React.FC<LevelGateModalProps> = ({ isOpen, onClose, userLevel, requiredLevel }) => {
  if (!isOpen || !userLevel || !requiredLevel) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-[700]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="level-gate-title"
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalShow flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ animationName: 'modalShowAnim', animationDuration: '0.3s', animationFillMode: 'forwards' }}
      >
        <div className="p-6 text-center">
          <div className="mx-auto w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full mb-3">
            <LockClosedIcon className="w-7 h-7 text-gray-500" />
          </div>
          <h2 id="level-gate-title" className="text-xl font-bold text-gray-800">
            Niveau Requis
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Cet atelier est conçu pour les membres de niveau <strong className="text-orange-500">{requiredLevel.name} {requiredLevel.emoji}</strong> ou supérieur, car les thèmes abordés y sont plus profonds.
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Tu es actuellement au niveau <strong className="text-gray-700">{userLevel.name} {userLevel.emoji}</strong>.
          </p>
        </div>
        
        <div className="px-6 pb-6">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center">
                    <LightBulbIcon className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0" />
                    <h3 className="font-semibold text-orange-800">Comment atteindre ce niveau ?</h3>
                </div>
                <ul className="list-disc list-inside text-xs text-orange-700 space-y-1.5 pl-2">
                    <li>Continue de participer activement aux ateliers de ton niveau.</li>
                    <li>Partage tes réflexions dans la section "Échos".</li>
                    <li>L'engagement bienveillant est toujours récompensé par des XP.</li>
                </ul>
            </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl text-center">
          <StyledButton onClick={onClose} variant="primary" size="md">
            J'ai compris
          </StyledButton>
        </div>
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

export default LevelGateModal;
