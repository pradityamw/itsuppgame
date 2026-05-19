// TIER 3 MISSIONS — Windows IT Support (Level 20–35)
// Areas: startupOffice, schoolLab, smallBizOffice

export const MISSIONS_TIER3 = [
  {
    // ── INTERACTIVE: sequence (BSOD recovery) ──
    id: 't3_001', title: { en: 'Blue Screen of Death (BSOD)', id: 'Blue Screen of Death (BSOD)' },
    category: 'os', difficulty: 'medium', areaKey: 'startupOffice', requiredLevel: 20,
    xpReward: 350, coinReward: 65, puzzleType: 'sequence', npcAvatar: '😱', npcName: 'Kevin',
    description: { en: 'Developer\'s PC keeps getting BSOD DRIVER_IRQL errors after update. Fix it step by step!', id: 'PC developer terus BSOD DRIVER_IRQL setelah update. Perbaiki langkah demi langkah!' },
    sequenceData: {
      task: 'PC crashes to BSOD: DRIVER_IRQL_NOT_LESS_OR_EQUAL after a Windows Update. Put the correct recovery steps in order:',
      steps: [
        { id: 'step1', text: 'Hold Shift + click Restart → Troubleshoot → Advanced Options → Startup Settings → Restart into Safe Mode' },
        { id: 'step2', text: 'In Safe Mode, open Device Manager — look for yellow ⚠️ exclamation marks on drivers' },
        { id: 'step3', text: 'Right-click the problematic driver → Roll Back Driver (or Uninstall Device)' },
        { id: 'step4', text: 'Open WhoCrashed or WinDbg → analyze latest minidump in C:\\Windows\\Minidump' },
        { id: 'step5', text: 'Restart normally — if stable, download updated driver from manufacturer\'s website' },
      ],
      lesson: 'BSOD = driver or hardware problem. Boot Safe Mode → analyze dump with WhoCrashed → roll back or update the bad driver.',
    },
  },
  {
    // ── INTERACTIVE: terminal (startup programs) ──
    id: 't3_002', title: { en: 'Remove Startup Bloatware', id: 'Hapus Bloatware Startup' },
    category: 'os', difficulty: 'easy', areaKey: 'startupOffice', requiredLevel: 20,
    xpReward: 240, coinReward: 45, puzzleType: 'terminal', npcAvatar: '🧑‍💼', npcName: 'Bos Hana',
    description: { en: 'New work laptop boots in 5 minutes. Use PowerShell to investigate and clean startup items.', id: 'Laptop kerja baru butuh 5 menit untuk boot. Gunakan PowerShell untuk investigasi dan bersihkan startup.' },
    terminalData: {
      os: 'windows',
      intro: 'Laptop boots very slowly. Use Task Manager CLI and PowerShell to find and disable startup bloatware.',
      tasks: [
        {
          id: 'task1',
          instruction: 'List all startup programs and their impact using PowerShell:',
          command: 'Get-CimInstance Win32_StartupCommand | Select-Object Name, Command, Location | Format-Table',
          hint: 'Type: Get-CimInstance Win32_StartupCommand | Select-Object Name, Command, Location | Format-Table',
          successOutput: `Name              Command                            Location
----              -------                            --------
OneDrive          "C:\\OneDrive\\OneDrive.exe" /bg     HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
Spotify           "C:\\Spotify\\Spotify.exe"           HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
Teams             "C:\\Teams\\Teams.exe" --processStart HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
Steam             "C:\\Steam\\Steam.exe" -silent        HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run`,
          lesson: 'This lists all programs that auto-start with Windows. Non-essential ones slow down boot time.',
        },
        {
          id: 'task2',
          instruction: 'Disable Spotify from startup via registry (safe to disable):',
          command: 'Remove-ItemProperty -Path "HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run" -Name "Spotify"',
          hint: 'Type: Remove-ItemProperty -Path "HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run" -Name "Spotify"',
          successOutput: `[OK] Spotify removed from startup registry key.
Boot impact reduced: HIGH → LOW`,
          lesson: 'Removing non-essential startup items directly from the registry is clean and effective.',
        },
        {
          id: 'task3',
          instruction: 'Verify Spotify no longer appears in the startup list:',
          command: 'Get-CimInstance Win32_StartupCommand | Select-Object Name | Format-Table',
          hint: 'Type: Get-CimInstance Win32_StartupCommand | Select-Object Name | Format-Table',
          successOutput: `Name
----
OneDrive
Teams
Steam

[✓] Spotify is no longer in startup. Boot time improved!`,
          lesson: 'Always verify your changes. Task Manager → Startup tab shows the same info visually.',
        },
      ],
      successMsg: '🚀 Startup cleaned! Boot time reduced from 5 minutes to under 60 seconds.',
      lesson: 'Task Manager → Startup tab (or PowerShell) manages startup programs. Disable non-essential items like Spotify, Steam, and Discord from auto-launching.',
    },
  },
  {
    // ── INTERACTIVE: terminal (driver fix) ──
    id: 't3_003', title: { en: 'Reinstall Missing Driver', id: 'Instal Ulang Driver yang Hilang' },
    category: 'os', difficulty: 'medium', areaKey: 'schoolLab', requiredLevel: 21,
    xpReward: 310, coinReward: 60, puzzleType: 'terminal', npcAvatar: '👩‍🏫', npcName: 'Bu Sari',
    description: { en: 'Sound stopped working on school PC after Windows update. Use CMD to diagnose and fix.', id: 'Suara mati di PC sekolah setelah Windows update. Gunakan CMD untuk diagnosa dan perbaiki.' },
    terminalData: {
      os: 'windows',
      intro: 'Audio stopped working after Windows Update. Use Device Manager CLI to find and fix the driver issue.',
      tasks: [
        {
          id: 'task1',
          instruction: 'Check all devices with driver problems using DISM/pnputil:',
          command: 'pnputil /enum-devices /problem',
          hint: 'Type: pnputil /enum-devices /problem',
          successOutput: `Microsoft PnP Utility

Instance ID:         HDAUDIO\\FUNC_01&VEN_10EC&DEV_0897
Device Description:  Realtek High Definition Audio
Class:               Media
Driver Name:         oem14.inf
Driver Status:       Problem: Code 10 (Device cannot start)
Problem Code:        CM_PROB_FAILED_START`,
          lesson: 'pnputil shows devices with driver errors. Code 10 = device cannot start — usually a driver mismatch.',
        },
        {
          id: 'task2',
          instruction: 'Uninstall the broken audio driver:',
          command: 'pnputil /delete-driver oem14.inf /uninstall /force',
          hint: 'Type: pnputil /delete-driver oem14.inf /uninstall /force',
          successOutput: `Microsoft PnP Utility

Driver package deleted successfully.
Device driver uninstalled: HDAUDIO\\FUNC_01&VEN_10EC&DEV_0897
[OK] Realtek audio driver removed. Device shows as "Unknown Device" — ready for reinstall.`,
          lesson: 'Force-removing the broken driver clears the corrupted state. Next step: install the correct version.',
        },
        {
          id: 'task3',
          instruction: 'Scan for hardware changes to trigger Windows driver reinstall:',
          command: 'pnputil /scan-devices',
          hint: 'Type: pnputil /scan-devices',
          successOutput: `Microsoft PnP Utility

Scanning for hardware changes...
Found: HDAUDIO\\FUNC_01&VEN_10EC&DEV_0897 — Realtek HD Audio
Driver installed successfully from Windows Update.
[✓] Audio device now working — Code 10 resolved!`,
          lesson: 'Windows can auto-find drivers after you clear the corrupted one. If this fails, manually download from Realtek\'s website.',
        },
      ],
      successMsg: '🔊 Sound is back! Realtek HD Audio driver reinstalled successfully.',
      lesson: 'Device Manager → yellow warning = driver problem. pnputil can remove bad drivers via CLI. Windows Update often provides the correct replacement.',
    },
  },
  {
    // ── INTERACTIVE: terminal (SFC / DISM repair) ──
    id: 't3_004', title: { en: 'Fix Corrupted System Files', id: 'Perbaiki File Sistem yang Rusak' },
    category: 'os', difficulty: 'medium', areaKey: 'smallBizOffice', requiredLevel: 22,
    xpReward: 330, coinReward: 65, puzzleType: 'terminal', npcAvatar: '😤', npcName: 'Pak Wahyu',
    description: { en: 'Windows keeps throwing random errors. Run SFC and DISM to repair it!', id: 'Windows terus error acak. Jalankan SFC dan DISM untuk memperbaikinya!' },
    terminalData: {
      os: 'windows',
      intro: 'Windows is throwing random errors and some apps won\'t open. System files may be corrupted. Run as Administrator.',
      tasks: [
        {
          id: 'task1',
          instruction: 'Run System File Checker to scan for corrupted Windows files:',
          command: 'sfc /scannow',
          hint: 'Type: sfc /scannow',
          successOutput: `Beginning system scan. This process will take some time.

Beginning verification phase of system scan.
Verification 100% complete.

Windows Resource Protection found corrupt files but was unable to fix some of them.
Details: CBS.log windir\\Logs\\CBS\\CBS.log

[!] SFC could not fix all files — DISM repair needed first.`,
          lesson: 'SFC /scannow checks all protected system files. If it can\'t fix them, DISM must repair the Windows image first.',
        },
        {
          id: 'task2',
          instruction: 'Run DISM to repair the Windows component store (downloads fresh files):',
          command: 'DISM /Online /Cleanup-Image /RestoreHealth',
          hint: 'Type: DISM /Online /Cleanup-Image /RestoreHealth',
          successOutput: `Deployment Image Servicing and Management tool

Image Version: 10.0.22621.3155

[==================================================] 100.0%

The restore operation completed successfully.
The operation completed successfully.

[✓] Windows component store repaired. Now run SFC again.`,
          lesson: 'DISM downloads verified Windows files from Microsoft servers and restores the component store SFC relies on.',
        },
        {
          id: 'task3',
          instruction: 'Run SFC again — now it can fix the remaining corrupt files:',
          command: 'sfc /scannow',
          hint: 'Type: sfc /scannow',
          successOutput: `Beginning system scan. This process will take some time.

Beginning verification phase of system scan.
Verification 100% complete.

Windows Resource Protection found corrupt files and successfully repaired them.
Details: CBS.log windir\\Logs\\CBS\\CBS.log

[✓] All system files repaired! Restart Windows to apply fixes.`,
          lesson: 'SFC → DISM → SFC is the standard Windows repair sequence. DISM first gives SFC the good files it needs to repair from.',
        },
      ],
      successMsg: '🛡️ Windows system files fully repaired! Random errors should be gone after restart.',
      lesson: 'SFC → DISM → SFC again is the standard Windows repair sequence for system file corruption. Always run as Administrator.',
    },
  },
  {
    // ── INTERACTIVE: sequence (user account setup) ──
    id: 't3_005', title: { en: 'Create User Accounts', id: 'Buat Akun Pengguna' },
    category: 'os', difficulty: 'easy', areaKey: 'smallBizOffice', requiredLevel: 20,
    xpReward: 220, coinReward: 40, puzzleType: 'sequence', npcAvatar: '👩‍💼', npcName: 'Manajer HR',
    description: { en: 'New employees need Windows accounts with correct permissions. Set them up properly!', id: 'Karyawan baru perlu akun Windows dengan permission yang benar. Siapkan dengan benar!' },
    sequenceData: {
      task: 'Set up a secure Standard User account for a new employee on a company Windows PC. Arrange the steps in the correct order:',
      steps: [
        { id: 'step1', text: 'Open Settings → Accounts → Family & other users → Add someone else to this PC' },
        { id: 'step2', text: 'Choose "I don\'t have this person\'s sign-in info" → Add a user without a Microsoft account' },
        { id: 'step3', text: 'Enter username (e.g., "staff_budi") and a strong password → create account' },
        { id: 'step4', text: 'Click the new account → Change account type → Select "Standard User" (NOT Administrator)' },
        { id: 'step5', text: 'Log in as the new user to verify access is correct — they cannot install software or change system settings' },
      ],
      lesson: 'Principle of Least Privilege: give employees Standard User accounts. Admin rights should only be granted when absolutely necessary.',
    },
  },
  {
    // ── INTERACTIVE: sequence (Windows Update stuck) ──
    id: 't3_006', title: { en: 'Windows Update Stuck', id: 'Windows Update Macet' },
    category: 'os', difficulty: 'medium', areaKey: 'schoolLab', requiredLevel: 22,
    xpReward: 300, coinReward: 55, puzzleType: 'sequence', npcAvatar: '😩', npcName: '20 Students',
    description: { en: '20 school PCs stuck on "Configuring Windows Updates: 35%". Fix them!', id: '20 PC sekolah macet di "Mengonfigurasi Pembaruan Windows: 35%". Perbaiki!' },
    sequenceData: {
      task: 'Windows Update has been stuck at 35% for 8+ hours. Put the correct recovery steps in order:',
      steps: [
        { id: 'step1', text: 'Wait at least 4 hours before intervening — updates can legitimately take a long time' },
        { id: 'step2', text: 'If still stuck after 8h: run Windows Update Troubleshooter (Settings → Update → Troubleshoot)' },
        { id: 'step3', text: 'Open Services → stop "Windows Update" service (wuauserv)' },
        { id: 'step4', text: 'Delete contents of C:\\Windows\\SoftwareDistribution\\Download folder (this is the update cache)' },
        { id: 'step5', text: 'Restart the "Windows Update" service → go to Settings → Windows Update → Check for updates again' },
      ],
      lesson: 'Windows updates can take hours. Wait before intervening. Clearing SoftwareDistribution cache fixes most stuck updates.',
    },
  },
  {
    // ── INTERACTIVE: pc_repair (printer driver scenario) ──
    id: 't3_007', title: { en: 'Printer Driver Issue', id: 'Masalah Driver Printer' },
    category: 'os', difficulty: 'easy', areaKey: 'smallBizOffice', requiredLevel: 21,
    xpReward: 250, coinReward: 45, puzzleType: 'pc_repair', npcAvatar: '😡', npcName: 'Pak Direktur',
    description: { en: 'New printer installed but printing garbled text. Wrong driver installed!', id: 'Printer baru terpasang tapi cetak teks acak. Driver salah terpasang!' },
    puzzleData: {
      scenario: 'driver_fix',
      symptom: '🖨️ Printer outputs garbled symbols — wrong driver detected (generic PCL instead of HP-specific)',
      components: [
        { id: 'correct_driver', label: 'HP LaserJet Driver v5.1', emoji: '✅', correctSlot: 'driver_slot', broken: false },
        { id: 'wrong_driver',   label: 'Generic PCL Driver',     emoji: '❌', correctSlot: 'trash',       broken: true },
        { id: 'printer',        label: 'HP LaserJet M404n',      emoji: '🖨️', correctSlot: 'printer_slot', broken: false },
      ],
      slots: [
        { id: 'driver_slot',  label: 'Active Printer Driver (⚠️ wrong driver)', hasFault: true },
        { id: 'printer_slot', label: 'Printer Hardware',                         hasFault: false },
        { id: 'trash',        label: '🗑️ Uninstall Wrong Driver',                hasFault: false },
      ],
      faultSlot: 'driver_slot',
      steps: [
        { id: 1, action: 'identify',   text: 'Open Devices & Printers — identify the incorrectly installed generic driver' },
        { id: 2, action: 'remove',     text: 'Drag Generic PCL Driver → Trash (right-click printer → Remove device)' },
        { id: 3, action: 'install',    text: 'Drag HP LaserJet Driver v5.1 → Driver Slot (downloaded from hp.com/support)' },
        { id: 4, action: 'test_print', text: 'Print a test page — confirm output is clean and readable' },
      ],
      successMsg: '🖨️ Printer now outputs perfect text! Correct driver installed.',
      lesson: 'Garbled print output = wrong driver. Always download the exact driver for your printer model from the manufacturer\'s website, never rely on generic Windows drivers.',
    },
  },
  {
    // ── INTERACTIVE: terminal (NTFS permissions) ──
    id: 't3_008', title: { en: 'Windows Permission Denied', id: 'Windows: Akses Ditolak' },
    category: 'os', difficulty: 'medium', areaKey: 'startupOffice', requiredLevel: 23,
    xpReward: 340, coinReward: 65, puzzleType: 'terminal', npcAvatar: '🔒', npcName: 'Dev Tim',
    description: { en: 'Developer can\'t access shared folder — gets "Access Denied". Fix it with icacls!', id: 'Developer tidak bisa akses folder bersama — dapat "Access Denied". Perbaiki dengan icacls!' },
    terminalData: {
      os: 'windows',
      intro: 'Developer "budi" gets "Access Denied" when trying to open D:\\Projects\\shared. Fix the NTFS permissions using icacls.',
      tasks: [
        {
          id: 'task1',
          instruction: 'Check current NTFS permissions on the shared folder:',
          command: 'icacls D:\\Projects\\shared',
          hint: 'Type: icacls D:\\Projects\\shared',
          successOutput: `D:\\Projects\\shared BUILTIN\\Administrators:(OI)(CI)(F)
                   NT AUTHORITY\\SYSTEM:(OI)(CI)(F)
                   DESKTOP-PC\\admin:(OI)(CI)(F)

No permissions found for user "budi"
[!] User budi has no access — that\'s why they get Access Denied.`,
          lesson: 'icacls shows NTFS permissions. (OI)(CI)(F) = Object Inherit, Container Inherit, Full Control. User "budi" is completely missing from the ACL.',
        },
        {
          id: 'task2',
          instruction: 'Grant user "budi" Read & Write access to the shared folder:',
          command: 'icacls D:\\Projects\\shared /grant budi:(OI)(CI)(M)',
          hint: 'Type: icacls D:\\Projects\\shared /grant budi:(OI)(CI)(M)',
          successOutput: `processed file: D:\\Projects\\shared
Successfully processed 1 files; Failed processing 0 files

[✓] Permission granted:
    budi: (OI)(CI)(M) — Modify access (Read + Write + Delete, but NOT full control)`,
          lesson: '(M) = Modify permission: user can read, write, and delete files but cannot change permissions or ownership.',
        },
        {
          id: 'task3',
          instruction: 'Verify the new permissions were applied correctly:',
          command: 'icacls D:\\Projects\\shared',
          hint: 'Type: icacls D:\\Projects\\shared',
          successOutput: `D:\\Projects\\shared BUILTIN\\Administrators:(OI)(CI)(F)
                   NT AUTHORITY\\SYSTEM:(OI)(CI)(F)
                   DESKTOP-PC\\admin:(OI)(CI)(F)
                   DESKTOP-PC\\budi:(OI)(CI)(M)

[✓] budi now has Modify access. Access Denied resolved!`,
          lesson: 'Always verify permission changes with icacls after granting access. Use Modify (M) not Full Control (F) for regular users — Principle of Least Privilege.',
        },
      ],
      successMsg: '🔓 Access restored! Developer budi can now access D:\\Projects\\shared with Modify permissions.',
      lesson: 'NTFS permissions control file access per user. icacls /grant gives precise control. Always use Principle of Least Privilege — don\'t give Full Control when Read/Write is enough.',
    },
  },

  // ── NEW: Active Directory — Unlock Employee Account ──────────
  {
    id: 't3_009', title: { en: 'Unlock Employee Account', id: 'Buka Kunci Akun Karyawan' },
    category: 'os', difficulty: 'medium', areaKey: 'startupOffice', requiredLevel: 22,
    xpReward: 320, coinReward: 60, puzzleType: 'terminal', npcAvatar: '😰', npcName: 'Rina HR',
    description: { en: 'HR staff account locked after too many wrong password attempts. Unlock via Active Directory.', id: 'Akun staff HR terkunci setelah terlalu banyak percobaan password salah.' },
    npcDialogue: [
      { npc: 'Rina HR', avatar: '😰', msgEn: "Help! I can't log in! It says my account is locked. I have a meeting in 5 minutes!", msgId: 'Tolong! Saya tidak bisa login! Katanya akun saya terkunci. Ada meeting 5 menit lagi!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Don't worry Rina. Looks like too many failed login attempts triggered the lockout policy. Let me unlock it from Active Directory.", msgId: 'Jangan khawatir Rina. Sepertinya terlalu banyak percobaan login gagal memicu kebijakan lockout. Biarkan saya buka kuncinya dari Active Directory.' },
      { npc: 'Rina HR', avatar: '😰', msgEn: "I was trying to remember my new password... I think I typed it wrong 6 times.", msgId: 'Saya sedang mencoba mengingat password baru saya... Sepertinya salah ketik 6 kali.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "The domain policy locks after 5 failed attempts. I'll unlock via PowerShell and recommend setting a password hint.", msgId: 'Kebijakan domain mengunci setelah 5 percobaan gagal. Saya akan buka via PowerShell dan sarankan membuat password hint.' },
    ],
    terminalData: {
      os: 'windows',
      intro: '🔒 ACTIVE DIRECTORY — ACCOUNT LOCKOUT RECOVERY\nUser: rina.hr@company.local | Status: LOCKED | Reason: BadPwdCount exceeded\nYour task: Unlock the account and verify status using PowerShell AD commands.',
      tasks: [
        {
          id: 'ad_check',
          instruction: '1. Check account lockout status for rina.hr',
          command: 'Get-ADUser -Identity rina.hr -Properties LockedOut,BadPwdCount,LastBadPasswordAttempt | Select Name,LockedOut,BadPwdCount',
          successOutput: 'Name     LockedOut  BadPwdCount\n----     ---------  -----------\nrina.hr  True       6\n\n⚠️  Account is LOCKED. BadPwdCount: 6 (policy max: 5)',
          hint: 'Use Get-ADUser with -Properties LockedOut to see lockout status',
          lesson: 'Get-ADUser shows Active Directory account properties. LockedOut:True means the account needs manual unlock by IT admin.',
        },
        {
          id: 'ad_unlock',
          instruction: '2. Unlock the account',
          command: 'Unlock-ADAccount -Identity rina.hr',
          successOutput: '✅ Account rina.hr successfully unlocked.\nNo output means success in PowerShell AD commands.',
          hint: 'Unlock-ADAccount is the command to unlock a locked AD user',
          lesson: 'Unlock-ADAccount releases the lockout flag. The user can now log in immediately without a password reset.',
        },
        {
          id: 'ad_verify',
          instruction: '3. Verify the account is now unlocked',
          command: 'Get-ADUser -Identity rina.hr -Properties LockedOut | Select Name,LockedOut,Enabled',
          successOutput: 'Name     LockedOut  Enabled\n----     ---------  -------\nrina.hr  False      True\n\n✅ Account is UNLOCKED and ENABLED. User can now log in.',
          hint: 'Run Get-ADUser again to confirm LockedOut is now False',
          lesson: 'Always verify after making AD changes. LockedOut:False + Enabled:True = account is ready.',
        },
        {
          id: 'ad_reset',
          instruction: '4. Reset bad password counter (best practice)',
          command: 'Set-ADUser -Identity rina.hr -Replace @{badPwdCount=0}',
          successOutput: '✅ BadPwdCount reset to 0 for rina.hr.\n\n📋 INCIDENT SUMMARY:\n• User: rina.hr\n• Cause: 6 failed password attempts\n• Action: Unlocked + BadPwdCount reset\n• Recommendation: Advise user to use password manager',
          hint: 'Set-ADUser -Replace can reset specific AD attributes like badPwdCount',
          lesson: 'Resetting badPwdCount prevents immediate re-lockout if the user accidentally retypes the wrong password. Always advise users to use a password manager.',
        },
      ],
      successMsg: '🏆 Account unlocked! Rina can now attend her meeting. Incident logged.',
      lesson: 'Account lockout is one of the most common IT helpdesk tickets. Always: Check (Get-ADUser) → Unlock (Unlock-ADAccount) → Verify → Reset counter → Advise user.',
    },
  },

  // ── NEW: Join Office PC to Domain ────────────────────────────
  {
    id: 't3_010', title: { en: 'Join Office PC to Domain', id: 'Gabungkan PC ke Domain' },
    category: 'os', difficulty: 'medium', areaKey: 'startupOffice', requiredLevel: 24,
    xpReward: 360, coinReward: 70, puzzleType: 'sequence', npcAvatar: '🧑‍💼', npcName: 'Pak Dimas',
    description: { en: 'New employee PC needs to join the company domain. Set it up correctly.', id: 'PC karyawan baru perlu bergabung ke domain perusahaan.' },
    npcDialogue: [
      { npc: 'Pak Dimas', avatar: '🧑‍💼', msgEn: "We have a new designer starting Monday. Their laptop needs to connect to our company network and shared drives.", msgId: 'Kami punya desainer baru yang mulai Senin. Laptopnya perlu konek ke jaringan perusahaan dan shared drive.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Got it. I'll join the PC to the domain. What's the PC name going to be? We follow the naming convention: DEPT-XXXX.", msgId: 'Mengerti. Saya akan join PC ke domain. Nama PC-nya apa? Kita ikuti konvensi penamaan: DEPT-XXXX.' },
      { npc: 'Pak Dimas', avatar: '🧑‍💼', msgEn: "Design department, computer #3. So DESIGN-0003?", msgId: 'Departemen Design, komputer ke-3. Jadi DESIGN-0003?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Perfect. I'll need the PC on the office network with proper DNS pointing to our domain controller first.", msgId: 'Sempurna. Saya butuh PC terhubung ke jaringan kantor dengan DNS yang mengarah ke domain controller kita dulu.' },
    ],
    sequenceData: {
      task: 'Join a new Windows 11 PC (DESIGN-0003) to the company domain "company.local". Put the steps in the correct order:',
      steps: [
        { id: 's1', text: 'Verify the PC is connected to the office LAN and can reach the Domain Controller: ping company.local' },
        { id: 's2', text: 'Set the DNS server to the Domain Controller\'s IP (e.g., 192.168.1.10) — not Google DNS' },
        { id: 's3', text: 'Rename the PC: Settings → System → About → Rename this PC → type "DESIGN-0003" → Restart' },
        { id: 's4', text: 'After restart: Settings → System → About → Domain or workgroup → Join domain → type "company.local"' },
        { id: 's5', text: 'Enter Domain Admin credentials when prompted → Restart PC' },
        { id: 's6', text: 'Log in with the new employee\'s domain account: company\\newuser — verify access to shared drives' },
      ],
      lesson: 'Domain join requires: LAN connectivity → correct DNS (pointing to DC) → PC rename → domain join → domain admin credentials → user login test. DNS must point to DC or the join will fail.',
    },
  },

  // ── NEW: Outlook Not Syncing (OST Rebuild) ───────────────────
  {
    id: 't3_011', title: { en: 'Outlook Not Syncing', id: 'Outlook Tidak Sinkronisasi' },
    category: 'os', difficulty: 'medium', areaKey: 'schoolLab', requiredLevel: 26,
    xpReward: 300, coinReward: 55, puzzleType: 'terminal', npcAvatar: '😤', npcName: 'Bu Sari',
    description: { en: 'Teacher\'s Outlook stuck — new emails not arriving, calendar not updating.', id: 'Outlook guru macet — email baru tidak masuk, kalender tidak update.' },
    npcDialogue: [
      { npc: 'Bu Sari', avatar: '😤', msgEn: "My Outlook has been broken for 2 days! No new emails coming in and my calendar won't update. I missed an important meeting!", msgId: 'Outlook saya sudah rusak 2 hari! Tidak ada email baru masuk dan kalender tidak mau update. Saya melewatkan rapat penting!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "I see the issue — your OST file (local email cache) is likely corrupted. We need to delete it so Outlook rebuilds a fresh copy.", msgId: 'Saya lihat masalahnya — file OST (cache email lokal) Anda kemungkinan korup. Kita perlu menghapusnya agar Outlook membangun salinan baru.' },
      { npc: 'Bu Sari', avatar: '😤', msgEn: "Will I lose my emails?! I have years of emails in there!", msgId: 'Apakah saya akan kehilangan email?! Saya punya email bertahun-tahun di sana!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "No! OST is just a local cache. All real emails live on the Exchange server. Deleting OST just forces Outlook to re-download everything fresh.", msgId: 'Tidak! OST hanya cache lokal. Semua email asli ada di server Exchange. Menghapus OST hanya memaksa Outlook untuk mengunduh ulang semuanya segar.' },
    ],
    terminalData: {
      os: 'windows',
      intro: '📧 OUTLOOK SYNC ISSUE — OST FILE CORRUPTION\nUser: sari@school.edu | Issue: Outlook not syncing, OST file corrupted\nFix: Close Outlook → Locate OST → Delete → Reopen Outlook to rebuild',
      tasks: [
        {
          id: 'ost_close',
          instruction: '1. Force close Outlook to safely access the OST file',
          command: 'taskkill /f /im OUTLOOK.EXE',
          successOutput: 'SUCCESS: The process "OUTLOOK.EXE" with PID 4832 has been terminated.\n✅ Outlook closed. OST file is now accessible.',
          hint: 'taskkill /f /im forces a process to close by name',
          lesson: 'You must close Outlook before touching the OST file, or Windows will deny access with a "file in use" error.',
        },
        {
          id: 'ost_find',
          instruction: '2. Find the OST file location',
          command: '%LOCALAPPDATA%\\Microsoft\\Outlook',
          successOutput: 'Directory: C:\\Users\\sari\\AppData\\Local\\Microsoft\\Outlook\\\n\nMode    LastWrite       Name\n----    ---------       ----\n-a----  2024-05-14      sari@school.edu.ost  [4.2 GB] ⚠️ CORRUPTED\n-a----  2024-01-01      Outlook.xml\n\nOST file found: sari@school.edu.ost (4.2 GB)',
          hint: 'Paste %LOCALAPPDATA%\\Microsoft\\Outlook in File Explorer address bar',
          lesson: 'The OST file is stored in AppData\\Local\\Microsoft\\Outlook. Its size can reach several GB for heavy email users.',
        },
        {
          id: 'ost_rename',
          instruction: '3. Rename the OST file (safer than deleting)',
          command: 'ren "%LOCALAPPDATA%\\Microsoft\\Outlook\\sari@school.edu.ost" "sari@school.edu.ost.OLD"',
          successOutput: '✅ File renamed: sari@school.edu.ost → sari@school.edu.ost.OLD\n\nThe old file is preserved as backup.\nOutlook will create a fresh OST on next launch.',
          hint: 'Rename (ren) instead of delete — keeps backup in case something goes wrong',
          lesson: 'Always rename instead of delete when troubleshooting. If something goes wrong, you can rename it back. .OLD extension means Outlook will ignore it.',
        },
        {
          id: 'ost_repair',
          instruction: '4. Run Office repair to fix Outlook profile (if needed)',
          command: 'ScanPST.exe',
          successOutput: '📧 Microsoft Outlook Inbox Repair Tool\n\nScanning: sari@school.edu.ost.OLD\nPhase 1: Checking file integrity... ✅\nPhase 2: Checking folder structure... ⚠️ 23 minor errors found\nPhase 3: Checking messages... ✅\n\nRepair completed. 23 items recovered.\n✅ Start Outlook — it will rebuild OST automatically.',
          hint: 'ScanPST.exe is Outlook\'s built-in repair tool, usually in C:\\Program Files\\Microsoft Office\\root\\OfficeXX\\',
          lesson: 'ScanPST (Inbox Repair Tool) can recover corrupted PST/OST files. After repair, Outlook rebuilds the OST from Exchange server automatically.',
        },
      ],
      successMsg: '📧 Outlook sync restored! Emails flowing in. Bu Sari is happy again.',
      lesson: 'Outlook sync issues are almost always OST corruption. Fix: Close Outlook → Rename OST → Reopen. Outlook rebuilds from Exchange. Data is never lost — it lives on the server.',
    },
  },

  // ── NEW: Shared Drive Access Denied (NTFS + Share Perms) ─────
  {
    id: 't3_012', title: { en: 'Shared Drive Access Denied', id: 'Akses Shared Drive Ditolak' },
    category: 'os', difficulty: 'hard', areaKey: 'smallBizOffice', requiredLevel: 28,
    xpReward: 450, coinReward: 85, puzzleType: 'sequence', npcAvatar: '😡', npcName: 'Bos Andi',
    description: { en: 'Finance team cannot access the shared drive after server migration. Fix both NTFS and Share permissions.', id: 'Tim Finance tidak bisa akses shared drive setelah migrasi server.' },
    npcDialogue: [
      { npc: 'Bos Andi', avatar: '😡', msgEn: "The entire finance team can't access the F: drive since yesterday's server migration! They can't do ANY work!", msgId: 'Seluruh tim Finance tidak bisa akses drive F: sejak migrasi server kemarin! Mereka tidak bisa bekerja sama sekali!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "I understand the urgency. This is likely a permissions issue after migration — Share permissions and NTFS permissions both need to be set correctly.", msgId: 'Saya mengerti urgensinya. Ini kemungkinan masalah permission setelah migrasi — Share permission dan NTFS permission keduanya perlu diatur dengan benar.' },
      { npc: 'Bos Andi', avatar: '😡', msgEn: "Why are there TWO types of permissions?! Just fix it!", msgId: 'Kenapa ada DUA jenis permission?! Perbaiki saja!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Windows has Share permissions (network access) AND NTFS permissions (file system). BOTH must allow access. I'll fix both layers right now.", msgId: 'Windows punya Share permission (akses jaringan) DAN NTFS permission (file sistem). KEDUANYA harus mengizinkan akses. Saya perbaiki kedua lapisan sekarang.' },
    ],
    sequenceData: {
      task: 'Finance team gets "Access Denied" on \\\\fileserver\\Finance after server migration. Fix Share + NTFS permissions in the correct order:',
      steps: [
        { id: 's1', text: 'Remote into the file server and open Computer Management → Shared Folders → Shares' },
        { id: 's2', text: 'Right-click Finance share → Properties → Share Permissions → Verify "Finance_Group" has at least Read permission (add if missing)' },
        { id: 's3', text: 'Navigate to the actual folder: D:\\Finance → Right-click → Properties → Security tab' },
        { id: 's4', text: 'Click Edit → Add → type "Finance_Group" → Check Names → OK → assign Modify permission → Apply' },
        { id: 's5', text: 'Test from a finance workstation: net use F: \\\\fileserver\\Finance → verify access' },
        { id: 's6', text: 'Document the change: who was added, what permission, timestamp, reason (post-migration fix)' },
      ],
      lesson: 'Windows uses TWO permission layers: Share Permissions (controls network access) AND NTFS Permissions (controls file system access). BOTH must grant access — the more restrictive one wins. After migration, always check both layers.',
    },
  },
];

