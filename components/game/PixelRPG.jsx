'use client';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { useLanguage } from '@/context/LanguageContext';
import { sound } from '@/lib/audio';
import { getMissionsForArea } from '@/lib/missions';

// Import learning components
import MissionLearnCarousel from '@/components/game/MissionLearnCarousel';
import { getMissionLearning } from '@/lib/missionLearning';

// Import our procedural sprite pre-render functions
import {
  createOffscreenCanvas,
  drawPlayer,
  drawNPC,
  drawWall,
  drawFloor,
  drawCarpet,
  drawPC,
  drawRouter,
  drawServer,
  drawPrinter,
  drawDoor,
} from '@/lib/rpgAssets';

// Puzzle Components for direct overlay integration
import PCRepairSimPuzzle from '@/components/game/PCRepairSimPuzzle';
import NetworkSimPuzzle from '@/components/game/NetworkSimPuzzle';
import Terminal from '@/components/game/Terminal';
import QuizPuzzle from '@/components/game/QuizPuzzle';
import SequencePuzzle from '@/components/game/SequencePuzzle';
import DialoguePuzzle from '@/components/game/DialoguePuzzle';

// Map Settings
const TILE_SIZE = 48; // grid cell size in pixels
const MAP_COLS = 15;
const MAP_ROWS = 11;

// Helper to group all 22 areas into 4 visual templates
function getTemplateForArea(areaId) {
  const bedroomAreas = ['bedroom', 'familyPC', 'homeWifi', 'repairCorner'];
  const repairShopAreas = ['repairShop', 'gamingCafe', 'upgradeCenter'];
  const officeAreas = [
    'startupOffice', 'schoolLab', 'smallBizOffice', 
    'ispBranch', 'internetCafe', 'officeNetwork', 'enterpriseOffice'
  ];
  
  if (bedroomAreas.includes(areaId)) return 'bedroom';
  if (repairShopAreas.includes(areaId)) return 'repairShop';
  if (officeAreas.includes(areaId)) return 'office';
  return 'serverRoom'; // Fallback for all server clusters/NOC/threat/security rooms
}

// Procedural Map Generator
export function generateDynamicMap(areaId) {
  let baseTiles = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];
  let bgType = 'tech_floor';
  let slots = [];

  // Switch between all 22 custom areas
  switch (areaId) {
    case 'bedroom':
      // cozy rugs, spawn center, beds on sides
      baseTiles[3][3] = 7; baseTiles[3][4] = 7; baseTiles[4][3] = 7; baseTiles[4][4] = 7;
      baseTiles[3][10] = 7; baseTiles[3][11] = 7; baseTiles[4][10] = 7; baseTiles[4][11] = 7;
      baseTiles[6][1] = 2; baseTiles[6][2] = 2; baseTiles[6][12] = 2; baseTiles[6][13] = 2;
      slots = [
        { dev: { tx: 1, ty: 1 }, npc: { tx: 1, ty: 2 } },
        { dev: { tx: 13, ty: 1 }, npc: { tx: 12, ty: 2 } },
        { dev: { tx: 4, ty: 1 }, npc: { tx: 4, ty: 2 } },
        { dev: { tx: 10, ty: 1 }, npc: { tx: 10, ty: 2 } }
      ];
      break;

    case 'familyPC':
      // Big center rug for TV / computer couch
      for (let r = 4; r <= 6; r++) {
        for (let c = 5; c <= 9; c++) {
          baseTiles[r][c] = 7;
        }
      }
      baseTiles[2][7] = 2; // Media console
      slots = [
        { dev: { tx: 2, ty: 1 }, npc: { tx: 2, ty: 2 } },
        { dev: { tx: 12, ty: 1 }, npc: { tx: 12, ty: 2 } },
        { dev: { tx: 5, ty: 1 }, npc: { tx: 5, ty: 2 } },
        { dev: { tx: 9, ty: 1 }, npc: { tx: 9, ty: 2 } }
      ];
      break;

    case 'homeWifi':
      // Pillar router in center of map
      baseTiles[4][7] = 2; baseTiles[5][7] = 2;
      // Rug circle
      baseTiles[3][7] = 7; baseTiles[6][7] = 7;
      baseTiles[4][6] = 7; baseTiles[4][8] = 7;
      slots = [
        { dev: { tx: 3, ty: 2 }, npc: { tx: 3, ty: 3 } },
        { dev: { tx: 11, ty: 2 }, npc: { tx: 11, ty: 3 } },
        { dev: { tx: 7, ty: 2 }, npc: { tx: 7, ty: 3 } }
      ];
      break;

    case 'repairCorner':
      // corner benches
      baseTiles[2][1] = 2; baseTiles[2][2] = 2; baseTiles[1][2] = 2;
      baseTiles[2][12] = 2; baseTiles[2][13] = 2; baseTiles[1][12] = 2;
      baseTiles[7][1] = 2; baseTiles[7][13] = 2;
      slots = [
        { dev: { tx: 3, ty: 1 }, npc: { tx: 3, ty: 2 } },
        { dev: { tx: 11, ty: 1 }, npc: { tx: 11, ty: 2 } },
        { dev: { tx: 7, ty: 2 }, npc: { tx: 7, ty: 3 } }
      ];
      break;

    case 'repairShop':
      // Aisle of repair tables and carpets
      for (let c = 2; c <= 12; c++) {
        baseTiles[4][c] = 7;
      }
      baseTiles[6][4] = 2; baseTiles[6][5] = 2; baseTiles[6][9] = 2; baseTiles[6][10] = 2;
      slots = [
        { dev: { tx: 2, ty: 1 }, npc: { tx: 2, ty: 2 } },
        { dev: { tx: 6, ty: 1 }, npc: { tx: 6, ty: 2 } },
        { dev: { tx: 10, ty: 1 }, npc: { tx: 10, ty: 2 } },
        { dev: { tx: 13, ty: 1 }, npc: { tx: 13, ty: 2 } }
      ];
      break;

    case 'gamingCafe':
      // Neon cafe floor, horizontal rows of desks
      bgType = 'dark_steel';
      baseTiles[3][3] = 2; baseTiles[3][4] = 2; baseTiles[3][5] = 2;
      baseTiles[3][9] = 2; baseTiles[3][10] = 2; baseTiles[3][11] = 2;
      baseTiles[7][3] = 2; baseTiles[7][4] = 2; baseTiles[7][5] = 2;
      baseTiles[7][9] = 2; baseTiles[7][10] = 2; baseTiles[7][11] = 2;
      slots = [
        { dev: { tx: 1, ty: 1 }, npc: { tx: 1, ty: 2 } },
        { dev: { tx: 13, ty: 1 }, npc: { tx: 13, ty: 2 } },
        { dev: { tx: 4, ty: 5 }, npc: { tx: 4, ty: 4 } },
        { dev: { tx: 10, ty: 5 }, npc: { tx: 10, ty: 4 } }
      ];
      break;

    case 'upgradeCenter':
      // Vertical partitions
      baseTiles[3][3] = 2; baseTiles[4][3] = 2; baseTiles[5][3] = 2;
      baseTiles[3][11] = 2; baseTiles[4][11] = 2; baseTiles[5][11] = 2;
      slots = [
        { dev: { tx: 1, ty: 1 }, npc: { tx: 1, ty: 2 } },
        { dev: { tx: 7, ty: 1 }, npc: { tx: 7, ty: 2 } },
        { dev: { tx: 13, ty: 1 }, npc: { tx: 13, ty: 2 } }
      ];
      break;

    case 'startupOffice':
      // cubicles layout
      baseTiles[3][4] = 1; baseTiles[4][4] = 1;
      baseTiles[3][10] = 1; baseTiles[4][10] = 1;
      baseTiles[6][4] = 1; baseTiles[7][4] = 1;
      slots = [
        { dev: { tx: 2, ty: 1 }, npc: { tx: 2, ty: 2 } },
        { dev: { tx: 6, ty: 1 }, npc: { tx: 6, ty: 2 } },
        { dev: { tx: 12, ty: 1 }, npc: { tx: 12, ty: 2 } },
        { dev: { tx: 8, ty: 6 }, npc: { tx: 8, ty: 7 } }
      ];
      break;

    case 'schoolLab':
      // classroom desks
      baseTiles[3][2] = 2; baseTiles[4][2] = 2;
      baseTiles[3][6] = 2; baseTiles[4][6] = 2;
      baseTiles[3][10] = 2; baseTiles[4][10] = 2;
      slots = [
        { dev: { tx: 4, ty: 1 }, npc: { tx: 4, ty: 2 } },
        { dev: { tx: 8, ty: 1 }, npc: { tx: 8, ty: 2 } },
        { dev: { tx: 12, ty: 1 }, npc: { tx: 12, ty: 2 } }
      ];
      break;

    case 'smallBizOffice':
      // Cozy partitions
      baseTiles[4][4] = 1; baseTiles[4][5] = 1;
      baseTiles[4][9] = 1; baseTiles[4][10] = 1;
      slots = [
        { dev: { tx: 2, ty: 1 }, npc: { tx: 2, ty: 2 } },
        { dev: { tx: 7, ty: 1 }, npc: { tx: 7, ty: 2 } },
        { dev: { tx: 12, ty: 1 }, npc: { tx: 12, ty: 2 } }
      ];
      break;

    case 'ispBranch':
      // customer desks and backroom
      baseTiles[3][3] = 2; baseTiles[3][4] = 2;
      baseTiles[3][10] = 2; baseTiles[3][11] = 2;
      slots = [
        { dev: { tx: 1, ty: 1 }, npc: { tx: 1, ty: 2 } },
        { dev: { tx: 6, ty: 1 }, npc: { tx: 6, ty: 2 } },
        { dev: { tx: 13, ty: 1 }, npc: { tx: 13, ty: 2 } }
      ];
      break;

    case 'internetCafe':
      // high-density tables
      baseTiles[4][6] = 2; baseTiles[4][8] = 2;
      baseTiles[6][6] = 2; baseTiles[6][8] = 2;
      slots = [
        { dev: { tx: 3, ty: 1 }, npc: { tx: 3, ty: 2 } },
        { dev: { tx: 11, ty: 1 }, npc: { tx: 11, ty: 2 } },
        { dev: { tx: 7, ty: 2 }, npc: { tx: 7, ty: 3 } }
      ];
      break;

    case 'officeNetwork':
      // networking closets
      baseTiles[2][3] = 2; baseTiles[2][7] = 2; baseTiles[2][11] = 2;
      slots = [
        { dev: { tx: 1, ty: 1 }, npc: { tx: 1, ty: 2 } },
        { dev: { tx: 5, ty: 1 }, npc: { tx: 5, ty: 2 } },
        { dev: { tx: 9, ty: 1 }, npc: { tx: 9, ty: 2 } },
        { dev: { tx: 13, ty: 1 }, npc: { tx: 13, ty: 2 } }
      ];
      break;

    case 'networkOpsRoom':
      // huge circular desk rows
      baseTiles[3][4] = 2; baseTiles[3][5] = 2; baseTiles[3][6] = 2;
      baseTiles[3][8] = 2; baseTiles[3][9] = 2; baseTiles[3][10] = 2;
      slots = [
        { dev: { tx: 2, ty: 1 }, npc: { tx: 2, ty: 2 } },
        { dev: { tx: 7, ty: 1 }, npc: { tx: 7, ty: 2 } },
        { dev: { tx: 12, ty: 1 }, npc: { tx: 12, ty: 2 } }
      ];
      break;

    case 'enterpriseOffice':
      // premium exec walls
      baseTiles[3][3] = 1; baseTiles[3][4] = 1;
      baseTiles[3][10] = 1; baseTiles[3][11] = 1;
      slots = [
        { dev: { tx: 1, ty: 1 }, npc: { tx: 1, ty: 2 } },
        { dev: { tx: 7, ty: 1 }, npc: { tx: 7, ty: 2 } },
        { dev: { tx: 13, ty: 1 }, npc: { tx: 13, ty: 2 } }
      ];
      break;

    case 'serverRoom':
      // vertical steel servers
      bgType = 'dark_steel';
      baseTiles[2][3] = 2; baseTiles[3][3] = 2; baseTiles[4][3] = 2;
      baseTiles[2][11] = 2; baseTiles[3][11] = 2; baseTiles[4][11] = 2;
      slots = [
        { dev: { tx: 1, ty: 1 }, npc: { tx: 1, ty: 2 } },
        { dev: { tx: 7, ty: 1 }, npc: { tx: 7, ty: 2 } },
        { dev: { tx: 13, ty: 1 }, npc: { tx: 13, ty: 2 } }
      ];
      break;

    case 'miniDataCenter':
      // high density horizontal steel racks
      bgType = 'dark_steel';
      baseTiles[3][3] = 2; baseTiles[3][7] = 2; baseTiles[3][11] = 2;
      baseTiles[6][3] = 2; baseTiles[6][7] = 2; baseTiles[6][11] = 2;
      slots = [
        { dev: { tx: 1, ty: 1 }, npc: { tx: 1, ty: 2 } },
        { dev: { tx: 5, ty: 1 }, npc: { tx: 5, ty: 2 } },
        { dev: { tx: 9, ty: 1 }, npc: { tx: 9, ty: 2 } },
        { dev: { tx: 13, ty: 1 }, npc: { tx: 13, ty: 2 } }
      ];
      break;

    case 'itControlCenter':
      // dashboard terminal consoles
      bgType = 'dark_steel';
      baseTiles[4][4] = 2; baseTiles[4][5] = 2; baseTiles[4][9] = 2; baseTiles[4][10] = 2;
      slots = [
        { dev: { tx: 2, ty: 1 }, npc: { tx: 2, ty: 2 } },
        { dev: { tx: 7, ty: 1 }, npc: { tx: 7, ty: 2 } },
        { dev: { tx: 12, ty: 1 }, npc: { tx: 12, ty: 2 } }
      ];
      break;

    case 'secOps':
      // air-locked steel partitions
      bgType = 'dark_steel';
      baseTiles[4][2] = 1; baseTiles[4][3] = 1;
      baseTiles[4][11] = 1; baseTiles[4][12] = 1;
      slots = [
        { dev: { tx: 1, ty: 1 }, npc: { tx: 1, ty: 2 } },
        { dev: { tx: 7, ty: 1 }, npc: { tx: 7, ty: 2 } },
        { dev: { tx: 13, ty: 1 }, npc: { tx: 13, ty: 2 } }
      ];
      break;

    case 'securityWing':
      // biometrics tables
      bgType = 'dark_steel';
      baseTiles[3][3] = 2; baseTiles[3][11] = 2;
      slots = [
        { dev: { tx: 1, ty: 1 }, npc: { tx: 1, ty: 2 } },
        { dev: { tx: 7, ty: 1 }, npc: { tx: 7, ty: 2 } },
        { dev: { tx: 13, ty: 1 }, npc: { tx: 13, ty: 2 } }
      ];
      break;

    case 'threatRoom':
      // danger wall ring
      bgType = 'dark_steel';
      baseTiles[4][4] = 1; baseTiles[4][10] = 1;
      baseTiles[6][4] = 1; baseTiles[6][10] = 1;
      slots = [
        { dev: { tx: 2, ty: 1 }, npc: { tx: 2, ty: 2 } },
        { dev: { tx: 7, ty: 1 }, npc: { tx: 7, ty: 2 } },
        { dev: { tx: 12, ty: 1 }, npc: { tx: 12, ty: 2 } }
      ];
      break;

    case 'globalDataCenter':
      // mainframe central platform
      bgType = 'dark_steel';
      baseTiles[4][5] = 2; baseTiles[4][6] = 2; baseTiles[4][7] = 2; baseTiles[4][8] = 2; baseTiles[4][9] = 2;
      slots = [
        { dev: { tx: 1, ty: 1 }, npc: { tx: 1, ty: 2 } },
        { dev: { tx: 13, ty: 1 }, npc: { tx: 13, ty: 2 } },
        { dev: { tx: 3, ty: 7 }, npc: { tx: 3, ty: 8 } },
        { dev: { tx: 11, ty: 7 }, npc: { tx: 11, ty: 8 } }
      ];
      break;

    default:
      // Fallback
      baseTiles[3][3] = 7;
      slots = [
        { dev: { tx: 1, ty: 1 }, npc: { tx: 1, ty: 2 } },
        { dev: { tx: 13, ty: 1 }, npc: { tx: 13, ty: 2 } }
      ];
  }

  const areaMissions = getMissionsForArea(areaId);
  const npcs = [];
  const devices = [];

  areaMissions.forEach((mission, idx) => {
    const slot = slots[idx % slots.length];
    if (!slot) return;

    let devType = 'pc';
    if (mission.puzzleType === 'network') {
      devType = 'router';
    } else if (mission.category === 'hardware' && mission.puzzleType !== 'pc_repair') {
      devType = 'printer';
    } else if (mission.category === 'os' || mission.category === 'cloud' || mission.category === 'security' || mission.requiredLevel >= 40) {
      devType = mission.puzzleType === 'network' ? 'router' : 'server';
    }

    let tileVal = 3;
    if (devType === 'router') tileVal = 6;
    if (devType === 'server') tileVal = 5;
    if (devType === 'printer') tileVal = 4;
    
    baseTiles[slot.dev.ty][slot.dev.tx] = tileVal;
    baseTiles[slot.npc.ty][slot.npc.tx] = 0; 

    devices.push({
      id: `dev_${mission.id}`,
      type: devType,
      tx: slot.dev.tx,
      ty: slot.dev.ty,
      missionId: mission.id,
      isBroken: true
    });

    const name = mission.npcName || 'Client';
    const avatar = mission.npcAvatar || '👤';

    const msgEn = mission.title?.en 
      ? `Hello! I have a problem: "${mission.title.en}". Description: ${mission.description?.en || 'Can you solve this issue?'}`
      : `Oh no! Something went wrong with this device. Can you help me troubleshoot and repair it?`;
    const msgId = mission.title?.id 
      ? `Halo! Ada masalah: "${mission.title.id}". Deskripsi: ${mission.description?.id || 'Bisa bantu bereskan masalah ini?'}`
      : `Duh! Terjadi kesalahan pada perangkat ini. Bisa tolong bantu cek dan perbaiki?`;

    npcs.push({
      id: `npc_${mission.id}`,
      name: name,
      avatar: avatar,
      tx: slot.npc.tx,
      ty: slot.npc.ty,
      missionId: mission.id,
      msgEn: msgEn,
      msgId: msgId
    });
  });

  if (npcs.length === 0) {
    npcs.push({
      id: 'npc_advisor_default',
      name: 'Guide AI',
      avatar: '🤖',
      tx: 7,
      ty: 3,
      missionId: 'none',
      msgEn: `Welcome to ${areaId}! There are no active diagnostic alerts at this station. Keep exploring the world map for other tasks!`,
      msgId: `Selamat datang di ${areaId}! Tidak ada alarm diagnostik aktif di stasiun ini. Silakan terus jelajahi peta dunia untuk tugas lainnya!`
    });
    devices.push({
      id: 'dev_deco_pc',
      type: 'pc',
      tx: 7,
      ty: 2,
      missionId: 'none',
      isBroken: false
    });
    baseTiles[2][7] = 3;
  }

  const formattedName = areaId
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());

  return {
    name: formattedName,
    nameId: formattedName,
    tiles: baseTiles,
    bgType: bgType,
    spawn: { x: 7, y: 7 },
    npcs: npcs,
    devices: devices
  };
}

export default function PixelRPG({ onBack }) {
  const { lang } = useLanguage();
  const { totalXP, coins, level, startMission, completeMission, failedMissions, completedMissions } = useGameStore();

  const searchParams = useSearchParams();
  const areaParam = searchParams.get('area') || 'bedroom';

  // Route/Overlay States
  const [mapId, setMapId] = useState(areaParam);
  const [activeDialogue, setActiveDialogue] = useState(null);
  const activeDialogueRef = useRef(null);
  useEffect(() => {
    activeDialogueRef.current = activeDialogue;
  }, [activeDialogue]);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [dialogueText, setDialogueText] = useState('');
  const [dialogueDone, setDialogueDone] = useState(false);
  const [activeMissionOverlay, setActiveMissionOverlay] = useState(null);
  const [showLearningOverlay, setShowLearningOverlay] = useState(null);
  const [showLearningModalInOverlay, setShowLearningModalInOverlay] = useState(false);
  const [showExitPortalOverlay, setShowExitPortalOverlay] = useState(false);

  // Dynamic Map Proxy
  const currentMap = generateDynamicMap(mapId);
  const MAPS = { [mapId]: currentMap };

  // Time & Cycle (Day/Night simulation)
  const [timeHour, setTimeHour] = useState(9); // starts at 9:00 AM
  const [timeMinute, setTimeMinute] = useState(0);

  // Canvas Refs & Game Engine State
  const canvasRef = useRef(null);
  const engineRef = useRef({
    player: {
      x: 7 * TILE_SIZE,
      y: 7 * TILE_SIZE,
      vx: 0,
      vy: 0,
      dir: 'down',
      frame: 0,
      isWalking: false,
      speed: 3,
    },
    keys: {},
    camera: { x: 0, y: 0 },
    animationTimer: 0,
    running: false,
    completedMissions: [], // cache of solved missions
  });

  // Mobile touch controls state & refs
  const [isMobile, setIsMobile] = useState(false);
  const [joystickPos, setJoystickPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [localCompletedMissions, setLocalCompletedMissions] = useState([]);
  const [ambientChat, setAmbientChat] = useState(null);
  const [proximityTarget, setProximityTarget] = useState(null);
  
  const joystickRef = useRef(null);
  const touchIdRef = useRef(null);

  useEffect(() => {
    const checkViewport = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isNarrow = window.innerWidth <= 1024;
      setIsMobile(hasTouch || isNarrow);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Idle NPC Random Ambient Chatter & Player Self-Dialogue Timer
  useEffect(() => {
    const AMBIENT_CHAT_POOL = {
      id: [
        "Sudah coba restart belum? 🔄",
        "Kenapa internetnya lambat sekali ya... 🌐",
        "Aduh, lupa password lagi... 🔑",
        "Kabel powernya sudah tercolok? 🔌",
        "Printer ini macet terus! 🖨️",
        "Ada pesan error aneh di layar... 😰",
        "Bisa bantu update driver-ku? ⚙️",
        "Kayaknya servernya kepanasan... 🔥",
        "Semoga tidak kena virus lagi... 🦠",
        "Layar komputerku kok kedip-kedip ya? 💻",
        "Wah, wifi-nya mati lagi... 📶",
        "Support IT di sini cepat sekali! 👍",
      ],
      en: [
        "Have you tried turning it off and on again? 🔄",
        "Why is the internet so slow today? 🌐",
        "Oh no, I forgot my password again... 🔑",
        "Is the power cable plugged in? 🔌",
        "This printer keeps jamming! 🖨️",
        "I got a weird error message... 😰",
        "Can you help me update my drivers? ⚙️",
        "I think the server room is too hot... 🔥",
        "Hope I don't get a virus again... 🦠",
        "Why is my screen flickering? 💻",
        "Oh great, the wifi is down again... 📶",
        "The IT support here is super fast! 👍",
      ]
    };

    const PLAYER_CHAT_POOL = {
      idle: {
        id: [
          "Mari kita cari masalah komputer yang perlu dibetulkan... 🔍",
          "Hmm, apa ada device yang rusak di sekitar sini? 🔧",
          "Support IT siap beraksi! 💪",
          "Wah, kopiku dingin. Tapi tugas IT tidak boleh dingin! ☕",
          "Printer itu... dia bisa mencium bau ketakutan manusia. 🖨️☠️",
          "Kenapa ya user selalu bilang 'tidak menyentuh apa-apa' padahal kabelnya lepas? 🧐",
          "Semoga hari ini tidak banyak tiket dukungan masuk... 😅",
        ],
        en: [
          "Let's look for computer problems to solve... 🔍",
          "Hmm, are there any broken devices around? 🔧",
          "IT Support is ready for action! 💪",
          "My coffee is cold. But IT duties never sleep! ☕",
          "That printer... it can definitely smell human fear. 🖨️☠️",
          "Why do users always say 'I didn't touch anything' when the cable is literally unplugged? 🧐",
          "Hopefully not too many support tickets today... 😅",
        ]
      },
      walking: {
        id: [
          "Menuju lokasi masalah... ⚡",
          "Membasmi bug satu per satu! 🐜",
          "Bergerak cepat, selesaikan tepat! 🏃",
          "Kabel, kabel, mana kabel yang lepas... 🔌",
          "Ingat: tidak ada masalah jaringan yang tidak bisa diselesaikan dengan ping Google. 📡",
          "Misi penyelamatan IT sedang berjalan! 🚀",
          "Arah menuju server... semoga suhunya dingin. ❄️",
        ],
        en: [
          "Heading to the problem site... ⚡",
          "Squashing bugs one by one! 🐜",
          "Moving fast, fixing it right! 🏃",
          "Cables, cables, where is that loose wire... 🔌",
          "Remember: there is no network issue that cannot be solved by pinging Google. 📡",
          "IT rescue mission in progress! 🚀",
          "Heading towards the servers... hope the AC is freezing. ❄️",
        ]
      }
    };

    const interval = setInterval(() => {
      // Don't show if active dialogue or mission is open
      if (activeDialogueRef.current || activeMissionOverlay) {
        setAmbientChat(null);
        return;
      }

      // 40% chance player talks to themselves, 60% chance NPC talks
      const isPlayerTalk = Math.random() < 0.4;

      if (isPlayerTalk) {
        const isWalking = engineRef.current.player.isWalking;
        const pool = isWalking ? PLAYER_CHAT_POOL.walking : PLAYER_CHAT_POOL.idle;
        const lines = pool[lang] || pool['id'];
        const randomLine = lines[Math.floor(Math.random() * lines.length)];

        setAmbientChat({
          isPlayer: true,
          text: randomLine
        });

        // Clear after 3.5 seconds
        setTimeout(() => {
          setAmbientChat(prev => {
            if (prev && prev.isPlayer) {
              return null;
            }
            return prev;
          });
        }, 3500);

      } else {
        const npcs = currentMap.npcs;
        if (!npcs || npcs.length === 0) return;

        const randomNpc = npcs[Math.floor(Math.random() * npcs.length)];
        const lines = AMBIENT_CHAT_POOL[lang] || AMBIENT_CHAT_POOL['id'];
        const randomLine = lines[Math.floor(Math.random() * lines.length)];

        setAmbientChat({
          isPlayer: false,
          npcName: randomNpc.name,
          text: randomLine
        });

        // Clear after 3.5 seconds
        setTimeout(() => {
          setAmbientChat(prev => {
            if (prev && prev.npcName === randomNpc.name) {
              return null;
            }
            return prev;
          });
        }, 3500);
      }
    }, 7000 + Math.random() * 2000); // 7-9 seconds interval

    return () => {
      clearInterval(interval);
      setAmbientChat(null);
    };
  }, [activeDialogue, activeMissionOverlay, currentMap.npcs, lang]);

  // Proximity Target Detection Polling Effect (150ms interval)
  useEffect(() => {
    if (activeDialogue) {
      setProximityTarget(null);
      return;
    }

    const interval = setInterval(() => {
      const currentMap = MAPS[mapId];
      if (!currentMap || !engineRef.current) return;
      const player = engineRef.current.player;
      if (!player) return;

      // 1. Proximity check for NPCs (within 56px / 1.75 tiles radius)
      let closestNpc = null;
      let closestNpcDist = 56;

      currentMap.npcs.forEach(npc => {
        const dx = (npc.tx * TILE_SIZE + TILE_SIZE/2) - (player.x + 16);
        const dy = (npc.ty * TILE_SIZE + TILE_SIZE/2) - (player.y + 24);
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < closestNpcDist) {
          closestNpcDist = dist;
          closestNpc = npc;
        }
      });

      if (closestNpc) {
        const isSolved = completedMissions.includes(closestNpc.missionId) || engineRef.current.completedMissions.includes(closestNpc.missionId);
        const targetObj = {
          type: 'npc',
          name: closestNpc.name,
          avatar: closestNpc.avatar || '👤',
          isSolved,
          missionId: closestNpc.missionId,
          rawNpc: closestNpc
        };
        setProximityTarget(prev => {
          if (prev && prev.type === 'npc' && prev.name === targetObj.name && prev.isSolved === targetObj.isSolved) return prev;
          return targetObj;
        });
        return;
      }

      // 2. Proximity check for broken devices (within 48px radius)
      let closestDev = null;
      let closestDevDist = 48;

      currentMap.devices.forEach(dev => {
        if (!dev.isBroken || completedMissions.includes(dev.missionId) || engineRef.current.completedMissions.includes(dev.missionId)) return;
        const dx = (dev.tx * TILE_SIZE + TILE_SIZE/2) - (player.x + 16);
        const dy = (dev.ty * TILE_SIZE + TILE_SIZE/2) - (player.y + 24);
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < closestDevDist) {
          closestDevDist = dist;
          closestDev = dev;
        }
      });

      if (closestDev) {
        const targetObj = {
          type: 'device',
          name: lang === 'id' ? 'Perangkat Rusak' : 'Broken Device',
          avatar: '🔧',
          missionId: closestDev.missionId,
          rawDev: closestDev
        };
        setProximityTarget(prev => {
          if (prev && prev.type === 'device' && prev.missionId === targetObj.missionId) return prev;
          return targetObj;
        });
        return;
      }

      setProximityTarget(null);
    }, 150);

    return () => {
      clearInterval(interval);
      setProximityTarget(null);
    };
  }, [mapId, activeDialogue, completedMissions, lang]);

  const handleJoystickStart = (e) => {
    if (e.changedTouches.length === 0) return;
    const touch = e.changedTouches[0];
    touchIdRef.current = touch.identifier;
    setIsDragging(true);
    updateJoystick(touch.clientX, touch.clientY);
  };

  const handleJoystickMove = (e) => {
    if (!isDragging) return;
    for (let i = 0; i < e.touches.length; i++) {
      if (e.touches[i].identifier === touchIdRef.current) {
        updateJoystick(e.touches[i].clientX, e.touches[i].clientY);
        break;
      }
    }
  };

  const handleJoystickEnd = (e) => {
    let found = false;
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === touchIdRef.current) {
        found = true;
        break;
      }
    }
    if (!found && e.touches.length > 0) return;

    setIsDragging(false);
    touchIdRef.current = null;
    setJoystickPos({ x: 0, y: 0 });

    const keys = engineRef.current.keys;
    keys['w'] = false;
    keys['s'] = false;
    keys['a'] = false;
    keys['d'] = false;
  };

  const updateJoystick = (clientX, clientY) => {
    const joystick = joystickRef.current;
    if (!joystick) return;

    const rect = joystick.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxRadius = 40;

    let knobX = dx;
    let knobY = dy;

    if (dist > maxRadius) {
      knobX = (dx / dist) * maxRadius;
      knobY = (dy / dist) * maxRadius;
    }

    setJoystickPos({ x: knobX, y: knobY });

    const deadzone = 10;
    const keys = engineRef.current.keys;

    keys['w'] = false;
    keys['s'] = false;
    keys['a'] = false;
    keys['d'] = false;

    if (Math.abs(knobX) > deadzone) {
      if (knobX > 0) {
        keys['d'] = true;
      } else {
        keys['a'] = true;
      }
    }

    if (Math.abs(knobY) > deadzone) {
      if (knobY > 0) {
        keys['s'] = true;
      } else {
        keys['w'] = true;
      }
    }
  };

  const handleSprintStart = (e) => {
    e.preventDefault();
    engineRef.current.player.speed = 5.5;
  };

  const handleSprintEnd = (e) => {
    e.preventDefault();
    engineRef.current.player.speed = 3;
  };

  const handleActionTouch = (e) => {
    e.preventDefault();
    sound.click();
    triggerInteraction();
  };

  // Sound Proximity Web Audio Synthesizer Ref
  const audioSynthRef = useRef({
    ctx: null,
    osc: null,
    gain: null,
  });

  // Sprite Buffer Cache
  const spriteCache = useRef({
    loaded: false,
    player: { down: [], up: [], left: [], right: [] },
    NPCs: {},
    tiles: {},
    tempBuffer: null,
  });

  // Proximity sound synthesizer setup
  useEffect(() => {
    // Start simple synth for local computer fan hum
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const audioCtx = new AudioCtx();
      const osc = audioCtx.createOscillator();
      const bandpass = audioCtx.createBiquadFilter();
      const gain = audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, audioCtx.currentTime); // low pitch fan

      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(150, audioCtx.currentTime);
      bandpass.Q.setValueAtTime(1.2, audioCtx.currentTime);

      gain.gain.setValueAtTime(0, audioCtx.currentTime); // silent initially

      osc.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();

      audioSynthRef.current = { ctx: audioCtx, osc, gain };
    } catch (e) {
      console.warn("Web Audio API not supported or blocked by security policies", e);
    }

    return () => {
      // Clean up synth nodes on unmount
      try {
        if (audioSynthRef.current.osc) audioSynthRef.current.osc.stop();
        if (audioSynthRef.current.ctx) audioSynthRef.current.ctx.close();
      } catch {}
    };
  }, []);

  // Update sound synthesizer volume based on closeness to hardware
  const updateHumSound = (playerX, playerY) => {
    const synth = audioSynthRef.current;
    if (!synth.ctx || !synth.gain) return;

    if (synth.ctx.state === 'suspended') {
      // Audio context blocked by browser until direct interaction
      return;
    }

    const currentMap = MAPS[mapId];
    let minDistance = 9999;

    // Find the closest active machine (either computer, router, or server rack)
    currentMap.devices.forEach(dev => {
      const dx = (dev.tx * TILE_SIZE + TILE_SIZE/2) - (playerX + 16);
      const dy = (dev.ty * TILE_SIZE + TILE_SIZE/2) - (playerY + 24);
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < minDistance) minDistance = dist;
    });

    // Volume curves: drops to 0 at 250px distance
    const maxDist = 220;
    let targetVol = 0;
    if (minDistance < maxDist) {
      targetVol = (1 - (minDistance / maxDist)) * 0.08; // soft max vol
    }

    // Smooth transition volume shifts to prevent clicking pops
    synth.gain.gain.setTargetAtTime(targetVol, synth.ctx.currentTime, 0.1);
  };

  // Pre-render procedural sprite sheets onto offscreen canvases once
  const cacheSprites = () => {
    if (spriteCache.current.loaded) return;

    // Create a temporary offscreen buffer for animated object rendering
    spriteCache.current.tempBuffer = createOffscreenCanvas(TILE_SIZE, TILE_SIZE);

    // 1. Create player buffers (4 directions, 3 animation frames)
    const dirs = ['down', 'up', 'left', 'right'];
    dirs.forEach(dir => {
      spriteCache.current.player[dir] = [0, 1, 2].map(() => {
        const buf = createOffscreenCanvas(32, 32);
        return buf;
      });
    });

    // Render player sprites
    dirs.forEach(dir => {
      [0, 1, 2].forEach(frame => {
        const buf = spriteCache.current.player[dir][frame];
        drawPlayer(buf.ctx, dir, frame);
      });
    });

    // 2. Render NPC Buffers
    const npcTypes = ['Sarah', 'Kevin', 'Ahmad', 'Budi', 'Linda'];
    npcTypes.forEach(name => {
      spriteCache.current.NPCs[name] = createOffscreenCanvas(32, 32);
      drawNPC(spriteCache.current.NPCs[name].ctx, name, 'down', 0);
    });

    // 3. Render Static Object Tiles
    spriteCache.current.tiles = {
      wall: createOffscreenCanvas(TILE_SIZE, TILE_SIZE),
      floor: createOffscreenCanvas(TILE_SIZE, TILE_SIZE),
      floor_steel: createOffscreenCanvas(TILE_SIZE, TILE_SIZE),
      carpet: createOffscreenCanvas(TILE_SIZE, TILE_SIZE),
      pc_ok: createOffscreenCanvas(TILE_SIZE, TILE_SIZE),
      pc_broken: createOffscreenCanvas(TILE_SIZE, TILE_SIZE),
      router_ok: createOffscreenCanvas(TILE_SIZE, TILE_SIZE),
      router_broken: createOffscreenCanvas(TILE_SIZE, TILE_SIZE),
      printer: createOffscreenCanvas(TILE_SIZE, TILE_SIZE),
      server: createOffscreenCanvas(TILE_SIZE, TILE_SIZE),
      door_closed: createOffscreenCanvas(TILE_SIZE, TILE_SIZE),
      door_open: createOffscreenCanvas(TILE_SIZE, TILE_SIZE),
    };

    // Draw Static Tiles
    drawWall(spriteCache.current.tiles.wall.ctx, TILE_SIZE, TILE_SIZE);
    drawFloor(spriteCache.current.tiles.floor.ctx, TILE_SIZE, TILE_SIZE);
    drawCarpet(spriteCache.current.tiles.carpet.ctx, TILE_SIZE, TILE_SIZE);
    drawPrinter(spriteCache.current.tiles.printer.ctx, TILE_SIZE, TILE_SIZE);

    // Steel Floor
    const steelCtx = spriteCache.current.tiles.floor_steel.ctx;
    steelCtx.fillStyle = '#0f172a';
    steelCtx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);
    steelCtx.strokeStyle = 'rgba(0, 245, 255, 0.03)';
    steelCtx.lineWidth = 1;
    steelCtx.strokeRect(0, 0, TILE_SIZE, TILE_SIZE);
    steelCtx.fillStyle = 'rgba(0, 245, 255, 0.05)';
    steelCtx.fillRect(TILE_SIZE - 8, 4, 3, 3);

    spriteCache.current.loaded = true;
  };

  // Setup Keyboard Listeners & Game Loop
  useEffect(() => {
    cacheSprites();
    engineRef.current.running = true;

    // Set spawn point based on current map selection
    const currentMap = MAPS[mapId];
    engineRef.current.player.x = currentMap.spawn.x * TILE_SIZE;
    engineRef.current.player.y = currentMap.spawn.y * TILE_SIZE;

    const handleKeyDown = (e) => {
      if (activeDialogueRef.current) return; // disable movement if talking

      const key = e.key.toLowerCase();
      engineRef.current.keys[key] = true;

      // Sprint toggle
      if (e.key === 'Shift') {
        engineRef.current.player.speed = 5.5;
      }

      // Proximity web audio context unlocking
      if (audioSynthRef.current.ctx?.state === 'suspended') {
        audioSynthRef.current.ctx.resume();
      }

      // E Key -> Interact
      if (key === 'e') {
        triggerInteraction();
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      engineRef.current.keys[key] = false;
      if (e.key === 'Shift') {
        engineRef.current.player.speed = 3;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Main Engine Tick
    let frameId;
    const tick = () => {
      if (!engineRef.current.running) return;
      updatePhysics();
      renderGame();
      frameId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      engineRef.current.running = false;
      cancelAnimationFrame(frameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [mapId]);

  // Handle Day/Night clock increment
  useEffect(() => {
    const timer = setInterval(() => {
      if (activeDialogue || activeMissionOverlay || showLearningOverlay) return; // pause clock in overlays

      setTimeMinute(prev => {
        if (prev >= 50) {
          setTimeHour(h => (h >= 23 ? 0 : h + 1));
          return 0;
        }
        return prev + 10;
      });
    }, 1800); // 1.8s real-time = 10 minutes in-game

    return () => clearInterval(timer);
  }, [activeDialogue, activeMissionOverlay, showLearningOverlay]);

  // Main Typewriter typing simulation for dialog bubbles
  useEffect(() => {
    if (!activeDialogue) return;

    let rawMsg;
    const isSolved = activeDialogue.missionId !== 'none' && (completedMissions.includes(activeDialogue.missionId) || localCompletedMissions.includes(activeDialogue.missionId));
    
    if (isSolved) {
      const allMissions = getMissionsForArea(mapId);
      const mission = allMissions.find(m => m.id === activeDialogue.missionId);
      const titleEn = mission?.title?.en || '';
      const titleId = mission?.title?.id || '';
      rawMsg = lang === 'id' 
        ? `Terima kasih banyak! Anda sudah membereskan masalah "${titleId}" saya. Sekarang semuanya berjalan lancar.`
        : `Thank you so much! You have already fixed my "${titleEn}" issue. Everything is running perfectly now.`;
    } else {
      rawMsg = lang === 'id' ? activeDialogue.msgId : activeDialogue.msgEn;
    }

    let charIdx = 0;
    setDialogueText('');
    setDialogueDone(false);
    
    // Play quick chirp on launch
    sound.notify?.();

    const interval = setInterval(() => {
      if (charIdx < rawMsg.length) {
        const char = rawMsg[charIdx];
        setDialogueText(prev => prev + char);
        
        // Procedural retro voice typing chirps
        if (char.match(/[a-zA-Z]/i) && Math.random() < 0.25) {
          sound.keyType?.();
        }
        
        charIdx++;
      } else {
        setDialogueDone(true);
        clearInterval(interval);
      }
    }, 24);

    return () => clearInterval(interval);
  }, [activeDialogue, lang, completedMissions, localCompletedMissions, mapId]);

  // Trigger Interaction with closest NPC or device
  const triggerInteraction = () => {
    const currentMap = MAPS[mapId];
    const player = engineRef.current.player;

    // 1. Proximity check for NPCs (within 1.5 tiles radius)
    let closestNpc = null;
    let closestDist = 72; // interaction radius limit in pixels

    currentMap.npcs.forEach(npc => {
      const npcX = npc.tx * TILE_SIZE;
      const npcY = npc.ty * TILE_SIZE;
      // center calculations
      const dx = (npcX + 16) - (player.x + 16);
      const dy = (npcY + 16) - (player.y + 24);
      const dist = Math.sqrt(dx*dx + dy*dy);

      if (dist < closestDist) {
        closestDist = dist;
        closestNpc = npc;
      }
    });

    if (closestNpc) {
      sound.click();
      // Open retro dialogue box and reset state before activeDialogue is mounted
      setDialogueText('');
      setDialogueDone(false);
      setActiveDialogue(closestNpc);
      setDialogueIndex(0);
      return;
    }

    // 2. Proximity check for devices (direct interact workbench or server racks)
    let closestDevice = null;
    closestDist = 60;

    currentMap.devices.forEach(dev => {
      const devX = dev.tx * TILE_SIZE;
      const devY = dev.ty * TILE_SIZE;
      const dx = (devX + 24) - (player.x + 16);
      const dy = (devY + 24) - (player.y + 24);
      const dist = Math.sqrt(dx*dx + dy*dy);

      if (dist < closestDist) {
        closestDist = dist;
        closestDevice = dev;
      }
    });

    if (closestDevice && closestDevice.isBroken) {
      sound.click();
      // Fast bypass: direct repair interaction triggers puzzle loading
      launchTroubleshooting(closestDevice.missionId);
    }
  };

  // Launch specialized computer repair/network puzzle
  const launchTroubleshooting = (missionId) => {
    const allMissions = getMissionsForArea(mapId);
    const mission = allMissions.find(m => m.id === missionId);
    if (!mission) return;

    sound.notify();
    startMission(mission);

    // If learning material exists for this mission, show the learning overlay first!
    const learning = getMissionLearning(mission.id);
    if (learning) {
      setShowLearningOverlay(mission);
    } else {
      setActiveMissionOverlay(mission);
    }
  };

  // Complete mission puzzle callback from overlay
  const handleMissionComplete = () => {
    if (!activeMissionOverlay) return;

    // Seamlessly complete the mission in gameStore state
    completeMission(activeMissionOverlay.id, {
      xpReward: activeMissionOverlay.xpReward || 100,
      coinReward: activeMissionOverlay.coinReward || 20,
      toolUnlock: activeMissionOverlay.toolUnlock,
      category: activeMissionOverlay.category || 'hardware',
    });

    // Save to our engine cache to turn green lights on repaired devices
    engineRef.current.completedMissions.push(activeMissionOverlay.id);
    setLocalCompletedMissions(prev => [...prev, activeMissionOverlay.id]);

    // Dynamic toast notification
    sound.success?.();

    setActiveMissionOverlay(null);
    setActiveDialogue(null);
  };

  // Solid Collision grid checks
  const isSolid = (tx, ty) => {
    const currentMap = MAPS[mapId];
    if (tx < 0 || tx >= MAP_COLS || ty < 0 || ty >= MAP_ROWS) return true; // solid out of bounds
    const tileVal = currentMap.tiles[ty][tx];
    
    // 0: Walkable, 7: Rug, 9: Portal Door (trigger warp)
    return tileVal !== 0 && tileVal !== 7 && tileVal !== 9;
  };

  // Check collision of player rectangular bounds with the tilemap
  const checkTileCollision = (px, py) => {
    // Custom player bounding box (tight center body padding for perfect Z-sorting depth)
    const bbox = {
      left: px + 8,
      right: px + 24,
      top: py + 18,
      bottom: py + 30
    };

    // Find grid columns/rows containing bounding box corners
    const tx1 = Math.floor(bbox.left / TILE_SIZE);
    const tx2 = Math.floor(bbox.right / TILE_SIZE);
    const ty1 = Math.floor(bbox.top / TILE_SIZE);
    const ty2 = Math.floor(bbox.bottom / TILE_SIZE);

    // If any corner intersects a solid wall or furniture tile, return collision true
    if (isSolid(tx1, ty1) || isSolid(tx2, ty1) || isSolid(tx1, ty2) || isSolid(tx2, ty2)) {
      return true;
    }
    return false;
  };

  const checkPortals = (px, py) => {
    const currentMap = MAPS[mapId];
    const tx = Math.floor((px + 16) / TILE_SIZE);
    const ty = Math.floor((py + 24) / TILE_SIZE);

    if (tx >= 0 && tx < MAP_COLS && ty >= 0 && ty < MAP_ROWS) {
      if (currentMap.tiles[ty][tx] === 9) {
        // Step on door portal -> Warp back to map!
        sound.notify?.();
        engineRef.current.running = false;
        setShowExitPortalOverlay(true);

        setTimeout(() => {
          onBack?.();
          setShowExitPortalOverlay(false);
        }, 800);
      }
    }
  };

  // Physics engine: moves characters and calculates boundary values
  const updatePhysics = () => {
    const keys = engineRef.current.keys;
    const player = engineRef.current.player;

    // Reset velocities
    player.vx = 0;
    player.vy = 0;

    // WASD or Arrow Keys
    if (keys['w'] || keys['arrowup']) {
      player.vy = -player.speed;
      player.dir = 'up';
    } else if (keys['s'] || keys['arrowdown']) {
      player.vy = player.speed;
      player.dir = 'down';
    }

    if (keys['a'] || keys['arrowleft']) {
      player.vx = -player.speed;
      player.dir = 'left';
    } else if (keys['d'] || keys['arrowright']) {
      player.vx = player.speed;
      player.dir = 'right';
    }

    player.isWalking = player.vx !== 0 || player.vy !== 0;

    // Animation frame increments (bobbing walk)
    engineRef.current.animationTimer++;
    if (player.isWalking) {
      player.frame = Math.floor(engineRef.current.animationTimer / 10) % 2 + 1; // frames 1 or 2
    } else {
      player.frame = 0; // idle frame
    }

    // Move player with separate collision checking for X and Y axes
    // This allows slide mechanics along diagonal borders!
    if (player.vx !== 0) {
      const nextX = player.x + player.vx;
      if (!checkTileCollision(nextX, player.y)) {
        player.x = nextX;
      }
    }

    if (player.vy !== 0) {
      const nextY = player.y + player.vy;
      if (!checkTileCollision(player.x, nextY)) {
        player.y = nextY;
      }
    }

    // Portal checks
    checkPortals(player.x, player.y);

    // Hum proximity calculations
    updateHumSound(player.x, player.y);
  };

  // Canvas drawing operations
  const renderGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const player = engineRef.current.player;
    const currentMap = MAPS[mapId];

    const viewWidth = canvas.width;
    const viewHeight = canvas.height;

    // 1. Camera target calculations (smooth interpolation scroll)
    const targetCamX = player.x - viewWidth / 2 + 16;
    const targetCamY = player.y - viewHeight / 2 + 24;

    const mapMaxX = MAP_COLS * TILE_SIZE - viewWidth;
    const mapMaxY = MAP_ROWS * TILE_SIZE - viewHeight;

    // Linear interpolation scroll + camera constraints clamping
    engineRef.current.camera.x += (targetCamX - engineRef.current.camera.x) * 0.12;
    engineRef.current.camera.y += (targetCamY - engineRef.current.camera.y) * 0.12;

    engineRef.current.camera.x = Math.max(0, Math.min(mapMaxX, engineRef.current.camera.x));
    engineRef.current.camera.y = Math.max(0, Math.min(mapMaxY, engineRef.current.camera.y));

    const camX = engineRef.current.camera.x;
    const camY = engineRef.current.camera.y;

    // Clear main screen
    ctx.clearRect(0, 0, viewWidth, viewHeight);

    // 2. Draw Floor layer
    for (let r = 0; r < MAP_ROWS; r++) {
      for (let c = 0; c < MAP_COLS; c++) {
        const x = c * TILE_SIZE - camX;
        const y = r * TILE_SIZE - camY;

        // Draw basic autotiles floor
        const floorImg = currentMap.bgType === 'tech_floor' 
          ? spriteCache.current.tiles.floor.canvas 
          : spriteCache.current.tiles.floor_steel.canvas;
          
        ctx.drawImage(floorImg, x, y);

        // Draw rugs over floors
        if (currentMap.tiles[r][c] === 7) {
          ctx.drawImage(spriteCache.current.tiles.carpet.canvas, x, y);
        }
      }
    }

    // 3. Collect solid entities & interactive objects for Z-sorting depth
    const zDraws = [];

    // Map borders and walls
    for (let r = 0; r < MAP_ROWS; r++) {
      for (let c = 0; c < MAP_COLS; c++) {
        const val = currentMap.tiles[r][c];
        if (val === 1) {
          // Walls
          zDraws.push({
            y: r * TILE_SIZE + TILE_SIZE - 4, // Y sorting reference line
            draw: (cxt) => {
              cxt.drawImage(spriteCache.current.tiles.wall.canvas, c * TILE_SIZE - camX, r * TILE_SIZE - camY);
            }
          });
        }
      }
    }

    // Hardware devices and tables
    currentMap.devices.forEach(dev => {
      // Check if this device is already solved
      const isFixed = completedMissions.includes(dev.missionId) || engineRef.current.completedMissions.includes(dev.missionId);

      zDraws.push({
        y: dev.ty * TILE_SIZE + TILE_SIZE - 2,
        draw: (cxt) => {
          const dx = dev.tx * TILE_SIZE - camX;
          const dy = dev.ty * TILE_SIZE - camY;
          const temp = spriteCache.current.tempBuffer;
          if (dev.type === 'pc') {
            if (temp) {
              drawPC(temp.ctx, TILE_SIZE, TILE_SIZE, !isFixed && dev.isBroken, engineRef.current.animationTimer);
              cxt.drawImage(temp.canvas, dx, dy);
            }
          } else if (dev.type === 'router') {
            if (temp) {
              drawRouter(temp.ctx, TILE_SIZE, TILE_SIZE, !isFixed && dev.isBroken, engineRef.current.animationTimer);
              cxt.drawImage(temp.canvas, dx, dy);
            }
          } else if (dev.type === 'server') {
            if (temp) {
              drawServer(temp.ctx, TILE_SIZE, TILE_SIZE, engineRef.current.animationTimer);
              cxt.drawImage(temp.canvas, dx, dy);
            }
          } else if (dev.type === 'printer') {
            cxt.drawImage(spriteCache.current.tiles.printer.canvas, dx, dy);
          }
        }
      });
    });

    // NPC Characters
    currentMap.npcs.forEach(npc => {
      // Dynamically generate and cache NPC sprites on the fly if they don't exist
      if (spriteCache.current.loaded && !spriteCache.current.NPCs[npc.name]) {
        spriteCache.current.NPCs[npc.name] = createOffscreenCanvas(32, 32);
        let drawName = npc.name;
        if (npc.name.startsWith('Pak ')) {
          drawName = npc.name.replace('Pak ', '');
        }
        drawNPC(spriteCache.current.NPCs[npc.name].ctx, drawName, 'down', 0);
      }

      zDraws.push({
        y: npc.ty * TILE_SIZE + TILE_SIZE,
        draw: (cxt) => {
          const buf = spriteCache.current.NPCs[npc.name];
          if (buf) {
            cxt.drawImage(buf.canvas, npc.tx * TILE_SIZE - camX, npc.ty * TILE_SIZE - camY - 12);
          }
        }
      });
    });

    // Door Portal Exit Gates
    for (let r = 0; r < MAP_ROWS; r++) {
      for (let c = 0; c < MAP_COLS; c++) {
        if (currentMap.tiles[r][c] === 9) {
          zDraws.push({
            y: r * TILE_SIZE + TILE_SIZE,
            draw: (cxt) => {
              const temp = spriteCache.current.tempBuffer;
              if (temp) {
                drawDoor(temp.ctx, TILE_SIZE, TILE_SIZE, true, engineRef.current.animationTimer);
                cxt.drawImage(temp.canvas, c * TILE_SIZE - camX, r * TILE_SIZE - camY);
              }
            }
          });
        }
      }
    }

    // Player
    zDraws.push({
      y: player.y + 32,
      draw: (cxt) => {
        const buf = spriteCache.current.player[player.dir][player.frame];
        if (buf) {
          cxt.drawImage(buf.canvas, player.x - camX, player.y - camY - 12);
        }
      }
    });

    // 4. Perform Y-Sorting Depth Render
    zDraws.sort((a, b) => a.y - b.y);
    zDraws.forEach(item => item.draw(ctx));

    // 5. Ambient Cyberpunk Lights & Time Vignette
    ctx.globalCompositeOperation = 'multiply';
    
    // Day cycle tint (Night is Navy Dark blue, sunset is Orange, noon is clear)
    let ambientColor = 'rgba(255, 255, 255, 1.0)';
    if (timeHour >= 18 && timeHour < 20) {
      // Sunset (Warm golden orange)
      const ratio = (timeHour - 18) + timeMinute / 60;
      ambientColor = `rgba(255, ${200 - ratio * 80}, ${150 - ratio * 100}, 0.8)`;
    } else if (timeHour >= 20 || timeHour < 5) {
      // Night (Cyber dark navy tint)
      ambientColor = 'rgba(30, 40, 80, 0.55)';
    } else if (timeHour >= 5 && timeHour < 7) {
      // Sunrise (Warm pastel pink)
      ambientColor = 'rgba(255, 210, 220, 0.75)';
    }
    
    ctx.fillStyle = ambientColor;
    ctx.fillRect(0, 0, viewWidth, viewHeight);

    // Reset Composition
    ctx.globalCompositeOperation = 'source-over';

    // 6. Interactive Floating Prompts (Draw "Press [E] to Talk")
    let closestText = null;
    let closestTextX = 0;
    let closestTextY = 0;
    let maxDist = 56;

    currentMap.npcs.forEach(npc => {
      const dx = (npc.tx * TILE_SIZE + TILE_SIZE/2) - (player.x + 16);
      const dy = (npc.ty * TILE_SIZE + TILE_SIZE/2) - (player.y + 24);
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      const isSolved = completedMissions.includes(npc.missionId) || engineRef.current.completedMissions.includes(npc.missionId);

      if (dist < maxDist && !activeDialogue) {
        maxDist = dist;
        closestText = isSolved 
          ? `💬 ${npc.name} (Fixed)`
          : `💬 E: Talk to ${npc.name}`;
        closestTextX = npc.tx * TILE_SIZE + TILE_SIZE/2 - camX;
        closestTextY = npc.ty * TILE_SIZE - camY - 24;
      }
    });

    currentMap.devices.forEach(dev => {
      if (!dev.isBroken || completedMissions.includes(dev.missionId) || engineRef.current.completedMissions.includes(dev.missionId)) return;
      const dx = (dev.tx * TILE_SIZE + TILE_SIZE/2) - (player.x + 16);
      const dy = (dev.ty * TILE_SIZE + TILE_SIZE/2) - (player.y + 24);
      const dist = Math.sqrt(dx*dx + dy*dy);

      if (dist < 48 && !activeDialogue) {
        closestText = '🔧 E: Repair Device';
        closestTextX = dev.tx * TILE_SIZE + TILE_SIZE/2 - camX;
        closestTextY = dev.ty * TILE_SIZE - camY - 14;
      }
    });

    // 6. Proximity targets and ambient chatter drawing has been removed from canvas
    // to render beautifully and centered in the React Dialogue Box container instead.
  };

  // Convert digital number into structured 24h clock string
  const formatTime = () => {
    const hh = String(timeHour).padStart(2, '0');
    const mm = String(timeMinute).padStart(2, '0');
    return `${hh}:${mm} ${timeHour >= 18 || timeHour < 6 ? '🌃' : '🌅'}`;
  };

  const isBottomBannerActive = !!(activeDialogue || proximityTarget || ambientChat);

  return (
    <div className="fixed top-[80px] bottom-[72px] left-0 right-0 z-30 bg-[#070b14] font-orbitron overflow-hidden select-none flex flex-col">
      {/* 1. TOP BAR HUD (Compact info bar) */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-black/40 z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => { sound.click(); onBack?.(); }} 
            className="text-xs border border-white/10 text-white/50 px-3 py-1.5 rounded-lg hover:text-white hover:border-white/20 transition-all font-mono"
          >
            ← Back to Map
          </button>
          <div className="flex items-center gap-1.5">
            <span className="text-xl">🗺️</span>
            <span className="text-xs text-white/80 font-bold tracking-wide uppercase">
              {lang === 'id' ? MAPS[mapId].nameId : MAPS[mapId].name}
            </span>
          </div>
        </div>

        {/* Cyberclock & Player Wealth Stats */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 border border-[var(--neon-purple)]/20 bg-[rgba(191,0,255,0.04)] px-3 py-1 rounded-lg">
            <span className="text-[10px] text-[var(--neon-purple)] font-black uppercase">Clock:</span>
            <span className="text-xs font-mono font-bold text-white tracking-widest">{formatTime()}</span>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs">
            <span className="text-[var(--neon-green)] font-bold">🪙 {coins}</span>
            <span className="text-[var(--neon-yellow)] font-bold">⭐ Lv {level}</span>
          </div>
        </div>
      </div>

      <div 
        className="flex-1 flex flex-col items-center justify-center p-3 relative bg-black/90 overflow-hidden transition-all duration-300"
        style={{
          paddingBottom: isMobile 
            ? (isBottomBannerActive ? '230px' : '140px')
            : (isBottomBannerActive ? '100px' : '16px')
        }}
      >
        {/* CRT Scanline Retro filter */}
        <div className="absolute inset-0 pointer-events-none scanlines opacity-30 z-20" />

        {/* Responsive Canvas Wrapper */}
        <div 
          className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(0,245,255,0.06)] bg-[#070b14] max-w-full max-h-[85%] w-[720px] md:w-[720px] sm:w-[90vw]"
          style={{ aspectRatio: '15/11' }}
        >
          <canvas
            ref={canvasRef}
            width={720}
            height={528}
            className="w-full h-full block"
            id="phaser-game"
          />

          {/* Grid ambient loading scan overlay */}
          <div className="absolute inset-0 pointer-events-none grid-bg opacity-15" />
        </div>

        {/* Dynamic transition warp cover */}
        <AnimatePresence>
          {showExitPortalOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#070b14] flex flex-col items-center justify-center z-50"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-[var(--neon-cyan)] text-xs font-black tracking-[0.2em] font-orbitron uppercase text-center"
              >
                📡 Loading Cyber Network...
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. DIALOGUE BOX — Positioned above the gamepad or bottom navbar */}
      <div
        className="absolute left-4 right-4 z-30 mx-auto max-w-2xl pointer-events-auto"
        style={{
          bottom: isMobile ? '136px' : '12px'
        }}
      >
        <AnimatePresence mode="wait">
          {activeDialogue ? (
            <motion.div
              key="active-dialogue"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="w-full max-w-2xl glass border-2 border-[var(--neon-cyan)] rounded-2xl p-4.5 shadow-[0_0_25px_rgba(0,245,255,0.2)] flex gap-4 items-start bg-[#070b15]/96"
            >
              {/* NPC Pixel Portrait Box */}
              <div className="flex-shrink-0 flex flex-col items-center gap-1">
                <div
                  className="w-12 h-12 rounded-lg border border-white/20 flex items-center justify-center text-3xl shadow-inner relative overflow-hidden bg-black/40"
                  style={{ imageRendering: 'pixelated' }}
                >
                  <div className="absolute inset-0 bg-[var(--neon-cyan)]/5 animate-pulse" />
                  <span className="text-3xl">{activeDialogue.avatar || '👤'}</span>
                </div>
                <span className="text-[8px] text-white/50 uppercase tracking-widest font-black font-mono">
                  {activeDialogue.name}
                </span>
              </div>

              {/* Dialogue Bubble Text */}
              <div className="flex-1 space-y-2">
                <div className="bg-black/35 rounded-lg p-2.5 border border-white/5 min-h-[44px]">
                  <p className="text-[11px] text-white/85 leading-relaxed font-mono">
                    {dialogueText}
                    {!dialogueDone && <span className="terminal-cursor" />}
                  </p>
                </div>

                {/* Dialog Response Buttons — appear after typewriter finishes */}
                {dialogueDone && (
                  <motion.div
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-end gap-2 flex-wrap"
                  >
                    {/* Always show a close button */}
                    <button
                      onClick={() => {
                        sound.click();
                        setActiveDialogue(null);
                        // Clear joystick so player doesn't drift after closing
                        setJoystickPos({ x: 0, y: 0 });
                        const keys = engineRef.current.keys;
                        keys['w'] = false; keys['s'] = false;
                        keys['a'] = false; keys['d'] = false;
                      }}
                      className="px-3 py-1.5 border border-white/10 text-white/50 hover:text-white hover:border-white/30 rounded-md transition-colors text-[9px] uppercase font-bold tracking-wider"
                    >
                      {lang === 'id' ? 'Nanti ➔' : 'Close ➔'}
                    </button>

                    {/* Show action button only when mission exists and not yet completed */}
                    {activeDialogue.missionId !== 'none' && !completedMissions.includes(activeDialogue.missionId) && !localCompletedMissions.includes(activeDialogue.missionId) && (
                      <button
                        onClick={() => {
                          setActiveDialogue(null);
                          launchTroubleshooting(activeDialogue.missionId);
                        }}
                        className="btn-game px-4 py-1.5 text-[9px]"
                      >
                        {lang === 'id' ? 'Saya bantu cek! ➔' : 'Fix it now! ➔'}
                      </button>
                    )}

                    {/* Show replay button when mission already completed */}
                    {activeDialogue.missionId !== 'none' && (completedMissions.includes(activeDialogue.missionId) || localCompletedMissions.includes(activeDialogue.missionId)) && (
                      <button
                        onClick={() => {
                          setActiveDialogue(null);
                          launchTroubleshooting(activeDialogue.missionId);
                        }}
                        className="btn-game px-4 py-1.5 text-[9px]"
                        style={{ '--neon-color': 'var(--neon-green)' }}
                      >
                        {lang === 'id' ? 'Main Lagi ➔' : 'Replay ➔'}
                      </button>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : proximityTarget ? (
            <motion.div
              key="proximity"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className={`w-full max-w-2xl border-2 rounded-2xl p-4 flex gap-4 items-center bg-[#070b15]/96 shadow-[0_0_20px_rgba(0,0,0,0.5)] ${
                proximityTarget.type === 'device'
                  ? 'border-amber-500/70 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                  : 'border-[var(--neon-cyan)]/70 shadow-[0_0_20px_rgba(0,245,255,0.2)]'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-lg border flex-shrink-0 flex items-center justify-center text-3xl shadow-inner relative overflow-hidden bg-black/45 ${
                  proximityTarget.type === 'device' ? 'border-amber-500/30' : 'border-cyan-500/30'
                }`}
              >
                <div className={`absolute inset-0 opacity-10 animate-pulse ${
                  proximityTarget.type === 'device' ? 'bg-amber-500' : 'bg-cyan-500'
                }`} />
                <span className="text-3xl z-10">{proximityTarget.avatar}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <span className={`text-[8px] uppercase tracking-widest font-black font-mono block ${
                  proximityTarget.type === 'device' ? 'text-amber-400' : 'text-[var(--neon-cyan)]'
                }`}>
                  {proximityTarget.type === 'device' 
                    ? (lang === 'id' ? '⚙️ PERBAIKAN DEKAT ANDA' : '⚙️ MAINTENANCE ALERT')
                    : (lang === 'id' ? '💬 NPC TERDEKAT' : '💬 NPC DETECTED')}
                </span>
                <p className="text-[11px] text-white/90 font-mono leading-tight mt-0.5">
                  {proximityTarget.type === 'device'
                    ? (lang === 'id' ? 'Tekan E atau klik tombol untuk troubleshooting!' : 'Press E or tap to start troubleshooting!')
                    : (proximityTarget.isSolved 
                        ? (lang === 'id' ? `Bicara dengan ${proximityTarget.name} (Selesai)` : `Talk to ${proximityTarget.name} (Solved)`)
                        : (lang === 'id' ? `Bicara dengan ${proximityTarget.name}` : `Talk to ${proximityTarget.name}`))
                  }
                </p>
              </div>

              <button
                onClick={() => {
                  sound.click();
                  triggerInteraction();
                }}
                className={`px-4 py-2 rounded-xl text-[9px] uppercase font-bold font-mono tracking-widest transition-all ${
                  proximityTarget.type === 'device'
                    ? 'bg-amber-500/10 border-2 border-amber-500/60 text-amber-300 hover:bg-amber-500/20 active:scale-95 shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                    : 'bg-cyan-500/10 border-2 border-cyan-500/60 text-cyan-300 hover:bg-cyan-500/20 active:scale-95 shadow-[0_0_12px_rgba(0,245,255,0.15)]'
                }`}
              >
                {proximityTarget.type === 'device'
                  ? (lang === 'id' ? 'Perbaiki (E) ➔' : 'Repair (E) ➔')
                  : (lang === 'id' ? 'Bicara (E) ➔' : 'Talk (E) ➔')}
              </button>
            </motion.div>
          ) : ambientChat ? (
            <motion.div
              key="ambient"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.18 }}
              className={`w-full max-w-2xl border-2 rounded-2xl p-4.5 flex gap-4 items-start bg-[#070b15]/96 shadow-[0_0_15px_rgba(0,0,0,0.4)] ${
                ambientChat.isPlayer
                  ? 'border-[#00ff66]/70 shadow-[0_0_20px_rgba(0,255,102,0.15)]'
                  : 'border-[#bf00ff]/70 shadow-[0_0_20px_rgba(191,0,255,0.15)]'
              }`}
            >
              {/* Speaker Portrait Box */}
              <div className="flex-shrink-0 flex flex-col items-center gap-1">
                <div
                  className={`w-12 h-12 rounded-lg border flex items-center justify-center text-3xl shadow-inner relative overflow-hidden bg-black/45 ${
                    ambientChat.isPlayer ? 'border-[#00ff66]/25' : 'border-[#bf00ff]/25'
                  }`}
                >
                  <div className={`absolute inset-0 opacity-5 animate-pulse ${
                    ambientChat.isPlayer ? 'bg-[#00ff66]' : 'bg-[#bf00ff]'
                  }`} />
                  <span className="text-3xl z-10">
                    {ambientChat.isPlayer ? '🧑‍💻' : (currentMap.npcs.find(n => n.name === ambientChat.npcName)?.avatar || '👤')}
                  </span>
                </div>
                <span className="text-[7px] text-white/40 uppercase tracking-widest font-black font-mono">
                  {ambientChat.isPlayer ? 'PLAYER' : (ambientChat.npcName || 'NPC')}
                </span>
              </div>

              {/* Dialogue Bubble Text */}
              <div className="flex-1 space-y-1">
                <span className={`text-[8px] uppercase tracking-widest font-black font-mono ${
                  ambientChat.isPlayer ? 'text-[#00ff66]' : 'text-[#bf00ff]'
                }`}>
                  {ambientChat.isPlayer
                    ? (lang === 'id' ? '🧠 PEMIKIRAN' : '🧠 THOUGHTS')
                    : (lang === 'id' ? '💬 CELOTEH' : '💬 CHATTER')}
                </span>
                <div className="bg-black/30 rounded-lg p-2.5 border border-white/5 min-h-[44px] flex items-center">
                  <p className="text-[11px] text-white/90 leading-relaxed font-mono italic">
                    "{ambientChat.text}"
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="diagnostics"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl border border-white/5 bg-[#05080e]/40 rounded-2xl p-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-cyan-500/10 flex items-center justify-center text-cyan-400/40 relative">
                  <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-ping opacity-25" />
                  <span className="text-sm font-mono">📟</span>
                </div>
                <div className="font-mono">
                  <span className="text-[8px] text-white/30 uppercase tracking-widest block">
                    📡 {lang === 'id' ? 'Monitor Jaringan & Patroli' : 'Network Monitor & Patrol'}
                  </span>
                  <p className="text-[9px] text-cyan-400/60 animate-pulse mt-0.5">
                    {lang === 'id' ? '🚶 Berpatroli mencari tiket gangguan...' : '🚶 Patrolling for support tickets...'}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-center font-mono text-right">
                <span className="text-[8px] text-white/20 uppercase tracking-widest">
                  {lang === 'id' ? 'Status Sistem' : 'System status'}
                </span>
                <span className="text-[9px] text-emerald-400/70 font-bold uppercase tracking-wider mt-0.5">
                  ● ONLINE
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. MOBILE GAMEPAD — permanently positioned above the bottom navbar */}
      {isMobile && (
        <div
          className="absolute left-4 right-4 z-30 mx-auto max-w-[720px] select-none pointer-events-auto"
          style={{
            bottom: '8px'
          }}
        >
          <div className="w-full bg-[#0c1322] border border-cyan-500/20 p-3 flex justify-between items-center rounded-2xl shadow-[0_0_25px_rgba(0,245,255,0.18)]">
            {/* 1. Joystick Area (Left Side) */}
            <div className="flex items-center justify-center pl-4">
              <div 
                className="w-24 h-24 rounded-full border border-cyan-400/30 bg-black/45 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.15)] pointer-events-auto cursor-grab active:cursor-grabbing relative"
                style={{ touchAction: 'none' }}
                ref={joystickRef}
                onTouchStart={handleJoystickStart}
                onTouchMove={handleJoystickMove}
                onTouchEnd={handleJoystickEnd}
              >
                {/* Outer Ring guide arrows */}
                <div className="absolute top-1 text-cyan-400/30 text-[8px]">▲</div>
                <div className="absolute bottom-1 text-cyan-400/30 text-[8px]">▼</div>
                <div className="absolute left-1 text-cyan-400/30 text-[8px]">◀</div>
                <div className="absolute right-1 text-cyan-400/30 text-[8px]">▶</div>

                {/* Glowing Thumb Knob */}
                <div 
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-fuchsia-600 to-indigo-500 shadow-[0_0_15px_rgba(217,70,239,0.5)] border border-white/20 absolute flex items-center justify-center"
                  style={{
                    transform: `translate(${joystickPos.x}px, ${joystickPos.y}px)`,
                    transition: isDragging ? 'none' : 'transform 0.15s ease-out'
                  }}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                </div>
              </div>
            </div>

            {/* D-Pad Decal Center Panel */}
            <div className="hidden sm:flex flex-col items-center opacity-30 font-mono text-[7px] text-cyan-400/60 uppercase tracking-widest gap-1 border border-white/5 px-4 py-2 rounded-lg">
              <span>🤖 Cyber Pad Console v1.0</span>
              <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
              <span>Diagnostic System</span>
            </div>

            {/* 2. Action & Sprint Buttons Area (Right Side) */}
            <div className="flex items-center gap-4 pr-4 pointer-events-auto">
              {/* Sprint/Run Button */}
              <button
                onTouchStart={handleSprintStart}
                onTouchEnd={handleSprintEnd}
                onMouseDown={handleSprintStart}
                onMouseUp={handleSprintEnd}
                className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 active:from-purple-700 active:to-pink-600 shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-300/30 flex flex-col items-center justify-center text-white select-none active:scale-95 transition-transform"
                style={{ touchAction: 'none' }}
              >
                <span className="text-[10px] font-black tracking-wider leading-none">RUN</span>
                <span className="text-[6px] opacity-60">SHIFT</span>
              </button>

              {/* Big Pulsing Action Button */}
              <button
                onTouchStart={handleActionTouch}
                onClick={handleActionTouch}
                className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 active:from-cyan-600 active:to-blue-700 shadow-[0_0_25px_rgba(6,182,212,0.55)] border border-cyan-300/40 flex flex-col items-center justify-center text-white select-none active:scale-95 transition-transform animate-pulse"
                style={{ touchAction: 'none' }}
              >
                <span className="text-xs font-black tracking-widest leading-none">ACTION</span>
                <span className="text-[8px] opacity-75 font-mono">E</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. IMMERSIVE FULLSCREEN LEARNING CAROUSEL OVERLAY */}
      <AnimatePresence>
        {showLearningOverlay && (() => {
          const learning = getMissionLearning(showLearningOverlay.id);
          if (!learning) {
            // Fallback if no learning slides exist
            setActiveMissionOverlay(showLearningOverlay);
            setShowLearningOverlay(null);
            return null;
          }
          return (
            <MissionLearnCarousel
              key="learn-overlay"
              mission={showLearningOverlay}
              slides={learning.slides}
              lang={lang}
              onComplete={() => {
                setActiveMissionOverlay(showLearningOverlay);
                setShowLearningOverlay(null);
              }}
              onSkip={() => {
                setActiveMissionOverlay(showLearningOverlay);
                setShowLearningOverlay(null);
              }}
              onClose={() => {
                setShowLearningOverlay(null);
              }}
            />
          );
        })()}
      </AnimatePresence>

      {/* 5. IMMERSIVE FULLSCREEN GAMEPLAY PUZZLE OVERLAY */}
      <AnimatePresence>
        {activeMissionOverlay && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="fixed inset-0 bg-[#070b14] z-50 flex flex-col p-6 overflow-y-auto"
          >
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/5 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[var(--neon-cyan)] font-black uppercase tracking-widest font-mono">
                    🛠️ {lang === 'id' ? 'Simulasi Misi RPG Misi Aktif' : 'Active RPG Mission Simulation'}
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full font-mono font-bold bg-white/5 text-[var(--neon-cyan)]">
                    {activeMissionOverlay.difficulty?.toUpperCase()}
                  </span>
                </div>
                <h2 className="text-lg font-black text-white uppercase tracking-wide">
                  {lang === 'id' ? activeMissionOverlay.title?.id || activeMissionOverlay.title?.en : activeMissionOverlay.title?.en}
                </h2>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {/* Study Button (if learning exists) */}
                {getMissionLearning(activeMissionOverlay.id) && (
                  <button
                    onClick={() => { sound.click(); setShowLearningModalInOverlay(true); }}
                    className="text-xs border-2 border-[var(--neon-cyan)]/40 bg-[rgba(0,245,255,0.06)] text-[var(--neon-cyan)] hover:bg-[rgba(0,245,255,0.15)] hover:border-[var(--neon-cyan)] px-3.5 py-2 rounded-xl transition-all shadow-[0_0_10px_rgba(0,245,255,0.1)] font-bold tracking-wider font-mono flex items-center gap-1.5 active:scale-95"
                  >
                    <span>📖</span>
                    <span>{lang === 'id' ? 'Materi Pembelajaran' : 'Study Lesson'}</span>
                  </button>
                )}

                <button
                  onClick={() => { sound.click(); setActiveMissionOverlay(null); }}
                  className="text-xs border-2 border-[var(--neon-pink)]/40 bg-[rgba(255,45,120,0.06)] text-[var(--neon-pink)] hover:bg-[rgba(255,45,120,0.15)] hover:border-[var(--neon-pink)] px-3.5 py-2 rounded-xl transition-all shadow-[0_0_10px_rgba(255,45,120,0.1)] font-bold tracking-wider font-mono flex items-center gap-1.5 active:scale-95"
                >
                  <span>✕</span>
                  <span>{lang === 'id' ? 'Keluar' : 'Exit'}</span>
                </button>
              </div>
            </div>

            {/* Render targeted modular puzzle overlay */}
            <div className="flex-1 max-w-4xl mx-auto w-full glass rounded-2xl p-6 border border-white/8 relative">
              {['pc_repair', 'pc_repair_sim'].includes(activeMissionOverlay.puzzleType) && (
                <PCRepairSimPuzzle 
                  mission={activeMissionOverlay} 
                  onComplete={handleMissionComplete} 
                  onFail={() => { sound.wrong(); setActiveMissionOverlay(null); }} 
                />
              )}
              {['network', 'network_sim'].includes(activeMissionOverlay.puzzleType) && (
                <NetworkSimPuzzle 
                  mission={activeMissionOverlay} 
                  onComplete={handleMissionComplete} 
                  onFail={() => { sound.wrong(); setActiveMissionOverlay(null); }} 
                />
              )}
              {activeMissionOverlay.puzzleType === 'terminal' && (
                <Terminal 
                  mission={activeMissionOverlay} 
                  onComplete={handleMissionComplete} 
                  onFail={() => { sound.wrong(); setActiveMissionOverlay(null); }} 
                />
              )}
              {activeMissionOverlay.puzzleType === 'quiz' && (
                <QuizPuzzle 
                  mission={activeMissionOverlay} 
                  onComplete={handleMissionComplete} 
                  onFail={() => { sound.wrong(); setActiveMissionOverlay(null); }} 
                />
              )}
              {activeMissionOverlay.puzzleType === 'sequence' && (
                <SequencePuzzle 
                  mission={activeMissionOverlay} 
                  onComplete={handleMissionComplete} 
                  onFail={() => { sound.wrong(); setActiveMissionOverlay(null); }} 
                />
              )}
              {activeMissionOverlay.puzzleType === 'dialogue' && (
                <DialoguePuzzle 
                  mission={activeMissionOverlay} 
                  lang={lang}
                  onComplete={handleMissionComplete} 
                  onFail={() => { sound.wrong(); setActiveMissionOverlay(null); }} 
                />
              )}
              {!['pc_repair','pc_repair_sim','network','network_sim','terminal','quiz','sequence','dialogue'].includes(activeMissionOverlay.puzzleType) && (
                <div className="text-center py-8 text-white/30">
                  <p>Mission content loading...</p>
                  <button onClick={handleMissionComplete} className="mt-4 btn-game text-sm px-6 py-2">Complete (Dev Skip)</button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immersive Study Carousel Modal (from inside active mission overlay) */}
      <AnimatePresence>
        {showLearningModalInOverlay && activeMissionOverlay && (() => {
          const learning = getMissionLearning(activeMissionOverlay.id);
          if (!learning) return null;
          return (
            <MissionLearnCarousel
              key="active-rpg-learn-modal"
              mission={activeMissionOverlay}
              slides={learning.slides}
              lang={lang}
              onComplete={() => setShowLearningModalInOverlay(false)}
              onSkip={() => setShowLearningModalInOverlay(false)}
              onClose={() => setShowLearningModalInOverlay(false)}
            />
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
