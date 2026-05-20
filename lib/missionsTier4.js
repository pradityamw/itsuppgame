// TIER 4 MISSIONS — Network Technician (Level 35–50)
// Areas: ispBranch, internetCafe, officeNetwork, networkOpsRoom

export const MISSIONS_TIER4 = [
  {
    // ── INTERACTIVE: terminal (DNS investigation) ──
    id: 't4_001', title: { en: 'DNS Outage Investigation', id: 'Investigasi Gangguan DNS' },
    category: 'networking', difficulty: 'medium', areaKey: 'officeNetwork', requiredLevel: 35,
    xpReward: 450, coinReward: 90, puzzleType: 'terminal', npcAvatar: '😤', npcName: '200 Users',
    description: { en: 'Office can ping IPs but no websites load. Classic DNS failure. Diagnose it!', id: 'Kantor bisa ping IP tapi website tidak bisa dibuka. Kegagalan DNS klasik. Diagnosa!' },
    npcDialogue: [
      { npc: '200 Users', avatar: '😤', msgEn: 'HELP! None of us can open any website! Google, Outlook, Teams — all broken! But the network light is green!', msgId: 'TOLONG! Kami semua tidak bisa buka website apapun! Google, Outlook, Teams — semua rusak! Tapi lampu jaringan hijau!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'If network light is green but websites fail, the culprit is almost always DNS. Let me confirm by running nslookup.', msgId: 'Jika lampu jaringan hijau tapi website gagal, penyebabnya hampir selalu DNS. Biarkan saya konfirmasi dengan menjalankan nslookup.' },
      { npc: '200 Users', avatar: '😤', msgEn: 'What is DNS? Why does it matter? We just want our internet back NOW!', msgId: 'Apa itu DNS? Mengapa penting? Kami hanya ingin internet kembali SEKARANG!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'DNS is like the internet phone book — translates website names to IPs. Without it, browsers cannot find websites even if your connection is fine. I will switch you to Google DNS 8.8.8.8 as a quick fix!', msgId: 'DNS seperti buku telepon internet — menerjemahkan nama website ke IP. Tanpanya, browser tidak bisa menemukan website meskipun koneksi Anda baik. Saya akan ganti ke DNS Google 8.8.8.8 sebagai perbaikan cepat!' },
    ],
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
    npcDialogue: [
      { npc: 'New Customer', avatar: '🏠', msgEn: 'The ISP technician just left after installing a new router but I still have NO internet! I pay for fiber but I cannot even load Google!', msgId: 'Teknisi ISP baru saja pergi setelah memasang router baru tapi saya masih TIDAK ADA internet! Saya bayar fiber tapi tidak bisa buka Google!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'The router itself is fine but the WAN side has not been configured. The technician probably forgot to set the PPPoE credentials — that is your ISP username and password.', msgId: 'Router sendiri baik-baik saja tapi sisi WAN belum dikonfigurasi. Teknisi mungkin lupa mengatur kredensial PPPoE — itu username dan password ISP Anda.' },
      { npc: 'New Customer', avatar: '🏠', msgEn: 'I have a paper from the ISP with a username and password. Is that what you need?', msgId: 'Saya punya kertas dari ISP dengan username dan password. Apakah itu yang Anda butuhkan?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Yes! That is exactly it — those PPPoE credentials go into the router WAN settings. Once entered, the WAN link will go green and internet will flow to all your devices!', msgId: 'Ya! Itulah yang kita butuhkan — kredensial PPPoE itu masuk ke pengaturan WAN router. Setelah dimasukkan, link WAN akan hijau dan internet akan mengalir ke semua perangkat Anda!' },
    ],
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
    npcDialogue: [
      { npc: 'Floor 3 Staff', avatar: '😤', msgEn: 'We cannot work! Every meeting we have to go to Floor 1 just to join a video call. Floor 3 has zero WiFi signal — even standing next to the window!', msgId: 'Kami tidak bisa bekerja! Setiap rapat kami harus ke Lantai 1 hanya untuk bergabung video call. Lantai 3 tidak ada sinyal WiFi — bahkan berdiri di dekat jendela!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'That is a classic dead zone problem. The router on Floor 1 signal cannot penetrate the concrete floor. We need to run ethernet cable up and install proper Access Points on Floor 3.', msgId: 'Itu masalah zona mati klasik. Sinyal router di Lantai 1 tidak bisa menembus lantai beton. Kita perlu menjalankan kabel ethernet ke atas dan memasang Access Point yang tepat di Lantai 3.' },
      { npc: 'Floor 3 Staff', avatar: '😤', msgEn: 'Can you not just put a WiFi extender up here? That is cheaper right?', msgId: 'Apakah Anda tidak bisa hanya meletakkan WiFi extender di sini? Itu lebih murah kan?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Extenders halve your speed at every hop — 1Gbps becomes 500Mbps then 250Mbps. A proper wired Access Point gives you full speed everywhere. For a business, we do it right the first time!', msgId: 'Extender membagi kecepatan Anda di setiap hop — 1Gbps menjadi 500Mbps lalu 250Mbps. Access Point berkabel yang tepat memberi Anda kecepatan penuh di mana saja. Untuk bisnis, kita lakukan dengan benar dari awal!' },
    ],
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
    npcDialogue: [
      { npc: 'Network Alert', avatar: '🔴', msgEn: 'CRITICAL ALERT: 5 workstations on Floor 2 suddenly went offline! Accounting team cannot access anything — payroll processing is due in 2 hours!', msgId: 'ALERT KRITIS: 5 workstation di Lantai 2 tiba-tiba offline! Tim akuntansi tidak bisa akses apapun — pemrosesan penggajian jatuh tempo dalam 2 jam!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'All 5 PCs offline at exactly the same time — that is not coincidence. They must all share a common failure point: the same switch or uplink cable. Checking the network diagram now.', msgId: '5 PC semua offline pada waktu yang sama — itu bukan kebetulan. Mereka pasti berbagi titik kegagalan yang sama: switch yang sama atau kabel uplink. Memeriksa diagram jaringan sekarang.' },
      { npc: 'Network Alert', avatar: '🔴', msgEn: 'PCs 1-5 all connect to Switch B according to the diagram. Switch C and its PCs are fine.', msgId: 'PC 1-5 semua terhubung ke Switch B menurut diagram. Switch C dan PC-nya baik-baik saja.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'The uplink port from Main Switch to Switch B has failed. I can move the cable to a spare port in under 5 minutes — all 5 PCs will come back online immediately without touching anything on their end!', msgId: 'Port uplink dari Main Switch ke Switch B telah gagal. Saya bisa memindahkan kabel ke port cadangan dalam 5 menit — semua 5 PC akan kembali online segera tanpa menyentuh apapun di sisi mereka!' },
    ],
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
    npcDialogue: [
      { npc: 'IT Manager', avatar: '🖧', msgEn: 'Every Monday morning the mapped drives on half the office PCs stop working. The file server IP keeps changing after the weekend reboot — it is getting out of control!', msgId: 'Setiap Senin pagi drive yang dipetakan di setengah PC kantor berhenti berfungsi. IP file server terus berubah setelah reboot akhir pekan — ini semakin tidak terkendali!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'The file server is getting a new IP from DHCP every time it reboots. All the drive mappings use the old IP so they break. The fix is simple: assign a permanent static IP outside the DHCP range.', msgId: 'File server mendapat IP baru dari DHCP setiap kali reboot. Semua pemetaan drive menggunakan IP lama sehingga rusak. Perbaikannya sederhana: tetapkan IP statis permanen di luar rentang DHCP.' },
      { npc: 'IT Manager', avatar: '🖧', msgEn: 'Will setting a static IP affect anything else on the network? I do not want to break something while fixing something.', msgId: 'Apakah mengatur IP statis akan mempengaruhi hal lain di jaringan? Saya tidak mau merusak sesuatu sambil memperbaiki sesuatu.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'No risk at all if we pick an IP outside the DHCP pool — say 192.168.1.50. DHCP hands out .100 to .200, so .50 is free. After this, the file server address never changes again!', msgId: 'Tidak ada risiko sama sekali jika kita pilih IP di luar pool DHCP — katakanlah 192.168.1.50. DHCP memberikan .100 hingga .200, jadi .50 bebas. Setelah ini, alamat file server tidak pernah berubah lagi!' },
    ],
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
    npcDialogue: [
      { npc: 'NOC Team', avatar: '📡', msgEn: 'We are getting flooded with complaints — all video calls are choppy and keep dropping. Our monitoring shows 15% packet loss on outbound traffic. The CEO had a board call cut off three times today!', msgId: 'Kami dibanjiri keluhan — semua video call tersendat-sendat dan terus terputus. Monitoring kami menunjukkan 15% packet loss pada lalu lintas keluar. CEO tiga kali terputus dalam rapat dewan hari ini!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: '15% packet loss on video calls is catastrophic — you need near 0% for smooth video. The trick is figuring out WHERE in the network path the loss is happening. tracert will show us every hop.', msgId: '15% packet loss pada video call sangat buruk — Anda butuh mendekati 0% untuk video yang mulus. Triknya adalah mencari tahu DI MANA dalam jalur jaringan kehilangan terjadi. tracert akan menunjukkan setiap hop.' },
      { npc: 'NOC Team', avatar: '📡', msgEn: 'Internal users on wired connection also affected, not just WiFi. Could it be our ISP?', msgId: 'Pengguna internal pada koneksi kabel juga terpengaruh, bukan hanya WiFi. Bisa jadi ISP kami?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Very possible. If loss starts at a specific hop outside our network and clears after — that is the ISP backbone. tracert will pinpoint it exactly, then we escalate to ISP with the evidence.', msgId: 'Sangat mungkin. Jika kehilangan dimulai pada hop tertentu di luar jaringan kita dan bersih setelah itu — itu adalah backbone ISP. tracert akan menetapkannya dengan tepat, lalu kita eskalasi ke ISP dengan buktinya.' },
    ],
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
    npcDialogue: [
      { npc: 'Accounting Dept', avatar: '🖨️', msgEn: 'IT installed a brand new HP network printer in the office but none of our PCs can see it! We tried Add Printer but it just says no printers found. We have 20 invoices to print for a client meeting in an hour!', msgId: 'IT memasang printer jaringan HP baru di kantor tapi tidak ada PC kami yang bisa melihatnya! Kami coba Add Printer tapi hanya bilang tidak ada printer ditemukan. Kami punya 20 invoice untuk dicetak untuk rapat klien dalam satu jam!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Network printers rarely auto-discover reliably on corporate networks. The right way is to add it manually by its IP address. First, let me print a configuration page from the printer to get its IP.', msgId: 'Printer jaringan jarang ditemukan otomatis dengan andal di jaringan perusahaan. Cara yang benar adalah menambahkannya secara manual menggunakan alamat IP-nya. Pertama, biarkan saya cetak halaman konfigurasi dari printer untuk mendapatkan IP-nya.' },
      { npc: 'Accounting Dept', avatar: '🖨️', msgEn: 'Can you set it up so all 15 computers in our department can print to it? Not just mine?', msgId: 'Bisakah Anda mengaturnya agar semua 15 komputer di departemen kami bisa mencetak ke sana? Bukan hanya milik saya?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Absolutely — once I have the IP, I can deploy it to all 15 PCs via Group Policy. Everyone will see it in their printer list automatically within 15 minutes. Give me the printer config page and I will handle the rest!', msgId: 'Tentu saja — setelah saya punya IP, saya bisa menyebarkannya ke semua 15 PC melalui Group Policy. Semua orang akan melihatnya di daftar printer mereka secara otomatis dalam 15 menit. Berikan saya halaman konfigurasi printer dan saya akan menangani sisanya!' },
    ],
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
    npcDialogue: [
      { npc: 'Cafe Owner', avatar: '☕', msgEn: 'All my gaming customers are complaining! The internet suddenly died 30 minutes ago. All 20 PCs have no connection — people are demanding refunds! I am losing money every minute!', msgId: 'Semua pelanggan gaming saya mengeluh! Internet tiba-tiba mati 30 menit yang lalu. Semua 20 PC tidak ada koneksi — orang-orang menuntut pengembalian uang! Saya kehilangan uang setiap menit!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'When ALL computers go down at exactly the same time, it is almost never a device problem — it is the internet connection itself. Let me check the modem and router first before touching anything else.', msgId: 'Ketika SEMUA komputer mati pada waktu yang sama, hampir tidak pernah masalah perangkat — itu koneksi internet itu sendiri. Biarkan saya periksa modem dan router terlebih dahulu sebelum menyentuh hal lain.' },
      { npc: 'Cafe Owner', avatar: '☕', msgEn: 'I restarted the router already — three times! That did not help. The modem WAN light is red.', msgId: 'Saya sudah restart router — tiga kali! Itu tidak membantu. Lampu WAN modem berwarna merah.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'A red WAN light on the modem confirms it is an ISP outage — not your equipment. No amount of router reboots will fix an ISP problem. I will call the ISP now and get you an estimated repair time so you can inform your customers.', msgId: 'Lampu WAN merah pada modem mengkonfirmasi ini adalah gangguan ISP — bukan peralatan Anda. Tidak ada jumlah reboot router yang akan memperbaiki masalah ISP. Saya akan hubungi ISP sekarang dan mendapatkan waktu perbaikan estimasi agar Anda bisa memberi tahu pelanggan.' },
    ],
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

  // ── NEW: VLAN Network Segmentation ───────────────────────────
  {
    id: 't4_012', title: { en: 'VLAN Network Segmentation', id: 'Segmentasi Jaringan VLAN' },
    category: 'networking', difficulty: 'hard', areaKey: 'officeNetwork', requiredLevel: 42,
    xpReward: 500, coinReward: 100, puzzleType: 'quiz', npcAvatar: '👨‍💼', npcName: 'Pak Irfan',
    description: { en: 'Separate Staff and Guest WiFi so guests cannot access internal servers. Plan the VLAN setup!', id: 'Pisahkan WiFi Staff dan Guest agar tamu tidak bisa akses server internal. Rencanakan setup VLAN!' },
    npcDialogue: [
      { npc: 'Pak Irfan', avatar: '👨‍💼', msgEn: "We just found out our WiFi guests can access our internal file server! Anyone who connects to our guest WiFi can browse our company files!", msgId: 'Kami baru tahu tamu WiFi kami bisa akses server file internal! Siapa saja yang konek ke WiFi tamu bisa browse file perusahaan kami!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "That's a serious security issue! We need to put Guest WiFi on a separate VLAN — completely isolated from the internal network. VLAN = Virtual LAN, logical network separation.", msgId: 'Itu masalah keamanan serius! Kita perlu menempatkan WiFi Tamu di VLAN terpisah — benar-benar terisolasi dari jaringan internal. VLAN = Virtual LAN, pemisahan jaringan logis.' },
      { npc: 'Pak Irfan', avatar: '👨‍💼', msgEn: "But we only have one physical switch and router. Do we need to buy more hardware?", msgId: 'Tapi kita hanya punya satu switch dan router fisik. Apakah kita perlu beli lebih banyak hardware?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "No! That's the beauty of VLANs. One managed switch can host multiple isolated logical networks. Staff on VLAN 10, Guests on VLAN 20 — they can't see each other.", msgId: 'Tidak! Itulah keindahan VLAN. Satu managed switch bisa hosting beberapa jaringan logis yang terisolasi. Staff di VLAN 10, Tamu di VLAN 20 — mereka tidak bisa saling melihat.' },
    ],
    quiz: [
      { q: 'What is a VLAN (Virtual Local Area Network)?', options: ['A physical cable type connecting two buildings', 'Logically separating a network into isolated segments on the same physical switch infrastructure', 'A wireless protocol for long-range WiFi', 'A type of software firewall'], correct: 1, explanation: 'VLAN creates logical isolation using the same physical switch. VLAN 10 = Staff (192.168.10.x), VLAN 20 = Guest (192.168.20.x). Devices on different VLANs cannot communicate without explicit inter-VLAN routing.' },
      { q: 'Why is putting Guest WiFi on a separate VLAN important?', options: ['To give guests faster internet speed automatically', 'To prevent guests from accessing internal servers, file shares, and sensitive company resources', 'VLANs always improve WiFi speeds', 'Guests need their own physical switches for performance'], correct: 1, explanation: 'Guest VLAN isolation = guests get internet access but CANNOT reach internal servers, NAS drives, printers on internal VLANs, or management interfaces. Critical security practice for any business with guest WiFi.' },
      { q: 'What is a "trunk port" on a managed switch?', options: ['The main power input port', 'A port that carries traffic from MULTIPLE VLANs using 802.1Q tagging between switches and routers', 'A port that is broken and needs replacement', 'The uplink port to the internet modem'], correct: 1, explanation: '802.1Q trunk ports carry tagged frames for multiple VLANs. Access ports carry untagged frames for a single VLAN to end devices (PCs, phones). Trunk links: switch-to-switch and switch-to-router connections.' },
      { q: 'After configuring VLANs, how do you verify the isolation is working correctly?', options: ['Ask the CEO if it feels secure', 'From a Guest VLAN device: ping the internal server IP — should TIMEOUT; ping 8.8.8.8 — should SUCCEED', 'Turn off all switches and turn them back on', 'Change all WiFi passwords'], correct: 1, explanation: 'VLAN isolation test: Guest pings internal server = timeout (blocked — correct). Guest pings 8.8.8.8 = success (internet works). Both results together confirm correct VLAN isolation with internet access.' },
    ],
  },

  // ── NEW: WiFi Channel Optimization ───────────────────────────
  {
    id: 't4_013', title: { en: 'WiFi Channel Optimization', id: 'Optimasi Channel WiFi' },
    category: 'networking', difficulty: 'medium', areaKey: 'officeNetwork', requiredLevel: 44,
    xpReward: 420, coinReward: 84, puzzleType: 'sequence', npcAvatar: '🧑‍💼', npcName: 'Manager Dani',
    description: { en: 'Office WiFi only hits 50Mbps despite 1Gbps ISP. All APs are on the same channel!', id: 'WiFi kantor hanya 50Mbps padahal ISP 1Gbps. Semua AP di channel yang sama!' },
    npcDialogue: [
      { npc: 'Manager Dani', avatar: '🧑‍💼', msgEn: "We upgraded to 1Gbps fiber internet last month but our WiFi still only shows 50Mbps on speedtest. What's wrong?", msgId: 'Kita upgrade ke fiber 1Gbps bulan lalu tapi WiFi masih hanya 50Mbps di speedtest. Ada apa?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Let me check your AP configuration... All 4 access points are set to Channel 6! That means they're all competing with each other — causing massive interference.", msgId: 'Biarkan saya cek konfigurasi AP... Semua 4 access point diset ke Channel 6! Itu berarti mereka semua bersaing satu sama lain — menyebabkan interferensi besar.' },
      { npc: 'Manager Dani', avatar: '🧑‍💼', msgEn: "But the manual said Channel 6 is the best channel for 2.4GHz!", msgId: 'Tapi manualnya bilang Channel 6 adalah channel terbaik untuk 2.4GHz!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Channel 6 IS good for ONE AP. For multiple APs, you need different non-overlapping channels: 1, 6, and 11. Plus we should enable 5GHz — it has way less congestion.", msgId: 'Channel 6 BAGUS untuk SATU AP. Untuk beberapa AP, kamu perlu channel yang berbeda dan tidak tumpang tindih: 1, 6, dan 11. Plus kita harus aktifkan 5GHz — jauh lebih sedikit kemacetan.' },
    ],
    sequenceData: {
      task: 'Office WiFi is slow due to channel interference from 4 APs all on Channel 6. Optimize in the correct order:',
      steps: [
        { id: 's1', text: 'Install WiFi Analyzer app (Android) or use inSSIDer — scan to see ALL nearby WiFi channels and their signal strength' },
        { id: 's2', text: 'Identify channel congestion: note which channels neighbors use heavily — avoid those' },
        { id: 's3', text: 'Log into each AP admin panel — assign non-overlapping 2.4GHz channels: AP1→Ch1, AP2→Ch6, AP3→Ch11, AP4→Ch1 (cycle)' },
        { id: 's4', text: 'Enable 5GHz radio on all APs — assign channels: AP1→Ch36, AP2→Ch40, AP3→Ch44, AP4→Ch48' },
        { id: 's5', text: 'Enable Band Steering so 5GHz-capable devices automatically prefer the faster 5GHz band' },
        { id: 's6', text: 'Run speedtest again from multiple locations — verify 5GHz clients achieve 200Mbps+ now' },
      ],
      lesson: '2.4GHz: only channels 1, 6, 11 are non-overlapping — use these exclusively for multi-AP environments. 5GHz: 24+ non-overlapping channels, less congested, faster for short distances. Band steering automatically moves capable devices to 5GHz.',
    },
  },

  // ── NEW: Network Documentation ───────────────────────────────
  {
    id: 't4_014', title: { en: 'Network Documentation & IP Mapping', id: 'Dokumentasi Jaringan & Peta IP' },
    category: 'networking', difficulty: 'medium', areaKey: 'ispBranch', requiredLevel: 45,
    xpReward: 380, coinReward: 76, puzzleType: 'quiz', npcAvatar: '👩‍💼', npcName: 'Supervisor Nita',
    description: { en: 'ISP branch network is undocumented — no one knows what IP belongs to what device!', id: 'Jaringan ISP branch tidak terdokumentasi — tidak ada yang tahu IP mana milik perangkat apa!' },
    npcDialogue: [
      { npc: 'Supervisor Nita', avatar: '👩‍💼', msgEn: "Our network engineer left suddenly and took all the network knowledge with him! Nobody knows the IP of anything. It's chaos during troubleshooting!", msgId: 'Network engineer kami pergi mendadak dan membawa semua pengetahuan jaringan! Tidak ada yang tahu IP apa pun. Kacau saat troubleshooting!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "This is exactly why network documentation is critical. Let me scan the network and build a proper IP address map with all devices documented.", msgId: 'Inilah tepatnya mengapa dokumentasi jaringan sangat penting. Biarkan saya scan jaringan dan buat peta alamat IP yang tepat dengan semua perangkat terdokumentasi.' },
      { npc: 'Supervisor Nita', avatar: '👩‍💼', msgEn: "How will you know what device has what IP without asking someone?", msgId: 'Bagaimana kamu tahu perangkat mana yang punya IP apa tanpa bertanya kepada seseorang?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "arp -a shows all IP-to-MAC mappings. Then I cross-reference MAC addresses with vendor databases to identify device types. nmap gives even more detail.", msgId: 'arp -a menampilkan semua pemetaan IP-ke-MAC. Kemudian saya referensikan silang alamat MAC dengan database vendor untuk mengidentifikasi jenis perangkat. nmap memberikan detail lebih.' },
    ],
    quiz: [
      { q: 'What should a complete network IP address documentation include?', options: ['Only the router\'s IP address', 'Every device\'s IP, MAC address, hostname, physical location, VLAN, and function/role', 'Just the WiFi password written on a sticky note', 'Only servers and printers — PCs don\'t matter'], correct: 1, explanation: 'Complete IP documentation: device name, IP, MAC, physical location (floor/room/rack), VLAN, function (file server/printer/AP/switch). This lets you troubleshoot without physically walking to the device.' },
      { q: 'What command shows the IP-to-MAC address mapping of all devices your computer has communicated with?', options: ['ping 255.255.255.255', 'arp -a (displays the ARP cache with IP and MAC addresses)', 'ipconfig /release', 'netstat -b'], correct: 1, explanation: 'arp -a displays the ARP (Address Resolution Protocol) cache — a table of IP-to-MAC mappings for recently communicated devices. nmap -sn 192.168.1.0/24 gives a full subnet scan.' },
      { q: 'What is the best practice for IP assignment of servers, printers, and network devices?', options: ['Let DHCP randomly assign IPs each time they restart', 'Use static IP assignment or DHCP reservations (IP bound to MAC address) so they always get the same IP', 'Change IPs daily for security', 'Give them IP addresses starting with 999'], correct: 1, explanation: 'Servers and printers need predictable IPs. Static assignment or DHCP reservation (binding an IP to a specific MAC address in DHCP settings) ensures the same IP every time — critical for shared drive mappings and print server paths.' },
      { q: 'A subnet 192.168.10.0/24 has how many usable host IP addresses?', options: ['256 addresses', '254 usable host addresses (256 total minus network address .0 and broadcast .255)', '512 addresses', '1024 addresses'], correct: 1, explanation: '/24 subnet = 256 total addresses. Network address (192.168.10.0) and broadcast address (192.168.10.255) cannot be assigned to hosts. 256 - 2 = 254 usable host IPs. This is the most common office subnet.' },
    ],
  },

  // ── NEW: Firewall Rule Management ────────────────────────────
  {
    id: 't4_015', title: { en: 'Firewall Rule Management', id: 'Manajemen Aturan Firewall' },
    category: 'security', difficulty: 'hard', areaKey: 'networkOpsRoom', requiredLevel: 46,
    xpReward: 520, coinReward: 104, puzzleType: 'sequence', npcAvatar: '👨‍🔒', npcName: 'Kepala IT Budi',
    description: { en: 'New business app blocked by firewall on port 8443. Add the correct firewall rule!', id: 'Aplikasi bisnis baru diblokir firewall di port 8443. Tambahkan aturan firewall yang tepat!' },
    npcDialogue: [
      { npc: 'Kepala IT Budi', avatar: '👨‍🔒', msgEn: "We deployed a new ERP system but users can't connect to it! The vendor says it uses port 8443. Is it the firewall?", msgId: 'Kita deploy sistem ERP baru tapi pengguna tidak bisa konek! Vendor bilang menggunakan port 8443. Apakah ini firewall?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Almost certainly. Our firewall blocks all non-standard ports by default. Port 8443 is not in the default allow list. Let me add the rule.", msgId: 'Hampir pasti. Firewall kita memblokir semua port non-standar secara default. Port 8443 tidak ada di daftar izin default. Biarkan saya tambahkan aturannya.' },
      { npc: 'Kepala IT Budi', avatar: '👨‍🔒', msgEn: "Can you just open ALL ports for that server? Would be easier right?", msgId: 'Bisakah kamu buka SEMUA port untuk server itu? Lebih mudah kan?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Never! Opening all ports = no firewall protection at all. We open only port 8443 for only the specific users who need the ERP. Least privilege applies to network access too.", msgId: 'Jangan pernah! Membuka semua port = tidak ada perlindungan firewall sama sekali. Kita buka hanya port 8443 untuk hanya pengguna spesifik yang membutuhkan ERP. Least privilege berlaku untuk akses jaringan juga.' },
    ],
    sequenceData: {
      task: 'New ERP app cannot connect to server 192.168.10.50 on port 8443 (TCP). Add a precise firewall rule:',
      steps: [
        { id: 's1', text: 'Identify all parameters: Source (office subnet 192.168.1.0/24), Destination (server 192.168.10.50), Port 8443, Protocol TCP, Direction Inbound' },
        { id: 's2', text: 'On the SERVER: open Windows Defender Firewall with Advanced Security (wf.msc)' },
        { id: 's3', text: 'Click Inbound Rules → New Rule → choose Port → TCP → Specific local ports: 8443' },
        { id: 's4', text: 'Select "Allow the connection" → apply to Domain and Private profiles only (NOT Public)' },
        { id: 's5', text: 'Name the rule: "Allow ERP App Port 8443" → add description with date and reason → Finish' },
        { id: 's6', text: 'Test from client PC: telnet 192.168.10.50 8443 (success = connected) or use Test-NetConnection -ComputerName 192.168.10.50 -Port 8443 in PowerShell' },
      ],
      lesson: 'Firewall whitelist approach: deny all by default, allow only specific traffic. ALWAYS specify: Source IP, Destination IP, Port, Protocol. Never use "Any" for all three — that defeats the firewall. Document every rule with date, requestor, and business justification.',
    },
  },

  // ── NEW: QoS Bandwidth Prioritization ────────────────────────
  {
    id: 't4_016', title: { en: 'QoS Bandwidth Prioritization', id: 'Prioritas Bandwidth dengan QoS' },
    category: 'networking', difficulty: 'hard', areaKey: 'networkOpsRoom', requiredLevel: 47,
    xpReward: 480, coinReward: 96, puzzleType: 'quiz', npcAvatar: '👩‍💼', npcName: 'Manager Santi',
    description: { en: 'Director\'s video calls keep dropping during busy hours. Configure QoS to fix it!', id: 'Video call direksi sering putus saat jam sibuk. Konfigurasi QoS untuk memperbaikinya!' },
    npcDialogue: [
      { npc: 'Manager Santi', avatar: '👩‍💼', msgEn: "The Directors' Zoom calls keep freezing and dropping during the 9-11AM peak hours! They're furious. Can you fix it?", msgId: 'Panggilan Zoom para Direktur terus membeku dan putus selama jam puncak 9-11 pagi! Mereka marah. Bisakah kamu memperbaikinya?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "During peak hours, staff are downloading large files and doing backups — consuming all 100Mbps of bandwidth. We need QoS to prioritize video calls over downloads.", msgId: 'Selama jam puncak, staf mengunduh file besar dan melakukan backup — menghabiskan semua 100Mbps bandwidth. Kita perlu QoS untuk memprioritaskan video call di atas unduhan.' },
      { npc: 'Manager Santi', avatar: '👩‍💼', msgEn: "QoS? Will that add more internet bandwidth?", msgId: 'QoS? Apakah itu akan menambah lebih banyak bandwidth internet?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "No — QoS manages EXISTING bandwidth. Think of it like an HOV lane on a highway — video calls get the fast lane, file downloads use the regular lanes. Same road, better priority.", msgId: 'Tidak — QoS mengelola bandwidth yang SUDAH ADA. Bayangkan seperti jalur HOV di jalan raya — video call mendapat jalur cepat, unduhan file menggunakan jalur biasa. Jalan yang sama, prioritas lebih baik.' },
    ],
    quiz: [
      { q: 'What does QoS (Quality of Service) do in a network?', options: ['It physically increases your total internet connection speed', 'It prioritizes certain types of traffic over others so important apps get bandwidth first during congestion', 'It blocks all file downloads permanently', 'It monitors employee internet activity for HR'], correct: 1, explanation: 'QoS does NOT add bandwidth — it manages existing bandwidth. During congestion: video calls (high priority) flow smoothly, while file downloads (low priority) slow down. Same pipe, smarter usage.' },
      { q: 'In a QoS policy, which traffic type should receive the HIGHEST priority?', options: ['Automatic Windows Updates and patches', 'Netflix and YouTube streaming for relaxation', 'VoIP calls and video conferencing (Zoom/Teams) — real-time and latency-sensitive', 'Large file downloads and cloud backups'], correct: 2, explanation: 'VoIP/video is real-time — even 150ms latency is noticeable as choppy audio. It needs guaranteed low latency. Downloads/backups are delay-tolerant — a 5-second delay is invisible to users.' },
      { q: 'What is DSCP marking in QoS?', options: ['A physical network cable standard', 'Tags embedded in IP packet headers that tell routers/switches how to prioritize that packet', 'A type of firewall access control list', 'A DNS server configuration setting'], correct: 1, explanation: 'DSCP (Differentiated Services Code Point) = a 6-bit tag in the IP header. Routers read DSCP tags and forward high-priority packets first during congestion. EF (Expedited Forwarding) = highest priority for VoIP.' },
      { q: 'QoS is configured but video calls still drop during peak hours. What is the actual root cause?', options: ['The router needs a firmware update', 'The 100Mbps ISP connection is genuinely saturated — QoS optimizes but cannot exceed the physical bandwidth limit. Upgrade the ISP plan.', 'QoS needs to be enabled on all client PCs', 'The Ethernet cables need replacement'], correct: 1, explanation: 'QoS optimizes distribution of available bandwidth but cannot exceed the physical capacity. 100Mbps fully saturated = QoS can help but not eliminate drops. Solution: QoS + bandwidth upgrade. QoS buys time while you negotiate the upgrade.' },
    ],
  },

  // ── NEW: VPN Troubleshooting ──────────────────────────────────
  {
    id: 't4_017', title: { en: 'VPN Troubleshooting', id: 'Troubleshooting VPN' },
    category: 'networking', difficulty: 'hard', areaKey: 'ispBranch', requiredLevel: 48,
    xpReward: 500, coinReward: 100, puzzleType: 'sequence', npcAvatar: '🧑‍💻', npcName: 'Remote Worker Dika',
    description: { en: 'VPN connects but internal servers are unreachable. Classic subnet conflict!', id: 'VPN konek tapi server internal tidak bisa diakses. Konflik subnet klasik!' },
    npcDialogue: [
      { npc: 'Remote Worker Dika', avatar: '🧑‍💻', msgEn: "My VPN says 'Connected' but I still can't access the file server or Outlook! Internet works fine though.", msgId: 'VPN saya bilang "Terhubung" tapi saya masih tidak bisa akses file server atau Outlook! Internet baik-baik saja.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Connected ≠ working. Can you open CMD and run ipconfig? I want to see what IP your VPN adapter got assigned.", msgId: '"Terhubung" ≠ berfungsi. Bisakah kamu buka CMD dan jalankan ipconfig? Saya ingin lihat IP apa yang ditetapkan ke VPN adapter kamu.' },
      { npc: 'Remote Worker Dika', avatar: '🧑‍💻', msgEn: "It shows a VPN adapter with IP 192.168.1.x and my home WiFi is also 192.168.1.x... is that a problem?", msgId: 'Menampilkan VPN adapter dengan IP 192.168.1.x dan WiFi rumah saya juga 192.168.1.x... apakah itu masalah?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "That's exactly the problem! IP subnet conflict — your home network and office network are using the same IP range (192.168.1.x). Your PC can't tell which 192.168.1.50 to route to!", msgId: 'Itulah persis masalahnya! Konflik subnet IP — jaringan rumah dan kantor menggunakan rentang IP yang sama (192.168.1.x). PC kamu tidak bisa membedakan 192.168.1.50 mana yang harus dirutekan!' },
    ],
    sequenceData: {
      task: 'VPN connects but cannot reach office servers (192.168.1.x). Home router also uses 192.168.1.x. Fix the subnet conflict:',
      steps: [
        { id: 's1', text: 'Confirm VPN is connected (VPN client shows "Connected" or "Established")' },
        { id: 's2', text: 'Run ipconfig /all — check if VPN adapter appears AND note home router subnet (both showing 192.168.1.x = conflict!)' },
        { id: 's3', text: 'Log into home router admin page (usually 192.168.1.1 or 192.168.0.1)' },
        { id: 's4', text: 'Change home router LAN IP to 192.168.5.1 and DHCP range to 192.168.5.10-192.168.5.100' },
        { id: 's5', text: 'Save settings — home router will restart — reconnect home WiFi (will get 192.168.5.x IP now)' },
        { id: 's6', text: 'Reconnect VPN — now home (192.168.5.x) and office (192.168.1.x) use different subnets → ping office server — should succeed' },
      ],
      lesson: 'VPN subnet conflicts: home and office networks using the same IP range (e.g., both 192.168.1.0/24). The PC cannot route correctly. Fix: change home router subnet. Other VPN issues: split tunneling bypassing VPN, wrong DNS not resolving internal hostnames.',
    },
  },
];

