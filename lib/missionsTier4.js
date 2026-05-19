// TIER 4 MISSIONS — Network Technician (Level 35–50)
// Areas: ispBranch, internetCafe, officeNetwork, networkOpsRoom

export const MISSIONS_TIER4 = [
  {
    // ── INTERACTIVE: terminal (DNS investigation) ──
    id: 't4_001', title: { en: 'DNS Outage Investigation', id: 'Investigasi Gangguan DNS' },
    category: 'networking', difficulty: 'medium', areaKey: 'officeNetwork', requiredLevel: 35,
    xpReward: 450, coinReward: 90, puzzleType: 'terminal', npcAvatar: '😤', npcName: '200 Users',
    description: { en: 'Office can ping IPs but no websites load. Classic DNS failure. Diagnose it!', id: 'Kantor bisa ping IP tapi website tidak bisa dibuka. Kegagalan DNS klasik. Diagnosa!' },
    terminalData: {
      os: 'windows',
      intro: 'Users can\'t open any websites. Ping to IPs works fine. Diagnose and fix the DNS failure.',
      tasks: [
        {
          id: 'task1',
          instruction: 'Confirm DNS is the issue — try resolving a domain name:',
          command: 'nslookup google.com',
          hint: 'Type: nslookup google.com',
          successOutput: `Server:  192.168.1.1\nAddress:  192.168.1.1\n\nDNS request timed out.\n*** Request to 192.168.1.1 timed-out\n\n[!] DNS server at 192.168.1.1 is not responding. Confirmed: DNS failure!`,
          lesson: 'nslookup directly queries the DNS server. Timeout = DNS server is down or unreachable.',
        },
        {
          id: 'task2',
          instruction: 'Set a temporary DNS server to restore internet access:',
          command: 'netsh interface ip set dns "Local Area Connection" static 8.8.8.8',
          hint: 'Type: netsh interface ip set dns "Local Area Connection" static 8.8.8.8',
          successOutput: `[OK] DNS server for "Local Area Connection" set to: 8.8.8.8 (Google Public DNS)\n[✓] Temporary DNS bypass applied.`,
          lesson: 'Pointing clients to a public DNS (8.8.8.8 or 1.1.1.1) bypasses the broken internal DNS and restores browsing.',
        },
        {
          id: 'task3',
          instruction: 'Verify internet access is restored:',
          command: 'nslookup google.com 8.8.8.8',
          hint: 'Type: nslookup google.com 8.8.8.8',
          successOutput: `Server:  dns.google\nAddress:  8.8.8.8\n\nName:    google.com\nAddresses:  142.250.185.78\n\n[✓] DNS resolution working via 8.8.8.8. Users can browse again!`,
          lesson: 'DNS failure = domain names fail but IPs still work. Public DNS is a fast temporary fix.',
        },
      ],
      successMsg: '🌐 Internet restored! Internal DNS being repaired — temporary fix via Google DNS active.',
      lesson: 'DNS failure: use nslookup to confirm. Point to 8.8.8.8 or 1.1.1.1 as temp fix while repairing internal DNS.',
    },
  },
  {
    // ── INTERACTIVE: network (router WAN config) ──
    id: 't4_002', title: { en: 'Configure Router Properly', id: 'Konfigurasi Router dengan Benar' },
    category: 'networking', difficulty: 'medium', areaKey: 'ispBranch', requiredLevel: 36,
    xpReward: 430, coinReward: 85, puzzleType: 'network', npcAvatar: '🏠', npcName: 'New Customer',
    description: { en: 'ISP installed new router but customer has no internet. Fix the WAN connection!', id: 'ISP pasang router baru tapi pelanggan tidak ada internet. Perbaiki koneksi WAN!' },
    puzzleData: {
      nodes: [
        { id: 'internet', type: 'internet', label: 'ISP Network',    emoji: '🌐', x: 50, y: 5  },
        { id: 'router',   type: 'router',   label: 'New Router',     emoji: '📡', x: 50, y: 30 },
        { id: 'pc1',      type: 'pc',       label: 'Living Room PC', emoji: '🖥️', x: 25, y: 70 },
        { id: 'phone',    type: 'pc',       label: 'Smartphone',     emoji: '📱', x: 75, y: 70 },
      ],
      connections: [
        { id: 'cn_isp_router',   from: 'internet', to: 'router', broken: true,  label: 'WAN (PPPoE not configured!)' },
        { id: 'cn_router_pc1',   from: 'router',   to: 'pc1',    broken: false, label: 'LAN' },
        { id: 'cn_router_phone', from: 'router',   to: 'phone',  broken: false, label: 'WiFi' },
      ],
      faultConnection: 'cn_isp_router',
      steps: [
        { id: 1, action: 'inspect',   text: 'Open router admin panel (192.168.1.1) — check WAN status: "Not Connected"' },
        { id: 2, action: 'reconnect', text: 'Click the broken WAN link — enter PPPoE username/password from ISP letter' },
        { id: 3, action: 'pingtest',  text: 'Run ping test — all devices should now have internet access' },
      ],
    },
  },
  {
    // ── INTERACTIVE: sequence (WiFi dead zone) ──
    id: 't4_003', title: { en: 'WiFi Dead Zone Fix', id: 'Perbaiki Area Mati WiFi' },
    category: 'networking', difficulty: 'medium', areaKey: 'officeNetwork', requiredLevel: 37,
    xpReward: 420, coinReward: 80, puzzleType: 'sequence', npcAvatar: '😤', npcName: 'Floor 3 Staff',
    description: { en: 'Floor 3 has no WiFi coverage. Plan and deploy Access Points in the right order!', id: 'Lantai 3 tidak ada jangkauan WiFi. Rencanakan dan pasang Access Point dengan urutan benar!' },
    sequenceData: {
      task: 'Floor 3 is a WiFi dead zone. Arrange the correct steps to eliminate it using Access Points:',
      steps: [
        { id: 'step1', text: 'Run a WiFi survey on Floor 3 — identify dead zones using a WiFi analyzer app' },
        { id: 'step2', text: 'Run ethernet cable from the network switch room to ceiling mounting points on Floor 3' },
        { id: 'step3', text: 'Mount Access Points on the ceiling at optimal positions (every 15–20m apart)' },
        { id: 'step4', text: 'Configure all APs with the SAME SSID, password, and different channels (1, 6, 11) to avoid interference' },
        { id: 'step5', text: 'Walk through Floor 3 with a device — verify seamless roaming and full signal coverage' },
      ],
      lesson: 'Use wired Access Points for full-speed WiFi expansion. Same SSID + different non-overlapping channels = seamless roaming. WiFi extenders halve bandwidth per hop.',
    },
  },
  {
    // ── INTERACTIVE: network (switch port failure) ──
    id: 't4_004', title: { en: 'Switch Port Failure', id: 'Kerusakan Port Switch' },
    category: 'networking', difficulty: 'hard', areaKey: 'networkOpsRoom', requiredLevel: 40,
    xpReward: 600, coinReward: 120, puzzleType: 'network', npcAvatar: '🔴', npcName: 'Network Alert',
    description: { en: '5 PCs suddenly offline — all connected to the same switch. Diagnose and fix!', id: '5 PC tiba-tiba offline — semua terhubung ke switch yang sama. Diagnosa dan perbaiki!' },
    puzzleData: {
      nodes: [
        { id: 'internet', type: 'internet', label: 'Internet',              emoji: '🌐', x: 50, y: 5  },
        { id: 'router',   type: 'router',   label: 'Core Router',           emoji: '📡', x: 50, y: 25 },
        { id: 'sw_main',  type: 'switch',   label: 'Main Switch',           emoji: '🔀', x: 50, y: 47 },
        { id: 'sw_fault', type: 'switch',   label: 'Switch B (port failed)', emoji: '❌', x: 20, y: 68 },
        { id: 'sw_good',  type: 'switch',   label: 'Switch C (OK)',         emoji: '🔀', x: 80, y: 68 },
        { id: 'pcs_down', type: 'pc',       label: 'PCs 1–5 (offline)',     emoji: '💀', x: 20, y: 88 },
        { id: 'pcs_ok',   type: 'pc',       label: 'PCs 6–10 (online)',     emoji: '🖥️', x: 80, y: 88 },
      ],
      connections: [
        { id: 'cn_inet_router',    from: 'internet', to: 'router',   broken: false, label: 'WAN' },
        { id: 'cn_router_swmain',  from: 'router',   to: 'sw_main',  broken: false, label: 'Uplink' },
        { id: 'cn_swmain_swfault', from: 'sw_main',  to: 'sw_fault', broken: true,  label: 'Port 3 FAILED' },
        { id: 'cn_swmain_swgood',  from: 'sw_main',  to: 'sw_good',  broken: false, label: 'Port 4 OK' },
        { id: 'cn_swfault_pcs',    from: 'sw_fault', to: 'pcs_down', broken: true,  label: 'LAN' },
        { id: 'cn_swgood_pcs',     from: 'sw_good',  to: 'pcs_ok',   broken: false, label: 'LAN' },
      ],
      faultConnection: 'cn_swmain_swfault',
      steps: [
        { id: 1, action: 'inspect',   text: 'Identify: all 5 offline PCs share Switch B → uplink port on Main Switch failed' },
        { id: 2, action: 'reconnect', text: 'Move uplink cable from Port 3 → spare Port 7 on Main Switch (click broken link)' },
        { id: 3, action: 'verify',    text: 'Verify all 5 PCs come back online — flag Port 3 for replacement' },
      ],
    },
  },
  {
    // ── INTERACTIVE: terminal (static IP) ──
    id: 't4_005', title: { en: 'Assign Static IP to Server', id: 'Tetapkan IP Statis ke Server' },
    category: 'networking', difficulty: 'medium', areaKey: 'officeNetwork', requiredLevel: 38,
    xpReward: 440, coinReward: 85, puzzleType: 'terminal', npcAvatar: '🖧', npcName: 'IT Manager',
    description: { en: 'File server keeps changing IP, causing connection errors. Set a permanent static IP!', id: 'File server terus ganti IP. Atur IP statis permanen via netsh!' },
    terminalData: {
      os: 'windows',
      intro: 'The file server gets a different IP every reboot via DHCP, breaking shared drive connections. Set a static IP using netsh.',
      tasks: [
        {
          id: 'task1',
          instruction: 'Check current network adapter configuration:',
          command: 'ipconfig /all',
          hint: 'Type: ipconfig /all',
          successOutput: `Ethernet adapter Local Area Connection:\n   DHCP Enabled: Yes\n   IPv4 Address: 192.168.1.47\n   Subnet Mask:  255.255.255.0\n   Default Gateway: 192.168.1.1\n\n[!] DHCP enabled — IP can change on next lease renewal!`,
          lesson: 'DHCP assigns IPs dynamically. Servers need static IPs so clients always know where to find them.',
        },
        {
          id: 'task2',
          instruction: 'Set a static IP outside the DHCP pool (use .50):',
          command: 'netsh interface ip set address "Local Area Connection" static 192.168.1.50 255.255.255.0 192.168.1.1',
          hint: 'Type: netsh interface ip set address "Local Area Connection" static 192.168.1.50 255.255.255.0 192.168.1.1',
          successOutput: `[OK] Static IP configured:\n    IP Address:      192.168.1.50\n    Subnet Mask:     255.255.255.0\n    Default Gateway: 192.168.1.1\n    DHCP:            Disabled`,
          lesson: 'Static IP format: IP address + subnet mask + default gateway. Choose an IP outside the DHCP pool to avoid conflicts.',
        },
        {
          id: 'task3',
          instruction: 'Set DNS and verify the final configuration:',
          command: 'netsh interface ip set dns "Local Area Connection" static 192.168.1.1 && ipconfig',
          hint: 'Type: netsh interface ip set dns "Local Area Connection" static 192.168.1.1 && ipconfig',
          successOutput: `[OK] DNS set to 192.168.1.1\n\nEthernet adapter Local Area Connection:\n   DHCP Enabled: No\n   IPv4 Address: 192.168.1.50\n   Subnet Mask:  255.255.255.0\n   Default Gateway: 192.168.1.1\n\n[✓] Server permanently at 192.168.1.50!`,
          lesson: '4 values for static IP: IP + Subnet mask + Gateway + DNS. Always pick an IP outside the DHCP range.',
        },
      ],
      successMsg: '🖧 File server now permanently at 192.168.1.50. No more broken connections!',
      lesson: 'Servers need static IPs. Configure: IP address + Subnet mask + Default gateway + DNS server via netsh or GUI.',
    },
  },
  {
    // ── INTERACTIVE: terminal (tracert / packet loss) ──
    id: 't4_006', title: { en: 'Packet Loss Investigation', id: 'Investigasi Packet Loss' },
    category: 'networking', difficulty: 'hard', areaKey: 'networkOpsRoom', requiredLevel: 42,
    xpReward: 580, coinReward: 115, puzzleType: 'terminal', npcAvatar: '📡', npcName: 'NOC Team',
    description: { en: 'Video calls dropping — 15% packet loss detected. Use tracert to find the bad hop!', id: 'Video call terputus — 15% packet loss. Gunakan tracert untuk temukan hop bermasalah!' },
    terminalData: {
      os: 'windows',
      intro: 'Video conferencing is dropping packets — choppy audio and frozen video. Find the problematic network hop.',
      tasks: [
        {
          id: 'task1',
          instruction: 'Run tracert to find which network hop has packet loss:',
          command: 'tracert -d 8.8.8.8',
          hint: 'Type: tracert -d 8.8.8.8',
          successOutput: `Tracing route to 8.8.8.8 over 30 hops:\n\n  1    1ms    1ms    1ms   192.168.1.1\n  2    3ms    2ms    3ms   10.0.0.1\n  3    5ms    5ms    4ms   172.16.0.1\n  4    8ms    7ms    8ms   203.0.113.1\n  5  215ms    *    198ms   198.51.100.1  ← ⚠️ PROBLEM HERE\n  6    9ms   10ms    9ms   8.8.4.4\n  7    9ms    9ms    9ms   8.8.8.8\n\n[!] Hop 5 shows massive latency and packet loss (*). This is the culprit.`,
          lesson: 'tracert shows each router hop. High latency or * at a specific hop that clears afterward = that router is the problem.',
        },
        {
          id: 'task2',
          instruction: 'Measure exact packet loss at the problematic hop:',
          command: 'ping -n 100 198.51.100.1',
          hint: 'Type: ping -n 100 198.51.100.1',
          successOutput: `Pinging 198.51.100.1 with 32 bytes of data:\nReply: time=8ms\nRequest timed out.\nReply: time=7ms\nRequest timed out.\n...\nPackets: Sent=100, Received=85, Lost=15 (15% loss)\n\n[!] Confirmed 15% loss at ISP backbone router — escalate to ISP NOC.`,
          lesson: 'Sustained ping with -n 100 gives accurate packet loss. 15% loss at ISP hop = escalate to ISP, not internal issue.',
        },
        {
          id: 'task3',
          instruction: 'Check LAN interface for duplex mismatch (common LAN packet loss cause):',
          command: 'netsh interface show interface',
          hint: 'Type: netsh interface show interface',
          successOutput: `Interface: Local Area Connection\nSpeed: 1.0 Gbps | Duplex: Full | Link: UP\n\n[✓] LAN healthy — no duplex mismatch. Packet loss is ISP-side. Ticket raised to ISP NOC.`,
          lesson: 'LAN packet loss causes: duplex mismatch, faulty cable, overloaded switch. This case is ISP-side — escalate with tracert evidence.',
        },
      ],
      successMsg: '📡 Root cause identified: 15% packet loss at ISP backbone (hop 5). ISP NOC ticket raised. ETA: 2 hours.',
      lesson: 'tracert identifies the problematic hop. Ping confirms percentage. Document with tracert output when escalating to ISP.',
    },
  },
  {
    // ── INTERACTIVE: sequence (network printer setup) ──
    id: 't4_007', title: { en: 'Network Printer Setup', id: 'Setup Printer Jaringan' },
    category: 'networking', difficulty: 'medium', areaKey: 'officeNetwork', requiredLevel: 36,
    xpReward: 400, coinReward: 80, puzzleType: 'sequence', npcAvatar: '🖨️', npcName: 'Accounting Dept',
    description: { en: 'New network printer not auto-discovered by any PC. Add it manually!', id: 'Printer jaringan baru tidak ditemukan otomatis oleh PC. Tambahkan secara manual!' },
    sequenceData: {
      task: 'New HP network printer is not auto-discovered by Windows. Add it manually in the correct order:',
      steps: [
        { id: 'step1', text: 'On the printer: press Report/Menu button to print a Configuration Page showing its IP address' },
        { id: 'step2', text: 'Note the printer IP from config page (e.g., 192.168.1.120) — verify it is on the correct network/VLAN' },
        { id: 'step3', text: 'On PC: Settings → Printers & scanners → Add → "The printer I want isn\'t listed"' },
        { id: 'step4', text: 'Select "Add a printer using TCP/IP address" → Enter 192.168.1.120 → Windows installs driver' },
        { id: 'step5', text: 'Print a test page — if only some PCs can print, check VLAN segmentation (printer and PCs must share a VLAN)' },
      ],
      lesson: 'Network printers: get IP from config page, add by TCP/IP address. If only some PCs print, check VLAN — printer and PCs must be on the same segment.',
    },
  },
  {
    // ── INTERACTIVE: network (ISP outage triage) ──
    id: 't4_008', title: { en: 'Internet Cafe ISP Outage', id: 'Gangguan ISP Internet Cafe' },
    category: 'networking', difficulty: 'medium', areaKey: 'internetCafe', requiredLevel: 38,
    xpReward: 460, coinReward: 90, puzzleType: 'network', npcAvatar: '☕', npcName: 'Cafe Owner',
    description: { en: 'All cafe customers lost internet. Identify: ISP outage or internal problem?', id: 'Semua pelanggan cafe kehilangan internet. Identifikasi: masalah ISP atau internal?' },
    puzzleData: {
      nodes: [
        { id: 'internet', type: 'internet', label: 'ISP / Internet',  emoji: '🌐', x: 50, y: 5  },
        { id: 'modem',    type: 'modem',    label: 'Cable Modem',     emoji: '📡', x: 50, y: 30 },
        { id: 'router',   type: 'router',   label: 'Cafe Router',     emoji: '🔀', x: 50, y: 55 },
        { id: 'pcs',      type: 'pc',       label: 'Gaming PCs (20)', emoji: '🖥️', x: 50, y: 80 },
      ],
      connections: [
        { id: 'cn_isp_modem',    from: 'internet', to: 'modem',  broken: true,  label: 'ISP Line (DOWN ⚠️)' },
        { id: 'cn_modem_router', from: 'modem',    to: 'router', broken: false, label: 'Ethernet' },
        { id: 'cn_router_pcs',   from: 'router',   to: 'pcs',    broken: false, label: 'LAN (OK)' },
      ],
      faultConnection: 'cn_isp_modem',
      steps: [
        { id: 1, action: 'ping_test', text: 'Ping router (1ms OK) → Ping 8.8.8.8 (timeout) → WAN/ISP issue confirmed' },
        { id: 2, action: 'inspect',   text: 'Check modem — WAN/Internet LED is red → ISP signal down' },
        { id: 3, action: 'reconnect', text: 'Call ISP support — confirm area outage. Communicate ETA to customers transparently.' },
      ],
    },
  },

  // ── NEW: VLAN Printer Cannot Connect ─────────────────────────
  {
    id: 't4_009', title: { en: 'VLAN Printer Cannot Connect', id: 'Printer Tidak Bisa Konek VLAN' },
    category: 'networking', difficulty: 'hard', areaKey: 'officeNetwork', requiredLevel: 36,
    xpReward: 520, coinReward: 100, puzzleType: 'sequence', npcAvatar: '🖨️', npcName: 'Pak Heru IT',
    description: { en: 'Users on VLAN 20 cannot print to the network printer on VLAN 10. VLAN routing issue.', id: 'User di VLAN 20 tidak bisa print ke printer jaringan di VLAN 10.' },
    npcDialogue: [
      { npc: 'Pak Heru IT', avatar: '🖨️', msgEn: "Since we separated Finance (VLAN 10) and Operations (VLAN 20), Operations staff can't print. The printer is on VLAN 10.", msgId: 'Sejak kita pisahkan Finance (VLAN 10) dan Operasional (VLAN 20), staf Operasional tidak bisa print. Printernya ada di VLAN 10.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Classic inter-VLAN routing problem. By default VLANs are isolated — traffic between them is blocked unless explicitly routed.", msgId: 'Masalah inter-VLAN routing klasik. Secara default VLAN terisolasi — traffic antar VLAN diblokir kecuali dirutekan secara eksplisit.' },
      { npc: 'Pak Heru IT', avatar: '🖨️', msgEn: "So they're on separate networks and can't see each other? How do we allow only printing?", msgId: 'Jadi mereka di jaringan terpisah dan tidak bisa saling lihat? Bagaimana kita mengizinkan hanya printing?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "We need a Layer 3 switch or router with inter-VLAN routing, plus a firewall rule to allow only port 9100 (print) from VLAN 20 to the printer IP on VLAN 10.", msgId: 'Kita butuh switch Layer 3 atau router dengan inter-VLAN routing, plus firewall rule untuk mengizinkan hanya port 9100 (print) dari VLAN 20 ke IP printer di VLAN 10.' },
    ],
    sequenceData: {
      task: 'Operations (VLAN 20: 192.168.20.x) cannot print to the network printer (VLAN 10: 192.168.10.50). Fix inter-VLAN printing in the correct order:',
      steps: [
        { id: 's1', text: 'Confirm the issue: from VLAN 20 PC, ping 192.168.10.50 → timeout (inter-VLAN blocked)' },
        { id: 's2', text: 'Log into the Layer 3 switch/router → verify inter-VLAN routing is enabled (ip routing)' },
        { id: 's3', text: 'Add a static route or verify SVI (Switch Virtual Interface) for both VLANs exist on the switch' },
        { id: 's4', text: 'Add firewall/ACL rule: allow TCP from 192.168.20.0/24 to 192.168.10.50 port 9100 (RAW printing)' },
        { id: 's5', text: 'Test ping again from VLAN 20 PC to 192.168.10.50 → should succeed now' },
        { id: 's6', text: 'Install printer on VLAN 20 workstation using IP 192.168.10.50 → print test page' },
      ],
      lesson: 'VLANs are isolated by design for security. Inter-VLAN routing requires Layer 3 (router or L3 switch). Use ACLs to allow only specific ports between VLANs — not "allow all". Port 9100 = RAW printing, port 631 = IPP.',
    },
  },

  // ── NEW: DHCP Server Down ─────────────────────────────────────
  {
    id: 't4_010', title: { en: 'DHCP Server Down', id: 'DHCP Server Mati' },
    category: 'networking', difficulty: 'hard', areaKey: 'networkOpsRoom', requiredLevel: 38,
    xpReward: 500, coinReward: 95, puzzleType: 'terminal', npcAvatar: '🚨', npcName: 'Floor Manager',
    description: { en: '50 workstations got 169.254.x.x addresses — DHCP server crashed. Restore service.', id: '50 workstation dapat alamat 169.254.x.x — DHCP server crash. Pulihkan layanan.' },
    npcDialogue: [
      { npc: 'Floor Manager', avatar: '🚨', msgEn: "All computers on floor 3 suddenly can't access anything! They're all showing 169.254.x.x addresses!", msgId: 'Semua komputer di lantai 3 tiba-tiba tidak bisa akses apa-apa! Semuanya menampilkan alamat 169.254.x.x!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "169.254.x.x is APIPA — Automatic Private IP Addressing. It means the PC tried to get an IP from DHCP but failed. The DHCP server is probably down.", msgId: '169.254.x.x adalah APIPA — Automatic Private IP Addressing. Artinya PC mencoba mendapat IP dari DHCP tapi gagal. Server DHCP kemungkinan mati.' },
      { npc: 'Floor Manager', avatar: '🚨', msgEn: "How many people are affected? I need to tell management!", msgId: 'Berapa banyak orang yang terdampak? Saya perlu memberi tahu manajemen!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "All 50 PCs on VLAN 30. I'm checking the DHCP server now. ETA 10-15 minutes to restore.", msgId: '50 PC di VLAN 30. Saya sedang cek server DHCP sekarang. ETA 10-15 menit untuk memulihkan.' },
    ],
    terminalData: {
      os: 'windows',
      intro: '🚨 DHCP OUTAGE — ALL FLOOR 3 PCs GETTING APIPA (169.254.x.x)\nAffected: 50 workstations | VLAN 30 | DHCP Server: SRV-DHCP01\nYour task: Diagnose and restore the DHCP service',
      tasks: [
        {
          id: 'dhcp_check',
          instruction: '1. Check current DHCP service status on the DHCP server',
          command: 'Get-Service -Name DHCPServer | Select Name,Status,StartType',
          successOutput: 'Name        Status   StartType\n----        ------   ---------\nDHCPServer  Stopped  Automatic\n\n⚠️  DHCP Server service is STOPPED! This caused the APIPA addresses.',
          hint: 'Get-Service shows Windows services. DHCPServer is the service name for the DHCP role.',
          lesson: 'APIPA (169.254.x.x) always means DHCP failed. First check: is the DHCP service running? Get-Service -Name DHCPServer reveals the answer instantly.',
        },
        {
          id: 'dhcp_start',
          instruction: '2. Start the DHCP Server service',
          command: 'Start-Service -Name DHCPServer',
          successOutput: '✅ DHCPServer service started successfully.\n\nVerifying... Status: Running\nDHCP Server is now listening on port 67/UDP.',
          hint: 'Start-Service starts a stopped Windows service',
          lesson: 'Start-Service restarts a stopped service. For DHCP, this immediately makes it available to clients on the network.',
        },
        {
          id: 'dhcp_scope',
          instruction: '3. Verify the DHCP scope is active and has available IPs',
          command: 'Get-DhcpServerv4Scope | Select ScopeId,Name,State,StartRange,EndRange,FreeAddresses',
          successOutput: 'ScopeId       Name        State  StartRange     EndRange       FreeAddresses\n-------       ----        -----  ----------     --------       -------------\n192.168.30.0  VLAN30-Corp Active 192.168.30.10  192.168.30.200 145\n\n✅ Scope active. 145 IPs available. DHCP ready to serve.',
          hint: 'Get-DhcpServerv4Scope shows all DHCP scopes and their status',
          lesson: 'Always verify the scope is Active and has FreeAddresses > 0. A full scope (0 free IPs) also causes APIPA even if the service is running.',
        },
        {
          id: 'dhcp_renew',
          instruction: '4. Force IP renewal on affected workstations (run on a client PC)',
          command: 'ipconfig /release && ipconfig /renew',
          successOutput: 'Windows IP Configuration\nReleasing interface "Ethernet"... done.\n\nWindows IP Configuration\nRenewing interface "Ethernet"...\n\nEthernet adapter:\n   IPv4 Address: 192.168.30.47\n   Subnet Mask:  255.255.255.0\n   Default Gateway: 192.168.30.1\n   DHCP Server: 192.168.30.254\n\n✅ Valid IP obtained! DHCP working correctly.',
          hint: 'ipconfig /release drops the IP, /renew requests a new one from DHCP',
          lesson: 'After DHCP is restored, clients must run ipconfig /renew to get a new IP. You can push this via Group Policy or run it via remote PowerShell: Invoke-Command -ComputerName PC01 -ScriptBlock { ipconfig /renew }',
        },
      ],
      successMsg: '✅ DHCP restored! All 50 workstations getting valid IPs. Floor 3 is back online.',
      lesson: 'DHCP outage = APIPA addresses = no internet. Fix: Check DHCP service → Start if stopped → Verify scope has free IPs → Force /renew on clients. Set DHCP service to Automatic + configure DHCP failover for redundancy.',
    },
  },

  // ── NEW: Office WiFi Congestion ───────────────────────────────
  {
    id: 't4_011', title: { en: 'Office WiFi Congestion', id: 'Kemacetan WiFi Kantor' },
    category: 'networking', difficulty: 'medium', areaKey: 'officeNetwork', requiredLevel: 40,
    xpReward: 440, coinReward: 85, puzzleType: 'sequence', npcAvatar: '📡', npcName: 'Pak Rudi',
    description: { en: 'Office WiFi is slow — 60 devices fighting for the same channel. Fix AP placement and channel overlap.', id: 'WiFi kantor lambat — 60 perangkat bersaing di channel yang sama.' },
    npcDialogue: [
      { npc: 'Pak Rudi', avatar: '📡', msgEn: "The WiFi in our office is unbearable! Especially during morning hours when everyone arrives. Speed drops to almost nothing.", msgId: 'WiFi di kantor kita tidak tertahankan! Terutama saat pagi hari ketika semua orang tiba. Kecepatan turun hingga hampir nol.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "WiFi congestion! How many access points do you have, and how many users are connecting simultaneously?", msgId: 'Kemacetan WiFi! Berapa banyak access point yang Anda miliki, dan berapa banyak pengguna yang terhubung secara bersamaan?' },
      { npc: 'Pak Rudi', avatar: '📡', msgEn: "We have 3 APs for 60 users. They're all set to Channel 6 — I read that's the best channel.", msgId: 'Kami punya 3 AP untuk 60 pengguna. Semuanya diset ke Channel 6 — saya baca itu channel terbaik.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "That's the problem! All 3 APs on the same channel causes massive interference. For 2.4GHz, use channels 1, 6, 11 — they're non-overlapping.", msgId: 'Itu masalahnya! 3 AP di channel yang sama menyebabkan interferensi besar. Untuk 2.4GHz, gunakan channel 1, 6, 11 — ketiganya tidak tumpang tindih.' },
    ],
    sequenceData: {
      task: 'Fix WiFi congestion in a 3-floor office with 60 users and 3 APs all set to Channel 6. Put the steps in the correct order:',
      steps: [
        { id: 's1', text: 'Run a WiFi analyzer (e.g., inSSIDer or Acrylic) to see all nearby SSIDs and their channels' },
        { id: 's2', text: 'Identify channel overlap: all 3 company APs on Channel 6 = self-interference' },
        { id: 's3', text: 'Reassign AP channels: AP1 → Channel 1, AP2 → Channel 6, AP3 → Channel 11 (non-overlapping 2.4GHz channels)' },
        { id: 's4', text: 'For 5GHz radios: enable and use channels 36, 40, 44 (wider, less congested, faster)' },
        { id: 's5', text: 'Adjust TX power: reduce from 100% to 50-70% to reduce overlap between APs (cells should not heavily overlap)' },
        { id: 's6', text: 'Enable band steering so 5GHz-capable devices prefer the 5GHz band automatically' },
      ],
      lesson: '2.4GHz only has 3 non-overlapping channels: 1, 6, 11. Putting multiple APs on the same channel causes them to compete. 5GHz has more channels and less congestion — always enable it. Reduce TX power so APs don\'t overlap coverage areas excessively.',
    },
  },
];

