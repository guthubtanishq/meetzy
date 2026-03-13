import { motion } from 'framer-motion';
import useUserStore from '../store/userStore';
import { generateName } from '../utils/nameGenerator';

const Profile = () => {
  const { anonymousId, setAnonymousId, traits, supportPreference, age, gender, currentMood } = useUserStore();

  const handleRegenerate = () => {
    setAnonymousId(generateName(traits, currentMood));
  };

  return (
    <div className="min-h-screen bg-bg-base pt-40 px-8 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-soft opacity-30 z-0 pointer-events-none" />
      
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-16"
        >
          <div className="w-48 h-48 rounded-[60px] glass border border-white/60 mx-auto flex items-center justify-center mb-10 relative group shadow-3xl shadow-indigo-100/20">
            <svg width="72" height="72" viewBox="0 0 100 100" className="text-sage opacity-40 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 3" />
              <path d="M50,15 Q85,50 50,85 Q15,50 50,15" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <div className="absolute inset-0 bg-sage rounded-[60px] opacity-10 blur-[80px] animate-pulse" />
          </div>

          <h1 className="font-heading text-5xl text-[#2d3748] mb-6 tracking-tighter text-glow-sage uppercase">{anonymousId || 'CalmTide12'}</h1>
          <button 
            onClick={handleRegenerate}
            className="text-[10px] font-accent uppercase tracking-[0.4em] text-text-muted hover:text-sage font-bold transition-all px-8 py-3 border border-sage/10 rounded-full hover:bg-sage/5"
          >
            Regenerate Identity
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-16"
        >
          <section className="glass border-white/60 p-12 rounded-[50px] shadow-2xl">
            <h3 className="font-heading text-2xl mb-8 text-[#2d3748]">Current Experience</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {traits.map(trait => (
                <span key={trait} className="px-8 py-3 rounded-2xl border border-[#2d3748]/5 bg-[#2d3748]/5 text-xs font-accent font-bold uppercase tracking-widest text-[#2d3748]/60 hover:bg-sage/10 hover:text-sage transition-all cursor-default">
                  {trait}
                </span>
              ))}
              {traits.length === 0 && <span className="opacity-20 italic font-body">No traits selected</span>}
            </div>
            
            <div className="mt-12 pt-12 border-t border-[#2d3748]/5">
                <h4 className="font-heading text-xl mb-4 text-[#2d3748]/80">Interaction Mode</h4>
                <div className="inline-block px-10 py-4 rounded-3xl bg-sage/10 border border-sage/20 text-sage font-body font-bold shadow-lg shadow-sage/10 capitalize">
                {supportPreference}
                </div>
            </div>
          </section>

          <section className="p-12 border border-[#2d3748]/5 rounded-[50px] bg-white/40">
            <h3 className="font-heading text-2xl mb-8 text-[#2d3748] opacity-60">Private Information</h3>
            <div className="flex justify-center gap-20 font-accent text-[11px] uppercase tracking-widest text-text-muted">
                <div className="flex flex-col gap-3">
                    <span className="opacity-50">Age</span>
                    <span className="text-[#2d3748] font-bold text-lg">{age || '--'}</span>
                </div>
                <div className="flex flex-col gap-3">
                    <span className="opacity-50">Gender</span>
                    <span className="text-[#2d3748] font-bold text-lg">{gender || '--'}</span>
                </div>
            </div>
          </section>

          <footer className="pt-20">
            <p className="font-accent text-[9px] uppercase tracking-[0.5em] text-text-muted/30 leading-relaxed max-w-sm mx-auto">
              Safe Space · Decentralized · Private <br />
              All data stored locally on your device.
            </p>
          </footer>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
