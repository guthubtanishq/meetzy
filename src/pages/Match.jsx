import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, X, Bookmark, MessageCircle } from 'lucide-react';
import MoodOrb from '../components/three/MoodOrb';
import { mockProfiles } from '../data/mockProfiles';
import useUserStore from '../store/userStore';

const SwipeCard = ({ profile, i, onSwipe, active }) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
    const heartOpacity = useTransform(x, [50, 150], [0, 1]);
    const xOpacity = useTransform(x, [-50, -150], [0, 1]);

    const handleDragEnd = (_, info) => {
        if (info.offset.x > 100) {
            onSwipe('right', profile);
        } else if (info.offset.x < -100) {
            onSwipe('left', profile);
        }
    };

    if (!active) return null;

    return (
        <motion.div
            style={{ x, rotate, opacity, zIndex: 50 - i }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 1.05 }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
            <div className="w-full h-full glass rounded-[60px] border-white/80 p-12 flex flex-col shadow-3xl shadow-indigo-100/30 overflow-hidden relative">
                {/* Visual Indicators */}
                <motion.div style={{ opacity: heartOpacity }} className="absolute top-10 right-10 z-20 bg-sage/20 p-4 rounded-full border border-sage/40 text-sage rotate-12">
                    <Heart size={32} fill="currentColor" />
                </motion.div>
                <motion.div style={{ opacity: xOpacity }} className="absolute top-10 left-10 z-20 bg-rose/20 p-4 rounded-full border border-rose/40 text-rose -rotate-12">
                    <X size={32} />
                </motion.div>

                {/* Card Content */}
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <span className="font-accent text-[10px] tracking-[0.3em] text-sage font-bold uppercase py-2 px-5 bg-sage/5 rounded-2xl">
                            {profile.id}
                        </span>
                        <div className="flex items-center gap-3 mt-6 text-[10px] font-accent text-text-muted/40 tracking-[0.2em] uppercase font-bold">
                            <div className={`w-2 h-2 rounded-full ${profile.preference === 'Listener' ? 'bg-sage' : 'bg-lavender'} animate-pulse`} />
                            {profile.preference}
                        </div>
                    </div>
                    <div className="w-24 h-24 pointer-events-none -mt-4 -mr-4">
                        <Canvas>
                            <ambientLight intensity={1.5} />
                            <MoodOrb color={i % 2 === 0 ? "#a3a6cc" : "#8caf9f"} />
                        </Canvas>
                    </div>
                </div>

                <div className="flex-1">
                    <h3 className="font-heading text-2xl text-[#2d3748] mb-8 opacity-40">Experiences & Traits</h3>
                    <div className="flex flex-wrap gap-3 mb-12">
                        {profile.traits.map(trait => (
                            <span key={trait} className="px-5 py-3 bg-white/60 border border-white rounded-2xl text-[10px] font-accent text-text-muted font-bold uppercase tracking-widest shadow-sm">
                                {trait}
                            </span>
                        ))}
                    </div>

                    <div className="border-l-2 border-sage/20 pl-8 py-4 mb-12">
                         <p className="font-body text-lg text-[#2d3748]/80 italic leading-relaxed">
                            "{profile.reason}"
                        </p>
                    </div>
                </div>

                <div className="pt-10 border-t border-[#2d3748]/5 flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <span className="font-accent text-[8px] uppercase tracking-widest text-text-muted/30">Current Mood</span>
                        <span className="font-body text-xs font-bold text-sage">Resilient & Open</span>
                    </div>
                    <div className="flex gap-4">
                        <button className="w-12 h-12 rounded-full border border-[#2d3748]/5 flex items-center justify-center text-text-muted/30 hover:text-text-main transition-colors">
                            <Bookmark size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Match = () => {
    const navigate = useNavigate();
    const { addMatch } = useUserStore();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMatchPopup, setShowMatchPopup] = useState(false);
    const [matchedProfile, setMatchedProfile] = useState(null);

    useEffect(() => {
        // Simulating data fetch for smoothness
        const timer = setTimeout(() => {
            setProfiles(mockProfiles || []);
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const handleSwipe = (direction, profile) => {
        if (direction === 'right') {
            const isMatch = profile.isAI ? true : Math.random() > 0.5;
            
            if (isMatch) {
                addMatch(profile);
                setMatchedProfile(profile);
                setShowMatchPopup(true);
            }
        }
        setCurrentIndex(prev => prev + 1);
    };

    return (
        <div className="min-h-screen bg-bg-base pt-32 pb-24 px-8 overflow-hidden relative flex flex-col items-center">
            <div className="absolute inset-0 bg-mesh-soft opacity-30 z-0 pointer-events-none" />
            
            <header className="text-center mb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-block font-accent text-[9px] uppercase tracking-[0.5em] text-sage/60 py-2 border-b border-sage/10 mb-8"
                >
                    Soul Alignment
                </motion.div>
                <h1 className="font-heading text-5xl md:text-6xl text-[#2d3748] tracking-tight">
                    People who truly <br />understand
                </h1>
            </header>

            {/* Card Stack */}
            <div className="relative w-full max-w-[500px] aspect-[4/5] z-10">
                <AnimatePresence>
                    {loading ? (
                        <motion.div 
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full h-full flex flex-col items-center justify-center text-center p-12 glass rounded-[60px]"
                        >
                            <div className="w-16 h-16 border-4 border-sage/10 border-t-sage rounded-full animate-spin mb-8" />
                            <h3 className="font-heading text-2xl text-[#2d3748] mb-4">Searching local orbit...</h3>
                            <p className="text-text-muted text-xs tracking-widest uppercase font-accent px-8">Connecting with compatible souls</p>
                        </motion.div>
                    ) : currentIndex < profiles.length ? (
                        <>
                            {/* Background Card (Shadow/Stack Effect) */}
                            {currentIndex + 1 < profiles.length && (
                                <motion.div
                                    key={`bg-${currentIndex + 1}`}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 0.3, scale: 0.95, y: 0 }}
                                    className="absolute inset-0 glass rounded-[60px] border-white/40 z-0"
                                />
                            )}
                            
                            <SwipeCard 
                                key={profiles[currentIndex].id}
                                profile={profiles[currentIndex]}
                                i={currentIndex}
                                onSwipe={handleSwipe}
                                active={true}
                            />
                        </>
                    ) : (
                        <motion.div 
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full h-full flex flex-col items-center justify-center text-center p-12 glass rounded-[60px]"
                        >
                            <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mb-8">
                                <Heart className="text-sage opacity-40" size={32} />
                            </div>
                            <h3 className="font-heading text-2xl text-[#2d3748] mb-4">Orbit is currently quiet</h3>
                            <p className="text-text-muted text-sm leading-relaxed mb-12">
                                No users available right now. <br />New souls arrive in the orbit every hour.
                            </p>
                            <button 
                                onClick={() => setCurrentIndex(0)}
                                className="px-12 py-4 border border-sage/20 text-sage font-body font-bold rounded-full hover:bg-sage/5 transition-all outline-none"
                            >
                                Refresh Orbit
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Controls */}
            {!loading && currentIndex < profiles.length && (
                <div className="mt-16 flex gap-12 relative z-10">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleSwipe('left', profiles[currentIndex])}
                        className="w-20 h-20 rounded-full glass border-white shadow-xl flex items-center justify-center text-rose hover:bg-rose/5 transition-colors"
                    >
                        <X size={28} />
                    </motion.button>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleSwipe('right', profiles[currentIndex])}
                        className="w-20 h-20 rounded-full glass border-white shadow-xl flex items-center justify-center text-sage hover:bg-sage/5 transition-colors"
                    >
                        <Heart size={28} fill="currentColor" />
                    </motion.button>
                </div>
            )}

            {/* Match Popup */}
            <AnimatePresence>
                {showMatchPopup && matchedProfile && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center px-6"
                    >
                        <div className="absolute inset-0 bg-[#2d3748]/20 backdrop-blur-md" />
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative w-full max-w-md bg-white rounded-[60px] p-12 text-center shadow-3xl"
                        >
                            <div className="w-20 h-20 bg-sage rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-sage/30">
                                <MessageCircle size={32} className="text-white" />
                            </div>
                            <h2 className="font-heading text-4xl text-[#2d3748] mb-6">Mutual Understanding</h2>
                            <p className="text-text-muted text-sm leading-relaxed mb-12">
                                You both might understand each other's experiences. <br />Would you like to start a respectful conversation?
                            </p>
                            <div className="flex flex-col gap-4">
                                <button 
                                    onClick={() => navigate(`/chat/${matchedProfile.id}`)}
                                    className="w-full py-6 bg-[#2d3748] text-white rounded-[32px] font-body font-bold shadow-2xl hover:bg-black transition-all"
                                >
                                    Start Conversation
                                </button>
                                <button 
                                    onClick={() => setShowMatchPopup(false)}
                                    className="w-full py-6 border border-[#2d3748]/5 text-text-muted rounded-[32px] font-body font-bold hover:bg-bg-base transition-all"
                                >
                                    Maybe Later
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <footer className="mt-auto pt-16 font-accent text-[8px] uppercase tracking-[0.4em] text-text-muted/30 relative z-10 pointer-events-none">
                Safety First · No Judgment · Peer Support
            </footer>
        </div>
    );
};

export default Match;
