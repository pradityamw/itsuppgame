'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTierIntro } from '@/lib/tierIntros';

export default function TierIntroCarousel({ tier, lang = 'en', onComplete }) {
  const intro = getTierIntro(tier);
  const [slideIndex, setSlideIndex] = useState(0);
  const [dir, setDir] = useState(1); // 1 = forward, -1 = backward

  if (!intro) {
    onComplete?.();
    return null;
  }

  const slides = intro.slides;
  const total = slides.length;
  const slide = slides[slideIndex];
  const isLast = slideIndex === total - 1;
  const color = intro.color || '#00f5ff';

  const go = (newIdx) => {
    setDir(newIdx > slideIndex ? 1 : -1);
    setSlideIndex(newIdx);
  };

  const variants = {
    enter: (d) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: 'rgba(5,8,18,0.92)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        style={{
          width: '100%',
          maxWidth: 480,
          background: 'linear-gradient(135deg, #0d1a2e, #070b14)',
          border: `1px solid ${color}30`,
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: `0 0 60px ${color}18, 0 24px 80px rgba(0,0,0,0.7)`,
        }}
      >
        {/* ── Header ───────────────────────────── */}
        <div
          style={{
            background: `linear-gradient(135deg, ${color}14, transparent)`,
            borderBottom: `1px solid ${color}20`,
            padding: '16px 20px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: 'uppercase',
                color,
                background: `${color}15`,
                border: `1px solid ${color}30`,
                borderRadius: 20,
                padding: '3px 10px',
              }}
            >
              {intro.badge[lang] || intro.badge.en}
            </span>
          </div>
          <button
            onClick={onComplete}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.25)',
              cursor: 'pointer',
              fontSize: 18,
              lineHeight: 1,
              transition: 'color .2s',
              padding: 4,
            }}
            onMouseEnter={e => (e.target.style.color = 'rgba(255,255,255,0.7)')}
            onMouseLeave={e => (e.target.style.color = 'rgba(255,255,255,0.25)')}
            title="Skip"
          >
            ✕
          </button>
        </div>

        {/* ── Slide area ───────────────────────── */}
        <div style={{ padding: '8px 0', minHeight: 280, position: 'relative', overflow: 'hidden' }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={slideIndex}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              style={{ padding: '20px 24px 16px' }}
            >
              {/* Emoji */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                style={{ fontSize: 56, textAlign: 'center', marginBottom: 14, lineHeight: 1 }}
              >
                {slide.emoji}
              </motion.div>

              {/* Title */}
              <h2 style={{
                fontSize: 18,
                fontWeight: 800,
                color: '#f0f6ff',
                margin: '0 0 10px',
                textAlign: 'center',
                lineHeight: 1.3,
              }}>
                {slide.title[lang] || slide.title.en}
              </h2>

              {/* Body */}
              <p style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.72)',
                lineHeight: 1.75,
                margin: '0 0 14px',
                textAlign: 'center',
              }}>
                {slide.body[lang] || slide.body.en}
              </p>

              {/* Tip */}
              <div style={{
                background: `${color}08`,
                border: `1px solid ${color}25`,
                borderRadius: 10,
                padding: '9px 14px',
                textAlign: 'center',
              }}>
                <p style={{ fontSize: 12, color: `${color}cc`, margin: 0, lineHeight: 1.5 }}>
                  {slide.tip[lang] || slide.tip.en}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Progress dots ─────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, padding: '0 24px 8px' }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              style={{
                width: i === slideIndex ? 24 : 8,
                height: 8,
                borderRadius: 4,
                border: 'none',
                cursor: 'pointer',
                transition: 'all .25s',
                background: i === slideIndex ? color : 'rgba(255,255,255,0.12)',
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* ── Navigation ───────────────────────── */}
        <div style={{ display: 'flex', gap: 10, padding: '12px 20px 20px' }}>
          {slideIndex > 0 && (
            <button
              onClick={() => go(slideIndex - 1)}
              style={{
                flex: 1,
                padding: '11px 16px',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.04)',
                color: 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                transition: 'all .18s',
              }}
              onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.08)'; e.target.style.color = '#fff'; }}
              onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.04)'; e.target.style.color = 'rgba(255,255,255,0.5)'; }}
            >
              ← {lang === 'id' ? 'Sebelumnya' : 'Previous'}
            </button>
          )}

          {!isLast ? (
            <button
              onClick={() => go(slideIndex + 1)}
              style={{
                flex: 2,
                padding: '11px 16px',
                borderRadius: 12,
                border: `1px solid ${color}50`,
                background: `${color}14`,
                color,
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 700,
                transition: 'all .18s',
              }}
              onMouseEnter={e => { e.target.style.background = `${color}25`; }}
              onMouseLeave={e => { e.target.style.background = `${color}14`; }}
            >
              {lang === 'id' ? 'Selanjutnya' : 'Next'} →
            </button>
          ) : (
            <button
              onClick={onComplete}
              style={{
                flex: 2,
                padding: '11px 16px',
                borderRadius: 12,
                border: 'none',
                background: `linear-gradient(135deg, ${color}, ${color}99)`,
                color: '#070b14',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 0.5,
                boxShadow: `0 4px 20px ${color}40`,
                transition: 'all .18s',
              }}
              onMouseEnter={e => { e.target.style.boxShadow = `0 6px 28px ${color}60`; e.target.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.target.style.boxShadow = `0 4px 20px ${color}40`; e.target.style.transform = 'translateY(0)'; }}
            >
              🚀 {lang === 'id' ? 'Mulai Misi!' : 'Start Missions!'}
            </button>
          )}
        </div>

        {/* Skip link */}
        <div style={{ textAlign: 'center', paddingBottom: 16 }}>
          <button
            onClick={onComplete}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.2)',
              cursor: 'pointer',
              fontSize: 11,
              transition: 'color .2s',
            }}
            onMouseEnter={e => (e.target.style.color = 'rgba(255,255,255,0.5)')}
            onMouseLeave={e => (e.target.style.color = 'rgba(255,255,255,0.2)')}
          >
            {lang === 'id' ? 'Lewati penjelasan →' : 'Skip intro →'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
