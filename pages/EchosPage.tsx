import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import StyledButton from '../components/StyledButton';
import { UserProfile, UserDailySubmission, AudioCapsule, DailyInteraction, AIAnalysisResult, LevelInfo } from '../types'; 
import { 
    ECHOS_SUBMISSIONS_STORAGE_KEY, 
    SPECIFIC_RESONANCE_LOCATIONS, 
    DAILY_RESONANCE_BONUS_AWARDED_KEY_PREFIX, 
    MOCK_AUDIO_CAPSULES_STANDARD,
    MOCK_AUDIO_CAPSULES_PREMIUM,
    ECHOS_QUESTIONS_BY_LEVEL,
    getLevelFromXP,
    DAILY_XP_AWARDED_FOR_SUBMISSION_KEY_PREFIX,
} from '../constants';
import { HeartIcon, EyeIcon, SparklesIcon, StarIcon, InfoIcon, LockClosedIcon, PlayIcon, PauseIcon, MicrophoneIcon, PaperAirplaneIcon, ArrowLeftIcon } from '../components/icons';
import { AudioIcon as PageAudioIcon } from '../components/icons/AudioIcon'; 
import LoadingSpinner from '../components/LoadingSpinner';
import { analyzeEcho } from '../services/geminiService';
import Avatar from '../components/Avatar';

// Speech Recognition setup
// Fix: Cast `window` to `any` to acknowledge non-standard SpeechRecognition properties.
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;
if (recognition) {
  recognition.continuous = false;
  recognition.lang = 'fr-FR';
  recognition.interimResults = false;
}

interface EchosPageProps {
  userProfile: UserProfile | null;
  onUpdateXP: (amount: number, type?: 'totalXP' | 'xpMiroir' | 'emotional', emotionalXPSubTypeKey?: string) => void;
}

interface ResonanceDisplayDetails {
  baseMessage: string;
  xpMessage?: string;
  bonusMessage?: string;
}


const EchosPage: React.FC<EchosPageProps> = ({ userProfile, onUpdateXP }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'aujourdhui' | 'resonance' | 'mesecrits' | 'capsulesaudio'>('aujourdhui');
  
  const [todaysSubmission, setTodaysSubmission] = useState<UserDailySubmission | null>(null);
  const [userSubmissions, setUserSubmissions] = useState<UserDailySubmission[]>([]);
  
  const [isSearchingResonance, setIsSearchingResonance] = useState(false);
  const [resonanceDisplayResult, setResonanceDisplayResult] = useState<ResonanceDisplayDetails | null>(null);

  const [currentInput, setCurrentInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  
  const [audioCapsules, setAudioCapsules] = useState<AudioCapsule[]>([]);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const [isAwaitingContinuation, setIsAwaitingContinuation] = useState(false);

  const todayDateString = new Date().toISOString().split('T')[0];
  const userLevel = userProfile ? getLevelFromXP(userProfile.totalXP) : null;
  const lastInteractionRef = useRef<HTMLDivElement>(null);

  const lastInteraction = todaysSubmission?.interactions[todaysSubmission.interactions.length - 1];
  const isConversationFinished = lastInteraction?.aiAnalysis?.isConclusion === true;
  const isWaitingForUserReply = lastInteraction?.aiAnalysis && !isConversationFinished && !isAwaitingContinuation;


  useEffect(() => {
    lastInteractionRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [todaysSubmission]);

  useEffect(() => {
    setAudioCapsules([...MOCK_AUDIO_CAPSULES_STANDARD, ...MOCK_AUDIO_CAPSULES_PREMIUM]);
  }, []);

  useEffect(() => {
    if (location.state?.initialTab) {
      setActiveTab(location.state.initialTab as 'aujourdhui' | 'resonance' | 'mesecrits' | 'capsulesaudio');
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);


  const loadSubmissions = useCallback(() => {
    try {
      const stored = localStorage.getItem(ECHOS_SUBMISSIONS_STORAGE_KEY);
      const allSubmissions: UserDailySubmission[] = stored ? JSON.parse(stored) : [];
      setUserSubmissions(allSubmissions);
      
      const savedToday = allSubmissions.find(s => s.date === todayDateString);
      if (savedToday) {
        setTodaysSubmission(savedToday);
        const lastAIInteraction = savedToday.interactions[savedToday.interactions.length - 1]?.aiAnalysis;
        if(lastAIInteraction?.shouldPromptForContinuation) {
            setIsAwaitingContinuation(true);
        }
      } else {
        setTodaysSubmission(null);
        setIsAwaitingContinuation(false);
        if (userLevel) {
            const questions = ECHOS_QUESTIONS_BY_LEVEL[userLevel.name] || ECHOS_QUESTIONS_BY_LEVEL.Seeker;
            setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)]);
        }
      }
    } catch (error) {
      console.error("Erreur chargement des soumissions:", error);
    }
  }, [todayDateString, userLevel]);

  useEffect(() => {
    loadSubmissions();
  }, [loadSubmissions]);

  const updateAndSaveSubmissions = (newSubmission: UserDailySubmission) => {
      setTodaysSubmission(newSubmission);
      const updatedSubmissions = [newSubmission, ...userSubmissions.filter(s => s.date !== todayDateString)];
      setUserSubmissions(updatedSubmissions);
      localStorage.setItem(ECHOS_SUBMISSIONS_STORAGE_KEY, JSON.stringify(updatedSubmissions));
  };
  
const handleSendEcho = async (textToSend: string) => {
    if (!textToSend.trim() || !userProfile) return;
    setIsLoadingAI(true);
    setCurrentInput('');

    const dailyXPAwardedKey = `${DAILY_XP_AWARDED_FOR_SUBMISSION_KEY_PREFIX}${todayDateString}`;
    const hasXpBeenAwardedToday = localStorage.getItem(dailyXPAwardedKey) === 'true';

    const isFirstPostOfDay = !todaysSubmission;

    let userInteraction: DailyInteraction;
    if (todaysSubmission) {
        userInteraction = { id: `reply-${Date.now()}`, timestamp: new Date(), userReply: { text: textToSend } };
    } else {
        userInteraction = { id: `echo-${Date.now()}`, timestamp: new Date(), userEcho: { questionPrompt: currentQuestion, text: textToSend } };
    }

    let interactions: DailyInteraction[] = todaysSubmission ? [...todaysSubmission.interactions, userInteraction] : [userInteraction];
    
    let submissionToUpdate: UserDailySubmission = todaysSubmission 
        ? { ...todaysSubmission, interactions }
        : {
            id: `sub-${todayDateString}`,
            date: todayDateString,
            interactions,
            resonancesFound: 0,
            xpMiroirReceived: 0,
          };
    // Save immediately to show user message
    updateAndSaveSubmissions(submissionToUpdate); 

    const userMessageCount = interactions.filter(i => i.userEcho || i.userReply).length;

    const result = await analyzeEcho(textToSend, userProfile.firstName, interactions, userMessageCount, userProfile.isPremium);
    
    if (result.analysis) {
        const aiInteraction: DailyInteraction = { id: `ai-${Date.now()}`, timestamp: new Date(), aiAnalysis: result.analysis };
        submissionToUpdate.interactions.push(aiInteraction);
        
        if(result.analysis.shouldPromptForContinuation) {
            setIsAwaitingContinuation(true);
        }

        let xpAwardedThisTime = false;
        if (!hasXpBeenAwardedToday) {
            // Prioritize emotional XP from the analysis
            if (result.analysis.xpAward) {
                onUpdateXP(result.analysis.xpAward.amount, 'emotional', result.analysis.xpAward.typeKey);
                xpAwardedThisTime = true;
            } 
            // Fallback to engagement XP on the very first post of the day if no emotional XP was given
            else if (isFirstPostOfDay) {
                onUpdateXP(5, 'totalXP');
                const systemXPMessage: DailyInteraction = {
                    id: `system-xp-${Date.now()}`,
                    timestamp: new Date(),
                    aiAnalysis: {
                        themes: ["Engagement Quotidien"],
                        followUpQuestion: "Merci pour ton premier écho du jour ! Tu gagnes +5 XP pour ton engagement. ✨",
                        xpAward: null,
                        isConclusion: false,
                    }
                };
                submissionToUpdate.interactions.push(systemXPMessage);
                xpAwardedThisTime = true;
            }

            if (xpAwardedThisTime) {
                localStorage.setItem(dailyXPAwardedKey, 'true');
            }
        }
    } else {
        console.error("AI analysis failed:", result.error);
        const errorInteraction: DailyInteraction = {
             id: `error-${Date.now()}`,
             timestamp: new Date(),
             aiAnalysis: {
                themes: ["Erreur"],
                followUpQuestion: "Désolé, une erreur est survenue lors de l'analyse. Réessaie plus tard.",
                xpAward: null,
                isConclusion: false,
             }
        };
        submissionToUpdate.interactions.push(errorInteraction);
    }

    // Final save with AI response and potential XP message
    updateAndSaveSubmissions({ ...submissionToUpdate });

    setIsLoadingAI(false);
};

const handleContinueConversation = () => {
    setIsAwaitingContinuation(false);
    handleSendEcho("Je souhaite continuer.");
}

const handleStopConversation = () => {
    if (!todaysSubmission) return;

    const conclusionInteraction: DailyInteraction = {
      id: `conclusion-${Date.now()}`,
      timestamp: new Date(),
      aiAnalysis: {
        themes: ["Conclusion"],
        followUpQuestion: "D'accord, nous nous arrêtons ici pour aujourd'hui. Belle introspection ! ✨",
        xpAward: null,
        isConclusion: true,
        shouldPromptForContinuation: false,
      }
    };
    
    const submissionToUpdate = { ...todaysSubmission, interactions: [...todaysSubmission.interactions, conclusionInteraction]};
    updateAndSaveSubmissions(submissionToUpdate);
    setIsAwaitingContinuation(false);
}

  
  // Microphone logic
  const toggleRecording = () => {
    if (!recognition) return alert("La reconnaissance vocale n'est pas supportée sur ce navigateur.");
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      recognition.start();
      setIsRecording(true);
    }
  };

  useEffect(() => {
    if (!recognition) return;
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setCurrentInput(prev => prev ? `${prev} ${transcript}` : transcript);
      setIsRecording(false);
    };
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };
    recognition.onend = () => {
      setIsRecording(false);
    };
    return () => {
        if (recognition) {
            recognition.onresult = null;
            recognition.onerror = null;
            recognition.onend = null;
        }
    }
  }, []);
  
  const startResonanceSearch = useCallback(() => {
    if (!todaysSubmission) return;
    setIsSearchingResonance(true);
    setResonanceDisplayResult(null);

    setTimeout(() => {
      const numResonances = Math.floor(Math.random() * 15) + 1; 
      const firstEcho = todaysSubmission.interactions.find(i => i.userEcho)?.userEcho;
      
      const randomLocation = SPECIFIC_RESONANCE_LOCATIONS[Math.floor(Math.random() * SPECIFIC_RESONANCE_LOCATIONS.length)];
      
      let xpFromIndividualResonance = 0;
      let displayXpMessage: string | undefined = undefined;
      if (numResonances > 0) {
        const numSendingXP = Math.floor(Math.random() * (Math.min(numResonances, 5) + 1)); 
        if (numSendingXP > 0) {
          xpFromIndividualResonance = numSendingXP; 
          displayXpMessage = `${numSendingXP === 1 ? "L'une d'elles" : `${numSendingXP} d'entre elles`} ${numSendingXP === 1 ? "t'a" : "t'ont"} envoyé +${xpFromIndividualResonance} XP Miroir !`;
        }
      }
      
      let displayBonusMessage: string | undefined = undefined;
      let bonusXPAwardedThisTime = 0;
      const dailyBonusKey = `${DAILY_RESONANCE_BONUS_AWARDED_KEY_PREFIX}${todayDateString}`;
      const hasBonusBeenAwardedToday = localStorage.getItem(dailyBonusKey) === 'true';

      if (numResonances >= 10 && !hasBonusBeenAwardedToday) {
        bonusXPAwardedThisTime = 5;
        displayBonusMessage = `Ton partage a touché beaucoup de monde ! Tu reçois un bonus de +5 XP Miroir !`;
        localStorage.setItem(dailyBonusKey, 'true');
      }
      
      setResonanceDisplayResult({
        baseMessage: `Ton écho du jour a résonné avec ${numResonances} personne(s), notamment ${randomLocation}.`,
        xpMessage: displayXpMessage,
        bonusMessage: displayBonusMessage,
      });
      
      setTimeout(() => {
        if (onUpdateXP) {
            if (xpFromIndividualResonance > 0) onUpdateXP(xpFromIndividualResonance, 'xpMiroir');
            if (bonusXPAwardedThisTime > 0) onUpdateXP(bonusXPAwardedThisTime, 'xpMiroir');
        }
      }, 500);

      const updatedSubmission = {
            ...todaysSubmission, 
            resonancesFound: numResonances, 
            xpMiroirReceived: (todaysSubmission.xpMiroirReceived || 0) + xpFromIndividualResonance + bonusXPAwardedThisTime, 
            resonanceBonusAwarded: todaysSubmission.resonanceBonusAwarded || (bonusXPAwardedThisTime > 0) 
        };
      updateAndSaveSubmissions(updatedSubmission);
      setIsSearchingResonance(false);
    }, 4000); 
  }, [todaysSubmission, onUpdateXP, todayDateString]);

  useEffect(() => {
    if (activeTab === 'resonance' && todaysSubmission && !isSearchingResonance && !resonanceDisplayResult && todaysSubmission.interactions.length > 0) {
      startResonanceSearch();
    }
  }, [activeTab, todaysSubmission, isSearchingResonance, resonanceDisplayResult, startResonanceSearch]);


  const handleSendXPMiroirFeel = () => {
    alert(`Ton écho positif a été envoyé (simulation). La personne concernée gagne +1 XP Miroir grâce à toi !`);
  };

  const handlePlayPauseAudio = (capsuleId: string) => {
    setPlayingAudioId(prevId => (prevId === capsuleId ? null : capsuleId));
  };


  if (!userProfile) {
    return <PageContainer title="Miroir & Résonance"><LoadingSpinner /></PageContainer>;
  }
  
  const renderAujourdhuiTab = () => (
    <div className="flex flex-col h-[calc(100vh-12rem)] sm:h-[calc(100vh-10rem)] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Conversation Area */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4" data-main-scroll-container="true">
            {!todaysSubmission && (
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-gray-700">{currentQuestion}</p>
                </div>
            )}
            {todaysSubmission?.interactions.map((interaction, index) => (
                <div key={interaction.id} ref={index === todaysSubmission.interactions.length - 1 ? lastInteractionRef : null}>
                    {interaction.userEcho && (
                        <>
                           <p className="text-sm font-semibold text-gray-500 text-center mb-2 p-2 bg-gray-100 rounded-md">{interaction.userEcho.questionPrompt}</p>
                           <div className="flex justify-end">
                             <div className="bg-orange-500 text-white p-3 rounded-xl rounded-br-none max-w-[80%]">
                                 <p className="text-sm whitespace-pre-wrap">{interaction.userEcho.text}</p>
                             </div>
                           </div>
                        </>
                    )}
                    {interaction.aiAnalysis && (
                        <div className="flex justify-start">
                           <div className="bg-gray-100 p-3 rounded-xl rounded-bl-none max-w-[80%] space-y-3">
                                <div className="space-y-1">
                                    <p className="text-xs font-semibold text-gray-500">Thèmes détectés :</p>
                                    <div className="flex flex-wrap gap-2">
                                        {interaction.aiAnalysis.themes.map(theme => (
                                            <span key={theme} className="text-xs font-medium bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">{theme}</span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-800">{interaction.aiAnalysis.followUpQuestion}</p>
                                {interaction.aiAnalysis.xpAward && (
                                    <p className="text-xs text-green-600 font-semibold pt-2 border-t border-gray-200">✨ +{interaction.aiAnalysis.xpAward.amount} XP en {interaction.aiAnalysis.xpAward.typeName} !</p>
                                )}
                           </div>
                        </div>
                    )}
                     {interaction.userReply && (
                           <div className="flex justify-end">
                             <div className="bg-orange-500 text-white p-3 rounded-xl rounded-br-none max-w-[80%]">
                                 <p className="text-sm whitespace-pre-wrap">{interaction.userReply.text}</p>
                             </div>
                           </div>
                    )}
                </div>
            ))}
            {isLoadingAI && <div className="flex justify-start"><LoadingSpinner /></div>}
            <div />
        </div>
        {/* Input Area */}
        {isConversationFinished ? (
            <div className="p-4 border-t border-gray-200 bg-green-50 text-center">
                <p className="text-sm font-semibold text-green-800">Réflexion du jour terminée.</p>
                <p className="text-xs text-green-700 mt-1">Revenez demain pour un nouvel Écho. ✨</p>
            </div>
        ) : isAwaitingContinuation ? (
             <div className="p-4 border-t border-gray-200 bg-white flex flex-col sm:flex-row items-center justify-center gap-3">
                <StyledButton onClick={handleContinueConversation} variant="primary" className="w-full sm:w-auto">Continuer la réflexion</StyledButton>
                <StyledButton onClick={handleStopConversation} variant="secondary" className="w-full sm:w-auto">Arrêter pour aujourd'hui</StyledButton>
            </div>
        ) : (
            <div className="p-4 border-t border-gray-200 bg-white">
                <div className="relative flex items-center space-x-2">
                    <textarea
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        placeholder={isWaitingForUserReply ? "Ta réponse..." : "Ton écho..."}
                        className="form-textarea flex-grow p-3 pr-12 resize-none"
                        rows={1}
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendEcho(currentInput))}
                        disabled={isLoadingAI}
                        style={{ overflowY: 'hidden', height: 'auto', minHeight: '44px' }}
                        onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                        }}
                    />
                    <button
                        onClick={toggleRecording}
                        className={`absolute right-14 p-2 rounded-full transition-colors ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'text-gray-500 hover:bg-gray-100'}`}
                        title="Dicter"
                        disabled={isLoadingAI}>
                        <MicrophoneIcon className="w-5 h-5"/>
                    </button>
                    <StyledButton onClick={() => handleSendEcho(currentInput)} disabled={!currentInput.trim() || isLoadingAI} className="px-3">
                        <PaperAirplaneIcon className="w-5 h-5"/>
                    </StyledButton>
                </div>
            </div>
        )}
    </div>
  );

  const renderResonanceTab = () => (
    <div className="space-y-6">
      {todaysSubmission && todaysSubmission.interactions.length > 0 ? (
        <>
          <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200/70">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Ton Partage du Jour</h2>
             <p className="text-sm font-semibold text-gray-600 mb-1">
                {todaysSubmission.interactions.find(i => i.userEcho)?.userEcho?.questionPrompt || "Ta réflexion :"}
            </p>
            <p className="text-md text-gray-700 bg-gray-50 p-3 rounded-md border whitespace-pre-wrap">{todaysSubmission.interactions.find(i => i.userEcho)?.userEcho?.text || "(Aucun écho initial écrit)"}</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200/70 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Statut de Résonance</h2>
            {isSearchingResonance && (
              <div className="py-4">
                <LoadingSpinner />
                <p className="mt-3 text-gray-600">Recherche de personnes avec qui ça résonne...</p>
              </div>
            )}
            {resonanceDisplayResult && !isSearchingResonance && (
              <div className="space-y-2">
                <p className="text-md text-gray-700">{resonanceDisplayResult.baseMessage}</p>
                {resonanceDisplayResult.xpMessage && (
                  <p className="text-md text-green-600 font-semibold flex items-center justify-center">
                    <StarIcon className="w-5 h-5 mr-1.5 text-yellow-400 fill-current" />
                    {resonanceDisplayResult.xpMessage}
                  </p>
                )}
                {resonanceDisplayResult.bonusMessage && (
                  <p className="text-md text-purple-600 font-semibold flex items-center justify-center">
                    <SparklesIcon className="w-5 h-5 mr-1.5 text-purple-400" />
                    {resonanceDisplayResult.bonusMessage}
                  </p>
                )}
                <p className="text-xs text-gray-500 pt-2 italic">Les interactions sont anonymes. Si tu résonnes 5 fois avec la même personne (simulation), une opportunité de connexion pourra t'être proposée.</p>
                <div className="pt-3">
                  <StyledButton variant="outline" onClick={handleSendXPMiroirFeel} className="border-purple-500 text-purple-600 hover:bg-purple-50">
                    <HeartIcon className="w-4 h-4 mr-1.5 text-purple-500"/> Je ressens avec toi
                  </StyledButton>
                </div>
              </div>
            )}
            {!isSearchingResonance && !resonanceDisplayResult && (
                 <StyledButton onClick={startResonanceSearch} disabled={!todaysSubmission}>Lancer la recherche de résonances</StyledButton>
            )}
          </div>
           <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200/70">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">XP Miroir Reçus (Relationnels)</h3>
                <p className="text-sm text-gray-600">
                    Tu as reçu <span className="font-bold text-orange-500">{userProfile?.xpMiroir || 0} XP Miroir</span> de la communauté pour tes partages (simulé).
                </p>
                 <p className="text-xs text-gray-500 mt-1 italic">Ces XP sont attribués lorsque d'autres membres (simulés) indiquent que ton partage a résonné avec eux et par un bonus si ton partage est largement partagé. Ils ne comptent pas pour ton niveau personnel mais pour la dynamique relationnelle.</p>
            </div>
        </>
      ) : (
        <div className="bg-white p-5 rounded-xl shadow-lg border text-center">
          <p className="text-gray-600">Partage ton introspection du jour dans l'onglet "Aujourd'hui" pour découvrir les résonances.</p>
        </div>
      )}
    </div>
  );

  const renderMesEcritsTab = () => {
    if (userSubmissions.length === 0) {
        return (
            <div className="bg-white p-5 rounded-xl shadow-lg border text-center">
                <p className="text-gray-600">Tes échos sauvegardés apparaîtront ici.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center mb-3 bg-white p-3 rounded-lg shadow-sm border">
                <EyeIcon className="w-6 h-6 text-blue-500 mr-2" />
                <h2 className="text-xl font-bold text-gray-800">Ton Journal d'Échos</h2>
            </div>
            {userSubmissions.map(submission => {
                const initialEcho = submission.interactions.find(i => i.userEcho)?.userEcho;
                const followUps = submission.interactions.slice(1);

                return (
                    <div key={submission.id} className="bg-white p-4 rounded-xl shadow-lg border border-gray-200/70 space-y-3">
                        <p className="text-xs font-semibold text-gray-500 border-b pb-2">
                            {new Date(submission.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
                        </p>

                        {initialEcho && (
                            <div>
                                <p className="text-xs text-gray-500 italic mb-1">{initialEcho.questionPrompt}</p>
                                <div className="bg-orange-50 p-3 rounded-md border border-orange-100">
                                    <p className="text-sm text-gray-800 whitespace-pre-wrap">{initialEcho.text}</p>
                                </div>
                            </div>
                        )}

                        {followUps.length > 0 && (
                            <div className="pt-3 border-t border-dashed">
                                <h4 className="text-sm font-semibold text-gray-600 mb-2">Suite de la réflexion...</h4>
                                <div className="space-y-3">
                                    {followUps.map(interaction => {
                                        if (interaction.aiAnalysis && interaction.aiAnalysis.xpAward === null && !interaction.aiAnalysis.isConclusion) {
                                            const nextInteractionIsReply = followUps.find(f => f.userReply && f.timestamp > interaction.timestamp);
                                            // Only show AI question if it leads to a user reply, to avoid clutter
                                            if(nextInteractionIsReply) {
                                                return (
                                                    <p key={interaction.id} className="text-xs text-gray-500 italic pl-4 border-l-2 border-gray-200">
                                                        Humānia : "{interaction.aiAnalysis.followUpQuestion}"
                                                    </p>
                                                );
                                            }
                                        }
                                        if (interaction.userReply) {
                                            return (
                                                <div key={interaction.id} className="bg-orange-50 p-3 rounded-md border border-orange-100 ml-4">
                                                    <p className="text-sm text-gray-800 whitespace-pre-wrap">{interaction.userReply.text}</p>
                                                </div>
                                            );
                                        }
                                        // Don't render XP messages or conclusions here to keep it clean
                                        return null;
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

  const renderAudioCapsulesTab = () => (
    <div className="space-y-4">
      {audioCapsules.map(capsule => {
        const isLocked = capsule.isPremium && !userProfile.isPremium;
        return (
          <div key={capsule.id} className={`p-4 rounded-lg shadow-md border transition-all duration-200 ${isLocked ? 'bg-gray-100' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div className="flex-grow">
                <h3 className={`font-semibold ${isLocked ? 'text-gray-500' : 'text-gray-800'}`}>{capsule.title}</h3>
                <p className={`text-xs ${isLocked ? 'text-gray-400' : 'text-gray-500'}`}>{capsule.theme} • {capsule.duration}</p>
                {capsule.isPremium && <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-1.5 py-0.5 rounded-full inline-block mt-1">Premium</span>}
              </div>
              <div className="flex-shrink-0">
                {isLocked ? (
                  <StyledButton size="sm" variant="secondary" onClick={() => navigate('/moi/boutique')}>
                    <LockClosedIcon className="w-4 h-4 mr-1.5"/> Débloquer
                  </StyledButton>
                ) : (
                  <button onClick={() => handlePlayPauseAudio(capsule.id)} className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 shadow-lg">
                    {playingAudioId === capsule.id ? <PauseIcon className="w-6 h-6"/> : <PlayIcon className="w-6 h-6"/>}
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );


  const renderContent = () => {
    switch(activeTab) {
      case 'aujourdhui': return renderAujourdhuiTab();
      case 'resonance': return renderResonanceTab();
      case 'mesecrits': return renderMesEcritsTab();
      case 'capsulesaudio': return renderAudioCapsulesTab();
      default: return renderAujourdhuiTab();
    }
  }

  const getPageTitle = () => {
     switch(activeTab) {
      case 'aujourdhui': return "Mon Écho du Jour";
      case 'resonance': return "Miroir & Résonance";
      case 'mesecrits': return "Mon Journal d'Échos";
      case 'capsulesaudio': return "Capsules Audio";
      default: return "Échos";
    }
  }

  return (
    <PageContainer title={getPageTitle()}>
      <div className="mb-6">
        <div className="flex space-x-2 border-b-2 border-gray-200">
           {([
               {key: 'aujourdhui', label: 'Aujourd\'hui', Icon: HeartIcon},
               {key: 'resonance', label: 'Résonance', Icon: SparklesIcon},
               {key: 'mesecrits', label: 'Mes Écrits', Icon: EyeIcon},
               {key: 'capsulesaudio', label: 'Audio', Icon: PageAudioIcon}
            ] as const).map(tab => (
               <button
                 key={tab.key}
                 onClick={() => setActiveTab(tab.key)}
                 className={`flex items-center space-x-1.5 px-3 sm:px-4 py-2 text-sm sm:text-base font-bold rounded-t-lg -mb-0.5 transition-colors duration-200 focus:outline-none ${activeTab === tab.key ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-orange-500'}`}
               >
                 <tab.Icon className="w-5 h-5"/>
                 <span>{tab.label}</span>
               </button>
            ))}
        </div>
      </div>
      {renderContent()}
      <div className="text-center mt-8">
        <StyledButton variant="secondary" onClick={() => navigate('/explorer')}>
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Retour à l'exploration
        </StyledButton>
      </div>
    </PageContainer>
  );
};

export default EchosPage;