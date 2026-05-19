// KNOWLEDGE BASE — Step 7
// Articles unlocked by completing missions. Searchable wiki with symptom/cause/solution/commands.

export const KB_ARTICLES = [

  // ── HARDWARE ──────────────────────────────────────────────────
  {
    id: 'kb_001', category: 'hardware', tier: 1,
    unlockedBy: ['t1_001', 't1_002'],
    title: { en: 'PC Not Turning On', id: 'PC Tidak Mau Menyala' },
    emoji: '🖥️',
    symptom: { en: 'PC shows no power — no LED, no fan spin, completely dead.', id: 'PC tidak ada daya — tidak ada LED, tidak ada putaran kipas, mati total.' },
    cause: { en: 'Failed PSU, dead power button, blown fuse, or bad wall outlet.', id: 'PSU gagal, tombol power rusak, sekering putus, atau stop kontak bermasalah.' },
    solution: { en: '1. Check wall outlet with another device. 2. Check PSU power switch (rear of PC). 3. Use PSU tester or paperclip test. 4. Replace PSU if dead. 5. Check power button connector on motherboard.', id: '1. Periksa stop kontak dengan perangkat lain. 2. Periksa saklar PSU (belakang PC). 3. Gunakan tester PSU atau tes paperclip. 4. Ganti PSU jika rusak. 5. Periksa konektor tombol power di motherboard.' },
    commands: [],
    tags: ['psu', 'power', 'hardware', 'no-boot'],
  },
  {
    id: 'kb_002', category: 'hardware', tier: 1,
    unlockedBy: ['t1_003', 't1_004'],
    title: { en: 'RAM Troubleshooting', id: 'Troubleshooting RAM' },
    emoji: '🔧',
    symptom: { en: 'Frequent BSODs, random crashes, PC won\'t POST (no video signal).', id: 'BSOD sering, crash acak, PC tidak POST (tidak ada sinyal video).' },
    cause: { en: 'Faulty RAM stick, wrong RAM slot, incompatible speed, or loose seating.', id: 'Stick RAM rusak, slot RAM salah, kecepatan tidak kompatibel, atau pemasangan longgar.' },
    solution: { en: '1. Reseat RAM firmly (press until both clips click). 2. Test one stick at a time. 3. Try RAM in different slots. 4. Run Windows Memory Diagnostic (mdsched.exe). 5. Check motherboard QVL for compatible RAM.', id: '1. Pasang ulang RAM dengan kuat (tekan sampai kedua klip klik). 2. Uji satu stick sekaligus. 3. Coba RAM di slot berbeda. 4. Jalankan Windows Memory Diagnostic (mdsched.exe). 5. Periksa QVL motherboard untuk RAM yang kompatibel.' },
    commands: ['mdsched.exe', 'winver'],
    tags: ['ram', 'memory', 'bsod', 'hardware'],
  },

  // ── WINDOWS OS ────────────────────────────────────────────────
  {
    id: 'kb_003', category: 'windows', tier: 2,
    unlockedBy: ['t2_001', 't2_002'],
    title: { en: 'Internet Connected but Websites Won\'t Load', id: 'Internet Tersambung tapi Website Tidak Bisa Dibuka' },
    emoji: '🌐',
    symptom: { en: 'All websites fail to load. Ping to IP works fine but ping to domain name fails.', id: 'Semua website gagal dimuat. Ping ke IP bekerja tapi ping ke nama domain gagal.' },
    cause: { en: 'DNS server is unreachable or not responding.', id: 'Server DNS tidak dapat dijangkau atau tidak merespons.' },
    solution: { en: '1. Run: nslookup google.com — if timeout, DNS is the issue. 2. Change DNS to 8.8.8.8 (Google) or 1.1.1.1 (Cloudflare). 3. Run: ipconfig /flushdns to clear cache. 4. Restart router/modem.', id: '1. Jalankan: nslookup google.com — jika timeout, DNS adalah masalahnya. 2. Ubah DNS ke 8.8.8.8 atau 1.1.1.1. 3. Jalankan: ipconfig /flushdns untuk hapus cache. 4. Restart router/modem.' },
    commands: ['nslookup google.com', 'ipconfig /flushdns', 'netsh interface ip set dns "Ethernet" static 8.8.8.8'],
    tags: ['dns', 'internet', 'network', 'browser'],
  },
  {
    id: 'kb_004', category: 'windows', tier: 3,
    unlockedBy: ['t3_001', 't3_004'],
    title: { en: 'Fixing Corrupted System Files (SFC + DISM)', id: 'Memperbaiki File Sistem Korup (SFC + DISM)' },
    emoji: '🛡️',
    symptom: { en: 'Random Windows errors, apps won\'t open, system instability after failed update.', id: 'Error Windows acak, aplikasi tidak bisa dibuka, ketidakstabilan sistem setelah update gagal.' },
    cause: { en: 'Corrupted Windows system files — often caused by interrupted updates or disk errors.', id: 'File sistem Windows korup — sering disebabkan oleh update yang terputus atau error disk.' },
    solution: { en: '1. Run DISM first to repair the Windows image: DISM /Online /Cleanup-Image /RestoreHealth. 2. Then run SFC: sfc /scannow. 3. Restart. 4. If still failing, run sfc /scannow again.', id: '1. Jalankan DISM dulu untuk perbaiki image Windows: DISM /Online /Cleanup-Image /RestoreHealth. 2. Kemudian jalankan SFC: sfc /scannow. 3. Restart. 4. Jika masih gagal, jalankan sfc /scannow lagi.' },
    commands: ['DISM /Online /Cleanup-Image /RestoreHealth', 'sfc /scannow'],
    tags: ['sfc', 'dism', 'corruption', 'system-files', 'windows'],
  },
  {
    id: 'kb_005', category: 'windows', tier: 3,
    unlockedBy: ['t3_009'],
    title: { en: 'Active Directory Account Lockout', id: 'Lockout Akun Active Directory' },
    emoji: '🔒',
    symptom: { en: 'User cannot log in — error "Your account has been locked". BadPwdCount exceeded policy threshold.', id: 'Pengguna tidak bisa login — error "Akun Anda telah dikunci". BadPwdCount melebihi ambang kebijakan.' },
    cause: { en: 'Too many failed login attempts (usually misconfigured mapped drive, cached credentials, or forgotten new password).', id: 'Terlalu banyak percobaan login gagal (biasanya mapped drive yang salah konfigurasi, kredensial cache, atau password baru yang terlupakan).' },
    solution: { en: '1. Check lockout: Get-ADUser -Identity <user> -Properties LockedOut,BadPwdCount. 2. Unlock: Unlock-ADAccount -Identity <user>. 3. Verify: Get-ADUser -Identity <user> -Properties LockedOut. 4. Reset counter: Set-ADUser -Identity <user> -Replace @{badPwdCount=0}.', id: '1. Cek lockout: Get-ADUser -Identity <user> -Properties LockedOut,BadPwdCount. 2. Buka kunci: Unlock-ADAccount -Identity <user>. 3. Verifikasi. 4. Reset counter: Set-ADUser -Identity <user> -Replace @{badPwdCount=0}.' },
    commands: [
      'Get-ADUser -Identity <user> -Properties LockedOut,BadPwdCount | Select Name,LockedOut,BadPwdCount',
      'Unlock-ADAccount -Identity <user>',
      'Set-ADUser -Identity <user> -Replace @{badPwdCount=0}',
    ],
    tags: ['active-directory', 'lockout', 'ad', 'powershell'],
  },

  // ── NETWORKING ────────────────────────────────────────────────
  {
    id: 'kb_006', category: 'networking', tier: 4,
    unlockedBy: ['t4_001'],
    title: { en: 'DHCP Failure — APIPA Addresses (169.254.x.x)', id: 'Kegagalan DHCP — Alamat APIPA (169.254.x.x)' },
    emoji: '📡',
    symptom: { en: 'PC gets 169.254.x.x address. Cannot reach any network resource.', id: 'PC mendapat alamat 169.254.x.x. Tidak bisa menjangkau resource jaringan apapun.' },
    cause: { en: 'DHCP server is unavailable — PC falls back to APIPA (Automatic Private IP Addressing).', id: 'Server DHCP tidak tersedia — PC menggunakan APIPA (Automatic Private IP Addressing).' },
    solution: { en: '1. Check DHCP service: Get-Service DHCPServer. 2. Start if stopped: Start-Service DHCPServer. 3. Verify scope: Get-DhcpServerv4Scope. 4. Force client renewal: ipconfig /release && ipconfig /renew.', id: '1. Periksa layanan DHCP: Get-Service DHCPServer. 2. Start jika berhenti: Start-Service DHCPServer. 3. Verifikasi scope. 4. Paksa pembaruan klien: ipconfig /release && ipconfig /renew.' },
    commands: ['ipconfig /release', 'ipconfig /renew', 'Get-Service DHCPServer', 'Start-Service DHCPServer'],
    tags: ['dhcp', 'apipa', 'networking', '169.254'],
  },
  {
    id: 'kb_007', category: 'networking', tier: 4,
    unlockedBy: ['t4_006'],
    title: { en: 'Diagnosing Packet Loss', id: 'Mendiagnosa Packet Loss' },
    emoji: '📊',
    symptom: { en: 'Video calls choppy, files transfer slowly, intermittent connection drops.', id: 'Video call putus-putus, transfer file lambat, koneksi putus intermiten.' },
    cause: { en: 'Faulty network hop (ISP or internal), duplex mismatch, or overloaded switch port.', id: 'Hop jaringan bermasalah (ISP atau internal), duplex mismatch, atau port switch kelebihan beban.' },
    solution: { en: '1. tracert -d <destination> — find the problematic hop (look for * or high latency). 2. ping -n 100 <hop-IP> — measure exact packet loss percentage. 3. Check local NIC: netsh interface show interface (duplex mismatch?). 4. If ISP hop: raise a ticket with tracert output as evidence.', id: '1. tracert -d <tujuan> — temukan hop bermasalah. 2. ping -n 100 <hop-IP> — ukur persentase packet loss. 3. Periksa NIC lokal. 4. Jika hop ISP: buat tiket dengan output tracert sebagai bukti.' },
    commands: ['tracert -d 8.8.8.8', 'ping -n 100 <target-IP>', 'netsh interface show interface'],
    tags: ['packet-loss', 'tracert', 'ping', 'networking', 'latency'],
  },

  // ── SYSADMIN ──────────────────────────────────────────────────
  {
    id: 'kb_008', category: 'sysadmin', tier: 5,
    unlockedBy: ['t5_004', 't5_009'],
    title: { en: 'Linux Disk Full — Finding and Clearing Space', id: 'Disk Linux Penuh — Menemukan dan Membersihkan Ruang' },
    emoji: '💾',
    symptom: { en: 'Application throws "No space left on device". df -h shows 100% usage.', id: 'Aplikasi melempar "No space left on device". df -h menunjukkan 100% penggunaan.' },
    cause: { en: 'Unrotated log files, left-over temp files, or large database dumps in /var.', id: 'Log file yang tidak dirotasi, file temp yang tertinggal, atau dump database besar di /var.' },
    solution: { en: '1. df -h — check which partition is full. 2. du -sh /* 2>/dev/null | sort -rh | head -10 — find biggest directories. 3. du -sh /var/* | sort -rh | head -5 — drill into /var. 4. truncate -s 0 /var/log/<file.log> — empty active log. 5. logrotate -f /etc/logrotate.conf — force rotation. 6. Set up logrotate cron to prevent recurrence.', id: '1. df -h — periksa partisi mana yang penuh. 2. Temukan direktori terbesar. 3. Selidiki /var. 4. Truncate log file aktif. 5. Paksa logrotate. 6. Siapkan cron logrotate.' },
    commands: ['df -h', 'du -sh /* 2>/dev/null | sort -rh | head -10', 'du -sh /var/* | sort -rh | head -5', 'truncate -s 0 /var/log/<logfile>', 'logrotate -f /etc/logrotate.conf'],
    tags: ['linux', 'disk', 'df', 'du', 'logrotate', 'space'],
  },
  {
    id: 'kb_009', category: 'sysadmin', tier: 5,
    unlockedBy: ['t5_010'],
    title: { en: 'RDP Blocked — Firewall Rule Fix', id: 'RDP Diblokir — Perbaikan Aturan Firewall' },
    emoji: '🔐',
    symptom: { en: 'Remote Desktop connection refused. Port 3389 not reachable. Service is running but firewall blocking.', id: 'Koneksi Remote Desktop ditolak. Port 3389 tidak dapat dijangkau. Layanan berjalan tapi firewall memblokir.' },
    cause: { en: 'GPO or local firewall rule blocking port 3389. Often happens after security policy updates.', id: 'GPO atau aturan firewall lokal memblokir port 3389. Sering terjadi setelah pembaruan kebijakan keamanan.' },
    solution: { en: '1. netstat -ano | findstr :3389 — confirm service is listening. 2. netsh advfirewall firewall show rule name="Remote Desktop" dir=in — check for BLOCK rules. 3. Add ALLOW rule restricted to VPN subnet: netsh advfirewall firewall add rule name="Allow RDP VPN" protocol=TCP dir=in localport=3389 remoteip=10.0.0.0/8 action=allow.', id: '1. Konfirmasi layanan berjalan. 2. Periksa aturan firewall. 3. Tambahkan aturan ALLOW yang dibatasi ke subnet VPN.' },
    commands: [
      'netstat -ano | findstr :3389',
      'netsh advfirewall firewall show rule name="Remote Desktop" dir=in',
      'netsh advfirewall firewall add rule name="Allow RDP VPN" protocol=TCP dir=in localport=3389 remoteip=10.0.0.0/8 action=allow',
    ],
    tags: ['rdp', 'firewall', 'port-3389', 'netsh', 'remote-desktop'],
  },

  // ── SECURITY ──────────────────────────────────────────────────
  {
    id: 'kb_010', category: 'security', tier: 6,
    unlockedBy: ['t6_002', 't6_008'],
    title: { en: 'Phishing Email Investigation', id: 'Investigasi Email Phishing' },
    emoji: '🎣',
    symptom: { en: 'Employees receive suspicious email claiming to be from a known sender. May ask for credentials, wire transfer, or link clicks.', id: 'Karyawan menerima email mencurigakan yang mengklaim dari pengirim yang dikenal. Mungkin meminta kredensial, transfer, atau klik tautan.' },
    cause: { en: 'Domain spoofing (look-alike domains), BEC (Business Email Compromise), or compromised sender account. SPF/DKIM/DMARC failures.', id: 'Domain spoofing (domain mirip), BEC (Business Email Compromise), atau akun pengirim yang dikompromikan. Kegagalan SPF/DKIM/DMARC.' },
    solution: { en: '1. Check sender: From vs Reply-To vs Return-Path must match. 2. Inspect SPF/DKIM/DMARC headers — FAIL = spoofed. 3. Block domain: New-TenantAllowBlockListItems -ListType Sender -Entries "<domain>" -Block. 4. Identify who clicked: Search-UnifiedAuditLog -Operations UrlClicked. 5. Isolate clicked-link PCs. 6. For wire transfer requests: call the supposed sender directly — never verify via email.', id: '1. Periksa pengirim: From vs Reply-To vs Return-Path harus cocok. 2. Periksa header SPF/DKIM/DMARC. 3. Blokir domain. 4. Identifikasi siapa yang klik. 5. Isolasi PC yang klik tautan. 6. Untuk permintaan transfer: hubungi pengirim secara langsung.' },
    commands: [
      'Get-MessageTrace -SenderAddress "*@suspiciousdomain.com" -StartDate (Get-Date).AddHours(-4) | Format-Table',
      'New-TenantAllowBlockListItems -ListType Sender -Entries "baddomain.com" -Block -NoExpiration',
      'Search-UnifiedAuditLog -Operations "UrlClicked" -FreeText "baddomain"',
    ],
    tags: ['phishing', 'bec', 'email', 'security', 'spf', 'dkim', 'dmarc'],
  },
  {
    id: 'kb_011', category: 'security', tier: 6,
    unlockedBy: ['t6_003', 't6_011'],
    title: { en: 'Ransomware Response Playbook', id: 'Panduan Respons Ransomware' },
    emoji: '💀',
    symptom: { en: 'Files renamed with unknown extension (.LOCKED, .ENCRYPTED). Ransom note on desktop. Users report files unreadable.', id: 'File diganti nama dengan ekstensi tidak dikenal (.LOCKED, .ENCRYPTED). Catatan tebusan di desktop. Pengguna melaporkan file tidak terbaca.' },
    cause: { en: 'Ransomware infection — typically via phishing email, unpatched vulnerability, or exposed RDP.', id: 'Infeksi ransomware — biasanya via email phishing, kerentanan yang tidak ditambal, atau RDP yang terekspos.' },
    solution: { en: '1. ISOLATE at network switch — disable VLANs for affected departments immediately. 2. Do NOT reboot infected PCs (preserve RAM evidence). 3. Find patient zero using earliest encryption timestamps. 4. Disable SMB shares on file server (stops lateral spread). 5. DO NOT PAY ransom. 6. Restore from last clean backup. 7. Patch the attack vector before reconnecting to network.', id: '1. ISOLASI di network switch — nonaktifkan VLAN untuk departemen terdampak segera. 2. JANGAN reboot PC yang terinfeksi. 3. Temukan patient zero. 4. Nonaktifkan SMB share. 5. JANGAN BAYAR tebusan. 6. Restore dari backup bersih terakhir. 7. Tambal vektor serangan sebelum menyambungkan kembali ke jaringan.' },
    commands: [],
    tags: ['ransomware', 'incident-response', 'security', 'backup', 'smb'],
  },

  // ── DISASTER RECOVERY ─────────────────────────────────────────
  {
    id: 'kb_012', category: 'disaster_recovery', tier: 7,
    unlockedBy: ['t5_001', 't5_011', 't7_005'],
    title: { en: 'RPO and RTO Explained', id: 'Penjelasan RPO dan RTO' },
    emoji: '⏱️',
    symptom: { en: 'N/A — foundational DR concept.', id: 'T/A — konsep DR fundamental.' },
    cause: { en: 'N/A', id: 'T/A' },
    solution: { en: 'RPO (Recovery Point Objective) = maximum acceptable data loss measured in time. If backup runs every 4 hours, RPO = 4 hours of potential data loss. RTO (Recovery Time Objective) = maximum acceptable downtime. If RTO = 4 hours, services must be restored within 4 hours of failure. Testing: run DR exercises quarterly. An untested backup is not a backup.', id: 'RPO (Recovery Point Objective) = kehilangan data maksimum yang dapat diterima diukur dalam waktu. RTO (Recovery Time Objective) = downtime maksimum yang dapat diterima. Pengujian: jalankan latihan DR setiap triwulan. Backup yang tidak diuji bukanlah backup.' },
    commands: [],
    tags: ['rpo', 'rto', 'disaster-recovery', 'backup', 'dr'],
  },
  {
    id: 'kb_013', category: 'disaster_recovery', tier: 7,
    unlockedBy: ['t7_004', 't7_008'],
    title: { en: 'AWS S3 Versioning — Recovering Deleted Files', id: 'S3 Versioning AWS — Memulihkan File yang Dihapus' },
    emoji: '☁️',
    symptom: { en: 'Files appear deleted from S3 bucket. Application returns 404 errors for assets.', id: 'File tampak terhapus dari bucket S3. Aplikasi mengembalikan error 404 untuk aset.' },
    cause: { en: 'Accidental deletion via script, CLI, or console. If versioning is enabled, files are not truly deleted — a delete marker is added.', id: 'Penghapusan tidak sengaja via script, CLI, atau konsol. Jika versioning aktif, file tidak benar-benar terhapus — delete marker ditambahkan.' },
    solution: { en: '1. Confirm versioning: aws s3api get-bucket-versioning --bucket <bucket>. 2. List delete markers: aws s3api list-object-versions --bucket <bucket> --query "length(DeleteMarkers)". 3. Remove delete markers to restore: aws s3api delete-object --bucket <bucket> --key <key> --version-id <delete-marker-version-id>. 4. Prevent future: add bucket policy denying DeleteObject for non-admin roles.', id: '1. Konfirmasi versioning aktif. 2. Daftar delete markers. 3. Hapus delete markers untuk restore. 4. Cegah masa depan: tambahkan bucket policy yang menolak DeleteObject untuk peran non-admin.' },
    commands: [
      'aws s3api get-bucket-versioning --bucket <bucket>',
      'aws s3api list-object-versions --bucket <bucket> --query "length(DeleteMarkers)"',
      'aws s3api delete-object --bucket <bucket> --key <key> --version-id <delete-marker-vid>',
    ],
    tags: ['s3', 'aws', 'versioning', 'cloud', 'recovery', 'delete-marker'],
  },
];

// ── Helpers ───────────────────────────────────────────────────
export function getUnlockedArticles(completedMissionIds = []) {
  return KB_ARTICLES.filter(article =>
    article.unlockedBy.some(missionId => completedMissionIds.includes(missionId))
  );
}

export function searchArticles(articles, query) {
  if (!query || query.trim() === '') return articles;
  const q = query.toLowerCase();
  return articles.filter(article => {
    const titleMatch = article.title.en.toLowerCase().includes(q) || article.title.id.toLowerCase().includes(q);
    const tagMatch = article.tags.some(t => t.includes(q));
    const cmdMatch = article.commands.some(c => c.toLowerCase().includes(q));
    const symptomMatch = article.symptom.en.toLowerCase().includes(q);
    return titleMatch || tagMatch || cmdMatch || symptomMatch;
  });
}

export const KB_CATEGORIES = [
  { id: 'all', label: { en: 'All Articles', id: 'Semua Artikel' }, emoji: '📚' },
  { id: 'hardware', label: { en: 'Hardware', id: 'Hardware' }, emoji: '🖥️' },
  { id: 'windows', label: { en: 'Windows OS', id: 'Windows OS' }, emoji: '🪟' },
  { id: 'networking', label: { en: 'Networking', id: 'Jaringan' }, emoji: '🌐' },
  { id: 'sysadmin', label: { en: 'Sysadmin', id: 'Sysadmin' }, emoji: '⚙️' },
  { id: 'security', label: { en: 'Security', id: 'Keamanan' }, emoji: '🛡️' },
  { id: 'disaster_recovery', label: { en: 'Disaster Recovery', id: 'Pemulihan Bencana' }, emoji: '🏗️' },
];
