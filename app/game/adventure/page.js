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

// ── Quiz puzzle renderer ──────────────────────────────────────
function QuizPuzzle({ mission, onComplete, onFail }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showLesson, setShowLesson] = useState(false);

  const quiz = mission.quizData?.questions || mission.quiz || [];
  const current = quiz[step];

  if (!current) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="text-5xl">✅</div>
        <p className="text-[var(--neon-green)] font-bold text-lg">All questions answered!</p>
        <p className="text-white/50 text-sm">{correctCount}/{quiz.length} correct</p>
        <button onClick={onComplete} className="btn-game px-8 py-3">
          Complete Mission 🎉
        </button>
      </div>
    );
  }

  const handleAnswer = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const correctIdx = current.answer ?? current.correct;
    if (idx === correctIdx) setCorrectCount(c => c + 1);
    sound[idx === correctIdx ? 'snap' : 'wrong']?.();
  };

  const next = () => {
    setAnswered(false);
    setSelected(null);
    setShowLesson(false);
    setStep(s => s + 1);
  };

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex items-center gap-2">
        {quiz.map((_, i) => (
          <div key={i} className="flex-1 h-1.5 rounded-full"
            style={{ background: i < step ? '#39ff14' : i === step ? '#00f5ff' : 'rgba(255,255,255,0.1)' }} />
        ))}
        <span className="text-xs text-white/40 flex-shrink-0">{step + 1}/{quiz.length}</span>
      </div>

      {/* Question */}
      <div className="glass rounded-xl p-4 border border-white/10">
        <p className="text-sm font-semibold text-white leading-relaxed">{current.q}</p>
      </div>

      {/* Options */}
      <div className="space-y-2">
        {current.options.map((opt, idx) => {
          const correctIdx = current.answer ?? current.correct;
          let style = 'border-white/10 bg-white/[0.03] text-white/70 hover:border-white/25 hover:bg-white/[0.06]';
          if (answered) {
            if (idx === correctIdx) style = 'border-[var(--neon-green)] bg-[rgba(57,255,20,0.08)] text-[var(--neon-green)]';
            else if (idx === selected) style = 'border-[var(--neon-pink)] bg-[rgba(255,45,120,0.08)] text-[var(--neon-pink)]';
            else style = 'border-white/5 bg-white/[0.02] text-white/30';
          }
          return (
            <button key={idx} onClick={() => handleAnswer(idx)} disabled={answered}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${style}`}>
              <span className="font-mono text-xs opacity-60 mr-2">{String.fromCharCode(65 + idx)}.</span>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {answered && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-4 border"
          style={{
            borderColor: selected === (current.answer ?? current.correct) ? 'rgba(57,255,20,0.3)' : 'rgba(255,45,120,0.3)',
            background: selected === (current.answer ?? current.correct) ? 'rgba(57,255,20,0.05)' : 'rgba(255,45,120,0.05)',
          }}>
          <p className="text-xs font-bold mb-1"
            style={{ color: selected === (current.answer ?? current.correct) ? '#39ff14' : '#ff2d78' }}>
            {selected === (current.answer ?? current.correct) ? '✅ Correct!' : '❌ Wrong Answer'}
          </p>
          <p className="text-xs text-white/60">{current.explain || current.explanation}</p>
          <button onClick={next} className="mt-3 text-xs font-bold text-[var(--neon-cyan)] hover:text-white transition-colors">
            {step < quiz.length - 1 ? 'Next Question →' : 'See Results →'}
          </button>
        </motion.div>
      )}

      {/* Learning tip */}
      {mission.lesson && (
        <div className="rounded-xl px-4 py-3 border border-[rgba(255,230,0,0.15)] bg-[rgba(255,230,0,0.04)]">
          <p className="text-[10px] text-[var(--neon-yellow)] font-bold mb-1">💡 Key Lesson</p>
          <p className="text-xs text-white/50">{mission.lesson}</p>
        </div>
      )}
    </div>
  );
}

// ── Sequence Puzzle — Visual Timeline Builder ────────────────────────────
const STEP_COLORS = [
  { bg: 'rgba(57,255,20,0.12)',  border: 'rgba(57,255,20,0.4)',  text: '#39ff14', num: '#000' },
  { bg: 'rgba(0,245,255,0.12)', border: 'rgba(0,245,255,0.4)',  text: '#00f5ff', num: '#000' },
  { bg: 'rgba(191,0,255,0.12)', border: 'rgba(191,0,255,0.4)',  text: '#bf00ff', num: '#fff' },
  { bg: 'rgba(255,107,0,0.12)', border: 'rgba(255,107,0,0.4)',  text: '#ff6b00', num: '#fff' },
  { bg: 'rgba(255,45,120,0.12)',border: 'rgba(255,45,120,0.4)', text: '#ff2d78', num: '#fff' },
];

function SequencePuzzle({ mission, onComplete, onFail }) {
  const { lang } = useLanguage();
  const steps   = mission.sequenceData?.steps || [];
  const [order, setOrder]       = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult]     = useState(null);
  const [wrong, setWrong]       = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [shuffled] = useState(() => [...steps].sort(() => Math.random() - 0.5));

  // Onboarding & Glossary state
  const [showTutorial, setShowTutorial] = useState(false);
  const [showGuidebook, setShowGuidebook] = useState(false);
  const [currentTutorialSlide, setCurrentTutorialSlide] = useState(0);

  useEffect(() => {
    // Show tutorial automatically for the first play
    const hasSeenSequenceTutorial = localStorage.getItem('hasSeenSequenceTutorial');
    if (!hasSeenSequenceTutorial) {
      setShowTutorial(true);
      localStorage.setItem('hasSeenSequenceTutorial', 'true');
    }
  }, []);

  const METHODOLOGY_GLOSSARY = {
    step1: {
      title: { en: "1. Identify the Problem", id: "1. Identifikasi Masalah" },
      desc: {
        en: "Gather information from the user, identify symptoms, and determine if anything has recently changed in the system.",
        id: "Kumpulkan informasi dari pengguna, identifikasi gejala masalah, dan tentukan apakah ada perubahan sistem baru-baru ini."
      }
    },
    step2: {
      title: { en: "2. Establish a Theory of Probable Cause", id: "2. Tentukan Teori Penyebab Masalah" },
      desc: {
        en: "List common causes for the symptoms. Start with the easiest/most obvious causes (e.g. unplugged cables, powered off devices) first.",
        id: "Buat daftar penyebab umum dari gejala tersebut. Mulai dari kemungkinan penyebab termudah/paling jelas (misal: kabel lepas, daya mati) terlebih dahulu."
      }
    },
    step3: {
      title: { en: "3. Test the Theory to Determine Cause", id: "3. Uji Teori untuk Mengetahui Penyebab Pasti" },
      desc: {
        en: "Perform diagnostic tests to confirm your theory. If the theory is confirmed, plan your resolution. If not, establish a new theory.",
        id: "Lakukan uji diagnostik untuk membuktikan teori Anda. Jika teori terbukti benar, rencanakan perbaikan. Jika salah, buat teori baru."
      }
    },
    step4: {
      title: { en: "4. Establish a Action Plan & Implement Solution", id: "4. Rencanakan & Terapkan Solusi Perbaikan" },
      desc: {
        en: "Write down the steps needed to resolve the problem. Execute the plan safely, using appropriate administrative privileges or tools.",
        id: "Tulis langkah-langkah yang diperlukan untuk menyelesaikan masalah. Jalankan rencana tersebut dengan aman menggunakan hak admin atau alat yang sesuai."
      }
    },
    step5: {
      title: { en: "5. Verify Full System Functionality", id: "5. Verifikasi Fungsionalitas Sistem secara Penuh" },
      desc: {
        en: "Test the system completely to verify the issue is fully fixed. Implement preventive measures so the issue doesn't happen again.",
        id: "Uji sistem secara menyeluruh untuk memastikan masalah telah selesai. Terapkan langkah pencegahan agar masalah tidak terulang kembali."
      }
    },
    step6: {
      title: { en: "6. Document Findings, Actions, and Outcomes", id: "6. Dokumentasikan Temuan, Aksi, dan Hasil" },
      desc: {
        en: "Record the symptoms, cause, steps taken, and resolution outcome in the IT helpdesk ticketing log database for future reference.",
        id: "Catat gejala, penyebab, tindakan yang diambil, dan hasil akhir perbaikan ke database log tiket bantuan IT sebagai referensi mendatang."
      }
    }
  };

  const tutorialSlides = [
    {
      titleEn: "Welcome to Sequence Sorting Puzzle! 📋",
      titleId: "Selamat Datang di Teka-Teki Mengurutkan Langkah! 📋",
      bodyEn: "Here you must arrange IT troubleshooting or setup tasks in the correct logical order. Tap the cards in the 'Available Steps' list to add them into your timeline.",
      bodyId: "Di sini Anda harus menyusun langkah troubleshooting atau instalasi IT dalam urutan logis yang benar. Ketuk kartu pada daftar 'Available Steps' untuk memasukkannya ke timeline Anda.",
      tipEn: "Tip: Tap a step in your timeline if you want to remove it and fix your order.",
      tipId: "Tips: Ketuk kembali langkah di dalam timeline Anda jika ingin menghapusnya dan memperbaiki urutan."
    },
    {
      titleEn: "Submitting and Correction 🔍",
      titleId: "Mengirimkan Jawaban & Koreksi 🔍",
      bodyEn: "Once your timeline is full, click 'Submit My Order'. Any incorrect steps will be marked in red. You can reset and try again as many times as needed to learn the proper IT methodology.",
      bodyId: "Setelah timeline Anda terisi penuh, klik 'Submit My Order'. Langkah yang salah akan ditandai warna merah. Anda dapat mereset dan mencobanya lagi sesuka hati sampai memahami metodologi IT yang benar.",
      tipEn: "Tip: Click the 'Methodology Glossary' to learn the official 6-step CompTIA IT troubleshooting methodology!",
      tipId: "Tips: Klik 'Kamus Metodologi' untuk mempelajari 6 langkah metodologi troubleshooting IT standar industri!"
    }
  ];

  const addStep = (stepId) => {
    if (submitted || order.includes(stepId)) return;
    setOrder(o => [...o, stepId]);
    sound.keyType?.();
  };

  const removeStep = (stepId) => {
    if (submitted) return;
    setOrder(o => o.filter(id => id !== stepId));
  };

  const handleSubmit = () => {
    const correct = steps.map(s => s.id);
    const isCorrect = order.length === correct.length && order.every((id, i) => id === correct[i]);
    const wrongIndices = order.map((id, i) => id !== correct[i] ? i : -1).filter(i => i !== -1);
    setWrong(wrongIndices);
    setSubmitted(true);
    setAttempts(a => a + 1);
    setResult(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) { sound.snap?.(); setTimeout(() => onComplete?.(), 2200); }
    else sound.wrong?.();
  };

  const handleReset = () => { setOrder([]); setSubmitted(false); setResult(null); setWrong([]); };

  const categoryEmoji = { hardware: '🔧', networking: '🌐', os: '💻', security: '🛡️', sysadmin: '⚙️' };
  const catEmoji = categoryEmoji[mission.category] || '📋';

  return (
    <div className="space-y-3">
      {/* Scenario context card */}
      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-xl p-4 border border-white/10"
        style={{ background: 'linear-gradient(135deg, rgba(0,245,255,0.06), rgba(7,11,20,0.8))' }}>
        <div className="flex items-start gap-3">
          <span className="text-3xl mt-0.5">{catEmoji}</span>
          <div>
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-0.5">🎯 Mission Objective</p>
            <p className="text-sm text-white/90 leading-relaxed">{mission.sequenceData?.task || 'Put the troubleshooting steps in the correct order:'}</p>
          </div>
        </div>
      </motion.div>

      {/* Guide & Tutorial Buttons */}
      <div className="flex gap-2 justify-end">
        <button
          onClick={() => { sound.click(); setCurrentTutorialSlide(0); setShowTutorial(true); }}
          className="px-3 py-1.5 rounded-lg border border-[var(--neon-yellow)]/30 bg-[rgba(255,230,0,0.08)] text-[var(--neon-yellow)] hover:bg-[rgba(255,230,0,0.15)] text-xs font-bold font-mono transition-all flex items-center gap-1.5 shadow-[0_0_8px_rgba(255,230,0,0.1)]"
        >
          <span>🎓</span>
          <span>{lang === 'id' ? 'Tutorial Urutan' : 'Sequence Tutorial'}</span>
        </button>
        
        <button
          onClick={() => { sound.click(); setShowGuidebook(true); }}
          className="px-3 py-1.5 rounded-lg border border-[var(--neon-cyan)]/30 bg-[rgba(0,245,255,0.08)] text-[var(--neon-cyan)] hover:bg-[rgba(0,245,255,0.15)] text-xs font-bold font-mono transition-all flex items-center gap-1.5 shadow-[0_0_8px_rgba(0,245,255,0.1)]"
        >
          <span>📖</span>
          <span>{lang === 'id' ? 'Kamus Metodologi' : 'Methodology Glossary'}</span>
        </button>
      </div>

      {/* Timeline — selected steps */}
      <div className="rounded-xl border border-dashed border-[rgba(0,245,255,0.25)] bg-[rgba(0,245,255,0.02)] min-h-[56px] p-3">
        <p className="text-[10px] text-[var(--neon-cyan)] font-bold uppercase tracking-widest mb-2">📌 Your Timeline — click steps below to build it</p>
        {order.length === 0 ? (
          <p className="text-xs text-white/20 italic text-center py-2">Empty — tap steps to add them in order ↓</p>
        ) : (
          <div className="space-y-1.5">
            {order.map((id, i) => {
              const step  = steps.find(s => s.id === id);
              const color = STEP_COLORS[i % STEP_COLORS.length];
              const isWrong = submitted && wrong.includes(i);
              return (
                <motion.div key={id}
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer group"
                  style={{
                    background: isWrong ? 'rgba(255,45,120,0.12)' : color.bg,
                    border: `1px solid ${isWrong ? 'rgba(255,45,120,0.4)' : color.border}`,
                  }}
                  onClick={() => !submitted && removeStep(id)}
                >
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black flex-shrink-0"
                    style={{ background: isWrong ? '#ff2d78' : color.text, color: isWrong ? '#fff' : color.num }}>{i + 1}</span>
                  <span className="text-xs text-white/80 flex-1 leading-snug">{step?.text}</span>
                  {!submitted && <span className="text-white/20 group-hover:text-[var(--neon-pink)] text-xs transition-colors">✕</span>}
                  {submitted && isWrong && <span className="text-[var(--neon-pink)] text-xs">✗</span>}
                  {submitted && !isWrong && <span className="text-[var(--neon-green)] text-xs">✓</span>}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
          <motion.div className="h-full rounded-full bg-[var(--neon-cyan)]" animate={{ width: `${(order.length / steps.length) * 100}%` }} />
        </div>
        <span className="text-xs font-mono text-white/30">{order.length}/{steps.length}</span>
      </div>

      {/* Available step cards */}
      <div>
        <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-2">Available Steps — tap to add:</p>
        <div className="space-y-2">
          {shuffled.map((step, si) => {
            const inOrder = order.includes(step.id);
            const pos     = order.indexOf(step.id);
            return (
              <motion.button key={step.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => inOrder ? removeStep(step.id) : addStep(step.id)}
                disabled={submitted}
                className="w-full text-left rounded-xl border transition-all group relative overflow-hidden"
                style={{
                  background: inOrder ? 'rgba(57,255,20,0.06)' : 'rgba(255,255,255,0.02)',
                  borderColor: inOrder ? 'rgba(57,255,20,0.3)' : 'rgba(255,255,255,0.08)',
                  opacity: submitted ? 0.7 : 1,
                }}>
                <div className="flex items-center gap-3 px-4 py-3">
                  {inOrder ? (
                    <span className="w-6 h-6 rounded-full bg-[var(--neon-green)] text-black text-xs font-black flex items-center justify-center flex-shrink-0">{pos + 1}</span>
                  ) : (
                    <span className="w-6 h-6 rounded-full border border-white/15 text-white/30 text-xs font-bold flex items-center justify-center flex-shrink-0 group-hover:border-white/30 transition-colors">?</span>
                  )}
                  <span className={`text-sm leading-snug flex-1 transition-colors ${inOrder ? 'text-white/90' : 'text-white/55 group-hover:text-white/80'}`}>
                    {step.text}
                  </span>
                  {inOrder && <span className="text-[var(--neon-green)] text-xs font-bold">✓ Added</span>}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Submit */}
      {order.length === steps.length && !submitted && (
        <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl font-bold text-sm border transition-all"
          style={{ background: 'rgba(57,255,20,0.12)', borderColor: 'rgba(57,255,20,0.4)', color: '#39ff14' }}>
          ✅ Submit My Order
        </motion.button>
      )}

      {/* Result */}
      <AnimatePresence>
        {submitted && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl p-4 border space-y-3"
            style={{
              borderColor: result === 'correct' ? 'rgba(57,255,20,0.35)' : 'rgba(255,45,120,0.35)',
              background:  result === 'correct' ? 'rgba(57,255,20,0.06)' : 'rgba(255,45,120,0.06)',
            }}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{result === 'correct' ? '🎉' : '❌'}</span>
              <div>
                <p className="font-black text-base" style={{ color: result === 'correct' ? '#39ff14' : '#ff2d78' }}>
                  {result === 'correct' ? 'Perfect! Correct Order!' : `Wrong Order ${attempts > 1 ? `(Attempt ${attempts})` : ''}`}
                </p>
                <p className="text-xs text-white/40">
                  {result === 'correct' ? 'All steps in the right sequence — mission complete!' : 'Red steps are in the wrong position. Study the correct order below.'}
                </p>
              </div>
            </div>
            {result === 'wrong' && (
              <div className="space-y-1.5">
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">✅ Correct Order:</p>
                {steps.map((s, i) => (
                  <div key={s.id} className="flex items-center gap-2 text-xs rounded-lg px-3 py-2 bg-white/[0.03] border border-white/8">
                    <span className="w-4 h-4 rounded-full bg-[var(--neon-green)] text-black text-[10px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                    <span className="text-white/65">{s.text}</span>
                  </div>
                ))}
              </div>
            )}
            {result === 'wrong' && (
              <div className="rounded-lg p-3.5 border border-[var(--neon-orange)]/30 bg-[rgba(255,107,0,0.03)] space-y-1 text-xs">
                <p className="font-bold text-[var(--neon-orange)] flex items-center gap-1.5 uppercase font-orbitron text-[10px] tracking-wider">
                  <span>💡</span>
                  <span>{lang === 'id' ? 'Penjelasan Metodologi' : 'Methodology Explanation'}</span>
                </p>
                <p className="text-white/70 leading-relaxed text-[11px]">
                  {lang === 'id' 
                    ? "Mengapa urutan ini penting? Di dunia IT, kita wajib mengikuti alur logis: periksa daya/lampu LED fisik terlebih dahulu (Identifikasi), isolasi kabel/port yang bermasalah (Isolasi), baru lakukan pengetesan perbaikan (Resolusi), dan terakhir uji apakah kursor/koneksi sudah normal (Verifikasi)."
                    : "Why is this order crucial? In IT support, we always follow a logical flow: check physical power/LEDs first (Identify), isolate the faulty cable/port (Isolate), perform the repair action (Resolve), and finally verify if the cursor/system works correctly (Verify)."}
                </p>
              </div>
            )}
            {mission.sequenceData?.lesson && (
              <div className="rounded-lg px-3 py-2.5 border border-[rgba(255,230,0,0.2)] bg-[rgba(255,230,0,0.04)]">
                <p className="text-[10px] text-[var(--neon-yellow)] font-bold mb-0.5">💡 Key Lesson</p>
                <p className="text-xs text-white/55 leading-relaxed">{mission.sequenceData.lesson}</p>
              </div>
            )}
            {result === 'wrong' && (
              <button onClick={handleReset} className="w-full py-2 rounded-lg border border-[rgba(0,245,255,0.3)] text-[var(--neon-cyan)] text-sm font-bold hover:bg-[rgba(0,245,255,0.08)] transition-all">🔄 Try Again</button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Onboarding Tutorial Modal */}
      <AnimatePresence>
        {showTutorial && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass border border-[var(--neon-yellow)] max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl relative"
              style={{ background: '#070b15' }}
            >
              {/* Top title */}
              <div className="border-b border-white/10 p-4 flex items-center justify-between bg-[rgba(255,230,0,0.03)]">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎓</span>
                  <h3 className="font-orbitron font-black text-[10px] uppercase tracking-widest text-[var(--neon-yellow)]">
                    {lang === 'id' ? 'Tutorial Urutan Langkah' : 'Sequence Sorting Tutorial'}
                  </h3>
                </div>
                <button
                  onClick={() => { sound.click(); setShowTutorial(false); }}
                  className="text-white/40 hover:text-white transition-colors font-bold text-xs"
                >
                  ✕
                </button>
              </div>

              {/* Slide content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-center py-6 bg-black/40 rounded-xl border border-white/5 text-4xl">
                  {currentTutorialSlide === 0 && '📋'}
                  {currentTutorialSlide === 1 && '🔍'}
                </div>
                <h4 className="font-bold text-white text-base">
                  {lang === 'id' ? tutorialSlides[currentTutorialSlide].titleId : tutorialSlides[currentTutorialSlide].titleEn}
                </h4>
                <p className="text-white/70 text-xs leading-relaxed">
                  {lang === 'id' ? tutorialSlides[currentTutorialSlide].bodyId : tutorialSlides[currentTutorialSlide].bodyEn}
                </p>
                <div className="bg-[rgba(255,230,0,0.05)] border border-[rgba(255,230,0,0.15)] p-2.5 rounded-lg text-[11px] text-[var(--neon-yellow)] font-medium">
                  {lang === 'id' ? tutorialSlides[currentTutorialSlide].tipId : tutorialSlides[currentTutorialSlide].tipEn}
                </div>
              </div>

              {/* Bottom navigation */}
              <div className="border-t border-white/10 p-4 flex items-center justify-between bg-black/20">
                <div className="flex gap-1.5">
                  {tutorialSlides.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentTutorialSlide ? 'bg-[var(--neon-yellow)] w-4' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  {currentTutorialSlide > 0 && (
                    <button
                      onClick={() => { sound.click(); setCurrentTutorialSlide(prev => prev - 1); }}
                      className="px-3 py-1.5 border border-white/10 hover:border-white/20 text-white text-xs font-semibold rounded-lg transition-all"
                    >
                      {lang === 'id' ? 'Kembali' : 'Back'}
                    </button>
                  )}
                  {currentTutorialSlide < tutorialSlides.length - 1 ? (
                    <button
                      onClick={() => { sound.click(); setCurrentTutorialSlide(prev => prev + 1); }}
                      className="btn-game px-4 py-1.5 text-xs font-bold font-mono"
                      style={{ '--neon-color': 'var(--neon-yellow)' }}
                    >
                      {lang === 'id' ? 'Lanjut ➔' : 'Next ➔'}
                    </button>
                  ) : (
                    <button
                      onClick={() => { sound.click(); setShowTutorial(false); }}
                      className="bg-[var(--neon-green)] border border-[var(--neon-green)] text-black hover:opacity-90 font-bold px-4 py-1.5 text-xs rounded-lg transition-all"
                    >
                      {lang === 'id' ? 'Mulai Bermain!' : 'Let\'s Play!'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sequence Methodology Glossary Guidebook Modal */}
      <AnimatePresence>
        {showGuidebook && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass border border-[var(--neon-cyan)] max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[80vh]"
              style={{ background: '#070b15' }}
            >
              {/* Top title */}
              <div className="border-b border-white/10 p-4 flex items-center justify-between bg-[rgba(0,245,255,0.03)]">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📖</span>
                  <h3 className="font-orbitron font-black text-[10px] uppercase tracking-widest text-[var(--neon-cyan)]">
                    {lang === 'id' ? 'Kamus Metodologi Troubleshooting IT' : 'IT Troubleshooting Methodology Glossary'}
                  </h3>
                </div>
                <button
                  onClick={() => { sound.click(); setShowGuidebook(false); }}
                  className="text-white/40 hover:text-white transition-colors font-bold text-xs"
                >
                  ✕
                </button>
              </div>

              {/* Glossary list */}
              <div className="p-6 space-y-4 overflow-y-auto flex-1">
                <p className="text-xs text-white/50 leading-relaxed mb-2">
                  {lang === 'id'
                    ? 'Berikut adalah 6 langkah metodologi troubleshooting IT standar industri (CompTIA A+) untuk memecahkan masalah sistem komputer.'
                    : 'Here is the official 6-step CompTIA IT troubleshooting methodology used by industry professionals.'}
                </p>

                <div className="space-y-3.5">
                  {Object.entries(METHODOLOGY_GLOSSARY).map(([key, item]) => {
                    return (
                      <div key={key} className="bg-white/[0.02] border border-white/5 hover:border-white/10 p-3.5 rounded-xl transition-all">
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <span className="text-lg bg-black/45 px-2.5 py-1.5 rounded-lg border border-white/5 font-mono text-[var(--neon-cyan)] font-bold">
                            {key.toUpperCase()}
                          </span>
                          <div>
                            <h4 className="font-bold text-white text-sm">{item.title[lang] || item.title['en']}</h4>
                          </div>
                        </div>
                        <p className="text-white/70 text-xs leading-relaxed font-sans">
                          {item.desc[lang] || item.desc['en']}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom close */}
              <div className="border-t border-white/10 p-4 bg-black/20 text-right">
                <button
                  onClick={() => { sound.click(); setShowGuidebook(false); }}
                  className="btn-game px-5 py-2 text-xs font-bold font-mono"
                  style={{ '--neon-color': 'var(--neon-cyan)' }}
                >
                  {lang === 'id' ? 'Tutup Kamus' : 'Close Glossary'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Dialogue Puzzle — Scored NPC Conversation ───────────────
function DialoguePuzzle({ mission, lang, onComplete }) {
  const scenario = DIALOGUE_SCENARIOS.find(s => s.id === mission.dialogueId) || DIALOGUE_SCENARIOS[0];
  const [choices, setChoices] = useState({});
  const [feedback, setFeedback] = useState({});
  const [currentEx, setCurrentEx] = useState(0);
  const [done, setDone] = useState(false);
  const [result, setResult] = useState(null);

  const exchange = scenario.exchanges[currentEx];

  const handleChoice = (exchangeId, choiceId) => {
    if (choices[exchangeId]) return;
    const choice = exchange.choices.find(c => c.id === choiceId);
    setChoices(prev => ({ ...prev, [exchangeId]: choiceId }));
    setFeedback(prev => ({ ...prev, [exchangeId]: choice }));
    sound[choice.type === 'professional' ? 'snap' : choice.type === 'rude' ? 'wrong' : 'click']?.();
  };

  const nextExchange = () => {
    if (currentEx < scenario.exchanges.length - 1) {
      setCurrentEx(e => e + 1);
    } else {
      const r = scoreDialogue(scenario.id, choices);
      setResult(r);
      setDone(true);
    }
  };

  if (done && result) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="rounded-2xl p-5 border text-center space-y-2"
          style={{ borderColor: result.pct >= 75 ? 'rgba(57,255,20,0.35)' : 'rgba(255,107,0,0.35)', background: result.pct >= 75 ? 'rgba(57,255,20,0.06)' : 'rgba(255,107,0,0.06)' }}>
          <div style={{ fontSize: 48 }}>{result.pct >= 90 ? '🏆' : result.pct >= 75 ? '🎯' : result.pct >= 50 ? '📈' : '📚'}</div>
          <p className="text-2xl font-black" style={{ color: result.pct >= 75 ? '#39ff14' : '#ff6b00' }}>Rating: {result.rating}</p>
          <p className="text-sm text-white/60">{result.pct}% Professional Score · +{result.xpEarned} XP · +{result.coinEarned} Coins</p>
        </div>
        <div className="rounded-xl p-4 border border-[rgba(255,230,0,0.2)] bg-[rgba(255,230,0,0.04)]">
          <p className="text-[10px] text-[var(--neon-yellow)] font-bold mb-1 uppercase tracking-wider">💡 Key Lesson</p>
          <p className="text-xs text-white/60 leading-relaxed">{scenario.lesson[lang] || scenario.lesson.en}</p>
        </div>
        <button onClick={() => onComplete?.({ xpOverride: result.xpEarned, coinOverride: result.coinEarned })} className="w-full py-3 rounded-xl font-bold text-sm border transition-all" style={{ background: 'rgba(57,255,20,0.12)', borderColor: 'rgba(57,255,20,0.4)', color: '#39ff14' }}>
          ✅ Complete Mission
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Context */}
      <div className="rounded-xl p-4 border border-white/10" style={{ background: 'linear-gradient(135deg, rgba(191,0,255,0.06), #070b14)' }}>
        <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-1">📋 Situation</p>
        <p className="text-sm text-white/80">{scenario.context[lang] || scenario.context.en}</p>
      </div>

      {/* Progress */}
      <div className="flex gap-1.5">
        {scenario.exchanges.map((_, i) => (
          <div key={i} className="flex-1 h-1.5 rounded-full" style={{ background: i < currentEx ? '#39ff14' : i === currentEx ? '#bf00ff' : 'rgba(255,255,255,0.08)' }} />
        ))}
        <span className="text-xs text-white/30 flex-shrink-0">{currentEx + 1}/{scenario.exchanges.length}</span>
      </div>

      {/* NPC line */}
      <div className="rounded-xl p-4 border border-white/10" style={{ background: '#0d1a2e' }}>
        <p className="text-xs font-bold mb-2" style={{ color: '#bf00ff' }}>{scenario.npcAvatar} {scenario.npcName}</p>
        <p className="text-sm text-white/90 leading-relaxed italic">"{exchange?.npcLine[lang] || exchange?.npcLine.en}"</p>
      </div>

      {/* Choices */}
      <div className="space-y-2">
        <p className="text-[10px] text-white/30 uppercase tracking-wider font-bold">How do you respond?</p>
        {exchange?.choices.map(choice => {
          const chosen = choices[exchange.id] === choice.id;
          const anyChosen = !!choices[exchange.id];
          const fb = feedback[exchange.id];
          let borderCol = 'rgba(255,255,255,0.08)';
          let bgCol = 'rgba(255,255,255,0.02)';
          if (anyChosen && chosen) {
            borderCol = choice.type === 'professional' ? 'rgba(57,255,20,0.5)' : choice.type === 'neutral' ? 'rgba(255,230,0,0.4)' : 'rgba(255,45,120,0.5)';
            bgCol = choice.type === 'professional' ? 'rgba(57,255,20,0.08)' : choice.type === 'neutral' ? 'rgba(255,230,0,0.06)' : 'rgba(255,45,120,0.08)';
          }
          return (
            <button key={choice.id}
              disabled={anyChosen}
              onClick={() => handleChoice(exchange.id, choice.id)}
              className="w-full text-left rounded-xl px-4 py-3 border text-sm transition-all"
              style={{ borderColor: borderCol, background: bgCol, color: anyChosen && !chosen ? 'rgba(255,255,255,0.2)' : '#e2e8f0', cursor: anyChosen ? 'default' : 'pointer' }}>
              {choice.text[lang] || choice.text.en}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {feedback[exchange?.id] && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-xl px-4 py-3 border text-sm"
          style={{
            borderColor: feedback[exchange.id].type === 'professional' ? 'rgba(57,255,20,0.3)' : feedback[exchange.id].type === 'rude' ? 'rgba(255,45,120,0.3)' : 'rgba(255,230,0,0.3)',
            background: feedback[exchange.id].type === 'professional' ? 'rgba(57,255,20,0.05)' : feedback[exchange.id].type === 'rude' ? 'rgba(255,45,120,0.05)' : 'rgba(255,230,0,0.05)',
          }}>
          <p className="text-xs">{feedback[exchange.id].feedback[lang] || feedback[exchange.id].feedback.en}</p>
          <button onClick={nextExchange} className="mt-2 text-xs font-bold text-[var(--neon-cyan)] hover:text-white transition-colors">
            {currentEx < scenario.exchanges.length - 1 ? 'Next →' : 'See Results →'}
          </button>
        </motion.div>
      )}
    </div>
  );
}

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
              <div className="flex items-center gap-3">
                <button onClick={() => { setPhase('list'); setActiveMissionLocal(null); }} className="text-white/40 hover:text-white text-sm">←</button>
                <h2 className="font-bold text-white text-base flex-1">
                  {activeMission.localeKey ? t(`${activeMission.localeKey}.title`) : (activeMission.title?.[lang] || activeMission.title?.en || activeMission.id)}
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{
                  color: { easy: '#39ff14', medium: '#00f5ff', hard: '#ff6b00', epic: '#bf00ff', legendary: '#ffd700' }[activeMission.difficulty] || '#fff',
                  background: 'rgba(255,255,255,0.05)',
                }}>
                  {activeMission.difficulty}
                </span>
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
