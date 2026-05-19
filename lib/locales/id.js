// EN/ID Localization — Indonesian (Bahasa Indonesia)
const id = {
  // ===== META =====
  gameName: 'IT Support Adventure',
  tagline: 'Belajar IT Support. Satu Tiket Sekaligus.',
  version: 'v1.0',

  // ===== LANGUAGE PICKER =====
  chooseLanguage: 'Pilih Bahasa Kamu',
  languageSubtitle: 'Kamu bisa mengubahnya kapan saja di pengaturan',
  english: 'English',
  indonesian: 'Bahasa Indonesia',
  confirm: 'Konfirmasi',

  // ===== AUTH =====
  login: 'Masuk',
  register: 'Daftar',
  logout: 'Keluar',
  email: 'Alamat Email',
  password: 'Kata Sandi',
  confirmPassword: 'Konfirmasi Kata Sandi',
  name: 'Nama Kamu',
  guestPlay: 'Main Sebagai Tamu',
  noAccount: 'Belum punya akun?',
  hasAccount: 'Sudah punya akun?',
  loginWith: 'Masuk',
  registerWith: 'Buat Akun',
  loginSuccess: 'Selamat datang kembali, teknisi!',
  registerSuccess: 'Akun berhasil dibuat! Selamat bergabung!',
  loginError: 'Email atau kata sandi salah.',
  authLoading: 'Menghubungkan ke server...',

  // ===== MAIN MENU =====
  play: 'Main',
  continueGame: 'Lanjutkan',
  newGame: 'Game Baru',
  settings: 'Pengaturan',
  profile: 'Profil',
  leaderboard: 'Papan Peringkat',
  credits: 'Kredit',
  dailyBonus: 'Ambil Bonus Harian',
  streakDays: 'Streak {n} Hari! 🔥',

  // ===== GAME HUB =====
  hub: 'Pusat Misi',
  adventureMode: 'Mode Petualangan',
  dailyMode: 'Tugas Harian',
  workshopMode: 'Workshop',
  profileMode: 'Profil Saya',
  exploreMaps: 'Jelajahi Area',
  availableMissions: 'Misi Tersedia',
  completedMissions: 'Selesai',
  lockedMissions: 'Terkunci',
  requiresLevel: 'Butuh Level {n}',

  // ===== XP / LEVEL =====
  level: 'Level',
  xp: 'XP',
  coins: 'Koin',
  rank: 'Pangkat',
  xpToNext: '{n} XP ke level berikutnya',
  levelUp: 'NAIK LEVEL!',
  rankUp: 'NAIK PANGKAT!',
  newRank: 'Kamu sekarang: {rank}',

  // ===== RANKS =====
  ranks: {
    intern: 'Magang',
    junior: 'IT Junior',
    support: 'IT Support',
    tech: 'Teknisi Jaringan',
    sysadmin: 'SysAdmin',
    senior: 'Senior Engineer',
  },

  // ===== MISSIONS =====
  missions: 'Misi',
  missionStart: 'Mulai Misi',
  missionResume: 'Lanjutkan',
  missionRetry: 'Coba Lagi',
  missionComplete: 'Misi Selesai!',
  missionFailed: 'Misi Gagal',
  missionObjective: 'Tujuan',
  missionHint: 'Petunjuk',
  showHint: 'Tampilkan Petunjuk',
  difficulty: 'Kesulitan',
  reward: 'Hadiah',
  xpReward: '+{n} XP',
  coinReward: '+{n} Koin',
  timeBonus: 'Bonus Kecepatan!',

  // ===== BEGINNER MISSIONS =====
  mission1: {
    title: 'PC Tidak Mau Nyala',
    npc: 'Tolong! PC saya tidak mau menyala sama sekali! Sudah saya pencet tombol power 100 kali!',
    objective: 'Cari tahu mengapa PC tidak mau menyala dan perbaiki masalahnya.',
    hint: 'Periksa semua koneksi daya di dalam casing PC.',
    solution: 'Kabel PSU (Power Supply Unit) longgar. Menghubungkannya kembali memulihkan daya.',
    failExplain: 'Kabel PSU yang longgar mencegah PC menerima daya. Selalu periksa koneksi fisik terlebih dahulu!',
    category: 'Hardware',
  },
  mission2: {
    title: 'Internet Putus',
    npc: 'Internet saya tiba-tiba mati! Saya tidak bisa nonton video sama sekali!',
    objective: 'Cari tahu mengapa internet tidak bekerja dan pulihkan koneksinya.',
    hint: 'Periksa perangkat jaringan secara fisik — apakah semua kabel terpasang?',
    solution: 'Router tidak terhubung ke listrik. Menghubungkannya kembali memulihkan koneksi internet.',
    failExplain: 'Selalu periksa koneksi fisik sebelum troubleshooting yang kompleks. Mulai dari yang sederhana!',
    category: 'Jaringan',
  },
  mission3: {
    title: 'PC Terlalu Panas',
    npc: 'PC saya terus mati sendiri secara tiba-tiba! Bikin frustrasi banget!',
    objective: 'Identifikasi penyebab overheating dan selesaikan masalahnya.',
    hint: 'Periksa sistem pendingin — kipas, heatsink, dan sirkulasi udara.',
    solution: 'Debu menumpuk di kipas CPU sehingga menghalangi aliran udara. Membersihkannya mengatasi overheating.',
    failExplain: 'Debu adalah musuh diam PC. Pembersihan rutin setiap 6 bulan mencegah overheating.',
    category: 'Hardware',
  },
  mission4: {
    title: 'Printer Tidak Bekerja',
    npc: 'Saya perlu cetak laporan ini SEKARANG! Printer tidak merespons sama sekali!',
    objective: 'Cari tahu mengapa printer tidak merespons dan perbaiki koneksinya.',
    hint: 'Periksa kabel mana yang menghubungkan printer ke komputer.',
    solution: 'Kabel USB terpasang di port yang salah. Memindahkannya ke port yang benar memperbaiki masalah.',
    failExplain: 'Selalu verifikasi jenis kabel dan portnya. USB-A ≠ USB-B. Label itu penting!',
    category: 'Hardware',
  },
  mission5: {
    title: 'Komputer Lemot',
    npc: 'Komputer saya butuh waktu selamanya untuk menyala! Saya bisa bikin kopi dulu dan masih loading...',
    objective: 'Cari tahu mengapa PC lambat saat startup dan optimalkan.',
    hint: 'Periksa program apa yang berjalan otomatis saat Windows menyala.',
    solution: 'Terlalu banyak program startup yang memperlambat waktu booting. Menonaktifkan yang tidak perlu memperbaikinya.',
    failExplain: 'Program startup menggunakan RAM dan CPU sebelum kamu bahkan mulai menggunakan PC. Kelola dengan Task Manager!',
    category: 'Sistem Operasi',
  },

  // ===== DAILY TASKS =====
  dailyTasks: 'Tugas Harian',
  dailyReset: 'Reset dalam {time}',
  taskComplete: 'Tugas Selesai!',
  taskClaim: 'Ambil Hadiah',
  allDone: 'Semua selesai hari ini! Kembali lagi besok!',
  streakBonus: 'Bonus Streak: +{n} XP',
  taskEasy: 'Mudah',
  taskMedium: 'Sedang',
  taskHard: 'Sulit',

  // ===== PC REPAIR =====
  pcRepair: 'Perbaikan PC',
  openCase: 'Buka Casing PC',
  inspectComponents: 'Periksa Komponen',
  dragToFix: 'Seret komponen ke slot yang benar',
  componentFixed: 'Komponen Terpasang! ✓',
  componentWrong: 'Slot salah! Coba lagi.',
  allFixed: 'Semua komponen terhubung dengan benar!',
  components: {
    cpu: 'CPU (Prosesor)',
    ram: 'RAM (Memori)',
    ssd: 'SSD / HDD (Penyimpanan)',
    gpu: 'GPU (Kartu Grafis)',
    psu: 'PSU (Power Supply)',
    fan: 'Kipas CPU',
    motherboard: 'Motherboard',
    cables: 'Kabel Daya',
  },

  // ===== NETWORK PUZZLE =====
  networkPuzzle: 'Pemecah Masalah Jaringan',
  reconnectCable: 'Klik koneksi yang putus untuk menghubungkan kembali',
  pingTest: 'Jalankan Ping Test',
  pingSuccess: 'Ping berhasil! Koneksi pulih.',
  pingFail: 'Ping gagal. Periksa koneksimu.',
  networkFixed: 'Topologi jaringan berhasil dipulihkan!',
  devices: {
    internet: 'Internet',
    router: 'Router',
    switch: 'Switch',
    pc: 'PC',
    printer: 'Printer',
    server: 'Server',
    modem: 'Modem',
  },

  // ===== TERMINAL =====
  terminal: 'Terminal',
  terminalWelcome: 'IT Support Terminal v1.0\nKetik "help" untuk perintah yang tersedia.\n',
  terminalHelp: `Perintah yang tersedia:
  ping [host]     - Uji konektivitas jaringan
  ipconfig        - Tampilkan konfigurasi IP
  tracert [host]  - Lacak rute jaringan
  nslookup [host] - Kueri rekaman DNS
  netstat         - Tampilkan koneksi jaringan
  cls             - Bersihkan terminal
  help            - Tampilkan bantuan ini`,

  // ===== SKILL TREE =====
  skillTree: 'Pohon Keahlian',
  skillPoints: 'Poin Keahlian: {n}',
  unlockSkill: 'Buka Keahlian',
  skillUnlocked: 'Keahlian Terbuka: {skill}',
  skillCategories: {
    hardware: 'Hardware',
    networking: 'Jaringan',
    security: 'Keamanan',
    troubleshooting: 'Pemecahan Masalah',
    customerService: 'Layanan Pelanggan',
  },

  // ===== TOOLS =====
  tools: 'Alat',
  inventory: 'Inventaris',
  toolUnlocked: 'Alat Baru Terbuka: {tool}',
  toolNames: {
    screwdriver: 'Obeng',
    cableTester: 'Penguji Kabel',
    usbToolkit: 'USB Toolkit',
    thermalScanner: 'Pemindai Termal',
    adminKit: 'Admin Toolkit',
    networkAnalyzer: 'Penganalisis Jaringan',
  },

  // ===== MAP =====
  map: 'Peta Dunia',
  areas: {
    bedroom: 'Setup Kamar Tidur',
    repairShop: 'Toko Reparasi',
    homeNetwork: 'Jaringan Rumah',
    computerLab: 'Lab Komputer Sekolah',
    office: 'Gedung Kantor',
    internetCafe: 'Warnet',
    enterprise: 'Kantor Enterprise',
    serverRoom: 'Ruang Server',
    dataCenter: 'Data Center',
    secOps: 'Operasi Keamanan',
  },
  areaLocked: 'Area Terkunci — Selesaikan lebih banyak misi untuk membukanya!',
  areaUnlocked: 'Area Baru Terbuka: {area}!',

  // ===== ACHIEVEMENTS =====
  achievements: 'Pencapaian',
  achievementUnlocked: 'Pencapaian Terbuka!',
  achievementList: {
    firstFix: { name: 'Perbaikan Pertama!', desc: 'Selesaikan misi pertamamu' },
    speedRunner: { name: 'Pelari Cepat', desc: 'Selesaikan misi dalam 60 detik' },
    noHints: { name: 'Tanpa Petunjuk', desc: 'Selesaikan misi tanpa petunjuk' },
    streak7: { name: 'Pejuang Mingguan', desc: 'Login 7 hari berturut-turut' },
    streak30: { name: 'Pro Bulanan', desc: 'Login 30 hari berturut-turut' },
    level10: { name: 'Teknisi Muda', desc: 'Capai Level 10' },
    allBeginner: { name: 'Lulus Pemula', desc: 'Selesaikan semua misi pemula' },
    networkWiz: { name: 'Ahli Jaringan', desc: 'Perbaiki 10 masalah jaringan' },
    hardwarePro: { name: 'Pro Hardware', desc: 'Perbaiki 10 masalah hardware' },
  },

  // ===== PROFILE =====
  myProfile: 'Profil Saya',
  joinedDate: 'Bergabung: {date}',
  missionsCompleted: 'Misi Selesai',
  totalXP: 'Total XP Diperoleh',
  topSkill: 'Keahlian Utama',
  editProfile: 'Edit Profil',
  chooseAvatar: 'Pilih Avatar',

  // ===== SETTINGS =====
  settings: 'Pengaturan',
  sound: 'Suara',
  music: 'Musik',
  sfx: 'Efek Suara',
  language: 'Bahasa',
  notifications: 'Notifikasi',
  saveToCloud: 'Simpan ke Cloud',

  // ===== GENERAL =====
  loading: 'Memuat...',
  error: 'Terjadi kesalahan!',
  retry: 'Coba Lagi',
  cancel: 'Batal',
  close: 'Tutup',
  next: 'Berikutnya',
  back: 'Kembali',
  done: 'Selesai!',
  yes: 'Ya',
  no: 'Tidak',
  ok: 'OK',
  save: 'Simpan',
  continue: 'Lanjutkan',
  skip: 'Lewati',
  congratulations: 'Selamat!',
  youGot: 'Kamu mendapatkan:',
  missionObjective: 'Tujuan',
  inProgress: 'Sedang Berjalan',
  completed: 'Selesai',
  locked: 'Terkunci',
};

export default id;
