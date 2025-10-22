import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../types';
import StyledButton from './StyledButton';
import Avatar from './Avatar';
import { XIcon, PencilSquareIcon, ClipboardDocumentIcon, CameraIcon } from './icons';

interface BioModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdateProfilePicture: (base64Image: string) => void;
}

const BioModal: React.FC<BioModalProps> = ({ isOpen, onClose, userProfile, onUpdateProfilePicture }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleNavigateToTerritory = () => {
    onClose();
    navigate('/moi/profil');
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onUpdateProfilePicture(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-[800]"
      onClick={onClose}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto flex flex-col animate-modalShow"
        onClick={e => e.stopPropagation()}
        style={{ animationName: 'modalShowAnim', animationDuration: '0.3s', animationFillMode: 'forwards', maxHeight: 'calc(100vh - 4rem)' }}
      >
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center space-x-3">
                <ClipboardDocumentIcon className="w-7 h-7 text-orange-500" />
                <h2 className="text-xl font-bold text-gray-800">Ma Bio & Profil</h2>
            </div>
            <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100">
                <XIcon className="w-5 h-5" />
            </button>
        </div>

        <div className="p-6 flex-grow overflow-y-auto text-center">
            <button
              onClick={handleAvatarClick}
              className="group relative w-24 h-24 mx-auto mb-4 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-400"
              aria-label="Changer la photo de profil"
            >
              <Avatar 
                  name={userProfile.firstName}
                  gender={userProfile.gender}
                  imageUrl={userProfile.profilePicture}
                  className="w-full h-full"
                  isAI={false}
                  isPremium={userProfile.isPremium}
              />
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <CameraIcon className="w-8 h-8 text-white" />
              </div>
            </button>
            <h3 className="text-lg font-semibold text-gray-800">{userProfile.firstName}</h3>

            <div className="mt-4 text-left bg-gray-50 p-4 rounded-lg border border-gray-200 min-h-[100px]">
                {userProfile.biography ? (
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{userProfile.biography}</p>
                ) : (
                    <p className="text-sm text-gray-500 italic text-center py-4">
                        Votre bio n'est pas encore définie. Créez-la à partir de votre Territoire Intérieur.
                    </p>
                )}
            </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl text-right">
            <StyledButton onClick={handleNavigateToTerritory} variant="primary">
                <PencilSquareIcon className="w-5 h-5 mr-2" />
                {userProfile.biography ? 'Modifier mon Territoire & Bio' : 'Créer ma bio'}
            </StyledButton>
        </div>
      </div>
      <style>{`
        @keyframes modalShowAnim { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .animate-modalShow { animation: modalShowAnim 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default BioModal;