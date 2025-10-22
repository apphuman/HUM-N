


import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import StyledButton from '../components/StyledButton';
import { ArrowLeftIcon, PaperAirplaneIcon } from '../components/icons';
import { UserProfile, SoloWorkshopState, ChatMessage } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import Avatar from '../components/Avatar';

interface SupportChatPageProps {
  userProfile: UserProfile;
  supportChatState: SoloWorkshopState | null;
  onStartSupportChat: (user: UserProfile) => void;
  onSendSupportMessage: (messageText: string, user: UserProfile) => void;
}

const SupportChatPage: React.FC<SupportChatPageProps> = ({
  userProfile,
  supportChatState,
  onStartSupportChat,
  onSendSupportMessage,
}) => {
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (userProfile && !supportChatState) {
      onStartSupportChat(userProfile);
    }
  }, [userProfile, supportChatState, onStartSupportChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [supportChatState?.messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !userProfile || supportChatState?.isLoading) return;
    onSendSupportMessage(newMessage.trim(), userProfile);
    setNewMessage('');
  };

  const renderMessage = (msg: ChatMessage) => {
    const isUser = msg.sender === userProfile.firstName;
    const isSystemError = msg.sender === 'Système';
    return (
      <div key={msg.id} className={`flex items-end space-x-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
        {!isUser && !isSystemError && (
          <Avatar 
            name="Humānia"
            imageUrl="https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1"
            isAI={true}
            className="self-end mb-1"
          />
        )}
        <div className={`max-w-[85%] p-3 rounded-xl shadow-sm ${
          isUser 
            ? 'bg-orange-500 text-white rounded-br-none' 
            : isSystemError
                ? 'bg-red-100 text-red-800 border border-red-200 w-full text-center'
                : 'bg-white text-gray-700 border border-gray-200 rounded-bl-none'
          }`}>
          {isSystemError && <p className="font-bold mb-1 text-sm">Erreur Système</p>}
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

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-white flex-shrink-0">
        <div>
          <h1 className="text-lg font-bold text-gray-800">Aide & Support</h1>
          <p className="text-xs text-gray-500">En conversation avec Humānia</p>
        </div>
        <StyledButton onClick={() => navigate(-1)} variant="secondary" size="sm" className="p-2">
            <ArrowLeftIcon className="w-5 h-5" />
        </StyledButton>
      </div>

      {/* Chat Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4" data-main-scroll-container="true">
        {!supportChatState || (supportChatState.messages.length === 0 && supportChatState.isLoading) ? (
            <div className="flex justify-center items-center h-full"><LoadingSpinner /></div>
        ) : (
            supportChatState.messages.map(renderMessage)
        )}
        
        {supportChatState?.isLoading && (
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
      <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
        <div className="flex items-center space-x-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
            placeholder="Posez votre question à Humānia..."
            className="form-textarea flex-grow p-3 resize-none"
            rows={1}
            disabled={supportChatState?.isLoading}
            style={{ overflowY: 'hidden', height: 'auto', minHeight: '44px' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = `${target.scrollHeight}px`;
            }}
          />
          <StyledButton
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || supportChatState?.isLoading}
            className="px-3"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </StyledButton>
        </div>
      </div>
    </div>
  );
};

export default SupportChatPage;