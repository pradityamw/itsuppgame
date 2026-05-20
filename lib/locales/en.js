// EN/ID Localization — English
const en = {
  // ===== META =====
  gameName: 'IT Support Adventure',
  tagline: 'Learn IT Support. One Ticket at a Time.',
  version: 'v1.0',

  // ===== LANGUAGE PICKER =====
  chooseLanguage: 'Choose Your Language',
  languageSubtitle: 'You can change this later in settings',
  english: 'English',
  indonesian: 'Indonesian',
  confirm: 'Confirm',

  // ===== AUTH =====
  login: 'Login',
  register: 'Register',
  logout: 'Logout',
  email: 'Email Address',
  password: 'Password',
  confirmPassword: 'Confirm Password',
  name: 'Your Name',
  guestPlay: 'Play as Guest',
  noAccount: "Don't have an account?",
  hasAccount: 'Already have an account?',
  loginWith: 'Sign in',
  registerWith: 'Create Account',
  loginSuccess: 'Welcome back, technician!',
  registerSuccess: 'Account created! Welcome to the team!',
  loginError: 'Invalid email or password.',
  authLoading: 'Connecting to server...',

  // ===== MAIN MENU =====
  play: 'Play',
  continueGame: 'Continue',
  newGame: 'New Game',
  settings: 'Settings',
  profile: 'Profile',
  leaderboard: 'Leaderboard',
  credits: 'Credits',
  dailyBonus: 'Claim Daily Bonus',
  streakDays: '{n} Day Streak! 🔥',

  // ===== GAME HUB =====
  hub: 'Mission Hub',
  adventureMode: 'Adventure Mode',
  dailyMode: 'Daily Tasks',
  workshopMode: 'Workshop',
  profileMode: 'My Profile',
  exploreMaps: 'Explore Areas',
  availableMissions: 'Available Missions',
  completedMissions: 'Completed',
  lockedMissions: 'Locked',
  requiresLevel: 'Requires Level {n}',

  // ===== XP / LEVEL =====
  level: 'Level',
  xp: 'XP',
  coins: 'Coins',
  rank: 'Rank',
  xpToNext: '{n} XP to next level',
  levelUp: 'LEVEL UP!',
  rankUp: 'RANK UP!',
  newRank: 'You are now: {rank}',

  // ===== RANKS =====
  ranks: {
    intern: 'Intern',
    junior: 'Junior IT',
    support: 'IT Support',
    tech: 'Network Technician',
    sysadmin: 'SysAdmin',
    senior: 'Senior Engineer',
  },

  // ===== MISSIONS =====
  missions: 'Missions',
  missionStart: 'Start Mission',
  missionResume: 'Resume',
  missionRetry: 'Try Again',
  missionComplete: 'Mission Complete!',
  missionFailed: 'Mission Failed',
  missionObjective: 'Objective',
  missionHint: 'Hint',
  showHint: 'Show Hint',
  difficulty: 'Difficulty',
  reward: 'Reward',
  xpReward: '+{n} XP',
  coinReward: '+{n} Coins',
  timeBonus: 'Speed Bonus!',

  // ===== BEGINNER MISSIONS =====
  mission1: {
    title: "PC Won't Turn On",
    npc: "Help! My PC won't turn on at all! I pressed the power button like 100 times!",
    objective: 'Diagnose why the PC won\'t start and fix the issue.',
    hint: 'Check all power connections inside the PC case.',
    solution: 'The PSU (Power Supply Unit) cable was loose. Reconnecting it restored power.',
    failExplain: 'A loose PSU cable prevents the PC from receiving power. Always check connections first!',
    category: 'Hardware',
  },
  mission2: {
    title: 'Internet Disconnected',
    npc: "My internet stopped working! I can't even watch my videos!",
    objective: 'Find out why the internet isn\'t working and restore the connection.',
    hint: 'Check the physical network devices — are all cables plugged in?',
    solution: 'The router was unplugged. Plugging it back in restored the internet connection.',
    failExplain: 'Always check physical connections before complex troubleshooting. Start simple!',
    category: 'Networking',
  },
  mission3: {
    title: 'PC Overheating',
    npc: "My PC keeps shutting down randomly! It's driving me crazy!",
    objective: 'Identify the cause of overheating and resolve it.',
    hint: 'Check the cooling system — fans, heatsink, and airflow.',
    solution: 'Dust buildup on the CPU fan was blocking airflow. Cleaning it fixed the overheating.',
    failExplain: 'Dust is a silent killer for PCs. Regular cleaning every 6 months prevents overheating.',
    category: 'Hardware',
  },
  mission4: {
    title: 'Printer Not Working',
    npc: "I need to print this report NOW! The printer won't respond!",
    objective: 'Diagnose why the printer isn\'t responding and fix the connection.',
    hint: 'Check which cable connects the printer to the computer.',
    solution: 'The USB cable was plugged into the wrong port. Moving it to the correct port fixed it.',
    failExplain: 'Always verify cable types and ports. USB-A ≠ USB-B. Labels matter!',
    category: 'Hardware',
  },
  mission5: {
    title: 'Slow Computer',
    npc: "My computer takes forever to start! I can make coffee and it's still loading...",
    objective: 'Diagnose why the PC is slow to start and optimize it.',
    hint: 'Check what programs run automatically when Windows starts.',
    solution: 'Too many startup programs were slowing boot time. Disabling unnecessary ones fixed it.',
    failExplain: 'Startup programs consume RAM and CPU before you even use the PC. Manage them with Task Manager!',
    category: 'OS',
  },

  // ===== DAILY TASKS =====
  dailyTasks: 'Daily Tasks',
  dailyReset: 'Resets in {time}',
  taskComplete: 'Task Complete!',
  taskClaim: 'Claim Reward',
  allDone: 'All done for today! Come back tomorrow!',
  streakBonus: 'Streak Bonus: +{n} XP',
  taskEasy: 'Easy',
  taskMedium: 'Medium',
  taskHard: 'Hard',

  // ===== PC REPAIR =====
  pcRepair: 'PC Repair',
  openCase: 'Open PC Case',
  inspectComponents: 'Inspect Components',
  dragToFix: 'Drag the component to its correct slot',
  componentFixed: 'Component Secured! ✓',
  componentWrong: 'Wrong slot! Try again.',
  allFixed: 'All components are properly connected!',
  components: {
    cpu: 'CPU',
    ram: 'RAM',
    ssd: 'SSD / HDD',
    gpu: 'GPU',
    psu: 'PSU (Power Supply)',
    fan: 'CPU Fan',
    motherboard: 'Motherboard',
    cables: 'Power Cables',
  },

  // ===== NETWORK PUZZLE =====
  networkPuzzle: 'Network Troubleshooter',
  reconnectCable: 'Click broken connection to reconnect',
  pingTest: 'Run Ping Test',
  pingSuccess: 'Ping successful! Connection restored.',
  pingFail: 'Ping failed. Check your connections.',
  networkFixed: 'Network topology restored!',
  devices: {
    internet: 'Internet',
    router: 'Router',
    switch: 'Switch',
    pc: 'PC',
    printer: 'Printer',
    server: 'Server',
    modem: 'Modem',
  },

  // ===== TERMINAL =====
  terminal: 'Terminal',
  terminalWelcome: 'IT Support Terminal v1.0\nType "help" for available commands.\n',
  terminalHelp: `Available commands:
  ping [host]     - Test network connectivity
  ipconfig        - Display IP configuration  
  tracert [host]  - Trace network route
  nslookup [host] - Query DNS records
  netstat         - Show network connections
  cls             - Clear terminal
  help            - Show this help`,

  // ===== SKILL TREE =====
  skillTree: 'Skill Tree',
  skillPoints: 'Skill Points: {n}',
  unlockSkill: 'Unlock Skill',
  skillUnlocked: 'Skill Unlocked: {skill}',
  skillCategories: {
    hardware: 'Hardware',
    networking: 'Networking',
    security: 'Security',
    troubleshooting: 'Troubleshooting',
    customerService: 'Customer Service',
  },

  // ===== TOOLS =====
  tools: 'Tools',
  inventory: 'Inventory',
  toolUnlocked: 'New Tool Unlocked: {tool}',
  toolNames: {
    screwdriver: 'Screwdriver',
    cableTester: 'Cable Tester',
    usbToolkit: 'USB Toolkit',
    thermalScanner: 'Thermal Scanner',
    adminKit: 'Admin Toolkit',
    networkAnalyzer: 'Network Analyzer',
  },

  // ===== MAP =====
  map: 'World Map',
  areas: {
    bedroom: 'Bedroom Setup',
    repairShop: 'Repair Shop',
    homeNetwork: 'Home Network',
    computerLab: 'School Computer Lab',
    office: 'Office Building',
    internetCafe: 'Internet Café',
    enterprise: 'Enterprise Office',
    serverRoom: 'Server Room',
    dataCenter: 'Data Center',
    secOps: 'Security Operations',
  },
  areaLocked: 'Area Locked — Complete more missions to unlock!',
  areaUnlocked: 'New Area Unlocked: {area}!',

  // ===== ACHIEVEMENTS =====
  achievements: 'Achievements',
  achievementUnlocked: 'Achievement Unlocked!',
  achievementList: {
    firstFix: { name: 'First Fix!', desc: 'Complete your first mission' },
    speedRunner: { name: 'Speed Runner', desc: 'Complete a mission in under 60 seconds' },
    noHints: { name: 'No Hints Needed', desc: 'Complete a mission without hints' },
    streak7: { name: 'Week Warrior', desc: '7-day login streak' },
    streak30: { name: 'Monthly Pro', desc: '30-day login streak' },
    level10: { name: 'Rising Tech', desc: 'Reach Level 10' },
    allBeginner: { name: 'Beginner Graduate', desc: 'Complete all beginner missions' },
    networkWiz: { name: 'Network Wizard', desc: 'Fix 10 network issues' },
    hardwarePro: { name: 'Hardware Pro', desc: 'Fix 10 hardware issues' },
  },

  // ===== PROFILE =====
  myProfile: 'My Profile',
  joinedDate: 'Joined: {date}',
  missionsCompleted: 'Missions Completed',
  totalXP: 'Total XP Earned',
  topSkill: 'Top Skill',
  editProfile: 'Edit Profile',
  chooseAvatar: 'Choose Avatar',

  // ===== SETTINGS =====
  settings: 'Settings',
  sound: 'Sound',
  music: 'Music',
  sfx: 'Sound Effects',
  language: 'Language',
  notifications: 'Notifications',
  saveToCloud: 'Cloud Save',

  // ===== GENERAL =====
  loading: 'Loading...',
  error: 'Something went wrong!',
  retry: 'Retry',
  cancel: 'Cancel',
  close: 'Close',
  next: 'Next',
  back: 'Back',
  done: 'Done!',
  yes: 'Yes',
  no: 'No',
  ok: 'OK',
  save: 'Save',
  continue: 'Continue',
  skip: 'Skip',
  congratulations: 'Congratulations!',
  youGot: 'You earned:',
  missionObjective: 'Objective',
  inProgress: 'In Progress',
  completed: 'Completed',
  locked: 'Locked',
  logoutConfirm: 'Are you sure you want to log out to switch accounts?',
  resetLevel: 'Reset Level',
  resetLevelConfirm: 'Are you sure you want to reset all connections and device positions back to default?',
  resetLevelSuccess: 'Level reset successfully!',
};

export default en;
