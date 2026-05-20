// TIER 3 MISSIONS — Windows IT Support (Level 20–35)
// Areas: startupOffice, schoolLab, smallBizOffice

export const MISSIONS_TIER3 = [
  {
    // ── INTERACTIVE: sequence (BSOD recovery) ──
    id: 't3_001', title: { en: 'Blue Screen of Death (BSOD)', id: 'Blue Screen of Death (BSOD)' },
    category: 'os', difficulty: 'medium', areaKey: 'startupOffice', requiredLevel: 20,
    xpReward: 350, coinReward: 65, puzzleType: 'sequence', npcAvatar: '😱', npcName: 'Kevin',
    description: { en: 'Developer\'s PC keeps getting BSOD DRIVER_IRQL errors after update. Fix it step by step!', id: 'PC developer terus BSOD DRIVER_IRQL setelah update. Perbaiki langkah demi langkah!' },
    npcDialogue: [
      { npc: 'Kevin', avatar: '😱', msgEn: "HELP! My PC keeps crashing with a blue screen! It started right after I ran Windows Update this morning. I lost 3 hours of work!", msgId: 'TOLONG! PC saya terus crash dengan layar biru! Dimulai tepat setelah saya menjalankan Windows Update pagi ini. Saya kehilangan 3 jam kerja!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "I can see the BSOD error code — it's DRIVER_IRQL_NOT_LESS_OR_EQUAL. This almost always means a driver is incompatible with the latest update. We need to boot into Safe Mode to fix it.", msgId: 'Saya bisa melihat kode error BSOD — DRIVER_IRQL_NOT_LESS_OR_EQUAL. Ini hampir selalu berarti driver tidak kompatibel dengan update terbaru. Kita perlu boot ke Safe Mode untuk memperbaikinya.' },
      { npc: 'Kevin', avatar: '😱', msgEn: "Safe Mode? Will my files be okay? I have a deadline tomorrow!", msgId: 'Safe Mode? File saya akan aman? Saya punya deadline besok!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Safe Mode only changes which drivers load — your files are completely safe. I'll walk you through each step. Ready? Let's start!", msgId: 'Safe Mode hanya mengubah driver mana yang dimuat — file kamu sepenuhnya aman. Saya akan tuntun kamu setiap langkah. Siap? Mulai!' },
    ],
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
    npcDialogue: [
      { npc: 'Bos Hana', avatar: '🧑‍💼', msgEn: "This brand new laptop takes 5 MINUTES to boot! I bought it last week and it's already slower than my 5-year-old PC. This is ridiculous!", msgId: 'Laptop baru ini butuh 5 MENIT untuk boot! Saya beli minggu lalu dan sudah lebih lambat dari PC saya yang berusia 5 tahun. Ini konyol!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "New laptops often come pre-loaded with bloatware — software that auto-starts with Windows and slows everything down. It's a common issue with new devices straight from the store.", msgId: 'Laptop baru sering datang dengan bloatware — perangkat lunak yang otomatis mulai dengan Windows dan memperlambat segalanya. Ini masalah umum dengan perangkat baru langsung dari toko.' },
      { npc: 'Bos Hana', avatar: '🧑‍💼', msgEn: "Can you fix it? I have meetings all morning and I can't wait 5 minutes every time I open my laptop!", msgId: 'Bisakah kamu memperbaikinya? Saya punya rapat sepanjang pagi dan tidak bisa menunggu 5 menit setiap kali membuka laptop!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Absolutely. I'll use PowerShell to identify all the startup programs and disable the unnecessary ones. After this, boot should take under 30 seconds.", msgId: 'Tentu. Saya akan menggunakan PowerShell untuk mengidentifikasi semua program startup dan menonaktifkan yang tidak perlu. Setelah ini, boot seharusnya kurang dari 30 detik.' },
    ],
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
    npcDialogue: [
      { npc: 'Bu Sari', avatar: '👩‍🏫', msgEn: "The computer in Room 12 has no sound anymore! We use audio for English listening exercises. Windows updated last night and now it's completely silent.", msgId: 'Komputer di Ruang 12 tidak ada suara lagi! Kami menggunakan audio untuk latihan mendengarkan Bahasa Inggris. Windows update semalam dan sekarang benar-benar sunyi.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "This is a classic Windows Update issue — the update replaced the audio driver with a generic version that isn't compatible with the hardware. I'll fix it using the command line.", msgId: 'Ini masalah Windows Update klasik — pembaruan mengganti driver audio dengan versi generik yang tidak kompatibel dengan hardware. Saya akan memperbaikinya menggunakan command line.' },
      { npc: 'Bu Sari', avatar: '👩‍🏫', msgEn: "I have a class in 2 hours. Can it be fixed in time?", msgId: 'Saya punya kelas dalam 2 jam. Bisakah diperbaiki tepat waktu?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Definitely. Driver reinstall takes about 5 minutes total. The students will have audio for their listening test.", msgId: 'Pasti. Reinstall driver butuh sekitar 5 menit total. Siswa akan punya audio untuk tes mendengarkan mereka.' },
    ],
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
    npcDialogue: [
      { npc: 'Pak Wahyu', avatar: '😤', msgEn: "My Windows keeps showing random error messages! Sometimes apps crash for no reason, sometimes a DLL is missing. It's been getting worse for 2 weeks.", msgId: 'Windows saya terus menampilkan pesan error acak! Kadang aplikasi crash tanpa alasan, kadang DLL hilang. Sudah semakin parah selama 2 minggu.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Those symptoms — random errors, DLL missing, apps crashing — all point to corrupted Windows system files. We'll use SFC and DISM to scan and repair them automatically.", msgId: 'Gejala-gejala itu — error acak, DLL hilang, aplikasi crash — semuanya menunjuk ke file sistem Windows yang rusak. Kita akan menggunakan SFC dan DISM untuk scan dan memperbaikinya secara otomatis.' },
      { npc: 'Pak Wahyu', avatar: '😤', msgEn: "What's SFC and DISM? Will it format my PC? I have important data!", msgId: 'Apa itu SFC dan DISM? Apakah akan format PC saya? Saya punya data penting!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "No formatting at all! SFC and DISM only fix Windows system files — your personal data, documents, and programs are completely untouched.", msgId: 'Tidak ada format sama sekali! SFC dan DISM hanya memperbaiki file sistem Windows — data pribadi, dokumen, dan program kamu sama sekali tidak tersentuh.' },
    ],
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
    npcDialogue: [
      { npc: 'Manajer HR', avatar: '👩‍💼', msgEn: "We have 3 new employees starting Monday. They each need a computer account to log in. Can you set them up today?", msgId: 'Kami punya 3 karyawan baru yang mulai Senin. Mereka masing-masing butuh akun komputer untuk login. Bisakah kamu siapkan hari ini?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Of course. I'll create Standard User accounts for them — not Administrator accounts. Standard accounts mean they can use the computer normally but can't accidentally break system settings.", msgId: 'Tentu. Saya akan membuat akun Standard User untuk mereka — bukan akun Administrator. Akun standar berarti mereka bisa menggunakan komputer secara normal tapi tidak bisa merusak pengaturan sistem secara tidak sengaja.' },
      { npc: 'Manajer HR', avatar: '👩‍💼', msgEn: "What's the difference? The previous IT person gave everyone Admin accounts.", msgId: 'Apa bedanya? IT sebelumnya memberikan akun Admin kepada semua orang.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Admin accounts are dangerous for regular users — one wrong click and they can install malware or delete system files. Standard accounts are much safer. I'll show you the proper setup!", msgId: 'Akun Admin berbahaya untuk pengguna biasa — satu klik yang salah dan mereka bisa menginstal malware atau menghapus file sistem. Akun standar jauh lebih aman. Saya akan tunjukkan pengaturan yang benar!' },
    ],
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
    xpReward: 300, coinReward: 55, puzzleType: 'sequence', npcAvatar: '😩', npcName: 'Pak Kepala Sekolah',
    description: { en: '20 school PCs stuck on "Configuring Windows Updates: 35%". Fix them!', id: '20 PC sekolah macet di "Mengonfigurasi Pembaruan Windows: 35%". Perbaiki!' },
    npcDialogue: [
      { npc: 'Pak Kepala Sekolah', avatar: '😩', msgEn: "EMERGENCY! ALL 20 computers in the lab are frozen on a Windows Update screen since last night. Students need them for their exam tomorrow morning!", msgId: 'DARURAT! SEMUA 20 komputer di lab sudah beku di layar Windows Update sejak semalam. Siswa membutuhkannya untuk ujian besok pagi!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "I see it — they're all stuck at 35%. This happens when a Windows Update gets corrupted mid-download. The fix is to clear the update cache and restart the Windows Update service.", msgId: 'Saya lihat — semuanya macet di 35%. Ini terjadi ketika Windows Update rusak di tengah unduhan. Solusinya adalah membersihkan cache update dan restart layanan Windows Update.' },
      { npc: 'Pak Kepala Sekolah', avatar: '😩', msgEn: "Can you fix all 20 tonight? The exam starts at 8AM!", msgId: 'Bisakah kamu memperbaiki semua 20 malam ini? Ujian mulai jam 8!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Yes. Once I know the steps, each PC takes about 3 minutes. I'll have them all ready before midnight.", msgId: 'Ya. Begitu saya tahu langkah-langkahnya, setiap PC butuh sekitar 3 menit. Semuanya akan siap sebelum tengah malam.' },
    ],
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
    npcDialogue: [
      { npc: 'Pak Direktur', avatar: '😡', msgEn: "The new HP printer we just bought is printing complete GARBAGE! Look at this — random symbols and characters everywhere. I have a board presentation in 1 hour!", msgId: 'Printer HP baru yang baru kami beli mencetak SAMPAH! Lihat ini — simbol dan karakter acak di mana-mana. Saya punya presentasi dewan dalam 1 jam!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "I can see the problem immediately — Windows installed a Generic PCL driver instead of the correct HP LaserJet driver. Wrong driver = garbled output. I'll fix it now.", msgId: 'Saya bisa melihat masalahnya seketika — Windows menginstal driver Generic PCL alih-alih driver HP LaserJet yang benar. Driver salah = output kacau. Saya perbaiki sekarang.' },
      { npc: 'Pak Direktur', avatar: '😡', msgEn: "How did the WRONG driver get installed? We paid for this printer!", msgId: 'Bagaimana driver YANG SALAH bisa terinstal? Kami sudah membayar printer ini!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Windows sometimes auto-installs a generic driver that's 'close enough' but not exact. I'll remove it and install the correct HP-specific driver — this will fix the output completely.", msgId: 'Windows terkadang menginstal driver generik yang dirasa cukup cocok tapi tidak tepat. Saya akan menghapusnya dan menginstal driver HP yang spesifik — ini akan memperbaiki output sepenuhnya.' },
    ],
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
    npcDialogue: [
      { npc: 'Dev Tim', avatar: '🔒', msgEn: "I've been blocked from the D:\\Projects\\shared folder all morning! Every time I try to open it, I get 'Access Denied'. My whole team is waiting on files I can't access!", msgId: 'Saya diblokir dari folder D:\\Projects\\shared sepanjang pagi! Setiap kali saya coba membukanya, saya mendapat Access Denied. Seluruh tim saya menunggu file yang tidak bisa saya akses!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Access Denied usually means your user account isn't in the folder's NTFS permissions list. I'll use icacls to check exactly what permissions are set and add your account.", msgId: 'Access Denied biasanya berarti akun pengguna kamu tidak ada dalam daftar permission NTFS folder. Saya akan menggunakan icacls untuk memeriksa permission apa yang diatur dan menambahkan akun kamu.' },
      { npc: 'Dev Tim', avatar: '🔒', msgEn: "I had access last week! Did someone remove me?", msgId: 'Saya punya akses minggu lalu! Apakah seseorang menghapus saya?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "It could be a recent permissions reset or you were accidentally removed from a security group. Either way, I'll fix it with icacls right now.", msgId: 'Bisa jadi karena reset permission baru-baru ini atau kamu tidak sengaja dihapus dari grup keamanan. Bagaimanapun, saya akan memperbaikinya dengan icacls sekarang.' },
    ],
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

  // ── NEW: Group Policy Editor Basics ──────────────────────────
  {
    id: 't3_013', title: { en: 'Group Policy Editor Basics', id: 'Dasar Group Policy Editor' },
    category: 'sysadmin', difficulty: 'hard', areaKey: 'startupOffice', requiredLevel: 28,
    xpReward: 400, coinReward: 80, puzzleType: 'sequence', npcAvatar: '👨‍💼', npcName: 'Mas Feri',
    description: { en: 'IT Manager wants all PCs to lock screen after 5 minutes of inactivity. Use Group Policy!', id: 'Manajer IT ingin semua PC mengunci layar setelah 5 menit tidak aktif. Gunakan Group Policy!' },
    npcDialogue: [
      { npc: 'Mas Feri', avatar: '👨‍💼', msgEn: "Our auditors flagged that employees leave their PCs unlocked when they step out. We need ALL PCs to auto-lock after 5 minutes.", msgId: 'Auditor kami mencatat bahwa karyawan meninggalkan PC tanpa kunci saat keluar. Kita perlu SEMUA PC mengunci otomatis setelah 5 menit.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Perfect case for Group Policy! Instead of setting this on each PC manually, I can push this rule to all domain PCs at once from the Domain Controller.", msgId: 'Kasus sempurna untuk Group Policy! Daripada mengatur ini di setiap PC secara manual, saya bisa mendorong aturan ini ke semua PC domain sekaligus dari Domain Controller.' },
      { npc: 'Mas Feri', avatar: '👨‍💼', msgEn: "How long will this take? We have 80 PCs!", msgId: 'Berapa lama ini butuh waktu? Kita punya 80 PC!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "About 10 minutes for the configuration. Group Policy applies to all 80 PCs simultaneously — that's the beauty of it!", msgId: 'Sekitar 10 menit untuk konfigurasi. Group Policy berlaku untuk semua 80 PC secara bersamaan — itulah keindahannya!' },
    ],
    sequenceData: {
      task: 'Enforce a screen lock policy via Group Policy so all domain PCs lock after 5 minutes of inactivity:',
      steps: [
        { id: 's1', text: 'Press Win+R → type gpedit.msc → Enter (on Domain Controller, use gpmc.msc for domain-wide policy)' },
        { id: 's2', text: 'Navigate to: Computer Configuration → Windows Settings → Security Settings → Local Policies → Security Options' },
        { id: 's3', text: 'Find "Interactive logon: Machine inactivity limit" → double-click → set to 300 seconds (5 minutes)' },
        { id: 's4', text: 'Navigate to: User Configuration → Administrative Templates → Control Panel → Personalization' },
        { id: 's5', text: 'Enable "Enable screen saver" and set "Screen saver timeout" to 300 → also Enable "Password protect the screen saver"' },
        { id: 's6', text: 'Run gpupdate /force in CMD on any client PC to apply immediately → verify screen locks after 5 minutes' },
      ],
      lesson: 'Group Policy lets IT admins enforce rules on all Windows PCs centrally — no need to visit each PC. gpupdate /force applies changes immediately. Security policies prevent unauthorized access when users step away.',
    },
  },

  // ── NEW: Event Viewer Log Analysis ────────────────────────────
  {
    id: 't3_014', title: { en: 'Event Viewer Log Analysis', id: 'Analisis Log Event Viewer' },
    category: 'os', difficulty: 'hard', areaKey: 'startupOffice', requiredLevel: 29,
    xpReward: 420, coinReward: 85, puzzleType: 'quiz', npcAvatar: '👩‍💼', npcName: 'Ibu Desi',
    description: { en: 'Accounting PC crashes every Monday morning. Use Event Viewer to find the root cause!', id: 'PC akuntansi crash setiap Senin pagi. Gunakan Event Viewer untuk cari penyebabnya!' },
    npcDialogue: [
      { npc: 'Ibu Desi', avatar: '👩‍💼', msgEn: "My PC crashes every Monday morning exactly at 8AM. Only on Mondays! The screen goes blue and it restarts.", msgId: 'PC saya crash setiap Senin pagi tepat jam 8. Hanya Senin! Layarnya biru dan restart.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "A pattern like that usually means a scheduled task or update is conflicting with something. Let's check Event Viewer — it logs everything Windows does.", msgId: 'Pola seperti itu biasanya berarti scheduled task atau update berkonflik dengan sesuatu. Mari cek Event Viewer — itu mencatat semua yang dilakukan Windows.' },
      { npc: 'Ibu Desi', avatar: '👩‍💼', msgEn: "I didn't know Windows keeps a log! Can we really find out what happened?", msgId: 'Saya tidak tahu Windows menyimpan log! Bisakah kita benar-benar mengetahui apa yang terjadi?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Absolutely — Event Viewer is like the black box recorder of your PC. Let me walk you through reading it.", msgId: 'Tentu saja — Event Viewer seperti perekam kotak hitam PC kamu. Biarkan saya tunjukkan cara membacanya.' },
    ],
    quiz: [
      { q: 'What is Windows Event Viewer used for?', options: ['Managing desktop shortcuts', 'Viewing system logs to diagnose errors, crashes, and security events', 'Changing screen resolution', 'Updating Windows drivers'], correct: 1, explanation: 'Event Viewer records everything that happens in Windows — errors, warnings, crashes, logins. It\'s the black box recorder of your PC — critical for troubleshooting.' },
      { q: 'Where do you find crash-related errors in Event Viewer?', options: ['Application log', 'Security log', 'Windows Logs → System → filter for Critical/Error level', 'Setup log'], correct: 2, explanation: 'Windows Logs → System contains OS and hardware events. Filter by "Critical" and "Error" level to find crash causes quickly without scrolling thousands of entries.' },
      { q: 'Event ID 41 (Kernel-Power) appears after a crash. What does it mean?', options: ['The keyboard was unplugged', 'Windows updated successfully', 'The system shut down unexpectedly without a clean shutdown — power loss or hard crash', 'A new user logged in'], correct: 2, explanation: 'Event ID 41 Kernel-Power = unexpected shutdown. Common causes: overheating triggering auto-shutdown, PSU failure, RAM crash causing BSOD, or power outage.' },
      { q: 'How do you filter Event Viewer to show only errors from the last 7 days?', options: ['Delete all old logs first', 'Right-click Windows Logs → System → Filter Current Log → set date range and level to Critical/Error', 'Open Task Manager', 'Search Google for event logs'], correct: 1, explanation: 'Filter Current Log lets you narrow by date, severity level, and Event ID. This is much faster than manually scrolling through thousands of entries per day.' },
    ],
  },

  // ── NEW: Scheduled Software Deployment ────────────────────────
  {
    id: 't3_015', title: { en: 'Software Deployment to 30 PCs', id: 'Deploy Software ke 30 PC' },
    category: 'sysadmin', difficulty: 'medium', areaKey: 'schoolLab', requiredLevel: 30,
    xpReward: 350, coinReward: 70, puzzleType: 'sequence', npcAvatar: '👨‍🏫', npcName: 'Pak Guru Rudi',
    description: { en: '30 school computers need Chrome and VLC installed before class tomorrow. Deploy efficiently!', id: '30 komputer sekolah perlu Chrome dan VLC sebelum kelas besok. Deploy secara efisien!' },
    npcDialogue: [
      { npc: 'Pak Guru Rudi', avatar: '👨‍🏫', msgEn: "We need Chrome and VLC installed on all 30 computers in the lab before the 8AM class tomorrow. Can you do it tonight?", msgId: 'Kita perlu Chrome dan VLC diinstal di semua 30 komputer di lab sebelum kelas jam 8 besok. Bisakah kamu lakukan malam ini?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "30 PCs manually would take 2+ hours. Let me use a batch script with silent installers — I can deploy to all 30 in about 20 minutes using Task Scheduler.", msgId: '30 PC secara manual butuh 2+ jam. Biarkan saya gunakan batch script dengan silent installer — saya bisa deploy ke semua 30 dalam sekitar 20 menit menggunakan Task Scheduler.' },
      { npc: 'Pak Guru Rudi', avatar: '👨‍🏫', msgEn: "Silent installer? What's that?", msgId: 'Silent installer? Itu apa?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "It installs automatically without any popup dialogs — perfect for batch deployment. The /silent flag tells the installer to run with zero user interaction.", msgId: 'Menginstal otomatis tanpa dialog popup — sempurna untuk batch deployment. Flag /silent memberitahu installer untuk berjalan tanpa interaksi pengguna sama sekali.' },
    ],
    sequenceData: {
      task: '30 school computers need Chrome and VLC installed by 8AM tomorrow. Deploy efficiently in the correct order:',
      steps: [
        { id: 's1', text: 'Download Chrome and VLC offline installers (.msi or .exe) to a shared network folder (\\\\server\\software\\)' },
        { id: 's2', text: 'Create a batch script (.bat): start /wait ChromeSetup.exe /silent /install && start /wait vlc-setup.exe /S' },
        { id: 's3', text: 'TEST the batch script on ONE computer first — verify Chrome and VLC install silently without errors' },
        { id: 's4', text: 'Copy the verified script to all 30 computers via the shared network folder' },
        { id: 's5', text: 'Use Task Scheduler on each PC to run the script at 11PM tonight (when school is empty)' },
        { id: 's6', text: 'Check in at 7AM — verify Start Menu shows Chrome and VLC on all 30 computers' },
      ],
      lesson: 'Silent installers (/silent or /S flag) install without any popups — critical for batch deployment. ALWAYS test on one PC first — one bug × 30 PCs = 30 broken deployments. Schedule during off-hours to avoid disrupting users.',
    },
  },

  // ── NEW: Remote Desktop Configuration ────────────────────────
  {
    id: 't3_016', title: { en: 'Configure Remote Desktop Access', id: 'Konfigurasi Akses Remote Desktop' },
    category: 'networking', difficulty: 'medium', areaKey: 'smallBizOffice', requiredLevel: 31,
    xpReward: 360, coinReward: 72, puzzleType: 'sequence', npcAvatar: '👨‍💼', npcName: 'Pak Direktur Andi',
    description: { en: 'Director wants to access his office PC from home while WFH. Set up Remote Desktop!', id: 'Direktur ingin akses PC kantornya dari rumah saat WFH. Setup Remote Desktop!' },
    npcDialogue: [
      { npc: 'Pak Direktur Andi', avatar: '👨‍💼', msgEn: "I need to work from home next week but all my important files and applications are on my office PC. Can I access it remotely?", msgId: 'Saya perlu bekerja dari rumah minggu depan tapi semua file dan aplikasi penting ada di PC kantor. Bisakah saya mengaksesnya dari jarak jauh?' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "Yes! Windows Remote Desktop (RDP) lets you control your office PC from home as if you're sitting in front of it. I'll set it up for you.", msgId: 'Ya! Windows Remote Desktop (RDP) memungkinkan kamu mengontrol PC kantor dari rumah seperti duduk di depannya. Saya akan menyiapkannya.' },
      { npc: 'Pak Direktur Andi', avatar: '👨‍💼', msgEn: "Is it secure? I'll be connecting over the internet.", msgId: 'Apakah aman? Saya akan terhubung melalui internet.' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "We'll add port forwarding on the router and use your Windows credentials for authentication. It's secure. I'll also note your office PC's IP for you.", msgId: 'Kita tambahkan port forwarding di router dan gunakan kredensial Windows kamu untuk autentikasi. Aman. Saya juga akan catat IP PC kantor kamu.' },
    ],
    sequenceData: {
      task: 'Enable Remote Desktop on the office PC so the director can connect from home:',
      steps: [
        { id: 's1', text: 'On office PC: right-click This PC → Properties → Remote settings → enable "Allow remote connections to this computer"' },
        { id: 's2', text: 'Click "Select Users" → add the director\'s Windows username to the allowed list' },
        { id: 's3', text: 'Run ipconfig on office PC → note IPv4 address (e.g., 192.168.1.100) and PC hostname' },
        { id: 's4', text: 'On office router admin page: set up port forwarding → external port 3389 → internal IP 192.168.1.100 port 3389' },
        { id: 's5', text: 'Find the office\'s public IP at whatismyip.com — give this to the director' },
        { id: 's6', text: 'From home laptop: open Remote Desktop Connection (mstsc) → enter public IP:3389 → log in with office Windows credentials' },
      ],
      lesson: 'RDP uses port 3389. Port forwarding on the router allows external connections to reach the internal PC. Security tip: consider VPN instead of direct port forwarding for production environments — it\'s more secure.',
    },
  },

  // ── NEW: Enterprise Antivirus Policy ─────────────────────────
  {
    id: 't3_017', title: { en: 'Antivirus Deployment Policy', id: 'Kebijakan Deployment Antivirus' },
    category: 'security', difficulty: 'medium', areaKey: 'smallBizOffice', requiredLevel: 32,
    xpReward: 340, coinReward: 68, puzzleType: 'quiz', npcAvatar: '👨‍💼', npcName: 'Pak Bos Hendra',
    description: { en: 'Boss wants antivirus on all 20 office PCs without disrupting employee work. Plan the deployment!', id: 'Bos ingin antivirus di semua 20 PC kantor tanpa ganggu kerja karyawan. Rencanakan deployment!' },
    npcDialogue: [
      { npc: 'Pak Bos Hendra', avatar: '👨‍💼', msgEn: "I want antivirus installed on ALL 20 office PCs by end of week. But I don't want my staff's work disrupted during business hours!", msgId: 'Saya ingin antivirus diinstal di SEMUA 20 PC kantor sebelum akhir minggu. Tapi saya tidak ingin pekerjaan staf terganggu saat jam kerja!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "I'll use a managed antivirus solution with a central dashboard. I can deploy silently to all PCs and schedule scans at 2AM so no one is affected.", msgId: 'Saya akan gunakan solusi antivirus terkelola dengan dashboard terpusat. Saya bisa deploy diam-diam ke semua PC dan jadwalkan scan pukul 2 pagi agar tidak ada yang terganggu.' },
      { npc: 'Pak Bos Hendra', avatar: '👨‍💼', msgEn: "Good. Also make sure it doesn't block our accounting software — it was flagged as a virus by some antivirus before!", msgId: 'Bagus. Juga pastikan tidak memblokir software akuntansi kita — itu pernah ditandai sebagai virus oleh beberapa antivirus sebelumnya!' },
      { npc: 'IT Support', avatar: '🧑‍💻', msgEn: "That's called a false positive — I'll add the accounting software to the exclusion list during setup. Common with custom business software.", msgId: 'Itu disebut false positive — saya akan tambahkan software akuntansi ke daftar pengecualian saat setup. Umum terjadi pada software bisnis kustom.' },
    ],
    quiz: [
      { q: 'What is the key advantage of managed (enterprise) antivirus vs individual AV installed on each PC?', options: ['It is always cheaper', 'Central dashboard shows ALL PC infection statuses and allows policy enforcement and mass updates from one console', 'Individual install gives better protection', 'Managed AV only works on servers'], correct: 1, explanation: 'Managed AV (Sophos Central, Bitdefender GravityZone, Microsoft Defender for Business) lets IT see all PCs from one console, push updates, and enforce policies — no need to visit each PC.' },
      { q: 'When should automatic antivirus scans be scheduled in an office?', options: ['10AM when everyone is working', 'During lunch at 12PM', 'At 2AM–4AM when PCs are idle and no one is working', 'Every 5 minutes for maximum protection'], correct: 2, explanation: 'Full scans consume CPU and disk I/O heavily. Scheduling at 2AM–4AM means zero impact on employee productivity. PCs can be set to "Wake for maintenance" to run even when in sleep mode.' },
      { q: 'Antivirus quarantined a file that the accounting software needs to run. What is the correct response?', options: ['Uninstall the antivirus', 'Check the quarantine — if it is a verified false positive, restore the file and add it to AV exclusions', 'Reinstall the accounting software', 'Ignore it and buy new software'], correct: 1, explanation: 'False positives happen, especially with custom business software. Process: verify the file is legitimate (check with vendor) → restore from quarantine → add to AV exclusions so it won\'t be quarantined again.' },
      { q: 'Which antivirus setting is most critical and must NEVER be disabled?', options: ['The dark mode color scheme', 'Real-time protection — it monitors all file activity as it happens and blocks threats before they execute', 'The scan schedule', 'The product logo animation'], correct: 1, explanation: 'Real-time protection = always-on monitoring. Every file opened/executed is checked in real-time. Disabling it means malware can run freely before a scheduled scan catches it — which could be 24 hours later.' },
    ],
  },
];

