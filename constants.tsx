
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
  // --- AMOUR & RELATIONS: Engager ---
  {
    id: 'w_tpl_amour_e_1', type: 'cercle', title: 'La jalousie : preuve d’amour ou poison ?',
    description: 'Explorons les racines de la jalousie et comment la transformer pour qu\'elle ne détruise pas la confiance.',
    detailedContent: 'D\'où vient la jalousie ? Est-ce un signe d\'insécurité personnelle, un manque de confiance en l\'autre, ou une part inévitable de l\'amour ?',
    whyThisWorkshop: 'Pour mieux comprendre ce sentiment puissant et apprendre à le gérer de manière constructive.',
    participantExpectations: 'Un partage honnête de ses propres expériences avec la jalousie (ressentie ou subie).',
    whatToGain: 'Des stratégies pour apaiser la jalousie et renforcer la sécurité émotionnelle dans la relation.',
    xpActivated: ["Gestion Émotionnelle", "Introspection", "Vulnérabilité", "Communication", "Authenticité", "Partage", "Écoute Active"], categoryKey: 'amour', requiredLevel: 'Engager', isPremium: true, duration: "30 min", image: "https://images.pexels.com/photos/1586252/pexels-photo-1586252.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_amour_e_2', type: 'cercle', title: 'Rebondir après un échec amoureux',
    description: 'Comment transformer une rupture douloureuse en une opportunité de croissance personnelle ?',
    detailedContent: 'Une rupture est souvent vue comme un échec. Et si c\'était une étape nécessaire pour mieux se connaître et se reconstruire ?',
    whyThisWorkshop: 'Pour partager nos histoires de résilience et trouver la force de se relever après une peine de cœur.',
    participantExpectations: 'Soutien mutuel et partage de leçons apprises.',
    whatToGain: 'Un regard nouveau sur les ruptures et des outils pour guérir et avancer.',
    xpActivated: ["Résilience", "Auto-soutien", "Vulnérabilité", "Courage", "Authenticité", "Partage", "Écoute Active"], categoryKey: 'amour', requiredLevel: 'Engager', isPremium: true, duration: "30 min", image: "https://images.pexels.com/photos/1470405/pexels-photo-1470405.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_amour_e_3', type: 'cercle', title: 'Rester ami avec son ex : possible ou dangereux ?',
    description: 'Entretenir un lien après la rupture : est-ce un signe de maturité ou une source de complications ?',
    detailedContent: 'Est-il vraiment possible de transformer un amour passé en amitié sincère ? Quelles sont les conditions et les pièges à éviter ?',
    whyThisWorkshop: 'Pour réfléchir aux différentes manières de gérer la fin d\'une histoire et faire des choix conscients.',
    participantExpectations: 'Partage d\'expériences variées, des réussites comme des échecs.',
    whatToGain: 'De la clarté pour décider ce qui est le mieux pour soi et pour son ex-partenaire.',
    xpActivated: ["Réflexion Critique", "Clarté émotionnelle", "Respect de soi", "Authenticité", "Partage", "Écoute Active", "Ouverture"], categoryKey: 'amour', requiredLevel: 'Engager', isPremium: true, duration: "30 min", image: "https://images.pexels.com/photos/4608197/pexels-photo-4608197.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  // --- FAMILLE & QUOTIDIEN : Seeker ---
  {
    id: 'w_tpl_famille_s_1', type: 'cercle', title: 'Les repas de famille : plaisir ou corvée ?',
    description: 'Entre moments de partage et tensions sous-jacentes, comment vivre sereinement ces réunions ?',
    detailedContent: 'Les repas de famille sont un concentré de dynamiques complexes. Comment navigues-tu entre les sujets qui fâchent et le désir de passer un bon moment ?',
    whyThisWorkshop: 'Pour partager des astuces et des ressentis afin de rendre ces moments plus légers et authentiques.',
    participantExpectations: 'Partage d\'anecdotes et de stratégies pour survivre (et même apprécier) les repas de famille.',
    whatToGain: 'Des outils pour mieux gérer les conversations difficiles et protéger son énergie.',
    xpActivated: ["Gestion Émotionnelle", "Communication", "Humour", "Authenticité", "Partage", "Écoute Active", "Respect de soi"], categoryKey: 'famille', requiredLevel: 'Seeker', duration: "20 min", image: "https://images.pexels.com/photos/6956429/pexels-photo-6956429.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_famille_s_2', type: 'cercle', title: 'La relation avec ma belle-famille',
    description: 'Trouver sa place dans une nouvelle famille : un défi d\'équilibriste. Comment gérer les attentes et les différences ?',
    detailedContent: 'La belle-famille peut être une source de soutien ou de stress. Comment construire une relation saine sans se perdre soi-même ?',
    whyThisWorkshop: 'Pour échanger sur les défis et les joies des relations avec la belle-famille.',
    participantExpectations: 'Un partage honnête sur les dynamiques et les ajustements nécessaires.',
    whatToGain: 'Des stratégies pour communiquer et poser ses limites avec bienveillance.',
    xpActivated: ["Communication", "Respect de soi", "Empathie", "Authenticité", "Partage", "Écoute Active", "Ouverture"], categoryKey: 'famille', requiredLevel: 'Seeker', duration: "25 min", image: "https://images.pexels.com/photos/3957987/pexels-photo-3957987.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_famille_s_3', type: 'cercle', title: 'Mon rôle dans ma fratrie',
    description: 'Notre place dans la fratrie (aîné, cadet, benjamin) influence souvent notre personnalité. Explorons ces rôles et comment ils nous façonnent.',
    detailedContent: 'Aîné responsable, cadet créatif, benjamin chouchouté... Ces clichés sont-ils vrais pour toi ? Comment ta place dans la fratrie a-t-elle influencé tes relations ?',
    whyThisWorkshop: 'Pour mieux comprendre certains de nos schémas comportementaux et notre manière d\'interagir avec les autres.',
    participantExpectations: 'Partage d\'expériences sur la vie de fratrie et les rôles que l\'on y a joués.',
    whatToGain: 'Une nouvelle perspective sur soi-même et ses relations.',
    xpActivated: ["Introspection", "Réflexion Critique", "Partage", "Authenticité", "Écoute Active", "Respect de soi", "Ouverture"], categoryKey: 'famille', requiredLevel: 'Seeker', duration: "20 min", image: "https://images.pexels.com/photos/5699431/pexels-photo-5699431.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_famille_s_4', type: 'cercle', title: 'Vivre loin de sa famille : manque ou liberté ?',
    description: 'La distance géographique peut être un choix ou une contrainte. Comment la vit-on au quotidien ?',
    detailedContent: 'Entre la culpabilité de l\'éloignement et la joie de l\'indépendance, comment trouver son équilibre quand on vit loin de ses racines familiales ?',
    whyThisWorkshop: 'Pour partager les défis et les bénéfices de la distance et se sentir moins seul dans cette expérience.',
    participantExpectations: 'Un partage sincère sur les émotions liées à l\'éloignement familial.',
    whatToGain: 'Des astuces pour maintenir le lien malgré la distance et déculpabiliser.',
    xpActivated: ["Gestion Émotionnelle", "Authenticité", "Partage", "Écoute Active", "Respect de soi", "Ouverture", "Humour"], categoryKey: 'famille', requiredLevel: 'Seeker', duration: "20 min", image: "https://images.pexels.com/photos/4553368/pexels-photo-4553368.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
   {
    id: 'w_tpl_famille_s_5', type: 'cercle', title: 'Faut-il fêter toutes les traditions familiales ?',
    description: 'Noël, anniversaires, fêtes religieuses... Faut-il suivre le mouvement ou créer ses propres rituels ?',
    detailedContent: 'Les traditions peuvent être un ciment... ou une source de contrainte. Comment navigues-tu entre le respect des traditions et ton besoin de sens personnel ?',
    whyThisWorkshop: 'Pour réfléchir à la place des rituels dans nos vies et se sentir libre de les réinventer.',
    participantExpectations: 'Partage d\'expériences sur le poids et la joie des traditions.',
    whatToGain: 'L\'autorisation de créer ses propres traditions, alignées avec ses valeurs.',
    xpActivated: ["Authenticité", "Alignement", "Réflexion Critique", "Partage", "Écoute Active", "Respect de soi", "Ouverture"], categoryKey: 'famille', requiredLevel: 'Seeker', duration: "20 min", image: "https://images.pexels.com/photos/5797905/pexels-photo-5797905.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  // --- FAMILLE & QUOTIDIEN : Builder ---
  {
    id: 'w_tpl_famille_b_1', type: 'cercle', title: 'L’argent dans la famille, tabou ou transparence ?',
    description: 'Prêts, héritages, dépenses... Comment aborder les questions financières en famille sans créer de tensions ?',
    detailedContent: 'L\'argent est souvent un sujet délicat en famille. Faut-il être totalement transparent ou garder une certaine discrétion ? Comment gérer les inégalités ?',
    whyThisWorkshop: 'Pour dédramatiser le sujet de l\'argent et apprendre à en parler plus sereinement.',
    participantExpectations: 'Une discussion ouverte et pragmatique, sans jugement sur les situations de chacun.',
    whatToGain: 'Des pistes pour une communication financière plus saine au sein de la famille.',
    xpActivated: ["Communication", "Alignement", "Clarté émotionnelle", "Authenticité", "Partage", "Écoute Active", "Respect de soi"], categoryKey: 'famille', requiredLevel: 'Builder', duration: "25 min", image: "https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
    {
    id: 'w_tpl_famille_b_2', type: 'cercle', title: 'Faut-il tout dire aux enfants ?',
    description: 'Maladie, problèmes d\'argent, conflits... Quelle est la juste mesure entre protection et honnêteté avec les enfants ?',
    detailedContent: 'La vérité est-elle toujours bonne à dire aux enfants ? Comment adapter notre discours à leur âge et leur sensibilité ? Partageons nos approches.',
    whyThisWorkshop: 'Pour développer une communication familiale plus juste et respectueuse des capacités de chacun.',
    participantExpectations: 'Un échange de points de vue sur la communication avec les enfants.',
    whatToGain: 'Des clés pour aborder les sujets difficiles en famille avec plus de confiance.',
    xpActivated: ["Communication", "Empathie", "Réflexion Critique", "Authenticité", "Partage", "Écoute Active", "Respect de soi"], categoryKey: 'famille', requiredLevel: 'Builder', duration: "25 min", image: "https://images.pexels.com/photos/8199708/pexels-photo-8199708.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_famille_b_3', type: 'cercle', title: 'Mon rôle auprès de mes parents qui vieillissent',
    description: 'Entre inquiétude, devoir et respect de leur autonomie, comment accompagner ses parents dans l\'avancée en âge ?',
    detailedContent: 'Voir ses parents vieillir peut inverser les rôles et soulever de nombreuses questions. Comment trouver la juste distance et le bon type de soutien ?',
    whyThisWorkshop: 'Pour partager ses doutes et ses expériences face à cette étape de vie et se sentir soutenu.',
    participantExpectations: 'Un échange bienveillant sur un sujet touchant et universel.',
    whatToGain: 'Des perspectives pour mieux vivre cette transition et prendre soin de soi tout en prenant soin d\'eux.',
    xpActivated: ["Gestion Émotionnelle", "Empathie", "Soutien actif", "Authenticité", "Partage", "Écoute Active", "Respect de soi"], categoryKey: 'famille', requiredLevel: 'Builder', duration: "25 min", image: "https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
    {
    id: 'w_tpl_famille_b_4', type: 'cercle', title: 'Famille recomposée : équilibre ou chaos ?',
    description: 'Gérer les ex, les enfants des deux côtés, les nouvelles règles... Comment construire une nouvelle tribu harmonieuse ?',
    detailedContent: 'La famille recomposée est une aventure complexe. Quels sont les plus grands défis que vous rencontrez ? Quelles sont vos plus belles réussites ?',
    whyThisWorkshop: 'Pour partager des stratégies de communication et de gestion des émotions dans le contexte unique de la famille recomposée.',
    participantExpectations: 'Partage d\'expériences concrètes et soutien mutuel.',
    whatToGain: 'Des outils pour naviguer les défis et célébrer les joies de la vie en famille recomposée.',
    xpActivated: ["Résilience", "Communication", "Patience", "Empathie", "Authenticité", "Partage", "Écoute Active"], categoryKey: 'famille', requiredLevel: 'Builder', duration: "25 min", image: "https://images.pexels.com/photos/7649242/pexels-photo-7649242.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  // --- FAMILLE & QUOTIDIEN : Engager ---
  {
    id: 'w_tpl_famille_e_1', type: 'cercle', title: 'Transmission : ce que j’ai reçu, ce que je veux donner',
    description: 'Faire le tri dans l\'héritage familial : ce qu\'on garde, ce qu\'on laisse, et ce qu\'on crée.',
    detailedContent: 'Quelles sont les grandes forces que ta famille t\'a transmises ? Y a-t-il des "bagages" (croyances, peurs) dont tu aimerais te délester ?',
    whyThisWorkshop: 'Pour devenir acteur de sa propre histoire, en choisissant consciemment ce que l\'on souhaite perpétuer.',
    participantExpectations: 'Une exploration honnête de son héritage familial, avec bienveillance.',
    whatToGain: 'La liberté de se définir au-delà de son héritage et de construire sa propre identité.',
    xpActivated: ["Introspection", "Alignement", "Réflexion Critique", "Clarté émotionnelle", "Authenticité", "Partage", "Écoute Active"], categoryKey: 'famille', requiredLevel: 'Engager', duration: "30 min", image: "https://images.pexels.com/photos/66258/pexels-photo-66258.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_famille_e_2', type: 'cercle', title: 'Rester ensemble “pour les enfants” : sacrifice ou sagesse ?',
    description: 'Une question complexe qui pèse sur de nombreux couples. Explorons les motivations et les conséquences.',
    detailedContent: 'Quand l\'amour s\'estompe mais que la famille est là, quel est le "bon" choix ? Discutons du sacrifice, du bonheur personnel et de l\'impact sur les enfants.',
    whyThisWorkshop: 'Pour aborder un sujet tabou avec nuance et sans jugement, en écoutant des perspectives différentes.',
    participantExpectations: 'Un partage respectueux sur un sujet qui peut être douloureux.',
    whatToGain: 'Une vision plus large des différentes réalités et peut-être plus de paix avec sa propre situation.',
    xpActivated: ["Réflexion Critique", "Empathie", "Gestion Émotionnelle", "Courage", "Authenticité", "Partage", "Écoute Active"], categoryKey: 'famille', requiredLevel: 'Engager', isPremium: true, duration: "30 min", image: "https://images.pexels.com/photos/1034859/pexels-photo-1034859.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_famille_e_3', type: 'cercle', title: 'Pardonner à ses parents : possible ou non ?',
    description: 'Le pardon est un chemin personnel. Est-il nécessaire pour avancer ? Et que signifie-t-il vraiment ?',
    detailedContent: 'Pardonner, est-ce excuser ? Est-ce oublier ? Ou est-ce se libérer soi-même d\'un poids ? Explorons les différentes facettes du pardon parental.',
    whyThisWorkshop: 'Pour cheminer sur la voie du pardon, à son propre rythme, en comprenant que ce n\'est pas une obligation.',
    participantExpectations: 'Un partage vulnérable dans un cadre de sécurité et de non-jugement absolu.',
    whatToGain: 'Une relation plus apaisée avec son histoire et des clés pour avancer, avec ou sans pardon.',
    xpActivated: ["Vulnérabilité", "Auto-soutien", "Gestion Émotionnelle", "Résilience", "Authenticité", "Partage", "Écoute Active"], categoryKey: 'famille', requiredLevel: 'Engager', isPremium: true, duration: "30 min", image: "https://images.pexels.com/photos/3784433/pexels-photo-3784433.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  // --- PARENTALITÉ : Seeker ---
  {
    id: 'w_tpl_parentalite_s_1', type: 'cercle', title: 'Être parent, est-ce que ça change tout ?',
    description: 'Devenir parent transforme la vie. Partageons nos découvertes, nos joies et nos difficultés.',
    detailedContent: 'Qu\'est-ce que la parentalité a le plus changé en toi ? Tes priorités, ton couple, ton rapport au monde ?',
    whyThisWorkshop: 'Pour normaliser les bouleversements de la parentalité et se sentir moins seul·e.',
    participantExpectations: 'Un partage authentique sur les réalités de la vie de parent.',
    whatToGain: 'Le sentiment de faire partie d\'une communauté qui comprend et un regard neuf sur son parcours.',
    xpActivated: ["Partage", "Authenticité", "Soutien actif", "Écoute Active", "Respect de soi", "Ouverture", "Humour"], categoryKey: 'parentalite', requiredLevel: 'Seeker', duration: "20 min", image: "https://images.pexels.com/photos/164835/pexels-photo-164835.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_parentalite_s_2', type: 'cercle', title: 'Les clichés autour des “bons parents”',
    description: 'Parent parfait, mère parfaite, père parfait... Déconstruisons ensemble ces mythes qui nous mettent la pression.',
    detailedContent: 'Quelles sont les injonctions que tu ressens le plus en tant que parent ? Comment te libères-tu de la pression de la perfection ?',
    whyThisWorkshop: 'Pour déculpabiliser et célébrer nos imperfections de parents.',
    participantExpectations: 'Un échange libérateur sur la pression sociale et personnelle.',
    whatToGain: 'Plus d\'auto-compassion et la permission d\'être un parent "suffisamment bon".',
    xpActivated: ["Auto-soutien", "Réflexion Critique", "Humour", "Authenticité", "Partage", "Écoute Active", "Respect de soi"], categoryKey: 'parentalite', requiredLevel: 'Seeker', duration: "20 min", image: "https://images.pexels.com/photos/302083/pexels-photo-302083.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_parentalite_s_3', type: 'cercle', title: 'Enfants et réseaux sociaux : jusqu’où ?',
    description: 'Partager des photos de ses enfants en ligne : fierté ou danger ? Trouvons le juste milieu.',
    detailedContent: 'Quelle est ta politique personnelle sur le partage d\'images de tes enfants ? Quelles sont tes craintes et tes motivations ?',
    whyThisWorkshop: 'Pour une réflexion collective sur le droit à l\'image et la protection de l\'intimité de nos enfants.',
    participantExpectations: 'Un débat respectueux sur un sujet de société majeur.',
    whatToGain: 'Des arguments pour affiner sa propre position et en parler sereinement en famille.',
    xpActivated: ["Réflexion Critique", "Communication", "Respect de soi", "Authenticité", "Partage", "Écoute Active", "Ouverture"], categoryKey: 'parentalite', requiredLevel: 'Seeker', duration: "25 min", image: "https://images.pexels.com/photos/4145769/pexels-photo-4145769.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  // --- PARENTALITÉ : Builder ---
  {
    id: 'w_tpl_parentalite_b_1', type: 'cercle', title: 'Être parent solo : défi ou force cachée ?',
    description: 'Au-delà des difficultés, explorons la résilience, l\'autonomie et les forces uniques de la monoparentalité.',
    detailedContent: 'Quels sont les plus grands défis de la parentalité solo ? Et quelles sont les forces insoupçonnées que tu as découvertes en toi ?',
    whyThisWorkshop: 'Pour valoriser les parcours des parents solos et partager des ressources et du soutien.',
    participantExpectations: 'Un échange constructif et solidaire.',
    whatToGain: 'Un sentiment de fierté, de la reconnaissance et des astuces pour faciliter le quotidien.',
    xpActivated: ["Résilience", "Auto-soutien", "Soutien actif", "Courage", "Authenticité", "Partage", "Écoute Active"], categoryKey: 'parentalite', requiredLevel: 'Builder', duration: "25 min", image: "https://images.pexels.com/photos/7282361/pexels-photo-7282361.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_parentalite_b_2', type: 'cercle', title: 'Partager la charge mentale dans le couple parental',
    description: 'La fameuse charge mentale... Comment la rendre visible et la répartir plus équitablement ?',
    detailedContent: 'Penser à tout, tout le temps. Comment faire comprendre à son partenaire le poids de cette charge invisible ? Quelles sont vos stratégies ?',
    whyThisWorkshop: 'Pour transformer un sujet de conflit potentiel en un projet d\'équipe.',
    participantExpectations: 'Partage d\'outils et de techniques de communication.',
    whatToGain: 'Des actions concrètes pour un quotidien plus léger et un couple plus soudé.',
    xpActivated: ["Communication", "Alignement", "Gestion Émotionnelle", "Authenticité", "Partage", "Écoute Active", "Respect de soi"], categoryKey: 'parentalite', requiredLevel: 'Builder', duration: "25 min", image: "https://images.pexels.com/photos/4386341/pexels-photo-4386341.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  // --- PARENTALITÉ : Engager ---
  {
    id: 'w_tpl_parentalite_e_1', type: 'cercle', title: 'Les tensions éducatives dans le couple',
    description: 'Quand deux visions de l\'éducation s\'affrontent, comment trouver un terrain d\'entente pour le bien de l\'enfant ?',
    detailedContent: 'Autorité vs bienveillance, limites strictes vs souplesse... Comment faire de vos différences une richesse plutôt qu\'une source de conflit ?',
    whyThisWorkshop: 'Pour apprendre à dialoguer et à construire un projet éducatif commun et cohérent.',
    participantExpectations: 'Une discussion constructive sur la communication et le compromis.',
    whatToGain: 'Des clés pour harmoniser ses pratiques éducatives et renforcer son alliance parentale.',
    xpActivated: ["Communication", "Alignement", "Empathie", "Réflexion Critique", "Authenticité", "Partage", "Écoute Active"], categoryKey: 'parentalite', requiredLevel: 'Engager', isPremium: true, duration: "30 min", image: "https://images.pexels.com/photos/5879321/pexels-photo-5879321.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 'w_tpl_parentalite_e_2', type: 'cercle', title: 'Mes erreurs de parent que je voudrais transformer',
    description: 'Personne n\'est parfait. Partageons avec vulnérabilité les moments où nous avons l\'impression d\'avoir échoué, et comment nous pouvons grandir.',
    detailedContent: 'Un mot de trop, une réaction disproportionnée... Quels sont ces moments que tu regrettes et qu\'est-ce qu\'ils t\'apprennent sur toi ?',
    whyThisWorkshop: 'Pour déculpabiliser et voir nos erreurs comme des opportunités d\'apprentissage.',
    participantExpectations: 'Un partage courageux dans un espace de non-jugement absolu.',
    whatToGain: 'Plus de compassion pour soi-même et des pistes pour réparer et faire mieux la prochaine fois.',
    xpActivated: ["Vulnérabilité", "Résilience", "Auto-soutien", "Courage", "Authenticité", "Partage", "Écoute Active"], categoryKey: 'parentalite', requiredLevel: 'Engager', isPremium: true, duration: "30 min", image: "https://images.pexels.com/photos/4098228/pexels-photo-4098228.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
    // --- QUOTIDIEN & MOI: Seeker (using 'famille' key) ---
  {
    id: 'w_tpl_moi_s_1', type: 'cercle', title: 'La solitude : choix ou contrainte ?',
    description: 'Moment de ressourcement pour certains, poids pour d\'autres. Explorons notre rapport à la solitude.',
    detailedContent: 'Comment vis-tu les moments où tu es seul·e ? Est-ce que tu les recherches ou tu les fuis ? Qu\'est-ce que la solitude t\'apprend sur toi ?',
    whyThisWorkshop: 'Pour dédramatiser la solitude et la transformer en une alliée pour mieux se connaître.',
    participantExpectations: 'Partage d\'expériences personnelles sur la solitude, sans jugement.',
    whatToGain: 'Un rapport plus apaisé à la solitude et des idées pour l\'apprivoiser.',
    xpActivated: ["Introspection", "Auto-soutien", "Authenticité", "Partage", "Écoute Active", "Respect de soi", "Ouverture"], categoryKey: 'famille', requiredLevel: 'Seeker', duration: "20 min", image: "https://images.pexels.com/photos/3831847/pexels-photo-3831847.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  // --- QUOTIDIEN & MOI: Builder (using 'famille' key) ---
  {
    id: 'w_tpl_moi_b_1', type: 'cercle', title: 'Poser mes limites sans culpabiliser',
    description: 'Dire non, c\'est souvent se dire oui à soi. Apprenons ensemble à le faire avec bienveillance.',
    detailedContent: 'Qu\'est-ce qui te rend difficile de dire non ? La peur de décevoir, de blesser, d\'être rejeté·e ? Dans quelle situation aimerais-tu poser plus clairement tes limites ?',
    whyThisWorkshop: 'Pour comprendre que poser ses limites est un acte d\'amour-propre et une condition pour des relations saines.',
    participantExpectations: 'Un espace pour partager ses peurs et s\'entraîner à formuler ses limites.',
    whatToGain: 'Le courage et les mots pour dire non plus facilement, et des relations plus respectueuses.',
    xpActivated: ["Respect de soi", "Affirmation de soi", "Courage", "Communication", "Authenticité", "Partage", "Écoute Active"], categoryKey: 'famille', requiredLevel: 'Builder', duration: "25 min", image: "https://images.pexels.com/photos/5699475/pexels-photo-5699475.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
    // --- QUOTIDIEN & MOI: Engager (using 'famille' key) ---
  {
    id: 'w_tpl_moi_e_1', type: 'cercle', title: 'Burn-out émotionnel : en ai-je déjà vécu un ?',
    description: 'Quand le cœur et la tête sont à plat. Reconnaître les signes de l\'épuisement émotionnel.',
    detailedContent: 'As-tu déjà ressenti un épuisement qui n\'était pas que physique ? Quels étaient les signes ? Comment en es-tu sorti·e ?',
    whyThisWorkshop: 'Pour mettre des mots sur un mal souvent silencieux et partager des ressources pour prévenir et guérir.',
    participantExpectations: 'Un partage vulnérable et un soutien mutuel pour reconnaître et valider ces expériences.',
    whatToGain: 'Une meilleure capacité à identifier les signes du burn-out émotionnel et des stratégies d\'auto-soin.',
    xpActivated: ["Auto-soutien", "Vulnérabilité", "Soutien actif", "Gestion Émotionnelle", "Authenticité", "Partage", "Écoute Active"], categoryKey: 'famille', requiredLevel: 'Engager', duration: "30 min", image: "https://images.pexels.com/photos/3807746/pexels-photo-3807746.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  // --- TRAVAIL & SOCIETE: Seeker ---
  {
    id: 'w_tpl_travail_s_1', type: 'cercle', title: 'Le télétravail : liberté ou isolement ?',
    description: 'Le travail à domicile a ses avantages et ses inconvénients. Comment trouver le bon équilibre pour soi ?',
    detailedContent: 'Le télétravail est-il pour toi synonyme de flexibilité et de concentration, ou de solitude et de déconnexion avec l\'équipe ?',
    whyThisWorkshop: 'Pour partager les meilleures pratiques et les défis du travail à distance.',
    participantExpectations: 'Un échange d\'expériences et d\'astuces pour bien vivre le télétravail.',
    whatToGain: 'Des stratégies pour rester connecté et productif, tout en préservant son bien-être.',
    xpActivated: ["Partage", "Auto-soutien", "Communication", "Authenticité", "Écoute Active", "Respect de soi", "Ouverture"], categoryKey: 'travail', requiredLevel: 'Seeker', duration: "20 min", image: "https://images.pexels.com/photos/4050319/pexels-photo-4050319.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  // --- TRAVAIL & SOCIETE: Builder ---
  {
    id: 'w_tpl_travail_b_1', type: 'cercle', title: 'Comment gérer mon image pro / perso ?',
    description: 'Entre LinkedIn et Instagram, comment rester authentique sans compromettre son image professionnelle ?',
    detailedContent: 'Faut-il avoir deux personnalités, une pour le bureau et une pour la vie privée ? Où se situe la frontière ?',
    whyThisWorkshop: 'Pour réfléchir à une manière plus alignée et moins stressante de gérer ses différentes facettes en ligne et hors ligne.',
    participantExpectations: 'Un partage d\'expériences sur la gestion de son image à l\'ère numérique.',
    whatToGain: 'Plus d\'authenticité et de cohérence dans sa communication.',
    xpActivated: ["Authenticité", "Alignement", "Réflexion Critique", "Partage", "Écoute Active", "Respect de soi", "Ouverture"], categoryKey: 'travail', requiredLevel: 'Builder', duration: "25 min", image: "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  // --- TRAVAIL & SOCIETE: Engager ---
  {
    id: 'w_tpl_travail_e_1', type: 'cercle', title: 'Stress et anxiété liés au travail',
    description: 'Quand la pression devient trop forte. Partageons nos expériences et nos stratégies pour faire face.',
    detailedContent: 'Comment le stress lié au travail se manifeste-t-il chez toi ? Quelles sont tes soupapes de décompression ?',
    whyThisWorkshop: 'Pour briser l\'isolement face au stress professionnel et trouver du soutien collectif.',
    participantExpectations: 'Un partage bienveillant de nos vulnérabilités professionnelles.',
    whatToGain: 'Des techniques de gestion du stress et le sentiment de ne pas être seul·e.',
    xpActivated: ["Gestion Émotionnelle", "Soutien actif", "Vulnérabilité", "Auto-soutien", "Authenticité", "Partage", "Écoute Active"], categoryKey: 'travail', requiredLevel: 'Engager', isPremium: true, duration: "30 min", image: "https://images.pexels.com/photos/313690/pexels-photo-313690.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  // --- ÂGE & TRANSMISSION: Seeker ---
  {
    id: 'w_tpl_age_s_1', type: 'cercle', title: 'Vieillir : peur ou sagesse ?',
    description: 'Notre société valorise la jeunesse. Comment développer un rapport plus apaisé et positif à l\'idée de vieillir ?',
    detailedContent: 'Que représente pour toi le fait de prendre de l\'âge ? Est-ce une source d\'angoisse ou une promesse d\'expérience et de sérénité ?',
    whyThisWorkshop: 'Pour changer notre regard sur le vieillissement et y voir une opportunité de croissance.',
    participantExpectations: 'Un partage honnête de nos peurs et de nos espoirs face au temps qui passe.',
    whatToGain: 'Une vision plus sereine de l\'avenir et l\'envie de célébrer chaque étape de la vie.',
    xpActivated: ["Réflexion Critique", "Gestion Émotionnelle", "Ouverture", "Authenticité", "Partage", "Écoute Active", "Respect de soi"], categoryKey: 'quarantaine', requiredLevel: 'Seeker', duration: "20 min", image: "https://images.pexels.com/photos/3768126/pexels-photo-3768126.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  // --- ÂGE & TRANSMISSION: Builder ---
  {
    id: 'w_tpl_age_b_1', type: 'cercle', title: 'Se réinventer après 40 ans',
    description: 'Carrière, relations, passions... La moitié de la vie est souvent un moment de bilan et de nouveaux départs.',
    detailedContent: 'Ressens-tu l\'envie ou le besoin de changer des choses importantes dans ta vie ? Qu\'est-ce qui te freine et qu\'est-ce qui te motive ?',
    whyThisWorkshop: 'Pour s\'inspirer mutuellement et trouver le courage de se réinventer, peu importe son âge.',
    participantExpectations: 'Partage d\'histoires de transformation et de rêves pour l\'avenir.',
    whatToGain: 'De l\'inspiration, de la motivation et la conviction qu\'il n\'est jamais trop tard pour changer.',
    xpActivated: ["Courage", "Alignement", "Partage", "Soutien actif", "Authenticité", "Écoute Active", "Respect de soi"], categoryKey: 'quarantaine', requiredLevel: 'Builder', duration: "25 min", image: "https://images.pexels.com/photos/2228580/pexels-photo-2228580.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  // --- ÂGE & TRANSMISSION: Engager ---
  {
    id: 'w_tpl_age_e_1', type: 'cercle', title: 'La solitude affective après 45 ans',
    description: 'Quand les enfants sont grands et que le couple n\'est plus, comment réinventer sa vie affective ?',
    detailedContent: 'La solitude à cet âge peut être particulièrement pesante. Comment faire de nouvelles rencontres amicales ou amoureuses ? Comment se sentir bien avec soi-même ?',
    whyThisWorkshop: 'Pour rompre l\'isolement et partager des stratégies pour une vie sociale et affective épanouie.',
    participantExpectations: 'Un échange authentique et solidaire sur un sujet souvent tabou.',
    whatToGain: 'De l\'espoir, des pistes concrètes et le sentiment de faire partie d\'une communauté.',
    xpActivated: ["Soutien actif", "Vulnérabilité", "Résilience", "Partage", "Authenticité", "Écoute Active", "Respect de soi"], categoryKey: 'quarantaine', requiredLevel: 'Engager', isPremium: true, duration: "30 min", image: "https://images.pexels.com/photos/5408902/pexels-photo-5408902.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];


function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const generateMockFeedData = (): ActivityFeedItem[] => {
    const feedItems: ActivityFeedItem[] = [];
    const now = new Date();

    const shuffledWorkshops = shuffleArray([...WORKSHOP_TEMPLATES]);
    const shuffledXpTypes = shuffleArray([...EMOTIONAL_XP_TYPES]);
    
    const allAIs = [
        ...FEMALE_AI_NAMES.map((name, i) => ({ name, gender: 'female' as const, avatarUrl: FEMALE_AI_AVATAR_URLS[i % FEMALE_AI_AVATAR_URLS.length] })),
        ...MALE_AI_NAMES.map((name, i) => ({ name, gender: 'male' as const, avatarUrl: MALE_AI_AVATAR_URLS[i % MALE_AI_AVATAR_URLS.length] }))
    ];
    const shuffledAIs = shuffleArray(allAIs);

    const createMockProfile = (ai: { name: string; gender: 'female' | 'male'; avatarUrl: string }): ParticipantProfileInfo => {
        const totalXP = Math.floor(Math.random() * 800) + 50;
        const currentLevel = getLevelFromXP(totalXP);
        const badges: Badge[] = [];
        if (totalXP > 150) badges.push({ id: 'b_builder_path', name: 'Constructeur Engagé', icon: '🛠️' });
        if (Math.random() > 0.6) badges.push({ id: 'b_empathy', name: 'Écoute Active', icon: '👂' });

        return {
            name: ai.name,
            totalXP,
            currentLevel,
            isAI: true,
            workshopsAttended: Math.floor(Math.random() * 20) + 3,
            badges,
            activityStatus: "Actif récemment",
            gender: ai.gender,
            avatarUrl: ai.avatarUrl,
            profession: ["Développeur", "Designer", "Coach", "Artiste", "Thérapeute", "Étudiant"][Math.floor(Math.random()*6)],
            hobbies: [["Lecture", "Randonnée"], ["Cinéma", "Cuisine"], ["Musique", "Voyage"]][Math.floor(Math.random()*3)],
            biography: "Passionné·e par la compréhension humaine et les connexions authentiques. Toujours en quête d'apprentissage et de partage."
        };
    };

    // 1. Join workshop activity (3 items)
    for (let i = 0; i < 3; i++) {
        if (shuffledWorkshops.length > i && shuffledAIs.length > i) {
            const ai = shuffledAIs[i];
            const workshop = shuffledWorkshops[i];
            const userProfile = createMockProfile(ai);
            feedItems.push({
                id: `feed-join-${i}`,
                userProfile,
                activityType: 'joined_workshop',
                details: {
                    workshopTitle: workshop.title,
                    workshopId: workshop.id,
                },
                timestamp: new Date(now.getTime() - (i * 3 + Math.random() * 2) * 60 * 60 * 1000),
            });
        }
    }

    // 2. Earn XP activity (2 items)
    for (let i = 0; i < 2; i++) {
        if (shuffledXpTypes.length > i && shuffledAIs.length > i + 3) {
            const ai = shuffledAIs[i + 3];
            const xpType = shuffledXpTypes[i];
            const userProfile = createMockProfile(ai);
            feedItems.push({
                id: `feed-xp-${i}`,
                userProfile,
                activityType: 'earned_xp',
                details: {
                    xpType: xpType.name,
                    xpAmount: Math.random() > 0.5 ? 5 : 10,
                },
                timestamp: new Date(now.getTime() - (i * 2 + Math.random()) * 60 * 60 * 1000),
            });
        }
    }
    
    // 3. Complete workshop activity (1 item)
    if (shuffledWorkshops.length > 3 && shuffledAIs.length > 5) {
        const ai = shuffledAIs[5];
        const workshop = shuffledWorkshops[3];
        const userProfile = createMockProfile(ai);
        feedItems.push({
            id: `feed-complete-1`,
            userProfile,
            activityType: 'completed_workshop',
            details: {
                workshopTitle: workshop.title,
                workshopId: workshop.id,
            },
            timestamp: new Date(now.getTime() - (Math.random() * 24) * 60 * 60 * 1000),
        });
    }

    return feedItems.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};
