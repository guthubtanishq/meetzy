import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff } from 'lucide-react';

const PrivacyField = ({ label, type = "text", value, onChange, placeholder, tooltip, delay = 0 }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="w-full space-y-2 group"
    >
      <div className="flex items-center gap-2 px-1">
        <label className="font-body text-xs text-text-muted hover:text-text-main transition-colors uppercase tracking-[0.2em]">{label}</label>
        <div 
          className="relative cursor-help"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Lock size={12} className="text-sage/40 group-focus-within:text-sage transition-colors" />
          {showTooltip && (
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-3xl border border-white px-4 py-2 rounded-xl text-[10px] whitespace-nowrap z-50 text-text-main font-accent shadow-xl shadow-indigo-100/20">
              {tooltip || "Only you can see this"}
            </div>
          )}
        </div>
      </div>
      
      <div className="relative">
        <input 
          type={isPassword ? (isPasswordVisible ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-white/40 border border-white/60 rounded-3xl px-8 py-5 font-body text-sm focus:outline-none focus:border-sage/40 focus:bg-white/80 transition-all placeholder:text-text-muted/30 shadow-sm"
        />
        {isPassword && (
          <button 
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-8 top-1/2 -translate-y-1/2 text-text-muted/40 hover:text-text-main transition-colors"
          >
            {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default PrivacyField;
