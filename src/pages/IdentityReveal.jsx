import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import IdentityRevealParticles from '../components/three/IdentityRevealParticles';
import { generateName } from '../utils/nameGenerator';

const IdentityReveal = () => {
  const navigate = useNavigate();
  const { traits, currentMood, setAnonymousId, anonymousId, setUser } = useUserStore();
  const [isRevealing, setIsRevealing] = useState(false);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (!anonymousId) {
      const newId = generateName(traits, currentMood);
      setAnonymousId(newId);
    }
    
    const timer = setTimeout(() => setIsRevealing(true), 1500);
    return () => clearTimeout(timer);
  }, [traits, currentMood, anonymousId]);

  useEffect(() => {
    if (isRevealing && anonymousId) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayText(anonymousId.slice(0, i));
        i++;
        if (i > anonymousId.length) clearInterval(interval);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isRevealing, anonymousId]);

  const handleEnter = () => {
    setUser({ isOnboarded: true });
    navigate('/match');
  };

  const handleRegenerate = () => {
    const newId = generateName(traits, currentMood);
    setAnonymousId(newId);
    setDisplayText('');
    setIsRevealing(false);
    setTimeout(() => setIsRevealing(true), 500);
  };

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={1} />
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
              className="text-white/20 font-mono text-sm tracking-[0.5em] uppercase animate-pulse"
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
              <p className="font-ui text-white/30 text-xs mb-8 uppercase tracking-[0.3em]">
                Your Meetzy identity has been created
              </p>
              
              <div className="relative py-12 px-20">
                <div className="absolute inset-x-0 inset-y-0 bg-sage rounded-full blur-[100px] opacity-10 animate-pulse" />
                <h1 className="font-mono text-6xl md:text-8xl text-sage relative z-10 transition-all duration-1000">
                  {displayText}
                  <span className="w-2 h-12 md:h-20 bg-sage ml-1 inline-block animate-pulse align-middle" />
                </h1>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-12 flex flex-col items-center gap-8"
              >
                <p className="text-white/40 font-ui text-sm max-w-xs leading-relaxed">
                  This is you on Meetzy. <br />
                  No one will ever know your real name.
                </p>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={handleEnter}
                    className="px-20 py-5 bg-sage text-bg-base font-ui font-bold rounded-full hover:scale-105 transition-all shadow-2xl shadow-sage/20"
                  >
                    Enter Meetzy →
                  </button>
                  <button
                    onClick={handleRegenerate}
                    className="text-[10px] font-mono text-white/20 uppercase tracking-widest hover:text-white transition-colors"
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
