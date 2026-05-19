'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { CAREER_PATHS, getAvailablePaths, getUnlockedPerks } from '@/lib/careerPaths';
import { sound } from '@/lib/audio';

const CAREER_ICONS = {
  hardware: { bg: '#ff6b0015', border: '#ff6b0040' },
  network:  { bg: '#00f5ff15', border: '#00f5ff40' },
  sysadmin: { bg: '#bf00ff15', border: '#bf00ff40' },
  security: { bg: '#ff2d7815', border: '#ff2d7840' },
  helpdesk: { bg: '#ffe60015', border: '#ffe60040' },
};

export default function CareerPage() {
  const { level, careerPath, careerLevel, careerXP, setCareerPath } = useGameStore();
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const available = getAvailablePaths(level);
  const locked = Object.values(CAREER_PATHS).filter(p => p.unlockLevel > level);
  const currentPath = careerPath ? CAREER_PATHS[careerPath] : null;

  const handleSelect = (path) => {
    if (careerPath) return;
    sound.click();
    setSelected(path.id === selected ? null : path.id);
  };

  const handleConfirm = () => {
    if (!selected) return;
    sound.snap?.();
    setCareerPath(selected);
    setConfirmed(true);
  };

  const selectedPath = selected ? CAREER_PATHS[selected] : null;

  // ── Already has career path ───────────────────────────────
  if (currentPath) {
    const perks = getUnlockedPerks(careerPath, careerLevel);
    const allPerks = currentPath.perks;
    const ci = CAREER_ICONS[careerPath];

    return (
      <div className="max-w-2xl mx-auto space-y-5 px-4 py-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-5 border" style={{ background: ci.bg, borderColor: ci.border }}>
          <div className="flex items-center gap-4">
            <div className="text-5xl">{currentPath.emoji}</div>
            <div>
              <h1 className="text-xl font-black text-white">{currentPath.name}</h1>
              <p className="text-sm text-white/50">{currentPath.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                  style={{ color: currentPath.color, background: `${currentPath.color}15`, border: `1px solid ${currentPath.color}30` }}>
                  Career Lv {careerLevel}
                </span>
                <span className="text-xs text-white/40">{careerXP.toLocaleString()} Career XP</span>
              </div>
            </div>
          </div>
          {/* XP Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-white/40 mb-1">
              <span>Career Progress</span>
              <span>Lv {careerLevel} / 20</span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <motion.div className="h-full rounded-full" initial={{ width: 0 }}
                animate={{ width: `${(careerLevel / 20) * 100}%` }}
                style={{ background: currentPath.color }} transition={{ duration: 1 }} />
            </div>
          </div>
        </motion.div>

        {/* Skill Focus */}
        <div className="glass rounded-xl p-4 border border-white/10">
          <h3 className="text-sm font-bold text-white mb-3">🎯 Skill Focus</h3>
          <div className="flex flex-wrap gap-2">
            {currentPath.skillFocus.map(s => (
              <span key={s} className="text-xs px-3 py-1 rounded-full border"
                style={{ color: currentPath.color, borderColor: `${currentPath.color}30`, background: `${currentPath.color}10` }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Perks */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider">🏆 Career Perks</h3>
          {allPerks.map(perk => {
            const earned = perks.some(p => p.id === perk.id);
            return (
              <motion.div key={perk.id} whileHover={earned ? { x: 4 } : {}}
                className={`rounded-xl p-4 border flex items-center gap-3 transition-all ${
                  earned ? 'border-[rgba(255,255,255,0.15)] bg-white/[0.04]' : 'border-white/5 opacity-40'
                }`}>
                <div className="text-2xl">{earned ? '✅' : '🔒'}</div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-white">{perk.name}</p>
                  <p className="text-xs text-white/40">{perk.desc}</p>
                </div>
                <span className="text-xs text-white/30">Career Lv {perk.level}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Exclusive Tools */}
        <div className="glass rounded-xl p-4 border border-white/10">
          <h3 className="text-sm font-bold text-white mb-3">🔧 Exclusive Tools</h3>
          <div className="grid grid-cols-2 gap-2">
            {currentPath.exclusiveTools.map(tool => (
              <div key={tool} className="text-xs px-3 py-2 rounded-lg border border-white/10 text-white/50 bg-white/[0.02]">
                {tool.replace(/_/g, ' ')}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Career Selection ──────────────────────────────────────
  return (
    <div className="max-w-2xl mx-auto space-y-5 px-4 py-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black text-white text-orbitron">🎯 Choose Your Career</h1>
        <p className="text-sm text-white/40 mt-1">Specialize your IT career path. This unlocks unique missions, tools, and XP bonuses. Choose carefully!</p>
      </motion.div>

      {/* Available Paths */}
      <div className="space-y-3">
        {available.map((path, i) => {
          const ci = CAREER_ICONS[path.id];
          const isSel = selected === path.id;
          return (
            <motion.button key={path.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              onClick={() => handleSelect(path)}
              className="w-full text-left rounded-2xl p-4 border transition-all"
              style={{
                background: isSel ? ci.bg : 'rgba(255,255,255,0.02)',
                borderColor: isSel ? path.color : 'rgba(255,255,255,0.08)',
                boxShadow: isSel ? `0 0 20px ${path.color}20` : 'none',
              }}>
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">{path.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-white">{path.name}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                      style={{ color: path.color, background: `${path.color}15`, border: `1px solid ${path.color}30` }}>
                      Available Lv {path.unlockLevel}+
                    </span>
                  </div>
                  <p className="text-xs text-white/50 mt-1">{path.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {path.skillFocus.slice(0, 3).map(s => (
                      <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40">{s}</span>
                    ))}
                  </div>
                  {/* XP bonus badge */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {Object.entries(path.xpBonus).filter(([,v]) => v > 0).map(([cat, val]) => (
                      <span key={cat} className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                        style={{ color: path.color, background: `${path.color}10` }}>
                        +{Math.round(val * 100)}% {cat} XP
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: isSel ? path.color : 'rgba(255,255,255,0.2)', background: isSel ? path.color : 'transparent' }}>
                  {isSel && <div className="w-2 h-2 rounded-full bg-black" />}
                </div>
              </div>

              {/* Perks preview */}
              <AnimatePresence>
                {isSel && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} className="mt-4 space-y-1 overflow-hidden">
                    <p className="text-xs text-white/30 uppercase tracking-wider mb-2">Perks</p>
                    {path.perks.map(perk => (
                      <div key={perk.id} className="flex items-center gap-2 text-xs">
                        <span className="text-white/20">Lv {perk.level}</span>
                        <span className="font-semibold text-white/70">{perk.name}</span>
                        <span className="text-white/40 truncate">— {perk.desc}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Locked paths */}
      {locked.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-white/25 uppercase tracking-wider">🔒 Locked Paths</h3>
          {locked.map(path => (
            <div key={path.id} className="rounded-xl p-3 border border-white/5 flex items-center gap-3 opacity-40">
              <div className="text-2xl">{path.emoji}</div>
              <div>
                <p className="text-sm font-semibold text-white">{path.name}</p>
                <p className="text-xs text-white/40">Unlocks at Level {path.unlockLevel}</p>
              </div>
              <span className="ml-auto text-sm">🔒</span>
            </div>
          ))}
        </div>
      )}

      {/* Confirm button */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="sticky bottom-4">
            <button onClick={handleConfirm}
              className="w-full py-4 rounded-xl font-black text-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: `linear-gradient(135deg, ${CAREER_PATHS[selected]?.color}, ${CAREER_PATHS[selected]?.color}90)`,
                boxShadow: `0 0 30px ${CAREER_PATHS[selected]?.color}40`,
                color: '#000',
              }}>
              {CAREER_PATHS[selected]?.emoji} Choose {CAREER_PATHS[selected]?.name}
            </button>
            <p className="text-center text-xs text-white/30 mt-2">⚠️ This choice is permanent</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
