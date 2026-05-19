'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LanguageProvider } from '@/context/LanguageContext';
import { GameProvider } from '@/context/GameContext';
import { useGameStore } from '@/store/gameStore';
import GameHUD from '@/components/game/GameHUD';
import RewardPopup from '@/components/game/RewardPopup';
import { loadGame } from '@/lib/saveSystem';
import { motion } from 'framer-motion';
import { sound } from '@/lib/audio';

// ── Mobile bottom navigation ─────────────────────────────────
const NAV = [
  { path: '/game',           icon: '🗺️', label: 'Map' },
  { path: '/game/adventure', icon: '⚔️', label: 'Missions', searchParam: '?area=bedroom' },
  { path: '/game/daily',     icon: '📅', label: 'Daily' },
  { path: '/game/endless',   icon: '⚡', label: 'Endless' },
  { path: '/game/career',    icon: '🎯', label: 'Career' },
  { path: '/game/kb',        icon: '📖', label: 'KB' },
  { path: '/game/profile',   icon: '👤', label: 'Profile' },
];

function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex items-stretch"
      style={{
        background: 'rgba(7,11,20,0.96)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {NAV.map(item => {
        const active = pathname === item.path || (item.path !== '/game' && pathname.startsWith(item.path));
        return (
          <motion.button
            key={item.path}
            whileTap={{ scale: 0.88 }}
            onClick={() => {
              sound.click();
              router.push(item.path + (item.searchParam && !pathname.includes(item.path.replace('/game', '')) ? item.searchParam : ''));
            }}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 transition-colors relative"
            style={{ color: active ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.35)' }}
          >
            {active && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                style={{ background: 'var(--neon-cyan)' }}
              />
            )}
            <span className="text-lg leading-none">{item.icon}</span>
            <span className="text-[9px] font-semibold leading-none">{item.label}</span>
          </motion.button>
        );
      })}
    </nav>
  );
}

function GameShell({ children }) {
  const { hydrate, isLoaded, showReward, dismissReward, user } = useGameStore();

  useEffect(() => {
    if (!isLoaded) {
      loadGame(user?.id).then(save => hydrate(save || {}, user || null));
    }
  }, []);

  // HUD height ≈ 52px (bar) + possible mission ticker (24px) = ~80px max
  // Bottom nav ≈ 56px + safe-area
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-deep)' }}>
      <GameHUD />

      {/* Main content — padded away from both HUD (top) and bottom nav */}
      <main
        className="max-w-5xl mx-auto"
        style={{
          paddingTop: '80px',           /* clears HUD + possible mission ticker */
          paddingBottom: '72px',        /* clears bottom nav + safe area */
          paddingLeft: 'max(16px, env(safe-area-inset-left))',
          paddingRight: 'max(16px, env(safe-area-inset-right))',
          minHeight: '100dvh',
        }}
      >
        {children}
      </main>

      {/* Bottom navigation (mobile & desktop alike) */}
      <BottomNav />

      {/* Global reward popup */}
      {showReward && (
        <RewardPopup data={showReward} onDismiss={dismissReward} />
      )}
    </div>
  );
}

export default function GameLayout({ children }) {
  return (
    <LanguageProvider>
      <GameProvider>
        <GameShell>{children}</GameShell>
      </GameProvider>
    </LanguageProvider>
  );
}
