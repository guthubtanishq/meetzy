import { motion } from 'framer-motion';
import useUserStore from '../store/userStore';
import { getAnonymousId } from '../data/mockProfiles';

const Profile = () => {
  const { user, setUser } = useUserStore();

  const handleRegenerate = () => {
    setUser({ id: getAnonymousId() });
  };

  return (
    <div className="min-h-screen bg-bg-base pt-40 px-8">
      <div className="max-w-xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12"
        >
          <div className="w-40 h-40 rounded-full glass mx-auto flex items-center justify-center mb-8 relative group">
            <svg width="60" height="60" viewBox="0 0 100 100" className="opacity-40 group-hover:opacity-100 transition-opacity duration-1000">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
              <path d="M50,10 Q90,50 50,90 Q10,50 50,10" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
            <div className="absolute inset-0 bg-sage rounded-full opacity-5 blur-3xl animate-pulse" />
          </div>

          <h1 className="font-mono text-4xl text-sage mb-4">{user.id || 'CalmTide12'}</h1>
          <button 
            onClick={handleRegenerate}
            className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/20 hover:text-white transition-colors"
          >
            Regenerate Identity
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-12"
        >
          <section>
            <h3 className="font-heading text-xl mb-6">Current Experience</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {user.traits.map(trait => (
                <span key={trait} className="px-6 py-2 rounded-full border border-white/5 bg-white/5 text-sm font-ui text-white/50">
                  {trait}
                </span>
              ))}
              {user.traits.length === 0 && <span className="opacity-20 italic font-ui">No traits selected</span>}
            </div>
          </section>

          <section>
            <h3 className="font-heading text-xl mb-6">Interaction Preference</h3>
            <div className="inline-block px-8 py-3 rounded-2xl bg-bg-surface border border-white/5 text-sage font-ui">
              {user.supportPreference}
            </div>
          </section>

          <div className="pt-12 border-t border-white/5">
            <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/10 leading-relaxed">
              Safe Space · Decentralized · Private <br />
              All data stored locally on your device.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
