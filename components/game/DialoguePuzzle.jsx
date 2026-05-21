'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/lib/audio';
import { DIALOGUE_SCENARIOS, scoreDialogue } from '@/lib/dialogueScenarios';

export default function DialoguePuzzle({ mission, lang, onComplete }) {
  const scenario = DIALOGUE_SCENARIOS.find(s => s.id === mission.dialogueId) || DIALOGUE_SCENARIOS[0];
  const [choices, setChoices] = useState({});
  const [feedback, setFeedback] = useState({});
  const [currentEx, setCurrentEx] = useState(0);
  const [done, setDone] = useState(false);
  const [result, setResult] = useState(null);

  const exchange = scenario.exchanges[currentEx];

  const handleChoice = (exchangeId, choiceId) => {
    if (choices[exchangeId]) return;
    const choice = exchange.choices.find(c => c.id === choiceId);
    setChoices(prev => ({ ...prev, [exchangeId]: choiceId }));
    setFeedback(prev => ({ ...prev, [exchangeId]: choice }));
    sound[choice.type === 'professional' ? 'snap' : choice.type === 'rude' ? 'wrong' : 'click']?.();
  };

  const nextExchange = () => {
    if (currentEx < scenario.exchanges.length - 1) {
      setCurrentEx(e => e + 1);
    } else {
      const r = scoreDialogue(scenario.id, choices);
      setResult(r);
      setDone(true);
    }
  };

  if (done && result) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="rounded-2xl p-5 border text-center space-y-2"
          style={{ borderColor: result.pct >= 75 ? 'rgba(57,255,20,0.35)' : 'rgba(255,107,0,0.35)', background: result.pct >= 75 ? 'rgba(57,255,20,0.06)' : 'rgba(255,107,0,0.06)' }}>
          <div style={{ fontSize: 48 }}>{result.pct >= 90 ? '🏆' : result.pct >= 75 ? '🎯' : result.pct >= 50 ? '📈' : '📚'}</div>
          <p className="text-2xl font-black" style={{ color: result.pct >= 75 ? '#39ff14' : '#ff6b00' }}>Rating: {result.rating}</p>
          <p className="text-sm text-white/60">{result.pct}% Professional Score · +{result.xpEarned} XP · +{result.coinEarned} Coins</p>
        </div>
        <div className="rounded-xl p-4 border border-[rgba(255,230,0,0.2)] bg-[rgba(255,230,0,0.04)]">
          <p className="text-[10px] text-[var(--neon-yellow)] font-bold mb-1 uppercase tracking-wider">💡 Key Lesson</p>
          <p className="text-xs text-white/60 leading-relaxed">{scenario.lesson[lang] || scenario.lesson.en}</p>
        </div>
        <button onClick={() => onComplete?.({ xpOverride: result.xpEarned, coinOverride: result.coinEarned })} className="w-full py-3 rounded-xl font-bold text-sm border transition-all" style={{ background: 'rgba(57,255,20,0.12)', borderColor: 'rgba(57,255,20,0.4)', color: '#39ff14' }}>
          ✅ Complete Mission
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Context */}
      <div className="rounded-xl p-4 border border-white/10" style={{ background: 'linear-gradient(135deg, rgba(191,0,255,0.06), #070b14)' }}>
        <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-1">📋 Situation</p>
        <p className="text-sm text-white/80">{scenario.context[lang] || scenario.context.en}</p>
      </div>

      {/* Progress */}
      <div className="flex gap-1.5">
        {scenario.exchanges.map((_, i) => (
          <div key={i} className="flex-1 h-1.5 rounded-full" style={{ background: i < currentEx ? '#39ff14' : i === currentEx ? '#bf00ff' : 'rgba(255,255,255,0.08)' }} />
        ))}
        <span className="text-xs text-white/30 flex-shrink-0">{currentEx + 1}/{scenario.exchanges.length}</span>
      </div>

      {/* NPC line */}
      <div className="rounded-xl p-4 border border-white/10" style={{ background: '#0d1a2e' }}>
        <p className="text-xs font-bold mb-2" style={{ color: '#bf00ff' }}>{scenario.npcAvatar} {scenario.npcName}</p>
        <p className="text-sm text-white/90 leading-relaxed italic">"{exchange?.npcLine[lang] || exchange?.npcLine.en}"</p>
      </div>

      {/* Choices */}
      <div className="space-y-2">
        <p className="text-[10px] text-white/30 uppercase tracking-wider font-bold">How do you respond?</p>
        {exchange?.choices.map(choice => {
          const chosen = choices[exchange.id] === choice.id;
          const anyChosen = !!choices[exchange.id];
          const fb = feedback[exchange.id];
          let borderCol = 'rgba(255,255,255,0.08)';
          let bgCol = 'rgba(255,255,255,0.02)';
          if (anyChosen && chosen) {
            borderCol = choice.type === 'professional' ? 'rgba(57,255,20,0.5)' : choice.type === 'neutral' ? 'rgba(255,230,0,0.4)' : 'rgba(255,45,120,0.5)';
            bgCol = choice.type === 'professional' ? 'rgba(57,255,20,0.08)' : choice.type === 'neutral' ? 'rgba(255,230,0,0.06)' : 'rgba(255,45,120,0.08)';
          }
          return (
            <button key={choice.id}
              disabled={anyChosen}
              onClick={() => handleChoice(exchange.id, choice.id)}
              className="w-full text-left rounded-xl px-4 py-3 border text-sm transition-all"
              style={{ borderColor: borderCol, background: bgCol, color: anyChosen && !chosen ? 'rgba(255,255,255,0.2)' : '#e2e8f0', cursor: anyChosen ? 'default' : 'pointer' }}>
              {choice.text[lang] || choice.text.en}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {feedback[exchange?.id] && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-xl px-4 py-3 border text-sm"
          style={{
            borderColor: feedback[exchange.id].type === 'professional' ? 'rgba(57,255,20,0.3)' : feedback[exchange.id].type === 'rude' ? 'rgba(255,45,120,0.3)' : 'rgba(255,230,0,0.3)',
            background: feedback[exchange.id].type === 'professional' ? 'rgba(57,255,20,0.05)' : feedback[exchange.id].type === 'rude' ? 'rgba(255,45,120,0.05)' : 'rgba(255,230,0,0.05)',
          }}>
          <p className="text-xs">{feedback[exchange.id].feedback[lang] || feedback[exchange.id].feedback.en}</p>
          <button onClick={nextExchange} className="mt-2 text-xs font-bold text-[var(--neon-cyan)] hover:text-white transition-colors">
            {currentEx < scenario.exchanges.length - 1 ? 'Next →' : 'See Results →'}
          </button>
        </motion.div>
      )}
    </div>
  );
}
