

import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import StyledButton from '../components/StyledButton';
import { UserProfile, PrivateChatMessage } from '../types';
import { ChatBubbleLeftRightIcon } from '../components/icons/ChatBubbleLeftRightIcon';
import Avatar from '../components/Avatar';

interface MessagesListPageProps {
  userProfile: UserProfile | null;
  onMarkAffinityAsRead?: () => void;
}

const MessagesListPage: React.FC<MessagesListPageProps> = ({ userProfile, onMarkAffinityAsRead }) => {
  const navigate = useNavigate();

  if (!userProfile) {
    return <PageContainer title="Mes Messages"><p>Chargement...</p></PageContainer>;
  }

  const aiMatch = userProfile.aiMatch;
  let lastMessage: PrivateChatMessage | null = null;
  if (aiMatch && aiMatch.chatHistory.length > 0) {
    lastMessage = aiMatch.chatHistory[aiMatch.chatHistory.length -1];
  }
  
  const hasUnread = aiMatch?.hasUnreadMessages;

  const handleOpenChat = (matchId: string) => {
    if (onMarkAffinityAsRead) {
        onMarkAffinityAsRead();
    }
    navigate(`/messages/${matchId}`);
  };

  return (
    <PageContainer title="Mes Messages Privés">
      {aiMatch ? (
        <div className="space-y-6">
          <div 
            className={`bg-white p-4 rounded-xl shadow-lg border hover:bg-gray-50 transition-colors cursor-pointer ${hasUnread ? 'border-orange-400' : 'border-gray-200/80'}`}
            onClick={() => handleOpenChat(aiMatch.profile.name)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpenChat(aiMatch.profile.name)}
            aria-label={`Ouvrir la conversation avec ${aiMatch.profile.name}`}
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar 
                  name={aiMatch.profile.name} 
                  gender={aiMatch.profile.gender}
                  imageUrl={aiMatch.profile.avatarUrl}
                  isAI={true} 
                  size="md" 
                />
                {hasUnread && <span className="absolute -top-1 -right-1 block h-3 w-3 rounded-full bg-orange-500 ring-2 ring-white"></span>}
              </div>
              <div className="flex-grow overflow-hidden">
                <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">{aiMatch.profile.name}</h3>
                    {lastMessage && (
                        <span className="text-xs text-gray-400">
                            {new Date(lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    )}
                </div>
                {lastMessage ? (
                  <p className={`text-sm truncate ${hasUnread ? 'text-gray-800 font-semibold' : 'text-gray-500'}`}>
                    {lastMessage.isUser ? `Toi: ${lastMessage.text}` : lastMessage.text}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 italic">Commence la conversation !</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 via-red-50 to-amber-50 p-4 rounded-xl shadow-md border border-orange-200/50">
              <div className="flex items-start space-x-3">
                  <ChatBubbleLeftRightIcon className="w-8 h-8 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                      <h4 className="font-semibold text-orange-700">Comment fonctionnent les messages privés ?</h4>
                      <p className="text-sm text-gray-600 mt-1">
                          Les conversations privées se débloquent lorsque vous développez une affinité avec un autre membre (simulé par IA). Participez aux ateliers et interagissez avec les autres pour voir de nouvelles conversations apparaître ici.
                      </p>
                      <p className="text-xs text-gray-500 mt-2 italic">
                          Ton premier match est débloqué après 3 ateliers complétés.
                      </p>
                  </div>
              </div>
          </div>

        </div>
      ) : (
        <div className="text-center py-10 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <ChatBubbleLeftRightIcon className="w-16 h-16 text-orange-400 mx-auto mb-6" />
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Aucune conversation pour le moment.</h2>
          <p className="text-gray-500 mb-6">
            Lorsque tu "matcheras" avec un membre IA (en complétant 3 ateliers), une conversation privée apparaîtra ici.
          </p>
          <StyledButton onClick={() => navigate('/moi')} variant="outline">
            Voir mon profil et ma progression
          </StyledButton>
        </div>
      )}
    </PageContainer>
  );
};

export default MessagesListPage;