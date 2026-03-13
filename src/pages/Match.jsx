import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MoodOrb from '../components/three/MoodOrb';
import { mockProfiles } from '../data/mockProfiles';

const Match = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-bg-base pt-32 pb-24 px-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-heading text-5xl mb-4"
                    >
                        People Who Might Understand You
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="font-ui text-white/40"
                    >
                        Based on your shared experiences and temperament.
                    </motion.p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockProfiles.map((profile, i) => (
                        <motion.div
                            key={profile.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative p-8 rounded-[40px] bg-bg-surface border border-white/5 hover:border-lavender/30 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <span className="font-mono text-xs tracking-widest text-sage py-1 px-3 bg-sage/5 rounded-md">
                                    {profile.id}
                                </span>
                                <div className="w-16 h-16 pointer-events-none">
                                    <Canvas>
                                        <ambientLight intensity={1} />
                                        <MoodOrb color={i % 2 === 0 ? "#9b8ec4" : "#7eb8a4"} />
                                    </Canvas>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {profile.traits.map(trait => (
                                    <span key={trait} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono text-white/50 uppercase tracking-tighter">
                                        {trait}
                                    </span>
                                ))}
                            </div>

                            <div className="mb-8 border-l-2 border-sage/10 pl-4 py-1">
                                <p className="font-ui text-xs text-white/40 italic leading-relaxed">
                                    "{profile.reason}"
                                </p>
                            </div>

                            <div className="flex items-center gap-2 mb-8 text-[10px] font-mono text-white/30 tracking-widest uppercase">
                                <div className={`w-1.5 h-1.5 rounded-full ${profile.preference === 'Listener' ? 'bg-sage' : 'bg-lavender'}`} />
                                {profile.preference}
                            </div>

                            <button 
                                onClick={() => navigate(`/chat/${profile.id}`)}
                                className="w-full py-4 rounded-3xl bg-white/5 border border-white/5 font-ui font-semibold text-sm group-hover:bg-white group-hover:text-bg-base transition-all duration-500"
                            >
                                Start Conversation
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Match;
