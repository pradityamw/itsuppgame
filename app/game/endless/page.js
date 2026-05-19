'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { generateTicket } from '@/lib/ticketEngine';
import { sound } from '@/lib/audio';

const DIFF_COLOR = { easy: '#39ff14', medium: '#00f5ff', hard: '#ff6b00', epic: '#bf00ff' };

export default function EndlessPage() {
  const { level, completeTicket, ticketStreak, addToast } = useGameStore();
  const [ticket, setTicket] = useState(null);
  const [phase, setPhase] = useState('idle'); // idle | question | result
  const [selected, setSelected] = useState(null);
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [timer, setTimer] = useState(null);

  const nextTicket = useCallback(() => {
    setTicket(generateTicket(level));
    setPhase('question');
    setSelected(null);
  }, [level]);

  const handleStart = () => { nextTicket(); };

  const handleAnswer = (idx) => {
    if (phase !== 'question' || selected !== null) return;
    setSelected(idx);
    setPhase('result');
    setSessionTotal(t => t + 1);

    const q = ticket.quiz?.[0];
    const correct = idx === q?.correct;
    if (correct) {
      setSessionCorrect(c => c + 1);
      const streak = ticketStreak + 1;
      const combo = streak >= 10 ? 3.0 : streak >= 5 ? 2.0 : streak >= 3 ? 1.5 : 1.0;
      const xp = Math.round(ticket.xpReward * combo);
      setSessionScore(s => s + xp);
      sound.snap?.();
    } else {
      sound.wrong?.();
    }
    completeTicket(ticket, correct);
  };

  const handleNext = () => { nextTicket(); };

  const q = ticket?.quiz?.[0];
  const isCorrect = selected !== null && q && selected === q.correct;
  const comboColor = ticketStreak >= 10 ? '#bf00ff' : ticketStreak >= 5 ? '#ff6b00' : ticketStreak >= 3 ? '#00f5ff' : '#39ff14';

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-5">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-white text-orbitron">⚡ Endless Tickets</h1>
          <p className="text-xs text-white/40">Solve as many tickets as you can. Build combos!</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black" style={{ color: comboColor }}>
            {ticketStreak > 0 ? `${ticketStreak}🔥` : '—'}
          </div>
          <div className="text-[10px] text-white/30">Combo Streak</div>
        </div>
      </motion.div>

      {/* Session Stats Bar */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Score', value: sessionScore.toLocaleString(), color: '#ffe600' },
          { label: 'Correct', value: `${sessionCorrect}/${sessionTotal}`, color: '#39ff14' },
          { label: 'Accuracy', value: sessionTotal > 0 ? `${Math.round(sessionCorrect/sessionTotal*100)}%` : '—', color: '#00f5ff' },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-3 border border-white/5 bg-white/[0.02] text-center">
            <div className="font-black text-lg" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[10px] text-white/30">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Combo multiplier indicator */}
      {ticketStreak >= 3 && (
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}
          className="rounded-xl p-3 border text-center"
          style={{ borderColor: `${comboColor}40`, background: `${comboColor}08` }}>
          <p className="text-sm font-black" style={{ color: comboColor }}>
            🔥 COMBO ×{ticketStreak >= 10 ? '3.0' : ticketStreak >= 5 ? '2.0' : '1.5'} — Keep it going!
          </p>
        </motion.div>
      )}

      {/* Idle State */}
      {phase === 'idle' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10 space-y-4">
          <div className="text-6xl">🎫</div>
          <h2 className="text-xl font-bold text-white">Ready for Endless Mode?</h2>
          <p className="text-sm text-white/40">Answer randomized IT tickets. Build a combo streak for bonus XP multipliers!</p>
          <div className="flex flex-col gap-2 text-xs text-white/40 max-w-xs mx-auto">
            <div className="flex justify-between"><span>3+ streak</span><span className="text-[var(--neon-cyan)]">×1.5 XP</span></div>
            <div className="flex justify-between"><span>5+ streak</span><span className="text-[var(--neon-orange)]">×2.0 XP</span></div>
            <div className="flex justify-between"><span>10+ streak</span><span className="text-[var(--neon-purple)] font-bold">×3.0 XP</span></div>
          </div>
          <button onClick={handleStart} className="btn-game px-10 py-3 text-lg font-black">
            Start 🚀
          </button>
        </motion.div>
      )}

      {/* Ticket */}
      <AnimatePresence mode="wait">
        {ticket && phase !== 'idle' && (
          <motion.div key={ticket.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }} className="space-y-4">

            {/* Ticket card */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
              {/* Ticket header */}
              <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-white/30">{ticket.id}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                    style={{ color: DIFF_COLOR[ticket.difficulty], background: `${DIFF_COLOR[ticket.difficulty]}15` }}>
                    {ticket.difficulty}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40">{ticket.category}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[var(--neon-yellow)]">+{ticket.xpReward} XP</span>
                </div>
              </div>

              {/* User info */}
              <div className="px-4 py-2 border-b border-white/5 text-xs text-white/40">
                👤 <span className="text-white/60">{ticket.user}</span> · 📍 {ticket.location} · 🕐 {ticket.reportedAt}
              </div>

              {/* Symptom */}
              <div className="px-4 py-4">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-2">📋 Issue Reported</p>
                <p className="text-sm text-white leading-relaxed">{ticket.symptom}</p>
              </div>
            </div>

            {/* Question */}
            {q && (
              <div className="space-y-3">
                <div className="glass rounded-xl px-4 py-3 border border-white/10">
                  <p className="text-xs text-[var(--neon-cyan)] font-bold mb-1">❓ What is the problem / best solution?</p>
                  <p className="text-sm text-white font-semibold">{q.q}</p>
                </div>

                <div className="space-y-2">
                  {q.options.map((opt, idx) => {
                    let style = 'border-white/10 bg-white/[0.03] text-white/70 hover:border-white/25';
                    if (phase === 'result') {
                      if (idx === q.correct) style = 'border-[var(--neon-green)] bg-[rgba(57,255,20,0.08)] text-[var(--neon-green)]';
                      else if (idx === selected && idx !== q.correct) style = 'border-[var(--neon-pink)] bg-[rgba(255,45,120,0.08)] text-[var(--neon-pink)]';
                      else style = 'border-white/5 bg-white/[0.01] text-white/25';
                    }
                    return (
                      <button key={idx} onClick={() => handleAnswer(idx)} disabled={phase === 'result'}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${style}`}>
                        <span className="font-mono text-xs opacity-50 mr-2">{String.fromCharCode(65+idx)}.</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* Result feedback */}
                {phase === 'result' && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl p-4 border space-y-3"
                    style={{
                      borderColor: isCorrect ? 'rgba(57,255,20,0.3)' : 'rgba(255,45,120,0.3)',
                      background: isCorrect ? 'rgba(57,255,20,0.05)' : 'rgba(255,45,120,0.05)',
                    }}>
                    <div className="flex items-center justify-between">
                      <p className="font-black text-sm" style={{ color: isCorrect ? '#39ff14' : '#ff2d78' }}>
                        {isCorrect ? '✅ Correct!' : '❌ Wrong'}
                      </p>
                      {isCorrect && ticketStreak > 1 && (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                          className="text-xs font-black px-2 py-1 rounded-full"
                          style={{ color: comboColor, background: `${comboColor}15` }}>
                          🔥 ×{ticketStreak >= 10 ? '3.0' : ticketStreak >= 5 ? '2.0' : '1.5'} Combo!
                        </motion.span>
                      )}
                    </div>
                    <p className="text-xs text-white/60">{q.explanation}</p>

                    {/* Diagnostic steps */}
                    {ticket.steps?.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-[10px] text-white/30 uppercase tracking-wider">Correct Steps:</p>
                        {ticket.steps.map((step, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-white/50">
                            <span className="text-white/20 flex-shrink-0">{i+1}.</span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <button onClick={handleNext}
                      className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.02]"
                      style={{ background: isCorrect ? 'rgba(57,255,20,0.15)' : 'rgba(255,255,255,0.05)', color: isCorrect ? '#39ff14' : '#fff' }}>
                      Next Ticket →
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
