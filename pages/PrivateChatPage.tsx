
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StyledButton from '../components/StyledButton';
import LoadingSpinner from '../components/LoadingSpinner';
import { UserProfile, AIMatchProfile, PrivateChatMessage, PrivateChatSessionState } from '../types';
import Avatar from '../components/Avatar';
import { ArrowLeftIcon, EmojiHappyIcon, PaperAirplaneIcon, UserIcon, LightBulbIcon, SparklesIcon } from '../components/icons';
import ParticipantProfileModal from '../components/ParticipantProfileModal';
import { CHAT_EMOJI_OPTIONS, CONVERSATION_GUIDE } from '../constants';

interface PrivateChatPageProps {
  userProfile: UserProfile | null;
  privateChatState: PrivateChatSessionState | null;
  onStartOrResumeChat: (matchProfile: AIMatchProfile, currentUser: UserProfile) => Promise<void>;
  onSendMessage: (messageText: string, currentUser: UserProfile, matchProfile: AIMatchProfile) => Promise<void>;
  onMarkAffinityAsRead: () => void;
}

const GuideModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  matchName: string;
  resonancePoints?: any[];
}> = ({ isOpen, onClose, userName, matchName, resonancePoints }) => {
  if (!isOpen) return null;
  
  const iceBreakers = resonancePoints?.map(p => p.text.startsWith("Vous avez tous les deux exploré") 
    ? `J'ai vu que nous avons exploré le thème de ${p.text.split('"')[1]}. Qu'en as-tu retiré ?`
    : `J'ai vu que nous partagions la valeur de "${p.text.split('"')[1]}". Qu'est-ce que cela signifie pour toi ?`
  ).slice(0, 2);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-[800]">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 text-center animate-modalShow">
        <LightBulbIcon className="w-12 h-12 text-amber-400 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-gray-800">Un mot d'Humānia</h2>
        <p className="text-sm text-gray-600 mt-2">
          {userName}, une nouvelle connexion est une opportunité. Souviens-toi : sois curieux·se, pas performant·e. L'écoute est un cadeau.
        </p>
        <div className="text-left bg-gray-50 border border-gray-200 rounded-lg p-3 mt-4 space-y-2">
          <p className="text-xs font-semibold text-gray-700">Pour briser la glace :</p>
          {iceBreakers && iceBreakers.length > 0 ? (
            iceBreakers.map((q, i) => <p key={i} className="text-xs italic text-gray-500">"{q}"</p>)
          ) : (
             <p className="text-xs italic text-gray-500">"Qu'est-ce qui t'a amené·e sur HUMĀN ?"</p>
          )}
        </div>
        <StyledButton onClick={onClose} className="mt-5" variant="primary">Commencer la discussion</StyledButton>
      </div>
      <style>{`
        @keyframes modalShowAnim {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-modalShow { animation: modalShowAnim 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};


const PrivateChatPage: React.FC<PrivateChatPageProps> = ({
  userProfile,
  privateChatState,
  onStartOrResumeChat,
  onSendMessage,
  onMarkAffinityAsRead,
}) => {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const aiMatchProfile = userProfile?.aiMatch?.profile;
  const resonancePoints = userProfile?.aiMatch?.resonancePoints;

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(scrollToBottom, [privateChatState?.messages]);

  useEffect(() => {
    if (userProfile && aiMatchProfile && matchId === aiMatchProfile.name) {
      if (!privateChatState || privateChatState.matchId !== matchId || !privateChatState.chatSession) {
        onStartOrResumeChat(aiMatchProfile, userProfile);
      }
      
      if (userProfile.aiMatch?.hasUnreadMessages) {
        onMarkAffinityAsRead();
      }
      
      const isFirstEverInteraction = userProfile.aiMatch?.chatHistory.length === 0;
      const conversationGuideKey = `viewed_guide_${matchId}`;
      if (isFirstEverInteraction && !localStorage.getItem(conversationGuideKey)) {
        setShowGuide(true);
        localStorage.setItem(conversationGuideKey, 'true');
      }

    } else if (userProfile && !aiMatchProfile && matchId) {
      console.warn(`No AI match found for user ${userProfile.firstName} with matchId ${matchId}. Redirecting.`);
      navigate('/messages');
    } else if (!userProfile) {
        navigate('/'); 
    }
  }, [matchId, userProfile, aiMatchProfile, privateChatState, onStartOrResumeChat, navigate, onMarkAffinityAsRead]);
  
  const handleEmojiClick = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setIsEmojiPickerOpen(false);
  };

  const handleSendMessageWrapper = async () => {
    if (!newMessage.trim() || !userProfile || !aiMatchProfile || privateChatState?.isLoading) return;
    const messageText = newMessage;
    setNewMessage('');
    await onSendMessage(messageText, userProfile, aiMatchProfile);
  };

  const isLoading = privateChatState?.matchId === matchId && privateChatState.isLoading;
  const error = privateChatState?.matchId === matchId ? privateChatState.error : null;
  const currentMessages = privateChatState?.matchId === matchId ? privateChatState.messages : userProfile?.aiMatch?.chatHistory || [];
  const typingAIMatchName = privateChatState?.matchId === matchId ? privateChatState.typingAIMatchName : null;
  const chatSessionAvailable = privateChatState?.matchId === matchId && privateChatState?.chatSession;

  if (!userProfile || !aiMatchProfile || matchId !== aiMatchProfile.name) {
    return <div className="p-4 sm:p-6"><LoadingSpinner /></div>;
  }
  
  if (isLoading && currentMessages.length === 0 && !error) {
    return (
        <div className="flex flex-col h-full bg-white">
            <div className="p-3 border-b border-gray-200 flex justify-between items-center flex-shrink-0 bg-white">
                <div className="flex items-center space-x-2">
                    <StyledButton variant="secondary" size="sm" onClick={() => navigate('/messages')} className="p-2"><ArrowLeftIcon className="w-5 h-5" /></StyledButton>
                    <div><h1 className="text-md font-bold text-gray-800 truncate">{aiMatchProfile.name}</h1></div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center h-full"><LoadingSpinner /><p className="mt-2 text-gray-500">Préparation de votre conversation...</p></div>
        </div>
    );
  }
  
  if (error && (!privateChatState || !chatSessionAvailable)) { 
     return (
        <div className="p-4 sm:p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-red-600">Erreur de Conversation</h1>
                <StyledButton variant="outline" size="sm" onClick={() => navigate('/messages')}><ArrowLeftIcon className="w-4 h-4 mr-1.5"/>Retour</StyledButton>
            </div>
            <p className="text-red-500">{error}</p>
            <p className="text-sm text-gray-600 mt-2">Impossible de charger la conversation pour le moment.</p>
        </div>
     );
  }

  return (
    <>
    <GuideModal 
      isOpen={showGuide}
      onClose={() => setShowGuide(false)}
      userName={userProfile.firstName}
      matchName={aiMatchProfile.name}
      resonancePoints={resonancePoints}
    />
    <div className="flex flex-col h-full bg-white">
        {/* Fixed Header */}
        <div className="p-3 border-b border-gray-200 flex justify-between items-center flex-shrink-0 bg-white">
            <div className="flex items-center space-x-2">
                <StyledButton variant="secondary" size="sm" onClick={() => navigate('/messages')} className="p-2">
                    <ArrowLeftIcon className="w-5 h-5" />
                </StyledButton>
                <div>
                    <h1 className="text-md font-bold text-gray-800 truncate">{aiMatchProfile.name}</h1>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs text-green-600 font-semibold flex items-center">
                          <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
                          En ligne
                      </p>
                      <span className="text-xs text-gray-400">•</span>
                      <p className="text-xs text-amber-600 font-semibold flex items-center">
                          <SparklesIcon className="w-3 h-3 mr-1 text-amber-500" />
                          {userProfile.aiMatch?.mutualXPWithMatch} XP mutuels
                      </p>
                    </div>
                </div>
            </div>
            <StyledButton 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsProfileModalOpen(true)}
                title={`Voir le profil de ${aiMatchProfile.name}`}
            >
                <UserIcon className="w-5 h-5"/>
            </StyledButton>
        </div>

        {/* Scrollable message list */}
        <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50" data-main-scroll-container="true">
          {currentMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end space-x-2 ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!msg.isUser && aiMatchProfile && msg.sender !== 'Système' && (
                <Avatar 
                  name={aiMatchProfile.name} 
                  gender={aiMatchProfile.gender}
                  imageUrl={aiMatchProfile.avatarUrl}
                  isAI={true}
                />
              )}
              <div className={`max-w-[70%] p-3 rounded-xl shadow ${
                  msg.isUser
                    ? 'bg-orange-500 text-white rounded-br-none'
                    : msg.isSystem 
                        ? 'bg-blue-100 text-blue-700 border border-blue-200 rounded-bl-none text-center w-full max-w-full'
                        : 'bg-white text-gray-700 border border-gray-200 rounded-bl-none'
                }`}
              >
                {msg.isSystem && (
                  <p className="text-xs font-semibold mb-0.5 text-blue-600">{msg.sender}</p>
                )}
                <p className={`text-sm whitespace-pre-wrap ${msg.isSystem ? 'italic' : ''}`}>{msg.text}</p>
                <p className={`text-xs mt-1 ${
                    msg.isUser ? 'text-orange-200' 
                    : msg.isSystem ? 'text-blue-400' 
                    : 'text-gray-400'
                } text-right`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {msg.isUser && userProfile && (
                 <Avatar 
                    name={userProfile.firstName}
                    gender={userProfile.gender}
                    imageUrl={userProfile.profilePicture}
                    isAI={false}
                />
              )}
            </div>
          ))}
          {isLoading && typingAIMatchName && (
             <div className="flex items-end space-x-2 justify-start">
                <Avatar name={typingAIMatchName} gender={aiMatchProfile.gender} imageUrl={aiMatchProfile.avatarUrl} isAI={true} />
                <div className="max-w-[70%] p-3 rounded-xl shadow bg-gray-200 text-gray-700 rounded-bl-none">
                    <div className="flex items-center">
                        <div className="animate-pulse flex space-x-1">
                            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animation-delay-200"></div>
                            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animation-delay-400"></div>
                        </div>
                        <p className="text-xs font-medium ml-2 text-gray-500">{typingAIMatchName} est en train d'écrire...</p>
                    </div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Fixed Input Area */}
        <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
            <div className="relative flex items-center space-x-2">
            <div className="relative">
                <StyledButton 
                    onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)} 
                    variant="ghost" 
                    size="md" 
                    className="p-2" 
                    aria-label="Ouvrir le sélecteur d'emojis"
                >
                    <EmojiHappyIcon className="w-6 h-6 text-gray-500 hover:text-orange-500" />
                </StyledButton>
                {isEmojiPickerOpen && (
                    <div className="absolute bottom-full mb-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 grid grid-cols-6 gap-1 w-max">
                        {CHAT_EMOJI_OPTIONS.map(emoji => (
                            <button 
                                key={emoji} 
                                onClick={() => handleEmojiClick(emoji)} 
                                className="text-2xl p-1 rounded-md hover:bg-gray-100 transition-colors"
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && chatSessionAvailable && handleSendMessageWrapper()}
              placeholder={!chatSessionAvailable ? "Conversation indisponible..." : "Ton message..."}
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm bg-white text-gray-800"
              disabled={isLoading || !chatSessionAvailable}
              aria-label="Écrire un message"
            />
            <StyledButton 
                onClick={handleSendMessageWrapper} 
                disabled={isLoading || !newMessage.trim() || !chatSessionAvailable} 
                aria-label="Envoyer le message"
                size="md"
                className="px-3"
            >
              <PaperAirplaneIcon className="w-5 h-5"/>
            </StyledButton>
          </div>
        </div>
    </div>
    {isProfileModalOpen && (
        <ParticipantProfileModal
            isOpen={isProfileModalOpen}
            onClose={() => setIsProfileModalOpen(false)}
            participant={aiMatchProfile}
            displayMode="profileOnly"
        />
    )}
    </>
  );
};

export default PrivateChatPage;
