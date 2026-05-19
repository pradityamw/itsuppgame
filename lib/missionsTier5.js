// TIER 5 MISSIONS — System Administration (Level 50–70)
// Areas: enterpriseOffice, serverRoom, miniDataCenter, itControlCenter

export const MISSIONS_TIER5 = [
  {
    // ── INTERACTIVE: sequence (backup restore) ──
    id: 't5_001', title: { en: 'Restore From Backup', id: 'Pulihkan dari Backup' },
    category: 'sysadmin', difficulty: 'hard', areaKey: 'serverRoom', requiredLevel: 50,
    xpReward: 700, coinReward: 140, puzzleType: 'sequence', npcAvatar: '🚨', npcName: 'CTO Alert',
    description: { en: 'Production database corrupted. Execute the backup restore procedure correctly!', id: 'Database produksi rusak. Laksanakan prosedur restore backup dengan benar!' },
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
];
