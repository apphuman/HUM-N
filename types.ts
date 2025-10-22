import React from 'react';

export interface IconProps {
  className?: string;
  isActive?: boolean; // Optional for icons that change style based on active state
  title?: string; // Optional for SVG title/tooltip
}

export interface NavItem {
  path: string;
  label: string;
  Icon: React.FC<IconProps>;
}

export interface Badge {
  id: string;
  name: string;
  icon: string; // Could be emoji or an SVG component path / name later
  description?: string;
}

export type WorkshopCategoryKey = 'amour' | 'amitie' | 'travail' | 'famille' | 'sportBienEtre' | 'professionnel' | 'creeParUtilisateur' | 'quarantaine' | 'parentalite';

export interface WorkshopTheme {
  id:string;
  templateId?: string; // Reference to the original template ID for tracking
  title: string;
  description: string; // Description générale pour la liste
  detailedContent: string; // Contenu détaillé pour la page de l'atelier
  participantExpectations: string;
  whatToGain: string;
  xpActivated: string[]; // Noms des XP activés, ex: ["Partage", "Écoute"]
  whyThisWorkshop: string;
  progress?: number; // 0 to 100 - Optionnel, plus pour les anciens concepts
  icon?: React.FC<IconProps>;
  date?: string; // Optional date for upcoming workshops
  time?: string; // Optional time for upcoming workshops
  currentParticipants?: number;
  maxParticipants?: number;
  xpGainedByUser?: number; // XP que l'utilisateur a gagnés pour cet atelier (pour les ateliers passés) - sera la somme des XP reçus
  summaryData?: WorkshopSummaryData; // Ajouté pour stocker la synthèse de l'atelier
  categoryKey: WorkshopCategoryKey;
  isUserCreated?: boolean; // Flag for user-created workshops
  creatorId?: string; // User ID of the creator if isUserCreated is true
  requiredLevel?: LevelInfo['name'];
  isPremium?: boolean; // Flag for premium workshops
  type: 'cercle'; // New: Type of workshop
  duration?: string; // New: Estimated duration, e.g., "20 min"
  image?: string; // New: URL for a thematic image
}

export interface Quote {
  text: string;
  author?: string; // Optional author
}

export interface LevelInfo {
  name: string;
  emoji: string;
  minXP: number;
  maxXP: number;
  description: string;
}

export interface AudioSuggestion { // This is used for MyPathPage and MePage (simple suggestion)
  id: string;
  title: string;
  theme: string;
  duration: string;
}

export interface AudioCapsule { // Expanded for EchosPage Audio Tab
  id: string;
  title: string;
  theme: string;
  duration: string; 
  description?: string; // Added description
  listened?: boolean;
  isPlaying?: boolean; // For UI state during "playback"
  hasBeenListened?: boolean; // More specific for tracking if it has been listened to at all
  isPremium?: boolean; // For premium content
}


export interface PastIntrospection { // This might be replaced by UserDailySubmission logic
  id: string;
  date: string;
  prompt: string;
  text: string;
}

// Enum-like objects for new profile fields to ensure consistency
export const AgeRanges = {
  AGE_18_25: '18-25',
  AGE_26_35: '26-35',
  AGE_36_45: '36-45',
  AGE_46_55: '46-55',
  AGE_56_PLUS: '56+',
} as const;
export type AgeRange = typeof AgeRanges[keyof typeof AgeRanges]; // Non-nullable after onboarding

export const CurrentFeelingOptions = {
  TRANSITION: 'transition',
  QUEST_FOR_MEANING: 'quest_for_meaning',
  CURIOUS_EXPLORE: 'curious_explore',
  POSITIVE_TIRED: 'positive_tired',
  A_BIT_LOST: 'a_bit_lost',
  RECONSTRUCTION: 'reconstruction',
  ALIGNED_ALONE: 'aligned_alone',
  STABLE_NEEDS_CONNECTION: 'stable_needs_connection',
} as const;
export type CurrentFeeling = typeof CurrentFeelingOptions[keyof typeof CurrentFeelingOptions];

export const AspirationOptions = {
  SINCERE_CONNECTION: 'sincere_connection',
  LISTENED_NO_JUDGEMENT: 'listened_no_judgement',
  BETTER_SELF_UNDERSTANDING: 'better_self_understanding',
  LEARN_TO_SLOW_DOWN: 'learn_to_slow_down',
  EXPLORE_EMOTIONS: 'explore_emotions',
  SAFE_SPACE_TO_SHARE: 'safe_space_to_share',
  SHARE_NO_PERFORMANCE: 'share_no_performance',
  MEANINGFUL_CONNECTION: 'meaningful_connection',
  OTHER: 'other', // Added for "Autre" option
} as const;
export type Aspiration = typeof AspirationOptions[keyof typeof AspirationOptions];

export const PreferredRythmOptions = {
  SLOW: 'slow', // 1 atelier/semaine
  MODERATE: 'moderate', // 1 atelier/3 jours
  INSTINCTIVE: 'instinctive', // Quand besoin
} as const;
export type PreferredRythm = typeof PreferredRythmOptions[keyof typeof PreferredRythmOptions]; // Non-nullable after onboarding

export const SocialInteractionStyleOptions = {
  RESERVED_BUT_OPEN: 'reserved_but_open',
  AUTHENTIC_RESONANCE_SEEKER: 'authentic_resonance_seeker',
  OBSERVER_FIRST: 'observer_first',
  EXPRESSIVE_DIRECT_SHARER: 'expressive_direct_sharer',
} as const;
export type SocialInteractionStyle = typeof SocialInteractionStyleOptions[keyof typeof SocialInteractionStyleOptions]; // Non-nullable

export const ReactionToTouchedOptions = {
  DISCREET_ECHO: 'discreet_echo', // Envoyer écho discret
  READ_MORE_RESONANCES: 'read_more_resonances', // Lire plus de messages qui résonnent
  CONNECT_LATER_IF_STRONG: 'connect_later_if_strong', // Créer lien si écho fort
  STAY_ANONYMOUS_FOR_NOW: 'stay_anonymous_for_now', // Rester anonyme pour l'instant
} as const;
export type ReactionToTouched = typeof ReactionToTouchedOptions[keyof typeof ReactionToTouchedOptions]; // Non-nullable


export const ProfessionCategoryOptions = {
  TECH_INFO: 'tech_informatique',
  SANTE_SOCIAL: 'sante_social',
  EDUCATION_RECHERCHE: 'education_recherche',
  ARTS_CULTURE_DESIGN: 'arts_culture_design',
  COMMERCE_VENTE_MARKETING: 'commerce_vente_marketing',
  GESTION_FINANCE_ADMINISTRATION: 'gestion_finance_administration',
  INGENIERIE_INDUSTRIE_CONSTRUCTION: 'ingenierie_industrie_construction',
  SERVICES_PERSONNE_ENTREPRISE: 'services_personne_entreprise',
  COMMUNICATION_MEDIA: 'communication_media',
  DROIT_JURIDIQUE: 'droit_juridique',
  RESTAURATION_HOTELLERIE_TOURISME: 'restauration_hotellerie_tourisme',
  AGRICULTURE_ENVIRONNEMENT: 'agriculture_environnement',
  ETUDIANT: 'etudiant',
  SANS_EMPLOI_RECHERCHE: 'sans_emploi_recherche',
  AUTRE: 'autre_profession',
  NE_SOUHAITE_PAS_REPONDRE: 'prefere_ne_pas_repondre_profession',
} as const;
export type ProfessionCategory = typeof ProfessionCategoryOptions[keyof typeof ProfessionCategoryOptions]; // Non-nullable


export interface PrivateChatMessage {
  id: string;
  sender: string; // 'user' or AI match name
  text: string;
  timestamp: Date;
  isUser: boolean;
  isSystem?: boolean; // Pour les messages comme "L'IA est en train d'écrire..." ou "L'IA semble occupée"
}

export interface AIMatchProfile extends ParticipantProfileInfo { // Extends for consistency, can be ParticipantProfileInfo directly
  personaKey?: 'exploratrice_sensible' | 'batisseur_blesse' | 'solaire_sous_controle' | 'philosophe_autodidacte' | 'reveuse_courageuse';
  avatarUrl?: string;
  age?: number;
}

export interface ResonancePoint {
  icon: '🌱' | '💬' | '🤝' | '🧠';
  text: string;
}

export interface AIMatchData {
  profile: AIMatchProfile;
  chatHistory: PrivateChatMessage[];
  mutualXPWithMatch: number; // XP specific to this match relationship
  lastInteractionDate?: string;
  chatSession?: any; // For GoogleGenAI.Chat instance, similar to LiveWorkshopGlobalState
  lastAIMessageType?: 'farewell' | 'busy' | null; // Pour aider à simuler la reprise de contact
  aiMatchLastInitiationTimestamp?: number; // Timestamp de la dernière "initiation" par l'IA
  resonancePoints?: ResonancePoint[]; // NEW: For displaying compatibility
  hasUnreadMessages?: boolean;
}

export interface UserProfile {
  firstName: string;
  gender: 'female' | 'male' | 'other' | 'prefer_not_to_say';
  ageRange: AgeRange;
  professionCategory: ProfessionCategory; 
  currentFeelings: CurrentFeeling[]; 
  aspirations: Aspiration[]; 
  otherAspirationText: string | null;
  preferredRythm: PreferredRythm; 
  socialInteractionStyle: SocialInteractionStyle;
  reactionToTouched: ReactionToTouched; 

  location?: string;
  onboardingIntentText?: string;
  profilePicture?: string; // Base64 string for user's profile picture
  biography?: string; // For the generated bio

  isOnboarded: boolean;
  isPremium?: boolean; // Added for premium features
  totalXP: number; // XP global de l'utilisateur
  xpMiroir?: number; // XP spécifiques aux interactions de Miroir & Résonance (sera de-corrélé du totalXP)
  emotionalXP?: Record<string, number>; // XP par type émotionnel, ex: { partage: 10, ecoute: 5 }
  joinDate: string; // Date the user joined (non-optional after onboarding)
  currentLevel?: LevelInfo; // Added for easier access in modal
  currentLiveWorkshopId?: string | null; // ID of the workshop the user is currently in or was last in
  aiMatch?: AIMatchData | null; // Data for the AI match
  subscribedWorkshopIds?: string[]; // IDs of workshops the user is subscribed to
  favoritedWorkshopIds?: string[]; // IDs of workshops the user has favorited
  followedParticipantNames?: string[]; // Names of AI participants the user is following
  badges?: Badge[];
  
  // For system-awarded XP tracking
  hasReceivedOnboardingXP?: boolean;
  participatedWorkshopIds?: string[];
  lastSessionXPAwardedDate?: string | null; // YYYY-MM-DD
  dailySessionTimeInSeconds?: number;
  lastActivityDate?: string | null; // ISO String date
  lastSeenAppVersion?: string; // For "What's New" feature

  // For Mirror XP Bonus
  recentMirrorXPAwards?: Array<{ timestamp: number; amount: number; }>;
  lastMirrorXPBonusAwardedDate?: string | null; // YYYY-MM-DD

  // For XP Boost purchase tracking
  xpBoostPurchasedForLevels?: Record<number, boolean>;
  
  // For Territory
  essentialLimits?: string[];
  flexiblePreferences?: Record<string, number>; // e.g. { exchangeFrequency: 50 }
  positiveRequests?: string[];
  myManualText?: string;
  energyAndMotivation?: {
    energizers: string[];
    drainers: string[];
    coreValues: string[];
  };
  notificationSounds?: Record<string, string>; // e.g. { privateMessage: 'chime', workshopReminder: 'default' }

  // For migration flags
  hasAffinityReset_v1?: boolean;
}

export type OnboardingData = {
  firstName: string;
  gender: UserProfile['gender'];
  ageRange: AgeRange;
  location: string;
  onboardingIntentText: string;
  socialInteractionStyle: SocialInteractionStyle;
};


export interface ChatMessage {
  id: string; // Unique ID for each message, essential for reactions
  sender: string; // 'user', 'system', or AI participant's name
  text: string;
  timestamp: Date;
  isUser: boolean;
  avatar?: string; // Optional: for AI participant avatars
  userReaction?: string; // Emoji string if the current user reacted to this message
  // aiReactions?: Array<{ aiName: string; emoji: string }>; // For future: AI reactions
}

// New type for AI Analysis result from an Echo
export interface AIAnalysisResult {
  themes: string[];
  followUpQuestion: string;
  xpAward: {
    typeKey: string; // e.g., "authenticite"
    typeName: string; // e.g., "Authenticité"
    amount: number;
  } | null;
}

// Refactored DailyInteraction to support a conversation flow for Echos
export interface DailyInteraction {
  id: string;
  timestamp: Date;
  // One of the following must be present
  userEcho?: {
    questionPrompt: string; // The question the user was answering
    text: string;
  };
  aiAnalysis?: AIAnalysisResult;
  userReply?: {
    text: string;
  };
}

export interface UserDailySubmission {
  id: string; // id of the submission (e.g., date based)
  date: string; // YYYY-MM-DD
  interactions: DailyInteraction[]; // Holds all Q&A for the day as a conversation thread
  resonancesFound: number; // Simulated
  xpMiroirReceived: number; // Simulated
  resonanceBonusAwarded?: boolean; // Tracks if the daily +5 XP bonus for high resonance was given
}


// For ParticipantProfileModal
export interface ParticipantProfileInfo {
  name: string;
  totalXP: number; // For AI, this is mock XP for display
  currentLevel: LevelInfo;
  isAI: boolean;
  workshopsAttended?: number; // Could be a number for AI, or string like 'N/A'
  badges?: Badge[];
  activityStatus?: string; // e.g. "Actif", "Actif récemment"
  avatarSeed?: string; // For consistent AI avatar color if needed
  awardedXpCounts?: Record<string, number>; // Tracks XP type counts awarded by user, e.g. { "Partage": 1 } // Limit 1 per type
  gender?: UserProfile['gender']; // Added for avatar consistency
  avatarUrl?: string; // URL for realistic AI photo
  // New fields for AI persona
  zodiacSign?: string;
  birthDate?: string;
  profession?: string;
  hobbies?: string[];
  biography?: string;
}

export interface ParticipantProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  participant: ParticipantProfileInfo | null;
  onAwardXPToAI?: (participantName: string, xpType: string, amount: number) => void;
  xpActivatedForWorkshop?: string[];
  displayMode: 'profileOnly' | 'xpOnly' | 'full' | 'feed';
  followedParticipantNames?: string[];
  onFindInWorkshop?: (userName: string) => void;
  onSubscribeToNextWorkshop?: (userName: string) => void;
  onUnfollowParticipant?: (userName: string) => void;
}


// For persistent live workshop state in App.tsx
export interface LiveWorkshopGlobalState {
  workshopId: string;
  workshopTitle: string;
  workshopDetails: WorkshopTheme | null; // Détails de l'atelier, y compris xpActivated
  messages: ChatMessage[];
  chatSession: any; // Using 'any' for GoogleGenAI.Chat for now, can be refined
  aiParticipants: string[];
  aiParticipantProfiles: Record<string, ParticipantProfileInfo>;
  isLoading: boolean;
  error: string | null;
  typingParticipantName: string | null;
  lastUserMessageTimestamp: number | null;
  workshopStartTime: number | null; 
  workshopScheduledEndTime: number | null;
  isWorkshopEndingAnnounced: boolean;
  isClosureProposedDueToInactivity: boolean;
}

// FIX: Add SoloWorkshopState to fix compile error
export interface SoloWorkshopState {
  workshopId: string;
  messages: ChatMessage[];
  chatSession: any; // GoogleGenAI.Chat instance
  isLoading: boolean;
  error: string | null;
  isCompleted: boolean;
}

export interface XPAwardSummary {
  [xpType: string]: number;
}

export interface XPAwardedToAISummary {
  [aiName: string]: XPAwardSummary;
}

export interface SystemAwardedSpecificXP {
  typeKey: string; // e.g., "authenticite"
  typeName: string; // e.g., "Authenticité"
  amount: number; // e.g., 1 or 2
}

export interface WorkshopSummaryData {
  keyPoints: string;
  xpReceivedByUser: XPAwardSummary; // Total emotional XP received by user, grouped by type
  xpReceivedFromAI: Record<string, XPAwardSummary>; // Detailed: AI_Name -> { XP_Type: Amount }
  xpAwardedToAI: XPAwardedToAISummary; // What user awarded to AIs
  systemAwardedXP?: {
    overallParticipationXP: number; // e.g., 0-5
    specificXPAwards: SystemAwardedSpecificXP[]; // e.g., [{typeKey: "authenticite", typeName: "Authenticité", amount: 1}]
  };
}

export interface ContextMenuState {
  isOpen: boolean;
  participantName: string;
  isAI: boolean;
  x: number;
  y: number;
  targetElement: HTMLElement | null;
  displayModeSuggestion: 'profileOnly' | 'xpOnly' | 'full'; 
}

// State for private chat with AI Match
export interface PrivateChatSessionState {
  matchId: string; // AI Match's ID (could be their name)
  messages: PrivateChatMessage[];
  chatSession: any; // GoogleGenAI.Chat instance
  isLoading: boolean;
  error: string | null;
  typingAIMatchName: string | null;
}

// For MePage PDF summary modal
export interface UserJourneySummary {
  firstName: string;
  isExample: boolean;
  isLoading: boolean;
  analysisTitle: string;
  analysisText: string;
}

export interface UserCreatedWorkshopDetails {
  title: string;
  description: string;
  numParticipants: number;
}

// For Emoji Reactions
export interface MessageReaction {
  messageId: string;
  emoji: string;
  userId: string; // or userName for simplicity in AI context
}

export interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error';
  isRead?: boolean;
}

export interface Persona {
    key: 'exploratrice_sensible' | 'batisseur_blesse' | 'solaire_sous_controle' | 'philosophe_autodidacte' | 'reveuse_courageuse';
    namePool: string[];
    gender: 'female' | 'male';
    age: number;
    profession: string;
    hobbies: string[];
    enfance: string;
    passe: string;
    present: string;
    futur: string;
    reactions: {
        deep: string;
        light: string;
        closed: string;
        tension: string;
        random: string;
    };
}

export interface ActivityFeedItem {
  id: string;
  userProfile: ParticipantProfileInfo;
  activityType: 'joined_workshop' | 'earned_xp' | 'completed_workshop';
  details: {
    workshopTitle?: string;
    workshopId?: string;
    xpType?: string;
    xpAmount?: number;
  };
  timestamp: Date;
}

export type SpecialistCategory = 'therapies' | 'coaching' | 'relations' | 'bien-etre';

export interface FictionalSpecialistProfile {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  bio: string;
  approach: string;
  imageUrl: string;
  category: SpecialistCategory;
}

// For "What's New" feature
export interface AppFeatureUpdate {
  title: string;
  description: string;
  icon?: React.FC<IconProps>;
}

export interface AppVersion {
  version: string;
  date: string;
  features: AppFeatureUpdate[];
}

export interface MicroChallenge {
  id: number | string;
  title: string;
  duration: string;
  description: string;
  isAI?: boolean;
}
