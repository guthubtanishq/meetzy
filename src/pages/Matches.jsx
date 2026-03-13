import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { MessageSquare, Heart, Search } from 'lucide-react';
import useUserStore from '../store/userStore';
import MoodOrb from '../components/three/MoodOrb';

const Matches = () => {
    const navigate = useNavigate();
    const { matches } = useUserStore();

    return (
        <div className="min-h-screen bg-bg-base pt-40 pb-24 px-8 overflow-hidden relative">
            <div className="absolute inset-0 bg-mesh-soft opacity-20 z-0 pointer-events-none" />
            
            <div className="max-w-6xl mx-auto relative z-10">
                <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-block font-accent text-[9px] uppercase tracking-[0.5em] text-sage/60 py-2 border-b border-sage/10 mb-8"
                        >
                            Mutual Understandings
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-heading text-6xl text-[#2d3748] tracking-tight"
                        >
                            Your Matches
                        </motion.h1>
                    </div>

                    <div className="relative group max-w-xs w-full">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted/30 group-focus-within:text-sage transition-colors" size={18} />
                        <input 
                            placeholder="Find a soul..."
                            className="w-full bg-white/40 border border-white/60 rounded-full pl-16 pr-8 py-4 font-body text-sm focus:outline-none focus:border-sage/40 transition-all placeholder:text-text-muted/20 shadow-sm"
                        />
                    </div>
                </header>

                <AnimatePresence mode="popLayout">
                    {matches.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {matches.map((profile, i) => (
                                <motion.div
                                    key={profile.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                    className="group relative p-10 rounded-[50px] bg-white border border-white/80 hover:border-sage/20 transition-all duration-700 shadow-3xl shadow-indigo-100/10"
                                >
                                    <div className="flex justify-between items-start mb-10">
                                        <div className="flex flex-col gap-2">
                                            <span className="font-accent text-[10px] tracking-[0.2em] text-sage font-bold uppercase py-2 px-4 bg-sage/5 rounded-xl self-start">
                                                {profile.id}
                                            </span>
                                            <div className="flex items-center gap-2 text-[8px] font-accent text-sage/60 uppercase tracking-widest mt-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
                                                Active Connection
                                            </div>
                                        </div>
                                        <div className="w-20 h-20 pointer-events-none">
                                            <Canvas>
                                                <ambientLight intensity={1.5} />
                                                <MoodOrb color={i % 2 === 0 ? "#a3a6cc" : "#8caf9f"} />
                                            </Canvas>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-10">
                                        {profile.traits.slice(0, 3).map(trait => (
                                            <span key={trait} className="px-4 py-2 bg-text-muted/5 rounded-2xl text-[9px] font-accent text-text-muted font-bold uppercase tracking-widest">
                                                {trait}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mb-10 flex gap-4 items-center">
                                        <div className="text-[10px] font-accent text-text-muted/40 tracking-[0.2em] uppercase font-bold">
                                            Mood: <span className="text-sage">Resilient</span>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => navigate(`/chat/${profile.id}`)}
                                        className="w-full py-5 rounded-[28px] bg-[#2d3748] text-white font-body font-bold text-sm hover:bg-black transition-all duration-700 shadow-xl shadow-indigo-900/10 flex items-center justify-center gap-3 group"
                                    >
                                        <MessageSquare size={16} className="group-hover:scale-110 transition-transform" />
                                        Start Conversation
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full py-32 flex flex-col items-center justify-center text-center glass rounded-[60px] border-white/60"
                        >
                            <div className="w-24 h-24 bg-sage/5 rounded-full flex items-center justify-center mb-10">
                                <Heart className="text-sage opacity-20" size={40} />
                            </div>
                            <h3 className="font-heading text-3xl text-[#2d3748] mb-4">No matches yet</h3>
                            <p className="text-text-muted text-sm max-w-xs mx-auto leading-relaxed mb-12">
                                Continue exploring profiles in the orbit to find someone who understands your journey.
                            </p>
                            <button 
                                onClick={() => navigate('/match')}
                                className="px-16 py-6 bg-[#2d3748] text-white rounded-full font-body font-bold hover:scale-105 transition-all shadow-2xl"
                            >
                                Explorer Orbit
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <footer className="mt-20 pt-20 border-t border-[#2d3748]/5 text-center">
                <p className="font-accent text-[8px] uppercase tracking-[0.4em] text-text-muted/20">
                    Shared Wisdom · Safe Spaces · Personal Growth
                </p>
            </footer>
        </div>
    );
};

export default Matches;
