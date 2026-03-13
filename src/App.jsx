import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Nav from './components/layout/Nav';
import CustomCursor from './components/layout/CustomCursor';
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Match from './pages/Match';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
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
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/match" element={<Match />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
