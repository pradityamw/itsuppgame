// Emergency Incident System
// Random high-urgency events that appear during gameplay

export const EMERGENCY_EVENTS = [
  // ── CRITICAL (5x XP) ────────────────────────────────────────
  {
    id: 'em_ransomware',
    title: '🚨 RANSOMWARE DETECTED!',
    titleId: '🚨 RANSOMWARE TERDETEKSI!',
    description: 'Files are being encrypted across the entire company network. Stop the spread immediately!',
    descriptionId: 'File sedang dienkripsi di seluruh jaringan perusahaan. Hentikan penyebarannya sekarang!',
    urgency: 'critical',
    category: 'security',
    minLevel: 15,
    xpMultiplier: 5,
    timeLimit: 180,   // seconds (visual only, no hard fail)
    coinBonus: 500,
    steps: [
      'Isolate infected machines from network immediately',
      'Identify patient zero and source',
      'Block ransomware from spreading to backups',
      'Notify management and start incident log',
      'Begin recovery from clean backups',
    ],
    quiz: [
      { q: 'What is the FIRST action during a ransomware attack?', qId: 'Apa tindakan PERTAMA saat serangan ransomware?',
        options: ['Pay the ransom', 'Disconnect infected machines from network', 'Call the police', 'Reinstall Windows'],
        optionsId: ['Bayar tebusan', 'Putuskan mesin terinfeksi dari jaringan', 'Hubungi polisi', 'Reinstall Windows'],
        correct: 1, explanation: 'Immediate network isolation prevents ransomware from spreading to other machines and backups.' },
      { q: 'Which backup type is SAFEST against ransomware?', qId: 'Jenis backup TERAMAN dari ransomware?',
        options: ['Cloud-synced backup', 'Network share backup', 'Air-gapped offline backup', 'Same-drive backup'],
        optionsId: ['Backup cloud sync', 'Backup network share', 'Backup offline air-gapped', 'Backup drive yang sama'],
        correct: 2, explanation: 'Air-gapped backups cannot be reached by ransomware over the network.' },
    ],
  },
  {
    id: 'em_server_down',
    title: '🔴 CRITICAL SERVER DOWN!',
    titleId: '🔴 SERVER KRITIS MATI!',
    description: 'The main web server crashed. 500 users cannot access the company portal.',
    descriptionId: 'Server web utama crash. 500 pengguna tidak bisa akses portal perusahaan.',
    urgency: 'critical',
    category: 'sysadmin',
    minLevel: 20,
    xpMultiplier: 4,
    timeLimit: 120,
    coinBonus: 400,
    steps: [
      'Check server error logs immediately',
      'Identify if hardware or software failure',
      'Restart failed services (Apache/Nginx/IIS)',
      'If hardware: failover to backup server',
      'Notify users and update status page',
    ],
    quiz: [
      { q: 'A web server is down. What do you check FIRST?', qId: 'Server web mati. Apa yang PERTAMA dicek?',
        options: ['Call the hosting provider', 'Check server error logs', 'Reinstall the OS', 'Check the cables'],
        optionsId: ['Hubungi hosting provider', 'Cek log error server', 'Reinstall OS', 'Cek kabel'],
        correct: 1, explanation: 'Error logs tell you exactly WHY the server crashed, which determines the fix.' },
    ],
  },
  {
    id: 'em_ceo_laptop',
    title: '💼 CEO LAPTOP CRASHED!',
    titleId: '💼 LAPTOP CEO CRASH!',
    description: 'The CEO presentation starts in 15 minutes. Laptop shows BSOD. Fix it NOW!',
    descriptionId: 'Presentasi CEO mulai 15 menit lagi. Laptop BSOD. Perbaiki SEKARANG!',
    urgency: 'critical',
    category: 'os',
    minLevel: 5,
    xpMultiplier: 4,
    timeLimit: 90,
    coinBonus: 300,
    steps: [
      'Read the BSOD stop code',
      'Force restart and check if boots normally',
      'If not: boot into Safe Mode',
      'Roll back recent driver or update',
      'Prepare backup laptop as contingency',
    ],
    quiz: [
      { q: 'A laptop shows BSOD code 0x0000007B. What does this usually mean?', qId: 'Laptop BSOD 0x0000007B. Apa artinya?',
        options: ['RAM failure', 'GPU overheating', 'Boot drive not accessible', 'Network card failed'],
        optionsId: ['RAM rusak', 'GPU overheat', 'Boot drive tidak bisa diakses', 'Network card rusak'],
        correct: 2, explanation: '0x7B (INACCESSIBLE_BOOT_DEVICE) means Windows cannot access the boot drive — often a driver issue.' },
    ],
  },

  // ── HIGH (3x XP) ─────────────────────────────────────────────
  {
    id: 'em_office_internet',
    title: '📡 ENTIRE OFFICE OFFLINE!',
    titleId: '📡 SELURUH KANTOR OFFLINE!',
    description: 'All 50 employees lost internet. Meeting scheduled in 30 minutes!',
    descriptionId: '50 karyawan kehilangan internet. Meeting 30 menit lagi!',
    urgency: 'high',
    category: 'networking',
    minLevel: 8,
    xpMultiplier: 3,
    timeLimit: 150,
    coinBonus: 200,
    steps: [
      'Check if it is ISP-side or internal',
      'Ping the gateway and 8.8.8.8',
      'Inspect main router/switch status',
      'Check DHCP server if IPs are not assigned',
      'Call ISP if external issue confirmed',
    ],
    quiz: [
      { q: 'Office has no internet. Pinging 8.8.8.8 FAILS but pinging 192.168.1.1 SUCCEEDS. Problem is?',
        qId: 'Kantor tidak ada internet. Ping 8.8.8.8 GAGAL tapi ping 192.168.1.1 BERHASIL. Masalahnya?',
        options: ['LAN cable broken', 'Internal network fine, ISP/WAN issue', 'DNS problem', 'Firewall blocked'],
        optionsId: ['Kabel LAN putus', 'Jaringan internal baik, masalah ISP/WAN', 'Masalah DNS', 'Diblokir firewall'],
        correct: 1, explanation: 'LAN (192.168.1.1) works = internal is fine. WAN (8.8.8.8) fails = ISP or gateway issue.' },
    ],
  },
  {
    id: 'em_dc_overheating',
    title: '🌡️ DATA CENTER OVERHEATING!',
    titleId: '🌡️ DATA CENTER OVERHEAT!',
    description: 'Server room temperature reached 45°C! AC unit failed. Servers shutting down!',
    descriptionId: 'Suhu server room 45°C! AC mati. Server mulai shutdown!',
    urgency: 'high',
    category: 'hardware',
    minLevel: 25,
    xpMultiplier: 3,
    timeLimit: 120,
    coinBonus: 250,
    steps: [
      'Immediately open cold air emergency vents',
      'Identify non-critical servers to shut down first',
      'Contact facilities for emergency AC repair',
      'Set up temporary portable cooling fans',
      'Document temperature logs for incident report',
    ],
    quiz: [
      { q: 'What is the IDEAL server room temperature range?', qId: 'Kisaran suhu ideal server room?',
        options: ['10–15°C', '18–27°C', '30–35°C', '5–10°C'],
        optionsId: ['10–15°C', '18–27°C', '30–35°C', '5–10°C'],
        correct: 1, explanation: 'ASHRAE recommends 18–27°C (64–80°F) for server rooms to balance cooling and efficiency.' },
    ],
  },
  {
    id: 'em_phishing_attack',
    title: '🎣 MASS PHISHING ATTACK!',
    titleId: '🎣 SERANGAN PHISHING MASSAL!',
    description: '20 employees received a fake invoice email with a malware link. Some already clicked!',
    descriptionId: '20 karyawan terima email invoice palsu dengan link malware. Beberapa sudah klik!',
    urgency: 'high',
    category: 'security',
    minLevel: 18,
    xpMultiplier: 3,
    timeLimit: 160,
    coinBonus: 220,
    steps: [
      'Send immediate all-staff warning: "Do not click!"',
      'Identify who clicked the link',
      'Isolate affected machines',
      'Run full antivirus scan on those machines',
      'Block sender domain at email gateway',
    ],
    quiz: [
      { q: 'How do you identify a phishing email?', qId: 'Bagaimana cara mengidentifikasi email phishing?',
        options: ['It has images', 'Sender email mismatches claimed organization', 'It was sent on weekend', 'It has attachments'],
        optionsId: ['Ada gambar', 'Email pengirim tidak cocok dengan organisasi yang diklaim', 'Dikirim weekend', 'Ada lampiran'],
        correct: 1, explanation: 'Phishers often use lookalike domains (e.g., "support@micr0soft.com") that differ from the real domain.' },
    ],
  },

  // ── MEDIUM (2x XP) ───────────────────────────────────────────
  {
    id: 'em_printer_jam',
    title: '🖨️ PRINTER MELTDOWN!',
    titleId: '🖨️ PRINTER CRASH!',
    description: 'All office printers offline before quarterly reports due in 2 hours.',
    descriptionId: 'Semua printer kantor offline sebelum laporan kuartalan due 2 jam lagi.',
    urgency: 'medium',
    category: 'hardware',
    minLevel: 3,
    xpMultiplier: 2,
    timeLimit: 180,
    coinBonus: 100,
    steps: ['Clear print queue', 'Restart Print Spooler service', 'Check network printer IP', 'Reinstall printer driver if needed'],
    quiz: [
      { q: 'Print Spooler keeps crashing. Best solution?', qId: 'Print Spooler terus crash. Solusi terbaik?',
        options: ['Restart PC', 'Clear spool folder and restart service', 'Buy a new printer', 'Update Windows'],
        optionsId: ['Restart PC', 'Bersihkan folder spool dan restart service', 'Beli printer baru', 'Update Windows'],
        correct: 1, explanation: 'Corrupt files in C:\\Windows\\System32\\spool\\PRINTERS cause spooler crashes. Delete them and restart the service.' },
    ],
  },
  {
    id: 'em_vpn_failure',
    title: '🔐 VPN DOWN — REMOTE TEAM CAN\'T WORK!',
    titleId: '🔐 VPN MATI — TIM REMOTE TIDAK BISA KERJA!',
    description: '30 remote workers cannot connect to VPN. Workday is being wasted!',
    descriptionId: '30 pekerja remote tidak bisa konek VPN. Hari kerja terbuang sia-sia!',
    urgency: 'medium',
    category: 'networking',
    minLevel: 30,
    xpMultiplier: 2,
    timeLimit: 150,
    coinBonus: 150,
    steps: ['Check VPN server status', 'Verify SSL certificates not expired', 'Check firewall rules', 'Test with admin account', 'Restart VPN service'],
    quiz: [
      { q: 'VPN users suddenly cannot connect. SSL cert check shows expired. What do you do?', qId: 'Pengguna VPN tiba-tiba tidak bisa konek. Cek SSL cert menunjukkan expired. Apa yang dilakukan?',
        options: ['Ask users to wait', 'Renew SSL certificate immediately', 'Reinstall VPN client on all PCs', 'Change VPN provider'],
        optionsId: ['Minta user tunggu', 'Perbarui sertifikat SSL segera', 'Reinstall VPN client di semua PC', 'Ganti provider VPN'],
        correct: 1, explanation: 'Expired SSL/TLS certificates prevent VPN connections. Renew or replace the certificate immediately.' },
    ],
  },
  {
    id: 'em_wifi_dead',
    title: '📶 ENTIRE FLOOR WIFI DEAD!',
    titleId: '📶 WIFI SATU LANTAI MATI!',
    description: 'WiFi on Floor 3 completely dead. 25 employees affected!',
    descriptionId: 'WiFi lantai 3 mati total. 25 karyawan terdampak!',
    urgency: 'medium',
    category: 'networking',
    minLevel: 12,
    xpMultiplier: 2,
    timeLimit: 120,
    coinBonus: 120,
    steps: ['Check access point status LEDs', 'Ping AP from controller', 'Reboot access point', 'Check PoE switch port', 'Replace AP if hardware failed'],
    quiz: [
      { q: 'Access point is not broadcasting SSID. Ping to its IP fails. Most likely cause?', qId: 'Access point tidak broadcast SSID. Ping ke IP-nya gagal. Kemungkinan penyebab?',
        options: ['Too many clients', 'AP power failure (PoE switch port dead)', 'Password changed', 'Too far from router'],
        optionsId: ['Terlalu banyak klien', 'AP tidak mendapat daya (port PoE switch mati)', 'Password berubah', 'Terlalu jauh dari router'],
        correct: 1, explanation: 'Enterprise APs are powered via PoE (Power over Ethernet). A dead PoE switch port = AP has no power.' },
    ],
  },
  {
    id: 'em_disk_full',
    title: '💾 PRODUCTION SERVER DISK FULL!',
    titleId: '💾 DISK SERVER PRODUKSI PENUH!',
    description: 'Main server disk is at 100%. Applications are crashing!',
    descriptionId: 'Disk server utama 100% penuh. Aplikasi-aplikasi crash!',
    urgency: 'medium',
    category: 'sysadmin',
    minLevel: 22,
    xpMultiplier: 2,
    timeLimit: 100,
    coinBonus: 130,
    steps: ['Find what is consuming disk space (du -sh)', 'Delete or archive old log files', 'Move large files to backup storage', 'Set up log rotation for future'],
    quiz: [
      { q: 'Linux server disk full. Which command finds largest directories?', qId: 'Disk server Linux penuh. Perintah mana yang menemukan direktori terbesar?',
        options: ['ls -la', 'du -sh /* | sort -rh | head -20', 'df -h', 'top'],
        optionsId: ['ls -la', 'du -sh /* | sort -rh | head -20', 'df -h', 'top'],
        correct: 1, explanation: '"du -sh" shows disk usage per directory. Piping to sort helps find the biggest space hogs quickly.' },
    ],
  },
  {
    id: 'em_ad_lockout',
    title: '🔒 ACTIVE DIRECTORY LOCKOUT WAVE!',
    titleId: '🔒 GELOMBANG LOCKOUT ACTIVE DIRECTORY!',
    description: '15 users locked out of AD simultaneously. Password attacks detected!',
    descriptionId: '15 pengguna terkunci dari AD sekaligus. Serangan password terdeteksi!',
    urgency: 'high',
    category: 'security',
    minLevel: 40,
    xpMultiplier: 3,
    timeLimit: 140,
    coinBonus: 180,
    steps: ['Identify source IP of failed login attempts', 'Block attacking IP at firewall', 'Unlock affected user accounts', 'Force password reset for affected users', 'Enable MFA if not already active'],
    quiz: [
      { q: 'Multiple AD accounts locked out at once. Best first step?', qId: 'Banyak akun AD terkunci sekaligus. Langkah pertama terbaik?',
        options: ['Reset all passwords', 'Check security logs for failed login source IP', 'Disable all accounts temporarily', 'Restart AD server'],
        optionsId: ['Reset semua password', 'Cek log keamanan untuk IP sumber login gagal', 'Nonaktifkan semua akun sementara', 'Restart server AD'],
        correct: 1, explanation: 'Checking security event logs (Event ID 4625) identifies the attacking IP, allowing you to block it at the firewall.' },
    ],
  },
];

/**
 * Roll for an emergency event based on player level
 * Returns an event or null
 */
export function rollForEmergency(playerLevel, chancePercent = 8) {
  if (Math.random() * 100 > chancePercent) return null;
  const available = EMERGENCY_EVENTS.filter(e => e.minLevel <= playerLevel);
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}

/**
 * Get emergency by id
 */
export function getEmergencyById(id) {
  return EMERGENCY_EVENTS.find(e => e.id === id) ?? null;
}

/**
 * Get urgency style info
 */
export function getUrgencyStyle(urgency) {
  switch (urgency) {
    case 'critical': return { color: '#ff2d78', bg: 'rgba(255,45,120,0.1)', label: 'CRITICAL', pulse: true };
    case 'high':     return { color: '#ff6b00', bg: 'rgba(255,107,0,0.1)',  label: 'HIGH',     pulse: true };
    case 'medium':   return { color: '#ffe600', bg: 'rgba(255,230,0,0.08)', label: 'MEDIUM',   pulse: false };
    default:         return { color: '#00f5ff', bg: 'rgba(0,245,255,0.08)', label: 'LOW',      pulse: false };
  }
}
