import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import StyledButton from '../components/StyledButton';
import {
  UserProfile,
  WorkshopTheme,
  UserDailySubmission,
  UserJourneySummary,
  AgeRange,
  AgeRanges,
  Badge,
} from '../types';
import {
  ESSENTIAL_LIMITS_OPTIONS,
  FLEXIBLE_PREFERENCES_OPTIONS,
  POSITIVE_REQUESTS_OPTIONS,
  ECHOS_SUBMISSIONS_STORAGE_KEY,
  getLevelFromXP,
  getNextLevel,
  XP_LEVELS,
  ENERGIZERS_OPTIONS,
  DRAINERS_OPTIONS,
  CORE_VALUES_OPTIONS,
  PROFESSION_CATEGORY_OPTIONS_LIST,
  GENDER_OPTIONS,
  getGenderedStrings,
  BENEFITS_BY_LEVEL,
} from '../constants';
import {
  ArrowLeftIcon,
  QuestionMarkCircleIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  HumanHeartIcon,
  ShieldCheckIcon,
  AdjustmentsHorizontalIcon,
  ClipboardDocumentIcon,
  ShareIcon,
  CheckIcon,
  ArchiveIcon,
  LightBulbIcon,
  SparklesIcon,
  DocumentDownloadIcon,
  EchosIcon,
  AudioIcon,
  ChatBubbleLeftRightIcon,
  TrendingUpIcon,
  AffinitiesIcon,
  PuzzleIcon,
  BoltIcon,
  ExclamationTriangleIcon,
  TrashIcon,
  PlayIcon,
  UploadIcon,
  StarIcon,
  CheckCircleIcon,
  LockClosedIcon,
  XIcon,
} from '../components/icons';
import { generateBio, generateDeepAnalysis, generateBioSuggestions } from '../services/geminiService';
import LoadingSpinner from '../components/LoadingSpinner';
import ProgressionDisplay from '../components/ProgressionDisplay';
import UserJourneySummaryModal from '../components/UserJourneySummaryModal';
import BadgeDisplay from '../components/BadgeDisplay';

interface MeSectionDetailProps {
  userProfile: UserProfile | null;
  pastWorkshops: WorkshopTheme[];
  onPurchaseXPBoost: (amount: number, levelMinXP: number) => void;
  onTogglePremium: () => void;
  allCurrentlyAvailableWorkshops: WorkshopTheme[];
  userCreatedWorkshops: WorkshopTheme[];
  onUpdateProfileDetails: (detailsToUpdate: Partial<UserProfile>) => void;
  addNotification: (message: string, type?: 'info' | 'success' | 'error') => void;
  onResetProgression: () => void;
}

const AccordionItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="border-b border-gray-200 last:border-b-0">
        <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400">
          <span className="font-medium text-gray-800">{title}</span>
          {isOpen ? <ChevronUpIcon className="w-5 h-5 text-gray-500" /> : <ChevronDownIcon className="w-5 h-5 text-gray-500" />}
        </button>
        {isOpen && (
          <div className="pb-4 pr-4 text-gray-600 text-sm leading-relaxed prose prose-sm max-w-none">
            {children}
          </div>
        )}
      </div>
    );
};

const faqData = [
    {
        question: "Comment participer à mon premier atelier ?",
        answer: <p>C'est très simple ! Allez dans l'onglet 'Ateliers', explorez les thèmes proposés, et cliquez sur 'S'inscrire' pour ceux qui vous intéressent. Si un niveau est requis, il sera indiqué. Pour votre premier atelier, nous vous recommandons de choisir un thème 'Seeker' 🌱 pour une découverte en douceur.</p>
    },
    {
        question: "Comment fonctionnent les XP et les niveaux ?",
        answer: <p>Les Points d'Expérience (XP) récompensent votre participation et votre engagement. Vous en gagnez en participant aux ateliers, en partageant des réflexions dans 'Échos', et en interagissant. Accumuler des XP vous fait monter de niveau (Seeker, Builder, etc.), débloquant de nouvelles fonctionnalités comme la création d'ateliers ou les conversations privées.</p>
    },
    {
        question: "Qui sont les autres participants dans les ateliers ?",
        answer: <p>Pour garantir un environnement sûr et bienveillant, tous les autres participants dans les ateliers sont actuellement des intelligences artificielles avancées. Elles sont conçues pour animer la discussion, réagir à vos partages de manière pertinente et créer une expérience de groupe riche et constructive, sans les risques liés aux interactions humaines non modérées.</p>
    },
    {
        question: "Comment créer des affinités ?",
        answer: <p>Les affinités se créent naturellement avec votre participation. Après avoir complété 3 ateliers, une IA "match" vous est suggérée dans l'onglet 'Affinités'. Cette IA est choisie pour sa compatibilité potentielle avec votre profil. Vous pouvez alors démarrer une conversation privée pour approfondir le lien.</p>
    },
    {
        question: "Que faire si je me sens mal à l'aise dans un atelier ?",
        answer: <p>Votre bien-être est notre priorité. Si un sujet ou une interaction vous met mal à l'aise, vous êtes libre de quitter l'atelier à tout moment en cliquant sur 'Terminer l'atelier'. Il n'y a aucune pénalité. Vous pouvez ensuite choisir un autre atelier ou prendre du temps pour vous. Vos retours sont précieux, n'hésitez pas à nous contacter si besoin.</p>
    },
    {
        question: "Mes données sont-elles en sécurité ?",
        answer: <p>Absolument. La confidentialité est au cœur de HUMĀN. Vos conversations et réflexions sont stockées de manière sécurisée et ne sont utilisées que pour personnaliser votre expérience. Les interactions dans les ateliers sont avec des IA, garantissant un anonymat total vis-à-vis des autres utilisateurs. Nous ne vendons ni ne partagerons jamais vos données personnelles.</p>
    }
];


const MeSectionDetail: React.FC<MeSectionDetailProps> = ({ userProfile, pastWorkshops, userCreatedWorkshops, onUpdateProfileDetails, addNotification, onResetProgression }) => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const navigate = useNavigate();
  
  const [selectedLimits, setSelectedLimits] = useState<string[]>(userProfile?.essentialLimits || []);
  const [preferences, setPreferences] = useState<Record<string, number>>(userProfile?.flexiblePreferences || FLEXIBLE_PREFERENCES_OPTIONS.reduce((acc, pref) => ({ ...acc, [pref.key]: 50 }), {}));
  const [selectedRequests, setSelectedRequests] = useState<string[]>(userProfile?.positiveRequests || []);
  const [energyAndMotivation, setEnergyAndMotivation] = useState(userProfile?.energyAndMotivation || { energizers: [], drainers: [], coreValues: [] });

  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBio, setGeneratedBio] = useState(userProfile?.biography || '');
  const [bioError, setBioError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
  const [suggestionError, setSuggestionError] = useState('');

  const [echos, setEchos] = useState<UserDailySubmission[]>([]);
  
  const [activeTab, setActiveTab] = useState<'ateliers' | 'echos'>('ateliers');
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [journeySummary, setJourneySummary] = useState<UserJourneySummary | null>(null);

  const [formData, setFormData] = useState({
    firstName: userProfile?.firstName || '',
    gender: userProfile?.gender || 'prefer_not_to_say',
    ageRange: userProfile?.ageRange || AgeRanges.AGE_26_35,
    location: userProfile?.location || '',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSavePersonalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfileDetails({
      firstName: formData.firstName,
      gender: formData.gender as UserProfile['gender'],
      ageRange: formData.ageRange as AgeRange,
      location: formData.location,
    });
    addNotification("Informations personnelles mises à jour !", "success");
  };


  useEffect(() => {
    if (sectionId === 'parcours' || sectionId === 'badges') {
      try {
        const stored = localStorage.getItem(ECHOS_SUBMISSIONS_STORAGE_KEY);
        if (stored) {
          setEchos(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Failed to load echos", e);
      }
    }
  }, [sectionId]);

  const handleGenerateSummary = async () => {
    if (!userProfile) return;

    setIsSummaryModalOpen(true);
    setJourneySummary({
        firstName: userProfile.firstName,
        isExample: false,
        isLoading: true,
        analysisTitle: `Synthèse du Parcours de ${userProfile.firstName}`,
        analysisText: '',
    });

    const result = await generateDeepAnalysis(userProfile, pastWorkshops, echos);

    if (result.analysis) {
        setJourneySummary(prev => prev ? { ...prev, isLoading: false, analysisText: result.analysis } : null);
    } else {
        setJourneySummary(prev => prev ? { ...prev, isLoading: false, analysisText: result.error || "Une erreur est survenue lors de la génération." } : null);
    }
  };
  
  const handleGenerateBio = async () => {
    if(!userProfile) return;
    setIsGenerating(true);
    setBioError('');
    setGeneratedBio('');
    setSuggestions([]);
    setSuggestionError('');

    const result = await generateBio({
      limits: selectedLimits,
      preferences: preferences,
      requests: selectedRequests,
      energy: energyAndMotivation,
    }, userProfile.firstName);

    if (result.bioText) {
      setGeneratedBio(result.bioText);
    } else {
      setBioError(result.error || "Une erreur inconnue est survenue.");
    }
    setIsGenerating(false);
  };

  const handleGetSuggestions = async () => {
    if (!userProfile) return;
    setIsGeneratingSuggestions(true);
    setSuggestionError('');
    setSuggestions([]);

    const result = await generateBioSuggestions({
      limits: selectedLimits,
      preferences: preferences,
      requests: selectedRequests,
      energy: energyAndMotivation,
    }, userProfile.firstName);

    if (result.suggestions) {
      setSuggestions(result.suggestions);
    } else {
      setSuggestionError(result.error || "Une erreur inconnue est survenue.");
    }
    setIsGeneratingSuggestions(false);
  };

  useEffect(() => {
    if (isBioModalOpen && !generatedBio && !isGenerating && selectedLimits.length > 0 && selectedRequests.length > 0) {
        handleGenerateBio();
    }
  }, [isBioModalOpen, generatedBio, isGenerating, selectedLimits, selectedRequests]);


  if (!userProfile) {
    return <PageContainer title="Chargement..."><p>Chargement du profil...</p></PageContainer>;
  }
  
  const handleToggleSelection = (item: string, list: string[], setList: (newList: string[]) => void) => {
      const isSelected = list.includes(item);
      if (isSelected) {
          setList(list.filter(i => i !== item));
      } else if (list.length < 5) {
          setList([...list, item]);
      }
  };
  
  const handleEnergyToggle = (item: string, category: 'energizers' | 'drainers' | 'coreValues') => {
    setEnergyAndMotivation(prev => {
        const currentList = prev[category];
        const isSelected = currentList.includes(item);
        let newList;
        if (isSelected) {
            newList = currentList.filter(i => i !== item);
        } else {
            newList = [...currentList, item].slice(0, 5); // Limit to 5
        }
        return { ...prev, [category]: newList };
    });
  };

  const handlePreferenceChange = (key: string, value: string) => {
      setPreferences(prev => ({ ...prev, [key]: Number(value) }));
  };

  const handleInitiateBioCreation = () => {
      if (selectedLimits.length === 0 || selectedRequests.length === 0) {
        addNotification("Veuillez sélectionner au moins une limite essentielle et une demande positive.", "error");
        return;
      }
      setIsBioModalOpen(true);
  };
  
  const handleSaveAndClose = () => {
      if (!generatedBio) {
        addNotification("La bio ne peut pas être vide.", "error");
        return;
      }
      const updatedDetails: Partial<UserProfile> = {
          essentialLimits: selectedLimits,
          flexiblePreferences: preferences,
          positiveRequests: selectedRequests,
          energyAndMotivation: energyAndMotivation,
          biography: generatedBio
      };
      onUpdateProfileDetails(updatedDetails);
      addNotification("Votre territoire et votre bio ont été enregistrés !", "success");
      setIsBioModalOpen(false);
  };
  
  const handleCopyText = () => {
    navigator.clipboard.writeText(generatedBio).then(() => {
        setCopySuccess('Copié dans le presse-papiers !');
        setTimeout(() => setCopySuccess(''), 2000);
    }, (err) => {
        console.error('Could not copy text: ', err);
        setCopySuccess('Erreur lors de la copie.');
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Bio de ${userProfile.firstName} sur HUMĀN`,
          text: generatedBio,
        });
      } catch (error) {
        console.error('Error sharing', error);
      }
    } else {
      handleCopyText();
      alert("La fonction de partage n'est pas supportée. Le texte a été copié dans votre presse-papiers.");
    }
  };
  
  const InfoItem: React.FC<{ icon: React.FC<any>; title: string; description: string }> = ({ icon: Icon, title, description }) => (
    <div className="flex items-start space-x-4 py-4">
      <div className="flex-shrink-0 mt-1">
        <div className="w-10 h-10 flex items-center justify-center bg-orange-50 rounded-full">
          <Icon className="w-5 h-5 text-orange-500" />
        </div>
      </div>
      <div>
        <h5 className="font-semibold text-gray-800">{title}</h5>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );

  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
      <h4 className="text-center text-xl font-semibold text-gray-500 mb-2 pb-2 border-b-2 border-gray-100">{title}</h4>
      <div className="divide-y divide-gray-100">
          {children}
      </div>
    </div>
  );
  
  const piliers = [
    {
      icon: ChatBubbleLeftRightIcon,
      title: "La Parole Authentique",
      description: "Nos ateliers sont des espaces sacrés où chaque voix compte. Ici, pas de performance, juste le courage de partager sa vérité, même si elle est hésitante. C'est dans cette authenticité que naît la véritable connexion."
    },
    {
      icon: HumanHeartIcon,
      title: "L'Écoute Profonde",
      description: "Écouter, c'est plus que se taire : c'est offrir sa pleine présence. C'est un cadeau qui se reflète dans les XP de \"Soutien\" ou d'\"Écoute Active\". Reconnaître la parole de l'autre, c'est lui dire : \"Je te vois\"."
    }
  ];

  const cles = [
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Les Ateliers : Le Cœur",
      description: "Le cœur de HUMĀN. Des espaces de discussion en petit groupe, animés par votre Guide HUMĀN, où vous explorez des thèmes profonds en toute sécurité. C'est ici que la parole se libère et que l'écoute prend tout son sens."
    },
    {
      icon: EchosIcon,
      title: "Les Échos : Le Miroir",
      description: "Votre jardin secret. Un dialogue intime où, en déposant vos pensées, vous permettez à votre Guide HUMĀN de vous offrir un reflet poétique, une question pour aller plus loin. C'est un outil pour voir les thèmes qui animent votre monde intérieur."
    },
    {
      icon: TrendingUpIcon,
      title: "Les XP & Niveaux : Le Chemin",
      description: "Votre progression n'est pas une course, mais le reflet de votre engagement envers vous-même et les autres. Chaque niveau débloque des ateliers plus profonds, suivant le rythme naturel de votre évolution."
    },
    {
      icon: AffinitiesIcon,
      title: "Les Affinités : La Conséquence",
      description: "Les liens ne se forcent pas, ils naissent d'une résonance vécue. En reconnaissant la valeur des partages d'une personne dans plusieurs ateliers, vous tissez une connexion authentique, loin des apparences."
    },
    {
      icon: PuzzleIcon,
      title: "CTV - Choisis Ta Vibe : Le Simulateur",
      description: "Un terrain de jeu pour explorer vos réflexes relationnels. Des scénarios concrets pour mieux comprendre vos réactions et vos émotions, sans jugement et à votre rythme."
    }
  ];

  const renderSectionContent = () => {
    switch (sectionId) {
      case 'progression':
        const userLevel = getLevelFromXP(userProfile.totalXP);
        const nextLevel = getNextLevel(userLevel.name);
        return (
          <div>
            <div className="flex items-center mb-6">
              <LightBulbIcon className="w-8 h-8 text-orange-500 mr-4" />
              <h3 className="text-2xl font-bold text-gray-800">Ma Progression</h3>
            </div>
            
            <ProgressionDisplay 
              xp={userProfile.totalXP}
              currentLevel={userLevel}
              nextLevel={nextLevel}
            />

            <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">Votre parcours HUMĀN</h3>

            <div className="space-y-6">
              {XP_LEVELS.map((level, index) => {
                const isUnlocked = userProfile.totalXP >= level.minXP;
                const isCurrent = userLevel.name === level.name;
                const benefits = BENEFITS_BY_LEVEL[level.name] || [];

                return (
                  <div key={level.name} className="timeline-item pl-8">
                    <div className="timeline-line"></div>
                    <div className={`timeline-dot ${isCurrent ? 'bg-orange-500' : isUnlocked ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    
                    <div className={`p-5 rounded-xl border-2 ${isCurrent ? 'bg-white shadow-lg border-orange-300' : 'bg-gray-50 border-transparent'}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className={`font-bold text-lg ${isCurrent ? 'text-orange-600' : isUnlocked ? 'text-green-700' : 'text-gray-500'}`}>
                            {level.emoji} {level.name}
                          </p>
                          <p className="text-xs font-medium text-gray-400">{level.minXP} - {level.maxXP === Infinity ? '∞' : level.maxXP} XP</p>
                        </div>
                        {isUnlocked ? (
                          <div className="flex items-center text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                            <CheckCircleIcon className="w-4 h-4 mr-1.5" />
                            Débloqué
                          </div>
                        ) : (
                           <div className="flex items-center text-sm font-semibold text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                            <LockClosedIcon className="w-4 h-4 mr-1.5" />
                            Verrouillé
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-2 italic">{level.description}</p>
                      {benefits.length > 0 && isUnlocked && (
                         <div className="mt-3 pt-3 border-t border-gray-200">
                            <h5 className="text-xs font-semibold text-gray-500 mb-2">AVANTAGES DÉBLOQUÉS :</h5>
                            <ul className="space-y-1.5 text-sm text-gray-700">
                                {benefits.map((benefit, i) => (
                                <li key={i} className="flex items-start">
                                    <StarIcon className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>{benefit}</span>
                                </li>
                                ))}
                            </ul>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 'badges':
        return (
            <div>
                 <div className="flex items-center mb-4 bg-white p-4 rounded-lg shadow-sm border">
                    <StarIcon className="w-8 h-8 text-yellow-500 mr-4" />
                    <h3 className="text-2xl font-bold text-gray-800">Mes Badges</h3>
                </div>
                <p className="text-center text-gray-500 mb-6">Votre collection de succès et de moments clés sur HUMĀN.</p>

                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200/80 mt-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-4">Badges Obtenus</h4>
                    <p className="text-gray-500">Pas de badges pour le moment</p>
                </div>
                 <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200/80 mt-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-4">Badges à débloquer</h4>
                    <p className="text-gray-500">Pas de badges pour le moment</p>
                </div>
            </div>
        );
      case 'profil':
        return (
            <div className="space-y-6 sm:space-y-8">
                <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200/80">
                    <div className="flex items-center mb-4">
                        <ShieldCheckIcon className="w-7 h-7 text-red-500 mr-3" />
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">Mes limites essentielles (obligatoire)</h3>
                            <p className="text-sm text-gray-500">Ce qui est non-négociable pour moi dans une relation.</p>
                        </div>
                    </div>
                    <div className="p-3 bg-red-50/50 rounded-lg border border-red-100">
                         <p className="text-xs text-red-700 font-medium">Sélectionnez 1 à 5 éléments</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {ESSENTIAL_LIMITS_OPTIONS.map(item => {
                            const isSelected = selectedLimits.includes(item);
                            return (
                                <button key={item} onClick={() => handleToggleSelection(item, selectedLimits, setSelectedLimits)}
                                    className={`px-3 py-1.5 text-sm rounded-full border transition-all duration-200 ${isSelected ? 'bg-red-500 text-white border-red-500 font-semibold' : 'bg-white text-gray-600 border-gray-300 hover:bg-red-50 hover:border-red-300'}`}
                                >
                                    {item}
                                </button>
                            )
                        })}
                    </div>
                    <p className="text-right text-xs text-gray-500 mt-3">{selectedLimits.length} / 5 sélectionné(s)</p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200/80">
                    <div className="flex items-center mb-4">
                        <HumanHeartIcon className="w-7 h-7 text-emerald-500 mr-3" />
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">Mes demandes positives (obligatoire)</h3>
                            <p className="text-sm text-gray-500">Ce que j'apprécie et qui me fait sentir bien et en sécurité.</p>
                        </div>
                    </div>
                    <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100">
                         <p className="text-xs text-emerald-700 font-medium">Exprimez 1 à 5 choses</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {POSITIVE_REQUESTS_OPTIONS.map(item => {
                            const isSelected = selectedRequests.includes(item);
                            return (
                                <button key={item} onClick={() => handleToggleSelection(item, selectedRequests, setSelectedRequests)}
                                    className={`px-3 py-1.5 text-sm rounded-full border transition-all duration-200 ${isSelected ? 'bg-emerald-500 text-white border-emerald-500 font-semibold' : 'bg-white text-gray-600 border-gray-300 hover:bg-emerald-50 hover:border-emerald-300'}`}
                                >
                                    {item}
                                </button>
                            )
                        })}
                    </div>
                     <p className="text-right text-xs text-gray-500 mt-3">{selectedRequests.length} / 5 sélectionné(s)</p>
                </div>

                 <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200/80">
                    <div className="flex items-center mb-4">
                        <BoltIcon className="w-7 h-7 text-yellow-500 mr-3" />
                        <div>
                             <h3 className="text-lg font-bold text-gray-800">Mon Énergie & Mes Moteurs</h3>
                            <p className="text-sm text-gray-500">Ce qui me nourrit et ce qui me pèse au quotidien.</p>
                        </div>
                    </div>
                    <div className="space-y-5 pt-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Ce qui me donne de l'énergie (5 max)</label>
                            <div className="flex flex-wrap gap-2">
                                {ENERGIZERS_OPTIONS.map(item => <button key={item} onClick={() => handleEnergyToggle(item, 'energizers')} className={`px-3 py-1.5 text-sm rounded-full border transition-all duration-200 ${energyAndMotivation.energizers.includes(item) ? 'bg-yellow-500 text-white border-yellow-500 font-semibold' : 'bg-white text-gray-600 border-gray-300 hover:bg-yellow-50'}`}>{item}</button>)}
                            </div>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Ce qui draine mon énergie (5 max)</label>
                            <div className="flex flex-wrap gap-2">
                                {DRAINERS_OPTIONS.map(item => <button key={item} onClick={() => handleEnergyToggle(item, 'drainers')} className={`px-3 py-1.5 text-sm rounded-full border transition-all duration-200 ${energyAndMotivation.drainers.includes(item) ? 'bg-slate-500 text-white border-slate-500 font-semibold' : 'bg-white text-gray-600 border-gray-300 hover:bg-slate-50'}`}>{item}</button>)}
                            </div>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mes valeurs fondamentales (5 max)</label>
                            <div className="flex flex-wrap gap-2">
                                {CORE_VALUES_OPTIONS.map(item => <button key={item} onClick={() => handleEnergyToggle(item, 'coreValues')} className={`px-3 py-1.5 text-sm rounded-full border transition-all duration-200 ${energyAndMotivation.coreValues.includes(item) ? 'bg-sky-500 text-white border-sky-500 font-semibold' : 'bg-white text-gray-600 border-gray-300 hover:bg-sky-50'}`}>{item}</button>)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200/80">
                    <div className="flex items-center mb-4">
                        <AdjustmentsHorizontalIcon className="w-7 h-7 text-blue-500 mr-3" />
                        <div>
                             <h3 className="text-lg font-bold text-gray-800">Mes préférences flexibles</h3>
                            <p className="text-sm text-gray-500">Ma zone de confort. Il n'y a pas de bonne ou mauvaise réponse.</p>
                        </div>
                    </div>
                    <div className="space-y-5 pt-2">
                        {FLEXIBLE_PREFERENCES_OPTIONS.map(pref => (
                            <div key={pref.key}>
                                <label htmlFor={pref.key} className="block text-sm font-medium text-gray-700 mb-2">{pref.label}</label>
                                <input id={pref.key} type="range" min="0" max="100" step="1" value={preferences[pref.key] || 50}
                                    onChange={(e) => handlePreferenceChange(pref.key, e.target.value)}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>{pref.minLabel}</span>
                                    <span>{pref.maxLabel}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-2">
                    <StyledButton fullWidth size="lg" onClick={handleInitiateBioCreation}>Générer ma bio</StyledButton>
                </div>
            </div>
        );
      case 'parcours':
        const builderLevel = XP_LEVELS.find(l => l.name === 'Builder');
        const canAccessSummary = builderLevel ? userProfile.totalXP >= builderLevel.minXP : false;

        return (
            <div className="space-y-6">
                <div className="text-center">
                    <h3 className="text-3xl font-bold text-gray-800">Mon Parcours</h3>
                    <p className="text-sm text-gray-500 mt-1">L'historique de votre cheminement sur HUMĀN.</p>
                </div>

                <div className={`p-4 rounded-lg shadow-md flex items-center justify-between transition-all ${canAccessSummary ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    <div className="flex items-center">
                        <SparklesIcon className="w-8 h-8 mr-4 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold">Synthèse de Parcours</h4>
                            <p className="text-xs">Recevez une analyse poétique de votre cheminement, générée par votre Guide HUMĀN.</p>
                            {!canAccessSummary && <p className="text-xs font-semibold mt-1">(Débloqué au niveau Builder)</p>}
                        </div>
                    </div>
                    <button onClick={handleGenerateSummary} disabled={!canAccessSummary} className="p-2 rounded-full bg-white/20 hover:bg-white/30 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex-shrink-0">
                        <DocumentDownloadIcon className={`w-6 h-6 ${canAccessSummary ? 'text-white' : 'text-gray-500'}`} />
                    </button>
                </div>

                <div className="mt-8">
                    <h4 className="text-xl font-bold text-gray-800 mb-3 px-4 sm:px-0">Vidéos Explicatives</h4>
                    <div className="flex space-x-4 overflow-x-auto pb-4 -mb-4 scrollbar-hide px-4 sm:px-0 -mx-4 sm:-mx-0">
                        <div className="flex-shrink-0 w-2 sm:w-0"></div>
                        {/* Video Card 1 */}
                        <div className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden">
                            <video
                                src="https://videos.pexels.com/video-files/3209828/3209828-sd_640_360_24fps.mp4"
                                controls
                                poster="https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=400"
                                className="w-full h-32 object-cover bg-gray-200"
                                preload="metadata"
                            />
                            <div className="p-3">
                                <h5 className="font-semibold text-sm text-gray-700">C'est quoi un Atelier ?</h5>
                            </div>
                        </div>
                        {/* Video Card 2 */}
                        <div className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden">
                            <video
                                src="https://videos.pexels.com/video-files/2882194/2882194-sd_640_360_25fps.mp4"
                                controls
                                poster="https://images.pexels.com/photos/326462/pexels-photo-326462.jpeg?auto=compress&cs=tinysrgb&w=400"
                                className="w-full h-32 object-cover bg-gray-200"
                                preload="metadata"
                            />
                            <div className="p-3">
                                <h5 className="font-semibold text-sm text-gray-700">Comprendre les XP</h5>
                            </div>
                        </div>
                        <div className="flex-shrink-0 w-2 sm:w-0"></div>
                    </div>
                    <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
                </div>
                
                <div className="bg-white p-1 rounded-lg shadow-sm border flex mt-8">
                    <button
                        onClick={() => setActiveTab('ateliers')}
                        className={`flex-1 text-center py-2 rounded-md text-sm font-semibold transition-colors flex items-center justify-center ${activeTab === 'ateliers' ? 'bg-white shadow text-orange-600' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <ArchiveIcon className="w-5 h-5 inline-block mr-2" />
                        Ateliers vécus
                    </button>
                    <button
                        onClick={() => setActiveTab('echos')}
                        className={`flex-1 text-center py-2 rounded-md text-sm font-semibold transition-colors flex items-center justify-center ${activeTab === 'echos' ? 'bg-white shadow text-orange-600' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <EchosIcon className="w-5 h-5 inline-block mr-2" />
                        Mes Échos
                    </button>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border min-h-[150px]">
                    {activeTab === 'ateliers' ? (
                        pastWorkshops.length > 0 ? (
                            <div className="space-y-2">
                                {pastWorkshops.map(ws => (
                                    <div key={ws.id} className="text-sm p-3 bg-gray-50 rounded-md border flex justify-between items-center">
                                        <span>{ws.title}</span>
                                        <span className="text-xs text-green-600 font-semibold">+{ws.xpGainedByUser || 0} XP</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 pt-8">Aucun atelier terminé pour le moment.</p>
                        )
                    ) : (
                        echos.length > 0 ? (
                            <div className="space-y-2">
                                {echos.map(e => (
                                    <div key={e.id} className="text-sm p-3 bg-gray-50 rounded-md border truncate">
                                        Réflexion du {new Date(e.date).toLocaleDateString('fr-FR')}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 pt-8">Aucun écho écrit pour le moment.</p>
                        )
                    )}
                </div>
            </div>
        );
      case 'parametres': {
            const Toggle: React.FC<{ label: string; description: string; }> = ({ label, description }) => (
                <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                    <div>
                        <p className="font-medium text-gray-800">{label}</p>
                        <p className="text-xs text-gray-500">{description}</p>
                    </div>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in bg-gray-300 rounded-full cursor-not-allowed">
                        <input type="checkbox" disabled className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-not-allowed" />
                        <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-not-allowed"></label>
                    </div>
                </div>
            );
        
            return (
                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200/80">
                        <h4 className="text-lg font-bold text-gray-800 mb-4">Mes Informations</h4>
                        <form onSubmit={handleSavePersonalInfo} className="space-y-4">
                            <div>
                                <label htmlFor="firstName" className="form-label">Prénom</label>
                                <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleFormChange} className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="gender" className="form-label">Genre</label>
                                <select id="gender" name="gender" value={formData.gender} onChange={handleFormChange} className="form-select">
                                    {GENDER_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="ageRange" className="form-label">Tranche d'âge</label>
                                <select id="ageRange" name="ageRange" value={formData.ageRange} onChange={handleFormChange} className="form-select">
                                     {Object.values(AgeRanges).map(value => <option key={value} value={value}>{value.includes('+') ? `${value} ans` : value}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="location" className="form-label">Ville & Pays</label>
                                <input id="location" name="location" type="text" value={formData.location} onChange={handleFormChange} className="form-input" />
                            </div>
                            <div className="text-right pt-2">
                                <StyledButton type="submit">Enregistrer les modifications</StyledButton>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200/80">
                        <h4 className="text-lg font-bold text-gray-800 mb-2">Notifications</h4>
                        <p className="text-sm text-gray-500 mb-4">La gestion des notifications push sera bientôt disponible.</p>
                        <Toggle label="Rappels d'ateliers" description="Recevoir une alerte avant le début d'un atelier auquel vous êtes inscrit." />
                        <Toggle label="Nouveaux messages" description="Être notifié d'un nouveau message privé." />
                        <Toggle label="Résonances" description="Savoir quand vos 'Échos' résonnent avec d'autres." />
                    </div>

                    <div className="bg-red-50 p-6 rounded-xl border-2 border-dashed border-red-300">
                        <h4 className="text-lg font-bold text-red-800 mb-2">Zone de Danger</h4>
                        <p className="text-sm text-red-700 mb-4">Attention, les actions dans cette section sont irréversibles.</p>
                        <StyledButton variant="danger" onClick={onResetProgression}>
                            <TrashIcon className="w-5 h-5 mr-2" />
                            Réinitialiser ma progression
                        </StyledButton>
                        <p className="text-xs text-red-600 mt-2">Ceci supprimera votre profil, vos XP, vos ateliers et toutes vos données de l'application.</p>
                    </div>
                </div>
            );
        }
      case 'sonneries':
        return (
          <div>
            <div className="flex items-center mb-4 bg-white p-4 rounded-lg shadow-sm border">
              <AudioIcon className="w-8 h-8 text-indigo-500 mr-4" />
              <h3 className="text-2xl font-bold text-gray-800">Sonneries & Alertes</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200/80 mt-6">
              <p className="text-center text-gray-500">La personnalisation des sons de notification sera disponible prochainement.</p>
            </div>
          </div>
        );
      case 'a-propos':
        return (
            <div className="space-y-6">
                 <div className="text-center">
                    <h3 className="text-3xl font-bold text-gray-800">À propos de HUMĀN</h3>
                    <p className="text-sm text-gray-500 mt-1">Notre philosophie, nos valeurs.</p>
                </div>
                 <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200/80">
                    <Section title="Les 2 piliers de HUMĀN">
                        {piliers.map(item => <InfoItem key={item.title} {...item} />)}
                    </Section>
                 </div>
                 <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200/80">
                    <Section title="Les 5 clés de l'expérience">
                       {cles.map(item => <InfoItem key={item.title} {...item} />)}
                    </Section>
                </div>
            </div>
        );
      case 'aide-support':
        return (
             <div>
                 <div className="flex items-center mb-4 bg-white p-4 rounded-lg shadow-sm border">
                    <QuestionMarkCircleIcon className="w-8 h-8 text-sky-500 mr-4" />
                    <h3 className="text-2xl font-bold text-gray-800">Aide & Support</h3>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200/80 mt-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-4">Besoin de parler à quelqu'un ?</h4>
                    <p className="text-sm text-gray-600 mb-4">Si vous avez une question sur l'application, un problème technique ou simplement besoin d'un conseil, notre guide IA Humānia est là pour vous aider.</p>
                    <StyledButton onClick={() => navigate('/support-chat')} variant="primary">
                        Discuter avec Humānia
                    </StyledButton>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200/80 mt-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-4">Questions Fréquentes</h4>
                    <div className="space-y-2">
                        {faqData.map(faq => <AccordionItem key={faq.question} title={faq.question}>{faq.answer}</AccordionItem>)}
                    </div>
                </div>
            </div>
        );
      case 'confidentialite':
        return (
            <div>
                <div className="flex items-center mb-4 bg-white p-4 rounded-lg shadow-sm border">
                    <ShieldCheckIcon className="w-8 h-8 text-green-600 mr-4" />
                    <h3 className="text-2xl font-bold text-gray-800">Confidentialité</h3>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200/80 mt-6 prose prose-sm max-w-none text-gray-600">
                    <p>Votre confiance est notre priorité. Voici nos engagements :</p>
                    <ul>
                        <li><strong>Anonymat dans les ateliers :</strong> Vos interactions se font avec des IA bienveillantes, garantissant un espace sûr sans jugement d'autres utilisateurs.</li>
                        <li><strong>Données locales :</strong> La majorité de vos données (profil, échos, progression) sont stockées localement sur votre appareil.</li>
                        <li><strong>Pas de vente de données :</strong> Nous ne vendrons ni ne partagerons jamais vos données personnelles à des tiers.</li>
                        <li><strong>Transparence :</strong> Nous utilisons l'API de Google Gemini pour les fonctionnalités d'IA. Leurs politiques de confidentialité s'appliquent à ces interactions.</li>
                    </ul>
                    <p>Pour toute question, contactez-nous à <a href="mailto:hey@join-human.fr">hey@join-human.fr</a>.</p>
                </div>
            </div>
        );
      default:
        return (
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Section non trouvée</h3>
            <p className="text-gray-500 mt-2">La section que vous cherchez n'existe pas.</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-full">
      <div className="sticky top-20 z-20 bg-gray-50/80 backdrop-blur-md">
        <div className="p-4 sm:p-6 flex items-center">
          <button onClick={() => navigate('/moi')} className="p-2 mr-2 -ml-2 rounded-full hover:bg-gray-200 transition-colors">
            <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
      <div className="p-4 sm:p-6 pt-0">
        {renderSectionContent()}
      </div>
      {isSummaryModalOpen && (
        <UserJourneySummaryModal
          isOpen={isSummaryModalOpen}
          onClose={() => setIsSummaryModalOpen(false)}
          summary={journeySummary}
        />
      )}
      {isBioModalOpen && (
        <div
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-[700]"
            onClick={() => setIsBioModalOpen(false)}
            role="dialog" aria-modal="true" aria-labelledby="bio-modal-title"
        >
            <div
                className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg mx-auto flex flex-col animate-modalShow"
                onClick={(e) => e.stopPropagation()}
                style={{ animationName: 'modalShowAnim', animationDuration: '0.3s', animationFillMode: 'forwards', maxHeight: 'calc(100vh - 4rem)' }}
            >
                <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                    <h2 id="bio-modal-title" className="text-xl font-bold text-gray-800">Votre Bio Personnalisée</h2>
                    <button onClick={() => setIsBioModalOpen(false)} className="p-1 rounded-full text-gray-400 hover:bg-gray-100"><XIcon className="w-5 h-5" /></button>
                </div>

                <div className="p-6 flex-grow overflow-y-auto">
                    <p className="text-sm text-gray-600 mb-4">Voici une bio générée à partir de votre Territoire. Vous pouvez la modifier directement ou demander d'autres suggestions.</p>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 min-h-[150px]">
                        {isGenerating ? (
                            <div className="flex items-center justify-center h-full"><LoadingSpinner /></div>
                        ) : bioError ? (
                            <p className="text-sm text-red-600">{bioError}</p>
                        ) : (
                            <textarea
                                className="form-textarea w-full text-sm text-gray-700"
                                rows={5}
                                value={generatedBio}
                                onChange={(e) => setGeneratedBio(e.target.value)}
                                placeholder="Votre bio apparaîtra ici..."
                            />
                        )}
                    </div>

                    <div className="mt-4">
                        <StyledButton
                            type="button"
                            onClick={handleGetSuggestions}
                            variant="outline"
                            size="sm"
                            disabled={isGeneratingSuggestions || isGenerating}
                        >
                            <SparklesIcon className="w-4 h-4 mr-2" />
                            {isGeneratingSuggestions ? 'Génération en cours...' : 'Obtenir des suggestions'}
                        </StyledButton>

                        {isGeneratingSuggestions && <div className="py-4"><LoadingSpinner /></div>}

                        {suggestionError && <p className="text-xs text-red-500 mt-2">{suggestionError}</p>}
                        
                        {suggestions.length > 0 && (
                            <div className="mt-3 space-y-2">
                                <p className="text-xs font-semibold text-gray-500">Choisissez une suggestion pour commencer :</p>
                                {suggestions.map((s, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setGeneratedBio(s)}
                                        className="w-full text-left p-3 text-xs text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-orange-50 hover:border-orange-300 transition-colors"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl flex justify-end space-x-3">
                    <StyledButton onClick={() => setIsBioModalOpen(false)} variant="secondary">Annuler</StyledButton>
                    <StyledButton onClick={handleSaveAndClose} variant="primary">Enregistrer cette bio</StyledButton>
                </div>
            </div>
            <style>{`
                @keyframes modalShowAnim { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
                .animate-modalShow { animation: modalShowAnim 0.3s ease-out forwards; }
            `}</style>
        </div>
      )}
    </div>
  );
};
export default MeSectionDetail;