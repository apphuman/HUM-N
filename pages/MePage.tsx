import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserProfile, WorkshopTheme, UserDailySubmission } from '../types';
import { getLevelFromXP, getNextLevel, ECHOS_SUBMISSIONS_STORAGE_KEY } from '../constants';
import Avatar from '../components/Avatar';
import {
  ChevronRightIcon,
  LightBulbIcon,
  ArchiveIcon,
  AdjustmentsHorizontalIcon,
  HumanHeartIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ClipboardDocumentIcon,
  AudioIcon,
  StarIcon,
} from '../components/icons';
import BioModal from '../components/BioModal';

interface MePageProps {
  userProfile: UserProfile | null;
  pastWorkshops: WorkshopTheme[];
  onTogglePremium: () => void;
  onUpdateProfilePicture: (base64Image: string) => void;
}

const StatBox: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex-1 text-center bg-gray-50/70 px-2 py-3 rounded-lg shadow-inner">
    <p className="text-2xl font-bold text-gray-800">{value}</p>
    <p className="text-xs text-gray-500 tracking-tight">{label}</p>
  </div>
);

const MenuItem: React.FC<{ id: string, title: string, subtitle: string, icon: React.FC<any>, color: string }> = ({ id, title, subtitle, icon: Icon, color }) => (
  <NavLink
    to={`/moi/${id}`}
    className="block group bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all duration-200"
  >
    <div className="flex items-center">
      <div className={`p-2 rounded-lg mr-4 ${color.replace('text-', 'bg-')}/10`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-800 group-hover:text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors flex-shrink-0" />
    </div>
  </NavLink>
);

const MePage: React.FC<MePageProps> = ({ userProfile, pastWorkshops, onUpdateProfilePicture }) => {
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [echosCount, setEchosCount] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ECHOS_SUBMISSIONS_STORAGE_KEY);
      if (stored) {
        const submissions: UserDailySubmission[] = JSON.parse(stored);
        setEchosCount(submissions.length);
      }
    } catch (e) {
      console.error("Impossible de charger les échos écrits", e);
    }
  }, []);

  if (!userProfile) {
    return <div className="p-4"><p>Chargement du profil...</p></div>;
  }

  const { firstName, gender, totalXP, profilePicture } = userProfile;
  const userLevel = getLevelFromXP(totalXP);
  const nextLevel = getNextLevel(userLevel.name);

  const xpForCurrentLevel = totalXP - userLevel.minXP;
  const xpForLevelTotal = nextLevel ? nextLevel.minXP - userLevel.minXP : (userLevel.maxXP > 0 ? userLevel.maxXP - userLevel.minXP : 0);
  const progressPercentage = xpForLevelTotal > 0 ? (xpForCurrentLevel / xpForLevelTotal) * 100 : 100;

  const menuItems = [
    { id: 'progression', title: 'Ma Progression', subtitle: 'Mon profil Humanizer et mes compétences.', icon: LightBulbIcon, color: 'text-orange-500' },
    { id: 'badges', title: 'Mes Badges', subtitle: 'Découvrez et collectionnez vos succès.', icon: StarIcon, color: 'text-yellow-500' },
    { id: 'profil', title: 'Mon Territoire Intérieur', subtitle: 'Définissez vos limites et préférences.', icon: SparklesIcon, color: 'text-teal-500' },
    { id: 'parcours', title: 'Mon Parcours', subtitle: 'Retrouvez vos ateliers et échos.', icon: ArchiveIcon, color: 'text-amber-600' },
    { id: 'parametres', title: 'Paramètres', subtitle: 'Gérez profil, préférences et compte.', icon: AdjustmentsHorizontalIcon, color: 'text-slate-500' },
    { id: 'sonneries', title: 'Sonneries & Alertes', subtitle: 'Personnalisez les sons de l\'application.', icon: AudioIcon, color: 'text-indigo-500' },
    { id: 'a-propos', title: 'À propos de HUMĀN', subtitle: 'Découvrez notre philosophie.', icon: HumanHeartIcon, color: 'text-red-500' },
    { id: 'aide-support', title: 'Aide & Support', subtitle: 'Besoin d\'aide ? Nous sommes là.', icon: QuestionMarkCircleIcon, color: 'text-sky-500' },
    { id: 'confidentialite', title: 'Confidentialité', subtitle: 'Voyez comment nous vous protégeons.', icon: ShieldCheckIcon, color: 'text-green-600' },
  ];

  return (
    <>
      <div className="p-4 sm:p-6 space-y-6">
        {/* Profile Card */}
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-200/80">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsBioModalOpen(true)}
              className="group relative w-20 h-20 flex-shrink-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-400"
              aria-label="Voir ma bio et mon profil"
            >
              <Avatar
                name={firstName}
                gender={gender}
                imageUrl={profilePicture}
                className="w-full h-full"
                isAI={false}
                isPremium={userProfile.isPremium}
              />
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <ClipboardDocumentIcon className="w-8 h-8 text-white" />
              </div>
            </button>
            <div className="flex-grow">
              <h2 className="text-2xl font-bold text-gray-800">{firstName}</h2>
              <p className="text-sm font-semibold text-orange-500">{userLevel.emoji} {userLevel.name}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progression XP</span>
              <span>{xpForCurrentLevel} / {xpForLevelTotal} XP</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-orange-400 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          <div className="mt-4 flex space-x-3">
            <StatBox value={pastWorkshops.length} label="Ateliers Vécus" />
            <StatBox value={echosCount} label="Échos Écrits" />
            <StatBox value={0} label="Série (jours)" />
          </div>
        </div>

        {/* Menu List */}
        <div className="space-y-3">
          {menuItems.map(item => (
            <MenuItem key={item.id} {...item} />
          ))}
        </div>
      </div>
      <BioModal
        isOpen={isBioModalOpen}
        onClose={() => setIsBioModalOpen(false)}
        userProfile={userProfile}
        onUpdateProfilePicture={onUpdateProfilePicture}
      />
    </>
  );
};

export default MePage;