'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useGameStore } from '@/store/gameStore';
import MapExplorer from '@/components/game/MapExplorer';
import DailyTaskPanel from '@/components/game/DailyTaskPanel';
import { XPBar, SectionHeader } from '@/components/ui';
import { sound } from '@/lib/audio';

const NAV_ITEMS = [
  { key: 'map',    icon: '🗺️',  label: 'World Map',      labelId: 'Peta Dunia' },
  { key: 'daily',  icon: '📋',  label: 'Daily Tasks',    labelId: 'Tugas Harian' },
  { key: 'modes',  icon: '🎮',  label: 'Game Modes',     labelId: 'Mode Game' },
];

const GAME_MODES = [
  { key: 'rpg',       icon: '🎮',  label: '2D RPG World [NEW]', labelId: 'Dunia RPG 2D [BARU]', desc: 'Immersive exploration & support', descId: 'Eksplorasi & support imersif', path: '/game/rpg',       color: '#39ff14' },
  { key: 'adventure', icon: '⚔️',  label: 'Adventure Mode',  labelId: 'Mode Petualangan',  desc: 'Story missions & exploration', descId: 'Misi cerita & eksplorasi', path: '/game/adventure', color: '#00f5ff' },
  { key: 'workshop',  icon: '🔧',  label: 'Workshop',         labelId: 'Workshop',           desc: 'PC repair practice',          descId: 'Latihan perbaikan PC',   path: '/game/workshop',  color: '#ff6b00' },
  { key: 'daily',     icon: '📅',  label: 'Daily Tasks',      labelId: 'Tugas Harian',       desc: 'Quick daily challenges',      descId: 'Tantangan cepat harian', path: '/game/daily',     color: '#ffe600' }, // changed color slightly for variety
  { key: 'profile',   icon: '👤',  label: 'My Profile',       labelId: 'Profil Saya',        desc: 'Skills, achievements, stats', descId: 'Keahlian & pencapaian',  path: '/game/profile',   color: '#bf00ff' },
];

export default function GameHubPage() {
  const { t, lang } = useLanguage();
  const { playerName, level, totalXP, loginStreak, completedMissions, getLevelProgress, getRank } = useGameStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('map');

  const progress = getLevelProgress();
  const rank = getRank();

  const handleNav = (key) => { sound.click(); setActiveTab(key); };
  const handleMode = (path) => { sound.click(); router.push(path); };

  return (
    <div className="space-y-5">

      {/* Player summary card — compact on mobile, full on desktop */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3"
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-10 h-10 rounded-xl border border-white/15 flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: `${rank?.color}15` }}
        >
          {rank?.emoji}
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-white text-sm truncate">{playerName}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full border font-semibold flex-shrink-0"
              style={{ color: rank?.color, borderColor: `${rank?.color}40`, background: `${rank?.color}10` }}>
              {t(`ranks.${rank?.key}`)}
            </span>
          </div>
          <p className="text-[11px] text-white/40 mt-0.5">
            {completedMissions.length} missions
            {loginStreak > 0 && ` · 🔥 ${loginStreak} day streak`}
          </p>
          {/* XP bar only visible sm+ (hidden on mobile — HUD shows it) */}
          <div className="hidden sm:block mt-2">
            <XPBar current={progress.current} needed={progress.needed} percent={progress.percent} level={level} rank={rank} />
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-xl font-black text-orbitron" style={{ color: rank?.color }}>Lv {level}</div>
          <div className="text-[10px] text-white/30 hidden sm:block">{totalXP.toLocaleString()} XP</div>
        </div>
      </motion.div>

      {/* Tab navigation */}
      <div className="flex gap-1 p-1 rounded-xl border border-white/5 bg-white/[0.02]">
        {NAV_ITEMS.map(item => (
          <button
            key={item.key}
            onClick={() => handleNav(item.key)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === item.key
                ? 'bg-[rgba(0,245,255,0.1)] text-[var(--neon-cyan)] border border-[rgba(0,245,255,0.2)]'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            <span>{item.icon}</span>
            <span className="hidden sm:inline">{lang === 'id' ? item.labelId : item.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'map' && (
          <MapExplorer onSelectArea={(area) => router.push(`/game/rpg?area=${area.key}`)} />
        )}

        {activeTab === 'daily' && (
          <DailyTaskPanel />
        )}

        {activeTab === 'modes' && (
          <div className="space-y-4">
            <SectionHeader title="Game Modes" subtitle="Choose how you want to play" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {GAME_MODES.map((mode, i) => (
                <motion.button
                  key={mode.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleMode(mode.path)}
                  className="text-left p-5 rounded-2xl border transition-all group"
                  style={{
                    background: `${mode.color}08`,
                    borderColor: `${mode.color}25`,
                  }}
                  onMouseEnter={() => sound.hover()}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl border flex-shrink-0"
                      style={{ background: `${mode.color}15`, borderColor: `${mode.color}30` }}>
                      {mode.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base group-hover:text-white transition-colors"
                        style={{ color: mode.color }}>
                        {lang === 'id' ? mode.labelId : mode.label}
                      </h3>
                      <p className="text-sm text-white/40 mt-0.5">
                        {lang === 'id' ? mode.descId : mode.desc}
                      </p>
                    </div>
                    <span className="ml-auto text-white/20 group-hover:text-white/60 transition-colors mt-1">→</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
