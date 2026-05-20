'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useGameStore } from '@/store/gameStore';
import { useRouter } from 'next/navigation';
import SkillTree from '@/components/game/SkillTree';
import { XPBar, Badge, Card, SectionHeader } from '@/components/ui';
import { sound } from '@/lib/audio';
import { signOut } from '@/lib/supabase';
import { loadGame } from '@/lib/saveSystem';

const AVATARS = ['👨‍💻','👩‍💻','🧑‍💻','👨‍🔧','👩‍🔧','🧑‍🔧','🕵️','👾','🤖','🦾'];

const ACHIEVEMENTS_META = {
  firstFix:    { emoji: '🔧', name: 'First Fix!',       desc: 'Completed first mission' },
  allBeginner: { emoji: '🎓', name: 'Beginner Graduate', desc: 'All beginner missions done' },
  level10:     { emoji: '⭐', name: 'Rising Tech',       desc: 'Reached Level 10' },
  streak7:     { emoji: '🔥', name: 'Week Warrior',      desc: '7-day login streak' },
  streak30:    { emoji: '💎', name: 'Monthly Pro',        desc: '30-day login streak' },
  networkWiz:  { emoji: '🌐', name: 'Network Wizard',    desc: 'Fixed 10 network issues' },
  hardwarePro: { emoji: '🖥️', name: 'Hardware Pro',      desc: 'Fixed 10 hardware issues' },
  speedRunner: { emoji: '⚡', name: 'Speed Runner',       desc: 'Completed mission <60s' },
  noHints:     { emoji: '🧠', name: 'No Hints Needed',   desc: 'Solved without hints' },
};

const TOOL_META = {
  screwdriver:     { emoji: '🪛', name: 'Screwdriver',     desc: 'Basic hardware repair' },
  cableTester:     { emoji: '🔌', name: 'Cable Tester',    desc: 'Diagnose cable faults' },
  usbToolkit:      { emoji: '💾', name: 'USB Toolkit',     desc: 'Bootable USB utilities' },
  thermalScanner:  { emoji: '🌡️', name: 'Thermal Scanner', desc: 'Detect heat issues' },
  adminKit:        { emoji: '⚙️', name: 'Admin Toolkit',   desc: 'System administration' },
  networkAnalyzer: { emoji: '📡', name: 'Net Analyzer',    desc: 'Advanced network diagnostics' },
};

export default function ProfilePage() {
  const { t, lang, switchLanguage } = useLanguage();
  const { playerName, avatar, level, totalXP, coins, loginStreak, completedMissions,
          achievements, tools, skills, setPlayerName, setAvatar, getLevelProgress, getRank, hydrate } = useGameStore();
  const router = useRouter();

  const [tab, setTab] = useState('stats');
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(playerName);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const handleLogout = async () => {
    if (window.confirm(t('logoutConfirm') || 'Are you sure you want to log out to switch accounts?')) {
      sound.click();
      await signOut();
      const guestSave = await loadGame();
      hydrate(guestSave || {}, null);
      router.push('/');
    }
  };

  const progress = getLevelProgress();
  const rank = getRank();

  const tabs = [
    { key: 'stats',    icon: '📊', label: 'Stats' },
    { key: 'skills',   icon: '🌳', label: 'Skills' },
    { key: 'tools',    icon: '🔧', label: 'Tools' },
    { key: 'achievements', icon: '🏅', label: 'Achievements' },
  ];

  const saveName = () => {
    if (nameInput.trim()) { setPlayerName(nameInput.trim()); sound.snap(); }
    setEditingName(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">

      {/* Compact profile header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="glass border border-white/10 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setShowAvatarPicker(true); sound.click(); }}
            className="w-16 h-16 rounded-2xl border-2 flex items-center justify-center text-3xl relative flex-shrink-0"
            style={{ background: `${rank?.color}15`, borderColor: rank?.color, boxShadow: `0 0 16px ${rank?.color}30` }}
          >
            {avatar}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[var(--bg-card)] border border-white/20 flex items-center justify-center text-xs">✏️</div>
          </motion.button>

          <div className="flex-1 min-w-0">
            {/* Name editor */}
            {editingName ? (
              <div className="flex items-center gap-2">
                <input value={nameInput} onChange={e => setNameInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && saveName()}
                  className="bg-white/5 border border-[var(--neon-cyan)] rounded-lg px-3 py-1 text-white font-bold w-full focus:outline-none text-sm"
                  autoFocus />
                <button onClick={saveName} className="text-[var(--neon-green)] text-sm flex-shrink-0">✓</button>
              </div>
            ) : (
              <button onClick={() => { setEditingName(true); setNameInput(playerName); }} className="flex items-center gap-1.5 group">
                <h2 className="text-base font-black text-white group-hover:text-[var(--neon-cyan)] transition-colors truncate">{playerName}</h2>
                <span className="text-white/20 group-hover:text-white/50 text-xs transition-colors flex-shrink-0">✏️</span>
              </button>
            )}
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-xs px-2 py-0.5 rounded-full border font-semibold"
                style={{ color: rank?.color, borderColor: `${rank?.color}40`, background: `${rank?.color}10` }}>
                {rank?.emoji} {t(`ranks.${rank?.key}`)}
              </span>
              {loginStreak > 0 && <span className="text-xs text-[var(--neon-orange)]">🔥 {loginStreak}d</span>}
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <div className="text-2xl font-black text-orbitron" style={{ color: rank?.color }}>Lv {level}</div>
            <div className="text-[10px] text-white/30">{totalXP.toLocaleString()} XP</div>
          </div>
        </div>
        {/* XP bar — hidden on mobile (HUD has it) */}
        <div className="hidden sm:block mt-3">
          <XPBar current={progress.current} needed={progress.needed} percent={progress.percent} level={level} rank={rank} />
        </div>
      </motion.div>

      {/* Avatar picker overlay */}
      <AnimatePresence>
        {showAvatarPicker && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setShowAvatarPicker(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="glass border border-white/15 rounded-2xl p-6 max-w-xs w-full" onClick={e => e.stopPropagation()}>
              <h3 className="text-lg font-bold text-white text-center mb-4">{t('chooseAvatar')}</h3>
              <div className="grid grid-cols-5 gap-3">
                {AVATARS.map(av => (
                  <motion.button key={av} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                    onClick={() => { setAvatar(av); setShowAvatarPicker(false); sound.snap(); }}
                    className={`w-11 h-11 rounded-xl text-2xl flex items-center justify-center border transition-all ${
                      avatar === av ? 'border-[var(--neon-cyan)] bg-[rgba(0,245,255,0.15)]' : 'border-white/10 hover:border-white/30'
                    }`}>
                    {av}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl border border-white/5 bg-white/[0.02]">
        {tabs.map(tb => (
          <button key={tb.key} onClick={() => { setTab(tb.key); sound.click(); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              tab === tb.key ? 'bg-[rgba(0,245,255,0.1)] text-[var(--neon-cyan)] border border-[rgba(0,245,255,0.2)]' : 'text-white/40 hover:text-white/70'
            }`}>
            <span>{tb.icon}</span>
            <span className="hidden sm:inline">{tb.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>

          {/* Stats tab */}
          {tab === 'stats' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Level',     value: level,                        icon: '⭐', color: '#ffe600' },
                  { label: 'Total XP',  value: totalXP.toLocaleString(),     icon: '🔮', color: '#00f5ff' },
                  { label: 'Coins',     value: coins.toLocaleString(),        icon: '🪙', color: '#ffa500' },
                  { label: 'Missions',  value: completedMissions.length,     icon: '✅', color: '#39ff14' },
                  { label: 'Day Streak',value: loginStreak,                  icon: '🔥', color: '#ff6b00' },
                  { label: 'Tools',     value: tools.length,                 icon: '🔧', color: '#bf00ff' },
                  { label: 'Achievements', value: achievements.length,       icon: '🏅', color: '#ff2d78' },
                  { label: 'Skill Pts', value: Object.values(skills).reduce((a,b)=>a+b,0), icon: '💎', color: '#00f5ff' },
                ].map(stat => (
                  <motion.div key={stat.label} whileHover={{ y: -2 }}
                    className="rounded-xl p-4 border border-white/5 bg-white/[0.02] text-center">
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-xl font-black" style={{ color: stat.color }}>{stat.value}</div>
                    <div className="text-xs text-white/40">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* System Settings Card */}
              <div className="glass rounded-2xl p-5 border border-white/10 space-y-4 mt-2">
                <SectionHeader title={`⚙️ ${t('settings') || 'System Settings'}`} subtitle={lang === 'en' ? 'Manage your account session and interface language' : 'Kelola sesi akun dan bahasa antarmuka'} />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Language Toggle Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      sound.click();
                      switchLanguage(lang === 'en' ? 'id' : 'en');
                    }}
                    className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🌐</span>
                      <div className="text-left">
                        <p className="font-bold text-white text-sm">
                          {lang === 'en' ? 'Interface Language' : 'Bahasa Antarmuka'}
                        </p>
                        <p className="text-xs text-white/40">
                          {lang === 'en' ? 'Switch interface language' : 'Ubah bahasa tampilan'}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-black px-2.5 py-1 rounded bg-[rgba(0,245,255,0.1)] border border-[rgba(0,245,255,0.2)] text-[var(--neon-cyan)]">
                      {lang === 'en' ? 'EN ➔ ID' : 'ID ➔ EN'}
                    </span>
                  </motion.button>

                  {/* Logout Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                    className="flex items-center justify-between p-4 rounded-xl border border-[rgba(255,45,120,0.2)] bg-[rgba(255,45,120,0.03)] hover:bg-[rgba(255,45,120,0.08)] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🚪</span>
                      <div className="text-left">
                        <p className="font-bold text-white text-sm">{t('logout')}</p>
                        <p className="text-xs text-white/40">
                          {lang === 'en' ? 'Sign out to switch accounts' : 'Keluar untuk berganti akun'}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-[rgba(255,45,120,0.1)] border border-[var(--neon-pink)]/30 text-[var(--neon-pink)]">
                      {t('logout')?.toUpperCase()}
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          ) }

          {/* Skills tab */}
          {tab === 'skills' && <SkillTree />}

          {/* Tools tab */}
          {tab === 'tools' && (
            <div className="space-y-3">
              <SectionHeader title="🔧 Tool Inventory" subtitle={`${tools.length} tools unlocked`} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(TOOL_META).map(([key, meta]) => {
                  const owned = tools.includes(key);
                  return (
                    <div key={key} className={`rounded-xl p-4 border flex items-center gap-3 transition-all ${
                      owned ? 'border-[rgba(0,245,255,0.2)] bg-[rgba(0,245,255,0.04)]' : 'border-white/5 opacity-40'
                    }`}>
                      <div className="text-3xl">{meta.emoji}</div>
                      <div>
                        <p className="font-semibold text-white text-sm">{meta.name}</p>
                        <p className="text-xs text-white/40">{meta.desc}</p>
                      </div>
                      {owned ? <Badge variant="cyan" size="xs" className="ml-auto">Owned</Badge>
                             : <Badge variant="default" size="xs" className="ml-auto">Locked</Badge>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Achievements tab */}
          {tab === 'achievements' && (
            <div className="space-y-3">
              <SectionHeader title="🏅 Achievements" subtitle={`${achievements.length}/${Object.keys(ACHIEVEMENTS_META).length} unlocked`} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(ACHIEVEMENTS_META).map(([key, meta]) => {
                  const earned = achievements.includes(key);
                  return (
                    <motion.div key={key} whileHover={earned ? { y: -2 } : {}}
                      className={`rounded-xl p-4 border flex items-center gap-3 ${
                        earned ? 'border-[rgba(255,165,0,0.3)] bg-[rgba(255,165,0,0.05)]' : 'border-white/5 opacity-40 grayscale'
                      }`}>
                      <div className="text-3xl">{earned ? meta.emoji : '🔒'}</div>
                      <div>
                        <p className="font-semibold text-white text-sm">{meta.name}</p>
                        <p className="text-xs text-white/40">{meta.desc}</p>
                      </div>
                      {earned && <span className="ml-auto text-xs text-[var(--neon-green)]">✓</span>}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>


    </div>
  );
}
