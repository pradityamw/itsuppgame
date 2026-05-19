'use client';
import { motion } from 'framer-motion';
import { sound } from '@/lib/audio';

// ── Button ───────────────────────────────────────────────────
export function Button({ children, variant = 'cyan', size = 'md', onClick, disabled, className = '', icon, ...props }) {
  const variants = {
    cyan:   'btn-game',
    purple: 'btn-game btn-game-purple',
    green:  'btn-game btn-game-green',
    ghost:  'border border-white/10 text-white/60 hover:text-white hover:border-white/30 bg-transparent rounded px-4 py-2 transition-all',
    danger: 'btn-game border-[#ff2d78] text-[#ff2d78]',
  };
  const sizes = { sm: 'text-xs px-3 py-1.5', md: 'text-sm px-5 py-2.5', lg: 'text-base px-8 py-3' };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={(e) => { if (!disabled) { sound.click(); onClick?.(e); } }}
      onMouseEnter={() => { if (!disabled) sound.hover(); }}
      disabled={disabled}
      className={`${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-40 cursor-not-allowed' : ''} inline-flex items-center gap-2 font-semibold ${className}`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
}

// ── Card ─────────────────────────────────────────────────────
export function Card({ children, glow, className = '', onClick, ...props }) {
  const glowClass = glow === 'cyan' ? 'border-[rgba(0,245,255,0.3)] hover:border-[rgba(0,245,255,0.6)] hover:shadow-[0_0_20px_rgba(0,245,255,0.15)]'
    : glow === 'purple' ? 'border-[rgba(191,0,255,0.3)] hover:border-[rgba(191,0,255,0.6)]'
    : glow === 'green'  ? 'border-[rgba(57,255,20,0.3)] hover:border-[rgba(57,255,20,0.6)]'
    : 'border-white/5 hover:border-white/15';

  return (
    <motion.div
      whileHover={onClick ? { y: -2 } : {}}
      onClick={onClick}
      className={`game-card border ${glowClass} p-4 transition-all duration-200 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ── Modal ─────────────────────────────────────────────────────
export function Modal({ open, onClose, title, children, size = 'md' }) {
  if (!open) return null;
  const sizes = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.85, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 20 }}
        className={`relative w-full ${sizes[size]} glass border border-white/10 rounded-xl shadow-2xl overflow-hidden`}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <h2 className="text-lg font-bold text-white font-orbitron">{title}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-all"
            >✕</button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </motion.div>
    </motion.div>
  );
}

// ── XP Bar ───────────────────────────────────────────────────
export function XPBar({ current, needed, percent, level, rank, compact = false }) {
  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-[var(--neon-yellow)] font-bold text-orbitron">Lv{level}</span>
        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="xp-bar-fill h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <span className="text-xs text-white/40">{percent}%</span>
      </div>
    );
  }
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[var(--neon-yellow)] text-orbitron">Lv {level}</span>
          {rank && (
            <span className="text-xs px-2 py-0.5 rounded-full border font-medium"
              style={{ color: rank.color, borderColor: rank.color + '50', background: rank.color + '15' }}>
              {rank.emoji} {rank.key}
            </span>
          )}
        </div>
        <span className="text-xs text-white/40">{needed > 0 ? `${needed} XP to next` : 'MAX'}</span>
      </div>
      <div className="h-3 bg-white/10 rounded-full overflow-hidden relative">
        <motion.div
          className="xp-bar-fill h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        {/* Shine */}
        <div className="absolute inset-0 shimmer rounded-full opacity-40 pointer-events-none" />
      </div>
    </div>
  );
}

// ── Toast Notification ────────────────────────────────────────
export function Toast({ id, message, type, icon, onDismiss }) {
  const colors = {
    xp:          'border-[var(--neon-yellow)]  text-[var(--neon-yellow)]',
    levelup:     'border-[var(--neon-purple)]  text-[var(--neon-purple)]',
    coin:        'border-[var(--coin-color)]    text-[var(--coin-color)]',
    tool:        'border-[var(--neon-cyan)]     text-[var(--neon-cyan)]',
    achievement: 'border-[var(--neon-orange)]  text-[var(--neon-orange)]',
    bonus:       'border-[var(--neon-green)]   text-[var(--neon-green)]',
    area:        'border-[var(--neon-purple)]  text-[var(--neon-purple)]',
    info:        'border-white/20 text-white',
    error:       'border-[var(--neon-pink)]    text-[var(--neon-pink)]',
  };
  return (
    <motion.div
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 80, opacity: 0 }}
      onClick={() => onDismiss?.(id)}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg glass border cursor-pointer ${colors[type] || colors.info} shadow-lg min-w-[200px]`}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-semibold">{message}</span>
    </motion.div>
  );
}

// ── Toast Container ───────────────────────────────────────────
export function ToastContainer({ toasts, onDismiss }) {
  const { AnimatePresence } = require('framer-motion');
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(t => (
          <div key={t.id} className="pointer-events-auto">
            <Toast {...t} onDismiss={onDismiss} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ── Badge ─────────────────────────────────────────────────────
export function Badge({ children, variant = 'default', size = 'sm' }) {
  const variants = {
    default:  'bg-white/10 text-white/70 border-white/10',
    cyan:     'bg-[rgba(0,245,255,0.1)] text-[var(--neon-cyan)] border-[rgba(0,245,255,0.3)]',
    purple:   'bg-[rgba(191,0,255,0.1)] text-[var(--neon-purple)] border-[rgba(191,0,255,0.3)]',
    green:    'bg-[rgba(57,255,20,0.1)] text-[var(--neon-green)] border-[rgba(57,255,20,0.3)]',
    orange:   'bg-[rgba(255,107,0,0.1)] text-[var(--neon-orange)] border-[rgba(255,107,0,0.3)]',
    pink:     'bg-[rgba(255,45,120,0.1)] text-[var(--neon-pink)] border-[rgba(255,45,120,0.3)]',
    easy:     'bg-[rgba(57,255,20,0.1)] text-[var(--neon-green)] border-[rgba(57,255,20,0.3)]',
    medium:   'bg-[rgba(255,230,0,0.1)] text-[var(--neon-yellow)] border-[rgba(255,230,0,0.3)]',
    hard:     'bg-[rgba(255,45,120,0.1)] text-[var(--neon-pink)] border-[rgba(255,45,120,0.3)]',
  };
  const sizes = { xs: 'text-[10px] px-1.5 py-0.5', sm: 'text-xs px-2 py-0.5', md: 'text-sm px-3 py-1' };
  return (
    <span className={`inline-flex items-center rounded border font-semibold ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
}

// ── Divider ───────────────────────────────────────────────────
export function Divider({ label }) {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-white/5" />
      {label && <span className="text-xs text-white/30 font-medium">{label}</span>}
      <div className="flex-1 h-px bg-white/5" />
    </div>
  );
}

// ── Section Header ────────────────────────────────────────────
export function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h2 className="text-lg font-bold text-white text-orbitron">{title}</h2>
        {subtitle && <p className="text-sm text-white/40 mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
