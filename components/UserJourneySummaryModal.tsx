import React from 'react';
import { UserJourneySummary } from '../types';
import StyledButton from './StyledButton';
import { HumanLogo } from './icons/HumanLogo';
import LoadingSpinner from './LoadingSpinner';

interface UserJourneySummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  summary: UserJourneySummary | null;
}

const UserJourneySummaryModal: React.FC<UserJourneySummaryModalProps> = ({
  isOpen,
  onClose,
  summary,
}) => {
  if (!isOpen || !summary) {
    return null;
  }

  const handleSimulatedDownload = () => {
    alert("La fonctionnalité de téléchargement PDF sera disponible dans une future mise à jour.");
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center p-4 z-[600]" // Increased z-index
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="journey-summary-title"
    >
      <div
        className="bg-[var(--modal-background-color)] rounded-[var(--border-radius-xl)] shadow-2xl w-full max-w-2xl mx-auto transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalShow flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ animationName: 'modalShowAnim', animationDuration: '0.3s', animationFillMode: 'forwards', maxHeight: 'calc(100vh - 4rem)' }}
      >
        <div className="p-6 border-b border-[var(--border-color)] text-center sticky top-0 bg-[var(--modal-background-color)] rounded-t-[var(--border-radius-xl)] z-10">
            <HumanLogo className="text-3xl mx-auto mb-2 text-[var(--primary-color)]" />
            <h2 id="journey-summary-title" className="text-xl font-bold text-[var(--text-color-dark)]">
                {summary.analysisTitle}
            </h2>
            <p className="text-sm text-[var(--text-color-light)]">Un aperçu de ton cheminement, {summary.firstName}.</p>
        </div>

        <div className="p-6 flex-grow overflow-y-auto">
          {summary.isLoading ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[200px]">
              <LoadingSpinner />
              <p className="mt-3 text-sm text-[var(--text-color-light)]">Analyse de vos contributions en cours...</p>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none text-[var(--text-color-light)] leading-relaxed whitespace-pre-wrap">
              {summary.analysisText}
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-[var(--background-color)] border-t border-[var(--border-color)] rounded-b-[var(--border-radius-xl)] flex justify-end space-x-3 sticky bottom-0 z-10">
          <StyledButton onClick={handleSimulatedDownload} variant="primary" size="sm" disabled={summary.isExample}>
            Télécharger en PDF
          </StyledButton>
          <StyledButton onClick={onClose} variant="secondary" size="sm">
            Fermer
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
        .prose { color: var(--text-color); }
        .prose h1, .prose h2, .prose h3, .prose h4 { color: var(--text-color-dark); }
        .prose strong { color: var(--text-color-dark); }
       `}</style>
    </div>
  );
};

export default UserJourneySummaryModal;