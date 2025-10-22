import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import StyledButton from '../components/StyledButton';
import { WorkshopTheme, UserProfile, WorkshopSummaryData, UserCreatedWorkshopDetails, WorkshopCategoryKey, LevelInfo } from '../types';
import { CalendarIcon, ClockIcon, UsersIcon, StarIcon, EyeIcon, PlusCircleIcon, LockClosedIcon, CheckIcon, ArchiveIcon, HomeIcon, XIcon } from '../components/icons';
import WorkshopSummaryModal from '../components/WorkshopSummaryModal';
import CreateWorkshopModal from '../components/CreateWorkshopModal';
import { XP_LEVELS, WORKSHOP_CATEGORY_DEFINITIONS, getLevelFromXP, getGenderedStrings } from '../constants';
import { Badge } from '../components/Badge';
import LevelGateModal from '../components/LevelGateModal';

interface WorkshopsPageProps {
  userProfile: UserProfile | null;
  allCurrentlyAvailableWorkshops: WorkshopTheme[];
  pastWorkshops: WorkshopTheme[];
  onCreateUserWorkshop: (details: UserCreatedWorkshopDetails) => void;
  onToggleSubscription: (workshopId: string) => void;
  onToggleFavorite: (workshopId: string) => void;
  workshopFilter: { participantName: string | null; participantGender: UserProfile['gender'] | null; workshopIds: string[] | null };
  setWorkshopFilter: (filter: { participantName: string | null; participantGender: UserProfile['gender'] | null; workshopIds: string[] | null }) => void;
}

const WorkshopCard: React.FC<{
  workshop: WorkshopTheme;
  userProfile: UserProfile;
  onAccessLobby: (workshop: WorkshopTheme) => void;
  isSubscribed: boolean;
  onToggleSubscription: () => void;
  isFavorited: boolean;
  onToggleFavorite: () => void;
  onShowLevelInfo: (userLevel: LevelInfo, requiredLevel: LevelInfo) => void;
}> = ({ workshop, userProfile, onAccessLobby, isSubscribed, onToggleSubscription, isFavorited, onToggleFavorite, onShowLevelInfo }) => {
  const navigate = useNavigate();

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
        <button 
            onClick={onToggleFavorite}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/70 hover:bg-white backdrop-blur-sm transition-all z-10"
            title={isFavorited ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
            <StarIcon className={`w-5 h-5 transition-all ${isFavorited ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500 hover:text-yellow-400'}`} />
        </button>
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
                    <StyledButton onClick={() => onAccessLobby(workshop)} fullWidth variant="success">
                        <CheckIcon className="w-4 h-4 mr-2" />
                        {gendered.inscrit} - Voir les détails
                    </StyledButton>
                ) : (
                    <StyledButton onClick={onToggleSubscription} fullWidth variant="primary">
                        S'inscrire à l'atelier
                    </StyledButton>
                )
            ) : (
                <StyledButton 
                    fullWidth 
                    size="md" 
                    variant="secondary" 
                    onClick={() => {
                        if (!canParticipateByLevel && requiredLevelDetails) {
                            onShowLevelInfo(getLevelFromXP(userProfile.totalXP), requiredLevelDetails);
                        } else if (!canAccessPremium) {
                            navigate('/moi/boutique');
                        }
                    }}
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
}


const WorkshopsPage: React.FC<WorkshopsPageProps> = ({ userProfile, pastWorkshops, allCurrentlyAvailableWorkshops, onCreateUserWorkshop, onToggleSubscription, onToggleFavorite, workshopFilter, setWorkshopFilter }) => {
  const navigate = useNavigate();
  const [view, setView] = useState<'carousels' | 'archives'>('carousels');
  const [activeCategory, setActiveCategory] = useState<WorkshopCategoryKey | 'all'>('all');
  const [showArchivedSummaryModal, setShowArchivedSummaryModal] = useState(false);
  const [selectedArchivedSummary, setSelectedArchivedSummary] = useState<WorkshopSummaryData | null>(null);
  const [selectedArchivedTitle, setSelectedArchivedTitle] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);
  const [levelModalContent, setLevelModalContent] = useState<{ userLevel: LevelInfo | null; requiredLevel: LevelInfo | null; }>({ userLevel: null, requiredLevel: null });
  
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const mainContentRef = useRef<HTMLDivElement>(null);


  if (!userProfile) return <PageContainer title="Espace Ateliers"><p>Chargement...</p></PageContainer>;
  
  const builderLevel = XP_LEVELS.find(l => l.name === "Builder");
  const canCreateWorkshop = builderLevel ? userProfile.totalXP >= builderLevel.minXP : false;

  const handleAccessLobby = (workshopToEnter: WorkshopTheme) => {
      navigate(`/atelier-lobby/${workshopToEnter.id}`);
  };

  const handleShowArchivedSummary = (workshop: WorkshopTheme) => {
    if (workshop.summaryData) {
      setSelectedArchivedSummary(workshop.summaryData);
      setSelectedArchivedTitle(workshop.title);
      setShowArchivedSummaryModal(true);
    }
  };

  const handleShowLevelInfo = (userLevel: LevelInfo, requiredLevel: LevelInfo) => {
    setLevelModalContent({ userLevel, requiredLevel });
    setIsLevelModalOpen(true);
  };
  
  const workshopsByCategory = useMemo(() => {
    return allCurrentlyAvailableWorkshops.reduce((acc, workshop) => {
        const key = workshop.categoryKey;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(workshop);
        return acc;
    }, {} as Record<string, WorkshopTheme[]>);
  }, [allCurrentlyAvailableWorkshops]);

  const workshopsToDisplayFromFilter = useMemo(() => {
    if (workshopFilter?.workshopIds && workshopFilter.workshopIds.length > 0) {
        return allCurrentlyAvailableWorkshops.filter(w => workshopFilter.workshopIds!.includes(w.id));
    }
    return null;
  }, [allCurrentlyAvailableWorkshops, workshopFilter]);

  const visibleCategories = WORKSHOP_CATEGORY_DEFINITIONS.filter(cat => workshopsByCategory[cat.key]?.length > 0);
  
  const handleTabClick = (key: WorkshopCategoryKey | 'all') => {
    setActiveCategory(key);
    const element = sectionRefs.current[key];
    if (element && mainContentRef.current) {
        const topPos = element.offsetTop - 180; // Adjusted for sticky elements
        mainContentRef.current.scrollTo({
            top: topPos,
            behavior: 'smooth'
        });
    }
  };
  
  useEffect(() => {
    const mainContent = mainContentRef.current;
    if (!mainContent) return;
    
    const handleScroll = () => {
        if (workshopsToDisplayFromFilter) return; // Disable scroll detection when filtering
        let currentCategory: WorkshopCategoryKey | 'all' = 'all';
        const scrollPosition = mainContent.scrollTop + 200; // Offset for better detection

        for (const cat of visibleCategories) {
            const el = sectionRefs.current[cat.key];
            if (el && scrollPosition >= el.offsetTop) {
                currentCategory = cat.key;
            } else {
                break;
            }
        }
        if (mainContent.scrollTop < 100) {
            currentCategory = 'all';
        }
        
        setActiveCategory(currentCategory);
    };
    
    mainContent.addEventListener('scroll', handleScroll);
    return () => mainContent.removeEventListener('scroll', handleScroll);
  }, [visibleCategories, workshopsToDisplayFromFilter]);

  const renderContent = () => {
    if (view === 'archives') {
        if (pastWorkshops.length === 0) return <p className="text-center text-[var(--text-color-light)] py-8 px-4 sm:px-6">Tu n'as pas encore complété d'ateliers. Tes ateliers terminés apparaîtront ici.</p>;
        return (
            <div className="space-y-4 px-4 sm:px-6">
                {pastWorkshops.map(workshop => (
                  <div key={workshop.id} className="bg-white p-4 rounded-lg shadow-sm">
                     <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold text-gray-800">{workshop.title}</p>
                            <p className="text-xs text-gray-500">Terminé le {new Date(workshop.date!).toLocaleDateString('fr-FR')} (+{workshop.xpGainedByUser || 0} XP)</p>
                        </div>
                         {workshop.summaryData && (
                            <StyledButton variant="outline" size="sm" onClick={() => handleShowArchivedSummary(workshop)} className="border-blue-500 text-blue-600 hover:bg-blue-500/10"><EyeIcon className="w-4 h-4 mr-1.5"/>Voir synthèse</StyledButton>
                         )}
                     </div>
                  </div>
                ))}
            </div>
        );
    }
    
    if (workshopsToDisplayFromFilter) {
        const genderedFilteredParticipant = getGenderedStrings(workshopFilter?.participantGender || 'prefer_not_to_say');
        return (
            <div className="px-4 sm:px-6 space-y-4">
                <div className="bg-amber-100 border-l-4 border-amber-500 text-amber-800 p-4 mb-2 rounded-r-lg">
                    <div className="flex justify-between items-center">
                        <p className="text-sm">Affiche les ateliers avec <strong>{workshopFilter.participantName}</strong>.</p>
                        <button onClick={() => setWorkshopFilter({ participantName: null, participantGender: null, workshopIds: null })} className="p-1 rounded-full hover:bg-amber-200">
                            <XIcon className="w-5 h-5"/>
                        </button>
                    </div>
                </div>
                {workshopsToDisplayFromFilter.length > 0 ? (
                    <div className="space-y-4 max-w-xl mx-auto">
                        {workshopsToDisplayFromFilter.map(workshop => (
                            <div key={workshop.id} className="w-full">
                                <WorkshopCard
                                    workshop={workshop}
                                    userProfile={userProfile}
                                    onAccessLobby={handleAccessLobby}
                                    isSubscribed={userProfile.subscribedWorkshopIds?.includes(workshop.id) || false}
                                    onToggleSubscription={() => onToggleSubscription(workshop.id)}
                                    isFavorited={userProfile.favoritedWorkshopIds?.includes(workshop.id) || false}
                                    onToggleFavorite={() => onToggleFavorite(workshop.id)}
                                    onShowLevelInfo={handleShowLevelInfo}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-8">{workshopFilter.participantName} n'est {genderedFilteredParticipant.inscrit.toLowerCase()} à aucun atelier pour le moment.</p>
                )}
            </div>
        )
    }

    const tabCategories = [{ key: 'all' as const, label: 'Tout voir', Icon: HomeIcon }, ...visibleCategories];

    return (
        <div className="space-y-6">
            <div ref={el => sectionRefs.current['all'] = el} className="sticky top-20 z-20 bg-[var(--background-color)]/80 backdrop-blur-md pt-4 pb-2 -mt-4">
                <div className="flex space-x-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide px-4 sm:px-6">
                    {tabCategories.map(cat => (
                        <button 
                            key={cat.key}
                            onClick={() => handleTabClick(cat.key)}
                            className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${activeCategory === cat.key ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                        >
                            <cat.Icon className={`w-5 h-5 ${activeCategory === cat.key ? '' : 'text-orange-500'}`} />
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>
            
            {visibleCategories.map(category => (
                <section key={category.key} ref={el => sectionRefs.current[category.key] = el} className="px-4 sm:px-6 scroll-mt-32">
                  <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200/80">
                    <div className="mb-3 flex items-center">
                        <category.Icon className="w-6 h-6 text-orange-500 mr-2" />
                        <h2 className="text-xl font-bold text-gray-800">{category.label}</h2>
                    </div>
                    <div className="flex space-x-4 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
                        {workshopsByCategory[category.key].map(workshop => (
                            <div key={workshop.id} className="flex-shrink-0 w-80 pb-2">
                                <WorkshopCard
                                    workshop={workshop}
                                    userProfile={userProfile}
                                    onAccessLobby={handleAccessLobby}
                                    isSubscribed={userProfile.subscribedWorkshopIds?.includes(workshop.id) || false}
                                    onToggleSubscription={() => onToggleSubscription(workshop.id)}
                                    isFavorited={userProfile.favoritedWorkshopIds?.includes(workshop.id) || false}
                                    onToggleFavorite={() => onToggleFavorite(workshop.id)}
                                    onShowLevelInfo={handleShowLevelInfo}
                                />
                            </div>
                        ))}
                         <div className="flex-shrink-0 w-1 sm:w-2"></div>
                    </div>
                    </div>
                </section>
            ))}
            {Object.keys(workshopsByCategory).length === 0 && (
                <p className="text-center text-[var(--text-color-light)] py-8 px-4 sm:px-6">Aucun atelier n'est disponible pour le moment. Revenez bientôt !</p>
            )}
            <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
        </div>
    );
  };

  return (
    <>
    <div className="flex flex-col h-full" ref={mainContentRef}>
    <PageContainer disableDefaultPadding>
       <div className="relative aspect-[16/6] min-h-[150px] rounded-b-[var(--border-radius-lg)] overflow-hidden mb-6 bg-gray-300">
        <img src="https://images.pexels.com/photos/160107/pexels-photo-160107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Espace Ateliers" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent flex items-end justify-between p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-white text-left">Espace Ateliers</h1>
             <StyledButton onClick={() => setIsCreateModalOpen(true)} disabled={!canCreateWorkshop} variant='secondary' size="sm">
                <PlusCircleIcon className="w-5 h-5 mr-1.5" /> Créer un atelier
            </StyledButton>
        </div>
      </div>
      
      <div className="px-4 sm:px-6"><p className="text-center text-[var(--text-color-light)] mb-6 -mt-2">Trouve, explore et participe à des ateliers conçus pour l'introspection et le partage authentique.</p></div>

      <div className="px-4 sm:px-6 mb-6 flex justify-end items-center">
        <StyledButton onClick={() => setView(view === 'archives' ? 'carousels' : 'archives')} variant={view === 'archives' ? 'primary' : 'secondary'} size="sm">
            <ArchiveIcon className="w-4 h-4 mr-2"/>
            {view === 'archives' ? 'Voir les ateliers à venir' : 'Voir mes archives'}
        </StyledButton>
      </div>
      
      <div className="mb-8">
        {renderContent()}
      </div>

      {showArchivedSummaryModal && selectedArchivedSummary && <WorkshopSummaryModal isOpen={showArchivedSummaryModal} onClose={() => setShowArchivedSummaryModal(false)} summaryData={selectedArchivedSummary} isLoading={false} workshopTitle={selectedArchivedTitle} />}
      {isCreateModalOpen && <CreateWorkshopModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onCreate={(details) => { onCreateUserWorkshop(details); setIsCreateModalOpen(false); }} />}
    </PageContainer>
    </div>
     <LevelGateModal 
        isOpen={isLevelModalOpen}
        onClose={() => setIsLevelModalOpen(false)}
        userLevel={levelModalContent.userLevel}
        requiredLevel={levelModalContent.requiredLevel}
      />
    </>
  );
};

export default WorkshopsPage;