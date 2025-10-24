import React, { useState, useRef } from 'react';
import StyledButton from '../components/StyledButton';
import { 
    OnboardingData, 
    AgeRange, AgeRanges, 
    SocialInteractionStyle, SocialInteractionStyleOptions, 
    UserProfile,
    DatingPreferences,
    DatingApproach, DatingApproachOptions,
    DatingAppFeeling, DatingAppFeelingOptions,
    DatingChallenge, DatingChallengeOptions,
    DatingGoal, DatingGoalOptions,
    DatingSelfPerception, DatingSelfPerceptionOptions
} from '../types';
import { HumanLogo, CheckIcon, WorkshopsIcon, TrendingUpIcon, EchosIcon, AffinitiesIcon, LightBulbIcon, CameraIcon, ArrowLeftIcon } from '../components/icons';
import { GENDER_OPTIONS, getGenderedStrings } from '../constants';
import Avatar from '../components/Avatar';

interface OnboardingPageProps {
  onOnboardingComplete: (profileData: OnboardingData) => void;
}

type ProfileType = 'pragmatique' | 'introverti' | 'sensible' | 'texte_libre' | null;

const intentOptions: Array<{ value: string; label: string; profileType: ProfileType }> = [
  { value: 'Rencontrer de nouvelles personnes', label: 'Rencontrer de nouvelles personnes', profileType: 'pragmatique' },
  { value: 'Prendre un temps pour moi', label: 'Prendre un temps pour moi', profileType: 'introverti' },
  { value: 'Explorer mes émotions', label: 'Explorer mes émotions', profileType: 'sensible' },
];

const interactionStyleOptions: Array<{ value: SocialInteractionStyle; label: string; description: string }> = [
  { value: SocialInteractionStyleOptions.OBSERVER_FIRST, label: 'J’aime prendre mon temps', description: 'Observer, ressentir avant de partager.' },
  { value: SocialInteractionStyleOptions.RESERVED_BUT_OPEN, label: 'J’aime trouver un équilibre', description: 'Écouter, mais aussi partager spontanément.' },
  { value: SocialInteractionStyleOptions.EXPRESSIVE_DIRECT_SHARER, label: 'J’aime plonger directement', description: 'Exprimer ce que je ressens sans filtre.' },
];

const ageRangeOptionsList: Array<{ value: AgeRange | ''; label: string; disabled?: boolean }> = [
  { value: '', label: '-- Choisis ta tranche d\'âge --', disabled: true },
  { value: AgeRanges.AGE_18_25, label: '18–25 ans' },
  { value: AgeRanges.AGE_26_35, label: '26–35 ans' },
  { value: AgeRanges.AGE_36_45, label: '36–45 ans' },
  { value: AgeRanges.AGE_46_55, label: '46–55 ans' },
  { value: AgeRanges.AGE_56_PLUS, label: '56 ans et +' },
];

const OnboardingPage: React.FC<OnboardingPageProps> = ({ onOnboardingComplete }) => {
  const [step, setStep] = useState(0);
  const [profileType, setProfileType] = useState<ProfileType>(null);
  
  // Form data
  const [firstName, setFirstName] = useState('');
  const [onboardingIntentText, setOnboardingIntentText] = useState('');
  const [selectedIntents, setSelectedIntents] = useState<string[]>([]);
  const [showIntentText, setShowIntentText] = useState(false);
  const [gender, setGender] = useState<UserProfile['gender'] | ''>('');
  const [ageRange, setAgeRange] = useState<AgeRange | ''>('');
  const [location, setLocation] = useState('');
  const [preferNotToSayLocation, setPreferNotToSayLocation] = useState(false);
  const [socialInteractionStyle, setSocialInteractionStyle] = useState<SocialInteractionStyle | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | undefined>();

  // New state for dating questions
  const [datingStep, setDatingStep] = useState(0);
  const [datingApproach, setDatingApproach] = useState<DatingApproach | null>(null);
  const [datingAppFeeling, setDatingAppFeeling] = useState<DatingAppFeeling | null>(null);
  const [datingChallenge, setDatingChallenge] = useState<DatingChallenge | null>(null);
  const [datingGoal, setDatingGoal] = useState<DatingGoal | null>(null);
  const [datingSelfPerception, setDatingSelfPerception] = useState<DatingSelfPerception | null>(null);


  const [isExiting, setIsExiting] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSteps = 12;
  const gendered = getGenderedStrings(gender || 'prefer_not_to_say');

  const changeStep = (nextStep: number) => {
    setIsExiting(true);
    setTimeout(() => {
      setStep(nextStep);
      setIsExiting(false);
      contentRef.current?.scrollTo(0, 0);
    }, 300);
  };

  const handleIntentSubmit = () => {
    let finalIntent = '';
    let finalProfileType: ProfileType = 'sensible'; // Default

    if (selectedIntents.includes('Autre...')) {
        if (!onboardingIntentText.trim()) return;
        finalIntent = onboardingIntentText.trim();
        finalProfileType = 'texte_libre';
    } else {
        if (selectedIntents.length === 0) return;
        finalIntent = selectedIntents.join(', ');
        // Determine profile type from multiple selections.
        // Prioritize: sensible > pragmatique > introverti
        if (selectedIntents.includes('Explorer mes émotions')) {
            finalProfileType = 'sensible';
        } else if (selectedIntents.includes('Rencontrer de nouvelles personnes')) {
            finalProfileType = 'pragmatique';
        } else if (selectedIntents.includes('Prendre un temps pour moi')) {
            finalProfileType = 'introverti';
        }
    }
    
    setOnboardingIntentText(finalIntent);
    setProfileType(finalProfileType);
    changeStep(step + 1);
  };
  
  const handleFinalSubmit = () => {
    if (!firstName.trim() || !gender || !ageRange || (!location.trim() && !preferNotToSayLocation) || !socialInteractionStyle || !datingApproach || !datingAppFeeling || !datingChallenge || !datingGoal || !datingSelfPerception) {
      alert("Merci de remplir tous les champs.");
      return;
    }
    
    const datingPreferences: DatingPreferences = {
      approach: datingApproach,
      appFeeling: datingAppFeeling,
      challenge: datingChallenge,
      goal: datingGoal,
      selfPerception: datingSelfPerception,
    };

    onOnboardingComplete({
      firstName, gender, ageRange, socialInteractionStyle,
      location: preferNotToSayLocation ? 'Non spécifié' : location,
      onboardingIntentText,
      datingPreferences,
      profilePicture,
    });
  };

  const getMirrorMessage = () => {
    switch (profileType) {
        case 'pragmatique': return "Merci. Je sens une envie d'aller de l'avant, de connecter.";
        case 'introverti': return "Merci pour ce partage. Je ressens ton besoin de calme et d'espace pour toi.";
        case 'sensible': return "Merci. Je sens une belle ouverture, une envie d'explorer en profondeur.";
        case 'texte_libre': return "Merci pour tes mots. C'est un excellent point de départ.";
        default: return "Merci pour ce partage.";
    }
  };
  
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setProfilePicture(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const renderStep = () => {
    const animationClass = isExiting ? 'animate-fadeOut' : 'animate-fadeIn';

    const handleIntentToggle = (intentValue: string) => {
        const isOther = intentValue === 'Autre...';
        if (isOther) {
            // If 'Autre...' is selected, it's exclusive.
            setSelectedIntents(['Autre...']);
            setShowIntentText(true);
        } else {
            // If another option is selected, deselect 'Autre...' and clear text if needed
            const newIntents = selectedIntents.filter(i => i !== 'Autre...');
            if (showIntentText) {
                setShowIntentText(false);
                setOnboardingIntentText('');
            }
    
            if (newIntents.includes(intentValue)) {
                // deselect if already selected
                setSelectedIntents(newIntents.filter(i => i !== intentValue));
            } else {
                // select
                setSelectedIntents([...newIntents, intentValue]);
            }
        }
    };
    
    const BackButton = () => (
      <div className="text-center">
        <button onClick={() => changeStep(step - 1)} className="mt-3 text-sm text-gray-500 hover:text-gray-700">
          Retour
        </button>
      </div>
    );

    switch (step) {
      case 0:
        return (
          <div key={step} className={`p-8 flex flex-col items-center justify-center text-center h-full ${animationClass}`}>
            <HumanLogo className="text-5xl mb-6" />
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Bienvenue sur HUMĀN.</h1>
            <p className="text-gray-600 leading-relaxed max-w-sm mb-8">L'espace pour être, sans paraître.</p>
            <StyledButton size="lg" onClick={() => changeStep(1)}>Commencer mon parcours</StyledButton>
          </div>
        );

      case 1: // NEW - How it works Intro
        return (
          <div key={step} className={`p-8 flex flex-col items-center justify-center text-center h-full ${animationClass}`}>
            <LightBulbIcon className="w-16 h-16 text-amber-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Comment ça marche ?</h2>
            <p className="text-gray-600 leading-relaxed max-w-sm mb-8">HUMĀN est un parcours en quelques étapes simples pour t'aider à mieux te connaître et à créer des liens authentiques.</p>
            <div className="w-full max-w-xs">
              <StyledButton size="lg" onClick={() => changeStep(2)} fullWidth>Découvrir</StyledButton>
              <BackButton />
            </div>
          </div>
        );

      case 2: // NEW - Ateliers
        return (
          <div key={step} className={`p-8 flex flex-col items-center justify-center text-center h-full ${animationClass}`}>
            <WorkshopsIcon className="w-16 h-16 text-orange-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-3">1. Les Ateliers</h2>
            <p className="text-gray-600 leading-relaxed max-w-sm mb-8">Partage tes expériences dans des cercles de parole bienveillants, animés par des participantes et participants virtuels, pour explorer des thèmes qui te touchent.</p>
            <div className="w-full max-w-xs">
              <StyledButton size="lg" onClick={() => changeStep(3)} fullWidth>Suivant</StyledButton>
              <BackButton />
            </div>
          </div>
        );

      case 3: // NEW - XP & Progression
        return (
          <div key={step} className={`p-8 flex flex-col items-center justify-center text-center h-full ${animationClass}`}>
            <TrendingUpIcon className="w-16 h-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-3">2. Les XP & la Progression</h2>
            <p className="text-gray-600 leading-relaxed max-w-sm mb-8">Ton engagement est valorisé. Gagne des points d'expérience (XP), monte en niveau et débloque de nouvelles possibilités.</p>
            <div className="w-full max-w-xs">
              <StyledButton size="lg" onClick={() => changeStep(4)} fullWidth>Suivant</StyledButton>
              <BackButton />
            </div>
          </div>
        );

      case 4: // NEW - Échos & Affinités
        return (
          <div key={step} className={`p-8 flex flex-col items-center justify-center text-center h-full ${animationClass}`}>
            <div className="flex space-x-6">
                <EchosIcon className="w-16 h-16 text-blue-500 mb-4" />
                <AffinitiesIcon className="w-16 h-16 text-purple-500 mb-4" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">3. Échos & Affinités</h2>
            <p className="text-gray-600 leading-relaxed max-w-sm mb-8">Dépose tes pensées, découvre des résonances avec la communauté et crée des liens profonds avec des personnes qui te comprennent.</p>
            <div className="w-full max-w-xs">
              <StyledButton size="lg" onClick={() => changeStep(5)} fullWidth>Compris !</StyledButton>
              <BackButton />
            </div>
          </div>
        );

      case 5: // NEW - Ready?
        return (
          <div key={step} className={`p-8 flex flex-col items-center justify-center text-center h-full ${animationClass}`}>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Prêt·e à commencer ?</h2>
            <p className="text-gray-600 leading-relaxed max-w-sm mb-8">Maintenant, quelques questions pour personnaliser ton parcours. Il n'y a pas de bonnes ou de mauvaises réponses.</p>
            <div className="w-full max-w-xs">
              <StyledButton size="lg" onClick={() => changeStep(6)} fullWidth>C'est parti</StyledButton>
              <BackButton />
            </div>
          </div>
        );

      case 6: // Was 1
        return (
          <div key={step} className={`p-6 ${animationClass}`}>
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">Pour commencer, comment puis-je t’appeler ?</h2>
            <div className="max-w-xs mx-auto">
              <input autoFocus type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="form-input text-center text-lg" placeholder="Ton prénom" />
              <StyledButton fullWidth onClick={() => changeStep(7)} disabled={!firstName.trim()} className="mt-4">Continuer</StyledButton>
              <BackButton />
            </div>
          </div>
        );

      case 7: // Was 2
        return (
          <div key={step} className={`p-6 ${animationClass}`}>
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Ravi de te rencontrer, {firstName}.</h2>
            <p className="text-sm text-center text-gray-500 mb-6">Qu'est-ce qui t'amène ici aujourd'hui ? (Plusieurs choix possibles)</p>
            <div className="space-y-3">
              {[...intentOptions, { value: 'Autre...', label: 'Autre...', profileType: 'texte_libre' }].map(opt => {
                const isSelected = selectedIntents.includes(opt.value);
                return (
                  <button 
                    key={opt.value} 
                    onClick={() => handleIntentToggle(opt.value)}
                    className={`w-full text-left p-4 border-2 rounded-lg transition-all duration-200 flex items-center justify-between ${isSelected ? 'bg-orange-50 border-orange-400' : 'bg-white border-gray-200 hover:bg-orange-50 hover:border-orange-300'}`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center"><CheckIcon className="w-3 h-3 text-white" /></div>}
                  </button>
                );
              })}
            </div>
            {showIntentText && (
              <textarea
                className="form-textarea w-full mt-4" rows={2} placeholder="Tes mots..."
                value={onboardingIntentText} onChange={(e) => setOnboardingIntentText(e.target.value)}
              />
            )}
            <StyledButton fullWidth onClick={handleIntentSubmit} disabled={selectedIntents.length === 0 || (selectedIntents.includes('Autre...') && !onboardingIntentText.trim())} className="mt-6">
              Valider mon intention
            </StyledButton>
            <BackButton />
          </div>
        );

      case 8: // Was 3
        return (
          <div key={step} className={`p-8 flex flex-col items-center justify-center text-center h-full ${animationClass}`}>
            <p className="text-lg text-gray-600 leading-relaxed max-w-sm mb-6">{getMirrorMessage()}</p>
            <p className="text-xl font-bold text-green-600 bg-green-100/50 px-4 py-2 rounded-full">+10 XP Authenticité ✨</p>
            <div className="w-full max-w-xs mt-8">
              <StyledButton onClick={() => changeStep(9)} fullWidth>Continuer</StyledButton>
              <BackButton />
            </div>
          </div>
        );

      case 9: // Was 4
        return (
          <div key={step} className={`p-6 space-y-5 ${animationClass}`}>
            <h2 className="text-xl font-semibold text-center text-gray-800">Quelques informations sur toi</h2>
            <div className="flex flex-col items-center">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/png, image/jpeg, image/webp"
                />
                <label className="form-label text-center">Ta photo de profil (optionnel)</label>
                <button
                    type="button"
                    onClick={handleAvatarClick}
                    className="group relative w-24 h-24 mx-auto rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-400"
                >
                    <Avatar 
                        name={firstName} 
                        gender={gender || 'prefer_not_to_say'}
                        imageUrl={profilePicture}
                        className="w-full h-full"
                        isAI={false}
                    />
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <CameraIcon className="w-8 h-8 text-white" />
                    </div>
                </button>
            </div>
            <div>
              <label className="form-label">Ton genre</label>
              <select value={gender} onChange={e => setGender(e.target.value as UserProfile['gender'])} className="form-select">
                <option value="" disabled>-- Choisis --</option>
                {GENDER_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
             <div>
              <label className="form-label">Ta tranche d’âge</label>
              <select value={ageRange} onChange={e => setAgeRange(e.target.value as AgeRange)} className="form-select">
                 {ageRangeOptionsList.map(opt => <option key={opt.value} value={opt.value} disabled={opt.disabled}>{opt.label}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Où es-tu {gendered.base} ?</label>
              <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="form-input" placeholder="Ville ou pays" disabled={preferNotToSayLocation} />
              <div className="mt-3 flex items-center">
                <input type="checkbox" id="preferNotToSay" className="form-checkbox" checked={preferNotToSayLocation} onChange={e => { setPreferNotToSayLocation(e.target.checked); if(e.target.checked) setLocation(''); }} />
                <label htmlFor="preferNotToSay" className="ml-2 text-sm text-gray-600">Je préfère ne pas répondre</label>
              </div>
            </div>
            <StyledButton fullWidth onClick={() => changeStep(10)} disabled={!gender || !ageRange || (!location.trim() && !preferNotToSayLocation)}>Suivant</StyledButton>
            <BackButton />
          </div>
        );
      
      case 10: { // Was 5
        const datingQuestions = [
            { question: "Quel est ton état d'esprit actuel face aux rencontres ?", setter: setDatingApproach, options: [
                { value: DatingApproachOptions.ACTIVE_OPTIMISTIC, label: "En recherche active et optimiste" },
                { value: DatingApproachOptions.TAKING_BREAK, label: "Je fais une pause, besoin de me recentrer" },
                { value: DatingApproachOptions.OPEN_TO_OPPORTUNITIES, label: "Ouvert·e si une belle rencontre se présente" },
                { value: DatingApproachOptions.JADED_FRUSTRATED, label: "Un peu lassé·e ou frustré·e" },
            ]},
            { question: "Ta relation avec les applis de rencontre ?", setter: setDatingAppFeeling, options: [
                { value: DatingAppFeelingOptions.MAIN_TOOL, label: "C'est mon principal moyen de rencontrer" },
                { value: DatingAppFeelingOptions.EXHAUSTING, label: "J'y passe du temps, mais c'est épuisant" },
                { value: DatingAppFeelingOptions.NECESSARY_EVIL, label: "Un mal nécessaire, je préférerais autrement" },
                { value: DatingAppFeelingOptions.DONT_USE, label: "Je n'en utilise pas ou très peu" },
            ]},
            { question: "Le plus difficile pour toi dans les débuts ?", setter: setDatingChallenge, options: [
                { value: DatingChallengeOptions.STARTING_CONVO, label: "Engager la conversation et briser la glace" },
                { value: DatingChallengeOptions.BEING_MYSELF, label: "Me montrer tel·le que je suis vraiment" },
                { value: DatingChallengeOptions.ONLINE_TO_IRL, label: "Passer de l'échange en ligne à la rencontre" },
                { value: DatingChallengeOptions.KEEPING_INTEREST, label: "Maintenir une connexion intéressante" },
            ]},
            { question: "Au fond, que recherches-tu le plus ?", setter: setDatingGoal, options: [
                { value: DatingGoalOptions.DEEP_CONNECTION, label: "Une connexion authentique et profonde" },
                { value: DatingGoalOptions.LIGHT_FUN, label: "Quelque chose de léger et joyeux" },
                { value: DatingGoalOptions.FEEL_UNDERSTOOD, label: "Me sentir compris·e et accepté·e" },
                { value: DatingGoalOptions.UNSURE_EXPLORING, label: "Je ne suis pas encore sûr·e, j'explore" },
            ]},
            { question: "Comment te sens-tu avec toi-même dans ce processus ?", setter: setDatingSelfPerception, options: [
                { value: DatingSelfPerceptionOptions.CONFIDENT, label: "Confiant·e, je sais ce que je vaux" },
                { value: DatingSelfPerceptionOptions.OVERTHINKING, label: "Un peu en doute, j'ai tendance à trop réfléchir" },
                { value: DatingSelfPerceptionOptions.PLAYING_A_ROLE, label: "J'ai l'impression de devoir jouer un rôle" },
                { value: DatingSelfPerceptionOptions.HOPEFUL_GUARDED, label: "Plein·e d'espoir, mais un peu sur la défensive" },
            ]},
        ];

        const currentDatingQuestion = datingQuestions[datingStep];
        
        const handleDatingBack = () => {
            if (datingStep > 0) {
                setDatingStep(datingStep - 1);
            } else {
                changeStep(9); // Go back to personal info step
            }
        };

        return (
            <div key={`${step}-${datingStep}`} className={`p-6 ${animationClass}`}>
                 <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">Ton territoire amoureux</h2>
                 <p className="text-sm text-center text-gray-500 mb-6">Quelques questions pour mieux te comprendre.</p>
                 
                 <div className="w-full bg-gray-200 rounded-full h-1 mb-6">
                    <div className="bg-orange-500 h-1 rounded-full" style={{ width: `${((datingStep + 1) / datingQuestions.length) * 100}%`, transition: 'width 0.3s' }}></div>
                 </div>

                 <p className="font-medium text-center text-gray-700 mb-4">{currentDatingQuestion.question}</p>

                 <div className="space-y-3">
                    {currentDatingQuestion.options.map(opt => (
                        <button 
                            key={opt.value}
                            onClick={() => {
                                (currentDatingQuestion.setter as React.Dispatch<React.SetStateAction<any>>)(opt.value);
                                setTimeout(() => {
                                    if (datingStep < datingQuestions.length - 1) {
                                        setDatingStep(datingStep + 1);
                                    } else {
                                        changeStep(11);
                                    }
                                }, 250);
                            }}
                            className="w-full text-left p-4 border-2 rounded-lg transition-all duration-200 bg-white border-gray-200 hover:bg-orange-50 hover:border-orange-300"
                        >
                           {opt.label}
                        </button>
                    ))}
                 </div>
                 <div className="text-center mt-6">
                    <button onClick={handleDatingBack} className="text-sm text-gray-500 hover:text-gray-700">Retour</button>
                 </div>
            </div>
        )
      }

      case 11: // Was 6
        return (
          <div key={step} className={`p-6 ${animationClass}`}>
             <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">Comment aimes-tu interagir ?</h2>
             <div className="space-y-3">
                {interactionStyleOptions.map(opt => (
                    <button 
                        key={opt.value} 
                        onClick={() => { setSocialInteractionStyle(opt.value); changeStep(12); }}
                        className="w-full text-left p-4 border-2 rounded-lg transition-all duration-200 bg-white border-gray-200 hover:bg-orange-50 hover:border-orange-300"
                    >
                        <p className="font-semibold text-gray-800">{opt.label}</p>
                        <p className="text-sm text-gray-500">{opt.description}</p>
                    </button>
                ))}
            </div>
            <BackButton />
          </div>
        );

      case 12: // Was 7
         return (
          <div key={step} className={`text-center p-8 flex flex-col items-center justify-center h-full ${animationClass}`}>
             <p className="text-gray-600 leading-relaxed max-w-sm mb-8">
              {socialInteractionStyle && "Merci. Ton rythme t’appartient et il sera respecté ici. Tu verras aussi comment d’autres avancent différemment. C’est cette diversité qui fait la richesse de HUMĀN."}
            </p>
             <p className="text-lg font-semibold text-gray-800 leading-relaxed max-w-sm mb-8">Ton profil est prêt. Mais il n’est pas figé : il grandira avec toi. Bienvenue chez HUMĀN.</p>
             <div className="w-full max-w-xs">
                <StyledButton size="lg" onClick={handleFinalSubmit} variant="success" fullWidth>Accéder à HUMĀN</StyledButton>
                <BackButton />
             </div>
          </div>
        );

      default:
        return <div>Étape inconnue</div>;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div 
        className="w-full max-w-md bg-white shadow-2xl rounded-2xl flex flex-col transition-all duration-300"
        style={{ height: 'calc(100vh - 4rem)', minHeight: '500px', maxHeight: '700px' }}
      >
        <div className="p-4 border-b border-gray-200 text-center">
            <p className="text-xs font-medium text-orange-500">Étape {step + 1} / {totalSteps}</p>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                <div 
                    className="bg-orange-500 h-1.5 rounded-full transition-all duration-500" 
                    style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                ></div>
            </div>
        </div>
        <div className="flex-grow overflow-y-auto" ref={contentRef}>
            {renderStep()}
        </div>
      </div>
      <style>{`
        .animate-fadeIn { animation: fadeInAnimation 0.3s ease-in-out forwards; }
        .animate-fadeOut { animation: fadeOutAnimation 0.3s ease-in-out forwards; }
        @keyframes fadeInAnimation {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOutAnimation {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-15px); }
        }
      `}</style>
    </div>
  );
};

export default OnboardingPage;