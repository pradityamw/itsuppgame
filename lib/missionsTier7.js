// TIER 7 MISSIONS — Senior Engineer (Level 90–100)
// Areas: globalDataCenter, cloudRoom, corporateHQ, disasterRecovery

export const MISSIONS_TIER7 = [
  {
    // ── INTERACTIVE: sequence (global outage ICS) ──
    id: 't7_001', title: { en: 'Global Outage Response', id: 'Respons Pemadaman Global' },
    category: 'sysadmin', difficulty: 'epic', areaKey: 'globalDataCenter', requiredLevel: 90,
    xpReward: 1500, coinReward: 300, puzzleType: 'sequence', npcAvatar: '🌍', npcName: 'Global NOC',
    description: { en: 'Company services down worldwide — 10,000 users affected. Run the incident response correctly!', id: 'Layanan perusahaan mati di seluruh dunia — 10.000 pengguna terdampak. Jalankan respons insiden dengan benar!' },
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
];
