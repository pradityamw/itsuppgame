// XP & Leveling System — 100 Levels, 12 Ranks
// IT Support Adventure — Long-term Educational RPG

// ── Level thresholds (cumulative XP to REACH that level) ──────
// Designed so completing all missions in a tier naturally unlocks the next tier.
// T1 missions (~1600 XP total) → Lv 10 | T2 (~1800 XP) → Lv 20 | etc.
const LEVEL_THRESHOLDS = [
  0,        // Lv 1
  120,      // Lv 2
  280,      // Lv 3
  470,      // Lv 4
  700,      // Lv 5
  960,      // Lv 6
  1100,     // Lv 7
  1230,     // Lv 8
  1370,     // Lv 9
  1500,     // Lv 10 ✦ T2 unlock — Computer Technician
  1700,     // Lv 11
  1920,     // Lv 12
  2160,     // Lv 13
  2420,     // Lv 14
  2700,     // Lv 15
  3000,     // Lv 16
  3320,     // Lv 17
  3660,     // Lv 18
  3820,     // Lv 19
  4000,     // Lv 20 ✦ T3 unlock — Windows IT Support
  4380,     // Lv 21
  4780,     // Lv 22
  5200,     // Lv 23
  5640,     // Lv 24
  6100,     // Lv 25
  6580,     // Lv 26
  7080,     // Lv 27
  7600,     // Lv 28
  8140,     // Lv 29
  8700,     // Lv 30
  9280,     // Lv 31
  9880,     // Lv 32
  10500,    // Lv 33
  11140,    // Lv 34
  11800,    // Lv 35 ✦ T4 unlock — Network Technician
  12520,    // Lv 36
  13260,    // Lv 37
  14020,    // Lv 38
  14800,    // Lv 39
  15600,    // Lv 40
  16420,    // Lv 41
  17260,    // Lv 42
  18120,    // Lv 43
  19000,    // Lv 44
  19900,    // Lv 45
  20820,    // Lv 46
  21760,    // Lv 47
  22720,    // Lv 48
  23700,    // Lv 49
  24700,    // Lv 50 ✦ T5 unlock — System Administrator
  25900,    // Lv 51
  27120,    // Lv 52
  28360,    // Lv 53
  29620,    // Lv 54
  30900,    // Lv 55
  32200,    // Lv 56
  33520,    // Lv 57
  34860,    // Lv 58
  36220,    // Lv 59
  37600,    // Lv 60
  39100,    // Lv 61
  40620,    // Lv 62
  42160,    // Lv 63
  43720,    // Lv 64
  45300,    // Lv 65
  46900,    // Lv 66
  48520,    // Lv 67
  50160,    // Lv 68
  51820,    // Lv 69
  53500,    // Lv 70 ✦ T6 unlock — Security Specialist
  55500,    // Lv 71
  57520,    // Lv 72
  59560,    // Lv 73
  61620,    // Lv 74
  63700,    // Lv 75
  65800,    // Lv 76
  67920,    // Lv 77
  70060,    // Lv 78
  72220,    // Lv 79
  74400,    // Lv 80
  76800,    // Lv 81
  79220,    // Lv 82
  81660,    // Lv 83
  84120,    // Lv 84
  86600,    // Lv 85 ✦ T7 unlock — Senior Engineer
  89300,    // Lv 86
  92020,    // Lv 87
  94760,    // Lv 88
  97520,    // Lv 89
  100300,   // Lv 90
  103300,   // Lv 91
  106320,   // Lv 92
  109360,   // Lv 93
  112420,   // Lv 94
  115500,   // Lv 95
  118800,   // Lv 96
  122120,   // Lv 97
  125460,   // Lv 98
  128820,   // Lv 99
  132200,   // Lv 100 ★ MAX — IT LEGEND
];

export const XP_CONFIG = {
  levels: LEVEL_THRESHOLDS,
  maxLevel: 100,

  // ── 12 Ranks ──────────────────────────────────────────────────
  ranks: [
    { minLevel: 1,   maxLevel: 5,   key: 'intern',       label: 'Intern',            emoji: '🎒', color: '#8ba3c7', tier: 1 },
    { minLevel: 6,   maxLevel: 10,  key: 'apprentice',   label: 'Apprentice',        emoji: '📱', color: '#a8d8a8', tier: 1 },
    { minLevel: 11,  maxLevel: 15,  key: 'junior_tech',  label: 'Junior Technician', emoji: '💻', color: '#39ff14', tier: 2 },
    { minLevel: 16,  maxLevel: 20,  key: 'it_support',   label: 'IT Support',        emoji: '🔧', color: '#00f5ff', tier: 2 },
    { minLevel: 21,  maxLevel: 28,  key: 'hw_tech',      label: 'Hardware Tech',     emoji: '🖥️', color: '#4fc3f7', tier: 3 },
    { minLevel: 29,  maxLevel: 35,  key: 'net_tech',     label: 'Network Tech',      emoji: '🌐', color: '#bf00ff', tier: 3 },
    { minLevel: 36,  maxLevel: 50,  key: 'sys_analyst',  label: 'Systems Analyst',   emoji: '⚙️', color: '#ff6b00', tier: 4 },
    { minLevel: 51,  maxLevel: 70,  key: 'sysadmin',     label: 'SysAdmin',          emoji: '🖧',  color: '#ff9500', tier: 5 },
    { minLevel: 71,  maxLevel: 85,  key: 'sec_engineer', label: 'Security Engineer', emoji: '🛡️', color: '#ff2d78', tier: 6 },
    { minLevel: 86,  maxLevel: 95,  key: 'sr_engineer',  label: 'Senior Engineer',   emoji: '🏗️', color: '#e040fb', tier: 7 },
    { minLevel: 96,  maxLevel: 99,  key: 'it_director',  label: 'IT Director',       emoji: '👔', color: '#ffd700', tier: 7 },
    { minLevel: 100, maxLevel: 100, key: 'it_legend',    label: 'IT Legend',         emoji: '👑', color: '#ff6b6b', tier: 7 },
  ],

  // Skill points
  skillPointsPerLevel: 1,
  skillPointsPerRankUp: 3,
};

// ── Helper: get XP threshold for a level ─────────────────────
export function xpForLevel(level) {
  const idx = Math.min(Math.max(level - 1, 0), LEVEL_THRESHOLDS.length - 1);
  return LEVEL_THRESHOLDS[idx] ?? 0;
}

// ── Helper: compute level from total XP ──────────────────────
export function getLevelFromXP(totalXP) {
  let level = 1;
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (totalXP >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
    } else {
      break;
    }
  }
  return Math.min(level, XP_CONFIG.maxLevel);
}

// ── Helper: progress to next level ───────────────────────────
export function getLevelProgress(totalXP) {
  const currentLevel = getLevelFromXP(totalXP);
  if (currentLevel >= XP_CONFIG.maxLevel) {
    return { percent: 100, current: totalXP, needed: 0, currentLevel, nextLevelXP: 0 };
  }
  const currentLevelXP = xpForLevel(currentLevel);
  const nextLevelXP    = xpForLevel(currentLevel + 1);
  const progressXP = totalXP - currentLevelXP;
  const rangeXP    = nextLevelXP - currentLevelXP;
  const percent    = Math.min(100, Math.round((progressXP / rangeXP) * 100));
  return {
    percent,
    current: progressXP,
    needed:  rangeXP - progressXP,
    currentLevel,
    nextLevelXP: nextLevelXP - totalXP,
  };
}

// ── Helper: rank from level ───────────────────────────────────
export function getRankForLevel(level) {
  const rank = XP_CONFIG.ranks.find(r => level >= r.minLevel && level <= r.maxLevel);
  return rank ?? XP_CONFIG.ranks[0];
}

export function getRankFromXP(totalXP) {
  return getRankForLevel(getLevelFromXP(totalXP));
}

// ── XP multipliers ────────────────────────────────────────────
export function getStreakMultiplier(streakDays) {
  if (streakDays >= 100) return 3.0;
  if (streakDays >= 30)  return 2.0;
  if (streakDays >= 14)  return 1.75;
  if (streakDays >= 7)   return 1.5;
  if (streakDays >= 3)   return 1.25;
  return 1.0;
}

export function calculateXPGain(baseXP, streakDays = 0, speedBonus = false, careerBonus = 1.0) {
  const multiplier = getStreakMultiplier(streakDays);
  const speed      = speedBonus ? 1.2 : 1.0;
  return Math.round(baseXP * multiplier * speed * careerBonus);
}

// ── Daily login bonus ─────────────────────────────────────────
export function getDailyBonusXP(streakDays, level) {
  const base     = 50 + level * 5;
  const streakMx = getStreakMultiplier(streakDays);
  return Math.round(base * streakMx);
}

// ── Coin rewards ──────────────────────────────────────────────
export const COIN_REWARDS = {
  easy:      { min: 10,  max: 30  },
  medium:    { min: 30,  max: 80  },
  hard:      { min: 80,  max: 200 },
  epic:      { min: 200, max: 500 },
  legendary: { min: 500, max: 1200 },
};

export function getRandomCoinReward(difficulty) {
  const range = COIN_REWARDS[difficulty] ?? COIN_REWARDS.easy;
  return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
}

// ── XP rewards by difficulty & tier ──────────────────────────
export const XP_REWARDS = {
  easy:      { base: 100,  variance: 50  },
  medium:    { base: 250,  variance: 100 },
  hard:      { base: 500,  variance: 200 },
  epic:      { base: 1000, variance: 400 },
  legendary: { base: 2500, variance: 1000 },
};

export function getXPReward(difficulty, tierBonus = 1) {
  const cfg = XP_REWARDS[difficulty] ?? XP_REWARDS.easy;
  const variance = Math.floor(Math.random() * cfg.variance);
  return Math.round((cfg.base + variance) * tierBonus);
}

// ── Tier info (for map display) ───────────────────────────────
export const TIER_INFO = [
  { tier: 1, name: 'Digital Beginner',    levelRange: '1–10',  color: '#39ff14', minLevel: 1  },
  { tier: 2, name: 'Computer Technician', levelRange: '10–20', color: '#00f5ff', minLevel: 10 },
  { tier: 3, name: 'Windows IT Support',  levelRange: '20–35', color: '#4fc3f7', minLevel: 20 },
  { tier: 4, name: 'Network Technician',  levelRange: '35–50', color: '#bf00ff', minLevel: 35 },
  { tier: 5, name: 'SysAdmin',            levelRange: '50–70', color: '#ff6b00', minLevel: 50 },
  { tier: 6, name: 'Security Specialist', levelRange: '70–85', color: '#ff2d78', minLevel: 70 },
  { tier: 7, name: 'Senior Engineer',     levelRange: '85–100',color: '#ffd700', minLevel: 85 },
];
