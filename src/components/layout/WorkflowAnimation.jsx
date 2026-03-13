import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquare, Sparkles } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import MoodOrb from '../three/MoodOrb';

const WorkflowAnimation = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStep(1), 3000), // Swipe
            setTimeout(() => setStep(2), 5000), // Match
            setTimeout(() => setStep(3), 8000), // Chat
            setTimeout(() => setStep(0), 13000), // Reset
        ];
        return () => timers.forEach(t => clearTimeout(t));
    }, [step === 0]);

    return (
        <div className="relative w-full max-w-[400px] aspect-[4/5] mx-auto">
            <AnimatePresence mode="wait">
                {step === 0 && (
                    <motion.div
                        key="profile"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.1, x: 200, rotate: 15 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 glass rounded-[40px] border-white/60 p-8 shadow-3xl flex flex-col items-center"
                    >
                        <div className="w-32 h-32 mb-8 bg-sage/5 rounded-full relative">
                            <Canvas camera={{ position: [0, 0, 5] }}>
                                <ambientLight intensity={1.5} />
                                <MoodOrb color="#8caf9f" />
                            </Canvas>
                            <motion.div 
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute inset-0 bg-sage/20 blur-2xl -z-10 rounded-full" 
                            />
                        </div>
                        
                        <h3 className="font-heading text-2xl text-[#2d3748] mb-2 uppercase tracking-widest font-bold">QuietOrbit</h3>
                        <div className="flex gap-2 mb-8">
                            <span className="px-3 py-1 bg-white/40 border border-white/60 rounded-full text-[8px] font-accent text-sage font-bold uppercase tracking-wider">Introvert</span>
                            <span className="px-3 py-1 bg-white/40 border border-white/60 rounded-full text-[8px] font-accent text-sage font-bold uppercase tracking-wider">Overthinker</span>
                        </div>
                        
                        <div className="w-full mt-auto space-y-3">
                            <div className="w-full h-1.5 bg-[#2d3748]/5 rounded-full" />
                            <div className="w-2/3 h-1.5 bg-[#2d3748]/5 rounded-full" />
                        </div>

                        <AnimatePresence>
                            {step === 0 && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute top-10 right-10 bg-green-400/20 text-green-600 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-400/30 opacity-0 group-hover:opacity-100"
                                >
                                    Like
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="match"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        className="absolute inset-0 flex items-center justify-center p-8 z-30"
                    >
                        <div className="glass rounded-[50px] border-white/80 p-10 shadow-4xl text-center relative overflow-hidden">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 bg-gradient-to-tr from-sage/10 to-transparent opacity-20"
                            />
                            <div className="relative z-10">
                                <Sparkles className="mx-auto mb-6 text-sage" size={32} />
                                <h3 className="font-heading text-xl text-[#2d3748] mb-4">You matched with<br /><span className="text-sage">CalmMind21</span></h3>
                                <p className="font-body text-[10px] text-text-muted uppercase tracking-widest font-bold">A shared energy found</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="chat"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute inset-0 glass rounded-[40px] border-white/60 p-8 shadow-3xl flex flex-col"
                    >
                        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-[#2d3748]/5">
                            <div className="w-10 h-10 rounded-full bg-sage/10" />
                            <div>
                                <h4 className="font-heading text-xs text-[#2d3748] tracking-widest font-bold uppercase">CalmMind21</h4>
                                <span className="text-[8px] text-sage font-bold uppercase tracking-tighter">Connected</span>
                            </div>
                        </div>

                        <div className="space-y-6 flex-1">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="max-w-[80%] bg-white/60 border border-white/80 p-4 rounded-2xl rounded-tl-none font-body text-[11px] text-[#2d3748] shadow-sm"
                            >
                                Hey, how was your day?
                            </motion.div>
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 2 }}
                                className="max-w-[80%] ml-auto bg-[#2d3748] p-4 rounded-2xl rounded-tr-none font-body text-[11px] text-white shadow-xl shadow-indigo-900/10"
                            >
                                Pretty calm today, just thinking a lot.
                            </motion.div>
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 3.5 }}
                                className="flex justify-start items-center gap-2"
                            >
                                <div className="w-1 h-1 bg-sage rounded-full animate-bounce" />
                                <div className="w-1 h-1 bg-sage rounded-full animate-bounce [animation-delay:0.2s]" />
                                <div className="w-1 h-1 bg-sage rounded-full animate-bounce [animation-delay:0.4s]" />
                            </motion.div>
                        </div>
                        
                        <div className="mt-auto pt-6 border-t border-[#2d3748]/5 flex items-center gap-4">
                            <div className="flex-1 h-10 bg-white/40 border border-white/60 rounded-full" />
                            <div className="w-10 h-10 bg-[#2d3748] rounded-full flex items-center justify-center text-white">
                                <Heart size={14} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Background Decorations */}
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-sage/10 blur-3xl rounded-full" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-lavender/10 blur-3xl rounded-full" />
        </div>
    );
};

export default WorkflowAnimation;
