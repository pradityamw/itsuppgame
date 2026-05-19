'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/lib/audio';
import { useLanguage } from '@/context/LanguageContext';
import { Badge } from '@/components/ui';

const COMPONENT_COLORS = {
  cpu:      { bg: '#ff6b0015', border: '#ff6b00', emoji: '⚙️' },
  ram:      { bg: '#00f5ff15', border: '#00f5ff', emoji: '🧠' },
  ssd:      { bg: '#bf00ff15', border: '#bf00ff', emoji: '💾' },
  fan:      { bg: '#39ff1415', border: '#39ff14', emoji: '🌀' },
  psu:      { bg: '#ffe60015', border: '#ffe600', emoji: '🔌' },
  heatsink: { bg: '#ff2d7815', border: '#ff2d78', emoji: '🔩' },
  gpu:      { bg: '#00f5ff15', border: '#00f5ff', emoji: '🖥️' },
  cables:   { bg: '#ffe60015', border: '#ffe600', emoji: '🔌' },
};

function getComponentStyle(id) {
  const key = Object.keys(COMPONENT_COLORS).find(k => id.startsWith(k));
  return COMPONENT_COLORS[key] || { bg: '#ffffff10', border: '#ffffff30', emoji: '🔧' };
}

export default function PCRepairPanel({ mission, onComplete, onFail }) {
  const { t } = useLanguage();
  const { puzzleData } = mission;
  const [caseOpen, setCaseOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [placements, setPlacements] = useState({}); // { slotId: componentId }
  const [errors, setErrors] = useState({});
  const [dragItem, setDragItem] = useState(null);
  const [cleaned, setCleaned] = useState(false);
  const [powered, setPowered] = useState(false);
  const [showLesson, setShowLesson] = useState(false);

  const brokenComponents = puzzleData.components.filter(c => c.broken);
  const totalSlots = puzzleData.slots.length;
  const faultySlotId = puzzleData.faultSlot;

  const isAllFixed = () => {
    if (puzzleData.cleaningRequired && !cleaned) return false;
    // All faulty slot fixed
    return placements[faultySlotId] !== undefined;
  };

  const handleDragStart = (comp) => {
    setDragItem(comp);
    sound.mechanical();
  };

  const handleDrop = (slotId) => {
    if (!dragItem) return;
    const slot = puzzleData.slots.find(s => s.id === slotId);

    if (dragItem.correctSlot === slotId) {
      sound.snap();
      setPlacements(p => ({ ...p, [slotId]: dragItem.id }));
      setErrors(e => ({ ...e, [slotId]: false }));
    } else {
      sound.wrong();
      setErrors(e => ({ ...e, [slotId]: true }));
      setTimeout(() => setErrors(e => ({ ...e, [slotId]: false })), 1000);
    }
    setDragItem(null);
  };

  const handlePowerOn = () => {
    if (!isAllFixed()) {
      sound.wrong();
      return;
    }
    sound.powerOn();
    setPowered(true);
    setShowLesson(true);
    setTimeout(() => onComplete?.(), 3500);
  };

  const handleClean = () => {
    sound.mechanical();
    setCleaned(true);
    setPlacements(p => ({ ...p, [faultySlotId]: 'cleaned' }));
  };

  const progressSteps = puzzleData.steps || [];
  const currentStepData = progressSteps[step];

  return (
    <div className="space-y-4">
      {/* Step indicator */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {progressSteps.map((s, i) => (
          <div key={s.id} className="flex items-center gap-1.5 flex-shrink-0">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
              i < step ? 'bg-[var(--neon-green)] border-[var(--neon-green)] text-black' :
              i === step ? 'border-[var(--neon-cyan)] text-[var(--neon-cyan)] animate-pulse' :
              'border-white/20 text-white/30'
            }`}>{i < step ? '✓' : i + 1}</div>
            {i < progressSteps.length - 1 && (
              <div className={`w-6 h-0.5 ${i < step ? 'bg-[var(--neon-green)]' : 'bg-white/10'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Current step description */}
      {currentStepData && (
        <div className="glass rounded-lg px-4 py-2.5 border border-white/5 text-sm text-white/70">
          <span className="text-[var(--neon-cyan)] font-bold">Step {step + 1}: </span>
          {currentStepData.text}
        </div>
      )}

      {/* PC Case visual */}
      <div className="relative">
        <motion.div
          className="relative rounded-xl overflow-hidden border border-white/10"
          style={{ background: 'linear-gradient(135deg, #0d1117 0%, #1a2238 100%)', minHeight: 280 }}
        >
          {/* PC Case exterior */}
          {!caseOpen && (
            <motion.div className="flex flex-col items-center justify-center h-full py-10 gap-4">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-7xl"
              >
                🖥️
              </motion.div>
              <p className="text-white/50 text-sm">
                {puzzleData.symptom || (puzzleData.scenario === 'dust_buildup' ? '⚠️ Overheating detected' : '❌ No power')}
              </p>
              <button
                onClick={() => { sound.mechanical(); setCaseOpen(true); setStep(1); }}
                className="btn-game text-sm py-2 px-6"
              >
                🔧 {t('openCase')}
              </button>
            </motion.div>
          )}

          {/* PC Case interior */}
          {caseOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 space-y-3"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-[var(--neon-cyan)] font-bold uppercase tracking-wider">Inside the PC Case</span>
                {puzzleData.scenario === 'dust_buildup' && (
                  <Badge variant="orange" size="xs">⚠️ Dust Detected</Badge>
                )}
              </div>

              {/* Motherboard visual */}
              <div className="rounded-lg p-3 grid grid-cols-2 gap-3"
                style={{ background: '#0a1628', border: '1px solid #1e3a5f' }}>
                {puzzleData.slots.map(slot => {
                  const placedId = placements[slot.id];
                  const comp = puzzleData.components.find(c => c.id === placedId);
                  const isError = errors[slot.id];
                  const isFaulty = slot.id === faultySlotId && !placedId;
                  const style = comp ? getComponentStyle(comp.id) : {};

                  return (
                    <div
                      key={slot.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop(slot.id)}
                      className={`component-slot rounded-lg p-3 transition-all ${
                        isError ? 'error border-[var(--neon-pink)]' :
                        placedId ? 'filled' :
                        isFaulty ? 'border-[var(--neon-orange)] bg-[rgba(255,107,0,0.05)]' : ''
                      }`}
                    >
                      {placedId ? (
                        <motion.div
                          initial={{ scale: 0.5 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-2"
                        >
                          <span className="text-2xl">{style.emoji || comp?.emoji}</span>
                          <div>
                            <div className="text-xs font-bold text-[var(--neon-green)]">{comp?.label}</div>
                            <div className="text-[10px] text-[var(--neon-green)]/60">✓ Connected</div>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="flex flex-col items-center gap-1 text-center">
                          {isFaulty && <span className="text-xl">⚠️</span>}
                          <span className="text-xs text-white/40">{slot.label}</span>
                          {isFaulty && (
                            puzzleData.cleaningRequired ? (
                              <button onClick={handleClean} className="mt-1 btn-game text-[10px] py-1 px-2" style={{ borderColor: '#ff6b00', color: '#ff6b00' }}>
                                🧹 Clean Dust
                              </button>
                            ) : (
                              <span className="text-[10px] text-[var(--neon-orange)]">← Drop fix here</span>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Draggable components */}
              <div>
                <p className="text-xs text-white/40 mb-2">Components to place:</p>
                <div className="flex flex-wrap gap-2">
                  {puzzleData.components.filter(c => c.broken && !placements[c.correctSlot]).map(comp => {
                    const style = getComponentStyle(comp.id);
                    return (
                      <motion.div
                        key={comp.id}
                        draggable
                        onDragStart={() => handleDragStart(comp)}
                        onDragEnd={() => setDragItem(null)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="draggable flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-semibold cursor-grab"
                        style={{ background: style.bg, borderColor: style.border, color: style.border }}
                      >
                        <span>{comp.emoji || style.emoji}</span>
                        {comp.label}
                        {comp.broken && <span className="text-[10px] opacity-70">⚡ LOOSE</span>}
                      </motion.div>
                    );
                  })}
                  {puzzleData.components.filter(c => c.broken && !placements[c.correctSlot]).length === 0 && (
                    <p className="text-xs text-[var(--neon-green)]">✓ All components placed!</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Actions */}
      {caseOpen && (
        <div className="flex gap-3">
          {isAllFixed() && !powered && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handlePowerOn}
              className="btn-game btn-game-green flex-1 py-3"
            >
              ⚡ Power On & Test
            </motion.button>
          )}
          <button
            onClick={() => { sound.click(); onFail?.(); }}
            className="px-4 py-2 text-xs text-white/30 hover:text-white/60 transition-colors border border-white/5 rounded-lg"
          >
            Give Up
          </button>
        </div>
      )}

      {/* Success overlay */}
      <AnimatePresence>
        {powered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <div className="glass border border-[var(--neon-green)] rounded-2xl p-8 text-center max-w-md mx-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: 3 }}
                className="text-6xl mb-4"
              >💚</motion.div>
              <h3 className="text-2xl font-bold text-[var(--neon-green)] mb-2">PC Fixed!</h3>
              <p className="text-white/60 text-sm mb-4">{mission.puzzleData?.successMsg || 'The computer is running perfectly now.'}</p>
              <div className="glass rounded-lg p-3 text-left text-xs text-white/50 border border-white/5">
                <span className="text-[var(--neon-cyan)] font-bold">💡 Lesson: </span>
                {mission.puzzleData?.lesson ||
                  (mission.puzzleData?.scenario === 'psu_loose' ? 'A loose PSU cable prevents the PC from receiving power. Always check connections first!' :
                   mission.puzzleData?.scenario === 'dust_buildup' ? 'Dust is a silent killer for PCs. Clean every 6 months to prevent overheating.' :
                   'Methodical troubleshooting saves time — always start with the simplest fix.')}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
