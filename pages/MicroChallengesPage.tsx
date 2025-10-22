import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import StyledButton from '../components/StyledButton';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { PencilSquareIcon, SparklesIcon } from '../components/icons';
import { MicroChallenge, UserProfile } from '../types';
import { generateMicroChallenge } from '../services/geminiService';
import LoadingSpinner from '../components/LoadingSpinner';

const challenges: MicroChallenge[] = [
  {
    id: 1,
    title: "Le Défi de la Gratitude",
    duration: "Quotidien (3 jours)",
    description: "Chaque jour, notez trois choses, aussi petites soient-elles, pour lesquelles vous êtes reconnaissant(e). L'objectif est de réorienter votre attention vers le positif.",
  },
  {
    id: 2,
    title: "La Pause Consciente",
    duration: "Hebdomadaire",
    description: "Une fois par jour cette semaine, prenez 5 minutes pour vous arrêter. Fermez les yeux, respirez profondément et observez simplement ce qui se passe en vous, sans jugement.",
  },
  {
    id: 3,
    title: "Le Geste Inattendu",
    duration: "Hebdomadaire",
    description: "Faites un petit geste de gentillesse inattendu pour quelqu'un d'autre cette semaine : un compliment sincère, un café offert, un message de soutien.",
  },
];

interface MicroChallengesPageProps {
  userProfile: UserProfile | null;
}

const MicroChallengesPage: React.FC<MicroChallengesPageProps> = ({ userProfile }) => {
  const navigate = useNavigate();
  const [aiChallenge, setAiChallenge] = useState<Omit<MicroChallenge, 'id'> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateChallenge = async () => {
    if (!userProfile) {
      setError("Profil utilisateur non disponible pour générer un défi personnalisé.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setAiChallenge(null);

    const result = await generateMicroChallenge(userProfile);
    if (result.challenge) {
      setAiChallenge(result.challenge);
    } else {
      setError(result.error);
    }
    setIsLoading(false);
  };

  return (
    <PageContainer>
        <div className="text-center mb-6">
            <PencilSquareIcon className="w-12 h-12 text-indigo-500 mx-auto mb-3" />
            <h1 className="text-2xl font-bold text-gray-800">Micro-Défis Introspectifs</h1>
            <p className="text-sm text-gray-500 mt-1">De petites actions pour de grandes réflexions.</p>
        </div>

        {/* AI Challenge Section */}
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-5 rounded-xl shadow-lg border border-indigo-200/50 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <SparklesIcon className="w-6 h-6 mr-2 text-indigo-500" />
                Ton Défi Personnalisé
            </h3>
            {isLoading ? (
                <div className="py-4"><LoadingSpinner /></div>
            ) : error ? (
                <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">{error}</p>
            ) : aiChallenge ? (
                <div className="bg-white p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="text-md font-bold text-gray-800">{aiChallenge.title}</h4>
                        <p className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">{aiChallenge.duration}</p>
                    </div>
                    <p className="text-sm text-gray-600">{aiChallenge.description}</p>
                     <StyledButton 
                        variant="primary" 
                        size="sm"
                        className="mt-4"
                        onClick={() => alert(`Défi "${aiChallenge.title}" accepté ! (simulation)`)}
                    >
                        Accepter ce défi
                    </StyledButton>
                </div>
            ) : (
                 <p className="text-sm text-gray-600 mb-4">Besoin d'inspiration ? Laisse notre IA te proposer un défi sur-mesure basé sur tes aspirations et ton état d'esprit du moment.</p>
            )}
            
            <StyledButton 
                onClick={handleGenerateChallenge} 
                disabled={isLoading}
                variant="secondary"
                className="mt-4 w-full"
            >
                {isLoading ? 'Génération en cours...' : (aiChallenge ? 'Générer un autre défi' : 'Générer mon défi')}
            </StyledButton>
        </div>

        <h3 className="text-lg font-semibold text-gray-700 mb-4 pt-4 border-t">Défis de la communauté</h3>
        <div className="space-y-5">
            {challenges.map(challenge => (
                <div key={challenge.id} className="bg-white p-5 rounded-xl shadow-lg border border-gray-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">{challenge.title}</h3>
                            <p className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full inline-block mt-1">{challenge.duration}</p>
                        </div>
                        <StyledButton 
                            variant="primary" 
                            onClick={() => alert(`Défi "${challenge.title}" commencé ! (simulation)`)}
                        >
                            Commencer le défi
                        </StyledButton>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">{challenge.description}</p>
                </div>
            ))}
        </div>

        <div className="text-center mt-8">
            <StyledButton variant="secondary" onClick={() => navigate('/explorer')}>
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Retour à l'exploration
            </StyledButton>
        </div>
    </PageContainer>
  );
};

export default MicroChallengesPage;