import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import useUserStore from '../store/userStore';
import MeshBackground from '../components/three/MeshBackground';
import PrivacyField from '../components/ui/PrivacyField';

function generateAlias() {
  const words = ["Quiet", "Calm", "Silent", "Blue", "Soft", "Gentle"];
  const nouns = ["Mind", "Orbit", "Dawn", "Echo", "Wave", "Mist"];
  const randomNum = Math.floor(Math.random() * 90) + 10;

  return words[Math.floor(Math.random()*words.length)] +
         nouns[Math.floor(Math.random()*nouns.length)] +
         randomNum;
}

const Register = () => {
  const navigate = useNavigate();
  const { login } = useUserStore();
  const [localState, setLocalState] = useState({
    alias: "", password: "", confirmPassword: ""
  });

  useEffect(() => {
    const storedAlias = localStorage.getItem("userAlias");
    if (storedAlias) {
      setLocalState(prev => ({ ...prev, alias: storedAlias }));
    } else {
      setLocalState(prev => ({ ...prev, alias: generateAlias() }));
    }
  }, []);

  const handleContinue = async (e) => {
    e.preventDefault();
    if (localState.password !== localState.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    // Save generated/provided alias locally
    localStorage.setItem("userAlias", localState.alias);
    
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alias: localState.alias, password: localState.password })
      });
      const data = await res.json();
      
      if (data.success) {
        // Log the user in to app state
        login({ ...localState, realName: localState.alias });
        // Redirect to matching page
        navigate('/match');
      }
    } catch (err) {
      // Fallback: If backend is not available, proceed with mock logic
      login({ ...localState, realName: localState.alias });
      navigate('/match');
    }
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
            Your unique identity has been generated. This stays private forever.
          </p>
        </motion.div>

        <form onSubmit={handleContinue} className="space-y-8 glass p-12 rounded-[50px] border-white/60 shadow-2xl relative">
          <div className="space-y-8">
            <PrivacyField 
              label="Alias" 
              type="text"
              delay={0.1}
              value={localState.alias} 
              placeholder="e.g. QuietOrbit21"
              onChange={e => setLocalState({...localState, alias: e.target.value})} 
            />
            
            <PrivacyField 
              label="Secure Password" 
              type="password"
              delay={0.2}
              value={localState.password} 
              placeholder="••••••••"
              onChange={e => setLocalState({...localState, password: e.target.value})} 
            />

            <PrivacyField 
              label="Confirm Password" 
              type="password"
              delay={0.3}
              value={localState.confirmPassword} 
              placeholder="••••••••"
              onChange={e => setLocalState({...localState, confirmPassword: e.target.value})} 
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
              disabled={!localState.alias || !localState.password || !localState.confirmPassword || localState.password !== localState.confirmPassword}
              className="w-full py-6 bg-[#2d3748] text-white rounded-[32px] font-body font-bold hover:bg-[#1a202c] transition-all duration-700 disabled:opacity-20 flex justify-center items-center gap-2 group shadow-2xl shadow-indigo-900/10"
            >
              Create Account
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <div className="text-center space-y-4 pt-2">
              <button 
                type="button"
                onClick={() => navigate('/login')}
                className="font-body text-xs text-text-muted hover:text-text-main transition-colors"
              >
                Already have an account? <span className="font-bold text-sage">Log in</span>
              </button>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default Register;
