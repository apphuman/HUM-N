import React, { useState, useEffect, useRef } from 'react';
import StyledButton from '../components/StyledButton';
import { 
    OnboardingData,
    AgeRange, AgeRanges,
    SocialInteractionStyle, SocialInteractionStyleOptions,
    UserProfile
} from '../types';
import { HumanLogo } from '../components/icons/HumanLogo';
import { GENDER_OPTIONS, getGenderedStrings } from '../constants';

interface OnboardingPageProps {
  onOnboardingComplete: (profileData: OnboardingData) => void;
}

type ProfileType = 'pragmatique' | 'introverti' | 'sensible' | 'indecis' | 'texte_libre' | null;

const intentOptions: Array<{ value: string; label: string, profileType: ProfileType }> = [
    { value: 'Rencontrer de nouvelles personnes', label: 'Rencontrer de nouvelles personnes', profileType: 'pragmatique' },
    { value: 'Prendre un temps pour moi', label: 'Prendre un temps pour moi', profileType: 'introverti' },
    { value: 'Explorer mes émotions / partager', label: 'Explorer mes émotions / partager', profileType: 'sensible' },
    { value: 'Je préfère commencer doucement', label: 'Je préfère commencer doucement', profileType: 'indecis' },
    { value: 'Laisser l’app me surprendre', label: 'Laisser l’app me surprendre', profileType: 'indecis' },
];

const interactionStyleOptions: Array<{ value: SocialInteractionStyle; label: string, description: string }> = [
    { value: SocialInteractionStyleOptions.OBSERVER_FIRST, label: 'J’aime prendre mon temps', description: 'Observer, ressentir avant de partager.' },
    { value: SocialInteractionStyleOptions.RESERVED_BUT_OPEN, label: 'J’aime trouver un équilibre', description: 'Écouter, mais aussi partager spontanément.' },
    { value: SocialInteractionStyleOptions.EXPRESSIVE_DIRECT_SHARER, label: 'J’aime plonger directement', description: 'Exprimer ce que je ressens sans filtre.' },
];

const ageRangeOptionsList: Array<{ value: AgeRange | ''; label: string, disabled?: boolean }> = [ 
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

  // Form data state
  const [onboardingIntentText, setOnboardingIntentText] = useState('');
  const [firstName, setFirstName] = useState('');
  const [gender, setGender] = useState<UserProfile['gender'] | ''>('');
  const [ageRange, setAgeRange] = useState<AgeRange | ''>('');
  const [location, setLocation] = useState('');
  const [socialInteractionStyle, setSocialInteractionStyle] = useState<SocialInteractionStyle | null>(null);

  const [isExiting, setIsExiting] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const totalSteps = 7;
  const gendered = getGenderedStrings(gender || 'prefer_not_to_say');

  const changeStep = (nextStep: number) => {
    setIsExiting(true);
    setTimeout(() => {
      setStep(nextStep);
      setIsExiting(false);
      if (contentRef.current) {
        contentRef.current.scrollTo(0, 0);
      }
    }, 300); // Match CSS transition duration
  };

  const handleIntentSelection = (intent: { value: string, profileType: ProfileType }) => {
    setOnboardingIntentText(intent.value);
    setProfileType(intent.profileType);
    changeStep(step + 1);
  };
  
  const handleIntentTextSubmit = () => {
    if (onboardingIntentText.trim()) {
        setProfileType('texte_libre');
        changeStep(step + 1);
    }
  };

  const getMirrorMessage = () => {
    switch (profileType) {
        case 'pragmatique': return "Merci. C'est noté. Je sens une envie d'aller de l'avant, de connecter.";
        case 'introverti': return "Merci pour ce partage. Je ressens ton besoin de calme et d'espace pour toi.";
        case 'sensible': return "Merci pour tes mots. Je sens une belle ouverture, une envie d'explorer en profondeur.";
        case 'indecis': return "Merci. Parfois, le plus grand pas est de ne pas savoir où l'on va. C'est ok.";
        default: return "Merci pour tes premiers mots.";
    }
  };
  
  const handleFinalSubmit = () => {
    // Basic validation
    if (!firstName.trim() || !gender || !ageRange || !location.trim() || !socialInteractionStyle) {
        alert("Merci de remplir tous les champs.");
        return;
    }
    onOnboardingComplete({
      firstName,
      gender,
      ageRange,
      location,
      onboardingIntentText,
      socialInteractionStyle
    });
  }

  const renderContent = () => {
    const animationClass = isExiting ? 'animate-fadeOut' : 'animate-fadeIn';

    switch (step) {
      case 0: // Step 1: Welcome
        return (
          <div key={step} className={`text-center p-8 flex flex-col items-center justify-center h-full ${animationClass}`}>
            <HumanLogo className="text-5xl mb-6" />
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Bonjour, je suis Humānia.</h1>
            <div className="text-gray-600 leading-relaxed max-w-sm mb-8 space-y-3">
                <p>Je suis là pour t’écouter, t’accompagner et refléter tes mots.</p>
                <p>Ici, tu n’as rien à prouver. Tu peux simplement être.</p>
                <p>Je marcherai avec toi, à ton rythme, tout le long de ton voyage dans HUMĀN.</p>
            </div>
            <StyledButton size="lg" onClick={() => changeStep(1)}>Commencer</StyledButton>
          </div>
        );

      case 1: // Step 2: Key Question
        return (
          <div key={step} className={`p-6 ${animationClass}`}>
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Qu’est-ce qui t’a donné envie de rejoindre HUMĀN aujourd’hui ?</h2>
            <p className="text-sm text-center text-gray-500 mb-6">Tu peux écrire un mot, une phrase… ou simplement choisir ci-dessous.</p>
            <textarea
              className="form-textarea w-full mb-4"
              rows={3}
              placeholder="Tes mots..."
              value={onboardingIntentText}
              onChange={(e) => setOnboardingIntentText(e.target.value)}
            />
            {onboardingIntentText.trim() && (
                 <StyledButton fullWidth onClick={handleIntentTextSubmit} className="mb-6">Continuer avec mon texte</StyledButton>
            )}
            <div className="space-y-3">
              {intentOptions.map(opt => (
                <button key={opt.value} onClick={() => handleIntentSelection(opt)} className="w-full text-left p-4 bg-white border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-300 transition-all duration-200">
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 2: // Step 3: Welcome Mirror
        return (
          <div key={step} className={`text-center p-8 flex flex-col items-center justify-center h-full ${animationClass}`}>
             <p className="text-gray-600 leading-relaxed max-w-sm mb-8">{getMirrorMessage()} Je prends un instant pour accueillir ce que tu viens de déposer.</p>
             <StyledButton onClick={() => changeStep(3)}>Continuer</StyledButton>
          </div>
        );

      case 3: // Step 4: Emotional Gift
         return (
          <div key={step} className={`text-center p-8 flex flex-col items-center justify-center h-full ${animationClass}`}>
            <div className="mb-6">
                <span className="text-5xl">✨</span>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed max-w-sm mb-4">Chaque mot compte. Merci d’avoir osé tes premiers pas ici.</p>
            <p className="text-xl font-bold text-green-500 bg-green-100/50 px-4 py-2 rounded-full">+10 XP Authenticité</p>
            <StyledButton onClick={() => changeStep(4)} className="mt-8">Allons plus loin</StyledButton>
          </div>
        );
        
      case 4: // Step 5: Practical Info
        return (
          <div key={step} className={`p-6 space-y-5 ${animationClass}`}>
            <h2 className="text-xl font-semibold text-center text-gray-800">Quelques informations pratiques</h2>
            <div>
              <label className="form-label">Comment veux-tu que je t’appelle ?</label>
              <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="form-input" placeholder="Ton prénom" />
            </div>
            <div>
              <label className="form-label">Veux-tu préciser ton genre ?</label>
              <select value={gender} onChange={e => setGender(e.target.value as UserProfile['gender'])} className="form-select">
                <option value="" disabled>-- Choisis --</option>
                {GENDER_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
             <div>
              <label className="form-label">Dans quelle tranche d’âge te reconnais-tu ?</label>
              <select value={ageRange} onChange={e => setAgeRange(e.target.value as AgeRange)} className="form-select">
                 {ageRangeOptionsList.map(opt => <option key={opt.value} value={opt.value} disabled={opt.disabled}>{opt.label}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Où es-tu {gendered.base} actuellement ?</label>
              <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="form-input" placeholder="Ville ou pays principal" />
            </div>
            <StyledButton fullWidth onClick={() => changeStep(5)}>Suivant</StyledButton>
          </div>
        );

      case 5: // Step 6: Relational Rhythm
        return (
          <div key={step} className={`p-6 ${animationClass}`}>
             <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Ton rythme relationnel</h2>
             <p className="text-sm text-center text-gray-500 mb-6">Chacun avance à son rythme. Il n’y a pas de bonne ou mauvaise façon, seulement la tienne. Pour mieux t’accompagner, j’aimerais savoir comment tu vis tes relations.</p>
             <div className="space-y-3">
                {interactionStyleOptions.map(opt => (
                    <button 
                        key={opt.value} 
                        onClick={() => { setSocialInteractionStyle(opt.value); changeStep(6); }}
                        className={`w-full text-left p-4 border rounded-lg transition-all duration-200 ${socialInteractionStyle === opt.value ? 'bg-orange-100 border-orange-400' : 'bg-white border-gray-200 hover:bg-orange-50'}`}
                    >
                        <p className="font-semibold text-gray-800">{opt.label}</p>
                        <p className="text-sm text-gray-500">{opt.description}</p>
                    </button>
                ))}
            </div>
          </div>
        );
        
      case 6: // Step 7: Closing
         return (
          <div key={step} className={`text-center p-8 flex flex-col items-center justify-center h-full ${animationClass}`}>
             <p className="text-gray-600 leading-relaxed max-w-sm mb-8">
              {socialInteractionStyle && "Merci. Ton rythme t’appartient et il sera respecté ici. Tu verras aussi comment d’autres avancent différemment. C’est cette diversité qui fait la richesse de HUMĀN."}
            </p>
             <p className="text-lg font-semibold text-gray-800 leading-relaxed max-w-sm mb-8">Ton profil est prêt. Mais il n’est pas figé : il grandira avec toi. Bienvenue chez HUMĀN.</p>
             <StyledButton size="lg" onClick={handleFinalSubmit} variant="success">Accéder à HUMĀN</StyledButton>
          </div>
        );

      default:
        return <div>Étape inconnue</div>;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div 
        className="w-full max-w-md bg-white shadow-2xl rounded-2xl flex flex-col transition-all duration-300"
        style={{ height: 'calc(100vh - 4rem)', minHeight: '500px', maxHeight: '700px' }}
      >
        <div className="p-4 border-b border-gray-200 text-center">
            <p className="text-xs font-medium text-orange-500">
                Étape {step + 1} sur {totalSteps}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                <div 
                    className="bg-orange-500 h-1.5 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                ></div>
            </div>
        </div>
        <div className="flex-grow overflow-y-auto" ref={contentRef}>
            {renderContent()}
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