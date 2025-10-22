import React, { useState } from 'react';
import { UserCreatedWorkshopDetails } from '../types';
import StyledButton from './StyledButton';
import { PlusCircleIcon } from './icons/PlusCircleIcon'; // For title

interface CreateWorkshopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (details: UserCreatedWorkshopDetails) => void;
}

const CreateWorkshopModal: React.FC<CreateWorkshopModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [numParticipants, setNumParticipants] = useState(5); 
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!title.trim()) {
      setError("Le titre de l'atelier est requis.");
      return;
    }
    if (title.trim().length < 5 || title.trim().length > 80) {
      setError("Le titre doit contenir entre 5 et 80 caractères.");
      return;
    }
    if (!description.trim()) {
      setError("Une brève description de l'atelier est requise.");
      return;
    }
     if (description.trim().length < 10 || description.trim().length > 200) {
      setError("La description doit contenir entre 10 et 200 caractères.");
      return;
    }
    if (numParticipants < 5 || numParticipants > 8) {
      setError("Le nombre de participants IA doit être entre 5 et 8.");
      return;
    }
    onCreate({ title: title.trim(), description: description.trim(), numParticipants });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center p-4 z-[500]" // Increased z-index
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-workshop-title"
    >
      <div
        className="bg-[var(--modal-background-color)] rounded-[var(--border-radius-xl)] shadow-2xl w-full max-w-lg mx-auto transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalShow flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ animationName: 'modalShowAnim', animationDuration: '0.3s', animationFillMode: 'forwards', maxHeight: 'calc(100vh - 4rem)' }}
      >
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="p-6 border-b border-[var(--border-color)]">
            <div className="flex items-center mb-1">
                <PlusCircleIcon className="w-7 h-7 text-[var(--primary-color)] mr-2" />
                <h2 id="create-workshop-title" className="text-xl font-bold text-[var(--text-color-dark)]">
                Créer ton Atelier Personnalisé
                </h2>
            </div>
            <p className="text-sm text-[var(--text-color-light)]">
              Définis les bases de ton atelier. Les participants IA s'adapteront au thème que tu proposes.
            </p>
          </div>

          <div className="p-6 flex-grow overflow-y-auto space-y-5">
            {error && <p className="text-sm text-[var(--error-color)] bg-[var(--error-color)]/10 p-3 rounded-[var(--border-radius-md)] border border-[var(--error-color)]/20 mb-3">{error}</p>}

            <div>
              <label htmlFor="workshopTitle" className="form-label">
                Titre de l'atelier <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="text"
                id="workshopTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
                placeholder="Ex: Explorer la gratitude au quotidien"
                required
                minLength={5}
                maxLength={80}
              />
            </div>
            <div>
              <label htmlFor="workshopDescription" className="form-label">
                Brève description / Intérêt de l'atelier <span className="text-[var(--error-color)]">*</span>
              </label>
              <textarea
                id="workshopDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-textarea"
                rows={3}
                placeholder="Ex: Partager des moments de gratitude et découvrir comment l'intégrer davantage dans nos vies."
                required
                minLength={10}
                maxLength={200}
              />
            </div>
            <div>
              <label htmlFor="numParticipants" className="form-label">
                Nombre de participants IA (5 à 8) <span className="text-[var(--error-color)]">*</span>
              </label>
              <input
                type="number"
                id="numParticipants"
                value={numParticipants}
                onChange={(e) => setNumParticipants(parseInt(e.target.value, 10))}
                min="5"
                max="8"
                className="form-input"
                required
              />
               <p className="text-xs text-[var(--text-color-lighter)] mt-1">Tu seras également dans l'atelier, soit {numParticipants + 1} participant(s) au total (avec toi).</p>
            </div>
          </div>
          <div className="px-6 py-4 bg-[var(--background-color)] border-t border-[var(--border-color)] rounded-b-[var(--border-radius-xl)] flex justify-end space-x-3 sticky bottom-0">
            <StyledButton type="button" onClick={onClose} variant="secondary">
              Annuler
            </StyledButton>
            <StyledButton type="submit" variant="primary">
              Créer l'Atelier
            </StyledButton>
          </div>
        </form>
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

export default CreateWorkshopModal;