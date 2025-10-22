import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StyledButton from '../components/StyledButton';
import { ArrowLeftIcon, PaperAirplaneIcon } from '../components/icons';
import { WorkshopTheme, UserProfile, SoloWorkshopState, ChatMessage } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import Avatar from '../components/Avatar';

// This is a placeholder for the props that will be passed from App.tsx
// It's designed to work with the state management being added in App.tsx
interface SoloWorkshopPageProps {
  userProfile: UserProfile;
  soloWorkshopState: SoloWorkshopState | null;
  onStartOrResumeWorkshop: (workshop: WorkshopTheme, user: UserProfile) => void;
  onSendMessage: (messageText: string, user: UserProfile) => void;
  onEndWorkshop: (workshopId: string) => void;
  allCurrentlyAvailableWorkshops: WorkshopTheme[];
}

const SoloWorkshopPage: React.FC<SoloWorkshopPageProps> = ({
  userProfile,
  soloWorkshopState,
  onStartOrResumeWorkshop,
  onSendMessage,
  onEndWorkshop,
  allCurrentlyAvailableWorkshops,
}) => {
  const { workshopId } = useParams<{ workshopId: string }>();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const workshopDetails = allCurrentlyAvailableWorkshops.find(w => w.id === workshopId);

  useEffect(() => {
    if (workshopDetails && userProfile && (!soloWorkshopState || soloWorkshopState.workshopId !== workshopId)) {
      onStartOrResumeWorkshop(workshopDetails, userProfile);
    }
  }, [workshopId, workshopDetails, userProfile, soloWorkshopState, onStartOrResumeWorkshop]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [soloWorkshopState?.messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !userProfile || soloWorkshopState?.isLoading) return;
    onSendMessage(newMessage.trim(), userProfile);
    setNewMessage('');
  };

  const handleEndWorkshop = () => {
    if (workshopId) {
        onEndWorkshop(workshopId);
    }
    navigate('/ateliers');
  };

  const renderMessage = (msg: ChatMessage) => {
    const isUser = msg.sender === userProfile.firstName;
    return (
      <div key={msg.id} className={`flex items-end space-x-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
        {!isUser && msg.sender !== 'Système' && (
          <Avatar 
            name="Humānia"
            imageUrl="https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1"
            isAI={true}
            className="self-end mb-1"
          />
        )}
        <div className={`max-w-[75%] p-3 rounded-xl shadow-sm ${
          isUser 
            ? 'bg-orange-500 text-white rounded-br-none' 
            : msg.sender === 'Système'
                ? 'bg-green-100 text-green-700 w-full text-center text-xs'
                : 'bg-white text-gray-700 border border-gray-200 rounded-bl-none'
          }`}>
          <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
        </div>
        {isUser && (
          <Avatar 
            name={userProfile.firstName}
            gender={userProfile.gender}
            imageUrl={userProfile.profilePicture}
            isAI={false}
            className="self-end mb-1"
          />
        )}
      </div>
    );
  };
  
  if (!workshopDetails) {
    return (
      <div className="p-4 sm:p-6">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <p>Atelier non trouvé. Il a peut-être été supprimé.</p>
          <StyledButton onClick={() => navigate('/ateliers')} className="mt-4">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Retour aux ateliers
          </StyledButton>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-white sticky top-20 z-10">
        <div>
          <h1 className="text-lg font-bold text-gray-800">{workshopDetails.title}</h1>
          <p className="text-xs text-gray-500">Session d'introspection avec Humānia</p>
        </div>
        <StyledButton onClick={handleEndWorkshop} variant="primary" size="sm">
            {soloWorkshopState?.isCompleted ? "Terminer & Archiver" : "Quitter"}
        </StyledButton>
      </div>

      {/* Chat Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4" data-main-scroll-container="true">
        {!soloWorkshopState || (soloWorkshopState.messages.length === 0 && soloWorkshopState.isLoading) ? (
            <div className="flex justify-center items-center h-full"><LoadingSpinner /></div>
        ) : (
            soloWorkshopState.messages.map(renderMessage)
        )}
        
        {soloWorkshopState?.isLoading && (
          <div className="flex items-end space-x-2 justify-start">
            <Avatar 
              name="Humānia"
              imageUrl="https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1"
              isAI={true}
              className="self-end mb-1"
            />
            <div className="max-w-[70%] p-3 rounded-xl shadow bg-gray-200 text-gray-700 rounded-bl-none">
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse animation-delay-200"></div>
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse animation-delay-400"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      {soloWorkshopState?.isCompleted ? (
        <div className="p-4 border-t border-gray-200 bg-white text-center">
          <p className="text-sm font-semibold text-green-700">Cette session est terminée.</p>
          <p className="text-xs text-gray-500">Vous pouvez maintenant archiver cet atelier en cliquant sur "Terminer & Archiver".</p>
        </div>
      ) : (
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-2">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
              placeholder="Votre réflexion..."
              className="form-textarea flex-grow p-3 resize-none"
              rows={1}
              disabled={soloWorkshopState?.isLoading || soloWorkshopState?.isCompleted}
              style={{ overflowY: 'hidden', height: 'auto', minHeight: '44px' }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = `${target.scrollHeight}px`;
              }}
            />
            <StyledButton
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || soloWorkshopState?.isLoading || soloWorkshopState?.isCompleted}
              className="px-3"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </StyledButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoloWorkshopPage;