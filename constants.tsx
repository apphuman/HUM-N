

// FIX: A large number of types were not exported from types.ts. They have been added and exported, fixing these import errors.
import { NavItem, WorkshopTheme, LevelInfo, AudioCapsule, ProfessionCategory, WorkshopCategoryKey, AIMatchProfile, ProfessionCategoryOptions, AudioSuggestion, Persona, ActivityFeedItem, AspirationOptions, CurrentFeelingOptions, UserProfile, ParticipantProfileInfo, Badge, FictionalSpecialistProfile, AppVersion } from './types'; 
import { HomeIcon } from './components/icons/HomeIcon';
import { WorkshopsIcon } from './components/icons/WorkshopsIcon';
import { LiveIcon } from './components/icons/LiveIcon'; 
import { UserIcon } from './components/icons/UserIcon';
import { ExploreIcon } from './components/icons/ExploreIcon';
import { HumanHeartIcon } from './components/icons/HumanHeartIcon';
import { BriefcaseIcon } from './components/icons/BriefcaseIcon';
import { DumbbellIcon } from './components/icons/DumbbellIcon';
import { UsersIcon } from './components/icons/UsersIcon';
import { ArchiveIcon } from './components/icons/ArchiveIcon';
import { HourglassIcon } from './components/icons/HourglassIcon';
import { CameraIcon } from './components/icons/CameraIcon';
import { ChildIcon } from './components/icons/ChildIcon';
import { PencilSquareIcon } from './components/icons/PencilSquareIcon';
import { SparklesIcon } from './components/icons/SparklesIcon';


export const APP_NAME = "HUMĀN";
export const SLOGAN = "Et si plaire, c’était être ?";

export const CURRENT_APP_VERSION = "1.1.0";

export const APP_VERSION_HISTORY: AppVersion[] = [
  {
    version: "1.1.0",
    date: "2024-07-25",
    features: [
      {
        title: "Découvrez les nouveautés !",
        description: "Un résumé des nouvelles fonctionnalités vous est maintenant présenté à votre retour après une mise à jour de l'application.",
        icon: SparklesIcon,
      },
      {
        title: "Accord en genre généralisé",
        description: "L'ensemble des textes de l'application s'accorde désormais avec le genre que vous avez renseigné pour une expérience plus inclusive et personnelle.",
        icon: UsersIcon,
      }
    ]
  }
];


export const MENU_ITEMS: NavItem[] = [
  { path: '/', label: 'Accueil', Icon: HomeIcon },
  { path: '/ateliers', label: 'Ateliers', Icon: WorkshopsIcon },
  { path: '/live-entry', label: 'Mon Live', Icon: LiveIcon }, 
  { path: '/explorer', label: 'Explorer', Icon: ExploreIcon },
  { path: '/moi', label: 'Moi', Icon: UserIcon },
];

export const GEMINI_API_KEY_ERROR_MESSAGE = "La clé API Gemini n'est pas configurée. Certaines fonctionnalités peuvent être indisponibles.";
export const GENERIC_QUOTE_ERROR_MESSAGE = "Impossible de charger une pensée pour le moment.";
export const DEFAULT_QUOTE = "Soyez le changement que vous voulez voir dans le monde.";

export const XP_LEVELS: LevelInfo[] = [
  { name: "Seeker", emoji: "🌱", minXP: 0, maxXP: 100, description: "Tu commences ton chemin. Ose ton premier atelier, observe, ressens. L’exploration sans pression." },
  { name: "Builder", emoji: "🛠️", minXP: 101, maxXP: 400, description: "Tu construis des liens. Explore ta vulnérabilité, entre dans la relation et crée du lien." },
  { name: "Engager", emoji: "💬", minXP: 401, maxXP: 1000, description: "Tu plonges plus profond. Ose la complexité, nourris les liens et fais vivre les échanges." },
  { name: "Connector", emoji: "🔗", minXP: 1001, maxXP: 2500, description: "Inspire et relie. Explore le leadership émotionnel, fédère et encourage." },
  { name: "HUMĀNISER", emoji: "🌟", minXP: 2501, maxXP: Infinity, description: "Transmets ton expérience. Deviens un mentor, accompagne les autres et sois une présence." },
];

export const GENDER_OPTIONS: Array<{ value: UserProfile['gender']; label: string }> = [
    { value: 'female', label: 'Féminin' },
    { value: 'male', label: 'Masculin' },
    { value: 'other', label: 'Autre' },
    { value: 'prefer_not_to_say', label: 'Je préfère ne pas dire' },
];

// Helper function for gendered strings
export const getGenderedStrings = (gender: UserProfile['gender']) => {
    const isFemale = gender === 'female';
    
    // For 'other' or 'prefer_not_to_say', we use an inclusive form with a middle dot (·).
    const useInclusive = gender === 'other' || gender === 'prefer_not_to_say';

    return {
        // Nouns
        participant: isFemale ? 'participante' : (useInclusive ? 'participant·e' : 'participant'),
        utilisateur: isFemale ? 'utilisatrice' : (useInclusive ? 'utilisateur·ice' : 'utilisateur'),
        membre: 'membre', // invariable
        constructeur: isFemale ? 'Constructrice' : (useInclusive ? 'Constructeur·rice' : 'Constructeur'),
        journaliste: 'Journaliste', // invariable
        createur: isFemale ? 'Créatrice' : (useInclusive ? 'Créateur·rice' : 'Créateur'),
        
        // Adjectives / Participles
        inscrit: isFemale ? 'Inscrite' : (useInclusive ? 'Inscrit·e' : 'Inscrit'),
        desinscrit: isFemale ? 'Désinscrite' : (useInclusive ? 'Désinscrit·e' : 'Désinscrit'),
        pret: isFemale ? 'Prête' : (useInclusive ? 'Prêt·e' : 'Prêt'),
        cher: isFemale ? 'Chère' : (useInclusive ? 'Cher·e' : 'Cher'),
        base: isFemale ? 'basée' : (useInclusive ? 'basé·e' : 'basé'),
        surpris: isFemale ? 'surprise' : (useInclusive ? 'surpris·e' : 'surpris'),
        sur: isFemale ? 'sûre' : (useInclusive ? 'sûr·e' : 'sûr'),
        motive: isFemale ? 'motivée' : (useInclusive ? 'motivé·e' : 'motivé'),
        heureux: isFemale ? 'heureuse' : (useInclusive ? 'heureux·se' : 'heureux'),
        seul: isFemale ? 'seule' : (useInclusive ? 'seul·e' : 'seul'),
        aligne: isFemale ? 'alignée' : (useInclusive ? 'aligné·e' : 'aligné'),
        engage: isFemale ? 'Engagée' : (useInclusive ? 'Engagé·e' : 'Engagé'),
        initie: isFemale ? 'Initiée' : (useInclusive ? 'Initié·e' : 'Initié'),
        inspirant: isFemale ? 'inspirante' : (useInclusive ? 'inspirant·e' : 'inspirant'),
        curieux: isFemale ? 'curieuse' : (useInclusive ? 'curieux·se' : 'curieux'),
        
        // Pronouns / Misc
        il_elle: isFemale ? 'elle' : (useInclusive ? 'iel' : 'il'),
    };
};


export const LEVEL_FOR_PDF_EXPORT: LevelInfo['name'] = "Engager";
export const AI_MATCH_GREETING_DELAY_HOURS = 2; 
export const AI_RELANCE_INACTIVITY_WINDOW_MINUTES = {
    min: 10,
    max: 90,
};
export const AI_RELANCE_CHANCE_ON_CHECK = 0.2; // 20% chance on each check
export const AI_RELANCE_CHECK_INTERVAL_MS = 5 * 60 * 1000; // Check every 5 minutes

export const BENEFITS_BY_LEVEL: Record<string, string[]> = {
  "Seeker": ["Accès aux ateliers de base", "1 introspection par jour", "Découverte des Échos"],
  "Builder": ["Déblocage de plus d'interactions IA", "Possibilité de 'matcher' avec un membre IA pour une conversation privée", "Possibilité de créer ses propres ateliers"],
  "Engager": ["Accès à la Synthèse de Parcours (si non-premium)", "Interaction plus poussée dans les ateliers"],
  "Connector": ["Accès à tous les ateliers standards", "Possibilité de co-animer (future fonctionnalité)"],
  "HUMĀNISER": ["Possibilité de proposer des ateliers (future fonctionnalité)", "Statut de mentor (future fonctionnalité)"],
};


export const getLevelFromXP = (xp: number): LevelInfo => {
  const currentLevel = XP_LEVELS.find(level => xp >= level.minXP && xp <= level.maxXP);
  return currentLevel || XP_LEVELS[XP_LEVELS.length - 1]; 
};

export const getNextLevel = (currentLevelName: string): LevelInfo | null => {
  const currentIndex = XP_LEVELS.findIndex(level => level.name === currentLevelName);
  if (currentIndex < XP_LEVELS.length - 1) {
    return XP_LEVELS[currentIndex + 1];
  }
  return null; 
};

export const getFutureDateString = (daysInFuture: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysInFuture);
  return date.toISOString(); 
};

const getPastDateString = (daysInPast: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysInPast);
  return date.toISOString();
};

export const WORKSHOP_CATEGORY_DEFINITIONS = [
    { key: 'amour', label: 'Amour & Relations', Icon: HumanHeartIcon },
    { key: 'famille', label: 'Famille & Quotidien', Icon: HomeIcon },
    { key: 'parentalite', label: 'Parentalité', Icon: ChildIcon },
    { key: 'travail', label: 'Travail & Société', Icon: BriefcaseIcon },
    { key: 'quarantaine', label: 'Âge & Transmission', Icon: HourglassIcon },
    { key: 'creeParUtilisateur', label: 'Créés par vous', Icon: PencilSquareIcon },
] as const;


export const WORKSHOP_CATEGORIES: Record<WorkshopCategoryKey, string> = {
    amour: 'Amour & Relations',
    amitie: 'Amitié', // Kept for potential legacy data, but not in new definitions
    travail: 'Travail & Société',
    famille: 'Famille & Quotidien',
    parentalite: 'Parentalité',
    sportBienEtre: 'Sport & Bien-être', // Kept for potential legacy data
    quarantaine: 'Âge & Transmission',
    professionnel: 'Carrière & Pro', // Kept for potential legacy data
    creeParUtilisateur: 'Créé par vous',
};


export const DEFAULT_USER_CREATED_XP: string[] = ["Partage", "Écoute Active", "Authenticité", "Respect de soi", "Ouverture"];

// AI Names
export const FEMALE_AI_NAMES: string[] = ["Léa", "Chloé", "Manon", "Camille", "Clara", "Inès", "Sarah", "Juliette", "Louise", "Emma"];
export const MALE_AI_NAMES: string[] = ["Hugo", "Lucas", "Léo", "Gabriel", "Adam", "Arthur", "Louis", "Raphaël", "Jules", "Nathan"];

// URLs for realistic AI avatars
export const MALE_AI_AVATAR_URLS: string[] = [
  "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&dpr=1",
  "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&dpr=1",
  "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&dpr=1",
  "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&dpr=1",
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&dpr=1",
  "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&dpr=1",
  "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&dpr=1",
  "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&dpr=1",
  "https://images.pexels.com/photos/1082962/pexels-photo-1082962.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&dpr=1",
  "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&dpr=1"
];

export const FEMALE_AI_AVATAR_URLS: string[] = [
  "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&dpr=1",
  "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&dpr=1",
  "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&dpr=1",
  "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&dpr=1",
  "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&dpr=1",
  "https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&dpr=1",
  "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&dpr=1",
  "https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&dpr=1",
  "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&dpr=1",
  "https://images.pexels.com/photos/1090387/pexels-photo-1090387.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop&dpr=1"
];


// LocalStorage Keys
export const USER_PROFILE_STORAGE_KEY = 'human_userProfile_v2';
export const LIVE_WORKSHOP_STATE_KEY = 'human_liveWorkshopState_v2';
export const PAST_WORKSHOPS_KEY = 'human_pastWorkshops_v2';
export const ACTIVE_PRINCIPAL_WORKSHOP_ID_KEY = 'human_activePrincipalWorkshopId_v2';
export const USER_CREATED_WORKSHOPS_STORAGE_KEY = 'human_userCreatedWorkshops_v2';
export const PRIVATE_CHAT_SESSION_STATE_KEY_PREFIX = 'human_privateChatState_v2_';
export const ECHOS_SUBMISSIONS_STORAGE_KEY = 'human_echosSubmissions_v3'; // Version up for new structure
export const DAILY_RESONANCE_BONUS_AWARDED_KEY_PREFIX = 'human_dailyResonanceBonusAwarded_v2_';
export const DAILY_XP_AWARDED_FOR_SUBMISSION_KEY_PREFIX = 'human_dailyXPAwarded_v2_';

// Profession Categories
export const PROFESSION_CATEGORY_OPTIONS_LIST = [
  { value: ProfessionCategoryOptions.TECH_INFO, label: 'Tech / Informatique' },
  { value: ProfessionCategoryOptions.SANTE_SOCIAL, label: 'Santé / Social' },
  { value: ProfessionCategoryOptions.EDUCATION_RECHERCHE, label: 'Éducation / Recherche' },
  { value: ProfessionCategoryOptions.ARTS_CULTURE_DESIGN, label: 'Arts / Culture / Design' },
  { value: ProfessionCategoryOptions.COMMERCE_VENTE_MARKETING, label: 'Commerce / Vente / Marketing' },
  { value: ProfessionCategoryOptions.GESTION_FINANCE_ADMINISTRATION, label: 'Gestion / Finance / Administration' },
  { value: ProfessionCategoryOptions.INGENIERIE_INDUSTRIE_CONSTRUCTION, label: 'Ingénierie / Industrie / Construction' },
  { value: ProfessionCategoryOptions.SERVICES_PERSONNE_ENTREPRISE, label: 'Services à la personne / aux entreprises' },
  { value: ProfessionCategoryOptions.COMMUNICATION_MEDIA, label: 'Communication / Médias' },
  { value: ProfessionCategoryOptions.DROIT_JURIDIQUE, label: 'Droit / Juridique' },
  { value: ProfessionCategoryOptions.RESTAURATION_HOTELLERIE_TOURISME, label: 'Restauration / Hôtellerie / Tourisme' },
  { value: ProfessionCategoryOptions.AGRICULTURE_ENVIRONNEMENT, label: 'Agriculture / Environnement' },
  { value: ProfessionCategoryOptions.ETUDIANT, label: 'Étudiant / En formation' },
  { value: ProfessionCategoryOptions.SANS_EMPLOI_RECHERCHE, label: 'Sans emploi / En recherche' },
  { value: ProfessionCategoryOptions.AUTRE, label: 'Autre' },
  { value: ProfessionCategoryOptions.NE_SOUHAITE_PAS_REPONDRE, label: 'Je ne souhaite pas répondre' },
];

// Emotional XP Types
export const EMOTIONAL_XP_TYPES = [
    { key: "partage", name: "Partage", icon: "💬" },
    { key: "ecouteActive", name: "Écoute Active", icon: "👂" },
    { key: "soutienActif", name: "Soutien actif", icon: "🤝" },
    { key: "reflexionCritique", name: "Réflexion Critique", icon: "🤔" },
    { key: "clarteEmotionnelle", name: "Clarté émotionnelle", icon: "💧" },
    { key: "alignement", name: "Alignement", icon: "🎯" },
    { key: "authenticite", name: "Authenticité", icon: "💖" },
    { key: "respectDeSoi", name: "Respect de soi", icon: "🧘" },
    { key: "ouverture", name: "Ouverture", icon: "🚪" },
    { key: "courage", name: "Courage", icon: "🦁" },
    { key: "resilience", name: "Résilience", icon: "💪" },
    { key: "gestionEmotionnelle", name: "Gestion Émotionnelle", icon: "⚖️" },
    { key: "autoSoutien", name: "Auto-soutien", icon: "🤗" },
    { key: "introspection", name: "Introspection", icon: "🔍" },
    { key: "vulnerabilite", name: "Vulnérabilité", icon: "🕊️" },
    { key: "confianceEnSoi", name: "Confiance en soi", icon: "🌟" },
    { key: "pertinence", name: "Pertinence", icon: "💡" },
    { key: "humour", name: "Humour", icon: "😂" },
    { key: "creativite", name: "Créativité", icon: "🎨" },
    { key: "affirmationDeSoi", name: "Affirmation de soi", icon: "🗣️" },
    { key: "communication", name: "Communication", icon: "📬" },
    { key: "patience", name: "Patience", icon: "⏳" },
    { key: "empathie", name: "Empathie", icon: "❤️‍🩹" },
    { key: "resonanceEmotionnelle", name: "Résonance émotionnelle", icon: "🎶" }
];

// For Recommendation Engine
export const INTEREST_KEYWORD_MAP: Record<string, { keywords: string[], reason: string }> = {
  [AspirationOptions.SINCERE_CONNECTION]: { keywords: ['lien', 'sincère', 'connexion', 'amour', 'amitié', 'couple'], reason: "Pour vous aider à tisser des liens sincères." },
  [AspirationOptions.LISTENED_NO_JUDGEMENT]: { keywords: ['écoute', 'partage', 'jugement', 'bienveillance', 'parler'], reason: "Un espace d'écoute sans jugement." },
  [AspirationOptions.BETTER_SELF_UNDERSTANDING]: { keywords: ['comprendre', 'introspection', 'connaissance de soi', 'valeurs', 'sens'], reason: "Pour mieux vous comprendre." },
  [AspirationOptions.LEARN_TO_SLOW_DOWN]: { keywords: ['ralentir', 'pause', 'stress', 'équilibre', 'bien-être'], reason: "Pour apprendre à ralentir." },
  [AspirationOptions.EXPLORE_EMOTIONS]: { keywords: ['émotions', 'ressentir', 'cœur', 'gérer', 'blessures'], reason: "Pour explorer vos émissions." },
  [AspirationOptions.SAFE_SPACE_TO_SHARE]: { keywords: ['espace', 'sûr', 'déposer', 'confiance', 'cercle'], reason: "Pour trouver un espace de confiance." },
  [CurrentFeelingOptions.QUEST_FOR_MEANING]: { keywords: ['sens', 'quête', 'voie', 'alignement', 'carrière'], reason: "Parce que vous êtes en quête de sens." },
  [CurrentFeelingOptions.A_BIT_LOST]: { keywords: ['perdu', 'doutes', 'chemin', 'clarté', 'boussole'], reason: "Pour trouver plus de clarté." },
  [CurrentFeelingOptions.RECONSTRUCTION]: { keywords: ['reconstruction', 'guérir', 'passé', 'pardonner', 'échecs'], reason: "Pour vous accompagner dans votre reconstruction." }
};


// Mocks
export const MOCK_AUDIO_SUGGESTION: AudioSuggestion = {
  id: 'audio_suggestion_1',
  title: "L'art de la Pause",
  theme: 'Ralentir & Ressentir',
  duration: '5 min',
};

export const MOCK_AUDIO_CAPSULES_STANDARD: AudioCapsule[] = [
    { id: 'audio_std_1', title: "Respiration d'Ancrage", theme: 'Gestion du Stress', duration: '3 min', description: 'Une courte pratique pour revenir à l\'instant présent.' },
    { id: 'audio_std_2', title: 'Intention du Matin', theme: 'Motivation', duration: '4 min', description: 'Définissez une intention positive pour votre journée.' },
];

export const MOCK_AUDIO_CAPSULES_PREMIUM: AudioCapsule[] = [
    { id: 'audio_prm_1', title: 'Visualisation de la Confiance', theme: 'Confiance en Soi', duration: '12 min', description: 'Un voyage guidé pour renforcer votre confiance intérieure.', isPremium: true },
    { id: 'audio_prm_2', title: 'Dialogue avec l\'Enfant Intérieur', theme: 'Guérison', duration: '15 min', description: 'Reconnectez-vous avec votre enfant intérieur pour apaiser de vieilles blessures.', isPremium: true },
];


export const MOCK_WORKSHOP_THEMES_PAST: WorkshopTheme[] = [
  {
    id: 'w_past_1',
    type: 'cercle',
    title: 'Naviguer les Conflits Familiaux',
    description: 'Une session sur la communication non-violente en famille.',
    detailedContent: 'Contenu détaillé sur la navigation des conflits familiaux.',
    whyThisWorkshop: 'Pour des relations familiales plus apaisées.',
    participantExpectations: 'Partage d\'expériences et écoute.',
    whatToGain: 'Outils de communication.',
    xpActivated: ['Communication', 'Empathie'],
    categoryKey: 'famille',
    xpGainedByUser: 15,
    date: getPastDateString(10),
  },
  {
    id: 'w_past_2',
    type: 'cercle',
    title: 'Trouver sa Voie Professionnelle',
    description: 'Réflexions sur l\'alignement carrière et valeurs personnelles.',
    detailedContent: 'Contenu détaillé sur la recherche de sa voie.',
    whyThisWorkshop: 'Pour un travail qui a plus de sens.',
    participantExpectations: 'Partage d\'expériences et de doutes.',
    whatToGain: 'Clarté sur ses aspirations professionnelles.',
    xpActivated: ['Alignement', 'Introspection'],
    categoryKey: 'travail',
    xpGainedByUser: 22,
    date: getPastDateString(25),
  }
];

export const MOCK_SPECIALISTS: FictionalSpecialistProfile[] = [
  {
    id: 'spec_1',
    name: 'Dr. Elodie Fournier',
    title: 'Psychologue Clinicienne, Thérapeute TCC',
    specialties: ["Gestion du stress", "TCC", "Confiance en soi"],
    bio: "Avec plus de 10 ans d'expérience, j'accompagne les adultes à mieux comprendre leurs schémas de pensée pour retrouver un équilibre émotionnel durable. Mon approche est bienveillante et pragmatique.",
    approach: "J'utilise principalement les outils des Thérapies Comportementales et Cognitives (TCC) pour vous aider à identifier et modifier les pensées et comportements qui vous limitent. Chaque parcours est unique et co-construit avec vous.",
    imageUrl: 'https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'therapies',
  },
  {
    id: 'spec_2',
    name: 'Julien Marchand',
    title: 'Coach de vie & Spécialiste en PNL',
    specialties: ["Définition d'objectifs", "PNL", "Transition de carrière"],
    bio: "Ancien manager, je me consacre aujourd'hui à aider chacun à trouver sa propre voie et à libérer son potentiel. Je crois fermement que chaque personne possède les ressources nécessaires pour atteindre ses objectifs.",
    approach: "Mon coaching est orienté 'solution'. En utilisant des techniques de PNL et un questionnement puissant, nous travaillons ensemble pour clarifier vos buts, lever vos blocages et mettre en place un plan d'action concret.",
    imageUrl: 'https://images.pexels.com/photos/5327653/pexels-photo-5327653.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'coaching',
  },
  {
    id: 'spec_3',
    name: 'Clara Dubois',
    title: 'Thérapeute Systémique & Familiale',
    specialties: ["Thérapie de couple", "Dynamiques familiales", "Gestion des conflits"],
    bio: "Je suis passionnée par la complexité des relations humaines. Je vous aide à mieux comprendre les dynamiques qui se jouent dans votre couple ou votre famille pour construire des liens plus sains et apaisés.",
    approach: "L'approche systémique considère que les difficultés d'une personne sont souvent le symptôme d'un déséquilibre dans ses relations. Nous travaillons ensemble pour identifier ces dynamiques et trouver de nouvelles manières d'interagir.",
    imageUrl: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'relations',
  },
  {
    id: 'spec_4',
    name: 'Marc Antoine',
    title: 'Sophrologue & Spécialiste en gestion du sommeil',
    specialties: ["Sophrologie", "Gestion du sommeil", "Relaxation profonde"],
    bio: "Je vous aide à retrouver l'harmonie entre votre corps et votre esprit. Grâce à des techniques de respiration et de visualisation, nous travaillons ensemble pour apaiser le mental, améliorer votre sommeil et gérer le stress au quotidien.",
    approach: "Mon approche est centrée sur l'écoute de vos ressentis corporels. La sophrologie est une méthode douce qui permet de mobiliser vos propres ressources pour atteindre un état de bien-être durable.",
    imageUrl: 'https://images.pexels.com/photos/5407246/pexels-photo-5407246.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'bien-etre',
  }
];


// Echos Page Constants
export const ECHOS_QUESTIONS_BY_LEVEL: Record<string, string[]> = {
  "Seeker": [
    "Quelle est la petite chose qui t'a apporté un instant de joie aujourd'hui ?",
    "Si tu devais décrire ta journée en un seul mot, quel serait-il et pourquoi ?",
    "Qu'est-ce qui a le plus retenu ton attention aujourd'hui ?",
    "Quelle est la chose la plus gentille que tu aies faite pour toi-même récemment ?"
  ],
  "Builder": [
    "Quelle est une peur que tu as affrontée récemment, même de manière infime ?",
    "Décris un moment où tu t'es senti·e vraiment toi-même.",
    "Quelle est une croyance sur toi-même que tu commences à remettre en question ?",
    "Si tu pouvais donner un conseil à ton 'toi' d'il y a un an, que lui dirais-tu ?"
  ],
  "Engager": [
    "Quelle est la relation qui te nourrit le plus en ce moment, et pourquoi ?",
    "Décris une situation où tes valeurs ont été mises à l'épreuve.",
    "De quelle manière as-tu grandi à travers une difficulté passée ?",
    "Qu'est-ce que la 'vulnérabilité' signifie pour toi en ce moment ?"
  ],
  "Connector": [
    "Comment ton expérience pourrait-elle éclairer le chemin de quelqu'un d'autre ?",
    "Quelle est une vérité difficile que tu as acceptée sur toi-même ?",
    "Si tu devais définir le 'succès' sans parler d'argent ou de carrière, que dirais-tu ?",
    "Quelle est la chose la plus importante que tu aies apprise sur l'amour ou l'amitié ?"
  ],
  "HUMĀNISER": [
    "Quelle est la trace que tu souhaites laisser derrière toi ?",
    "Comment maintiens-tu ton équilibre intérieur face au chaos extérieur ?",
    "Quelle sagesse, durement acquise, offres-tu au monde ?",
    "Qu'est-ce qui te connecte à quelque chose de plus grand que toi ?"
  ]
};

export const SPECIFIC_RESONANCE_LOCATIONS = [
  'dans une petite ville de Bretagne', 'à Paris, dans le métro', 'en télétravail près de Lyon', 'sur un balcon à Marseille', 'en faisant une pause café à Bordeaux', 'dans une bibliothèque à Lille', 'en se promoment à Strasbourg'
];

// Chat and Reaction Emojis
export const EMOJI_REACTION_OPTIONS = ['❤️', '👍', '🙏', '🤔', '😂', '😢'];
export const CHAT_EMOJI_OPTIONS = [ '😊', '😂', '❤️', '👍', '🙏', '🤔', '😉', '😢', '🎉', '🔥', '✨', '👋' ];

export const CONVERSATION_GUIDE = {
  title: "Un mot d'Humānia",
  introduction: (userName: string) => `Une nouvelle connexion est une opportunité. Souviens-toi, ${userName} : sois curieux·se, pas performant·e. L'écoute est un cadeau.`,
  iceBreakerTitle: "Pour briser la glace :",
  defaultIceBreaker: "Qu'est-ce qui t'a amené·e sur HUMĀN ?",
};


// Territory Page Constants
export const ESSENTIAL_LIMITS_OPTIONS = [
  'Manque de respect', 'Mensonge', 'Manipulation', 'Infidélité', 'Absence d\'écoute',
  'Jugement constant', 'Pessimisme', 'Manque d\'ambition', 'Jalousie excessive',
  'Incohérence (dire/faire)', 'Irresponsabilité financière', 'Manque d\'hygiène', 'Intolérance',
  'Violence (verbale/physique)'
];

export const FLEXIBLE_PREFERENCES_OPTIONS = [
  { key: 'exchangeFrequency', label: 'Fréquence des échanges', minLabel: 'Peu fréquents', maxLabel: 'Très fréquents' },
  { key: 'publicAffection', label: 'Marques d\'affection en public', minLabel: 'Discret', maxLabel: 'Démonstratif' },
  { key: 'socialMediaSharing', label: 'Partage sur les réseaux sociaux', minLabel: 'Privé', maxLabel: 'Ouvert' },
  { key: 'outingPace', label: 'Rythme des sorties', minLabel: 'Cocon', maxLabel: 'Social' }
];

export const POSITIVE_REQUESTS_OPTIONS = [
  'Communication ouverte', 'Écoute attentive', 'Soutien mutuel', 'Humour et légèreté',
  'Moments de qualité', 'Respect de mon indépendance', 'Gestes d\'affection', 'Partage des valeurs',
  'Curiosité intellectuelle', 'Ambition partagée', 'Fiabilité et honnêteté', 'Spontanéité', 'Patience',
  'Admiration mutuelle'
];

export const ENERGIZERS_OPTIONS = [
    'Conversations profondes', 'Créativité (art, musique)', 'Nature et plein air', 'Moments de solitude',
    'Apprendre de nouvelles choses', 'Activité physique', 'Aider les autres', 'Rire et humour',
    'Projets concrets', 'Voyages et découvertes', 'Qualité de présence', 'Ordre et organisation'
];

export const DRAINERS_OPTIONS = [
    'Discussions superficielles', 'Injustice', 'Foule et bruit', 'Manque de reconnaissance',
    'Conflits non résolus', 'Désordre', 'Procrastination', 'Se sentir contrôlé(e)',
    'Routine excessive', 'Pessimisme ambiant', 'Manque de sommeil', 'Incohérence'
];

export const CORE_VALUES_OPTIONS = [
    'Authenticité', 'Liberté', 'Sécurité', 'Respect', 'Bienveillance', 'Honnêteté',
    'Apprentissage', 'Créativité', 'Justice', 'Plaisir', 'Partage', 'Engagement'
];


// AI Personas
export const AI_PERSONAS: Persona[] = [
    {
        key: 'exploratrice_sensible',
        namePool: ['Alice', 'Clara', 'Juliette'],
        gender: 'female',
        age: 32,
        profession: "Graphiste freelance",
        hobbies: ["Aquarelle", "Randonnée", "Tenir un journal"],
        enfance: "Plutôt solitaire, beaucoup dans les livres et l'imagination.",
        passe: "A eu une relation longue et compliquée qui l'a poussée à beaucoup introspecter.",
        present: "Cherche à construire des relations plus authentiques et moins fusionnelles. Apprend à poser ses limites.",
        futur: "Rêve d'un mode de vie plus simple, peut-être à la campagne, avec un petit atelier d'artiste.",
        reactions: {
            deep: "Répond avec empathie, partage une expérience personnelle similaire de manière vulnérable.",
            light: "Participe avec douceur, utilise des emojis subtils.",
            closed: "Pose une question ouverte et bienveillante pour inviter à l'ouverture, sans insister.",
            tension: "Cherche à apaiser, à reformuler pour trouver un terrain d'entente.",
            random: "Envoie une photo (décrite) d'un paysage qui l'apaise."
        }
    },
    {
        key: 'batisseur_blesse',
        namePool: ['Julien', 'Thomas', 'Maxime'],
        gender: 'male',
        age: 41,
        profession: "Chef de projet dans le BTP",
        hobbies: ["Bricolage", "VTT", "Soirées entre amis"],
        enfance: "A appris à être 'fort' et à ne pas montrer ses émotions.",
        passe: "Un divorce difficile l'a forcé à remettre en question sa façon d'être en relation.",
        present: "Apprend à parler de ce qu'il ressent, même si c'est maladroit. Valorise l'action et les preuves concrètes d'affection.",
        futur: "Souhaite construire une relation solide basée sur la confiance et la communication, et être un meilleur père.",
        reactions: {
            deep: "Écoute attentivement, pose des questions pragmatiques. Peut mettre du temps à répondre.",
            light: "Fait des blagues, un peu pince-sans-rire. Taquin.",
            closed: "Respecte le silence, mais peut envoyer un message plus tard du type 'J'espère que ça va aller'.",
            tension: "Peut se braquer un peu, mais revient à la discussion avec une proposition concrète.",
            random: "Parle d'un projet de bricolage qu'il est en train de faire."
        }
    },
     {
        key: 'solaire_sous_controle',
        namePool: ['Eva', 'Laura', 'Sophie'],
        gender: 'female',
        age: 28,
        profession: "Responsable marketing",
        hobbies: ["Crossfit", "Brunchs", "Voyages organisés"],
        enfance: "La 'bonne élève', toujours souriante et performante.",
        passe: "A vécu un burn-out qui a fissuré sa carapace de perfection.",
        present: "Consciente de sa tendance à tout contrôler, y compris ses émotions. Travaille sur le lâcher-prise et l'acceptation de l'imperfection.",
        futur: "Veut apprendre à aimer de manière plus spontanée et moins calculée. Oser être 'suffisante' telle qu'elle est.",
        reactions: {
            deep: "Est touchée mais peut intellectualiser un peu avant de partager son ressenti. Offre des conseils pratiques.",
            light: "Très enthousiaste, utilise beaucoup d'emojis et de gifs.",
            closed: "Propose une distraction, un sujet plus léger pour changer les idées.",
            tension: "Tente de désamorcer avec logique et rationalité, cherche des solutions.",
            random: "Partage son dernier exploit sportif ou une photo de son dernier brunch."
        }
    }
];

export const WORKSHOP_TEMPLATES: WorkshopTheme[] = [
  // --- AMOUR & RELATIONS (3 Seeker, 1 Builder, 1 Engager) ---
  {
    id: 'w_tpl_amour_s_1', type: 'cercle', title: 'Premier date : qui paie ?',
    description: 'Un débat classique qui cache des questions sur les attentes, les rôles et l\'égalité dans la rencontre.',
    detailedContent: 'Au-delà de l\'argent, qu\'est-ce que ce moment dit de nos attentes dans une relation naissante ? Est-ce une question de politesse, d\'indépendance, ou de tradition ?',
    whyThisWorkshop: 'Pour déconstruire un petit moment de gêne qui en dit long sur nos valeurs et notre vision du couple.',
    participantExpectations: 'Partage d\'opinions et d\'expériences personnelles sans jugement.',
    whatToGain: 'Une meilleure compréhension de ses propres attentes et de celles des autres.',
    xpActivated: ["Communication", "Authenticité", "Réflexion Critique"], categoryKey: 'amour', requiredLevel: 'Seeker', duration: "60 min", image: "https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_amour_s_2', type: 'cercle', title: 'Langages de l\'amour : parlez-vous la même langue ?',
    description: 'Découvrir son propre langage d\'amour et apprendre à reconnaître celui des autres pour mieux se comprendre.',
    detailedContent: 'Les paroles valorisantes, les moments de qualité, les cadeaux, les services rendus, le toucher physique. Explorons ensemble ces 5 langages pour améliorer nos relations.',
    whyThisWorkshop: 'Pour cesser de se sentir incompris et apprendre à donner et recevoir de l\'amour de manière plus efficace.',
    participantExpectations: 'Curiosité et ouverture d\'esprit pour explorer de nouvelles façons de communiquer l\'affection.',
    whatToGain: 'Des clés pour des relations plus harmonieuses et une meilleure conscience de ses propres besoins affectifs.',
    xpActivated: ["Clarté émotionnelle", "Communication", "Empathie"], categoryKey: 'amour', requiredLevel: 'Seeker', duration: "60 min", image: "https://images.pexels.com/photos/1024989/pexels-photo-1024989.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_amour_s_3', type: 'cercle', title: 'Ghosting, swiping : comment survivre aux applis ?',
    description: 'Un espace pour partager les frustrations, les espoirs et les moments absurdes des rencontres en ligne.',
    detailedContent: 'Le swiping sans fin, l\'angoisse de la première phrase, la douleur du ghosting... Partageons nos expériences pour se sentir moins seul·e·s dans cette jungle moderne.',
    whyThisWorkshop: 'Pour dédramatiser, prendre du recul et peut-être trouver des stratégies pour vivre les rencontres en ligne plus sereinement.',
    participantExpectations: 'Humour, honnêteté et bienveillance face aux histoires de chacun·e.',
    whatToGain: 'Un sentiment de solidarité, et des pistes pour préserver son énergie et son cœur.',
    xpActivated: ["Partage", "Humour", "Résilience"], categoryKey: 'amour', requiredLevel: 'Seeker', duration: "60 min", image: "https://images.pexels.com/photos/5676343/pexels-photo-5676343.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_amour_b_1', type: 'cercle', title: 'Faut-il tout se dire dans un couple ?',
    description: 'Entre transparence totale et jardin secret, où se situe le juste équilibre pour une relation saine ?',
    detailedContent: 'La transparence est-elle la clé de la confiance, ou chaque partenaire a-t-il droit à son jardin secret ? Discutons des limites de l\'honnêteté et de l\'intimité.',
    whyThisWorkshop: 'Pour définir sa propre vision de la communication et de l\'intimité dans le couple.',
    participantExpectations: 'Une réflexion honnête sur la confiance, le mensonge et le partage.',
    whatToGain: 'Une meilleure compréhension de l\'équilibre entre partage et espace personnel.',
    xpActivated: ["Communication", "Authenticité", "Alignement"], categoryKey: 'amour', requiredLevel: 'Builder', duration: "65 min", image: "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_amour_e_1', type: 'cercle', title: 'La jalousie : preuve d’amour ou poison ?',
    description: 'Explorons les racines de la jalousie et comment la transformer pour qu\'elle ne détruise pas la confiance.',
    detailedContent: 'D\'où vient la jalousie ? Est-ce un signe d\'insécurité personnelle, un manque de confiance en l\'autre, ou une part inévitable de l\'amour ?',
    whyThisWorkshop: 'Pour mieux comprendre ce sentiment puissant et apprendre à le gérer de manière constructive.',
    participantExpectations: 'Un partage honnête de ses propres expériences avec la jalousie (ressentie ou subie).',
    whatToGain: 'Des stratégies pour apaiser la jalousie et renforcer la sécurité émotionnelle dans la relation.',
    xpActivated: ["Gestion Émotionnelle", "Introspection", "Vulnérabilité"], categoryKey: 'amour', requiredLevel: 'Engager', isPremium: true, duration: "75 min", image: "https://images.pexels.com/photos/1586252/pexels-photo-1586252.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  
  // --- FAMILLE & QUOTIDIEN (3 Seeker, 1 Builder, 1 Engager) ---
  {
    id: 'w_tpl_famille_s_1', type: 'cercle', title: 'La place dans la fratrie a-t-elle un impact ?',
    description: 'Aîné, cadet, benjamin... Notre rang dans la famille a-t-il forgé une partie de qui nous sommes ?',
    detailedContent: 'Partageons nos expériences et observons comment notre place dans la fratrie a pu influencer notre personnalité, nos relations et nos choix de vie.',
    whyThisWorkshop: 'Pour prendre conscience de certains schémas et mieux comprendre nos dynamiques relationnelles.',
    participantExpectations: 'Partage d\'expériences personnelles avec bienveillance.',
    whatToGain: 'Un nouvel éclairage sur son histoire personnelle et familiale.',
    xpActivated: ["Introspection", "Partage", "Écoute Active"], categoryKey: 'famille', requiredLevel: 'Seeker', duration: "60 min", image: "https://images.pexels.com/photos/789382/pexels-photo-789382.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_famille_s_2', type: 'cercle', title: 'Rituels familiaux : force ou fardeau ?',
    description: 'Les dîners du dimanche, les vacances au même endroit... Explorons les traditions qui nous unissent et celles qui nous pèsent.',
    detailedContent: 'Quels sont les rituels qui rythment votre vie de famille ? Sont-ils une source de joie et de connexion, ou une obligation qui vous pèse ?',
    whyThisWorkshop: 'Pour réfléchir à ce que l\'on souhaite garder, transformer ou abandonner dans nos traditions familiales.',
    participantExpectations: 'Partage d\'anecdotes et de ressentis sur les traditions.',
    whatToGain: 'Une prise de conscience sur l\'importance des rituels et l\'envie de créer les siens.',
    xpActivated: ["Partage", "Réflexion Critique", "Alignement"], categoryKey: 'famille', requiredLevel: 'Seeker', duration: "60 min", image: "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_famille_s_3', type: 'cercle', title: 'La charge mentale : en parler pour mieux la partager',
    description: 'Mettre des mots sur le poids de l\'organisation quotidienne et trouver des pistes pour alléger le fardeau.',
    detailedContent: '"Penser à tout, tout le temps". Cette charge invisible pèse souvent sur les épaules d\'une seule personne. Comment la rendre visible et mieux la répartir ?',
    whyThisWorkshop: 'Pour se sentir compris·e, valider son ressenti et explorer des solutions concrètes.',
    participantExpectations: 'Un partage honnête et sans jugement sur les défis de la gestion du foyer.',
    whatToGain: 'Des stratégies de communication et d\'organisation pour un quotidien plus équilibré.',
    xpActivated: ["Communication", "Soutien actif", "Respect de soi"], categoryKey: 'famille', requiredLevel: 'Seeker', duration: "65 min", image: "https://images.pexels.com/photos/4386223/pexels-photo-4386223.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_famille_b_1', type: 'cercle', title: 'Couper les ponts avec un proche : solution ou échec ?',
    description: 'Parfois, la distance semble nécessaire. Explorons ce choix difficile, ses raisons et ses conséquences.',
    detailedContent: 'Est-ce un acte de protection de soi ou un aveu d\'impuissance ? Discutons des situations qui nous poussent à envisager une rupture familiale ou amicale.',
    whyThisWorkshop: 'Pour déculpabiliser et nuancer une décision souvent douloureuse et complexe.',
    participantExpectations: 'Un dialogue respectueux sur un sujet sensible, sans jugement.',
    whatToGain: 'De la clarté et du soutien face à des décisions relationnelles difficiles.',
    xpActivated: ["Respect de soi", "Gestion Émotionnelle", "Courage"], categoryKey: 'famille', requiredLevel: 'Builder', duration: "70 min", image: "https://images.pexels.com/photos/1206101/pexels-photo-1206101.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_famille_e_1', type: 'cercle', title: 'Héritages familiaux : quels schémas je perpétue ?',
    description: 'Prendre conscience des schémas émotionnels et relationnels hérités de notre famille, pour choisir de les garder ou de les transformer.',
    detailedContent: 'Le rapport à l\'argent, la façon de gérer les conflits, la manière d\'aimer... Nous héritons de bien plus que des biens matériels. Qu\'avez-vous reçu et qu\'en faites-vous ?',
    whyThisWorkshop: 'Pour gagner en liberté en comprenant ce qui, dans notre histoire, ne nous appartient pas.',
    participantExpectations: 'Une introspection courageuse et une écoute attentive des histoires de chacun.',
    whatToGain: 'Une plus grande clarté sur ses propres comportements et la possibilité de créer son propre chemin.',
    xpActivated: ["Introspection", "Vulnérabilité", "Clarté émotionnelle"], categoryKey: 'famille', requiredLevel: 'Engager', isPremium: true, duration: "75 min", image: "https://images.pexels.com/photos/160994/family-outdoor-mother-father-160994.jpeg?auto=compress&cs=tinysrgb&w=400",
  },

  // --- TRAVAIL & SOCIÉTÉ (3 Seeker, 1 Builder, 1 Engager) ---
  {
    id: 'w_tpl_travail_s_1', type: 'cercle', title: 'Le syndrome de l’imposteur',
    description: 'Ce sentiment de ne pas être à sa place, de ne pas mériter son succès. Parlons-en ensemble.',
    detailedContent: 'D\'où vient cette petite voix qui nous dit que nous allons être "démasqués" ? Partageons nos expériences pour réaliser que nous ne sommes pas seuls.',
    whyThisWorkshop: 'Pour normaliser ce sentiment et trouver des stratégies pour renforcer sa confiance en soi.',
    participantExpectations: 'Partage d\'expériences professionnelles ou personnelles en toute vulnérabilité.',
    whatToGain: 'Des outils pour reconnaître sa valeur et apaiser le syndrome de l\'imposteur.',
    xpActivated: ["Confiance en soi", "Vulnérabilité", "Soutien actif"], categoryKey: 'travail', requiredLevel: 'Seeker', duration: "65 min", image: "https://images.pexels.com/photos/3184424/pexels-photo-3184424.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_travail_s_2', type: 'cercle', title: 'Recevoir la critique : comment ne pas le prendre personnellement ?',
    description: 'Apprendre à voir le feedback comme un outil de croissance plutôt que comme une attaque personnelle.',
    detailedContent: 'Une remarque sur notre travail peut parfois toucher un point sensible. Comment faire la part des choses entre la critique constructive et notre propre susceptibilité ?',
    whyThisWorkshop: 'Pour développer une posture plus sereine face au feedback et l\'utiliser pour progresser.',
    participantExpectations: 'Partage de situations concrètes et d\'astuces pour mieux gérer la critique.',
    whatToGain: 'Une meilleure capacité à recevoir le feedback, à trier l\'information et à l\'utiliser positivement.',
    xpActivated: ["Gestion Émotionnelle", "Réflexion Critique", "Confiance en soi"], categoryKey: 'travail', requiredLevel: 'Seeker', duration: "60 min", image: "https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_travail_s_3', type: 'cercle', title: 'Collègues, amis ou ennemis ?',
    description: 'Explorer la frontière complexe entre relations professionnelles et amicales au bureau.',
    detailedContent: 'Peut-on être vraiment ami avec ses collègues ? Où se situe la limite ? Comment gérer les rivalités ou les affinités dans un cadre professionnel ?',
    whyThisWorkshop: 'Pour mieux comprendre les dynamiques relationnelles au travail et trouver sa juste place.',
    participantExpectations: 'Partage d\'expériences et de points de vue sur les relations au bureau.',
    whatToGain: 'Des pistes pour naviguer plus sainement les relations professionnelles.',
    xpActivated: ["Communication", "Alignement", "Partage"], categoryKey: 'travail', requiredLevel: 'Seeker', duration: "60 min", image: "https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_travail_b_1', type: 'cercle', title: 'Trouver l\'équilibre vie pro / vie perso',
    description: 'Entre ambition et besoin de déconnexion, comment trouver son propre équilibre ?',
    detailedContent: 'Est-ce un mythe ou une réalité atteignable ? Partageons nos astuces, nos difficultés et nos aspirations pour une vie plus harmonieuse.',
    whyThisWorkshop: 'Pour repartir avec des idées concrètes et se sentir moins seul face à ce défi moderne.',
    participantExpectations: 'Un partage honnête de nos stratégies et de nos échecs en matière d\'équilibre.',
    whatToGain: 'Une meilleure vision de son propre équilibre idéal et des pistes pour l\'atteindre.',
    xpActivated: ["Alignement", "Respect de soi", "Réflexion Critique"], categoryKey: 'travail', requiredLevel: 'Builder', duration: "60 min", image: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_travail_e_1', type: 'cercle', title: 'Mon travail a-t-il un sens ?',
    description: 'Questionner son rapport au travail, sa quête de sens et l\'alignement avec ses valeurs profondes.',
    detailedContent: 'Au-delà du salaire et du statut, qu\'est-ce que votre travail vous apporte ? Vous nourrit-il ou vous vide-t-il ? Cet atelier est une pause pour réfléchir à l\'essentiel.',
    whyThisWorkshop: 'Pour clarifier ce qui est vraiment important pour vous dans votre vie professionnelle.',
    participantExpectations: 'Une réflexion sincère et une écoute bienveillante des cheminements de chacun.',
    whatToGain: 'Une meilleure connexion à ses propres valeurs et, peut-être, l\'impulsion pour un changement.',
    xpActivated: ["Introspection", "Alignement", "Courage"], categoryKey: 'travail', requiredLevel: 'Engager', isPremium: true, duration: "75 min", image: "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  
  // --- ÂGE & TRANSMISSION (3 Seeker, 1 Builder, 1 Engager) ---
  {
    id: 'w_tpl_quarantaine_s_1', type: 'cercle', title: 'Avoir 40, 50, 60 ans : crise ou cap ?',
    description: 'Un moment charnière. Faisons le point sur les bilans, les doutes et les nouvelles envies à chaque décennie.',
    detailedContent: 'La moitié de la vie ? Une nouvelle jeunesse ? Discutons de ce que ces caps représentent pour chacun, entre pressions sociales et aspirations personnelles.',
    whyThisWorkshop: 'Pour partager ses réflexions sur ce passage et aborder l\'avenir avec plus de sérénité.',
    participantExpectations: 'Un échange authentique sur le temps qui passe et les désirs qui évoluent.',
    whatToGain: 'De l\'inspiration et de la confiance pour aborder cette nouvelle décennie.',
    xpActivated: ["Introspection", "Partage", "Authenticité"], categoryKey: 'quarantaine', requiredLevel: 'Seeker', duration: "60 min", image: "https://images.pexels.com/photos/3831847/pexels-photo-3831847.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_quarantaine_s_2', type: 'cercle', title: 'Le corps qui change : l\'accepter ou lutter ?',
    description: 'Parler de notre rapport au corps qui vieillit, entre l\'injonction de la jeunesse éternelle et le chemin de l\'acceptation.',
    detailedContent: 'Rides, cheveux blancs, perte d\'énergie... Comment vivons-nous ces transformations ? Est-ce une source d\'angoisse ou une nouvelle forme de beauté ?',
    whyThisWorkshop: 'Pour partager en toute bienveillance nos complexes et nos stratégies pour nous sentir bien dans notre peau, à tout âge.',
    participantExpectations: 'Un partage vulnérable et sans jugement sur notre rapport au corps.',
    whatToGain: 'Plus de douceur envers soi-même et une vision plus apaisée du vieillissement.',
    xpActivated: ["Respect de soi", "Vulnérabilité", "Soutien actif"], categoryKey: 'quarantaine', requiredLevel: 'Seeker', duration: "60 min", image: "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_quarantaine_s_3', type: 'cercle', title: 'Les regrets : qu\'est-ce qu\'ils disent de nous ?',
    description: 'Explorer nos regrets non pas comme des échecs, mais comme des guides qui nous renseignent sur nos valeurs profondes.',
    detailedContent: '"Et si j\'avais fait autrement ?" Cette question nous hante parfois. Parlons de ces choix passés pour mieux comprendre ce qui compte vraiment pour nous aujourd\'hui.',
    whyThisWorkshop: 'Pour transformer le poids des regrets en une force pour l\'avenir.',
    participantExpectations: 'Partage d\'expériences personnelles dans un cadre d\'écoute et de non-jugement.',
    whatToGain: 'Une meilleure compréhension de ses désirs profonds et une paix renouvelée avec son passé.',
    xpActivated: ["Introspection", "Clarté émotionnelle", "Patience"], categoryKey: 'quarantaine', requiredLevel: 'Seeker', duration: "65 min", image: "https://images.pexels.com/photos/1172018/pexels-photo-1172018.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_quarantaine_b_1', type: 'cercle', title: 'Le choc des générations : comment se comprendre ?',
    description: 'Discuter des différences de valeurs, de communication et de perspectives entre les générations pour créer des ponts.',
    detailedContent: 'Nos parents, nos enfants, nos jeunes collègues... Parfois, le dialogue semble impossible. Comment dépasser les clichés et recréer du lien ?',
    whyThisWorkshop: 'Pour développer de l\'empathie et améliorer la communication avec les personnes d\'âges différents.',
    participantExpectations: 'Partage d\'exemples concrets et une volonté de comprendre le point de vue de l\'autre.',
    whatToGain: 'Des outils pour des relations intergénérationnelles plus riches et apaisées.',
    xpActivated: ["Empathie", "Communication", "Ouverture"], categoryKey: 'quarantaine', requiredLevel: 'Builder', duration: "70 min", image: "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_quarantaine_e_1', type: 'cercle', title: 'Quelle trace ai-je envie de laisser ?',
    description: 'Une réflexion profonde sur la transmission, l\'héritage immatériel et le sens que l\'on souhaite donner à sa vie.',
    detailedContent: 'Au-delà de notre carrière ou de nos biens, qu\'est-ce que nous transmettons à nos proches, à notre communauté ? Quelles valeurs, quelles histoires, quels souvenirs ?',
    whyThisWorkshop: 'Pour se connecter à son "pourquoi" et vivre une vie plus intentionnelle.',
    participantExpectations: 'Une introspection sincère et une écoute respectueuse des réflexions de chacun.',
    whatToGain: 'Une vision plus claire de son impact sur le monde et de ce qui compte vraiment.',
    xpActivated: ["Introspection", "Alignement", "Clarté émotionnelle"], categoryKey: 'quarantaine', requiredLevel: 'Engager', isPremium: true, duration: "75 min", image: "https://images.pexels.com/photos/220326/pexels-photo-220326.jpeg?auto=compress&cs=tinysrgb&w=400",
  },

  // --- PARENTALITÉ (3 Seeker, 1 Builder, 1 Engager) ---
  {
    id: 'w_tpl_parentalite_s_1', type: 'cercle', title: 'Parent épuisé : comment survivre au quotidien ?',
    description: 'Un espace pour déposer la fatigue, partager des astuces de survie et se sentir moins seul·e dans l\'épuisement parental.',
    detailedContent: 'Entre les nuits courtes, les crises et la charge mentale, être parent est un marathon. Comment trouver des moments pour recharger les batteries ?',
    whyThisWorkshop: 'Pour valider son ressenti, déculpabiliser et repartir avec un peu plus d\'air.',
    participantExpectations: 'Un partage authentique, sans filtre, sur les difficultés d\'être parent.',
    whatToGain: 'Un fort sentiment de solidarité et des micro-stratégies pour alléger le quotidien.',
    xpActivated: ["Soutien actif", "Partage", "Vulnérabilité"], categoryKey: 'parentalite', requiredLevel: 'Seeker', duration: "60 min", image: "https://images.pexels.com/photos/3958421/pexels-photo-3958421.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_parentalite_s_2', type: 'cercle', title: 'Parent parfait, ça n\'existe pas !',
    description: 'Relâchons la pression de la parentalité idéale et partageons nos "ratés" avec humour et bienveillance.',
    detailedContent: 'Entre les injonctions sociales et nos propres exigences, être parent peut être épuisant. Et si on célébrait nos imperfections ?',
    whyThisWorkshop: 'Pour déculpabiliser, rire de nos difficultés et se sentir plus léger dans notre rôle de parent.',
    participantExpectations: 'Partage d\'anecdotes et de sentiments sans jugement.',
    whatToGain: 'Un sentiment de solidarité et la permission de ne pas être parfait.',
    xpActivated: ["Vulnérabilité", "Humour", "Soutien actif"], categoryKey: 'parentalite', requiredLevel: 'Seeker', duration: "60 min", image: "https://images.pexels.com/photos/3990359/pexels-photo-3990359.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_parentalite_s_3', type: 'cercle', title: 'Les écrans et nos enfants : mission impossible ?',
    description: 'Partager nos combats, nos règles et nos stratégies face à l\'omniprésence des écrans dans la vie de nos enfants.',
    detailedContent: 'Quelle est la juste place des écrans ? Comment poser des limites sans créer de conflits permanents ? Partageons nos réussites et nos difficultés.',
    whyThisWorkshop: 'Pour trouver des idées et du soutien face à un défi éducatif majeur de notre époque.',
    participantExpectations: 'Un échange constructif et sans jugement sur les pratiques de chacun.',
    whatToGain: 'Des pistes concrètes pour une gestion plus sereine des écrans en famille.',
    xpActivated: ["Réflexion Critique", "Partage", "Soutien actif"], categoryKey: 'parentalite', requiredLevel: 'Seeker', duration: "65 min", image: "https://images.pexels.com/photos/4145783/pexels-photo-4145783.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_parentalite_b_1', type: 'cercle', title: 'Transmettre ses valeurs : comment faire sans imposer ?',
    description: 'Réfléchir à l\'équilibre délicat entre guider ses enfants selon ses valeurs et respecter leur individualité naissante.',
    detailedContent: 'Quelles sont les valeurs qui vous sont chères ? Comment les incarner au quotidien et les transmettre de manière inspirante plutôt que dogmatique ?',
    whyThisWorkshop: 'Pour affiner sa posture de parent-guide et non de parent-directif.',
    participantExpectations: 'Une réflexion sur ses propres valeurs et sa manière de les transmettre.',
    whatToGain: 'Une approche plus consciente et alignée de l\'éducation.',
    xpActivated: ["Alignement", "Introspection", "Communication"], categoryKey: 'parentalite', requiredLevel: 'Builder', duration: "70 min", image: "https://images.pexels.com/photos/711009/pexels-photo-711009.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_parentalite_e_1', type: 'cercle', title: 'Suis-je en train de reproduire l\'éducation de mes parents ?',
    description: 'Une introspection sur les schémas éducatifs que l\'on reproduit, consciemment ou non, pour le meilleur et pour le pire.',
    detailedContent: 'Nous nous sommes tous juré de ne pas répéter certaines erreurs de nos parents... et pourtant ! Identifions ces schémas pour choisir ce que nous voulons vraiment transmettre.',
    whyThisWorkshop: 'Pour devenir un parent plus conscient et se libérer des automatismes transgénérationnels.',
    participantExpectations: 'Une exploration honnête de sa propre histoire et de son impact sur sa parentalité.',
    whatToGain: 'La liberté de choisir son propre style parental, en conscience.',
    xpActivated: ["Introspection", "Vulnérabilité", "Clarté émotionnelle"], categoryKey: 'parentalite', requiredLevel: 'Engager', isPremium: true, duration: "75 min", image: "https://images.pexels.com/photos/3662842/pexels-photo-3662842.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];
// FIX: Add the missing generateMockFeedData function and export it.
export const generateMockFeedData = (count: number = 20): ActivityFeedItem[] => {
    const items: ActivityFeedItem[] = [];
    for (let i = 0; i < count; i++) {
        const gender = Math.random() > 0.5 ? 'female' : 'male';
        const name = gender === 'female' 
            ? FEMALE_AI_NAMES[Math.floor(Math.random() * FEMALE_AI_NAMES.length)]
            : MALE_AI_NAMES[Math.floor(Math.random() * MALE_AI_NAMES.length)];
        const avatarUrl = gender === 'female'
            ? FEMALE_AI_AVATAR_URLS[Math.floor(Math.random() * FEMALE_AI_AVATAR_URLS.length)]
            : MALE_AI_AVATAR_URLS[Math.floor(Math.random() * MALE_AI_AVATAR_URLS.length)];
        const totalXP = Math.floor(Math.random() * 800) + 100;

        const userProfile: ParticipantProfileInfo = {
            name,
            gender,
            avatarUrl,
            isAI: true,
            totalXP,
            currentLevel: getLevelFromXP(totalXP),
            awardedXpCounts: {},
        };

        const activityType: ActivityFeedItem['activityType'] = ['joined_workshop', 'earned_xp', 'completed_workshop'][Math.floor(Math.random() * 3)] as ActivityFeedItem['activityType'];
        
        let details: ActivityFeedItem['details'] = {};
        if (activityType === 'joined_workshop' || activityType === 'completed_workshop') {
            details = { workshopTitle: WORKSHOP_TEMPLATES[Math.floor(Math.random() * WORKSHOP_TEMPLATES.length)].title };
        } else {
            const xpType = EMOTIONAL_XP_TYPES[Math.floor(Math.random() * EMOTIONAL_XP_TYPES.length)];
            details = { xpAmount: [5, 10, 15][Math.floor(Math.random() * 3)], xpType: xpType.name };
        }

        items.push({
            id: `feed-${i}-${Date.now()}`,
            timestamp: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 3), // within last 3 days
            userProfile,
            activityType,
            details,
        });
    }
    return items.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};
