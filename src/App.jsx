import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Nav from './components/layout/Nav';
import CustomCursor from './components/layout/CustomCursor';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import IdentityReveal from './pages/IdentityReveal';
import Match from './pages/Match';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Matches from './pages/Matches';
import Journal from './pages/Journal';
import NotFound from './pages/NotFound';
import './styles/globals.css';

function App() {
  const location = useLocation();

  return (
    <div className="relative">
      <CustomCursor />
      <Nav />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/identity" element={<IdentityReveal />} />
          <Route path="/match" element={<Match />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
