import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ParticleField from '../components/three/ParticleField';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-bg-base">
      {/* Soft Background Blobs */}
      <div className="absolute inset-0 bg-mesh-soft opacity-30 z-0 pointer-events-none" />
      
      {/* Three.js Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 2]}>
          <ambientLight intensity={1.5} />
          <ParticleField />
        </Canvas>
      </div>

      {/* Floating Elements (Visual Interest) */}
      <div className="absolute top-[20%] left-[10%] w-32 h-32 bg-sage/5 blur-[80px] rounded-full float-element opacity-40" />
      <div className="absolute bottom-[30%] right-[15%] w-48 h-48 bg-lavender/5 blur-[100px] rounded-full float-element opacity-40 delay-1000" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <div className="mb-6 inline-block font-accent text-[9px] uppercase tracking-[0.5em] text-sage/60 py-2 border-b border-sage/10">
            A Place of Empathy
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-6xl md:text-8xl mb-8 tracking-tighter text-[#2d3748] text-glow-sage"
        >
          Be Understood,<br />Not Judged
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="font-body text-md md:text-lg text-text-muted max-w-xl mb-16 leading-relaxed"
        >
          A personality-safe connection platform focusing on empathy, 
          psychological compatibility, and shared experience.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col md:flex-row gap-6"
        >
          <button 
            onClick={() => navigate('/signup')}
            className="px-14 py-5 bg-white text-[#2d3748] border border-white/50 rounded-full font-body font-bold hover:scale-105 transition-all duration-700 shadow-2xl shadow-indigo-100/30"
          >
            Create Account
          </button>
          <button 
            onClick={() => navigate('/match')}
            className="px-14 py-5 bg-sage/10 text-sage border border-sage/10 rounded-full font-body font-bold hover:bg-sage/15 transition-all duration-700"
          >
            Enter Guest
          </button>
        </motion.div>
      </div>

      {/* Footer Info */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-0 right-0 text-center font-accent text-[9px] uppercase tracking-[0.5em] text-text-muted opacity-40 pointer-events-none"
      >
        No Profile Pictures · No Real Names · No Popularity Metrics
      </motion.div>
    </div>
  );
};

export default Landing;
