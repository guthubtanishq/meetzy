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
    { id: "Numb", shape: "M10,50 L90,50 J" }, // Note: simplified for display
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
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <ambientLight intensity={0.5} />
                    <MeshBackground />
                </Canvas>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6">
                <div className="flex gap-4 justify-center mb-16">
                    <div className={`w-2 h-2 rounded-full transition-all duration-500 ${step === 0 ? 'bg-sage scale-150' : 'bg-white/10'}`} />
                    <div className={`w-2 h-2 rounded-full transition-all duration-500 ${step === 1 ? 'bg-sage scale-150' : 'bg-white/10'}`} />
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
                            <h2 className="font-heading text-4xl mb-3">How your mind works</h2>
                            <p className="text-white/40 text-sm mb-12">Select traits that describe your experience.</p>

                            <div className="flex flex-wrap gap-4 justify-center mb-16 max-w-3xl">
                                {traits.map(t => (
                                    <motion.button
                                        key={t.name}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => toggleTrait(t.name)}
                                        className={`px-8 py-3 rounded-2xl border text-sm font-ui transition-all duration-500 ${
                                            userTraits.includes(t.name) 
                                                ? 'bg-lavender/10 border-lavender/40 text-lavender' 
                                                : 'bg-white/5 border-white/5 text-white/30 hover:border-white/20'
                                        }`}
                                    >
                                        {t.name}
                                    </motion.button>
                                ))}
                            </div>

                            <div className="w-full h-[1px] bg-white/5 mb-16" />

                            <h3 className="font-heading text-2xl mb-8">Support Preference</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-16">
                                {['Listener', 'Talker', 'Mixed'].map(pref => (
                                    <button
                                        key={pref}
                                        onClick={() => setSupport(pref)}
                                        className={`p-10 rounded-[40px] border transition-all duration-700 text-left relative overflow-hidden group ${
                                            supportPreference === pref 
                                                ? 'bg-sage/5 border-sage shadow-2xl shadow-sage/5' 
                                                : 'bg-white/5 border-white/5 hover:border-white/10'
                                        }`}
                                    >
                                        <h4 className="font-heading text-2xl mb-3">{pref}</h4>
                                        <p className="text-xs text-white/30 leading-relaxed group-hover:text-white/50 transition-colors">
                                            {pref === 'Listener' && "I prefer to listen and support others in their journey."}
                                            {pref === 'Talker' && "I need someone to hear me and hold space today."}
                                            {pref === 'Mixed' && "I can do both, depending on the need of the moment."}
                                        </p>
                                    </button>
                                ))}
                            </div>

                            <button 
                                onClick={() => setStep(1)}
                                disabled={userTraits.length === 0}
                                className="px-16 py-5 bg-bg-surface-light border border-white/10 rounded-full font-ui font-bold hover:border-sage transition-all duration-500 disabled:opacity-20"
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
                            <h2 className="font-heading text-4xl mb-3">Current Mood</h2>
                            <p className="text-white/40 text-sm mb-16">Select an abstract shape that resonates now.</p>

                            <div className="flex flex-wrap gap-12 justify-center mb-16">
                                {moods.map(m => (
                                    <button
                                        key={m.id}
                                        onClick={() => setMood(m.id)}
                                        className="flex flex-col items-center gap-6 group"
                                    >
                                        <div className={`w-24 h-24 rounded-[32px] flex items-center justify-center transition-all duration-700 ${
                                            currentMood === m.id ? 'bg-sage scale-110 shadow-3xl shadow-sage/20' : 'bg-white/5 hover:bg-white/10'
                                        }`}>
                                            <svg width="40" height="40" viewBox="0 0 100 100">
                                                <path 
                                                    d={m.shape} 
                                                    fill="none" 
                                                    stroke={currentMood === m.id ? "#0d0f14" : "currentColor"} 
                                                    strokeWidth="4"
                                                    strokeLinecap="round"
                                                    className="transition-colors duration-700" 
                                                />
                                            </svg>
                                        </div>
                                        <span className={`font-mono text-[10px] uppercase tracking-widest transition-opacity ${currentMood === m.id ? 'opacity-100 text-sage' : 'opacity-20 group-hover:opacity-100'}`}>
                                            {m.id}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <div className="w-full space-y-2 mb-16 max-w-lg">
                                <label className="font-ui text-xs text-white/40 uppercase tracking-widest px-1">Note (Optional)</label>
                                <textarea 
                                    placeholder="Anything else you want your match to know? (stays private)"
                                    className="w-full bg-white/5 border border-white/5 rounded-[32px] p-8 font-ui text-sm min-h-[160px] focus:outline-none focus:border-sage/30 transition-all placeholder:text-white/10"
                                    onChange={e => setPublicInfo({ note: e.target.value })}
                                />
                            </div>

                            <div className="flex gap-4">
                                <button 
                                    onClick={() => setStep(0)}
                                    className="px-12 py-5 border border-white/5 rounded-full font-ui text-white/40 hover:text-white transition-all"
                                >
                                    Back
                                </button>
                                <button 
                                    onClick={handleComplete}
                                    className="px-16 py-5 bg-white text-bg-base font-ui font-bold rounded-full hover:scale-105 transition-all shadow-2xl"
                                >
                                    Generate My Identity →
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
