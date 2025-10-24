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
  // --- AMOUR & RELATIONS: Seeker ---
  {
    id: 'w_tpl_amour_s_1', type: 'cercle', title: 'Premier date : qui paie ?',
    description: 'Un débat classique qui cache des questions sur les attentes, les rôles et l\'égalité dans la rencontre.',
    detailedContent: 'Au-delà de l\'argent, qu\'est-ce que ce moment dit de nos attentes dans une relation naissante ? Est-ce une question de politesse, d\'indépendance, ou de tradition ?',
    whyThisWorkshop: 'Pour déconstruire un petit moment de gêne qui en dit long sur nos valeurs et notre vision du couple.',
    participantExpectations: 'Partage d\'opinions et d\'expériences personnelles sans jugement.',
    whatToGain: 'Une meilleure compréhension de ses propres attentes et de celles des autres.',
    xpActivated: ["Communication", "Authenticité", "Réflexion Critique", "Partage", "Écoute Active", "Respect de soi", "Ouverture"], categoryKey: 'amour', requiredLevel: 'Seeker', duration: "20 min", image: "https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_amour_s_2', type: 'cercle', title: 'Jamais le premier soir ?',
    description: 'Explorons la "règle" du sexe au premier rendez-vous. Est-ce une question de respect, de désir ou de pression sociale ?',
    detailedContent: 'Cette "règle" est-elle encore pertinente aujourd\'hui ? Discutons de nos croyances sur l\'intimité, le désir et le jugement dans les débuts d\'une relation.',
    whyThisWorkshop: 'Pour se libérer des injonctions et développer une approche plus personnelle et respectueuse de l\'intimité.',
    participantExpectations: 'Un dialogue ouvert et honnête sur un sujet intime, dans un cadre sécurisant.',
    whatToGain: 'Plus de clarté sur ses propres désirs et limites, et moins de pression sociale.',
    xpActivated: ["Authenticité", "Respect de soi", "Réflexion Critique", "Communication", "Partage", "Écoute Active", "Ouverture"], categoryKey: 'amour', requiredLevel: 'Seeker', duration: "20 min", image: "https://images.pexels.com/photos/3060641/pexels-photo-3060641.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_amour_s_3', type: 'cercle', title: 'Ghosting : normal ou irrespect ?',
    description: 'Disparaître sans laisser de trace : une nouvelle norme relationnelle ou un manque de courage ?',
    detailedContent: 'Le ghosting est devenu courant, mais que dit-il de nos relations ? Est-ce une manière de se protéger ou d\'éviter une conversation difficile ?',
    whyThisWorkshop: 'Pour partager les blessures du ghosting et trouver des manières plus humaines de clore une interaction.',
    participantExpectations: 'Partage d\'expériences (en tant que "ghosteur" ou "ghosté") sans jugement.',
    whatToGain: 'Des clés pour mieux gérer la fin d\'une rencontre et renforcer son empathie.',
    xpActivated: ["Communication", "Respect de soi", "Gestion Émotionnelle", "Empathie", "Authenticité", "Partage", "Écoute Active"], categoryKey: 'amour', requiredLevel: 'Seeker', duration: "20 min", image: "https://images.pexels.com/photos/7657973/pexels-photo-7657973.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_amour_s_4', type: 'cercle', title: 'L’amitié homme-femme, possible ou pas ?',
    description: 'Au-delà des clichés, explorons la nature et les défis de l\'amitié entre les genres.',
    detailedContent: 'Crois-tu en l\'amitié homme-femme sans ambiguïté ? Quels sont les écueils à éviter et les richesses d\'une telle relation ?',
    whyThisWorkshop: 'Pour déconstruire les stéréotypes et célébrer la diversité des liens d\'amitié.',
    participantExpectations: 'Partage de points de vue et d\'expériences personnelles, avec ouverture d\'esprit.',
    whatToGain: 'Une vision plus nuancée des relations amicales et des clés pour entretenir ces liens précieux.',
    xpActivated: ["Réflexion Critique", "Ouverture", "Authenticité", "Communication", "Partage", "Écoute Active", "Respect de soi"], categoryKey: 'amour', requiredLevel: 'Seeker', duration: "25 min", image: "https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_amour_s_5', type: 'cercle', title: 'La friendzone existe-t-elle vraiment ?',
    description: 'Débat sur cette zone grise de l\'amitié et de l\'amour, entre espoirs déçus et relations ambiguës.',
    detailedContent: 'Est-ce une excuse polie pour un rejet, une véritable catégorie de relation, ou une situation qu\'on peut faire évoluer ? As-tu déjà été dans cette situation ?',
    whyThisWorkshop: 'Pour clarifier ce que signifie la \'friendzone\' et apprendre à gérer ces situations avec plus de clarté.',
    participantExpectations: 'Partage d\'expériences personnelles et de points de vue, dans l\'écoute et le respect.',
    whatToGain: 'Des outils pour mieux communiquer ses intentions, accepter les réponses et préserver des amitiés saines.',
    xpActivated: ["Communication", "Clarté émotionnelle", "Respect de soi", "Authenticité", "Partage", "Écoute Active", "Ouverture"], categoryKey: 'amour', requiredLevel: 'Seeker', duration: "20 min", image: "https://images.pexels.com/photos/4098770/pexels-photo-4098770.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  // --- AMOUR & RELATIONS: Builder ---
  {
    id: 'w_tpl_balance_1',
    type: 'cercle',
    title: "Cercle d'Équilibre",
    description: 'Un atelier spécial avec une parité parfaite pour explorer les dynamiques masculines et féminines.',
    detailedContent: 'Dans ce cercle unique, nous sommes 5 hommes et 5 femmes, en plus de notre hôte, pour discuter de nos perceptions mutuelles, des stéréotypes et de la manière de construire des ponts entre les genres. Un espace d\'écoute et de respect pour une compréhension plus profonde.',
    whyThisWorkshop: 'Pour expérimenter une dynamique de groupe parfaitement équilibrée et enrichir sa perspective.',
    participantExpectations: 'Ouverture d\'esprit, respect et désir de comprendre les perspectives des autres genres.',
    whatToGain: 'Une meilleure compréhension des dynamiques de genre, une communication plus authentique.',
    xpActivated: ["Écoute Active", "Empathie", "Réflexion Critique", "Ouverture", "Authenticité", "Partage", "Respect de soi"],
    categoryKey: 'amour',
    requiredLevel: 'Builder',
    duration: "30 min",
    image: "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=400",
    maxParticipants: 11, // User + 10 AIs (5 male, 5 female)
  },
  {
    id: 'w_tpl_amour_b_1', type: 'cercle', title: 'Faut-il tout se dire dans un couple ?',
    description: 'Entre transparence totale et jardin secret, où se situe le juste équilibre pour une relation saine ?',
    detailedContent: 'La transparence est-elle la clé de la confiance, ou chaque partenaire a-t-il droit à son jardin secret ? Discutons des limites de l\'honnêteté.',
    whyThisWorkshop: 'Pour définir sa propre vision de la communication et de l\'intimité dans le couple.',
    participantExpectations: 'Une réflexion honnête sur la confiance, le mensonge et le partage.',
    whatToGain: 'Une meilleure compréhension de l\'équilibre entre partage et espace personnel.',
    xpActivated: ["Communication", "Authenticité", "Alignement", "Réflexion Critique", "Partage", "Écoute Active", "Respect de soi"], categoryKey: 'amour', requiredLevel: 'Builder', duration: "25 min", image: "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_amour_b_2', type: 'cercle', title: 'Mes valeurs en amour',
    description: 'Qu\'est-ce qui est vraiment non-négociable pour toi dans une relation ? Mettons des mots sur ce qui compte.',
    detailedContent: 'Si tu devais choisir 3 valeurs fondamentales pour une relation (respect, humour, ambition, etc.), quelles seraient-elles et pourquoi ?',
    whyThisWorkshop: 'Pour définir sa "boussole relationnelle" et faire des choix plus alignés avec ses besoins profonds.',
    participantExpectations: 'Une introspection sincère et un partage constructif.',
    whatToGain: 'Une vision claire de ce que tu recherches, ce qui facilite les rencontres et renforce les relations existantes.',
    xpActivated: ["Alignement", "Introspection", "Clarté émotionnelle", "Authenticité", "Partage", "Écoute Active", "Respect de soi"], categoryKey: 'amour', requiredLevel: 'Builder', duration: "25 min", image: "https://images.pexels.com/photos/1024989/pexels-photo-1024989.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_amour_b_3', type: 'cercle', title: 'Qu’est-ce qu’un couple solide pour moi ?',
    description: 'Au-delà des clichés, définissons ensemble les piliers d\'une relation qui dure et qui nourrit.',
    detailedContent: 'Quels sont les ingrédients indispensables d\'un couple solide selon toi ? (Ex: complicité, projets communs, indépendance, etc.)',
    whyThisWorkshop: 'Pour construire une vision personnelle et réaliste de la relation de couple, loin des injonctions sociales.',
    participantExpectations: 'Partage de visions et d\'aspirations pour enrichir sa propre définition du couple.',
    whatToGain: 'Une plus grande clarté sur ce que l\'on veut construire à deux.',
    xpActivated: ["Alignement", "Introspection", "Communication", "Clarté émotionnelle", "Authenticité", "Partage", "Écoute Active"], categoryKey: 'amour', requiredLevel: 'Builder', duration: "20 min", image: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_amour_b_4', type: 'cercle', title: 'La fidélité à l’ère des applis et réseaux sociaux',
    description: 'Micro-infidélité, jalousie numérique... Comment définir et maintenir la confiance à l\'ère du numérique ?',
    detailedContent: 'Un "like" est-il une trahison ? Où commence l\'infidélité émotionnelle en ligne ? Discutons de la confiance et des nouvelles frontières de la fidélité.',
    whyThisWorkshop: 'Pour adapter notre vision de la fidélité au monde moderne et renforcer la communication dans le couple.',
    participantExpectations: 'Un débat ouvert sur un sujet complexe et actuel.',
    whatToGain: 'Des pistes pour établir des règles claires et saines sur l\'usage des réseaux sociaux dans son couple.',
    xpActivated: ["Réflexion Critique", "Communication", "Alignement", "Authenticité", "Partage", "Écoute Active", "Respect de soi"], categoryKey: 'amour', requiredLevel: 'Builder', duration: "25 min", image: "https://images.pexels.com/photos/697243/pexels-photo-697243.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_amour_b_5',
    type: 'cercle',
    title: 'Soutenir son partenaire : geste d\'amour ou jeu de pouvoir ?',
    description: 'Quand une femme aide un homme, où se situe la frontière entre partenariat et déséquilibre ? Peut-elle, doit-elle le soutenir ?',
    detailedContent: 'Dans un couple moderne, les trajectoires ne sont pas toujours linéaires. Comment vit-on le fait de soutenir son partenaire, financièrement ou dans ses projets ? Est-ce un pilier de la confiance ou un risque de déséquilibre ? Cet atelier explore la vulnérabilité de celui qui reçoit et l\'intention de celle qui donne. Comment construire un soutien qui élève l\'autre sans l\'infantiliser ?',
    whyThisWorkshop: 'Pour apprendre à naviguer l\'entraide dans le couple comme un véritable partenariat, basé sur la confiance et la communication.',
    participantExpectations: 'Partage d\'expériences et de points de vue sur le soutien mutuel dans le couple.',
    whatToGain: 'Des clés pour un soutien sain qui renforce le couple sans créer de dépendance ou de ressentiment.',
    xpActivated: ["Communication", "Soutien actif", "Réflexion Critique", "Empathie", "Alignement", "Authenticité", "Respect de soi"],
    categoryKey: 'amour',
    requiredLevel: 'Builder',
    duration: "25 min",
    image: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  // --- AMOUR & RELATIONS: Engager ---
  {
    id: 'w_tpl_amour_e_1', type: 'cercle', title: 'La jalousie : preuve d’amour ou poison ?',
    description: 'Explorons les racines de la jalousie et comment la transformer pour qu\'elle ne détruise pas la confiance.',
    detailedContent: 'D\'où vient la jalousie ? Est-ce un signe d\'insécurité personnelle, un manque de confiance en l\'autre, ou une part inévitable de l\'amour ?',
    whyThisWorkshop: 'Pour mieux comprendre ce sentiment puissant et apprendre à le gérer de manière constructive.',
    participantExpectations: 'Un partage honnête de ses propres expériences avec la jalousie (ressentie ou subie).',
    whatToGain: 'Des stratégies pour apaiser la jalousie et renforcer la sécurité émotionnelle dans la relation.',
    xpActivated: ["Gestion Émotionnelle", "Introspection", "Vulnérabilité", "Communication", "Authenticité", "Partage", "Écoute Active"], categoryKey: 'amour', requiredLevel: 'Engager', isPremium: true, duration: "30 min", image: "https://images.pexels.com/photos/1586252/pexels-photo-15",
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
