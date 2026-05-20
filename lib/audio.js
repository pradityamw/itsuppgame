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
let musicVolume = 0.30; // Boosted base default music volume
let currentTheme = 'theme1'; // 'theme1' | 'theme2' | 'theme3'
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

// ── Three Exquisite Retro Chiptune Theme Configurations ─────
const THEMES = {
  theme1: {
    // Mario Kart Upbeat (Cheerful C Major Balap)
    bass: [
      48, 60, 48, 60, 48, 60, 48, 60, 52, 64, 52, 64, 55, 67, 55, 67,
      41, 53, 41, 53, 41, 53, 41, 53, 45, 57, 45, 57, 48, 60, 48, 60,
      43, 55, 43, 55, 43, 55, 43, 55, 47, 59, 47, 59, 50, 62, 50, 62,
      48, 60, 48, 60, 45, 57, 45, 57, 50, 62, 50, 62, 43, 55, 43, 55
    ],
    melody: [
      76, 0, 79, 84, 0, 83, 81, 79, 0, 76, 79, 84, 0, 83, 84, 0,
      77, 0, 81, 86, 0, 84, 81, 77, 0, 74, 77, 81, 0, 84, 81, 0,
      79, 0, 83, 88, 0, 86, 83, 79, 0, 76, 79, 83, 0, 86, 83, 79,
      84, 0, 81, 0, 79, 0, 76, 0, 74, 76, 79, 81, 83, 84, 86, 88
    ],
    bpm: 120,
    volBass: 0.18,   // Louder bass
    volMelody: 0.14, // Louder melody
    instrumentMelody: 'square',
    instrumentBass: 'triangle'
  },
  theme2: {
    // Cozy Lo-Fi / Jazz (Relaxed F Major Lounge)
    bass: [
      41, 0, 53, 0, 41, 0, 53, 0, 45, 0, 57, 0, 45, 0, 57, 0,
      40, 0, 52, 0, 40, 0, 52, 0, 43, 0, 55, 0, 43, 0, 55, 0,
      38, 0, 50, 0, 38, 0, 50, 0, 41, 0, 53, 0, 41, 0, 53, 0,
      36, 0, 48, 0, 36, 0, 48, 0, 43, 0, 55, 0, 47, 0, 59, 0
    ],
    melody: [
      77, 0, 81, 88, 0, 84, 81, 0, 77, 0, 81, 88, 0, 84, 0, 0,
      76, 0, 79, 86, 0, 83, 79, 0, 76, 0, 79, 86, 0, 83, 0, 0,
      74, 0, 77, 84, 0, 81, 77, 0, 74, 0, 77, 84, 0, 81, 0, 0,
      72, 0, 76, 83, 0, 79, 76, 0, 74, 76, 79, 81, 83, 84, 0, 0
    ],
    bpm: 90,
    volBass: 0.15,   // Louder bass
    volMelody: 0.10, // Louder melody
    instrumentMelody: 'triangle',
    instrumentBass: 'sine'
  },
  theme3: {
    // Cyberpunk Synthwave (Cool A minor Grid Drive)
    bass: [
      45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 48, 48, 50, 50,
      41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 45, 45, 47, 47,
      43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 47, 47, 48, 48,
      40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 43, 43, 45, 45
    ],
    melody: [
      69, 0, 72, 0, 76, 79, 76, 0, 69, 0, 72, 0, 76, 0, 0, 0,
      65, 0, 69, 0, 72, 76, 72, 0, 65, 0, 69, 0, 72, 0, 0, 0,
      67, 0, 71, 0, 74, 77, 74, 0, 67, 0, 71, 0, 74, 0, 0, 0,
      64, 0, 67, 0, 71, 74, 71, 0, 72, 74, 76, 79, 81, 84, 0, 0
    ],
    bpm: 115,
    volBass: 0.16,   // Louder bass
    volMelody: 0.12, // Louder melody
    instrumentMelody: 'square',
    instrumentBass: 'sawtooth'
  }
};

function getStepDuration(theme) {
  if (theme === 'theme2') return 0.1667; // 90 BPM
  if (theme === 'theme3') return 0.1304; // 115 BPM
  return 0.125; // theme1 (120 BPM)
}

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
    
    const stepDur = getStepDuration(currentTheme);
    delayNode.delayTime.setValueAtTime(stepDur * 2, ctx.currentTime); // 8th note delay
    feedbackNode.gain.setValueAtTime(0.25, ctx.currentTime);
    
    delayNode.connect(feedbackNode);
    feedbackNode.connect(delayNode);
    delayNode.connect(musicGain);
  }
}

// ── Synthesized Chiptune Percussion ──────────────────────────

function playKick(time, volMult = 0.09) {
  const ctx = getCtx();
  if (!ctx || !musicGain) return;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(musicGain);
  
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(120, time);
  osc.frequency.exponentialRampToValueAtTime(30, time + 0.08);
  
  gain.gain.setValueAtTime(volMult, time); // Removed sfxVol dependency
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
  
  osc.start(time);
  osc.stop(time + 0.09);
}

function playSnare(time, noiseVol = 0.05, toneVol = 0.03) {
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
  gain.gain.setValueAtTime(noiseVol, time); // Removed sfxVol dependency
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
  
  noiseSource.connect(filter);
  filter.connect(gain);
  gain.connect(musicGain);
  
  // Triangle tone component for snare body
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(180, time);
  oscGain.gain.setValueAtTime(toneVol, time); // Removed sfxVol dependency
  oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.06);
  
  osc.connect(oscGain);
  oscGain.connect(musicGain);
  
  noiseSource.start(time);
  noiseSource.stop(time + 0.09);
  osc.start(time);
  osc.stop(time + 0.07);
}

function playHihat(time, volMult = 0.02) {
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
  gain.gain.setValueAtTime(volMult, time); // Removed sfxVol dependency
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.02);
  
  noiseSource.connect(filter);
  filter.connect(gain);
  gain.connect(musicGain);
  
  noiseSource.start(time);
  noiseSource.stop(time + 0.03);
}

// ── Synthesized Instrument Logic ─────────────────────────────

function playSynthBass(freq, time, duration, oscType = 'triangle', volMult = 0.08) {
  const ctx = getCtx();
  if (!ctx || !musicGain || freq === 0) return;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = oscType;
  osc.frequency.setValueAtTime(freq, time);
  
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(volMult, time + 0.005); // Removed sfxVol dependency
  gain.gain.exponentialRampToValueAtTime(0.001, time + duration - 0.01);
  
  osc.connect(gain);
  gain.connect(musicGain);
  
  osc.start(time);
  osc.stop(time + duration);
}

function playSynthMelody(freq, time, duration, oscType = 'square', volMult = 0.05) {
  const ctx = getCtx();
  if (!ctx || !musicGain || freq === 0) return;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = oscType; 
  osc.frequency.setValueAtTime(freq, time);
  
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(volMult, time + 0.005); // Removed sfxVol dependency
  gain.gain.exponentialRampToValueAtTime(0.001, time + duration - 0.01);
  
  osc.connect(gain);
  gain.connect(musicGain);
  
  if (delayNode) {
    gain.connect(delayNode);
  }
  
  osc.start(time);
  osc.stop(time + duration);
}

function playDrums(step, time) {
  const beatStep = step % 8;
  
  if (currentTheme === 'theme1') {
    // Upbeat Bouncy: Punchy drums
    if (beatStep === 0) playKick(time, 0.28);
    else if (beatStep === 4) playSnare(time, 0.15, 0.08);
    else if (step % 2 === 0) playHihat(time, 0.06);
  } 
  else if (currentTheme === 'theme2') {
    // Cozy Lo-Fi: soft acoustic brushes
    if (beatStep === 0) playKick(time, 0.16);
    else if (beatStep === 4) playSnare(time, 0.05, 0.02);
    else if (step % 4 === 2) playHihat(time, 0.04);
  } 
  else if (currentTheme === 'theme3') {
    // Cyber Synthwave: heavy electro patterns
    if (beatStep === 0 || beatStep === 4) playKick(time, 0.26);
    if (beatStep === 4) playSnare(time, 0.15, 0.10);
    if (step % 2 === 1) playHihat(time, 0.06);
  }
}

function scheduleNote(step, time) {
  const theme = THEMES[currentTheme];
  const bassMidi = theme.bass[step];
  const melodyMidi = theme.melody[step];
  
  const bassFreq = mToF(bassMidi);
  const melodyFreq = mToF(melodyMidi);
  
  // Play bass
  if (bassFreq > 0) {
    const bassDur = currentTheme === 'theme2' ? 0.22 : 0.09;
    playSynthBass(bassFreq, time, bassDur, theme.instrumentBass, theme.volBass);
  }
  
  // Play melody
  if (melodyFreq > 0) {
    const melDur = currentTheme === 'theme2' ? 0.25 : 0.15;
    playSynthMelody(melodyFreq, time, melDur, theme.instrumentMelody, theme.volMelody);
  }
  
  // Play drums
  playDrums(step, time);
}

function nextStep() {
  const stepDuration = getStepDuration(currentTheme);
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

export function setMusicTheme(theme) {
  if (THEMES[theme]) {
    currentTheme = theme;
    
    // Adjust delay node delayTime dynamically to sync with the new BPM
    const ctx = getCtx();
    if (ctx && delayNode) {
      const stepDur = getStepDuration(theme);
      delayNode.delayTime.setValueAtTime(stepDur * 2, ctx.currentTime);
    }
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
    volume: musicVolume,
    theme: currentTheme
  };
}
