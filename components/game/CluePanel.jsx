'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/lib/audio';

export default function CluePanel({
  clues = [],
  currentStepIndex,
  setCurrentStepIndex,
  hintLevel,
  setHintLevel,
  onClose,
  xpReward,
  onDeductXP,
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingLevel, setPendingLevel] = useState(null);
  
  // Custom typing effect for assistant speech
  const [typedText, setTypedText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);

  const activeClue = clues[currentStepIndex];

  // Retrieve current level text
  const getClueText = () => {
    if (!activeClue) return '';
    const levels = activeClue.levels || [];
    if (hintLevel === 0) return levels[0] || 'Physical checks: Inspect the area carefully.';
    if (hintLevel === 1) return levels[1] || 'Component focus: Look at the highlighted element.';
    return levels[2] || 'Direct action: Perform the highlighted step manually.';
  };

  const fullText = getClueText();

  // Typing effect runner
  useEffect(() => {
    setTypedText('');
    setTypingIndex(0);
  }, [currentStepIndex, hintLevel, clues]);

  useEffect(() => {
    if (typingIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + fullText[typingIndex]);
        setTypingIndex(prev => prev + 1);
      }, 15); // rapid typing
      return () => clearTimeout(timeout);
    }
  }, [typingIndex, fullText]);

  if (!activeClue) {
    return (
      <div className="glass border border-white/10 rounded-2xl p-6 text-center font-mono text-xs text-white/40">
        💡 No helper clues configured for this mission. Trust your diagnostics!
      </div>
    );
  }

  const handleLevelChange = (level) => {
    if (level <= hintLevel) {
      setHintLevel(level);
      sound.click();
      return;
    }

    // Require confirmation and XP penalty warning for unlocking higher hints
    setPendingLevel(level);
    setShowConfirm(true);
    sound.wrong();
  };

  const confirmHintUnlock = () => {
    onDeductXP?.(10); // Deduct 10 XP
    setHintLevel(pendingLevel);
    setShowConfirm(false);
    setPendingLevel(null);
    sound.correct();
  };

  return (
    <div className="relative glass border border-[var(--neon-pink)]/40 bg-[#090514]/95 rounded-2xl p-5 shadow-[0_0_20px_rgba(255,45,120,0.15)] flex flex-col gap-4">
      
      {/* Title / Close */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5 text-[var(--neon-pink)]">
          <span className="text-base">🤖</span>
          <span className="font-mono text-xs font-black uppercase tracking-wider">IT Mentor Assistant</span>
        </div>
        <button
          onClick={() => { sound.click(); onClose(); }}
          className="text-xs font-mono text-white/40 hover:text-white/80"
        >
          [Close ✕]
        </button>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between text-[10px] font-mono text-white/40">
        <span>GUIDED STEP: {currentStepIndex + 1} OF {clues.length}</span>
        <span className="text-[var(--neon-cyan)]">{activeClue.title || 'Troubleshooting'}</span>
      </div>

      {/* Typing Mentor Text Box */}
      <div className="bg-black/40 rounded-xl p-3.5 border border-white/5 min-h-[90px] text-xs leading-relaxed font-sans text-white/90">
        <p className="font-mono text-[9px] text-white/30 mb-1">💬 ASSISTANT ADVICE:</p>
        <p>{typedText}</p>
        {typingIndex < fullText.length && <span className="inline-block w-1.5 h-3 bg-white/60 ml-0.5 animate-pulse" />}
      </div>

      {/* Progressive Hint Level Selector */}
      <div className="space-y-1.5">
        <p className="text-[9px] font-mono text-white/40 uppercase">Clue Precision Level:</p>
        <div className="grid grid-cols-3 gap-1 text-[10px] font-mono">
          <button
            onClick={() => handleLevelChange(0)}
            className={`py-1.5 rounded-lg border transition-all ${
              hintLevel === 0
                ? 'border-[var(--neon-cyan)] bg-[rgba(0,245,255,0.08)] text-[var(--neon-cyan)] font-bold'
                : 'border-white/5 text-white/40 hover:border-white/10'
            }`}
          >
            🔍 Vague
          </button>
          <button
            onClick={() => handleLevelChange(1)}
            className={`py-1.5 rounded-lg border transition-all ${
              hintLevel === 1
                ? 'border-[var(--neon-orange)] bg-[rgba(255,102,0,0.08)] text-[var(--neon-orange)] font-bold'
                : 'border-white/5 text-white/40 hover:border-white/10'
            }`}
          >
            ⚡ Direct
          </button>
          <button
            onClick={() => handleLevelChange(2)}
            className={`py-1.5 rounded-lg border transition-all ${
              hintLevel === 2
                ? 'border-[var(--neon-pink)] bg-[rgba(255,45,120,0.08)] text-[var(--neon-pink)] font-bold'
                : 'border-white/5 text-white/40 hover:border-white/10'
            }`}
          >
            🔥 Actionable
          </button>
        </div>
      </div>

      {/* Beginner friendly breakdowns: Why & Analogy */}
      <div className="grid grid-cols-1 gap-2 pt-2 border-t border-white/5 text-[11px]">
        {activeClue.why && (
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5">
            <p className="font-mono text-[9px] text-[var(--neon-cyan)] uppercase mb-0.5">💡 Why This Matters:</p>
            <p className="text-white/70 leading-relaxed">{activeClue.why}</p>
          </div>
        )}
        {activeClue.realLife && (
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5">
            <p className="font-mono text-[9px] text-[var(--neon-green)] uppercase mb-0.5">📖 Real-World Analogy:</p>
            <p className="text-white/70 leading-relaxed italic">"{activeClue.realLife}"</p>
          </div>
        )}
      </div>

      {/* Step Navigation Controls */}
      <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/10">
        <button
          disabled={currentStepIndex === 0}
          onClick={() => { sound.click(); setCurrentStepIndex(prev => prev - 1); }}
          className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 font-mono text-[10px] text-white/60 disabled:opacity-30 disabled:pointer-events-none hover:bg-white/10"
        >
          ◀ Previous
        </button>
        <span className="font-mono text-[10px] text-white/30">Step {currentStepIndex + 1}</span>
        <button
          disabled={currentStepIndex === clues.length - 1}
          onClick={() => { sound.click(); setCurrentStepIndex(prev => prev + 1); }}
          className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 font-mono text-[10px] text-white/60 disabled:opacity-30 disabled:pointer-events-none hover:bg-white/10"
        >
          Next ▶
        </button>
      </div>

      {/* Confirmation Overlay Modal for progressive hint XP deduction */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-[#090514]/98 rounded-2xl p-4 flex flex-col justify-between border border-[var(--neon-pink)]/40"
          >
            <div className="space-y-2 text-center py-4">
              <span className="text-3xl">⚠️</span>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">Unlock Detailed Clue?</h4>
              <p className="text-[11px] text-white/60 leading-relaxed font-sans px-2">
                Unlocking a more precise clue costs <strong className="text-[var(--neon-pink)]">10 XP</strong>. 
                This encourages independent troubleshooting. Proceed?
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => { sound.click(); setShowConfirm(false); setPendingLevel(null); }}
                className="flex-1 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-[10px] text-white/60 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={confirmHintUnlock}
                className="flex-1 py-2 rounded-xl bg-[rgba(255,45,120,0.12)] border border-[var(--neon-pink)] text-[var(--neon-pink)] font-mono text-[10px] font-bold"
              >
                Confirm (-10 XP)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
