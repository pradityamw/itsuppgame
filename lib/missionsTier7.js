// TIER 7 MISSIONS — Senior Engineer (Level 90–100)
// Areas: globalDataCenter, cloudRoom, corporateHQ, disasterRecovery

export const MISSIONS_TIER7 = [
  {
    // ── INTERACTIVE: sequence (global outage ICS) ──
    id: 't7_001', title: { en: 'Global Outage Response', id: 'Respons Pemadaman Global' },
    category: 'sysadmin', difficulty: 'epic', areaKey: 'globalDataCenter', requiredLevel: 90,
    xpReward: 1500, coinReward: 300, puzzleType: 'sequence', npcAvatar: '🌍', npcName: 'Global NOC',
    description: { en: 'Company services down worldwide — 10,000 users affected. Run the incident response correctly!', id: 'Layanan perusahaan mati di seluruh dunia — 10.000 pengguna terdampak. Jalankan respons insiden dengan benar!' },
    npcDialogue: [
      { npc: 'Global NOC', avatar: '🌍', msgEn: 'CRITICAL ALERT: All company services are DOWN worldwide. 10,000 users affected. Website, APIs, everything — offline. We need incident command NOW!', msgId: 'PERINGATAN KRITIS: Semua layanan perusahaan DOWN di seluruh dunia. 10.000 pengguna terdampak. Website, API, semuanya — offline. Kami butuh komando insiden SEKARANG!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Declaring P1 Incident. Assigning roles: I am Incident Commander. Spinning up the war room bridge now. First step — scope, then contain, then communicate.', msgId: 'Mendeklarasikan Insiden P1. Menugaskan peran: Saya Incident Commander. Membuka bridge war room sekarang. Langkah pertama — scope, lalu contain, lalu komunikasikan.' },
    ],
    sequenceData: {
      task: 'MAJOR INCIDENT: Company services down worldwide, 10,000 users affected. Arrange the correct Incident Command Structure response:',
      steps: [
        { id: 'step1', text: 'Declare a P1 Incident — assign Incident Commander, Tech Lead, and Communications Lead immediately (one voice = no conflicting info)' },
        { id: 'step2', text: 'Identify scope: which services are down, which regions, since when — post to incident Slack channel every 15 minutes' },
        { id: 'step3', text: 'Contain the impact: route traffic to backup regions, activate DR systems, scale up healthy services' },
        { id: 'step4', text: 'Investigate root cause in parallel — do NOT wait for fix before communicating. Update status page every 15 min' },
        { id: 'step5', text: 'Implement fix → verify recovery → declare incident resolved → conduct blameless post-mortem within 48h to prevent recurrence' },
      ],
      lesson: 'Major incidents: structured ICS roles, blameless post-mortem, single communications source. Prevention over blame — post-mortems produce action items, not blame.',
    },
  },
  {
    // ── INTERACTIVE: sequence (data center cooling failure) ──
    id: 't7_002', title: { en: 'Data Center Cooling Failure', id: 'Kegagalan Pendingin Data Center' },
    category: 'hardware', difficulty: 'epic', areaKey: 'globalDataCenter', requiredLevel: 91,
    xpReward: 1400, coinReward: 280, puzzleType: 'sequence', npcAvatar: '🌡️', npcName: 'Thermal Alert',
    description: { en: 'Data center AC failed — room at 42°C. Servers auto-shutting down. Act fast in the right order!', id: 'AC data center mati — ruangan 42°C. Server mati otomatis. Bertindak cepat dengan urutan benar!' },
    npcDialogue: [
      { npc: 'Thermal Alert', avatar: '🌡️', msgEn: 'THERMAL EMERGENCY! AC unit failure confirmed. Data center temperature is at 42°C and climbing. Servers are triggering thermal shutdowns automatically. We have minutes before critical data loss!', msgId: 'DARURAT TERMAL! Kegagalan unit AC dikonfirmasi. Suhu data center 42°C dan naik. Server secara otomatis mematikan diri karena panas. Kita punya beberapa menit sebelum kehilangan data kritis!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Starting thermal emergency protocol. Priority: reduce heat load without losing critical services. We do NOT panic-shutdown everything — that causes data corruption. Ordered shutdown first.', msgId: 'Memulai protokol darurat termal. Prioritas: kurangi beban panas tanpa kehilangan layanan kritis. Kita TIDAK panik mematikan semuanya — itu menyebabkan korupsi data. Shutdown teratur dulu.' },
    ],
    sequenceData: {
      task: 'DATA CENTER EMERGENCY: AC unit failed, temperature rising to 42°C. Servers are thermal-shutting down. Arrange the correct emergency response:',
      steps: [
        { id: 'step1', text: 'Check DCIM/BMS dashboard — confirm which AC units failed and current hot/cold aisle temps per rack row' },
        { id: 'step2', text: 'Gracefully shut down non-critical workloads first to reduce heat load — buy time without losing critical services' },
        { id: 'step3', text: 'Activate emergency procedures: open doors to server room (temporary), bring in portable AC units if available' },
        { id: 'step4', text: 'Migrate critical VMs to remote DR site / cloud if temp continues rising above 30°C threshold' },
        { id: 'step5', text: 'Once AC is repaired and temp drops below 27°C — bring workloads back online — order N+1 AC redundancy to prevent recurrence' },
      ],
      lesson: 'Cooling failure: reduce load first (don\'t panic-shutdown everything). ASHRAE recommends 18-27°C. N+1 cooling redundancy = one spare AC always on standby.',
    },
  },
  {
    // ── INTERACTIVE: terminal (enterprise DNS outage) ──
    id: 't7_003', title: { en: 'Enterprise DNS Outage', id: 'Gangguan DNS Enterprise' },
    category: 'networking', difficulty: 'legendary', areaKey: 'corporateHQ', requiredLevel: 93,
    xpReward: 2000, coinReward: 400, puzzleType: 'terminal', npcAvatar: '🌐', npcName: 'Global IT',
    description: { en: 'Internal DNS servers down — 5,000 employees can\'t access ANY internal resources. Fix it fast!', id: 'Server DNS internal mati — 5.000 karyawan tidak bisa akses semua sumber daya internal. Perbaiki cepat!' },
    npcDialogue: [
      { npc: 'Global IT', avatar: '🌐', msgEn: 'CRITICAL: Both internal DNS servers are down. 5,000 employees cannot access intranet, email, ERP — anything that uses internal hostnames. The entire company is effectively paralyzed!', msgId: 'KRITIS: Kedua server DNS internal down. 5.000 karyawan tidak bisa akses intranet, email, ERP — apapun yang menggunakan hostname internal. Seluruh perusahaan praktis lumpuh!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'First we implement an emergency bypass using the hosts file for critical services. Then we repair DNS. Employees can at least access intranet, mail and ERP while we fix the root cause.', msgId: 'Pertama kita implementasikan bypass darurat menggunakan hosts file untuk layanan kritis. Lalu kita perbaiki DNS. Karyawan setidaknya bisa akses intranet, mail, dan ERP sementara kita perbaiki akar penyebabnya.' },
    ],
    terminalData: {
      os: 'windows',
      intro: 'Internal DNS servers (192.168.1.10 and 192.168.1.11) are both down. 5,000 employees can\'t reach ANY internal services. Implement emergency bypass while DNS is repaired.',
      tasks: [
        {
          id: 'task1',
          instruction: 'Confirm both DNS servers are unreachable:',
          command: 'Test-NetConnection 192.168.1.10 -Port 53 ; Test-NetConnection 192.168.1.11 -Port 53',
          hint: 'Type: Test-NetConnection 192.168.1.10 -Port 53 ; Test-NetConnection 192.168.1.11 -Port 53',
          successOutput: `ComputerName     : 192.168.1.10\nRemotePort       : 53\nTcpTestSucceeded : False\n[FAILED] DNS1 (192.168.1.10) port 53 unreachable\n\nComputerName     : 192.168.1.11\nRemotePort       : 53\nTcpTestSucceeded : False\n[FAILED] DNS2 (192.168.1.11) port 53 unreachable\n\n[!] Both primary and secondary DNS servers are DOWN. Emergency bypass needed.`,
          lesson: 'Test-NetConnection checks port-level connectivity. Both DNS servers down = single point of failure was never fixed. Need primary + secondary + tertiary DNS at minimum.',
        },
        {
          id: 'task2',
          instruction: 'Push emergency hosts file entries for critical services via Group Policy (bypasses DNS entirely):',
          command: 'Add-Content C:\\Windows\\System32\\drivers\\etc\\hosts "192.168.1.100 intranet.company.com`n192.168.1.101 mail.company.com`n192.168.1.102 erp.company.com" && ipconfig /flushdns',
          hint: 'Type: Add-Content C:\\Windows\\System32\\drivers\\etc\\hosts "192.168.1.100 intranet.company.com..." && ipconfig /flushdns',
          successOutput: `[OK] Added to hosts file:\n192.168.1.100  intranet.company.com\n192.168.1.101  mail.company.com\n192.168.1.102  erp.company.com\n\nWindows IP Configuration\nSuccessfully flushed the DNS Resolver Cache.\n\n[✓] Critical services accessible via hosts file bypass. Employees can reach intranet, mail, and ERP.`,
          lesson: 'Hosts file bypasses DNS entirely — entries resolve to IPs without any DNS query. ipconfig /flushdns clears cached lookups so new entries take effect.',
        },
        {
          id: 'task3',
          instruction: 'Restart the DNS service on the primary DNS server (console access) and verify:',
          command: 'Restart-Service DNS -Force -Verbose ; Resolve-DnsName intranet.company.com -Server 192.168.1.10',
          hint: 'Type: Restart-Service DNS -Force -Verbose ; Resolve-DnsName intranet.company.com -Server 192.168.1.10',
          successOutput: `VERBOSE: Performing operation "Restart-Service" on target "DNS Server (DNS)".\nVERBOSE: Service DNS successfully restarted.\n\nName                          Type   TTL   Section    IPAddress\n----                          ----   ---   -------    ---------\nintranet.company.com          A      3600  Answer     192.168.1.100\n\n[✓] DNS server 192.168.1.10 is back online and resolving correctly. Remove hosts file bypass after DNS2 is restored.`,
          lesson: 'Restart-Service DNS recovers the DNS service. Resolve-DnsName verifies it can resolve queries. Remove hosts file workaround once full DNS redundancy is restored.',
        },
      ],
      successMsg: '🌐 DNS restored! 5,000 employees have access again. Post-mortem: add tertiary DNS and monitoring alerts.',
      lesson: 'DNS redundancy is critical. Emergency bypass: hosts file entries. Long-term: primary + secondary + tertiary DNS. Monitor DNS availability proactively.',
    },
  },
  {
    // ── INTERACTIVE: sequence (cloud sync disaster recovery) ──
    id: 't7_004', title: { en: 'Cloud Sync Disaster', id: 'Bencana Sinkronisasi Cloud' },
    category: 'sysadmin', difficulty: 'epic', areaKey: 'cloudRoom', requiredLevel: 92,
    xpReward: 1600, coinReward: 320, puzzleType: 'sequence', npcAvatar: '☁️', npcName: 'Cloud Alert',
    description: { en: 'Sync script bug deleted 50,000 files from cloud storage. Execute recovery in the right order!', id: 'Bug script sync menghapus 50.000 file dari cloud storage. Laksanakan recovery dengan urutan benar!' },
    npcDialogue: [
      { npc: 'Cloud Alert', avatar: '☁️', msgEn: 'DISASTER! A sync script with a bug has deleted 50,000 production files from S3 cloud storage. The script is STILL RUNNING. Every second more files are gone. What is your first action?', msgId: 'BENCANA! Script sync dengan bug telah menghapus 50.000 file produksi dari S3 cloud storage. Script masih BERJALAN. Setiap detik lebih banyak file hilang. Apa tindakan pertamamu?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'STOP THE SCRIPT FIRST — always stop the damage before recovery. Then assess scope with S3 versioning. If versioning is enabled, we can restore every deleted file without any data loss.', msgId: 'HENTIKAN SCRIPT DULU — selalu hentikan kerusakan sebelum recovery. Lalu nilai scope dengan S3 versioning. Jika versioning aktif, kita bisa restore setiap file yang dihapus tanpa kehilangan data apapun.' },
    ],
    sequenceData: {
      task: 'A sync script bug ran and deleted 50,000 production files from AWS S3. The script is still running. Arrange the correct disaster recovery steps:',
      steps: [
        { id: 'step1', text: 'STOP the sync script process IMMEDIATELY — every second it runs, more files are deleted permanently' },
        { id: 'step2', text: 'Assess scope: use AWS S3 versioning/deletion markers to see exactly how many files were deleted and when' },
        { id: 'step3', text: 'Use AWS S3 Restore or soft-delete feature to recover deleted files (S3 versioning must have been enabled)' },
        { id: 'step4', text: 'Verify restored files are intact — compare checksums against the last known-good backup manifest' },
        { id: 'step5', text: 'Fix the script bug, add dry-run mode + confirmation prompt for destructive operations, re-run with safeguards' },
      ],
      lesson: 'Cloud deletions: STOP the process first. AWS S3 versioning, Azure Soft Delete, GCS Trash retain deleted objects. Always enable versioning on production buckets.',
    },
  },
  {
    // ── INTERACTIVE: terminal (DR failover / RTO/RPO) ──
    id: 't7_005', title: { en: 'Infrastructure Redundancy Failure', id: 'Kegagalan Redundansi Infrastruktur' },
    category: 'sysadmin', difficulty: 'legendary', areaKey: 'disasterRecovery', requiredLevel: 95,
    xpReward: 2500, coinReward: 500, puzzleType: 'terminal', npcAvatar: '🏗️', npcName: 'DR Team',
    description: { en: 'Primary data center is down. DR failover not working. Manual intervention needed!', id: 'Data center utama mati. Failover DR tidak berfungsi. Diperlukan intervensi manual!' },
    npcDialogue: [
      { npc: 'DR Team', avatar: '🏗️', msgEn: 'PRIMARY DATA CENTER IS DOWN — complete failure. Automatic DR failover was supposed to kick in but it failed silently. RTO target is 30 minutes and the clock is already ticking!', msgId: 'DATA CENTER PRIMER DOWN — kegagalan total. Failover DR otomatis seharusnya aktif tapi gagal diam-diam. Target RTO adalah 30 menit dan waktu sudah berjalan!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Switching to manual DR failover. First I check DR site health via Ansible, then promote the DB replica, then cut DNS over. We can hit the 30-minute RTO if we move fast and in order.', msgId: 'Beralih ke failover DR manual. Pertama saya periksa kesehatan DR site via Ansible, lalu promote DB replica, lalu alihkan DNS. Kita bisa mencapai RTO 30 menit jika bergerak cepat dan terurut.' },
    ],
    terminalData: {
      os: 'linux',
      intro: 'PRIMARY DATA CENTER IS DOWN. Automatic DR failover failed. Manually trigger failover to the DR site. RTO target: 30 minutes.',
      tasks: [
        {
          id: 'task1',
          instruction: 'Check the health of DR site services:',
          command: 'ansible dr-site -m ping && ansible dr-site -m shell -a "systemctl status app-cluster"',
          hint: 'Type: ansible dr-site -m ping && ansible dr-site -m shell -a "systemctl status app-cluster"',
          successOutput: `dr-web-01 | SUCCESS => {"ping": "pong"}\ndr-web-02 | SUCCESS => {"ping": "pong"}\ndr-db-01  | SUCCESS => {"ping": "pong"}\n\ndr-web-01: app-cluster.service - active (running) - STANDBY MODE\ndr-db-01:  postgresql.service - active (running) - REPLICA (lag: 45s)\n\n[✓] DR site is reachable. DB replica is 45 seconds behind primary. Ready for failover.`,
          lesson: 'Ansible checks all DR nodes simultaneously. DB replica lag = data potentially lost during failover (RPO). 45s lag means up to 45s of recent transactions may be lost.',
        },
        {
          id: 'task2',
          instruction: 'Promote the DR database replica to primary:',
          command: 'ansible dr-db-01 -m shell -a "pg_ctl promote -D /var/lib/postgresql/data && psql -c \'SELECT pg_is_in_recovery();\'"',
          hint: 'Type: ansible dr-db-01 -m shell -a "pg_ctl promote -D /var/lib/postgresql/data"',
          successOutput: `dr-db-01 | CHANGED | rc=0 >>\nwaiting for server to promote...\nDONE\nserver promoted\n\n pg_is_in_recovery\n------------------\n f\n(1 row)\n\n[✓] DR database promoted to PRIMARY. pg_is_in_recovery = false (no longer a replica). Data writes now accepted.`,
          lesson: 'pg_ctl promote makes the PostgreSQL replica the new primary. pg_is_in_recovery() = false confirms it is now primary and accepting writes.',
        },
        {
          id: 'task3',
          instruction: 'Switch DNS to point traffic to the DR site:',
          command: 'aws route53 change-resource-record-sets --hosted-zone-id Z1ABC --change-batch \'{"Changes":[{"Action":"UPSERT","ResourceRecordSet":{"Name":"app.company.com","Type":"A","TTL":60,"ResourceRecords":[{"Value":"203.0.113.50"}]}}]}\' && echo "DNS updated to DR site IP"',
          hint: 'Type: aws route53 change-resource-record-sets --hosted-zone-id Z1ABC --change-batch \'{...}\'',
          successOutput: `{\n    "ChangeInfo": {\n        "Id": "/change/CABCDEFGHIJKL",\n        "Status": "PENDING",\n        "SubmittedAt": "2026-05-19T21:05:00Z",\n        "Comment": "Failover to DR site"\n    }\n}\nDNS updated to DR site IP: 203.0.113.50\n\n[✓] Route53 DNS now pointing to DR site. TTL=60s means traffic shifts within 1 minute. RTO achieved: 18 minutes (target was 30 min).`,
          lesson: 'Route53 DNS failover with low TTL (60s) redirects traffic quickly. Active-passive DR: primary DC down → promote DB replica → switch DNS → traffic flows to DR site.',
        },
      ],
      successMsg: '🏗️ DR failover complete in 18 minutes! RTO target (30 min) achieved. Post-mortem: fix auto-failover, implement active-active for zero-downtime.',
      lesson: 'Test DR plans regularly — untested plans fail in real disasters. RTO = target recovery time, RPO = acceptable data loss. Active-active = zero RTO, active-passive = cost-effective standby.',
    },
  },
  {
    // ── INTERACTIVE: terminal (latency / Wireshark analysis) ──
    id: 't7_006', title: { en: 'Network Latency Hunt', id: 'Investigasi Latensi Jaringan' },
    category: 'networking', difficulty: 'epic', areaKey: 'globalDataCenter', requiredLevel: 94,
    xpReward: 1800, coinReward: 360, puzzleType: 'terminal', npcAvatar: '📊', npcName: 'Perf Team',
    description: { en: 'Trading platform latency jumped from 2ms to 200ms. Every millisecond costs millions. Find the cause!', id: 'Latensi platform trading naik dari 2ms ke 200ms. Setiap milidetik bernilai jutaan. Temukan penyebabnya!' },
    npcDialogue: [
      { npc: 'Perf Team', avatar: '📊', msgEn: 'Trading platform latency just spiked from 2ms to 200ms — 100x increase! Traders are screaming. At this latency, the platform is losing millions per minute. We need layer-by-layer isolation NOW.', msgId: 'Latensi platform trading baru saja melonjak dari 2ms ke 200ms — peningkatan 100x! Trader berteriak. Pada latensi ini, platform kehilangan jutaan per menit. Kita butuh isolasi lapis-per-lapis SEKARANG.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Starting systematic latency investigation: first ping each network hop to isolate which layer is slow. Then mtr for precise hop-by-hop analysis. Then check local NIC. Follow the data.', msgId: 'Memulai investigasi latensi sistematis: pertama ping setiap hop jaringan untuk mengisolasi lapisan mana yang lambat. Lalu mtr untuk analisis hop-per-hop yang presisi. Lalu periksa NIC lokal. Ikuti datanya.' },
    ],
    terminalData: {
      os: 'linux',
      intro: 'Trading platform latency jumped 100x suddenly (2ms → 200ms). Millions of dollars at stake. Layer-by-layer isolation needed.',
      tasks: [
        {
          id: 'task1',
          instruction: 'Test latency at each network layer — start with the local NIC:',
          command: 'ping -c 20 -i 0.1 192.168.1.1 | tail -3 && ping -c 20 -i 0.1 10.0.0.1 | tail -3 && ping -c 20 -i 0.1 trading-exchange.com | tail -3',
          hint: 'Type: ping -c 20 -i 0.1 192.168.1.1 | tail -3',
          successOutput: `--- 192.168.1.1 ping statistics ---\n20 packets transmitted, 20 received, 0% loss, rtt min/avg/max = 0.4/0.5/0.6 ms\n[✓] Local switch: 0.5ms NORMAL\n\n--- 10.0.0.1 ping statistics ---\n20 packets transmitted, 20 received, 0% loss, rtt min/avg/max = 1.2/1.3/1.4 ms\n[✓] Core router: 1.3ms NORMAL\n\n--- trading-exchange.com ping statistics ---\n20 packets transmitted, 20 received, 4% loss, rtt min/avg/max = 195/202/215 ms\n[!] Exchange endpoint: 202ms and 4% PACKET LOSS. Problem is in WAN path!`,
          lesson: 'Layer-by-layer ping isolation: LAN → core router → WAN destination. Problem appears at WAN layer (4% loss, 202ms). Investigate the path with traceroute.',
        },
        {
          id: 'task2',
          instruction: 'Run mtr (combined traceroute + ping) to find the exact hop with the problem:',
          command: 'mtr --report --report-cycles 50 --no-dns trading-exchange.com',
          hint: 'Type: mtr --report --report-cycles 50 --no-dns trading-exchange.com',
          successOutput: `HOST: trading-server          Loss%   Snt   Avg  Best  Wrst\n  1. 192.168.1.1               0.0%    50   0.5   0.4   0.6\n  2. 10.0.0.1                  0.0%    50   1.3   1.2   1.5\n  3. 203.0.113.1               0.0%    50   3.1   2.9   3.4\n  4. 198.51.100.1             82.0%    50 198.4   2.1 215.0  ← PROBLEM\n  5. 203.0.113.50              0.0%    50   4.2   4.0   4.5\n  6. trading-exchange.com      4.0%    50 202.1   2.0 215.8\n\n[!] Hop 4 (198.51.100.1) has 82% packet loss — this ISP router is the bottleneck. Hop 5 is fine afterward.`,
          lesson: 'mtr combines traceroute and continuous ping. 82% packet loss at hop 4 that disappears at hop 5 = that specific ISP router is congested or failing.',
        },
        {
          id: 'task3',
          instruction: 'Check local interface for duplex mismatch (common LAN latency cause) and capture stats:',
          command: 'ethtool eth0 | grep -E "Speed|Duplex" && ip -s link show eth0 | grep -A2 "RX\\|TX"',
          hint: 'Type: ethtool eth0 | grep -E "Speed|Duplex" && ip -s link show eth0',
          successOutput: `Speed: 10000Mb/s\nDuplex: Full\n\nRX:  bytes    packets  errors  dropped\n     987654321  1234567  0       0\nTX:  bytes    packets  errors  dropped\n     876543210  1023456  0       0\n\n[✓] Local NIC: 10Gbps Full-Duplex, zero errors/drops. LAN is clean.\n[CONCLUSION] Root cause: ISP backbone router at hop 4 congested. Escalated to ISP NOC with mtr report. ETA: 45 min. Alternative: activate backup ISP link.`,
          lesson: 'ethtool checks NIC speed/duplex. ip -s shows packet error counters. Zero errors = LAN is not the problem. ISP issue confirmed — escalate with mtr report as evidence.',
        },
      ],
      successMsg: '📊 Root cause: ISP backbone congestion at hop 4. Backup ISP link activated. Latency restored to 2ms. ISP SLA breach documented.',
      lesson: 'Latency investigation: layer-by-layer ping → mtr for exact hop → check LAN NIC. TCP retransmissions in Wireshark = packet loss. Document with mtr for ISP escalation.',
    },
  },

  // ── NEW: DNS Redundancy Failure ────────────────────────────────
  {
    id: 't7_007', title: { en: 'DNS Redundancy Failure', id: 'Kegagalan Redundansi DNS' },
    category: 'networking', difficulty: 'epic', areaKey: 'corporateHQ', requiredLevel: 92,
    xpReward: 1700, coinReward: 340, puzzleType: 'terminal', npcAvatar: '🌐', npcName: 'NOC Manager',
    description: { en: 'Primary DNS crashed, secondary overloaded. Emergency tertiary DNS + bypass needed!', id: 'DNS primer crash, sekunder kelebihan beban. DNS tersier darurat + bypass diperlukan!' },
    npcDialogue: [
      { npc: 'NOC Manager', avatar: '🌐', msgEn: 'Primary DNS (192.168.1.10) crashed 10 min ago. Secondary (192.168.1.11) is at 100% CPU — intermittent failures!', msgId: 'DNS primer crash 10 menit lalu. Sekunder 100% CPU — kegagalan intermiten!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'We need a tertiary DNS immediately. Public DNS won\'t resolve internal names — we\'ll promote a spare server and zone-transfer from secondary.', msgId: 'Kita butuh DNS tersier segera. DNS publik tidak resolve nama internal — kita promote server cadangan dan zone-transfer dari sekunder.' },
    ],
    terminalData: {
      os: 'windows',
      intro: '🌐 DNS REDUNDANCY FAILURE\nPrimary DNS (192.168.1.10): CRASHED | Secondary DNS (192.168.1.11): OVERLOADED\nGoal: Bring up tertiary DNS + push to clients via GPO.',
      tasks: [
        {
          id: 'dns_test',
          instruction: '1. Test both DNS servers to confirm outage scope',
          command: 'Test-NetConnection 192.168.1.10 -Port 53 ; Test-NetConnection 192.168.1.11 -Port 53',
          successOutput: 'ComputerName: 192.168.1.10 | TcpTestSucceeded: False [DEAD]\nComputerName: 192.168.1.11 | TcpTestSucceeded: True [ALIVE but overloaded]\n\n⚠️  DNS1: DEAD. DNS2: alive but at 100% CPU, intermittent failures.',
          hint: 'Test-NetConnection -Port 53 checks DNS port reachability',
          lesson: 'Always verify DNS from the network layer (port 53) before troubleshooting. Primary dead + secondary overloaded = need immediate tertiary. This is why DNS needs N+2 redundancy.',
        },
        {
          id: 'dns_tertiary',
          instruction: '2. Install DNS role on spare server + seed it via zone transfer from secondary',
          command: 'Install-WindowsFeature DNS -ComputerName SRV-DNS-03 ; dnscmd SRV-DNS-03 /zoneadd company.local /secondary 192.168.1.11',
          successOutput: 'DNS role installed on SRV-DNS-03\nZone company.local added as secondary — 847 records transferred from 192.168.1.11\n\n✅ Tertiary DNS (192.168.1.20) online with full zone data.',
          hint: 'Install-WindowsFeature DNS + dnscmd /zoneadd /secondary creates a secondary zone that replicates from the master',
          lesson: 'A secondary DNS zone copies all records from the master via zone transfer. Install DNS role → add secondary zone → records copy automatically. This instantly relieves overload from secondary.',
        },
        {
          id: 'dns_push',
          instruction: '3. Push tertiary DNS to all clients via Group Policy',
          command: 'Set-DnsClientServerAddress -InterfaceAlias "Ethernet" -ServerAddresses ("192.168.1.11","192.168.1.20","8.8.8.8")',
          successOutput: 'DNS servers updated for all clients:\n  DNS1: 192.168.1.11 (secondary — recovering)\n  DNS2: 192.168.1.20 (tertiary — healthy)\n  DNS3: 8.8.8.8 (public — internet fallback only)\n\n✅ DNS redundancy restored. Primary under repair.',
          hint: 'Set-DnsClientServerAddress sets DNS preference order; Windows tries them sequentially',
          lesson: 'Configure 3 DNS servers: healthy secondary, new tertiary, public backup. Windows tries them in order. Public DNS (8.8.8.8) only resolves internet names — not internal ones like company.local. Always plan N+2 DNS redundancy.',
        },
      ],
      successMsg: '🌐 DNS stability restored! Tertiary online. GPO pushed. Primary repair in progress. RTO: 22 min.',
      lesson: 'DNS redundancy: N+2 (3 servers minimum). Secondary zone transfer from primary. GPO pushes config instantly. Public DNS is last resort only — won\'t resolve internal names.',
    },
  },

  // ── NEW: Cloud Storage Recovery ────────────────────────────────
  {
    id: 't7_008', title: { en: 'Cloud Storage Recovery', id: 'Pemulihan Cloud Storage' },
    category: 'sysadmin', difficulty: 'epic', areaKey: 'cloudRoom', requiredLevel: 93,
    xpReward: 1800, coinReward: 360, puzzleType: 'terminal', npcAvatar: '☁️', npcName: 'Cloud Architect',
    description: { en: 'Dev script deleted 10,000 prod S3 files. Versioning is ON — restore them with AWS CLI!', id: 'Script dev hapus 10.000 file S3 prod. Versioning aktif — restore dengan AWS CLI!' },
    npcDialogue: [
      { npc: 'Cloud Architect', avatar: '☁️', msgEn: 'EMERGENCY! Dev cleanup script had wrong prefix — deleted 10,000 files from prod-assets S3 instead of dev-temp!', msgId: 'DARURAT! Script dev punya prefix salah — hapus 10.000 file dari S3 prod-assets, bukan dev-temp!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Is S3 versioning enabled on prod-assets? If yes, objects aren\'t truly deleted — they have delete markers we can remove to restore everything.', msgId: 'Apakah S3 versioning diaktifkan di prod-assets? Jika ya, objek tidak benar-benar terhapus — ada delete marker yang bisa kita hapus untuk restore semuanya.' },
    ],
    terminalData: {
      os: 'linux',
      intro: '☁️ AWS S3 MASS DELETION RECOVERY\nBucket: s3://prod-assets | Files deleted: ~10,000 | S3 Versioning: ENABLED\nStrategy: Remove delete markers to restore all deleted objects.',
      tasks: [
        {
          id: 's3_check',
          instruction: '1. Confirm versioning is on and count delete markers',
          command: 'aws s3api get-bucket-versioning --bucket prod-assets && aws s3api list-object-versions --bucket prod-assets --query "length(DeleteMarkers)"',
          successOutput: '{"Status": "Enabled"}\n10247\n\n✅ Versioning ENABLED. 10,247 delete markers = 10,247 \"deleted\" files that are actually restorable.',
          hint: 'aws s3api get-bucket-versioning + list-object-versions checks status and delete markers',
          lesson: 'S3 versioning never truly deletes — it adds a "delete marker" hiding the object. Removing the delete marker restores instantly. This is why versioning on prod buckets is non-negotiable.',
        },
        {
          id: 's3_restore',
          instruction: '2. Bulk-remove all delete markers to restore files',
          command: 'aws s3api list-object-versions --bucket prod-assets --query "DeleteMarkers[].[Key,VersionId]" --output text | while read key vid; do aws s3api delete-object --bucket prod-assets --key "$key" --version-id "$vid"; done && echo "Restore complete: 10247 files"',
          successOutput: 'Removing delete markers...\n[10,247 delete markers removed]\nRestore complete: 10247 files\n\n✅ All 10,247 files restored to their latest versions.',
          hint: 'Deleting the delete marker (by its version ID) exposes the previous version as current',
          lesson: 'To restore a versioned deletion: delete the DELETE MARKER, not the file. This surfaces the previous version. aws s3api delete-object with the delete marker\'s version-id does this.',
        },
        {
          id: 's3_protect',
          instruction: '3. Verify restore and add bucket policy to deny accidental deletions',
          command: 'aws s3 ls s3://prod-assets --recursive | wc -l && echo "Adding deletion protection policy..." && aws s3api put-bucket-policy --bucket prod-assets --policy file://no-delete-policy.json && echo "Policy applied"',
          successOutput: '10247\nAdding deletion protection policy...\nPolicy applied\n\n✅ All 10,247 files confirmed restored!\n✅ Bucket policy: DENY s3:DeleteObject for all except S3AdminRole.',
          hint: 'wc -l counts restored files. Bucket policy with Deny on DeleteObject prevents future accidents.',
          lesson: 'After recovery: add bucket policy denying DeleteObject for everyone except a designated admin role. Combined with versioning, creates strong safety net. Also enable MFA Delete for ultra-critical buckets.',
        },
      ],
      successMsg: '☁️ All 10,247 files restored in 8 minutes! App back online. Deletion protection policy active.',
      lesson: 'S3 versioning makes deletions reversible via delete marker removal. Always enable versioning + bucket policies on production. MFA Delete for critical data. Recovery: minutes not hours.',
    },
  },

  // ── NEW: Global P1 Incident ────────────────────────────────────
  {
    id: 't7_009', title: { en: 'Global P1 Incident Command', id: 'Komando Insiden P1 Global' },
    category: 'sysadmin', difficulty: 'legendary', areaKey: 'corporateHQ', requiredLevel: 96,
    xpReward: 2200, coinReward: 440, puzzleType: 'sequence', npcAvatar: '🌍', npcName: 'C-Suite Bridge',
    description: { en: 'All global services down. 50,000 users affected. Run the ICS correctly — every decision matters!', id: 'Semua layanan global mati. 50.000 pengguna terdampak. Jalankan ICS dengan benar!' },
    npcDialogue: [
      { npc: 'C-Suite Bridge', avatar: '🌍', msgEn: 'CODE RED. ALL production services down globally — website, app, APIs. 50,000 users affected. CEO is on the call. First action?', msgId: 'CODE RED. SEMUA layanan mati global. 50.000 pengguna terdampak. CEO di telepon. Tindakan pertama?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Declare P1 and stand up ICS NOW: Incident Commander (me), Technical Lead, Communications Lead. CEO stays off the war room — Communications Lead briefs him every 15 minutes.', msgId: 'Deklarasikan P1 dan dirikan ICS SEKARANG: Incident Commander (saya), Technical Lead, Communications Lead. CEO di luar war room — Communications Lead briefing setiap 15 menit.' },
    ],
    sequenceData: {
      task: 'CODE RED: All global services down, 50,000 users impacted. You are Incident Commander. Arrange the correct ICS response in order:',
      steps: [
        { id: 's1', text: 'Declare P1 and assign ICS roles: Incident Commander (single decision authority) + Technical Lead (drives fix) + Communications Lead (manages CEO/stakeholders/status page). No role duplication.' },
        { id: 's2', text: 'Open dedicated incident war room (Slack/Teams bridge). "One microphone" rule — only IC speaks on the bridge. All side conversations go to sub-threads.' },
        { id: 's3', text: 'Technical Lead: rapid triage — what changed in the last 2 hours? (deployments, config changes, cloud provider events?) Post findings every 10 minutes.' },
        { id: 's4', text: 'Communications Lead: update public status page immediately ("Investigating all-services impact") — update every 15 minutes even with "We are continuing to investigate." Silence is worse than uncertainty.' },
        { id: 's5', text: 'IC approves fix → Tech Lead implements → verify recovery → Comms Lead announces resolution → schedule blameless post-mortem within 48 hours. Produce action items, not blame.' },
      ],
      lesson: 'ICS: Incident Commander + Technical Lead + Communications Lead. Structured 15-min updates. Blameless post-mortems find systemic causes. Executives off the war room — they need outcomes, not noise. Practice this — incident response is a skill.',
    },
  },

  // ── NEW: DR Failover Exercise ──────────────────────────────────
  {
    id: 't7_010', title: { en: 'DR Failover Exercise', id: 'Latihan Failover DR' },
    category: 'sysadmin', difficulty: 'legendary', areaKey: 'disasterRecovery', requiredLevel: 98,
    xpReward: 2800, coinReward: 560, puzzleType: 'sequence', npcAvatar: '🏗️', npcName: 'DR Coordinator',
    description: { en: 'Annual DR test: simulate primary DC failure. Complete full service restoration within the 4h RTO.', id: 'Test DR tahunan: simulasikan kegagalan DC primer. Selesaikan pemulihan layanan penuh dalam RTO 4 jam.' },
    npcDialogue: [
      { npc: 'DR Coordinator', avatar: '🏗️', msgEn: 'Annual DR exercise. We\'re simulating catastrophic primary DC failure — hardware destroyed. RTO target: 4 hours. Clock starts now.', msgId: 'Latihan DR tahunan. Mensimulasikan kegagalan DC primer katastrofik — hardware hancur. Target RTO: 4 jam. Jam mulai sekarang.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Starting DR checklist. Step 1: validate DR site readiness and confirm last backup integrity before triggering failover. Documenting all deviations from the runbook as we go.', msgId: 'Memulai checklist DR. Langkah 1: validasi kesiapan DR site dan konfirmasi integritas backup terakhir sebelum memicu failover. Mendokumentasikan semua penyimpangan dari runbook.' },
    ],
    sequenceData: {
      task: 'Annual DR exercise: primary data center is declared destroyed. Execute full failover to DR site within the 4-hour RTO. Arrange the correct failover steps:',
      steps: [
        { id: 's1', text: 'Validate DR site readiness: ping DR servers, confirm replication lag, verify DB replica is within RPO threshold (< 4 hours behind primary)' },
        { id: 's2', text: 'Execute DB failover: promote DR database replica to primary — verify application writes are accepted, check data integrity' },
        { id: 's3', text: 'Start services in dependency order: databases → middleware → application servers → load balancers → reverse proxies (never start app servers before databases)' },
        { id: 's4', text: 'Update DNS to route traffic to DR site (use TTL=60s for fast propagation). Verify SSL certificates are valid at the DR site.' },
        { id: 's5', text: 'Run smoke tests from external locations — confirm all critical services respond. Update status page. Record actual failover time vs 4-hour RTO target.' },
        { id: 's6', text: 'Document all runbook deviations found during exercise → update DR runbook → schedule next test → present RTO/RPO results to management with improvement plan' },
      ],
      lesson: 'DR failover order: validate replica → promote DB → start services in dependency order → switch DNS → smoke test → measure RTO. A DR plan only works if it is tested regularly. Update the runbook after every test. Test annually minimum, quarterly for critical systems.',
    },
  },
  {
    // ── INTERACTIVE: sequence (capacity planning) ──
    id: 't7_011', title: { en: 'IT Capacity Planning', id: 'Perencanaan Kapasitas IT' },
    category: 'sysadmin', difficulty: 'epic', areaKey: 'corporateHQ', requiredLevel: 99,
    xpReward: 600, coinReward: 160, puzzleType: 'sequence', npcAvatar: '📈', npcName: 'CFO Pak Hendra',
    description: { en: 'Company growing 40% next year. Build a 3-year IT capacity roadmap!', id: 'Perusahaan tumbuh 40% tahun depan. Buat roadmap kapasitas IT 3 tahun!' },
    npcDialogue: [
      { npc: 'CFO Pak Hendra', avatar: '📈', msgEn: "The board has approved a 40% business growth target for next year. I need IT to present a capacity plan — what infrastructure do we need to add to support this growth? We cannot have systems fail due to under-capacity.", msgId: 'Dewan direksi telah menyetujui target pertumbuhan bisnis 40% untuk tahun depan. Saya butuh IT untuk menyajikan rencana kapasitas — infrastruktur apa yang perlu kita tambahkan untuk mendukung pertumbuhan ini? Kita tidak bisa membiarkan sistem gagal karena kekurangan kapasitas.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "This requires proper capacity planning — not just buying more servers reactively. We start by establishing current baselines, then apply the growth factor to project future requirements, with additional headroom for peak loads.", msgId: 'Ini memerlukan perencanaan kapasitas yang tepat — bukan hanya membeli lebih banyak server secara reaktif. Kita mulai dengan menetapkan baseline saat ini, kemudian menerapkan faktor pertumbuhan untuk memproyeksikan kebutuhan masa depan, dengan headroom tambahan untuk beban puncak.' },
      { npc: 'CFO Pak Hendra', avatar: '📈', msgEn: "What baseline metrics do we need? I want to show the board a concrete 3-year roadmap with cost estimates, not just vague 'we need more servers' statements.", msgId: 'Metrik baseline apa yang kita butuhkan? Saya ingin menunjukkan kepada dewan roadmap 3 tahun yang konkret dengan estimasi biaya, bukan hanya pernyataan samar \"kita butuh lebih banyak server\".' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "We need CPU utilization averages, storage consumption trends, network bandwidth utilization, and user count growth. With those numbers and the 40% growth projection plus 30% headroom buffer, I can build a precise capacity roadmap.", msgId: 'Kita butuh rata-rata utilisasi CPU, tren konsumsi storage, utilisasi bandwidth jaringan, dan pertumbuhan jumlah pengguna. Dengan angka-angka itu dan proyeksi pertumbuhan 40% plus buffer headroom 30%, saya bisa membangun roadmap kapasitas yang tepat.' },
    ],
    sequenceData: {
      task: 'Build a 3-year IT capacity plan to support 40% business growth. Follow the correct planning process:',
      steps: [
        { id: 'step1', text: 'Collect baseline metrics from monitoring tools: CPU avg utilization per server (target: currently at X%), storage used/total (currently Y% full), network bandwidth peak utilization, current user count (500 users), application response times' },
        { id: 'step2', text: 'Apply growth model: 40% user growth → 700 users next year. Project each resource: if storage is growing 3TB/month now → 4.2TB/month at 40% growth. Add 30% headroom buffer for peaks and safety margin.' },
        { id: 'step3', text: 'Identify first bottlenecks: which resources hit 80% capacity first? (e.g., Storage reaches critical in 8 months, network bandwidth in 18 months, server CPU in 24 months). Prioritize by urgency.' },
        { id: 'step4', text: 'Create 3-year roadmap: Year 1 = storage expansion (add 50TB NAS + cloud backup tier), Year 2 = server refresh + hypervisor upgrade (add 3 new servers, upgrade to vSphere 8), Year 3 = network upgrade (10GbE core switching, SD-WAN)' },
        { id: 'step5', text: 'Build cost estimates with 3 scenarios (optimistic/base/pessimistic), present to CFO with ROI analysis (cost of downtime vs cost of proactive upgrade), get budget approval Q1 before procurement lead times become critical' },
      ],
      lesson: 'Capacity planning formula: current baseline → apply growth rate → add safety headroom (30%) → identify first constraint → prioritize by time-to-critical. Never wait until 95% full. The cost of proactive expansion is always less than the cost of reactive emergency procurement. Present to finance with ROI framing, not just technical specs.',
    },
  },
  {
    // ── INTERACTIVE: quiz (high availability design) ──
    id: 't7_012', title: { en: 'High Availability Design Review', id: 'Review Desain High Availability' },
    category: 'sysadmin', difficulty: 'legendary', areaKey: 'globalDataCenter', requiredLevel: 100,
    xpReward: 800, coinReward: 220, puzzleType: 'quiz', npcAvatar: '🏗️', npcName: 'Enterprise Architect Bot',
    description: { en: 'Design HA architecture for critical ERP system targeting 99.99% uptime!', id: 'Rancang arsitektur HA untuk sistem ERP kritis dengan target uptime 99.99%!' },
    npcDialogue: [
      { npc: 'Enterprise Architect Bot', avatar: '🏗️', msgEn: "ARCHITECTURE REVIEW INITIATED: The company's ERP system (SAP) currently has zero redundancy. A single server hosts the application, database, and file storage. Last year's 8-hour outage cost $400,000 in lost productivity. Design a HA solution.", msgId: 'REVIEW ARSITEKTUR DIMULAI: Sistem ERP perusahaan (SAP) saat ini tidak memiliki redundansi sama sekali. Satu server menghosting aplikasi, database, dan penyimpanan file. Pemadaman 8 jam tahun lalu menelan biaya $400.000 dalam produktivitas yang hilang. Rancang solusi HA.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "A single-server ERP is a massive single point of failure. High Availability means eliminating SPOFs at every tier — web/app tier, database tier, storage tier, and network tier. What uptime target does the business require?", msgId: 'ERP single-server adalah single point of failure yang sangat besar. High Availability berarti menghilangkan SPOF di setiap tier — tier web/app, tier database, tier storage, dan tier jaringan. Target uptime apa yang dibutuhkan bisnis?' },
      { npc: 'Enterprise Architect Bot', avatar: '🏗️', msgEn: "BUSINESS REQUIREMENT: SLA of 99.99% uptime required = maximum 52 minutes of downtime per year. Current baseline: 8 hours downtime last year = 99.91% uptime = far below target. Budget approved: $500,000 for HA infrastructure upgrade.", msgId: 'KEBUTUHAN BISNIS: SLA 99.99% uptime diperlukan = maksimum 52 menit downtime per tahun. Baseline saat ini: 8 jam downtime tahun lalu = 99.91% uptime = jauh di bawah target. Anggaran disetujui: $500.000 untuk upgrade infrastruktur HA.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "With a $500K budget and 99.99% target, we can design a proper N+1 redundant architecture. Let me walk through the key HA concepts you'll need to understand to make the right architecture decisions.", msgId: 'Dengan anggaran $500K dan target 99.99%, kita bisa merancang arsitektur redundan N+1 yang tepat. Biarkan saya jelaskan konsep HA kunci yang perlu kamu pahami untuk membuat keputusan arsitektur yang tepat.' },
    ],
    quizData: {
      questions: [
        {
          q: 'What does "99.99% availability" (four nines) translate to in terms of maximum annual downtime?',
          options: [
            'A. 99 minutes per year',
            'B. 52 minutes per year',
            'C. 8 hours per year',
            'D. 1 hour per month',
          ],
          answer: 1,
          explain: 'Availability nines: 99.9% (three nines) = 8.7 hours/year, 99.99% (four nines) = 52 minutes/year, 99.999% (five nines) = 5.2 minutes/year. Each additional nine is roughly 10x harder to achieve. Four nines is the standard target for critical business systems. Five nines requires fully redundant data centers with no planned maintenance windows.',
        },
        {
          q: 'To achieve HA for the web/application tier of the ERP system, what architecture should be implemented?',
          options: [
            'A. Use the most powerful single server available — more CPU and RAM reduces failure probability',
            'B. Deploy minimum 2 application servers behind a load balancer — if one fails, the load balancer routes all traffic to the healthy server automatically',
            'C. Take hourly snapshots of the application server — restore if it fails',
            'D. Run the application in Docker containers — containers automatically restart when they crash',
          ],
          answer: 1,
          explain: 'HA web/app tier requires: Load Balancer (HAProxy, AWS ALB, F5) + minimum 2 app servers (N+1 redundancy). The load balancer performs health checks every 10-30 seconds. If Server A fails health check, all traffic instantly routes to Server B. Failover time: typically under 30 seconds. Also enables rolling deployments (update servers one at a time without downtime).',
        },
        {
          q: 'What is the key difference between Active-Active and Active-Passive database clustering, and when should you use each?',
          options: [
            'A. Active-Active: both nodes handle requests simultaneously (better performance + HA). Active-Passive: one node is idle standby (simpler, lower cost). Use Active-Active for read-heavy workloads, Active-Passive for write-heavy databases',
            'B. Active-Active and Active-Passive provide identical performance — only the licensing cost differs',
            'C. Active-Active: requires two datacenters. Active-Passive: runs in a single datacenter',
            'D. Active-Passive is always superior because the standby node is always ready to take over instantly',
          ],
          answer: 0,
          explain: 'Active-Active: both nodes serve traffic simultaneously (higher throughput, instant failover, but complex sync). Best for: read-heavy databases, stateless applications. Active-Passive: primary serves all traffic, secondary is warm standby syncing in real-time. Failover takes 15-60 seconds. Best for: write-heavy databases (avoid write conflicts), simpler management. For ERP (write-heavy), Active-Passive with synchronous replication is typically safer.',
        },
      ],
    },
  },
  {
    // ── INTERACTIVE: sequence (cloud cost optimization) ──
    id: 't7_013', title: { en: 'Cloud Cost Optimization', id: 'Optimasi Biaya Cloud' },
    category: 'sysadmin', difficulty: 'epic', areaKey: 'cloudRoom', requiredLevel: 101,
    xpReward: 610, coinReward: 165, puzzleType: 'sequence', npcAvatar: '💰', npcName: 'Finance Director Ibu Sari',
    description: { en: 'AWS bill jumped 60% to $85K this month. Find the waste and cut costs!', id: 'Tagihan AWS naik 60% menjadi $85K bulan ini. Temukan pemborosan dan potong biaya!' },
    npcDialogue: [
      { npc: 'Finance Director Ibu Sari', avatar: '💰', msgEn: "I just received our AWS bill — $85,000 this month versus $53,000 last month. That's a 60% spike! The CEO is furious. I need a detailed analysis of WHY this happened and an action plan to bring costs down within 2 weeks.", msgId: 'Saya baru terima tagihan AWS — $85.000 bulan ini versus $53.000 bulan lalu. Itu lonjakan 60%! CEO marah. Saya butuh analisis terperinci KENAPA ini terjadi dan rencana tindakan untuk menurunkan biaya dalam 2 minggu.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "A 60% AWS cost spike is almost always caused by a combination of: idle resources still being billed, over-provisioned instances, and missing Reserved Instance coverage. Let me dive into Cost Explorer immediately.", msgId: 'Lonjakan biaya AWS 60% hampir selalu disebabkan oleh kombinasi: sumber daya menganggur yang masih ditagih, instance yang over-provisioned, dan cakupan Reserved Instance yang hilang. Biarkan saya masuk ke Cost Explorer segera.' },
      { npc: 'Finance Director Ibu Sari', avatar: '💰', msgEn: "Please find the root cause quickly. Also, can we prevent this from happening again? I don't want to be surprised by another bill spike. I need budget predictability.", msgId: 'Tolong temukan akar masalah dengan cepat. Juga, bisakah kita mencegah ini terjadi lagi? Saya tidak ingin terkejut oleh lonjakan tagihan lagi. Saya butuh prediktabilitas anggaran.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Absolutely — once we fix the immediate waste, we'll set up CloudWatch billing alerts and monthly cost reports. You'll get an email the moment spending hits 80% of budget. No more surprises.", msgId: 'Tentu — setelah kita perbaiki pemborosan segera, kita akan setup CloudWatch billing alerts dan laporan biaya bulanan. Kamu akan mendapat email segera saat pengeluaran mencapai 80% anggaran. Tidak ada kejutan lagi.' },
    ],
    sequenceData: {
      task: 'Investigate and resolve a 60% AWS cost spike ($85K vs expected $53K). Follow the cost optimization process:',
      steps: [
        { id: 'step1', text: 'Open AWS Cost Explorer → filter by Service → identify top 5 cost drivers this month vs last month. Look for services with >50% increase. Drill down to specific EC2 instances, RDS databases, or data transfer charges causing the spike.' },
        { id: 'step2', text: 'Find idle/zombie resources: EC2 instances in "stopped" state still incur EBS charges → terminate or snapshot+delete. Find unattached EBS volumes (pay but unused). Delete unused Elastic IPs ($3.6/month each when unattached). Purge old snapshots >90 days.' },
        { id: 'step3', text: 'Right-size over-provisioned instances: use CloudWatch CPU metrics → identify instances running <20% CPU avg. Downsize: t3.2xlarge (8 vCPU, $0.33/hr) at 5% CPU → t3.medium (2 vCPU, $0.04/hr) = 88% cost reduction for that instance.' },
        { id: 'step4', text: 'Implement Reserved Instances for predictable workloads: identify production servers running 24/7 (always-on). Purchase 1-year Reserved Instance for them: saves 40% vs On-Demand. For variable workloads use Savings Plans (flexible RI). Commit to $X/hour usage.' },
        { id: 'step5', text: 'Set up preventive controls: CloudWatch billing alarm at $60K (80% of $75K budget), AWS Budgets with email + SNS alerts, monthly Cost Optimization report scheduled to management on 1st of each month. Tag ALL resources with CostCenter tag for department-level reporting.' },
      ],
      lesson: 'Cloud cost optimization hierarchy: (1) Eliminate waste first (idle resources, zombie instances) — immediate savings, (2) Right-size running instances — requires testing, (3) Purchase Reserved Instances for stable workloads — commitment required, (4) Set up governance/alerts to prevent recurrence. Expected savings from a typical audit: 30-40% cost reduction.',
    },
  },
  {
    // ── INTERACTIVE: sequence (BCP) ──
    id: 't7_014', title: { en: 'Business Continuity Planning', id: 'Perencanaan Kelangsungan Bisnis' },
    category: 'sysadmin', difficulty: 'legendary', areaKey: 'disasterRecovery', requiredLevel: 102,
    xpReward: 820, coinReward: 230, puzzleType: 'sequence', npcAvatar: '🏢', npcName: 'CEO Pak Budiman',
    description: { en: 'Create a comprehensive Business Continuity Plan after last year\'s flood!', id: 'Buat Business Continuity Plan komprehensif setelah banjir tahun lalu!' },
    npcDialogue: [
      { npc: 'CEO Pak Budiman', avatar: '🏢', msgEn: "Last year's flood destroyed our server room and we were completely down for 3 days. We lost $1.2 million in sales and almost lost 2 major clients. The board is demanding a comprehensive Business Continuity Plan. Where do we start?", msgId: 'Banjir tahun lalu menghancurkan ruang server kami dan kami benar-benar tidak beroperasi selama 3 hari. Kami kehilangan $1,2 juta dalam penjualan dan hampir kehilangan 2 klien besar. Dewan menuntut Business Continuity Plan yang komprehensif. Dari mana kita mulai?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "BCP is a structured program, not just a document. We start with a Business Impact Analysis — identifying which processes are most critical, how long the business can survive without each one, and what the financial impact of downtime is. This analysis drives all technical decisions.", msgId: 'BCP adalah program terstruktur, bukan hanya dokumen. Kita mulai dengan Business Impact Analysis — mengidentifikasi proses mana yang paling kritis, berapa lama bisnis bisa bertahan tanpa masing-masing, dan apa dampak finansial dari downtime. Analisis ini mendorong semua keputusan teknis.' },
      { npc: 'CEO Pak Budiman', avatar: '🏢', msgEn: "What's the difference between BCP and DR? I've heard both terms. Also, who should be involved in creating this plan? It seems like more than just an IT problem.", msgId: 'Apa perbedaan antara BCP dan DR? Saya pernah mendengar kedua istilah. Juga, siapa yang harus terlibat dalam membuat rencana ini? Sepertinya lebih dari sekadar masalah IT.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "BCP covers the entire organization — how ALL business functions continue during a disruption. DR (Disaster Recovery) is specifically the IT component of BCP — how technology systems recover. You're right that it's not just IT — Finance, HR, Operations, Sales all need their own continuity procedures.", msgId: 'BCP mencakup seluruh organisasi — bagaimana SEMUA fungsi bisnis berlanjut selama gangguan. DR (Disaster Recovery) adalah komponen IT khusus dari BCP — bagaimana sistem teknologi pulih. Kamu benar bahwa ini bukan hanya IT — Keuangan, HR, Operasional, Penjualan semua membutuhkan prosedur kelangsungan mereka sendiri.' },
    ],
    sequenceData: {
      task: 'Develop a comprehensive Business Continuity Plan following the correct methodology:',
      steps: [
        { id: 'step1', text: 'Conduct Business Impact Analysis (BIA): interview all department heads, identify critical business processes (payment processing, order fulfillment, customer service, ERP), determine Maximum Tolerable Downtime (MTD) for each, calculate financial impact per hour of downtime' },
        { id: 'step2', text: 'Define RTOs and RPOs for each critical system based on BIA: ERP → RTO 4 hours, RPO 1 hour. Email → RTO 2 hours, RPO 0. Payment system → RTO 30 minutes, RPO 0. File shares → RTO 8 hours, RPO 4 hours. These numbers drive all technical investments.' },
        { id: 'step3', text: 'Identify all Single Points of Failure: primary ISP only (no failover link), single office location, on-premise only backups (flood destroyed them), no remote work capability. Each SPOF needs an identified mitigation strategy.' },
        { id: 'step4', text: 'Design recovery strategies for each SPOF: add secondary ISP (4G failover), contract cloud DR site (AWS/Azure), implement 3-2-1 backup rule (3 copies, 2 media types, 1 offsite/cloud), enable remote work (VPN + cloud apps), document manual workarounds for each critical process' },
        { id: 'step5', text: 'Write BCP document (step-by-step recovery procedures per scenario), train all department heads on their responsibilities, conduct tabletop exercise (simulate flood scenario — walk through every decision), update BCP annually and after any major infrastructure change' },
      ],
      lesson: 'BCP lifecycle: BIA (understand impact) → RTO/RPO definition (set targets) → SPOF identification → strategy design → documentation → training → testing → maintenance. Key: BCP without testing is just a document. Tabletop exercises reveal gaps without real disruption. 3-2-1 backup rule is the minimum standard for any organization.',
    },
  },
  {
    // ── INTERACTIVE: quiz (ITIL) ──
    id: 't7_015', title: { en: 'ITIL Service Management Framework', id: 'Kerangka Manajemen Layanan ITIL' },
    category: 'sysadmin', difficulty: 'epic', areaKey: 'corporateHQ', requiredLevel: 103,
    xpReward: 590, coinReward: 155, puzzleType: 'quiz', npcAvatar: '📚', npcName: 'ITIL Trainer Bot',
    description: { en: 'Company adopting ITIL v4. Master the key concepts to lead the implementation!', id: 'Perusahaan adopsi ITIL v4. Kuasai konsep kunci untuk memimpin implementasi!' },
    npcDialogue: [
      { npc: 'ITIL Trainer Bot', avatar: '📚', msgEn: "The company has decided to adopt ITIL v4 framework to improve IT service management. You have been appointed as the ITIL Implementation Lead. As a refresher: what are the core principles of ITIL v4 that differ from ITIL v3?", msgId: 'Perusahaan telah memutuskan untuk mengadopsi kerangka ITIL v4 untuk meningkatkan manajemen layanan IT. Anda telah ditunjuk sebagai Pemimpin Implementasi ITIL. Sebagai penyegaran: apa prinsip inti ITIL v4 yang berbeda dari ITIL v3?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "ITIL v4 shifted from process-focused to value-focused. The core concept is the Service Value Chain — a flexible operating model for creating, delivering and continually improving services. It integrates with Agile and DevOps, unlike v3's rigid process framework.", msgId: 'ITIL v4 beralih dari berfokus pada proses ke berfokus pada nilai. Konsep inti adalah Service Value Chain — model operasi fleksibel untuk menciptakan, memberikan, dan terus meningkatkan layanan. Ini berintegrasi dengan Agile dan DevOps, tidak seperti kerangka proses kaku v3.' },
      { npc: 'ITIL Trainer Bot', avatar: '📚', msgEn: "Correct. For the implementation, the CIO has asked you to explain the difference between Incident Management and Problem Management to department heads — they keep confusing the two. How do you explain this clearly?", msgId: 'Benar. Untuk implementasi, CIO meminta Anda menjelaskan perbedaan antara Incident Management dan Problem Management kepada kepala departemen — mereka terus mengacaukan keduanya. Bagaimana Anda menjelaskan ini dengan jelas?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Simple analogy: Incident is like a car tire blowing out on the highway — you immediately pull over and fix it to get back driving (restore service). Problem Management is investigating WHY the tire blew — finding the root cause so it never happens again.", msgId: 'Analogi sederhana: Insiden seperti ban mobil yang pecah di jalan tol — Anda segera menepi dan memperbaikinya untuk kembali berkendara (pulihkan layanan). Problem Management adalah menyelidiki KENAPA ban pecah — menemukan akar penyebab sehingga tidak pernah terjadi lagi.' },
    ],
    quizData: {
      questions: [
        {
          q: 'What is the primary focus of ITIL v4 compared to ITIL v3?',
          options: [
            'A. ITIL v4 focuses on reducing IT headcount through automation',
            'B. ITIL v4 focuses on value co-creation with the business through the Service Value Chain, integrating with Agile and DevOps practices',
            'C. ITIL v4 focuses exclusively on cybersecurity and compliance',
            'D. ITIL v4 focuses on documenting all IT processes in extreme detail',
          ],
          answer: 1,
          explain: 'ITIL v4 introduced the Service Value System (SVS) and Service Value Chain — a flexible end-to-end operating model emphasizing value creation for customers and stakeholders. Key shift from v3: from rigid process silos to flexible practices that integrate with Agile, DevOps, and Lean. The 7 Guiding Principles (Focus on Value, Start Where You Are, Progress Iteratively, etc.) are central to v4.',
        },
        {
          q: 'An employee reports they cannot access their email. IT fixes it in 30 minutes. IT then investigates and discovers the root cause is a misconfigured mail server that has caused 47 similar incidents over the past 3 months. What ITIL processes are involved?',
          options: [
            'A. Both are Incident Management — fixing email problems is always handled by Incident Management',
            'B. Fixing the email access = Incident Management (restore service). Investigating the root cause of 47 incidents = Problem Management (find and eliminate root cause)',
            'C. Fixing the email access = Problem Management. Investigating root cause = Change Management',
            'D. Both are handled under Service Request Management',
          ],
          answer: 1,
          explain: 'ITIL definitions: Incident = unplanned interruption to an IT service (Goal: restore normal service ASAP). Problem = cause of one or more incidents (Goal: identify root cause, create known error record, implement permanent fix). In this case: 30-min fix = Incident Management. Finding the mail server misconfiguration causing 47 incidents = Problem Management → Change Management to fix the server properly.',
        },
        {
          q: 'What must a Service Level Agreement (SLA) between IT and a business department include?',
          options: [
            'A. Only the maximum allowed downtime — other details are optional',
            'B. Service availability targets (e.g., 99.9% uptime), incident response and resolution times by priority, support hours, escalation procedures, and measurement/reporting methods',
            'C. The names of all IT staff responsible for the service',
            'D. A complete list of all hardware and software used to deliver the service',
          ],
          answer: 1,
          explain: 'A complete SLA includes: (1) Service description and scope, (2) Availability targets (e.g., 99.9% = max 8.7hr/year downtime), (3) Response SLAs by priority: P1 Critical = 15min response / 4hr resolution, P2 High = 1hr/8hr, P3 Medium = 4hr/24hr, (4) Support hours (24/7 for critical, business hours for normal), (5) Escalation path, (6) Reporting cadence. SLAs without measurement mechanisms are just promises.',
        },
      ],
    },
  },
  {
    // ── INTERACTIVE: sequence (multi-cloud) ──
    id: 't7_016', title: { en: 'Multi-Cloud Architecture', id: 'Arsitektur Multi-Cloud' },
    category: 'networking', difficulty: 'epic', areaKey: 'cloudRoom', requiredLevel: 104,
    xpReward: 620, coinReward: 170, puzzleType: 'sequence', npcAvatar: '☁️', npcName: 'CTO Pak Arman',
    description: { en: 'Design a multi-cloud (AWS + Azure) strategy to avoid vendor lock-in!', id: 'Rancang strategi multi-cloud (AWS + Azure) untuk hindari vendor lock-in!' },
    npcDialogue: [
      { npc: 'CTO Pak Arman', avatar: '☁️', msgEn: "After our AWS region went down for 6 hours last quarter, the board wants a multi-cloud strategy to avoid single cloud vendor dependency. I'm thinking AWS for compute workloads and Azure for Microsoft 365 integration. Does this make strategic sense?", msgId: 'Setelah region AWS kami down selama 6 jam kuartal lalu, dewan menginginkan strategi multi-cloud untuk menghindari ketergantungan pada satu vendor cloud. Saya berpikir AWS untuk beban kerja komputasi dan Azure untuk integrasi Microsoft 365. Apakah ini masuk akal secara strategis?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "That's a sound strategic split. AWS leads in compute/storage/ML services, while Azure's deep Microsoft ecosystem integration (Active Directory, Office 365, Teams) makes it the natural choice for enterprise productivity workloads. The challenge is connecting them securely.", msgId: 'Itu pemisahan strategis yang baik. AWS memimpin dalam layanan komputasi/penyimpanan/ML, sementara integrasi ekosistem Microsoft Azure yang mendalam (Active Directory, Office 365, Teams) menjadikannya pilihan alami untuk beban kerja produktivitas enterprise. Tantangannya adalah menghubungkannya dengan aman.' },
      { npc: 'CTO Pak Arman', avatar: '☁️', msgEn: "What about identity management? Our employees currently use Azure Active Directory for SSO. How do we make this work for AWS resources too? We can't have separate login credentials for each cloud.", msgId: 'Bagaimana dengan manajemen identitas? Karyawan kami saat ini menggunakan Azure Active Directory untuk SSO. Bagaimana kita membuat ini bekerja untuk sumber daya AWS juga? Kita tidak bisa memiliki kredensial login terpisah untuk setiap cloud.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Azure AD becomes the Identity Provider (IdP) for both clouds via SAML/OIDC federation. Employees log in once with their Microsoft account and get access to both AWS Console and Azure Portal through SSO. No separate credentials needed.", msgId: 'Azure AD menjadi Identity Provider (IdP) untuk kedua cloud via federasi SAML/OIDC. Karyawan login sekali dengan akun Microsoft mereka dan mendapat akses ke AWS Console dan Azure Portal melalui SSO. Tidak perlu kredensial terpisah.' },
    ],
    sequenceData: {
      task: 'Design and implement a multi-cloud architecture using AWS (compute) + Azure (identity/M365). Follow the implementation sequence:',
      steps: [
        { id: 'step1', text: 'Categorize workloads by cloud fit: AWS = data analytics (Redshift, EMR), ML/AI workloads (SageMaker), S3 object storage. Azure = Active Directory, Microsoft 365 integration, Windows Server VMs (better licensing deal), DevOps with Azure DevOps.' },
        { id: 'step2', text: 'Design cross-cloud network connectivity: AWS Direct Connect (dedicated fiber) to Azure ExpressRoute (via Exchange Provider) OR simpler IPsec VPN between AWS VGW and Azure VPN Gateway. Choose based on bandwidth needs (VPN = <1Gbps, Direct Connect/ExpressRoute = up to 100Gbps).' },
        { id: 'step3', text: 'Implement unified identity: configure Azure AD as SAML 2.0 Identity Provider for AWS IAM Identity Center. Map Azure AD security groups to AWS Permission Sets. Test: employees login to AWS Console using their Microsoft credentials → Azure AD validates → AWS grants role-based access.' },
        { id: 'step4', text: 'Set up centralized monitoring across both clouds: deploy Datadog or Grafana as unified observability platform. Connect AWS CloudWatch and Azure Monitor as data sources. Create single dashboard showing metrics from both clouds. Configure cross-cloud alerts.' },
        { id: 'step5', text: 'Define data residency and compliance rules: which data can be in AWS (Southeast Asia region), which must stay in Azure (Europe GDPR-sensitive data). Test cross-cloud failover: verify workloads can shift between clouds within RTO. Document runbooks for each failover scenario.' },
      ],
      lesson: 'Multi-cloud strategy: workload placement by cloud strengths, secure connectivity (DirectConnect+ExpressRoute for production), unified identity (Azure AD as IdP via SAML), centralized monitoring, clear data governance rules. Key challenge: data transfer costs between clouds (egress fees) — minimize cross-cloud data movement. Multi-cloud adds complexity — only adopt if the resilience/flexibility benefits justify it.',
    },
  },
  {
    // ── INTERACTIVE: sequence (IT governance) ──
    id: 't7_017', title: { en: 'IT Governance & Technology Roadmap', id: 'Tata Kelola IT & Peta Jalan Teknologi' },
    category: 'sysadmin', difficulty: 'legendary', areaKey: 'corporateHQ', requiredLevel: 105,
    xpReward: 900, coinReward: 260, puzzleType: 'sequence', npcAvatar: '🏆', npcName: 'Board of Directors',
    description: { en: 'Present a 5-year IT strategy and governance framework to the board!', id: 'Presentasikan strategi IT 5 tahun dan kerangka tata kelola ke dewan direksi!' },
    npcDialogue: [
      { npc: 'Board of Directors', avatar: '🏆', msgEn: "The board has allocated time in this quarter's meeting for IT to present a 5-year technology strategy. This is a rare opportunity to secure long-term budget commitments. We expect to see: current IT maturity assessment, strategic initiatives aligned to business goals, and a clear technology roadmap.", msgId: 'Dewan telah mengalokasikan waktu dalam rapat kuartal ini untuk IT mempresentasikan strategi teknologi 5 tahun. Ini adalah kesempatan langka untuk mengamankan komitmen anggaran jangka panjang. Kami mengharapkan: penilaian kematangan IT saat ini, inisiatif strategis yang selaras dengan tujuan bisnis, dan roadmap teknologi yang jelas.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "This is the moment that separates a tactical IT team from a strategic IT function. We'll use the COBIT framework for maturity assessment and structure our initiatives around the company's 3 strategic pillars: operational efficiency, customer experience, and geographic expansion.", msgId: 'Ini adalah momen yang memisahkan tim IT taktis dari fungsi IT strategis. Kita akan menggunakan kerangka COBIT untuk penilaian kematangan dan menyusun inisiatif kita di sekitar 3 pilar strategis perusahaan: efisiensi operasional, pengalaman pelanggan, dan ekspansi geografis.' },
      { npc: 'Board of Directors', avatar: '🏆', msgEn: "We also want to understand IT governance — how are IT decisions made? Who approves major technology investments? Who manages IT risks? Currently IT decisions seem ad-hoc and we've had 3 major incidents this year that caught the board by surprise.", msgId: 'Kami juga ingin memahami tata kelola IT — bagaimana keputusan IT dibuat? Siapa yang menyetujui investasi teknologi besar? Siapa yang mengelola risiko IT? Saat ini keputusan IT tampak ad-hoc dan kami mengalami 3 insiden besar tahun ini yang mengejutkan dewan.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "You've identified the exact gap — lack of IT governance creates exactly these problems. We'll propose an IT Steering Committee with board representation, a Change Advisory Board for technical decisions, and a quarterly IT risk report to the board. Decisions will be structured and transparent.", msgId: 'Anda telah mengidentifikasi celah yang tepat — kurangnya tata kelola IT menciptakan masalah-masalah ini. Kita akan mengusulkan IT Steering Committee dengan representasi dewan, Change Advisory Board untuk keputusan teknis, dan laporan risiko IT kuartalan ke dewan. Keputusan akan terstruktur dan transparan.' },
    ],
    sequenceData: {
      task: 'Develop and present a comprehensive 5-year IT strategy to the board. Follow the correct methodology:',
      steps: [
        { id: 'step1', text: 'Assess current IT maturity using COBIT 2019 framework: rate each domain (Govern, Manage, Build, Deliver) on scale 0-5. Typical finding: most SMEs score 1-2 (ad-hoc). Document specific gaps: no change management process, no formal vendor management, no IT risk register. Present honest baseline — boards respect candor.' },
        { id: 'step2', text: 'Map strategic IT initiatives to business goals: Business Goal "Expand to 3 new cities" → IT Initiative "Cloud-first infrastructure enabling rapid deployment". Business Goal "Reduce operating costs 20%" → IT Initiative "Process automation (RPA) and self-service IT portal". Build 5-7 initiatives with clear business justification — not technology for technology\'s sake.' },
        { id: 'step3', text: 'Build 5-year technology roadmap in quarters: Q1-Q2: Foundation (stabilize current systems, implement monitoring, establish ITIL processes), Q3-Q4: Modernization (cloud migration Phase 1, self-service portal), Year 2: Innovation (AI/ML pilots, advanced analytics), Years 3-5: Transformation (full cloud-native, AI-embedded operations). Show clear progression.' },
        { id: 'step4', text: 'Define IT governance structure: IT Steering Committee (CIO + CFO + COO, meets monthly — approves investments >$50K), Change Advisory Board (IT Manager + key users, meets weekly — approves all production changes), IT Risk Committee (reports to board quarterly). Document RACI matrix for all major IT decisions.' },
        { id: 'step5', text: 'Build business case for top 3 initiatives with 5-year ROI: Initiative 1 cost $500K → saves $200K/year → break-even in 2.5 years → 5yr ROI = 100%. Present risk register (top 5 IT risks with likelihood/impact/mitigation). Define KPIs: uptime %, ticket resolution time, security incidents, user satisfaction score. Request board approval and 5-year budget commitment.' },
      ],
      lesson: 'IT strategy presentation to board: speak business language (ROI, risk, business outcomes) — not technology jargon. Structure: current state (honest assessment) → future state (vision) → gap analysis → roadmap → investment ask. Key: COBIT for governance framework, OKRs for tracking. The CIO who presents IT as a business enabler (not cost center) earns strategic influence. This presentation determines IT\'s role for the next 5 years.',
    },
  },
];
