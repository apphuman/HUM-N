import React from 'react';
import StyledButton from './StyledButton';
import { UserIcon } from './icons/UserIcon';
import { UsersIcon } from './icons/UsersIcon';
import { XIcon } from './icons/XIcon';

interface SeekerChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChooseSolo: () => void;
  onChooseGroup: () => void;
}

const SeekerChoiceModal: React.FC<SeekerChoiceModalProps> = ({ isOpen, onClose, onChooseSolo, onChooseGroup }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-[700]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="seeker-choice-title"
    >
      <div
        className="relative bg-[var(--modal-background-color)] rounded-[var(--border-radius-xl)] shadow-2xl w-full max-w-lg mx-auto transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalShow flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ animationName: 'modalShowAnim', animationDuration: '0.3s', animationFillMode: 'forwards' }}
      >
        <div className="p-6 text-center">
          <h2 id="seeker-choice-title" className="text-xl font-bold text-gray-800">
            Comment souhaites-tu participer ?
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            En tant que Seeker 🌱, tu as le choix. Prends le chemin qui te semble le plus juste pour toi aujourd'hui.
          </p>
        </div>
        
        <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Solo Option */}
          <div className="flex flex-col p-4 border-2 border-indigo-200 hover:border-indigo-400 bg-indigo-50 rounded-lg text-center transition-all">
            <UserIcon className="w-10 h-10 text-indigo-500 mx-auto mb-3" />
            <h3 className="font-semibold text-indigo-800">Commencer en Solo</h3>
            <p className="text-xs text-indigo-600 flex-grow my-2">
              Une expérience d'introspection guidée, seul·e avec l'animateur (IA), pour explorer le thème en toute tranquillité.
            </p>
            <StyledButton onClick={onChooseSolo} variant="primary" className="bg-indigo-600 hover:bg-indigo-700 mt-auto">
              Choisir Solo
            </StyledButton>
          </div>

          {/* Group Option */}
          <div className="flex flex-col p-4 border-2 border-teal-200 hover:border-teal-400 bg-teal-50 rounded-lg text-center transition-all">
            <UsersIcon className="w-10 h-10 text-teal-500 mx-auto mb-3" />
            <h3 className="font-semibold text-teal-800">Rejoindre le Groupe</h3>
            <p className="text-xs text-teal-600 flex-grow my-2">
              Plonge dans l'expérience collective pour partager et écouter les perspectives des autres participants (simulés par IA).
            </p>
            <StyledButton onClick={onChooseGroup} variant="primary" className="bg-teal-600 hover:bg-teal-700 mt-auto">
              Choisir le Groupe
            </StyledButton>
          </div>
        </div>

        <div className="p-6 text-center">
          <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700">
            Je ne suis pas sûr·e, je reviens plus tard.
          </button>
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

export default SeekerChoiceModal;
