'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sound } from '@/lib/audio';
import { useLanguage } from '@/context/LanguageContext';

// ── Simulated command outputs ───────────────────────────────
const COMMANDS = {
  help: (lang) => lang === 'id' ? `Perintah yang tersedia:
  ping [host]     - Uji konektivitas jaringan
  ipconfig        - Tampilkan konfigurasi IP
  tracert [host]  - Lacak rute jaringan
  nslookup [host] - Kueri rekaman DNS
  netstat         - Tampilkan koneksi aktif
  tasklist        - Daftar proses berjalan
  msconfig        - Konfigurasi sistem
  cls             - Bersihkan terminal
  help            - Tampilkan bantuan ini` : `Available commands:
  ping [host]     - Test network connectivity
  ipconfig        - Display IP configuration
  tracert [host]  - Trace network route
  nslookup [host] - Query DNS records
  netstat         - Show active connections
  tasklist        - List running processes
  msconfig        - System configuration
  cls             - Clear terminal
  help            - Show this help`,

  ipconfig: () => `Windows IP Configuration

Ethernet adapter Local Area Connection:
   Connection-specific DNS Suffix: local
   IPv4 Address. . . . . . : 192.168.1.105
   Subnet Mask . . . . . . : 255.255.255.0
   Default Gateway . . . . : 192.168.1.1
   DNS Servers . . . . . . : 8.8.8.8
                             8.8.4.4`,

  ping: (lang, args) => {
    const host = args[0] || 'google.com';
    const time1 = 12 + Math.floor(Math.random() * 20);
    const time2 = 10 + Math.floor(Math.random() * 20);
    const time3 = 11 + Math.floor(Math.random() * 20);
    const time4 = 13 + Math.floor(Math.random() * 20);
    return `Pinging ${host} with 32 bytes of data:
Reply from ${host}: bytes=32 time=${time1}ms TTL=118
Reply from ${host}: bytes=32 time=${time2}ms TTL=118
Reply from ${host}: bytes=32 time=${time3}ms TTL=118
Reply from ${host}: bytes=32 time=${time4}ms TTL=118

Ping statistics for ${host}:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)
Approximate round trip times in milli-seconds:
    Minimum = ${Math.min(time1,time2,time3,time4)}ms, Maximum = ${Math.max(time1,time2,time3,time4)}ms, Average = ${Math.round((time1+time2+time3+time4)/4)}ms`;
  },

  tracert: (lang, args) => {
    const host = args[0] || 'google.com';
    return `Tracing route to ${host} [142.250.185.46] over a maximum of 30 hops:

  1    <1 ms    <1 ms    <1 ms  192.168.1.1
  2     5 ms     4 ms     5 ms  10.0.0.1
  3    12 ms    11 ms    12 ms  172.16.0.1
  4    15 ms    14 ms    16 ms  203.0.113.1
  5    22 ms    21 ms    23 ms  ${host} [142.250.185.46]

Trace complete.`;
  },

  nslookup: (lang, args) => {
    const host = args[0] || 'google.com';
    return `Server:  dns.google
Address:  8.8.8.8

Non-authoritative answer:
Name:    ${host}
Addresses: 142.250.185.46
           2404:6800:4004:81b::200e`;
  },

  netstat: () => `Active Connections

  Proto  Local Address      Foreign Address     State
  TCP    127.0.0.1:1080     0.0.0.0:0           LISTENING
  TCP    192.168.1.105:80   142.250.185.46:443  ESTABLISHED
  TCP    192.168.1.105:443  172.217.0.1:443     ESTABLISHED
  TCP    192.168.1.105:3389 0.0.0.0:0           LISTENING`,

  tasklist: () => `Image Name               PID   Mem Usage
======================== ===== =========
System Idle Process        0       8 K
System                     4     144 K
chrome.exe              1234  256,000 K  [Startup]
spotify.exe             2345   98,000 K  [Startup]
discord.exe             3456   87,000 K  [Startup]
steam.exe               4567  145,000 K  [Startup]
dropbox.exe             5678   32,000 K  [Startup]
zoom.exe                6789   64,000 K  [Startup]
skype.exe               7890   48,000 K  [Startup]
antivirus.exe           8901   28,000 K  [Startup]`,

  msconfig: () => `System Configuration
[General] [Boot] [Services] [Startup] [Tools]

Startup items (8 enabled):
  [✓] Chrome        - google\\chrome\\application\\chrome.exe
  [✓] Spotify       - spotify\\spotify.exe
  [✓] Discord       - discord\\discord.exe
  [✓] Steam         - steam\\steam.exe
  [✓] Dropbox       - dropbox\\dropbox.exe
  [✓] Zoom          - zoom\\zoom.exe
  [✓] Skype         - microsoft\\skype\\phone\\skype.exe
  [✓] Antivirus     - antivirus\\av.exe

→ Tip: Disable non-essential apps to speed up boot`,

  disable: (lang, args) => {
    const items = args.join(', ');
    return `Disabling startup items: ${items}
${args.map(a => `Disabled: ${a}.exe   [OK]`).join('\n')}
Changes will take effect after restart.
Estimated boot improvement: ~${args.length * 8}-${args.length * 12} seconds faster`;
  },

  cls: () => '__CLEAR__',
};

const TERMINAL_GLOSSARY = {
  ping: {
    title: { en: "ping [host/IP]", id: "ping [host/IP]" },
    desc: {
      en: "Tests connectivity between your PC and a remote server (e.g., google.com). Sends ICMP packets and measures response latency in milliseconds.",
      id: "Menguji konektivitas antara PC Anda dan server tujuan (misal: google.com). Mengirim paket ICMP dan mengukur kecepatan respons dalam milidetik."
    }
  },
  ipconfig: {
    title: { en: "ipconfig", id: "ipconfig" },
    desc: {
      en: "Displays network interface configuration: your IPv4 address, subnet mask, default gateway, and DNS servers. Crucial for checking local network status.",
      id: "Menampilkan konfigurasi antarmuka jaringan: alamat IPv4 Anda, subnet mask, default gateway, dan server DNS. Sangat penting untuk cek status LAN."
    }
  },
  tracert: {
    title: { en: "tracert [host/IP]", id: "tracert [host/IP]" },
    desc: {
      en: "Traces the path packets take to reach a destination server, listing every intermediate router (hop). Helps find where the connection is breaking.",
      id: "Melacak rute perjalanan paket data menuju server tujuan, menampilkan setiap router perantara (hop). Membantu mencari titik koneksi yang putus."
    }
  },
  nslookup: {
    title: { en: "nslookup [domain]", id: "nslookup [domain]" },
    desc: {
      en: "Queries DNS servers to resolve a domain name into an IP address. Used to troubleshoot name resolution problems (like 'Server Not Found').",
      id: "Mengirim kueri ke server DNS untuk mengubah nama domain menjadi alamat IP. Digunakan untuk mendiagnosis masalah resolusi nama domain."
    }
  },
  netstat: {
    title: { en: "netstat", id: "netstat" },
    desc: {
      en: "Displays active network connections, open ports, and listening sockets. Useful to check if programs are actively communicating or if port conflicts exist.",
      id: "Menampilkan koneksi jaringan yang aktif, port yang terbuka, dan status listening. Berguna untuk memeriksa program yang sedang berkomunikasi."
    }
  },
  tasklist: {
    title: { en: "tasklist", id: "tasklist" },
    desc: {
      en: "Lists all currently running processes in the system along with their Process IDs (PIDs) and memory usage. Used to find resource-heavy or frozen apps.",
      id: "Menampilkan daftar seluruh proses program yang sedang berjalan saat ini beserta ID Proses (PID) dan penggunaan memori. Membantu mencari program yang macet."
    }
  },
  msconfig: {
    title: { en: "msconfig", id: "msconfig" },
    desc: {
      en: "System Configuration tool. Allows configuring startup services and programs. Disabling unnecessary startup apps helps speed up system booting.",
      id: "Alat Konfigurasi Sistem. Membantu mengatur program dan layanan yang berjalan otomatis saat komputer menyala (startup) agar booting lebih cepat."
    }
  }
};

export default function Terminal({ mission, onStepComplete, onComplete, onFail, freeMode = false }) {
  const { t, lang } = useLanguage();

  // Onboarding Tutorial & Glossary state
  const [showTutorial, setShowTutorial] = useState(false);
  const [showGuidebook, setShowGuidebook] = useState(false);
  const [currentTutorialSlide, setCurrentTutorialSlide] = useState(0);

  const tutorialSlides = [
    {
      titleEn: "Welcome to IT Support Terminal! 💻",
      titleId: "Selamat Datang di Terminal Support IT! 💻",
      bodyEn: "Here you act as an IT technician configuring systems via command-line interface. Read the active step instruction at the top of the window, type the correct command, and press Enter to execute.",
      bodyId: "Di sini Anda bertindak sebagai teknisi IT yang mengonfigurasi sistem melalui baris perintah. Baca petunjuk langkah aktif di bagian atas, ketik perintah yang sesuai, dan tekan Enter untuk menjalankan.",
      tipEn: "Tip: Click any command in the quick-buttons tray at the bottom to auto-fill the prompt!",
      tipId: "Tips: Klik perintah apa saja di baki tombol cepat di bawah untuk mengisi perintah otomatis!"
    },
    {
      titleEn: "Command History & Shortcuts ⌨️",
      titleId: "Riwayat Perintah & Jalan Pintas ⌨️",
      bodyEn: "You don't need to re-type everything! Press the Arrow Up ⬆️ or Arrow Down ⬇️ keys to cycle through previously typed commands in your session history.",
      bodyId: "Anda tidak perlu mengetik ulang semuanya! Tekan tombol Panah Atas ⬆️ atau Panah Bawah ⬇️ untuk melihat riwayat perintah yang pernah diketik sebelumnya.",
      tipEn: "Tip: Type 'help' inside the terminal anytime to list all available actions.",
      tipId: "Tips: Ketik 'help' di dalam terminal kapan saja untuk melihat semua aksi yang didukung."
    }
  ];

  useEffect(() => {
    // Show tutorial automatically for the first play
    const hasSeenTerminalTutorial = localStorage.getItem('hasSeenTerminalTutorial');
    if (!hasSeenTerminalTutorial) {
      setShowTutorial(true);
      localStorage.setItem('hasSeenTerminalTutorial', 'true');
    }
  }, []);

  // Support both legacy format (puzzleData.terminalSteps) and new format (terminalData.tasks)
  const terminalData = mission?.terminalData || null;
  const legacySteps = mission?.puzzleData?.terminalSteps || [];
  const missionSteps = terminalData ? terminalData.tasks : legacySteps;
  const introText = terminalData?.intro || null;

  const [history, setHistory] = useState(() => {
    const welcome = t('terminalWelcome') || 'IT Support Terminal v1.0\nType "help" for commands.\n';
    const lines = [{ type: 'system', text: welcome }];
    if (introText) lines.push({ type: 'system', text: `📋 MISSION: ${introText}\n` });
    return lines;
  });
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const [missionStep, setMissionStep] = useState(0);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const addLine = (text, type = 'output') => {
    setHistory(h => [...h, { type, text, id: Date.now() + Math.random() }]);
  };

  const handleCommand = (rawCmd) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Add to cmd history
    setCmdHistory(h => [trimmed, ...h].slice(0, 50));
    setCmdIndex(-1);

    // Echo command
    addLine(`> ${trimmed}`, 'prompt');
    sound.keyType();

    if (trimmed === 'cls') {
      setHistory([{ type: 'system', text: 'Terminal cleared.\n' }]);
      setInput('');
      return;
    }

    const parts = trimmed.toLowerCase().split(' ');
    const cmd = parts[0];
    const args = parts.slice(1);

    // Mission step checking — supports both legacy (expectedCmd) and new format (command)
    if (missionSteps.length > 0 && missionStep < missionSteps.length) {
      const currentStep = missionSteps[missionStep];
      // New format uses `command`, legacy uses `expectedCmd`
      const expectedCmd = (currentStep.command || currentStep.expectedCmd || '').toLowerCase();
      const firstWord = expectedCmd.split(' ')[0];
      const matches = trimmed.toLowerCase().startsWith(firstWord) ||
                      trimmed.toLowerCase() === expectedCmd;
      if (matches) {
        // Show the scripted output for this task
        const output = currentStep.successOutput || currentStep.output || '';
        const lesson = currentStep.lesson || '';
        setTimeout(() => {
          addLine(output, 'output');
          if (lesson) addLine(`\n💡 ${lesson}`, 'lesson');
          const nextStep = missionStep + 1;
          setMissionStep(nextStep);
          onStepComplete?.(nextStep);
          if (nextStep >= missionSteps.length) {
            const successMsg = terminalData?.successMsg || 'All steps completed! Mission solved!';
            setTimeout(() => {
              addLine(`\n✅ ${successMsg}`, 'success');
              if (terminalData?.lesson) addLine(`\n📖 ${terminalData.lesson}`, 'lesson');
              onComplete?.();
            }, 500);
          }
        }, 400);
        setInput('');
        return;
      } else {
        const hintCmd = currentStep.command || currentStep.expectedCmd || '';
        const hintText = currentStep.hint || `Try: ${hintCmd}`;
        const feedback = getTerminalFeedback(trimmed, expectedCmd, hintText, lang);
        setTimeout(() => addLine(`💡 ${feedback}`, 'hint'), 300);
        setInput('');
        return;
      }
    }

    // Free mode — run any command
    const handler = COMMANDS[cmd];
    if (handler) {
      const out = handler(lang, args);
      if (out === '__CLEAR__') {
        setHistory([]);
      } else {
        setTimeout(() => addLine(out, 'output'), 200);
      }
    } else {
      setTimeout(() => addLine(`'${cmd}' is not recognized. Type "help" for commands.`, 'error'), 200);
    }

    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = Math.min(cmdIndex + 1, cmdHistory.length - 1);
      setCmdIndex(idx);
      setInput(cmdHistory[idx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const idx = Math.max(cmdIndex - 1, -1);
      setCmdIndex(idx);
      setInput(idx === -1 ? '' : cmdHistory[idx] || '');
    } else {
      sound.keyType();
    }
  };

  const typeColors = {
    system:  'text-[var(--neon-cyan)]',
    prompt:  'text-white',
    output:  'text-[var(--neon-green)]',
    error:   'text-[var(--neon-pink)]',
    hint:    'text-[var(--neon-yellow)]',
    lesson:  'text-[var(--neon-purple)]',
    success: 'text-[var(--neon-green)] font-bold',
  };

  // Mission step progress
  const currentMissionStep = missionSteps[missionStep];
  // New format uses `instruction`, legacy uses `prompt`
  const stepLabel = currentMissionStep?.instruction || currentMissionStep?.prompt || '';
  const stepHint  = currentMissionStep?.hint || '';

  return (
    <div className="space-y-3">
      {/* Mission prompt */}
      {currentMissionStep && (
        <motion.div
          key={missionStep}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-lg px-4 py-2.5 border border-[rgba(255,230,0,0.3)] bg-[rgba(255,230,0,0.05)] text-sm"
        >
          <span className="text-[var(--neon-yellow)] font-bold">📋 Step {missionStep + 1}/{missionSteps.length}: </span>
          <span className="text-white/70">{stepLabel}</span>
          {stepHint && (
            <div className="mt-1 text-xs text-white/40">
              💡 {stepHint}
            </div>
          )}
        </motion.div>
      )}

      {/* Guide & Tutorial Buttons */}
      <div className="flex gap-2 justify-end">
        <button
          onClick={() => { sound.click(); setCurrentTutorialSlide(0); setShowTutorial(true); }}
          className="px-3 py-1.5 rounded-lg border border-[var(--neon-yellow)]/30 bg-[rgba(255,230,0,0.08)] text-[var(--neon-yellow)] hover:bg-[rgba(255,230,0,0.15)] text-xs font-bold font-mono transition-all flex items-center gap-1.5 shadow-[0_0_8px_rgba(255,230,0,0.1)]"
        >
          <span>🎓</span>
          <span>{lang === 'id' ? 'Tutorial Terminal' : 'Terminal Tutorial'}</span>
        </button>
        
        <button
          onClick={() => { sound.click(); setShowGuidebook(true); }}
          className="px-3 py-1.5 rounded-lg border border-[var(--neon-cyan)]/30 bg-[rgba(0,245,255,0.08)] text-[var(--neon-cyan)] hover:bg-[rgba(0,245,255,0.15)] text-xs font-bold font-mono transition-all flex items-center gap-1.5 shadow-[0_0_8px_rgba(0,245,255,0.1)]"
        >
          <span>📖</span>
          <span>{lang === 'id' ? 'Kamus Perintah' : 'Command Glossary'}</span>
        </button>
      </div>

      {/* Terminal window */}
      <div
        className="terminal rounded-xl overflow-hidden"
        style={{ minHeight: 280, maxHeight: 360, display: 'flex', flexDirection: 'column' }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal title bar */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-b-[rgba(57,255,20,0.15)]"
          style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28ca42]" />
          <span className="ml-2 text-xs text-[var(--neon-green)]/50 font-mono">IT Support Terminal</span>
          {/* Step counter */}
          {missionSteps.length > 0 && (
            <span className="ml-auto text-xs text-[var(--neon-yellow)]">
              {missionStep}/{missionSteps.length} steps
            </span>
          )}
        </div>

        {/* Output */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1 font-mono text-xs">
          {history.map((line, i) => (
            <div key={line.id || i} className={typeColors[line.type] || 'text-white'}>
              {line.text.split('\n').map((l, j) => (
                <div key={j}>{l || '\u00A0'}</div>
              ))}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input line */}
        <div className="flex items-center gap-2 px-3 py-2 border-t border-[rgba(57,255,20,0.15)]"
          style={{ background: 'rgba(0,0,0,0.3)' }}>
          <span className="text-[var(--neon-cyan)] font-mono text-xs select-none">C:\&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck={false}
            className="flex-1 bg-transparent text-[var(--neon-green)] font-mono text-xs outline-none caret-[var(--neon-green)]"
            placeholder="type command..."
          />
          <span className="terminal-cursor" />
        </div>
      </div>

      {/* Quick commands */}
      <div className="flex flex-wrap gap-1.5">
        {['help', 'ipconfig', 'ping 8.8.8.8', 'tracert google.com', 'nslookup google.com', 'tasklist'].map(cmd => (
          <button
            key={cmd}
            onClick={() => { setInput(cmd); inputRef.current?.focus(); }}
            className="px-2 py-1 rounded border border-white/10 text-xs text-white/40 hover:text-[var(--neon-cyan)] hover:border-[rgba(0,245,255,0.3)] transition-all font-mono"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Onboarding Tutorial Modal */}
      {showTutorial && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div
            className="glass border border-[var(--neon-yellow)] max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl relative"
            style={{ background: '#070b15' }}
          >
            {/* Top title */}
            <div className="border-b border-white/10 p-4 flex items-center justify-between bg-[rgba(255,230,0,0.03)]">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎓</span>
                <h3 className="font-orbitron font-black text-[10px] uppercase tracking-widest text-[var(--neon-yellow)]">
                  {lang === 'id' ? 'Tutorial Onboarding Terminal' : 'Terminal Onboarding Tutorial'}
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
                {currentTutorialSlide === 0 && '💻'}
                {currentTutorialSlide === 1 && '⌨️'}
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
          </div>
        </div>
      )}

      {/* Terminal Command Glossary Guidebook Modal */}
      {showGuidebook && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div
            className="glass border border-[var(--neon-cyan)] max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[80vh]"
            style={{ background: '#070b15' }}
          >
            {/* Top title */}
            <div className="border-b border-white/10 p-4 flex items-center justify-between bg-[rgba(0,245,255,0.03)]">
              <div className="flex items-center gap-2">
                <span className="text-xl">📖</span>
                <h3 className="font-orbitron font-black text-[10px] uppercase tracking-widest text-[var(--neon-cyan)]">
                  {lang === 'id' ? 'Kamus Perintah Terminal IT' : 'IT Terminal Command Glossary'}
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
                  ? 'Berikut adalah penjelasan perintah-perintah terminal CLI yang akan membantu Anda memecahkan misi.'
                  : 'Here is an overview of command-line terminal syntax to help you complete the tasks.'}
              </p>

              <div className="space-y-3.5">
                {Object.entries(TERMINAL_GLOSSARY).map(([key, item]) => {
                  return (
                    <div key={key} className="bg-white/[0.02] border border-white/5 hover:border-white/10 p-3.5 rounded-xl transition-all">
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span className="text-lg bg-black/45 px-2.5 py-1.5 rounded-lg border border-white/5 font-mono text-[var(--neon-green)]">
                          {key}
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
          </div>
        </div>
      )}
    </div>
  );
}

function getTerminalFeedback(typed, expectedCmd, hintText, lang) {
  const isId = lang === 'id';
  const cleanTyped = typed.trim().toLowerCase();
  const cleanExpected = expectedCmd.trim().toLowerCase();

  // 1. Spacing check (e.g. ping8.8.8.8 instead of ping 8.8.8.8)
  const firstWordExpected = cleanExpected.split(' ')[0];
  if (cleanTyped.startsWith(firstWordExpected) && !cleanTyped.includes(' ') && cleanTyped !== firstWordExpected) {
    return isId 
      ? `Perintah '${firstWordExpected}' dan parameternya harus dipisahkan oleh spasi. Contoh: '${expectedCmd}'`
      : `The command '${firstWordExpected}' and its argument must be separated by a space. E.g., '${expectedCmd}'`;
  }

  // 2. Wrong utility helper
  const commonUtilities = ['ping', 'nslookup', 'ipconfig', 'tracert', 'netstat', 'systeminfo', 'gpupdate', 'mkdir', 'cd', 'dir', 'type'];
  const typedWord = cleanTyped.split(' ')[0];
  if (commonUtilities.includes(typedWord) && typedWord !== firstWordExpected) {
    return isId
      ? `Anda menggunakan perintah '${typedWord}', padahal misi ini meminta Anda untuk menggunakan '${firstWordExpected}'. ${hintText}`
      : `You entered the '${typedWord}' utility, but this task requires the '${firstWordExpected}' utility. ${hintText}`;
  }

  // 3. Missing argument helper (e.g. typing "nslookup" without the domain)
  if (cleanTyped === firstWordExpected && cleanExpected !== firstWordExpected) {
    return isId
      ? `Perintah '${firstWordExpected}' memerlukan argumen/parameter target tambahan. ${hintText}`
      : `The '${firstWordExpected}' command is missing its target argument/parameter. ${hintText}`;
  }

  // 4. Default hint
  return isId 
    ? `Perintah salah. Petunjuk: ${hintText}`
    : `Incorrect command. Hint: ${hintText}`;
}
