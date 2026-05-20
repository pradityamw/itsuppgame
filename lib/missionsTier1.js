// TIER 1 MISSIONS — Digital Beginner (Level 1–10)
// Areas: bedroom, familyPC, repairCorner, homeWifi

export const MISSIONS_TIER1 = [
  {
    // ── INTERACTIVE: pc_repair ──
    id: 't1_001', title: { en: 'Power Cable Loose', id: 'Kabel Power Longgar' },
    category: 'hardware', difficulty: 'easy', areaKey: 'bedroom', requiredLevel: 1,
    xpReward: 100, coinReward: 15, puzzleType: 'pc_repair', npcAvatar: '👩', npcName: 'Sarah',
    description: { en: 'PC won\'t turn on. Check the power cable.', id: 'PC tidak mau nyala. Cek kabel power.' },
    npcDialogue: [
      { npc: 'Sarah', avatar: '👩', msgEn: "Help! My PC won't turn on at all! I pressed the power button many times but nothing happens.", msgId: 'Tolong! PC saya tidak mau nyala sama sekali! Sudah berkali-kali tekan tombol power tapi tidak ada yang terjadi.' },
      { npc: 'Sarah', avatar: '👩', msgEn: "The monitor is black, no fans spinning, nothing! Did it break??", msgId: 'Layar hitam, kipas tidak berputar, tidak ada apa-apa! Apa ini rusak??' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Don't panic! 9 out of 10 times this is just a loose power cable. Let me open the case and check.", msgId: 'Jangan panik! 9 dari 10 kasus ini hanya kabel power yang longgar. Biarkan saya buka casing dan cek.' },
    ],
    puzzleData: {
      scenario: 'psu_loose',
      symptom: '❌ PC won\'t turn on — no power at all',
      components: [
        { id: 'psu_cable', label: 'Power Cable', emoji: '🔌', correctSlot: 'psu_port', broken: true },
        { id: 'ram',       label: 'RAM',         emoji: '🧠', correctSlot: 'ram_slot', broken: false },
        { id: 'ssd',       label: 'SSD',         emoji: '💾', correctSlot: 'ssd_slot', broken: false },
      ],
      slots: [
        { id: 'psu_port', label: 'Power Connector', hasFault: true },
        { id: 'ram_slot', label: 'RAM Slot',         hasFault: false },
        { id: 'ssd_slot', label: 'SATA Port',        hasFault: false },
      ],
      faultSlot: 'psu_port',
      steps: [
        { id: 1, action: 'open_case', text: 'Open the PC case to inspect inside' },
        { id: 2, action: 'inspect',   text: 'Locate the loose Power Cable' },
        { id: 3, action: 'reconnect', text: 'Drag the Power Cable → Power Connector slot' },
        { id: 4, action: 'power_on',  text: 'Press Power On to test' },
      ],
      successMsg: 'PC powers up! Problem solved.',
      lesson: 'A loose power cable is the #1 cause of "PC won\'t turn on". Always check physical connections first.',
    },
  },
  {
    // ── INTERACTIVE: sequence (mouse troubleshooting) ──
    id: 't1_002', title: { en: 'Mouse Not Moving', id: 'Mouse Tidak Bergerak' },
    category: 'hardware', difficulty: 'easy', areaKey: 'bedroom', requiredLevel: 1,
    xpReward: 80, coinReward: 12, puzzleType: 'sequence', npcAvatar: '👦', npcName: 'Dani',
    description: { en: 'Mouse cursor frozen. Fix it step by step.', id: 'Kursor mouse membeku. Perbaiki langkah demi langkah.' },
    npcDialogue: [
      { npc: 'Dani', avatar: '👦', msgEn: "Bro, my mouse just froze! The cursor is completely stuck on screen.", msgId: 'Bro, mouse gue tiba-tiba frozen! Kursor-nya nyangkut di layar.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Is the mouse LED light on? And which USB port is it plugged into?", msgId: 'LED mouse-nya nyala tidak? Dan port USB mana yang dipakai?' },
      { npc: 'Dani', avatar: '👦', msgEn: "The LED is on... it's in the front USB port. I've had it there for months.", msgId: 'LED-nya nyala... di port USB depan. Sudah di situ berbulan-bulan.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Got it! Front USB ports can fail over time. Let's follow the right steps to fix this.", msgId: 'Paham! Port USB depan bisa rusak seiring waktu. Kita ikuti langkah yang benar untuk memperbaikinya.' },
    ],
    sequenceData: {
      task: 'USB mouse cursor is frozen. Put the troubleshooting steps in the CORRECT order:',
      steps: [
        { id: 'step1', text: 'Check if the mouse LED light is ON (indicates power)' },
        { id: 'step2', text: 'Unplug the USB mouse from current port' },
        { id: 'step3', text: 'Plug mouse into a different USB port on the PC' },
        { id: 'step4', text: 'Move the mouse — check if cursor responds' },
      ],
      lesson: 'USB ports can fail individually. Always try unplugging and using a different port before assuming hardware failure.',
    },
  },
  {
    // ── INTERACTIVE: pc_repair (cable_identify) ──
    id: 't1_003', title: { en: 'Monitor No Signal', id: 'Monitor Tidak Ada Sinyal' },
    category: 'hardware', difficulty: 'easy', areaKey: 'bedroom', requiredLevel: 1,
    xpReward: 90, coinReward: 15, puzzleType: 'pc_repair', npcAvatar: '👨', npcName: 'Budi',
    description: { en: 'Monitor shows "No Signal". PC is on.', id: 'Monitor menampilkan "No Signal". PC menyala.' },
    npcDialogue: [
      { npc: 'Budi', avatar: '👨', msgEn: "My monitor just says 'No Signal'! The PC is ON — I can hear the fans.", msgId: 'Monitor saya hanya menampilkan "No Signal"! PC-nya NYALA — saya bisa dengar kipasnya.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Classic display cable issue! What cable connects your PC to the monitor — HDMI or VGA?", msgId: 'Masalah kabel layar klasik! Kabel apa yang menghubungkan PC ke monitor — HDMI atau VGA?' },
      { npc: 'Budi', avatar: '👨', msgEn: "I think HDMI? The blue one? My little brother might have pulled it when playing under the desk.", msgId: 'Kayaknya HDMI? Yang biru? Mungkin adik saya menariknya saat main di bawah meja.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "That's it! Let me identify and reconnect the correct display cable.", msgId: 'Itu dia! Biarkan saya identifikasi dan sambungkan kembali kabel layar yang benar.' },
    ],
    puzzleData: {
      scenario: 'cable_identify',
      symptom: '📺 Monitor shows "No Signal" — check display cable',
      components: [
        { id: 'hdmi_cable', label: 'HDMI Cable',  emoji: '🔵', correctSlot: 'display_port', broken: true },
        { id: 'vga_cable',  label: 'VGA Cable',   emoji: '🟡', correctSlot: 'wrong_port',   broken: false },
        { id: 'ram',        label: 'RAM',          emoji: '🧠', correctSlot: 'ram_slot',     broken: false },
      ],
      slots: [
        { id: 'display_port', label: 'HDMI Port (Monitor)', hasFault: true },
        { id: 'ram_slot',     label: 'RAM Slot',             hasFault: false },
      ],
      faultSlot: 'display_port',
      steps: [
        { id: 1, action: 'open_case',  text: 'Look at the back of the PC' },
        { id: 2, action: 'identify',   text: 'Identify the correct display cable (HDMI = blue)' },
        { id: 3, action: 'connect',    text: 'Drag the HDMI Cable → HDMI Port on monitor' },
        { id: 4, action: 'power_on',   text: 'Power on and check monitor' },
      ],
      successMsg: 'Monitor now shows picture!',
      lesson: '"No Signal" is almost always a loose or wrong cable. HDMI goes in the HDMI port — both ends must be secure.',
    },
  },
  {
    // ── INTERACTIVE: sequence ──
    id: 't1_004', title: { en: 'Restart Frozen PC', id: 'Restart PC yang Membeku' },
    category: 'os', difficulty: 'easy', areaKey: 'bedroom', requiredLevel: 2,
    xpReward: 110, coinReward: 18, puzzleType: 'sequence', npcAvatar: '👵', npcName: 'Nenek Sri',
    description: { en: 'PC completely frozen — mouse and keyboard not responding.', id: 'PC benar-benar membeku — mouse dan keyboard tidak merespons.' },
    npcDialogue: [
      { npc: 'Nenek Sri', avatar: '👵', msgEn: "Nak, tolong! The computer is stuck! I was watching a video and now nothing works!", msgId: 'Nak, tolong! Komputernya macet! Sedang nonton video terus tidak ada yang bergerak!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Okay Nek, don't worry. Can you move the mouse at all, or is the screen completely frozen?", msgId: 'Oke Nek, jangan khawatir. Bisa gerakkan mouse sama sekali, atau layarnya benar-benar diam?' },
      { npc: 'Nenek Sri', avatar: '👵', msgEn: "Completely frozen! I tried clicking but nothing happens. The fan is still spinning though.", msgId: 'Benar-benar diam! Sudah diklik-klik tapi tidak ada reaksi. Tapi kipasnya masih berputar.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "That's a full system freeze. We need to force restart safely. Follow these steps carefully!", msgId: 'Ini freeze total. Kita perlu restart paksa dengan aman. Ikuti langkah-langkah ini dengan hati-hati!' },
    ],
    sequenceData: {
      task: 'PC is completely frozen. Put the troubleshooting steps in the CORRECT order:',
      steps: [
        { id: 'step1', text: 'Hold Power button for 5 seconds (force shutdown)' },
        { id: 'step2', text: 'Wait 30 seconds for PC to fully power off' },
        { id: 'step3', text: 'Press Power button to start the PC again' },
        { id: 'step4', text: 'When prompted, choose "Start Windows Normally"' },
      ],
      lesson: 'Force shutdown (hold power 5s) is safe for frozen systems. Wait before restarting — one-time freezes usually fix themselves.',
    },
  },
  {
    // ── INTERACTIVE: network ──
    id: 't1_005', title: { en: 'Home WiFi Setup', id: 'Setup WiFi Rumah' },
    category: 'networking', difficulty: 'easy', areaKey: 'homeWifi', requiredLevel: 2,
    xpReward: 120, coinReward: 20, puzzleType: 'network', npcAvatar: '👨‍👩‍👧', npcName: 'The Santoso Family',
    description: { en: 'New router arrived. Set it up for the family.', id: 'Router baru datang. Siapkan untuk keluarga.' },
    npcDialogue: [
      { npc: 'Pak Santoso', avatar: '👨‍👩‍👧', msgEn: "The ISP technician just left. They installed the modem but we still have no WiFi!", msgId: 'Teknisi ISP baru saja pergi. Mereka pasang modem tapi kami masih tidak ada WiFi!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "I see — the modem is installed but the router isn't connected to it yet. Let me fix the network diagram.", msgId: 'Saya lihat — modem sudah dipasang tapi router belum terhubung ke modem. Biarkan saya perbaiki diagram jaringannya.' },
    ],
    puzzleData: {
      nodes: [
        { id: 'internet', type: 'internet', label: 'Internet (ISP)', emoji: '🌐', x: 50, y: 8  },
        { id: 'modem',    type: 'modem',    label: 'Modem',          emoji: '📡', x: 50, y: 32 },
        { id: 'router',   type: 'router',   label: 'WiFi Router',    emoji: '📶', x: 50, y: 58 },
        { id: 'pc1',      type: 'pc',       label: 'Family PC',      emoji: '🖥️', x: 22, y: 82 },
        { id: 'phone',    type: 'pc',       label: 'Phone',          emoji: '📱', x: 78, y: 82 },
      ],
      connections: [
        { id: 'cn_isp_modem',    from: 'internet', to: 'modem',  broken: false, label: 'WAN' },
        { id: 'cn_modem_router', from: 'modem',    to: 'router', broken: true,  label: 'Ethernet (unplugged!)' },
        { id: 'cn_router_pc',   from: 'router',   to: 'pc1',   broken: false, label: 'WiFi' },
        { id: 'cn_router_ph',   from: 'router',   to: 'phone', broken: false, label: 'WiFi' },
      ],
      faultConnection: 'cn_modem_router',
      steps: [
        { id: 1, action: 'inspect',  text: 'Check modem → router cable' },
        { id: 2, action: 'connect',  text: 'Click broken connection to plug Ethernet from modem to router' },
        { id: 3, action: 'pingtest', text: 'Run ping test to confirm internet is working' },
      ],
    },
  },
  {
    // ── INTERACTIVE: sequence (Bluetooth pairing) ──
    id: 't1_006', title: { en: 'Connect Bluetooth Headset', id: 'Sambungkan Headset Bluetooth' },
    category: 'hardware', difficulty: 'easy', areaKey: 'bedroom', requiredLevel: 2,
    xpReward: 85, coinReward: 12, puzzleType: 'sequence', npcAvatar: '🧒', npcName: 'Adi',
    description: { en: 'Bluetooth headset won\'t pair with the laptop.', id: 'Headset Bluetooth tidak mau pairing.' },
    npcDialogue: [
      { npc: 'Adi', avatar: '🧒', msgEn: "I bought a new Bluetooth headset but it won't connect to my laptop. I've tried 10 times already!", msgId: 'Saya beli headset Bluetooth baru tapi tidak mau konek ke laptop. Sudah coba 10 kali!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "First question — did you put the headset into pairing mode? The steps matter a lot with Bluetooth.", msgId: 'Pertanyaan pertama — sudah masukkan headset ke mode pairing? Urutannya sangat penting untuk Bluetooth.' },
      { npc: 'Adi', avatar: '🧒', msgEn: "Pairing mode? I just turned it on and searched in Settings...", msgId: 'Mode pairing? Saya cuma nyalakan lalu cari di Settings...' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "That's the issue! The headset must enter pairing mode BEFORE you search. Let me show you the correct order.", msgId: 'Itu masalahnya! Headset harus masuk mode pairing SEBELUM mencari. Biarkan saya tunjukkan urutan yang benar.' },
    ],
    sequenceData: {
      task: 'Pair a Bluetooth headset to a Windows laptop. Arrange the steps in the correct order:',
      steps: [
        { id: 'step1', text: 'Hold the headset power button 5 seconds → enters Pairing Mode (LED blinks fast)' },
        { id: 'step2', text: 'Open Windows Settings → Bluetooth & devices → Turn Bluetooth ON' },
        { id: 'step3', text: 'Click "Add device" → Bluetooth → select headset from list' },
        { id: 'step4', text: 'Wait for "Connected" status — play audio to verify' },
      ],
      lesson: 'Bluetooth pairing requires BOTH devices in pairing/discoverable mode. If it fails, forget the device and pair fresh.',
    },
  },
  {
    // ── INTERACTIVE: pc_repair (usb_port) ──
    id: 't1_007', title: { en: 'USB Drive Not Detected', id: 'USB Drive Tidak Terdeteksi' },
    category: 'hardware', difficulty: 'easy', areaKey: 'familyPC', requiredLevel: 3,
    xpReward: 100, coinReward: 16, puzzleType: 'pc_repair', npcAvatar: '👩‍🏫', npcName: 'Bu Dewi',
    description: { en: 'USB flash drive inserted but not showing up.', id: 'Flash drive USB dimasukkan tapi tidak muncul.' },
    npcDialogue: [
      { npc: 'Bu Dewi', avatar: '👩‍🏫', msgEn: "I plugged in my USB drive to save student data but the computer can't find it anywhere!", msgId: 'Saya colokkan USB drive untuk simpan data siswa tapi komputer tidak bisa menemukan USB-nya di mana pun!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Is there any light on the USB drive? And which port are you using — front or back?", msgId: 'Ada lampu di USB drive-nya? Dan port mana yang dipakai — depan atau belakang?' },
      { npc: 'Bu Dewi', avatar: '👩‍🏫', msgEn: "There's a light but it's dim... I'm using the front port on the left side.", msgId: 'Ada lampu tapi redup... Saya pakai port depan di sisi kiri.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "That front-left port might be faulty! Let me try a different port — individual USB ports can fail.", msgId: 'Port depan-kiri itu mungkin rusak! Saya coba port lain — port USB individual bisa rusak sendiri.' },
    ],
    puzzleData: {
      scenario: 'usb_port',
      symptom: '💾 USB drive not detected — try a different port',
      components: [
        { id: 'usb_drive', label: 'USB Flash Drive', emoji: '💾', correctSlot: 'usb_port2', broken: true },
        { id: 'ram',       label: 'RAM',              emoji: '🧠', correctSlot: 'ram_slot',  broken: false },
      ],
      slots: [
        { id: 'usb_port1', label: 'USB Port 1 (faulty)', hasFault: false },
        { id: 'usb_port2', label: 'USB Port 2 (working)', hasFault: true },
        { id: 'ram_slot',  label: 'RAM Slot',              hasFault: false },
      ],
      faultSlot: 'usb_port2',
      steps: [
        { id: 1, action: 'open_case', text: 'Inspect the USB ports on the PC' },
        { id: 2, action: 'identify',  text: 'Note that Port 1 is faulty — try Port 2' },
        { id: 3, action: 'connect',   text: 'Drag USB Drive → USB Port 2' },
        { id: 4, action: 'power_on',  text: 'Check if drive is now detected in File Explorer' },
      ],
      successMsg: 'USB drive detected! Drive shows up in File Explorer.',
      lesson: 'USB ports can fail individually. Always try different ports before assuming the drive is broken.',
    },
  },
  {
    // ── INTERACTIVE: pc_repair (cable reconnect) ──
    id: 't1_008', title: { en: 'Reconnect HDMI Cable', id: 'Sambungkan Kembali Kabel HDMI' },
    category: 'hardware', difficulty: 'easy', areaKey: 'familyPC', requiredLevel: 3,
    xpReward: 75, coinReward: 10, puzzleType: 'pc_repair', npcAvatar: '👴', npcName: 'Pak Tono',
    description: { en: 'TV used as monitor lost signal after moving furniture.', id: 'TV yang digunakan sebagai monitor kehilangan sinyal setelah memindahkan furnitur.' },
    npcDialogue: [
      { npc: 'Pak Tono', avatar: '👴', msgEn: "We moved the sofa and now the TV that we use as a computer screen says 'No Signal'!", msgId: 'Kami pindahkan sofa dan sekarang TV yang dipakai sebagai layar komputer menampilkan "No Signal"!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Moving furniture often pulls cables loose. The HDMI cable probably came out of the TV port during the move.", msgId: 'Memindahkan furnitur sering menarik kabel longgar. Kabel HDMI mungkin lepas dari port TV saat dipindahkan.' },
    ],
    puzzleData: {
      scenario: 'cable_identify',
      symptom: '📺 TV/Monitor shows "No Signal" — HDMI came loose during furniture move',
      components: [
        { id: 'hdmi_cable', label: 'HDMI Cable', emoji: '🔵', correctSlot: 'hdmi_port', broken: true },
        { id: 'power_cord', label: 'Power Cord', emoji: '🔌', correctSlot: 'psu_port',  broken: false },
      ],
      slots: [
        { id: 'hdmi_port', label: 'HDMI Port (TV)', hasFault: true },
        { id: 'psu_port',  label: 'Power Port',     hasFault: false },
      ],
      faultSlot: 'hdmi_port',
      steps: [
        { id: 1, action: 'inspect',  text: 'Inspect back of TV — find the loose HDMI cable' },
        { id: 2, action: 'connect',  text: 'Drag HDMI Cable → HDMI Port on TV (both ends)' },
        { id: 3, action: 'power_on', text: 'Power on PC and TV — confirm signal restored' },
      ],
      successMsg: 'TV now shows Desktop. No more "No Signal"!',
      lesson: 'Physical movement often dislodges cables. Always check both ends of the cable — PC side AND monitor/TV side.',
    },
  },
  {
    // ── INTERACTIVE: sequence (printer troubleshooting) ──
    id: 't1_009', title: { en: 'Printer Not Printing', id: 'Printer Tidak Mau Print' },
    category: 'hardware', difficulty: 'easy', areaKey: 'repairCorner', requiredLevel: 3,
    xpReward: 110, coinReward: 18, puzzleType: 'sequence', npcAvatar: '🧑‍💼', npcName: 'Rini',
    description: { en: 'Printer is on but won\'t print anything.', id: 'Printer menyala tapi tidak mau mencetak.' },
    npcDialogue: [
      { npc: 'Rini', avatar: '🧑‍💼', msgEn: "I sent 5 documents to print but NOTHING came out! The printer is on and has paper.", msgId: 'Saya kirim 5 dokumen untuk dicetak tapi TIDAK ADA yang keluar! Printer nyala dan ada kertas.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Is your printer set as the Default Printer? And is there anything stuck in the print queue?", msgId: 'Apakah printer kamu sudah di-set sebagai Default Printer? Dan ada yang nyangkut di antrian cetak?' },
      { npc: 'Rini', avatar: '🧑‍💼', msgEn: "Default printer? I have no idea! There are 3 printers listed and I just clicked print...", msgId: 'Default printer? Tidak tahu! Ada 3 printer terdaftar dan saya langsung klik print...' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Found the problem! It printed to the wrong (virtual) printer. Let me walk you through fixing it step by step.", msgId: 'Ketemu masalahnya! Tercetak ke printer yang salah (virtual). Biarkan saya tunjukkan cara memperbaikinya langkah demi langkah.' },
    ],
    sequenceData: {
      task: 'Printer is ON but documents are not printing. Arrange the correct troubleshooting steps:',
      steps: [
        { id: 'step1', text: 'Open Windows Settings → Bluetooth & devices → Printers & scanners' },
        { id: 'step2', text: 'Right-click your printer → Set as Default Printer' },
        { id: 'step3', text: 'Click "Open print queue" — cancel any stuck/pending jobs' },
        { id: 'step4', text: 'Try printing a test page to confirm printer is working' },
      ],
      lesson: 'Print problems are often a wrong default printer or stuck queue. Check both before assuming hardware failure.',
    },
  },
  {
    // ── INTERACTIVE: network ──
    id: 't1_010', title: { en: 'WiFi Password Changed', id: 'Password WiFi Berubah' },
    category: 'networking', difficulty: 'easy', areaKey: 'homeWifi', requiredLevel: 4,
    xpReward: 95, coinReward: 15, puzzleType: 'network', npcAvatar: '👩', npcName: 'Mama',
    description: { en: 'Can\'t connect to home WiFi after ISP changed the password.', id: 'Tidak bisa konek WiFi rumah setelah ISP ganti password.' },
    npcDialogue: [
      { npc: 'Mama', avatar: '👩', msgEn: "The internet technician came and now NONE of our devices can connect to WiFi! What did they do??", msgId: 'Teknisi internet datang dan sekarang TIDAK ADA perangkat yang bisa konek WiFi! Apa yang mereka lakukan??' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "The ISP likely changed your WiFi password during maintenance. We need to forget the old WiFi and reconnect with the new password.", msgId: 'ISP kemungkinan mengganti password WiFi kamu saat maintenance. Kita perlu lupa WiFi lama dan konek ulang dengan password baru.' },
      { npc: 'Mama', avatar: '👩', msgEn: "Oh! The technician left a paper with a new password. Is that what I need?", msgId: 'Oh! Teknisi meninggalkan kertas dengan password baru. Itu yang dibutuhkan?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Exactly! Keep that paper safe. Let me reconnect your network now.", msgId: 'Tepat! Simpan kertas itu baik-baik. Biarkan saya sambungkan jaringan kamu sekarang.' },
    ],
    puzzleData: {
      nodes: [
        { id: 'internet', type: 'internet', label: 'Internet',    emoji: '🌐', x: 50, y: 10 },
        { id: 'router',   type: 'router',   label: 'Home Router', emoji: '📶', x: 50, y: 42 },
        { id: 'laptop',   type: 'pc',       label: 'Laptop',      emoji: '💻', x: 50, y: 78 },
      ],
      connections: [
        { id: 'cn_int_router',    from: 'internet', to: 'router', broken: false, label: 'ISP Line' },
        { id: 'cn_router_laptop', from: 'router',   to: 'laptop', broken: true,  label: 'WiFi (wrong password!)' },
      ],
      faultConnection: 'cn_router_laptop',
      steps: [
        { id: 1, action: 'inspect',  text: 'Check WiFi status — "Wrong Password" error' },
        { id: 2, action: 'reconnect', text: 'Click broken WiFi link — forget network & re-enter new password' },
        { id: 3, action: 'pingtest', text: 'Run ping test to verify internet is working' },
      ],
    },
  },
  {
    // ── INTERACTIVE: sequence (keyboard troubleshooting) ──
    id: 't1_011', title: { en: 'Keyboard Not Responding', id: 'Keyboard Tidak Merespons' },
    category: 'hardware', difficulty: 'easy', areaKey: 'familyPC', requiredLevel: 4,
    xpReward: 90, coinReward: 14, puzzleType: 'sequence', npcAvatar: '👩‍💼', npcName: 'Ibu Sari',
    description: { en: 'Laptop keyboard not responding at all.', id: 'Keyboard laptop tidak merespon sama sekali.' },
    npcDialogue: [
      { npc: 'Ibu Sari', avatar: '👩‍💼', msgEn: "Help! My laptop keyboard is completely frozen — nothing works when I type!", msgId: 'Tolong! Keyboard laptop saya benar-benar tidak merespon — tidak ada yang bekerja saat saya ketik!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Don't worry! Before assuming hardware failure, let's check Fn Lock and Num Lock first.", msgId: 'Jangan khawatir! Sebelum berasumsi kerusakan hardware, mari cek Fn Lock dan Num Lock dulu.' },
      { npc: 'Ibu Sari', avatar: '👩‍💼', msgEn: "Fn Lock? I've never heard of that. Could it really be that simple?", msgId: 'Fn Lock? Saya belum pernah dengar itu. Apa semudah itu masalahnya?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Often yes! Let's go through the steps in the correct order to find out.", msgId: 'Sering kali ya! Mari kita ikuti langkah-langkah dengan urutan yang benar untuk mengetahuinya.' },
    ],
    sequenceData: {
      task: 'Laptop keyboard not responding. Arrange troubleshooting steps in correct order:',
      steps: [
        { id: 'step1', text: 'Check Fn lock key (look for Fn Lock indicator on keyboard — press Fn+Esc or Fn+F6 to toggle)' },
        { id: 'step2', text: 'Toggle Num Lock off (Num Lock on can block letter keys on some laptops)' },
        { id: 'step3', text: 'Reboot laptop (clears temporary driver glitches)' },
        { id: 'step4', text: 'Check Device Manager for keyboard driver error (yellow ⚠️ icon)' },
        { id: 'step5', text: 'Uninstall and reinstall keyboard driver from Device Manager' },
      ],
      lesson: 'Fn Lock or Num Lock can disable parts of keyboard. Always try function keys before assuming hardware failure.',
    },
  },
  {
    // ── INTERACTIVE: sequence (PC performance) ──
    id: 't1_012', title: { en: 'PC Running Very Slow', id: 'PC Sangat Lambat' },
    category: 'os', difficulty: 'easy', areaKey: 'familyPC', requiredLevel: 5,
    xpReward: 105, coinReward: 16, puzzleType: 'sequence', npcAvatar: '👨‍👦', npcName: 'Pak Hasan',
    description: { en: 'PC takes 10 minutes to open a browser.', id: 'PC butuh waktu 10 menit untuk buka browser.' },
    npcDialogue: [
      { npc: 'Pak Hasan', avatar: '👨‍👦', msgEn: "This PC is so slow! It takes almost 10 minutes just to open Chrome. My son uses it for school and he's always late!", msgId: 'PC ini sangat lambat! Butuh hampir 10 menit hanya untuk buka Chrome. Anak saya pakai untuk sekolah dan selalu telat!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "That's extreme slowness! Usually caused by too many startup programs or low disk space. Let me walk you through fixing it.", msgId: 'Itu sangat lambat! Biasanya disebabkan terlalu banyak program startup atau ruang disk yang penuh. Saya bantu perbaiki.' },
      { npc: 'Pak Hasan', avatar: '👨‍👦', msgEn: "Startup programs? The PC has been filled with random software over the years...", msgId: 'Program startup? PC ini sudah dipenuhi software acak selama bertahun-tahun...' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "That's exactly the problem! Let's clean it up step by step.", msgId: 'Itulah masalahnya! Mari bersihkan langkah demi langkah.' },
    ],
    sequenceData: {
      task: 'PC is extremely slow to start and open programs. Put the optimization steps in the correct order:',
      steps: [
        { id: 'step1', text: 'Open Task Manager (Ctrl+Shift+Esc) — check CPU/RAM usage to identify hogs' },
        { id: 'step2', text: 'Disable startup programs (Task Manager > Startup tab > right-click > Disable unneeded ones)' },
        { id: 'step3', text: 'Run Disk Cleanup to free space (Start > Disk Cleanup > select drive > clean system files)' },
        { id: 'step4', text: 'Check for malware with Windows Defender (Full Scan)' },
        { id: 'step5', text: 'Restart PC and test speed' },
      ],
      lesson: 'Slow PCs are usually caused by too many startup programs or low disk space. Task Manager is your first diagnostic tool.',
    },
  },
  {
    // ── INTERACTIVE: sequence (audio troubleshooting) ──
    id: 't1_013', title: { en: 'No Sound from Speakers', id: 'Tidak Ada Suara dari Speaker' },
    category: 'hardware', difficulty: 'easy', areaKey: 'bedroom', requiredLevel: 5,
    xpReward: 85, coinReward: 13, puzzleType: 'sequence', npcAvatar: '🧑', npcName: 'Aldi',
    description: { en: 'No audio output at all even at max volume.', id: 'Tidak ada suara sama sekali padahal volume sudah max.' },
    npcDialogue: [
      { npc: 'Aldi', avatar: '🧑', msgEn: "Bro, there's no sound coming from my speakers at all! Volume is maxed out but completely silent.", msgId: 'Bro, tidak ada suara keluar dari speaker saya sama sekali! Volume sudah max tapi sunyi senyap.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Could be muted, wrong output device, or an outdated driver. Let's check in the right order.", msgId: 'Mungkin muted, output device salah, atau driver usang. Mari cek dengan urutan yang benar.' },
      { npc: 'Aldi', avatar: '🧑', msgEn: "I checked volume and it's not muted... it was working fine yesterday!", msgId: 'Saya cek volume dan tidak muted... kemarin masih baik-baik saja!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Then it might be the output device selection changed. Let's go through all the steps.", msgId: 'Mungkin pilihan output device berubah. Mari ikuti semua langkahnya.' },
    ],
    sequenceData: {
      task: 'No audio output from speakers. Arrange the troubleshooting steps in order:',
      steps: [
        { id: 'step1', text: 'Check volume is not muted (speaker icon in taskbar — click to see volume slider)' },
        { id: 'step2', text: 'Right-click speaker icon > Open Sound Settings > check Output device is correct speaker' },
        { id: 'step3', text: 'Right-click speaker icon > Troubleshoot sound problems (runs auto-fix)' },
        { id: 'step4', text: 'Update audio driver via Device Manager > Sound, video and game controllers' },
        { id: 'step5', text: 'Test with headphones to isolate speaker vs software issue' },
      ],
      lesson: 'Audio issues are usually: muted volume, wrong output device selected, or outdated driver. Check the simplest cause first.',
    },
  },
  {
    // ── INTERACTIVE: quiz (display resolution) ──
    id: 't1_014', title: { en: 'Screen Resolution Too Low', id: 'Resolusi Layar Terlalu Rendah' },
    category: 'os', difficulty: 'easy', areaKey: 'familyPC', requiredLevel: 6,
    xpReward: 80, coinReward: 12, puzzleType: 'quiz', npcAvatar: '👦', npcName: 'Reza',
    description: { en: 'Display is blurry after a Windows update.', id: 'Tampilan jadi blurry setelah update Windows.' },
    npcDialogue: [
      { npc: 'Reza', avatar: '👦', msgEn: "After the Windows update everything looks blurry and super big. Icons are huge and text looks pixelated!", msgId: 'Setelah update Windows semuanya terlihat blur dan sangat besar. Ikon-ikonnya raksasa dan teks terlihat kotak-kotak!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Windows updates sometimes replace GPU drivers with a generic version that defaults to low resolution. Easy fix!", msgId: 'Update Windows terkadang mengganti driver GPU dengan versi generik yang default ke resolusi rendah. Mudah diperbaiki!' },
      { npc: 'Reza', avatar: '👦', msgEn: "Oh! Can you teach me how screens and resolution actually work?", msgId: 'Oh! Bisakah kamu mengajari saya bagaimana layar dan resolusi sebenarnya bekerja?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Of course! Answer these questions and you'll understand it completely.", msgId: 'Tentu! Jawab pertanyaan-pertanyaan ini dan kamu akan paham sepenuhnya.' },
    ],
    quiz: [
      {
        q: 'What does screen resolution mean?',
        options: ['Number of pixels displayed on screen', 'The physical size of the monitor', 'The brightness level', 'The refresh rate of the display'],
        correct: 0,
        explanation: 'Resolution is the number of pixels (width × height). Higher resolution = sharper image.',
      },
      {
        q: 'After a Windows update, resolution changed to 800x600. What should you do?',
        options: ['Buy a new monitor', 'Right-click desktop > Display settings > Change to recommended resolution', 'Restart the PC 10 times', 'Lower the brightness'],
        correct: 1,
        explanation: 'Display Settings lets you change resolution to the recommended native resolution for your monitor.',
      },
      {
        q: 'What is the native resolution of a Full HD monitor?',
        options: ['800x600', '1024x768', '1920x1080', '3840x2160'],
        correct: 2,
        explanation: 'Full HD = 1920x1080. This is the native resolution for most office and home monitors.',
      },
      {
        q: 'Why might resolution reset after an update?',
        options: ['The monitor broke', 'Windows installed a generic display driver', 'The GPU was removed', 'The RAM is full'],
        correct: 1,
        explanation: 'Windows updates sometimes replace specific GPU drivers with generic ones that default to lower resolution. Reinstalling the GPU driver fixes this.',
      },
    ],
  },
  {
    // ── INTERACTIVE: sequence (Windows Defender) ──
    id: 't1_015', title: { en: 'Run Windows Defender Scan', id: 'Jalankan Windows Defender Scan' },
    category: 'security', difficulty: 'easy', areaKey: 'repairCorner', requiredLevel: 6,
    xpReward: 100, coinReward: 15, puzzleType: 'sequence', npcAvatar: '👩', npcName: 'Tante Wati',
    description: { en: 'PC shows suspicious pop-ups — run a full security scan.', id: 'PC banyak iklan popup mencurigakan — jalankan scan keamanan penuh.' },
    npcDialogue: [
      { npc: 'Tante Wati', avatar: '👩', msgEn: "My PC keeps showing weird pop-up ads everywhere! Even when I'm not using the browser. I'm scared it has a virus!", msgId: 'PC saya terus menampilkan iklan pop-up aneh di mana-mana! Bahkan saat saya tidak pakai browser. Saya takut kena virus!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "That does sound like malware or adware! Let's run a full Windows Defender scan right away.", msgId: 'Itu memang terdengar seperti malware atau adware! Mari jalankan scan Windows Defender penuh sekarang juga.' },
      { npc: 'Tante Wati', avatar: '👩', msgEn: "Windows Defender? Is that already on my PC? I thought I needed to buy antivirus software!", msgId: 'Windows Defender? Apa itu sudah ada di PC saya? Saya kira harus beli software antivirus!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "It's built into Windows 10/11 and it's excellent! Follow these steps in the right order.", msgId: 'Sudah ada di Windows 10/11 dan sangat bagus! Ikuti langkah-langkah ini dengan urutan yang benar.' },
    ],
    sequenceData: {
      task: 'PC shows suspicious pop-ups. Run a complete security scan in the correct order:',
      steps: [
        { id: 'step1', text: 'Open Windows Security (Start > type "Windows Security" > open it)' },
        { id: 'step2', text: 'Click "Virus & threat protection"' },
        { id: 'step3', text: 'Click "Scan options" > select "Full scan"' },
        { id: 'step4', text: 'Click "Scan now" and wait for completion (may take 30-60 min)' },
        { id: 'step5', text: 'If threats found: click "Remove" for each threat detected' },
        { id: 'step6', text: 'Restart PC and verify pop-ups are gone' },
      ],
      lesson: 'Windows Defender is built into Windows 10/11 and is very effective. A Full Scan checks every file — it takes longer but is thorough.',
    },
  },
  {
    // ── INTERACTIVE: sequence (external HDD setup) ──
    id: 't1_016', title: { en: 'External Hard Drive Setup', id: 'Setup Hard Drive Eksternal' },
    category: 'hardware', difficulty: 'easy', areaKey: 'repairCorner', requiredLevel: 7,
    xpReward: 110, coinReward: 17, puzzleType: 'sequence', npcAvatar: '👨', npcName: 'Mas Dika',
    description: { en: 'New external hard drive not appearing in File Explorer.', id: 'Hard drive eksternal baru tidak muncul di File Explorer.' },
    npcDialogue: [
      { npc: 'Mas Dika', avatar: '👨', msgEn: "I just bought a new external hard drive for backups but it won't show up in File Explorer. It's plugged in but nothing happens!", msgId: 'Saya baru beli hard drive eksternal untuk backup tapi tidak muncul di File Explorer. Sudah dicolokan tapi tidak ada reaksi!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "New drives often need to be initialized and formatted before Windows can use them. It's a simple setup process!", msgId: 'Drive baru sering perlu diinisialisasi dan diformat sebelum Windows bisa menggunakannya. Prosesnya mudah!' },
      { npc: 'Mas Dika', avatar: '👨', msgEn: "Initialized? I had no idea! Will I lose anything doing that?", msgId: 'Diinisialisasi? Saya tidak tahu! Apakah saya kehilangan sesuatu dengan melakukan itu?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "It's brand new so no data to lose. Let me show you the exact steps.", msgId: 'Ini baru jadi tidak ada data yang hilang. Saya tunjukkan langkah-langkah yang tepat.' },
    ],
    sequenceData: {
      task: 'New external hard drive is not appearing in File Explorer. Set it up correctly:',
      steps: [
        { id: 'step1', text: 'Connect external drive via USB and wait 30 seconds' },
        { id: 'step2', text: 'Open Disk Management (right-click Start > Disk Management)' },
        { id: 'step3', text: 'Find the new unallocated disk in the list (shows as "Unallocated" black bar)' },
        { id: 'step4', text: 'Right-click the unallocated space > New Simple Volume' },
        { id: 'step5', text: 'Follow wizard: assign drive letter, format as NTFS, give it a name' },
        { id: 'step6', text: 'Click Finish — drive now appears in File Explorer' },
      ],
      lesson: 'New drives need to be initialized and formatted before use. Disk Management handles this. NTFS is the best format for Windows.',
    },
  },
  {
    // ── INTERACTIVE: quiz (Task Manager) ──
    id: 't1_017', title: { en: 'Windows Task Manager Basics', id: 'Dasar Task Manager Windows' },
    category: 'os', difficulty: 'easy', areaKey: 'bedroom', requiredLevel: 8,
    xpReward: 95, coinReward: 15, puzzleType: 'quiz', npcAvatar: '👦', npcName: 'Kevin',
    description: { en: 'Program frozen and won\'t close normally.', id: 'Ada program yang freeze dan tidak bisa ditutup dengan cara biasa.' },
    npcDialogue: [
      { npc: 'Kevin', avatar: '👦', msgEn: "My game froze completely and I can't close it! Alt+F4 does nothing, clicking X doesn't work. I'm stuck!", msgId: 'Game saya benar-benar freeze dan tidak bisa ditutup! Alt+F4 tidak ada efek, klik X tidak bekerja. Saya terjebak!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Task Manager is your best friend in this situation! It lets you force-close any frozen program.", msgId: 'Task Manager adalah teman terbaikmu dalam situasi ini! Ia memungkinkan kamu menutup paksa program yang freeze.' },
      { npc: 'Kevin', avatar: '👦', msgEn: "Oh I've heard of Task Manager. But I want to understand it better!", msgId: 'Oh saya pernah dengar Task Manager. Tapi saya ingin memahaminya lebih baik!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Great! Let's test your knowledge — Task Manager is the most useful Windows tool you'll ever learn.", msgId: 'Bagus! Mari uji pengetahuanmu — Task Manager adalah alat Windows paling berguna yang pernah kamu pelajari.' },
    ],
    quiz: [
      {
        q: 'How do you open Task Manager quickly?',
        options: ['Alt+F4', 'Ctrl+Shift+Esc', 'Windows+D', 'Ctrl+C'],
        correct: 1,
        explanation: 'Ctrl+Shift+Esc is the fastest way. You can also use Ctrl+Alt+Delete then select Task Manager.',
      },
      {
        q: 'A program shows "Not Responding" in Task Manager. What should you do?',
        options: ['Wait forever', 'Right-click it > End Task', 'Restart the whole computer immediately', 'Uninstall the program'],
        correct: 1,
        explanation: '"End Task" forces a program to close. Try this before a full restart — it only closes the frozen program.',
      },
      {
        q: 'In Task Manager, which tab shows programs that launch when Windows starts?',
        options: ['Performance', 'Services', 'Startup', 'Details'],
        correct: 2,
        explanation: 'The Startup tab lists all programs that auto-start with Windows. Disabling unnecessary ones speeds up boot time.',
      },
      {
        q: 'CPU is at 100% in Task Manager. What does this mean?',
        options: ['Your PC is perfect', 'The processor is overloaded — find which process is using it', 'You need more monitors', 'The keyboard is broken'],
        correct: 1,
        explanation: 'Sort by CPU column in Task Manager to find the culprit process. 100% CPU = PC becomes unresponsive.',
      },
    ],
  },
  {
    id: 't1_wifi_sim', title: { en: 'Troubleshoot Router Cabling (Sim)', id: 'Troubleshoot Kabel Router (Sim)' },
    category: 'networking', difficulty: 'easy', areaKey: 'homeWifi', requiredLevel: 1,
    xpReward: 150, coinReward: 30, puzzleType: 'network_sim', npcAvatar: '👨', npcName: 'Pak Dedi',
    description: { en: 'Help Pak Dedi fix his home network. The router cannot connect to the internet, and the PC won\'t turn on.', id: 'Bantu Pak Dedi memperbaiki jaringan rumahnya. Router tidak bisa konek internet, dan PC tidak mau menyala.' },
    npcDialogue: [
      { npc: 'Pak Dedi', avatar: '👨', msgEn: "My internet is completely dead since yesterday. Also, my computer won't even power on!", msgId: 'Internet saya mati total sejak kemarin. Selain itu, komputer saya bahkan tidak mau menyala!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "That sounds like a combination of wrong cabling and a power issue. Let's inspect the physical setup.", msgId: 'Itu terdengar seperti kombinasi kabel yang salah colok dan masalah listrik. Mari kita periksa setup fisiknya.' },
    ],
    puzzleData: {
      symptom: '❌ Router WAN is down and PC has no power!',
      nodes: [
        { id: 'isp', type: 'internet', label: 'ISP Source', x: 80, y: 100 },
        { id: 'outlet', type: 'power_outlet', label: 'Power Strip', x: 300, y: 320 },
        { id: 'modem', type: 'modem', label: 'Cable Modem', x: 120, y: 220, powerOn: true },
        { id: 'router', type: 'router', label: 'WiFi Router', x: 300, y: 120, powerOn: true },
        { id: 'pc', type: 'pc', label: 'My PC', x: 480, y: 220, powerOn: false },
      ],
      connections: [
        { id: 'c_coax', from: 'isp', fromPort: 'coax', to: 'modem', toPort: 'coax', cableType: 'coaxial', damaged: false },
        { id: 'c_modem_pwr', from: 'outlet', fromPort: 'p1', to: 'modem', toPort: 'power', cableType: 'power', damaged: false },
        { id: 'c_router_pwr', from: 'outlet', fromPort: 'p2', to: 'router', toPort: 'power', cableType: 'power', damaged: false },
        { id: 'c_modem_router', from: 'modem', fromPort: 'eth', to: 'router', toPort: 'lan1', cableType: 'ethernet', damaged: false },
        { id: 'c_pc_network', from: 'router', fromPort: 'lan2', to: 'pc', toPort: 'eth', cableType: 'ethernet', damaged: false },
      ],
      steps: [
        { id: 1, action: 'inspect_router', text: 'Inspect Router connection' },
        { id: 2, action: 'reconnect_wan', text: 'Unplug router cable from LAN1 and connect it to WAN' },
        { id: 3, action: 'power_pc', text: 'Connect power cable from Power Strip to PC Power Socket' },
        { id: 4, action: 'power_on_pc', text: 'Turn on PC power switch' },
        { id: 5, action: 'ping_test', text: 'Run diagnostic ping test to verify' },
      ],
      clues: [
        {
          targetId: 'router',
          explain: {
            en: "Welcome to the home networking simulator! The router is currently connected to the modem via the wrong port. Routers receive internet from the modem through the WAN (Wide Area Network) port, not standard LAN ports.",
            id: "Selamat datang di simulator jaringan rumah! Router saat ini terhubung ke modem via port yang salah. Router menerima internet dari modem melalui port WAN (Wide Area Network), bukan port LAN standar."
          },
          hints: [
            {
              level: 'vague',
              text: {
                en: "The cable from the modem is plugged into a port meant for local client devices.",
                id: "Kabel dari modem tercolok ke port yang ditujukan untuk perangkat klien lokal."
              }
            },
            {
              level: 'direct',
              text: {
                en: "Select the scissors tool or ethernet cable tool and reconnect the modem to the WAN port of the router instead of LAN1.",
                id: "Pilih alat gunting atau alat kabel ethernet dan hubungkan kembali modem ke port WAN router, bukan LAN1."
              }
            },
            {
              level: 'actionable',
              text: {
                en: "Disconnect the cable between modem and router by clicking LAN1 port on the router, then select the ethernet cable tool and click Modem (port 'eth') to Router (port 'wan').",
                id: "Putuskan kabel antara modem dan router dengan mengeklik port LAN1 di router, lalu pilih alat kabel ethernet dan hubungkan Modem (port 'eth') ke Router (port 'wan')."
              }
            }
          ]
        },
        {
          targetId: 'pc',
          explain: {
            en: "The host PC is completely unpowered. We must run a power line from the power strip outlet to the PC power supply port.",
            id: "Host PC sama sekali tidak menyala. Kita harus menarik kabel daya dari colokan listrik (power strip) ke port catu daya PC."
          },
          hints: [
            {
              level: 'vague',
              text: {
                en: "The computer does not have a physical power source connected.",
                id: "Komputer tidak terhubung dengan sumber daya fisik."
              }
            },
            {
              level: 'direct',
              text: {
                en: "Use the Power Cable tool (black cable icon) to connect the Power Strip to the PC.",
                id: "Gunakan alat Kabel Daya (ikon kabel hitam) untuk menghubungkan Power Strip ke PC."
              }
            },
            {
              level: 'actionable',
              text: {
                en: "Select the black Power Cable tool, click on the Power Strip (outlet), and connect it to the PC (power).",
                id: "Pilih alat Kabel Daya hitam, klik pada Power Strip (outlet), lalu hubungkan ke PC (power)."
              }
            }
          ]
        },
        {
          targetId: 'pc',
          explain: {
            en: "The physical cable is connected, but the PC power switch is still turned off. We need to toggle the power button to boot up the system.",
            id: "Kabel fisik sudah terhubung, tetapi sakelar daya PC masih mati. Kita perlu menekan tombol power untuk menyalakan sistem."
          },
          hints: [
            {
              level: 'vague',
              text: {
                en: "The PC's power LED is still red/dark.",
                id: "LED daya PC masih merah/gelap."
              }
            },
            {
              level: 'direct',
              text: {
                en: "Click on the PC to view its inspect panel, then toggle its power switch to ON.",
                id: "Klik pada PC untuk melihat panel inspeksinya, lalu aktifkan sakelar dayanya ke ON."
              }
            },
            {
              level: 'actionable',
              text: {
                en: "Select the Pointer tool, click the PC device to inspect, and click the green 'TURN POWER ON' button in the inspect panel.",
                id: "Pilih alat Pointer, klik perangkat PC untuk menginspeksi, dan klik tombol hijau 'TURN POWER ON' di panel inspeksi."
              }
            }
          ]
        }
      ]
    },
  },
  {
    id: 't1_pc_repair_sim', title: { en: 'My First PC Repair (Sim)', id: 'Reparasi PC Pertama Saya (Sim)' },
    category: 'hardware', difficulty: 'easy', areaKey: 'repairCorner', requiredLevel: 1,
    xpReward: 150, coinReward: 30, puzzleType: 'pc_repair_sim', npcAvatar: '👩', npcName: 'Kak Ririn',
    description: { en: 'Diagnose and fix Kak Ririn\'s computer. The fans spin but there is no screen output, and it makes diagnostic beeping sounds.', id: 'Diagnosa dan perbaiki komputer Kak Ririn. Kipas menyala namun layar tidak menampilkan gambar, serta berbunyi bip berulang.' },
    npcDialogue: [
      { npc: 'Kak Ririn', avatar: '👩', msgEn: "When I turn on my computer, the fan spins but nothing shows on the monitor, and the computer makes a weird pattern of 3 beeps!", msgId: 'Saat saya menyalakan komputer, kipas berputar tetapi tidak ada tampilan di layar monitor, dan komputernya mengeluarkan bunyi bip 3 kali!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "A pattern of 3 beeps usually indicates a memory (RAM) error. Let's open the case and inspect the RAM slots and cabling.", msgId: 'Pola bunyi bip 3 kali biasanya mengindikasikan error pada memori (RAM). Mari kita buka casing dan periksa slot RAM serta perkabelan.' },
    ],
    puzzleData: {
      symptom: '❌ System error: Continuous short beeps (No post / RAM issue)',
      slots: [
        { id: 'cpu', label: 'Intel Core i5' },
        { id: 'cooler', label: 'CPU Cooler' },
        { id: 'ram1', label: 'DIMM Slot A1' },
        { id: 'ram2', label: 'DIMM Slot B1' },
        { id: 'gpu', label: 'Nvidia GTX 1660' },
        { id: 'ssd', label: 'SATA SSD' },
      ],
      initialHardware: {
        cpu: { state: 'connected', label: 'Intel Core i5' },
        cooler: { state: 'connected', label: 'Intel Cooler' },
        ram1: { state: 'loose', label: 'DDR4 8GB Stick' },
        ram2: { state: 'unplugged', label: 'Empty Slot' },
        gpu: { state: 'properly_seated', label: 'Nvidia GTX 1660' },
        ssd: { state: 'properly_seated', label: 'SATA SSD' },
      },
      initialCables: {
        atx24pin: false,
        cpu8pin: true,
        gpu6pin: true,
        sataPower: true,
        sataData: true,
        frontPanel: true,
        fanHeader: true,
      },
      successMsg: 'The RAM is now seated securely and the 24-Pin motherboard power cable is plugged in. Excellent hardware troubleshooting!',
      lesson: 'Diagnostic beep codes (like 3 beeps for memory errors) are a motherboard\'s way of communicating hardware faults before video output is established. A loose ATX 24-Pin cable will prevent the motherboard from initializing at all.',
      clues: [
        {
          targetId: 'casePanel',
          explain: {
            en: "Welcome to your first hands-on PC repair! First, we need to inspect the internals of the computer. Locate and remove the glass side panel by clicking on it.",
            id: "Selamat datang di reparasi PC langsung pertamamu! Pertama, kita perlu memeriksa bagian dalam komputer. Temukan dan lepaskan panel kaca samping dengan mengekliknya."
          },
          hints: [
            {
              level: 'vague',
              text: {
                en: "The components inside are hidden behind the protective casing.",
                id: "Komponen di dalam tersembunyi di balik casing pelindung."
              }
            },
            {
              level: 'direct',
              text: {
                en: "Click the tinted glass cover on the PC chassis to open it.",
                id: "Klik penutup kaca tempered gelap di bodi PC untuk membukanya."
              }
            },
            {
              level: 'actionable',
              text: {
                en: "Click the large tinted window area in the center of the computer chassis to slide the side panel off.",
                id: "Klik area jendela kaca tempered gelap besar di tengah bodi komputer untuk membuka panel samping."
              }
            }
          ]
        },
        {
          targetId: 'atx24pin',
          explain: {
            en: "Look at the motherboard. The large 24-Pin ATX motherboard power connector is disconnected. This main cable provides primary electricity to all core chips.",
            id: "Lihatlah motherboard-nya. Konektor daya ATX 24-Pin motherboard yang besar terputus. Kabel utama ini menyediakan listrik primer ke seluruh chip inti."
          },
          hints: [
            {
              level: 'vague',
              text: {
                en: "The motherboard has no main power flowing into it.",
                id: "Motherboard tidak memiliki daya utama yang mengalir ke dalamnya."
              }
            },
            {
              level: 'direct',
              text: {
                en: "Connect the ATX 24-Pin Cable from the Power Supply Cable Manager at the bottom.",
                id: "Hubungkan Kabel ATX 24-Pin dari Pengelola Kabel Power Supply di bagian bawah."
              }
            },
            {
              level: 'actionable',
              text: {
                en: "Locate 'ATX 24-Pin Power' in the Power Supply Cable Manager list below and click its 'DISCONNECTED' button to plug it in.",
                id: "Temukan 'ATX 24-Pin Power' di daftar Pengelola Kabel Power Supply di bawah dan klik tombol 'DISCONNECTED' untuk mencolokkannya."
              }
            }
          ]
        },
        {
          targetId: 'ram1',
          explain: {
            en: "The computer makes a 3-beep sound, which indicates a memory error. Look closely at the DIMM A1 RAM slot — the RAM stick is loose and not seated correctly. We must secure it.",
            id: "Komputer berbunyi bip 3 kali, menandakan kesalahan memori. Perhatikan baik-baik slot RAM DIMM A1 — stik RAM longgar dan tidak terpasang dengan benar. Kita harus mengamankannya."
          },
          hints: [
            {
              level: 'vague',
              text: {
                en: "One of the RAM sticks is not properly locked into its slot.",
                id: "Salah satu keping RAM tidak terkunci dengan benar ke dalam slotnya."
              }
            },
            {
              level: 'direct',
              text: {
                en: "Click on the RAM slot (DIMM A1) to open its inspection dialog and toggle its seating.",
                id: "Klik pada slot RAM (DIMM A1) untuk membuka dialog inspeksi dan ubah status pengunciannya."
              }
            },
            {
              level: 'actionable',
              text: {
                en: "Click on DIMM A1 (the cyan RAM stick), then click the green 'Seat RAM Correctly' button in the inspect panel.",
                id: "Klik DIMM A1 (keping RAM berwarna cyan), lalu klik tombol hijau 'Seat RAM Correctly' di panel inspeksi."
              }
            }
          ]
        },
        {
          targetId: 'frontPanel',
          explain: {
            en: "Hardware issues are resolved! Now we need to power the computer up. Turn on the main PSU switch, then turn on the computer.",
            id: "Masalah hardware telah diatasi! Sekarang kita perlu menyalakan komputer. Hidupkan sakelar utama PSU, lalu hidupkan komputer."
          },
          hints: [
            {
              level: 'vague',
              text: {
                en: "We need to send electrical power to start the boot process.",
                id: "Kita perlu mengalirkan daya listrik untuk memulai proses booting."
              }
            },
            {
              level: 'direct',
              text: {
                en: "Make sure the PSU Switch (bottom left) is flipped to 'I' (ON) and click the Power Button on the PC Front Panel.",
                id: "Pastikan Sakelar PSU (kiri bawah) diputar ke 'I' (ON) dan klik Tombol Power di Panel Depan PC."
              }
            },
            {
              level: 'actionable',
              text: {
                en: "Flip the PSU switch at the bottom left to 'I', then click the red 'Power Switch' button on the front panel controller.",
                id: "Nyalakan sakelar PSU di kiri bawah ke 'I', lalu klik tombol merah 'Power Switch' di pengontrol panel depan."
              }
            }
          ]
        }
      ]
    },
  },
];
