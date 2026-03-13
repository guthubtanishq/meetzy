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
        <label className="font-ui text-xs text-white/40 uppercase tracking-widest">{label}</label>
        <div 
          className="relative cursor-help"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Lock size={12} className="text-white/20 group-focus-within:text-sage transition-colors" />
          {showTooltip && (
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-bg-surface-light border border-white/10 px-3 py-1 rounded-md text-[10px] whitespace-nowrap z-50 text-white/60 font-mono tracking-tighter">
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
          className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 font-ui text-sm focus:outline-none focus:border-sage/30 focus:bg-white/10 transition-all placeholder:text-white/10"
        />
        {isPassword && (
          <button 
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
          >
            {isPasswordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default PrivacyField;
