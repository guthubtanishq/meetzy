import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import MeshBackground from '../components/three/MeshBackground';
import { traitsList, getAnonymousId } from '../data/mockProfiles';

const steps = [
  { title: "Tell us about your mind", desc: "Select traits that describe your experience." },
  { title: "What are you looking for?", desc: "Choose how you prefer to interact today." },
  { title: "This is you", desc: "Your identity in this space is protected." }
];

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const { user, setUser, addTrait, removeTrait } = useUserStore();
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setUser({ id: getAnonymousId(), isOnboarded: true });
      navigate('/match');
    }
  };

  const toggleTrait = (trait) => {
    if (user.traits.includes(trait)) {
      removeTrait(trait);
    } else {
      addTrait(trait);
    }
  };

  return (
    <div className="relative min-h-screen bg-bg-base overflow-hidden pt-24">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <MeshBackground />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        <div className="flex gap-2 mb-12 justify-center">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 flex-1 rounded-full transition-all duration-700 ${i <= step ? 'bg-sage' : 'bg-white/5'}`} 
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col items-center text-center"
          >
            <h2 className="font-heading text-4xl mb-4">{steps[step].title}</h2>
            <p className="font-ui text-white/50 mb-12">{steps[step].desc}</p>

            {step === 0 && (
              <div className="flex flex-wrap gap-3 justify-center mb-12">
                {traitsList.map(trait => (
                  <motion.button
                    key={trait}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleTrait(trait)}
                    className={`px-6 py-2 rounded-full border text-sm font-ui transition-all duration-500 ${
                      user.traits.includes(trait) 
                        ? 'bg-lavender/10 border-lavender text-lavender' 
                        : 'border-white/5 text-white/40 hover:border-white/20'
                    }`}
                  >
                    {trait}
                  </motion.button>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-12">
                {['Listener', 'Talker', 'Mixed'].map(pref => (
                  <button
                    key={pref}
                    onClick={() => setUser({ supportPreference: pref })}
                    className={`p-8 rounded-3xl border transition-all duration-500 text-left ${
                      user.supportPreference === pref 
                        ? 'bg-sage/5 border-sage' 
                        : 'bg-bg-surface border-white/5'
                    }`}
                  >
                    <h3 className="font-heading text-xl mb-2">{pref}</h3>
                    <p className="text-xs text-white/40 leading-relaxed font-ui">
                      {pref === 'Listener' && "I'm here to offer a calm ear and support."}
                      {pref === 'Talker' && "I need to share and be heard right now."}
                      {pref === 'Mixed' && "I'm open to both listening and talking."}
                    </p>
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="mb-12">
                <div className="w-32 h-32 rounded-full glass flex items-center justify-center mb-8 mx-auto">
                    <svg width="60" height="60" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#7eb8a4" strokeWidth="2" strokeDasharray="10 5" />
                        <path d="M30,50 L70,50 M50,30 L50,70" stroke="#7eb8a4" strokeWidth="2" />
                    </svg>
                </div>
                <div className="font-mono text-xl tracking-[0.2em] text-sage bg-sage/5 px-6 py-3 rounded-xl inline-block mb-4">
                  IDENTIFYING...
                </div>
                <p className="text-xs text-white/30 font-mono">YOUR ANONYMOUS ID WILL BE GENERATED UPON ENTRY</p>
              </div>
            )}

            <button 
              onClick={handleNext}
              disabled={step === 0 && user.traits.length === 0}
              className="px-16 py-4 bg-bg-surface border border-white/10 rounded-full font-ui font-semibold hover:border-sage transition-all duration-500 disabled:opacity-30"
            >
              {step === steps.length - 1 ? "Assign Identity" : "Continue"}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
