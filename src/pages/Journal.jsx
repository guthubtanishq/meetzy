import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { PenLine, Calendar, ChevronRight, Plus, Sparkles, Heart } from 'lucide-react';
import useUserStore from '../store/userStore';
import MeshBackground from '../components/three/MeshBackground';

const prompts = [
    "What's one thing that made you feel safe today?",
    "Describe a small win that others might have missed.",
    "If your mind was a weather pattern right now, what would it be?",
    "What is a thought you've been carrying that you'd like to put down?",
    "Write a short letter of appreciation to a future version of yourself."
];

const JournalEntry = ({ entry, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="glass p-8 rounded-[40px] border-white/60 mb-6 hover:translate-x-2 transition-transform duration-500 cursor-pointer group shadow-xl shadow-indigo-100/10"
    >
        <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${
                    entry.mood === 'Calm' ? 'bg-sage' : 
                    entry.mood === 'Low' ? 'bg-lavender' : 
                    'bg-amber'
                } animate-pulse`} />
                <span className="font-accent text-[10px] text-text-muted/40 uppercase tracking-[0.2em] font-bold">
                    {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
            </div>
            <Sparkles size={14} className="text-sage/30 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <h4 className="font-heading text-lg text-[#2d3748] mb-3 group-hover:text-sage transition-colors">{entry.prompt}</h4>
        <p className="font-body text-sm text-text-muted leading-relaxed line-clamp-3">
            {entry.content}
        </p>
    </motion.div>
);

const Journal = () => {
    const { journalEntries, addJournalEntry, currentMood } = useUserStore();
    const [isWriting, setIsWriting] = useState(false);
    const [content, setContent] = useState("");
    const [activePrompt, setActivePrompt] = useState("");

    useEffect(() => {
        setActivePrompt(prompts[Math.floor(Math.random() * prompts.length)]);
    }, [isWriting]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        addJournalEntry({
            id: Date.now(),
            date: new Date().toISOString(),
            content,
            prompt: activePrompt,
            mood: currentMood
        });

        setContent("");
        setIsWriting(false);
    };

    return (
        <div className="min-h-screen bg-bg-base pt-40 pb-24 px-8 overflow-hidden relative">
            <div className="absolute inset-0 bg-mesh-soft opacity-30 z-0 pointer-events-none" />
            
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <ambientLight intensity={1.5} />
                    <MeshBackground />
                </Canvas>
            </div>

            <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Left: Branding & Action */}
                <div className="lg:col-span-5">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="sticky top-40"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-block font-accent text-[9px] uppercase tracking-[0.5em] text-sage/60 py-2 border-b border-sage/10 mb-8"
                        >
                            Private Journal
                        </motion.div>
                        <h1 className="font-heading text-6xl text-[#2d3748] mb-8 leading-[1.1]">
                            Journal
                        </h1>
                        <p className="font-body text-text-muted text-sm max-w-sm mb-12 leading-relaxed">
                            A private space for your thoughts. Encrypted and stored locally.
                        </p>

                        {!isWriting ? (
                            <button 
                                onClick={() => setIsWriting(true)}
                                className="group flex items-center gap-6 px-12 py-6 bg-white text-[#2d3748] rounded-[32px] font-body font-bold shadow-2xl shadow-indigo-100/40 hover:scale-105 transition-all duration-700 border border-white/60"
                            >
                                <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center text-white shadow-xl shadow-sage/20 group-hover:rotate-12 transition-transform">
                                    <PenLine size={18} />
                                </div>
                                Start New Entry
                            </button>
                        ) : (
                            <div className="space-y-8 glass p-10 rounded-[50px] border-white/80 shadow-3xl shadow-indigo-100/20">
                                <div className="flex items-center gap-3 font-accent text-[9px] text-sage font-bold uppercase tracking-widest">
                                    <Sparkles size={14} className="animate-pulse" />
                                    Daily Reflection Prompt
                                </div>
                                <h3 className="font-heading text-xl text-[#2d3748] italic leading-relaxed">
                                    "{activePrompt}"
                                </h3>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Right: Input & History */}
                <div className="lg:col-span-7">
                    <AnimatePresence mode="wait">
                        {isWriting ? (
                            <motion.form 
                                key="writing-form"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                onSubmit={handleSubmit}
                                className="space-y-8"
                            >
                                <textarea 
                                    autoFocus
                                    placeholder="Begin typing here..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full bg-white/40 border-2 border-white/80 rounded-[50px] p-12 font-body text-lg text-[#2d3748] min-h-[450px] focus:outline-none focus:border-sage/40 focus:bg-white/80 transition-all placeholder:text-text-muted/20 shadow-inner"
                                />
                                <div className="flex gap-4 justify-end">
                                    <button 
                                        type="button"
                                        onClick={() => setIsWriting(false)}
                                        className="px-10 py-5 font-body text-sm text-text-muted hover:text-[#2d3748] transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        disabled={!content.trim()}
                                        className="px-16 py-5 bg-[#2d3748] text-white rounded-full font-body font-bold shadow-2xl hover:bg-black transition-all disabled:opacity-20"
                                    >
                                        Save Entry
                                    </button>
                                </div>
                            </motion.form>
                        ) : (
                            <motion.div 
                                key="history"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-12"
                            >
                                <div className="flex items-center justify-between px-4">
                                    <h3 className="font-heading text-2xl text-[#2d3748]">Past Reflections</h3>
                                    <div className="flex items-center gap-2 text-[10px] font-accent text-text-muted/40 tracking-widest uppercase font-bold">
                                        <Calendar size={12} />
                                        {journalEntries.length} Entries
                                    </div>
                                </div>

                                {journalEntries.length > 0 ? (
                                    <div className="space-y-6">
                                        {journalEntries.map((entry, i) => (
                                            <JournalEntry key={entry.id} entry={entry} index={i} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-32 flex flex-col items-center justify-center text-center glass rounded-[60px] border-white/60">
                                        <div className="w-20 h-20 bg-sage/5 rounded-full flex items-center justify-center mb-10">
                                            <Sparkles className="text-sage opacity-20" size={32} />
                                        </div>
                                        <h3 className="font-heading text-2xl text-[#2d3748] mb-4">Your journal is empty</h3>
                                        <p className="text-text-muted text-sm max-w-xs mx-auto leading-relaxed">
                                            Start your journey by capturing your first reflection.
                                        </p>
                                    </div>
                                )}

                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Journal;
