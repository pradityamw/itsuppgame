// TIER 6 MISSIONS — Security Specialist (Level 70–90)
// Areas: secOps, securityWing, threatRoom

export const MISSIONS_TIER6 = [
  {
    // ── INTERACTIVE: sequence (malware isolation) ──
    id: 't6_001', title: { en: 'Isolate Infected PC', id: 'Isolasi PC yang Terinfeksi' },
    category: 'security', difficulty: 'hard', areaKey: 'secOps', requiredLevel: 70,
    xpReward: 900, coinReward: 180, puzzleType: 'sequence', npcAvatar: '🚨', npcName: 'SOC Alert',
    description: { en: 'Malware detected on employee PC. Execute the isolation procedure in the correct order!', id: 'Malware terdeteksi di PC karyawan. Laksanakan prosedur isolasi dengan urutan yang benar!' },
    npcDialogue: [
      { npc: 'SOC Alert', avatar: '🚨', msgEn: 'ALERT: Malware detected on employee PC WORKST-045 — active network connections to suspicious IP. The malware is still running. What is the FIRST thing we do?', msgId: 'ALERT: Malware terdeteksi di PC karyawan WORKST-045 — koneksi jaringan aktif ke IP mencurigakan. Malware masih berjalan. Apa yang PERTAMA kita lakukan?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'First action: network isolation — disconnect IMMEDIATELY. Unplug ethernet AND disable WiFi. This stops the malware from spreading and cuts attacker remote access before we do anything else.', msgId: 'Tindakan pertama: isolasi jaringan — putuskan koneksi SEGERA. Cabut ethernet DAN nonaktifkan WiFi. Ini menghentikan penyebaran malware dan memutus akses jarak jauh penyerang.' },
      { npc: 'SOC Alert', avatar: '🚨', msgEn: 'The user is asking if they should reboot the PC to "get rid of the virus". And should we wipe the drive immediately?', msgId: 'Pengguna bertanya apakah harus reboot PC untuk "membuang virus". Dan apakah kita harus langsung hapus drive?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'NO to both! Do NOT reboot — volatile memory contains running process data and encryption keys for forensics. Do NOT wipe yet — we need a forensic image first. Order: Isolate → Preserve evidence → Forensic image → Remediate.', msgId: 'TIDAK untuk keduanya! JANGAN reboot — memori volatile berisi data proses dan kunci enkripsi untuk forensik. JANGAN hapus dulu — kita perlu image forensik dulu. Urutan: Isolasi → Jaga bukti → Image forensik → Remedasi.' },
    ],
    sequenceData: {
      task: 'Malware has been detected on an employee\'s PC. It\'s actively running. Put the correct incident response steps in order:',
      steps: [
        { id: 'step1', text: 'Disconnect ALL network connections IMMEDIATELY — unplug ethernet cable AND disable WiFi (isolate from network)' },
        { id: 'step2', text: 'Do NOT turn off the PC yet — preserve volatile memory evidence (running processes, network connections)' },
        { id: 'step3', text: 'Create a forensic disk image for evidence — document everything found before making changes' },
        { id: 'step4', text: 'Full format + reinstall OS from clean trusted media — do NOT use a quick format (advanced malware survives it)' },
        { id: 'step5', text: 'Verify BIOS firmware integrity — restore user data from pre-infection backup — return PC to user' },
      ],
      lesson: 'Malware order: Isolate → Preserve evidence → Forensics → Full wipe from clean media. Network isolation FIRST — malware spreads within seconds.',
    },
  },
  {
    // ── INTERACTIVE: terminal (phishing investigation) ──
    id: 't6_002', title: { en: 'Phishing Email Investigation', id: 'Investigasi Email Phishing' },
    category: 'security', difficulty: 'medium', areaKey: 'securityWing', requiredLevel: 71,
    xpReward: 750, coinReward: 150, puzzleType: 'terminal', npcAvatar: '🎣', npcName: 'HR Manager',
    description: { en: '50 employees received fake "payroll" email. Investigate and contain it!', id: '50 karyawan menerima email "payroll" palsu. Investigasi dan kendalikan!' },
    npcDialogue: [
      { npc: 'HR Manager', avatar: '🎣', msgEn: 'IT Emergency! 50 employees just received an email from "payro11.company.com" claiming to be Payroll saying "Update your bank details NOW or your salary will be delayed". At least 5 people may have clicked the link!', msgId: 'Darurat IT! 50 karyawan baru saja menerima email dari "payro11.company.com" yang mengklaim dari Payroll berkata "Perbarui detail bank kamu SEKARANG atau gaji akan tertunda". Setidaknya 5 orang mungkin sudah mengklik tautan!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Classic phishing campaign! Notice the domain: "payro11.company.com" — the letter L is replaced with the number 1. This is domain spoofing. We need to block this domain at the mail gateway and use PowerShell to identify who clicked.', msgId: 'Kampanye phishing klasik! Perhatikan domain: "payro11.company.com" — huruf L diganti dengan angka 1. Ini domain spoofing. Kita perlu memblokir domain ini di gateway mail dan menggunakan PowerShell untuk mengidentifikasi siapa yang mengklik.' },
      { npc: 'HR Manager', avatar: '🎣', msgEn: 'Finance is panicking — some employees may have entered their bank details on the fake site! And how did this email bypass our spam filter?', msgId: 'Finance panik — beberapa karyawan mungkin telah memasukkan detail bank mereka di situs palsu! Dan bagaimana email ini melewati filter spam kita?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'For employees who entered data: immediately contact the bank to freeze accounts. The spoofed domain was new and not yet blacklisted. We will trace all 50 recipients, block the domain, and isolate the 5 who clicked — all via PowerShell Exchange commands.', msgId: 'Untuk karyawan yang memasukkan data: segera hubungi bank untuk membekukan akun. Domain palsu baru dan belum diblacklist. Kita akan lacak semua 50 penerima, blokir domain, dan isolasi 5 yang mengklik — semuanya via perintah PowerShell Exchange.' },
    ],
    terminalData: {
      os: 'windows',
      intro: 'A suspicious "payroll update" email was sent to 50 employees. 5 may have clicked the link. Investigate using PowerShell Exchange commands.',
      tasks: [
        {
          id: 'task1',
          instruction: 'Search mail logs for the phishing email sender domain:',
          command: 'Get-MessageTrace -SenderAddress "*@payro11.company.com" -StartDate (Get-Date).AddHours(-4) | Select-Object Received,SenderAddress,RecipientAddress,Subject | Format-Table',
          hint: 'Type: Get-MessageTrace -SenderAddress "*@payro11.company.com" -StartDate (Get-Date).AddHours(-4) | Select-Object Received,SenderAddress,RecipientAddress,Subject | Format-Table',
          successOutput: `Received             SenderAddress                   RecipientAddress         Subject\n--------             -------------                   ----------------         -------\n2026-05-19 20:01:12  hr@payro11.company.com          budi@company.com         [ACTION] Payroll Update\n2026-05-19 20:01:13  hr@payro11.company.com          sari@company.com         [ACTION] Payroll Update\n... (48 more recipients)\n\n[!] Spoofed domain: payro11.company.com (note: letter l replaced with digit 1). 50 recipients identified.`,
          lesson: 'Domain spoofing uses look-alike characters (l→1, O→0). Always check the FULL sender email address, not just the display name.',
        },
        {
          id: 'task2',
          instruction: 'Block the phishing domain at the mail gateway:',
          command: 'New-TenantAllowBlockListItems -ListType Sender -Entries "payro11.company.com" -Block -NoExpiration -Notes "Phishing campaign 2026-05-19"',
          hint: 'Type: New-TenantAllowBlockListItems -ListType Sender -Entries "payro11.company.com" -Block -NoExpiration -Notes "Phishing campaign 2026-05-19"',
          successOutput: `ListType   : Sender\nValue      : payro11.company.com\nAction     : Block\nExpiryDate : Never\nNotes      : Phishing campaign 2026-05-19\n\n[✓] Domain payro11.company.com permanently blocked at mail gateway.`,
          lesson: 'Block the sender domain immediately to stop the campaign. Document with notes for audit trail.',
        },
        {
          id: 'task3',
          instruction: 'Identify and isolate the 5 users who clicked the link:',
          command: 'Search-UnifiedAuditLog -StartDate (Get-Date).AddHours(-4) -Operations "UrlClicked" -FreeText "payro11" | Select-Object UserIds,AuditData | Format-List',
          hint: 'Type: Search-UnifiedAuditLog -StartDate (Get-Date).AddHours(-4) -Operations "UrlClicked" -FreeText "payro11" | Select-Object UserIds,AuditData | Format-List',
          successOutput: `UserIds   : budi@company.com\nAuditData : {URL: http://payro11.company.com/steal, ClickTime: 20:03:44}\n\nUserIds   : andi@company.com\nAuditData : {URL: http://payro11.company.com/steal, ClickTime: 20:05:12}\n\n... (3 more users)\n\n[!] 5 users clicked the phishing link. Their PCs must be isolated and investigated immediately.`,
          lesson: 'Audit logs show who clicked phishing links. These users are likely compromised — isolate their machines, reset credentials, and investigate.',
        },
      ],
      successMsg: '🛡️ Phishing campaign contained! Domain blocked, 5 affected users identified and being isolated.',
      lesson: 'Phishing: check sender domain carefully (l vs 1). Block domain, identify who clicked, isolate their machines. Train users + SPF/DKIM/DMARC + MFA.',
    },
  },
  {
    // ── INTERACTIVE: sequence (ransomware response) ──
    id: 't6_003', title: { en: 'Stop Ransomware Spread', id: 'Hentikan Penyebaran Ransomware' },
    category: 'security', difficulty: 'epic', areaKey: 'secOps', requiredLevel: 75,
    xpReward: 1200, coinReward: 250, puzzleType: 'sequence', npcAvatar: '💀', npcName: 'CRITICAL ALERT',
    description: { en: 'Ransomware spreading across the network NOW. Files encrypting fast. Act in the right order!', id: 'Ransomware menyebar di jaringan SEKARANG. File dienkripsi cepat. Bertindak dengan urutan benar!' },
    npcDialogue: [
      { npc: 'CRITICAL ALERT', avatar: '💀', msgEn: '[CRITICAL] Files being encrypted RIGHT NOW across Finance and HR file servers — extension changed to .LOCKED. Spreading at 200 files per minute via SMB network shares. This is ransomware. What is the FIRST action?', msgId: '[KRITIS] File sedang dienkripsi SEKARANG di server Finance dan HR — ekstensi berubah menjadi .LOCKED. Menyebar 200 file per menit via SMB share. Ini ransomware. Apa TINDAKAN PERTAMA?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Cut the network NOW — at the SWITCH level, not individual PCs. Disable the trunk ports or VLAN for affected departments. Every second = 200 more files encrypted. Network isolation stops the spread instantly.', msgId: 'Putuskan jaringan SEKARANG — di level SWITCH, bukan PC individual. Nonaktifkan trunk port atau VLAN departemen yang terdampak. Setiap detik = 200 file lebih terenkripsi. Isolasi jaringan menghentikan penyebaran seketika.' },
      { npc: 'CRITICAL ALERT', avatar: '💀', msgEn: 'The attackers are demanding $500,000 in Bitcoin for the decryption key. Management is asking if we should pay to recover the data faster.', msgId: 'Penyerang menuntut $500.000 Bitcoin untuk kunci dekripsi. Manajemen bertanya apakah kita harus membayar untuk memulihkan data lebih cepat.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Absolutely NOT. Paying ransom: 1) Funds criminals, 2) NO guarantee of decryption, 3) Makes you a repeat target. We have verified backups. Recovery via backup is the correct path: Contain → Find patient zero → Verify backups → Restore → Close the attack vector.', msgId: 'Sama sekali TIDAK. Membayar tebusan: 1) Mendanai kriminal, 2) TIDAK ada jaminan dekripsi, 3) Menjadikan kamu target berulang. Kita punya backup terverifikasi. Pemulihan via backup adalah jalan benar: Tahan → Temukan patient zero → Verifikasi backup → Restore → Tutup vektor serangan.' },
    ],
    sequenceData: {
      task: 'CRITICAL: Ransomware is actively encrypting files and spreading across the network. Every second counts — arrange the correct response steps:',
      steps: [
        { id: 'step1', text: 'IMMEDIATELY shut down affected network segments at the switch level — pull trunk cables or disable switch ports to stop spread' },
        { id: 'step2', text: 'Identify patient zero (first infected machine) — check file encryption timestamps and network logs' },
        { id: 'step3', text: 'DO NOT pay the ransom — identify last clean backup and begin restoration planning' },
        { id: 'step4', text: 'Wipe all infected machines and restore from clean pre-infection backups' },
        { id: 'step5', text: 'Identify and close the initial attack vector (patch vulnerability, reset compromised credentials) before reconnecting to network' },
      ],
      lesson: 'Ransomware: cut network FIRST (switch level) → don\'t pay → restore from backup → close the attack vector. Never reconnect without fixing root cause.',
    },
  },
  {
    // ── INTERACTIVE: sequence (MFA rollout) ──
    id: 't6_004', title: { en: 'Enable MFA for All Users', id: 'Aktifkan MFA untuk Semua User' },
    category: 'security', difficulty: 'medium', areaKey: 'securityWing', requiredLevel: 72,
    xpReward: 720, coinReward: 145, puzzleType: 'sequence', npcAvatar: '🔐', npcName: 'CISO',
    description: { en: 'Company directive: all 200 users must have MFA enabled by EOD. Roll it out properly!', id: 'Arahan perusahaan: semua 200 pengguna harus MFA aktif sebelum akhir hari. Rollout dengan benar!' },
    npcDialogue: [
      { npc: 'CISO', avatar: '🔐', msgEn: 'Board directive: ALL 200 company users must have MFA enabled by end of month — mandatory compliance requirement after last quarter\'s security audit. How do we roll this out without locking everyone out or disrupting operations?', msgId: 'Arahan dewan: SEMUA 200 pengguna harus MFA aktif sebelum akhir bulan — persyaratan kepatuhan wajib setelah audit kuartal lalu. Bagaimana kita meluncurkan ini tanpa mengunci semua orang atau mengganggu operasi?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Key to successful MFA rollout: sequencing and communication. You cannot enforce before enrolling. Sequence: choose method → communicate and train → rollout by department → grace period → enforce. Skipping any step risks locking out hundreds of users simultaneously.', msgId: 'Kunci rollout MFA yang sukses: urutan dan komunikasi. Tidak bisa menegakkan sebelum mendaftar. Urutan: pilih metode → komunikasikan dan latih → rollout per departemen → masa tenggang → tegakkan. Melewati langkah apa pun berisiko mengunci ratusan pengguna sekaligus.' },
      { npc: 'CISO', avatar: '🔐', msgEn: 'What MFA method should we use? SMS codes, authenticator app, or hardware keys? We need to balance security strength with ease of use for non-technical staff.', msgId: 'Metode MFA apa yang harus kita gunakan? Kode SMS, aplikasi authenticator, atau kunci hardware? Kita perlu menyeimbangkan kekuatan keamanan dengan kemudahan penggunaan untuk staf non-teknis.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Recommendation: Microsoft Authenticator app for regular users (secure, free, easy), FIDO2 hardware keys (YubiKey) for admins. Avoid SMS — SIM-swap attacks make it the weakest option. Authenticator apps block 99.9% of automated attacks while remaining user-friendly.', msgId: 'Rekomendasi: Aplikasi Microsoft Authenticator untuk pengguna biasa (aman, gratis, mudah), kunci hardware FIDO2 (YubiKey) untuk admin. Hindari SMS — serangan SIM-swap menjadikannya pilihan paling lemah. Aplikasi Authenticator memblokir 99,9% serangan otomatis sambil tetap ramah pengguna.' },
    ],
    sequenceData: {
      task: 'Roll out MFA to all 200 company users by end of day. Arrange the correct deployment steps:',
      steps: [
        { id: 'step1', text: 'Choose MFA method — deploy hardware security keys (FIDO2/YubiKey) for admins, Microsoft Authenticator app for regular users' },
        { id: 'step2', text: 'Send company-wide announcement with setup instructions and deadline — include IT helpdesk contact for support' },
        { id: 'step3', text: 'Enable MFA enforcement in Azure AD / Active Directory — set grace period of 24h before mandatory' },
        { id: 'step4', text: 'Assist users who need help enrolling — ensure no one is locked out permanently (set up backup codes)' },
        { id: 'step5', text: 'After grace period: enforce MFA for all sign-ins — monitor dashboard for unenrolled users and follow up' },
      ],
      lesson: 'MFA = second factor after password. Hardware keys > TOTP apps > SMS (SMS vulnerable to SIM-swap). Even if password is stolen, attacker can\'t log in without the second factor.',
    },
  },
  {
    // ── INTERACTIVE: network (firewall rules) ──
    id: 't6_005', title: { en: 'Firewall Misconfiguration', id: 'Miskonfigurasi Firewall' },
    category: 'security', difficulty: 'hard', areaKey: 'threatRoom', requiredLevel: 74,
    xpReward: 880, coinReward: 175, puzzleType: 'network', npcAvatar: '🛡️', npcName: 'Security Scan',
    description: { en: 'Vulnerability scan found RDP port 3389 wide open to the internet. Close it now!', id: 'Scan keamanan menemukan port RDP 3389 terbuka ke internet. Tutup sekarang!' },
    npcDialogue: [
      { npc: 'Security Scan', avatar: '🛡️', msgEn: 'VULNERABILITY ALERT: External scan detected RDP port 3389 reachable from the public internet on IP 203.0.113.50. This port has already received 1,247 login attempts from 89 different IPs in the past 24 hours — brute-force attack in progress!', msgId: 'ALERT KERENTANAN: Scan eksternal mendeteksi port RDP 3389 bisa dijangkau dari internet publik di IP 203.0.113.50. Port ini sudah menerima 1.247 percobaan login dari 89 IP berbeda dalam 24 jam terakhir — serangan brute-force sedang berlangsung!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'RDP exposed to internet is one of the most dangerous misconfigurations — it\'s the #1 initial access vector for ransomware. We need to block port 3389 from the internet on the firewall immediately. Remote users should connect via VPN first, then RDP internally.', msgId: 'RDP yang terekspos ke internet adalah salah satu miskonfigurasi paling berbahaya — ini vektor akses awal #1 untuk ransomware. Kita perlu memblokir port 3389 dari internet di firewall segera. Pengguna remote harus VPN dulu, kemudian RDP secara internal.' },
      { npc: 'Security Scan', avatar: '🛡️', msgEn: 'But our remote team needs RDP access from home! If we block it on the firewall, they lose access completely. How do we secure it without breaking their workflow?', msgId: 'Tapi tim remote kita butuh akses RDP dari rumah! Jika diblokir di firewall, mereka kehilangan akses sepenuhnya. Bagaimana kita mengamankannya tanpa merusak alur kerja mereka?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Simple fix: block RDP from internet, keep it open from the VPN network segment. Remote users: connect VPN first (port 443 — much safer) → then RDP internally. This eliminates the brute-force attack surface completely while maintaining full functionality for legitimate users.', msgId: 'Perbaikan sederhana: blokir RDP dari internet, tetap buka dari segmen jaringan VPN. Pengguna remote: hubungkan VPN dulu (port 443 — jauh lebih aman) → kemudian RDP secara internal. Ini menghilangkan permukaan serangan brute-force sambil mempertahankan fungsionalitas penuh.' },
    ],
    puzzleData: {
      nodes: [
        { id: 'internet',  type: 'internet', label: 'Internet (Attackers 🏴‍☠️)', emoji: '🌐', x: 50, y: 5  },
        { id: 'firewall',  type: 'router',   label: 'Firewall (misconfigured)', emoji: '🛡️',  x: 50, y: 28 },
        { id: 'vpn',       type: 'router',   label: 'VPN Gateway',              emoji: '🔒',  x: 20, y: 55 },
        { id: 'server',    type: 'pc',       label: 'RDP Server (port 3389)',   emoji: '🖥️',  x: 80, y: 55 },
        { id: 'remote',    type: 'pc',       label: 'Legitimate Remote Users',  emoji: '🏠',  x: 20, y: 80 },
        { id: 'internal',  type: 'pc',       label: 'Internal Office PCs',      emoji: '💼',  x: 80, y: 80 },
      ],
      connections: [
        { id: 'cn_inet_fw',        from: 'internet', to: 'firewall', broken: false, label: 'OPEN — all traffic!' },
        { id: 'cn_fw_rdpserver',   from: 'firewall', to: 'server',   broken: true,  label: 'Port 3389 EXPOSED ⚠️' },
        { id: 'cn_inet_vpn',       from: 'internet', to: 'vpn',      broken: false, label: 'VPN (port 443)' },
        { id: 'cn_vpn_server',     from: 'vpn',      to: 'server',   broken: false, label: 'Internal RDP (OK)' },
        { id: 'cn_remote_vpn',     from: 'remote',   to: 'vpn',      broken: false, label: 'VPN tunnel' },
        { id: 'cn_internal_server',from: 'internal', to: 'server',   broken: false, label: 'LAN' },
      ],
      faultConnection: 'cn_fw_rdpserver',
      steps: [
        { id: 1, action: 'inspect',   text: 'Scan confirms port 3389 accessible from internet — bots already sending brute-force attempts' },
        { id: 2, action: 'reconnect', text: 'Block port 3389 from internet on firewall — click the exposed link to apply "DENY ALL" rule' },
        { id: 3, action: 'verify',    text: 'Verify: internet → port 3389 = BLOCKED. VPN → internal RDP = still works for legitimate users' },
      ],
    },
  },
  {
    // ── INTERACTIVE: terminal (VPN cert troubleshooting) ──
    id: 't6_006', title: { en: 'VPN Troubleshooting', id: 'Troubleshooting VPN' },
    category: 'security', difficulty: 'hard', areaKey: 'securityWing', requiredLevel: 73,
    xpReward: 840, coinReward: 165, puzzleType: 'terminal', npcAvatar: '🔒', npcName: 'Remote Team',
    description: { en: '40 remote workers can\'t connect to corporate VPN after certificate renewal. Fix it!', id: '40 pekerja remote tidak bisa konek VPN setelah pembaruan sertifikat. Perbaiki!' },
    npcDialogue: [
      { npc: 'Remote Team', avatar: '🔒', msgEn: 'URGENT: All 40 remote workers are getting "Certificate Error" when connecting to VPN since this morning. Everything worked yesterday. The only change was the VPN certificate renewal done last night. Now no one can work remotely!', msgId: 'MENDESAK: Semua 40 pekerja remote mendapatkan "Certificate Error" saat menghubungkan VPN sejak pagi ini. Semuanya berfungsi kemarin. Satu-satunya perubahan adalah pembaruan sertifikat VPN semalam. Sekarang tidak ada yang bisa bekerja dari jarak jauh!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Classic post-renewal issue! The VPN server has the new certificate, but client machines still have the OLD CA certificate in their trust store. They see a certificate from an authority they don\'t recognize — hence the error. We need to push the new CA cert to all clients via GPO.', msgId: 'Masalah pasca-pembaruan klasik! Server VPN punya sertifikat baru, tapi mesin klien masih punya sertifikat CA LAMA di trust store. Mereka melihat sertifikat dari otoritas yang tidak mereka kenal — karena itu error. Kita perlu mendorong CA cert baru ke semua klien via GPO.' },
      { npc: 'Remote Team', avatar: '🔒', msgEn: 'Can we just tell users to click "Accept anyway" or "Trust this certificate"? That would be the fastest fix right?', msgId: 'Bisakah kita menyuruh pengguna mengklik "Terima saja" atau "Percayai sertifikat ini"? Itu perbaikan tercepat bukan?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Absolutely not — "accept anyway" trains users to ignore certificate warnings, which is a major security risk. If a real man-in-the-middle attack happens, they\'ll click accept again. Correct fix: export new CA cert to SYSVOL, configure GPO to push to all domain machines, force GPO update. Takes 20 minutes, fixes everyone properly.', msgId: 'Sama sekali tidak — "terima saja" melatih pengguna mengabaikan peringatan sertifikat, risiko keamanan besar. Perbaikan benar: ekspor CA cert baru ke SYSVOL, konfigurasi GPO untuk mendorong ke semua mesin domain, paksa pembaruan GPO. Butuh 20 menit, memperbaiki semua orang dengan benar.' },
    ],
    terminalData: {
      os: 'windows',
      intro: 'VPN certificate was renewed last night. Now 40 remote workers get "Certificate Error". Fix the cert deployment.',
      tasks: [
        {
          id: 'task1',
          instruction: 'Check the VPN server certificate status and expiry:',
          command: 'Get-ChildItem Cert:\\LocalMachine\\My | Where-Object {$_.Subject -like "*vpn.company.com*"} | Select-Object Subject,NotAfter,Thumbprint | Format-List',
          hint: 'Type: Get-ChildItem Cert:\\LocalMachine\\My | Where-Object {$_.Subject -like "*vpn.company.com*"} | Select-Object Subject,NotAfter,Thumbprint | Format-List',
          successOutput: `Subject    : CN=vpn.company.com\nNotAfter   : 2027-05-19 20:00:00\nThumbprint : A1B2C3D4E5F6789012345678\n\n[✓] New VPN cert is valid until 2027. Server-side cert is correct.\n[!] Issue: client machines still trust the OLD cert thumbprint. Need to push new cert to all clients via GPO.`,
          lesson: 'Server has the new cert. Clients still trust the old CA cert. When VPN cert is renewed, clients must receive the new cert or trust the CA.',
        },
        {
          id: 'task2',
          instruction: 'Export the new CA cert to push to clients via Group Policy:',
          command: 'Export-Certificate -Cert Cert:\\LocalMachine\\Root\\A1B2C3D4E5F6789012345678 -FilePath "\\\\DC01\\SYSVOL\\company.com\\Policies\\VPN-CA-2026.cer" -Type CERT',
          hint: 'Type: Export-Certificate -Cert Cert:\\LocalMachine\\Root\\A1B2C3D4E5F6789012345678 -FilePath "\\\\DC01\\SYSVOL\\company.com\\Policies\\VPN-CA-2026.cer" -Type CERT',
          successOutput: `    Directory: \\\\DC01\\SYSVOL\\company.com\\Policies\n\nMode   LastWriteTime  Length Name\n----   -------------  ------ ----\n-a---  19/05/2026     1234   VPN-CA-2026.cer\n\n[✓] CA cert exported to SYSVOL. Now configure GPO to push to all clients.`,
          lesson: 'Exporting to SYSVOL makes the cert available for GPO deployment to all domain-joined machines automatically.',
        },
        {
          id: 'task3',
          instruction: 'Force GPO update on all machines to push the new cert immediately:',
          command: 'Invoke-GPUpdate -Computer "all" -Force -RandomDelayInMinutes 0 && Write-Host "GPO pushed. Clients should now trust new VPN cert."',
          hint: 'Type: Invoke-GPUpdate -Computer "all" -Force -RandomDelayInMinutes 0',
          successOutput: `Updating policy on remote computers...\nUser Policy update has completed successfully.\nComputer Policy update has completed successfully.\n\nGPO pushed. Clients should now trust new VPN cert.\n[✓] 40 remote workers can now connect to VPN without certificate errors.`,
          lesson: 'GPO updates push certificates to all domain machines. Remote workers connect VPN successfully after receiving the new CA cert.',
        },
      ],
      successMsg: '🔒 VPN restored for all 40 remote workers! New CA cert deployed via GPO. Split tunneling config verified.',
      lesson: 'VPN cert renewal = push new CA cert to all clients via GPO. Split tunneling controls which traffic goes through VPN tunnel.',
    },
  },
  {
    // ── INTERACTIVE: sequence (impossible travel / account compromise) ──
    id: 't6_007', title: { en: 'Suspicious Login Investigation', id: 'Investigasi Login Mencurigakan' },
    category: 'security', difficulty: 'hard', areaKey: 'threatRoom', requiredLevel: 76,
    xpReward: 920, coinReward: 185, puzzleType: 'sequence', npcAvatar: '🕵️', npcName: 'SIEM Alert',
    description: { en: 'SIEM alerts: user account logged in from 3 countries simultaneously. Respond correctly!', id: 'SIEM alerts: akun user login dari 3 negara secara bersamaan. Respons dengan benar!' },
    npcDialogue: [
      { npc: 'SIEM Alert', avatar: '🕵️', msgEn: '[IMPOSSIBLE TRAVEL DETECTED] User: sarah.manager@company.com — Login at 14:00 from Jakarta, Indonesia. Login at 14:02 from Moscow, Russia. Distance: 9,200 km in 2 minutes. Physically impossible. Account is almost certainly compromised.', msgId: '[PERJALANAN TIDAK MUNGKIN TERDETEKSI] User: sarah.manager@company.com — Login pukul 14:00 dari Jakarta, Indonesia. Login pukul 14:02 dari Moscow, Russia. Jarak: 9.200 km dalam 2 menit. Secara fisik tidak mungkin. Akun hampir pasti dikompromikan.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Impossible travel is a textbook sign of account compromise — someone in Russia stole credentials and is accessing the account RIGHT NOW while Sarah is also logged in from Jakarta. First action: disable the account in Active Directory to kick out the attacker immediately.', msgId: 'Perjalanan tidak mungkin adalah tanda buku teks kompromi akun — seseorang di Russia mencuri kredensial dan mengakses akun SEKARANG sementara Sarah juga login dari Jakarta. Tindakan pertama: nonaktifkan akun di Active Directory untuk mengeluarkan penyerang segera.' },
      { npc: 'SIEM Alert', avatar: '🕵️', msgEn: 'The Russia session has been active for 8 minutes and has accessed the Finance shared drive. Should we wait to confirm with Sarah before disabling? We don\'t want to lock her out if this is somehow legitimate.', msgId: 'Sesi Russia telah aktif 8 menit dan telah mengakses drive Finance. Haruskah kita tunggu konfirmasi dari Sarah sebelum menonaktifkan? Kita tidak ingin menguncinya jika ini entah bagaimana sah.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'No time to wait — the attacker is exfiltrating data RIGHT NOW. Disable first, explain later. After disabling: revoke all sessions, reset password, enforce MFA, review what data was accessed in those 8 minutes. Sarah can log back in with new credentials within 30 minutes — far better than losing company data.', msgId: 'Tidak ada waktu untuk menunggu — penyerang sedang mengeksfiltrasi data SEKARANG. Nonaktifkan dulu, jelaskan nanti. Setelah menonaktifkan: cabut semua sesi, reset password, tegakkan MFA, tinjau data yang diakses dalam 8 menit itu. Sarah bisa login kembali dengan kredensial baru dalam 30 menit — jauh lebih baik daripada kehilangan data perusahaan.' },
    ],
    sequenceData: {
      task: 'SIEM detected "impossible travel" — same account logged in from Singapore, then Russia 2 minutes later. This account is compromised. Put the correct response steps in order:',
      steps: [
        { id: 'step1', text: 'IMMEDIATELY disable the compromised account in Active Directory to stop the attacker\'s access' },
        { id: 'step2', text: 'Revoke ALL active sessions and tokens for the account (Azure AD: Revoke Sign-in Sessions)' },
        { id: 'step3', text: 'Force a password reset — the current password is in the attacker\'s hands' },
        { id: 'step4', text: 'Review audit logs: what did the attacker access in those 2 minutes? (emails read, files downloaded, changes made)' },
        { id: 'step5', text: 'Re-enable account with new password + MFA enforced — notify user and brief them on what happened' },
      ],
      lesson: 'Impossible travel (Singapore → Russia in 2 min) = compromised account. Disable → Revoke sessions → Reset password → Investigate impact → Re-enable with MFA.',
    },
  },

  // ── NEW: CEO Phishing Email ────────────────────────────────────
  {
    id: 't6_008', title: { en: 'CEO Phishing Email Analysis', id: 'Analisis Email Phishing CEO' },
    category: 'security', difficulty: 'hard', areaKey: 'securityWing', requiredLevel: 74,
    xpReward: 860, coinReward: 170, puzzleType: 'sequence', npcAvatar: '👔', npcName: 'CISO',
    description: { en: 'CEO forwarded a suspicious email asking for wire transfer. Analyze headers and respond correctly.', id: 'CEO meneruskan email mencurigakan yang meminta transfer. Analisis header dan respons dengan benar.' },
    npcDialogue: [
      { npc: 'CISO', avatar: '👔', msgEn: 'The CEO just forwarded us an email from "chairman@company.com" asking him to urgently wire $85,000 to a vendor. CEO thinks it looks off. He was right.', msgId: 'CEO baru meneruskan email dari "chairman@company.com" yang memintanya transfer $85.000 ke vendor. CEO pikir ini mencurigakan. Dia benar.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Classic BEC — Business Email Compromise. Let me analyze the email headers. The display name might say "Chairman" but the actual sending domain will be different.', msgId: 'BEC klasik — Business Email Compromise. Saya akan analisis header email. Display name mungkin "Chairman" tapi domain pengirim sebenarnya akan berbeda.' },
      { npc: 'CISO', avatar: '👔', msgEn: 'Finance almost processed the wire! How does this attack work exactly?', msgId: 'Finance hampir memproses transfer! Bagaimana tepatnya serangan ini bekerja?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'BEC attackers register look-alike domains (company-corp.com vs company.com) or compromise a real account. They study org charts then impersonate executives to authorize fraudulent payments.', msgId: 'Penyerang BEC mendaftarkan domain mirip (company-corp.com vs company.com) atau mengkompromikan akun nyata. Mereka mempelajari bagan org lalu meniru eksekutif untuk mengotorisasi pembayaran palsu.' },
    ],
    sequenceData: {
      task: 'CEO received a suspicious email requesting an urgent $85,000 wire transfer supposedly from the Chairman. Analyze and respond in the correct order:',
      steps: [
        { id: 's1', text: 'Do NOT process any wire transfer — immediately alert Finance to hold all pending transfers until investigation completes' },
        { id: 's2', text: 'Analyze the email headers: check "From:" vs "Reply-To:" vs "Return-Path:" — look for domain spoofing (company-corp.com ≠ company.com)' },
        { id: 's3', text: 'Verify sender authenticity: check SPF/DKIM/DMARC records — a "FAIL" on any of these = spoofed email' },
        { id: 's4', text: 'Call the supposed sender (Chairman) directly on a known phone number — NEVER reply to the suspicious email' },
        { id: 's5', text: 'Block the spoofed sender domain, report to FBI IC3 (wire fraud), brief CEO and Finance on BEC attack patterns, implement dual-approval for wire transfers >$10k' },
      ],
      lesson: 'BEC (Business Email Compromise) = impersonating executives via email to authorize fraudulent wire transfers. Defense: SPF/DKIM/DMARC + caller verification + dual-approval for large transfers + employee training. Never verify suspicious wires via email alone.',
    },
  },

  // ── NEW: MFA Rollout Failure ───────────────────────────────────
  {
    id: 't6_009', title: { en: 'MFA Rollout Failure', id: 'Kegagalan Rollout MFA' },
    category: 'security', difficulty: 'hard', areaKey: 'securityWing', requiredLevel: 72,
    xpReward: 800, coinReward: 160, puzzleType: 'terminal', npcAvatar: '🔐', npcName: 'Azure Admin',
    description: { en: '30 users locked out after forced MFA enrollment — authenticator app not set up. Fix and rescue them.', id: '30 pengguna terkunci setelah enrollment MFA wajib — app authenticator belum diset. Perbaiki dan selamatkan mereka.' },
    npcDialogue: [
      { npc: 'Azure Admin', avatar: '🔐', msgEn: 'We enabled forced MFA in Azure AD and now 30 users are completely locked out. They never set up the Authenticator app and now can\'t get past the MFA prompt!', msgId: 'Kami mengaktifkan MFA paksa di Azure AD dan sekarang 30 pengguna terkunci total. Mereka tidak pernah setup Authenticator app dan sekarang tidak bisa melewati prompt MFA!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Classic rollout mistake — enforcing MFA before ensuring all users completed enrollment. We need to temporarily bypass MFA for affected users and walk them through setup.', msgId: 'Kesalahan rollout klasik — memaksakan MFA sebelum memastikan semua pengguna menyelesaikan enrollment. Kita perlu bypass sementara MFA untuk pengguna terdampak dan pandu mereka melalui setup.' },
      { npc: 'Azure Admin', avatar: '🔐', msgEn: 'Management is furious — 30 people can\'t work. What\'s the quickest fix?', msgId: 'Manajemen marah — 30 orang tidak bisa bekerja. Apa perbaikan tercepat?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Two steps: reset MFA registration for blocked users in Azure AD (gives them a fresh enrollment window), then use a temporary bypass (TAP — Temporary Access Pass) for users without phones.', msgId: 'Dua langkah: reset registrasi MFA untuk pengguna yang diblokir di Azure AD (memberi mereka jendela enrollment baru), lalu gunakan bypass sementara (TAP — Temporary Access Pass) untuk pengguna tanpa telepon.' },
    ],
    terminalData: {
      os: 'windows',
      intro: '🔐 MFA ROLLOUT EMERGENCY\nAzure AD Tenant: company.onmicrosoft.com\n30 users locked out — MFA enforced before enrollment completed.\nFix: Reset MFA registration + issue Temporary Access Pass (TAP)',
      tasks: [
        {
          id: 'mfa_list',
          instruction: '1. Find all users with failed MFA registration (no auth methods registered)',
          command: 'Get-MgUser -All | ForEach-Object { $methods = Get-MgUserAuthenticationMethod -UserId $_.Id; if ($methods.Count -le 1) { $_.UserPrincipalName } } | Select-Object -First 5',
          successOutput: 'budi@company.com\nsari@company.com\nwahyu@company.com\nrina@company.com\ndimas@company.com\n... (25 more)\n\n⚠️  30 users have NO authentication methods registered beyond password.',
          hint: 'Get-MgUser + Get-MgUserAuthenticationMethod from Microsoft Graph PowerShell',
          lesson: 'Microsoft Graph PowerShell (Get-Mg* cmdlets) manages Azure AD. Users with only 1 auth method (password) have no MFA enrolled — they get stuck at the MFA prompt.',
        },
        {
          id: 'mfa_reset',
          instruction: '2. Reset MFA registration for all affected users (gives them a new 14-day enrollment window)',
          command: 'Get-Content "C:\\locked_users.txt" | ForEach-Object { Revoke-MgUserSignInSession -UserId $_ ; Write-Host "Reset MFA for: $_" }',
          successOutput: 'Reset MFA for: budi@company.com\nReset MFA for: sari@company.com\nReset MFA for: wahyu@company.com\n... (27 more)\n\n✅ MFA registration reset for 30 users. They will be prompted to register on next login (14-day window).',
          hint: 'Revoke-MgUserSignInSession clears sessions and resets MFA registration state',
          lesson: 'Resetting MFA registration gives users a fresh enrollment window. They can log in with password only during the grace period to complete MFA setup.',
        },
        {
          id: 'mfa_tap',
          instruction: '3. Issue a Temporary Access Pass (TAP) for a user without a phone (budi@company.com)',
          command: 'New-MgUserAuthenticationTemporaryAccessPassMethod -UserId "budi@company.com" -IsUsableOnce $false -LifetimeInMinutes 480 | Select-Object TemporaryAccessPass,StartDateTime',
          successOutput: 'TemporaryAccessPass  StartDateTime\n-------------------  -------------\nTap2026!Secure       2026-05-19T22:00:00Z\n\n✅ TAP issued: "Tap2026!Secure" — valid for 8 hours.\nBudi can use this instead of MFA to log in and set up the Authenticator app.',
          hint: 'New-MgUserAuthenticationTemporaryAccessPassMethod creates a one-time or multi-use TAP',
          lesson: 'Temporary Access Pass (TAP) is a time-limited passcode that bypasses MFA — perfect for users who lost their phone or never enrolled. Set LifetimeInMinutes appropriately. TAP is a Microsoft Entra/Azure AD feature.',
        },
      ],
      successMsg: '🔐 30 users can now access their accounts! MFA enrollment guide sent. Lesson: always run MFA in Report-Only mode first to identify unenrolled users before enforcing.',
      lesson: 'MFA rollout best practice: Report-Only mode first → identify unenrolled users → communicate deadline → provide support → enforce. TAP provides emergency access for locked-out users. Never enforce MFA without a rollback plan.',
    },
  },

  // ── NEW: Suspicious VPN Login ──────────────────────────────────
  {
    id: 't6_010', title: { en: 'Suspicious VPN Login', id: 'Login VPN Mencurigakan' },
    category: 'security', difficulty: 'hard', areaKey: 'threatRoom', requiredLevel: 76,
    xpReward: 900, coinReward: 180, puzzleType: 'sequence', npcAvatar: '🕵️', npcName: 'SIEM Platform',
    description: { en: 'SIEM alert: VPN login from Indonesia then Russia 3 minutes apart. Impossible travel detected — respond!', id: 'Alert SIEM: login VPN dari Indonesia lalu Russia dalam 3 menit. Impossible travel terdeteksi — respons!' },
    npcDialogue: [
      { npc: 'SIEM Platform', avatar: '🕵️', msgEn: '[CRITICAL ALERT] User: john.doe@company.com — VPN login at 21:00 from Jakarta, Indonesia. VPN login at 21:03 from Moscow, Russia. Impossible travel detected (11,000 km in 3 minutes).', msgId: '[ALERT KRITIS] User: john.doe@company.com — Login VPN pukul 21:00 dari Jakarta, Indonesia. Login VPN pukul 21:03 dari Moscow, Russia. Perjalanan tidak mungkin terdeteksi.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'This is a clear account compromise. Someone in Russia stole John\'s credentials and is using the VPN right now while John is also logged in from Indonesia.', msgId: 'Ini jelas kompromi akun. Seseorang di Russia mencuri kredensial John dan menggunakan VPN sekarang sementara John juga login dari Indonesia.' },
      { npc: 'SIEM Platform', avatar: '🕵️', msgEn: 'The Russia session has been active for 4 minutes and has accessed the HR shared drive. Escalating to P1.', msgId: 'Sesi Russia telah aktif 4 menit dan telah mengakses HR shared drive. Mengeskalasi ke P1.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Containment NOW. Disable account, revoke all sessions, then investigate what was accessed.', msgId: 'Penahanan SEKARANG. Nonaktifkan akun, cabut semua sesi, lalu selidiki apa yang diakses.' },
    ],
    sequenceData: {
      task: 'SIEM detects impossible travel: john.doe account logged into VPN from Indonesia AND Russia 3 minutes apart. The Russia session is actively accessing data. Respond in the correct order:',
      steps: [
        { id: 's1', text: 'IMMEDIATELY disable john.doe in Active Directory and Azure AD — every second the attacker has access, more data is at risk' },
        { id: 's2', text: 'Revoke ALL active VPN and Azure AD sessions for john.doe — kill the Russia session that is currently active' },
        { id: 's3', text: 'Audit what the Russia session accessed: check VPN logs, file server access logs, email access — determine blast radius' },
        { id: 's4', text: 'Force password reset for john.doe — the current password is compromised. Enroll MFA before re-enabling the account' },
        { id: 's5', text: 'Contact john.doe directly (phone/in-person) to confirm the Indonesia session was legitimate — brief him, investigate how credentials were stolen (phishing? credential stuffing? dark web?)' },
      ],
      lesson: 'Impossible travel = compromised credentials. Response order: Disable → Revoke sessions → Audit impact → Reset password + add MFA → Re-enable. Check HaveIBeenPwned and dark web monitoring for stolen credentials.',
    },
  },

  // ── NEW: Ransomware Containment ────────────────────────────────
  {
    id: 't6_011', title: { en: 'Ransomware Containment', id: 'Penahanan Ransomware' },
    category: 'security', difficulty: 'epic', areaKey: 'secOps', requiredLevel: 78,
    xpReward: 1300, coinReward: 260, puzzleType: 'sequence', npcAvatar: '💀', npcName: 'INCIDENT: P0',
    description: { en: 'Ransomware encrypting files across 3 departments RIGHT NOW. Network segmentation and containment — go!', id: 'Ransomware mengenkripsi file di 3 departemen SEKARANG. Segmentasi jaringan dan penahanan — mulai!' },
    npcDialogue: [
      { npc: 'INCIDENT: P0', avatar: '💀', msgEn: '[P0 INCIDENT] 3 departments reporting files being renamed to .LOCKED extension — ransomware spreading via SMB share. 50+ PCs potentially infected. Rate: ~200 files/minute.', msgId: '[INSIDEN P0] 3 departemen melaporkan file diganti nama ke ekstensi .LOCKED — ransomware menyebar via SMB share. 50+ PC berpotensi terinfeksi. Kecepatan: ~200 file/menit.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'P0 ransomware incident! DO NOT REBOOT ANY MACHINES — it may trigger encryption of remaining files. Network isolation FIRST, then contain.', msgId: 'Insiden ransomware P0! JANGAN REBOOT MESIN APA PUN — mungkin memicu enkripsi file yang tersisa. Isolasi jaringan DULU, kemudian penahanan.' },
      { npc: 'INCIDENT: P0', avatar: '💀', msgEn: 'Finance department screaming — payroll data is in the affected share! Do we pay the ransom?', msgId: 'Departemen Finance berteriak — data penggajian ada di share yang terdampak! Apakah kita bayar tebusan?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'NO. We have verified backups from 4 hours ago. Paying funds criminal organizations and gives NO guarantee of decryption. Containment and restore from backup is our path.', msgId: 'TIDAK. Kita punya backup terverifikasi dari 4 jam lalu. Membayar mendanai organisasi kriminal dan tidak ada jaminan dekripsi. Penahanan dan restore dari backup adalah jalan kita.' },
    ],
    sequenceData: {
      task: 'CRITICAL P0: Ransomware actively encrypting files and spreading across 3 departments via SMB. 200 files per minute being encrypted. Arrange the containment response in the correct order:',
      steps: [
        { id: 's1', text: 'ISOLATE at the network switch — disable the trunk ports or VLANs for affected departments immediately. Do NOT shut down individual PCs yet (preserve forensic evidence in RAM)' },
        { id: 's2', text: 'Identify patient zero: correlate earliest encryption timestamps in file server logs with login/network events — find which machine started the spread' },
        { id: 's3', text: 'Disable SMB shares on the file server temporarily — this stops lateral movement via network shares (the primary ransomware spread vector)' },
        { id: 's4', text: 'Assess backup integrity: verify the last 3 backups are clean and pre-infection — confirm RPO (how much data will be lost in restore)' },
        { id: 's5', text: 'Wipe all confirmed infected machines and restore from last clean backup — patch the initial attack vector (phishing link? unpatched vulnerability?) before reconnecting to network' },
      ],
      lesson: 'Ransomware containment: network isolation FIRST (switch level, not PC) → find patient zero → kill SMB spread → verify backups → restore. Never pay ransom — it funds more attacks and doesn\'t guarantee decryption. Backups + network segmentation = ransomware resilience.',
    },
  },

  // ── NEW: Security Audit Checklist ─────────────────────────────
  {
    id: 't6_012', title: { en: 'Security Audit Checklist', id: 'Daftar Periksa Audit Keamanan' },
    category: 'security', difficulty: 'hard', areaKey: 'securityWing', requiredLevel: 78,
    xpReward: 430, coinReward: 90, puzzleType: 'sequence', npcAvatar: '📋', npcName: 'Audit Manager Dewi',
    description: { en: 'Annual security audit is due. Complete the IT security checklist in the correct systematic order!', id: 'Audit keamanan tahunan sudah jatuh tempo. Selesaikan daftar periksa keamanan IT dengan urutan sistematis yang benar!' },
    npcDialogue: [
      { npc: 'Audit Manager Dewi', avatar: '📋', msgEn: 'Our annual ISO 27001 audit is in two days and we haven\'t run the security checklist yet. The external auditors will check everything — accounts, firewall rules, backups, patches, and access controls.', msgId: 'Audit ISO 27001 tahunan kami dua hari lagi dan kami belum menjalankan daftar periksa keamanan. Auditor eksternal akan memeriksa segalanya — akun, aturan firewall, backup, patch, dan kontrol akses.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Understood. A security audit checklist has a specific order — you can\'t write the audit report before you\'ve actually checked everything. Let me walk through it systematically.', msgId: 'Mengerti. Daftar periksa audit keamanan memiliki urutan tertentu — Anda tidak bisa menulis laporan audit sebelum benar-benar memeriksa semuanya. Biarkan saya melaluinya secara sistematis.' },
      { npc: 'Audit Manager Dewi', avatar: '📋', msgEn: 'Last year we failed because we had 12 old accounts still active for ex-employees and admin accounts without MFA. We can\'t repeat that.', msgId: 'Tahun lalu kami gagal karena 12 akun lama masih aktif untuk mantan karyawan dan akun admin tanpa MFA. Kita tidak bisa mengulangi itu.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Perfect — that tells us exactly where to start. We audit user accounts first, then firewall, backups, patches, and privileged access. Each finding gets a risk rating. Report comes last once we have all the data.', msgId: 'Sempurna — itu memberi tahu kita persis di mana harus mulai. Kita audit akun pengguna dulu, lalu firewall, backup, patch, dan akses istimewa. Setiap temuan mendapat peringkat risiko. Laporan dibuat terakhir setelah kita punya semua data.' },
    ],
    sequenceData: {
      task: 'The annual security audit is in two days. Complete the IT security checklist in the correct systematic order — each step must be done before the next can be verified:',
      steps: [
        { id: 'step1', text: 'Audit user accounts — disable all accounts for ex-employees (compare AD against HR termination list), check Admin group membership for unauthorized additions' },
        { id: 'step2', text: 'Review firewall rules — remove unused/outdated ALLOW rules (any rule not matched in 90 days), verify no ANY-to-ANY rules exist on perimeter firewall' },
        { id: 'step3', text: 'Verify backup encryption is enabled — test-restore one backup set to confirm data integrity and that backups are actually usable' },
        { id: 'step4', text: 'Check patch levels on all systems — no Critical (CVSS 9+) patches pending more than 30 days, document any exceptions with business justification' },
        { id: 'step5', text: 'Review privileged access — confirm all admin accounts have MFA enrolled, then generate the audit report with all findings, risk ratings (Critical/High/Medium/Low), and remediation deadlines' },
      ],
      lesson: 'Security audit order: User accounts → Firewall rules → Backup integrity → Patch compliance → Privileged access → Report. You cannot write the findings report until you have completed all checks. Disable ex-employee accounts within 24h of termination — stale accounts are a top audit failure.',
    },
  },

  // ── NEW: SIEM Log Triage ───────────────────────────────────────
  {
    id: 't6_013', title: { en: 'SIEM Log Triage', id: 'Triase Log SIEM' },
    category: 'security', difficulty: 'hard', areaKey: 'threatRoom', requiredLevel: 79,
    xpReward: 420, coinReward: 85, puzzleType: 'quiz', npcAvatar: '🚨', npcName: 'SIEM Alert',
    description: { en: 'SIEM is showing 3,000 alerts this week. Learn to triage and prioritize security alerts like a SOC analyst!', id: 'SIEM menampilkan 3.000 alert minggu ini. Pelajari cara triase dan prioritaskan alert keamanan seperti analis SOC!' },
    npcDialogue: [
      { npc: 'SIEM Alert', avatar: '🚨', msgEn: '[SIEM PLATFORM] Weekly alert summary: 3,247 alerts generated. Breakdown — Critical: 12, High: 89, Medium: 634, Low: 2,512. SOC team is overwhelmed. We need to triage these properly.', msgId: '[PLATFORM SIEM] Ringkasan alert mingguan: 3.247 alert dibuat. Rincian — Kritis: 12, Tinggi: 89, Sedang: 634, Rendah: 2.512. Tim SOC kewalahan. Kita perlu triase dengan benar.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'This is a classic alert fatigue problem. A SIEM correlates logs from dozens of sources — firewalls, endpoints, servers, identity systems. Most alerts are noise. We need to find the real threats.', msgId: 'Ini masalah kelelahan alert klasik. SIEM mengkorelasikan log dari puluhan sumber — firewall, endpoint, server, sistem identitas. Sebagian besar alert adalah noise. Kita perlu menemukan ancaman nyata.' },
      { npc: 'SIEM Alert', avatar: '🚨', msgEn: 'The 12 Critical alerts — some could be false positives from our new vulnerability scanner that started running yesterday. How do we tell the difference?', msgId: '12 alert Kritis — beberapa bisa false positive dari vulnerability scanner baru yang mulai berjalan kemarin. Bagaimana kita membedakannya?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'A true positive is a real attack — confirmed by corroborating evidence from multiple log sources. A false positive is a benign action that triggered the rule. Correlate the alert with context: who, what, when, where, why. If a vulnerability scanner hits your own IPs — that\'s a false positive by design.', msgId: 'True positive adalah serangan nyata — dikonfirmasi oleh bukti pendukung dari beberapa sumber log. False positive adalah tindakan jinak yang memicu aturan. Korelasikan alert dengan konteks: siapa, apa, kapan, di mana, mengapa. Jika vulnerability scanner menghit IP sendiri — itu false positive by design.' },
    ],
    quizData: {
      questions: [
        {
          q: 'What does a SIEM system do, and which log sources does it typically correlate?',
          options: [
            'A. SIEM only monitors network traffic from firewalls — it cannot process endpoint or server logs',
            'B. SIEM collects and correlates logs from firewalls, endpoints, servers, identity providers, and cloud services to detect threats across the entire environment',
            'C. SIEM is an antivirus platform that blocks malware in real time on individual workstations',
            'D. SIEM replaces firewalls by acting as the single point of traffic inspection for the entire network',
          ],
          answer: 1,
          explain: 'SIEM (Security Information and Event Management) aggregates and correlates logs from ALL sources — firewalls, endpoint detection (EDR), servers, Active Directory, cloud platforms, etc. Its power is in correlation: detecting patterns across multiple systems that no single tool would catch alone.',
        },
        {
          q: 'Your SIEM shows 3,000 alerts this week: 12 Critical, 89 High, 634 Medium, 2,512 Low. How should you prioritize?',
          options: [
            'A. Work through all 2,512 Low alerts first — volume means they are the most likely real threats',
            'B. Investigate Medium alerts first since they represent the largest group of potentially real issues',
            'C. Start with Critical (P1) alerts — active exploitation, lateral movement, and data exfiltration must be triaged first regardless of volume',
            'D. Ignore all alerts until the count drops below 100 — high alert volume indicates the SIEM rules need tuning first',
          ],
          answer: 2,
          explain: 'SOC triage priority: Critical P1 first (active exploitation, lateral movement, data exfiltration), then High P2, then Medium P3. Low alerts are handled last or automated. Volume does NOT determine priority — severity and potential impact do. After triaging Criticals, tune rules to reduce low-fidelity noise.',
        },
        {
          q: 'In a SIEM context, what is the difference between a false positive and a true positive?',
          options: [
            'A. False positive = real attack that was detected; True positive = real attack that was missed by the SIEM',
            'B. False positive = SIEM alert triggered by a benign action (no real threat); True positive = SIEM alert triggered by a genuine malicious event confirmed by corroborating evidence',
            'C. False positive = low severity alert; True positive = high severity alert — the terms describe severity, not accuracy',
            'D. False positive and true positive are identical terms used in different vendor documentation for the same type of confirmed security event',
          ],
          answer: 1,
          explain: 'False Positive (FP): alert fired but no real threat — e.g., your own vulnerability scanner triggering IDS rules. True Positive (TP): alert fired AND confirmed as a real attack via corroborating evidence. False Negative (FN): real attack that SIEM missed. High FP rate = alert fatigue. Tune rules to reduce FPs without creating FNs.',
        },
      ],
    },
  },

  // ── NEW: Social Engineering Defense Training ───────────────────
  {
    id: 't6_014', title: { en: 'Social Engineering Defense Training', id: 'Pelatihan Pertahanan Social Engineering' },
    category: 'security', difficulty: 'medium', areaKey: 'securityWing', requiredLevel: 78,
    xpReward: 280, coinReward: 55, puzzleType: 'dialogue', npcAvatar: '📞', npcName: 'Unknown Caller',
    description: { en: 'An unknown caller claims to be the CEO and demands an immediate password reset. Is this legitimate? Handle it correctly!', id: 'Penelepon tidak dikenal mengklaim sebagai CEO dan menuntut reset password segera. Apakah ini sah? Tangani dengan benar!' },
    npcDialogue: [
      { npc: 'Unknown Caller', avatar: '📞', msgEn: 'Hello, this is CEO Budi Santoso. I\'m at the airport and my laptop password expired. I need you to reset it RIGHT NOW — I have a board presentation in 20 minutes and I can\'t lose this deal!', msgId: 'Halo, ini CEO Budi Santoso. Saya di bandara dan password laptop saya kedaluwarsa. Saya perlu Anda mereset SEKARANG — saya punya presentasi dewan dalam 20 menit dan saya tidak bisa kehilangan deal ini!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'I understand the urgency. However, I need to follow our identity verification policy before making any account changes, regardless of who is calling.', msgId: 'Saya memahami urgensinya. Namun, saya perlu mengikuti kebijakan verifikasi identitas kami sebelum melakukan perubahan akun apa pun, terlepas dari siapa yang menelepon.' },
      { npc: 'Unknown Caller', avatar: '📞', msgEn: 'This is ridiculous! I am the CEO! Are you really going to make ME go through verification? Just reset the password — that\'s an order!', msgId: 'Ini konyol! Saya adalah CEO! Apakah Anda benar-benar akan membuat SAYA melalui verifikasi? Cukup reset password — itu perintah!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'Our security policy protects everyone, including the CEO. Bypassing verification is how attackers gain access to executive accounts. I\'ll verify your identity through our official HR system and process the reset through the standard secure channel.', msgId: 'Kebijakan keamanan kami melindungi semua orang, termasuk CEO. Melewati verifikasi adalah bagaimana penyerang mendapatkan akses ke akun eksekutif. Saya akan memverifikasi identitas Anda melalui sistem HR resmi kami dan memproses reset melalui saluran aman standar.' },
    ],
    dialogueData: {
      scenario: 'You are working the IT help desk. An unknown caller claims to be CEO Budi Santoso, demanding an immediate password reset without going through normal verification procedures. The caller is aggressive and uses urgency as pressure. This is a classic vishing (voice phishing) / social engineering attack. How do you respond?',
      messages: [
        { role: 'user', text: '📞 "Hello, this is CEO Budi Santoso. I\'m at the airport — my laptop password expired and I have a board presentation in 20 minutes. Reset my password RIGHT NOW, this is an order!"' },
        { role: 'choices', options: [
          {
            text: 'Reset the password immediately — it\'s the CEO and the urgency is real. You don\'t want to cause the company to lose a deal.',
            correct: false,
            feedback: '❌ Wrong! This is exactly what social engineers count on — urgency + authority = bypassed security. You have no way to verify this is actually the CEO. Attackers research executive names from LinkedIn/company websites. NEVER bypass identity verification for ANY caller, regardless of claimed rank. If this were a real attacker, you just gave them executive account access.',
          },
          {
            text: 'Verify the caller\'s identity through the official HR system (employee ID + manager confirmation), then follow the standard password reset process with MFA re-enrollment.',
            correct: true,
            feedback: '✅ Correct! This is exactly the right response. Verify identity through an independent trusted channel (HR system, not information the caller gives you). Then follow standard reset procedures. Security policy applies equally to everyone — including executives. Real executives understand security. Attackers use urgency and authority to pressure you into skipping steps.',
          },
          {
            text: 'Hang up immediately without explanation — any suspicious call should be terminated.',
            correct: false,
            feedback: '❌ Not ideal. While refusing to comply is better than resetting the password, hanging up without explanation is unprofessional and provides no educational value. If this were the real CEO locked out legitimately, they would be left without help. The correct approach is to acknowledge the request, explain you must verify identity per policy, and offer the proper verification pathway.',
          },
        ]},
      ],
    },
  },

  // ── NEW: Data Loss Prevention Policy ──────────────────────────
  {
    id: 't6_015', title: { en: 'Data Loss Prevention Policy', id: 'Kebijakan Pencegahan Kehilangan Data' },
    category: 'security', difficulty: 'hard', areaKey: 'secOps', requiredLevel: 80,
    xpReward: 440, coinReward: 95, puzzleType: 'sequence', npcAvatar: '📊', npcName: 'Compliance Officer Budi',
    description: { en: 'After an employee accidentally emailed customer data externally, implement a DLP policy from scratch!', id: 'Setelah karyawan tidak sengaja mengirim data pelanggan ke eksternal, implementasikan kebijakan DLP dari awal!' },
    npcDialogue: [
      { npc: 'Compliance Officer Budi', avatar: '📊', msgEn: 'We had an incident last week — an employee accidentally emailed a spreadsheet with 2,000 customer credit card numbers to an external partner. GDPR and PCI DSS require us to report this AND implement controls to prevent recurrence.', msgId: 'Kami memiliki insiden minggu lalu — seorang karyawan tidak sengaja mengirim spreadsheet dengan 2.000 nomor kartu kredit pelanggan ke mitra eksternal. GDPR dan PCI DSS mengharuskan kami melaporkan ini DAN menerapkan kontrol untuk mencegah berulangnya.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'A DLP (Data Loss Prevention) policy is exactly what we need. But you can\'t configure DLP rules until you know WHAT sensitive data you have and WHERE it lives. Data discovery and classification come first.', msgId: 'Kebijakan DLP (Data Loss Prevention) adalah tepat yang kita butuhkan. Tapi Anda tidak bisa mengkonfigurasi aturan DLP sampai Anda tahu APA data sensitif yang Anda miliki dan DI MANA lokasinya. Penemuan dan klasifikasi data harus lebih dulu.' },
      { npc: 'Compliance Officer Budi', avatar: '📊', msgEn: 'We also have employees using USB drives to take work home. That\'s another data leakage risk that worries me from a compliance standpoint.', msgId: 'Kami juga punya karyawan yang menggunakan USB drive untuk membawa pekerjaan ke rumah. Itu adalah risiko kebocoran data lain yang mengkhawatirkan saya dari sudut pandang kepatuhan.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'DLP covers both channels — email gateway and endpoint. We\'ll configure email DLP to block emails with 10+ credit card numbers, and endpoint DLP to block USB for Restricted data. But we must test before we deploy, and train employees on the new policy.', msgId: 'DLP mencakup kedua saluran — email gateway dan endpoint. Kita akan mengkonfigurasi DLP email untuk memblokir email dengan 10+ nomor kartu kredit, dan DLP endpoint untuk memblokir USB untuk data Terbatas. Tapi kita harus menguji sebelum deploy, dan melatih karyawan tentang kebijakan baru.' },
    ],
    sequenceData: {
      task: 'After a data leak incident involving customer credit card numbers, implement a DLP (Data Loss Prevention) policy. Arrange the implementation steps in the correct order:',
      steps: [
        { id: 'step1', text: 'Audit and discover what sensitive data exists in the organization — scan file servers, email, cloud storage for PII (names, IDs), financial records (credit card numbers), and intellectual property' },
        { id: 'step2', text: 'Classify all discovered data into sensitivity levels: Public / Internal / Confidential / Restricted — document where each category lives and who has access' },
        { id: 'step3', text: 'Configure DLP rules in the email gateway — create policy to BLOCK outbound emails containing 10 or more credit card numbers (PCI pattern), alert on 1–9 CCNs, log all matches for audit' },
        { id: 'step4', text: 'Test the DLP rules by sending test emails containing fake CCN patterns (test data only) — verify BLOCK triggers correctly without false positives on legitimate financial emails' },
        { id: 'step5', text: 'Deploy endpoint DLP to block USB/removable media for Restricted-classified data, then run mandatory employee training on the new DLP policy, data classification scheme, and how to securely share sensitive data' },
      ],
      lesson: 'DLP implementation order: Discover → Classify → Configure rules → Test (NEVER skip!) → Deploy endpoint controls → Train employees. You cannot write classification rules for data you haven\'t inventoried. Testing prevents false positives that block legitimate business operations. PCI DSS requires DLP for cardholder data.',
    },
  },

  // ── NEW: Incident Response Runbook ────────────────────────────
  {
    id: 't6_016', title: { en: 'Incident Response Runbook', id: 'Runbook Respons Insiden' },
    category: 'security', difficulty: 'epic', areaKey: 'threatRoom', requiredLevel: 82,
    xpReward: 560, coinReward: 145, puzzleType: 'sequence', npcAvatar: '🚨', npcName: 'CISO Alert',
    description: { en: 'A server has been compromised. Follow the proper NIST incident response lifecycle — in the right order!', id: 'Sebuah server telah dikompromikan. Ikuti siklus respons insiden NIST yang tepat — dalam urutan yang benar!' },
    npcDialogue: [
      { npc: 'CISO Alert', avatar: '🚨', msgEn: '[P1 INCIDENT] IDS alert confirmed: web server WEB-PROD-01 was breached 2 hours ago via SQL injection. Attacker has been in the system for 2 hours. Unknown what data was accessed or whether they have lateral movement.', msgId: '[INSIDEN P1] Alert IDS dikonfirmasi: web server WEB-PROD-01 diretas 2 jam lalu via SQL injection. Penyerang telah berada di sistem selama 2 jam. Tidak diketahui data apa yang diakses atau apakah mereka bergerak lateral.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'P1 server breach — we follow NIST SP 800-61 incident response: Identification → Containment → Eradication → Recovery → Lessons Learned. Order matters. If we go straight to restore, we lose forensic evidence.', msgId: 'Pembobolan server P1 — kita ikuti respons insiden NIST SP 800-61: Identifikasi → Penahanan → Pemberantasan → Pemulihan → Pelajaran. Urutan penting. Jika kita langsung restore, kita kehilangan bukti forensik.' },
      { npc: 'CISO Alert', avatar: '🚨', msgEn: 'Management wants the server back online ASAP — it\'s a production web server. Can\'t we just restore from backup and deal with forensics later?', msgId: 'Manajemen ingin server kembali online sesegera mungkin — itu web server produksi. Tidak bisakah kita langsung restore dari backup dan urus forensik nanti?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'No — if we restore without eradication, we restore the backdoor too. And restoring without forensics means we never know how they got in, so they\'ll just come back. Containment first, then forensic copy, then eradication, then restore. Report to management within 24h per our IR policy.', msgId: 'Tidak — jika kita restore tanpa eradikasi, kita juga merestore backdoor. Dan restore tanpa forensik berarti kita tidak pernah tahu bagaimana mereka masuk, jadi mereka akan kembali lagi. Penahanan dulu, lalu salinan forensik, lalu eradikasi, lalu restore. Laporkan ke manajemen dalam 24 jam sesuai kebijakan IR kita.' },
    ],
    sequenceData: {
      task: 'Server WEB-PROD-01 was confirmed breached via SQL injection. Attacker has had 2 hours of access. Follow the NIST SP 800-61 incident response lifecycle in the correct order:',
      steps: [
        { id: 'step1', text: 'IDENTIFICATION: Confirm breach scope — correlate IDS alert with server access logs, WAF logs, and database query logs to establish what the attacker accessed, when they entered, and whether lateral movement occurred' },
        { id: 'step2', text: 'CONTAINMENT: Isolate the compromised server by moving it to a quarantine VLAN — maintain connectivity for forensic investigation but block all inbound/outbound internet traffic immediately' },
        { id: 'step3', text: 'ERADICATION: Take a forensic disk image (bit-for-bit copy) for legal evidence BEFORE making changes, then remove the malware/backdoor, patch the SQL injection vulnerability, and rotate all credentials that the server had access to' },
        { id: 'step4', text: 'RECOVERY: Restore the server from the last verified clean backup (pre-breach), verify system integrity using cryptographic file hash comparison against known-good baseline, then gradually return to production with enhanced monitoring' },
        { id: 'step5', text: 'LESSONS LEARNED: Document the full incident timeline and root cause analysis, update IDS/WAF detection rules to catch this attack pattern, present findings and updated controls to management within 24 hours of resolution' },
      ],
      lesson: 'NIST IR lifecycle: Identification → Containment → Eradication → Recovery → Lessons Learned. NEVER skip Containment to go straight to Recovery — you\'ll restore the backdoor. NEVER skip forensics before Eradication — you\'ll lose evidence needed to understand the breach and prevent recurrence. Patch the root cause BEFORE reconnecting to network.',
    },
  },

  // ── NEW: Zero-Day Patch Emergency ─────────────────────────────
  {
    id: 't6_017', title: { en: 'Zero-Day Patch Emergency', id: 'Darurat Patch Zero-Day' },
    category: 'security', difficulty: 'epic', areaKey: 'secOps', requiredLevel: 83,
    xpReward: 580, coinReward: 155, puzzleType: 'sequence', npcAvatar: '🔴', npcName: 'CISO Maya',
    description: { en: 'CVSS 9.8 zero-day for Windows Print Spooler disclosed publicly. Emergency patching procedure — every minute counts!', id: 'Zero-day CVSS 9.8 untuk Windows Print Spooler diungkap publik. Prosedur patching darurat — setiap menit sangat penting!' },
    npcDialogue: [
      { npc: 'CISO Maya', avatar: '🔴', msgEn: '[CRITICAL ADVISORY] CVE-2026-XXXX disclosed 1 hour ago: Windows Print Spooler remote code execution, CVSS 9.8, no authentication required. Proof-of-concept exploit already published. We have 200 Windows servers. We don\'t know how many run Print Spooler.', msgId: '[ADVISORY KRITIS] CVE-2026-XXXX diungkap 1 jam lalu: eksekusi kode jarak jauh Windows Print Spooler, CVSS 9.8, tidak perlu autentikasi. Exploit proof-of-concept sudah dipublikasikan. Kami punya 200 server Windows. Kami tidak tahu berapa banyak yang menjalankan Print Spooler.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'CVSS 9.8 with a public PoC exploit means we\'re likely already being scanned for this. We cannot patch 200 servers directly — we need emergency procedures. First, disable the service on exposed servers before the patch is even tested.', msgId: 'CVSS 9.8 dengan exploit PoC publik berarti kita kemungkinan sudah dipindai untuk ini. Kita tidak bisa langsung patch 200 server — kita perlu prosedur darurat. Pertama, nonaktifkan layanan di server yang terbuka sebelum patch bahkan diuji.' },
      { npc: 'CISO Maya', avatar: '🔴', msgEn: 'Microsoft just released an emergency out-of-band patch. Can\'t we just push it immediately to all 200 servers via WSUS right now?', msgId: 'Microsoft baru saja merilis patch darurat out-of-band. Tidak bisakah kita langsung mendorongnya ke semua 200 server via WSUS sekarang?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: 'No — emergency patches can have side effects. We test in dev first (30 minutes), then staged rollout: non-critical servers first, monitor for 1 hour, then production in a maintenance window. Patching all 200 at once risks taking down the whole company if the patch causes issues.', msgId: 'Tidak — patch darurat bisa memiliki efek samping. Kita uji di dev dulu (30 menit), lalu rollout bertahap: server non-kritis dulu, monitor selama 1 jam, lalu produksi dalam jendela pemeliharaan. Patching semua 200 sekaligus berisiko mematikan seluruh perusahaan jika patch menyebabkan masalah.' },
    ],
    sequenceData: {
      task: 'CVE-2026-XXXX: Critical zero-day (CVSS 9.8) in Windows Print Spooler — remote code execution, no auth required, public exploit available. You have 200 Windows servers. Execute the emergency patching procedure in the correct order:',
      steps: [
        { id: 'step1', text: 'ASSESS EXPOSURE IMMEDIATELY: Query all servers to identify which ones have Print Spooler service running (sc query spooler / WSUS inventory), determine which are internet-facing — these are highest priority for immediate action' },
        { id: 'step2', text: 'TEMPORARY MITIGATION NOW: Disable Print Spooler service on all critical and internet-facing servers immediately (Stop-Service Spooler; Set-Service Spooler -StartupType Disabled) — this eliminates the attack surface while the patch is tested' },
        { id: 'step3', text: 'TEST PATCH IN DEV ENVIRONMENT: Deploy the emergency Microsoft patch to 2–3 dev/test servers, run application compatibility tests for 30 minutes — confirm no service disruptions, database connectivity issues, or reboot loops before production rollout' },
        { id: 'step4', text: 'STAGED PRODUCTION ROLLOUT: Deploy patch to non-critical servers first (dev, test, internal tools servers), monitor system health metrics and application functionality for 1 hour before proceeding to critical production systems' },
        { id: 'step5', text: 'PRODUCTION SERVERS + VERIFICATION: Deploy patch to all production servers during the next maintenance window, then use WSUS/SCCM compliance report to verify 100% patch coverage — update vulnerability scan baseline and document emergency change in CAB' },
      ],
      lesson: 'Zero-day emergency patching order: Assess exposure → Mitigate immediately (disable service) → Test patch in dev (NEVER skip!) → Staged rollout non-critical first → Production in maintenance window → Verify coverage. CVSS 9.8 + public PoC = treat as active exploitation in progress. Temporary mitigation buys you time to patch safely without blind-deploying an untested patch to 200 production servers.',
    },
  },
];
