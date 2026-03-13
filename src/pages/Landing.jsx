import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ParticleField from '../components/three/ParticleField';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-bg-base">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <ParticleField />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-6xl md:text-8xl mb-6 tracking-tight text-glow-sage"
        >
          Be Understood,<br />Not Judged
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-ui text-lg md:text-xl text-white/50 max-w-xl mb-12 leading-relaxed"
        >
          A personality-safe connection platform focusing on empathy, 
          psychological compatibility, and shared experience.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row gap-4"
        >
          <button 
            onClick={() => navigate('/signup')}
            className="px-12 py-4 bg-white text-bg-base border border-white/10 rounded-full font-ui font-bold hover:scale-105 transition-all duration-500 shadow-2xl shadow-sage/20"
          >
            Create Account
          </button>
          <button 
            onClick={() => navigate('/signup')}
            className="px-12 py-4 border border-white/5 rounded-full font-ui text-white/40 hover:text-white hover:border-white/10 transition-all font-semibold"
          >
            Sign In
          </button>
        </motion.div>
      </div>

      {/* Footer Info */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/20 pointer-events-none"
      >
        No Profile Pictures · No Real Names · No Validation Metrics
      </motion.div>
    </div>
  );
};

export default Landing;
