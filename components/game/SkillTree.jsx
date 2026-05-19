'use client';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { useLanguage } from '@/context/LanguageContext';
import { sound } from '@/lib/audio';
import { Badge } from '@/components/ui';

const SKILL_CATEGORIES = [
  {
    key: 'hardware', emoji: '🔧', color: '#ff6b00',
    skills: [
      { id: 'hw1', name: 'Component Basics',   desc: 'Identify CPU, RAM, SSD, GPU', cost: 1 },
      { id: 'hw2', name: 'Cable Management',    desc: 'Properly route and connect cables', cost: 1 },
      { id: 'hw3', name: 'Thermal Management',  desc: 'Diagnose and fix overheating', cost: 2 },
      { id: 'hw4', name: 'BIOS Mastery',        desc: 'Configure BIOS/UEFI settings', cost: 2 },
      { id: 'hw5', name: 'Hardware Pro',        desc: 'Full hardware diagnostic expert', cost: 3 },
    ],
  },
  {
    key: 'networking', emoji: '🌐', color: '#00f5ff',
    skills: [
      { id: 'net1', name: 'IP Addressing',    desc: 'Understand IPv4, subnets, DHCP', cost: 1 },
      { id: 'net2', name: 'DNS & Routing',    desc: 'Diagnose DNS and routing issues', cost: 1 },
      { id: 'net3', name: 'WiFi Expert',      desc: 'Configure and secure wireless', cost: 2 },
      { id: 'net4', name: 'Switch & VLAN',    desc: 'Manage switches and VLANs', cost: 2 },
      { id: 'net5', name: 'Network Architect',desc: 'Design enterprise networks', cost: 3 },
    ],
  },
  {
    key: 'security', emoji: '🛡️', color: '#bf00ff',
    skills: [
      { id: 'sec1', name: 'Threat Awareness', desc: 'Identify malware, phishing, scams', cost: 1 },
      { id: 'sec2', name: 'Firewall Config',  desc: 'Configure firewalls and rules', cost: 1 },
      { id: 'sec3', name: 'MFA & Passwords',  desc: 'Implement strong auth systems', cost: 2 },
      { id: 'sec4', name: 'Incident Response',desc: 'Handle security incidents', cost: 2 },
      { id: 'sec5', name: 'Security Expert',  desc: 'Full cybersecurity mastery', cost: 3 },
    ],
  },
  {
    key: 'troubleshooting', emoji: '🔍', color: '#39ff14',
    skills: [
      { id: 'ts1', name: 'Diagnostic Logic', desc: 'Systematic problem-solving approach', cost: 1 },
      { id: 'ts2', name: 'Terminal Pro',     desc: 'Master CLI troubleshooting', cost: 1 },
      { id: 'ts3', name: 'Log Analysis',     desc: 'Read and interpret system logs', cost: 2 },
      { id: 'ts4', name: 'Remote Support',   desc: 'Troubleshoot systems remotely', cost: 2 },
      { id: 'ts5', name: 'IT Detective',     desc: 'Solve complex multi-layer issues', cost: 3 },
    ],
  },
  {
    key: 'customerService', emoji: '🤝', color: '#ffe600',
    skills: [
      { id: 'cs1', name: 'Communication',   desc: 'Explain tech to non-tech users', cost: 1 },
      { id: 'cs2', name: 'Ticket Management',desc: 'Prioritize and track issues', cost: 1 },
      { id: 'cs3', name: 'Documentation',   desc: 'Write clear IT documentation', cost: 2 },
      { id: 'cs4', name: 'SLA Mastery',     desc: 'Meet and exceed service levels', cost: 2 },
      { id: 'cs5', name: 'IT Manager',      desc: 'Lead IT support teams', cost: 3 },
    ],
  },
];

export default function SkillTree() {
  const { skills, skillPoints, upgradeSkill } = useGameStore();
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white text-orbitron">{t('skillTree')}</h3>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[rgba(255,230,0,0.3)] bg-[rgba(255,230,0,0.05)]">
          <span className="text-[var(--neon-yellow)] text-sm font-bold">💎 {skillPoints}</span>
          <span className="text-xs text-white/40">{t('skillPoints', { n: '' }).replace(': ', '')}</span>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-5">
        {SKILL_CATEGORIES.map(cat => {
          const currentLevel = skills[cat.key] || 0;
          return (
            <div key={cat.key} className="rounded-xl p-4 border border-white/5 bg-white/[0.02]">
              {/* Category header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl border"
                  style={{ background: `${cat.color}15`, borderColor: `${cat.color}40` }}>
                  {cat.emoji}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm" style={{ color: cat.color }}>
                    {t(`skillCategories.${cat.key}`)}
                  </h4>
                  <p className="text-xs text-white/40">Level {currentLevel}/5</p>
                </div>
                <div className="ml-auto flex gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div
                      key={i}
                      className="w-6 h-2 rounded-full transition-all"
                      style={{
                        background: i < currentLevel ? cat.color : 'rgba(255,255,255,0.08)',
                        boxShadow: i < currentLevel ? `0 0 6px ${cat.color}` : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Skill nodes */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1">
                {cat.skills.map((skill, idx) => {
                  const unlocked = idx < currentLevel;
                  const available = idx === currentLevel && skillPoints >= skill.cost;
                  const locked = idx > currentLevel;

                  return (
                    <div key={skill.id} className="flex items-center gap-1 flex-shrink-0">
                      {/* Connector */}
                      {idx > 0 && (
                        <div className="w-5 h-0.5 rounded-full"
                          style={{ background: unlocked ? cat.color : 'rgba(255,255,255,0.1)' }} />
                      )}

                      {/* Skill node */}
                      <motion.div
                        whileHover={available ? { scale: 1.05 } : {}}
                        whileTap={available ? { scale: 0.95 } : {}}
                        onClick={() => {
                          if (available) {
                            sound.achievement();
                            upgradeSkill(cat.key);
                          }
                        }}
                        className={`relative flex flex-col items-center p-2 rounded-xl border transition-all min-w-[80px] text-center ${
                          unlocked ? 'cursor-default' :
                          available ? 'cursor-pointer' :
                          'cursor-not-allowed opacity-40'
                        }`}
                        style={{
                          background: unlocked ? `${cat.color}15` : available ? `${cat.color}08` : 'rgba(0,0,0,0.2)',
                          borderColor: unlocked ? `${cat.color}60` : available ? `${cat.color}40` : 'rgba(255,255,255,0.06)',
                          boxShadow: unlocked ? `0 0 12px ${cat.color}25` : available ? `0 0 8px ${cat.color}15` : 'none',
                        }}
                        title={skill.desc}
                      >
                        {/* State icon */}
                        <div className="text-lg mb-1">
                          {unlocked ? '✅' : available ? cat.emoji : '🔒'}
                        </div>
                        <div className="text-[10px] font-semibold leading-tight"
                          style={{ color: unlocked ? cat.color : available ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)' }}>
                          {skill.name}
                        </div>
                        {!unlocked && (
                          <div className="text-[9px] mt-0.5" style={{ color: available ? cat.color : 'rgba(255,255,255,0.25)' }}>
                            💎 {skill.cost}
                          </div>
                        )}

                        {/* Pulse ring on available */}
                        {available && (
                          <motion.div
                            className="absolute inset-0 rounded-xl pointer-events-none"
                            animate={{ opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            style={{ border: `2px solid ${cat.color}`, boxShadow: `0 0 12px ${cat.color}` }}
                          />
                        )}
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {skillPoints === 0 && (
        <p className="text-center text-xs text-white/30">
          Complete missions to earn skill points 💎
        </p>
      )}
    </div>
  );
}
