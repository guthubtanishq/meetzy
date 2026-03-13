import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Sparkles, Zap, Heart, Info, Globe, Lock, MessageCircle, Users, EyeOff, UserMinus, BarChart2 } from 'lucide-react';
import ParticleField from '../components/three/ParticleField';

const Landing = () => {
  const navigate = useNavigate();
  const learnMoreRef = useRef(null);

  const scrollToSection = () => {
    learnMoreRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full min-h-screen bg-bg-base font-body selection:bg-sage/20 overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-mesh-soft opacity-[0.2]" />
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 2]}>
          <ambientLight intensity={1.5} />
          <ParticleField />
        </Canvas>
      </div>

      {/* 1. Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center bg-white/10 backdrop-blur-3xl border-b border-white/20">
        <div className="font-heading text-2xl tracking-tighter text-[#2d3748] cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Meetzy</div>
        <div className="flex gap-4 md:gap-8 items-center">
          <button 
            onClick={() => navigate('/login')}
            className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-[#2d3748] hover:text-sage transition-colors"
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate('/signup')}
            className="px-8 py-3 bg-[#2d3748] text-white text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full hover:bg-black transition-all shadow-xl shadow-indigo-900/10"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-20">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="mb-8 inline-block font-accent text-[10px] uppercase tracking-[0.5em] text-sage/60 py-2 border-b border-sage/10"
        >
            A Personality-Safe Connection
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-6xl md:text-9xl mb-8 tracking-tighter text-[#2d3748] text-glow-sage max-w-5xl leading-[0.9]"
        >
          Be Understood,<br />Not Judged
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.2 }}
          className="font-body text-lg md:text-2xl text-text-muted max-w-3xl mb-12 leading-relaxed font-light italic"
        >
          A personality-safe connection platform built around empathy, psychological compatibility, and shared experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="max-w-2xl mb-16 bg-white/40 backdrop-blur-xl border border-white/80 p-10 rounded-[50px] shadow-3xl shadow-indigo-100/30"
        >
          <p className="font-body text-base text-text-muted leading-loose">
            Meetzy creates a space where people connect through understanding rather than appearance. No profile pictures, no real names, and no popularity metrics — just meaningful conversations between people who truly understand each other.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col md:flex-row gap-8"
        >
          <button 
            onClick={() => navigate('/signup')}
            className="px-16 py-6 bg-[#2d3748] text-white rounded-[40px] font-body font-bold text-sm hover:scale-105 hover:bg-black transition-all duration-700 shadow-2xl shadow-indigo-900/20"
          >
            Create Account
          </button>
          <button 
            onClick={scrollToSection}
            className="px-16 py-6 bg-white/60 text-[#2d3748] border border-white rounded-[40px] font-body font-bold text-sm hover:bg-white hover:scale-105 transition-all duration-700 shadow-xl shadow-indigo-100/10"
          >
            Learn More
          </button>
        </motion.div>
      </section>

      {/* 3. How Meetzy Works */}
      <section ref={learnMoreRef} className="relative z-10 py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <h2 className="font-heading text-5xl md:text-6xl text-[#2d3748] mb-6 tracking-tight">How Meetzy Works</h2>
            <div className="w-24 h-1 bg-sage/30 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <EyeOff className="text-sage" />,
                title: "Anonymous Profiles",
                desc: "Users interact through aliases and mood-based avatars instead of photos."
              },
              {
                icon: <Sparkles className="text-lavender" />,
                title: "Psychological Matching",
                desc: "People are matched through shared experiences, emotional traits, and disorders."
              },
              {
                icon: <Zap className="text-sage" />,
                title: "Swipe to Connect",
                desc: "Swipe through anonymous profiles and start conversations after a mutual match."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/70 backdrop-blur-xl border border-white p-14 rounded-[60px] shadow-3xl shadow-indigo-100/10 hover:shadow-sage/20 hover:-translate-y-3 transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-150 transition-transform duration-1000">
                    {item.icon}
                </div>
                <div className="w-20 h-20 rounded-[30px] bg-bg-base border border-white flex items-center justify-center mb-10 group-hover:bg-sage/10 transition-colors">
                  <div className="scale-125">{item.icon}</div>
                </div>
                <h3 className="font-heading text-3xl text-[#2d3748] mb-6 tracking-tight">{item.title}</h3>
                <p className="font-body text-base text-text-muted leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Psychology-Backed Matching */}
      <section className="relative z-10 py-40 px-6 bg-sage/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="font-heading text-5xl md:text-6xl text-[#2d3748] mb-10 tracking-tight leading-tight">Psychology-Backed<br />Matching</h2>
            <p className="font-body text-lg text-text-muted leading-relaxed mb-16">
              Our matching system connects people based on shared emotional experiences and complementary psychological traits. This encourages supportive conversations and deeper understanding rather than superficial interactions.
            </p>
            
            <div className="space-y-6">
              {[
                { l: "Introvert", r: "Patient Listener", color: "bg-sage/10 text-sage" },
                { l: "Overthinker", r: "Calm Personality", color: "bg-lavender/10 text-lavender" },
                { l: "Social Anxiety", r: "Understanding Users", color: "bg-sage/10 text-sage" },
                { l: "ADHD", r: "Structured Thinkers", color: "bg-lavender/10 text-lavender" }
              ].map((pair, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-6"
                >
                  <div className={`px-6 py-3 rounded-2xl font-body font-bold text-xs uppercase tracking-widest ${pair.color}`}>
                    {pair.l}
                  </div>
                  <div className="h-[2px] w-12 bg-[#2d3748]/10" />
                  <div className={`px-6 py-3 rounded-2xl font-body font-bold text-xs uppercase tracking-widest ${pair.color}`}>
                    {pair.r}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="relative">
             <div className="absolute inset-0 bg-sage/10 blur-[120px] rounded-full" />
             <div className="relative grid grid-cols-2 gap-6 p-12 bg-white/40 backdrop-blur-3xl border border-white rounded-[60px] shadow-3xl">
                {[...Array(4)].map((_, i) => (
                   <motion.div
                    key={i}
                    animate={{ 
                       y: [0, -10, 0],
                       opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                       duration: 4, 
                       repeat: Infinity, 
                       delay: i * 1,
                       ease: "easeInOut"
                    }}
                    className="h-40 bg-white/60 rounded-[30px] border border-white/80"
                   />
                ))}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-sage rounded-full flex items-center justify-center text-white shadow-3xl shadow-sage/50 animate-pulse">
                        <Users size={32} />
                    </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. Feature Showcase (Animated) */}
      <section className="relative z-10 py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <h2 className="font-heading text-5xl md:text-6xl text-[#2d3748] mb-6 tracking-tight">A Better Way to Connect</h2>
            <div className="w-24 h-1 bg-sage/30 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
             {[
                {
                   title: "Swipe Matching",
                   desc: "Users can swipe through anonymous profiles to find their resonance.",
                   visual: <div className="w-full h-full border-2 border-dashed border-sage/20 rounded-3xl flex items-center justify-center">
                      <Zap className="text-sage opacity-20 animate-bounce" size={48} />
                   </div>
                },
                {
                   title: "Mood-Based Avatars",
                   desc: "Avatars automatically adapt to the user’s daily mood seamlessly.",
                   visual: <div className="w-full h-full flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-sage/40 to-lavender/40 animate-spin-slow blur-xl" />
                      <div className="w-16 h-16 rounded-full bg-white shadow-xl absolute" />
                   </div>
                },
                {
                   title: "Private Conversations",
                   desc: "Matched users can start safe, anonymous, and ephemeral chats.",
                   visual: <div className="w-full h-full flex flex-col gap-3 items-center justify-center p-8">
                      <div className="w-full h-4 bg-sage/10 rounded-full" />
                      <div className="w-3/4 h-4 bg-lavender/10 rounded-full self-start" />
                      <div className="w-2/3 h-4 bg-sage/10 rounded-full self-end" />
                   </div>
                }
             ].map((feature, i) => (
                <div key={i} className="flex flex-col items-center">
                   <div className="w-full aspect-square bg-white/40 border border-white rounded-[60px] mb-12 relative overflow-hidden shadow-2xl group">
                      <div className="absolute inset-0 p-12 transition-transform duration-700 group-hover:scale-110">
                         {feature.visual}
                      </div>
                   </div>
                   <h3 className="font-heading text-3xl text-[#2d3748] mb-4 tracking-tight">{feature.title}</h3>
                   <p className="font-body text-text-muted text-center leading-relaxed font-medium">
                      {feature.desc}
                   </p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* 6. Why We Built This */}
      <section className="relative z-10 py-40 px-6 bg-lavender/5">
        <div className="max-w-5xl mx-auto text-center">
           <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="relative"
           >
              <h2 className="font-heading text-5xl md:text-6xl text-[#2d3748] mb-12 tracking-tight italic">Why Meetzy Exists</h2>
              <div className="bg-white/50 backdrop-blur-2xl border border-white rounded-[80px] p-16 md:p-24 shadow-4xl relative overflow-hidden">
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-sage/10 rounded-full blur-[100px]" />
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-lavender/10 rounded-full blur-[100px]" />
                
                <p className="font-body text-xl md:text-3xl text-[#2d3748] leading-relaxed relative z-10 font-light">
                  “Most social platforms encourage judgment based on appearance, popularity, or status. Meetzy removes these pressures and creates a safe space where conversations are built on empathy and shared experiences.”
                </p>
              </div>
           </motion.div>
        </div>
      </section>

      {/* 7. Trust & Safety Section */}
      <section className="relative z-10 py-40 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-heading text-5xl md:text-6xl text-[#2d3748] mb-10 tracking-tight">Your Privacy Comes First</h2>
          <p className="font-body text-text-muted mb-24 max-w-2xl mx-auto text-lg font-medium">
             We’ve engineered every aspect of Meetzy to protect your identity and mental peace.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <UserMinus />, title: "No Profile Pictures", desc: "Users stay anonymous by design." },
              { icon: <Shield />, title: "No Real Names", desc: "Identity remains private and secure." },
              { icon: <BarChart2 />, title: "No Popularity Metrics", desc: "No likes, followers, or social pressure." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center p-12 bg-white/30 border border-white/60 rounded-[60px] shadow-2xl"
              >
                <div className="p-6 bg-sage/10 rounded-2xl text-sage mb-8">
                  {item.icon}
                </div>
                <h3 className="font-heading text-2xl text-[#2d3748] mb-4 tracking-tight">{item.title}</h3>
                <p className="font-body text-sm text-text-muted font-bold uppercase tracking-widest opacity-60">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Feasibility Section */}
      <section className="relative z-10 py-40 px-6 bg-bg-base">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <h2 className="font-heading text-5xl md:text-6xl text-[#2d3748] mb-6 tracking-tight leading-tight">Why This Platform<br />Works</h2>
            <div className="w-24 h-1 bg-sage/30 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { t: "Reduced Anxiety", d: "Anonymous communication reduces social anxiety and allows for honest expression." },
              { t: "Deep Connection", d: "Shared experiences increase emotional connection and foster genuine empathy." },
              { t: "Quality Dialog", d: "Psychological compatibility improves conversations and ensures supportive interactions." }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="p-12 border border-[#2d3748]/5 rounded-[50px] bg-white/60 shadow-inner"
              >
                <h4 className="font-heading text-2xl text-[#2d3748] mb-6 tracking-tight">{item.t}</h4>
                <p className="font-body text-base text-text-muted leading-relaxed italic">{item.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="relative z-10 py-32 px-6 border-t border-white/40 text-center bg-white/20">
        <div className="max-w-4xl mx-auto">
          <div className="font-heading text-3xl text-[#2d3748] mb-12 tracking-tighter">Meetzy</div>
          
          <p className="font-accent text-[11px] uppercase tracking-[0.5em] text-text-muted mb-12 font-bold leading-loose">
            No profile pictures • No real names • No popularity metrics
          </p>
          
          <div className="inline-flex items-center gap-4 px-10 py-5 bg-white backdrop-blur-xl border border-white/80 rounded-[40px] shadow-3xl shadow-indigo-200/20">
            <Info size={16} className="text-sage" />
            <p className="font-body text-[11px] text-text-muted tracking-wide font-medium leading-relaxed">
              This platform provides peer support and is not a substitute for professional mental health care.
            </p>
          </div>
          
          <div className="mt-24 pt-12 border-t border-[#2d3748]/5">
             <p className="font-accent text-[9px] uppercase tracking-[0.4em] text-text-muted opacity-40 italic">
                Designed for Mindfulness & Emotional Resolution · 2026
             </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
