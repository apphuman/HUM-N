import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StyledButton from '../components/StyledButton';
import LoadingSpinner from '../components/LoadingSpinner';
import { WorkshopTheme, UserProfile, ChatMessage, ParticipantProfileInfo, LiveWorkshopGlobalState, WorkshopSummaryData, ContextMenuState } from '../types';
import { getLevelFromXP, EMOTIONAL_XP_TYPES, EMOJI_REACTION_OPTIONS, getGenderedStrings } from '../constants'; 
import Avatar from '../components/Avatar';
import ParticipantProfileModal from '../components/ParticipantProfileModal';
import WorkshopSummaryModal from '../components/WorkshopSummaryModal'; 
import AvatarContextMenu from '../components/AvatarContextMenu'; 
import { ArrowLeftIcon, CheckIcon, XIcon, EmojiHappyIcon, PaperAirplaneIcon, SparklesIcon } from '../components/icons';


interface LiveWorkshopPageProps {
  userProfile: UserProfile; 
  liveWorkshopState: LiveWorkshopGlobalState | null;
  onStartOrResumeWorkshop: (workshopId: string, workshopDetails: WorkshopTheme, currentUserProfile: UserProfile) => Promise<void>;
  onSendMessage: (messageText: string, currentUserProfile: UserProfile) => void;
  onContinueDiscussion: (currentUserProfile: UserProfile) => Promise<void>;
  onAwardXPToAI: (aiParticipantName: string, xpType: string, amount: number, awardingUserProfile: UserProfile) => void;
  onPrepareFinishWorkshop: () => void; 
  onClearFinishedWorkshop: (workshopId?: string) => void; 
  workshopSummaryData: WorkshopSummaryData | null;
  isGeneratingSummary: boolean;
  allCurrentlyAvailableWorkshops: WorkshopTheme[]; 
  onSystemEvent: (eventType: "ANNOUNCE_ENDING_SOON" | "PROPOSE_CLOSURE_INACTIVITY", workshopId: string, userProfile: UserProfile) => void;
  onMessageReaction: (workshopId: string, messageId: string, emoji: string) => void;
}

const TypingIndicator: React.FC<{ name: string, profile?: ParticipantProfileInfo }> = ({ name, profile }) => (
    <div className="flex items-center gap-2.5 p-2 animate-fadeIn-slideUp">
        {profile && <Avatar name={name} gender={profile.gender} imageUrl={profile.avatarUrl} isAI className="w-8 h-8 flex-shrink-0" />}
        <div className="flex items-center space-x-1 p-3 bg-white rounded-xl rounded-bl-none shadow-sm border border-gray-200">
            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse"></div>
            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse animation-delay-200"></div>
            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse animation-delay-400"></div>
        </div>
    </div>
);


const LiveWorkshopPage: React.FC<LiveWorkshopPageProps> = ({ 
  userProfile, 
  liveWorkshopState,
  onStartOrResumeWorkshop,
  onSendMessage,
  onAwardXPToAI,
  onPrepareFinishWorkshop,
  onClearFinishedWorkshop,
  workshopSummaryData,
  isGeneratingSummary,
  allCurrentlyAvailableWorkshops,
  onSystemEvent,
  onMessageReaction
}) => {
  const { workshopId } = useParams<{ workshopId: string }>();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedParticipantForModal, setSelectedParticipantForModal] = useState<ParticipantProfileInfo | null>(null);
  const [profileModalDisplayMode, setProfileModalDisplayMode] = useState<'profileOnly' | 'xpOnly' | 'full'>('full');
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [contextMenuState, setContextMenuState] = useState<ContextMenuState | null>(null);
  const [showFinishConfirmation, setShowFinishConfirmation] = useState(false);
  const [showEmojiPickerFor, setShowEmojiPickerFor] = useState<string | null>(null);

  const gendered = getGenderedStrings(userProfile.gender);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(scrollToBottom, [liveWorkshopState?.messages, liveWorkshopState?.typingParticipantName]);

  useEffect(() => {
    if (workshopId && userProfile && allCurrentlyAvailableWorkshops) {
        const currentWorkshopDetails = allCurrentlyAvailableWorkshops.find(w => w.id === workshopId);
        if (currentWorkshopDetails) {
            if (!liveWorkshopState || liveWorkshopState.workshopId !== workshopId || !liveWorkshopState.chatSession || !liveWorkshopState.workshopDetails) {
                 onStartOrResumeWorkshop(workshopId, currentWorkshopDetails, userProfile);
            }
        } else {
            console.warn(`Workshop with ID ${workshopId} not found in available list. User profile: ${userProfile.firstName}, Current live workshop ID: ${userProfile.currentLiveWorkshopId}`);
            if (userProfile.currentLiveWorkshopId !== workshopId || !allCurrentlyAvailableWorkshops.some(w => w.id === workshopId)) {
                navigate('/ateliers');
            }
        }
    } else if (!workshopId) {
        navigate('/ateliers'); 
    }
  }, [workshopId, userProfile, allCurrentlyAvailableWorkshops, liveWorkshopState, onStartOrResumeWorkshop, navigate]);

  useEffect(() => {
    if (isGeneratingSummary || workshopSummaryData) {
      setIsSummaryModalOpen(true);
    } else {
      setIsSummaryModalOpen(false);
    }
  }, [isGeneratingSummary, workshopSummaryData]);

   useEffect(() => {
    if (!liveWorkshopState || !liveWorkshopState.chatSession || !userProfile || liveWorkshopState.isLoading || !workshopId) {
        return;
    }

    const intervalId = setInterval(() => {
        const state = liveWorkshopState; 

        if (
            state.workshopScheduledEndTime &&
            !state.isWorkshopEndingAnnounced &&
            Date.now() > state.workshopScheduledEndTime - 2 * 60 * 1000 && 
            Date.now() < state.workshopScheduledEndTime 
        ) {
            onSystemEvent("ANNOUNCE_ENDING_SOON", state.workshopId, userProfile);
        }

        if (
            state.lastUserMessageTimestamp &&
            !state.isClosureProposedDueToInactivity &&
            (Date.now() - state.lastUserMessageTimestamp > 5 * 60 * 1000)
        ) {
            onSystemEvent("PROPOSE_CLOSURE_INACTIVITY", state.workshopId, userProfile);
        }

    }, 30 * 1000); 

    return () => clearInterval(intervalId);
  }, [liveWorkshopState, userProfile, workshopId, onSystemEvent]);


  const handleAvatarClick = (event: React.MouseEvent, participantName: string, isUserParticipant: boolean) => {
    event.stopPropagation(); 
    const targetElement = event.currentTarget as HTMLElement;
    const rect = targetElement.getBoundingClientRect();
    
    let yPosition = rect.bottom + window.scrollY + 5; 
    const spaceBelow = window.innerHeight - rect.bottom;
    const menuHeightEstimate = 100; 
    if (spaceBelow < menuHeightEstimate && rect.top > menuHeightEstimate) {
        yPosition = rect.top + window.scrollY - menuHeightEstimate - 5; 
    }

    setContextMenuState({
        isOpen: true,
        participantName,
        isAI: !isUserParticipant,
        x: rect.left + window.scrollX, 
        y: yPosition, 
        targetElement: targetElement,
        displayModeSuggestion: 'profileOnly', 
    });
  };
  
  const handleOpenXPAwardModal = (participantName: string) => {
    const participantToAward = liveWorkshopState?.aiParticipantProfiles[participantName];
    if (participantToAward) {
      setSelectedParticipantForModal(participantToAward);
      setProfileModalDisplayMode('xpOnly');
      setIsProfileModalOpen(true);
    }
  };

  const closeContextMenu = () => {
    setContextMenuState(null);
  };

  const handleOpenProfileFromContextMenu = () => {
    if (!contextMenuState) return;
    const participantName = contextMenuState.participantName;
    const isUserClicked = participantName === userProfile?.firstName;
    closeContextMenu(); 

    let participantToShow: ParticipantProfileInfo | null = null;

    if (isUserClicked && userProfile) {
      participantToShow = {
        name: userProfile.firstName,
        totalXP: userProfile.totalXP,
        currentLevel: getLevelFromXP(userProfile.totalXP),
        isAI: false,
        workshopsAttended: 0, 
        badges: [], 
        activityStatus: "Actif",
        avatarSeed: userProfile.firstName, 
        gender: userProfile.gender,
        avatarUrl: userProfile.profilePicture,
        awardedXpCounts: {}, 
      };
    } else if (!isUserClicked && liveWorkshopState?.aiParticipantProfiles[participantName]) {
      participantToShow = liveWorkshopState.aiParticipantProfiles[participantName];
    }

    if (participantToShow) {
      setSelectedParticipantForModal(participantToShow);
      setProfileModalDisplayMode('profileOnly');
      setIsProfileModalOpen(true);
    } else {
        console.warn("LiveWorkshopPage: Could not find participant data for profile modal:", participantName);
    }
  };


  const handleSendMessageWrapper = async () => {
    if (!newMessage.trim() || !userProfile || liveWorkshopState?.isLoading) return;
    const messageText = newMessage;
    setNewMessage('');
    onSendMessage(messageText, userProfile);
  };

  const handleFinishWorkshopClick = () => {
    setShowFinishConfirmation(true);
  };
  
  const confirmFinishWorkshop = () => {
    setShowFinishConfirmation(false);
    onPrepareFinishWorkshop(); 
  };

  const cancelFinishWorkshop = () => {
    setShowFinishConfirmation(false);
  };


  const handleCloseSummaryModalAndArchive = () => {
    setIsSummaryModalOpen(false);
    const idToClear = liveWorkshopState?.workshopId || workshopId;
    if(idToClear) { 
      onClearFinishedWorkshop(idToClear);
    }
    navigate('/ateliers'); 
  };

  const handleEmojiReact = (messageId: string, emoji: string) => {
    if(liveWorkshopState?.workshopId) {
      onMessageReaction(liveWorkshopState.workshopId, messageId, emoji);
    }
    setShowEmojiPickerFor(null);
  }

  const currentWorkshopDetailsFromState = liveWorkshopState?.workshopId === workshopId ? liveWorkshopState.workshopDetails : null;
  const currentMessages = liveWorkshopState?.workshopId === workshopId ? liveWorkshopState.messages : [];
  const isLoadingFromState = (liveWorkshopState?.workshopId === workshopId && liveWorkshopState.isLoading) || 
                             (workshopId && !currentWorkshopDetailsFromState && !liveWorkshopState?.error); 
  const error = liveWorkshopState?.workshopId === workshopId ? liveWorkshopState.error : null;
  const typingParticipantName = liveWorkshopState?.workshopId === workshopId ? liveWorkshopState.typingParticipantName : null;
  const typingParticipantProfile = typingParticipantName ? liveWorkshopState?.aiParticipantProfiles[typingParticipantName] : undefined;
  const currentAiParticipants = liveWorkshopState?.workshopId === workshopId ? liveWorkshopState.aiParticipants : [];
  const workshopTitleFromState = currentWorkshopDetailsFromState?.title || liveWorkshopState?.workshopTitle || "Atelier en Direct";
  const chatSessionAvailable = liveWorkshopState?.workshopId === workshopId && liveWorkshopState?.chatSession;

  const Message: React.FC<{msg: ChatMessage}> = ({msg}) => {
    const isUser = msg.isUser;
    
    if (msg.sender === 'Système') {
       return (
          <div className="text-center my-3">
              <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-xs font-medium">{msg.text}</span>
          </div>
       );
    }
  
    const aiProfile = !isUser ? liveWorkshopState?.aiParticipantProfiles[msg.sender] : null;
  
    return (
      <div className={`flex items-end gap-2.5 my-2 ${isUser ? 'justify-end' : ''}`}>
        {!isUser && aiProfile && (
          <Avatar onClick={(e) => handleAvatarClick(e, msg.sender, false)} name={msg.sender} gender={aiProfile.gender} imageUrl={aiProfile.avatarUrl} isAI className="w-8 h-8 flex-shrink-0" />
        )}
        <div className={`group flex flex-col gap-1 max-w-[80%] sm:max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`relative p-3 rounded-xl ${isUser ? 'bg-orange-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-200'}`}>
            {!isUser && <p className="text-xs font-bold text-orange-600 mb-1">{msg.sender}</p>}
            <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
          </div>
          <span className="text-xs text-gray-400 px-1">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        {isUser && (
          <Avatar onClick={(e) => handleAvatarClick(e, userProfile.firstName, true)} name={userProfile.firstName} gender={userProfile.gender} imageUrl={userProfile.profilePicture} className="w-8 h-8 flex-shrink-0" />
        )}
      </div>
    );
  };
  

  const renderPageContent = () => {
    if (!currentWorkshopDetailsFromState && !liveWorkshopState?.error && (!liveWorkshopState || liveWorkshopState.messages.length === 0)) { 
        return <div className="flex flex-col items-center justify-center h-full pt-10"><LoadingSpinner /><p className="mt-2 text-gray-500">Préparation de l'atelier...</p></div>;
    }
    if (!currentWorkshopDetailsFromState && !isLoadingFromState && !error) { 
        return (
        <div className="p-6 text-center">
            <p className="text-gray-600">Les détails de cet atelier n'ont pu être chargés.</p>
            <StyledButton onClick={() => navigate('/ateliers')} className="mt-4">Retour aux ateliers</StyledButton>
        </div>
        );
    }
    
    if (error && (!liveWorkshopState || !chatSessionAvailable)) { 
        return (
            <div className="p-6">
                <p className="text-red-500">{error}</p>
                <p className="text-sm text-gray-600 mt-2">Impossible de charger l'atelier pour le moment.</p>
            </div>
        );
    }

    return (
      <div className="flex flex-col flex-grow overflow-hidden h-full">
        <div className="flex-grow overflow-y-auto p-4 space-y-2 bg-gray-100" data-main-scroll-container="true">
          {currentMessages.map((msg) => <Message key={msg.id} msg={msg} />)}
          {typingParticipantName && <TypingIndicator name={typingParticipantName} profile={typingParticipantProfile} />}
          {isLoadingFromState && currentMessages.length === 0 && <div className="flex justify-center pt-8"><LoadingSpinner /></div>}
          <div ref={messagesEndRef} />
        </div>
        
        {error && chatSessionAvailable && <p className="p-2 text-sm text-red-500 bg-red-100/50 border-t border-red-200/50">{error}</p>}

        <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoadingFromState && chatSessionAvailable && handleSendMessageWrapper()}
              placeholder="Votre message..."
              className="flex-grow p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 text-sm bg-white text-gray-800"
              disabled={isLoadingFromState || !chatSessionAvailable || !!typingParticipantName}
              aria-label="Écrire un message"
            />
            <StyledButton 
                onClick={handleSendMessageWrapper} 
                disabled={isLoadingFromState || !newMessage.trim() || !chatSessionAvailable || !!typingParticipantName} 
                aria-label="Envoyer le message"
                size="md"
                className="rounded-full !p-3 aspect-square"
            >
              <PaperAirplaneIcon className="w-5 h-5"/>
            </StyledButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Fixed Header */}
      <div className="flex-shrink-0 bg-white shadow-md z-30 border-b border-gray-200">
        <div className="flex justify-between items-center px-4 h-16">
          <div className="flex items-center gap-3 overflow-hidden">
            <h1 className="text-lg font-bold text-gray-800 truncate">
              {workshopTitleFromState}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2 overflow-hidden items-center">
              {currentAiParticipants.map(name => {
                const profile = liveWorkshopState?.aiParticipantProfiles[name];
                return profile ? <Avatar key={name} name={name} gender={profile.gender} imageUrl={profile.avatarUrl} isAI size="sm" className="w-7 h-7 inline-block rounded-full ring-2 ring-white" title={name} /> : null;
              })}
              <Avatar name={userProfile.firstName} gender={userProfile.gender} imageUrl={userProfile.profilePicture} size="sm" className="w-7 h-7 inline-block rounded-full ring-2 ring-orange-400" title={`${userProfile.firstName} (Vous)`} />
            </div>
            {chatSessionAvailable ? (
              <StyledButton 
                variant="primary" 
                size="sm" 
                onClick={handleFinishWorkshopClick} 
                disabled={isGeneratingSummary || workshopSummaryData !== null || !chatSessionAvailable || showFinishConfirmation}
              >
                Terminer
              </StyledButton>
            ) : (
              <StyledButton variant="outline" size="sm" onClick={handleCloseSummaryModalAndArchive}>
                <ArrowLeftIcon className="w-4 h-4 mr-1.5"/>Quitter
              </StyledButton>
            )}
          </div>
        </div>
      </div>
      
      {showFinishConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center p-4 z-[600]">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirmation</h3>
            <p className="text-sm text-gray-600 mb-6">Es-tu {gendered.sur} de vouloir terminer et archiver cet atelier ? Tu ne pourras plus y envoyer de messages.</p>
            <div className="flex justify-end space-x-3">
              <StyledButton onClick={cancelFinishWorkshop} variant="secondary" size="sm">
                <XIcon className="w-4 h-4 mr-1.5" /> Annuler
              </StyledButton>
              <StyledButton onClick={confirmFinishWorkshop} variant="danger" size="sm">
                <CheckIcon className="w-4 h-4 mr-1.5" /> Terminer
              </StyledButton>
            </div>
          </div>
        </div>
      )}
      
      {renderPageContent()}

      {selectedParticipantForModal && (
        <ParticipantProfileModal
            isOpen={isProfileModalOpen}
            onClose={() => setIsProfileModalOpen(false)}
            participant={selectedParticipantForModal}
            onAwardXPToAI={ (aiName, xpType, amount) => onAwardXPToAI(aiName, xpType, amount, userProfile)}
            xpActivatedForWorkshop={currentWorkshopDetailsFromState?.xpActivated || []}
            displayMode={profileModalDisplayMode}
        />
      )}
      {isSummaryModalOpen && (
        <WorkshopSummaryModal
            isOpen={isSummaryModalOpen}
            onClose={handleCloseSummaryModalAndArchive}
            summaryData={workshopSummaryData}
            isLoading={isGeneratingSummary}
            workshopTitle={workshopTitleFromState}
        />
      )}
       {contextMenuState && contextMenuState.isOpen && (
        <AvatarContextMenu
          menuState={contextMenuState}
          onClose={closeContextMenu}
          onViewProfile={handleOpenProfileFromContextMenu}
        />
      )}
    </div>
  );
};

export default LiveWorkshopPage;