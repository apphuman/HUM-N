

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { WorkshopTheme, UserProfile, ParticipantProfileInfo } from '../types';
import StyledButton from '../components/StyledButton';
import LoadingSpinner from '../components/LoadingSpinner';
import Avatar from '../components/Avatar';
import { ArrowLeftIcon, CalendarIcon, ClockIcon, UsersIcon, LightBulbIcon, SparklesIcon, EyeIcon, CheckCircleIcon, PuzzleIcon } from '../components/icons';
import { FEMALE_AI_NAMES, MALE_AI_NAMES, FEMALE_AI_AVATAR_URLS, MALE_AI_AVATAR_URLS, getLevelFromXP, EMOTIONAL_XP_TYPES } from '../constants';

// This function now returns richer participant info for display
const generateAiParticipantsForDisplay = (
    femaleNames: string[], 
    maleNames: string[], 
    requestedCount?: number
): Array<Pick<ParticipantProfileInfo, 'name' | 'gender' | 'avatarUrl'>> => {
    const finalCount = requestedCount && requestedCount >= 6 && requestedCount <= 10 ? requestedCount : Math.floor(Math.random() * 5) + 6;

    let numFemale = Math.ceil(finalCount / 2);
    let numMale = finalCount - numFemale;
    if (Math.random() < 0.5) [numFemale, numMale] = [numMale, numFemale];

    const shuffledFemales = [...femaleNames].sort(() => 0.5 - Math.random());
    const shuffledMales = [...maleNames].sort(() => 0.5 - Math.random());
    
    const femaleAvatars = [...FEMALE_AI_AVATAR_URLS].sort(() => 0.5 - Math.random());
    const maleAvatars = [...MALE_AI_AVATAR_URLS].sort(() => 0.5 - Math.random());

    const selectedFemales = shuffledFemales.slice(0, numFemale).map((name, i) => ({
        name,
        gender: 'female' as const,
        avatarUrl: femaleAvatars[i % femaleAvatars.length]
    }));
    const selectedMales = shuffledMales.slice(0, numMale).map((name, i) => ({
        name,
        gender: 'male' as const,
        avatarUrl: maleAvatars[i % maleAvatars.length]
    }));
    
    return [...selectedFemales, ...selectedMales].sort(() => 0.5 - Math.random());
};

interface WorkshopLobbyPageProps {
  userProfile: UserProfile | null;
  allCurrentlyAvailableWorkshops: WorkshopTheme[];
  onToggleSubscription: (workshopId: string) => void;
}

const DetailSection: React.FC<{ title: string, content: string | string[], icon: React.FC<any> }> = ({ title, content, icon: Icon }) => (
    <div className="flex items-start">
        <Icon className="w-6 h-6 text-orange-500 mr-4 mt-1 flex-shrink-0" />
        <div>
            <h4 className="font-semibold text-gray-700">{title}</h4>
            {Array.isArray(content) ? (
                <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1">
                    {content.map(item => {
                        const xpType = EMOTIONAL_XP_TYPES.find(xp => xp.name === item);
                        return (
                            <span key={item} className="text-xs font-medium bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full flex items-center">
                                {xpType?.icon && <span className="mr-1.5">{xpType.icon}</span>}
                                {item}
                            </span>
                        );
                    })}
                </div>
            ) : (
                <p className="text-sm text-gray-600 leading-relaxed">{content}</p>
            )}
        </div>
    </div>
);

const WorkshopLobbyPage: React.FC<WorkshopLobbyPageProps> = ({ userProfile, allCurrentlyAvailableWorkshops, onToggleSubscription }) => {
  const { workshopId } = useParams<{ workshopId: string }>();
  const navigate = useNavigate();
  const [workshop, setWorkshop] = useState<WorkshopTheme | null>(null);
  const [aiParticipants, setAiParticipants] = useState<Array<Pick<ParticipantProfileInfo, 'name' | 'gender' | 'avatarUrl'>>>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isUserSubscribed = userProfile?.subscribedWorkshopIds?.includes(workshopId || '') || false;

  useEffect(() => {
    if (workshopId && allCurrentlyAvailableWorkshops.length > 0) {
      const foundWorkshop = allCurrentlyAvailableWorkshops.find(w => w.id === workshopId);
      if (foundWorkshop) {
        setWorkshop(foundWorkshop);
        const participants = generateAiParticipantsForDisplay(
          FEMALE_AI_NAMES,
          MALE_AI_NAMES,
          foundWorkshop.maxParticipants ? foundWorkshop.maxParticipants - 1 : undefined
        );
        setAiParticipants(participants);
      } else {
        navigate('/ateliers');
      }
    }
    setIsLoading(false);
  }, [workshopId, allCurrentlyAvailableWorkshops, navigate]);
  
  const handleEnterWorkshop = () => {
    if (workshop) {
      navigate(`/atelier-en-direct/${workshop.id}`);
    }
  };
  
  if (isLoading || !workshop || !userProfile) {
    return (
      <div className="min-h-full flex justify-center items-center bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Date à définir';
    return new Date(dateString).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
  };

  return (
    <div className="min-h-full bg-gray-50">
      <div className="relative h-48">
        <img src={workshop.image} alt={workshop.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/70 to-transparent"></div>
        <div className="absolute top-4 left-4">
          <StyledButton variant="secondary" size="sm" onClick={() => navigate('/ateliers')}>
            <ArrowLeftIcon className="w-4 h-4 mr-1.5" />
            Retour
          </StyledButton>
        </div>
      </div>

      <div className="p-4 sm:p-6 -mt-24 relative space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200 text-center">
          <p className="text-sm font-semibold text-orange-500">Détails de l'atelier</p>
          <h1 className="text-2xl font-bold text-gray-800 mt-1">{workshop.title}</h1>
          <div className="flex justify-center flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 mt-3">
              <span className="flex items-center"><CalendarIcon className="w-4 h-4 mr-1"/> {formatDate(workshop.date)} à {workshop.time}</span>
              <span className="flex items-center"><ClockIcon className="w-4 h-4 mr-1"/> {workshop.duration}</span>
              {workshop.type === 'cercle' && <span className="flex items-center"><UsersIcon className="w-4 h-4 mr-1"/> {workshop.maxParticipants} participants max.</span>}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-5">
            <DetailSection title="Pourquoi cet atelier ?" content={workshop.whyThisWorkshop} icon={LightBulbIcon} />
            <DetailSection title="Ce qu'on recherche chez toi" content={workshop.participantExpectations} icon={EyeIcon} />
            <DetailSection title="Ce que tu vas y gagner" content={workshop.whatToGain} icon={CheckCircleIcon} />
            <DetailSection title="XP activés pour cet atelier" content={workshop.xpActivated} icon={SparklesIcon} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Participants déjà inscrits</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex flex-col items-center w-20 text-center">
              <Avatar 
                name={userProfile.firstName} 
                gender={userProfile.gender} 
                imageUrl={userProfile.profilePicture}
                isAI={false} 
                size="md" 
                className="w-12 h-12" />
              <p className="text-xs font-semibold mt-1 truncate text-orange-600">{userProfile.firstName} (Vous)</p>
            </div>
            {aiParticipants.map(participant => (
              <div key={participant.name} className="flex flex-col items-center w-20 text-center">
                <Avatar 
                    name={participant.name} 
                    gender={participant.gender}
                    imageUrl={participant.avatarUrl}
                    isAI={true} 
                    size="md" 
                    className="w-12 h-12" 
                />
                <p className="text-xs font-medium mt-1 truncate text-gray-600">{participant.name}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <StyledButton 
                onClick={() => onToggleSubscription(workshop.id)}
                variant={isUserSubscribed ? "secondary" : "outline"}
                className="w-full sm:w-auto"
            >
                {isUserSubscribed ? "Se désinscrire" : "S'inscrire"}
            </StyledButton>
            <StyledButton size="lg" fullWidth onClick={handleEnterWorkshop} disabled={!isUserSubscribed} title={!isUserSubscribed ? "Vous devez être inscrit pour entrer" : ""}>
                Entrer dans l'atelier
            </StyledButton>
        </div>
      </div>
    </div>
  );
};

export default WorkshopLobbyPage;