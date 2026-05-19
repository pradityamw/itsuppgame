// Career Path Specialization System
// 5 paths, each with unique perks, XP bonuses, and unlocks

export const CAREER_PATHS = {

  hardware: {
    id: 'hardware',
    name: 'Hardware Technician',
    nameId: 'Teknisi Hardware',
    emoji: '🖥️',
    color: '#ff6b00',
    description: 'Master physical repair, component installation, and PC building.',
    descriptionId: 'Kuasai perbaikan fisik, pemasangan komponen, dan merakit PC.',
    unlockLevel: 1,
    xpBonus: {                // +% XP for category missions
      hardware: 0.30,
      default:  0.0,
    },
    exclusiveTools: ['thermal_gun', 'component_tester', 'soldering_kit', 'microscope'],
    exclusiveAreas: ['upgradeCenter', 'componentLab', 'pcBuildArena'],
    perks: [
      { level: 1,  id: 'quick_hands',     name: 'Quick Hands',     desc: '+30% XP on all hardware missions' },
      { level: 5,  id: 'diagnostics',     name: 'Expert Diagnosis', desc: 'Always see component health status' },
      { level: 10, id: 'overclocking',    name: 'Overclocker',     desc: 'Unlock overclocking missions' },
      { level: 15, id: 'build_master',    name: 'Build Master',    desc: 'Unlock PC Build Arena challenge mode' },
      { level: 20, id: 'legendary_wrench',name: 'Legendary Wrench',desc: '+50% coin reward on hardware repairs' },
    ],
    skillFocus: ['hardware', 'cooling', 'storage', 'display'],
  },

  network: {
    id: 'network',
    name: 'Network Engineer',
    nameId: 'Network Engineer',
    emoji: '🌐',
    color: '#00f5ff',
    description: 'Specialize in networking, routing, protocols, and infrastructure.',
    descriptionId: 'Spesialisasi jaringan, routing, protokol, dan infrastruktur.',
    unlockLevel: 10,
    xpBonus: {
      networking: 0.35,
      default:    0.0,
    },
    exclusiveTools: ['packet_sniffer', 'cable_certifier', 'network_analyzer', 'wifi_scanner'],
    exclusiveAreas: ['ispBranch', 'networkOpsRoom', 'telecomCenter'],
    perks: [
      { level: 1,  id: 'ip_master',      name: 'IP Master',        desc: '+35% XP on networking missions' },
      { level: 5,  id: 'wireshark',      name: 'Packet Inspector',  desc: 'View detailed packet logs in network missions' },
      { level: 10, id: 'vlan_expert',    name: 'VLAN Expert',      desc: 'Unlock VLAN configuration missions' },
      { level: 15, id: 'routing_guru',   name: 'Routing Guru',     desc: 'Unlock advanced routing challenges' },
      { level: 20, id: 'net_architect',  name: 'Net Architect',    desc: 'Design entire office networks — epic rewards' },
    ],
    skillFocus: ['networking', 'security', 'protocols', 'infrastructure'],
  },

  sysadmin: {
    id: 'sysadmin',
    name: 'System Administrator',
    nameId: 'Administrator Sistem',
    emoji: '⚙️',
    color: '#bf00ff',
    description: 'Manage servers, backups, virtualization, and enterprise IT.',
    descriptionId: 'Kelola server, backup, virtualisasi, dan IT enterprise.',
    unlockLevel: 20,
    xpBonus: {
      sysadmin: 0.35,
      os:       0.15,
      default:  0.0,
    },
    exclusiveTools: ['remote_console', 'backup_manager', 'vm_controller', 'monitoring_dash'],
    exclusiveAreas: ['serverRoom', 'miniDataCenter', 'itControlCenter'],
    perks: [
      { level: 1,  id: 'admin_rights',   name: 'Admin Rights',    desc: '+35% XP on sysadmin missions' },
      { level: 5,  id: 'scripting',      name: 'Script Wizard',   desc: 'Automation scripts available in terminal' },
      { level: 10, id: 'vm_master',      name: 'VM Master',       desc: 'Unlock virtualization missions' },
      { level: 15, id: 'backup_pro',     name: 'Backup Pro',      desc: '+2x rewards on backup & recovery missions' },
      { level: 20, id: 'infrastructure', name: 'Infra Architect', desc: 'Unlock enterprise infrastructure design' },
    ],
    skillFocus: ['sysadmin', 'os', 'networking', 'storage'],
  },

  security: {
    id: 'security',
    name: 'Security Specialist',
    nameId: 'Spesialis Keamanan',
    emoji: '🛡️',
    color: '#ff2d78',
    description: 'Protect systems from threats, investigate incidents, and secure infrastructure.',
    descriptionId: 'Lindungi sistem dari ancaman, investigasi insiden, dan amankan infrastruktur.',
    unlockLevel: 35,
    xpBonus: {
      security: 0.40,
      default:  0.0,
    },
    exclusiveTools: ['threat_scanner', 'forensics_kit', 'vpn_config', 'siem_dashboard'],
    exclusiveAreas: ['secOps', 'securityWing', 'threatRoom', 'cyberDefenseCenter'],
    perks: [
      { level: 1,  id: 'threat_intel',  name: 'Threat Intel',    desc: '+40% XP on security missions' },
      { level: 5,  id: 'forensics',     name: 'Forensics Expert', desc: 'See hidden clues in incident investigations' },
      { level: 10, id: 'pentest',       name: 'Pen Tester',      desc: 'Unlock penetration testing missions' },
      { level: 15, id: 'soc_analyst',   name: 'SOC Analyst',     desc: 'Unlock Security Operations Center challenges' },
      { level: 20, id: 'chief_defender',name: 'Chief Defender',  desc: 'Unlock epic ransomware response scenarios' },
    ],
    skillFocus: ['security', 'networking', 'sysadmin', 'investigation'],
  },

  helpdesk: {
    id: 'helpdesk',
    name: 'Helpdesk Specialist',
    nameId: 'Spesialis Helpdesk',
    emoji: '🎧',
    color: '#ffe600',
    description: 'Excel at customer service, communication, and multi-tier support.',
    descriptionId: 'Unggul di layanan pelanggan, komunikasi, dan dukungan multi-tier.',
    unlockLevel: 1,
    xpBonus: {
      helpdesk: 0.30,
      soft_skills: 0.50,
      default:  0.05,  // Small bonus on ALL missions (best for generalists)
    },
    exclusiveTools: ['knowledge_base', 'ticketing_system', 'remote_support', 'customer_portal'],
    exclusiveAreas: ['callCenter', 'supportHub', 'customerSuccessZone'],
    perks: [
      { level: 1,  id: 'people_person', name: 'People Person',   desc: '+5% XP on ALL missions, +30% on helpdesk' },
      { level: 5,  id: 'fast_learner',  name: 'Fast Learner',    desc: 'Hints cost 50% less coins' },
      { level: 10, id: 'multitasker',   name: 'Multitasker',     desc: 'Handle 2 tickets simultaneously' },
      { level: 15, id: 'ticket_master', name: 'Ticket Master',   desc: '+3x rewards in endless ticket mode' },
      { level: 20, id: 'legendary_rep', name: 'Legendary Rep',   desc: 'Max reputation always — unlock VIP missions' },
    ],
    skillFocus: ['communication', 'hardware', 'os', 'networking'],
  },
};

/**
 * Get career path info by ID
 */
export function getCareerPath(id) {
  return CAREER_PATHS[id] ?? null;
}

/**
 * Calculate XP bonus for a mission category given career path
 */
export function getCareerXPBonus(careerPathId, missionCategory) {
  const path = CAREER_PATHS[careerPathId];
  if (!path) return 1.0;
  const bonus = path.xpBonus[missionCategory] ?? path.xpBonus.default ?? 0;
  return 1.0 + bonus;
}

/**
 * Get perks unlocked at a career level
 */
export function getUnlockedPerks(careerPathId, careerLevel) {
  const path = CAREER_PATHS[careerPathId];
  if (!path) return [];
  return path.perks.filter(p => p.level <= careerLevel);
}

/**
 * Get all available career paths for a player level
 */
export function getAvailablePaths(playerLevel) {
  return Object.values(CAREER_PATHS).filter(p => p.unlockLevel <= playerLevel);
}

// Career level (separate from player level, maxes at 20 per path)
export const MAX_CAREER_LEVEL = 20;
