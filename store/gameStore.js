import { create } from 'zustand';
import { getLevelFromXP, getLevelProgress, getRankFromXP, calculateXPGain, getDailyBonusXP } from '@/lib/xpSystem';
import { saveLocal, loadLocal, mergeSave, getDefaultSave, checkDailyStreak } from '@/lib/saveSystem';
import { saveCloud } from '@/lib/saveSystem';

export const useGameStore = create((set, get) => ({
  // ── Core state ─────────────────────────────────────────────
  ...getDefaultSave(),
  user:            null,
  isLoaded:        false,
  toasts:          [],
  activeMission:   null,
  showReward:      null,

  // ── New expanded state ─────────────────────────────────────
  careerPath:      null,          // 'hardware' | 'network' | 'sysadmin' | 'security' | 'helpdesk'
  careerLevel:     0,             // 0–20 career mastery level
  careerXP:        0,             // XP within career path
  reputation:      50,            // 0–100 customer satisfaction score
  workshopLevel:   1,             // 1–10 workshop upgrade level
  workshopItems:   [],            // unlocked cosmetic items
  ticketStreak:    0,             // consecutive correct tickets
  weeklyProgress:  {},            // { weekKey: { done: [], xp: 0 } }
  emergencyActive: null,          // current emergency event or null
  emergencyHistory:[],            // resolved emergency IDs
  specialization:  {},            // per-skill specialization progress
  categoryStats:   {              // missions completed per category
    hardware: 0, networking: 0, os: 0, security: 0, sysadmin: 0, helpdesk: 0,
  },

  // ── Hydrate ────────────────────────────────────────────────
  hydrate(saveData, user = null) {
    const merged  = mergeSave(saveData);
    const checked = checkDailyStreak(merged);
    set({ ...checked, user, isLoaded: true });
  },

  setUser(user) { set({ user }); },

  // ── XP & Leveling ─────────────────────────────────────────
  addXP(amount, source = '', category = '') {
    const state     = get();
    const streak    = state.loginStreak || 0;
    // Career bonus
    let careerBonus = 1.0;
    if (state.careerPath && category) {
      try {
        const { getCareerXPBonus } = require('@/lib/careerPaths');
        careerBonus = getCareerXPBonus(state.careerPath, category);
      } catch {}
    }
    const gained    = calculateXPGain(amount, streak, false, careerBonus);
    const prevLevel = getLevelFromXP(state.totalXP);
    const newXP     = state.totalXP + gained;
    const newLevel  = getLevelFromXP(newXP);
    const leveledUp = newLevel > prevLevel;
    const newSkillPoints = state.skillPoints + (leveledUp ? newLevel - prevLevel : 0);

    // Career XP
    const newCareerXP = state.careerXP + (state.careerPath && category === state.careerPath ? Math.round(gained * 0.5) : Math.round(gained * 0.1));

    set({ totalXP: newXP, level: newLevel, skillPoints: newSkillPoints, careerXP: newCareerXP });
    get().addToast(`+${gained} XP`, 'xp', '⭐');
    if (leveledUp) {
      setTimeout(() => get().addToast(`Level Up! → Lv ${newLevel} 🎉`, 'levelup', '🏆'), 600);
    }
    get()._autosave();
    return { gained, leveledUp, newLevel };
  },

  addCoins(amount) {
    set(s => ({ coins: s.coins + amount }));
    get().addToast(`+${amount} Coins`, 'coin', '🪙');
    get()._autosave();
  },

  // ── Career Path ────────────────────────────────────────────
  setCareerPath(pathId) {
    if (get().careerPath) return; // can only set once (for now)
    set({ careerPath: pathId, careerLevel: 1, careerXP: 0 });
    get().addToast(`Career: ${pathId} selected!`, 'achievement', '🎯');
    get()._autosave();
  },

  // ── Reputation ────────────────────────────────────────────
  adjustReputation(delta) {
    set(s => ({ reputation: Math.max(0, Math.min(100, s.reputation + delta)) }));
  },

  // ── Missions ──────────────────────────────────────────────
  startMission(mission) {
    set({ activeMission: { ...mission, startTime: Date.now(), hintsUsed: 0 } });
  },

  useHint() {
    set(s => ({
      activeMission: s.activeMission
        ? { ...s.activeMission, hintsUsed: (s.activeMission.hintsUsed || 0) + 1 }
        : null,
    }));
  },

  completeMission(missionId, { xpReward, coinReward, toolUnlock, category } = {}) {
    const state = get();
    const isReplay = state.completedMissions.includes(missionId);

    const elapsed    = state.activeMission ? (Date.now() - state.activeMission.startTime) / 1000 : 999;
    const speedBonus = elapsed < 90 && !isReplay;
    const noHints    = (state.activeMission?.hintsUsed ?? 0) === 0 && !isReplay;

    // Replay gives 50% XP & coins, no new tool unlock
    const effectiveXP   = isReplay ? Math.round((xpReward || 0) * 0.5) : (xpReward || 0);
    const effectiveCoins = isReplay ? Math.round((coinReward || 0) * 0.5) : (coinReward || 0);

    const newCompleted = isReplay
      ? state.completedMissions
      : [...state.completedMissions, missionId];
    const newTools     = !isReplay && toolUnlock && !state.tools.includes(toolUnlock)
      ? [...state.tools, toolUnlock] : state.tools;
    const newCatStats  = { ...state.categoryStats, [category]: (state.categoryStats[category] || 0) + 1 };

    set({
      completedMissions: newCompleted,
      tools:             newTools,
      activeMission:     null,
      categoryStats:     newCatStats,
      showReward:        { missionId, xpReward: effectiveXP, coinReward: effectiveCoins, toolUnlock: isReplay ? null : toolUnlock, speedBonus, noHints, isReplay },
    });

    get().addXP(effectiveXP, missionId, category);
    if (effectiveCoins) get().addCoins(effectiveCoins);
    if (!isReplay && toolUnlock) get().addToast(`New Tool: ${toolUnlock}!`, 'tool', '🔧');
    if (speedBonus)  get().addToast('Speed Bonus! +20% XP', 'bonus', '⚡');
    if (noHints)     get().addToast('No Hints Used! +10% XP', 'bonus', '🧠');
    if (isReplay)    get().addToast('Mission Replayed! +50% XP', 'bonus', '🔄');

    get().adjustReputation(isReplay ? 2 : 5);
    if (!isReplay) get()._checkAchievements(newCompleted, newCatStats);
    get()._autosave();
  },

  failMission(missionId) {
    set(s => ({
      failedMissions: { ...s.failedMissions, [missionId]: (s.failedMissions[missionId] || 0) + 1 },
      activeMission:  null,
    }));
    get().adjustReputation(-3);
  },

  dismissReward() { set({ showReward: null }); },

  // ── Ticket System ─────────────────────────────────────────
  completeTicket(ticket, correct) {
    if (correct) {
      set(s => ({ ticketStreak: s.ticketStreak + 1 }));
      const streak  = get().ticketStreak;
      const comboMx = streak >= 10 ? 3.0 : streak >= 5 ? 2.0 : streak >= 3 ? 1.5 : 1.0;
      const xp      = Math.round((ticket.xpReward || 100) * comboMx);
      get().addXP(xp, 'ticket', ticket.category);
      get().addCoins(ticket.coinReward || 15);
      if (streak > 1) get().addToast(`Combo ×${comboMx.toFixed(1)}! +${xp} XP`, 'bonus', '🔥');
    } else {
      set({ ticketStreak: 0 });
      get().adjustReputation(-2);
    }
    get()._autosave();
  },

  // ── Emergency System ──────────────────────────────────────
  triggerEmergency(event) {
    set({ emergencyActive: event });
    get().addToast(`⚠️ ${event.title}`, 'error', '🚨');
  },

  resolveEmergency(emergencyId, correct) {
    const state = get();
    const event = state.emergencyActive;
    if (!event) return;

    const xpMx = correct ? (event.xpMultiplier || 2) : 0.5;
    const baseXP = 400;
    get().addXP(Math.round(baseXP * xpMx), 'emergency', event.category);
    if (correct && event.coinBonus) get().addCoins(event.coinBonus);

    set(s => ({
      emergencyActive:  null,
      emergencyHistory: [...s.emergencyHistory, emergencyId],
    }));
    get()._autosave();
  },

  dismissEmergency() {
    set({ emergencyActive: null });
  },

  // ── Daily Tasks ───────────────────────────────────────────
  completeDailyTask(taskId, { xpReward, coinReward } = {}) {
    const today = new Date().toDateString();
    const state = get();
    const todayDone = state.dailyTasksDone[today] || [];
    if (todayDone.includes(taskId)) return;
    set(s => ({ dailyTasksDone: { ...s.dailyTasksDone, [today]: [...(s.dailyTasksDone[today] || []), taskId] } }));
    if (xpReward)   get().addXP(xpReward, taskId, 'daily');
    if (coinReward) get().addCoins(coinReward);
    get()._autosave();
  },

  isDailyTaskDone(taskId) {
    const today = new Date().toDateString();
    return (get().dailyTasksDone[today] || []).includes(taskId);
  },

  claimDailyBonus() {
    const state = get();
    if (state.dailyBonusClaimed) return;
    const bonus = getDailyBonusXP(state.loginStreak, state.level);
    set({ dailyBonusClaimed: true });
    get().addXP(bonus, 'dailyBonus', 'daily');
    get().addCoins(state.loginStreak * 5);
    get().addToast(`Daily Bonus: +${bonus} XP!`, 'bonus', '🎁');
    get()._autosave();
  },

  // ── Skills ────────────────────────────────────────────────
  upgradeSkill(category) {
    const state = get();
    if (state.skillPoints <= 0) return;
    if ((state.skills[category] || 0) >= 10) return; // max 10 per skill
    set(s => ({
      skillPoints: s.skillPoints - 1,
      skills: { ...s.skills, [category]: (s.skills[category] || 0) + 1 },
    }));
    get()._autosave();
  },

  // ── Workshop ──────────────────────────────────────────────
  upgradeWorkshop(itemId, cost) {
    const state = get();
    if (state.coins < cost) {
      get().addToast('Not enough coins!', 'error', '❌');
      return false;
    }
    set(s => ({
      coins:         s.coins - cost,
      workshopItems: [...s.workshopItems, itemId],
      workshopLevel: Math.min(10, s.workshopLevel + (itemId.startsWith('major_') ? 1 : 0)),
    }));
    get().addToast(`Workshop upgraded!`, 'achievement', '🔨');
    get()._autosave();
    return true;
  },

  // ── Areas ─────────────────────────────────────────────────
  unlockArea(areaKey) {
    const state = get();
    if (state.unlockedAreas.includes(areaKey)) return;
    set(s => ({ unlockedAreas: [...s.unlockedAreas, areaKey] }));
    get().addToast(`New Area Unlocked: ${areaKey}!`, 'area', '🗺️');
    get()._autosave();
  },

  // ── Settings ──────────────────────────────────────────────
  setSoundEnabled(v)  { set({ soundEnabled: v }); get()._autosave(); },
  setMusicEnabled(v)  { set({ musicEnabled: v }); get()._autosave(); },
  setPlayerName(name) { set({ playerName: name }); get()._autosave(); },
  setAvatar(avatar)   { set({ avatar }); get()._autosave(); },

  // ── Toasts ────────────────────────────────────────────────
  addToast(message, type = 'info', icon = '💡') {
    const id = Date.now() + Math.random();
    set(s => ({ toasts: [...s.toasts, { id, message, type, icon }] }));
    setTimeout(() => set(s => ({ toasts: s.toasts.filter(t => t.id !== id) })), 3500);
  },

  removeToast(id) {
    set(s => ({ toasts: s.toasts.filter(t => t.id !== id) }));
  },

  // ── Achievements ──────────────────────────────────────────
  _checkAchievements(completedMissions, catStats) {
    const state = get();
    const earned = [...state.achievements];
    const cs = catStats || state.categoryStats;
    const add = (id, label) => {
      if (!earned.includes(id)) {
        earned.push(id);
        get().addToast(`Achievement: ${label}!`, 'achievement', '🏅');
      }
    };

    // Mission count achievements
    if (completedMissions.length >= 1)   add('firstFix', 'First Fix!');
    if (completedMissions.length >= 5)   add('fixer5', '5 Missions Done');
    if (completedMissions.length >= 10)  add('fixer10', 'IT Rookie');
    if (completedMissions.length >= 25)  add('fixer25', 'Quarter Century');
    if (completedMissions.length >= 50)  add('fixer50', 'Halfway Hero');
    if (completedMissions.length >= 100) add('fixer100', 'Mission Century!');
    if (completedMissions.length >= 250) add('fixer250', 'IT Veteran');

    // Level achievements
    if (state.level >= 10)  add('level10',  'Level 10!');
    if (state.level >= 25)  add('level25',  'Level 25!');
    if (state.level >= 50)  add('level50',  'Halfway to Legend');
    if (state.level >= 75)  add('level75',  'Senior Tier');
    if (state.level >= 100) add('level100', 'IT LEGEND 👑');

    // Streak achievements
    if (state.loginStreak >= 3)   add('streak3',   '3-Day Streak');
    if (state.loginStreak >= 7)   add('streak7',   'Week Warrior');
    if (state.loginStreak >= 14)  add('streak14',  'Two Weeks Strong');
    if (state.loginStreak >= 30)  add('streak30',  'Monthly Pro');
    if (state.loginStreak >= 100) add('streak100', 'Centurion');

    // Category achievements
    if ((cs.hardware   || 0) >= 10)  add('hw_expert',  'Hardware Expert');
    if ((cs.networking || 0) >= 10)  add('net_expert',  'Network Expert');
    if ((cs.os         || 0) >= 10)  add('os_expert',  'OS Expert');
    if ((cs.security   || 0) >= 10)  add('sec_expert', 'Security Expert');
    if ((cs.sysadmin   || 0) >= 10)  add('sa_expert',  'SysAdmin Expert');

    // Ticket streak
    if (state.ticketStreak >= 5)   add('combo5',  'On a Roll! 5 Combo');
    if (state.ticketStreak >= 10)  add('combo10', 'Combo Master! 10 in a row');

    // Emergency
    if (state.emergencyHistory.length >= 1)  add('firstEmergency', 'First Responder');
    if (state.emergencyHistory.length >= 5)  add('emergency5',     'Crisis Expert');
    if (state.emergencyHistory.length >= 10) add('emergency10',    'Emergency Pro');

    // Tools
    if (state.tools.length >= 3)  add('tools3',  '3 Tools Unlocked');
    if (state.tools.length >= 6)  add('tools6',  'Full Toolkit');

    // Reputation
    if (state.reputation >= 90)  add('rep90',  'Highly Recommended');
    if (state.reputation >= 100) add('rep100', 'Perfect Reputation');

    // Career
    if (state.careerPath)         add('career_start',  'Career Started');
    if (state.careerLevel >= 10)  add('career10',      'Career Mid-Level');
    if (state.careerLevel >= 20)  add('career_max',    'Career Maxed!');

    set({ achievements: earned });
    get()._autosave();
  },

  // ── Computed helpers ──────────────────────────────────────
  getLevelProgress()  { return getLevelProgress(get().totalXP); },
  getRank()           { return getRankFromXP(get().totalXP); },

  // ── Auto-save ─────────────────────────────────────────────
  _autosave() {
    const state = get();
    const { user, toasts, isLoaded, activeMission, showReward, emergencyActive, ...saveData } = state;
    saveLocal(saveData);
    if (user?.id) saveCloud(user.id, saveData).catch(() => {});
  },
}));
