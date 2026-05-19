'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/lib/audio';

const TYPEWRITER_SPEED = 28; // ms per char

export default function NPCDialog({ npc, avatar, message, onNext, onDismiss, options }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!message) return;
    setDisplayed('');
    setDone(false);
    indexRef.current = 0;

    timerRef.current = setInterval(() => {
      if (indexRef.current < message.length) {
        const ch = message[indexRef.current];
        setDisplayed(prev => prev + ch);
        if (ch.match(/[a-zA-Z]/i) && Math.random() < 0.25) sound.keyType();
        indexRef.current++;
      } else {
        setDone(true);
        clearInterval(timerRef.current);
      }
    }, TYPEWRITER_SPEED);

    return () => clearInterval(timerRef.current);
  }, [message]);

  const skipTypewriter = () => {
    clearInterval(timerRef.current);
    setDisplayed(message);
    setDone(true);
  };

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 30, opacity: 0 }}
      className="relative flex items-end gap-4 max-w-2xl mx-auto select-none"
    >
      {/* NPC Avatar */}
      <div className="flex-shrink-0">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-2xl glass border border-white/15 flex items-center justify-center text-4xl shadow-lg"
        >
          {avatar || '👤'}
        </motion.div>
        {npc && (
          <div className="text-center mt-1">
            <span className="text-xs text-white/50 font-medium">{npc}</span>
          </div>
        )}
      </div>

      {/* Dialog bubble */}
      <div className="flex-1">
        <div className="npc-dialog cursor-pointer" onClick={done ? undefined : skipTypewriter}>
          <p className="text-sm text-white leading-relaxed min-h-[2.5rem]">
            {displayed}
            {!done && <span className="terminal-cursor" />}
          </p>
        </div>

        {/* Action buttons — only show when typing is done */}
        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2 mt-3 justify-end"
            >
              {/* Multiple choice options */}
              {options?.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => { sound.click(); opt.action?.(); }}
                  className="btn-game text-xs py-1.5 px-3"
                  style={i === 0 ? {} : { borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.5)' }}
                >
                  {opt.label}
                </button>
              ))}

              {/* Default next/dismiss */}
              {!options && (
                <>
                  {onNext && (
                    <button onClick={() => { sound.click(); onNext(); }} className="btn-game text-xs py-1.5 px-4">
                      Continue →
                    </button>
                  )}
                  {onDismiss && (
                    <button
                      onClick={() => { sound.click(); onDismiss(); }}
                      className="btn-game text-xs py-1.5 px-4"
                    >
                      Start Mission →
                    </button>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
