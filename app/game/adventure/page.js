'use client';
import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useGameStore } from '@/store/gameStore';
import { getMissionsForArea } from '@/lib/missions';
import MissionCard from '@/components/game/MissionCard';
import NPCDialog from '@/components/game/NPCDialog';
import PCRepairPanel from '@/components/game/PCRepairPanel';
import PCRepairSimPuzzle from '@/components/game/PCRepairSimPuzzle';
import NetworkPuzzle from '@/components/game/NetworkPuzzle';
import NetworkSimPuzzle from '@/components/game/NetworkSimPuzzle';
import Terminal from '@/components/game/Terminal';
import { sound } from '@/lib/audio';
import { DIALOGUE_SCENARIOS, scoreDialogue } from '@/lib/dialogueScenarios';
import TierIntroCarousel from '@/components/game/TierIntroCarousel';
import QuizPuzzle from '@/components/game/QuizPuzzle';
import SequencePuzzle from '@/components/game/SequencePuzzle';
import DialoguePuzzle from '@/components/game/DialoguePuzzle';
import MissionLearnCarousel from '@/components/game/MissionLearnCarousel';
import { getMissionLearning } from '@/lib/missionLearning';
import CluePanel from '@/components/game/CluePanel';

// ── All Area Info ─────────────────────────────────────────────
const AREA_INFO = {
  // Tier 1
  bedroom:         { name: 'Bedroom Setup',        nameId: 'Setup Kamar',          emoji: '🛏️', tier: 1, color: '#39ff14', desc: 'Start your IT journey at home.' },
  familyPC:        { name: 'Family Computer',      nameId: 'Komputer Keluarga',     emoji: '🖥️', tier: 1, color: '#39ff14', desc: 'Help family members with basic PC issues.' },
  homeWifi:        { name: 'Home WiFi Setup',      nameId: 'Setup WiFi Rumah',      emoji: '📶', tier: 1, color: '#39ff14', desc: 'Get the household connected.' },
  repairCorner:    { name: 'Repair Corner',        nameId: 'Sudut Reparasi',        emoji: '🔧', tier: 1, color: '#39ff14', desc: 'A small corner for basic repairs.' },
  // Tier 2
  repairShop:      { name: 'Repair Shop',          nameId: 'Toko Reparasi',         emoji: '🏪', tier: 2, color: '#00f5ff', desc: 'Customers bring broken PCs to fix.' },
  gamingCafe:      { name: 'Gaming Café',          nameId: 'Warnet Gaming',         emoji: '🎮', tier: 2, color: '#00f5ff', desc: 'Keep 20 gaming PCs running.' },
  upgradeCenter:   { name: 'PC Upgrade Center',    nameId: 'Pusat Upgrade PC',      emoji: '⚙️', tier: 2, color: '#00f5ff', desc: 'Help customers upgrade their builds.' },
  // Tier 3
  startupOffice:   { name: 'Startup Office',       nameId: 'Kantor Startup',        emoji: '🏢', tier: 3, color: '#4fc3f7', desc: 'Fast-paced IT support for a startup.' },
  schoolLab:       { name: 'School Computer Lab',  nameId: 'Lab Komputer Sekolah',  emoji: '🏫', tier: 3, color: '#4fc3f7', desc: 'Maintain 30 school computers.' },
  smallBizOffice:  { name: 'Small Business Office',nameId: 'Kantor Bisnis Kecil',   emoji: '💼', tier: 3, color: '#4fc3f7', desc: 'Windows support for a small business.' },
  // Tier 4
  ispBranch:       { name: 'ISP Branch Office',    nameId: 'Kantor Cabang ISP',     emoji: '📡', tier: 4, color: '#bf00ff', desc: 'Work at an Internet Service Provider.' },
  internetCafe:    { name: 'Internet Café',        nameId: 'Internet Cafe',         emoji: '☕', tier: 4, color: '#bf00ff', desc: 'Network troubleshooting at scale.' },
  officeNetwork:   { name: 'Office Network',       nameId: 'Jaringan Kantor',       emoji: '🌐', tier: 4, color: '#bf00ff', desc: 'Manage the office LAN infrastructure.' },
  networkOpsRoom:  { name: 'Network Ops Room',     nameId: 'Ruang Operasi Jaringan',emoji: '🖧', tier: 4, color: '#bf00ff', desc: 'Monitor and fix network infrastructure.' },
  // Tier 5
  enterpriseOffice:{ name: 'Enterprise Office',    nameId: 'Kantor Enterprise',     emoji: '🏦', tier: 5, color: '#ff6b00', desc: 'Enterprise-grade IT operations.' },
  serverRoom:      { name: 'Server Room',          nameId: 'Ruang Server',          emoji: '🖥️', tier: 5, color: '#ff6b00', desc: 'Manage critical server infrastructure.' },
  miniDataCenter:  { name: 'Mini Data Center',     nameId: 'Mini Data Center',      emoji: '💾', tier: 5, color: '#ff6b00', desc: 'Handle a small data center.' },
  itControlCenter: { name: 'IT Control Center',    nameId: 'Pusat Kontrol IT',      emoji: '📊', tier: 5, color: '#ff6b00', desc: 'Monitor all systems from one room.' },
  // Tier 6
  secOps:          { name: 'Security Ops Center',  nameId: 'Pusat Operasi Keamanan',emoji: '🛡️', tier: 6, color: '#ff2d78', desc: 'Detect and respond to security threats.' },
  securityWing:    { name: 'Security Wing',        nameId: 'Divisi Keamanan',       emoji: '🔐', tier: 6, color: '#ff2d78', desc: 'Enterprise security operations.' },
  threatRoom:      { name: 'Threat Analysis Room', nameId: 'Ruang Analisis Ancaman',emoji: '🚨', tier: 6, color: '#ff2d78', desc: 'Advanced threat investigation.' },
  // Tier 7
  globalDataCenter:{ name: 'Global Data Center',   nameId: 'Data Center Global',    emoji: '🌍', tier: 7, color: '#ffd700', desc: 'Handle enterprise-scale incidents.' },
  cloudRoom:       { name: 'Cloud Infrastructure', nameId: 'Infrastruktur Cloud',   emoji: '☁️', tier: 7, color: '#ffd700', desc: 'Cloud operations and recovery.' },
  corporateHQ:     { name: 'Corporate HQ',         nameId: 'Kantor Pusat',          emoji: '🏛️', tier: 7, color: '#ffd700', desc: 'Top-level infrastructure decisions.' },
  disasterRecovery:{ name: 'Disaster Recovery Center',nameId:'Pusat Pemulihan Bencana',emoji:'🏗️',tier:7,color:'#ffd700',desc:'Design and test DR plans.' },
};

// ── Mission Puzzle Dispatcher ─────────────────────────────────
function MissionPuzzle({ mission, lang, onComplete, onFail, activeHighlightId }) {
  const { t } = useLanguage();
  const objective = mission.localeKey ? t(`${mission.localeKey}.objective`) : (
    mission.description?.[lang] || mission.description?.en || ''
  );

  return (
    <div className="space-y-4">
      {objective && (
        <div className="glass rounded-xl px-4 py-3 border border-white/8">
          <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-1">🎯 Objective</p>
          <p className="text-sm text-white">{objective}</p>
        </div>
      )}
      {mission.puzzleType === 'pc_repair' && <PCRepairSimPuzzle mission={mission} onComplete={onComplete} onFail={onFail} activeHighlightId={activeHighlightId} />}
      {mission.puzzleType === 'pc_repair_sim' && <PCRepairSimPuzzle mission={mission} onComplete={onComplete} onFail={onFail} activeHighlightId={activeHighlightId} />}
      {mission.puzzleType === 'network'   && <NetworkSimPuzzle mission={mission} onComplete={onComplete} onFail={onFail} activeHighlightId={activeHighlightId} />}
      {mission.puzzleType === 'network_sim' && <NetworkSimPuzzle mission={mission} onComplete={onComplete} onFail={onFail} activeHighlightId={activeHighlightId} />}
      {mission.puzzleType === 'terminal'  && <Terminal mission={mission} onComplete={onComplete} onFail={onFail} />}
      {mission.puzzleType === 'quiz'      && <QuizPuzzle mission={mission} onComplete={onComplete} onFail={onFail} />}
      {mission.puzzleType === 'sequence'  && <SequencePuzzle mission={mission} onComplete={onComplete} onFail={onFail} />}
      {mission.puzzleType === 'dialogue'  && <DialoguePuzzle mission={mission} lang={lang} onComplete={onComplete} onFail={onFail} />}
      {!['pc_repair','pc_repair_sim','network','network_sim','terminal','quiz','sequence','dialogue'].includes(mission.puzzleType) && (
        <div className="text-center py-8 text-white/30">
          <p>Mission content loading...</p>
          <button onClick={onComplete} className="mt-4 btn-game text-sm px-6 py-2">Complete (Dev Skip)</button>
        </div>
      )}
    </div>
  );
}

// ── NPC Dialog Data (for legacy missions) ─────────────────────
const NPC_SEQUENCES = {
  mission_001: [
    { npc: 'Sarah', avatar: '👩', msgEn: "Help! My PC won't turn on at all!", msgId: 'Tolong! PC saya tidak mau nyala sama sekali!' },
  ],
  mission_002: [
    { npc: 'Kevin', avatar: '👦', msgEn: "My internet stopped working!", msgId: 'Internet saya mati!' },
  ],
  mission_003: [
    { npc: 'Ahmad', avatar: '👨', msgEn: "My PC keeps shutting down randomly!", msgId: 'PC saya terus mati sendiri!' },
  ],
  mission_004: [
    { npc: 'Linda', avatar: '👩‍💼', msgEn: "The printer won't respond!", msgId: 'Printer tidak merespons!' },
  ],
  mission_005: [
    { npc: 'Pak Budi', avatar: '👴', msgEn: "My computer takes forever to start!", msgId: 'Komputer saya butuh waktu selamanya!' },
  ],
};

// ── Adventure Page ────────────────────────────────────────────
function AdventureContent() {
  const { t, lang } = useLanguage();
  const { level, startMission, completeMission, failMission } = useGameStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  const areaKey = searchParams.get('area') || 'bedroom';
  const areaInfo = AREA_INFO[areaKey] || AREA_INFO.bedroom;
  const allMissions = getMissionsForArea(areaKey);
  const available = allMissions.filter(m => m.requiredLevel <= level);
  const locked = allMissions.filter(m => m.requiredLevel > level);

  // Show tier intro carousel once per session per tier
  const sessionKey = `tier_intro_seen_${areaInfo.tier}`;
  const [showIntro, setShowIntro] = useState(
    typeof window !== 'undefined' ? !sessionStorage.getItem(sessionKey) : false
  );

  const dismissIntro = () => {
    if (typeof window !== 'undefined') sessionStorage.setItem(sessionKey, '1');
    setShowIntro(false);
    sound.notify?.();
  };

  const [phase, setPhase] = useState('list');
  const [activeMission, setActiveMissionLocal] = useState(null);
  const [showLearningModal, setShowLearningModal] = useState(false);
  const [npcStep, setNpcStep] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Clue Guide states
  const [clueOpen, setClueOpen] = useState(false);
  const [currentClueStepIndex, setCurrentClueStepIndex] = useState(0);
  const [hintLevel, setHintLevel] = useState(0);
  const [xpDeduction, setXpDeduction] = useState(0);

  const startMissionFlow = (mission) => {
    setActiveMissionLocal(mission);
    setNpcStep(0);
    setShowHint(false);
    setClueOpen(false);
    setCurrentClueStepIndex(0);
    setHintLevel(0);
    setXpDeduction(0);

    // Support both legacy NPC_SEQUENCES and inline mission.npcDialogue
    const seq = NPC_SEQUENCES[mission?.id] || mission?.npcDialogue || [];
    if (seq.length > 0) {
      setPhase('npc');
    } else {
      // No NPC dialogue — go to learn carousel if available, else straight to puzzle
      const learning = getMissionLearning(mission?.id);
      setPhase(learning ? 'learn' : 'puzzle');
    }
    startMission(mission);
    sound.notify();
  };

  const advanceNpc = () => {
    const seq = NPC_SEQUENCES[activeMission?.id] || activeMission?.npcDialogue || [];
    if (npcStep < seq.length - 1) {
      setNpcStep(s => s + 1);
    } else {
      // Go to learn phase if mission has learning content, otherwise go straight to puzzle
      const learning = getMissionLearning(activeMission?.id);
      setPhase(learning ? 'learn' : 'puzzle');
    }
  };


  const handleComplete = () => {
    const originalXp = activeMission.xpReward || 50;
    const finalXpReward = Math.max(
      Math.floor(originalXp * 0.2), // Keep minimum 20% XP
      originalXp - xpDeduction
    );

    completeMission(activeMission.id, {
      xpReward: finalXpReward,
      coinReward: activeMission.coinReward,
      toolUnlock: activeMission.toolUnlock,
      category: activeMission.category,
    });
    setPhase('list');
    setActiveMissionLocal(null);
    sound.success?.();
  };

  const handleFail = () => {
    failMission(activeMission?.id);
    setPhase('fail');
  };

  const npcSeq = activeMission ? (NPC_SEQUENCES[activeMission.id] || activeMission.npcDialogue || []) : [];
  const currentNpc = npcSeq[npcStep];
  const tierColor = areaInfo.color || '#00f5ff';

  return (
    <div className="max-w-3xl mx-auto space-y-4">

      {/* Tier Intro Carousel — shown once per session */}
      <AnimatePresence>
        {showIntro && (
          <TierIntroCarousel
            tier={areaInfo.tier}
            lang={lang}
            onComplete={dismissIntro}
          />
        )}
      </AnimatePresence>

      {/* Area header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl overflow-hidden border"
        style={{ borderColor: `${tierColor}30`, background: `linear-gradient(135deg, ${tierColor}08, #070b14)` }}>
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative p-4 flex items-center gap-3">
          <button onClick={() => router.push('/game')} className="text-white/40 hover:text-white transition-colors text-sm flex-shrink-0">← Back</button>
          <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-3xl">{areaInfo.emoji}</motion.span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base font-black text-white text-orbitron truncate">{lang === 'id' ? areaInfo.nameId : areaInfo.name}</h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold flex-shrink-0"
                style={{ color: tierColor, background: `${tierColor}15`, border: `1px solid ${tierColor}30` }}>
                T{areaInfo.tier}
              </span>
            </div>
            <p className="text-xs text-white/40">{areaInfo.desc} · {available.length} missions available</p>
          </div>
          <button
            onClick={() => { sound.click(); router.push('/game/rpg'); }}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--neon-green)]/30 bg-[rgba(57,255,20,0.06)] text-[var(--neon-green)] hover:bg-[rgba(57,255,20,0.15)] text-xs font-bold transition-all shadow-[0_0_8px_rgba(57,255,20,0.1)] flex-shrink-0"
          >
            <span>🎮</span>
            <span>{lang === 'id' ? 'Mode RPG 2D' : '2D RPG Mode'}</span>
          </button>
        </div>
      </motion.div>

      {/* Phase content */}
      <AnimatePresence mode="wait">

        {/* Mission List */}
        {phase === 'list' && (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
            {available.length === 0 && (
              <div className="text-center py-12 text-white/30">
                <div className="text-5xl mb-3">🔒</div>
                <p className="text-sm">No missions available here yet.</p>
                <p className="text-xs mt-1">Level up to unlock!</p>
              </div>
            )}
            {available.map(m => <MissionCard key={m.id} mission={m} lang={lang} onClick={startMissionFlow} />)}
            {locked.length > 0 && (
              <>
                <h2 className="text-xs font-bold text-white/25 uppercase tracking-wider mt-4">🔒 Locked</h2>
                {locked.map(m => <MissionCard key={m.id} mission={m} lang={lang} compact />)}
              </>
            )}
          </motion.div>
        )}

        {/* NPC Dialog */}
        {phase === 'npc' && activeMission && currentNpc && (
          <motion.div key="npc" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
            {/* Mission context header */}
            <div className="flex items-center gap-2 px-1">
              <span className="text-lg">{currentNpc.npc === 'IT Support' ? '🧑‍💻' : (activeMission.npcAvatar || '👤')}</span>
              <div className="flex-1">
                <p className="text-xs font-bold text-white/70">
                  {currentNpc.npc === 'IT Support' ? '🧑‍💻 IT Support' : `${currentNpc.avatar || ''} ${currentNpc.npc}`}
                </p>
                <p className="text-[10px] text-white/30">{activeMission.title?.[lang] || activeMission.title?.en}</p>
              </div>
              {/* Step counter */}
              <div className="flex gap-1">
                {npcSeq.map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full transition-all"
                    style={{ background: i <= npcStep ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.15)' }} />
                ))}
              </div>
            </div>
            {/* Dialog bubble */}
            <div className="rounded-2xl p-5 border relative overflow-hidden"
              style={{
                background: currentNpc.npc === 'IT Support'
                  ? 'linear-gradient(135deg, rgba(0,245,255,0.06), #070b14)'
                  : 'linear-gradient(135deg, #0d1a2e, #070b14)',
                borderColor: currentNpc.npc === 'IT Support' ? 'rgba(0,245,255,0.2)' : 'rgba(255,255,255,0.07)',
                minHeight: 160,
              }}>
              <div className="absolute inset-0 grid-bg opacity-20" />
              <div className="relative flex items-end justify-center">
                <NPCDialog npc={currentNpc.npc} avatar={currentNpc.avatar}
                  message={lang === 'id' ? currentNpc.msgId : currentNpc.msgEn}
                  onNext={npcStep < npcSeq.length - 1 ? advanceNpc : null}
                  onDismiss={npcStep === npcSeq.length - 1 ? advanceNpc : null} />
              </div>
            </div>
            <button onClick={advanceNpc} className="w-full text-[11px] text-white/25 hover:text-white/50 py-1.5 transition-colors">
              Skip conversation → Go to mission
            </button>
          </motion.div>
        )}

        {/* Learning Carousel — NEW phase between NPC and Puzzle */}
        {phase === 'learn' && activeMission && (() => {
          const learning = getMissionLearning(activeMission.id);
          if (!learning) { setPhase('puzzle'); return null; }
          return (
            <MissionLearnCarousel
              key="learn"
              mission={activeMission}
              slides={learning.slides}
              lang={lang}
              onComplete={() => setPhase('puzzle')}
              onSkip={() => setPhase('puzzle')}
            />
          );
        })()}

        {/* Puzzle */}
        {phase === 'puzzle' && activeMission && (() => {
          const clues = activeMission.puzzleData?.clues || activeMission.clues || [];
          const activeClue = clues[currentClueStepIndex];
          const activeHighlightId = clueOpen && activeClue ? activeClue.targetId : null;

          return (
            <motion.div key="puzzle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              {/* Responsive Workspace Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[var(--neon-cyan)] font-black uppercase tracking-widest">
                      🛠️ {lang === 'id' ? 'Simulasi Misi Aktif' : 'Active Mission Simulation'}
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-mono font-bold bg-white/5" style={{
                      color: { easy: '#39ff14', medium: '#00f5ff', hard: '#ff6b00', epic: '#bf00ff', legendary: '#ffd700' }[activeMission.difficulty] || '#fff',
                    }}>
                      {activeMission.difficulty.toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-base font-black text-white uppercase tracking-wide">
                    {activeMission.localeKey ? t(`${activeMission.localeKey}.title`) : (activeMission.title?.[lang] || activeMission.title?.en || activeMission.id)}
                  </h2>
                </div>

                {/* Control Action Buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Study Button (if learning exists) */}
                  {getMissionLearning(activeMission.id) && (
                    <button
                      onClick={() => { sound.click(); setShowLearningModal(true); }}
                      className="text-xs border-2 border-[var(--neon-cyan)]/40 bg-[rgba(0,245,255,0.06)] text-[var(--neon-cyan)] hover:bg-[rgba(0,245,255,0.15)] hover:border-[var(--neon-cyan)] px-3 py-1.5 rounded-xl transition-all shadow-[0_0_10px_rgba(0,245,255,0.1)] font-bold tracking-wider font-mono flex items-center gap-1.5 active:scale-95"
                    >
                      <span>📖</span>
                      <span>{lang === 'id' ? 'Materi Pembelajaran' : 'Study Lesson'}</span>
                    </button>
                  )}

                  {/* Exit Button */}
                  <button
                    onClick={() => { sound.click(); setPhase('list'); setActiveMissionLocal(null); }}
                    className="text-xs border-2 border-[var(--neon-pink)]/40 bg-[rgba(255,45,120,0.06)] text-[var(--neon-pink)] hover:bg-[rgba(255,45,120,0.15)] hover:border-[var(--neon-pink)] px-3 py-1.5 rounded-xl transition-all shadow-[0_0_10px_rgba(255,45,120,0.1)] font-bold tracking-wider font-mono flex items-center gap-1.5 active:scale-95"
                  >
                    <span>✕</span>
                    <span>{lang === 'id' ? 'Keluar' : 'Exit'}</span>
                  </button>
                </div>
              </div>

              {/* Hint & Guided Assistant Toggle Buttons */}
              <div className="flex items-center gap-4 flex-wrap">
                <button onClick={() => { sound.click(); setShowHint(h => !h); }}
                  className="text-xs text-[var(--neon-yellow)] hover:text-white transition-colors">
                  {showHint ? '🙈 Hide Hint' : `💡 ${t('showHint')}`}
                </button>
                {clues.length > 0 && (
                  <button
                    onClick={() => { sound.click(); setClueOpen(o => !o); }}
                    className={`text-xs font-bold font-mono transition-all flex items-center gap-1.5 px-3 py-1 rounded-lg border ${
                      clueOpen 
                        ? 'border-[var(--neon-pink)] bg-[rgba(255,45,120,0.1)] text-[var(--neon-pink)] shadow-[0_0_8px_rgba(255,45,120,0.25)]' 
                        : 'border-[var(--neon-cyan)] bg-[rgba(0,245,255,0.05)] text-[var(--neon-cyan)] hover:bg-[rgba(0,245,255,0.12)]'
                    }`}
                  >
                    <span>🤖</span>
                    <span>{clueOpen ? 'Hide IT Mentor' : 'Ask IT Mentor'}</span>
                  </button>
                )}
              </div>

              <AnimatePresence>
                {showHint && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="rounded-xl px-4 py-3 border border-[rgba(255,230,0,0.3)] bg-[rgba(255,230,0,0.05)] text-sm text-[var(--neon-yellow)]">
                    💡 {activeMission.localeKey ? t(`${activeMission.localeKey}.hint`) : 'Think step by step — start with the simplest possible cause.'}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Split layout: Simulator on left, Clue Panel on right if open */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                <div className={clueOpen ? 'md:col-span-2 space-y-4' : 'md:col-span-3 space-y-4'}>
                  <MissionPuzzle mission={activeMission} lang={lang} onComplete={handleComplete} onFail={handleFail} activeHighlightId={activeHighlightId} />
                </div>
                {clueOpen && clues.length > 0 && (
                  <div className="md:col-span-1">
                    <CluePanel
                      clues={clues}
                      currentStepIndex={currentClueStepIndex}
                      setCurrentStepIndex={setCurrentClueStepIndex}
                      hintLevel={hintLevel}
                      setHintLevel={setHintLevel}
                      onClose={() => setClueOpen(false)}
                      xpReward={activeMission.xpReward}
                      onDeductXP={(amt) => setXpDeduction(prev => prev + amt)}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })()}

        {/* Fail */}
        {phase === 'fail' && activeMission && (
          <motion.div key="fail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-10 space-y-5">
            <div className="text-6xl">😔</div>
            <h3 className="text-2xl font-bold text-[var(--neon-pink)]">{t('missionFailed')}</h3>
            <div className="glass rounded-xl p-4 border border-[rgba(255,45,120,0.2)] text-left max-w-sm mx-auto">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-2">💡 Review:</p>
              <p className="text-sm text-white/70">
                {activeMission.localeKey ? t(`${activeMission.localeKey}.failExplain`) : 'Review the learning material and try again!'}
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <button onClick={() => { setPhase('puzzle'); startMission(activeMission); }} className="btn-game text-sm py-2 px-6">
                🔄 {t('missionRetry')}
              </button>
              <button onClick={() => { setPhase('list'); setActiveMissionLocal(null); }}
                className="px-6 py-2 text-sm text-white/40 hover:text-white border border-white/10 rounded-lg transition-colors">
                Back
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immersive Study Carousel Modal (from inside task) */}
      <AnimatePresence>
        {showLearningModal && activeMission && (() => {
          const learning = getMissionLearning(activeMission.id);
          if (!learning) return null;
          return (
            <MissionLearnCarousel
              key="active-learn-modal"
              mission={activeMission}
              slides={learning.slides}
              lang={lang}
              onComplete={() => setShowLearningModal(false)}
              onSkip={() => setShowLearningModal(false)}
              onClose={() => setShowLearningModal(false)}
            />
          );
        })()}
      </AnimatePresence>
    </div>
  );
}

export default function AdventurePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-white/40">Loading...</div>}>
      <AdventureContent />
    </Suspense>
  );
}
