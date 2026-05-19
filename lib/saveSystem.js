// Save System — localStorage + Supabase cloud sync
import { createClient } from '@supabase/supabase-js';

const SAVE_KEY = 'itsupport_save';

/** Default new game state */
export function getDefaultSave() {
  return {
    version: '1.0',
    createdAt: new Date().toISOString(),
    lastSaved: new Date().toISOString(),

    // Player info
    playerName: 'Technician',
    avatar: '👨‍💻',
    language: 'en',

    // Progression
    totalXP: 0,
    level: 1,
    coins: 100, // starter coins
    skillPoints: 0,

    // Skills (0–5 each)
    skills: {
      hardware:       0,
      networking:     0,
      security:       0,
      troubleshooting: 0,
      customerService: 0,
    },

    // Missions
    completedMissions: [],    // array of mission IDs
    failedMissions:    {},    // { missionId: failCount }
    currentMission:    null,  // active mission ID

    // Areas unlocked
    unlockedAreas: ['bedroom'],

    // Inventory / tools
    tools: ['screwdriver'],   // start with screwdriver

    // Daily system
    lastLoginDate:   null,
    loginStreak:     0,
    dailyTasksDone:  {},  // { 'YYYY-MM-DD': ['task_id1', ...] }
    dailyBonusClaimed: false,

    // Achievements
    achievements: [],

    // Settings
    soundEnabled: true,
    musicEnabled: true,
    sfxVolume:    0.7,
    musicVolume:  0.4,

    // Cosmetics
    roomTheme: 'default',
    deskSetup: 'basic',
  };
}

/** Save game state to localStorage */
export function saveLocal(state) {
  try {
    const data = { ...state, lastSaved: new Date().toISOString() };
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('[Save] localStorage error:', e);
    return false;
  }
}

/** Load game state from localStorage */
export function loadLocal() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('[Save] Load error:', e);
    return null;
  }
}

/** Merge loaded save with defaults (handles new fields from updates) */
export function mergeSave(loaded) {
  const defaults = getDefaultSave();
  return { ...defaults, ...loaded };
}

/** Delete local save */
export function deleteLocal() {
  localStorage.removeItem(SAVE_KEY);
}

// ============================================================
// Supabase Cloud Save
// ============================================================

let supabase = null;

function getSupabase() {
  if (supabase) return supabase;
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  const { createClient: create } = require('@supabase/supabase-js');
  supabase = create(url, key);
  return supabase;
}

/** Save to Supabase (upsert player_saves table) */
export async function saveCloud(userId, state) {
  const sb = getSupabase();
  if (!sb) return { success: false, error: 'Supabase not configured' };

  try {
    const { error } = await sb.from('player_saves').upsert({
      user_id: userId,
      save_data: state,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });

    if (error) throw error;
    return { success: true };
  } catch (e) {
    console.error('[Save] Cloud save error:', e);
    return { success: false, error: e.message };
  }
}

/** Load from Supabase */
export async function loadCloud(userId) {
  const sb = getSupabase();
  if (!sb) return null;

  try {
    const { data, error } = await sb
      .from('player_saves')
      .select('save_data')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data?.save_data || null;
  } catch (e) {
    console.error('[Save] Cloud load error:', e);
    return null;
  }
}

/** Smart save: local first, then cloud */
export async function saveGame(state, userId = null) {
  saveLocal(state);
  if (userId) {
    await saveCloud(userId, state);
  }
}

/** Smart load: prefer cloud if authenticated */
export async function loadGame(userId = null) {
  if (userId) {
    const cloud = await loadCloud(userId);
    if (cloud) return mergeSave(cloud);
  }
  const local = loadLocal();
  if (local) return mergeSave(local);
  return getDefaultSave();
}

// ============================================================
// Daily streak logic
// ============================================================

/** Check and update daily login streak */
export function checkDailyStreak(save) {
  const today = new Date().toDateString();
  const lastLogin = save.lastLoginDate;

  if (lastLogin === today) {
    // Already logged in today
    return { ...save, dailyBonusClaimed: save.dailyBonusClaimed };
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const wasYesterday = lastLogin === yesterday.toDateString();

  const newStreak = wasYesterday ? (save.loginStreak + 1) : 1;

  return {
    ...save,
    lastLoginDate: today,
    loginStreak: newStreak,
    dailyBonusClaimed: false, // reset daily bonus
  };
}

/** Calculate daily bonus XP */
export function getDailyBonusXP(streak) {
  const base = 50;
  if (streak >= 30) return base * 4;
  if (streak >= 14) return base * 3;
  if (streak >= 7)  return base * 2;
  if (streak >= 3)  return base * 1.5;
  return base;
}
