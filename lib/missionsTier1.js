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
];
