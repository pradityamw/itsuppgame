// TIER 5 MISSIONS — System Administration (Level 50–70)
// Areas: enterpriseOffice, serverRoom, miniDataCenter, itControlCenter

export const MISSIONS_TIER5 = [
  {
    // ── INTERACTIVE: sequence (backup restore) ──
    id: 't5_001', title: { en: 'Restore From Backup', id: 'Pulihkan dari Backup' },
    category: 'sysadmin', difficulty: 'hard', areaKey: 'serverRoom', requiredLevel: 50,
    xpReward: 700, coinReward: 140, puzzleType: 'sequence', npcAvatar: '🚨', npcName: 'CTO Alert',
    description: { en: 'Production database corrupted. Execute the backup restore procedure correctly!', id: 'Database produksi rusak. Laksanakan prosedur restore backup dengan benar!' },
    npcDialogue: [
      { npc: 'CTO Alert', avatar: '🚨', msgEn: 'EMERGENCY! The production database is corrupted — it happened during an overnight update. ALL applications are down. 500 users cannot work. This is a P1 incident!', msgId: 'DARURAT! Database produksi rusak — terjadi saat update semalam. SEMUA aplikasi down. 500 pengguna tidak bisa bekerja. Ini insiden P1!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Understood. First priority — STOP all writes to the corrupted database immediately. Every second of writes makes recovery harder. Then we identify the last clean backup and assess the RPO impact.', msgId: 'Dipahami. Prioritas pertama — HENTIKAN semua write ke database yang rusak segera. Setiap detik write membuat pemulihan lebih sulit. Kemudian kita identifikasi backup bersih terakhir dan nilai dampak RPO.' },
      { npc: 'CTO Alert', avatar: '🚨', msgEn: 'How much data will we lose? The CEO is asking me right now!', msgId: 'Berapa banyak data yang akan kita hilangkan? CEO sedang bertanya kepada saya sekarang!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Our last clean backup is from 2 days ago — that is our RPO. We will lose 2 days of data. I will restore to staging first to verify integrity, then promote to production. Estimated recovery time is 3 hours.', msgId: 'Backup bersih terakhir kita dari 2 hari yang lalu — itulah RPO kita. Kita akan kehilangan data 2 hari. Saya akan restore ke staging dulu untuk verifikasi integritas, lalu promosikan ke produksi. Estimasi waktu pemulihan 3 jam.' },
    ],
    sequenceData: {
      task: 'Production database is corrupted. Put the correct backup restore procedure steps in order:',
      steps: [
        { id: 'step1', text: 'STOP all writes to the database immediately — put application in maintenance mode' },
        { id: 'step2', text: 'Document the incident: timestamp, what caused corruption, scope of affected data' },
        { id: 'step3', text: 'Identify the last clean backup (2 days ago) — confirm backup integrity with checksum' },
        { id: 'step4', text: 'Restore the backup to a staging environment first — verify data looks correct' },
        { id: 'step5', text: 'Promote restored DB to production — bring application back online — notify stakeholders of 2-day data loss (RPO)' },
      ],
      lesson: '3-2-1 backup rule: 3 copies, 2 media types, 1 offsite. Stop writes before restoring. RPO = max acceptable data loss. Always verify backup on staging before promoting to prod.',
    },
  },
  {
    // ── INTERACTIVE: terminal (restart crashed service) ──
    id: 't5_002', title: { en: 'Restart Crashed Service', id: 'Restart Service yang Crash' },
    category: 'sysadmin', difficulty: 'medium', areaKey: 'serverRoom', requiredLevel: 51,
    xpReward: 520, coinReward: 100, puzzleType: 'terminal', npcAvatar: '🔴', npcName: 'Monitoring Alert',
    description: { en: 'Web server app crashed — users getting 503 errors. Find the cause and restart it!', id: 'Aplikasi web server crash — user mendapat error 503. Temukan penyebab dan restart!' },
    npcDialogue: [
      { npc: 'Monitoring Alert', avatar: '🔴', msgEn: 'ALERT: Website is returning 503 Service Unavailable errors to ALL visitors. Sales team cannot access the order portal. Every minute of downtime is lost revenue!', msgId: 'ALERT: Website mengembalikan error 503 Service Unavailable ke SEMUA pengunjung. Tim sales tidak bisa akses portal pesanan. Setiap menit downtime adalah pendapatan yang hilang!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: '503 means the web server process has stopped. This is almost always a service crash — IIS or the application pool. Let me check the service status first with sc query, then look at Event Viewer for the root cause.', msgId: '503 berarti proses web server telah berhenti. Ini hampir selalu crash layanan — IIS atau application pool. Biarkan saya periksa status layanan dulu dengan sc query, lalu lihat Event Viewer untuk akar masalah.' },
      { npc: 'Monitoring Alert', avatar: '🔴', msgEn: 'Can you just restart the server immediately? We need it up NOW!', msgId: 'Bisakah Anda langsung restart server? Kita butuh online SEKARANG!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'I understand the urgency, but if we restart without knowing the cause, it will crash again in 10 minutes. 30 extra seconds to read Event Viewer saves hours of repeated downtime. Root cause first, then fix!', msgId: 'Saya mengerti urgensinya, tapi jika kita restart tanpa mengetahui penyebabnya, itu akan crash lagi dalam 10 menit. 30 detik ekstra untuk membaca Event Viewer menghemat berjam-jam downtime berulang. Akar masalah dulu, baru perbaikan!' },
    ],
    terminalData: {
      os: 'windows',
      intro: 'Web application is returning 503 Service Unavailable. The IIS service may have crashed. Diagnose and fix.',
      tasks: [
        {
          id: 'task1',
          instruction: 'Check the IIS service status:',
          command: 'sc query W3SVC',
          hint: 'Type: sc query W3SVC',
          successOutput: `SERVICE_NAME: W3SVC\n        TYPE               : 20  WIN32_SHARE_PROCESS\n        STATE              : 1  STOPPED\n                                (NOT_STOPPABLE, NOT_PAUSABLE, IGNORES_SHUTDOWN)\n        WIN32_EXIT_CODE    : 1067  (0x42b)\n        SERVICE_EXIT_CODE  : 0  (0x0)\n\n[!] IIS (W3SVC) is STOPPED — this is why users get 503.`,
          lesson: 'sc query checks Windows service status. W3SVC = World Wide Web Publishing Service (IIS). State STOPPED = service crashed.',
        },
        {
          id: 'task2',
          instruction: 'Check Event Viewer for the crash reason before restarting:',
          command: 'wevtutil qe Application /count:5 /rd:true /format:text /q:"*[System[Level<=2]]"',
          hint: 'Type: wevtutil qe Application /count:5 /rd:true /format:text /q:"*[System[Level<=2]]"',
          successOutput: `Event[0]:\n  Log Name: Application\n  Source:   IIS-W3SVC\n  Level:    Error\n  TimeCreated: 2026-05-19T12:45:02\n  Message:  The World Wide Web Publishing Service terminated unexpectedly.\n            Out of memory condition detected — application pool recycled and crashed.\n\n[!] Root cause: memory leak in the app pool caused OOM crash. Restart now, fix leak after.`,
          lesson: 'Event Viewer Application log shows service crashes with timestamps. Always check the root cause before restarting — or it will crash again.',
        },
        {
          id: 'task3',
          instruction: 'Restart IIS to restore the web service:',
          command: 'iisreset /restart',
          hint: 'Type: iisreset /restart',
          successOutput: `Attempting stop...\nInternet services successfully stopped\nAttempting start...\nInternet services successfully restarted\n\n[✓] IIS restarted. Users no longer getting 503 errors.\n[!] TODO: Fix memory leak in app pool to prevent recurrence.`,
          lesson: 'iisreset restarts all IIS services. services.msc or sc start W3SVC also works. Root cause (memory leak) must be fixed to prevent recurrence.',
        },
      ],
      successMsg: '✅ Web service restored! 503 errors resolved. Memory leak investigation ticket created.',
      lesson: 'Service crash = restart with iisreset or services.msc. Root cause is in Event Viewer Application logs. Fix root cause or it will crash again.',
    },
  },
  {
    // ── INTERACTIVE: sequence (RDP troubleshooting) ──
    id: 't5_003', title: { en: 'Remote Desktop Issue', id: 'Masalah Remote Desktop' },
    category: 'sysadmin', difficulty: 'medium', areaKey: 'itControlCenter', requiredLevel: 52,
    xpReward: 540, coinReward: 105, puzzleType: 'sequence', npcAvatar: '🏠', npcName: 'Remote Worker',
    description: { en: 'Remote employees can\'t RDP to office servers after IT changes. Fix it step by step!', id: 'Karyawan remote tidak bisa RDP ke server setelah perubahan IT. Perbaiki langkah demi langkah!' },
    npcDialogue: [
      { npc: 'Remote Worker', avatar: '🏠', msgEn: 'Since IT pushed a firewall update last night, none of us working from home can connect to the office servers with Remote Desktop. We have a project deadline tomorrow and all our files are on the server!', msgId: 'Sejak IT push update firewall semalam, kami semua yang bekerja dari rumah tidak bisa konek ke server kantor dengan Remote Desktop. Kami punya deadline proyek besok dan semua file kami ada di server!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'A firewall update breaking RDP is a classic scenario. The new rules probably blocked port 3389. First question — are you connected to the company VPN? RDP should always go through VPN, never directly over the internet.', msgId: 'Update firewall yang memutus RDP adalah skenario klasik. Aturan baru kemungkinan memblokir port 3389. Pertanyaan pertama — apakah Anda terhubung ke VPN perusahaan? RDP harus selalu melalui VPN, tidak pernah langsung melalui internet.' },
      { npc: 'Remote Worker', avatar: '🏠', msgEn: 'I am on VPN but RDP still fails with "connection refused" error. My colleague next to me has the same problem.', msgId: 'Saya di VPN tapi RDP masih gagal dengan error "connection refused". Rekan saya di sebelah saya punya masalah yang sama.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'VPN connected but RDP refused = the server firewall itself is blocking port 3389. We need to check the inbound rules on the server and verify the Remote Desktop feature is still enabled after the update.', msgId: 'VPN terhubung tapi RDP ditolak = firewall server itu sendiri memblokir port 3389. Kita perlu periksa aturan inbound di server dan verifikasi fitur Remote Desktop masih diaktifkan setelah update.' },
    ],
    sequenceData: {
      task: 'Remote employees cannot RDP to the office server after a recent firewall update. Arrange the correct troubleshooting steps:',
      steps: [
        { id: 'step1', text: 'Ask employees to connect to the company VPN first (RDP should NEVER be exposed directly to the internet)' },
        { id: 'step2', text: 'Once on VPN, try RDP to the internal server IP (e.g., 192.168.10.50) — check if port 3389 is reachable' },
        { id: 'step3', text: 'On the server: check Windows Firewall → Inbound Rules → verify "Remote Desktop" rule is enabled for the VPN subnet' },
        { id: 'step4', text: 'Check Server → System Properties → Remote → confirm "Allow remote connections" is enabled and NLA settings match client' },
        { id: 'step5', text: 'Test RDP connection — confirm employees can log in. Document VPN-first policy for all remote access.' },
      ],
      lesson: 'RDP = port 3389. Never expose to internet directly — always VPN first. Check: firewall rules, Remote Desktop enabled, and NLA settings match.',
    },
  },
  {
    // ── INTERACTIVE: terminal (disk cleanup / du) ──
    id: 't5_004', title: { en: 'Server Storage Cleanup', id: 'Bersihkan Storage Server' },
    category: 'sysadmin', difficulty: 'medium', areaKey: 'serverRoom', requiredLevel: 53,
    xpReward: 510, coinReward: 100, puzzleType: 'terminal', npcAvatar: '💾', npcName: 'Disk Alert',
    description: { en: 'Main server disk at 95%. Applications starting to fail. Find and clean the disk hogs!', id: 'Disk server utama 95% penuh. Aplikasi mulai gagal. Temukan dan bersihkan penyebabnya!' },
    npcDialogue: [
      { npc: 'Disk Alert', avatar: '💾', msgEn: 'CRITICAL: Server disk C: is at 95% capacity! The application is throwing write errors and the database transaction log cannot expand. Users are getting errors on every operation!', msgId: 'KRITIS: Disk server C: sudah 95% kapasitas! Aplikasi melempar error write dan log transaksi database tidak bisa berkembang. Pengguna mendapat error pada setiap operasi!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'A disk at 95% is a five-alarm fire for sysadmins. Applications crash, databases corrupt, logs stop writing. The most common culprits are old log files in /var/log or temp files that were never cleaned. Let me find the hog.', msgId: 'Disk di 95% adalah kebakaran lima alarm bagi sysadmin. Aplikasi crash, database korup, log berhenti menulis. Penyebab paling umum adalah file log lama di /var/log atau temp file yang tidak pernah dibersihkan. Biarkan saya temukan penyebabnya.' },
      { npc: 'Disk Alert', avatar: '💾', msgEn: 'Can I just delete the biggest files I see to free space quickly?', msgId: 'Bisakah saya hanya menghapus file terbesar yang saya lihat untuk membebaskan ruang dengan cepat?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Never delete random files on a server! You could delete a database file or a critical config. Always use df -h and du -sh to identify exactly what is eating space before touching anything. Surgical precision, not chainsaws!', msgId: 'Jangan pernah hapus file acak di server! Anda bisa menghapus file database atau konfigurasi kritis. Selalu gunakan df -h dan du -sh untuk mengidentifikasi persis apa yang memakan ruang sebelum menyentuh apapun. Presisi bedah, bukan gergaji mesin!' },
    ],
    terminalData: {
      os: 'linux',
      intro: 'Linux server disk usage is at 95%. Applications are failing to write logs and temp files. Find what is consuming the disk.',
      tasks: [
        {
          id: 'task1',
          instruction: 'Check overall disk usage on all partitions:',
          command: 'df -h',
          hint: 'Type: df -h',
          successOutput: `Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        50G   47G  1.2G  97% /\n/dev/sda2       100G   12G   88G  12% /data\ntmpfs           3.9G  1.2G  2.7G  31% /tmp\n\n[!] Root partition (/) is 97% full — this is the problem!`,
          lesson: 'df -h shows disk usage per partition in human-readable format. Root partition at 97% is critical — apps fail when disk is full.',
        },
        {
          id: 'task2',
          instruction: 'Find the biggest directories in root to locate the disk hog:',
          command: 'du -sh /* 2>/dev/null | sort -rh | head -10',
          hint: 'Type: du -sh /* 2>/dev/null | sort -rh | head -10',
          successOutput: `32G    /var\n8.5G   /usr\n3.2G   /opt\n1.1G   /home\n800M   /tmp\n...\n\n[!] /var is consuming 32GB. Investigating /var...`,
          lesson: 'du -sh /* shows size of each top-level directory. sort -rh sorts by size descending. /var often contains logs and database files.',
        },
        {
          id: 'task3',
          instruction: 'Find the biggest files inside /var (likely old logs):',
          command: 'du -sh /var/* | sort -rh | head -5',
          hint: 'Type: du -sh /var/* | sort -rh | head -5',
          successOutput: `28G    /var/log\n2.1G   /var/lib\n800M   /var/cache\n...\n\nLargest files in /var/log:\n27G    /var/log/app.log  ← CULPRIT!\n\nRunning: truncate -s 0 /var/log/app.log && logrotate -f /etc/logrotate.conf\n[✓] Log truncated. Disk usage: 97% → 42%. Services restored!`,
          lesson: 'Unrotated log files are the #1 cause of disk full on Linux servers. Set up logrotate to automatically compress/delete old logs.',
        },
      ],
      successMsg: '💾 Disk usage: 97% → 42%! Giant log file truncated. logrotate configured to prevent recurrence.',
      lesson: 'du -sh finds disk hogs. Log files in /var/log are common culprits. Set up logrotate to automatically manage log growth.',
    },
  },
  {
    // ── INTERACTIVE: terminal (NTFS share permissions) ──
    id: 't5_005', title: { en: 'Shared Folder Permissions', id: 'Permission Folder Bersama' },
    category: 'sysadmin', difficulty: 'medium', areaKey: 'enterpriseOffice', requiredLevel: 52,
    xpReward: 530, coinReward: 105, puzzleType: 'terminal', npcAvatar: '📂', npcName: 'Accounting Team',
    description: { en: 'Accounting can\'t write to shared folder. HR can. Fix it with icacls!', id: 'Accounting tidak bisa write ke folder bersama. HR bisa. Perbaiki dengan icacls!' },
    npcDialogue: [
      { npc: 'Accounting Team', avatar: '📂', msgEn: 'We get "Access Denied" every time we try to save files to the Finance shared folder! HR has no problem — they can read and write fine. But our whole accounting team is blocked. We have month-end reports due today!', msgId: 'Kami mendapat "Access Denied" setiap kali mencoba menyimpan file ke folder bersama Finance! HR tidak ada masalah — mereka bisa baca dan tulis dengan lancar. Tapi seluruh tim akuntansi kami diblokir. Kami punya laporan akhir bulan jatuh tempo hari ini!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'HR can write but Accounting cannot — on the same folder — means it is a permissions mismatch specifically for the Accounting group. Windows has two permission layers: Share permissions and NTFS permissions. Both must allow access — the most restrictive one wins.', msgId: 'HR bisa write tapi Accounting tidak — pada folder yang sama — berarti ini ketidakcocokan izin khusus untuk grup Accounting. Windows punya dua lapisan izin: izin Share dan izin NTFS. Keduanya harus mengizinkan akses — yang paling ketat menang.' },
      { npc: 'Accounting Team', avatar: '📂', msgEn: 'We should have the same access as HR — same level. Can you check what permissions the Accounting group actually has right now?', msgId: 'Kami harusnya punya akses yang sama dengan HR — tingkat yang sama. Bisakah Anda periksa izin apa yang sebenarnya dimiliki grup Accounting saat ini?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Running icacls now to inspect NTFS permissions. My bet: Accounting group has Read-Only (R) while HR has Modify (M). A single icacls command will fix it. Month-end reports will be saved in under 5 minutes!', msgId: 'Menjalankan icacls sekarang untuk memeriksa izin NTFS. Tebakan saya: grup Accounting punya Read-Only (R) sementara HR punya Modify (M). Satu perintah icacls akan memperbaikinya. Laporan akhir bulan akan tersimpan dalam 5 menit!' },
    ],
    terminalData: {
      os: 'windows',
      intro: 'Accounting team gets "Access Denied" when writing to \\\\SERVER\\Finance. HR team can write fine. Fix the NTFS permissions.',
      tasks: [
        {
          id: 'task1',
          instruction: 'Check current NTFS permissions on the Finance share:',
          command: 'icacls "\\\\SERVER\\Finance"',
          hint: 'Type: icacls "\\\\SERVER\\Finance"',
          successOutput: `\\\\SERVER\\Finance BUILTIN\\Administrators:(OI)(CI)(F)\n                  DESKTOP-PC\\HR:(OI)(CI)(M)\n                  DESKTOP-PC\\Accounting:(OI)(CI)(R)\n\n[!] Accounting has Read-Only (R). Share permission says Full Control.\n    Most restrictive wins = Read Only. Need to grant Modify.`,
          lesson: 'Share + NTFS permissions: the MORE restrictive of the two applies. Accounting has Read-only NTFS despite Full Control share permission.',
        },
        {
          id: 'task2',
          instruction: 'Grant Accounting the Modify permission (Read + Write):',
          command: 'icacls "\\\\SERVER\\Finance" /grant "Accounting:(OI)(CI)(M)"',
          hint: 'Type: icacls "\\\\SERVER\\Finance" /grant "Accounting:(OI)(CI)(M)"',
          successOutput: `processed file: \\\\SERVER\\Finance\nSuccessfully processed 1 files; Failed processing 0 files\n\n[✓] Accounting now has Modify (M) access:\n    Can Read + Write + Delete files, but NOT change permissions.`,
          lesson: '(M) = Modify: read, write, delete files — but not change permissions or ownership. This is the appropriate level for staff.',
        },
        {
          id: 'task3',
          instruction: 'Verify the updated permissions:',
          command: 'icacls "\\\\SERVER\\Finance"',
          hint: 'Type: icacls "\\\\SERVER\\Finance"',
          successOutput: `\\\\SERVER\\Finance BUILTIN\\Administrators:(OI)(CI)(F)\n                  DESKTOP-PC\\HR:(OI)(CI)(M)\n                  DESKTOP-PC\\Accounting:(OI)(CI)(M)\n\n[✓] Both HR and Accounting now have Modify access. Problem resolved!`,
          lesson: 'Always verify with icacls after changes. Both Share AND NTFS permissions must allow the access — most restrictive wins.',
        },
      ],
      successMsg: '📂 Accounting can now read and write to \\\\SERVER\\Finance. Permissions correctly set to Modify.',
      lesson: 'Share + NTFS: most restrictive wins. Use icacls to inspect and fix NTFS permissions. Modify (M) = read+write without admin rights.',
    },
  },
  {
    // ── INTERACTIVE: terminal (Linux SSH fix) ──
    id: 't5_006', title: { en: 'Linux SSH Connection Refused', id: 'SSH Linux Ditolak' },
    category: 'sysadmin', difficulty: 'hard', areaKey: 'serverRoom', requiredLevel: 55,
    xpReward: 640, coinReward: 125, puzzleType: 'terminal', npcAvatar: '🐧', npcName: 'Dev Team',
    description: { en: 'Developers can\'t SSH into Linux server after security update. Fix it via console!', id: 'Developer tidak bisa SSH ke server Linux setelah update keamanan. Perbaiki via konsol!' },
    npcDialogue: [
      { npc: 'Dev Team', avatar: '🐧', msgEn: 'None of us can SSH into the Linux production server since the security update last night! We get "Connection refused" immediately. The entire dev team is blocked — we cannot deploy the hotfix that users are waiting for!', msgId: 'Kami semua tidak bisa SSH ke server Linux produksi sejak update keamanan semalam! Kami langsung mendapat "Connection refused". Seluruh tim dev diblokir — kami tidak bisa deploy hotfix yang ditunggu pengguna!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: '"Connection refused" means the SSH service itself is not running — it is not a firewall block (that would give "connection timed out"). The security update likely modified sshd_config and introduced a syntax error that prevents SSH from starting.', msgId: '"Connection refused" berarti layanan SSH itu sendiri tidak berjalan — itu bukan blokir firewall (itu akan memberikan "connection timed out"). Update keamanan kemungkinan memodifikasi sshd_config dan memasukkan error sintaks yang mencegah SSH dari starting.' },
      { npc: 'Dev Team', avatar: '🐧', msgEn: 'How do we fix it if we cannot SSH in? It is a cloud server — we do not have physical access!', msgId: 'Bagaimana kita memperbaikinya jika kita tidak bisa SSH masuk? Itu server cloud — kita tidak punya akses fisik!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Cloud providers have emergency console access that bypasses SSH — like a physical keyboard and monitor virtually. I will use the cloud console to fix the sshd_config typo and restart the SSH service. This is exactly why console access matters!', msgId: 'Penyedia cloud memiliki akses konsol darurat yang melewati SSH — seperti keyboard dan monitor fisik secara virtual. Saya akan gunakan konsol cloud untuk memperbaiki typo sshd_config dan restart layanan SSH. Inilah mengapa akses konsol penting!' },
    ],
    terminalData: {
      os: 'linux',
      intro: 'SSH is refusing connections after a security update on the Linux server. Access the server via the console to diagnose.',
      tasks: [
        {
          id: 'task1',
          instruction: 'Check if the SSH daemon is running:',
          command: 'systemctl status sshd',
          hint: 'Type: systemctl status sshd',
          successOutput: `● sshd.service - OpenSSH server daemon\n   Loaded: loaded (/usr/lib/systemd/system/sshd.service; enabled)\n   Active: failed (Result: exit-code)\n  Process: ExecStart=/usr/sbin/sshd (code=exited, status=255)\n\nMay 19 21:00:01 server sshd[1234]: /etc/ssh/sshd_config line 45: Bad configuration option: PermitRootLogin2\n\n[!] sshd FAILED to start — bad config option from security update. Must fix sshd_config!`,
          lesson: 'systemctl status sshd shows if SSH is running. A failed status with config error means the security update added a typo in sshd_config.',
        },
        {
          id: 'task2',
          instruction: 'Fix the typo in the SSH config file (remove the "2" from PermitRootLogin2):',
          command: 'sed -i "s/PermitRootLogin2/PermitRootLogin/" /etc/ssh/sshd_config && grep "PermitRootLogin" /etc/ssh/sshd_config',
          hint: 'Type: sed -i "s/PermitRootLogin2/PermitRootLogin/" /etc/ssh/sshd_config && grep "PermitRootLogin" /etc/ssh/sshd_config',
          successOutput: `PermitRootLogin no\n\n[✓] Config fixed. PermitRootLogin2 → PermitRootLogin (set to no for security).`,
          lesson: 'sed -i edits files in-place. grep verifies the fix. PermitRootLogin no is a security best practice — never allow root SSH login.',
        },
        {
          id: 'task3',
          instruction: 'Restart sshd and verify developers can connect (port 22 open):',
          command: 'systemctl restart sshd && systemctl status sshd && ss -tlnp | grep :22',
          hint: 'Type: systemctl restart sshd && systemctl status sshd && ss -tlnp | grep :22',
          successOutput: `● sshd.service - OpenSSH server daemon\n   Active: active (running)\n\nNETID  STATE   RECV-Q  SEND-Q  LOCAL-ADDRESS:PORT\ntcp    LISTEN  0       128     0.0.0.0:22\ntcp    LISTEN  0       128     [::]:22\n\n[✓] SSH is running and listening on port 22. Developers can now connect!`,
          lesson: 'ss -tlnp shows listening ports. Port 22 listening = SSH is ready. If firewall was the issue: firewall-cmd --add-service=ssh --permanent.',
        },
      ],
      successMsg: '🐧 SSH restored! Config typo from security update fixed. Developers can now connect on port 22.',
      lesson: 'SSH not connecting: check service (systemctl status sshd), check config file for typos, check firewall (port 22). PermitRootLogin no for security.',
    },
  },
  {
    // ── INTERACTIVE: terminal (CPU monitoring) ──
    id: 't5_007', title: { en: 'Server Monitoring Alert', id: 'Alert Monitoring Server' },
    category: 'sysadmin', difficulty: 'hard', areaKey: 'itControlCenter', requiredLevel: 58,
    xpReward: 680, coinReward: 135, puzzleType: 'terminal', npcAvatar: '📊', npcName: 'Zabbix Alert',
    description: { en: 'Monitoring shows CPU at 98% for 20 minutes on app server. Investigate!', id: 'Monitoring menunjukkan CPU 98% selama 20 menit di app server. Investigasi!' },
    npcDialogue: [
      { npc: 'Zabbix Alert', avatar: '📊', msgEn: 'CRITICAL ALERT: Server app-prod-01 CPU at 98% for 20 consecutive minutes. All CPU cores maxed out. Application response time degraded from 200ms to 45 seconds. Users reporting the system is unusable.', msgId: 'ALERT KRITIS: Server app-prod-01 CPU di 98% selama 20 menit berturut-turut. Semua core CPU maksimal. Waktu respons aplikasi menurun dari 200ms ke 45 detik. Pengguna melaporkan sistem tidak bisa digunakan.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'CPU sustained at 98% for 20 minutes is not a normal spike — something is very wrong. Could be a runaway process, a crypto-mining malware, or a DDoS. I need to SSH in immediately and run top to see which process is consuming all the CPU.', msgId: 'CPU bertahan di 98% selama 20 menit bukan lonjakan normal — ada yang sangat salah. Bisa jadi proses yang tidak terkendali, malware crypto-mining, atau DDoS. Saya perlu SSH segera dan jalankan top untuk melihat proses mana yang mengonsumsi semua CPU.' },
      { npc: 'Zabbix Alert', avatar: '📊', msgEn: 'Network monitoring also shows unusual outbound traffic to an unknown external IP on port 4444. The server may be compromised.', msgId: 'Monitoring jaringan juga menunjukkan lalu lintas keluar yang tidak biasa ke IP eksternal yang tidak dikenal di port 4444. Server mungkin telah dikompromikan.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Outbound traffic to unknown IP on a non-standard port + maxed CPU = almost certainly malware. This is a security incident, not just a performance issue. I will investigate, kill the process, block the outbound connection, and initiate the incident response procedure.', msgId: 'Lalu lintas keluar ke IP yang tidak dikenal di port non-standar + CPU maksimal = hampir pasti malware. Ini adalah insiden keamanan, bukan hanya masalah performa. Saya akan investigasi, matikan proses, blokir koneksi keluar, dan inisiasi prosedur respons insiden.' },
    ],
    terminalData: {
      os: 'linux',
      intro: 'Server CPU has been at 98% for 20+ minutes. Monitoring alert triggered. Identify the culprit process.',
      tasks: [
        {
          id: 'task1',
          instruction: 'Check which process is consuming the CPU:',
          command: 'top -bn1 | head -20',
          hint: 'Type: top -bn1 | head -20',
          successOutput: `top - 21:05:01 up 12 days\nTasks: 145 total, 1 running\n%Cpu(s): 97.8 us, 1.2 sy\n\n  PID USER      PR  NI  VIRT    RES   %CPU %MEM COMMAND\n 9876 nobody    20   0  512M    48M   95.4  1.2  cryptominer\n 1234 www-data  20   0  256M   128M    1.8  3.2  apache2\n  234 root      20   0   45M    12M    0.5  0.3  sshd\n\n[!] Process "cryptominer" at PID 9876 is using 95.4% CPU. This is MALWARE!`,
          lesson: 'top -bn1 gives a one-shot process list. A process named "cryptominer" is obvious malware — but real attackers disguise process names (check paths too).',
        },
        {
          id: 'task2',
          instruction: 'Investigate the malware process before killing it:',
          command: 'ls -la /proc/9876/exe && cat /proc/9876/cmdline | tr "\\0" " "',
          hint: 'Type: ls -la /proc/9876/exe && cat /proc/9876/cmdline | tr "\\0" " "',
          successOutput: `lrwxrwxrwx 1 nobody nobody 0 /proc/9876/exe -> /tmp/.hidden/cryptominer\n\nCommand: /tmp/.hidden/cryptominer --pool mining.monero.tld --wallet 4AbcXyz...\n\n[!] Hidden executable in /tmp/.hidden — connecting to external mining pool. SECURITY INCIDENT!`,
          lesson: '/proc/PID/exe reveals the actual binary path. /proc/PID/cmdline shows the full command. Hidden in /tmp is a classic malware tactic.',
        },
        {
          id: 'task3',
          instruction: 'Kill the malware, isolate the server, and document:',
          command: 'kill -9 9876 && iptables -I OUTPUT -d mining.monero.tld -j DROP && echo "INCIDENT: cryptominer found in /tmp/.hidden — server compromised"',
          hint: 'Type: kill -9 9876 && iptables -I OUTPUT -d mining.monero.tld -j DROP && echo "INCIDENT: cryptominer found..."',
          successOutput: `[OK] Process 9876 (cryptominer) killed.\n[OK] Outbound traffic to mining.monero.tld blocked via iptables.\nINCIDENT: cryptominer found in /tmp/.hidden — server compromised\n\n[!] Next steps: investigate how attacker got in, patch the vulnerability, rebuild from clean image.`,
          lesson: 'kill -9 force-kills a process. iptables blocks outbound C2 traffic. After containment: investigate attack vector, patch, and rebuild from clean image.',
        },
      ],
      successMsg: '🛡️ Cryptominer neutralized! Server isolated. Security incident report filed. Investigation underway.',
      lesson: 'top/htop identifies CPU hogs. Cryptominers = security incident — kill, isolate, investigate root cause. Establish CPU baselines to detect anomalies early.',
    },
  },

  // ── NEW: Hyper-V VM Failed to Boot ────────────────────────────
  {
    id: 't5_008', title: { en: 'Hyper-V VM Failed to Boot', id: 'VM Hyper-V Gagal Boot' },
    category: 'sysadmin', difficulty: 'hard', areaKey: 'serverRoom', requiredLevel: 56,
    xpReward: 660, coinReward: 130, puzzleType: 'sequence', npcAvatar: '🖥️', npcName: 'Dev Ops Alert',
    description: { en: 'Production VM in Hyper-V failed to start after host reboot. Recover it step by step!', id: 'VM produksi di Hyper-V gagal start setelah host reboot. Pulihkan langkah demi langkah!' },
    npcDialogue: [
      { npc: 'Dev Ops Alert', avatar: '🖥️', msgEn: 'The production VM is in a Critical state in Hyper-V Manager after last night\'s host reboot. It won\'t start!', msgId: 'VM produksi dalam status Critical di Hyper-V Manager setelah reboot host semalam. Tidak bisa start!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Hyper-V VM failures after host reboot are common — usually a saved state issue or VHD integrity problem. Let me walk through recovery.', msgId: 'Kegagalan VM Hyper-V setelah reboot host umum terjadi — biasanya masalah saved state atau integritas VHD. Saya akan panduan pemulihannya.' },
      { npc: 'Dev Ops Alert', avatar: '🖥️', msgEn: 'Do we have a snapshot? It was working perfectly yesterday morning.', msgId: 'Apakah kita punya snapshot? Kemarin pagi berjalan sempurna.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Yes — I can see a checkpoint from 08:00 this morning. Let\'s try the saved state fix first before restoring the snapshot.', msgId: 'Ya — saya bisa lihat checkpoint dari jam 08:00 pagi ini. Coba perbaikan saved state dulu sebelum restore snapshot.' },
    ],
    sequenceData: {
      task: 'Production VM (PROD-APP-01) in Hyper-V is in a Critical state and won\'t start. Arrange the correct recovery steps:',
      steps: [
        { id: 's1', text: 'Open Hyper-V Manager → right-click PROD-APP-01 → check state: \"Critical\" usually means a corrupted saved state (.vsv/.vmrs files)' },
        { id: 's2', text: 'Delete the saved state: right-click VM → Delete Saved State (this discards unsaved RAM — data on disk is safe)' },
        { id: 's3', text: 'Attempt to Start the VM — if it boots, the saved state was the problem. Run chkdsk on the OS volume to verify filesystem integrity' },
        { id: 's4', text: 'If VM still fails to start: open VM Settings → check VHD path is valid and disk is not corrupted (run Test-VHD in PowerShell)' },
        { id: 's5', text: 'If VHD is corrupted: apply the most recent Hyper-V checkpoint (snapshot) → verify application is functional → notify stakeholders of data loss window (RPO)' },
      ],
      lesson: 'Hyper-V Critical state: usually saved state (.vsv) corruption after ungraceful host shutdown. Fix: Delete Saved State → Start VM. If VHD is corrupt: restore from checkpoint. Always have checkpoints AND offsite backups.',
    },
  },

  // ── NEW: Linux Disk Full ───────────────────────────────────────
  {
    id: 't5_009', title: { en: 'Linux Disk Full Emergency', id: 'Disk Linux Penuh Darurat' },
    category: 'sysadmin', difficulty: 'medium', areaKey: 'serverRoom', requiredLevel: 54,
    xpReward: 530, coinReward: 100, puzzleType: 'terminal', npcAvatar: '🐧', npcName: 'Linux Server Alert',
    description: { en: 'Linux web server disk at 100% — services failing to write. Find and clean the culprit!', id: 'Disk server Linux 100% penuh — layanan gagal menulis. Temukan dan bersihkan penyebabnya!' },
    npcDialogue: [
      { npc: 'Linux Server Alert', avatar: '🐧', msgEn: 'ALERT: /dev/sda1 is at 100%! The web app is throwing \"No space left on device\" errors. Users getting 500 errors!', msgId: 'ALERT: /dev/sda1 sudah 100%! Aplikasi web melempar error \"No space left on device\". Pengguna mendapat error 500!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'On it. Disk full on Linux is almost always caused by runaway log files or temp files. Let me dig in with df and du.', msgId: 'Segera ditangani. Disk penuh di Linux hampir selalu disebabkan oleh log file yang tidak terkontrol atau temp file. Saya akan selidiki dengan df dan du.' },
    ],
    terminalData: {
      os: 'linux',
      intro: '🚨 DISK FULL EMERGENCY\nServer: web-prod-01 | Disk: /dev/sda1 | Usage: 100%\nApplication is throwing "No space left on device". Find and clean the culprit.',
      tasks: [
        {
          id: 'disk_check',
          instruction: '1. Check disk usage across all partitions',
          command: 'df -h',
          successOutput: 'Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        40G   40G     0  100% /\n/dev/sdb1       200G   80G  120G   40% /data\ntmpfs           3.9G  512M  3.4G   13% /tmp\n\n🚨 / (root partition) is 100% full! /data is fine.',
          hint: 'df -h shows disk usage in human-readable format',
          lesson: 'df -h (disk free, human-readable) shows usage per partition. Root at 100% = application failure. /data partition still has space but apps write to / by default.',
        },
        {
          id: 'disk_find',
          instruction: '2. Find the biggest directories on root partition',
          command: 'du -sh /* 2>/dev/null | sort -rh | head -8',
          successOutput: '35G    /var\n3.2G   /usr\n900M   /opt\n400M   /home\n...\n\n⚠️  /var is consuming 35G out of 40G! Investigating...',
          hint: 'du -sh /* | sort -rh finds largest directories sorted by size',
          lesson: 'du -sh /* scans top-level directories. sort -rh sorts by size (largest first). /var is the usual suspect — it holds logs, spool files, and database data.',
        },
        {
          id: 'disk_logs',
          instruction: '3. Find the largest log files in /var/log',
          command: 'du -sh /var/log/* | sort -rh | head -5',
          successOutput: '32G    /var/log/nginx/access.log\n2.1G   /var/log/syslog\n800M   /var/log/auth.log\n...\n\n🎯 CULPRIT FOUND: /var/log/nginx/access.log is 32GB!',
          hint: 'Drill down into /var/log to find the huge log file',
          lesson: 'Unrotated access logs grow without bound on busy servers. A 32GB nginx access.log is a classic culprit. Should be managed by logrotate automatically.',
        },
        {
          id: 'disk_clean',
          instruction: '4. Truncate the log file and configure logrotate to prevent recurrence',
          command: 'truncate -s 0 /var/log/nginx/access.log && df -h / && logrotate -f /etc/logrotate.d/nginx',
          successOutput: 'Truncated: /var/log/nginx/access.log (32G → 0 bytes)\n\nFilesystem  Size  Used Avail Use% Mounted on\n/dev/sda1    40G  7.8G  32G   20% /\n\n✅ Disk: 100% → 20%! Application errors resolved.\nlogrotate forced — nginx logs will now rotate daily.',
          hint: 'truncate -s 0 empties a file without deleting it. logrotate -f forces rotation now.',
          lesson: 'truncate -s 0 empties the file without deleting it (nginx keeps the file handle open — deleting causes issues). logrotate -f forces rotation immediately. Set up cron-based logrotate for future prevention.',
        },
      ],
      successMsg: '🐧 Disk freed: 100% → 20%! Web server errors resolved. logrotate configured.',
      lesson: 'Linux disk full: df -h → du -sh /* → drill into /var/log → truncate culprit → configure logrotate. NEVER delete active log files — truncate instead.',
    },
  },

  // ── NEW: RDP Blocked by Firewall ──────────────────────────────
  {
    id: 't5_010', title: { en: 'RDP Blocked by Firewall', id: 'RDP Diblokir Firewall' },
    category: 'sysadmin', difficulty: 'medium', areaKey: 'itControlCenter', requiredLevel: 53,
    xpReward: 540, coinReward: 105, puzzleType: 'terminal', npcAvatar: '🔒', npcName: 'Remote Admin',
    description: { en: 'Can\'t RDP to server after firewall policy update. Fix port 3389 rules via netsh.', id: 'Tidak bisa RDP ke server setelah update kebijakan firewall. Perbaiki aturan port 3389 via netsh.' },
    npcDialogue: [
      { npc: 'Remote Admin', avatar: '🔒', msgEn: 'I can\'t remote desktop into the server anymore! It was working fine until the firewall policy was pushed this morning.', msgId: 'Saya tidak bisa remote desktop ke server lagi! Berjalan baik sampai kebijakan firewall di-push pagi ini.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'The firewall update likely blocked port 3389 (RDP). We need to check and fix the Windows Firewall inbound rules. Are you on the VPN?', msgId: 'Update firewall kemungkinan memblokir port 3389 (RDP). Kita perlu periksa dan perbaiki aturan inbound Windows Firewall. Apakah Anda di VPN?' },
      { npc: 'Remote Admin', avatar: '🔒', msgEn: 'Yes, I\'m connected to VPN. So this is an inbound firewall rule problem on the server itself?', msgId: 'Ya, saya terhubung ke VPN. Jadi ini masalah aturan firewall inbound di server itu sendiri?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Exactly. The new policy probably set a \"Block\" rule that overrides the \"Allow\" rule for RDP. We fix it via netsh from a console session.', msgId: 'Tepat. Kebijakan baru kemungkinan menetapkan aturan \"Block\" yang menimpa aturan \"Allow\" untuk RDP. Kita perbaiki via netsh dari sesi konsol.' },
    ],
    terminalData: {
      os: 'windows',
      intro: '🔒 RDP BLOCKED AFTER FIREWALL POLICY UPDATE\nServer: PROD-SRV-02 | Port 3389 (RDP) is blocked\nAccess: Console only (RDP unavailable). Fix firewall rules to restore remote access.',
      tasks: [
        {
          id: 'rdp_check',
          instruction: '1. Check if RDP port 3389 is listening on the server',
          command: 'netstat -ano | findstr :3389',
          successOutput: '  TCP    0.0.0.0:3389           0.0.0.0:0              LISTENING       1234\n  TCP    [::]:3389              [::]:0                 LISTENING       1234\n\n✅ RDP service IS listening on port 3389 — the service is running.\n⚠️  Problem is in the firewall, not the RDP service itself.',
          hint: 'netstat -ano shows all listening ports with process IDs',
          lesson: 'netstat -ano confirms the RDP service is running and listening. If port 3389 isn\'t listed, the Remote Desktop service itself is stopped. In this case, the service is fine — the firewall is blocking it.',
        },
        {
          id: 'rdp_rules',
          instruction: '2. Check Windows Firewall rules for RDP (port 3389)',
          command: 'netsh advfirewall firewall show rule name="Remote Desktop" dir=in',
          successOutput: 'Rule Name:    Remote Desktop - User Mode (TCP-In)\nEnabled:      Yes\nDirection:    In\nProfiles:     Domain,Private,Public\nAction:       BLOCK   ← ⚠️ SHOULD BE ALLOW!\n\nRule Name:    Block RDP (GPO Applied)\nEnabled:      Yes\nDirection:    In\nAction:       BLOCK\n\n⚠️  GPO applied a BLOCK rule that overrides the ALLOW rule!',
          hint: 'netsh advfirewall firewall show rule name=... displays specific firewall rules',
          lesson: 'Firewall rules are evaluated in order. A BLOCK rule from GPO overrides the built-in ALLOW rule. When troubleshooting, always check for conflicting rules — the most specific/restrictive often wins.',
        },
        {
          id: 'rdp_fix',
          instruction: '3. Add an explicit ALLOW rule for RDP from VPN subnet only (security best practice)',
          command: 'netsh advfirewall firewall add rule name="Allow RDP from VPN" protocol=TCP dir=in localport=3389 remoteip=10.0.0.0/8 action=allow && netsh advfirewall firewall show rule name="Allow RDP from VPN"',
          successOutput: 'Ok.\n\nRule Name:    Allow RDP from VPN\nEnabled:      Yes\nDirection:    In\nProfiles:     Domain,Private,Public\nRemote IP:    10.0.0.0/8\nLocalPort:    3389\nAction:       ALLOW\n\n✅ RDP now allowed from VPN subnet (10.0.0.0/8) only.',
          hint: 'netsh advfirewall firewall add rule creates a new firewall rule. Specify remoteip to limit access to VPN subnet.',
          lesson: 'Always restrict RDP to specific IPs (VPN subnet, jump hosts). Never allow port 3389 from 0.0.0.0/0 (internet). An explicit ALLOW with specific remote IP takes priority over a blanket BLOCK for those source IPs.',
        },
      ],
      successMsg: '🔒 RDP restored for VPN users! Firewall rule fixed — restricted to VPN subnet only for security.',
      lesson: 'RDP blocked: check service (netstat) → check firewall rules (netsh advfirewall show) → add specific ALLOW rule. Always restrict RDP to VPN/jump server IPs, never expose to internet.',
    },
  },

  // ── NEW: Backup Restore Verification ─────────────────────────
  {
    id: 't5_011', title: { en: 'Backup Restore Verification', id: 'Verifikasi Restore Backup' },
    category: 'sysadmin', difficulty: 'hard', areaKey: 'serverRoom', requiredLevel: 57,
    xpReward: 680, coinReward: 130, puzzleType: 'sequence', npcAvatar: '💾', npcName: 'IT Manager',
    description: { en: 'Quarterly DR drill: prove you can restore from backup within the RTO. Execute it correctly!', id: 'Latihan DR triwulanan: buktikan Anda bisa restore dari backup sesuai RTO. Kerjakan dengan benar!' },
    npcDialogue: [
      { npc: 'IT Manager', avatar: '💾', msgEn: 'It\'s time for our quarterly DR drill. Management wants proof we can actually restore production data within our 4-hour RTO. Let\'s test it.', msgId: 'Saatnya latihan DR triwulanan kita. Manajemen ingin bukti bahwa kita benar-benar bisa restore data produksi dalam RTO 4 jam. Mari kita test.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Good. An untested backup is not a backup. I\'ll set up the isolated restore environment and walk through the full verification process.', msgId: 'Bagus. Backup yang tidak diuji bukanlah backup. Saya akan siapkan lingkungan restore yang terisolasi dan lakukan proses verifikasi penuh.' },
      { npc: 'IT Manager', avatar: '💾', msgEn: 'What\'s our RPO again? How much data could we potentially lose?', msgId: 'Berapa RPO kita lagi? Berapa banyak data yang berpotensi hilang?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'We back up every 4 hours, so worst case is 4 hours of data loss. That\'s our RPO. The RTO (time to restore) is what we\'re testing today — target is 4 hours.', msgId: 'Kita backup setiap 4 jam, jadi kasus terburuk adalah kehilangan data 4 jam. Itu RPO kita. RTO (waktu untuk restore) adalah yang kita test hari ini — target 4 jam.' },
    ],
    sequenceData: {
      task: 'Execute the quarterly backup restore verification (DR drill). Arrange the correct steps to verify backup integrity and restoration within the 4-hour RTO:',
      steps: [
        { id: 's1', text: 'Identify the last backup: confirm timestamp, size, and which backup type (full/incremental/differential) — check backup software logs for any errors during backup job' },
        { id: 's2', text: 'Set up an ISOLATED restore environment (separate VM or network segment) — never restore untested backups directly to production' },
        { id: 's3', text: 'Restore the backup to the isolated environment → monitor for errors → record actual restore time (RTO measurement)' },
        { id: 's4', text: 'Verify data integrity: compare record counts, run application smoke tests, verify database checksums against pre-backup values' },
        { id: 's5', text: 'Document results: actual RTO achieved, data integrity status, any gaps found → update DR runbook → sign off with management' },
      ],
      lesson: 'RPO = maximum acceptable data loss (how old the backup can be). RTO = maximum time to recover (how fast you restore). An untested backup is worthless — test quarterly at minimum. Restore to isolated environment FIRST to avoid overwriting production data.',
    },
  },
  {
    // ── INTERACTIVE: sequence (AD bulk user import) ──
    id: 't5_012', title: { en: 'Active Directory Bulk User Import', id: 'Import Massal User Active Directory' },
    category: 'sysadmin', difficulty: 'hard', areaKey: 'enterpriseOffice', requiredLevel: 58,
    xpReward: 430, coinReward: 100, puzzleType: 'sequence', npcAvatar: '👩‍💼', npcName: 'Ibu Sri',
    description: { en: '50 new employees joining Monday. Bulk-create all AD accounts via PowerShell!', id: '50 karyawan baru bergabung Senin. Buat semua akun AD secara massal via PowerShell!' },
    npcDialogue: [
      { npc: 'Ibu Sri', avatar: '👩‍💼', msgEn: "We have 50 new employees starting this Monday across 5 departments. HR has sent me an Excel list. Is there any way to create all 50 Active Directory accounts without doing it manually one by one?", msgId: 'Kita punya 50 karyawan baru mulai Senin ini di 5 departemen. HRD sudah kirim daftar Excel. Apakah ada cara membuat semua 50 akun Active Directory tanpa melakukannya satu per satu secara manual?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Absolutely! This is exactly what PowerShell was made for. We'll export that Excel to CSV, then write a script using New-ADUser to loop through every row and create each account automatically. 50 accounts in under 2 minutes.", msgId: 'Tentu saja! Ini persis untuk apa PowerShell dibuat. Kita ekspor Excel itu ke CSV, lalu tulis script menggunakan New-ADUser untuk loop setiap baris dan buat setiap akun secara otomatis. 50 akun dalam kurang dari 2 menit.' },
      { npc: 'Ibu Sri', avatar: '👩‍💼', msgEn: "That sounds amazing! But I'm worried about mistakes — what if the script creates accounts in the wrong OU or with wrong permissions? We can't have Finance people accessing HR data!", msgId: 'Kedengarannya luar biasa! Tapi saya khawatir soal kesalahan — bagaimana jika script membuat akun di OU yang salah atau dengan izin yang salah? Kita tidak bisa biarkan orang Finance mengakses data HR!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Great concern! That's why we always test in a TEST OU first before running against production. The CSV will have a column for each user's target OU, so accounts go to exactly the right place automatically.", msgId: 'Kekhawatiran yang bagus! Itulah kenapa kita selalu uji di OU TEST dulu sebelum menjalankan ke produksi. CSV akan memiliki kolom untuk OU target setiap pengguna, sehingga akun otomatis masuk ke tempat yang tepat.' },
    ],
    sequenceData: {
      task: '50 new employees need AD accounts by Monday. Perform bulk user creation via PowerShell in the correct order:',
      steps: [
        { id: 'step1', text: 'Prepare CSV from HR Excel: columns = FirstName, LastName, Username, Department, OU, JobTitle. Clean data (no spaces in Username, verify OU paths exist in AD)' },
        { id: 'step2', text: 'Write PowerShell script: Import-CSV users.csv | ForEach-Object { New-ADUser -Name "$($_.FirstName) $($_.LastName)" -SamAccountName $_.Username -Path $_.OU -Department $_.Department -AccountPassword (ConvertTo-SecureString "Temp@2024!" -AsPlainText -Force) -ChangePasswordAtLogon $true -Enabled $true }' },
        { id: 'step3', text: 'Test script with 3 users in TEST OU first — verify accounts are created correctly: check Display Name, OU placement, department attribute, account is enabled' },
        { id: 'step4', text: 'Run full script against all 50 rows — confirm 50 accounts created: Get-ADUser -Filter * -SearchBase "OU=NewHires,DC=company,DC=com" | Measure-Object' },
        { id: 'step5', text: 'Move accounts from staging OU to correct department OUs — assign to appropriate Security Groups (Finance_Users, HR_Users, etc.) — email HR list of usernames and temp passwords' },
      ],
      lesson: 'PowerShell AD bulk operations: always test with small sample in staging OU before full run. Key cmdlets: New-ADUser, Add-ADGroupMember, Move-ADObject. CSV import is the standard method — keep template reusable for future onboarding. Always force password change at first login for security.',
    },
  },
  {
    // ── INTERACTIVE: sequence (GPO creation) ──
    id: 't5_013', title: { en: 'Group Policy Object Creation', id: 'Membuat Group Policy Object' },
    category: 'sysadmin', difficulty: 'hard', areaKey: 'serverRoom', requiredLevel: 59,
    xpReward: 440, coinReward: 105, puzzleType: 'sequence', npcAvatar: '🧑‍💼', npcName: 'Pak Heri',
    description: { en: 'Security team demands USB drives blocked on all employee PCs via GPO!', id: 'Tim keamanan minta USB drive diblokir di semua PC karyawan via GPO!' },
    npcDialogue: [
      { npc: 'Pak Heri', avatar: '🧑‍💼', msgEn: "The security team had a meeting and they want all USB storage drives blocked on employee PCs effective immediately. Too many people are copying company data to personal flash drives.", msgId: 'Tim keamanan sudah rapat dan mereka ingin semua USB storage drive diblokir di PC karyawan efektif segera. Terlalu banyak orang yang menyalin data perusahaan ke flash drive pribadi.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "That's a very reasonable security policy. We can implement this centrally via Group Policy — one GPO applied to the correct OU and it blocks USB storage on every single PC in scope simultaneously.", msgId: 'Itu kebijakan keamanan yang sangat masuk akal. Kita bisa implementasikan ini secara terpusat via Group Policy — satu GPO diterapkan ke OU yang tepat dan itu memblokir USB storage di setiap PC dalam cakupan secara bersamaan.' },
      { npc: 'Pak Heri', avatar: '🧑‍💼', msgEn: "Will this also block USB mice, keyboards, and headsets? Those are perfectly acceptable. We ONLY want to block USB storage — flash drives, external hard drives, that kind of thing.", msgId: 'Apakah ini juga memblokir USB mouse, keyboard, dan headset? Itu sangat bisa diterima. Kita HANYA ingin memblokir USB storage — flash drive, hard drive eksternal, jenis itu.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Perfect question — yes, there is a specific policy setting called 'Removable Storage Devices' that ONLY blocks mass storage class devices. USB HID devices like keyboards and mice use a different device class and won't be affected.", msgId: 'Pertanyaan sempurna — ya, ada pengaturan kebijakan khusus yang disebut \"Removable Storage Devices\" yang HANYA memblokir perangkat kelas mass storage. Perangkat USB HID seperti keyboard dan mouse menggunakan kelas perangkat yang berbeda dan tidak akan terpengaruh.' },
    ],
    sequenceData: {
      task: 'Block USB storage devices on all employee PCs using Group Policy. Follow the correct steps:',
      steps: [
        { id: 'step1', text: 'Open Group Policy Management Console (GPMC) on Domain Controller — right-click the target OU (e.g., "Employees") → Create a GPO in this domain and name it "Block USB Storage"' },
        { id: 'step2', text: 'Edit the new GPO → navigate to: Computer Configuration > Policies > Administrative Templates > System > Removable Storage Access → enable "All Removable Storage classes: Deny all access"' },
        { id: 'step3', text: 'Verify the GPO is linked to the correct OU containing employee computer objects — check Security Filtering shows "Authenticated Users" (applies to all PCs in OU)' },
        { id: 'step4', text: 'Force immediate update on a test PC: run "gpupdate /force" in Command Prompt — reboot if required — verify USB storage is now blocked by plugging in a flash drive' },
        { id: 'step5', text: 'Confirm USB HID still works (plug in keyboard/mouse — should function normally). Document the GPO in IT runbook. Schedule rollout announcement to employees with exception process.' },
      ],
      lesson: 'GPO is the enterprise standard for applying consistent policies across all domain computers. Key: link GPO to Computer OU (not User OU) for device control policies. "Deny all access" to Removable Storage only blocks mass storage class — HID devices (keyboard, mouse) are unaffected. Always test on one machine before broad rollout.',
    },
  },
  {
    // ── INTERACTIVE: quiz (WSUS) ──
    id: 't5_014', title: { en: 'Windows Server Update Services (WSUS)', id: 'Layanan Update Windows Server (WSUS)' },
    category: 'sysadmin', difficulty: 'hard', areaKey: 'serverRoom', requiredLevel: 60,
    xpReward: 420, coinReward: 95, puzzleType: 'quiz', npcAvatar: '🖥️', npcName: 'Server Alert Bot',
    description: { en: 'WSUS server has 200+ pending updates not deploying to client PCs. Fix it!', id: 'Server WSUS punya 200+ update tertunda tidak terdeploy ke PC client. Perbaiki!' },
    npcDialogue: [
      { npc: 'Server Alert Bot', avatar: '🖥️', msgEn: "WSUS ALERT: 247 critical and security updates have been pending approval for 45 days. 0% of client computers have installed this month's Patch Tuesday updates. Executive report due Friday.", msgId: 'ALERT WSUS: 247 update kritis dan keamanan telah menunggu persetujuan selama 45 hari. 0% komputer klien telah menginstal update Patch Tuesday bulan ini. Laporan eksekutif jatuh Jumat.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "This is a serious security gap. 247 unapproved updates for 45 days means every workstation is potentially vulnerable to known exploits. We need to understand WSUS architecture to fix this properly.", msgId: 'Ini adalah celah keamanan serius. 247 update tidak disetujui selama 45 hari berarti setiap workstation berpotensi rentan terhadap eksploit yang diketahui. Kita perlu memahami arsitektur WSUS untuk memperbaiki ini dengan benar.' },
      { npc: 'Server Alert Bot', avatar: '🖥️', msgEn: "Root cause analysis initiated: WSUS synchronization is working (updates ARE downloading). The bottleneck appears to be update APPROVAL workflow — no one has approved this month's updates for any computer group.", msgId: 'Analisis akar masalah dimulai: sinkronisasi WSUS berfungsi (update SUDAH diunduh). Hambatan tampaknya ada di alur kerja PERSETUJUAN update — tidak ada yang menyetujui update bulan ini untuk kelompok komputer manapun.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "That confirms it — WSUS requires explicit approval before pushing updates. Someone needs to own the monthly approval workflow. Let me review WSUS fundamentals and the proper approval process.", msgId: 'Itu mengkonfirmasi — WSUS memerlukan persetujuan eksplisit sebelum mendorong update. Seseorang perlu memiliki alur kerja persetujuan bulanan. Biarkan saya tinjau fundamental WSUS dan proses persetujuan yang tepat.' },
    ],
    quizData: {
      questions: [
        {
          q: 'What is the primary purpose of Windows Server Update Services (WSUS)?',
          options: [
            'A. To block all Windows updates from installing on company computers',
            'B. To centrally manage, approve, and distribute Microsoft updates to all computers in the organization — without each PC downloading directly from Microsoft',
            'C. To automatically install all available updates on every server immediately',
            'D. To replace Windows Defender with enterprise antivirus software',
          ],
          answer: 1,
          explain: 'WSUS downloads updates from Microsoft ONCE to a central server, then distributes to all clients internally. Benefits: saves internet bandwidth, allows testing before deployment, enables staged rollouts, and gives IT control over which updates deploy to which computer groups. Essential for enterprise patch management.',
        },
        {
          q: 'In WSUS, how do you ensure critical security updates only deploy to the "Production Servers" group AFTER they have been tested on the "Test Servers" group first?',
          options: [
            'A. Create two separate WSUS servers — one for test, one for production',
            'B. Create Computer Groups in WSUS: add test servers first → approve updates for Test group → verify 1 week → then approve same updates for Production group',
            'C. Schedule updates using Windows Task Scheduler on each individual server',
            'D. Critical updates automatically install on all computers — WSUS cannot control this',
          ],
          answer: 1,
          explain: 'WSUS Computer Groups allow staged rollouts. Workflow: Sync updates → Approve for Test group → Test servers install → Verify no issues for 1 week → Approve for Production group. This is the industry standard for safe patch deployment. Never approve critical patches directly to production without testing first.',
        },
        {
          q: 'A client PC shows "Windows Update could not detect updates" even though WSUS is working. What should you check first?',
          options: [
            'A. Reinstall Windows on the client PC',
            'B. Check the client-side Group Policy (WSUS server URL must be set in GPO) and run "wuauclt /detectnow" or "UsoClient StartScan" to force the client to contact WSUS',
            'C. Restart the WSUS server',
            'D. Manually install updates on the problem PC from wsus.microsoft.com',
          ],
          answer: 1,
          explain: 'Client PCs find WSUS via GPO setting: Computer Config > Admin Templates > Windows Components > Windows Update > "Specify intranet Microsoft update service location". If this GPO is missing or wrong URL, clients revert to Microsoft directly (blocked by firewall in enterprise). Run "gpresult /r" to verify GPO is applied, then "wuauclt /detectnow" to force immediate check-in.',
        },
      ],
    },
  },
  {
    // ── INTERACTIVE: sequence (NAS setup) ──
    id: 't5_015', title: { en: 'NAS File Server Setup', id: 'Setup File Server NAS' },
    category: 'sysadmin', difficulty: 'medium', areaKey: 'serverRoom', requiredLevel: 58,
    xpReward: 350, coinReward: 80, puzzleType: 'sequence', npcAvatar: '👨‍💼', npcName: 'Pak Direktur',
    description: { en: 'Company needs centralized shared storage for 50 employees. Set up the NAS!', id: 'Perusahaan perlu penyimpanan bersama terpusat untuk 50 karyawan. Setup NAS!' },
    npcDialogue: [
      { npc: 'Pak Direktur', avatar: '👨‍💼', msgEn: "Right now every department saves files on their own local PCs. Last week Finance lost a critical report because someone's laptop hard drive died. We need a centralized file server so everyone can access shared files safely.", msgId: 'Saat ini setiap departemen menyimpan file di PC lokal mereka sendiri. Minggu lalu Finance kehilangan laporan kritis karena hard drive laptop seseorang mati. Kita perlu file server terpusat agar semua orang bisa mengakses file bersama dengan aman.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Perfect timing — a NAS (Network Attached Storage) device is exactly the right solution. It provides centralized storage accessible by all users on the network, with RAID redundancy so a single drive failure doesn't cause data loss.", msgId: 'Timing yang tepat — perangkat NAS (Network Attached Storage) adalah solusi yang tepat. Ini menyediakan penyimpanan terpusat yang dapat diakses semua pengguna di jaringan, dengan redundansi RAID sehingga kegagalan drive tunggal tidak menyebabkan kehilangan data.' },
      { npc: 'Pak Direktur', avatar: '👨‍💼', msgEn: "Good! But I want to make sure Finance can't see HR files and vice versa. We have sensitive salary data in HR and confidential client contracts in Finance. Each department needs their own private space.", msgId: 'Bagus! Tapi saya ingin memastikan Finance tidak bisa melihat file HR dan sebaliknya. Kita punya data gaji sensitif di HR dan kontrak klien rahasia di Finance. Setiap departemen perlu ruang privat mereka sendiri.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Absolutely — we'll create separate shared folders per department with NTFS permissions tied to Active Directory security groups. Only members of HR_Group can access \\nas\\HR, only Finance_Group can access \\nas\\Finance. IT can monitor everything.", msgId: 'Tentu — kita akan buat folder bersama terpisah per departemen dengan izin NTFS yang terikat ke grup keamanan Active Directory. Hanya anggota HR_Group yang bisa akses \\nas\\HR, hanya Finance_Group yang bisa akses \\nas\\Finance. IT bisa memantau segalanya.' },
    ],
    sequenceData: {
      task: 'Set up a NAS file server with department-separated shared folders for 50 employees:',
      steps: [
        { id: 'step1', text: 'Configure NAS static IP address (e.g., 192.168.1.50) and set DNS to point to Domain Controller — join NAS to Active Directory domain so AD security groups can control access' },
        { id: 'step2', text: 'Create department shared folders on NAS: \\\\NAS\\Finance, \\\\NAS\\HR, \\\\NAS\\Engineering, \\\\NAS\\Shared (company-wide) — configure RAID 5 or RAID 6 for redundancy' },
        { id: 'step3', text: 'Set NTFS permissions per folder: Finance → Finance_ADGroup (Read/Write), HR → HR_ADGroup (Read/Write), Engineering → Eng_ADGroup (Read/Write), Shared → Domain Users (Read/Write). Remove "Everyone" permissions!' },
        { id: 'step4', text: 'Map network drives via GPO: Computer Config → Preferences → Drive Maps → create mapped drives (Finance gets Z:→\\\\NAS\\Finance, HR gets Y:→\\\\NAS\\HR) — apply via Security Filtering to correct AD groups' },
        { id: 'step5', text: 'Test from user workstations in each department — verify Finance cannot browse HR folder (Access Denied), enable NAS Recycle Bin for accidental deletion recovery, configure backup schedule (daily incremental, weekly full)' },
      ],
      lesson: 'NAS setup best practices: static IP + AD join for centralized auth, RAID for redundancy (not backup!), NTFS permissions tied to AD groups (never individual users), GPO drive mapping for automatic connectivity, Recycle Bin enabled, regular backup schedule. Remember: RAID ≠ backup — still need offsite/cloud backup.',
    },
  },
  {
    // ── INTERACTIVE: sequence (PowerShell automation) ──
    id: 't5_016', title: { en: 'PowerShell Automation Script', id: 'Script Otomasi PowerShell' },
    category: 'sysadmin', difficulty: 'hard', areaKey: 'itControlCenter', requiredLevel: 62,
    xpReward: 440, coinReward: 105, puzzleType: 'sequence', npcAvatar: '🤖', npcName: 'System Bot',
    description: { en: 'Automate daily disk space monitoring across 20 servers with email alerts!', id: 'Otomasi pemantauan ruang disk harian di 20 server dengan alert email!' },
    npcDialogue: [
      { npc: 'System Bot', avatar: '🤖', msgEn: "SYSTEM ALERT: Server SRV-DB-01 disk C: at 94% capacity. This is the 3rd time this quarter a server has filled up without warning. Each incident caused application downtime. A proactive monitoring solution is needed.", msgId: 'ALERT SISTEM: Server SRV-DB-01 disk C: di 94% kapasitas. Ini ketiga kalinya kuartal ini server penuh tanpa peringatan. Setiap insiden menyebabkan downtime aplikasi. Solusi pemantauan proaktif diperlukan.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "This is a classic case where a simple PowerShell script running daily would have caught this BEFORE it became critical. We'll write a script that checks all 20 servers and emails a report if any disk hits below 15% free space.", msgId: 'Ini adalah kasus klasik di mana script PowerShell sederhana yang berjalan harian sudah akan menangkap ini SEBELUM menjadi kritis. Kita akan tulis script yang memeriksa semua 20 server dan mengirim email laporan jika disk mana saja turun di bawah 15% ruang bebas.' },
      { npc: 'System Bot', avatar: '🤖', msgEn: "QUERY: Will this script impact server performance during execution? Also, what happens if the mail server is also down when disk alerts need to be sent?", msgId: 'KUERI: Apakah script ini akan mempengaruhi kinerja server selama eksekusi? Juga, apa yang terjadi jika mail server juga down saat alert disk perlu dikirim?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Get-PSDrive is extremely lightweight — sub-second execution per server. For mail server redundancy, we'll add a fallback: if email fails, write alerts to a log file on the monitoring server as a backup notification method.", msgId: 'Get-PSDrive sangat ringan — eksekusi di bawah detik per server. Untuk redundansi mail server, kita akan tambahkan fallback: jika email gagal, tulis alert ke file log di server monitoring sebagai metode notifikasi cadangan.' },
    ],
    sequenceData: {
      task: 'Create an automated PowerShell disk monitoring script for 20 servers with email alerts:',
      steps: [
        { id: 'step1', text: 'Write the core script: $servers = Get-Content "servers.txt"; foreach ($server in $servers) { $disks = Get-PSDrive -PSProvider FileSystem -ComputerName $server; foreach ($disk in $disks) { $pctFree = [math]::Round(($disk.Free / ($disk.Used + $disk.Free)) * 100, 1) } }' },
        { id: 'step2', text: 'Add threshold check and alert: if ($pctFree -lt 15) { $alertMsg += "$server Drive $($disk.Name): $pctFree% free — CRITICAL! " } — collect all alerts into single report string for email efficiency' },
        { id: 'step3', text: 'Add email notification: Send-MailMessage -To "it-team@company.com" -From "monitoring@company.com" -Subject "DISK ALERT: $((Get-Date).ToString())" -Body $alertMsg -SmtpServer "mail.company.com" — only send if $alertMsg is not empty' },
        { id: 'step4', text: 'Save script to C:\\Scripts\\DiskMonitor.ps1 — test manually: run script with one server in servers.txt that is over 85% — verify email arrives with correct server name and percentage' },
        { id: 'step5', text: 'Schedule with Task Scheduler: New task → Run daily at 06:00 → Action: powershell.exe -File "C:\\Scripts\\DiskMonitor.ps1" → Run whether user is logged on or not → Run with highest privileges → Enable logging' },
      ],
      lesson: 'PowerShell automation pattern: collect data → evaluate thresholds → notify → log. Schedule scripts via Task Scheduler for reliability. Key: test manually before scheduling, use -ComputerName parameter for remote server queries (requires WinRM enabled), log all executions for audit trail. This type of proactive monitoring prevents reactive fire-fighting.',
    },
  },
  {
    // ── INTERACTIVE: quiz (Hyper-V snapshots) ──
    id: 't5_017', title: { en: 'Hyper-V Snapshot Management', id: 'Manajemen Snapshot Hyper-V' },
    category: 'sysadmin', difficulty: 'epic', areaKey: 'serverRoom', requiredLevel: 63,
    xpReward: 560, coinReward: 145, puzzleType: 'quiz', npcAvatar: '🖥️', npcName: 'Hyper-V Manager',
    description: { en: 'Production VM has 47 snapshots — disk nearly full. Manage them safely!', id: 'VM produksi punya 47 snapshot — disk hampir penuh. Kelola dengan aman!' },
    npcDialogue: [
      { npc: 'Hyper-V Manager', avatar: '🖥️', msgEn: "CRITICAL: Production VM 'SRV-ERP-01' has accumulated 47 Hyper-V checkpoints over 2 years. The host disk is at 96% capacity due to AVHD chain growth. VM performance has degraded 40%. Immediate action required.", msgId: 'KRITIS: VM produksi \"SRV-ERP-01\" telah mengumpulkan 47 checkpoint Hyper-V selama 2 tahun. Disk host di 96% kapasitas karena pertumbuhan rantai AVHD. Performa VM turun 40%. Tindakan segera diperlukan.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "47 snapshots on a production VM is a disaster waiting to happen. Each snapshot creates an AVHD (Automatic Virtual Hard Disk) differencing disk that chains to the previous one — this is why performance degrades and disk fills up.", msgId: '47 snapshot di VM produksi adalah bencana yang menunggu terjadi. Setiap snapshot membuat AVHD (Automatic Virtual Hard Disk) differencing disk yang dirantai ke yang sebelumnya — inilah kenapa performa menurun dan disk penuh.' },
      { npc: 'Hyper-V Manager', avatar: '🖥️', msgEn: "WARNING: Someone previously attempted to delete snapshot files directly from the filesystem with Windows Explorer. The VM immediately became corrupted. We lost 4 hours restoring from backup. How do we safely remove these?", msgId: 'PERINGATAN: Seseorang sebelumnya mencoba menghapus file snapshot langsung dari filesystem dengan Windows Explorer. VM langsung rusak. Kita kehilangan 4 jam untuk restore dari backup. Bagaimana kita menghapusnya dengan aman?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "That is exactly the WRONG way! AVHD files cannot be deleted manually — they must be merged back to the parent VHD through Hyper-V Manager. The merge process consolidates the change chain and reclaims the disk space safely.", msgId: 'Itu CARA YANG SALAH! File AVHD tidak bisa dihapus secara manual — harus digabungkan kembali ke VHD parent melalui Hyper-V Manager. Proses penggabungan mengkonsolidasi rantai perubahan dan mengklaim kembali ruang disk dengan aman.' },
    ],
    quizData: {
      questions: [
        {
          q: 'Why does having 47 Hyper-V checkpoints (snapshots) severely degrade VM performance?',
          options: [
            'A. Snapshots use too much CPU to create thumbnail previews of the VM state',
            'B. Each checkpoint creates an AVHD differencing disk — every disk I/O must traverse the entire chain of 47 files instead of writing directly to the base VHD',
            'C. Hyper-V limits VMs to 10 checkpoints before throttling performance',
            'D. Snapshots encrypt the VM disk, which adds decryption overhead',
          ],
          answer: 1,
          explain: 'Hyper-V checkpoints use differencing disks (AVHD). With 47 checkpoints, a single disk write must be processed through a chain of 47 AVHD files before reaching the base VHD. This creates massive I/O overhead — like reading a book where each chapter is in a different location. Microsoft recommends maximum 3-4 snapshots per production VM.',
        },
        {
          q: 'What is the CORRECT way to safely remove Hyper-V checkpoints without corrupting the VM?',
          options: [
            'A. Delete the AVHD files directly from Windows Explorer while the VM is powered off',
            'B. In Hyper-V Manager: right-click the checkpoint → Delete Checkpoint Subtree → Hyper-V will automatically merge AVHD into parent VHD (this takes time but is safe)',
            'C. Copy the VHD file to another location, delete all AVHD files, then restore the copy',
            'D. Use Disk Cleanup inside the VM to free up snapshot space',
          ],
          answer: 1,
          explain: 'Always use Hyper-V Manager to delete checkpoints — NEVER delete AVHD files manually. When you delete a checkpoint in HVMM, Hyper-V merges that checkpoint\'s AVHD into its parent. For 47 checkpoints, merging takes hours (disk activity will spike). Schedule this during maintenance window. The VM can remain running during merge but performance will be impacted.',
        },
        {
          q: 'How do you PREVENT checkpoint accumulation on production VMs in the future?',
          options: [
            'A. Take more frequent snapshots so old ones are automatically overwritten',
            'B. Disable checkpoints entirely on all VMs — they are never needed in production',
            'C. In VM Settings → Management → Checkpoints: set maximum checkpoint count (e.g., 3), enable automatic checkpoint deletion, and use Standard checkpoints (not Production) for quick pre-patch snapshots only',
            'D. Move the VM to a physical server — Hyper-V checkpoints don\'t exist on bare metal',
          ],
          answer: 2,
          explain: 'Best practices for production VM checkpoints: (1) Set max checkpoint count in VM settings, (2) Only take checkpoints before planned changes (patches, config changes) — delete after successful verification, (3) Never use checkpoints as a replacement for proper backups, (4) Enable automatic checkpoint cleanup. Production VMs should have zero checkpoints during normal operation.',
        },
      ],
    },
  },
];
