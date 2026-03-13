import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Heart, X, MessageSquare } from 'lucide-react';
import ParticleField from '../components/three/ParticleField';
import MoodOrb from '../components/three/MoodOrb';
import useUserStore from '../store/userStore';
import SignUpModal from '../components/auth/SignUpModal';

const SwipePreview = () => (
  <div className="relative w-40 h-52 hidden lg:block">
    <motion.div
      animate={{ 
        rotate: [0, 5, -5, 0],
        x: [0, 10, -10, 0],
        opacity: [1, 0.8, 1]
      }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0 glass rounded-3xl border-white/60 p-4 shadow-xl z-20 flex flex-col gap-2"
    >
      <div className="w-8 h-8 rounded-full bg-sage/20 mb-2" />
      <div className="w-12 h-2 bg-text-muted/10 rounded-full" />
      <div className="flex-1 border-l border-sage/20 pl-2 mt-2">
         <div className="w-full h-1 bg-sage/10 rounded-full mb-1" />
         <div className="w-3/4 h-1 bg-sage/10 rounded-full" />
      </div>
      <div className="flex justify-between items-center mt-auto">
        <X size={10} className="text-rose/40" />
        <Heart size={10} className="text-sage/40" fill="currentColor" />
      </div>
    </motion.div>
    <div className="absolute inset-0 glass rounded-3xl border-white/40 scale-95 translate-y-4 -z-10 opacity-40" />
  </div>
);

const FloatingAvatar = ({ delay = 0, x = 0, y = 0, color = "#9b8ec4" }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.3, 0.6, 0.3],
      scale: [0.8, 1, 0.8],
      x: [x - 20, x + 20, x - 20],
      y: [y - 20, y + 20, y - 20]
    }}
    transition={{ duration: 8 + Math.random() * 4, repeat: Infinity, delay }}
    className="absolute pointer-events-none z-10"
    style={{ left: `${50 + x}%`, top: `${50 + y}%` }}
  >
    <div className="w-24 h-24">
      <Canvas>
        <ambientLight intensity={1.5} />
        <MoodOrb color={color} />
      </Canvas>
    </div>
  </motion.div>
);

const Landing = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated, isOnboarded, logout } = useUserStore();

  useEffect(() => {
    if (isAuthenticated) {
      if (isOnboarded) navigate('/match');
      else navigate('/onboarding');
    }
  }, [isAuthenticated, isOnboarded, navigate]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-bg-base font-body">
      {/* 1. Immersive Background Layers */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-mesh-soft opacity-[0.15]" />
        
        {/* Animated Background Blobs */}
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-sage/10 blur-[150px] rounded-full"
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, -60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-lavender/10 blur-[180px] rounded-full"
        />

        {/* Three.js Particles */}
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 2]}>
          <ambientLight intensity={1.5} />
          <ParticleField />
        </Canvas>
      </div>

      {/* Floating Avatars around content */}
      <FloatingAvatar x={-35} y={-25} color="#8caf9f" delay={0.5} />
      <FloatingAvatar x={30} y={-20} color="#a3a6cc" delay={1.2} />
      <FloatingAvatar x={-25} y={30} color="#c2a38c" delay={2.4} />
      <FloatingAvatar x={40} y={25} color="#8cb9c2" delay={1.8} />

      {/* 2. Minimal Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-12 py-10 flex justify-between items-center bg-transparent">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-heading text-2xl tracking-tighter text-[#2d3748] cursor-pointer"
        >
          Meetzy
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-10 items-center"
        >
          {!isAuthenticated ? (
            <>
              <button 
                onClick={() => navigate('/login')}
                className="text-[11px] font-bold uppercase tracking-[0.3em] text-text-muted hover:text-text-main transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={() => setShowModal(true)}
                className="px-8 py-4 bg-white/40 backdrop-blur-md border border-white/60 rounded-full text-[11px] font-bold uppercase tracking-[0.3em] text-[#2d3748] hover:bg-white/80 transition-all shadow-lg"
              >
                Sign Up
              </button>
            </>
          ) : (
            <button 
              onClick={logout}
              className="text-[11px] font-bold uppercase tracking-[0.3em] text-rose hover:text-red-500 transition-colors"
            >
              Sign Out
            </button>
          )}
        </motion.div>
      </nav>

      {/* 3. Main Hero Content */}
      <main className="relative z-20 h-full w-full flex flex-col items-center justify-center px-6 text-center">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-32 w-full max-w-7xl mx-auto">
          
          <SwipePreview />

          <div className="max-w-3xl flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8 inline-block font-accent text-[10px] uppercase tracking-[0.6em] text-sage font-bold py-2 border-b border-sage/10"
            >
                A Place of Empathy
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="font-heading text-[38px] md:text-[60px] lg:text-[82px] mb-10 tracking-[0.02em] text-[#2F3A4A] leading-[1.15]"
            >
              <span className="font-medium opacity-80">Be Understood,</span><br />
              <span className="font-semibold text-[#1a202c]">Not Judged</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1.2 }}
              className="font-body text-md md:text-xl text-text-muted max-w-2xl mb-14 leading-relaxed font-light"
            >
              A personality-safe connection platform focusing on empathy, 
              psychological compatibility, and shared experience.
            </motion.p>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.8, duration: 1 }}
               className="flex flex-col items-center gap-10"
            >
                <button 
                  onClick={() => setShowModal(true)}
                  className="group relative px-20 py-7 bg-[#2d3748] text-white rounded-full font-body font-bold text-sm tracking-widest overflow-hidden hover:scale-105 transition-all duration-700 shadow-3xl shadow-indigo-900/30"
                >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                    <span className="relative z-10">Create Account</span>
                </button>

                <div className="flex flex-col items-center gap-3">
                   <p className="font-accent text-[9px] uppercase tracking-[0.5em] text-text-muted/40 font-bold">
                      No Profile Pictures · No Real Names · No Validation Metrics
                   </p>
                </div>
            </motion.div>
          </div>

          <div className="hidden lg:block rotate-12 scale-x-[-1] opacity-60">
             <SwipePreview />
          </div>
        </div>
      </main>

      {/* 4. Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-4 text-text-muted/20"
      >
          <span className="font-accent text-[8px] uppercase tracking-[0.5em]">Scroll to Explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="cursor-pointer hover:text-text-muted/40 transition-colors"
          >
            <ChevronDown size={24} />
          </motion.div>
      </motion.div>

      <SignUpModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onComplete={() => navigate('/onboarding')} 
      />
    </div>
  );
};

export default Landing;
