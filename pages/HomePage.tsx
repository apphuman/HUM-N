
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import BadgeDisplay from '../components/BadgeDisplay';
import { Badge, UserProfile, IconProps } from '../types';
import { APP_NAME, SLOGAN, XP_LEVELS, getLevelFromXP, MOCK_AUDIO_SUGGESTION } from '../constants';
import StyledButton from '../components/StyledButton';
import { AudioIcon } from '../components/icons/AudioIcon';
import { UserIcon } from '../components/icons/UserIcon';
import { WorkshopsIcon } from '../components/icons/WorkshopsIcon';
import { ChatBubbleLeftRightIcon } from '../components/icons/ChatBubbleLeftRightIcon';
import { EchosIcon } from '../components/icons/EchosIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { ChevronUpIcon } from '../components/icons/ChevronUpIcon';

interface AppFeature {
  id: string;
  IconComponent: React.FC<IconProps>;
  title: string;
  shortDescription: string;
  detailedDescription: string;
}

const appFeatures: AppFeature[] = [
  {
    id: 'onboarding',
    IconComponent: UserIcon,
    title: "1. Inscription & Profil Personnalisé",
    shortDescription: "Rejoignez HUMĀN et créez un profil qui vous ressemble pour une expérience sur mesure.",
    detailedDescription: "Votre parcours commence par une inscription simple où vous partagez quelques informations sur vous. Cela nous aide à vous proposer des ateliers et des contenus qui résonnent réellement avec vos aspirations et votre état d'esprit actuel."
  },
  {
    id: 'workshops',
    IconComponent: WorkshopsIcon,
    title: "2. Ateliers Virtuels (et bientôt physiques)",
    shortDescription: "Participez à des ateliers thématiques, partagez vos expériences et gagnez des XP.",
    detailedDescription: "Choisissez parmi une variété d'ateliers virtuels conçus pour l'introspection et le partage. Chaque participation vous permet d'échanger avec d'autres (simulés par IA pour l'instant), d'apprécier la richesse des perspectives et de gagner des points d'expérience (XP). Des rencontres physiques pourront être envisagées dans le futur."
  },
  {
    id: 'xpAndChat',
    IconComponent: ChatBubbleLeftRightIcon,
    title: "3. XP Mutuels & Conversations Privées",
    shortDescription: "Donnez des XP, atteignez des niveaux d'affinité et débloquez des discussions privées.",
    detailedDescription: "Au sein des ateliers, vous pouvez reconnaître la valeur des partages en attribuant des XP. En accumulant des XP mutuels avec certains membres (simulés), vous pourrez débloquer la possibilité d'engager des conversations privées, créant ainsi des liens plus profonds."
  },
  {
    id: 'dailyCheckin',
    IconComponent: EchosIcon,
    title: "4. Introspection Quotidienne Guidée",
    shortDescription: "L'application vous accompagne chaque jour pour un check-in émotionnel.",
    detailedDescription: "HUMĀN est plus qu'une plateforme d'ateliers. Chaque jour, l'application vous invite à un court check-in pour prendre le pouls de votre météo intérieure. Vos réponses aident à ajuster les suggestions et à suivre votre évolution émotionnelle."
  }
];

const FeatureCard: React.FC<{feature: AppFeature; isExpanded: boolean; onToggle: () => void;}> = ({ feature, isExpanded, onToggle }) => {
  return (
    <div className="bg-[var(--card-background-color)] rounded-[var(--border-radius-lg)] shadow-[var(--shadow-md)] border border-[var(--border-color)] overflow-hidden">
      <button
        className="w-full p-4 sm:p-5 text-left flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] rounded-t-[var(--border-radius-lg)] hover:bg-[var(--secondary-color)]/30 transition-colors"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`feature-details-${feature.id}`}
      >
        <div className="flex items-center">
          <feature.IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--primary-color)] mr-3 sm:mr-4 flex-shrink-0" />
          <div>
            <h4 className="text-md sm:text-lg font-semibold text-[var(--text-color-dark)]">{feature.title}</h4>
            {!isExpanded && <p className="text-xs sm:text-sm text-[var(--text-color-light)] mt-1">{feature.shortDescription}</p>}
          </div>
        </div>
        {isExpanded ? <ChevronUpIcon className="w-5 h-5 text-[var(--text-color-lighter)] ml-2 flex-shrink-0" /> : <ChevronDownIcon className="w-5 h-5 text-[var(--text-color-lighter)] ml-2 flex-shrink-0" />}
      </button>
      {isExpanded && (
        <div id={`feature-details-${feature.id}`} className="p-4 sm:p-5 border-t border-[var(--border-color)] bg-[var(--background-color)]/50">
           <p className="text-sm text-[var(--text-color-light)] mb-2 leading-relaxed">{feature.shortDescription}</p>
          <p className="text-sm text-[var(--text-color-light)] leading-relaxed">{feature.detailedDescription}</p>
        </div>
      )}
    </div>
  );
};


const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [userXP] = useState(0); 
  const currentUserLevel = getLevelFromXP(userXP);
  const [expandedFeatureId, setExpandedFeatureId] = useState<string | null>(null);
  
  const lastUnlockedBadge: Badge | null = userXP > 10 ? { id: 'b_welcome', name: 'Bienvenue Humain', icon: '🌟', description: 'Vous avez rejoint la communauté !' } : null;

  const handleGoToEchosAudio = () => {
    navigate('/echos', { state: { initialTab: 'capsulesaudio' } });
  };
  
  const toggleFeatureCard = (id: string) => {
    setExpandedFeatureId(prevId => (prevId === id ? null : id));
  };


  return (
    <PageContainer> {/* Removed title prop for default "Bienvenue..." */}
      <div className="relative aspect-[16/7] rounded-[var(--border-radius-lg)] overflow-hidden mb-8 bg-[var(--secondary-color)] shadow-[var(--shadow-lg)]">
        <img 
          src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=600&h=263&dpr=1"
          alt="Illustration de la communauté HUMĀN" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex flex-col items-center justify-end p-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{APP_NAME}</h1>
            <p className="text-md sm:text-lg font-semibold text-white">
            Niveau {currentUserLevel.name} – <span className="font-normal">{userXP} XP</span>
            </p>
            <p className="mt-1 text-sm text-gray-100 italic">{SLOGAN}</p>
        </div>
      </div>

      <section className="mb-8 sm:mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-color-dark)] mb-3 sm:mb-4 text-center">Comment HUMĀN vous accompagne ?</h2>
        <p className="text-sm sm:text-md text-[var(--text-color-light)] mb-5 sm:mb-6 text-center max-w-xl mx-auto">
          Découvrez les étapes clés de votre voyage introspectif et relationnel au sein de notre communauté.
        </p>
        <div className="space-y-4">
          {appFeatures.map(feature => (
            <FeatureCard 
              key={feature.id} 
              feature={feature} 
              isExpanded={expandedFeatureId === feature.id} 
              onToggle={() => toggleFeatureCard(feature.id)} 
            />
          ))}
        </div>
      </section>
      
      <section className="mb-8 text-center">
        <h3 className="text-lg font-semibold mb-2 text-[var(--text-color-dark)]">Prêt à commencer ?</h3>
        <p className="text-[var(--text-color-light)] mb-4 max-w-md mx-auto">
          Votre chemin personnel est unique. Explorez, partagez, grandissez.
        </p>
        <NavLink to="/">
            <StyledButton variant="primary" size="md">Explorer Mon Parcours</StyledButton>
        </NavLink>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {lastUnlockedBadge && (
          <section>
            <h3 className="text-lg font-semibold mb-3 text-[var(--text-color-dark)]">Dernier Badge Débloqué</h3>
            <div className="bg-[var(--card-background-color)] p-4 rounded-[var(--border-radius-lg)] shadow-[var(--shadow-md)] border border-[var(--border-color)]">
                <BadgeDisplay badges={[lastUnlockedBadge]} />
            </div>
          </section>
        )}

        <section>
          <h3 className="text-lg font-semibold mb-3 text-[var(--text-color-dark)]">Suggestion d'Écoute</h3>
          <div className="bg-[var(--card-background-color)] p-5 rounded-[var(--border-radius-lg)] shadow-[var(--shadow-md)] border border-[var(--border-color)]">
            <div className="flex items-center mb-2">
              <AudioIcon className="w-7 h-7 text-[var(--primary-color)] mr-3"/>
              <h4 className="font-semibold text-[var(--text-color)]">{MOCK_AUDIO_SUGGESTION.title}</h4>
            </div>
            <p className="text-xs text-[var(--text-color-light)] mb-3">{MOCK_AUDIO_SUGGESTION.theme} - {MOCK_AUDIO_SUGGESTION.duration}</p>
            <StyledButton 
              variant="outline" 
              size="sm" 
              onClick={handleGoToEchosAudio}
            >
              Écouter (via Échos)
            </StyledButton>
          </div>
        </section>
      </div>

    </PageContainer>
  );
};

export default HomePage;
