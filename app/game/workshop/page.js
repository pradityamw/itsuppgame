'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useGameStore } from '@/store/gameStore';
import { useRouter } from 'next/navigation';
import PCRepairPanel from '@/components/game/PCRepairPanel';
import Terminal from '@/components/game/Terminal';
import { getMissionById } from '@/lib/missions';
import { Badge, SectionHeader } from '@/components/ui';
import { sound } from '@/lib/audio';

const PRACTICE_MISSIONS = [
  { id: 'mission_001', label: 'Loose PSU Cable',   labelId: 'Kabel PSU Longgar',     icon: '🔌', type: 'pc_repair', diff: 'easy' },
  { id: 'mission_003', label: 'Dusty Fan',          labelId: 'Kipas Berdebu',          icon: '🌀', type: 'pc_repair', diff: 'easy' },
];

const TERMINAL_TOPICS = [
  { id: 'ping',      label: 'Ping & Connectivity', labelId: 'Ping & Konektivitas', desc: 'Test network with ping commands', icon: '📡' },
  { id: 'ipconfig',  label: 'IP Configuration',    labelId: 'Konfigurasi IP',      desc: 'Read ipconfig output',           icon: '🌐' },
  { id: 'processes', label: 'Process Management',  labelId: 'Manajemen Proses',    desc: 'Use tasklist and msconfig',      icon: '⚙️' },
];

export default function WorkshopPage() {
  const { t, lang } = useLanguage();
  const { completeMission, addToast, tools } = useGameStore();
  const router = useRouter();

  const [mode, setMode] = useState('menu');         // 'menu' | 'pcrepair' | 'terminal' | 'complete'
  const [activePractice, setActivePractice] = useState(null);

  const startPractice = (practice) => {
    const mission = getMissionById(practice.id);
    if (!mission) return;
    setActivePractice({ ...mission, ...practice });
    setMode(practice.type === 'pc_repair' ? 'pcrepair' : 'terminal');
    sound.powerOn();
  };

  const handleComplete = () => {
    sound.missionComplete();
    addToast('Practice Complete! +50 XP', 'xp', '🔧');
    setMode('complete');
  };

  const handleBack = () => {
    setMode('menu');
    setActivePractice(null);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>        <h1 className="text-xl font-black text-white">🔧 Workshop</h1>
        <p className="text-xs text-white/40 mt-0.5">Practice repairs and terminal skills</p>
      </motion.div>

      <AnimatePresence mode="wait">

        {/* MENU */}
        {mode === 'menu' && (
          <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">

            {/* Tools banner */}
            <div className="rounded-2xl p-4 border border-[rgba(255,107,0,0.2)] bg-[rgba(255,107,0,0.05)] flex items-center gap-4">
              <div className="text-4xl">🛠️</div>
              <div>
                <p className="font-bold text-white">Your Tools: {tools.length} unlocked</p>
                <p className="text-xs text-white/40">Complete missions to unlock more tools</p>
              </div>
              <div className="ml-auto flex gap-1">
                {tools.map(t => <span key={t} className="text-xl" title={t}>{
                  { screwdriver: '🪛', cableTester: '🔌', usbToolkit: '💾', thermalScanner: '🌡️', adminKit: '⚙️', networkAnalyzer: '📡' }[t] || '🔧'
                }</span>)}
              </div>
            </div>

            {/* PC Repair Practice */}
            <div>
              <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-3">🖥️ PC Repair Practice</h3>
              <div className="space-y-3">
                {PRACTICE_MISSIONS.map(p => (
                  <motion.button
                    key={p.id}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { sound.click(); startPractice(p); }}
                    className="w-full text-left rounded-xl p-4 border border-white/8 hover:border-[rgba(255,107,0,0.4)] bg-white/[0.02] hover:bg-[rgba(255,107,0,0.04)] transition-all group flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl border border-[rgba(255,107,0,0.3)] bg-[rgba(255,107,0,0.08)] flex items-center justify-center text-2xl">{p.icon}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-white group-hover:text-[var(--neon-orange)] transition-colors">
                        {lang === 'id' ? p.labelId : p.label}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant={p.diff} size="xs">{p.diff}</Badge>
                        <span className="text-xs text-white/30">PC Repair</span>
                      </div>
                    </div>
                    <span className="text-white/20 group-hover:text-[var(--neon-orange)] transition-colors">→</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Terminal Practice */}
            <div>
              <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-3">💻 Terminal Practice</h3>
              <div className="space-y-3">
                {TERMINAL_TOPICS.map(topic => (
                  <motion.button
                    key={topic.id}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { sound.click(); setMode('terminal'); setActivePractice(topic); }}
                    className="w-full text-left rounded-xl p-4 border border-white/8 hover:border-[rgba(57,255,20,0.3)] bg-white/[0.02] hover:bg-[rgba(57,255,20,0.03)] transition-all group flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl border border-[rgba(57,255,20,0.2)] bg-[rgba(57,255,20,0.05)] flex items-center justify-center text-2xl">{topic.icon}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-white group-hover:text-[var(--neon-green)] transition-colors">
                        {lang === 'id' ? topic.labelId : topic.label}
                      </p>
                      <p className="text-xs text-white/30 mt-0.5">{topic.desc}</p>
                    </div>
                    <span className="text-white/20 group-hover:text-[var(--neon-green)] transition-colors">→</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quick learn tip */}
            <div className="rounded-xl p-4 border border-[rgba(191,0,255,0.2)] bg-[rgba(191,0,255,0.04)]">
              <p className="text-xs text-[var(--neon-purple)] font-bold mb-1">🎮 Workshop Mode</p>
              <p className="text-xs text-white/50">Practice any repair scenario without mission pressure. Great for reviewing skills you learned in Adventure Mode!</p>
            </div>
          </motion.div>
        )}

        {/* PC REPAIR MODE */}
        {mode === 'pcrepair' && activePractice && (
          <motion.div key="pcrepair" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="flex items-center gap-3">
              <button onClick={handleBack} className="text-white/40 hover:text-white text-sm transition-colors">← Back</button>
              <h2 className="font-bold text-white">{lang === 'id' ? activePractice.labelId : activePractice.label}</h2>
              <Badge variant="easy" size="xs">Practice Mode</Badge>
            </div>
            <PCRepairPanel mission={activePractice} onComplete={handleComplete} onFail={handleBack} />
          </motion.div>
        )}

        {/* TERMINAL FREE MODE */}
        {mode === 'terminal' && (
          <motion.div key="terminal" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="flex items-center gap-3">
              <button onClick={handleBack} className="text-white/40 hover:text-white text-sm transition-colors">← Back</button>
              <h2 className="font-bold text-white">
                {activePractice ? (lang === 'id' ? activePractice.labelId : activePractice.label) : 'Terminal'}
              </h2>
              <Badge variant="green" size="xs">Free Mode</Badge>
            </div>
            <div className="rounded-xl p-3 border border-[rgba(57,255,20,0.15)] bg-[rgba(57,255,20,0.03)] text-xs text-white/50">
              💡 Try: <code className="text-[var(--neon-green)]">ping 8.8.8.8</code> · <code className="text-[var(--neon-green)]">ipconfig</code> · <code className="text-[var(--neon-green)]">tracert google.com</code> · <code className="text-[var(--neon-green)]">help</code>
            </div>
            <Terminal freeMode={true} onComplete={() => addToast('Terminal session done! +30 XP', 'xp', '💻')} />
          </motion.div>
        )}

        {/* COMPLETE */}
        {mode === 'complete' && (
          <motion.div key="complete" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
            className="text-center py-12 space-y-5">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: 2 }} className="text-6xl">🏆</motion.div>
            <h3 className="text-2xl font-bold text-[var(--neon-green)]">Practice Complete!</h3>
            <p className="text-white/50 text-sm">You've mastered this repair scenario.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={handleBack} className="btn-game btn-game-green py-2.5 px-6">Practice Again</button>
              <button onClick={() => setMode('menu')} className="px-6 py-2.5 text-sm text-white/40 hover:text-white border border-white/10 rounded-xl transition-colors">Back to Workshop</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
