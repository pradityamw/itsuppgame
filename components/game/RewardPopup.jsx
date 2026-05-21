'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/lib/audio';
import { useLanguage } from '@/context/LanguageContext';
import { useGameStore } from '@/store/gameStore';
import { Button } from '@/components/ui';

const PARTICLE_COUNT = 18;

export default function RewardPopup({ data, onDismiss }) {
  const { t } = useLanguage();
  const { getLevelProgress, getRank } = useGameStore();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (data) {
      sound.missionComplete();
      setTimeout(() => sound.xpGain(), 600);
      if (data.coinReward) setTimeout(() => sound.coin(), 900);
      if (data.toolUnlock) setTimeout(() => sound.achievement(), 1200);

      // Generate confetti particles on mount / data change inside the effect to keep rendering pure
      const generated = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 1.2 + Math.random() * 0.8,
        color: ['#00f5ff', '#bf00ff', '#39ff14', '#ff6b00', '#ffe600', '#ff2d78'][i % 6],
        size: 6 + Math.random() * 10,
      }));
      setParticles(generated);
    }
  }, [data]);

  if (!data) return null;

  const progress = getLevelProgress();
  const rank = getRank();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center"
        style={{ background: 'rgba(7,11,20,0.85)', backdropFilter: 'blur(8px)' }}
      >
        {/* Confetti particles */}
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-sm pointer-events-none"
            style={{
              left: `${p.x}%`,
              top: '-10px',
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 6px ${p.color}`,
            }}
            animate={{
              y: ['0vh', '110vh'],
              rotate: [0, 720],
              opacity: [1, 0.5, 0],
            }}
            transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
          />
        ))}

        {/* Main popup card */}
        <motion.div
          initial={{ scale: 0.5, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', bounce: 0.4, duration: 0.7 }}
          className="relative w-full max-w-md mx-4 rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0d1117 0%, #1a2238 100%)',
            border: '2px solid rgba(57,255,20,0.5)',
            boxShadow: '0 0 60px rgba(57,255,20,0.2), 0 0 120px rgba(57,255,20,0.1)',
          }}
        >
          {/* Top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-[var(--neon-green)] blur-md" />

          <div className="p-8 text-center">
            {/* Trophy animation */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [-5, 5, 0] }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-7xl mb-3"
            >
              🏆
            </motion.div>

            <h2 className="text-2xl font-black text-[var(--neon-green)] text-orbitron mb-1">
              {t('missionComplete')}
            </h2>
            <p className="text-white/40 text-sm mb-6">Great job, technician!</p>

            {/* Rewards grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {/* XP */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="rounded-xl p-3 border border-[rgba(255,230,0,0.3)] bg-[rgba(255,230,0,0.05)]"
              >
                <div className="text-2xl mb-1">⭐</div>
                <div className="text-lg font-black text-[var(--neon-yellow)]">+{data.xpReward}</div>
                <div className="text-xs text-white/40">XP</div>
              </motion.div>

              {/* Coins */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="rounded-xl p-3 border border-[rgba(255,165,0,0.3)] bg-[rgba(255,165,0,0.05)]"
              >
                <div className="text-2xl mb-1">🪙</div>
                <div className="text-lg font-black text-[var(--coin-color)]">+{data.coinReward}</div>
                <div className="text-xs text-white/40">Coins</div>
              </motion.div>

              {/* Speed bonus / tool */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className={`rounded-xl p-3 border ${
                  data.toolUnlock
                    ? 'border-[rgba(0,245,255,0.4)] bg-[rgba(0,245,255,0.05)]'
                    : data.speedBonus
                    ? 'border-[rgba(191,0,255,0.4)] bg-[rgba(191,0,255,0.05)]'
                    : 'border-white/5 bg-white/[0.02]'
                }`}
              >
                <div className="text-2xl mb-1">{data.toolUnlock ? '🔧' : data.speedBonus ? '⚡' : '✅'}</div>
                <div className="text-sm font-bold text-white">
                  {data.toolUnlock ? 'New Tool!' : data.speedBonus ? 'Speed!' : 'Done'}
                </div>
                <div className="text-xs text-white/40">
                  {data.toolUnlock || (data.speedBonus ? '+Bonus' : 'Complete')}
                </div>
              </motion.div>
            </div>

            {/* XP bar progress */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mb-6 text-left"
            >
              <div className="flex justify-between text-xs text-white/40 mb-1">
                <span>Level {progress.currentLevel}</span>
                <span>{progress.percent}% to Level {progress.currentLevel + 1}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="xp-bar-fill h-full rounded-full"
                  initial={{ width: `${Math.max(0, progress.percent - 20)}%` }}
                  animate={{ width: `${progress.percent}%` }}
                  transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
                />
              </div>
            </motion.div>

            {/* Continue button */}
            <Button variant="green" size="lg" onClick={onDismiss} className="w-full justify-center">
              🎮 {t('continue')}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
