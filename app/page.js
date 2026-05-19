'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import { useGameStore } from '@/store/gameStore';
import { loadGame } from '@/lib/saveSystem';
import { sound } from '@/lib/audio';

// ── Floating background particles ────────────────────────────
function Particles() {
  const icons = ['💻', '🌐', '🔧', '⚙️', '📶', '🛡️', '🔌', '💾', '🖥️', '⌨️'];
  const [particles, setParticles] = useState([]);

  // Generate random values only on client to avoid SSR/client hydration mismatch
  useEffect(() => {
    setParticles(
      Array.from({ length: 16 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 95}%`,
        top: `${Math.random() * 95}%`,
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 4,
      }))
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-2xl opacity-10 select-none"
          style={{ left: p.left, top: p.top }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.05, 0.15, 0.05],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        >
          {icons[p.id % icons.length]}
        </motion.div>
      ))}
    </div>
  );
}

// ── Language Picker Screen ────────────────────────────────────
function LanguagePicker({ onPick }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6"
      style={{ background: 'linear-gradient(135deg, #070b14 0%, #0d1a2e 50%, #070b14 100%)' }}
    >
      <Particles />

      <div className="relative z-10 text-center max-w-lg w-full">
        {/* Logo */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="text-6xl mb-4 float-slow inline-block">💻</div>
          <h1 className="text-3xl font-black text-orbitron text-neon-cyan mb-2">
            IT Support
          </h1>
          <h1 className="text-4xl font-black text-orbitron text-white">
            Adventure
          </h1>
        </motion.div>

        {/* Language choice */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass border border-white/10 rounded-2xl p-8"
        >
          <h2 className="text-xl font-bold text-white mb-2">Choose Your Language</h2>
          <p className="text-sm text-white/40 mb-8">Pilih Bahasa / Choose Language</p>

          <div className="grid grid-cols-2 gap-4">
            {/* English */}
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { sound.click(); onPick('en'); }}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-white/10 hover:border-[var(--neon-cyan)] bg-white/[0.02] hover:bg-[rgba(0,245,255,0.05)] transition-all group"
            >
              <span className="text-5xl">🇬🇧</span>
              <div>
                <div className="font-bold text-white text-lg group-hover:text-[var(--neon-cyan)] transition-colors">English</div>
                <div className="text-xs text-white/40">Continue in English</div>
              </div>
            </motion.button>

            {/* Indonesian */}
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { sound.click(); onPick('id'); }}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-white/10 hover:border-[var(--neon-purple)] bg-white/[0.02] hover:bg-[rgba(191,0,255,0.05)] transition-all group"
            >
              <span className="text-5xl">🇮🇩</span>
              <div>
                <div className="font-bold text-white text-lg group-hover:text-[var(--neon-purple)] transition-colors">Indonesia</div>
                <div className="text-xs text-white/40">Lanjutkan dalam Bahasa Indonesia</div>
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Main Menu Content ─────────────────────────────────────────
function MainMenuContent() {
  const { t, lang, switchLanguage } = useLanguage();
  const { hydrate, playerName, level, totalXP, loginStreak, completedMissions, isLoaded } = useGameStore();
  const router = useRouter();
  const [langPicked, setLangPicked] = useState(false);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const hasSave = completedMissions.length > 0 || totalXP > 0;

  // Check localStorage for existing language choice
  useEffect(() => {
    const savedLang = localStorage.getItem('itsupport_lang');
    if (savedLang) {
      switchLanguage(savedLang);
      setLangPicked(true);
    }
  }, []);

  // Load save on mount
  useEffect(() => {
    if (langPicked) {
      loadGame().then(save => {
        if (save) hydrate(save);
      });
    }
  }, [langPicked]);

  const handlePickLanguage = async (l) => {
    await switchLanguage(l);
    setLangPicked(true);
    const save = await loadGame();
    if (save) hydrate(save);
  };

  const handlePlay = () => {
    sound.click();
    if (hasSave) {
      router.push('/game');
    } else {
      router.push('/auth');
    }
  };

  // Show language picker on first visit
  if (!langPicked) {
    return <LanguagePicker onPick={handlePickLanguage} />;
  }

  return (
    <div className="min-h-screen grid-bg flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <Particles />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl"
          style={{ background: 'var(--neon-cyan)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-5 blur-3xl"
          style={{ background: 'var(--neon-purple)' }} />
      </div>

      <div className="relative z-10 w-full max-w-sm px-5 sm:max-w-md sm:px-0">
        {/* Logo area */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-10"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="text-8xl mb-5 inline-block"
          >💻</motion.div>

          <h1 className="text-4xl font-black text-orbitron leading-tight mb-1">
            <span className="text-neon-cyan">IT Support</span>
          </h1>
          <h1 className="text-4xl font-black text-orbitron leading-tight text-white mb-3">
            Adventure
          </h1>
          <p className="text-sm text-white/40 italic">{t('tagline')}</p>
        </motion.div>

        {/* Save info if exists */}
        {hasSave && isLoaded && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass border border-white/8 rounded-2xl px-5 py-4 mb-5 flex items-center gap-4"
          >
            <div className="text-3xl">👤</div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">{playerName}</p>
              <p className="text-xs text-white/40">Level {level} · {completedMissions.length} missions done</p>
            </div>
            {loginStreak > 0 && (
              <div className="flex items-center gap-1 text-sm">
                <span>🔥</span>
                <span className="font-bold text-[var(--neon-orange)]">{loginStreak}</span>
              </div>
            )}
          </motion.div>
        )}

        {/* Menu buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-3"
        >
          {/* Primary play button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handlePlay}
            className="w-full py-4 rounded-2xl font-black text-lg text-orbitron relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, rgba(0,245,255,0.2) 0%, rgba(191,0,255,0.2) 100%)',
              border: '2px solid rgba(0,245,255,0.5)',
              color: '#00f5ff',
              boxShadow: '0 0 30px rgba(0,245,255,0.15)',
            }}
            onMouseEnter={() => sound.hover()}
          >
            <span className="relative z-10">
              {hasSave ? `▶ ${t('continueGame')}` : `🚀 ${t('play')}`}
            </span>
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'linear-gradient(135deg, rgba(0,245,255,0.1), rgba(191,0,255,0.1))' }}
            />
          </motion.button>

          {/* Auth / New Game */}
          <button
            onClick={() => { sound.click(); router.push('/auth'); }}
            className="w-full py-3.5 rounded-2xl font-bold text-sm border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-all"
          >
            {hasSave ? `🆕 ${t('newGame')}` : `🔐 ${t('login')} / ${t('register')}`}
          </button>

          {/* Guest mode */}
          {!hasSave && (
            <button
              onClick={() => { sound.click(); router.push('/game'); }}
              className="w-full py-3 text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              {t('guestPlay')} →
            </button>
          )}
        </motion.div>

        {/* Bottom row — language toggle + version */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between mt-8"
        >
          <button
            onClick={() => setShowLangPicker(true)}
            className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            <span>{lang === 'id' ? '🇮🇩' : '🇬🇧'}</span>
            <span>{lang === 'id' ? 'Bahasa Indonesia' : 'English'}</span>
          </button>
          <span className="text-xs text-white/20">{t('version')}</span>
        </motion.div>
      </div>

      {/* Language re-picker */}
      <AnimatePresence>
        {showLangPicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowLangPicker(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="glass border border-white/15 rounded-2xl p-8 max-w-sm w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold text-white mb-6 text-center">{t('chooseLanguage')}</h3>
              <div className="grid grid-cols-2 gap-3">
                {[{ code: 'en', flag: '🇬🇧', name: 'English' }, { code: 'id', flag: '🇮🇩', name: 'Indonesia' }].map(l => (
                  <button
                    key={l.code}
                    onClick={() => { switchLanguage(l.code); setShowLangPicker(false); sound.click(); }}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                      lang === l.code
                        ? 'border-[var(--neon-cyan)] bg-[rgba(0,245,255,0.08)] text-[var(--neon-cyan)]'
                        : 'border-white/10 text-white/60 hover:border-white/25'
                    }`}
                  >
                    <span className="text-3xl">{l.flag}</span>
                    <span className="text-sm font-semibold">{l.name}</span>
                    {lang === l.code && <span className="text-xs">✓ Active</span>}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Root Page (wraps with providers) ─────────────────────────
export default function HomePage() {
  return (
    <LanguageProvider>
      <MainMenuContent />
    </LanguageProvider>
  );
}
