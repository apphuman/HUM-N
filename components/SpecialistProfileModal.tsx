import React from 'react';
import StyledButton from './StyledButton';
import { FictionalSpecialistProfile } from '../types';
import { XIcon, BriefcaseIcon, AcademicCapIcon, SparklesIcon } from './icons';

interface SpecialistProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  specialist: FictionalSpecialistProfile | null;
}

const DetailSection: React.FC<{ title: string, content: React.ReactNode, icon: React.FC<any> }> = ({ title, content, icon: Icon }) => (
    <div>
        <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
            <Icon className="w-5 h-5 mr-2 text-orange-500" />
            {title}
        </h3>
        <div className="pl-7 text-sm text-gray-600 prose prose-sm max-w-none">{content}</div>
    </div>
);


const SpecialistProfileModal: React.FC<SpecialistProfileModalProps> = ({ isOpen, onClose, specialist }) => {
  if (!isOpen || !specialist) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-[950]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="specialist-profile-title"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalShow flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ animationName: 'modalShowAnim', animationDuration: '0.3s', animationFillMode: 'forwards', maxHeight: 'calc(100vh - 4rem)' }}
      >
        <div className="relative p-6 text-center border-b border-gray-200">
          <img src={specialist.imageUrl} alt={`Profil de ${specialist.name}`} className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg mx-auto -mb-16" />
        </div>
        
        <div className="pt-20 p-6 flex-grow overflow-y-auto space-y-6">
          <div className="text-center">
            <h2 id="specialist-profile-title" className="text-2xl font-bold text-gray-800">
              {specialist.name}
            </h2>
            <p className="text-md font-medium text-orange-600 mt-1">{specialist.title}</p>
          </div>

          <div className="space-y-5 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <DetailSection title="À propos" icon={BriefcaseIcon}>
                <p>{specialist.bio}</p>
            </DetailSection>

             <DetailSection title="Spécialités" icon={AcademicCapIcon}>
                <ul className="list-disc pl-5">
                    {specialist.specialties.map(spec => <li key={spec}>{spec}</li>)}
                </ul>
            </DetailSection>

            <DetailSection title="Mon Approche" icon={SparklesIcon}>
                <p>{specialist.approach}</p>
            </DetailSection>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl flex justify-between items-center">
            <p className="text-xs text-gray-500 italic">Ceci est un profil fictif à but illustratif.</p>
            <StyledButton onClick={() => alert("Cette fonctionnalité de prise de rendez-vous est une simulation.")} variant="primary">
                Prendre rendez-vous (simulation)
            </StyledButton>
        </div>
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full text-gray-500 bg-gray-100/70 hover:bg-gray-200 focus:outline-none"
          aria-label="Fermer"
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>
       <style>{`
        @keyframes modalShowAnim { to { opacity: 1; transform: scale(1); } }
        .animate-modalShow { opacity: 0; transform: scale(0.95); }
        .prose li { margin-top: 0.25em; margin-bottom: 0.25em; }
      `}</style>
    </div>
  );
};

export default SpecialistProfileModal;