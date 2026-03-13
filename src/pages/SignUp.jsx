import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import MeshBackground from '../components/three/MeshBackground';
import PrivacyField from '../components/ui/PrivacyField';

const SignUp = () => {
  const navigate = useNavigate();
  const { setPrivateInfo, realName, email, password, age, gender } = useUserStore();
  const [localState, setLocalState] = useState({
    realName, age, gender, email, password
  });

  const handleContinue = (e) => {
    e.preventDefault();
    setPrivateInfo(localState);
    navigate('/onboarding');
  };

  return (
    <div className="relative min-h-screen bg-bg-base overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <MeshBackground />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-4xl mb-3 text-glow-sage">Private Registration</h1>
          <p className="font-ui text-white/40 text-sm">Tell us about you — this stays private forever.</p>
        </motion.div>

        <form onSubmit={handleContinue} className="space-y-8 glass p-10 rounded-[40px] border-white/5 shadow-2xl">
          <div className="space-y-6">
            <PrivacyField 
              label="Full Name" 
              value={localState.realName} 
              delay={0.1}
              placeholder="e.g. John Doe"
              onChange={e => setLocalState({...localState, realName: e.target.value})} 
            />
            
            <div className="grid grid-cols-2 gap-6">
              <PrivacyField 
                label="Age" 
                type="number"
                delay={0.2}
                value={localState.age || ''} 
                placeholder="Min 16"
                onChange={e => setLocalState({...localState, age: e.target.value})} 
              />
              <div className="space-y-2">
                <label className="font-ui text-xs text-white/40 uppercase tracking-widest px-1">Gender</label>
                <select 
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 font-ui text-sm text-white/80 focus:outline-none focus:border-sage/30 appearance-none cursor-pointer hover:bg-white/10 transition-all"
                  value={localState.gender}
                  onChange={e => setLocalState({...localState, gender: e.target.value})}
                >
                  <option value="" disabled className="bg-bg-surface">Select</option>
                  <option value="Male" className="bg-bg-surface">Male</option>
                  <option value="Female" className="bg-bg-surface">Female</option>
                  <option value="Non-binary" className="bg-bg-surface">Non-binary</option>
                  <option value="Prefer not to say" className="bg-bg-surface">Prefer not to say</option>
                </select>
              </div>
            </div>

            <PrivacyField 
              label="Email Address" 
              type="email"
              delay={0.3}
              value={localState.email} 
              placeholder="you@example.com"
              onChange={e => setLocalState({...localState, email: e.target.value})} 
            />
            
            <PrivacyField 
              label="Secure Password" 
              type="password"
              delay={0.4}
              value={localState.password} 
              placeholder="••••••••"
              onChange={e => setLocalState({...localState, password: e.target.value})} 
            />
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center gap-6 pt-4"
          >
            <p className="text-[10px] font-mono text-white/20 text-center leading-relaxed">
              Your real name will never appear to anyone on Meetzy. Ever. <br />
              Encryption active.
            </p>
            
            <button 
              type="submit"
              disabled={!localState.realName || !localState.email || !localState.password}
              className="w-full py-5 bg-bg-surface-light border border-white/10 rounded-3xl font-ui font-bold hover:border-sage hover:text-sage transition-all duration-500 disabled:opacity-20 flex justify-center items-center gap-2 group"
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
