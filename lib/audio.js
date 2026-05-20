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
      // Auto-start background music on first user interaction sound effect play
      if (typeof window !== 'undefined' && !isMusicPlaying && !musicMuted) {
        startBackgroundMusic();
      }
      if (!sfxEnabled) return;
      return target[key]?.(...args);
    };
  },
});

// ── Bouncy Mario Kart-Style BGM Sequencer ────────────────────

let musicInterval = null;
let musicGain = null;
let isMusicPlaying = false;
let musicMuted = false;
let musicVolume = 0.16; // Increased initial volume from 0.08 for a louder, clearer sound
let delayNode = null;
let feedbackNode = null;

let currentStep = 0;
let nextNoteTime = 0.0;
const scheduleAheadTime = 0.12; 
const lookahead = 25.0; 

// Convert MIDI number to Frequency
function mToF(midi) {
  if (!midi || midi === 0) return 0;
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// Bouncy walking octave bassline in MIDI numbers (C -> F -> G -> Turnaround)
const BASS_MIDI = [
  // Bar 1 (C Major): Octave boom-chick feel
  48, 60, 48, 60, 48, 60, 48, 60, 52, 64, 52, 64, 55, 67, 55, 67,
  // Bar 2 (F Major)
  41, 53, 41, 53, 41, 53, 41, 53, 45, 57, 45, 57, 48, 60, 48, 60,
  // Bar 3 (G Major)
  43, 55, 43, 55, 43, 55, 43, 55, 47, 59, 47, 59, 50, 62, 50, 62,
  // Bar 4 (Turnaround turnaround: C -> Am -> Dm -> G)
  48, 60, 48, 60, 45, 57, 45, 57, 50, 62, 50, 62, 43, 55, 43, 55
];

// Super energetic, happy, syncopated melody in MIDI numbers
const MELODY_MIDI = [
  // Bar 1 (C Major) - Bright bouncy jump-in
  76, 0, 79, 84, 0, 83, 81, 79, 0, 76, 79, 84, 0, 83, 84, 0,
  // Bar 2 (F Major) - Happy answering motif
  77, 0, 81, 86, 0, 84, 81, 77, 0, 74, 77, 81, 0, 84, 81, 0,
  // Bar 3 (G Major) - Climbing fanfare
  79, 0, 83, 88, 0, 86, 83, 79, 0, 76, 79, 83, 0, 86, 83, 79,
  // Bar 4 (Turnaround / Resolution run) - Mario-style fast resolution run!
  84, 0, 81, 0, 79, 0, 76, 0, 74, 76, 79, 81, 83, 84, 86, 88
];

function initMusic() {
  const ctx = getCtx();
  if (!ctx) return;
  if (!musicGain) {
    musicGain = ctx.createGain();
    musicGain.gain.value = musicMuted ? 0 : musicVolume;
    musicGain.connect(ctx.destination);
    
    // Low-pass feedback delay for bouncy chiptune echo
    delayNode = ctx.createDelay(1.0);
    feedbackNode = ctx.createGain();
    
    // Delay duration set to an 8th note at 120 BPM (approx 0.25s)
    delayNode.delayTime.setValueAtTime(0.25, ctx.currentTime);
    feedbackNode.gain.setValueAtTime(0.25, ctx.currentTime);
    
    delayNode.connect(feedbackNode);
    feedbackNode.connect(delayNode);
    delayNode.connect(musicGain);
  }
}

// ── Synthesized Chiptune Percussion ──────────────────────────

function playKick(time) {
  const ctx = getCtx();
  if (!ctx || !musicGain) return;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(musicGain);
  
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(120, time);
  osc.frequency.exponentialRampToValueAtTime(30, time + 0.08);
  
  gain.gain.setValueAtTime(0.09 * sfxVol, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
  
  osc.start(time);
  osc.stop(time + 0.09);
}

function playSnare(time) {
  const ctx = getCtx();
  if (!ctx || !musicGain) return;
  
  // Noise component for snare bite
  const bufferSize = ctx.sampleRate * 0.08;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = buffer;
  
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1000, time);
  
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.05 * sfxVol, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
  
  noiseSource.connect(filter);
  filter.connect(gain);
  gain.connect(musicGain);
  
  // Triangle tone component for snare body
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(180, time);
  oscGain.gain.setValueAtTime(0.03 * sfxVol, time);
  oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.06);
  
  osc.connect(oscGain);
  oscGain.connect(musicGain);
  
  noiseSource.start(time);
  noiseSource.stop(time + 0.09);
  osc.start(time);
  osc.stop(time + 0.07);
}

function playHihat(time) {
  const ctx = getCtx();
  if (!ctx || !musicGain) return;
  
  const bufferSize = ctx.sampleRate * 0.02;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = buffer;
  
  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.setValueAtTime(7000, time);
  
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.02 * sfxVol, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.02);
  
  noiseSource.connect(filter);
  filter.connect(gain);
  gain.connect(musicGain);
  
  noiseSource.start(time);
  noiseSource.stop(time + 0.03);
}

// ── Synthesized Instrument Logic ─────────────────────────────

function playSynthBass(freq, time, duration) {
  const ctx = getCtx();
  if (!ctx || !musicGain || freq === 0) return;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = 'triangle'; // Warm bouncy bass
  osc.frequency.setValueAtTime(freq, time);
  
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(0.08 * sfxVol, time + 0.005); // Increased from 0.06
  gain.gain.exponentialRampToValueAtTime(0.001, time + duration - 0.01);
  
  osc.connect(gain);
  gain.connect(musicGain);
  
  osc.start(time);
  osc.stop(time + duration);
}

function playSynthMelody(freq, time, duration) {
  const ctx = getCtx();
  if (!ctx || !musicGain || freq === 0) return;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  // Plucky retro square wave (bright chiptune feel)
  osc.type = 'square'; 
  osc.frequency.setValueAtTime(freq, time);
  
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(0.05 * sfxVol, time + 0.005); // Increased from 0.03
  gain.gain.exponentialRampToValueAtTime(0.001, time + duration - 0.01);
  
  osc.connect(gain);
  gain.connect(musicGain);
  
  if (delayNode) {
    gain.connect(delayNode);
  }
  
  osc.start(time);
  osc.stop(time + duration);
}

function scheduleNote(step, time) {
  const bassMidi = BASS_MIDI[step];
  const melodyMidi = MELODY_MIDI[step];
  
  const bassFreq = mToF(bassMidi);
  const melodyFreq = mToF(melodyMidi);
  
  // Play bouncy bass (staccato length, 90ms for warm and solid decay at 120 BPM)
  if (bassFreq > 0) {
    playSynthBass(bassFreq, time, 0.09);
  }
  
  // Play plucky melody (longer 150ms length to flow gracefully at 120 BPM)
  if (melodyFreq > 0) {
    playSynthMelody(melodyFreq, time, 0.15);
  }
  
  // Play cute retro drum tracks
  const beatStep = step % 8;
  if (beatStep === 0) {
    playKick(time);
  } else if (beatStep === 4) {
    playSnare(time);
  } else if (step % 2 === 0) {
    playHihat(time);
  }
}

function nextStep() {
  const stepDuration = 0.125; // 16th note at 120 BPM (125ms)
  nextNoteTime += stepDuration;
  currentStep = (currentStep + 1) % 64;
}

function scheduler() {
  const ctx = getCtx();
  if (!ctx) return;
  while (nextNoteTime < ctx.currentTime + scheduleAheadTime) {
    scheduleNote(currentStep, nextNoteTime);
    nextStep();
  }
}

export function startBackgroundMusic() {
  if (typeof window === 'undefined') return;
  const ctx = getCtx();
  if (!ctx) return;
  initMusic();
  if (isMusicPlaying) return;
  
  isMusicPlaying = true;
  nextNoteTime = ctx.currentTime + 0.05;
  currentStep = 0;
  
  if (musicInterval) clearInterval(musicInterval);
  musicInterval = setInterval(scheduler, lookahead);
}

export function stopBackgroundMusic() {
  if (musicInterval) {
    clearInterval(musicInterval);
    musicInterval = null;
  }
  isMusicPlaying = false;
}

export function setMusicVolume(vol) {
  musicVolume = Math.max(0, Math.min(1, vol));
  if (musicGain) {
    musicGain.gain.setValueAtTime(musicMuted ? 0 : musicVolume, getCtx() ? getCtx().currentTime : 0);
  }
}

export function setMusicMuted(muted) {
  musicMuted = muted;
  if (musicGain) {
    musicGain.gain.setValueAtTime(muted ? 0 : musicVolume, getCtx() ? getCtx().currentTime : 0);
  }
  // Try to start music if unmuting
  if (!muted && !isMusicPlaying) {
    startBackgroundMusic();
  }
}

export function getMusicState() {
  return {
    isPlaying: isMusicPlaying,
    isMuted: musicMuted,
    volume: musicVolume
  };
}
