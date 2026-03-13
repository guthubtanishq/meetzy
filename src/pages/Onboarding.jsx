import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import MeshBackground from '../components/three/MeshBackground';

const traits = [
    { name: "Introvert", cat: "personality" },
    { name: "Overthinker", cat: "mind" },
    { name: "Social Anxiety", cat: "challenge" },
    { name: "Bipolar", cat: "challenge" },
    { name: "ADHD", cat: "mind" },
    { name: "Empath", cat: "personality" },
    { name: "High Sensitivity", cat: "personality" },
    { name: "Depression", cat: "challenge" },
    { name: "OCD", cat: "challenge" },
    { name: "PTSD", cat: "challenge" },
    { name: "Perfectionist", cat: "mind" },
    { name: "People Pleaser", cat: "personality" },
    { name: "Anxious Attachment", cat: "attachment" },
    { name: "Avoidant", cat: "attachment" },
    { name: "Highly Creative", cat: "mind" }
];

const moods = [
    { id: "Calm", shape: "M50,10 L90,90 L10,90 Z" },
    { id: "Heavy", shape: "M10,10 L90,10 L90,90 L10,90 Z" },
    { id: "Hopeful", shape: "M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10" },
    { id: "Numb", shape: "M10,50 L90,50" },
    { id: "Restless", shape: "M10,10 L30,90 L50,10 L70,90 L90,10" }
];

const Onboarding = () => {
    const navigate = useNavigate();
    const { 
        traits: userTraits, setTraits, 
        supportPreference, setSupport, 
        currentMood, setMood,
        setPublicInfo
    } = useUserStore();
    const [step, setStep] = useState(0);

    const toggleTrait = (name) => {
        if (userTraits.includes(name)) {
            setTraits(userTraits.filter(t => t !== name));
        } else {
            setTraits([...userTraits, name]);
        }
    };

    const handleComplete = () => {
        navigate('/identity');
    };

    return (
        <div className="relative min-h-screen bg-bg-base overflow-hidden pt-32 pb-20">
            <div className="absolute inset-0 bg-mesh-soft opacity-30 z-0 pointer-events-none" />
            <div className="absolute inset-0 z-0 opacity-40">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <ambientLight intensity={1.5} />
                    <MeshBackground />
                </Canvas>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6">
                <div className="flex gap-4 justify-center mb-16">
                    <div className={`w-10 h-1.5 rounded-full transition-all duration-700 ${step === 0 ? 'bg-sage scale-110 shadow-lg shadow-sage/20' : 'bg-[#2d3748]/5'}`} />
                    <div className={`w-10 h-1.5 rounded-full transition-all duration-700 ${step === 1 ? 'bg-sage scale-110 shadow-lg shadow-sage/20' : 'bg-[#2d3748]/5'}`} />
                </div>

                <AnimatePresence mode="wait">
                    {step === 0 ? (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            className="flex flex-col items-center"
                        >
                            <h2 className="font-heading text-4xl mb-3 text-[#2d3748]">How your mind works</h2>
                            <p className="text-text-muted text-sm mb-16 max-w-xs text-center leading-relaxed">Select traits that describe your current inner space.</p>

                            <div className="flex flex-wrap gap-4 justify-center mb-16 max-w-3xl">
                                {traits.map(t => (
                                    <motion.button
                                        key={t.name}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => toggleTrait(t.name)}
                                        className={`px-10 py-4 rounded-3xl border text-sm font-body transition-all duration-700 ${
                                            userTraits.includes(t.name) 
                                                ? 'bg-sage/15 border-sage/30 text-sage font-bold shadow-xl shadow-sage/5' 
                                                : 'bg-white/40 border-white/60 text-text-muted hover:border-text-muted/20 hover:bg-white/80'
                                        }`}
                                    >
                                        {t.name}
                                    </motion.button>
                                ))}
                            </div>

                            <div className="w-full h-[1px] bg-[#2d3748]/5 mb-16" />

                            <h3 className="font-heading text-2xl mb-8 text-[#2d3748]">Support Preference</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-20">
                                {['Listener', 'Talker', 'Mixed'].map(pref => (
                                    <button
                                        key={pref}
                                        onClick={() => setSupport(pref)}
                                        className={`p-12 rounded-[50px] border transition-all duration-1000 text-left relative overflow-hidden group shadow-2xl ${
                                            supportPreference === pref 
                                                ? 'bg-white border-sage/30 shadow-indigo-200/20' 
                                                : 'bg-white/40 border-white/60 hover:border-white hover:bg-white/60 shadow-transparent'
                                        }`}
                                    >
                                        <h4 className="font-heading text-2xl mb-3 text-[#2d3748]">{pref}</h4>
                                        <p className="text-xs text-text-muted leading-relaxed group-hover:text-[#2d3748] transition-colors">
                                            {pref === 'Listener' && "I prefer to listen and offer a calm ear to others."}
                                            {pref === 'Talker' && "I need space to share and feel heard today."}
                                            {pref === 'Mixed' && "I'm open to both listening and being heard."}
                                        </p>
                                    </button>
                                ))}
                            </div>

                            <button 
                                onClick={() => setStep(1)}
                                disabled={userTraits.length === 0}
                                className="px-20 py-6 bg-[#2d3748] text-white rounded-[32px] font-body font-bold hover:bg-[#1a202c] transition-all duration-700 disabled:opacity-20 shadow-2xl shadow-indigo-900/10"
                            >
                                Continue →
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center"
                        >
                            <h2 className="font-heading text-4xl mb-3 text-[#2d3748]">Current Mood</h2>
                            <p className="text-text-muted text-sm mb-16">Select an abstract shape that resonates now.</p>

                            <div className="flex flex-wrap gap-12 justify-center mb-16">
                                {moods.map(m => (
                                    <button
                                        key={m.id}
                                        onClick={() => setMood(m.id)}
                                        className="flex flex-col items-center gap-6 group"
                                    >
                                        <div className={`w-28 h-28 rounded-[40px] flex items-center justify-center transition-all duration-1000 ${
                                            currentMood === m.id ? 'bg-[#2d3748] scale-110 shadow-3xl shadow-indigo-900/20' : 'bg-white/40 hover:bg-white/80 border border-white/60'
                                        }`}>
                                            <svg width="48" height="48" viewBox="0 0 100 100">
                                                <path 
                                                    d={m.shape} 
                                                    fill="none" 
                                                    stroke={currentMood === m.id ? "#ffffff" : "#2d3748"} 
                                                    strokeWidth="6"
                                                    strokeLinecap="round"
                                                    className="transition-colors duration-1000" 
                                                />
                                            </svg>
                                        </div>
                                        <span className={`font-accent text-[10px] uppercase tracking-widest transition-opacity ${currentMood === m.id ? 'opacity-100 text-[#2d3748] font-bold' : 'opacity-20 group-hover:opacity-100'}`}>
                                            {m.id}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <div className="w-full space-y-3 mb-16 max-w-lg">
                                <label className="font-body text-xs text-text-muted uppercase tracking-[0.2em] px-2 font-semibold">Note (Stay Private)</label>
                                <textarea 
                                    placeholder="Anything else you want your match to know? (Only seen by matches)"
                                    className="w-full bg-white/40 border border-white/60 rounded-[40px] p-10 font-body text-sm min-h-[180px] focus:outline-none focus:border-sage/40 focus:bg-white/80 transition-all placeholder:text-text-muted/30 shadow-sm"
                                    onChange={e => setPublicInfo({ note: e.target.value })}
                                />
                            </div>

                            <div className="flex gap-6">
                                <button 
                                    onClick={() => setStep(0)}
                                    className="px-14 py-6 border border-[#2d3748]/10 rounded-full font-body text-text-muted/50 hover:text-text-main transition-all"
                                >
                                    Back
                                </button>
                                <button 
                                    onClick={handleComplete}
                                    className="px-20 py-6 bg-white text-[#2d3748] border border-white/60 font-body font-bold rounded-[32px] hover:scale-105 transition-all shadow-2xl shadow-indigo-100/30"
                                >
                                    Generate Identity →
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Onboarding;
