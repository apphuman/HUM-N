import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import StyledButton from '../components/StyledButton';
import { 
  EchosIcon, 
  AffinitiesIcon, 
  HeadphonesIcon,
  PencilSquareIcon,
  UsersIcon,
  AcademicCapIcon
} from '../components/icons';
import { IconProps } from '../types';

interface SectionCardProps {
  title: string;
  description: string;
  Icon: React.FC<IconProps>;
  image: string;
  actionText: string;
  link?: string;
  linkState?: object; // For passing state with navigate
  tags?: string[];
}

const SectionCard: React.FC<SectionCardProps> = ({ title, description, Icon, image, actionText, link, linkState, tags }) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (link) {
      navigate(link, { state: linkState });
    } else {
      alert("Cette fonctionnalité est en cours de développement et sera bientôt disponible !");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200/80 overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-36">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute top-2 left-2 p-2 bg-white/80 backdrop-blur-sm rounded-full">
          <Icon className="w-6 h-6 text-orange-500" />
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map(tag => (
              <span key={tag} className="text-xs font-semibold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
        <p className="text-sm text-gray-600 flex-grow mb-4">{description}</p>
        <StyledButton onClick={handleAction} variant="primary" className="mt-auto">
          {actionText}
        </StyledButton>
      </div>
    </div>
  );
};

const ExplorePage: React.FC = () => {
  const sections: SectionCardProps[] = [
    {
      title: "Échos & Introspection",
      description: "Prenez un moment chaque jour pour vous connecter à votre météo intérieure, partager vos réflexions et découvrir les résonances avec la communauté.",
      Icon: EchosIcon,
      image: "https://images.pexels.com/photos/3771110/pexels-photo-3771110.jpeg?auto=compress&cs=tinysrgb&w=600",
      actionText: "Ouvrir mes Échos",
      link: "/echos",
      tags: ["Journaling", "Réflexion", "Communauté"]
    },
    {
      title: "Affinités & Connexions",
      description: "Découvrez les profils avec qui vous partagez une résonance et engagez des conversations privées pour tisser des liens plus profonds.",
      Icon: AffinitiesIcon,
      image: "https://images.pexels.com/photos/1036808/pexels-photo-1036808.jpeg?auto=compress&cs=tinysrgb&w=600",
      actionText: "Voir mes Affinités",
      link: "/affinities",
      tags: ["Connexion", "Messages", "Partage"]
    },
    {
      title: "Capsules Audio",
      description: "Écoutez des méditations guidées, des réflexions sonores et des discussions apaisantes pour accompagner votre cheminement.",
      Icon: HeadphonesIcon,
      image: "https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=600",
      actionText: "Écouter les capsules",
      link: "/echos",
      linkState: { initialTab: 'capsulesaudio' },
      tags: ["Méditation", "Relaxation", "Inspiration"]
    },
    {
      title: "Micro-Défis Introspectifs",
      description: "Relevez de petits défis quotidiens ou hebdomadaires pour stimuler votre réflexion et ancrer de nouvelles habitudes positives.",
      Icon: PencilSquareIcon,
      image: "https://images.pexels.com/photos/414579/pexels-photo-414579.jpeg?auto=compress&cs=tinysrgb&w=600",
      actionText: "Voir les défis",
      link: "/micro-defis",
      tags: ["Habitudes", "Action", "Croissance"]
    },
    {
      title: "Sondages Collectifs",
      description: "Partagez votre opinion et découvrez les perspectives de la communauté sur des sujets d'introspection variés. Vos réponses sont anonymes.",
      Icon: UsersIcon,
      image: "https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=600",
      actionText: "Participer au Sondage",
      link: "/sondages-collectifs",
      tags: ["Communauté", "Partage", "Perspective"]
    },
    {
      title: "Nos Spécialistes",
      description: "Découvrez des profils de spécialistes fictifs pour illustrer les types d'accompagnements possibles et trouver l'inspiration.",
      Icon: AcademicCapIcon,
      image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600",
      actionText: "Découvrir les profils",
      link: "/specialistes",
      tags: ["Accompagnement", "Bien-être", "Professionnels"]
    },
  ];

  return (
    <PageContainer>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Explorer</h1>
        <p className="mt-2 max-w-2xl mx-auto text-md text-gray-500">
          Nourrissez votre esprit, relevez des défis introspectifs et connectez-vous avec la communauté.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map(section => (
          <SectionCard key={section.title} {...section} />
        ))}
      </div>
    </PageContainer>
  );
};

export default ExplorePage;