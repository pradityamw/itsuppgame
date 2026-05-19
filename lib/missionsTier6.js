// TIER 6 MISSIONS — Security Specialist (Level 70–90)
// Areas: secOps, securityWing, threatRoom

export const MISSIONS_TIER6 = [
  {
    // ── INTERACTIVE: sequence (malware isolation) ──
    id: 't6_001', title: { en: 'Isolate Infected PC', id: 'Isolasi PC yang Terinfeksi' },
    category: 'security', difficulty: 'hard', areaKey: 'secOps', requiredLevel: 70,
    xpReward: 900, coinReward: 180, puzzleType: 'sequence', npcAvatar: '🚨', npcName: 'SOC Alert',
    description: { en: 'Malware detected on employee PC. Execute the isolation procedure in the correct order!', id: 'Malware terdeteksi di PC karyawan. Laksanakan prosedur isolasi dengan urutan yang benar!' },
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
];
