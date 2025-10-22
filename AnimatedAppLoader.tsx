import React from 'react';

const AnimatedAppLoader: React.FC = () => {
  return (
    <div className="human-app-loader-container">
      <div className="human-logo-animated-loader" aria-label="HUMĀN Logo">
          <span className="font-bold tracking-tight">
            <span className="logo-hum text-stone-700">hum</span>
            <span className="logo-aa text-orange-500">ā</span>
            <span className="logo-n text-stone-700">n</span>
          </span>
      </div>
      <p className="loading-text">Chargement de votre univers HUMĀN...</p>
    </div>
  );
};

export default AnimatedAppLoader;