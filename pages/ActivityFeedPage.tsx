

import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import StyledButton from '../components/StyledButton';
import { ActivityFeedItem, ParticipantProfileInfo } from '../types';
import { ArrowLeftIcon, UsersIcon, SparklesIcon, CheckCircleIcon } from '../components/icons';
import Avatar from '../components/Avatar';

// Helper function for relative time
const timeSince = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return `à l'instant`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours} h`;
  const days = Math.floor(hours / 24);
  return `il y a ${days} j`;
};

// Component for a single feed item
const FullActivityFeedItemComponent: React.FC<{ item: ActivityFeedItem; onOpenProfile: (participant: ParticipantProfileInfo) => void; }> = ({ item, onOpenProfile }) => {
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
    <div className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-gray-200/80 shadow-sm">
      <div className="relative">
        <Avatar
          onClick={() => onOpenProfile(item.userProfile)}
          name={item.userProfile.name}
          gender={item.userProfile.gender}
          imageUrl={item.userProfile.avatarUrl}
          isAI={true}
          size="md"
          className="w-11 h-11"
        />
        <div className={`absolute -bottom-1 -right-1 p-1 rounded-full ${bg} border-2 border-white`}>
          <Icon className={`w-4 h-4 ${color}`} />
        </div>
      </div>
      <div className="flex-grow pt-1">
        <p className="text-sm text-gray-700 leading-snug">{renderText()}</p>
        <span className="text-xs text-gray-400 mt-1 block">{timeSince(item.timestamp)}</span>
      </div>
    </div>
  );
};


interface ActivityFeedPageProps {
  feedItems: ActivityFeedItem[];
  onOpenProfile: (participant: ParticipantProfileInfo) => void;
}

const ActivityFeedPage: React.FC<ActivityFeedPageProps> = ({ feedItems, onOpenProfile }) => {
  const navigate = useNavigate();

  return (
    <PageContainer
      title="Fil d'Activité"
      headerContent={
        <StyledButton variant="secondary" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeftIcon className="w-4 h-4 mr-1.5" />
          Retour
        </StyledButton>
      }
    >
      <p className="text-center text-gray-500 mb-6 -mt-2">
        Découvrez ce qu'il se passe dans la communauté HUMĀN.
      </p>
      {feedItems.length > 0 ? (
        <div className="space-y-3">
          {feedItems.map(item => <FullActivityFeedItemComponent key={item.id} item={item} onOpenProfile={onOpenProfile} />)}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-8">
          Aucune activité récente dans la communauté.
        </p>
      )}
    </PageContainer>
  );
};

export default ActivityFeedPage;