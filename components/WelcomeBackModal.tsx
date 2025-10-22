import React from 'react';
import StyledButton from './StyledButton';
import { FictionalSpecialistProfile, UserProfile, AppFeatureUpdate } from '../types';
import { SparklesIcon, UsersIcon, BellIcon, XIcon } from './icons';
import { getGenderedStrings } from '../constants';

interface WelcomeBackModalProps {
  isOpen: boolean;
  onClose: () => void;
  userFirstName: string;
  userGender: UserProfile['gender'];
  data: {
    newWorkshopsCount: number;
    specialist: FictionalSpecialistProfile | null;
    newFeatures?: AppFeatureUpdate[];
  };
  onOpenSpecialistProfile: (specialist: FictionalSpecialistProfile) => void;
}

const WelcomeBackModal: React.FC<WelcomeBackModalProps> = ({ isOpen, onClose, userFirstName, userGender, data, onOpenSpecialistProfile }) => {
  if (!isOpen) return null;

  const gendered = getGenderedStrings(userGender);
  const communityEchos = Math.floor(Math.random() * 200) + 150;
  const communityWorkshops = Math.floor(Math.random() * 10) + 8;

  const handleOpenProfile = () => {
    if (data.specialist) {
      onOpenSpecialistProfile(data.specialist);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-[900]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-back-title"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalShow flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ animationName: 'modalShowAnim', animationDuration: '0.3s', animationFillMode: 'forwards', maxHeight: 'calc(100vh - 4rem)' }}
      >
        <div className="p-6 text-center border-b border-gray-200">
          <h2 id="welcome-back-title" className="text-2xl font-bold text-gray-800">
            {gendered.heureux.charAt(0).toUpperCase() + gendered.heureux.slice(1)} de te revoir, {userFirstName} !
          </h2>
          <p className="text-sm text-gray-500 mt-1">Voici ce qu'il s'est passé pendant ton absence.</p>
        </div>
        
        <div className="p-6 flex-grow overflow-y-auto space-y-6">
          {/* Section "Quoi de neuf ?" */}
          {data.newFeatures && data.newFeatures.length > 0 && (
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <h3 className="font-semibold text-indigo-800 mb-3 flex items-center">
                <SparklesIcon className="w-5 h-5 mr-2 text-indigo-500" /> Quoi de neuf dans l'application ?
              </h3>
              <ul className="space-y-3">
                {data.newFeatures.map((feature, index) => {
                  const Icon = feature.icon || SparklesIcon;
                  return (
                    <li key={index} className="flex items-start text-sm text-indigo-700">
                      <Icon className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold">{feature.title}</span>: {feature.description}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Section "Pendant votre absence" */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-3 flex items-center"><UsersIcon className="w-5 h-5 mr-2 text-gray-500" /> Pendant votre absence...</h3>
            <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-start">
                    <SparklesIcon className="w-4 h-4 mr-2 text-orange-400 flex-shrink-0 mt-0.5" />
                    {data.newWorkshopsCount > 0 ? (
                        <span><strong>{data.newWorkshopsCount}</strong> {data.newWorkshopsCount > 1 ? 'ateliers ont été ajoutés' : 'atelier a été ajouté'}.</span>
                    ) : (
                        <span>Pas d'ateliers ajoutés.</span>
                    )}
                </p>
                <p className="flex items-start">
                    <UsersIcon className="w-4 h-4 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Plus de <strong>{communityWorkshops} ateliers</strong> ont eu lieu.</span>
                </p>
                <p className="flex items-start">
                    <BellIcon className="w-4 h-4 mr-2 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>La communauté a partagé <strong>{communityEchos} échos</strong>.</span>
                </p>
            </div>
          </div>

          {/* Publicité Spécialiste */}
          {data.specialist && (
            <div className="p-4 border-2 border-dashed border-amber-300 bg-amber-50 rounded-lg">
              <p className="text-xs font-semibold text-amber-600 text-center mb-3">MISE EN AVANT</p>
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                <img src={data.specialist.imageUrl} alt={`Profil de ${data.specialist.name}`} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md flex-shrink-0" />
                <div className="flex-grow">
                  <h4 className="font-bold text-gray-800">{data.specialist.name}</h4>
                  <p className="text-sm font-medium text-amber-700">{data.specialist.title}</p>
                  <p className="text-xs text-gray-500 mt-1 italic line-clamp-2">"{data.specialist.bio.substring(0, 100)}..."</p>
                  <StyledButton onClick={handleOpenProfile} variant="outline" size="sm" className="mt-3">
                    Découvrir son profil
                  </StyledButton>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl text-center">
          <StyledButton onClick={onClose} variant="primary">
            Continuer mon parcours
          </StyledButton>
        </div>
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full text-gray-400 hover:bg-gray-200 focus:outline-none"
          aria-label="Fermer"
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>
       <style>{`
        @keyframes modalShowAnim { to { opacity: 1; transform: scale(1); } }
        .animate-modalShow { opacity: 0; transform: scale(0.95); }
      `}</style>
    </div>
  );
};

export default WelcomeBackModal;
