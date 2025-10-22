
import React, { useEffect, useState } from 'react';

interface LevelUpCelebrationProps {
  levelName: string;
}

const LevelUpCelebration: React.FC<LevelUpCelebrationProps> = ({ levelName }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3800); // Duration of the animation + a bit more
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center z-[1000] pointer-events-none"
        aria-live="assertive"
    >
      <div className="relative p-8 bg-gradient-to-br from-orange-400 via-red-400 to-amber-400 rounded-xl shadow-2xl text-center text-white transform transition-all duration-500 ease-out animate-celebratePopIn">
        <p className="text-2xl font-bold mb-2">Félicitations !</p>
        <p className="text-4xl font-extrabold mb-3 animate-celebrateTextPulse">
           🎉 {levelName} 🎉
        </p>
        <p className="text-lg">Tu as atteint un nouveau niveau !</p>
        
        {/* Simple particle-like effect */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-yellow-300 rounded-full animate-celebrateSparkle"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0.5}s`,
              opacity: Math.random() * 0.5 + 0.5,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes celebratePopIn {
          0% { transform: scale(0.5) translateY(50px); opacity: 0; }
          70% { transform: scale(1.1) translateY(0); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-celebratePopIn {
          animation: celebratePopIn 0.7s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
        }
        @keyframes celebrateTextPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); text-shadow: 0 0 10px rgba(255,255,255,0.7); }
        }
        .animate-celebrateTextPulse {
            animation: celebrateTextPulse 1.5s ease-in-out infinite;
            animation-delay: 0.5s;
        }
        @keyframes celebrateSparkle {
          0% { transform: translateY(0px) scale(0); opacity: 1; }
          80% { transform: translateY(-80px) scale(1); opacity: 1; }
          100% { transform: translateY(-100px) scale(0); opacity: 0; }
        }
        .animate-celebrateSparkle {
          animation: celebrateSparkle 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LevelUpCelebration;
