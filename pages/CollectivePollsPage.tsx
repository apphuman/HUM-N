import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import StyledButton from '../components/StyledButton';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { UsersIcon } from '../components/icons/UsersIcon';

// Define a type for poll data to ensure type safety for vote calculations.
interface Poll {
  id: number;
  question: string;
  options: { id: string; text: string }[];
  results: Record<string, number>;
}

// Mock data for the poll
// FIX: Add explicit type 'Poll' to initialPollData to ensure type safety.
const initialPollData: Poll = {
  id: 1,
  question: "Quand vous sentez-vous le plus authentique ?",
  options: [
    { id: 'a', text: 'Seul(e), avec mes pensées' },
    { id: 'b', text: 'Avec mes amis très proches' },
    { id: 'c', text: 'Dans une activité créative' },
    { id: 'd', text: 'En pleine nature' },
  ],
  results: { a: 120, b: 250, c: 80, d: 150 }, // Initial vote counts
};

const CollectivePollsPage: React.FC = () => {
  const navigate = useNavigate();
  // Explicitly type the state with the 'Poll' interface to ensure type safety.
  // FIX: Explicitly type useState with 'Poll' to resolve type inference issues.
  const [poll, setPoll] = useState<Poll>(initialPollData);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  // With proper types, `reduce` is correctly inferred and totalVotes will be a number, fixing "Operator '+' cannot be applied to types 'unknown' and 'unknown'".
  const totalVotes = Object.values(poll.results).reduce((sum, count) => sum + count, 0);

  const handleVote = () => {
    if (!selectedOption) return;

    // Update the results in state
    setPoll(prevPoll => {
      const newResults = { ...prevPoll.results };
      // Type safety allows direct incrementation without casting.
      newResults[selectedOption]++;
      return { ...prevPoll, results: newResults };
    });
    setHasVoted(true);
  };

  return (
    <PageContainer>
      <div className="text-center mb-6">
        <UsersIcon className="w-12 h-12 text-teal-500 mx-auto mb-3" />
        <h1 className="text-2xl font-bold text-gray-800">Sondage Collectif</h1>
        <p className="text-sm text-gray-500 mt-1">Partagez votre perspective, anonymement.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 text-center mb-6">{poll.question}</h2>

        {hasVoted ? (
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-center text-gray-700 mb-2">Résultats de la communauté :</h3>
            {poll.options.map(option => {
              // With proper types, access is safer and no casting is needed.
              const votesForOption = poll.results[option.id];
              // This calculation now works because all variables are numbers, fixing "Operator '>' cannot be applied" and "right-hand side of an arithmetic operation must be of type 'any', 'number'..." errors.
              const percentage = totalVotes > 0 ? ((votesForOption / totalVotes) * 100).toFixed(1) : "0.0";
              const isSelected = option.id === selectedOption;

              return (
                <div key={option.id}>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className={`font-medium ${isSelected ? 'text-orange-600' : 'text-gray-700'}`}>{option.text}</span>
                    <span className={`font-semibold ${isSelected ? 'text-orange-600' : 'text-gray-600'}`}>{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full transition-all duration-500 ${isSelected ? 'bg-orange-500' : 'bg-teal-500'}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
             <p className="text-xs text-gray-500 text-center pt-4">Total de {totalVotes} votes.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {poll.options.map(option => (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={`w-full text-left p-4 border-2 rounded-lg transition-all duration-200 ${selectedOption === option.id ? 'bg-orange-100 border-orange-400' : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'}`}
              >
                {option.text}
              </button>
            ))}
            <StyledButton onClick={handleVote} fullWidth disabled={!selectedOption} className="mt-4">
              Soumettre mon vote
            </StyledButton>
          </div>
        )}
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

export default CollectivePollsPage;