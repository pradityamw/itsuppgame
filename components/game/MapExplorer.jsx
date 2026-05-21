'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { useLanguage } from '@/context/LanguageContext';
import { sound } from '@/lib/audio';
import { useRouter } from 'next/navigation';

// ── All 22 Areas — 7 Tiers ────────────────────────────────────
const AREAS = [
  // ── TIER 1: Digital Beginner (Lv 1–10) ────────────────────
  { key: 'bedroom',     emoji: '🛏️', x: 12, y: 8,  tier: 1, requiredLevel: 1,  missionCount: 5,  connections: ['familyPC', 'homeWifi'] },
  { key: 'familyPC',   emoji: '🖥️', x: 32, y: 8,  tier: 1, requiredLevel: 2,  missionCount: 4,  connections: ['repairCorner'] },
  { key: 'homeWifi',   emoji: '📶', x: 55, y: 8,  tier: 1, requiredLevel: 2,  missionCount: 3,  connections: ['repairCorner'] },
  { key: 'repairCorner',emoji: '🔧', x: 78, y: 8, tier: 1, requiredLevel: 3,  missionCount: 3,  connections: ['repairShop'] },

  // ── TIER 2: Computer Technician (Lv 10–20) ────────────────
  { key: 'repairShop',  emoji: '🏪', x: 12, y: 25, tier: 2, requiredLevel: 10, missionCount: 6,  connections: ['gamingCafe', 'upgradeCenter'] },
  { key: 'gamingCafe',  emoji: '🎮', x: 38, y: 25, tier: 2, requiredLevel: 12, missionCount: 4,  connections: ['upgradeCenter'] },
  { key: 'upgradeCenter',emoji:'⚙️', x: 65, y: 25, tier: 2, requiredLevel: 10, missionCount: 3,  connections: ['startupOffice'] },

  // ── TIER 3: Windows IT Support (Lv 20–35) ─────────────────
  { key: 'startupOffice',emoji:'🏢', x: 12, y: 44, tier: 3, requiredLevel: 20, missionCount: 8,  connections: ['schoolLab', 'smallBizOffice'] },
  { key: 'schoolLab',   emoji: '🏫', x: 40, y: 44, tier: 3, requiredLevel: 22, missionCount: 5,  connections: ['smallBizOffice'] },
  { key: 'smallBizOffice',emoji:'💼',x: 68, y: 44, tier: 3, requiredLevel: 24, missionCount: 5,  connections: ['officeNetwork'] },

  // ── TIER 4: Network Technician (Lv 35–50) ─────────────────
  { key: 'ispBranch',   emoji: '📡', x: 12, y: 62, tier: 4, requiredLevel: 35, missionCount: 5,  connections: ['internetCafe', 'officeNetwork'] },
  { key: 'internetCafe',emoji: '☕', x: 36, y: 62, tier: 4, requiredLevel: 36, missionCount: 4,  connections: ['officeNetwork'] },
  { key: 'officeNetwork',emoji:'🌐', x: 60, y: 62, tier: 4, requiredLevel: 37, missionCount: 6,  connections: ['networkOpsRoom'] },
  { key: 'networkOpsRoom',emoji:'🖧', x: 84, y: 62, tier: 4, requiredLevel: 40, missionCount: 4,  connections: ['serverRoom'] },

  // ── TIER 5: SysAdmin (Lv 50–70) ───────────────────────────
  { key: 'enterpriseOffice',emoji:'🏦',x:12, y: 78, tier: 5, requiredLevel: 50, missionCount: 5,  connections: ['serverRoom'] },
  { key: 'serverRoom',  emoji: '🖥️', x: 36, y: 78, tier: 5, requiredLevel: 51, missionCount: 6,  connections: ['miniDataCenter', 'itControlCenter'] },
  { key: 'miniDataCenter',emoji:'💾',x: 60, y: 78, tier: 5, requiredLevel: 55, missionCount: 4,  connections: ['itControlCenter'] },
  { key: 'itControlCenter',emoji:'📊',x:84, y: 78, tier: 5, requiredLevel: 58, missionCount: 4,  connections: ['secOps'] },

  // ── TIER 6: Security (Lv 70–90) ───────────────────────────
  { key: 'secOps',      emoji: '🛡️', x: 18, y: 88, tier: 6, requiredLevel: 70, missionCount: 6,  connections: ['securityWing'] },
  { key: 'securityWing',emoji: '🔐', x: 48, y: 88, tier: 6, requiredLevel: 72, missionCount: 5,  connections: ['threatRoom'] },
  { key: 'threatRoom',  emoji: '🚨', x: 76, y: 88, tier: 6, requiredLevel: 75, missionCount: 4,  connections: ['globalDataCenter'] },

  // ── TIER 7: Senior Engineer (Lv 90–100) ───────────────────
  { key: 'globalDataCenter',emoji:'🌍',x:50,y: 96, tier: 7, requiredLevel: 90, missionCount: 6,  connections: [] },
];

const TIER_CONFIG = [
  { tier: 1, y: 2,  label: 'TIER 1 — DIGITAL BEGINNER',    color: '#39ff14', levelRange: 'Lv 1–10' },
  { tier: 2, y: 19, label: 'TIER 2 — COMPUTER TECHNICIAN', color: '#00f5ff', levelRange: 'Lv 10–20' },
  { tier: 3, y: 38, label: 'TIER 3 — WINDOWS IT SUPPORT',  color: '#4fc3f7', levelRange: 'Lv 20–35' },
  { tier: 4, y: 56, label: 'TIER 4 — NETWORK TECHNICIAN',  color: '#bf00ff', levelRange: 'Lv 35–50' },
  { tier: 5, y: 72, label: 'TIER 5 — SYSTEM ADMIN',        color: '#ff6b00', levelRange: 'Lv 50–70' },
  { tier: 6, y: 83, label: 'TIER 6 — SECURITY',            color: '#ff2d78', levelRange: 'Lv 70–90' },
  { tier: 7, y: 92, label: 'TIER 7 — SENIOR ENGINEER',     color: '#ffd700', levelRange: 'Lv 90–100' },
];

const AREA_LABELS = {
  bedroom: 'Bedroom',       familyPC: 'Family PC',      homeWifi: 'Home WiFi',
  repairCorner: 'Repair Corner', repairShop: 'Repair Shop', gamingCafe: 'Gaming Café',
  upgradeCenter: 'Upgrade Center', startupOffice: 'Startup Office', schoolLab: 'School Lab',
  smallBizOffice: 'Small Business', ispBranch: 'ISP Branch', internetCafe: 'Internet Café',
  officeNetwork: 'Office Network', networkOpsRoom: 'NOC Room', enterpriseOffice: 'Enterprise HQ',
  serverRoom: 'Server Room', miniDataCenter: 'Mini Data Center', itControlCenter: 'IT Control Center',
  secOps: 'SecOps Center', securityWing: 'Security Wing', threatRoom: 'Threat Room',
  globalDataCenter: 'Global Data Center',
};

export default function MapExplorer({ onSelectArea }) {
  const { level, unlockedAreas, completedMissions } = useGameStore();
  const { t } = useLanguage();
  const [hoveredArea, setHoveredArea] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const router = useRouter();

  const isUnlocked = (area) => area.requiredLevel <= level || unlockedAreas.includes(area.key);

  const handleAreaClick = (area) => {
    if (!isUnlocked(area)) { sound.wrong(); return; }
    sound.click();
    setSelectedArea(area.key === selectedArea ? null : area.key);
    onSelectArea?.(area);
  };

  const currentTier = TIER_CONFIG.find(t =>
    level >= t.tier * (level < 10 ? 1 : 10) - 9
  ) || TIER_CONFIG[0];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white text-orbitron">🗺️ World Map</h3>
        <span className="text-xs text-white/40">
          Level <span className="text-[var(--neon-yellow)] font-bold">{level}</span> ·{' '}
          <span style={{ color: TIER_CONFIG.find(t => level >= t.tier * 10 - 9)?.color || '#39ff14' }}>
            {TIER_CONFIG.findIndex(t => t.tier === Math.ceil(level / 14) + 1) >= 0
              ? TIER_CONFIG[Math.min(Math.ceil(level / 14), 6)].label.split('—')[1]?.trim()
              : 'Digital Beginner'}
          </span>
        </span>
      </div>

      {/* Map Container */}
      <div
        className="relative rounded-xl overflow-hidden border border-white/10 cursor-crosshair"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, #0d1f3d 0%, #040810 100%)',
          minHeight: 520,
        }}
      >
        {/* Grid bg */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />

        {/* Tier dividers + labels */}
        {TIER_CONFIG.map(tc => (
          <div key={tc.tier}>
            {/* Horizontal divider line */}
            <div className="absolute left-0 right-0 pointer-events-none" style={{ top: `${tc.y}%` }}>
              <div className="w-full h-px opacity-15" style={{ background: tc.color }} />
            </div>
            {/* Tier label */}
            <div
              className="absolute left-1 pointer-events-none flex items-center gap-1"
              style={{ top: `${tc.y + 0.5}%` }}
            >
              <span className="text-[7px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded"
                style={{ color: tc.color, background: `${tc.color}12`, border: `1px solid ${tc.color}25` }}>
                {tc.levelRange}
              </span>
            </div>
          </div>
        ))}

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
          {AREAS.flatMap(area =>
            area.connections.map(connKey => {
              const target = AREAS.find(a => a.key === connKey);
              if (!target) return null;
              const unlocked = isUnlocked(area) && isUnlocked(target);
              const tc = TIER_CONFIG.find(t => t.tier === area.tier);
              return (
                <line key={`${area.key}-${connKey}`}
                  x1={`${area.x}%`} y1={`${area.y}%`}
                  x2={`${target.x}%`} y2={`${target.y}%`}
                  stroke={unlocked ? (tc?.color || '#00f5ff') : 'rgba(255,255,255,0.05)'}
                  strokeWidth={unlocked ? 1.5 : 0.8}
                  strokeDasharray={unlocked ? '0' : '3,5'}
                  opacity={unlocked ? 0.3 : 0.2}
                />
              );
            })
          )}
        </svg>

        {/* Area nodes */}
        {AREAS.map(area => {
          const unlocked = isUnlocked(area);
          const sel = selectedArea === area.key;
          const hov = hoveredArea === area.key;
          const tc = TIER_CONFIG.find(t => t.tier === area.tier);
          const nodeColor = tc?.color || '#00f5ff';

          return (
            <div key={area.key}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${area.x}%`, top: `${area.y}%` }}
            >
              <motion.button
                whileHover={{ scale: unlocked ? 1.18 : 1 }}
                whileTap={{ scale: unlocked ? 0.9 : 1 }}
                onMouseEnter={() => { setHoveredArea(area.key); if (unlocked) sound.hover(); }}
                onMouseLeave={() => setHoveredArea(null)}
                onClick={() => handleAreaClick(area)}
                className="relative flex items-center justify-center rounded-full transition-all duration-200"
                style={{
                  width: 38, height: 38,
                  background: unlocked ? `${nodeColor}18` : 'rgba(255,255,255,0.04)',
                  border: `2px solid ${unlocked ? nodeColor : 'rgba(255,255,255,0.12)'}`,
                  boxShadow: sel ? `0 0 20px ${nodeColor}60, 0 0 40px ${nodeColor}30` :
                    hov && unlocked ? `0 0 12px ${nodeColor}40` : 'none',
                  opacity: unlocked ? 1 : 0.45,
                }}
              >
                <span className="text-base leading-none">{area.emoji}</span>
                {!unlocked && (
                  <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/40">
                    <span className="text-xs">🔒</span>
                  </div>
                )}
                {/* Pulse for current tier areas */}
                {unlocked && area.tier === Math.min(7, Math.ceil((level + 1) / 14) + 1) && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `2px solid ${nodeColor}`, opacity: 0 }}
                    animate={{ scale: [1, 1.5, 1.5], opacity: [0.6, 0, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}
              </motion.button>

              {/* Label below node */}
              <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                <div className="text-[8px] font-bold uppercase tracking-wide"
                  style={{ color: unlocked ? nodeColor : 'rgba(255,255,255,0.2)' }}>
                  {AREA_LABELS[area.key] || area.key}
                </div>
                {!unlocked && (
                  <div className="text-[7px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
                    Lv {area.requiredLevel}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected area panel */}
      <AnimatePresence>
        {selectedArea && (() => {
          const area = AREAS.find(a => a.key === selectedArea);
          if (!area) return null;
          const tc = TIER_CONFIG.find(t => t.tier === area.tier);
          const nodeColor = tc?.color || '#00f5ff';
          return (
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
              className="rounded-xl p-4 border flex items-center gap-4"
              style={{ borderColor: `${nodeColor}40`, background: `${nodeColor}08` }}
            >
              <span className="text-4xl">{area.emoji}</span>
              <div className="flex-1">
                <h4 className="font-bold text-white">{AREA_LABELS[area.key]}</h4>
                <p className="text-xs mt-0.5" style={{ color: nodeColor }}>{tc?.label}</p>
                <p className="text-xs text-white/40 mt-0.5">{area.missionCount} missions · Min Level {area.requiredLevel}</p>
              </div>
              <button
                onClick={() => router.push(`/game/rpg?area=${area.key}`)}
                className="text-sm font-bold py-2 px-4 rounded-lg transition-all hover:scale-105"
                style={{ background: `${nodeColor}20`, color: nodeColor, border: `1px solid ${nodeColor}40` }}
              >
                Enter →
              </button>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* Tier legend */}
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-1">
        {TIER_CONFIG.map(tc => (
          <div key={tc.tier} className="flex items-center gap-1 text-[8px]">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: tc.color, opacity: level >= tc.tier * 10 - 9 ? 1 : 0.3 }} />
            <span className="truncate" style={{ color: level >= tc.tier * 10 - 9 ? tc.color : 'rgba(255,255,255,0.2)' }}>
              T{tc.tier}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
