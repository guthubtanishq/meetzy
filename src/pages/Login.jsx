import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import useUserStore from '../store/userStore';
import MeshBackground from '../components/three/MeshBackground';
import PrivacyField from '../components/ui/PrivacyField';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUserStore();
  const [localState, setLocalState] = useState({
    alias: "", password: ""
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // In this anonymous platform, login might just be setting the state
    // For now, we simulate a successful login
    login({ ...localState, realName: "Returning User", age: 25, gender: "Other" });
    navigate('/match');
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
          <h1 className="font-heading text-5xl mb-4 text-[#2d3748]">Welcome Back</h1>
          <p className="font-body text-text-muted text-sm max-w-xs mx-auto leading-relaxed">
            Enter your credentials to reconnect with your journey.
          </p>
        </motion.div>

        <form onSubmit={handleLogin} className="space-y-8 glass p-12 rounded-[50px] border-white/60 shadow-2xl relative">
          <div className="space-y-8">
            <PrivacyField 
              label="Alias" 
              type="text"
              delay={0.1}
              value={localState.alias} 
              placeholder="Your unique alias"
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
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center gap-8 pt-6"
          >
            <button 
              type="submit"
              disabled={!localState.alias || !localState.password}
              className="w-full py-6 bg-[#2d3748] text-white rounded-[32px] font-body font-bold hover:bg-[#1a202c] transition-all duration-700 disabled:opacity-20 flex justify-center items-center gap-2 group shadow-2xl shadow-indigo-900/10"
            >
              Sign In
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <Link 
              to="/signup" 
              className="font-body text-xs text-text-muted hover:text-text-main transition-colors"
            >
              Don't have an account? <span className="font-bold text-sage">Sign up</span>
            </Link>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default Login;
