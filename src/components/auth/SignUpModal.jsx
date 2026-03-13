import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import useUserStore from '../../store/userStore';
import PrivacyField from '../ui/PrivacyField';

const SignUpModal = ({ isOpen, onClose, onComplete }) => {
  const { login } = useUserStore();
  const [localState, setLocalState] = useState({
    realName: "", age: null, gender: "", email: "", password: ""
  });

  const handleContinue = (e) => {
    e.preventDefault();
    login(localState);
    onComplete();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center px-6"
      >
        <div className="absolute inset-0 bg-[#2d3748]/40 backdrop-blur-md" onClick={onClose} />
        
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="relative w-full max-w-xl bg-bg-base rounded-[60px] p-12 shadow-4xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-mesh-soft opacity-20 pointer-events-none" />
          
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-text-muted hover:text-text-main transition-colors z-20"
          >
            <X size={24} />
          </button>

          <div className="relative z-10">
            <div className="text-center mb-10">
              <h2 className="font-heading text-4xl text-[#2d3748] mb-4">Peaceful Entry</h2>
              <p className="font-body text-text-muted text-sm max-w-xs mx-auto">
                Tell us about you — this stays private forever.
              </p>
            </div>

            <form onSubmit={handleContinue} className="space-y-6">
              <PrivacyField 
                label="Full Name" 
                value={localState.realName} 
                placeholder="e.g. John Doe"
                onChange={e => setLocalState({...localState, realName: e.target.value})} 
              />
              
              <div className="grid grid-cols-2 gap-6">
                <PrivacyField 
                  label="Age" 
                  type="number"
                  value={localState.age || ''} 
                  placeholder="Min 16"
                  onChange={e => setLocalState({...localState, age: e.target.value})} 
                />
                <div className="space-y-2">
                  <label className="font-body text-[10px] text-text-muted uppercase tracking-widest px-2">Gender</label>
                  <select 
                    className="w-full bg-white/60 border border-white/80 rounded-2xl px-6 py-4 font-body text-sm text-[#2d3748] focus:outline-none appearance-none cursor-pointer"
                    value={localState.gender}
                    onChange={e => setLocalState({...localState, gender: e.target.value})}
                  >
                    <option value="" disabled>Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <PrivacyField 
                label="Email Address" 
                type="email"
                value={localState.email} 
                placeholder="you@example.com"
                onChange={e => setLocalState({...localState, email: e.target.value})} 
              />
              
              <PrivacyField 
                label="Password" 
                type="password"
                value={localState.password} 
                placeholder="••••••••"
                onChange={e => setLocalState({...localState, password: e.target.value})} 
              />

              <button 
                type="submit"
                disabled={!localState.realName || !localState.email || !localState.password}
                className="w-full py-5 bg-[#2d3748] text-white rounded-[30px] font-body font-bold hover:bg-black transition-all shadow-xl disabled:opacity-20 mt-4"
              >
                Continue to Meetzy
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SignUpModal;
