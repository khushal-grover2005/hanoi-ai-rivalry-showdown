
import React, { useState } from 'react';
import TowerCompetition from '@/components/TowerCompetition';
import WelcomeScreen from '@/components/WelcomeScreen';

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showWelcome && <WelcomeScreen onComplete={handleWelcomeComplete} />}
      <TowerCompetition />
    </div>
  );
};

export default Index;
