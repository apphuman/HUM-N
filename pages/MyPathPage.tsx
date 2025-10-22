


import React, { useMemo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserProfile, WorkshopTheme, ActivityFeedItem, WorkshopCategoryKey, Aspiration, CurrentFeeling, UserDailySubmission, PrivateChatMessage, ParticipantProfileInfo } from '../types';
import { getLevelFromXP, getNextLevel, INTEREST_KEYWORD_MAP, ECHOS_SUBMISSIONS_STORAGE_KEY, XP_LEVELS, getGenderedStrings } from '../constants';
import Avatar from '../components/Avatar';
import { 
    ChatBubbleLeftRightIcon,
    UsersIcon,
    SparklesIcon,
    CheckCircleIcon,
    LightBulbIcon,
    CalendarIcon,
    ClockIcon,
    PencilSquareIcon,
    LockClosedIcon,
    CheckIcon
} from '../components/icons';
import StyledButton from '../components/StyledButton';
import { Badge } from '../components/Badge';

interface MyPathPageProps {
  userProfile: UserProfile | null;
  onUpdateXP?: (amount: number, mainType?: 'totalXP' | 'xpMiroir' | 'emotional', emotionalXPSubTypeKey?: string) => void;
  demoWorkshop: WorkshopTheme | null;
  dynamicUpcomingWorkshops: WorkshopTheme[];
  onMarkAffinityAsRead?: () => void;
  feedItems: ActivityFeedItem[];
  onOpenProfile: (participant: ParticipantProfileInfo) => void;
}

// Helper function for relative time
const timeSince = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 86400;
  if (interval > 1) return `${Math.floor(interval)}j`;
  interval = seconds / 3600;
  if (interval > 1) return `${Math.floor(interval)}h`;
  interval = seconds / 60;
  if (interval > 1) return `${Math.floor(interval)}m`;
  return `${Math.floor(seconds)}s`;
};

// Component for a single feed item
const ActivityFeedItemComponent: React.FC<{ item: ActivityFeedItem; onOpenProfile: (participant: ParticipantProfileInfo) => void; }> = ({ item, onOpenProfile }) => {
  const iconMap = {
    joined_workshop: { Icon: UsersIcon, color: 'text-blue-500', bg: 'bg-blue-100' },
    earned_xp: { Icon: SparklesIcon, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    completed_workshop: { Icon: CheckCircleIcon, color: 'text-green-500', bg: 'bg-green-100' },
  };

  const { Icon, color, bg } = iconMap[item.activityType];

  const renderText = () => {
    switch (item.activityType) {
      case 'joined_workshop':
        return (
          <>
            <strong>{item.userProfile.name}</strong> a rejoint l'atelier{' '}
            <strong>'{item.details.workshopTitle}'</strong>.
          </>
        );
      case 'earned_xp':
        return (
          <>
            <strong>{item.userProfile.name}</strong> a gagné +{item.details.xpAmount} XP en{' '}
            <strong>{item.details.xpType}</strong>.
          </>
        );
      case 'completed_workshop':
        return (
          <>
            <strong>{item.userProfile.name}</strong> a terminé l'atelier{' '}
            <strong>'{item.details.workshopTitle}'</strong> !
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-start space-x-3 py-2 border-b border-gray-100 last:border-b-0">
      <div className="relative">
        <Avatar
          onClick={() => onOpenProfile(item.userProfile)}
          name={item.userProfile.name}
          gender={item.userProfile.gender}
          imageUrl={item.userProfile.avatarUrl}
          isAI={true}
          size="md"
          className="w-10 h-10"
        />
        <div className={`absolute -bottom-1 -right-1 p-1 rounded-full ${bg} border-2 border-white`}>
          <Icon className={`w-4 h-4 ${color}`} />
        </div>
      </div>
      <div className="flex-grow pt-1">
        <p className="text-sm text-gray-700 leading-snug">{renderText()}</p>
      </div>
      <span className="text-xs text-gray-400 flex-shrink-0 pt-1.5">{timeSince(item.timestamp)}</span>
    </div>
  );
};

const FullWorkshopCard: React.FC<{ workshop: WorkshopTheme, userProfile: UserProfile }> = ({ workshop, userProfile }) => {
  const navigate = useNavigate();
  
  const isSubscribed = userProfile.subscribedWorkshopIds?.includes(workshop.id) || false;

  const requiredLevelDetails = workshop.requiredLevel ? XP_LEVELS.find(l => l.name === workshop.requiredLevel) : null;
  const canParticipateByLevel = requiredLevelDetails ? userProfile.totalXP >= requiredLevelDetails.minXP : true;
  const canAccessPremium = workshop.isPremium ? userProfile.isPremium : true;
  const canParticipate = canParticipateByLevel && canAccessPremium;
  
  const gendered = getGenderedStrings(userProfile.gender);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Disponible maintenant';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
  };
  
  const cardBaseClasses = "bg-white rounded-xl shadow-lg border border-gray-200/80 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full";

  return (
    <div className={cardBaseClasses}>
      <div className="relative">
        <img src={workshop.image || 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=400'} alt={`Thème ${workshop.title}`} className="w-full h-36 object-cover rounded-t-xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-2 left-4">
            <h3 className="text-lg font-bold text-white shadow-black/50 [text-shadow:_0_1px_3px_var(--tw-shadow-color)] line-clamp-2">{workshop.title}</h3>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-center gap-2 mb-3 text-xs">
            {requiredLevelDetails && <Badge className={`font-semibold ${canParticipateByLevel ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>{requiredLevelDetails.emoji} {workshop.requiredLevel}</Badge>}
            {workshop.isPremium && <Badge variant="premium">Premium</Badge>}
          </div>

        <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">{workshop.description}</p>
        
        <div className="text-xs text-gray-500 border-t pt-3 mt-auto space-y-1.5">
            <div className="flex items-center"><CalendarIcon className="w-4 h-4 mr-2 text-gray-400" /><span>{formatDate(workshop.date)} {workshop.date && workshop.time ? `à ${workshop.time}`: ''}</span></div>
            <div className="flex items-center"><ClockIcon className="w-4 h-4 mr-2 text-gray-400" /><span>Durée : {workshop.duration || '20 min'}</span></div>
            {workshop.type === 'cercle' && <div className="flex items-center"><UsersIcon className="w-4 h-4 mr-2 text-gray-400" /><span>{workshop.maxParticipants || 'N/A'} participants max.</span></div>}
        </div>

        <div className="mt-4">
            {canParticipate ? (
                isSubscribed ? (
                    <StyledButton onClick={() => navigate(`/atelier-lobby/${workshop.id}`)} fullWidth variant="success">
                        <CheckIcon className="w-4 h-4 mr-2" />
                        {gendered.inscrit} - Voir les détails
                    </StyledButton>
                ) : (
                    <StyledButton onClick={() => navigate(`/atelier-lobby/${workshop.id}`)} fullWidth variant="primary">
                        Découvrir et s'inscrire
                    </StyledButton>
                )
            ) : (
                <StyledButton 
                    fullWidth 
                    size="md" 
                    variant="secondary" 
                    onClick={() => !canAccessPremium ? navigate('/moi/boutique') : navigate(`/atelier-lobby/${workshop.id}`)}
                >
                    {!canAccessPremium ? (
                        <><LockClosedIcon className="w-4 h-4 mr-1.5" /> Devenir Premium</>
                    ) : (
                        `Niveau ${workshop.requiredLevel} requis`
                    )}
                </StyledButton>
            )}
             {!canParticipateByLevel && <p className="text-xs text-center text-red-600 mt-2">Niveau {workshop.requiredLevel} ({requiredLevelDetails?.minXP} XP) requis.</p>}
        </div>
      </div>
    </div>
  );
};

const WorkshopCarousel: React.FC<{ title: string; workshops: WorkshopTheme[], userProfile: UserProfile }> = ({ title, workshops, userProfile }) => {
    if (workshops.length === 0) return null;
    return (
        <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">{title}</h2>
            <div className="flex space-x-5 overflow-x-auto pb-4 -mb-4 scrollbar-hide">
                {workshops.map(ws => (
                    <div key={ws.id} className="flex-shrink-0 w-80">
                        <FullWorkshopCard workshop={ws} userProfile={userProfile} />
                    </div>
                ))}
            </div>
             <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
        </section>
    );
};

const ProgressionCard: React.FC<{ userProfile: UserProfile }> = ({ userProfile }) => {
  const { totalXP } = userProfile;
  const currentUserLevel = getLevelFromXP(totalXP);
  const nextLevelDetails = getNextLevel(currentUserLevel.name);
  const xpProgressPercentage = nextLevelDetails
    ? Math.max(0, Math.min(100, ((totalXP - currentUserLevel.minXP) / (nextLevelDetails.minXP - currentUserLevel.minXP)) * 100))
    : 100;

  return (
    <NavLink to="/moi" className="group block bg-white p-4 rounded-xl shadow-lg border border-gray-200/80 hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-center mb-2">
        <div>
          <p className="text-lg font-bold text-gray-800">{currentUserLevel.emoji} {currentUserLevel.name}</p>
        </div>
        <p className="text-2xl font-bold text-amber-500">{totalXP} XP</p>
      </div>
      {nextLevelDetails && (
        <>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-amber-500 h-2 rounded-full transition-all duration-300" style={{ width: `${xpProgressPercentage}%` }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-1.5 text-right">
            Encore {Math.max(0, nextLevelDetails.minXP - totalXP)} XP pour devenir {nextLevelDetails.name}.
          </p>
        </>
      )}
    </NavLink>
  );
};

const EchosPromptCard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate('/echos')}
      className="text-center py-4 cursor-pointer group"
    >
      <p className="font-semibold text-gray-700 group-hover:text-amber-600 group-hover:underline transition-colors duration-200">Comment te sens-tu aujourd’hui ?</p>
    </div>
  );
};


const InspirationCard: React.FC<{ userLevelName: string, gender: UserProfile['gender'] }> = ({ userLevelName, gender }) => {
  const genderedStrings = getGenderedStrings(gender);

  const genderedInspiration = (level: string) => {
    switch (level) {
      case "Seeker":
        return "Aujourd’hui, ose poser tes limites. Chaque 'non' à ce qui ne te convient pas est un 'oui' à toi-même.";
      case "Builder":
        return `Tu explores la confiance… et si tu t’offrais un moment pour toi ce soir, juste pour toi ?`;
      case "Engager":
        return "La vulnérabilité n'est pas une faiblesse, mais le courage d'être authentique. Continue sur cette voie.";
      case "Connector":
        return `Ton expérience est précieuse. Une parole, un geste de ta part peut éclairer le chemin d'un autre. Tu es une présence ${genderedStrings.inspirant}.`;
      case "HUMĀNISER":
        return `En étant simplement toi, tu inspires déjà les autres. N'oublie jamais la puissance de ta présence. Tu es ${genderedStrings.inspirant}.`;
      default:
        return "Chaque pas, même le plus petit, est une avancée sur ton chemin.";
    }
  };

  const message = genderedInspiration(userLevelName);

  return (
    <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4 rounded-xl shadow-lg border border-amber-200/50">
      <div className="flex items-start space-x-3">
        <div className="bg-white p-1.5 rounded-full mt-1 shadow-sm">
            <LightBulbIcon className="w-6 h-6 text-amber-500" />
        </div>
        <div>
          <h3 className="font-semibold text-amber-800">Un mot pour toi</h3>
          <p className="text-sm text-gray-600 italic mt-1">"{message}"</p>
        </div>
      </div>
    </div>
  );
};

const EchosCard: React.FC = () => {
    const navigate = useNavigate();
    const [lastSubmission, setLastSubmission] = React.useState<UserDailySubmission | null>(null);
    const [hasWritten, setHasWritten] = React.useState(false);

    React.useEffect(() => {
        try {
            const stored = localStorage.getItem(ECHOS_SUBMISSIONS_STORAGE_KEY);
            if (stored) {
                const submissions: UserDailySubmission[] = JSON.parse(stored);
                if (submissions.length > 0) {
                    setHasWritten(true);
                    setLastSubmission(submissions[0]);
                }
            }
        } catch (e) {
            console.error("Impossible de lire les soumissions d'échos", e);
        }
    }, []);

    // FIX: Correctly access the last reflection based on the DailyInteraction type.
    const lastReflection = lastSubmission?.interactions.find(i => i.userEcho)?.userEcho?.text;

    return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200/80">
            {!hasWritten ? (
                <div className="text-center">
                    <p className="font-semibold text-gray-700 mb-2">✍️ Écris ton premier écho</p>
                    <p className="text-sm text-gray-500 mb-3">Prends un moment pour toi, dépose tes pensées.</p>
                    <StyledButton variant="outline" onClick={() => navigate('/echos')}>Commencer</StyledButton>
                </div>
            ) : (
                <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Ta dernière réflexion :</h3>
                    {lastReflection ? (
                        <p className="text-sm text-gray-600 italic border-l-2 border-amber-200 pl-3 py-1 truncate">
                           "{lastReflection}"
                        </p>
                    ) : (
                         <p className="text-sm text-gray-500 italic">(Aucune réflexion écrite lors de ton dernier check-in)</p>
                    )}
                    <div className="text-right mt-3">
                       <StyledButton variant="outline" onClick={() => navigate('/echos')}>Tu veux continuer ta réflexion ?</StyledButton>
                    </div>
                </div>
            )}
        </div>
    );
};

interface AffinitiesCardProps {
    userProfile: UserProfile;
    onMarkAsRead?: () => void;
}

const AffinitiesCard: React.FC<AffinitiesCardProps> = ({ userProfile, onMarkAsRead }) => {
    const navigate = useNavigate();
    const { aiMatch } = userProfile;

    if (!aiMatch) {
        return (
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200/80 text-center">
                <p className="font-semibold text-gray-700 mb-2">💌 Affinités</p>
                <p className="text-sm text-gray-500">Les affinités se créent ici. Continue tes ateliers pour débloquer ton premier lien.</p>
            </div>
        );
    }

    const lastMessage: PrivateChatMessage | null = aiMatch.chatHistory.length > 0 ? aiMatch.chatHistory[aiMatch.chatHistory.length - 1] : null;
    const hasNewMessage = aiMatch.hasUnreadMessages;

    const handleNavigate = () => {
        if (onMarkAsRead) {
            onMarkAsRead();
        }
        navigate(`/messages/${aiMatch.profile.name}`);
    };

    return (
        <div
            onClick={handleNavigate}
            className="group relative bg-gradient-to-br from-purple-50 via-rose-50 to-orange-50 p-4 rounded-2xl shadow-lg border border-gray-200/80 hover:shadow-xl hover:border-purple-200/80 transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleNavigate()}
        >
            <div className="flex items-center space-x-4">
                <div className="relative flex-shrink-0">
                    <Avatar 
                        name={aiMatch.profile.name} 
                        gender={aiMatch.profile.gender} 
                        imageUrl={aiMatch.profile.avatarUrl} 
                        isAI={true} 
                        size="md" 
                        className="w-16 h-16" 
                    />
                    {hasNewMessage && (
                        <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 ring-2 ring-purple-50 animate-pulse" title="Nouveau message"></span>
                    )}
                </div>
                <div className="flex-grow overflow-hidden">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-purple-800 text-xl">{aiMatch.profile.name}</h3>
                    </div>
                    {lastMessage ? (
                        <p className={`text-sm truncate ${hasNewMessage ? 'text-gray-800 font-semibold' : 'text-gray-600'}`}>
                            {lastMessage.isUser ? `Toi: ${lastMessage.text}` : lastMessage.text}
                        </p>
                    ) : (
                        <p className="text-sm text-gray-500 italic">Commencez la conversation !</p>
                    )}
                </div>
                <div className="flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity">
                    <div className="p-3 bg-white/60 rounded-full group-hover:bg-white transition-colors">
                        <ChatBubbleLeftRightIcon className="w-6 h-6 text-purple-600" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const TerritoryCard: React.FC<{ userProfile: UserProfile }> = ({ userProfile }) => {
  const navigate = useNavigate();
  const isTerritoryDefined = userProfile.essentialLimits && userProfile.essentialLimits.length > 0 && userProfile.positiveRequests && userProfile.positiveRequests.length > 0;
  const gendered = getGenderedStrings(userProfile.gender);

  const title = isTerritoryDefined ? "Votre Territoire Intérieur" : "Définissez Votre Territoire";
  const description = isTerritoryDefined 
    ? "Votre bio et vos préférences sont définies. Souhaitez-vous les affiner pour des interactions encore plus justes ?"
    : `Prenez un moment pour définir vos limites et vos besoins. C'est la clé pour créer des liens authentiques et ${gendered.aligne} avec qui vous êtes.`;
  const buttonText = isTerritoryDefined ? "Affiner mon territoire" : "Commencer";

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200/80 flex items-center space-x-4">
      <div className="flex-shrink-0 p-2 bg-teal-100 rounded-full">
        <SparklesIcon className="w-8 h-8 text-teal-500" />
      </div>
      <div className="flex-grow">
        <h3 className="font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
      <StyledButton variant="outline" onClick={() => navigate('/moi/profil')} className="flex-shrink-0">
        {buttonText}
      </StyledButton>
    </div>
  );
};


const SupportCard: React.FC = () => {
    return (
        <div className="text-center space-y-1 py-4">
            <NavLink to="/moi/a-propos" className="block text-sm font-medium text-gray-600 hover:text-amber-600 hover:underline transition-colors p-1">
                À propos de HUMĀN
            </NavLink>
            <NavLink to="/moi/aide-support" className="block text-sm font-medium text-gray-600 hover:text-amber-600 hover:underline transition-colors p-1">
                Aide & Contact
            </NavLink>
        </div>
    );
};


const MyPathPage: React.FC<MyPathPageProps> = ({ userProfile, dynamicUpcomingWorkshops, onMarkAffinityAsRead, feedItems, onOpenProfile }) => {
  
  if (!userProfile) {
    return <div className="p-6 text-center">Chargement du profil...</div>;
  }
  
  const recommendedWorkshops = useMemo(() => {
    if (!userProfile || dynamicUpcomingWorkshops.length === 0) return [];
    const userLevel = getLevelFromXP(userProfile.totalXP);
    const subscribedIds = new Set(userProfile.subscribedWorkshopIds || []);
    const userInterests: (Aspiration | CurrentFeeling)[] = [...(userProfile.aspirations || []), ...(userProfile.currentFeelings || [])];
    const interestData = userInterests.reduce((acc, interestKey) => {
        const interest = INTEREST_KEYWORD_MAP[interestKey];
        if (interest) {
            acc.keywords.push(...interest.keywords);
            acc.reasons.add(interest.reason);
        }
        return acc;
    }, { keywords: [] as string[], reasons: new Set<string>() });

    return dynamicUpcomingWorkshops
      .filter(ws => !subscribedIds.has(ws.id))
      .map(workshop => {
        let score = 0;
        const workshopLevel = workshop.requiredLevel || 'Seeker';
        if (workshopLevel === userLevel.name) score += 10;
        const workshopText = `${workshop.title} ${workshop.description}`.toLowerCase();
        interestData.keywords.forEach(keyword => { if (workshopText.includes(keyword)) score += 8; });
        if (userProfile.professionCategory && (workshop.categoryKey === 'travail' || workshop.categoryKey === 'professionnel')) score += 12;
        return { workshop, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(item => item.workshop);
  }, [userProfile, dynamicUpcomingWorkshops]);

  const newWorkshops = dynamicUpcomingWorkshops.slice(0, 5);
  const popularWorkshops = useMemo(() => {
    return [...dynamicUpcomingWorkshops].sort((a, b) => (b.currentParticipants || 0) - (a.currentParticipants || 0)).slice(0, 5);
  }, [dynamicUpcomingWorkshops]);


  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gray-50/50 h-full overflow-y-auto" data-main-scroll-container="true">
      <section>
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">👋 Bonjour, {userProfile.firstName} !</h1>
      </section>

      <ProgressionCard userProfile={userProfile} />
      <EchosPromptCard />
      <InspirationCard userLevelName={getLevelFromXP(userProfile.totalXP).name} gender={userProfile.gender} />
      <AffinitiesCard userProfile={userProfile} onMarkAsRead={onMarkAffinityAsRead} />
      <EchosCard />

      <WorkshopCarousel title="Pour Vous" workshops={recommendedWorkshops} userProfile={userProfile} />
      <WorkshopCarousel title="Nouveautés" workshops={newWorkshops} userProfile={userProfile} />
      <WorkshopCarousel title="Les Plus Populaires" workshops={popularWorkshops} userProfile={userProfile} />
      
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-3">Fil d'activité</h2>
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200/80">
            {feedItems && feedItems.length > 0 ? (
                <div className="space-y-2">
                    {feedItems.slice(0, 5).map(item => <ActivityFeedItemComponent key={item.id} item={item} onOpenProfile={onOpenProfile} />)}
                </div>
            ) : (
                <p className="text-sm text-gray-500 text-center py-4">L'activité de la communauté apparaîtra ici.</p>
            )}
            {feedItems && feedItems.length > 5 && (
                <div className="mt-4 text-center border-t border-gray-100 pt-3">
                    <NavLink to="/fil-dactivite" className="text-sm font-semibold text-orange-600 hover:text-orange-800 transition-colors">
                        Voir tout le fil d'activité &rarr;
                    </NavLink>
                </div>
            )}
        </div>
      </section>

      <TerritoryCard userProfile={userProfile} />
      <SupportCard />
    </div>
  );
};

export default MyPathPage;