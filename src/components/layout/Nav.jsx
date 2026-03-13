import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import useUserStore from '../../store/userStore';

const Nav = () => {
  const { user } = useUserStore();
  const location = useLocation();
  const isLanding = location.pathname === '/';

  if (isLanding) return null;

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center glass border-b-0"
    >
      <Link to="/" className="font-heading text-2xl tracking-tighter">Meetzy</Link>
      
      <div className="flex gap-8 items-center">
        <Link 
          to="/match" 
          className={`font-ui text-sm uppercase tracking-widest transition-colors ${location.pathname === '/match' ? 'text-sage' : 'text-white/50 hover:text-white'}`}
        >
          Matching
        </Link>
        <Link 
          to="/profile" 
          className={`font-ui text-sm uppercase tracking-widest transition-colors ${location.pathname === '/profile' ? 'text-sage' : 'text-white/50 hover:text-white'}`}
        >
          {user.id || 'Profile'}
        </Link>
      </div>
    </motion.nav>
  );
};

export default Nav;
