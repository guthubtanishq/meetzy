import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowLeft, Info, MessageSquare } from 'lucide-react';
import useUserStore from '../store/userStore';
import { mockProfiles } from '../data/mockProfiles';
import { generateAIResponse } from '../utils/aiEngine';

const Chat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentMood } = useUserStore();
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef();

  const botProfile = mockProfiles.find(p => p.id === id && p.isAI);

  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello. I see we match based on similar experiences.", 
      sender: "other", 
      time: "Just now" 
    }
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    const newMsg = { 
      id: Date.now(), 
      text: userMessage, 
      sender: 'me', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };

    setMessages(prev => [...prev, newMsg]);
    setInput("");

    // AI logic
    if (botProfile) {
      const typingTime = 1500 + Math.random() * 2000;
      
      setTimeout(() => {
        setIsTyping(true);
        
        setTimeout(() => {
          const aiText = generateAIResponse(botProfile.id, userMessage, currentMood);
          const aiMsg = {
            id: Date.now(),
            text: aiText,
            sender: 'other',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, aiMsg]);
          setIsTyping(false);
        }, 1000 + Math.random() * 1500);
      }, 500);
    }
  };

  return (
    <div className="h-screen w-full bg-bg-base flex flex-col pt-24 overflow-hidden relative">
      <div className="absolute inset-0 bg-mesh-soft opacity-20 z-0 pointer-events-none" />
      
      {/* Header */}
      <div className="px-10 py-8 border-b border-white/60 bg-white/40 backdrop-blur-3xl flex justify-between items-center relative z-10">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/matches')} className="text-text-muted hover:text-text-main transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="font-heading text-xl text-[#2d3748] tracking-widest font-bold uppercase">{id}</h1>
            <div className="flex items-center gap-2 text-[9px] font-accent text-text-muted/40 uppercase tracking-widest mt-1 font-bold">
              <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
              Connected Moments Ago
            </div>
          </div>
        </div>
        <button className="text-text-muted/40 hover:text-text-main transition-colors">
          <Info size={20} />
        </button>
      </div>

      {/* Shared Space Placeholder */}
      <div className="px-10 py-6 bg-sage/5 border-b border-sage/10 relative z-10 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-white/20 blur-[60px]" />
            <p className="font-body text-[10px] text-sage font-bold tracking-[0.2em] relative z-10 flex items-center gap-3 uppercase">
                Encryption active. Safety first.
            </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-10 py-12 space-y-8 relative z-10 scroll-smooth">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div 
              key={m.id}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="max-w-[70%] space-y-2">
                <div className={`px-10 py-5 rounded-[32px] font-body text-sm shadow-2xl ${
                  m.sender === 'me' 
                    ? 'bg-[#2d3748] text-white shadow-indigo-900/10' 
                    : 'bg-white border border-white/80 text-text-main shadow-indigo-100/30'
                }`}>
                  {m.text}
                </div>
                <div className={`px-4 font-accent text-[8px] tracking-widest text-text-muted/40 uppercase font-bold flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  {m.time}
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="flex justify-start"
            >
               <div className="bg-white/40 border border-white/80 px-8 py-4 rounded-full flex gap-2 items-center">
                  <div className="w-1.5 h-1.5 bg-sage rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-sage rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-sage rounded-full animate-bounce" />
               </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="p-10 relative z-10">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto relative group">
          <input 
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={isTyping}
            placeholder={isTyping ? "Attuning..." : "Focus on the mind, not the mask..."}
            className="w-full bg-white border border-white/80 rounded-[40px] px-12 py-6 font-body text-sm text-text-main focus:outline-none focus:border-sage/40 transition-all shadow-3xl shadow-indigo-100/40 placeholder:text-text-muted/20 disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={isTyping || !input.trim()}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#2d3748] text-white rounded-full flex items-center justify-center hover:scale-105 transition-all shadow-xl shadow-indigo-900/20 disabled:scale-95 disabled:opacity-20"
          >
            <Send size={18} />
          </button>
        </form>
        <div className="max-w-4xl mx-auto mt-6 text-center">
            <span className="font-accent text-[8px] tracking-[0.4em] text-text-muted/30 uppercase">Messages are encrypted and ephemeral</span>
        </div>
      </div>
    </div>
  );
};

export default Chat;
