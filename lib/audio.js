// Web Audio API Sound Manager
let audioCtx = null;

function getCtx() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

// ── Primitive synth helpers ──────────────────────────────────

function playTone(freq, duration, type = 'sine', volume = 0.3, delay = 0) {
  const ctx = getCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
  gain.gain.setValueAtTime(volume, ctx.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + duration + 0.05);
}

function playNoise(duration, volume = 0.15) {
  const ctx = getCtx();
  if (!ctx) return;
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  source.connect(gain);
  gain.connect(ctx.destination);
  source.start();
}

// ── Sound Library ────────────────────────────────────────────

export const SFX = {
  /** UI click */
  click() {
    playTone(800, 0.05, 'square', 0.15);
    playTone(600, 0.05, 'square', 0.1, 0.05);
  },

  /** Button hover */
  hover() {
    playTone(1200, 0.04, 'sine', 0.06);
  },

  /** XP gain pop */
  xpGain() {
    playTone(440, 0.1, 'sine', 0.2);
    playTone(660, 0.1, 'sine', 0.2, 0.1);
    playTone(880, 0.15, 'sine', 0.2, 0.2);
  },

  /** Level up fanfare */
  levelUp() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((f, i) => playTone(f, 0.25, 'triangle', 0.3, i * 0.15));
  },

  /** Mission complete */
  missionComplete() {
    const notes = [523, 659, 784, 1047, 1319];
    notes.forEach((f, i) => playTone(f, 0.3, 'sine', 0.25, i * 0.12));
  },

  /** Mission failed */
  missionFailed() {
    playTone(300, 0.3, 'sawtooth', 0.2);
    playTone(200, 0.4, 'sawtooth', 0.2, 0.3);
  },

  /** Keyboard typing (short) */
  keyType() {
    playNoise(0.04, 0.08);
    playTone(2000 + Math.random() * 500, 0.03, 'square', 0.05);
  },

  /** Component snap (drag-drop success) */
  snap() {
    playTone(1000, 0.08, 'square', 0.2);
    playTone(1500, 0.12, 'sine', 0.2, 0.08);
  },

  /** Wrong placement */
  wrong() {
    playTone(200, 0.15, 'sawtooth', 0.25);
  },

  /** PC power on */
  powerOn() {
    const ctx = getCtx();
    if (!ctx) return;
    // Fan spin up
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(60, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(200, ctx.currentTime + 1.2);
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.3);
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 1.2);
    osc.start();
    osc.stop(ctx.currentTime + 1.3);
    // Beep
    setTimeout(() => playTone(1000, 0.05, 'square', 0.2), 400);
  },

  /** Router beep */
  routerBeep() {
    playTone(880, 0.08, 'square', 0.15);
    playTone(880, 0.08, 'square', 0.1, 0.15);
  },

  /** Cable plug */
  cablePlug() {
    playNoise(0.06, 0.2);
    playTone(300, 0.1, 'sine', 0.15, 0.05);
  },

  /** Notification */
  notify() {
    playTone(880, 0.1, 'sine', 0.2);
    playTone(1100, 0.15, 'sine', 0.2, 0.1);
  },

  /** Coin earn */
  coin() {
    playTone(1318, 0.08, 'triangle', 0.2);
    playTone(1568, 0.12, 'triangle', 0.2, 0.08);
  },

  /** Achievement unlock */
  achievement() {
    const notes = [784, 988, 1175, 1568];
    notes.forEach((f, i) => playTone(f, 0.2, 'triangle', 0.25, i * 0.1));
  },

  /** Correct quiz answer */
  correct() {
    playTone(660, 0.1, 'sine', 0.2);
    playTone(880, 0.15, 'sine', 0.2, 0.1);
  },

  /** Open case / mechanical */
  mechanical() {
    playNoise(0.15, 0.12);
    playTone(150, 0.2, 'square', 0.1);
  },

  /** Ambient office hum (looping — returns stop function) */
  startAmbience() {
    const ctx = getCtx();
    if (!ctx) return () => {};
    const nodes = [];
    // Low hum
    const osc1 = ctx.createOscillator();
    const g1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.value = 60;
    g1.gain.value = 0.03;
    osc1.connect(g1);
    g1.connect(ctx.destination);
    osc1.start();
    nodes.push(osc1);
    // Fan noise
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const d = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) d[i] = (Math.random() * 2 - 1) * 0.02;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    const g2 = ctx.createGain();
    g2.gain.value = 0.04;
    src.connect(g2);
    g2.connect(ctx.destination);
    src.start();
    nodes.push(src);
    return () => nodes.forEach(n => { try { n.stop(); } catch {} });
  },
};

// ── Volume control ───────────────────────────────────────────

let sfxEnabled = true;
let sfxVol = 0.7;

export function setSFXEnabled(v) { sfxEnabled = v; }
export function setSFXVolume(v)  { sfxVol = v; }

/** Wrapped SFX that respects mute setting */
export const sound = new Proxy(SFX, {
  get(target, key) {
    return (...args) => {
      if (!sfxEnabled) return;
      return target[key]?.(...args);
    };
  },
});
