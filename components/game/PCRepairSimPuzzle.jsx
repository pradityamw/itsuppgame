'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/lib/audio';
import { useLanguage } from '@/context/LanguageContext';
import { HARDWARE_SLOTS, CABLE_IDS, CABLE_DETAILS, diagnosePC } from '@/lib/pcRepairSim';

const COMPONENT_GLOSSARY = {
  cpu: {
    title: { en: "CPU (Processor)", id: "CPU (Prosesor)" },
    desc: {
      en: "The brain of the computer. It executes all programs. Requires thermal paste on top and must be securely locked in the socket before booting.",
      id: "Otak dari komputer. Menjalankan seluruh program. Memerlukan thermal paste di atasnya dan harus terkunci rapat di soket sebelum dinyalakan."
    },
    realWorldLook: {
      en: "A small, flat square metal plate (~4x4 cm) with delicate gold pads underneath and technical model text engraved on top.",
      id: "Keping logam persegi kecil (sekitar 4x4 cm) dengan deretan titik tembaga emas di bawahnya dan ukiran seri model di atasnya."
    },
    videoUrl: "https://www.youtube.com/watch?v=34dO76t02l8"
  },
  cooler: {
    title: { en: "CPU Cooler Fan", id: "Kipas Pendingin CPU" },
    desc: {
      en: "Pulls heat away from the processor. Must be clean from dust and have its fan connector plugged into the CPU_FAN pin on the motherboard.",
      id: "Menghalau panas dari prosesor. Harus bersih dari debu dan kabel konektor kipasnya tercolok ke pin CPU_FAN di motherboard."
    },
    realWorldLook: {
      en: "A circular plastic fan mounted on top of a dense stack of aluminum metal fins, with a 4-pin cable extending from it.",
      id: "Kipas plastik bulat yang dipasang di atas bongkahan sirip-sirip logam aluminium, dilengkapi kabel konektor kecil berisi 4 pin."
    },
    videoUrl: "https://www.youtube.com/watch?v=34dO76t02l8"
  },
  ram1: {
    title: { en: "DDR4 RAM (DIMM A1)", id: "RAM DDR4 (DIMM A1)" },
    desc: {
      en: "Short-term temporary memory desk. Must be fully pressed down until latches click. Loose or missing RAM results in a '3 Short Beeps' POST fail code.",
      id: "Meja memori jangka pendek. Harus ditekan kuat ke bawah hingga pengunci mengeklik. RAM longgar/hilang memicu kode POST '3 Bip Pendek'."
    },
    realWorldLook: {
      en: "A long, thin rectangular green or black circuit board (~13 cm) with dark chip squares on the sides and gold pin contacts at the bottom edge.",
      id: "Keping sirkuit hijau atau hitam panjang dan tipis (~13 cm) dengan kotak-kotak chip hitam di badannya dan kaki-kaki pin emas di bagian bawah."
    },
    videoUrl: "https://www.youtube.com/watch?v=kR205P6z_Qo"
  },
  ram2: {
    title: { en: "DDR4 RAM (DIMM B1)", id: "RAM DDR4 (DIMM B1)" },
    desc: {
      en: "Secondary memory channel slot. Install a second RAM stick here to upgrade memory capacity and run in faster dual-channel mode.",
      id: "Slot saluran memori sekunder. Pasang keping RAM kedua di sini untuk menambah kapasitas memori dan berjalan di mode dual-channel yang lebih cepat."
    },
    realWorldLook: {
      en: "Identical to the first RAM stick. Install matching sticks in paired slots to enable dual-channel bandwidth.",
      id: "Identik dengan keping RAM pertama. Pasang kepingan yang sama di slot berpasangan untuk mengaktifkan lebar pita dual-channel."
    },
    videoUrl: "https://www.youtube.com/watch?v=kR205P6z_Qo"
  },
  gpu: {
    title: { en: "Dedicated Graphics Card (GPU)", id: "Kartu Grafis Dedicated (GPU)" },
    desc: {
      en: "Produces high-quality video output for the monitor. Requires a dedicated PCIe 6-Pin auxiliary power cable from the power supply.",
      id: "Menghasilkan keluaran video berkualitas tinggi ke monitor. Membutuhkan kabel daya tambahan PCIe 6-Pin khusus dari power supply."
    },
    realWorldLook: {
      en: "A heavy, large expansion card with 1-3 cooling fans, a long gold PCIe connector strip at the bottom, and video ports (HDMI/DP) on the metal bracket.",
      id: "Kartu ekspansi besar dan berat dengan 1-3 kipas pendingin, pin emas panjang di bagian bawah, dan colokan HDMI/DisplayPort di pelat belakang."
    },
    videoUrl: "https://www.youtube.com/watch?v=mD3Z30vSntI"
  },
  ssd: {
    title: { en: "SATA Solid-State Drive (SSD)", id: "SATA Solid-State Drive (SSD)" },
    desc: {
      en: "Fast flash storage for the Operating System and boot files. Requires both a SATA Data Cable and a SATA Power Cable connection.",
      id: "Penyimpanan flash cepat untuk Sistem Operasi dan file boot. Membutuhkan koneksi Kabel Data SATA dan Kabel Daya SATA sekaligus."
    },
    realWorldLook: {
      en: "A lightweight, flat rectangular casing (2.5-inch size) with a gold L-shaped SATA data interface and a wider L-shaped power interface next to it.",
      id: "Kotak ceper ringan berukuran 2.5 inci berlapis logam/plastik dengan colokan berbentuk huruf L untuk data SATA dan daya SATA."
    },
    videoUrl: "https://www.youtube.com/watch?v=b0V2hJ7lGoc"
  }
};

function getMappedPCPuzzleData(puzzleData) {
  if (puzzleData.initialHardware) {
    return puzzleData;
  }

  const initialHardware = {
    cpu: { state: 'connected', label: 'Intel Core i5' },
    cooler: { state: 'connected', label: 'Intel Cooler' },
    ram1: { state: 'properly_seated', label: 'DDR4 8GB Stick' },
    ram2: { state: 'unplugged', label: 'Empty Slot' },
    gpu: { state: 'properly_seated', label: 'Nvidia GTX 1660' },
    ssd: { state: 'properly_seated', label: 'SATA SSD' },
  };

  const initialCables = {
    atx24pin: true,
    cpu8pin: true,
    gpu6pin: true,
    sataPower: true,
    sataData: true,
    frontPanel: true,
    fanHeader: true,
  };

  let symptom = puzzleData.symptom || '❌ PC Diagnostic issue';

  if (puzzleData.scenario === 'psu_loose') {
    initialCables.atx24pin = false;
    symptom = '❌ Motherboard has no power — check ATX cable';
  } else if (puzzleData.scenario === 'dust_buildup') {
    initialHardware.cooler = { state: 'dusty', label: 'CPU Cooler' };
    symptom = '⚠️ CPU overheating detected — clean the fan duster';
  } else if (puzzleData.scenario === 'cable_identify') {
    initialCables.gpu6pin = false;
    symptom = '📺 Display shows "No Signal" — check graphics card power';
  } else if (puzzleData.scenario === 'usb_port') {
    initialCables.sataData = false;
    symptom = '💾 Boot drive / USB not detected';
  }

  return {
    ...puzzleData,
    symptom,
    slots: [
      { id: 'cpu', label: 'CPU Socket' },
      { id: 'cooler', label: 'CPU Cooler' },
      { id: 'ram1', label: 'DIMM A1' },
      { id: 'ram2', label: 'DIMM B1' },
      { id: 'gpu', label: 'PCIe Slot' },
      { id: 'ssd', label: 'SATA SSD' },
    ],
    initialHardware,
    initialCables,
  };
}

export default function PCRepairSimPuzzle({ mission, onComplete, onFail, activeHighlightId }) {
  const { t, lang } = useLanguage();
  const rawPuzzleData = mission.puzzleData;
  const puzzleData = getMappedPCPuzzleData(rawPuzzleData);

  // Onboarding Tutorial & Glossary state
  const [showTutorial, setShowTutorial] = useState(false);
  const [showGuidebook, setShowGuidebook] = useState(false);
  const [currentTutorialSlide, setCurrentTutorialSlide] = useState(0);

  useEffect(() => {
    // Show tutorial automatically for the first play
    const hasSeenTutorial = localStorage.getItem('hasSeenPcTutorial');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
      localStorage.setItem('hasSeenPcTutorial', 'true');
    }
  }, []);

  // Game States
  const [caseOpen, setCaseOpen] = useState(false);
  const [psuSwitchOn, setPsuSwitchOn] = useState(false);
  const [pcPowerButtonActive, setPcPowerButtonActive] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [activeTool, setActiveTool] = useState('inspect'); // inspect, thermal_paste, clean_dust

  const [slots, setSlots] = useState(() => 
    puzzleData.slots.reduce((acc, slot) => {
      const initial = puzzleData.initialHardware?.[slot.id] || { state: 'properly_seated', label: slot.label };
      acc[slot.id] = initial;
      return acc;
    }, {})
  );

  const [cables, setCables] = useState(() => 
    Object.keys(CABLE_DETAILS).reduce((acc, cableId) => {
      const initialConnected = puzzleData.initialCables?.[cableId] !== false; // default true if not specified
      acc[cableId] = { connected: initialConnected };
      return acc;
    }, {})
  );

  const [telemetry, setTelemetry] = useState({ displayMsg: '' });
  const advice = getPCDiagnosticAdvice(telemetry, slots, cables, psuSwitchOn, pcPowerButtonActive, lang);

  // Compute live PC diagnostics
  useEffect(() => {
    const diag = diagnosePC(slots, cables, psuSwitchOn, pcPowerButtonActive);
    setTelemetry(diag);

    // Beep sound trigger on change of state
    if (diag.beepCode === 'single_short' && pcPowerButtonActive && psuSwitchOn) {
      sound.routerBeep();
    } else if (diag.beepCode === 'three_beeps' && pcPowerButtonActive && psuSwitchOn) {
      sound.wrong();
      setTimeout(() => sound.wrong(), 200);
      setTimeout(() => sound.wrong(), 400);
    } else if (diag.beepCode === 'single_long_two_short' && pcPowerButtonActive && psuSwitchOn) {
      sound.wrong();
      setTimeout(() => sound.wrong(), 400);
    }
  }, [slots, cables, psuSwitchOn, pcPowerButtonActive]);

  // Check mission completion after telemetry is computed
  useEffect(() => {
    if (telemetry.success) {
      // For RAM upgrade mission, verify that RAM2 is actually installed and properly seated
      if (puzzleData.scenario === 'component_install') {
        if (slots.ram2?.state !== 'properly_seated') {
          return;
        }
      }

      const timer = setTimeout(() => {
        sound.missionComplete();
        onComplete?.();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [telemetry.success, slots.ram2, puzzleData.scenario]);

  const handleResetPuzzle = () => {
    if (window.confirm(t('resetLevelConfirm') || 'Are you sure you want to reset all connections and device positions back to default?')) {
      sound.click();
      setCaseOpen(false);
      setPsuSwitchOn(false);
      setPcPowerButtonActive(false);
      setSelectedSlotId(null);
      setActiveTool('inspect');
      
      setSlots(
        puzzleData.slots.reduce((acc, slot) => {
          const initial = puzzleData.initialHardware?.[slot.id] || { state: 'properly_seated', label: slot.label };
          acc[slot.id] = initial;
          return acc;
        }, {})
      );

      setCables(
        Object.keys(CABLE_DETAILS).reduce((acc, cableId) => {
          const initialConnected = puzzleData.initialCables?.[cableId] !== false;
          acc[cableId] = { connected: initialConnected };
          return acc;
        }, {})
      );
    }
  };

  const handleCasePanelClick = () => {
    sound.mechanical();
    setCaseOpen(true);
  };

  // Perform slot interaction
  const handleSlotInteraction = (slotId, e) => {
    e.stopPropagation();
    if (!caseOpen) return;

    if (activeTool === 'thermal_paste' && slotId === 'cpu') {
      sound.snap();
      setSlots(prev => ({
        ...prev,
        cpu: { ...prev.cpu, state: 'connected' }
      }));
      return;
    }

    if (activeTool === 'clean_dust') {
      sound.mechanical();
      setSlots(prev => ({
        ...prev,
        [slotId]: { ...prev[slotId], state: 'properly_seated' }
      }));
      return;
    }

    // Default: Inspect component
    setSelectedSlotId(slotId);
    sound.click();
  };

  // RAM seating action
  const handleRamSeatToggle = (slotId) => {
    setSlots(prev => {
      const current = prev[slotId];
      if (!current) return prev;
      
      let newState = 'properly_seated';
      if (current.state === 'properly_seated') {
        newState = 'loose';
        sound.wrong();
      } else {
        newState = 'properly_seated';
        sound.snap();
      }
      
      return {
        ...prev,
        [slotId]: { ...current, state: newState }
      };
    });
  };

  // Toggle Cable connection
  const toggleCable = (cableId) => {
    setCables(prev => {
      const current = prev[cableId]?.connected;
      sound.cablePlug();
      return {
        ...prev,
        [cableId]: { connected: !current }
      };
    });
  };

  const selectedSlot = selectedSlotId ? { id: selectedSlotId, ...slots[selectedSlotId] } : null;

  const tutorialSlides = [
    {
      titleEn: "Welcome to PC Repair Lab! 🖥️",
      titleId: "Selamat Datang di Lab Reparasi PC! 🖥️",
      bodyEn: "Your goal is to inspect and resolve physical hardware issues so the PC successfully completes POST (Power-On Self-Test) and boots the operating system.",
      bodyId: "Tujuan Anda adalah memeriksa dan menyelesaikan masalah fisik perangkat keras agar PC berhasil lolos tes POST dan memuat sistem operasi.",
      tipEn: "Tip: The diagnostic log monitor on the right shows active boot status.",
      tipId: "Tips: Monitor log diagnostik di sisi kanan menunjukkan status boot aktif."
    },
    {
      titleEn: "Opening Case & Tools 🔧",
      titleId: "Membuka Casing & Memilih Alat 🔧",
      bodyEn: "1) Click the side tinted glass panel to unscrew and open it. 2) Switch tools from the bottom tray: Inspect to select components, Duster to blow away dust, or Paste to reapply CPU thermal paste.",
      bodyId: "1) Klik panel kaca samping casing untuk melepas sekrup dan membukanya. 2) Ganti alat di baki bawah: Inspect untuk memilih komponen, Duster untuk meniup debu, atau Paste untuk memberi thermal paste CPU.",
      tipEn: "Tip: Select Inspect tool and click component slots to read diagnostics.",
      tipId: "Tips: Pilih alat Inspect dan klik slot komponen untuk membaca diagnosis."
    },
    {
      titleEn: "Component Troubleshooting 🧠",
      titleId: "Troubleshooting Komponen 🧠",
      bodyEn: "Each hardware component can have multiple states: Loose (unseated), Dusty, or Thermal Paste Dried Out. For RAM, toggle the seat action in the sidebar inspector to lock it properly.",
      bodyId: "Masing-masing komponen memiliki beberapa status error: Longgar (loose), Berdebu (dusty), atau Thermal Paste Kering. Untuk RAM, tekan tombol pasang di panel samping agar terkunci.",
      tipEn: "Tip: CPU overheating requires cleaning dust AND applying thermal paste!",
      tipId: "Tips: CPU kepanasan memerlukan pembersihan debu DAN pengolesan thermal paste!"
    },
    {
      titleEn: "Cabling and Power 🔌",
      titleId: "Sambungan Kabel & Daya Listrik 🔌",
      bodyEn: "A motherboard needs power connectors plugged in! In the bottom-right PSU cable manager, toggle cables to connect them. Make sure the ATX 24-Pin, CPU 8-Pin, and GPU Power cables are fully connected.",
      bodyId: "Motherboard butuh kabel daya tercolok! Di bagian kanan bawah pengelola kabel PSU, klik tombol sambungkan kabel. Pastikan kabel daya ATX 24-Pin, CPU 8-Pin, dan GPU sudah tersambung.",
      tipEn: "Tip: Flip the PSU switch ON, then press the case POWER button to boot!",
      tipId: "Tips: Nyalakan saklar PSU ke ON, lalu tekan tombol POWER casing untuk boot!"
    }
  ];

  return (
    <div className="space-y-4">
      {/* Simulation Diagnostic Header */}
      <div className="glass rounded-xl p-4 border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">PC Repair Simulator Workspace</p>
          <p className="text-sm text-[var(--neon-cyan)] font-bold">
            {puzzleData.symptom || 'A faulty PC has arrived at your lab. Diagnose and repair the hardware.'}
          </p>
        </div>

        {/* Action Buttons for Beginners */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => { sound.click(); setCurrentTutorialSlide(0); setShowTutorial(true); }}
            className="px-3 py-1.5 rounded-lg border border-[var(--neon-yellow)]/30 bg-[rgba(255,230,0,0.08)] text-[var(--neon-yellow)] hover:bg-[rgba(255,230,0,0.15)] text-xs font-bold font-mono transition-all flex items-center gap-1.5 shadow-[0_0_8px_rgba(255,230,0,0.1)]"
          >
            <span>🎓</span>
            <span>{lang === 'id' ? 'Tutorial PC' : 'PC Tutorial'}</span>
          </button>
          
          <button
            onClick={() => { sound.click(); setShowGuidebook(true); }}
            className="px-3 py-1.5 rounded-lg border border-[var(--neon-cyan)]/30 bg-[rgba(0,245,255,0.08)] text-[var(--neon-cyan)] hover:bg-[rgba(0,245,255,0.15)] text-xs font-bold font-mono transition-all flex items-center gap-1.5 shadow-[0_0_8px_rgba(0,245,255,0.1)]"
          >
            <span>📖</span>
            <span>{lang === 'id' ? 'Kamus Komponen' : 'Hardware Glossary'}</span>
          </button>

          <button
            onClick={handleResetPuzzle}
            className="px-3 py-1.5 rounded-lg border border-[var(--neon-pink)]/30 bg-[rgba(255,45,120,0.08)] text-[var(--neon-pink)] hover:bg-[rgba(255,45,120,0.15)] text-xs font-bold font-mono transition-all flex items-center gap-1.5 shadow-[0_0_8px_rgba(255,45,120,0.1)]"
          >
            <span>🔄</span>
            <span>{t('resetLevel') || 'Reset Level'}</span>
          </button>
        </div>

        <div className="flex gap-4 text-xs font-mono text-white/40">
          <div className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${telemetry.powered ? 'bg-[var(--neon-green)] animate-pulse' : 'bg-white/20'}`} />
            <span>Motherboard Power</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${telemetry.fansSpinning ? 'bg-[var(--neon-cyan)] animate-pulse' : 'bg-white/20'}`} />
            <span>Coolers RPM</span>
          </div>
        </div>
      </div>

      {/* Main Simulation View: Dual Column (PC View left, Monitor/Log right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Left Column: Interactive PC Case interior */}
        <div className="lg:col-span-2 relative rounded-2xl overflow-hidden border border-white/10" style={{ background: '#040914' }}>
          
          {/* PC SVG view */}
          <svg
            width="100%"
            viewBox="0 0 600 400"
            className="block select-none touch-none"
            style={{ height: 380 }}
          >
            {/* Ambient chassis shadow grid */}
            <defs>
              <pattern id="pcGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.03)" />
              </pattern>
              {/* Fan blades path template */}
              <g id="fanBlades">
                <path d="M 0 0 Q 15 -15 30 -5 Q 15 15 0 0" fill="rgba(255,255,255,0.25)" />
                <path d="M 0 0 Q -15 15 -30 5 Q -15 -15 0 0" fill="rgba(255,255,255,0.25)" />
                <path d="M 0 0 Q -15 -15 -5 -30 Q 15 -15 0 0" fill="rgba(255,255,255,0.25)" />
                <path d="M 0 0 Q 15 15 5 30 Q -15 15 0 0" fill="rgba(255,255,255,0.25)" />
              </g>
            </defs>
            <rect width="100%" height="100%" fill="url(#pcGrid)" />

            {/* PC Case Interior structure */}
            <rect x="30" y="30" width="540" height="340" fill="#08101f" stroke="#1d2e4a" strokeWidth="3" rx="10" />

            {/* Motherboard Backplate */}
            <rect x="180" y="50" width="370" height="250" fill="#0e1b30" stroke="#1d2e4a" strokeWidth="1.5" rx="5" />

            {/* Power Supply Unit (PSU) */}
            <rect x="50" y="270" width="120" height="90" fill="#121824" stroke="#222c3e" strokeWidth="1.5" rx="3" />
            <text x="110" y="315" fill="rgba(255,255,255,0.2)" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              PSU 500W
            </text>

            {/* Render Power Cables (PSU to motherboard sockets) */}
            {/* Render Power Cables (PSU to motherboard sockets) */}
            {/* ATX 24-Pin Cable */}
            {cables[CABLE_IDS.atx24pin]?.connected ? (
              <path
                d="M 170 300 C 230 300, 320 220, 370 200"
                fill="none"
                stroke={CABLE_DETAILS[CABLE_IDS.atx24pin].color}
                strokeWidth={activeHighlightId === CABLE_IDS.atx24pin ? "10" : "6"}
                strokeLinecap="round"
                strokeOpacity={activeHighlightId === CABLE_IDS.atx24pin ? "1" : "0.85"}
                className={`transition-all duration-300 ${activeHighlightId === CABLE_IDS.atx24pin ? 'animate-pulse' : 'animate-pulse'}`}
                style={activeHighlightId === CABLE_IDS.atx24pin ? { filter: 'drop-shadow(0 0 8px [var(--neon-pink)])' } : {}}
              />
            ) : (
              activeHighlightId === CABLE_IDS.atx24pin && (
                <path
                  d="M 170 300 C 230 300, 320 220, 370 200"
                  fill="none"
                  stroke={CABLE_DETAILS[CABLE_IDS.atx24pin].color}
                  strokeWidth="3.5"
                  strokeDasharray="5,5"
                  strokeLinecap="round"
                  className="animate-pulse"
                  style={{ filter: 'drop-shadow(0 0 6px [var(--neon-pink)])' }}
                />
              )
            )}
            
            {/* CPU 8-Pin Cable */}
            {cables[CABLE_IDS.cpu8pin]?.connected ? (
              <path
                d="M 150 270 C 130 180, 160 80, 210 70"
                fill="none"
                stroke={CABLE_DETAILS[CABLE_IDS.cpu8pin].color}
                strokeWidth={activeHighlightId === CABLE_IDS.cpu8pin ? "8" : "4"}
                strokeLinecap="round"
                strokeOpacity={activeHighlightId === CABLE_IDS.cpu8pin ? "1" : "0.85"}
                className="transition-all duration-300"
                style={activeHighlightId === CABLE_IDS.cpu8pin ? { filter: 'drop-shadow(0 0 8px [var(--neon-pink)])' } : {}}
              />
            ) : (
              activeHighlightId === CABLE_IDS.cpu8pin && (
                <path
                  d="M 150 270 C 130 180, 160 80, 210 70"
                  fill="none"
                  stroke={CABLE_DETAILS[CABLE_IDS.cpu8pin].color}
                  strokeWidth="3.5"
                  strokeDasharray="5,5"
                  strokeLinecap="round"
                  className="animate-pulse"
                  style={{ filter: 'drop-shadow(0 0 6px [var(--neon-pink)])' }}
                />
              )
            )}

            {/* GPU 6-Pin Cable */}
            {cables[CABLE_IDS.gpu6pin]?.connected && slots.gpu?.state !== 'unplugged' ? (
              <path
                d="M 170 320 C 240 320, 280 270, 330 250"
                fill="none"
                stroke={CABLE_DETAILS[CABLE_IDS.gpu6pin].color}
                strokeWidth={activeHighlightId === CABLE_IDS.gpu6pin ? "8" : "4"}
                strokeLinecap="round"
                strokeOpacity={activeHighlightId === CABLE_IDS.gpu6pin ? "1" : "0.85"}
                className="transition-all duration-300"
                style={activeHighlightId === CABLE_IDS.gpu6pin ? { filter: 'drop-shadow(0 0 8px [var(--neon-pink)])' } : {}}
              />
            ) : (
              activeHighlightId === CABLE_IDS.gpu6pin && slots.gpu?.state !== 'unplugged' && (
                <path
                  d="M 170 320 C 240 320, 280 270, 330 250"
                  fill="none"
                  stroke={CABLE_DETAILS[CABLE_IDS.gpu6pin].color}
                  strokeWidth="3.5"
                  strokeDasharray="5,5"
                  strokeLinecap="round"
                  className="animate-pulse"
                  style={{ filter: 'drop-shadow(0 0 6px [var(--neon-pink)])' }}
                />
              )
            )}

            {/* SATA Power Cables to Storage */}
            {cables[CABLE_IDS.sataPower]?.connected ? (
              <path
                d="M 170 340 C 250 340, 320 340, 470 340"
                fill="none"
                stroke={CABLE_DETAILS[CABLE_IDS.sataPower].color}
                strokeWidth={activeHighlightId === CABLE_IDS.sataPower ? "7.5" : "3.5"}
                strokeLinecap="round"
                strokeOpacity={activeHighlightId === CABLE_IDS.sataPower ? "1" : "0.8"}
                className="transition-all duration-300"
                style={activeHighlightId === CABLE_IDS.sataPower ? { filter: 'drop-shadow(0 0 8px [var(--neon-pink)])' } : {}}
              />
            ) : (
              activeHighlightId === CABLE_IDS.sataPower && (
                <path
                  d="M 170 340 C 250 340, 320 340, 470 340"
                  fill="none"
                  stroke={CABLE_DETAILS[CABLE_IDS.sataPower].color}
                  strokeWidth="3.5"
                  strokeDasharray="5,5"
                  strokeLinecap="round"
                  className="animate-pulse"
                  style={{ filter: 'drop-shadow(0 0 6px [var(--neon-pink)])' }}
                />
              )
            )}

            {/* SATA Data Cable to Storage */}
            {cables[CABLE_IDS.sataData]?.connected ? (
              <path
                d="M 430 280 C 430 310, 440 320, 470 330"
                fill="none"
                stroke={CABLE_DETAILS[CABLE_IDS.sataData].color}
                strokeWidth={activeHighlightId === CABLE_IDS.sataData ? "6" : "2.5"}
                strokeLinecap="round"
                strokeOpacity={activeHighlightId === CABLE_IDS.sataData ? "1" : "0.8"}
                className="transition-all duration-300"
                style={activeHighlightId === CABLE_IDS.sataData ? { filter: 'drop-shadow(0 0 8px [var(--neon-pink)])' } : {}}
              />
            ) : (
              activeHighlightId === CABLE_IDS.sataData && (
                <path
                  d="M 430 280 C 430 310, 440 320, 470 330"
                  fill="none"
                  stroke={CABLE_DETAILS[CABLE_IDS.sataData].color}
                  strokeWidth="3.5"
                  strokeDasharray="5,5"
                  strokeLinecap="round"
                  className="animate-pulse"
                  style={{ filter: 'drop-shadow(0 0 6px [var(--neon-pink)])' }}
                />
              )
            )}

            {/* Front Panel Connector Cable */}
            {cables[CABLE_IDS.frontPanel]?.connected ? (
              <path
                d="M 540 370 C 500 370, 480 340, 480 290"
                fill="none"
                stroke={CABLE_DETAILS[CABLE_IDS.frontPanel].color}
                strokeWidth={activeHighlightId === CABLE_IDS.frontPanel ? "5" : "2"}
                strokeLinecap="round"
                strokeOpacity={activeHighlightId === CABLE_IDS.frontPanel ? "1" : "0.8"}
                className="transition-all duration-300"
                style={activeHighlightId === CABLE_IDS.frontPanel ? { filter: 'drop-shadow(0 0 8px [var(--neon-pink)])' } : {}}
              />
            ) : (
              activeHighlightId === CABLE_IDS.frontPanel && (
                <path
                  d="M 540 370 C 500 370, 480 340, 480 290"
                  fill="none"
                  stroke={CABLE_DETAILS[CABLE_IDS.frontPanel].color}
                  strokeWidth="3.5"
                  strokeDasharray="5,5"
                  strokeLinecap="round"
                  className="animate-pulse"
                  style={{ filter: 'drop-shadow(0 0 6px [var(--neon-pink)])' }}
                />
              )
            )}

            {/* CPU Socket & Cooler Fan */}
            <g
              onClick={(e) => handleSlotInteraction('cpu', e)}
              onTouchStart={(e) => { e.preventDefault(); e.stopPropagation(); handleSlotInteraction('cpu', e); }}
              className="cursor-pointer"
            >
              {(activeHighlightId === 'cpu' || activeHighlightId === 'cooler') && (
                <rect x="247" y="77" width="86" height="86" fill="none" stroke="[var(--neon-pink)]" strokeWidth="3" rx="5" className="animate-pulse" style={{ filter: 'drop-shadow(0 0 6px [var(--neon-pink)])' }} />
              )}
              {/* Motherboard socket frame */}
              <rect x="250" y="80" width="80" height="80" fill="#172740" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" rx="4" />
              {/* Heatsink Fins */}
              <rect x="255" y="85" width="70" height="70" fill="#253754" rx="2" />
              
              {/* CPU Fan Cooler blades */}
              <circle cx="290" cy="120" r="28" fill="#101a2c" stroke="#ff2d78" strokeWidth="1.5" strokeOpacity="0.5" />
              {/* Fan rotation block */}
              <g
                transform={`translate(290, 120)`}
                className={telemetry.fansSpinning && cables[CABLE_IDS.fanHeader]?.connected ? 'animate-spin' : ''}
                style={{ transformOrigin: '0px 0px', animationDuration: '0.8s' }}
              >
                <use href="#fanBlades" />
              </g>
              <circle cx="290" cy="120" r="8" fill="#1f2d44" stroke="#ff2d78" strokeWidth="1" />
              <text x="290" y="152" fill="white" fillOpacity="0.6" fontSize="7" fontFamily="monospace" textAnchor="middle">
                COOLER
              </text>
            </g>

            {/* RAM Slots */}
            {/* Slot A1 */}
            <g
              onClick={(e) => handleSlotInteraction('ram1', e)}
              onTouchStart={(e) => { e.preventDefault(); e.stopPropagation(); handleSlotInteraction('ram1', e); }}
              className="cursor-pointer"
            >
              {activeHighlightId === 'ram1' && (
                <rect x="357" y="77" width="14" height="86" fill="none" stroke="[var(--neon-pink)]" strokeWidth="2.5" rx="2" className="animate-pulse" style={{ filter: 'drop-shadow(0 0 6px [var(--neon-pink)])' }} />
              )}
              <rect x="360" y="80" width="8" height="80" fill="#1b2535" rx="1" />
              {slots.ram1?.state !== 'unplugged' && (
                <rect
                  x="361"
                  y={slots.ram1.state === 'loose' ? 84 : 80}
                  width="6"
                  height="80"
                  fill="#00f5ff"
                  fillOpacity="0.9"
                  stroke={slots.ram1.state === 'loose' ? '[var(--neon-pink)]' : 'none'}
                  strokeWidth="1"
                  className="transition-all duration-300"
                />
              )}
              <text x="364" y="170" fill="white" fillOpacity="0.4" fontSize="6" fontFamily="monospace" textAnchor="middle">
                DIMM A1
              </text>
            </g>
            
            {/* Slot B1 */}
            <g
              onClick={(e) => handleSlotInteraction('ram2', e)}
              onTouchStart={(e) => { e.preventDefault(); e.stopPropagation(); handleSlotInteraction('ram2', e); }}
              className="cursor-pointer"
            >
              {activeHighlightId === 'ram2' && (
                <rect x="377" y="77" width="14" height="86" fill="none" stroke="[var(--neon-pink)]" strokeWidth="2.5" rx="2" className="animate-pulse" style={{ filter: 'drop-shadow(0 0 6px [var(--neon-pink)])' }} />
              )}
              <rect x="380" y="80" width="8" height="80" fill="#1b2535" rx="1" />
              {slots.ram2?.state !== 'unplugged' && (
                <rect
                  x="381"
                  y={slots.ram2.state === 'loose' ? 84 : 80}
                  width="6"
                  height="80"
                  fill="#00f5ff"
                  fillOpacity="0.9"
                  stroke={slots.ram2.state === 'loose' ? '[var(--neon-pink)]' : 'none'}
                  strokeWidth="1"
                  className="transition-all duration-300"
                />
              )}
              <text x="384" y="170" fill="white" fillOpacity="0.4" fontSize="6" fontFamily="monospace" textAnchor="middle">
                DIMM B1
              </text>
            </g>

            {/* Graphics Card (GPU) */}
            <g
              onClick={(e) => handleSlotInteraction('gpu', e)}
              onTouchStart={(e) => { e.preventDefault(); e.stopPropagation(); handleSlotInteraction('gpu', e); }}
              className="cursor-pointer"
            >
              {activeHighlightId === 'gpu' && (
                <rect x="197" y="177" width="236" height="42" fill="none" stroke="[var(--neon-pink)]" strokeWidth="2.5" rx="4" className="animate-pulse" style={{ filter: 'drop-shadow(0 0 6px [var(--neon-pink)])' }} />
              )}
              {/* PCIe Slot connector line */}
              <rect x="220" y="210" width="220" height="6" fill="#172740" rx="1" />
              
              {slots.gpu?.state !== 'unplugged' && (
                <g>
                  {/* GPU Shroud board */}
                  <rect x="200" y="180" width="230" height="30" fill="#131c2c" stroke="#00f5ff" strokeWidth="1.5" strokeOpacity="0.4" rx="3" />
                  {/* GPU Logo / Fan details */}
                  <circle cx="270" cy="195" r="10" fill="#1b2535" />
                  <circle cx="340" cy="195" r="10" fill="#1b2535" />
                  <text x="315" y="198" fill="white" fillOpacity="0.3" fontSize="8" fontFamily="monospace" textAnchor="middle">
                    GEFORCE
                  </text>
                </g>
              )}
              <text x="315" y="228" fill="white" fillOpacity="0.4" fontSize="7" fontFamily="monospace" textAnchor="middle">
                PCIe GPU SLOT
              </text>
            </g>

            {/* Storage (SSD) Drive Bay */}
            <g
              onClick={(e) => handleSlotInteraction('ssd', e)}
              onTouchStart={(e) => { e.preventDefault(); e.stopPropagation(); handleSlotInteraction('ssd', e); }}
              className="cursor-pointer"
            >
              {activeHighlightId === 'ssd' && (
                <rect x="467" y="297" width="76" height="51" fill="none" stroke="[var(--neon-pink)]" strokeWidth="2.5" rx="3" className="animate-pulse" style={{ filter: 'drop-shadow(0 0 6px [var(--neon-pink)])' }} />
              )}
              <rect x="470" y="300" width="70" height="45" fill="#141a24" stroke="rgba(255,255,255,0.15)" strokeWidth="1" rx="2" />
              {slots.ssd?.state !== 'unplugged' && (
                <rect x="473" y="303" width="64" height="39" fill="#2d3a4e" rx="1" />
              )}
              <text x="505" y="326" fill="white" fillOpacity="0.5" fontSize="8" fontFamily="monospace" textAnchor="middle">
                SATA SSD
              </text>
            </g>

            {/* Semi-transparent tinted Case Glass Panel Cover */}
            <AnimatePresence>
              {!caseOpen && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ x: 500, opacity: 0 }}
                  transition={{ type: 'spring', damping: 20 }}
                  onClick={handleCasePanelClick}
                  onTouchStart={(e) => { e.preventDefault(); e.stopPropagation(); handleCasePanelClick(e); }}
                  className="cursor-pointer"
                >
                  {/* Side panel tinted glass layout */}
                  <rect x="30" y="30" width="540" height="340" fill="rgba(0, 245, 255, 0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="3" rx="10" />
                  
                  {/* Hexagon pattern inside glass overlay */}
                  <rect x="40" y="40" width="520" height="320" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeDasharray="5,5" />
                  
                  {/* Case screws */}
                  <circle cx="45" cy="45" r="6" fill="#2d3748" stroke="#1a202c" strokeWidth="1" />
                  <circle cx="555" cy="45" r="6" fill="#2d3748" stroke="#1a202c" strokeWidth="1" />
                  <circle cx="45" cy="355" r="6" fill="#2d3748" stroke="#1a202c" strokeWidth="1" />
                  <circle cx="555" cy="355" r="6" fill="#2d3748" stroke="#1a202c" strokeWidth="1" />
                  
                  {/* Click overlay notice */}
                  <rect x="180" y="170" width="240" height="50" fill="black" fillOpacity="0.8" rx="8" stroke="[var(--neon-cyan)]" strokeWidth="1" />
                  <text x="300" y="200" fill="white" fontSize="11" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
                    🔧 CLICK TO REMOVE SIDE PANEL
                  </text>
                </motion.g>
              )}
            </AnimatePresence>
          </svg>
        </div>

        {/* Right Column: Lab Telemetry Monitor Screen */}
        <div className="flex flex-col gap-4">
          
          {/* Diagnostic Monitor Monitor screen */}
          <div className="glass border border-white/10 rounded-2xl p-4 flex flex-col justify-between bg-black">
            <h3 className="text-xs font-black text-white/40 uppercase tracking-widest border-b border-white/10 pb-2 mb-3">
              🖥️ Lab Monitor Diagnostic Log
            </h3>
            
            <div className="bg-black/90 p-3.5 rounded-xl border border-white/5 font-mono text-[11px] text-[var(--neon-green)] min-h-[160px] max-h-[220px] overflow-y-auto space-y-1 select-text">
              {telemetry.bootState === 'off' ? (
                <div className="text-white/20 italic text-xs h-full flex flex-col items-center justify-center py-10">
                  <span>⚡ SYSTEM POWERED OFF</span>
                  <span className="text-[9px] uppercase mt-1">Press Power button below to boot</span>
                </div>
              ) : (
                (telemetry.displayMsg || '').split('\n').map((line, i) => (
                  <p key={i} className={
                    telemetry.bootState === 'success' ? 'text-[var(--neon-green)]' :
                    telemetry.bootState === 'thermal_shutdown' ? 'text-[var(--neon-orange)] font-bold' :
                    'text-[var(--neon-pink)]'
                  }>
                    {line}
                  </p>
                ))
              )}
            </div>

            {/* External Controls: Front Power button & PSU rocker switch */}
            <div className="flex gap-3 mt-4">
              {/* Case Power Button */}
              <button
                onClick={() => {
                  sound.click();
                  if (!cables[CABLE_IDS.frontPanel]?.connected) {
                    sound.wrong();
                    return;
                  }
                  setPcPowerButtonActive(!pcPowerButtonActive);
                }}
                className={`flex-1 py-2.5 rounded-xl font-bold font-mono text-xs border transition-all ${
                  pcPowerButtonActive && cables[CABLE_IDS.frontPanel]?.connected
                    ? 'bg-[rgba(57,255,20,0.12)] border-[var(--neon-green)] text-[var(--neon-green)]'
                    : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                }`}
              >
                🔴 PC Power Button
              </button>

              {/* PSU Switch on/off */}
              <button
                onClick={() => {
                  sound.click();
                  setPsuSwitchOn(!psuSwitchOn);
                  if (pcPowerButtonActive) {
                    setPcPowerButtonActive(false);
                  }
                }}
                className={`px-3 py-2.5 rounded-xl font-bold font-mono text-xs border transition-all ${
                  psuSwitchOn
                    ? 'bg-[rgba(0,245,255,0.12)] border-[var(--neon-cyan)] text-[var(--neon-cyan)]'
                    : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
                }`}
              >
                🔌 PSU: {psuSwitchOn ? 'I' : 'O'}
              </button>
            </div>
            {/* Troubleshooting Advisor */}
            {advice && (
              <div className="mt-4 border border-[var(--neon-orange)]/30 bg-[rgba(255,107,0,0.03)] rounded-xl p-3.5 space-y-2 animate-pulse-slow">
                <div className="flex items-center gap-1.5 text-[var(--neon-orange)] text-[10.5px] uppercase font-orbitron font-black tracking-wider">
                  <span>⚠️</span>
                  <span>{lang === 'id' ? 'Asisten Diagnostik' : 'Diagnostic Assistant'}</span>
                </div>
                <div className="text-xs">
                  <p className="font-bold text-white mb-0.5">{advice.title}</p>
                  <p className="text-white/60 mb-2 leading-relaxed text-[11px]">
                    <strong className="text-white">{lang === 'id' ? 'Penyebab:' : 'Why:'} </strong>
                    {advice.why}
                  </p>
                  <div className="bg-black/45 border border-white/5 p-2.5 rounded-lg text-[11px] text-[var(--neon-cyan)] leading-relaxed">
                    <strong className="text-white">{lang === 'id' ? 'Solusi:' : 'How to Fix:'} </strong>
                    {advice.todo}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Interaction tools selector */}
          <div className="glass border border-white/10 rounded-2xl p-4">
            <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2">Workspace Diagnostic Tools</h4>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => { sound.click(); setActiveTool('inspect'); }}
                className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                  activeTool === 'inspect'
                    ? 'border-white bg-white/10 text-white'
                    : 'border-white/5 text-white/50 hover:border-white/10'
                }`}
              >
                🖐️ Inspect
              </button>
              <button
                onClick={() => { sound.click(); setActiveTool('thermal_paste'); }}
                className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                  activeTool === 'thermal_paste'
                    ? 'border-[var(--neon-cyan)] bg-[rgba(0,245,255,0.1)] text-[var(--neon-cyan)]'
                    : 'border-white/5 text-white/50 hover:border-white/10'
                }`}
              >
                🧪 Paste CPU
              </button>
              <button
                onClick={() => { sound.click(); setActiveTool('clean_dust'); }}
                className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                  activeTool === 'clean_dust'
                    ? 'border-[var(--neon-green)] bg-[rgba(57,255,20,0.1)] text-[var(--neon-green)]'
                    : 'border-white/5 text-white/50 hover:border-white/10'
                }`}
              >
                🧹 Duster
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Properties Inspector & Cable Tracing Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Component Slot Inspector details */}
        <div className="glass rounded-2xl border border-white/10 p-4 min-h-[200px] flex flex-col">
          <h3 className="text-xs font-black text-white/40 uppercase tracking-widest border-b border-white/10 pb-2 mb-3">
            🔧 Component Inspector details
          </h3>

          <AnimatePresence mode="wait">
            {selectedSlot ? (
              <motion.div
                key={selectedSlot.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex-1 flex flex-col justify-between text-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-white text-sm">{selectedSlot.label || selectedSlot.id.toUpperCase()}</h4>
                    <span className="text-[10px] font-mono text-white/40 uppercase">Slot: {selectedSlot.id}</span>
                  </div>

                  <div className="space-y-2 font-mono">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-white/40">Status:</span>
                      <span className={`font-bold ${
                        selectedSlot.state === 'properly_seated' ? 'text-[var(--neon-green)]' :
                        selectedSlot.state === 'loose' ? 'text-[var(--neon-pink)] animate-pulse' :
                        'text-white/60'
                      }`}>
                        {selectedSlot.state === 'properly_seated' ? '✓ Properly Seated' :
                         selectedSlot.state === 'loose' ? '⚠️ Loose / Incorrectly inserted' :
                         selectedSlot.state === 'thermal_paste_dried' ? '⚠️ Thermal Paste Dried Out' :
                         'Empty / Unplugged'}
                      </span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-white/40">Temperature:</span>
                      <span className="text-white/80">
                        {selectedSlot.id === 'cpu' 
                          ? `${telemetry.fansSpinning ? telemetry.cpuTemp : 35}°C` 
                          : 'Normal'}
                      </span>
                    </div>
                  </div>

                  {/* Device Glossary Description Card */}
                  {COMPONENT_GLOSSARY[selectedSlot.id] && (
                    <div className="mt-3 bg-[rgba(0,245,255,0.03)] border border-[rgba(0,245,255,0.12)] p-2.5 rounded-xl text-xs">
                      <div className="flex items-center gap-1.5 mb-1 text-[var(--neon-cyan)] font-bold font-mono text-[10px] uppercase">
                        <span>💡</span>
                        <span>{COMPONENT_GLOSSARY[selectedSlot.id].title[lang] || COMPONENT_GLOSSARY[selectedSlot.id].title['en']}</span>
                      </div>
                      <p className="text-white/70 leading-relaxed text-[10px] font-sans">
                        {COMPONENT_GLOSSARY[selectedSlot.id].desc[lang] || COMPONENT_GLOSSARY[selectedSlot.id].desc['en']}
                      </p>
                    </div>
                  )}

                  {/* Context Actions for slots */}
                  <div className="mt-4 flex gap-2">
                    {selectedSlot.state === 'unplugged' && (
                      <button
                        onClick={() => {
                          setSlots(prev => ({
                            ...prev,
                            [selectedSlot.id]: {
                              state: 'loose', // Start as loose so they have to seat/lock it!
                              label: selectedSlot.id === 'ram2' ? 'DDR4 8GB Stick' : 
                                     selectedSlot.id === 'gpu' ? 'Nvidia GTX 1660' : 
                                     selectedSlot.id === 'ssd' ? 'SATA SSD' : 'Component'
                            }
                          }));
                          sound.snap();
                        }}
                        className="px-4 py-2 rounded-xl text-xs font-bold border bg-[rgba(0,245,255,0.12)] border-[var(--neon-cyan)] text-[var(--neon-cyan)] hover:bg-[rgba(0,245,255,0.2)] transition-all"
                      >
                        {lang === 'id' ? '🔌 Pasang Komponen Baru' : '🔌 Install New Component'}
                      </button>
                    )}
                    {selectedSlot.id.startsWith('ram') && selectedSlot.state !== 'unplugged' && (
                      <button
                        onClick={() => handleRamSeatToggle(selectedSlot.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                          selectedSlot.state === 'loose'
                            ? 'bg-[rgba(57,255,20,0.12)] border-[var(--neon-green)] text-[var(--neon-green)]'
                            : 'bg-[rgba(255,45,120,0.12)] border-[var(--neon-pink)] text-[var(--neon-pink)]'
                        }`}
                      >
                        {selectedSlot.state === 'loose' ? '🔒 Seat RAM Correctly' : '🔓 Unseat RAM (Make Loose)'}
                      </button>
                    )}
                    {selectedSlot.id === 'cpu' && selectedSlot.state === 'thermal_paste_dried' && (
                      <p className="text-[10px] text-[var(--neon-orange)] italic">
                        Select "Paste CPU" tool and click on the CPU fan/mount to reapply thermal paste.
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-white/30 text-xs">
                <span className="text-3xl mb-2">🔎</span>
                <p>Click any slot (RAM, GPU, CPU cooler, SSD) in the chassis above to inspect its telemetry and run diagnostics.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Cable Tracing and Connection Manager */}
        <div className="glass rounded-2xl border border-white/10 p-4 min-h-[200px] flex flex-col">
          <h3 className="text-xs font-black text-white/40 uppercase tracking-widest border-b border-white/10 pb-2 mb-3">
            🔌 Power Supply Cable Manager
          </h3>

          <div className="flex-1 overflow-y-auto space-y-2 max-h-[220px] pr-1 text-xs">
            {Object.entries(CABLE_DETAILS).map(([cableId, details]) => {
              const isConnected = cables[cableId]?.connected;
              
              // Skip GPU power if no GPU card is in
              if (cableId === CABLE_IDS.gpu6pin && slots.gpu?.state === 'unplugged') return null;

              return (
                <div
                  key={cableId}
                  className={`flex items-center justify-between p-2 rounded-xl border transition-all ${
                    activeHighlightId === cableId
                      ? 'border-[var(--neon-pink)] bg-[rgba(255,45,120,0.08)] shadow-[0_0_12px_rgba(255,45,120,0.2)] animate-pulse'
                      : 'bg-white/[0.02] border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {/* Color dot matching SVG wire */}
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: details.color }} />
                    <span className="font-mono text-white/80">{details.label}</span>
                  </div>

                  <button
                    onClick={() => toggleCable(cableId)}
                    className={`px-3 py-1.5 rounded-lg font-bold font-mono text-[10px] border transition-all ${
                      isConnected
                        ? 'bg-[rgba(57,255,20,0.08)] border-[var(--neon-green)]/30 text-[var(--neon-green)] hover:bg-[rgba(57,255,20,0.15)]'
                        : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
                    }`}
                  >
                    {isConnected ? '🟢 CONNECTED' : '🔌 DISCONNECTED'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Onboarding Tutorial Modal */}
      <AnimatePresence>
        {showTutorial && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass border border-[var(--neon-yellow)] max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl relative"
              style={{ background: '#070b15' }}
            >
              {/* Top title */}
              <div className="border-b border-white/10 p-3 sm:p-4 flex items-center justify-between bg-[rgba(255,230,0,0.03)]">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎓</span>
                  <h3 className="font-orbitron font-black text-[10px] uppercase tracking-widest text-[var(--neon-yellow)]">
                    {lang === 'id' ? 'Tutorial Onboarding Reparasi PC' : 'PC Repair Simulator Onboarding'}
                  </h3>
                </div>
                <button
                  onClick={() => { sound.click(); setShowTutorial(false); }}
                  className="text-white/40 hover:text-white transition-colors font-bold text-xs"
                >
                  ✕
                </button>
              </div>

              {/* Slide content */}
              <div className="p-4 sm:p-6 space-y-4">
                <div className="flex items-center justify-center py-6 bg-black/40 rounded-xl border border-white/5 text-4xl">
                  {currentTutorialSlide === 0 && '🖥️'}
                  {currentTutorialSlide === 1 && '🔧'}
                  {currentTutorialSlide === 2 && '🧠'}
                  {currentTutorialSlide === 3 && '🔌'}
                </div>
                <h4 className="font-bold text-white text-base">
                  {lang === 'id' ? tutorialSlides[currentTutorialSlide].titleId : tutorialSlides[currentTutorialSlide].titleEn}
                </h4>
                <p className="text-white/70 text-xs leading-relaxed">
                  {lang === 'id' ? tutorialSlides[currentTutorialSlide].bodyId : tutorialSlides[currentTutorialSlide].bodyEn}
                </p>
                <div className="bg-[rgba(255,230,0,0.05)] border border-[rgba(255,230,0,0.15)] p-2.5 rounded-lg text-[11px] text-[var(--neon-yellow)] font-medium">
                  {lang === 'id' ? tutorialSlides[currentTutorialSlide].tipId : tutorialSlides[currentTutorialSlide].tipEn}
                </div>
              </div>

              {/* Bottom navigation */}
              <div className="border-t border-white/10 p-3 sm:p-4 flex items-center justify-between bg-black/20">
                <div className="flex gap-1.5">
                  {tutorialSlides.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentTutorialSlide ? 'bg-[var(--neon-yellow)] w-4' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  {currentTutorialSlide > 0 && (
                    <button
                      onClick={() => { sound.click(); setCurrentTutorialSlide(prev => prev - 1); }}
                      className="px-3 py-1.5 border border-white/10 hover:border-white/20 text-white text-xs font-semibold rounded-lg transition-all"
                    >
                      {lang === 'id' ? 'Kembali' : 'Back'}
                    </button>
                  )}
                  {currentTutorialSlide < tutorialSlides.length - 1 ? (
                    <button
                      onClick={() => { sound.click(); setCurrentTutorialSlide(prev => prev + 1); }}
                      className="btn-game px-4 py-1.5 text-xs font-bold font-mono"
                      style={{ '--neon-color': 'var(--neon-yellow)' }}
                    >
                      {lang === 'id' ? 'Lanjut ➔' : 'Next ➔'}
                    </button>
                  ) : (
                    <button
                      onClick={() => { sound.click(); setShowTutorial(false); }}
                      className="bg-[var(--neon-green)] border border-[var(--neon-green)] text-black hover:opacity-90 font-bold px-4 py-1.5 text-xs rounded-lg transition-all"
                    >
                      {lang === 'id' ? 'Mulai Bermain!' : 'Let\'s Play!'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hardware Component Glossary Guidebook Modal */}
      <AnimatePresence>
        {showGuidebook && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass border border-[var(--neon-cyan)] max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[80vh]"
              style={{ background: '#070b15' }}
            >
              {/* Top title */}
              <div className="border-b border-white/10 p-3 sm:p-4 flex items-center justify-between bg-[rgba(0,245,255,0.03)]">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📖</span>
                  <h3 className="font-orbitron font-black text-[10px] uppercase tracking-widest text-[var(--neon-cyan)]">
                    {lang === 'id' ? 'Kamus Komponen Perangkat Keras PC' : 'PC Hardware Component Glossary'}
                  </h3>
                </div>
                <button
                  onClick={() => { sound.click(); setShowGuidebook(false); }}
                  className="text-white/40 hover:text-white transition-colors font-bold text-xs"
                >
                  ✕
                </button>
              </div>

              {/* Glossary list */}
              <div className="p-3 sm:p-6 space-y-3 sm:space-y-4 overflow-y-auto flex-1">
                <p className="text-xs text-white/50 leading-relaxed mb-2">
                  {lang === 'id'
                    ? 'Berikut adalah penjelasan komponen perangkat keras komputer yang dipelajari di laboratorium. Klik/lihat peran masing-masing komponen.'
                    : 'Here is an overview of the hardware components configured in the laboratory. Learn their roles.'}
                </p>

                <div className="space-y-3.5">
                  {Object.entries(COMPONENT_GLOSSARY).map(([key, item]) => {
                    return (
                      <div key={key} className="bg-white/[0.02] border border-white/5 hover:border-white/10 p-3 sm:p-3.5 rounded-xl transition-all">
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <span className="text-2xl bg-black/45 w-10 h-10 rounded-lg flex items-center justify-center border border-white/5">
                            {key === 'cpu' && '🧠'}
                            {key === 'cooler' && '🌬️'}
                            {key === 'ram1' && '📼'}
                            {key === 'ram2' && '📼'}
                            {key === 'gpu' && '🎮'}
                            {key === 'ssd' && '💽'}
                          </span>
                          <div>
                            <h4 className="font-bold text-white text-sm">{item.title[lang] || item.title['en']}</h4>
                            <span className="text-[9px] uppercase tracking-wider font-mono text-[var(--neon-cyan)] font-bold">Slot ID: {key}</span>
                          </div>
                        </div>
                        <p className="text-white/70 text-xs leading-relaxed font-sans">
                          {item.desc[lang] || item.desc['en']}
                        </p>
                        {item.realWorldLook && (
                          <div className="mt-2 text-[11px] text-white/50 bg-black/25 p-2 rounded-lg border border-white/5 font-sans leading-relaxed">
                            <strong className="text-white">{lang === 'id' ? '🔍 Bentuk Asli:' : '🔍 Real-World Look:'} </strong>
                            {item.realWorldLook[lang] || item.realWorldLook['en']}
                          </div>
                        )}
                        {item.videoUrl && (
                          <div className="mt-2.5">
                            <a
                              href={item.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-[11px] text-[var(--neon-cyan)] hover:underline font-mono"
                            >
                              <span>🎥</span>
                              <span className="font-bold">{lang === 'id' ? 'Tonton Video Tutorial Youtube' : 'Watch Youtube Video Tutorial'}</span>
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom close */}
              <div className="border-t border-white/10 p-3 sm:p-4 bg-black/20 text-right">
                <button
                  onClick={() => { sound.click(); setShowGuidebook(false); }}
                  className="btn-game px-5 py-2 text-xs font-bold font-mono"
                  style={{ '--neon-color': 'var(--neon-cyan)' }}
                >
                  {lang === 'id' ? 'Tutup Kamus' : 'Close Glossary'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function getPCDiagnosticAdvice(telemetry, slots, cables, psuSwitchOn, pcPowerButtonActive, lang) {
  const isId = lang === 'id';
  
  if (telemetry.success) return null;

  // 1. Check if power is actually on
  if (!psuSwitchOn) {
    return {
      title: isId ? "Sistem Belum Menerima Listrik" : "System Lacks Electricity",
      why: isId ? "Sakelar daya Power Supply (PSU) di bagian belakang casing PC masih dalam posisi OFF." : "The PSU power toggle switch at the back of the computer is turned OFF.",
      todo: isId ? "Klik sakelar daya merah/hitam di bagian belakang PSU agar menyala (ON)." : "Toggle the PSU switch at the back of the casing to ON."
    };
  }

  const hasFrontPanel = cables.frontPanel?.connected;
  if (!hasFrontPanel) {
    return {
      title: isId ? "Tombol Daya Casing Belum Terhubung" : "Case Power Button Disconnected",
      why: isId ? "Kabel Front Panel (putih) yang menghubungkan tombol daya depan PC ke motherboard belum terpasang." : "The Front Panel connector from the chassis power button is not plugged into the motherboard.",
      todo: isId ? "Hubungkan kabel Front Panel (putih) ke port pin panel depan di kanan bawah motherboard." : "Connect the white Front Panel header wire to the front panel pins on the motherboard."
    };
  }

  const hasAtxPower = cables.atx24pin?.connected;
  const hasCpuPower = cables.cpu8pin?.connected;
  if (!hasAtxPower || !hasCpuPower) {
    return {
      title: isId ? "Motherboard Tidak Mendapat Daya" : "Motherboard Lacks Main Power",
      why: isId ? "Kabel daya utama ATX 24-Pin atau CPU 8-Pin dari PSU belum tercolok ke motherboard." : "The main ATX 24-Pin or auxiliary CPU 8-Pin cable from the power supply is disconnected.",
      todo: isId 
        ? `Colokkan kabel: ${!hasAtxPower ? 'ATX 24-Pin (kuning besar)' : ''} ${!hasAtxPower && !hasCpuPower ? 'dan' : ''} ${!hasCpuPower ? 'CPU 8-Pin (oranye)' : ''} ke port motherboard.` 
        : `Plug in: ${!hasAtxPower ? 'ATX 24-Pin (large yellow)' : ''} ${!hasAtxPower && !hasCpuPower ? 'and' : ''} ${!hasCpuPower ? 'CPU 8-Pin (orange)' : ''} on the motherboard.`
    };
  }

  if (!pcPowerButtonActive) {
    return {
      title: isId ? "Komputer Siap Dinyalakan" : "PC Ready to Power On",
      why: isId ? "Daya listrik sudah masuk, tetapi Anda belum menekan tombol daya casing depan." : "The system is receiving power standby, but the front panel power button is not pressed.",
      todo: isId ? "Klik tombol daya 'PC Power Button' (bulat merah) di bawah layar diagnostik untuk booting." : "Click the red circular 'PC Power Button' underneath the diagnostic log to boot."
    };
  }

  // If power button is active and we have power:
  if (telemetry.bootState === 'ram_error') {
    const ram1 = slots.ram1 || { state: 'unplugged' };
    const ram2 = slots.ram2 || { state: 'unplugged' };
    const ram1Loose = ram1.state === 'loose';
    const ram2Loose = ram2.state === 'loose';
    const noRam = ram1.state === 'unplugged' && ram2.state === 'unplugged';

    return {
      title: isId ? "Gagal POST - Masalah RAM (3 Bip)" : "POST Failure - RAM Issue (3 Beeps)",
      why: noRam 
        ? (isId ? "Motherboard tidak mendeteksi adanya keping memori RAM terpasang." : "The motherboard BIOS detects no memory modules installed in the slots.")
        : (isId ? "Keping RAM terpasang tetapi posisinya longgar atau tidak terkunci rapat." : "One or more RAM sticks are installed but loose and not properly seated."),
      todo: noRam
        ? (isId ? "Klik slot DIMM A1 kosong lalu pasang keping RAM baru." : "Select the empty DIMM A1 slot and click 'Install New Component'.")
        : (isId ? "Klik slot RAM berwarna merah/longgar, lalu klik 'Seat RAM Correctly' (Kunci RAM) di panel inspeksi." : "Select the loose RAM slot and click 'Seat RAM Correctly' in the inspector panel.")
    };
  }

  if (telemetry.bootState === 'no_display') {
    return {
      title: isId ? "Gagal POST - Kartu Grafis Hilang" : "POST Failure - GPU Missing",
      why: isId ? "Sistem tidak memiliki kartu grafis (GPU) untuk mengirim sinyal video ke monitor." : "The system requires a dedicated GPU in the PCIe slot to send video signal to the display.",
      todo: isId ? "Klik slot PCIe x16 kosong di motherboard lalu pasang kartu grafis (GPU)." : "Select the empty PCIe x16 slot on the motherboard and install a GPU."
    };
  }

  if (telemetry.bootState === 'no_gpu_power') {
    return {
      title: isId ? "Gagal POST - Daya GPU Terputus" : "POST Failure - GPU Power Missing",
      why: isId ? "Kartu grafis (GPU) terpasang tetapi kabel daya tambahan PCIe 6-Pin dari PSU belum terhubung." : "The GPU is seated in the slot but its auxiliary PCIe 6-Pin power cord is disconnected.",
      todo: isId ? "Hubungkan kabel PCIe 6-Pin (ungu) dari power supply ke port daya GPU di kanan atas." : "Connect the purple PCIe 6-Pin power cable from the PSU to the GPU connector port."
    };
  }

  if (telemetry.bootState === 'no_bootable_device') {
    const ssd = slots.ssd || { state: 'unplugged' };
    const isSataPower = cables.sataPower?.connected;
    const isSataData = cables.sataData?.connected;

    return {
      title: isId ? "Gagal Boot - SSD Terputus (No Bootable Device)" : "Boot Failure - SSD Disconnected (No Bootable Device)",
      why: ssd.state === 'unplugged'
        ? (isId ? "Penyimpanan SSD berisi sistem operasi belum terpasang di PC." : "The SSD storage drive containing the OS is missing from the chassis drive bay.")
        : (isId ? "SSD terpasang tetapi kabel data SATA atau kabel daya SATA dari PSU terputus." : "The SSD is placed but lacks either the SATA Data or SATA Power cable connectivity."),
      todo: ssd.state === 'unplugged'
        ? (isId ? "Klik area Drive Bay kosong di bawah lalu pasang SSD." : "Select the empty SSD Drive Bay at the bottom and install an SSD.")
        : (isId ? `Hubungkan kabel SSD: ${!isSataPower ? 'Kabel Daya SATA (biru)' : ''} ${!isSataPower && !isSataData ? 'dan' : ''} ${!isSataData ? 'Kabel Data SATA (hijau)' : ''}.` : `Connect: ${!isSataPower ? 'SATA Power (blue)' : ''} ${!isSataPower && !isSataData ? 'and' : ''} ${!isSataData ? 'SATA Data (green)' : ''} to the SSD.`)
    };
  }

  if (telemetry.cpuTemp >= 80) {
    const fanHeader = cables.fanHeader?.connected;

    return {
      title: isId ? "Thermal Shutdown - CPU Overheat" : "Thermal Shutdown - CPU Overheating",
      why: !fanHeader
        ? (isId ? "Kipas pendingin CPU (cooler) mati karena kabel daya kipas terputus." : "The CPU cooler fan is not running because its power cable is unplugged.")
        : (isId ? "Thermal paste di atas CPU kering atau belum dioleskan, sehingga menyerap panas berlebih." : "The thermal paste between the CPU and the cooler is dried/missing, causing instant overheating."),
      todo: !fanHeader
        ? (isId ? "Hubungkan kabel Kipas CPU (pink) ke pin konektor CPU_FAN di atas soket prosesor." : "Connect the pink CPU Fan cable to the CPU_FAN pin header on the motherboard.")
        : (isId ? "Buka pendingin CPU, klik slot CPU, oleskan thermal paste, lalu pasang kembali pendingin." : "Remove the CPU cooler, select the CPU slot, apply thermal paste, and reinstall the CPU cooler.")
    };
  }

  return null;
}
