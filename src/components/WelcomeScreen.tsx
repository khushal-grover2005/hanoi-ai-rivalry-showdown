
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 1000);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center text-white bg-gradient-to-br from-[#0f0c29]/90 via-[#302b63]/85 to-[#24243e]/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      {/* Tower Icon */}
      <div className="mb-8">
        <svg width="140" height="140" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
          <rect width="64" height="64" fill="#1a1a2e" rx="4" />
          <rect x="28" y="12" width="8" height="36" fill="#e2e8f0" />
          <ellipse cx="32" cy="54" rx="22" ry="4" fill="#e2e8f0" opacity="0.8" />
          <rect x="18" y="42" width="28" height="6" rx="3" fill="#60a5fa" />
          <rect x="22" y="36" width="20" height="5" rx="2.5" fill="#818cf8" />
          <rect x="25" y="30" width="14" height="5" rx="2.5" fill="#a78bfa" />
          <rect x="28" y="24" width="8" height="4" rx="2" fill="#c4b5fd" />
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-300">Tower of Hanoi</h1>
      <h2 className="text-3xl font-semibold text-indigo-200 mb-4">AI vs AI Tutorial</h2>

      {/* Authors */}
      <div className="mt-6 mb-12 text-center">
        <h3 className="text-xl font-medium mb-3 text-indigo-300">Authors</h3>
        <p className="text-base text-white/90">Khushal Grover</p>
        <p className="text-base text-white/90">Prabhkanwal Singh</p>
        <p className="text-base text-white/90">Gurnoor Singh Pannu</p>
      </div>

      {/* Particle Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10 blur-sm"
            style={{
              width: Math.random() * 6 + 3 + 'px',
              height: Math.random() * 6 + 3 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;
