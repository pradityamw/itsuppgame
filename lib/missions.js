// Master Missions File — All 7 Tiers Combined
// Imports all tier mission arrays and exports unified MISSIONS array

import { MISSIONS_TIER1 } from './missionsTier1';
import { MISSIONS_TIER2 } from './missionsTier2';
import { MISSIONS_TIER3 } from './missionsTier3';
import { MISSIONS_TIER4 } from './missionsTier4';
import { MISSIONS_TIER5 } from './missionsTier5';
import { MISSIONS_TIER6 } from './missionsTier6';
import { MISSIONS_TIER7 } from './missionsTier7';

// Legacy missions (original 5 playable + 2 locked previews) kept for compatibility
export const LEGACY_MISSIONS = [
  {
    id: 'mission_001', localeKey: 'mission1', category: 'hardware', difficulty: 'easy',
    areaKey: 'bedroom', requiredLevel: 1, xpReward: 100, coinReward: 15,
    toolUnlock: null, puzzleType: 'pc_repair', npcAvatar: '👩', npcName: 'Sarah',
    puzzleData: {
      scenario: 'psu_loose',
      components: [
        { id: 'psu_cable', label: 'PSU Cable', emoji: '🔌', correctSlot: 'psu_port', broken: true },
        { id: 'ram', label: 'RAM', emoji: '🧠', correctSlot: 'ram_slot', broken: false },
        { id: 'ssd', label: 'SSD', emoji: '💾', correctSlot: 'ssd_slot', broken: false },
        { id: 'fan', label: 'CPU Fan', emoji: '🌀', correctSlot: 'fan_slot', broken: false },
      ],
      slots: [
        { id: 'psu_port', label: 'Power Connector', hasFault: true },
        { id: 'ram_slot', label: 'RAM Slot 1', hasFault: false },
        { id: 'ssd_slot', label: 'SATA Port', hasFault: false },
        { id: 'fan_slot', label: 'Fan Header', hasFault: false },
      ],
      faultSlot: 'psu_port',
      steps: [
        { id: 1, action: 'open_case', text: 'Open the PC case' },
        { id: 2, action: 'inspect', text: 'Inspect the PSU cable connection' },
        { id: 3, action: 'reconnect_psu', text: 'Reconnect the PSU cable' },
        { id: 4, action: 'power_on', text: 'Press power button to test' },
      ],
    },
  },
  {
    id: 'mission_002', localeKey: 'mission2', category: 'networking', difficulty: 'easy',
    areaKey: 'bedroom', requiredLevel: 1, xpReward: 120, coinReward: 20,
    toolUnlock: 'cableTester', puzzleType: 'network', npcAvatar: '👦', npcName: 'Kevin',
    puzzleData: {
      nodes: [
        { id: 'internet', type: 'internet', label: 'Internet', emoji: '🌐', x: 50, y: 10 },
        { id: 'router', type: 'router', label: 'Router', emoji: '📶', x: 50, y: 35 },
        { id: 'pc1', type: 'pc', label: 'Your PC', emoji: '🖥️', x: 25, y: 65 },
        { id: 'printer', type: 'printer', label: 'Printer', emoji: '🖨️', x: 75, y: 65 },
      ],
      connections: [
        { id: 'cn_int_router', from: 'internet', to: 'router', broken: true, label: 'Power Cable' },
        { id: 'cn_router_pc', from: 'router', to: 'pc1', broken: false, label: 'Ethernet' },
        { id: 'cn_router_prt', from: 'router', to: 'printer', broken: false, label: 'Ethernet' },
      ],
      faultConnection: 'cn_int_router',
      steps: [
        { id: 1, action: 'inspect_router', text: 'Check if router has power' },
        { id: 2, action: 'reconnect', text: 'Plug the router back in' },
        { id: 3, action: 'ping_test', text: 'Run ping test to verify' },
      ],
    },
  },
  {
    id: 'mission_003', localeKey: 'mission3', category: 'hardware', difficulty: 'easy',
    areaKey: 'bedroom', requiredLevel: 1, xpReward: 140, coinReward: 20,
    toolUnlock: null, puzzleType: 'pc_repair', npcAvatar: '👨', npcName: 'Ahmad',
    puzzleData: {
      scenario: 'dust_buildup',
      components: [
        { id: 'fan', label: 'CPU Fan', emoji: '🌀', correctSlot: 'fan_slot', broken: true, issue: 'dusty' },
        { id: 'cpu', label: 'CPU', emoji: '⚙️', correctSlot: 'cpu_slot', broken: false },
        { id: 'heatsink', label: 'Heatsink', emoji: '🔩', correctSlot: 'heat_slot', broken: false },
      ],
      slots: [
        { id: 'fan_slot', label: 'Fan Mount', hasFault: true, issue: 'dusty' },
        { id: 'cpu_slot', label: 'CPU Socket', hasFault: false },
        { id: 'heat_slot', label: 'Heatsink Base', hasFault: false },
      ],
      faultSlot: 'fan_slot', cleaningRequired: true,
      steps: [
        { id: 1, action: 'open_case', text: 'Open the PC case' },
        { id: 2, action: 'check_temps', text: 'Check CPU temperature' },
        { id: 3, action: 'clean_fan', text: 'Clean dust from CPU fan' },
        { id: 4, action: 'power_on', text: 'Power on and verify temps' },
      ],
    },
  },
  {
    id: 'mission_004', localeKey: 'mission4', category: 'hardware', difficulty: 'easy',
    areaKey: 'repairShop', requiredLevel: 2, xpReward: 150, coinReward: 25,
    toolUnlock: null, puzzleType: 'network', npcAvatar: '👩‍💼', npcName: 'Linda',
    puzzleData: {
      nodes: [
        { id: 'pc1', type: 'pc', label: 'Office PC', emoji: '🖥️', x: 25, y: 30 },
        { id: 'printer', type: 'printer', label: 'Printer', emoji: '🖨️', x: 75, y: 30 },
      ],
      connections: [
        { id: 'cn_pc_printer', from: 'pc1', to: 'printer', broken: true, label: 'USB-B Cable', wrongPort: true },
      ],
      faultConnection: 'cn_pc_printer',
      cableTypes: ['USB-A', 'USB-B', 'HDMI', 'VGA'],
      correctCable: 'USB-B',
      steps: [
        { id: 1, action: 'inspect_printer', text: 'Check printer cable' },
        { id: 2, action: 'identify_cable', text: 'Identify correct cable (USB-B)' },
        { id: 3, action: 'reconnect', text: 'Connect USB-B to correct port' },
        { id: 4, action: 'test_print', text: 'Run test print' },
      ],
    },
  },
  {
    id: 'mission_005', localeKey: 'mission5', category: 'os', difficulty: 'easy',
    areaKey: 'repairShop', requiredLevel: 2, xpReward: 160, coinReward: 25,
    toolUnlock: 'usbToolkit', puzzleType: 'terminal', npcAvatar: '👴', npcName: 'Pak Budi',
    puzzleData: {
      scenario: 'slow_startup',
      terminalSteps: [
        {
          id: 1, prompt: 'Check startup programs', command: 'tasklist /fo list',
          hint: 'Use tasklist to see all running processes', expectedCmd: 'tasklist',
          output: `Image Name: chrome.exe (Startup)\nImage Name: spotify.exe (Startup)\nImage Name: discord.exe (Startup)\nImage Name: steam.exe (Startup)\n→ 8 programs auto-start at boot!`,
          lesson: 'Too many startup programs slow boot time.',
        },
        {
          id: 2, prompt: 'Open Task Manager startup tab', command: 'msconfig',
          hint: 'Use msconfig to manage startup items', expectedCmd: 'msconfig',
          output: `System Configuration opened.\n[Startup] tab selected.\nFound 8 startup items enabled.`,
          lesson: 'msconfig controls which programs start with Windows.',
        },
        {
          id: 3, prompt: 'Disable unnecessary items', command: 'disable spotify discord steam',
          hint: 'Disable entertainment apps', expectedCmd: 'disable',
          output: `Disabled: spotify.exe ✓\nDisabled: discord.exe ✓\nDisabled: steam.exe ✓\nBoot improvement: ~40 seconds faster`,
          lesson: 'Only keep essential apps in startup.',
        },
      ],
      successMessage: 'Boot time reduced from 2 minutes to 45 seconds!',
    },
  },
];

// ── All Missions Combined ─────────────────────────────────────
export const MISSIONS = [
  ...LEGACY_MISSIONS,
  ...MISSIONS_TIER1,
  ...MISSIONS_TIER2,
  ...MISSIONS_TIER3,
  ...MISSIONS_TIER4,
  ...MISSIONS_TIER5,
  ...MISSIONS_TIER6,
  ...MISSIONS_TIER7,
];

// ── Query Helpers ─────────────────────────────────────────────

export function getMissionsForArea(areaKey) {
  return MISSIONS.filter(m => m.areaKey === areaKey);
}

export function getAvailableMissions(playerLevel) {
  return MISSIONS.filter(m => m.requiredLevel <= playerLevel);
}

export function getMissionById(id) {
  return MISSIONS.find(m => m.id === id);
}

export function getBeginnerMissions() {
  return MISSIONS.filter(m => m.difficulty === 'easy' && m.requiredLevel <= 5);
}

export function getMissionsByTier(tier) {
  const tierRanges = {
    1: [1, 9], 2: [10, 19], 3: [20, 34],
    4: [35, 49], 5: [50, 69], 6: [70, 89], 7: [90, 100],
  };
  const [min, max] = tierRanges[tier] || [1, 100];
  return MISSIONS.filter(m => m.requiredLevel >= min && m.requiredLevel <= max);
}

export function getMissionsByCategory(category) {
  return MISSIONS.filter(m => m.category === category);
}

export function getLockedMissions(playerLevel) {
  return MISSIONS.filter(m => m.requiredLevel > playerLevel);
}

export const TOTAL_MISSIONS = MISSIONS.length;
