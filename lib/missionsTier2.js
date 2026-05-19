// TIER 2 MISSIONS — Computer Technician (Level 10–20)
// Areas: repairShop, gamingCafe, upgradeCenter

export const MISSIONS_TIER2 = [
  {
    // ── INTERACTIVE: pc_repair (RAM install) ──
    id: 't2_001', title: { en: 'Install RAM Upgrade', id: 'Pasang Upgrade RAM' },
    category: 'hardware', difficulty: 'easy', areaKey: 'repairShop', requiredLevel: 10,
    xpReward: 200, coinReward: 35, puzzleType: 'pc_repair', npcAvatar: '👨‍🔧', npcName: 'Pak Agus',
    description: { en: 'Customer wants to upgrade from 8GB to 16GB RAM.', id: 'Pelanggan ingin upgrade dari 8GB ke 16GB RAM.' },
    puzzleData: {
      scenario: 'component_install',
      symptom: '🧠 Only 8GB RAM detected — install second stick for 16GB dual-channel',
      components: [
        { id: 'ram_new', label: 'New 8GB RAM Stick', emoji: '🧠', correctSlot: 'ram_slot_b1', broken: true },
        { id: 'cpu',     label: 'CPU',               emoji: '⚙️',  correctSlot: 'cpu_slot',    broken: false },
        { id: 'gpu',     label: 'GPU',               emoji: '🖥️',  correctSlot: 'gpu_slot',    broken: false },
      ],
      slots: [
        { id: 'ram_slot_a1', label: 'RAM Slot A1 (8GB installed)', hasFault: false },
        { id: 'ram_slot_b1', label: 'RAM Slot B1 (◆ empty — dual-channel)', hasFault: true },
        { id: 'cpu_slot',    label: 'CPU Socket',                hasFault: false },
        { id: 'gpu_slot',    label: 'PCIe ×16 Slot',            hasFault: false },
      ],
      faultSlot: 'ram_slot_b1',
      steps: [
        { id: 1, action: 'open_case',  text: 'Power off PC, unplug, touch metal to discharge static' },
        { id: 2, action: 'locate',     text: 'Locate the empty B1 RAM slot (paired with A1)' },
        { id: 3, action: 'install',    text: 'Drag new RAM Stick → Slot B1 until clips click' },
        { id: 4, action: 'power_on',   text: 'Power on — BIOS should now show 16GB' },
      ],
      successMsg: 'System now shows 16GB RAM in dual-channel mode!',
      lesson: 'For dual-channel RAM, install matching sticks in A1+B1 paired slots. Always discharge static before handling components.',
    },
  },
  {
    // ── INTERACTIVE: sequence (HDD to SSD migration) ──
    id: 't2_002', title: { en: 'Replace Faulty HDD with SSD', id: 'Ganti HDD Rusak dengan SSD' },
    category: 'hardware', difficulty: 'medium', areaKey: 'repairShop', requiredLevel: 11,
    xpReward: 280, coinReward: 55, puzzleType: 'sequence', npcAvatar: '👩‍🔧', npcName: 'Siska',
    description: { en: 'HDD making clicking noises. Clone to new SSD before it dies!', id: 'HDD berbunyi klik. Clone ke SSD baru sebelum mati!' },
    sequenceData: {
      task: 'HDD is failing (clicking sounds). Put the correct data-rescue and migration steps in order:',
      steps: [
        { id: 'step1', text: 'Connect the new SSD via USB adapter (do NOT boot from it yet)' },
        { id: 'step2', text: 'Open Macrium Reflect → Clone Disk → Select old HDD as source' },
        { id: 'step3', text: 'Select new SSD as destination → click Finish to start cloning' },
        { id: 'step4', text: 'After clone, open Disk Management → right-click C: → Extend Volume to use full SSD size' },
        { id: 'step5', text: 'Swap the physical drives — boot from SSD — verify Windows starts normally' },
      ],
      lesson: '"Click of death" = HDD failure imminent. Clone immediately using Macrium Reflect, then extend the partition to fill the larger SSD.',
    },
  },
  {
    // ── INTERACTIVE: pc_repair (dust_buildup) ──
    id: 't2_003', title: { en: 'Overheating Gaming PC', id: 'PC Gaming Kepanasan' },
    category: 'hardware', difficulty: 'medium', areaKey: 'gamingCafe', requiredLevel: 12,
    xpReward: 260, coinReward: 50, puzzleType: 'pc_repair', npcAvatar: '🧑‍🎮', npcName: 'Rizky',
    description: { en: 'Gaming PC throttles and crashes after 30 minutes of gaming.', id: 'PC gaming throttle dan crash setelah 30 menit gaming.' },
    puzzleData: {
      scenario: 'dust_buildup',
      symptom: '⚠️ CPU hitting 95°C — thermal throttling detected',
      components: [
        { id: 'fan',      label: 'CPU Fan (dusty)', emoji: '🌀', correctSlot: 'fan_slot',  broken: true, issue: 'dusty' },
        { id: 'cpu',      label: 'CPU',             emoji: '⚙️',  correctSlot: 'cpu_slot',  broken: false },
        { id: 'heatsink', label: 'Heatsink',        emoji: '🔩',  correctSlot: 'heat_slot', broken: false },
      ],
      slots: [
        { id: 'fan_slot',  label: 'Fan Mount',     hasFault: true, issue: 'dusty' },
        { id: 'cpu_slot',  label: 'CPU Socket',    hasFault: false },
        { id: 'heat_slot', label: 'Heatsink Base', hasFault: false },
      ],
      faultSlot: 'fan_slot',
      cleaningRequired: true,
      steps: [
        { id: 1, action: 'open_case',   text: 'Open PC case — notice heavy dust buildup' },
        { id: 2, action: 'check_temps', text: 'Confirm CPU is at 95°C (use HWMonitor)' },
        { id: 3, action: 'clean_fan',   text: 'Click "Clean Dust" on the Fan Mount slot' },
        { id: 4, action: 'power_on',    text: 'Power on — confirm temps drop below 75°C' },
      ],
      successMsg: 'CPU now runs at 68°C under load. No more throttling!',
      lesson: 'Dust is a silent killer. Gaming PCs need cleaning every 3-6 months. Thermal paste should be replaced every 2-3 years.',
    },
  },
  {
    // ── INTERACTIVE: pc_repair (ram_reseat) ──
    id: 't2_004', title: { en: 'PC Beeps — No POST', id: 'PC Beep — Tidak POST' },
    category: 'hardware', difficulty: 'medium', areaKey: 'repairShop', requiredLevel: 12,
    xpReward: 270, coinReward: 50, puzzleType: 'pc_repair', npcAvatar: '🧑‍💻', npcName: 'Hendra',
    description: { en: 'PC beeps on startup and won\'t boot to Windows.', id: 'PC beep saat startup dan tidak mau boot ke Windows.' },
    puzzleData: {
      scenario: 'ram_reseat',
      symptom: '🔊 3 beep codes — BIOS detected RAM error, PC won\'t POST',
      components: [
        { id: 'ram_loose', label: 'RAM (loose)', emoji: '🧠', correctSlot: 'ram_slot_a1', broken: true },
        { id: 'cpu',       label: 'CPU',         emoji: '⚙️',  correctSlot: 'cpu_slot',    broken: false },
        { id: 'gpu',       label: 'GPU',         emoji: '🖥️',  correctSlot: 'gpu_slot',    broken: false },
      ],
      slots: [
        { id: 'ram_slot_a1', label: 'RAM Slot A1 (⚠️ loose)', hasFault: true },
        { id: 'cpu_slot',    label: 'CPU Socket',            hasFault: false },
        { id: 'gpu_slot',    label: 'PCIe Slot',             hasFault: false },
      ],
      faultSlot: 'ram_slot_a1',
      steps: [
        { id: 1, action: 'open_case',  text: 'Open case — listen for 3-beep pattern on boot' },
        { id: 2, action: 'remove_ram', text: 'Pull the RAM stick completely out of slot' },
        { id: 3, action: 'reseat',     text: 'Drag RAM → Slot A1 — press until clips snap' },
        { id: 4, action: 'power_on',   text: 'Power on — PC should POST with no beeps' },
      ],
      successMsg: 'PC boots successfully! No more beep codes.',
      lesson: '3 beep codes = RAM error on most motherboards. Remove and reseat the RAM stick — it must click into the retention clips on both sides.',
    },
  },
  {
    // ── INTERACTIVE: pc_repair (fan_replace) ──
    id: 't2_005', title: { en: 'Fan Replacement', id: 'Penggantian Kipas' },
    category: 'hardware', difficulty: 'easy', areaKey: 'repairShop', requiredLevel: 11,
    xpReward: 180, coinReward: 30, puzzleType: 'pc_repair', npcAvatar: '👩', npcName: 'Ani',
    description: { en: 'CPU fan making grinding noise — bearing worn out. Replace it!', id: 'Kipas CPU berbunyi gemeretak — bearing aus. Ganti kipasnya!' },
    puzzleData: {
      scenario: 'dust_buildup',
      symptom: '🌀 CPU fan grinding — worn bearing detected, replace before failure',
      components: [
        { id: 'new_fan',  label: 'New CPU Fan',       emoji: '🌀', correctSlot: 'fan_slot',  broken: false },
        { id: 'old_fan',  label: 'Old Fan (grinding)', emoji: '💀', correctSlot: 'trash',     broken: true },
        { id: 'cpu',      label: 'CPU',               emoji: '⚙️',  correctSlot: 'cpu_slot',  broken: false },
      ],
      slots: [
        { id: 'fan_slot', label: 'Fan Mount (⚠️ grinding fan)', hasFault: true, issue: 'worn_bearing' },
        { id: 'cpu_slot', label: 'CPU Socket',                  hasFault: false },
        { id: 'trash',    label: '🗑️ Remove Old Fan',           hasFault: false },
      ],
      faultSlot: 'fan_slot',
      cleaningRequired: false,
      steps: [
        { id: 1, action: 'open_case',    text: 'Open case — identify grinding CPU fan' },
        { id: 2, action: 'remove_fan',   text: 'Drag Old Fan → Trash (disconnect 4-pin PWM cable)' },
        { id: 3, action: 'apply_paste',  text: 'Clean old thermal paste — apply new pea-sized dot on CPU' },
        { id: 4, action: 'install_fan',  text: 'Drag New CPU Fan → Fan Mount — connect 4-pin cable' },
        { id: 5, action: 'power_on',     text: 'Power on — verify fan spins quietly and CPU temps are normal' },
      ],
      successMsg: 'New fan installed! CPU runs cool and quiet.',
      lesson: 'Grinding fan = worn bearing. Replace before it fails completely. Always reapply thermal paste when removing the cooler.',
    },
  },
  {
    // ── INTERACTIVE: sequence (cable management) ──
    id: 't2_006', title: { en: 'Cable Management Cleanup', id: 'Rapikan Kabel' },
    category: 'hardware', difficulty: 'easy', areaKey: 'upgradeCenter', requiredLevel: 10,
    xpReward: 150, coinReward: 25, puzzleType: 'sequence', npcAvatar: '🧑‍🔧', npcName: 'Dono',
    description: { en: 'PC case has terrible cable management — poor airflow causing high temps. Fix it!', id: 'Casing PC punya kabel berantakan — aliran udara buruk menyebabkan suhu tinggi. Perbaiki!' },
    sequenceData: {
      task: 'PC has messy cables blocking airflow (CPU @ 88°C). Arrange the cleanup steps in the correct order:',
      steps: [
        { id: 'step1', text: 'Power off PC and unplug all cables from the wall outlet' },
        { id: 'step2', text: 'Remove all zip ties — lay cables out and group them by destination (24-pin, CPU power, SATA, etc.)' },
        { id: 'step3', text: 'Route cables behind the motherboard tray through cable management holes' },
        { id: 'step4', text: 'Secure cable bundles with velcro straps or zip ties — leave no cables blocking fans' },
        { id: 'step5', text: 'Power on PC — open HWMonitor and confirm CPU temps dropped below 75°C' },
      ],
      lesson: 'Good cable management routes cables behind the tray to improve airflow. Zip ties and velcro straps are standard — they\'re reusable and won\'t damage cables.',
    },
  },
  {
    // ── INTERACTIVE: sequence (BIOS reset) ──
    id: 't2_007', title: { en: 'BIOS Reset for Boot Issue', id: 'Reset BIOS untuk Masalah Boot' },
    category: 'hardware', difficulty: 'medium', areaKey: 'repairShop', requiredLevel: 13,
    xpReward: 290, coinReward: 55, puzzleType: 'sequence', npcAvatar: '👨', npcName: 'Pak Budi',
    description: { en: 'PC won\'t boot after BIOS settings were changed. Reset it in the right order!', id: 'PC tidak mau boot setelah pengaturan BIOS diubah. Reset dengan urutan yang benar!' },
    sequenceData: {
      task: 'PC won\'t boot after wrong BIOS settings were saved. Put the correct BIOS recovery steps in order:',
      steps: [
        { id: 'step1', text: 'Power off the PC — unplug the power cable from the wall' },
        { id: 'step2', text: 'Open the PC case — locate the round silver CMOS battery on the motherboard' },
        { id: 'step3', text: 'Use a flat screwdriver to gently pop out the CMOS battery — wait 30 seconds' },
        { id: 'step4', text: 'Reinsert the CMOS battery — close the case and plug the power back in' },
        { id: 'step5', text: 'Power on — enter BIOS (press DEL/F2) → Load Optimized Defaults → Save & Exit' },
      ],
      lesson: 'CMOS battery stores BIOS settings. Removing it for 30 seconds clears all custom settings back to factory defaults. Always note original settings before changing them.',
    },
  },
  {
    // ── INTERACTIVE: network (cafe LAN) ──
    id: 't2_008', title: { en: 'Gaming Cafe Network Slowdown', id: 'Jaringan Gaming Cafe Melambat' },
    category: 'networking', difficulty: 'medium', areaKey: 'gamingCafe', requiredLevel: 14,
    xpReward: 300, coinReward: 60, puzzleType: 'network', npcAvatar: '☕', npcName: 'Manager Eka',
    description: { en: 'All 20 gaming PCs suddenly experiencing high ping. Tournament tomorrow!', id: '20 PC gaming tiba-tiba lag tinggi. Turnamen besok!' },
    puzzleData: {
      nodes: [
        { id: 'internet',    type: 'internet', label: 'Internet (ISP)',  emoji: '🌐', x: 50, y: 5  },
        { id: 'router',      type: 'router',   label: 'Main Router',    emoji: '📡', x: 50, y: 28 },
        { id: 'switch',      type: 'switch',   label: 'Network Switch', emoji: '🔀', x: 50, y: 54 },
        { id: 'pc_group1',   type: 'pc',       label: 'PCs 1–10',       emoji: '🖥️', x: 20, y: 80 },
        { id: 'pc_group2',   type: 'pc',       label: 'PCs 11–20',      emoji: '🖥️', x: 80, y: 80 },
      ],
      connections: [
        { id: 'cn_isp_router',    from: 'internet',  to: 'router',    broken: false, label: 'WAN 100Mbps' },
        { id: 'cn_router_switch', from: 'router',    to: 'switch',    broken: true,  label: 'Ethernet (unplugged!)' },
        { id: 'cn_switch_g1',    from: 'switch',    to: 'pc_group1', broken: false, label: 'LAN' },
        { id: 'cn_switch_g2',    from: 'switch',    to: 'pc_group2', broken: false, label: 'LAN' },
      ],
      faultConnection: 'cn_router_switch',
      steps: [
        { id: 1, action: 'ping_test', text: 'Ping router (1ms) vs 8.8.8.8 (500ms) — identifies WAN vs LAN issue' },
        { id: 2, action: 'inspect',   text: 'Inspect the router → switch cable' },
        { id: 3, action: 'reconnect', text: 'Click the broken link to reconnect router to switch' },
        { id: 4, action: 'verify',    text: 'Run ping test — all PCs should now have <5ms ping' },
      ],
    },
  },
];
