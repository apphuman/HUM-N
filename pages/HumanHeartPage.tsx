
import React, { useState } from 'react';
import PageContainer from '../components/PageContainer';
import { HumanHeartIcon } from '../components/icons/HumanHeartIcon';
import StyledButton from '../components/StyledButton';
import { getLevelFromXP, XP_LEVELS } from '../constants'; // For access check

const HumanHeartPage: React.FC = () => {
  const [userXp] = useState(450); 
  const userLevel = getLevelFromXP(userXp);
  
  const canAccessHumanHeart = userLevel.minXP >= XP_LEVELS.find(l => l.name === 'Connector')!.minXP;

  if (!canAccessHumanHeart) {
    return (
      <PageContainer title="Le Cœur HUMĀN">
        <div className="text-center py-10 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
           <img 
            src="https://images.pexels.com/photos/209807/pexels-photo-209807.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1" // Image of a closed door or a path leading away
            alt="Accès réservé au Coeur HUMĀN" 
            className="w-full max-w-xs h-auto object-contain rounded-lg mx-auto mb-6 opacity-50"
          />
          <HumanHeartIcon className="w-16 h-16 text-orange-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">Accès Réservé</h2>
          <p className="text-gray-600 max-w-md mx-auto leading-relaxed mb-4">
            Le Cœur HUMĀN est un espace privilégié pour les membres les plus engagés.
            Continuez votre parcours pour débloquer cet accès.
          </p>
          <p className="text-sm text-orange-500 font-medium">Niveau requis : Connector ({XP_LEVELS.find(l => l.name === 'Connector')!.minXP} XP) ou HUMĀNISER</p>
          <p className="text-sm text-gray-500">Votre niveau actuel : {userLevel.name} ({userXp} XP)</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Le Cœur HUMĀN">
      <div className="text-center mb-8">
         <img 
            src="https://images.pexels.com/photos/261579/pexels-photo-261579.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1" // Image of an open door, a warm light, or a welcoming community space
            alt="Bienvenue au Coeur HUMĀN" 
            className="w-full max-w-sm h-auto object-contain rounded-lg mx-auto mb-4"
          />
        <HumanHeartIcon className="w-16 h-16 text-orange-500 mx-auto -mt-8 mb-2 relative z-10 bg-white p-2 rounded-full shadow-lg" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Bienvenue au Cœur de HUMĀN</h2>
        <p className="text-gray-600 max-w-lg mx-auto leading-relaxed">
          Cet espace est dédié à l'approfondissement, à la co-création et au mentorat.
          Votre engagement vous ouvre ces portes.
        </p>
      </div>

      <div className="space-y-6">
        <SectionItem
          title="Devenir Modérateur/Mentor"
          description="Proposez votre aide pour guider les nouveaux membres, animer des discussions ou co-animer des ateliers. Votre expérience est précieuse."
          actionText="En savoir plus"
          onAction={() => alert("Informations sur le rôle de Modérateur/Mentor (simulation).")}
        />
        <SectionItem
          title="Enregistrer des Capsules Audio"
          description="Partagez votre voix et vos réflexions en enregistrant des capsules audio introspectives pour la communauté (sous validation)."
          actionText="Proposer une capsule"
          onAction={() => alert("Soumettre une proposition de capsule audio (simulation).")}
        />
        <SectionItem
          title="Accès Exclusif"
          description="Participez à des masterclasses en ligne, des événements virtuels (et bientôt physiques), et recevez des goodies HUMĀN."
          actionText="Voir les exclusivités"
          onAction={() => alert("Calendrier des événements et goodies (simulation).")}
        />
        <SectionItem
          title="Co-création de Contenus"
          description="Contribuez activement à l'évolution de HUMĀN en proposant de nouveaux thèmes d'ateliers, des défis ou des fonctionnalités."
          actionText="Soumettre une idée"
          onAction={() => alert("Formulaire de proposition de contenu (simulation).")}
        />
      </div>
    </PageContainer>
  );
};

// Reusable SectionItem for this page
const SectionItem: React.FC<{title: string, description: string, actionText: string, onAction: () => void}> = 
({title, description, actionText, onAction}) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <h3 className="text-xl font-semibold text-orange-600 mb-2">{title}</h3>
    <p className="text-gray-600 mb-4 text-sm">{description}</p>
    <StyledButton onClick={onAction} variant="outline" size="sm">
      {actionText}
    </StyledButton>
  </div>
);

export default HumanHeartPage;