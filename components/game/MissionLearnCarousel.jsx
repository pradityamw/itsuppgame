'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Slide animation variants ───────────────────────────────────
const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0, scale: 0.97 }),
};

const NEON = {
  cyan:   '#00f5ff',
  green:  '#39ff14',
  yellow: '#ffe600',
  purple: '#bf00ff',
};

// ──────────────────────────────────────────────────────────────
export default function MissionLearnCarousel({ mission, slides, lang = 'en', onComplete, onSkip }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir]     = useState(1);

  const total   = slides.length;
  const slide   = slides[index];
  const isFirst = index === 0;
  const isLast  = index === total - 1;

  const go = (next) => {
    setDir(next > index ? 1 : -1);
    setIndex(next);
  };

  const handleSkip = () => onSkip?.() ?? onComplete?.();

  return (
    // ── Fullscreen overlay ──────────────────────────────────────
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 400,
        background: 'rgba(4, 7, 16, 0.93)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ── Card ─────────────────────────────────────────── */}
      <motion.div
        initial={{ scale: 0.92, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 24, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        style={{
          width: '100%',
          maxWidth: 500,
          background: 'linear-gradient(145deg, #0d1a30, #070b14)',
          border: `1px solid ${NEON.cyan}28`,
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: `0 0 80px ${NEON.cyan}10, 0 32px 80px rgba(0,0,0,0.7)`,
        }}
      >

        {/* ── Top Bar ──────────────────────────────────────── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 18px 12px',
          borderBottom: `1px solid rgba(255,255,255,0.05)`,
          background: `linear-gradient(90deg, ${NEON.cyan}0a, transparent)`,
        }}>
          {/* Label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 16 }}>📖</span>
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.2,
              textTransform: 'uppercase',
              color: NEON.cyan,
            }}>
              {lang === 'id' ? 'Belajar Dulu' : 'Learn First'}
            </span>
          </div>

          {/* Progress counter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.35)' }}>
              {index + 1} / {total}
            </span>
            {/* Skip */}
            <button
              onClick={handleSkip}
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                color: 'rgba(255,255,255,0.3)',
                cursor: 'pointer',
                fontSize: 11,
                fontWeight: 600,
                padding: '4px 10px',
                transition: 'all .18s',
                letterSpacing: 0.3,
              }}
              onMouseEnter={e => { e.target.style.color = '#fff'; e.target.style.borderColor = 'rgba(255,255,255,0.3)'; }}
              onMouseLeave={e => { e.target.style.color = 'rgba(255,255,255,0.3)'; e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            >
              {lang === 'id' ? 'Lewati ✕' : 'Skip ✕'}
            </button>
          </div>
        </div>

        {/* ── Slide Area ───────────────────────────────────── */}
        <div style={{ minHeight: 300, position: 'relative', overflow: 'hidden' }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              style={{ padding: '28px 24px 20px' }}
            >
              {/* Emoji */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.08, type: 'spring', stiffness: 320, damping: 20 }}
                style={{ fontSize: 60, textAlign: 'center', marginBottom: 16, lineHeight: 1 }}
              >
                {slide.emoji}
              </motion.div>

              {/* Title */}
              <h2 style={{
                fontSize: 19,
                fontWeight: 800,
                color: '#f0f6ff',
                textAlign: 'center',
                margin: '0 0 12px',
                lineHeight: 1.3,
              }}>
                {slide.title?.[lang] || slide.title?.en || slide.title}
              </h2>

              {/* Body */}
              <p style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.68)',
                lineHeight: 1.8,
                textAlign: 'center',
                margin: '0 0 16px',
              }}>
                {slide.body?.[lang] || slide.body?.en || slide.body}
              </p>

              {/* Image placeholder — shown when slide.image exists */}
              {slide.image && (
                <div style={{
                  borderRadius: 12,
                  overflow: 'hidden',
                  marginBottom: 14,
                  border: `1px solid ${NEON.cyan}20`,
                }}>
                  <img
                    src={slide.image}
                    alt={slide.title?.[lang] || ''}
                    style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }}
                  />
                </div>
              )}

              {/* Tip box */}
              {slide.tip && (
                <div style={{
                  background: `${NEON.yellow}08`,
                  border: `1px solid ${NEON.yellow}28`,
                  borderRadius: 10,
                  padding: '10px 14px',
                  textAlign: 'center',
                }}>
                  <p style={{
                    fontSize: 12.5,
                    color: `${NEON.yellow}cc`,
                    margin: 0,
                    lineHeight: 1.55,
                  }}>
                    {slide.tip?.[lang] || slide.tip?.en || slide.tip}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Progress Dots ─────────────────────────────────── */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 7,
          padding: '4px 24px 8px',
        }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === index ? 28 : 8,
                height: 8,
                borderRadius: 4,
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'all .25s cubic-bezier(.4,0,.2,1)',
                background: i === index
                  ? NEON.cyan
                  : i < index
                    ? `${NEON.cyan}50`
                    : 'rgba(255,255,255,0.1)',
              }}
            />
          ))}
        </div>

        {/* ── Navigation ────────────────────────────────────── */}
        <div style={{
          display: 'flex',
          gap: 10,
          padding: '10px 20px 20px',
        }}>
          {/* Previous */}
          <button
            onClick={() => go(index - 1)}
            disabled={isFirst}
            style={{
              flex: 1,
              padding: '11px 0',
              borderRadius: 12,
              border: `1px solid rgba(255,255,255,${isFirst ? '0.04' : '0.12'})`,
              background: `rgba(255,255,255,${isFirst ? '0.02' : '0.04'})`,
              color: `rgba(255,255,255,${isFirst ? '0.12' : '0.5'})`,
              cursor: isFirst ? 'not-allowed' : 'pointer',
              fontSize: 13,
              fontWeight: 600,
              transition: 'all .18s',
              letterSpacing: 0.2,
            }}
            onMouseEnter={e => { if (!isFirst) { e.target.style.background = 'rgba(255,255,255,0.08)'; e.target.style.color = '#fff'; } }}
            onMouseLeave={e => { if (!isFirst) { e.target.style.background = 'rgba(255,255,255,0.04)'; e.target.style.color = 'rgba(255,255,255,0.5)'; } }}
          >
            ← {lang === 'id' ? 'Kembali' : 'Back'}
          </button>

          {/* Next / Start Mission */}
          {!isLast ? (
            <button
              onClick={() => go(index + 1)}
              style={{
                flex: 2,
                padding: '11px 0',
                borderRadius: 12,
                border: `1px solid ${NEON.cyan}45`,
                background: `${NEON.cyan}12`,
                color: NEON.cyan,
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 700,
                transition: 'all .18s',
                letterSpacing: 0.3,
              }}
              onMouseEnter={e => { e.target.style.background = `${NEON.cyan}22`; e.target.style.boxShadow = `0 0 20px ${NEON.cyan}20`; }}
              onMouseLeave={e => { e.target.style.background = `${NEON.cyan}12`; e.target.style.boxShadow = 'none'; }}
            >
              {lang === 'id' ? 'Selanjutnya' : 'Next'} →
            </button>
          ) : (
            <button
              onClick={onComplete}
              style={{
                flex: 2,
                padding: '11px 0',
                borderRadius: 12,
                border: 'none',
                background: `linear-gradient(135deg, ${NEON.green}, ${NEON.cyan})`,
                color: '#050810',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 0.5,
                boxShadow: `0 4px 24px ${NEON.green}40`,
                transition: 'all .2s',
              }}
              onMouseEnter={e => { e.target.style.boxShadow = `0 6px 32px ${NEON.green}60`; e.target.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.target.style.boxShadow = `0 4px 24px ${NEON.green}40`; e.target.style.transform = 'translateY(0)'; }}
            >
              🚀 {lang === 'id' ? 'Mulai Misi!' : 'Start Mission!'}
            </button>
          )}
        </div>

        {/* Mission name label at bottom */}
        <div style={{
          textAlign: 'center',
          paddingBottom: 16,
          paddingTop: 0,
        }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.18)', margin: 0 }}>
            📋 {mission?.title?.[lang] || mission?.title?.en || ''}
          </p>
        </div>

      </motion.div>
    </motion.div>
  );
}
