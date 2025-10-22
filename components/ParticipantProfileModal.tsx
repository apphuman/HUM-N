import React from 'react';
import { ParticipantProfileInfo, Badge, ParticipantProfileModalProps } from '../types'; 
import StyledButton from './StyledButton';
import {
  UsersIcon,
  AdjustmentsHorizontalIcon,
  ClockIcon,
  SparklesIcon,
  StarIcon,
  BriefcaseIcon,
  ClipboardListIcon,
  ChatAlt2Icon,
  AcademicCapIcon,
  SearchIcon,
  CalendarIcon,
  BellIcon,
  CheckIcon
} from './icons';
import { EMOTIONAL_XP_TYPES, getGenderedStrings } from '../constants'; 
import Avatar from './Avatar';

const DetailRow: React.FC<{ icon: React.FC<any>; label: string; value: React.ReactNode }> = ({ icon: Icon, label, value }) => (
  <div className="flex items-start space-x-4 py-3 border-b border-gray-100 last:border-b-0">
    <div className="flex-shrink-0 bg-amber-50 p-1.5 rounded-full mt-0.5">
        <Icon className="w-5 h-5 text-amber-500" />
    </div>
    <div className="text-sm flex-grow">
      <p className="text-gray-500">{label}</p>
      <p className="text-gray-800 font-semibold">{value}</p>
    </div>
  </div>
);

const BadgeItemModal: React.FC<{ badge: Badge }> = ({ badge }) => {
  const isConnectBadge = badge.name.toLowerCase().includes('connecter');

  return (
    <div className="inline-flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm w-fit">
      {isConnectBadge ? <ChatAlt2Icon className="w-5 h-5 text-purple-500" /> : <span className="text-xl">{badge.icon}</span>}
      <h5 className="text-sm font-semibold text-gray-700">{badge.name}</h5>
    </div>
  );
};


const ParticipantProfileModal: React.FC<ParticipantProfileModalProps> = ({ 
    isOpen, 
    onClose, 
    participant, 
    onAwardXPToAI,
    xpActivatedForWorkshop = [],
    displayMode = 'full',
    followedParticipantNames = [],
    onFindInWorkshop,
    onSubscribeToNextWorkshop,
    onUnfollowParticipant,
}) => {
  if (!isOpen || !participant) {
    return null;
  }

  // Award XP logic
  const handleAwardSpecificXP = (xpTypeName: string) => {
    if (participant.isAI && onAwardXPToAI) {
      onAwardXPToAI(participant.name, xpTypeName, 1); 
    }
  };

  const getEmotionalXpIcon = (xpName: string) => {
    const foundType = EMOTIONAL_XP_TYPES.find(type => type.name === xpName);
    return foundType ? foundType.icon : <StarIcon className="w-4 h-4 mr-1.5" />;
  }

  const showProfileDetails = displayMode === 'full' || displayMode === 'profileOnly' || displayMode === 'feed';
  const showXPAwardSection = displayMode === 'xpOnly';
  const isFollowing = followedParticipantNames?.includes(participant.name);

  // Choose icon based on level name
  let levelIcon;
  switch (participant.currentLevel.name) {
    case 'Builder': levelIcon = AdjustmentsHorizontalIcon; break;
    // can add more cases here for other levels
    default: levelIcon = AcademicCapIcon;
  }
  
  const gendered = getGenderedStrings(participant.gender || 'prefer_not_to_say');

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-[500]"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="participant-profile-title"
    >
      <div 
        className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-sm mx-auto transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalShow flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ animationName: 'modalShowAnim', animationDuration: '0.3s', animationFillMode: 'forwards', maxHeight: 'calc(100vh - 4rem)' }}
      >
        {/* Header */}
        <div className="p-5 bg-white rounded-t-2xl">
          <div className="flex items-center space-x-4">
             <Avatar 
                name={participant.name} 
                gender={participant.gender} 
                isAI={participant.isAI} 
                className="w-14 h-14"
                imageUrl={participant.avatarUrl}
            />
            <div>
              <h2 id="participant-profile-title" className="text-xl font-bold text-gray-800">{participant.name}</h2>
              <p className="text-sm text-gray-500 capitalize">{participant.isAI ? "Participant IA" : gendered.utilisateur + ' HUMĀN'}</p>
            </div>
          </div>
        </div>
        
        {/* Body */}
        <div className="p-5 flex-grow overflow-y-auto">
            {showProfileDetails && (
                <div className="space-y-4">
                    <div className="bg-white rounded-xl p-2 border border-gray-200/80">
                        <DetailRow icon={levelIcon} label="Niveau" value={participant.currentLevel.name} />
                        <DetailRow icon={ClipboardListIcon} label="Ateliers Participés" value={participant.workshopsAttended !== undefined ? `${participant.workshopsAttended} atelier(s)` : 'N/A'} />
                        <DetailRow icon={ClockIcon} label="Statut d'Activité" value={participant.activityStatus || 'N/A'} />
                        {participant.profession && (
                            <DetailRow icon={BriefcaseIcon} label="Profession" value={participant.profession} />
                        )}
                        {participant.hobbies && participant.hobbies.length > 0 && (
                            <DetailRow icon={StarIcon} label="Hobbies" value={participant.hobbies.join(', ')} />
                        )}
                    </div>
                    
                    {participant.biography && (
                        <div className="bg-white rounded-xl p-4 border border-gray-200/80">
                           <p className="text-sm font-semibold text-gray-500 mb-2">Bio</p>
                            <blockquote className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg border-l-4 border-amber-300 italic">
                                {participant.biography}
                            </blockquote>
                        </div>
                    )}

                    <div className="bg-white rounded-xl p-4 border border-gray-200/80">
                        <p className="text-sm text-gray-500 mb-2">Badges</p>
                        {participant.badges && participant.badges.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {participant.badges.map(badge => <BadgeItemModal key={badge.id} badge={badge} />)}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-600">Aucun badge pour le moment.</p>
                        )}
                    </div>
                </div>
            )}
            
            {participant.isAI && onAwardXPToAI && xpActivatedForWorkshop.length > 0 && showXPAwardSection && (
                <div className="bg-white rounded-xl p-4 border border-gray-200/80">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Attribuer des XP à {participant.name} :</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {xpActivatedForWorkshop.map(xpName => {
                            const awardedCount = participant.awardedXpCounts?.[xpName] || 0;
                            const canAward = awardedCount < 1;
                            return (
                                <StyledButton key={xpName} onClick={() => handleAwardSpecificXP(xpName)} variant="outline" size="sm" disabled={!canAward}>
                                    <span className="mr-1.5">{getEmotionalXpIcon(xpName)}</span>
                                    +1 XP {xpName} 
                                    {!canAward && <span className="ml-1 text-xs">({awardedCount}/1)</span>}
                                </StyledButton>
                            );
                        })}
                    </div>
                </div>
            )}

            {displayMode === 'feed' && (
              <div className="bg-white rounded-xl p-4 border border-gray-200/80 mt-4">
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Interactions</h4>
                  <div className="grid grid-cols-1 gap-2">
                      <StyledButton variant="outline" size="sm" onClick={() => onFindInWorkshop?.(participant.name)}>
                          <SearchIcon className="w-4 h-4 mr-2" />
                          Retrouver dans un atelier
                      </StyledButton>
                      {isFollowing ? (
                         <StyledButton variant="secondary" size="sm" onClick={() => onUnfollowParticipant?.(participant.name)}>
                            <CheckIcon className="w-4 h-4 mr-2" />
                            Suivi
                        </StyledButton>
                      ) : (
                        <StyledButton variant="outline" size="sm" onClick={() => onSubscribeToNextWorkshop?.(participant.name)}>
                            <BellIcon className="w-4 h-4 mr-2" />
                            Suivre son activité
                        </StyledButton>
                      )}
                  </div>
              </div>
            )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-gray-200 rounded-b-2xl text-right sticky bottom-0">
          <StyledButton onClick={onClose} variant="secondary" size="md">
            Fermer
          </StyledButton>
        </div>
      </div>
      <style>{`
        @keyframes modalShowAnim { to { opacity: 1; transform: scale(1); } }
        .animate-modalShow { opacity: 0; transform: scale(0.95); }
      `}</style>
    </div>
  );
};

export default ParticipantProfileModal;
