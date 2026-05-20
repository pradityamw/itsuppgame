// TIER 2 MISSIONS — Computer Technician (Level 10–20)
// Areas: repairShop, gamingCafe, upgradeCenter

export const MISSIONS_TIER2 = [
  {
    // ── INTERACTIVE: pc_repair (RAM install) ──
    id: 't2_001', title: { en: 'Install RAM Upgrade', id: 'Pasang Upgrade RAM' },
    category: 'hardware', difficulty: 'easy', areaKey: 'repairShop', requiredLevel: 10,
    xpReward: 200, coinReward: 35, puzzleType: 'pc_repair', npcAvatar: '👨‍🔧', npcName: 'Pak Agus',
    description: { en: 'Customer wants to upgrade from 8GB to 16GB RAM.', id: 'Pelanggan ingin upgrade dari 8GB ke 16GB RAM.' },
    npcDialogue: [
      { npc: 'Pak Agus', avatar: '👨‍🔧', msgEn: "Morning! I brought in my PC — it's been running super slow lately. My friend said I need more RAM?", msgId: 'Selamat pagi! Saya bawa PC saya — sudah lama banget lambat. Kata teman saya perlu tambah RAM?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Let me check the specs first. How much RAM do you have and what do you use the PC for?", msgId: 'Biarkan saya cek spesifikasi dulu. Sekarang punya berapa RAM dan dipakai untuk apa PCnya?' },
      { npc: 'Pak Agus', avatar: '👨‍🔧', msgEn: "It says 8GB. I run AutoCAD and Chrome at the same time — it freezes up constantly!", msgId: 'Katanya 8GB. Saya pakai AutoCAD dan Chrome bersamaan — sering sekali frozen!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "That explains it! AutoCAD alone needs 8GB. Adding another 8GB stick to reach 16GB dual-channel will fix this completely.", msgId: 'Itu penjelasannya! AutoCAD sendiri butuh 8GB. Menambah 1 stick 8GB lagi untuk 16GB dual-channel akan menyelesaikan masalah ini sepenuhnya.' },
    ],
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
    npcDialogue: [
      { npc: 'Siska', avatar: '👩‍🔧', msgEn: "Hi, I'm really worried about my laptop. It's been making this weird clicking sound when I start it up.", msgId: 'Halo, saya sangat khawatir dengan laptop saya. Ada suara klik yang aneh waktu dinyalakan.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "A clicking sound from the hard drive is a serious warning sign. That's called the 'click of death' — the HDD is failing.", msgId: 'Suara klik dari hard drive adalah tanda peringatan serius. Itu disebut "click of death" — HDD sedang rusak.' },
      { npc: 'Siska', avatar: '👩‍🔧', msgEn: "Oh no! I have my thesis and 3 years of photos on there! Can we save the data??", msgId: 'Ya ampun! Ada skripsi dan 3 tahun foto di sana! Bisa diselamatkan datanya??' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Yes, but we need to act FAST before it completely fails. We'll clone everything to a new SSD — it'll be faster too!", msgId: 'Bisa, tapi kita harus CEPAT bertindak sebelum benar-benar rusak. Kita clone semuanya ke SSD baru — dan jadinya lebih cepat juga!' },
    ],
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
    npcDialogue: [
      { npc: 'Rizky', avatar: '🧑‍🎮', msgEn: "Bro, PC station 7 keeps crashing during tournaments! The game freezes and the screen goes black after like 30 minutes.", msgId: 'Bro, PC station 7 terus crash saat turnamen! Game-nya freeze dan layar hitam setelah sekitar 30 menit.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Sounds like thermal throttling. Does the PC feel unusually hot on the outside? Or do you hear the fans going crazy loud?", msgId: 'Kedengarannya seperti thermal throttling. Apakah PC-nya terasa sangat panas di bagian luar? Atau dengar suara kipas yang sangat keras?' },
      { npc: 'Rizky', avatar: '🧑‍🎮', msgEn: "Yeah the side of the case is scorching hot! And the fans are screaming full blast the whole time.", msgId: 'Iya sisi casing-nya sangat panas! Dan kipasnya bunyi full blast terus.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Classic dust buildup causing overheating. I'll open it up — bet the fans are clogged. Should be a quick fix!", msgId: 'Klasik! Debu menumpuk menyebabkan overheat. Saya buka dulu — pasti kipasnya tersumbat debu. Harusnya cepat beres!' },
    ],
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
    npcDialogue: [
      { npc: 'Hendra', avatar: '🧑‍💻', msgEn: "I just built my first PC! But when I turn it on, it makes 3 beeps and nothing shows on screen. Did I break something??", msgId: 'Saya baru saja rakit PC pertama! Tapi waktu dinyalakan, bunyi 3 kali bip dan tidak ada yang muncul di layar. Apa saya rusak sesuatu??' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Don't panic! 3 beeps is actually the BIOS telling you what the problem is. It's like Morse code. 3 beeps usually means a RAM issue.", msgId: 'Jangan panik! 3 bip sebenarnya BIOS memberitahu kamu masalahnya. Seperti kode Morse. 3 bip biasanya berarti masalah RAM.' },
      { npc: 'Hendra', avatar: '🧑‍💻', msgEn: "RAM? I installed it myself but I'm not sure I pushed it in correctly. It was really stiff!", msgId: 'RAM? Saya pasang sendiri tapi tidak yakin sudah benar. Sangat keras saat dipasang!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "That's almost certainly it! RAM needs to click into both retention clips. Let me reseat it properly for you.", msgId: 'Hampir pasti itu masalahnya! RAM harus klik ke kedua klip penahan. Biarkan saya pasang ulang dengan benar.' },
    ],
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
    npcDialogue: [
      { npc: 'Ani', avatar: '👩', msgEn: "Excuse me, my PC has been making this horrible grinding sound for the past few days. It's getting louder every day!", msgId: 'Permisi, PC saya sudah berbunyi gemeretak yang mengerikan beberapa hari ini. Makin lama makin keras!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "A grinding noise usually means a fan bearing is wearing out. Is the sound constant or only when the PC is working hard?", msgId: 'Suara gemeretak biasanya berarti bearing kipas mulai aus. Suaranya terus-menerus atau hanya saat PC kerja keras?' },
      { npc: 'Ani', avatar: '👩', msgEn: "It's pretty much all the time now. My brother said ignore it but it sounds really bad...", msgId: 'Sekarang hampir terus-menerus. Kakak saya bilang diabaikan saja tapi suaranya benar-benar terdengar parah...' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Your brother is wrong! A failing fan can cause your CPU to overheat and get damaged. Let's replace it before that happens!", msgId: 'Kakak kamu salah! Kipas yang rusak bisa menyebabkan CPU overheat dan rusak. Kita ganti sekarang sebelum terlambat!' },
    ],
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
    npcDialogue: [
      { npc: 'Dono', avatar: '🧑‍🔧', msgEn: "Bro, I need a second opinion. I built this PC myself last year but I never organized the cables inside. Is it a problem?", msgId: 'Bro, saya butuh pendapat kedua. Saya rakit PC ini sendiri tahun lalu tapi tidak pernah rapikan kabel di dalamnya. Apa itu masalah?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Can I take a look inside? *opens case* Whoa... this is what we call 'cable spaghetti'. It's blocking your airflow completely.", msgId: 'Boleh saya lihat ke dalam? *buka casing* Wah... ini yang kami sebut "kabel spaghetti". Ini menghalangi aliran udara sepenuhnya.' },
      { npc: 'Dono', avatar: '🧑‍🔧', msgEn: "Is that why my PC runs hot? I thought it was just normal...", msgId: 'Apa itu kenapa PC saya panas? Saya pikir itu sudah normal...' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Definitely not normal! Messy cables trap heat. Good cable management can drop temps by 10°C. Let's sort this out properly.", msgId: 'Jelas tidak normal! Kabel berantakan menjebak panas. Manajemen kabel yang baik bisa turunkan suhu 10°C. Kita rapikan dengan benar sekarang.' },
    ],
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
    npcDialogue: [
      { npc: 'Pak Budi', avatar: '👨', msgEn: "I'm in big trouble. I was watching a YouTube tutorial about overclocking and changed some BIOS settings. Now the PC won't start at all!", msgId: 'Saya dalam masalah besar. Saya nonton tutorial YouTube tentang overclocking dan mengubah beberapa pengaturan BIOS. Sekarang PC tidak mau nyala sama sekali!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Don't worry, this happens more often than you think! Wrong BIOS settings can prevent boot but it's recoverable. Did you save the settings before changing them?", msgId: 'Jangan khawatir, ini lebih sering terjadi dari yang kamu kira! Pengaturan BIOS yang salah bisa mencegah boot tapi bisa dipulihkan. Apakah kamu simpan pengaturan sebelum mengubahnya?' },
      { npc: 'Pak Budi', avatar: '👨', msgEn: "No... I didn't think to do that. I just changed whatever the video said. Will I lose everything on my hard drive?", msgId: 'Tidak... saya tidak kepikiran itu. Saya cuma ubah apa yang video bilang. Apakah saya akan kehilangan semua data di hard drive?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Your data is safe — BIOS settings don't affect storage! We just need to reset BIOS back to factory defaults. Follow these steps carefully.", msgId: 'Data kamu aman — pengaturan BIOS tidak mempengaruhi penyimpanan! Kita hanya perlu reset BIOS ke pengaturan pabrik. Ikuti langkah-langkah ini dengan hati-hati.' },
    ],
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
    npcDialogue: [
      { npc: 'Manager Eka', avatar: '☕', msgEn: "EMERGENCY! All 20 PCs are lagging like crazy. The ping is over 500ms on every single machine. We have a regional tournament TOMORROW!", msgId: 'DARURAT! Semua 20 PC lag parah. Ping-nya di atas 500ms di setiap mesin. Kita ada turnamen regional BESOK!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "500ms on ALL machines at once means this is a network issue, not individual PCs. When did it start? Did anyone touch the server room?", msgId: '500ms di SEMUA mesin sekaligus berarti ini masalah jaringan, bukan PC individual. Kapan mulainya? Ada yang sentuh ruang server?' },
      { npc: 'Manager Eka', avatar: '☕', msgEn: "About an hour ago! The cleaning staff was in that area... Oh no, did they unplug something??", msgId: 'Sekitar satu jam lalu! Staf kebersihan ada di area itu... Ya ampun, apa mereka cabut sesuatu??' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Very likely! Let me check the network topology — a disconnected switch cable would explain all PCs going down at once.", msgId: 'Kemungkinan besar! Biarkan saya cek topologi jaringan — kabel switch yang terputus akan menjelaskan kenapa semua PC mati sekaligus.' },
    ],
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
  {
    // ── INTERACTIVE: sequence (PSU replacement) ──
    id: 't2_009', title: { en: 'PSU Replacement', id: 'Penggantian PSU' },
    category: 'hardware', difficulty: 'medium', areaKey: 'repairShop', requiredLevel: 14,
    xpReward: 280, coinReward: 55, puzzleType: 'sequence', npcAvatar: '👨‍💼', npcName: 'Pak Joko',
    description: { en: 'PC randomly shuts off under load. PSU is failing — replace it!', id: 'PC tiba-tiba mati saat digunakan. PSU rusak — ganti sekarang!' },
    npcDialogue: [
      { npc: 'Pak Joko', avatar: '👨‍💼', msgEn: "My PC keeps shutting off randomly! Only happens when I'm doing heavy work like video editing. Then it restarts on its own.", msgId: 'PC saya terus mati tiba-tiba! Hanya terjadi saat kerja berat seperti edit video. Lalu restart sendiri.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Random shutoffs under load is a classic PSU failure sign. The power supply can't deliver enough wattage when the system demands it. How old is this PC?", msgId: 'Mati tiba-tiba saat beban berat adalah tanda klasik PSU rusak. Power supply tidak bisa kirim daya cukup saat sistem membutuhkan. PC ini sudah berapa tahun?' },
      { npc: 'Pak Joko', avatar: '👨‍💼', msgEn: "About 4 years. I added a new GPU last year but never upgraded the PSU. Could that be the cause?", msgId: 'Sekitar 4 tahun. Saya tambah GPU baru tahun lalu tapi tidak upgrade PSU. Apa itu penyebabnya?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Almost certainly! The new GPU added more power draw but your old PSU wasn't upgraded. We need to calculate the wattage needed and install a new PSU.", msgId: 'Hampir pasti! GPU baru menambah kebutuhan daya tapi PSU lama tidak di-upgrade. Kita perlu hitung wattage yang dibutuhkan dan pasang PSU baru.' },
    ],
    sequenceData: {
      task: 'PC shuts off under load — PSU is failing. Perform the PSU replacement in the correct order:',
      steps: [
        { id: 'step1', text: 'Calculate required wattage: CPU (125W) + GPU (250W) + components (100W) = 475W. Add 30% headroom → need at least 620W PSU' },
        { id: 'step2', text: 'Power off PC completely — flip PSU switch to OFF — unplug from wall — press power button to discharge capacitors' },
        { id: 'step3', text: 'Disconnect all PSU cables: 24-pin motherboard, 8-pin CPU, PCIe GPU cables, SATA data power connectors' },
        { id: 'step4', text: 'Remove old PSU (4 screws at rear of case) — slide out — install new 650W PSU and secure with screws' },
        { id: 'step5', text: 'Reconnect all cables to new PSU — power on — run stress test for 30 minutes to confirm stable operation' },
      ],
      lesson: 'PSU failure under load = underpowered or aging PSU. Always calculate: sum all component TDPs + 30% headroom. A GPU upgrade almost always requires a PSU upgrade too. Quality PSUs last 5-7 years.',
    },
  },
  {
    // ── INTERACTIVE: sequence (GPU install) ──
    id: 't2_010', title: { en: 'GPU Installation', id: 'Pasang GPU Baru' },
    category: 'hardware', difficulty: 'medium', areaKey: 'upgradeCenter', requiredLevel: 14,
    xpReward: 270, coinReward: 50, puzzleType: 'sequence', npcAvatar: '🧑‍🎮', npcName: 'Kevin',
    description: { en: 'Customer bought a new RTX GPU. Help them install it properly!', id: 'Pelanggan beli GPU RTX baru. Bantu pasang dengan benar!' },
    npcDialogue: [
      { npc: 'Kevin', avatar: '🧑‍🎮', msgEn: "Hey! I just bought an RTX 4060 to upgrade my gaming PC. Can you help me install it? I've never opened a PC before and I'm scared I'll break something.", msgId: 'Hei! Saya baru beli RTX 4060 untuk upgrade PC gaming. Bisa bantu pasang? Saya belum pernah buka PC dan takut merusaknya.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Of course! GPU installation is one of the easier upgrades. The most important step most people miss: uninstall your OLD GPU drivers FIRST before swapping the card.", msgId: 'Tentu! Pasang GPU adalah salah satu upgrade yang lebih mudah. Langkah penting yang banyak orang lewatkan: uninstall driver GPU LAMA dulu sebelum ganti kartunya.' },
      { npc: 'Kevin', avatar: '🧑‍🎮', msgEn: "Oh! I didn't know that. What happens if you skip that step?", msgId: 'Oh! Saya tidak tahu itu. Apa yang terjadi kalau langkah itu dilewati?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Driver conflicts! Windows would try to load the old driver on the new hardware — causing crashes, black screens, or no display at all. Always clean uninstall first with DDU (Display Driver Uninstaller).", msgId: 'Konflik driver! Windows akan coba load driver lama di hardware baru — menyebabkan crash, layar hitam, atau tidak ada tampilan sama sekali. Selalu uninstall bersih dulu dengan DDU (Display Driver Uninstaller).' },
    ],
    sequenceData: {
      task: 'Install a new RTX 4060 GPU to replace an old GTX 1060. Follow the correct procedure:',
      steps: [
        { id: 'step1', text: 'While old GPU is still installed: run DDU (Display Driver Uninstaller) in Safe Mode to completely remove old GPU drivers — this prevents driver conflicts' },
        { id: 'step2', text: 'Power off PC completely — unplug power cable — press power button 5 seconds to discharge — remove side panel' },
        { id: 'step3', text: 'Remove PCIe slot cover bracket from case — press PCIe retention clip to release old GPU — carefully remove it' },
        { id: 'step4', text: 'Insert new GPU into PCIe x16 slot firmly until clip snaps — secure bracket screw — connect 8+6 pin PCIe power cables from PSU' },
        { id: 'step5', text: 'Power on — connect monitor to new GPU DisplayPort/HDMI — boot Windows — download & install latest NVIDIA drivers from nvidia.com' },
      ],
      lesson: 'GPU swap order: uninstall OLD drivers first (DDU) → physical swap → install NEW drivers. Never skip the DDU step! Also ensure your PSU has enough wattage for the new GPU before purchasing.',
    },
  },
  {
    // ── INTERACTIVE: quiz (motherboard diagnostic) ──
    id: 't2_011', title: { en: 'Motherboard Diagnostic', id: 'Diagnosis Motherboard' },
    category: 'hardware', difficulty: 'hard', areaKey: 'repairShop', requiredLevel: 16,
    xpReward: 380, coinReward: 80, puzzleType: 'quiz', npcAvatar: '👩‍🔬', npcName: 'Ibu Rini',
    description: { en: 'PC won\'t POST and no beep codes. Is it the mobo, RAM, or CPU?', id: 'PC tidak mau POST dan tidak ada kode beep. Mobo, RAM, atau CPU?' },
    npcDialogue: [
      { npc: 'Ibu Rini', avatar: '👩‍🔬', msgEn: "We have a real mystery here. A customer's PC won't POST at all — no beeps, no display, nothing. Not even the fans spin properly. Where do we even start?", msgId: 'Kita ada misteri nyata di sini. PC pelanggan tidak mau POST sama sekali — tidak ada bunyi beep, tidak ada tampilan, tidak ada apa-apa. Bahkan kipas tidak berputar dengan benar. Dari mana kita mulai?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "No POST with no beep codes narrows it down to the most critical components: motherboard, CPU, or RAM. But we need to be systematic. Do you know what POST actually is?", msgId: 'Tidak POST tanpa kode beep mempersempit ke komponen paling kritis: motherboard, CPU, atau RAM. Tapi kita perlu sistematis. Kamu tahu apa itu POST?' },
      { npc: 'Ibu Rini', avatar: '👩‍🔬', msgEn: "I know it stands for Power-On Self-Test but I'm not sure exactly what it checks or how to diagnose when it fails completely silently.", msgId: 'Saya tahu singkatannya Power-On Self-Test tapi tidak yakin apa yang diperiksa atau cara mendiagnosis ketika gagal total tanpa suara.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Perfect — let me explain the POST process and how to use diagnostic LEDs and breadboarding to isolate the fault. This knowledge will save you hours of guesswork!", msgId: 'Bagus — izinkan saya jelaskan proses POST dan cara menggunakan LED diagnostik dan breadboarding untuk mengisolasi kerusakan. Pengetahuan ini akan menghemat berjam-jam dugaan!' },
    ],
    quizData: {
      questions: [
        {
          q: 'What does POST (Power-On Self-Test) check when a PC first powers on?',
          options: [
            'A. Internet connection, Windows license, and disk health',
            'B. CPU, RAM, GPU, and essential hardware before loading the OS',
            'C. Only the hard drive and operating system files',
            'D. BIOS version compatibility with the operating system',
          ],
          answer: 1,
          explain: 'POST checks critical hardware (CPU, RAM, GPU, storage) every time you power on. If any critical component fails, POST halts and signals the error via beep codes or diagnostic LEDs — before even trying to load the OS.',
        },
        {
          q: 'A motherboard has a Q-LED panel showing a yellow light next to "DRAM". What does this indicate?',
          options: [
            'A. The monitor cable is loose',
            'B. Windows is loading slowly due to a fragmented drive',
            'C. POST failed at the RAM initialization stage — check RAM seating or compatibility',
            'D. The CPU fan is spinning too fast',
          ],
          answer: 2,
          explain: 'Modern motherboards have Q-LEDs (Debug LEDs) for CPU, DRAM, VGA, and BOOT stages. A solid DRAM LED means POST halted at memory initialization. Try reseating RAM, testing sticks one at a time, or checking QVL (qualified vendor list) for compatibility.',
        },
        {
          q: 'What is "breadboarding" in PC troubleshooting?',
          options: [
            'A. Testing the PC with bread to check for static electricity',
            'B. Booting the PC with only minimum components (CPU+RAM+PSU+mobo) outside the case to rule out short circuits',
            'C. Removing all storage devices to test if the PC posts',
            'D. Cleaning the motherboard with compressed air before testing',
          ],
          answer: 1,
          explain: 'Breadboarding means assembling bare minimum components (CPU, 1 RAM stick, PSU, motherboard) outside the case on a non-conductive surface. This eliminates case short circuits and isolates the fault. If it posts outside but not inside, the case itself is causing a short.',
        },
      ],
    },
  },
  {
    // ── INTERACTIVE: sequence (laptop screen) ──
    id: 't2_012', title: { en: 'Laptop Screen Replacement', id: 'Ganti Layar Laptop' },
    category: 'hardware', difficulty: 'hard', areaKey: 'repairShop', requiredLevel: 15,
    xpReward: 380, coinReward: 80, puzzleType: 'sequence', npcAvatar: '👧', npcName: 'Dina',
    description: { en: 'Laptop screen cracked after being dropped. Replace the LCD panel!', id: 'Layar laptop retak setelah jatuh. Ganti panel LCD-nya!' },
    npcDialogue: [
      { npc: 'Dina', avatar: '👧', msgEn: "I accidentally dropped my laptop and now the screen has a huge crack down the middle. It's still usable if I squint, but it's really bad. Can it be fixed?", msgId: 'Saya tidak sengaja menjatuhkan laptop dan sekarang layarnya retak besar di tengah. Masih bisa dipakai kalau menyipitkan mata, tapi sangat parah. Bisa diperbaiki?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Yes! Screen replacement is very doable. What's your laptop model? I need to find the exact replacement panel — size, resolution, and connector type must all match.", msgId: 'Bisa! Ganti layar sangat bisa dilakukan. Apa model laptop kamu? Saya perlu cari panel pengganti yang tepat — ukuran, resolusi, dan jenis konektor harus semuanya cocok.' },
      { npc: 'Dina', avatar: '👧', msgEn: "It's an ASUS VivoBook 15, model X512FA. Will this repair be expensive? And will it be as good as the original?", msgId: 'Ini ASUS VivoBook 15, model X512FA. Apakah perbaikan ini mahal? Dan apakah akan sebagus aslinya?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "An OEM replacement panel for that model is quite affordable, and quality will be identical to original. The procedure takes about 30-45 minutes if done carefully. Let me walk you through it!", msgId: 'Panel pengganti OEM untuk model itu cukup terjangkau, dan kualitasnya identik dengan aslinya. Prosedurnya memakan waktu sekitar 30-45 menit jika dilakukan dengan hati-hati. Biarkan saya jelaskan!' },
    ],
    sequenceData: {
      task: 'Replace a cracked laptop LCD screen. Follow the correct disassembly and reassembly order:',
      steps: [
        { id: 'step1', text: 'Order exact OEM replacement panel: confirm 15.6" FHD 1920x1080, 30-pin eDP connector, non-touch variant to match ASUS X512FA specs' },
        { id: 'step2', text: 'Power off laptop — remove battery (or disconnect battery connector) — remove all screws hidden under rubber bumpers around the screen bezel' },
        { id: 'step3', text: 'Use plastic pry tool to carefully separate the bezel from the screen frame — work slowly around all edges — avoid cracking the new panel' },
        { id: 'step4', text: 'Unscrew LCD panel mounting brackets (4 screws) — carefully lift panel — disconnect 30-pin eDP cable and any antenna cables attached to panel' },
        { id: 'step5', text: 'Connect eDP cable to new panel — secure panel with bracket screws — snap bezel back — power on to test: verify no dead pixels, backlight works, touch (if applicable) functions' },
      ],
      lesson: 'LCD replacement key points: match panel specs exactly (size/resolution/connector type/backlight). Always disconnect battery first. Use plastic tools only near the screen to avoid cracking the new panel. The eDP connector is fragile — handle with care.',
    },
  },
  {
    // ── INTERACTIVE: sequence (data recovery) ──
    id: 't2_013', title: { en: 'Data Recovery from Dead PC', id: 'Recovery Data dari PC Mati' },
    category: 'hardware', difficulty: 'medium', areaKey: 'repairShop', requiredLevel: 13,
    xpReward: 280, coinReward: 55, puzzleType: 'sequence', npcAvatar: '😰', npcName: 'Mas Tono',
    description: { en: 'PC won\'t boot but critical data must be recovered from the drive!', id: 'PC tidak mau boot tapi data penting harus diselamatkan dari drive!' },
    npcDialogue: [
      { npc: 'Mas Tono', avatar: '😰', msgEn: "Please help me! My PC suddenly died and won't turn on at all. But I have ALL my work files inside — 5 years of project documents! Can the data be saved?", msgId: 'Tolong bantu saya! PC saya tiba-tiba mati dan tidak mau nyala sama sekali. Tapi semua file kerja saya ada di dalam — 5 tahun dokumen proyek! Bisa diselamatkan datanya?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Don't panic! If the hard drive itself is still healthy, we can almost certainly recover your data even if the PC won't boot. The drive and the PC's other components are separate problems.", msgId: 'Jangan panik! Jika hard drive itu sendiri masih sehat, kita hampir pasti bisa recovery data kamu meski PC tidak mau boot. Drive dan komponen lain PC adalah masalah terpisah.' },
      { npc: 'Mas Tono', avatar: '😰', msgEn: "Oh thank goodness! So even though the motherboard or something died, the drive might still be readable?", msgId: 'Oh syukurlah! Jadi meski motherboard atau sesuatu mati, drive-nya mungkin masih bisa dibaca?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Exactly! We'll remove the drive and connect it as an external drive to a working PC. As long as the drive platters aren't damaged, your data will be accessible. Let's do this!", msgId: 'Tepat! Kita akan lepas drive-nya dan hubungkan sebagai drive eksternal ke PC yang berfungsi. Selama platter drive tidak rusak, data kamu akan bisa diakses. Yuk kita lakukan!' },
    ],
    sequenceData: {
      task: 'PC is dead but data on HDD must be recovered. Follow the correct data recovery procedure:',
      steps: [
        { id: 'step1', text: 'Power off dead PC — remove HDD/SSD from the PC (unscrew, disconnect SATA data + power cables). Handle drive gently — no dropping or static!' },
        { id: 'step2', text: 'Connect recovered drive to working PC via USB-to-SATA enclosure (or USB adapter). The drive will appear as an external drive in File Explorer.' },
        { id: 'step3', text: 'If drive shows in Explorer: copy important files (Documents, Desktop, Downloads, project folders) directly to external backup drive or cloud storage' },
        { id: 'step4', text: 'If drive is not detected or shows errors: run Recuva or TestDisk to scan for recoverable files at sector level — this recovers even partially deleted data' },
        { id: 'step5', text: 'After successful copy, verify all critical files are readable and uncorrupted — open a sample of each file type to confirm. Now you can repair or replace the original dead PC.' },
      ],
      lesson: 'A dead PC does NOT mean dead data! HDD/SSD is independent from motherboard/PSU. USB-to-SATA adapters are essential IT tools (~$15). Always verify recovered files by opening them. This is why regular backups matter — recovery is possible but not always 100%.',
    },
  },
  {
    // ── INTERACTIVE: sequence (OS reinstall) ──
    id: 't2_014', title: { en: 'OS Reinstall — Keep Data', id: 'Instal Ulang OS Sambil Jaga Data' },
    category: 'hardware', difficulty: 'medium', areaKey: 'repairShop', requiredLevel: 15,
    xpReward: 290, coinReward: 58, puzzleType: 'sequence', npcAvatar: '👩', npcName: 'Bu Dewi',
    description: { en: 'Windows is corrupted and won\'t repair. Reinstall OS while keeping user data!', id: 'Windows rusak dan tidak bisa diperbaiki. Instal ulang OS sambil tetap jaga data pengguna!' },
    npcDialogue: [
      { npc: 'Bu Dewi', avatar: '👩', msgEn: "Windows on my work PC keeps crashing. I've tried everything and now it won't even start properly. IT told me I need a fresh Windows install. But what about my files??", msgId: 'Windows di PC kerja saya terus crash. Sudah coba segalanya dan sekarang tidak mau mulai dengan benar. IT bilang saya perlu instalasi Windows baru. Tapi bagaimana dengan file saya??' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Good news — we can do an in-place upgrade repair that reinstalls Windows while keeping your personal files and most installed programs. But first we MUST back up everything important.", msgId: 'Kabar baik — kita bisa lakukan perbaikan upgrade in-place yang menginstal ulang Windows sambil tetap menjaga file pribadi dan sebagian besar program yang diinstal. Tapi pertama kita HARUS backup semua yang penting.' },
      { npc: 'Bu Dewi', avatar: '👩', msgEn: "Oh thank you! I have client reports and accounting spreadsheets that are critical. Should I back up everything or just the important files?", msgId: 'Oh terima kasih! Saya punya laporan klien dan spreadsheet akuntansi yang sangat penting. Haruskah saya backup semua atau hanya file penting?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Back up EVERYTHING you cannot afford to lose. Even with in-place repair, always assume the worst case. We'll back up first, then perform the repair install. Never trust 'keep files' option without a backup safety net!", msgId: 'Backup SEMUA yang tidak bisa kamu tanggung untuk kehilangan. Bahkan dengan perbaikan in-place, selalu asumsikan kasus terburuk. Kita backup dulu, lalu lakukan instalasi perbaikan. Jangan pernah percaya opsi \"simpan file\" tanpa jaringan keamanan backup!' },
    ],
    sequenceData: {
      task: 'Windows is corrupted. Perform an OS repair reinstall while keeping user data:',
      steps: [
        { id: 'step1', text: 'BACKUP FIRST: copy Documents, Desktop, Downloads, AppData\\Roaming (browser profiles, Outlook PST) and any work folders to external drive or cloud' },
        { id: 'step2', text: 'Download Windows 11 ISO from microsoft.com → create bootable USB using Rufus (select GPT partition scheme for UEFI systems)' },
        { id: 'step3', text: 'Boot from USB (press F11/F12 for boot menu at startup) → run Setup.exe from within Windows (NOT from boot menu!) to enable "Keep files" option' },
        { id: 'step4', text: 'In Windows Setup: choose "Upgrade this PC now" → select "Keep personal files and apps" → let the 45-60 minute reinstall complete' },
        { id: 'step5', text: 'After reinstall: check all files in Documents/Desktop are intact → reinstall any missing programs → restore backed-up AppData if needed → run Windows Update' },
      ],
      lesson: 'In-place repair reinstall fixes corrupted system files while preserving user data. Key: always backup first regardless of "keep files" promise. Run Setup FROM WITHIN Windows (not boot menu) to get the "keep files" option. Boot menu install = clean install = data loss!',
    },
  },
  {
    // ── INTERACTIVE: quiz (PSU wattage) ──
    id: 't2_015', title: { en: 'Power Supply Wattage Guide', id: 'Panduan Wattage Power Supply' },
    category: 'hardware', difficulty: 'easy', areaKey: 'upgradeCenter', requiredLevel: 12,
    xpReward: 180, coinReward: 32, puzzleType: 'quiz', npcAvatar: '🧑‍💻', npcName: 'Arif',
    description: { en: 'Help a customer choose the right PSU wattage for their new PC build!', id: 'Bantu pelanggan memilih wattage PSU yang tepat untuk PC baru mereka!' },
    npcDialogue: [
      { npc: 'Arif', avatar: '🧑‍💻', msgEn: "I'm building my first PC! I've chosen all the parts — Core i5, RTX 4060, 16GB RAM, SSD. But I'm completely lost when it comes to choosing a power supply. There are so many options!", msgId: 'Saya sedang rakit PC pertama! Sudah pilih semua komponen — Core i5, RTX 4060, 16GB RAM, SSD. Tapi saya bingung total soal memilih power supply. Banyak sekali pilihannya!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Great build! Choosing the right PSU is actually pretty straightforward once you understand how to calculate. The key is adding up component power consumption and then adding safety headroom.", msgId: 'Build yang bagus! Memilih PSU yang tepat sebenarnya cukup mudah begitu kamu paham cara menghitungnya. Kuncinya adalah menjumlahkan konsumsi daya komponen lalu menambahkan headroom keamanan.' },
      { npc: 'Arif', avatar: '🧑‍💻', msgEn: "What's headroom? And does PSU brand matter? I see some cheap 600W PSUs for very low prices. Are they the same as branded ones?", msgId: 'Apa itu headroom? Dan apakah merek PSU penting? Saya lihat beberapa PSU 600W murah dengan harga sangat rendah. Apakah sama dengan yang bermerek?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Headroom is extra capacity buffer so the PSU runs efficiently and quietly. And YES, brand matters a LOT for PSUs! A cheap no-brand PSU can damage all your components if it fails. Let me explain the right way to calculate.", msgId: 'Headroom adalah buffer kapasitas ekstra agar PSU berjalan efisien dan tenang. Dan YA, merek sangat penting untuk PSU! PSU murahan tanpa merek bisa merusak semua komponen kamu jika rusak. Biarkan saya jelaskan cara menghitung yang benar.' },
    ],
    quizData: {
      questions: [
        {
          q: 'To calculate minimum PSU wattage: Core i7 = 125W TDP, RTX 4070 = 200W TDP, other components (mobo, RAM, storage, fans) = ~100W. What is the MINIMUM recommended PSU?',
          options: [
            'A. 425W (exactly the sum of all components)',
            'B. 500W (sum + 15% buffer)',
            'C. 560W (sum + 30% headroom for efficiency and peaks)',
            'D. 800W (always buy the most powerful PSU available)',
          ],
          answer: 2,
          explain: 'Total TDP: 125+200+100 = 425W. Add 30% headroom for efficiency, peak loads, and aging: 425 × 1.3 = 552W → round up to 560-600W. Running a PSU at 100% capacity is inefficient and stressful. 30% headroom keeps it in the sweet 50-70% efficiency zone.',
        },
        {
          q: 'What does "80 PLUS Gold" certification on a PSU mean?',
          options: [
            'A. The PSU has gold-plated pins for better conductivity',
            'B. The PSU can deliver 80% more power than its rated wattage',
            'C. The PSU is at least 87-90% efficient at converting AC power to DC (less heat, less electricity wasted)',
            'D. The PSU has passed 80 hours of load testing',
          ],
          answer: 2,
          explain: '80 PLUS certifications (Bronze, Silver, Gold, Platinum, Titanium) measure power efficiency. Gold = 87-90% efficient at 50% load. This means less power wasted as heat, lower electricity bills, and quieter operation because the fan works less. Always look for at least Bronze certified PSUs.',
        },
        {
          q: 'What is the most dangerous consequence of using an underpowered or low-quality PSU?',
          options: [
            'A. Slightly slower PC performance',
            'B. Voltage fluctuations that can corrupt data and permanently damage CPU, GPU, and motherboard',
            'C. The PC will refuse to turn on immediately',
            'D. WiFi speeds will be reduced',
          ],
          answer: 1,
          explain: 'A failing or underpowered PSU delivers unstable voltages (voltage ripple). This can instantly kill your GPU, CPU, or motherboard — components worth many times more than the PSU itself. A cheap $15 PSU can destroy $800 worth of components. The PSU is the foundation of your entire system — never cheap out on it.',
        },
      ],
    },
  },
  {
    // ── INTERACTIVE: sequence (thermal paste) ──
    id: 't2_016', title: { en: 'Thermal Paste Replacement', id: 'Ganti Thermal Paste' },
    category: 'hardware', difficulty: 'easy', areaKey: 'repairShop', requiredLevel: 11,
    xpReward: 170, coinReward: 30, puzzleType: 'sequence', npcAvatar: '🧓', npcName: 'Pak Samsul',
    description: { en: 'Old PC has high CPU temps even after cleaning. Dried thermal paste must be replaced!', id: 'PC lama CPU panas tinggi meski sudah dibersihkan. Thermal paste kering harus diganti!' },
    npcDialogue: [
      { npc: 'Pak Samsul', avatar: '🧓', msgEn: "This PC is 5 years old and lately it's been very hot and loud. I already cleaned all the dust last month, but the CPU temperature is still reaching 90°C even during light tasks.", msgId: 'PC ini sudah 5 tahun dan belakangan sangat panas dan berisik. Saya sudah bersihkan semua debu bulan lalu, tapi suhu CPU masih mencapai 90°C bahkan saat tugas ringan.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "If dust cleaning didn't fix it, the thermal paste between the CPU and heatsink has almost certainly dried out. After 3-4 years, it turns into a crumbly powder and stops conducting heat properly.", msgId: 'Jika membersihkan debu tidak memperbaikinya, thermal paste antara CPU dan heatsink hampir pasti sudah mengering. Setelah 3-4 tahun, menjadi serbuk rapuh dan berhenti menghantarkan panas dengan baik.' },
      { npc: 'Pak Samsul', avatar: '🧓', msgEn: "I had no idea thermal paste needed to be replaced! I always thought you only apply it once when building the PC. How big a difference does fresh paste make?", msgId: 'Saya tidak tahu thermal paste perlu diganti! Saya selalu pikir cukup diaplikasikan sekali saat membangun PC. Seberapa besar perbedaan pasta baru?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Replacing dried thermal paste can drop CPU temperatures by 15-25°C! That's the difference between throttling at 90°C and running efficiently at 65-70°C. This is one of the most impactful and cheapest PC maintenance tasks.", msgId: 'Mengganti thermal paste kering bisa menurunkan suhu CPU 15-25°C! Itu perbedaan antara throttling di 90°C dan berjalan efisien di 65-70°C. Ini adalah salah satu tugas perawatan PC paling berdampak dan termurah.' },
    ],
    sequenceData: {
      task: 'Replace dried thermal paste on a 5-year-old CPU to fix high temperatures. Follow the correct procedure:',
      steps: [
        { id: 'step1', text: 'Power off PC — unplug all cables — open case — carefully unscrew and remove the CPU cooler/heatsink (twist gently if stuck to paste)' },
        { id: 'step2', text: 'Clean old dried thermal paste from CPU surface AND heatsink base with isopropyl alcohol (90%+) and a lint-free cloth/cotton swab — surfaces must be completely clean and shiny' },
        { id: 'step3', text: 'Apply a pea-sized dot (~4mm) of new thermal paste directly to the CENTER of the CPU — do not spread it manually, the heatsink pressure will distribute it evenly' },
        { id: 'step4', text: 'Carefully lower heatsink straight down onto CPU — secure screws in X pattern (opposite corners) to ensure even pressure and paste distribution' },
        { id: 'step5', text: 'Power on — open HWMonitor — verify CPU temps are now below 75°C at idle and below 85°C under full load — compare to previous 90°C baseline' },
      ],
      lesson: 'Thermal paste dries out and loses conductivity after 3-5 years. Replacement is the single cheapest way to rescue an overheating older PC. Key: apply pea-sized dot to CPU CENTER only — spreading it by hand introduces air bubbles. Use 90%+ IPA for cleaning — lower concentrations leave moisture residue.',
    },
  },
  {
    // ── INTERACTIVE: quiz (PC build consultation) ──
    id: 't2_017', title: { en: 'PC Build Consultation', id: 'Konsultasi Rakit PC' },
    category: 'hardware', difficulty: 'medium', areaKey: 'upgradeCenter', requiredLevel: 16,
    xpReward: 260, coinReward: 50, puzzleType: 'quiz', npcAvatar: '🎓', npcName: 'Reza',
    description: { en: 'Help a student pick the right parts for a study/gaming PC on a budget!', id: 'Bantu mahasiswa memilih komponen yang tepat untuk PC belajar/gaming dengan anggaran terbatas!' },
    npcDialogue: [
      { npc: 'Reza', avatar: '🎓', msgEn: "I want to build my first PC for university and light gaming — games like Valorant and League of Legends. My budget is limited. Should I prioritize a better CPU or better GPU?", msgId: 'Saya ingin rakit PC pertama untuk kuliah dan gaming ringan — game seperti Valorant dan League of Legends. Anggaran saya terbatas. Haruskah saya prioritaskan CPU yang lebih baik atau GPU yang lebih baik?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Great question! For gaming, the GPU is the most important component — it does 80% of the work in rendering graphics. CPU matters too but gaming is much more GPU-bound than CPU-bound for most titles.", msgId: 'Pertanyaan bagus! Untuk gaming, GPU adalah komponen paling penting — ia melakukan 80% pekerjaan dalam render grafis. CPU juga penting tapi gaming jauh lebih GPU-bound daripada CPU-bound untuk sebagian besar judul.' },
      { npc: 'Reza', avatar: '🎓', msgEn: "Okay! And what about RAM? My friend said 8GB is enough. Also I'm confused between SSD and HDD — the HDD is much cheaper for more storage.", msgId: 'Oke! Dan bagaimana dengan RAM? Teman saya bilang 8GB cukup. Juga saya bingung antara SSD dan HDD — HDD jauh lebih murah untuk penyimpanan lebih.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "8GB is NOT enough anymore in 2024! And for your OS drive, ALWAYS use SSD — the performance difference is night and day. Let me explain the details so you can make the best decision for your budget!", msgId: '8GB TIDAK cukup lagi di 2024! Dan untuk drive OS kamu, SELALU gunakan SSD — perbedaan performa sangat dramatis. Biarkan saya jelaskan detailnya agar kamu bisa membuat keputusan terbaik untuk anggaranmu!' },
    ],
    quizData: {
      questions: [
        {
          q: 'For gaming on a limited budget, which component should you prioritize spending more on?',
          options: [
            'A. The CPU — faster processor = faster games',
            'B. The GPU — graphics card does 80% of the work in rendering game frames',
            'C. More RAM — 32GB is always better than 16GB for gaming',
            'D. Faster storage — NVMe SSD makes games run faster',
          ],
          answer: 1,
          explain: 'Gaming is primarily GPU-bound. The GPU renders every frame you see. A mid-range GPU with a budget CPU will outperform a high-end CPU with a budget GPU in gaming. Balance matters, but if you must choose — invest in GPU. Note: NVMe vs SATA SSD makes minimal difference in game FPS, only in load times.',
        },
        {
          q: 'A student says 8GB RAM is enough for a PC used for university work + light gaming in 2024. Is this correct?',
          options: [
            'A. Yes, 8GB is perfectly fine for all university tasks and light gaming',
            'B. No — modern games alone use 6-8GB, leaving nothing for Windows and browser tabs. 16GB is the new minimum',
            'C. It depends on the monitor resolution',
            'D. 8GB is fine as long as you have an SSD',
          ],
          answer: 1,
          explain: 'In 2024, 8GB RAM is no longer sufficient. Windows 11 uses ~3-4GB at idle, a game like Valorant uses 4-6GB, plus Chrome with 10 tabs uses 2-4GB. Total = 9-14GB needed regularly. With only 8GB, the system constantly swaps to disk (pagefile), causing severe slowdowns. 16GB is the minimum recommended for a modern PC.',
        },
        {
          q: 'For the operating system drive, a student is choosing between a 500GB SSD and a 2TB HDD (which costs the same). Which should they choose for the OS drive?',
          options: [
            'A. 2TB HDD — more storage is always better',
            'B. 500GB SSD — OS boot time drops from 60+ seconds to under 10 seconds; all programs launch instantly',
            'C. Both are the same for an OS drive — only storage capacity matters',
            'D. HDD is better for the OS because it has more cache',
          ],
          answer: 1,
          explain: 'SSD for the OS is non-negotiable. Windows on HDD: 60-120 second boot, slow program launches, constant stuttering. Windows on SSD: 5-10 second boot, instant launches, smooth operation. Use SSD for OS + frequently used programs. If more storage is needed, add a secondary HDD for media/documents storage.',
        },
      ],
    },
  },
];
