// DIALOGUE SCENARIOS — Communication & Soft Skills (Step 6)
// Puzzle type: 'dialogue'
// Score types: 'professional' (full), 'neutral' (partial), 'rude'/'wrong' (zero/negative)

export const DIALOGUE_SCENARIOS = [

  // ── SCENARIO 1: Angry User — Slow Laptop ──────────────────────
  {
    id: 'dlg_001',
    title: { en: 'Angry User: Slow Laptop', id: 'User Marah: Laptop Lambat' },
    category: 'soft_skills', xpReward: 300, coinReward: 60,
    npcAvatar: '😤', npcName: 'Pak Budi',
    context: { en: 'Pak Budi storms into IT. His laptop has been slow for 3 days and he has a board presentation in 2 hours.', id: 'Pak Budi masuk ke IT dengan marah. Laptopnya lambat 3 hari dan ada presentasi direksi 2 jam lagi.' },
    exchanges: [
      {
        id: 'ex1',
        npcLine: { en: "This laptop is GARBAGE! It takes 10 minutes to open Excel! Do you even know how to do your job?!", id: "Laptop ini SAMPAH! Butuh 10 menit untuk buka Excel! Anda tahu cara kerja tidak?!" },
        choices: [
          { id: 'c1a', type: 'professional', score: 100,
            text: { en: "I understand your frustration, Pak Budi. Presentation in 2 hours — let's fix this right now. Can I take a quick look?", id: "Saya mengerti frustrasi Bapak. Presentasi 2 jam lagi — mari kita perbaiki sekarang. Boleh saya lihat sebentar?" },
            feedback: { en: '✅ Acknowledge urgency, validate feelings, take immediate action.', id: '✅ Akui urgensi, validasi perasaan, ambil tindakan segera.' } },
          { id: 'c1b', type: 'neutral', score: 40,
            text: { en: "Please calm down. I can help you but only if you stop yelling.", id: "Tolong tenang. Saya bisa bantu tapi hanya jika Anda berhenti berteriak." },
            feedback: { en: '⚠️ "Calm down" often escalates anger. Lead with the solution instead.', id: '⚠️ "Tenang" sering memperburuk amarah. Mulailah dengan solusi.' } },
          { id: 'c1c', type: 'wrong', score: 0,
            text: { en: "That's not a laptop problem — you probably have too many browser tabs open.", id: "Itu bukan masalah laptop — Anda mungkin terlalu banyak tab browser terbuka." },
            feedback: { en: '❌ Never diagnose without investigating AND never be dismissive.', id: '❌ Jangan diagnosa tanpa menyelidiki DAN jangan meremehkan.' } },
        ],
      },
      {
        id: 'ex2',
        npcLine: { en: "Fine. But I need this FIXED before 2 PM. TODAY.", id: "Baik. Tapi saya butuh ini DIPERBAIKI sebelum jam 2. HARI INI." },
        choices: [
          { id: 'c2a', type: 'professional', score: 100,
            text: { en: "Absolutely. Give me 20 minutes to diagnose. If I can't fix it by 1:30 PM, I'll set you up on a spare laptop before your presentation.", id: "Tentu. Berikan 20 menit untuk diagnosa. Jika tidak selesai sebelum jam 1:30, saya siapkan laptop cadangan sebelum presentasi." },
            feedback: { en: '✅ Commit to a timeline AND have a backup plan. This is how you build trust.', id: '✅ Komit pada jadwal DAN punya rencana cadangan. Inilah cara membangun kepercayaan.' } },
          { id: 'c2b', type: 'neutral', score: 30,
            text: { en: "I'll try my best but I can't make any promises about the timeline.", id: "Saya akan berusaha sebaik mungkin tapi tidak bisa berjanji soal jadwal." },
            feedback: { en: '⚠️ Vague commitments feel like avoidance. Be specific.', id: '⚠️ Komitmen samar terasa seperti penghindaran. Jadilah spesifik.' } },
          { id: 'c2c', type: 'rude', score: -20,
            text: { en: "Our SLA is 4 business hours for non-critical tickets.", id: "SLA kami adalah 4 jam kerja untuk tiket non-kritis." },
            feedback: { en: '❌ Quoting SLA at an angry user with a deadline is tone-deaf.', id: '❌ Mengutip SLA kepada pengguna marah yang punya deadline tidak peka.' } },
        ],
      },
      {
        id: 'ex3',
        npcLine: { en: "(After fix) Okay... it's running better. Why did it get so slow?", id: "(Setelah diperbaiki) Oke... sudah lebih cepat. Kenapa bisa jadi lambat begitu?" },
        choices: [
          { id: 'c3a', type: 'professional', score: 100,
            text: { en: "14 apps were auto-starting with Windows — I've disabled the unnecessary ones. Going forward, I'll schedule a quarterly tune-up for your machine.", id: "14 app auto-start dengan Windows — saya sudah nonaktifkan yang tidak perlu. Ke depannya, saya jadwalkan tune-up triwulanan." },
            feedback: { en: '✅ Explain root cause simply, state fix, propose proactive prevention.', id: '✅ Jelaskan akar masalah, nyatakan perbaikan, usulkan pencegahan proaktif.' } },
          { id: 'c3b', type: 'wrong', score: 0,
            text: { en: "It just gets slow sometimes. Computers are like that.", id: "Kadang memang jadi lambat. Begitulah komputer." },
            feedback: { en: '❌ Never give a non-answer. Explain what happened and what prevents recurrence.', id: '❌ Jangan pernah memberikan jawaban tidak jelas. Jelaskan apa yang terjadi dan cara mencegahnya.' } },
        ],
      },
    ],
    maxScore: 300,
    lesson: { en: 'Handling angry users: (1) Validate feelings first, (2) Focus on solution, (3) Commit to timeline with backup plan, (4) Explain root cause + prevention. Never get defensive or cite policy at someone in crisis.', id: 'Menangani pengguna marah: (1) Validasi perasaan dulu, (2) Fokus pada solusi, (3) Komit pada jadwal dengan rencana cadangan, (4) Jelaskan akar masalah + pencegahan.' },
  },

  // ── SCENARIO 2: CEO Emergency Escalation ──────────────────────
  {
    id: 'dlg_002',
    title: { en: 'CEO Emergency Escalation', id: 'Eskalasi Darurat CEO' },
    category: 'soft_skills', xpReward: 400, coinReward: 80,
    npcAvatar: '👔', npcName: 'CEO Pak Arief',
    context: { en: "CEO calls your direct line. He can't log in during an emergency board meeting. Board members are watching.", id: 'CEO menelepon langsung. Tidak bisa login saat rapat direksi darurat. Anggota direksi menyaksikan.' },
    exchanges: [
      {
        id: 'ex1',
        npcLine: { en: "This is Arief. I'm in an emergency board meeting and cannot log in. I need this fixed in 5 MINUTES.", id: "Ini Arief. Saya di rapat direksi darurat dan tidak bisa login. Saya butuh ini diperbaiki dalam 5 MENIT." },
        choices: [
          { id: 'c1a', type: 'professional', score: 100,
            text: { en: "Pak Arief, I'm on it right now. Are you seeing an error message, or a blank/spinning screen?", id: "Pak Arief, saya tangani sekarang. Apakah ada pesan error yang muncul, atau layar kosong/loading terus?" },
            feedback: { en: '✅ Reassure immediately, gather just enough info to act fast.', id: '✅ Segera meyakinkan, kumpulkan info secukupnya untuk bertindak cepat.' } },
          { id: 'c1b', type: 'wrong', score: -50,
            text: { en: "I need to open a ticket and follow the proper escalation process. What's your employee ID?", id: "Saya perlu membuka tiket dan mengikuti proses eskalasi. Berapa ID karyawan Anda?" },
            feedback: { en: '❌ NEVER ask the CEO for their employee ID. This is a VIP emergency — skip the process and act.', id: '❌ JANGAN PERNAH minta ID karyawan CEO. Ini darurat VIP — lewati proses dan bertindak.' } },
          { id: 'c1c', type: 'professional', score: 90,
            text: { en: "Of course, Pak Arief. Let me remotely connect to your machine right now — give me 60 seconds.", id: "Tentu, Pak Arief. Biarkan saya sambungkan secara remote ke mesin Anda sekarang — berikan 60 detik." },
            feedback: { en: '✅ Good initiative. Slightly less optimal than gathering info first, but urgency-first is right.', id: '✅ Inisiatif bagus. Sedikit kurang optimal tapi pendekatan urgensi-dulu sudah benar.' } },
        ],
      },
      {
        id: 'ex2',
        npcLine: { en: "It says 'Account locked'. I haven't changed anything!", id: "Katanya 'Akun terkunci'. Saya tidak mengubah apapun!" },
        choices: [
          { id: 'c2a', type: 'professional', score: 100,
            text: { en: "Perfect — I can unlock that in under 30 seconds. Unlocking now... done. Please try logging in again, Pak Arief.", id: "Sempurna — saya bisa buka kuncinya dalam 30 detik. Membuka kunci sekarang... selesai. Silakan coba login lagi, Pak Arief." },
            feedback: { en: '✅ Identify → Act → Confirm. No unnecessary explanation during the crisis.', id: '✅ Identifikasi → Tindak → Konfirmasi. Tidak ada penjelasan tidak perlu selama krisis.' } },
          { id: 'c2b', type: 'rude', score: -30,
            text: { en: "Accounts lock after 5 failed attempts. Did you try the wrong password? Maybe you forgot it over the weekend?", id: "Akun terkunci setelah 5 percobaan gagal. Apakah Anda mencoba password salah? Mungkin lupa saat akhir pekan?" },
            feedback: { en: '❌ Implying the CEO forgot their password in front of the board is career-limiting. Fix first, ask questions after.', id: '❌ Menyiratkan CEO lupa password di hadapan direksi bisa merusak karier. Perbaiki dulu, tanya setelah itu.' } },
        ],
      },
      {
        id: 'ex3',
        npcLine: { en: "(Working now) Good. What happened and how do I prevent this?", id: "(Sudah bisa) Bagus. Apa yang terjadi dan bagaimana mencegahnya?" },
        choices: [
          { id: 'c3a', type: 'professional', score: 100,
            text: { en: "Your account was auto-locked after failed login attempts — likely an outdated password in your password manager. I'll send you a brief email summary within the hour. I've also added you to our VIP fast-track support list.", id: "Akun Anda terkunci otomatis setelah percobaan login gagal — kemungkinan password lama di password manager. Saya kirimkan ringkasan email dalam satu jam. Saya juga tambahkan Bapak ke daftar fast-track VIP kami." },
            feedback: { en: '✅ Brief explanation + follow-up promise + proactive VIP treatment.', id: '✅ Penjelasan singkat + janji tindak lanjut + perlakuan VIP proaktif.' } },
          { id: 'c3b', type: 'wrong', score: 0,
            text: { en: "It was just an account lockout. It happens to everyone, nothing special.", id: "Hanya lockout akun biasa. Terjadi pada semua orang, tidak ada yang istimewa." },
            feedback: { en: '❌ Dismissing a CEO\'s concern as "nothing special" is disrespectful.', id: '❌ Meremehkan kekhawatiran CEO sebagai "tidak istimewa" tidak hormat.' } },
        ],
      },
    ],
    maxScore: 300,
    lesson: { en: 'VIP/Executive support: Act first, minimal questions, never ask for employee ID from senior executives, fix silently while narrating progress, explain after — not during.', id: 'Dukungan VIP/Eksekutif: Bertindak dulu, pertanyaan minimal, jangan minta ID karyawan eksekutif senior, perbaiki sambil bernarasi, jelaskan setelah — bukan selama.' },
  },

  // ── SCENARIO 3: Rude Email Complaint ──────────────────────────
  {
    id: 'dlg_003',
    title: { en: 'Handling a Rude Email Complaint', id: 'Menangani Email Keluhan yang Kasar' },
    category: 'soft_skills', xpReward: 250, coinReward: 50,
    npcAvatar: '📧', npcName: 'Finance User',
    context: { en: "A Finance user CC'd their manager and the CIO on an email accusing IT of ignoring their 2-day-old ticket.", id: 'Pengguna Finance CC manajer dan CIO di email yang menuduh IT mengabaikan tiket mereka selama 2 hari.' },
    exchanges: [
      {
        id: 'ex1',
        npcLine: { en: "I submitted a ticket 2 days ago and NOBODY responded! IT clearly doesn't care about Finance. CC: Manager, CIO.", id: "Saya submit tiket 2 hari lalu dan TIDAK ADA yang merespons! IT jelas tidak peduli dengan Finance. CC: Manajer, CIO." },
        choices: [
          { id: 'c1a', type: 'professional', score: 100,
            text: { en: "I sincerely apologize for the delay — this should not have happened. I'm taking ownership of Ticket #2041 right now and will have an update within 2 hours. I'm also reviewing why this slipped through our queue.", id: "Saya sangat mohon maaf atas keterlambatan — ini tidak seharusnya terjadi. Saya mengambil alih Tiket #2041 sekarang dan akan memberikan update dalam 2 jam. Saya juga meninjau mengapa ini terlewat." },
            feedback: { en: '✅ Acknowledge → Apologize → Take ownership → Timeline → Promise systemic review.', id: '✅ Akui → Minta maaf → Ambil alih → Jadwal → Janjikan tinjauan sistemik.' } },
          { id: 'c1b', type: 'neutral', score: 30,
            text: { en: "Our team has been overwhelmed with a server migration this week. We will get to your ticket when possible.", id: "Tim kami kewalahan dengan migrasi server minggu ini. Kami akan menangani tiket Anda jika memungkinkan." },
            feedback: { en: '⚠️ Explaining workload sounds like an excuse. Focus on their problem, not your team\'s issues.', id: '⚠️ Menjelaskan beban kerja terdengar seperti alasan. Fokus pada masalah mereka.' } },
          { id: 'c1c', type: 'rude', score: -50,
            text: { en: "Our records show your ticket was marked 'waiting for user response' — IT has been waiting on YOU.", id: "Catatan kami menunjukkan tiket Anda ditandai 'menunggu respons pengguna' — IT menunggu ANDA." },
            feedback: { en: '❌ NEVER publicly embarrass a user even if you\'re right. Handle corrections privately.', id: '❌ JANGAN PERNAH mempermalukan pengguna secara publik bahkan jika Anda benar. Tangani koreksi secara pribadi.' } },
        ],
      },
    ],
    maxScore: 100,
    lesson: { en: 'Email complaints: reply-all with ownership + apology + timeline. Never be defensive in public threads — take it private. Your tone reflects on the entire IT department.', id: 'Keluhan email: balas semua dengan kepemilikan + permintaan maaf + jadwal. Jangan defensif di thread publik. Nada Anda mencerminkan seluruh departemen IT.' },
  },

  // ── SCENARIO 4: Non-Technical User Explanation ────────────────
  {
    id: 'dlg_004',
    title: { en: 'Explaining Tech Issues Simply', id: 'Menjelaskan Masalah Teknis dengan Sederhana' },
    category: 'soft_skills', xpReward: 200, coinReward: 40,
    npcAvatar: '👵', npcName: 'Ibu Retno',
    context: { en: 'Ibu Retno (HR, 58 years old) thinks her files disappeared after Windows automatically restarted for an update.', id: 'Ibu Retno (HR, 58 tahun) pikir filenya hilang setelah Windows restart otomatis untuk update.' },
    exchanges: [
      {
        id: 'ex1',
        npcLine: { en: "All my files are gone! The computer restarted by itself and now I can't find anything! Did it delete my work?", id: "Semua file saya hilang! Komputer restart sendiri dan sekarang saya tidak bisa menemukan apapun! Apakah dihapus?" },
        choices: [
          { id: 'c1a', type: 'professional', score: 100,
            text: { en: "Don't worry, Ibu Retno — your files are safe! The computer did an automatic health check-up last night. Your files are still there. Let me show you where they are.", id: "Jangan khawatir, Ibu Retno — file Anda aman! Komputer melakukan pemeriksaan kesehatan otomatis semalam. File Anda masih ada. Biarkan saya tunjukkan di mana letaknya." },
            feedback: { en: '✅ Reassure immediately, use a non-technical analogy ("health check-up"), and show by doing.', id: '✅ Segera meyakinkan, gunakan analogi non-teknis ("pemeriksaan kesehatan"), dan tunjukkan dengan melakukan.' } },
          { id: 'c1b', type: 'wrong', score: 0,
            text: { en: "The Windows Update process triggers an automatic restart after applying kernel-level patches. Your files should still be in the C:\\Users directory.", id: "Proses Windows Update memicu restart otomatis setelah menerapkan patch level kernel. File Anda seharusnya masih di direktori C:\\Users." },
            feedback: { en: '❌ Jargon ("kernel-level patches", "C:\\Users") is incomprehensible and increases anxiety. Always translate to human terms.', id: '❌ Jargon teknis tidak dapat dipahami dan meningkatkan kecemasan. Selalu terjemahkan ke istilah manusia.' } },
          { id: 'c1c', type: 'neutral', score: 40,
            text: { en: "Your files aren't gone. You need to sort File Explorer by date modified. Also you should be saving to SharePoint as we announced last month.", id: "File Anda tidak hilang. Anda perlu mengurutkan File Explorer berdasarkan tanggal dimodifikasi. Juga seharusnya Anda menyimpan ke SharePoint seperti diumumkan bulan lalu." },
            feedback: { en: '⚠️ Technically correct but the last part sounds like a lecture. Help first, educate gently afterward.', id: '⚠️ Secara teknis benar tapi bagian terakhir terdengar seperti ceramah. Bantu dulu, edukasi dengan lembut setelah itu.' } },
        ],
      },
    ],
    maxScore: 100,
    lesson: { en: 'Non-technical users: (1) Reassure first, (2) Use everyday analogies not jargon, (3) Show by doing not telling, (4) Never lecture — educate gently after solving. Adapting your communication level is a core IT skill.', id: 'Pengguna non-teknis: (1) Yakinkan dulu, (2) Gunakan analogi sehari-hari, (3) Tunjukkan dengan melakukan, (4) Edukasi dengan lembut setelah memecahkan. Menyesuaikan level komunikasi adalah keterampilan IT inti.' },
  },
];

// ── Score helper ───────────────────────────────────────────────
export function scoreDialogue(scenarioId, userChoices) {
  const scenario = DIALOGUE_SCENARIOS.find(s => s.id === scenarioId);
  if (!scenario) return { score: 0, maxScore: 0, pct: 0, rating: 'F', xpEarned: 0, coinEarned: 0 };

  let totalScore = 0;
  let maxScore = 0;

  scenario.exchanges.forEach(exchange => {
    const best = Math.max(...exchange.choices.map(c => c.score));
    maxScore += Math.max(best, 0);
    const chosen = exchange.choices.find(c => userChoices[exchange.id] === c.id);
    if (chosen) totalScore += Math.max(chosen.score, 0);
  });

  const pct = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
  const rating = pct >= 90 ? 'S' : pct >= 75 ? 'A' : pct >= 60 ? 'B' : pct >= 40 ? 'C' : 'D';
  return {
    score: totalScore, maxScore,
    pct: Math.round(pct), rating,
    xpEarned: Math.round(scenario.xpReward * (pct / 100)),
    coinEarned: Math.round(scenario.coinReward * (pct / 100)),
  };
}
