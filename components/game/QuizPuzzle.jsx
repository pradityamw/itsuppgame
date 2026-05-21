'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '@/lib/audio';

export default function QuizPuzzle({ mission, onComplete, onFail }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showLesson, setShowLesson] = useState(false);

  const quiz = mission.quizData?.questions || mission.quiz || [];
  const current = quiz[step];

  if (!current) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="text-5xl">✅</div>
        <p className="text-[var(--neon-green)] font-bold text-lg">All questions answered!</p>
        <p className="text-white/50 text-sm">{correctCount}/{quiz.length} correct</p>
        <button onClick={onComplete} className="btn-game px-8 py-3">
          Complete Mission 🎉
        </button>
      </div>
    );
  }

  const handleAnswer = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const correctIdx = current.answer ?? current.correct;
    if (idx === correctIdx) setCorrectCount(c => c + 1);
    sound[idx === correctIdx ? 'snap' : 'wrong']?.();
  };

  const next = () => {
    setAnswered(false);
    setSelected(null);
    setShowLesson(false);
    setStep(s => s + 1);
  };

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex items-center gap-2">
        {quiz.map((_, i) => (
          <div key={i} className="flex-1 h-1.5 rounded-full"
            style={{ background: i < step ? '#39ff14' : i === step ? '#00f5ff' : 'rgba(255,255,255,0.1)' }} />
        ))}
        <span className="text-xs text-white/40 flex-shrink-0">{step + 1}/{quiz.length}</span>
      </div>

      {/* Question */}
      <div className="glass rounded-xl p-4 border border-white/10">
        <p className="text-sm font-semibold text-white leading-relaxed">{current.q}</p>
      </div>

      {/* Options */}
      <div className="space-y-2">
        {current.options.map((opt, idx) => {
          const correctIdx = current.answer ?? current.correct;
          let style = 'border-white/10 bg-white/[0.03] text-white/70 hover:border-white/25 hover:bg-white/[0.06]';
          if (answered) {
            if (idx === correctIdx) style = 'border-[var(--neon-green)] bg-[rgba(57,255,20,0.08)] text-[var(--neon-green)]';
            else if (idx === selected) style = 'border-[var(--neon-pink)] bg-[rgba(255,45,120,0.08)] text-[var(--neon-pink)]';
            else style = 'border-white/5 bg-white/[0.02] text-white/30';
          }
          return (
            <button key={idx} onClick={() => handleAnswer(idx)} disabled={answered}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${style}`}>
              <span className="font-mono text-xs opacity-60 mr-2">{String.fromCharCode(65 + idx)}.</span>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {answered && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-4 border"
          style={{
            borderColor: selected === (current.answer ?? current.correct) ? 'rgba(57,255,20,0.3)' : 'rgba(255,45,120,0.3)',
            background: selected === (current.answer ?? current.correct) ? 'rgba(57,255,20,0.05)' : 'rgba(255,45,120,0.05)',
          }}>
          <p className="text-xs font-bold mb-1"
            style={{ color: selected === (current.answer ?? current.correct) ? '#39ff14' : '#ff2d78' }}>
            {selected === (current.answer ?? current.correct) ? '✅ Correct!' : '❌ Wrong Answer'}
          </p>
          <p className="text-xs text-white/60">{current.explain || current.explanation}</p>
          <button onClick={next} className="mt-3 text-xs font-bold text-[var(--neon-cyan)] hover:text-white transition-colors">
            {step < quiz.length - 1 ? 'Next Question →' : 'See Results →'}
          </button>
        </motion.div>
      )}

      {/* Learning tip */}
      {mission.lesson && (
        <div className="rounded-xl px-4 py-3 border border-[rgba(255,230,0,0.15)] bg-[rgba(255,230,0,0.04)]">
          <p className="text-[10px] text-[var(--neon-yellow)] font-bold mb-1">💡 Key Lesson</p>
          <p className="text-xs text-white/50">{mission.lesson}</p>
        </div>
      )}
    </div>
  );
}
