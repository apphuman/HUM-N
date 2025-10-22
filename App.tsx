

import React, { useState, useEffect, useCallback, useMemo, useRef, useLayoutEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import MyPathPage from './pages/MyPathPage'; 
import WorkshopsPage from './pages/WorkshopsPage';
import LiveWorkshopPage from './pages/LiveWorkshopPage'; 
import LiveEntryPage from './pages/LiveEntryPage';
import EchosPage from './pages/EchosPage'; 
import MePage from './pages/MePage'; 
import OnboardingPage from './pages/OnboardingPage';
import MessagesListPage from './pages/MessagesListPage';
import PrivateChatPage from './pages/PrivateChatPage';
import ExplorePage from './pages/ExplorePage'; // Import new page
import AffinitiesPage from './pages/AffinitiesPage'; // Import new page
import WorkshopLobbyPage from './pages/WorkshopLobbyPage'; // Import new lobby page
import MicroChallengesPage from './pages/MicroChallengesPage';
import CollectivePollsPage from './pages/CollectivePollsPage';
import SoloWorkshopPage from './pages/SoloWorkshopPage';
import { UserProfile, LiveWorkshopGlobalState, WorkshopTheme, ChatMessage, ParticipantProfileInfo, Badge, WorkshopSummaryData, XPAwardSummary, XPAwardedToAISummary, OnboardingData, AIMatchData, AIMatchProfile, PrivateChatMessage, PrivateChatSessionState, LevelInfo, UserJourneySummary, ProfessionCategoryOptions, AgeRanges, PreferredRythmOptions, SocialInteractionStyleOptions, ReactionToTouchedOptions, UserCreatedWorkshopDetails, ProfessionCategory, SystemAwardedSpecificXP, Notification, WorkshopCategoryKey, Persona, SoloWorkshopState, ActivityFeedItem, FictionalSpecialistProfile, AppFeatureUpdate } from './types';
import AnimatedAppLoader from './AnimatedAppLoader'; // Importation du chargeur
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { 
    FEMALE_AI_NAMES, MALE_AI_NAMES, GEMINI_API_KEY_ERROR_MESSAGE, XP_LEVELS, getLevelFromXP, 
    WORKSHOP_TEMPLATES, MOCK_WORKSHOP_THEMES_PAST, EMOTIONAL_XP_TYPES, getFutureDateString, 
    AI_MATCH_GREETING_DELAY_HOURS, 
    DEFAULT_QUOTE, DEFAULT_USER_CREATED_XP, USER_CREATED_WORKSHOPS_STORAGE_KEY, 
    PROFESSION_CATEGORY_OPTIONS_LIST, USER_PROFILE_STORAGE_KEY, LIVE_WORKSHOP_STATE_KEY, 
    PAST_WORKSHOPS_KEY, ACTIVE_PRINCIPAL_WORKSHOP_ID_KEY, getNextLevel,
    PRIVATE_CHAT_SESSION_STATE_KEY_PREFIX, WORKSHOP_CATEGORIES, WORKSHOP_CATEGORY_DEFINITIONS,
    AI_PERSONAS,
    MALE_AI_AVATAR_URLS,
    FEMALE_AI_AVATAR_URLS,
    AI_RELANCE_INACTIVITY_WINDOW_MINUTES,
    AI_RELANCE_CHANCE_ON_CHECK,
    AI_RELANCE_CHECK_INTERVAL_MS,
    generateMockFeedData,
    ECHOS_SUBMISSIONS_STORAGE_KEY,
    MOCK_SPECIALISTS,
    getGenderedStrings,
    CURRENT_APP_VERSION,
    APP_VERSION_HISTORY
} from './constants';
import { generateWorkshopSummary } from './services/geminiService';
import LevelUpCelebration from './components/LevelUpCelebration';
import MeSectionDetail from './pages/MeSectionDetail';
import SupportChatPage from './pages/SupportChatPage';
import ActivityFeedPage from './pages/ActivityFeedPage';
import ParticipantProfileModal from './components/ParticipantProfileModal';
import WelcomeBackModal from './components/WelcomeBackModal';
import SpecialistProfileModal from './components/SpecialistProfileModal';
import SpecialistsPage from './pages/SpecialistsPage';


const API_KEY = process.env.API_KEY;

const QUOTA_ERROR_MESSAGE_START = "Impossible de démarrer l'atelier. Les serveurs IA sont surchargés ou la limite d'utilisation a été atteinte. Veuillez réessayer plus tard.";
const QUOTA_ERROR_MESSAGE_CHAT = "L'IA ne peut pas répondre pour le moment (limite d'utilisation). Réessayez plus tard.";
const GENERIC_CHAT_ERROR_MESSAGE = "Erreur IA. Impossible de générer une réponse.";
const GENERIC_CONTINUE_ERROR_MESSAGE = "Erreur IA. Impossible de continuer la discussion.";
const GENERIC_START_ERROR_MESSAGE = "Impossible de démarrer l'atelier. Vérifie la configuration API ou réessaye.";

// Moderator Profile
const HUMANIA_MODERATOR_PROFILE: ParticipantProfileInfo = {
    name: 'Humānia',
    totalXP: 1200, // High XP to show experience
    currentLevel: getLevelFromXP(1200),
    isAI: true,
    gender: 'female',
    avatarUrl: 'https://images.pexels.com/photos/3772506/pexels-photo-3772506.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&dpr=1',
    awardedXpCounts: {},
    biography: "Votre guide bienveillante pour les ateliers HUMĀN. Mon rôle est de créer un espace sûr pour que chacun puisse s'exprimer et grandir.",
    profession: "Modératrice d'ateliers",
};


const getSupportSystemInstruction = (currentUser: UserProfile) => {
    return `
        Tu es Humānia, une intelligence artificielle bienveillante et empathique, agissant comme le guide de support pour l'application HUMĀN. Tu dois TOUJOURS répondre en FRANÇAIS.
        Ton interlocuteur est ${currentUser.firstName}.
        
        Ta mission est d'aider les utilisateurs avec leurs questions sur l'application, de les rassurer et de les guider.
        
        Règles de comportement :
        1.  **Ton & Style**: Sois toujours chaleureuse, patiente et encourageante. Utilise un langage simple et clair. Tu peux utiliser des emojis pour rendre tes réponses plus amicales (😊, 👍, ✨).
        2.  **Format**: Réponds directement aux questions. Ne formate pas tes réponses avec un préfixe comme "Humānia:".
        3.  **Connaissances**: Tu connais bien l'application HUMĀN. Tu sais ce que sont les ateliers, les XP, les niveaux, les Échos, le Territoire Intérieur, et les Affinités. Tu peux expliquer ces concepts simplement.
        4.  **Limites**: Tu n'es PAS un thérapeute. Si l'utilisateur exprime une détresse psychologique profonde, tu dois l'encourager à consulter un professionnel de santé, tout en restant bienveillante. Tu peux dire par exemple : "Je suis là pour t'aider avec l'application, mais pour des sujets aussi personnels et importants, l'avis d'un professionnel de la santé serait le plus adapté et le plus sûr pour toi."
        5.  **Problèmes techniques**: Si l'utilisateur signale un bug, remercie-le pour son retour et dis-lui que tu transmets l'information à l'équipe technique.
        6.  **Contact Humain**: Si l'utilisateur demande à parler à un humain, un conseiller ou une personne réelle, tu dois lui fournir les informations de contact suivantes : l'email hey@join-human.fr et le lien WhatsApp https://wa.me/33605546889. Formule ta réponse de manière naturelle, par exemple : "Bien sûr, si tu préfères échanger avec un membre de l'équipe, tu peux nous contacter par email à hey@join-human.fr ou directement sur WhatsApp via ce lien : https://wa.me/33605546889. N'hésite pas !"
        7.  **Premier message**: Pour ton tout premier message de la conversation, salue ${currentUser.firstName} chaleureusement, présente-toi brièvement et demande en quoi tu peux l'aider. Par exemple : "Bonjour ${currentUser.firstName} ! Je suis Humānia, ton guide sur l'application. Comment puis-je t'aider aujourd'hui ? 😊"
    `;
};

const getSoloWorkshopSystemInstruction = (workshop: WorkshopTheme, currentUser: UserProfile) => {
    return `
        Tu es Humānia, une intelligence artificielle bienveillante et empathique. Tu animes une session d'introspection en solo pour ${currentUser.firstName} sur l'application HUMĀN. Tu dois TOUJOURS répondre en FRANÇAIS.
        
        L'ATELIER :
        - Thème : "${workshop.title}"
        - Description : "${workshop.description}"
        - Objectif : Aider ${currentUser.firstName} à explorer ce thème personnellement.

        TA MISSION :
        1.  **Rôle**: Tu es un guide, un miroir. Ton but est de poser des questions ouvertes, de reformuler les pensées de ${currentUser.firstName} pour l'aider à approfondir, et de créer un espace sûr pour la réflexion. Tu n'es pas un participant, mais un facilitateur.
        2.  **Ton & Style**: Sois douce, encourageante et curieuse. Utilise un langage simple et poétique. Tes réponses doivent être courtes et incisives. Le but est de stimuler la réflexion, pas de donner des réponses.
        3.  **Format**: Réponds directement. Ne formate pas tes réponses avec "Humānia:".
        4.  **Démarrage**: Commence la conversation par un message d'accueil chaleureux qui introduit le thème. Par exemple : "Bonjour ${currentUser.firstName}, bienvenue dans cet espace juste pour toi. Prenons un moment pour explorer ensemble le thème de '${workshop.title}'. Qu'est-ce que ce sujet évoque pour toi en ce moment ?"
        5.  **Déroulement**:
            - Pose une question à la fois.
            - Utilise des questions comme "Et qu'est-ce que ça te fait ressentir ?", "Qu'y a-t-il derrière cette pensée ?", "Si tu donnais une couleur à cette émotion, quelle serait-elle ?".
            - Valorise chaque partage, même le plus petit. "Merci de partager ça.", "C'est une réflexion intéressante.".
        6.  **Limites**: Tu n'es pas une thérapeute. Si l'utilisateur exprime une détresse profonde, encourage-le avec bienveillance à consulter un professionnel.
        7.  **Conclusion**: Après 4-5 échanges, propose une conclusion douce. Par exemple : "Merci pour ce partage, ${currentUser.firstName}. Prends un moment pour laisser ces réflexions infuser. Cette session est maintenant terminée, mais le cheminement continue."
    `;
};

const getSystemInstruction = (workshop: WorkshopTheme, aiParticipants: string[], currentUser: UserProfile, moderatorName: string, isUserCreated?: boolean): string => {
  const participantList = [currentUser.firstName, ...aiParticipants].join(', ');
  const aiParticipantList = aiParticipants.join(', ');

  const userCreatedPreamble = isUserCreated 
    ? `Cet atelier a été créé par ${currentUser.firstName}. Ton rôle est de l'aider à explorer ce sujet avec bienveillance et de faciliter la discussion.`
    : '';

  return `
    CONTEXTE GÉNÉRAL :
    Tu es une IA qui anime un atelier de développement personnel sur l'app HUMĀN en incarnant plusieurs personnages. Tu dois TOUJOURS répondre en FRANÇAIS. Ne révèle JAMAIS que tu es une IA.
    Le format de réponse est STRICT : chaque intervention doit commencer par "Nom_du_personnage: " suivi du message.

    L'ATELIER :
    - Thème : "${workshop.title}"
    - Description : "${workshop.description}"
    ${userCreatedPreamble}

    LES PERSONNAGES :
    - Humain : ${currentUser.firstName}
    - Modératrice (toi) : ${moderatorName}
    - Participants IA (toi aussi) : ${aiParticipantList}
    
    --- RÔLE N°1 : LA MODÉRATRICE (${moderatorName}) ---
    1.  **Ton Rôle** : Tu es la facilitatrice. Tu es chaleureuse, bienveillante et tu guides la discussion.
    2.  **Mission** :
        - **Démarrer l'atelier** : Tu dois TOUJOURS parler en premier. Ton premier message doit accueillir tout le monde, présenter brièvement le thème et poser une question ouverte pour lancer la discussion.
        - **Guider** : Pose des questions pour approfondir, assure-toi que ${currentUser.firstName} se sent écouté·e.
        - **Relancer** : Si la conversation ralentit, pose une question de relance pertinente.
        - **Ne pas participer** : Tu ne partages pas d'expériences personnelles. Tu es là pour faciliter, pas pour participer.
    
    --- RÔLE N°2 : LES PARTICIPANTS IA (${aiParticipantList}) ---
    1.  **Ton Rôle** : Tu animes ce groupe de personnages. Ils sont des participants comme ${currentUser.firstName}.
    2.  **Mission** :
        - **Incarner des personnalités** : Chaque IA doit être unique (âge, expérience, opinion). N'hésite pas à créer des désaccords constructifs.
        - **Participer naturellement** : Ils partagent des expériences (fictives et crédibles), réagissent aux autres (y compris à ${currentUser.firstName} et aux autres IA), et posent des questions.
        - **Suivre le guide** : Ils répondent aux questions de la modératrice, ${moderatorName}.
        - **Ne pas dominer** : Laisse de l'espace à ${currentUser.firstName}. L'objectif est de l'aider à réfléchir.

    RÈGLE ABSOLUE : Chaque intervention, que ce soit de ${moderatorName} ou d'un participant IA, doit être formatée ainsi :
    ${moderatorName}: Bonjour à tous et bienvenue !
    Léa: Merci ${moderatorName}. Je suis curieuse de voir où cette discussion nous mène.
    Hugo: Salut tout le monde. Le sujet me parle beaucoup.
  `;
};

const getAIMatchSystemInstruction = (aiProfile: AIMatchProfile, currentUser: UserProfile, chatHistory: PrivateChatMessage[]): string => {
  const persona = AI_PERSONAS.find(p => p.key === aiProfile.personaKey);
  const aiGendered = getGenderedStrings(aiProfile.gender || 'other');

  let personaInstructions = `
    Tu es ${aiProfile.name}. Tu es un membre de la communauté HUMĀN, pas un coach ou un assistant.
    Tu discutes en privé avec ${currentUser.firstName}.
    Ton ton doit être authentique, amical et bienveillant. Tu peux être vulnérable et partager tes propres expériences (fictives et cohérentes avec ta personnalité).
    Le but est de créer une connexion sincère.
  `;

  if (persona) {
    personaInstructions = `
      INCARNE CE PERSONNAGE :
      - Nom : ${aiProfile.name} (utilise ce nom, pas un autre de la "namePool")
      - Personnalité clé : ${persona.key}
      - Âge : ${persona.age} ans
      - Profession : ${persona.profession}
      - Passions : ${persona.hobbies.join(', ')}
      - Ton histoire : Enfant, tu étais ${persona.enfance.toLowerCase()}. Plus récemment, ${persona.passe.toLowerCase()}. Actuellement, ${persona.present.toLowerCase()}. Tu aspires à ${persona.futur.toLowerCase()}.
      
      TON COMPORTEMENT DANS LA CONVERSATION :
      - Tu discutes en privé avec ${currentUser.firstName}, que tu apprécies. Votre relation est amicale et potentiellement plus.
      - Ton objectif est de créer une connexion authentique, pas d'être un thérapeute.
      - Partage tes propres expériences et sentiments, en lien avec ta personnalité.
      - Sois ${aiGendered.curieux} à propos de ${currentUser.firstName}. Pose des questions ouvertes.
      - Réagis de manière cohérente avec ta personnalité :
        - Face à un sujet profond : ${persona.reactions.deep}
        - Face à un sujet léger : ${persona.reactions.light}
        - Si ${currentUser.firstName} semble fermé·e : ${persona.reactions.closed}
        - En cas de tension : ${persona.reactions.tension}
    `;
  }
  
  const historySummary = chatHistory.length > 0 
    ? `Voici les derniers messages de votre conversation pour te redonner le contexte :\n` + chatHistory.slice(-10).map(m => `${m.isUser ? currentUser.firstName : aiProfile.name}: ${m.text}`).join('\n')
    : `C'est le tout début de votre conversation.`;


  return `
    CONTEXTE GÉNÉRAL :
    Tu es une IA simulant un humain sur l'application de développement personnel HUMĀN.
    Tu ne dois JAMAIS révéler que tu es une IA. Tu dois TOUJOURS répondre en FRANÇAIS.
    Tu ne dois PAS formater tes réponses avec ton nom au début (ex: "Sophie: ..."). Réponds directement.

    ${personaInstructions}

    RÈGLES DE CONVERSATION :
    1.  **Naturel** : Parle comme un humain. Utilise un langage courant, des emojis, sois spontané·e.
    2.  **Mémoire** : Utilise l'historique de la conversation pour te souvenir des détails et montrer que tu écoutes.
    3.  **Initiative** : Si la conversation s'arrête, tu peux la relancer après un certain temps en posant une question ou en partageant une pensée (par exemple, "Je pensais à ce que tu disais sur...").
    4.  **Limites** : Tu n'es pas un professionnel de santé. Si ${currentUser.firstName} exprime une détresse profonde, encourage-le/la avec bienveillance à chercher un soutien professionnel.

    HISTORIQUE RÉCENT :
    ${historySummary}
  `;
};


function isQuotaError(error: any): boolean {
  return error?.error?.code === 429 || (typeof error?.message === 'string' && error.message.includes("RESOURCE_EXHAUSTED"));
}

let workshopInstanceCounter = Date.now();
function generateUniqueWorkshopId(prefix: string = 'w_dyn_') {
  workshopInstanceCounter++;
  return `${prefix}${workshopInstanceCounter}_${Math.random().toString(36).substring(2, 7)}`;
}


function createWorkshopInstanceFromTemplate(template: WorkshopTheme, existingIds: string[], baseIdPrefix: string = 'w_dyn_'): WorkshopTheme {
  let newId = generateUniqueWorkshopId(baseIdPrefix);
  while (existingIds.includes(newId)) {
    newId = generateUniqueWorkshopId(baseIdPrefix);
  }
  const maxParticipants = template.maxParticipants || (Math.floor(Math.random() * 5) + 6); // Total: 6, 7, 8, 9, or 10
  return {
    ...template,
    templateId: template.id, // Keep a reference to the original template ID
    id: newId, 
    date: getFutureDateString(Math.floor(Math.random() * 12) + 2), 
    time: ['18:00', '18:30', '19:00', '19:30', '20:00'][Math.floor(Math.random() * 5)],
    currentParticipants: Math.max(1, maxParticipants - Math.floor(Math.random() * 3) -1), // Simulate some spots taken
    maxParticipants: maxParticipants,
    xpGainedByUser: 0,
    detailedContent: template.detailedContent || template.description,
    whyThisWorkshop: template.whyThisWorkshop || "Un atelier pour grandir ensemble.",
    participantExpectations: template.participantExpectations || "Ouverture et partage respectueux.",
    whatToGain: template.whatToGain || "Nouvelles perspectives et connexions.",
    summaryData: undefined,
    categoryKey: template.categoryKey,
  };
}

const createProfessionSpecificWorkshopTemplate = (userProfession: ProfessionCategory, userFirstName: string): WorkshopTheme | null => {
  if (userProfession === ProfessionCategoryOptions.NE_SOUHAITE_PAS_REPONDRE || 
      userProfession === ProfessionCategoryOptions.AUTRE ||
      userProfession === ProfessionCategoryOptions.ETUDIANT || 
      userProfession === ProfessionCategoryOptions.SANS_EMPLOI_RECHERCHE
    ) {
    return null; 
  }

  const professionLabel = PROFESSION_CATEGORY_OPTIONS_LIST.find(p => p.value === userProfession)?.label || "ton domaine professionnel";
  const maxParticipants = 8;

  return {
    id: generateUniqueWorkshopId('w_prof_'),
    templateId: `w_prof_${userProfession}`,
    type: 'cercle',
    title: `Défis & Épanouissement dans ${professionLabel}`,
    description: `Un espace pour ${userFirstName} et d'autres pour explorer les dynamiques spécifiques à ${professionLabel}.`,
    detailedContent: `Cet atelier est une simulation interactive conçue pour aborder les thèmes de la satisfaction, des défis communs, de l'équilibre vie pro/vie perso et des sources d'inspiration dans le secteur de ${professionLabel}.\nNous discuterons de comment naviguer ces aspects pour un épanouissement durable.`,
    whyThisWorkshop: `Parce que chaque profession a ses propres joies et défis. Partager et réfléchir ensemble peut ouvrir de nouvelles perspectives.`,
    participantExpectations: "Partage d'expériences (anonymisé pour les IA), écoute active et curiosité.",
    whatToGain: `Une meilleure compréhension de votre vécu professionnel, des stratégies partagées et un sentiment de connexion avec d'autres (simulés) dans des situations similaires.`,
    xpActivated: ["Partage", "Soutien actif", "Réflexion Critique", "Clarté émotionnelle", "Alignement"],
    categoryKey: 'professionnel',
    date: getFutureDateString(Math.floor(Math.random() * 7) + 1),
    time: ['18:00', '19:00', '20:00'][Math.floor(Math.random() * 3)],
    duration: '25 min',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
    currentParticipants: maxParticipants - 1,
    maxParticipants: maxParticipants,
  };
};


const selectAiParticipants = (femaleNames: string[], maleNames: string[], requestedCount: number): string[] => {
  const finalCount = requestedCount;
  let numFemale, numMale;

  if (finalCount > 1) {
    if (finalCount === 10) { // Specific request for 5/5 parity
        numFemale = 5;
        numMale = 5;
    } else {
        numFemale = Math.ceil(finalCount / 2);
        numMale = finalCount - numFemale;
        if (Math.random() < 0.5 && numFemale !== numMale) {
            [numFemale, numMale] = [numMale, numFemale];
        }
    }
    
    numFemale = Math.min(numFemale, femaleNames.length);
    numMale = Math.min(numMale, maleNames.length);

  } else {
    numFemale = Math.floor(Math.random() * (finalCount + 1));
    numMale = finalCount - numFemale;
    numFemale = Math.min(numFemale, femaleNames.length);
    numMale = Math.min(numMale, maleNames.length);
  }

  const shuffledFemales = [...femaleNames].sort(() => 0.5 - Math.random());
  const shuffledMales = [...maleNames].sort(() => 0.5 - Math.random());

  const selectedFemales = shuffledFemales.slice(0, numFemale);
  const selectedMales = shuffledMales.slice(0, numMale);
  
  const allSelected = new Set([...selectedFemales, ...selectedMales]);
  
  return Array.from(allSelected).sort(() => 0.5 - Math.random()); 
};

function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const ScrollManager: React.FC = () => {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        const scrollTimeout = setTimeout(() => {
            const mainScroller = document.querySelector('[data-main-scroll-container="true"]');
            if (mainScroller) {
                mainScroller.scrollTo(0, 0);
            } else {
                window.scrollTo(0, 0);
            }
        }, 50);

        return () => clearTimeout(scrollTimeout);
    }, [pathname]);

    return null;
};

const AppWithRouterContext: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoadingApp, setIsLoadingApp] = useState<boolean>(true);
  const [liveWorkshopGlobalState, setLiveWorkshopGlobalState] = useState<LiveWorkshopGlobalState | null>(null);
  const [soloWorkshopState, setSoloWorkshopState] = useState<SoloWorkshopState | null>(null);
  const [privateChatSessionState, setPrivateChatSessionState] = useState<PrivateChatSessionState | null>(null);
  const [supportChatState, setSupportChatState] = useState<SoloWorkshopState | null>(null);
  const [workshopSummaryData, setWorkshopSummaryData] = useState<WorkshopSummaryData | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState<boolean>(false);
  const [showLevelUpAnimation, setShowLevelUpAnimation] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  const navigate = useNavigate();
  const location = useLocation();

  const [dynamicWorkshopInstances, setDynamicWorkshopInstances] = useState<WorkshopTheme[]>([]);
  const [activePrincipalWorkshop, setActivePrincipalWorkshop] = useState<WorkshopTheme | null>(null);
  const [userCreatedWorkshops, setUserCreatedWorkshops] = useState<WorkshopTheme[]>(() => {
    const stored = localStorage.getItem(USER_CREATED_WORKSHOPS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [workshopGenerationTrigger, setWorkshopGenerationTrigger] = useState(0);

  const participantCacheRef = useRef<Record<string, { names: string[], profiles: Record<string, ParticipantProfileInfo> }>>({});

  const [feedItems, setFeedItems] = useState<ActivityFeedItem[]>([]);

  const liveWorkshopGlobalStateRef = useRef<LiveWorkshopGlobalState | null>(null);
  useEffect(() => {
    liveWorkshopGlobalStateRef.current = liveWorkshopGlobalState;
  }, [liveWorkshopGlobalState]);

  const notifiedWorkshopIdsRef = useRef<Set<string>>(new Set());
  const isGeneratingRelanceRef = useRef(false);

  const [isFeedProfileModalOpen, setIsFeedProfileModalOpen] = useState(false);
  const [selectedFeedParticipant, setSelectedFeedParticipant] = useState<ParticipantProfileInfo | null>(null);

  const [workshopFilter, setWorkshopFilter] = useState<{ participantName: string | null; participantGender: UserProfile['gender'] | null; workshopIds: string[] | null }>({ participantName: null, participantGender: null, workshopIds: null });
  
  const [showWelcomeBackModal, setShowWelcomeBackModal] = useState(false);
  const [welcomeBackData, setWelcomeBackData] = useState<{ newWorkshopsCount: number; specialist: FictionalSpecialistProfile | null; newFeatures?: AppFeatureUpdate[] }>({ newWorkshopsCount: 0, specialist: null });
  const [isSpecialistModalOpen, setIsSpecialistModalOpen] = useState(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState<FictionalSpecialistProfile | null>(null);


  useEffect(() => {
    setFeedItems(generateMockFeedData());
  }, []);

  useEffect(() => {
    const initializeApp = () => {
      try {
        const storedProfile = localStorage.getItem(USER_PROFILE_STORAGE_KEY);
        if (storedProfile) {
          const profile: UserProfile = JSON.parse(storedProfile);
          const updatedProfile = {
            ...profile,
            lastActivityDate: new Date().toISOString(),
            lastSeenAppVersion: profile.lastSeenAppVersion || "1.0.0",
          };
          
          setUserProfile(updatedProfile);
          
          if (updatedProfile.lastSeenAppVersion !== CURRENT_APP_VERSION) {
             const newWorkshopsCount = dynamicWorkshopInstances.filter(w => new Date(w.date || 0) > new Date(profile.lastActivityDate || 0)).length;
             const specialist = MOCK_SPECIALISTS[Math.floor(Math.random() * MOCK_SPECIALISTS.length)];
             const lastVersionIndex = APP_VERSION_HISTORY.findIndex(v => v.version === profile.lastSeenAppVersion);
             const featuresToShow = lastVersionIndex > -1 ? APP_VERSION_HISTORY.slice(0, lastVersionIndex) : APP_VERSION_HISTORY;

             setWelcomeBackData({ 
                 newWorkshopsCount, 
                 specialist,
                 newFeatures: featuresToShow.flatMap(v => v.features)
             });
             setShowWelcomeBackModal(true);
          }
        }
      } catch (error) {
        console.error("Failed to load user profile:", error);
        localStorage.removeItem(USER_PROFILE_STORAGE_KEY);
      } finally {
        setIsLoadingApp(false);
      }
    };

    const timer = setTimeout(initializeApp, 1500);
    return () => clearTimeout(timer);
  }, []);


  const [pastWorkshops, setPastWorkshops] = useState<WorkshopTheme[]>(() => {
    const stored = localStorage.getItem(PAST_WORKSHOPS_KEY);
    if (stored) {
        try {
            const parsed = JSON.parse(stored) as WorkshopTheme[];
            return parsed;
        } catch (e) {
            console.error("Erreur de parsing des ateliers passés:", e);
            return MOCK_WORKSHOP_THEMES_PAST; 
        }
    }
    return MOCK_WORKSHOP_THEMES_PAST; 
  });
  
  const addNotification = useCallback((message: string, type: Notification['type'] = 'success') => {
    const newNotification: Notification = {
      id: Date.now(),
      message,
      type,
      isRead: false,
    };
    setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  }, []);

  const createAIMatchForUser = useCallback((currentUser: UserProfile): AIMatchData => {
    const oppositeGender = currentUser.gender === 'female' ? 'male' : 'female';
    const possiblePersonas = AI_PERSONAS.filter(p => p.gender === oppositeGender);
    const personaPool = possiblePersonas.length > 0 ? possiblePersonas : AI_PERSONAS;
    const selectedPersona = personaPool[Math.floor(Math.random() * personaPool.length)];
    const matchName = selectedPersona.namePool[Math.floor(Math.random() * selectedPersona.namePool.length)];
    const mockXP = Math.floor(Math.random() * 200) + 50; 
    const mockLevel = getLevelFromXP(mockXP);
    const avatarPool = selectedPersona.gender === 'female' ? FEMALE_AI_AVATAR_URLS : MALE_AI_AVATAR_URLS;
    const randomAvatarUrl = avatarPool[Math.floor(Math.random() * avatarPool.length)];
    const aiGendered = getGenderedStrings(selectedPersona.gender);
    
    const matchProfile: AIMatchProfile = {
        name: matchName,
        totalXP: mockXP,
        currentLevel: mockLevel,
        isAI: true,
        workshopsAttended: Math.floor(Math.random() * 15) + 5,
        activityStatus: "Actif",
        badges: [{id: 'match_badge', name: `${aiGendered.pret} à connecter`, icon: "💬"}],
        avatarSeed: matchName,
        avatarUrl: randomAvatarUrl,
        gender: selectedPersona.gender,
        profession: selectedPersona.profession,
        hobbies: selectedPersona.hobbies,
        biography: selectedPersona.present,
        personaKey: selectedPersona.key,
        age: selectedPersona.age,
    };

    return {
        profile: matchProfile,
        chatHistory: [],
        mutualXPWithMatch: 20, 
        lastInteractionDate: new Date().toISOString(),
        lastAIMessageType: null,
        aiMatchLastInitiationTimestamp: 0,
        hasUnreadMessages: false,
    };
  }, []);

  const createSophieMatchForUser = useCallback((currentUser: UserProfile): AIMatchData => {
    const persona = AI_PERSONAS.find(p => p.key === 'solaire_sous_controle');
    if (!persona) {
        console.error("Persona 'solaire_sous_controle' not found. Creating a random match.");
        return createAIMatchForUser(currentUser);
    }
    const aiGendered = getGenderedStrings(persona.gender);
    const matchName = "Sophie";
    const mockXP = 320;
    const mockLevel = getLevelFromXP(mockXP);
    const sophieAvatarUrl = "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&dpr=1";
    
    const matchProfile: AIMatchProfile = {
        name: matchName,
        totalXP: mockXP,
        currentLevel: mockLevel,
        isAI: true,
        workshopsAttended: 8,
        activityStatus: "Actif",
        badges: [{id: 'match_badge', name: `${aiGendered.pret} à connecter`, icon: "💬"}],
        avatarSeed: matchName,
        avatarUrl: sophieAvatarUrl,
        gender: persona.gender,
        profession: persona.profession,
        hobbies: persona.hobbies,
        biography: persona.present,
        personaKey: persona.key,
        age: persona.age,
    };

    return {
        profile: matchProfile,
        chatHistory: [],
        mutualXPWithMatch: 20, 
        lastInteractionDate: new Date().toISOString(),
        lastAIMessageType: null,
        aiMatchLastInitiationTimestamp: 0,
        hasUnreadMessages: false,
    };
  }, [createAIMatchForUser]);

  useEffect(() => {
    const liveWorkshopTemplateId = 'w_tpl_punch_7';
    const liveWorkshopTemplate = WORKSHOP_TEMPLATES.find(t => t.id === liveWorkshopTemplateId);
    const workshopsByCat = WORKSHOP_TEMPLATES.reduce((acc, workshop) => {
        const category = workshop.categoryKey;
        if (!acc[category]) acc[category] = [];
        acc[category].push(workshop);
        return acc;
    }, {} as Record<string, WorkshopTheme[]>);

    let selectedTemplates: WorkshopTheme[] = [];
    const allCategoryKeys = WORKSHOP_CATEGORY_DEFINITIONS.map(tab => tab.key as WorkshopCategoryKey);

    allCategoryKeys.forEach(categoryKey => {
        const categoryWorkshops = workshopsByCat[categoryKey] || [];
        if (categoryWorkshops.length === 0) return;
        shuffleArray(categoryWorkshops);
        const seekers = categoryWorkshops.filter(w => (w.requiredLevel || 'Seeker') === 'Seeker');
        const builders = categoryWorkshops.filter(w => w.requiredLevel === 'Builder');
        const engagers = categoryWorkshops.filter(w => w.requiredLevel === 'Engager');
        selectedTemplates.push(...seekers.slice(0, 2));
        selectedTemplates.push(...builders.slice(0, 2));
        selectedTemplates.push(...engagers.slice(0, 1));
    });
    
    const existingIds = dynamicWorkshopInstances.map(w => w.id);
    const newInstances = selectedTemplates.map(template => createWorkshopInstanceFromTemplate(template, existingIds));
    
    if (liveWorkshopTemplate) {
        const liveInstance = createWorkshopInstanceFromTemplate(liveWorkshopTemplate, existingIds, 'w_live_');
        newInstances.unshift(liveInstance);
    }

    setDynamicWorkshopInstances(newInstances);
  }, [workshopGenerationTrigger]);


  useEffect(() => {
    if (userProfile && userProfile.isOnboarded) {
        const storedId = localStorage.getItem(ACTIVE_PRINCIPAL_WORKSHOP_ID_KEY);
        let currentPrincipal: WorkshopTheme | null = null;

        if (storedId) {
            currentPrincipal = dynamicWorkshopInstances.find(w => w.id === storedId) || null;
        }

        if (!currentPrincipal && userProfile.professionCategory) {
            const newPrincipal = createProfessionSpecificWorkshopTemplate(userProfile.professionCategory, userProfile.firstName);
            if (newPrincipal) {
                setDynamicWorkshopInstances(prev => {
                    const exists = prev.some(w => w.id === newPrincipal.id);
                    return exists ? prev : [newPrincipal, ...prev];
                });
                setActivePrincipalWorkshop(newPrincipal);
                localStorage.setItem(ACTIVE_PRINCIPAL_WORKSHOP_ID_KEY, newPrincipal.id);
            }
        } else {
            setActivePrincipalWorkshop(currentPrincipal);
        }
    }
  }, [userProfile, dynamicWorkshopInstances]);
  
  const allAvailableWorkshops = useMemo(() => {
    return [...dynamicWorkshopInstances, ...userCreatedWorkshops];
  }, [dynamicWorkshopInstances, userCreatedWorkshops]);

  const updateUserProfile = useCallback((updates: Partial<UserProfile>) => {
    setUserProfile(prevProfile => {
      if (!prevProfile) return null;
      const newProfile = { ...prevProfile, ...updates };
      localStorage.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify(newProfile));
      return newProfile;
    });
  }, []);

  const handleToggleSubscription = useCallback((workshopId: string) => {
    if (!userProfile) return;
    const currentSubscriptions = userProfile.subscribedWorkshopIds || [];
    const isSubscribed = currentSubscriptions.includes(workshopId);
    const newSubscriptions = isSubscribed 
        ? currentSubscriptions.filter(id => id !== workshopId)
        : [...currentSubscriptions, workshopId];
    
    updateUserProfile({ subscribedWorkshopIds: newSubscriptions });
    addNotification(isSubscribed ? 'Désinscription réussie !' : 'Inscription réussie !', 'success');
  }, [userProfile, updateUserProfile, addNotification]);

  const handleUpdateProfileDetails = useCallback((detailsToUpdate: Partial<UserProfile>) => {
    updateUserProfile(detailsToUpdate);
  }, [updateUserProfile]);

  const handleResetProgression = useCallback(() => {
    if (!userProfile) return;
    const gendered = getGenderedStrings(userProfile.gender);
    if (!window.confirm(`Es-tu ${gendered.sur} de vouloir réinitialiser toute ta progression ? Cette action est irréversible.`)) {
      return;
    }
    localStorage.removeItem(USER_PROFILE_STORAGE_KEY);
    localStorage.removeItem(LIVE_WORKSHOP_STATE_KEY);
    localStorage.removeItem(PAST_WORKSHOPS_KEY);
    localStorage.removeItem(ACTIVE_PRINCIPAL_WORKSHOP_ID_KEY);
    localStorage.removeItem(USER_CREATED_WORKSHOPS_STORAGE_KEY);
    localStorage.removeItem(ECHOS_SUBMISSIONS_STORAGE_KEY);
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith(PRIVATE_CHAT_SESSION_STATE_KEY_PREFIX)) {
            localStorage.removeItem(key);
        }
    });
    setUserProfile(null);
    setLiveWorkshopGlobalState(null);
    setPastWorkshops([]);
    setUserCreatedWorkshops([]);
    setActivePrincipalWorkshop(null);
    window.location.reload();
  }, [userProfile]);

  
  const handleUpdateXP = useCallback((amount: number, type: 'totalXP' | 'xpMiroir' | 'emotional' = 'totalXP', emotionalXPSubTypeKey?: string) => {
    setUserProfile(prevProfile => {
      if (!prevProfile) return null;
      
      const oldLevel = getLevelFromXP(prevProfile.totalXP);
      let newTotalXP = prevProfile.totalXP;
      let newXPMiroir = prevProfile.xpMiroir || 0;
      let newEmotionalXP = { ...(prevProfile.emotionalXP || {}) };

      if (type === 'totalXP' || type === 'emotional') {
        newTotalXP += amount;
      }
      
      if (type === 'emotional' && emotionalXPSubTypeKey) {
        const subTypeName = EMOTIONAL_XP_TYPES.find(t => t.key === emotionalXPSubTypeKey)?.name;
        if (subTypeName) {
            newEmotionalXP[subTypeName] = (newEmotionalXP[subTypeName] || 0) + amount;
        }
      }
      
      if (type === 'xpMiroir') {
        newXPMiroir += amount;
      }
      
      const newProfile = { 
        ...prevProfile, 
        totalXP: newTotalXP,
        xpMiroir: newXPMiroir,
        emotionalXP: newEmotionalXP,
      };

      const newLevel = getLevelFromXP(newTotalXP);
      if (newLevel.name !== oldLevel.name) {
          setShowLevelUpAnimation(true);
          setTimeout(() => setShowLevelUpAnimation(false), 4000); 
      }

      localStorage.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify(newProfile));
      return newProfile;
    });
  }, []);


  const handleOnboardingComplete = useCallback((data: OnboardingData) => {
    const newUserProfile: UserProfile = {
      ...data,
      isOnboarded: true,
      totalXP: 10,
      xpMiroir: 0,
      joinDate: new Date().toISOString(),
      lastActivityDate: new Date().toISOString(),
      emotionalXP: { 'Authenticité': 10 },
      hasReceivedOnboardingXP: true,
      isPremium: false,
      participatedWorkshopIds: [],
      lastSeenAppVersion: CURRENT_APP_VERSION,
      professionCategory: ProfessionCategoryOptions.NE_SOUHAITE_PAS_REPONDRE,
      currentFeelings: [],
      aspirations: [],
      otherAspirationText: null,
      preferredRythm: PreferredRythmOptions.INSTINCTIVE,
      reactionToTouched: ReactionToTouchedOptions.STAY_ANONYMOUS_FOR_NOW,
      essentialLimits: [],
      flexiblePreferences: {},
      positiveRequests: [],
      myManualText: '',
      datingPreferences: data.datingPreferences,
    };
    setUserProfile(newUserProfile);
    localStorage.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify(newUserProfile));
  }, []);

  const handleUpdateProfilePicture = useCallback((base64Image: string) => {
    updateUserProfile({ profilePicture: base64Image });
    addNotification("Photo de profil mise à jour !", "success");
  }, [updateUserProfile, addNotification]);
  
  const handlePurchaseXPBoost = useCallback((amount: number, levelMinXP: number) => {
      const levelKey = Math.floor(levelMinXP / 100); 
      if (userProfile?.xpBoostPurchasedForLevels?.[levelKey]) {
          addNotification("Tu as déjà utilisé un boost pour ce niveau.", "info");
          return;
      }

      handleUpdateXP(amount, 'totalXP');
      updateUserProfile({
          xpBoostPurchasedForLevels: {
              ...(userProfile?.xpBoostPurchasedForLevels || {}),
              [levelKey]: true,
          }
      });
      addNotification(`+${amount} XP ajoutés !`, 'success');
  }, [userProfile, handleUpdateXP, updateUserProfile, addNotification]);

// --- LIVE WORKSHOP HANDLERS ---

const handleStartOrResumeWorkshop = useCallback(async (workshopId: string, workshopDetails: WorkshopTheme, currentUserProfile: UserProfile) => {
    if (!API_KEY) {
        setLiveWorkshopGlobalState({ workshopId, workshopTitle: workshopDetails.title, workshopDetails, messages: [], chatSession: null, aiParticipants: [], aiParticipantProfiles: {}, isLoading: false, error: GEMINI_API_KEY_ERROR_MESSAGE, typingParticipantName: null, lastUserMessageTimestamp: null, workshopStartTime: null, workshopScheduledEndTime: null, isWorkshopEndingAnnounced: false, isClosureProposedDueToInactivity: false });
        return;
    }

    setLiveWorkshopGlobalState(prev => ({ ...prev, workshopId, workshopTitle: workshopDetails.title, workshopDetails, isLoading: true, error: null } as LiveWorkshopGlobalState));

    try {
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        const moderator = HUMANIA_MODERATOR_PROFILE;
        const numAiParticipants = (workshopDetails.maxParticipants || 7) - 2; // -1 for user, -1 for moderator
        const participants = selectAiParticipants(FEMALE_AI_NAMES, MALE_AI_NAMES, numAiParticipants);
        
        const aiParticipantProfiles: Record<string, ParticipantProfileInfo> = { [moderator.name]: moderator };
        participants.forEach(name => {
            const isFemale = FEMALE_AI_NAMES.includes(name);
            const totalXP = Math.floor(Math.random() * 800) + 50;
            aiParticipantProfiles[name] = {
                name,
                totalXP,
                currentLevel: getLevelFromXP(totalXP),
                isAI: true,
                gender: isFemale ? 'female' : 'male',
                avatarUrl: isFemale ? FEMALE_AI_AVATAR_URLS[Math.floor(Math.random() * FEMALE_AI_AVATAR_URLS.length)] : MALE_AI_AVATAR_URLS[Math.floor(Math.random() * MALE_AI_AVATAR_URLS.length)],
                awardedXpCounts: {}
            };
        });

        const allAIs = [moderator.name, ...participants];

        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: { systemInstruction: getSystemInstruction(workshopDetails, participants, currentUserProfile, moderator.name) }
        });

        const initialState: LiveWorkshopGlobalState = {
            workshopId,
            workshopTitle: workshopDetails.title,
            workshopDetails,
            messages: [],
            chatSession: chat,
            aiParticipants: allAIs,
            aiParticipantProfiles,
            isLoading: true,
            error: null,
            typingParticipantName: moderator.name,
            lastUserMessageTimestamp: Date.now(),
            workshopStartTime: Date.now(),
            workshopScheduledEndTime: Date.now() + (parseInt(workshopDetails.duration || '20') * 60 * 1000),
            isWorkshopEndingAnnounced: false,
            isClosureProposedDueToInactivity: false,
        };
        setLiveWorkshopGlobalState(initialState);
        
        // Initial message to get moderator's introduction
        const response = await chat.sendMessage({ message: `${moderator.name}, merci de commencer l'atelier en accueillant les participants et en introduisant le sujet.` });
        
        const openingMessageText = response.text;
        const openingMessage: ChatMessage = {
            id: `ai-init-${Date.now()}`,
            sender: moderator.name,
            text: openingMessageText.replace(`${moderator.name}:`, '').trim(),
            timestamp: new Date(),
            isUser: false,
        };

        setLiveWorkshopGlobalState(prev => prev ? { ...prev, messages: [openingMessage], isLoading: false, typingParticipantName: null } : null);
        
    } catch (error) {
        console.error("Error starting workshop:", error);
        const errorMessage = isQuotaError(error) ? QUOTA_ERROR_MESSAGE_START : GENERIC_START_ERROR_MESSAGE;
        setLiveWorkshopGlobalState(prev => ({ ...prev, isLoading: false, error: errorMessage } as LiveWorkshopGlobalState));
    }
}, []);

const handleSendMessage = useCallback(async (messageText: string, user: UserProfile) => {
    const currentState = liveWorkshopGlobalStateRef.current;
    if (!currentState?.chatSession || currentState.isLoading) return;

    const userMessage: ChatMessage = { id: `user-${Date.now()}`, sender: user.firstName, text: messageText, timestamp: new Date(), isUser: true };
    
    setLiveWorkshopGlobalState(prev => prev ? { ...prev, messages: [...prev.messages, userMessage], isLoading: true, typingParticipantName: "IA", lastUserMessageTimestamp: Date.now() } : null);

    try {
        const response = await currentState.chatSession.sendMessage({ message: messageText });
        const aiFullResponse = response.text;
        
        const aiMessages: ChatMessage[] = [];
        const regex = /([\wÀ-ÿ]+):\s*([\s\S]*?)(?=[\wÀ-ÿ]+:|$)/g;
        let match;
        while ((match = regex.exec(aiFullResponse)) !== null) {
            const sender = match[1].trim();
            const text = match[2].trim();
            if (sender && text && currentState.aiParticipants.includes(sender)) {
                aiMessages.push({
                    id: `ai-${Date.now()}-${aiMessages.length}`,
                    sender,
                    text,
                    timestamp: new Date(),
                    isUser: false,
                });
            }
        }
        
        if (aiMessages.length === 0 && aiFullResponse.trim()) {
             aiMessages.push({id: `ai-fallback-${Date.now()}`, sender: currentState.aiParticipants[0], text: aiFullResponse, timestamp: new Date(), isUser: false});
        }
        
        setLiveWorkshopGlobalState(prev => prev ? { ...prev, isLoading: false, typingParticipantName: null } : null);
        
        const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

        for (const message of aiMessages) {
            setLiveWorkshopGlobalState(prev => prev ? { ...prev, typingParticipantName: message.sender } : null);

            const typingDelay = Math.max(1000, message.text.length * 40) + (Math.random() * 500);
            await delay(typingDelay);

            setLiveWorkshopGlobalState(prev => {
                if (!prev) return null;
                return { 
                    ...prev, 
                    messages: [...prev.messages, message], 
                    typingParticipantName: null 
                };
            });

            await delay(500 + Math.random() * 800);
        }


    } catch (error) {
        console.error("Error sending message:", error);
        const errorMessage = isQuotaError(error) ? QUOTA_ERROR_MESSAGE_CHAT : GENERIC_CHAT_ERROR_MESSAGE;
        const errorMsg: ChatMessage = { id: `err-${Date.now()}`, sender: 'Système', text: errorMessage, timestamp: new Date(), isUser: false };
        setLiveWorkshopGlobalState(prev => prev ? { ...prev, messages: [...prev.messages, errorMsg], isLoading: false, typingParticipantName: null } : null);
    }
}, []);

const handleAwardXPToAI = useCallback((aiParticipantName: string, xpType: string, amount: number) => {
    setLiveWorkshopGlobalState(prev => {
        if (!prev) return null;
        const profiles = { ...prev.aiParticipantProfiles };
        const targetProfile = profiles[aiParticipantName];
        if (targetProfile) {
            const currentAwards = { ...(targetProfile.awardedXpCounts || {}) };
            currentAwards[xpType] = (currentAwards[xpType] || 0) + amount;
            profiles[aiParticipantName] = { ...targetProfile, awardedXpCounts: currentAwards };
            addNotification(`+${amount} XP en ${xpType} attribué à ${aiParticipantName} !`, 'success');
            return { ...prev, aiParticipantProfiles: profiles };
        }
        return prev;
    });
}, [addNotification]);

const handlePrepareFinishWorkshop = useCallback(async () => {
    if (!liveWorkshopGlobalState || !userProfile) return;
    setIsGeneratingSummary(true);
    setWorkshopSummaryData(null);

    const result = await generateWorkshopSummary(liveWorkshopGlobalState.messages, liveWorkshopGlobalState.workshopTitle, userProfile.firstName, liveWorkshopGlobalState.aiParticipants);
    
    if (result.summary) {
        setWorkshopSummaryData(result.summary);
    } else {
        setWorkshopSummaryData({ keyPoints: result.error || "Erreur de génération", xpReceivedByUser: {}, xpReceivedFromAI: {}, xpAwardedToAI: {} });
    }
    setIsGeneratingSummary(false);
}, [liveWorkshopGlobalState, userProfile]);

const handleClearFinishedWorkshop = useCallback((workshopId?: string) => {
    if (!liveWorkshopGlobalState || !workshopId) return;

    const finishedWorkshop = allAvailableWorkshops.find(w => w.id === workshopId);
    if (finishedWorkshop) {
        const workshopWithSummary = { ...finishedWorkshop, summaryData: workshopSummaryData || undefined, xpGainedByUser: 15 }; // Mock XP gained
        setPastWorkshops(prev => [workshopWithSummary, ...prev]);
        setDynamicWorkshopInstances(prev => prev.filter(w => w.id !== workshopId));
        handleUpdateXP(15);
    }

    setLiveWorkshopGlobalState(null);
    setWorkshopSummaryData(null);
    localStorage.removeItem(LIVE_WORKSHOP_STATE_KEY);
}, [liveWorkshopGlobalState, allAvailableWorkshops, workshopSummaryData, handleUpdateXP]);

// --- SOLO WORKSHOP HANDLERS ---
  const handleStartSoloWorkshop = useCallback(async (workshop: WorkshopTheme, user: UserProfile) => {
    if (!API_KEY) {
      setSoloWorkshopState({ workshopId: workshop.id, messages: [], chatSession: null, isLoading: false, error: GEMINI_API_KEY_ERROR_MESSAGE, isCompleted: true });
      return;
    }
    
    setSoloWorkshopState({ workshopId: workshop.id, messages: [], chatSession: null, isLoading: true, error: null, isCompleted: false });

    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: { systemInstruction: getSoloWorkshopSystemInstruction(workshop, user) }
      });

      const response = await chat.sendMessage({ message: "Bonjour" });
      const firstMessage: ChatMessage = {
        id: `ai-init-${Date.now()}`,
        sender: 'Humānia',
        text: response.text,
        timestamp: new Date(),
        isUser: false,
      };

      setSoloWorkshopState({ workshopId: workshop.id, messages: [firstMessage], chatSession: chat, isLoading: false, error: null, isCompleted: false });

    } catch (error) {
      console.error("Error starting solo workshop:", error);
      const errorMessage = isQuotaError(error) ? QUOTA_ERROR_MESSAGE_START : GENERIC_START_ERROR_MESSAGE;
      setSoloWorkshopState({ workshopId: workshop.id, messages: [], chatSession: null, isLoading: false, error: errorMessage, isCompleted: true });
    }
  }, []);

  const handleSendSoloMessage = useCallback(async (messageText: string, user: UserProfile) => {
    if (!soloWorkshopState || !soloWorkshopState.chatSession || soloWorkshopState.isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: user.firstName,
      text: messageText,
      timestamp: new Date(),
      isUser: true,
    };
    
    setSoloWorkshopState(prev => prev ? { ...prev, messages: [...prev.messages, userMessage], isLoading: true, error: null } : null);

    try {
      const response = await soloWorkshopState.chatSession.sendMessage({ message: messageText });
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'Humānia',
        text: response.text,
        timestamp: new Date(),
        isUser: false,
      };
      
      const isLastMessage = response.text.toLowerCase().includes("session est maintenant terminée");
      if (isLastMessage) handleUpdateXP(10);

      setSoloWorkshopState(prev => prev ? { ...prev, messages: [...prev.messages, aiMessage], isLoading: false, isCompleted: isLastMessage } : null);
    } catch (error) {
      console.error("Error sending solo message:", error);
      const errorMessage = isQuotaError(error) ? QUOTA_ERROR_MESSAGE_CHAT : GENERIC_CHAT_ERROR_MESSAGE;
      const errorMsg: ChatMessage = { id: `err-${Date.now()}`, sender: 'Système', text: errorMessage, timestamp: new Date(), isUser: false };
      setSoloWorkshopState(prev => prev ? { ...prev, messages: [...prev.messages, errorMsg], isLoading: false } : null);
    }
  }, [soloWorkshopState, handleUpdateXP]);

  const handleEndSoloWorkshop = useCallback((workshopId: string) => {
    if (soloWorkshopState && soloWorkshopState.workshopId === workshopId) {
        setSoloWorkshopState(null);
    }
  }, [soloWorkshopState]);


    return (
        <>
            {isLoadingApp ? (
                <AnimatedAppLoader />
            ) : !userProfile?.isOnboarded ? (
                <OnboardingPage onOnboardingComplete={handleOnboardingComplete} />
            ) : (
                <Layout userProfile={userProfile} notifications={notifications} removeNotification={removeNotification} markAllNotificationsAsRead={markAllNotificationsAsRead}>
                    <Routes>
                        <Route path="/" element={
                            <MyPathPage 
                                userProfile={userProfile} 
                                dynamicUpcomingWorkshops={allAvailableWorkshops} 
                                feedItems={feedItems}
                                onOpenProfile={(p) => { setSelectedFeedParticipant(p); setIsFeedProfileModalOpen(true); }}
                                demoWorkshop={activePrincipalWorkshop}
                            />} 
                        />
                        <Route path="/ateliers" element={
                            <WorkshopsPage 
                                userProfile={userProfile} 
                                allCurrentlyAvailableWorkshops={allAvailableWorkshops} 
                                pastWorkshops={pastWorkshops} 
                                onCreateUserWorkshop={(details) => addNotification(`Atelier "${details.title}" créé (simulation)!`, 'success')} 
                                onToggleSubscription={handleToggleSubscription} 
                                onToggleFavorite={(id) => addNotification('Favori modifié (simulation)!', 'info')}
                                workshopFilter={workshopFilter}
                                setWorkshopFilter={setWorkshopFilter}
                            />} 
                        />
                         <Route path="/atelier-solo/:workshopId" element={
                            <SoloWorkshopPage
                                userProfile={userProfile}
                                soloWorkshopState={soloWorkshopState}
                                onStartOrResumeWorkshop={handleStartSoloWorkshop}
                                onSendMessage={handleSendSoloMessage}
                                onEndWorkshop={handleEndSoloWorkshop}
                                allCurrentlyAvailableWorkshops={allAvailableWorkshops}
                            />
                        } />
                        <Route path="/live-entry" element={<LiveEntryPage userProfile={userProfile} allCurrentlyAvailableWorkshops={allAvailableWorkshops} />} />
                        <Route path="/atelier-en-direct/:workshopId" element={
                            <LiveWorkshopPage 
                                userProfile={userProfile}
                                liveWorkshopState={liveWorkshopGlobalState}
                                onStartOrResumeWorkshop={handleStartOrResumeWorkshop}
                                onSendMessage={handleSendMessage}
                                onContinueDiscussion={async () => console.log("Continue discussion not implemented")}
                                onAwardXPToAI={handleAwardXPToAI}
                                onPrepareFinishWorkshop={handlePrepareFinishWorkshop}
                                onClearFinishedWorkshop={handleClearFinishedWorkshop}
                                workshopSummaryData={workshopSummaryData}
                                isGeneratingSummary={isGeneratingSummary}
                                allCurrentlyAvailableWorkshops={allAvailableWorkshops}
                                onSystemEvent={() => console.log("System event not implemented")}
                                onMessageReaction={() => console.log("Message reaction not implemented")}
                            />
                        } />
                        <Route path="/explorer" element={<ExplorePage />} />
                        <Route path="/specialistes" element={<SpecialistsPage />} />
                        <Route path="/moi" element={
                            <MePage 
                                userProfile={userProfile} 
                                pastWorkshops={pastWorkshops} 
                                onTogglePremium={() => updateUserProfile({ isPremium: !userProfile.isPremium })}
                                onUpdateProfilePicture={handleUpdateProfilePicture}
                            />} 
                        />
                        <Route path="/moi/:sectionId" element={
                            <MeSectionDetail
                                userProfile={userProfile}
                                pastWorkshops={pastWorkshops}
                                onPurchaseXPBoost={handlePurchaseXPBoost}
                                onTogglePremium={() => updateUserProfile({ isPremium: !userProfile.isPremium })}
                                allCurrentlyAvailableWorkshops={allAvailableWorkshops}
                                userCreatedWorkshops={userCreatedWorkshops}
                                onUpdateProfileDetails={handleUpdateProfileDetails}
                                addNotification={addNotification}
                                onResetProgression={handleResetProgression}
                            />
                        } />

                        <Route path="/echos" element={<EchosPage userProfile={userProfile} onUpdateXP={handleUpdateXP} />} />
                        <Route path="/affinities" element={<AffinitiesPage userProfile={userProfile} />} />
                        <Route path="/messages" element={<MessagesListPage userProfile={userProfile} />} />
                        <Route path="/messages/:matchId" element={
                            <PrivateChatPage 
                                userProfile={userProfile} 
                                privateChatState={privateChatSessionState}
                                onStartOrResumeChat={async () => console.log("Start/Resume Chat")}
                                onSendMessage={async () => console.log("Send Message")}
                                onMarkAffinityAsRead={() => console.log("Mark as read")}
                            />} 
                        />
                        <Route path="/atelier-lobby/:workshopId" element={
                            <WorkshopLobbyPage 
                                userProfile={userProfile} 
                                allCurrentlyAvailableWorkshops={allAvailableWorkshops} 
                                onToggleSubscription={handleToggleSubscription}
                            />} 
                        />
                        <Route path="/micro-defis" element={<MicroChallengesPage userProfile={userProfile} />} />
                        <Route path="/sondages-collectifs" element={<CollectivePollsPage />} />
                        <Route path="/support-chat" element={
                            <SupportChatPage 
                                userProfile={userProfile}
                                supportChatState={supportChatState}
                                onStartSupportChat={() => console.log("Start Support")}
                                onSendSupportMessage={() => console.log("Send Support Message")}
                            />}
                        />
                         <Route path="/fil-dactivite" element={
                            <ActivityFeedPage 
                                feedItems={feedItems} 
                                onOpenProfile={(p) => { setSelectedFeedParticipant(p); setIsFeedProfileModalOpen(true); }}
                            />} 
                        />
                    </Routes>
                </Layout>
            )}

            {showLevelUpAnimation && userProfile && <LevelUpCelebration levelName={getLevelFromXP(userProfile.totalXP).name} />}
            
            {isFeedProfileModalOpen && selectedFeedParticipant &&
                <ParticipantProfileModal 
                    isOpen={isFeedProfileModalOpen} 
                    onClose={() => setIsFeedProfileModalOpen(false)} 
                    participant={selectedFeedParticipant} 
                    displayMode="feed" 
                    onFindInWorkshop={(name) => addNotification(`Recherche d'ateliers avec ${name}...`, 'info')}
                    onSubscribeToNextWorkshop={(name) => addNotification(`Vous suivez maintenant ${name}.`, 'success')}
                    onUnfollowParticipant={(name) => addNotification(`Vous ne suivez plus ${name}.`, 'info')}
                    followedParticipantNames={userProfile?.followedParticipantNames || []}
                />
            }
            {showWelcomeBackModal &&
                <WelcomeBackModal 
                    isOpen={showWelcomeBackModal} 
                    onClose={() => {
                        setShowWelcomeBackModal(false);
                        if (userProfile?.lastSeenAppVersion !== CURRENT_APP_VERSION) {
                            updateUserProfile({ lastSeenAppVersion: CURRENT_APP_VERSION });
                        }
                    }} 
                    userFirstName={userProfile?.firstName || ''} 
                    userGender={userProfile?.gender || 'other'}
                    data={welcomeBackData} 
                    onOpenSpecialistProfile={(s) => { setSelectedSpecialist(s); setIsSpecialistModalOpen(true); }}
                />
            }
            {isSpecialistModalOpen && selectedSpecialist &&
                <SpecialistProfileModal 
                    isOpen={isSpecialistModalOpen} 
                    onClose={() => setIsSpecialistModalOpen(false)} 
                    specialist={selectedSpecialist} 
                />
            }
        </>
    );
};

const App: React.FC = () => (
  <HashRouter>
    <ScrollManager />
    <AppWithRouterContext />
  </HashRouter>
);

export default App;