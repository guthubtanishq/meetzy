import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import IdentityRevealParticles from '../components/three/IdentityRevealParticles';
import { generateName } from '../utils/nameGenerator';

const IdentityReveal = () => {
  const navigate = useNavigate();
  const { traits, currentMood, setAnonymousId, anonymousId, setPublicInfo } = useUserStore();
  const [isRevealing, setIsRevealing] = useState(false);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (!anonymousId) {
      const newId = generateName(traits, currentMood);
      setAnonymousId(newId);
    }
    
    // Delayed revealing transition for maximum calm
    const timer = setTimeout(() => setIsRevealing(true), 2000);
    return () => clearTimeout(timer);
  }, [traits, currentMood, anonymousId]);

  useEffect(() => {
    if (isRevealing && anonymousId) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayText(anonymousId.slice(0, i));
        i++;
        if (i > anonymousId.length) clearInterval(interval);
      }, 150); // Slower, more deliberate reveal
      return () => clearInterval(interval);
    }
  }, [isRevealing, anonymousId]);

  const handleEnter = () => {
    setPublicInfo({ isOnboarded: true });
    navigate('/match');
  };

  const handleRegenerate = () => {
    const newId = generateName(traits, currentMood);
    setAnonymousId(newId);
    setDisplayText('');
    setIsRevealing(false);
    setTimeout(() => setIsRevealing(true), 800);
  };

  return (
    <div className="relative h-screen w-full bg-bg-base overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-mesh-soft opacity-30 z-0 pointer-events-none" />
      
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={1.5} />
          <IdentityRevealParticles active={isRevealing} />
        </Canvas>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <AnimatePresence>
          {!isRevealing ? (
            <motion.div
              key="analysing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sage font-accent text-[10px] tracking-[0.5em] uppercase animate-pulse"
            >
              Generating Mind-Signature...
            </motion.div>
          ) : (
            <motion.div
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center text-center"
            >
              <p className="font-body text-text-muted text-[10px] mb-8 uppercase tracking-[0.4em] font-semibold">
                Your Meetzy identity has been created
              </p>
              
              <div className="relative py-12 px-24">
                <div className="absolute inset-x-0 inset-y-0 bg-sage/5 rounded-full blur-[100px] opacity-10 animate-pulse" />
                <h1 className="font-heading text-6xl md:text-8xl text-sage relative z-10 transition-all duration-1000 text-glow-sage uppercase tracking-tighter">
                  {displayText}
                  <span className="w-1.5 h-12 md:h-16 bg-sage/20 ml-2 inline-block animate-pulse align-middle" />
                </h1>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="mt-16 flex flex-col items-center gap-10"
              >
                <p className="text-text-muted font-body text-sm max-w-xs leading-relaxed italic">
                  This is you on Meetzy. <br />
                  No one will ever know your real name.
                </p>

                <div className="flex flex-col gap-6">
                  <button
                    onClick={handleEnter}
                    className="px-24 py-6 bg-[#2d3748] text-white font-body font-bold rounded-[32px] hover:scale-105 transition-all shadow-2xl shadow-indigo-900/10"
                  >
                    Enter Meetzy →
                  </button>
                  <button
                    onClick={handleRegenerate}
                    className="text-[10px] font-accent text-text-muted hover:text-text-main uppercase tracking-[0.3em] font-semibold transition-colors"
                  >
                    Regenerate Name
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default IdentityReveal;
