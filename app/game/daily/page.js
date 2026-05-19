'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useGameStore } from '@/store/gameStore';
import DailyTaskPanel from '@/components/game/DailyTaskPanel';
import { SectionHeader } from '@/components/ui';
import { getWeeklyTasks, formatResetCountdown } from '@/lib/dailyTasks';

const TIPS = [
  'DNS translates domain names to IP addresses — like a phonebook for the internet.',
  'Always check physical connections before assuming software issues.',
  'The OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.',
  'SFC /scannow repairs corrupted Windows system files using cached copies.',
  'RAID 1 mirrors data across 2 drives. RAID 0 stripes for speed but has no redundancy.',
  'WPA3 is the most secure WiFi protocol. Never use WEP — it\'s completely broken.',
  'Ping tests connectivity. Traceroute shows the path. nslookup tests DNS resolution.',
  'The 3-2-1 backup rule: 3 copies, 2 media types, 1 offsite location.',
  'Port 80 = HTTP. Port 443 = HTTPS. Port 22 = SSH. Port 3389 = RDP.',
  'Always use the Principle of Least Privilege — give users only the access they need.',
];

export default function DailyPage() {
  const { t } = useLanguage();
  const { loginStreak, completedMissions, weeklyProgress, level } = useGameStore();
  const [tab, setTab] = useState('daily');

  // Client-only date values to avoid SSR/client hydration mismatch
  const [todayTip, setTodayTip] = useState(TIPS[0]);
  const [weekDone, setWeekDone] = useState(0);

  useEffect(() => {
    const today = new Date();
    setTodayTip(TIPS[today.getDate() % TIPS.length]);
    const weekKey = `${today.getFullYear()}-W${Math.floor((today - new Date(today.getFullYear(), 0, 1)) / 604800000)}`;
    setWeekDone(weeklyProgress?.[weekKey]?.done?.length || 0);
  }, [weeklyProgress]);

  const weeklyTasks = getWeeklyTasks();
  const resetCountdown = formatResetCountdown();

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">

      {/* Header with streak */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-black text-white text-orbitron">📅 Daily Hub</h1>
          <p className="text-xs text-white/40 mt-1">Resets in {resetCountdown}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-[var(--neon-orange)]">
            {loginStreak > 0 ? `🔥 ${loginStreak}` : '—'}
          </div>
          <div className="text-[10px] text-white/30">Day Streak</div>
        </div>
      </motion.div>

      {/* Streak bonus display */}
      {loginStreak >= 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="rounded-xl p-3 border border-[rgba(255,107,0,0.3)] bg-[rgba(255,107,0,0.06)] flex items-center gap-3">
          <div className="text-2xl">🔥</div>
          <div>
            <p className="text-sm font-bold text-[var(--neon-orange)]">
              {loginStreak >= 100 ? '×3.0 XP Streak Bonus!' :
               loginStreak >= 30  ? '×2.0 XP Streak Bonus!' :
               loginStreak >= 14  ? '×1.75 XP Streak Bonus!' :
               loginStreak >= 7   ? '×1.5 XP Streak Bonus!' : '×1.25 XP Streak Bonus!'}
            </p>
            <p className="text-xs text-white/40">{loginStreak} day streak — keep logging in daily!</p>
          </div>
        </motion.div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl border border-white/5 bg-white/[0.02]">
        {[
          { key: 'daily', label: '📅 Daily Tasks' },
          { key: 'weekly', label: '🗓️ Weekly' },
          { key: 'tip', label: '💡 Learn' },
        ].map(tb => (
          <button key={tb.key} onClick={() => setTab(tb.key)}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
              tab === tb.key
                ? 'bg-[rgba(0,245,255,0.1)] text-[var(--neon-cyan)] border border-[rgba(0,245,255,0.2)]'
                : 'text-white/40 hover:text-white/70'
            }`}>
            {tb.label}
          </button>
        ))}
      </div>

      {/* Daily Tasks Tab */}
      {tab === 'daily' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <DailyTaskPanel />
        </motion.div>
      )}

      {/* Weekly Challenges Tab */}
      {tab === 'weekly' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="flex items-center justify-between">
            <SectionHeader title="🗓️ Weekly Challenges" subtitle={`${weekDone}/5 completed this week`} />
          </div>

          {/* Weekly progress bar */}
          <div>
            <div className="flex justify-between text-xs text-white/40 mb-1">
              <span>Weekly Progress</span>
              <span>{weekDone}/5</span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <motion.div className="h-full rounded-full bg-[var(--neon-cyan)]"
                initial={{ width: 0 }} animate={{ width: `${(weekDone / 5) * 100}%` }} transition={{ duration: 0.8 }} />
            </div>
          </div>

          {weeklyTasks.map((task, i) => (
            <motion.div key={task.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl p-4 border border-white/8 bg-white/[0.02] flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                style={{ background: task.xpReward > 150 ? 'rgba(255,107,0,0.15)' : task.xpReward > 60 ? 'rgba(0,245,255,0.15)' : 'rgba(57,255,20,0.15)' }}>
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{task.titleEn}</p>
                <p className="text-xs text-white/40 truncate">{task.descEn}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs font-bold text-[var(--neon-yellow)]">+{task.xpReward} XP</p>
              </div>
            </motion.div>
          ))}

          <div className="rounded-xl p-3 border border-white/5 bg-white/[0.02] text-center">
            <p className="text-xs text-white/30">Complete all 5 weekly challenges for a bonus reward! 🎁</p>
          </div>
        </motion.div>
      )}

      {/* Learning Tip Tab */}
      {tab === 'tip' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="rounded-2xl p-5 border border-[rgba(0,245,255,0.2)] bg-[rgba(0,245,255,0.04)]">
            <p className="text-[10px] text-[var(--neon-cyan)] font-bold uppercase tracking-wider mb-2">💡 Today\'s IT Tip</p>
            <p className="text-sm text-white leading-relaxed">{todayTip}</p>
          </div>

          {/* Learning stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Missions Done', value: completedMissions.length, color: '#39ff14', icon: '✅' },
              { label: 'Current Level', value: level, color: '#ffe600', icon: '⭐' },
              { label: 'Day Streak', value: loginStreak, color: '#ff6b00', icon: '🔥' },
              { label: 'Weekly Done', value: weekDone, color: '#00f5ff', icon: '🗓️' },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-4 border border-white/5 bg-white/[0.02] text-center">
                <div className="text-xl mb-1">{s.icon}</div>
                <div className="text-xl font-black" style={{ color: s.color }}>{s.value}</div>
                <div className="text-[10px] text-white/40">{s.label}</div>
              </div>
            ))}
          </div>

          {/* All tips list */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-white/40 uppercase tracking-wider">📚 IT Knowledge Bank</p>
            {TIPS.map((tip, i) => (
              <div key={i} className="rounded-lg px-3 py-2 border border-white/5 bg-white/[0.02] flex gap-2">
                <span className="text-xs text-white/20 flex-shrink-0">{i+1}.</span>
                <p className="text-xs text-white/60">{tip}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
