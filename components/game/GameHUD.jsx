'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { useLanguage } from '@/context/LanguageContext';
import { ToastContainer } from '@/components/ui';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GameHUD() {
  const { totalXP, coins, loginStreak, activeMission, toasts, removeToast, getLevelProgress, getRank } = useGameStore();
  const { t, lang } = useLanguage();
  const router = useRouter();
  const [showMission, setShowMission] = useState(true);

  const progress = getLevelProgress();
  const rank = getRank();

  return (
    <>
      {/* ── Single unified HUD bar ─────────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0 z-40"
        style={{
          background: 'rgba(7,11,20,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex items-center gap-2 px-3 py-2 max-w-5xl mx-auto">

          {/* Left — Rank icon + Level */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-base leading-none">{rank?.emoji}</span>
            <div>
              <div className="text-[9px] font-bold uppercase tracking-widest leading-none"
                style={{ color: rank?.color }}>{t(`ranks.${rank?.key}`)}</div>
              <div className="text-[10px] text-white/40 leading-none mt-0.5">Lv {progress.currentLevel}</div>
            </div>
          </div>

          {/* Center — XP bar (flex-1) */}
          <div className="flex-1 min-w-0 px-2">
            <div className="flex justify-between text-[9px] text-white/30 mb-0.5">
              <span>{progress.current} XP</span>
              <span>{progress.needed} to next</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <motion.div
                className="xp-bar-fill h-full rounded-full"
                animate={{ width: `${progress.percent}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Right — Coins + Streak */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-1">
              <span className="text-sm">🪙</span>
              <span className="text-xs font-bold text-[var(--coin-color)]">{coins.toLocaleString()}</span>
            </div>
            {loginStreak > 0 && (
              <div className="flex items-center gap-0.5">
                <span className="text-sm streak-fire">🔥</span>
                <span className="text-xs font-bold text-[var(--neon-orange)]">{loginStreak}</span>
              </div>
            )}
          </div>
        </div>

        {/* Active mission ticker — slim bar below HUD */}
        <AnimatePresence>
          {activeMission && showMission && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex items-center gap-2 px-3 py-1"
              style={{ background: 'rgba(0,245,255,0.08)', borderTop: '1px solid rgba(0,245,255,0.1)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--neon-cyan)] animate-pulse flex-shrink-0" />
              <span className="text-[10px] text-[var(--neon-cyan)] font-semibold truncate flex-1">
                {(typeof activeMission.title === 'object'
                  ? (activeMission.title[lang] || activeMission.title.en)
                  : activeMission.title) || 'Mission Active'}
              </span>
              <button onClick={() => setShowMission(false)} className="text-white/25 hover:text-white text-xs flex-shrink-0">✕</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </>
  );
}
