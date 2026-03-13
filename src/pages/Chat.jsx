import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowLeft } from 'lucide-react';

const Chat = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([
    { text: "Hello. I see we match based on similar experiences.", sender: 'other' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: 'me' }]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-bg-base pt-24 text-white">
      {/* Header */}
      <div className="flex items-center gap-4 px-8 py-4 border-b border-white/5 bg-bg-surface/50 backdrop-blur-md">
        <Link to="/match" className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex flex-col">
          <span className="font-mono text-sm tracking-widest text-sage">{id}</span>
          <span className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Connected Moments Ago</span>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth"
      >
        <div className="text-center py-10 opacity-30">
            <p className="font-ui text-xs tracking-widest uppercase">Encryption active. Safety first.</p>
        </div>

        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] px-6 py-4 rounded-[28px] font-ui text-sm leading-relaxed ${
                m.sender === 'me' ? 'bg-sage/10 text-sage border border-sage/20' : 'bg-white/5 text-white/80 border border-white/10'
              }`}>
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Shared Prompts */}
      <div className="px-8 flex gap-3 overflow-x-auto pb-4 no-scrollbar">
        {["What's been weighing on you?", "What do you wish people understood?", "Just listening today."].map(prompt => (
          <button 
            key={prompt}
            onClick={() => setInput(prompt)}
            className="flex-none px-4 py-2 bg-white/5 border border-white/5 rounded-full text-[10px] uppercase font-mono tracking-wider text-white/40 hover:text-white hover:border-white/10 transition-all"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-8 pb-10">
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Focus on the mind, not the mask..."
            className="w-full bg-bg-surface border border-white/10 rounded-[30px] px-8 py-5 pr-16 font-ui text-sm focus:outline-none focus:border-lavender/50 transition-all placeholder:text-white/10"
          />
          <button 
            onClick={handleSend}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-sage/20 text-sage rounded-full hover:bg-sage hover:text-bg-base transition-all"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
