'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { useLanguage } from '@/context/LanguageContext';
import { getTodaysTasks, formatResetCountdown } from '@/lib/dailyTasks';
import { sound } from '@/lib/audio';
import { Badge, Button } from '@/components/ui';

const DIFFICULTY_CONFIG = {
  easy:   { color: '#39ff14', label: 'Easy',   icon: '🟢' },
  medium: { color: '#ffe600', label: 'Medium',  icon: '🟡' },
  hard:   { color: '#ff2d78', label: 'Hard',    icon: '🔴' },
};

function QuizModal({ task, lang, onComplete, onClose }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const quiz = task.quiz || [];
  const q = quiz[current];
  if (!q) return null;

  const options = lang === 'id' ? (q.optionsId || q.options) : q.options;
  const question = lang === 'id' ? (q.qId || q.q) : q.q;

  const handleAnswer = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const correct = idx === q.correct;
    if (correct) { sound.correct(); setScore(s => s + 1); }
    else sound.wrong();
  };

  const handleNext = () => {
    if (current + 1 >= quiz.length) {
      setDone(true);
      if (score + (selected === q.correct ? 1 : 0) === quiz.length) {
        onComplete?.();
      }
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  if (done) {
    const finalScore = score + (selected === q.correct ? 1 : 0);
    const pass = finalScore === quiz.length;
    return (
      <div className="text-center py-4">
        <div className="text-5xl mb-3">{pass ? '🏆' : '📚'}</div>
        <h3 className="text-xl font-bold text-white mb-1">{pass ? 'Perfect!' : 'Good Try!'}</h3>
        <p className="text-white/50 text-sm mb-4">Score: {finalScore}/{quiz.length}</p>
        {!pass && <p className="text-xs text-white/30 mb-4">Review the explanation and try again tomorrow!</p>}
        <Button variant={pass ? 'green' : 'ghost'} onClick={onClose}>
          {pass ? 'Claim Reward 🎁' : 'Close'}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex gap-1">
        {quiz.map((_, i) => (
          <div key={i} className={`flex-1 h-1 rounded-full ${i < current ? 'bg-[var(--neon-green)]' : i === current ? 'bg-[var(--neon-cyan)]' : 'bg-white/10'}`} />
        ))}
      </div>

      {/* Question */}
      <div className="rounded-xl p-4 border border-white/10 bg-white/[0.03]">
        <p className="text-white font-semibold leading-relaxed">{question}</p>
      </div>

      {/* Options */}
      <div className="space-y-2">
        {options.map((opt, i) => {
          const isCorrect = i === q.correct;
          const isSelected = i === selected;
          let borderColor = 'border-white/10 hover:border-white/25';
          let bg = 'bg-transparent';
          if (answered) {
            if (isCorrect) { borderColor = 'border-[var(--neon-green)]'; bg = 'bg-[rgba(57,255,20,0.08)]'; }
            else if (isSelected && !isCorrect) { borderColor = 'border-[var(--neon-pink)]'; bg = 'bg-[rgba(255,45,120,0.08)]'; }
          }

          return (
            <motion.button
              key={i}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(i)}
              disabled={answered}
              className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm ${borderColor} ${bg} ${answered ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <span className="text-white/40 mr-2">{String.fromCharCode(65 + i)}.</span>
              <span className="text-white">{opt}</span>
              {answered && isCorrect && <span className="float-right text-[var(--neon-green)]">✓</span>}
              {answered && isSelected && !isCorrect && <span className="float-right text-[var(--neon-pink)]">✗</span>}
            </motion.button>
          );
        })}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-3 border border-[rgba(0,245,255,0.2)] bg-[rgba(0,245,255,0.05)] text-xs text-white/70"
          >
            <span className="text-[var(--neon-cyan)] font-bold">💡 </span>{q.explanation}
          </motion.div>
        )}
      </AnimatePresence>

      {answered && (
        <Button variant="cyan" onClick={handleNext} className="w-full justify-center">
          {current + 1 >= quiz.length ? 'See Results' : 'Next →'}
        </Button>
      )}
    </div>
  );
}

export default function DailyTaskPanel() {
  const { completeDailyTask, isDailyTaskDone, claimDailyBonus, dailyBonusClaimed, loginStreak } = useGameStore();
  const { t, lang } = useLanguage();
  const [activeTask, setActiveTask] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);

  // Client-only: getTodaysTasks and formatResetCountdown use new Date()
  // Must run on client only to avoid SSR/hydration mismatch
  const [tasks, setTasks] = useState(null);
  const [countdown, setCountdown] = useState('...');

  useEffect(() => {
    setTasks(getTodaysTasks());
    setCountdown(formatResetCountdown());
    // Refresh countdown every minute
    const interval = setInterval(() => setCountdown(formatResetCountdown()), 60000);
    return () => clearInterval(interval);
  }, []);

  if (!tasks) return null; // avoid rendering until client hydration is done

  const taskList = [tasks.easy, tasks.medium, tasks.hard];

  const openTask = (task) => {
    if (isDailyTaskDone(task.id)) return;
    setActiveTask(task);
    setShowQuiz(true);
    sound.click();
  };

  const handleComplete = () => {
    if (!activeTask) return;
    sound.missionComplete();
    completeDailyTask(activeTask.id, { xpReward: activeTask.xpReward, coinReward: activeTask.coinReward });
    setShowQuiz(false);
    setActiveTask(null);
  };

  const allDone = taskList.every(t => isDailyTaskDone(t.id));

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white text-orbitron">{t('dailyTasks')}</h3>
        <div className="flex items-center gap-1.5 text-xs text-white/40">
          <span>🔄</span>
          <span>{t('dailyReset', { time: countdown })}</span>
        </div>
      </div>

      {/* Streak + daily bonus */}
      <div className="rounded-xl p-4 border border-[rgba(255,107,0,0.3)] bg-[rgba(255,107,0,0.05)] flex items-center gap-4">
        <div className="text-4xl streak-fire">🔥</div>
        <div className="flex-1">
          <p className="font-bold text-[var(--neon-orange)]">{t('streakDays', { n: loginStreak })}</p>
          <p className="text-xs text-white/40">Keep logging in daily for bonus XP!</p>
        </div>
        {!dailyBonusClaimed && (
          <Button variant="orange" size="sm"
            onClick={() => { sound.achievement(); claimDailyBonus(); }}
            className="flex-shrink-0"
            style={{ borderColor: '#ff6b00', color: '#ff6b00' }}
          >
            🎁 Claim
          </Button>
        )}
        {dailyBonusClaimed && (
          <span className="text-xs text-[var(--neon-green)]">✓ Claimed</span>
        )}
      </div>

      {/* Task cards */}
      <div className="space-y-3">
        {taskList.map((task) => {
          const done = isDailyTaskDone(task.id);
          const diff = task.id.startsWith('dt_e') ? 'easy' : task.id.startsWith('dt_m') ? 'medium' : 'hard';
          const config = DIFFICULTY_CONFIG[diff];

          return (
            <motion.div
              key={task.id}
              whileHover={done ? {} : { x: 3 }}
              className={`rounded-xl p-4 border transition-all ${
                done
                  ? 'border-[rgba(57,255,20,0.2)] bg-[rgba(57,255,20,0.04)] opacity-70'
                  : 'border-white/8 bg-white/[0.02] hover:border-white/15 cursor-pointer'
              }`}
              onClick={() => !done && openTask(task)}
            >
              <div className="flex items-start gap-3">
                {/* Difficulty dot */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: `${config.color}15`, border: `1px solid ${config.color}40` }}>
                  {done ? '✅' : config.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="font-bold text-white text-sm truncate">
                      {lang === 'id' ? task.titleId : task.titleEn}
                    </h4>
                    <Badge variant={diff} size="xs">{config.label}</Badge>
                  </div>
                  <p className="text-xs text-white/40 truncate">
                    {lang === 'id' ? task.descId : task.descEn}
                  </p>
                </div>

                {/* Reward preview */}
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="text-xs font-bold text-[var(--neon-yellow)]">+{task.xpReward} XP</span>
                  {done && <span className="text-xs text-[var(--neon-green)]">Done ✓</span>}
                  {!done && <span className="text-xs text-white/25">→</span>}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {allDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl p-4 text-center border border-[rgba(57,255,20,0.2)] bg-[rgba(57,255,20,0.04)]"
        >
          <div className="text-3xl mb-1">🎉</div>
          <p className="text-[var(--neon-green)] font-bold text-sm">{t('allDone')}</p>
        </motion.div>
      )}

      {/* Quiz modal overlay */}
      <AnimatePresence>
        {showQuiz && activeTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowQuiz(false)} />
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg glass border border-white/10 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">📋</span>
                <div>
                  <h3 className="font-bold text-white">{lang === 'id' ? activeTask.titleId : activeTask.titleEn}</h3>
                  <p className="text-xs text-white/40">{lang === 'id' ? activeTask.descId : activeTask.descEn}</p>
                </div>
                <button onClick={() => setShowQuiz(false)} className="ml-auto text-white/30 hover:text-white">✕</button>
              </div>
              <QuizModal task={activeTask} lang={lang} onComplete={handleComplete} onClose={() => setShowQuiz(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
