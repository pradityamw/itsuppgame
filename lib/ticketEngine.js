// Procedural Ticket Engine — generates endless randomized IT support tickets

const USERS = ['Alice','Bob','Charlie','Diana','Eko','Farida','George','Hana','Ivan','Julia','Kevin','Lisa','Marco','Nina','Oscar','Putri','Quinn','Reza','Sarah','Tono'];
const LOCATIONS = ['Office Floor 1','Office Floor 2','Conference Room A','Lobby Desk','Server Room','IT Lab','Manager Room','Accounting Dept','HR Dept','Warehouse','Reception','Call Center','Meeting Room B'];
const TIMES = ['08:15','09:30','10:45','11:00','13:20','14:05','15:30','16:00','08:45','10:00','12:30','14:45'];

function rnd(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function rndInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

// ── Ticket Templates by Category ──────────────────────────────
const TEMPLATES = {

  hardware: [
    {
      symptom: (u) => `${u} reports PC won't turn on at all — no lights, no fan.`,
      causes: ['PSU unplugged','Power button cable disconnected','Dead PSU'],
      correctCause: 0,
      steps: ['Check power cable is seated','Check wall outlet works','Test with different PSU cable','Check power button cable on motherboard'],
      quiz: [
        { q:'PC has no power at all. First thing to check?', options:['Replace PSU','Check power cable connection','Reinstall Windows','Replace RAM'], correct:1 },
      ],
      difficulty:'easy', category:'hardware', xpReward:100, tier:1,
    },
    {
      symptom: (u) => `${u} says PC randomly shuts down during use. Fan is very loud.`,
      causes: ['CPU overheating due to dust','Thermal paste dried out','Fan failing'],
      correctCause: 0,
      steps: ['Check CPU temperature in BIOS','Open case and inspect dust buildup','Clean fans and heatsink','Reapply thermal paste if needed'],
      quiz: [
        { q:'PC shuts down randomly and fan is loud. Most likely cause?', options:['Virus infection','CPU overheating','RAM failure','HDD failing'], correct:1 },
      ],
      difficulty:'easy', category:'hardware', xpReward:120, tier:1,
    },
    {
      symptom: (u) => `${u}'s monitor shows "No Signal" despite PC being on.`,
      causes: ['Loose HDMI/VGA cable','Wrong input source on monitor','GPU seated incorrectly'],
      correctCause: 0,
      steps: ['Check cable connection at both ends','Press Source/Input button on monitor','Reseat GPU if cable is fine','Test with different cable'],
      quiz: [
        { q:'Monitor shows "No Signal". PC is on. First step?', options:['Replace monitor','Check display cable connections','Reinstall GPU driver','Replace GPU'], correct:1 },
      ],
      difficulty:'easy', category:'hardware', xpReward:90, tier:1,
    },
    {
      symptom: (u) => `${u} installed new RAM but PC won't POST — just beep codes.`,
      causes: ['RAM not fully seated','Incompatible RAM speed','RAM in wrong slot'],
      correctCause: 0,
      steps: ['Remove and firmly reseat RAM sticks','Try one stick at a time','Check compatible slot pairs in manual','Test with original RAM'],
      quiz: [
        { q:'PC beeps after RAM install. Most likely cause?', options:['Virus','RAM not properly seated','PSU failure','CPU damage'], correct:1 },
      ],
      difficulty:'medium', category:'hardware', xpReward:220, tier:2,
    },
    {
      symptom: (u) => `${u}'s PC has intermittent crashes with BSOD MEMORY_MANAGEMENT error.`,
      causes: ['Faulty RAM stick','RAM slot damaged','XMP profile unstable'],
      correctCause: 0,
      steps: ['Run Windows Memory Diagnostic (mdsched.exe)','Test each RAM stick individually','Disable XMP in BIOS','Check for RAM slot damage'],
      quiz: [
        { q:'BSOD MEMORY_MANAGEMENT appears randomly. Best diagnostic tool?', options:['Disk Check','Windows Memory Diagnostic','Event Viewer','Device Manager'], correct:1 },
      ],
      difficulty:'medium', category:'hardware', xpReward:260, tier:2,
    },
    {
      symptom: (u) => `${u} wants to upgrade from HDD to SSD without losing data.`,
      causes: ['Need disk clone/migration'],
      correctCause: 0,
      steps: ['Use disk cloning software (Macrium/Clonezilla)','Connect new SSD via USB adapter','Clone HDD to SSD','Swap drives and boot test'],
      quiz: [
        { q:'Best way to migrate OS from HDD to SSD?', options:['Fresh Windows install','Disk cloning software','Copy-paste files','Defragment first'], correct:1 },
      ],
      difficulty:'medium', category:'hardware', xpReward:240, tier:2,
    },
    {
      symptom: (u) => `${u}'s gaming PC artifacts on screen — random colored blocks.`,
      causes: ['GPU overheating','GPU driver corruption','GPU hardware failing'],
      correctCause: 0,
      steps: ['Monitor GPU temperature under load','Clean GPU heatsink and fans','Reinstall GPU drivers (DDU clean install)','Test with integrated graphics'],
      quiz: [
        { q:'Screen artifacting during gaming. First diagnostic step?', options:['Replace monitor','Check GPU temperature','Update BIOS','Replace CPU'], correct:1 },
      ],
      difficulty:'medium', category:'hardware', xpReward:280, tier:2,
    },
  ],

  networking: [
    {
      symptom: (u) => `${u} can't access the internet but LAN works fine.`,
      causes: ['Router lost WAN connection','ISP outage','DNS server down'],
      correctCause: 0,
      steps: ['Ping gateway (192.168.1.1) — success?','Ping 8.8.8.8 — success?','If ping IP works but not domain: DNS issue','Restart router / call ISP'],
      quiz: [
        { q:'User pings 192.168.1.1 OK but 8.8.8.8 fails. Problem is?', options:['LAN cable broken','DNS server down','WAN/ISP connection issue','Firewall blocking'], correct:2 },
      ],
      difficulty:'easy', category:'networking', xpReward:130, tier:1,
    },
    {
      symptom: (u) => `${u} can browse internet but can't open specific websites.`,
      causes: ['DNS resolution failure for that domain','Site blocked by firewall','Hosts file entry'],
      correctCause: 0,
      steps: ['Try nslookup the domain','Flush DNS cache (ipconfig /flushdns)','Try with alternative DNS (8.8.8.8)','Check hosts file for manual entries'],
      quiz: [
        { q:'User can browse google.com but not company-internal.com. What to check first?', options:['Restart router','nslookup company-internal.com','Change WiFi password','Reinstall browser'], correct:1 },
      ],
      difficulty:'medium', category:'networking', xpReward:200, tier:2,
    },
    {
      symptom: (u) => `${u} complains WiFi signal drops every hour.`,
      causes: ['WiFi channel congestion','Interference from microwave/cordless phone','AP firmware bug'],
      correctCause: 0,
      steps: ['Use WiFi analyzer to check channel congestion','Change AP to less congested channel (1,6,11 for 2.4GHz)','Update AP firmware','Enable 5GHz band if supported'],
      quiz: [
        { q:'WiFi drops every hour in office. Most common cause?', options:['Too many users','Channel interference/congestion','Cable broken','ISP issue'], correct:1 },
      ],
      difficulty:'medium', category:'networking', xpReward:230, tier:3,
    },
    {
      symptom: (u) => `${u}'s PC gets 169.254.x.x IP address — can't connect to anything.`,
      causes: ['DHCP server not responding','PC network adapter issue','DHCP pool exhausted'],
      correctCause: 0,
      steps: ['169.254.x.x = APIPA = no DHCP response','Run ipconfig /release then /renew','Check DHCP server is running','Check if DHCP pool has available IPs'],
      quiz: [
        { q:'PC has 169.254.x.x IP. What does this mean?', options:['Static IP assigned','DHCP server is not responding (APIPA)','Internet is down','VPN connected'], correct:1 },
      ],
      difficulty:'medium', category:'networking', xpReward:250, tier:3,
    },
    {
      symptom: (u) => `${u} has high latency and packet loss during video calls.`,
      causes: ['Network congestion','QoS not configured','WiFi interference','Bandwidth-hogging application'],
      correctCause: 0,
      steps: ['Run ping -t to measure packet loss','Run tracert to find problem hop','Check for bandwidth-heavy apps (Windows Update?)','Enable QoS for video calls'],
      quiz: [
        { q:'Best command to diagnose packet loss on network path?', options:['ipconfig','ping -t 8.8.8.8','nslookup','netstat'], correct:1 },
      ],
      difficulty:'hard', category:'networking', xpReward:420, tier:4,
    },
    {
      symptom: (u) => `New network printer not found by any PC on the subnet.`,
      causes: ['Printer on wrong VLAN','Static IP conflict','Printer discovery disabled','Firewall blocking'],
      correctCause: 0,
      steps: ['Print config page to find printer IP','Ping printer IP from affected PC','Check VLAN assignment on switch port','Add printer via IP address directly'],
      quiz: [
        { q:'Network printer not discovered. First step to diagnose?', options:['Restart all PCs','Print config page to get IP then ping','Reinstall network drivers','Replace printer'], correct:1 },
      ],
      difficulty:'medium', category:'networking', xpReward:270, tier:3,
    },
  ],

  os: [
    {
      symptom: (u) => `${u}'s Windows 10 takes 5 minutes to boot up.`,
      causes: ['Too many startup programs','HDD fragmented (if HDD not SSD)','Windows update stuck'],
      correctCause: 0,
      steps: ['Open Task Manager → Startup tab','Disable non-essential startup programs','Run Disk Cleanup','Check for pending Windows updates'],
      quiz: [
        { q:'Windows boots very slowly. First optimization step?', options:['Reinstall Windows','Disable startup programs in Task Manager','Add more RAM','Replace CPU'], correct:1 },
      ],
      difficulty:'easy', category:'os', xpReward:110, tier:1,
    },
    {
      symptom: (u) => `${u} gets BSOD "DRIVER_IRQL_NOT_LESS_OR_EQUAL" after Windows Update.`,
      causes: ['Incompatible driver after update','Driver corruption','Hardware conflict'],
      correctCause: 0,
      steps: ['Boot into Safe Mode','Identify driver from BSOD stop code (WinDbg)','Roll back Windows Update or driver','Uninstall problematic driver then reinstall'],
      quiz: [
        { q:'BSOD after Windows Update. Best first step?', options:['Reinstall Windows','Boot Safe Mode and roll back update','Replace hard drive','Format PC'], correct:1 },
      ],
      difficulty:'medium', category:'os', xpReward:260, tier:3,
    },
    {
      symptom: (u) => `${u} can't run any .exe files — all show "Access Denied".`,
      causes: ['Software restriction policy','Ransomware blocking execution','AppLocker policy','User account permission issue'],
      correctCause: 0,
      steps: ['Check if admin account also affected','Check Group Policy for software restrictions','Check AppLocker rules','Scan for malware immediately'],
      quiz: [
        { q:'.exe files blocked for a user. Most suspicious cause?', options:['Missing .NET Framework','Ransomware or malware attack','Low disk space','GPU driver issue'], correct:1 },
      ],
      difficulty:'hard', category:'os', xpReward:480, tier:3,
    },
    {
      symptom: (u) => `${u} deleted System32 folder accidentally. PC won't boot.`,
      causes: ['Critical OS files deleted'],
      correctCause: 0,
      steps: ['Boot from Windows USB installer','Go to Repair → Troubleshoot → Command Prompt','Run sfc /scannow and DISM to repair','If unrepairable: fresh Windows install (data on separate partition safe)'],
      quiz: [
        { q:'System32 deleted. PC won\'t boot. Recovery option?', options:['ipconfig /release','Boot from USB → Windows Repair tools','Press F8 for Safe Mode','Nothing — replace PC'], correct:1 },
      ],
      difficulty:'hard', category:'os', xpReward:520, tier:3,
    },
    {
      symptom: (u) => `${u} forgot Windows admin password and is locked out.`,
      causes: ['Forgotten password'],
      correctCause: 0,
      steps: ['Use another admin account to reset','Boot from recovery USB for local account reset','For Microsoft Account: reset via microsoft.com','Avoid factory reset to preserve data'],
      quiz: [
        { q:'User locked out of Windows admin account. Safest recovery?', options:['Factory reset','Use another admin account or recovery USB','Hack registry from USB','Guess password'], correct:1 },
      ],
      difficulty:'easy', category:'os', xpReward:140, tier:2,
    },
  ],

  security: [
    {
      symptom: (u) => `${u} received email from "CEO" asking for urgent wire transfer. Looks suspicious.`,
      causes: ['Business Email Compromise (BEC) / CEO fraud'],
      correctCause: 0,
      steps: ['Do NOT comply with request','Verify by calling CEO directly on known number','Report to security team','Forward email to security for analysis'],
      quiz: [
        { q:'"CEO" emails asking for urgent wire transfer. What do you do?', options:['Process the transfer — it\'s urgent','Call CEO directly on known number to verify','Reply asking for more info','Ignore it'], correct:1 },
      ],
      difficulty:'easy', category:'security', xpReward:150, tier:2,
    },
    {
      symptom: (u) => `${u}'s PC is running very slow with pop-up ads everywhere.`,
      causes: ['Adware/malware infection','Browser hijacked','PUP installed'],
      correctCause: 0,
      steps: ['Disconnect from network','Run Malwarebytes scan','Remove browser extensions','Reset browser settings','Check startup programs for unknown entries'],
      quiz: [
        { q:'Pop-up ads everywhere on a PC. First action?', options:['Reinstall Windows','Disconnect from network and run malware scan','Call browser support','Replace HDD'], correct:1 },
      ],
      difficulty:'easy', category:'security', xpReward:140, tier:2,
    },
    {
      symptom: (u) => `${u} clicked a link and now files have .encrypted extension.`,
      causes: ['Ransomware infection'],
      correctCause: 0,
      steps: ['IMMEDIATELY disconnect all network cables and WiFi','Do not pay ransom','Report to IT security team','Restore from clean backup','Preserve encrypted files as evidence'],
      quiz: [
        { q:'Files have .encrypted extension. What NOT to do?', options:['Disconnect from network','Pay the ransom immediately','Report to security team','Restore from backup'], correct:1 },
      ],
      difficulty:'hard', category:'security', xpReward:550, tier:6,
    },
    {
      symptom: (u) => `${u}'s account shows login from unknown country at 3 AM.`,
      causes: ['Compromised credentials','Account takeover attempt'],
      correctCause: 0,
      steps: ['Immediately change account password','Enable MFA if not active','Check all active sessions and revoke unknown ones','Review account activity log','Report to security team'],
      quiz: [
        { q:'Account login from unknown country detected. First action?', options:['Change password and enable MFA','Wait and monitor','Contact that country\'s IT','Disable internet'], correct:0 },
      ],
      difficulty:'medium', category:'security', xpReward:320, tier:5,
    },
  ],

  sysadmin: [
    {
      symptom: (u) => `${u} can't access shared folder — "Access Denied" error.`,
      causes: ['User not in security group','NTFS permissions issue','Share permissions too restrictive'],
      correctCause: 0,
      steps: ['Check if user is in correct AD group','Check NTFS permissions on folder','Check Share permissions (should be at least Read)','Most restrictive permission wins — check both'],
      quiz: [
        { q:'User gets "Access Denied" on shared folder. First check?', options:['Restart file server','Check user AD group membership and folder permissions','Reinstall Windows','Replace network cable'], correct:1 },
      ],
      difficulty:'medium', category:'sysadmin', xpReward:290, tier:5,
    },
    {
      symptom: (u) => `Database server disk usage at 95%. Apps starting to fail.`,
      causes: ['Log files not rotated','Database transaction logs full','Old backups not cleaned'],
      correctCause: 0,
      steps: ['Run df -h / dir to identify large items','Check database transaction log size','Shrink/archive transaction logs','Set up automated log rotation','Move old backups to tape/cold storage'],
      quiz: [
        { q:'Database server disk at 95%. Likely culprit?', options:['Too many users logged in','Unrotated database transaction logs and old backups','CPU overload','RAM shortage'], correct:1 },
      ],
      difficulty:'hard', category:'sysadmin', xpReward:480, tier:5,
    },
    {
      symptom: (u) => `Remote Desktop stops working after server update.`,
      causes: ['RDP service stopped','Firewall blocking port 3389','Network Level Authentication change'],
      correctCause: 0,
      steps: ['Check RDP service is running (services.msc)','Verify firewall allows port 3389','Check if NLA setting changed','Test with mstsc from local network first'],
      quiz: [
        { q:'RDP stopped working after server patch. First check?', options:['Replace server NIC','Check RDP service running and firewall port 3389','Reinstall Windows Server','Check disk space'], correct:1 },
      ],
      difficulty:'medium', category:'sysadmin', xpReward:310, tier:5,
    },
    {
      symptom: (u) => `${u} reports backup job failed overnight — no backup for 3 days.`,
      causes: ['Backup destination full','Backup service stopped','Network path changed'],
      correctCause: 0,
      steps: ['Check backup destination disk space','Delete old backup sets if space critical','Verify backup service is running','Re-run manual backup and monitor'],
      quiz: [{ q:'Backup job failing silently for 3 days. First check?', options:['Reinstall backup software','Check backup destination disk space and service status','Replace server','Ignore — backups rarely needed'], correct:1 }],
      difficulty:'hard', category:'sysadmin', xpReward:500, tier:5,
    },
    {
      symptom: (u) => `${u} needs to know why a Linux service won't start after reboot.`,
      causes: ['Service not enabled for autostart','Config file syntax error','Dependency service not running'],
      correctCause: 0,
      steps: ['Run: systemctl status service-name','Check logs: journalctl -u service-name','Enable autostart: systemctl enable service-name','Check config file syntax'],
      quiz: [{ q:'Linux service not starting after reboot. How to check why?', options:['Reinstall Linux','systemctl status service-name and journalctl -u service-name','Restart the whole server','Check disk space'], correct:1 }],
      difficulty:'medium', category:'sysadmin', xpReward:320, tier:5,
    },
  ],

  helpdesk: [
    {
      symptom: (u) => `${u} says "everything is broken" — no specific details given.`,
      causes: ['Vague report needs clarification','User unfamiliar with IT terminology','Multiple issues combined'],
      correctCause: 0,
      steps: ['Ask specific questions: What exactly cannot you do?','Ask: When did it last work?','Ask: Did anything change recently?','Reproduce the issue to confirm'],
      quiz: [{ q:'User says "everything is broken." First IT response?', options:['Reinstall Windows','Ask specific clarifying questions to narrow down the actual issue','Ignore the ticket','Escalate immediately'], correct:1 }],
      difficulty:'easy', category:'helpdesk', xpReward:100, tier:1,
    },
    {
      symptom: (u) => `${u} is angry — issue has been open for 2 days with no update.`,
      causes: ['Ticket fell through cracks','SLA breach','No communication to user'],
      correctCause: 0,
      steps: ['Acknowledge and apologize for delay','Give honest ETA for resolution','Escalate if needed to meet SLA','Update ticket with current status'],
      quiz: [{ q:'User angry about 2-day-old unresolved ticket. Best response?', options:['Argue with the user','Apologize, give honest status update and ETA, escalate if needed','Close the ticket','Blame another team'], correct:1 }],
      difficulty:'easy', category:'helpdesk', xpReward:110, tier:1,
    },
    {
      symptom: (u) => `${u} calls asking how to set up email on their new iPhone.`,
      causes: ['User needs guided setup assistance'],
      correctCause: 0,
      steps: ['Get email provider (Outlook/Gmail)','Settings → Mail → Add Account','Enter email and password','Verify sync settings (IMAP recommended)'],
      quiz: [{ q:'User needs help setting up email on iPhone. Where is this configured?', options:['Download special app','Settings → Mail → Add Account → choose provider','Call Apple Support','Reinstall iOS'], correct:1 }],
      difficulty:'easy', category:'helpdesk', xpReward:90, tier:1,
    },
    {
      symptom: (u) => `${u} asks why their Zoom audio isn't working in a meeting.`,
      causes: ['Wrong audio device selected in Zoom','Microphone permission denied','Audio driver issue'],
      correctCause: 0,
      steps: ['In Zoom: click arrow next to Mute → Audio Settings','Select correct microphone device','Check Windows Sound settings → Recording tab','Test microphone in Zoom settings'],
      quiz: [{ q:'Zoom audio not working. First place to check?', options:['Reinstall Zoom','Zoom Audio Settings → select correct microphone device','Replace laptop','Check internet speed'], correct:1 }],
      difficulty:'easy', category:'helpdesk', xpReward:95, tier:1,
    },
    {
      symptom: (u) => `${u} locked out of company portal after 3 failed login attempts.`,
      causes: ['Account locked by security policy','Forgot password','Caps Lock on during password entry'],
      correctCause: 0,
      steps: ['Verify identity per security policy','Unlock account in Active Directory','Force password reset','Advise user to check Caps Lock next time'],
      quiz: [{ q:'User locked out of company portal. IT helpdesk first step?', options:['Delete their account','Verify identity then unlock account in AD','Give them admin access','Ignore it'], correct:1 }],
      difficulty:'easy', category:'helpdesk', xpReward:100, tier:2,
    },
    {
      symptom: (u) => `${u} reports VPN connects but internal file share is not accessible.`,
      causes: ['Drive mapping not set up','DNS resolving incorrectly over VPN','User not in correct AD group'],
      correctCause: 0,
      steps: ['Confirm VPN is connected and shows internal IP','Try mapping drive manually: \\\\server\\share','Check if user can ping server by hostname','Verify AD group membership for share access'],
      quiz: [{ q:'VPN connected but cannot access file share. First check?', options:['Reinstall VPN','Try to manually map the network drive and test DNS resolution over VPN','Buy new router','Call ISP'], correct:1 }],
      difficulty:'medium', category:'helpdesk', xpReward:250, tier:4,
    },
  ],
};

/**
 * Generate a random ticket based on player level and optional category
 */
export function generateTicket(playerLevel = 1, preferredCategory = null) {
  // Pick category
  const categories = Object.keys(TEMPLATES);
  const category = preferredCategory && TEMPLATES[preferredCategory]
    ? preferredCategory
    : rnd(categories);

  // Filter templates by tier suitability
  const tierMax = playerLevel <= 10 ? 1 : playerLevel <= 20 ? 2 : playerLevel <= 35 ? 3 : playerLevel <= 50 ? 4 : playerLevel <= 70 ? 5 : 6;
  const pool = TEMPLATES[category].filter(t => (t.tier ?? 1) <= tierMax);
  const template = rnd(pool.length > 0 ? pool : TEMPLATES[category]);

  // Randomize user & meta
  const user      = rnd(USERS);
  const location  = rnd(LOCATIONS);
  const time      = rnd(TIMES);
  const ticketId  = `TKT-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  return {
    id: ticketId,
    user,
    location,
    reportedAt: time,
    category,
    difficulty: template.difficulty,
    symptom: template.symptom(user),
    causes: template.causes,
    correctCause: template.correctCause,
    steps: template.steps,
    quiz: template.quiz,
    xpReward: template.xpReward,
    coinReward: getTicketCoinReward(template.difficulty),
    tier: template.tier ?? 1,
  };
}

function getTicketCoinReward(diff) {
  const map = { easy: 15, medium: 35, hard: 80, epic: 200 };
  return map[diff] ?? 15;
}

/**
 * Generate a batch of tickets (for ticket mode)
 */
export function generateTicketBatch(count = 5, playerLevel = 1) {
  return Array.from({ length: count }, () => generateTicket(playerLevel));
}

export { TEMPLATES };
