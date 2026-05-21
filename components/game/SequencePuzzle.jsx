'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { sound } from '@/lib/audio';

const STEP_COLORS = [
  { bg: 'rgba(57,255,20,0.12)',  border: 'rgba(57,255,20,0.4)',  text: '#39ff14', num: '#000' },
  { bg: 'rgba(0,245,255,0.12)', border: 'rgba(0,245,255,0.4)',  text: '#00f5ff', num: '#000' },
  { bg: 'rgba(191,0,255,0.12)', border: 'rgba(191,0,255,0.4)',  text: '#bf00ff', num: '#fff' },
  { bg: 'rgba(255,107,0,0.12)', border: 'rgba(255,107,0,0.4)',  text: '#ff6b00', num: '#fff' },
  { bg: 'rgba(255,45,120,0.12)',border: 'rgba(255,45,120,0.4)', text: '#ff2d78', num: '#fff' },
];

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

export default function SequencePuzzle({ mission, onComplete, onFail }) {
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
              <button onClick={handleReset} className="w-full py-2 rounded-lg border border-[rgba(0,245,255,0.3)] text-[var(--neon-cyan)] text-sm font-bold hover:bg-[rgba(0,245,255,0.08)] transition-all font-mono">🔄 Try Again</button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Onboarding Tutorial Modal */}
      <AnimatePresence>
        {showTutorial && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass border border-[var(--neon-yellow)] max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl relative"
              style={{ background: '#070b15' }}
            >
              {/* Top title */}
              <div className="border-b border-white/10 p-3 sm:p-4 flex items-center justify-between bg-[rgba(255,230,0,0.03)]">
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
              <div className="p-4 sm:p-6 space-y-4">
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
              <div className="border-t border-white/10 p-3 sm:p-4 flex items-center justify-between bg-black/20">
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
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass border border-[var(--neon-cyan)] max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[80vh]"
              style={{ background: '#070b15' }}
            >
              {/* Top title */}
              <div className="border-b border-white/10 p-3 sm:p-4 flex items-center justify-between bg-[rgba(0,245,255,0.03)]">
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
              <div className="p-3 sm:p-6 space-y-3 sm:space-y-4 overflow-y-auto flex-1">
                <p className="text-xs text-white/50 leading-relaxed mb-2">
                  {lang === 'id'
                    ? 'Berikut adalah 6 langkah metodologi troubleshooting IT standar industri (CompTIA A+) untuk memecahkan masalah sistem komputer.'
                    : 'Here is the official 6-step CompTIA IT troubleshooting methodology used by industry professionals.'}
                </p>

                <div className="space-y-3.5">
                  {Object.entries(METHODOLOGY_GLOSSARY).map(([key, item]) => {
                    return (
                      <div key={key} className="bg-white/[0.02] border border-white/5 hover:border-white/10 p-3 sm:p-3.5 rounded-xl transition-all">
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
              <div className="border-t border-white/10 p-3 sm:p-4 bg-black/20 text-right">
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
