
import React from 'react';
import { WorkshopSummaryData } from '../types';
import StyledButton from './StyledButton';
import LoadingSpinner from './LoadingSpinner';
import { EMOTIONAL_XP_TYPES } from '../constants';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { ChevronUpIcon } from './icons/ChevronUpIcon';

interface WorkshopSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  summaryData: WorkshopSummaryData | null;
  isLoading: boolean;
  workshopTitle: string;
}

const Section: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  return (
    <div className="mb-3 border-b border-[var(--border-color)] last:border-b-0 pb-3 last:pb-0">
      <button 
        className="w-full flex justify-between items-center text-left text-md font-semibold text-[var(--primary-color)] mb-1.5 focus:outline-none py-1 group"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="group-hover:text-[var(--primary-color-dark)]">{title}</span>
        {isOpen ? <ChevronUpIcon className="w-5 h-5 text-[var(--text-color-lighter)] group-hover:text-[var(--primary-color-dark)]" /> : <ChevronDownIcon className="w-5 h-5 text-[var(--text-color-lighter)] group-hover:text-[var(--primary-color-dark)]" />}
      </button>
      {isOpen && <div className="pl-2 pt-1 text-sm text-[var(--text-color-light)] space-y-2">{children}</div>}
    </div>
  );
};

const WorkshopSummaryModal: React.FC<WorkshopSummaryModalProps> = ({
  isOpen,
  onClose,
  summaryData,
  isLoading,
  workshopTitle,
}) => {
  if (!isOpen) {
    return null;
  }

  const renderXPReceivedDetailed = (xpSummary: WorkshopSummaryData['xpReceivedFromAI']) => {
    const aiEntries = Object.entries(xpSummary).filter(([, awards]) => Object.keys(awards).length > 0);
    if (aiEntries.length === 0) return <p>Aucun XP reçu des participants IA pendant cet atelier.</p>;
    
    return (
      <div className="space-y-1.5">
        {aiEntries.map(([aiName, awards]) => (
          <div key={aiName}>
            <p className="font-medium text-[var(--text-color)]">De {aiName}:</p>
            <ul className="list-disc list-inside ml-4 space-y-0.5">
              {Object.entries(awards).map(([type, amount]) => (
                <li key={type}><span className="font-semibold">{amount} XP</span> en {type}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };
  
  const renderSystemAwardedXP = (systemXP: WorkshopSummaryData['systemAwardedXP']) => {
    if (!systemXP || (systemXP.overallParticipationXP === 0 && systemXP.specificXPAwards.length === 0)) {
      return <p>Le système n'a pas attribué d'XP supplémentaire pour cet atelier.</p>;
    }
    return (
      <div className="space-y-1.5 text-[var(--text-color)]">
        {systemXP.overallParticipationXP > 0 && (
          <p>Participation globale : <span className="font-semibold">{systemXP.overallParticipationXP} XP</span></p>
        )}
        {systemXP.specificXPAwards.length > 0 && (
          <div>
            <p className="font-medium">XP Émotionnels spécifiques reconnus :</p>
            <ul className="list-disc list-inside ml-4">
              {systemXP.specificXPAwards.map(award => (
                <li key={award.typeKey}>
                  {EMOTIONAL_XP_TYPES.find(e => e.key === award.typeKey)?.icon} {award.typeName}: <span className="font-semibold">+{award.amount} XP</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };


  const renderXPAwardedToAI = (xpSummary: WorkshopSummaryData['xpAwardedToAI']) => {
    const aiEntries = Object.entries(xpSummary);
    if (aiEntries.length === 0) return <p>Tu n'as pas attribué d'XP aux participants IA pendant cet atelier.</p>;
    return (
      <div className="space-y-1.5">
        {aiEntries.map(([aiName, awards]) => (
          <div key={aiName}>
            <p className="font-medium text-[var(--text-color)]">À {aiName}:</p>
            <ul className="list-disc list-inside ml-4 space-y-0.5">
              {Object.entries(awards).map(([type, amount]) => (
                <li key={type}><span className="font-semibold">{amount} XP</span> en {type}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };


  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center p-4 z-[500] transition-opacity duration-300 ease-in-out" // Increased z-index
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="summary-modal-title"
    >
      <div
        className="bg-[var(--modal-background-color)] rounded-[var(--border-radius-xl)] shadow-2xl w-full max-w-lg mx-auto flex flex-col transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalShow"
        onClick={(e) => e.stopPropagation()}
        style={{ 
            animationName: 'modalShowAnim', 
            animationDuration: '0.3s', 
            animationFillMode: 'forwards',
            maxHeight: 'calc(100vh - 4rem)' 
        }}
      >
        <div className="p-6 border-b border-[var(--border-color)] sticky top-0 bg-[var(--modal-background-color)] rounded-t-[var(--border-radius-xl)] z-10">
          <h2 id="summary-modal-title" className="text-xl font-bold text-[var(--text-color-dark)] mb-1">Synthèse de l'atelier</h2>
          <p className="text-sm text-[var(--text-color-light)] italic">{workshopTitle}</p>
        </div>

        <div className="flex-grow overflow-y-auto p-6 pr-5"> {/* Adjusted pr for scrollbar */}
          {isLoading && !summaryData && (
            <div className="py-8 text-center">
              <LoadingSpinner />
              <p className="mt-3 text-[var(--text-color-light)]">Génération de la synthèse en cours...</p>
            </div>
          )}

          {!isLoading && summaryData && (
            <div className="space-y-2">
              <Section title="Points Clés de la Discussion">
                <div className="text-[var(--text-color)] whitespace-pre-wrap"> 
                    {summaryData.keyPoints === "Résumé non disponible." || summaryData.keyPoints === "Erreur lors de la génération du résumé des points clés." || summaryData.keyPoints.includes("Aucun point clé n'a pu être extrait") ? (
                        <p className="italic text-[var(--text-color-lighter)]">{summaryData.keyPoints}</p>
                    ) : (
                        <p>{summaryData.keyPoints}</p>
                    )}
                </div>
              </Section>

              <Section title="XP Reçus des Participants IA (Détail)" defaultOpen={false}>
                {renderXPReceivedDetailed(summaryData.xpReceivedFromAI)}
              </Section>
              
              <Section title="XP Reçus (Total par Type)" defaultOpen={false}>
                 {Object.entries(summaryData.xpReceivedByUser).length > 0 ? (
                    <ul className="list-disc list-inside space-y-1 text-[var(--text-color)]">
                        {Object.entries(summaryData.xpReceivedByUser).map(([type, amount]) => (
                        <li key={type}><span className="font-semibold">{amount} XP</span> en {type}</li>
                        ))}
                    </ul>
                 ) : (
                    <p>Aucun XP de ce type reçu des participants IA.</p>
                 )}
              </Section>

              <Section title="XP Attribués par le Système HUMĀN">
                {renderSystemAwardedXP(summaryData.systemAwardedXP)}
              </Section>

              <Section title="XP Envoyés par Toi (aux IA)" defaultOpen={false}>
                {renderXPAwardedToAI(summaryData.xpAwardedToAI)}
              </Section>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-[var(--background-color)] border-t border-[var(--border-color)] rounded-b-[var(--border-radius-xl)] text-right sticky bottom-0 z-10">
          <StyledButton onClick={onClose} variant="primary" size="sm" disabled={isLoading && !summaryData}>
            Fermer et Archiver l'Atelier
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

export default WorkshopSummaryModal;