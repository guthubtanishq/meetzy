import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import useUserStore from '../../store/userStore';

const Nav = () => {
  const { anonymousId } = useUserStore();
  const location = useLocation();
  const isLanding = location.pathname === '/';

  if (isLanding) return null;

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-10 py-6 flex justify-between items-center bg-white/20 backdrop-blur-3xl border-b border-white/40"
    >
      <Link to="/" className="font-heading text-2xl tracking-tighter text-[#2d3748]">Meetzy</Link>
      
      <div className="flex gap-10 items-center">
        <Link 
          to="/match" 
          className={`font-body text-[11px] uppercase tracking-[0.3em] transition-all font-semibold ${location.pathname === '/match' ? 'text-sage' : 'text-text-muted hover:text-text-main'}`}
        >
          Orbit
        </Link>
        <Link 
          to="/journal" 
          className={`font-body text-[11px] uppercase tracking-[0.3em] transition-all font-semibold ${location.pathname === '/journal' ? 'text-sage' : 'text-text-muted hover:text-text-main'}`}
        >
          Journal
        </Link>
        <Link 
          to="/matches" 
          className={`font-body text-[11px] uppercase tracking-[0.3em] transition-all font-semibold ${location.pathname === '/matches' ? 'text-sage' : 'text-text-muted hover:text-text-main'}`}
        >
          Matches
        </Link>
        <Link 
          to="/profile" 
          className={`font-body text-[11px] uppercase tracking-[0.3em] transition-all font-semibold ${location.pathname === '/profile' ? 'text-sage' : 'text-text-muted hover:text-text-main'}`}
        >
          {anonymousId || 'Profile'}
        </Link>
      </div>
    </motion.nav>
  );
};

export default Nav;
