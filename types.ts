import React from 'react';
import { Chat } from '@google/genai';

// Base types
export interface IconProps {
  className?: string;
  isActive?: boolean;
  title?: string;
}

export interface NavItem {
  path: string;
  label: string;
  Icon: React.FC<IconProps>;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface Quote {
  text: string;
  author?: string;
}

export interface LevelInfo {
  name: string;
  emoji: string;
  minXP: number;
  maxXP: number;
  description: string;
}

// XP & Summary related types
export interface XPAwardSummary {
  [xpType: string]: number;
}

export interface XPAwardedToAISummary {
  [aiName: string]: XPAwardSummary;
}

export interface SystemAwardedSpecificXP {
  typeKey: string;
  typeName: string;
  amount: number;
}

export interface WorkshopSummaryData {
  keyPoints: string;
  xpReceivedByUser: XPAwardSummary;
  xpReceivedFromAI: XPAwardedToAISummary;
  xpAwardedToAI: XPAwardedToAISummary;
  systemAwardedXP?: {
    overallParticipationXP: number;
    specificXPAwards: SystemAwardedSpecificXP[];
  };
}

// Workshop types
export type WorkshopCategoryKey = 'amour' | 'amitie' | 'travail' | 'famille' | 'sportBienEtre' | 'professionnel' | 'creeParUtilisateur' | 'quarantaine' | 'parentalite';

export interface WorkshopTheme {
  id:string;
  templateId?: string;
  title: string;
  description: string;
  detailedContent: string;
  participantExpectations: string;
  whatToGain: string;
  xpActivated: string[];
  whyThisWorkshop: string;
  progress?: number;
  icon?: React.FC<IconProps>;
  date?: string;
  time?: string;
  currentParticipants?: number;
  maxParticipants?: number;
  xpGainedByUser?: number;
  summaryData?: WorkshopSummaryData;
  categoryKey: WorkshopCategoryKey;
  isUserCreated?: boolean;
  creatorId?: string;
  requiredLevel?: LevelInfo['name'];
  isPremium?: boolean;
  type: 'cercle';
  duration?: string;
  image?: string;
}

export interface UserCreatedWorkshopDetails {
  title: string;
  description: string;
  numParticipants: number;
}

// Audio & Echos types
export interface AudioSuggestion {
  id: string;
  title: string;
  theme: string;
  duration: string;
}

export interface AudioCapsule {
  id: string;
  title: string;
  theme: string;
  duration: string; 
  description?: string;
  listened?: boolean;
  isPlaying?: boolean;
  hasBeenListened?: boolean;
  isPremium?: boolean;
}

export interface PastIntrospection {
  id: string;
  date: string;
  prompt: string;
  text: string;
}

// User Profile related types (Enums and main profile)
export const AgeRanges = {
  AGE_18_25: '18-25',
  AGE_26_35: '26-35',
  AGE_36_45: '36-45',
  AGE_46_55: '46-55',
  AGE_56_PLUS: '56+',
} as const;
export type AgeRange = typeof AgeRanges[keyof typeof AgeRanges];

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
  OTHER: 'other',
} as const;
export type Aspiration = typeof AspirationOptions[keyof typeof AspirationOptions];

export const PreferredRythmOptions = {
  SLOW: 'slow',
  MODERATE: 'moderate',
  INSTINCTIVE: 'instinctive',
} as const;
export type PreferredRythm = typeof PreferredRythmOptions[keyof typeof PreferredRythmOptions];

export const SocialInteractionStyleOptions = {
  RESERVED_BUT_OPEN: 'reserved_but_open',
  AUTHENTIC_RESONANCE_SEEKER: 'authentic_resonance_seeker',
  OBSERVER_FIRST: 'observer_first',
  EXPRESSIVE_DIRECT_SHARER: 'expressive_direct_sharer',
} as const;
export type SocialInteractionStyle = typeof SocialInteractionStyleOptions[keyof typeof SocialInteractionStyleOptions];

export const ReactionToTouchedOptions = {
  DISCREET_ECHO: 'discreet_echo',
  READ_MORE_RESONANCES: 'read_more_resonances',
  CONNECT_LATER_IF_STRONG: 'connect_later_if_strong',
  // FIX: Incomplete value corrected.
  STAY_ANONYMOUS_FOR_NOW: 'stay_anonymous_for_now',
} as const;
export type ReactionToTouched = typeof ReactionToTouchedOptions[keyof typeof ReactionToTouchedOptions];

export const ProfessionCategoryOptions = {
    TECH_INFO: 'tech_info',
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
    AUTRE: 'autre',
    NE_SOUHAITE_PAS_REPONDRE: 'ne_souhaite_pas_repondre',
} as const;
export type ProfessionCategory = typeof ProfessionCategoryOptions[keyof typeof ProfessionCategoryOptions];

// Onboarding and User Profile Interfaces
export interface OnboardingData {
  firstName: string;
  gender: UserProfile['gender'];
  ageRange: AgeRange;
  location: string;
  onboardingIntentText: string;
  socialInteractionStyle: SocialInteractionStyle;
  datingPreferences: DatingPreferences;
  profilePicture?: string;
}

export interface UserProfile {
  firstName: string;
  gender: 'female' | 'male' | 'other' | 'prefer_not_to_say';
  ageRange: AgeRange;
  location: string;
  onboardingIntentText: string;
  socialInteractionStyle: SocialInteractionStyle;
  
  isOnboarded: boolean;
  totalXP: number;
  xpMiroir: number;
  joinDate: string;
  lastActivityDate: string;
  emotionalXP: { [key: string]: number };
  hasReceivedOnboardingXP: boolean;
  isPremium: boolean;
  participatedWorkshopIds: string[];
  subscribedWorkshopIds?: string[];
  favoritedWorkshopIds?: string[];
  followedParticipantNames?: string[];
  currentLiveWorkshopId?: string | null;
  profilePicture?: string;
  
  professionCategory: ProfessionCategory;
  currentFeelings: CurrentFeeling[];
  aspirations: Aspiration[];
  otherAspirationText: string | null;
  preferredRythm: PreferredRythm;
  reactionToTouched: ReactionToTouched;
  essentialLimits: string[];
  flexiblePreferences: Record<string, number>;
  positiveRequests: string[];
  myManualText: string;
  biography?: string;
  energyAndMotivation?: {
    energizers: string[];
    drainers: string[];
    coreValues: string[];
  };
  xpBoostPurchasedForLevels?: Record<number, boolean>;
  aiMatch?: AIMatchData;
  lastSeenAppVersion: string;
  datingPreferences: DatingPreferences;
}

// Chat and Workshop State types
export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  isUser: boolean;
  isSystem?: boolean;
  reactions?: { [emoji: string]: number };
}

export interface ParticipantProfileInfo {
    name: string;
    totalXP: number;
    currentLevel: LevelInfo;
    isAI: boolean;
    gender: 'female' | 'male' | 'other' | 'prefer_not_to_say';
    avatarUrl?: string;
    avatarSeed?: string;
    awardedXpCounts: { [xpType: string]: number };
    workshopsAttended?: number;
    activityStatus?: string;
    badges?: Badge[];
    biography?: string;
    profession?: string;
    hobbies?: string[];
    age?: number;
}

export interface LiveWorkshopGlobalState {
  workshopId: string;
  workshopTitle: string;
  workshopDetails: WorkshopTheme;
  messages: ChatMessage[];
  chatSession: Chat | null;
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
  isRelanceProposed?: boolean;
}

export interface SoloWorkshopState {
  workshopId: string;
  messages: ChatMessage[];
  chatSession: Chat | null;
  isLoading: boolean;
  error: string | null;
  isCompleted: boolean;
}

// Private Chat and Affinities types
export interface PrivateChatMessage {
  id: string;
  text: string;
  timestamp: Date;
  isUser: boolean;
  isSystem?: boolean;
  sender: string;
}

export interface PrivateChatSessionState {
  matchId: string;
  messages: PrivateChatMessage[];
  chatSession: Chat | null;
  isLoading: boolean;
  error: string | null;
  typingAIMatchName: string | null;
}

export interface ResonancePoint {
  icon: string;
  text: string;
}

export interface AIMatchProfile extends ParticipantProfileInfo {
    personaKey: string;
}

export interface AIMatchData {
    profile: AIMatchProfile;
    chatHistory: PrivateChatMessage[];
    mutualXPWithMatch: number;
    lastInteractionDate: string;
    lastAIMessageType: 'greeting' | 'relance' | null;
    aiMatchLastInitiationTimestamp: number;
    hasUnreadMessages: boolean;
    resonancePoints?: ResonancePoint[];
}

// Echos and Introspection types
export interface UserEcho {
  questionPrompt: string;
  text: string;
}

export interface UserReply {
  text: string;
}

export interface AIAnalysisResult {
    themes: string[];
    followUpQuestion: string;
    xpAward: {
        typeKey: string;
        typeName: string;
        amount: number;
    } | null;
}

export interface DailyInteraction {
  id: string;
  timestamp: Date;
  userEcho?: UserEcho;
  userReply?: UserReply;
  aiAnalysis?: AIAnalysisResult;
}

export interface UserDailySubmission {
  id: string;
  date: string; // YYYY-MM-DD
  interactions: DailyInteraction[];
  resonancesFound: number;
  xpMiroirReceived: number;
  resonanceBonusAwarded?: boolean;
}

// Miscellaneous types
export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  isRead: boolean;
}

export interface UserJourneySummary {
  firstName: string;
  analysisTitle: string;
  analysisText: string;
  isExample: boolean;
  isLoading: boolean;
}

export interface Persona {
  key: string;
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
  timestamp: Date;
  userProfile: ParticipantProfileInfo;
  activityType: 'joined_workshop' | 'earned_xp' | 'completed_workshop';
  details: {
    workshopTitle?: string;
    xpAmount?: number;
    xpType?: string;
  };
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

export interface AppFeatureUpdate {
    title: string;
    description: string;
    icon: React.FC<IconProps>;
}

export interface AppVersion {
    version: string;
    date: string;
    features: AppFeatureUpdate[];
}

export interface MicroChallenge {
  id: number;
  title: string;
  description: string;
  duration: string;
}

export const DatingApproachOptions = {
    ACTIVE_OPTIMISTIC: 'active_optimistic',
    TAKING_BREAK: 'taking_break',
    OPEN_TO_OPPORTUNITIES: 'open_to_opportunities',
    JADED_FRUSTRATED: 'jaded_frustrated',
} as const;
export type DatingApproach = typeof DatingApproachOptions[keyof typeof DatingApproachOptions];

export const DatingAppFeelingOptions = {
    MAIN_TOOL: 'main_tool',
    EXHAUSTING: 'exhausting',
    NECESSARY_EVIL: 'necessary_evil',
    DONT_USE: 'dont_use',
} as const;
export type DatingAppFeeling = typeof DatingAppFeelingOptions[keyof typeof DatingAppFeelingOptions];

export const DatingChallengeOptions = {
    STARTING_CONVO: 'starting_convo',
    BEING_MYSELF: 'being_myself',
    ONLINE_TO_IRL: 'online_to_irl',
    KEEPING_INTEREST: 'keeping_interest',
} as const;
export type DatingChallenge = typeof DatingChallengeOptions[keyof typeof DatingChallengeOptions];

export const DatingGoalOptions = {
    DEEP_CONNECTION: 'deep_connection',
    LIGHT_FUN: 'light_fun',
    FEEL_UNDERSTOOD: 'feel_understood',
    UNSURE_EXPLORING: 'unsure_exploring',
} as const;
export type DatingGoal = typeof DatingGoalOptions[keyof typeof DatingGoalOptions];

export const DatingSelfPerceptionOptions = {
    CONFIDENT: 'confident',
    OVERTHINKING: 'overthinking',
    PLAYING_A_ROLE: 'playing_a_role',
    HOPEFUL_GUARDED: 'hopeful_guarded',
} as const;
export type DatingSelfPerception = typeof DatingSelfPerceptionOptions[keyof typeof DatingSelfPerceptionOptions];

export interface DatingPreferences {
    approach: DatingApproach;
    appFeeling: DatingAppFeeling;
    challenge: DatingChallenge;
    goal: DatingGoal;
    selfPerception: DatingSelfPerception;
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

export interface ParticipantProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    participant: ParticipantProfileInfo | null;
    onAwardXPToAI?: (aiParticipantName: string, xpType: string, amount: number) => void;
    xpActivatedForWorkshop?: string[];
    displayMode?: 'full' | 'profileOnly' | 'xpOnly' | 'feed';
    onFindInWorkshop?: (participantName: string) => void;
    onSubscribeToNextWorkshop?: (participantName: string) => void;
    onUnfollowParticipant?: (participantName: string) => void;
    followedParticipantNames?: string[];
}