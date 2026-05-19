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

export default function Terminal({ mission, onStepComplete, onComplete, onFail, freeMode = false }) {
  const { t, lang } = useLanguage();

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
        setTimeout(() => addLine(`💡 Hint: ${hintText}`, 'hint'), 300);
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

      {/* Terminal window */}
      <div
        className="terminal rounded-xl overflow-hidden"
        style={{ minHeight: 280, maxHeight: 360, display: 'flex', flexDirection: 'column' }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal title bar */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-[rgba(57,255,20,0.15)]"
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
    </div>
  );
}
