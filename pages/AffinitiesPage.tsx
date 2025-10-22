import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import { UserProfile, ResonancePoint } from '../types'; 
import { ChatBubbleLeftRightIcon, LightBulbIcon, ArrowLeftIcon } from '../components/icons';
import Avatar from '../components/Avatar';
import StyledButton from '../components/StyledButton';
import ParticipantProfileModal from '../components/ParticipantProfileModal';


interface AffinitiesPageProps {
    userProfile: UserProfile | null;
}

const ResonancePoints: React.FC<{ points: ResonancePoint[] }> = ({ points }) => (
    <div className="mt-4 space-y-2 border-t border-gray-200 pt-3">
        {points.map((point, index) => (
            <div key={index} className="flex items-start text-sm text-gray-600">
                <span className="mr-2 mt-0.5">{point.icon}</span>
                <span>{point.text}</span>
            </div>
        ))}
    </div>
);


const AffinitiesPage: React.FC<AffinitiesPageProps> = ({ userProfile }) => {
  const navigate = useNavigate();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  if (!userProfile) {
    return <PageContainer title="Affinités"><p>Chargement du profil...</p></PageContainer>;
  }
  
  const aiMatch = userProfile.aiMatch;
  
  const handleOpenProfile = () => {
    setIsProfileModalOpen(true);
  };


  return (
    <>
    <PageContainer>
        <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Vos Affinités</h1>
            <p className="mt-2 max-w-2xl mx-auto text-md text-gray-500">
                Des connexions basées sur la résonance, pas sur le hasard.
            </p>
        </div>

      {aiMatch ? (
        <div className="space-y-6">
            <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4 rounded-xl shadow-md border border-amber-200/50">
              <div className="flex items-start space-x-3">
                  <div className="bg-white p-1.5 rounded-full mt-1 shadow-sm">
                      <LightBulbIcon className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-800">Le Tri par Humānia</h3>
                    <p className="text-sm text-gray-600 italic mt-1">
                        "Je vous propose cette connexion car je sens des ponts entre vous. Ces 'points de résonance' sont des invitations à explorer ce qui vous relie déjà."
                    </p>
                  </div>
              </div>
            </div>

            <div 
                className="bg-white p-5 rounded-xl shadow-xl border border-gray-200/80 transform hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                onClick={handleOpenProfile}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpenProfile()}
            >
                <div className="flex items-center space-x-4">
                    <Avatar 
                        name={aiMatch.profile.name} 
                        gender={aiMatch.profile.gender}
                        imageUrl={aiMatch.profile.avatarUrl}
                        isAI={true}
                        size="md"
                        className="w-16 h-16"
                    />
                    <div className="flex-grow">
                        <h4 className="font-bold text-xl text-gray-800">{aiMatch.profile.name}{aiMatch.profile.age ? `, ${aiMatch.profile.age} ans` : ''}</h4>
                        <p className="text-sm text-gray-500">{aiMatch.profile.currentLevel.emoji} {aiMatch.profile.currentLevel.name} - {aiMatch.profile.profession}</p>
                    </div>
                    <StyledButton 
                        onClick={(e) => { e.stopPropagation(); navigate(`/messages/${aiMatch.profile.name}`)}} 
                        variant="primary" 
                        size="lg"
                    >
                        <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                        Discuter
                    </StyledButton>
                </div>
                {aiMatch.resonancePoints && aiMatch.resonancePoints.length > 0 && (
                    <ResonancePoints points={aiMatch.resonancePoints} />
                )}
            </div>

        </div>
      ) : (
        <div className="p-6 bg-white/70 border border-gray-200 rounded-lg shadow-md text-center mt-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Continuez d'explorer...</h3>
            <p className="text-gray-500 mb-4 max-w-sm mx-auto">
              Les affinités se créent ici. Participez à des ateliers pour débloquer votre premier lien et voir un profil apparaître ici.
            </p>
        </div>
      )}
      <div className="text-center mt-8">
        <StyledButton variant="secondary" onClick={() => navigate('/explorer')}>
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Retour à l'exploration
        </StyledButton>
      </div>
    </PageContainer>
    {isProfileModalOpen && aiMatch && (
        <ParticipantProfileModal
            isOpen={isProfileModalOpen}
            onClose={() => setIsProfileModalOpen(false)}
            participant={aiMatch.profile}
            displayMode="profileOnly"
        />
    )}
    </>
  );
};

export default AffinitiesPage;