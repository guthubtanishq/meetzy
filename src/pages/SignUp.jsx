import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import MeshBackground from '../components/three/MeshBackground';
import PrivacyField from '../components/ui/PrivacyField';

const SignUp = () => {
  const navigate = useNavigate();
  const { login, realName, email, password, age, gender } = useUserStore();
  const [localState, setLocalState] = useState({
    realName, age, gender, email, password
  });

  const handleContinue = (e) => {
    e.preventDefault();
    login(localState);
    navigate('/onboarding');
  };

  return (
    <div className="relative min-h-screen bg-bg-base overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0 bg-mesh-soft opacity-40 z-0 pointer-events-none" />
      
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={1.5} />
          <MeshBackground />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-xl mx-auto px-6">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
        >
          <h1 className="font-heading text-5xl mb-4 text-[#2d3748]">Private Registration</h1>
          <p className="font-body text-text-muted text-sm max-w-xs mx-auto leading-relaxed">
            Tell us about you — this stays private forever.
          </p>
        </motion.div>

        <form onSubmit={handleContinue} className="space-y-8 glass p-12 rounded-[50px] border-white/60 shadow-2xl relative">
          <div className="space-y-8">
            <PrivacyField 
              label="Full Name" 
              value={localState.realName} 
              delay={0.1}
              placeholder="e.g. John Doe"
              onChange={e => setLocalState({...localState, realName: e.target.value})} 
            />
            
            <div className="grid grid-cols-2 gap-8">
              <PrivacyField 
                label="Age" 
                type="number"
                delay={0.15}
                value={localState.age || ''} 
                placeholder="Min 16"
                onChange={e => setLocalState({...localState, age: e.target.value})} 
              />
              <div className="space-y-3">
                <label className="font-body text-xs text-text-muted uppercase tracking-[0.15em] px-2">Gender</label>
                <div className="relative">
                    <select 
                        className="w-full bg-white/40 border border-white/60 rounded-3xl px-8 py-5 font-body text-sm text-[#2d3748] focus:outline-none focus:border-sage/40 appearance-none cursor-pointer hover:bg-white/80 transition-all shadow-sm"
                        value={localState.gender}
                        onChange={e => setLocalState({...localState, gender: e.target.value})}
                    >
                        <option value="" disabled>Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary">Non-binary</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                </div>
              </div>
            </div>

            <PrivacyField 
              label="Email Address" 
              type="email"
              delay={0.2}
              value={localState.email} 
              placeholder="you@example.com"
              onChange={e => setLocalState({...localState, email: e.target.value})} 
            />
            
            <PrivacyField 
              label="Secure Password" 
              type="password"
              delay={0.25}
              value={localState.password} 
              placeholder="••••••••"
              onChange={e => setLocalState({...localState, password: e.target.value})} 
            />
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center gap-8 pt-6"
          >
            <p className="text-[10px] font-accent text-text-muted/40 text-center leading-relaxed max-w-[280px]">
                Your real name will never appear to anyone on Meetzy. Ever. <br />
                Encryption active.
            </p>
            
            <button 
              type="submit"
              disabled={!localState.realName || !localState.email || !localState.password}
              className="w-full py-6 bg-[#2d3748] text-white rounded-[32px] font-body font-bold hover:bg-[#1a202c] transition-all duration-700 disabled:opacity-20 flex justify-center items-center gap-2 group shadow-2xl shadow-indigo-900/10"
            >
              Continue 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
