
import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import LoadingSpinner from '../components/LoadingSpinner';
import StyledButton from '../components/StyledButton';
import { LiveIcon } from '../components/icons/LiveIcon';
import { WorkshopTheme, UserProfile } from '../types';
import { CalendarIcon } from '../components/icons/CalendarIcon';
import { ClockIcon } from '../components/icons/ClockIcon';
import { UsersIcon } from '../components/icons/UsersIcon';
import { PenIcon } from '../components/icons/PenIcon'; 

interface LiveEntryPageProps {
  userProfile: UserProfile | null;
  allCurrentlyAvailableWorkshops: WorkshopTheme[];
}

const LiveEntryPage: React.FC<LiveEntryPageProps> = ({ userProfile, allCurrentlyAvailableWorkshops }) => {
  const navigate = useNavigate();
  const [nextSubscribedWorkshop, setNextSubscribedWorkshop] = useState<WorkshopTheme | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userProfile && allCurrentlyAvailableWorkshops.length > 0) {
      const subscribedIds = userProfile.subscribedWorkshopIds || [];
      if (subscribedIds.length > 0) {
        const subscribedWorkshops = allCurrentlyAvailableWorkshops
          .filter(w => subscribedIds.includes(w.id) && w.date && new Date(w.date) >= new Date())
          .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());
        
        if (subscribedWorkshops.length > 0) {
          setNextSubscribedWorkshop(subscribedWorkshops[0]);
        } else {
          setNextSubscribedWorkshop(null);
        }
      } else {
          setNextSubscribedWorkshop(null);
      }
    } else {
        setNextSubscribedWorkshop(null);
    }
    setIsLoading(false);
  }, [userProfile, allCurrentlyAvailableWorkshops]);

  const handleEnterWorkshop = () => {
    if (nextSubscribedWorkshop) {
      navigate(`/atelier-en-direct/${nextSubscribedWorkshop.id}`);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Date à confirmer';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  if (isLoading) { 
    return (
      <PageContainer title="Accès à Mon Live">
        <div className="flex flex-col items-center justify-center text-center py-10">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">Recherche de votre prochain atelier...</p>
        </div>
      </PageContainer>
    );
  }

  if (!nextSubscribedWorkshop) {
    return (
      <PageContainer title="Mon Live">
        <div className="text-center py-10 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <LiveIcon className="w-16 h-16 text-orange-400 mx-auto mb-6" />
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Aucun atelier "Live" programmé.</h2>
          <p className="text-gray-500 mb-6">
            Inscris-toi à un atelier pour qu'il apparaisse ici comme ton prochain point d'entrée "Live".
          </p>
          <NavLink to="/ateliers">
            <StyledButton variant="primary">
              Explorer les ateliers
            </StyledButton>
          </NavLink>
        </div>
      </PageContainer>
    );
  }
  
  const IconComponent = nextSubscribedWorkshop.icon || PenIcon;

  return (
    <PageContainer title={`Mon Prochain Live`}>
      <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200/80">
        <div className="flex items-center mb-4">
            <IconComponent className="w-10 h-10 text-orange-500 mr-4 flex-shrink-0" />
            <div>
                <h2 className="text-2xl font-bold text-orange-600">{nextSubscribedWorkshop.title}</h2>
                <p className="text-xs text-gray-500">(Votre prochain atelier inscrit)</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 mt-1">
                    {nextSubscribedWorkshop.date && (
                    <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1.5 text-gray-400" />
                        <span>{formatDate(nextSubscribedWorkshop.date)}</span>
                    </div>
                    )}
                    {nextSubscribedWorkshop.time && (
                    <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1.5 text-gray-400" />
                        <span>{nextSubscribedWorkshop.time}</span>
                    </div>
                    )}
                    <div className="flex items-center">
                        <UsersIcon className="w-4 h-4 mr-1.5 text-gray-400" />
                        <span>{nextSubscribedWorkshop.maxParticipants || 10} participants (toi inclus)</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="space-y-5 text-gray-700">
          <div>
            <h3 className="font-semibold text-lg text-gray-800 mb-1">Description de l'atelier :</h3>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{nextSubscribedWorkshop.detailedContent || nextSubscribedWorkshop.description}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-800 mb-1">Pourquoi cet atelier ?</h3>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{nextSubscribedWorkshop.whyThisWorkshop}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-800 mb-1">Ce que nous attendons des participants :</h3>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{nextSubscribedWorkshop.participantExpectations}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-800 mb-1">Ce que tu vas y gagner :</h3>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{nextSubscribedWorkshop.whatToGain}</p>
          </div>
          {nextSubscribedWorkshop.xpActivated && nextSubscribedWorkshop.xpActivated.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-1">XP activées pour cet atelier :</h3>
              <p className="text-sm">{nextSubscribedWorkshop.xpActivated.join(', ')}</p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <StyledButton 
            onClick={handleEnterWorkshop} 
            size="lg" 
            variant="primary"
            className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            aria-label={`Entrer dans l'atelier ${nextSubscribedWorkshop.title}`}
          >
            Entrer dans cet Atelier Live
          </StyledButton>
        </div>
      </div>
    </PageContainer>
  );
};

export default LiveEntryPage;