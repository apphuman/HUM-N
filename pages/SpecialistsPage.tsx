import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FictionalSpecialistProfile, SpecialistCategory } from '../types';
import { MOCK_SPECIALISTS } from '../constants';
import PageContainer from '../components/PageContainer';
import SpecialistProfileModal from '../components/SpecialistProfileModal';
import StyledButton from '../components/StyledButton';
import { ArrowLeftIcon, AcademicCapIcon, LightBulbIcon, UsersIcon, SparklesIcon } from '../components/icons';

const SPECIALIST_CATEGORIES: { key: SpecialistCategory; title: string; icon: React.FC<any> }[] = [
  { key: 'therapies', title: 'Thérapies & Psychologie', icon: AcademicCapIcon },
  { key: 'coaching', title: 'Coaching & Développement Personnel', icon: LightBulbIcon },
  { key: 'relations', title: 'Relations & Famille', icon: UsersIcon },
  { key: 'bien-etre', title: 'Bien-être & Corps-Esprit', icon: SparklesIcon },
];

const SpecialistCard: React.FC<{ specialist: FictionalSpecialistProfile; onSelect: () => void; }> = ({ specialist, onSelect }) => {
  return (
    <div className="flex-shrink-0 w-72 bg-white rounded-xl shadow-lg border border-gray-200/80 overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
      <img src={specialist.imageUrl} alt={specialist.name} className="w-full h-40 object-cover" />
      <div className="p-5 flex flex-col items-center text-center flex-grow">
        <h4 className="font-bold text-lg text-gray-800">{specialist.name}</h4>
        <p className="text-sm text-orange-600 font-medium mb-3 h-10">{specialist.title}</p>
        <div className="flex flex-wrap justify-center gap-1 mb-4">
          {specialist.specialties.map(spec => (
            <span key={spec} className="text-xs font-semibold bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              {spec}
            </span>
          ))}
        </div>
        <StyledButton onClick={onSelect} variant="outline" className="mt-auto">
          Voir le profil
        </StyledButton>
      </div>
    </div>
  );
};

const SpecialistsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSpecialist, setSelectedSpecialist] = useState<FictionalSpecialistProfile | null>(null);

  const specialistsByCategory = useMemo(() => {
    return MOCK_SPECIALISTS.reduce((acc, specialist) => {
      const category = specialist.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(specialist);
      return acc;
    }, {} as Record<SpecialistCategory, FictionalSpecialistProfile[]>);
  }, []);

  return (
    <>
      <PageContainer
        title="Nos Spécialistes"
      >
        <p className="text-center text-gray-500 mb-8 -mt-2">
          Découvrez des profils de spécialistes fictifs, regroupés par domaine, pour illustrer les types d'accompagnements qui existent.
        </p>

        <div className="space-y-8">
          {SPECIALIST_CATEGORIES.map(category => (
            specialistsByCategory[category.key] && (
              <section key={category.key}>
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <category.icon className="w-6 h-6 mr-3 text-orange-500" />
                  {category.title}
                </h2>
                <div className="flex space-x-5 overflow-x-auto pb-4 -mb-4 -mx-6 px-6 scrollbar-hide">
                  {specialistsByCategory[category.key].map(specialist => (
                    <SpecialistCard
                      key={specialist.id}
                      specialist={specialist}
                      onSelect={() => setSelectedSpecialist(specialist)}
                    />
                  ))}
                  <div className="flex-shrink-0 w-1"></div> {/* Spacer */}
                </div>
              </section>
            )
          ))}
        </div>
        <div className="text-center mt-8">
            <StyledButton variant="secondary" onClick={() => navigate('/explorer')}>
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Retour à l'exploration
            </StyledButton>
        </div>
        <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
      </PageContainer>
      
      {selectedSpecialist && (
        <SpecialistProfileModal
          isOpen={!!selectedSpecialist}
          onClose={() => setSelectedSpecialist(null)}
          specialist={selectedSpecialist}
        />
      )}
    </>
  );
};

export default SpecialistsPage;