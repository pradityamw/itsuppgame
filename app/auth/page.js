'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import { useGameStore } from '@/store/gameStore';
import { signIn, signUp } from '@/lib/supabase';
import { loadGame } from '@/lib/saveSystem';
import { sound } from '@/lib/audio';

function AuthContent() {
  const { t } = useLanguage();
  const { hydrate, setUser } = useGameStore();
  const router = useRouter();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    sound.click();

    try {
      if (mode === 'register') {
        const { data, error: err } = await signUp(email, password, name);
        if (err) throw err;
        setSuccess(t('registerSuccess'));
        if (data?.user) {
          setUser(data.user);
          const save = await loadGame(data.user.id);
          hydrate(save, data.user);
        }
        setTimeout(() => router.push('/game/rpg'), 1500);
      } else {
        const { data, error: err } = await signIn(email, password);
        if (err) throw err;
        sound.levelUp();
        if (data?.user) {
          setUser(data.user);
          const save = await loadGame(data.user.id);
          hydrate(save, data.user);
        }
        router.push('/game/rpg');
      }
    } catch (err) {
      sound.wrong();
      setError(err.message || t('loginError'));
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    sound.click();
    loadGame().then(save => {
      hydrate(save || {});
      router.push('/game/rpg');
    });
  };

  return (
    <div className="min-h-screen grid-bg flex items-center justify-center p-4">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full opacity-5 blur-3xl" style={{ background: 'var(--neon-cyan)' }} />
        <div className="absolute bottom-1/3 right-1/3 w-60 h-60 rounded-full opacity-5 blur-3xl" style={{ background: 'var(--neon-purple)' }} />
      </div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Back button */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white mb-6 transition-colors"
        >
          ← Back to menu
        </button>

        {/* Card */}
        <div className="glass border border-white/10 rounded-2xl overflow-hidden">
          {/* Top neon bar */}
          <div className="h-1 bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)]" />

          <div className="p-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="text-5xl mb-3">💻</div>
              <h1 className="text-2xl font-black text-orbitron text-white">IT Support Adventure</h1>
              <p className="text-sm text-white/40 mt-1">
                {mode === 'login' ? 'Welcome back, technician!' : 'Join the IT adventure!'}
              </p>
            </div>

            {/* Mode tabs */}
            <div className="flex rounded-xl border border-white/10 overflow-hidden mb-6">
              {(['login', 'register']).map(m => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setError(''); sound.click(); }}
                  className={`flex-1 py-2.5 text-sm font-semibold transition-all ${
                    mode === m
                      ? 'bg-[rgba(0,245,255,0.1)] text-[var(--neon-cyan)]'
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {m === 'login' ? t('login') : t('register')}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence>
                {mode === 'register' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">
                      {t('name')}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required={mode === 'register'}
                      placeholder="Your technician name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[var(--neon-cyan)] transition-colors"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">
                  {t('email')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="technician@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[var(--neon-cyan)] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">
                  {t('password')}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  minLength={6}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[var(--neon-cyan)] transition-colors"
                />
              </div>

              {/* Error / Success messages */}
              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="rounded-xl px-4 py-3 text-sm border border-[rgba(255,45,120,0.4)] bg-[rgba(255,45,120,0.08)] text-[var(--neon-pink)]">
                    ⚠️ {error}
                  </motion.div>
                )}
                {success && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="rounded-xl px-4 py-3 text-sm border border-[rgba(57,255,20,0.4)] bg-[rgba(57,255,20,0.08)] text-[var(--neon-green)]">
                    ✅ {success}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-sm relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(191,0,255,0.2))',
                  border: '1px solid rgba(0,245,255,0.4)',
                  color: loading ? 'rgba(255,255,255,0.4)' : '#00f5ff',
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>⚙️</motion.span>
                    {t('authLoading')}
                  </span>
                ) : mode === 'login' ? t('loginWith') : t('registerWith')}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-xs text-white/25">or</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            {/* Guest mode */}
            <button
              onClick={handleGuest}
              className="w-full py-3 rounded-xl text-sm text-white/40 hover:text-white/70 border border-white/5 hover:border-white/15 transition-all"
            >
              {t('guestPlay')} — no account needed
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <LanguageProvider>
      <AuthContent />
    </LanguageProvider>
  );
}
