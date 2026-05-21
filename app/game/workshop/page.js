'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useGameStore } from '@/store/gameStore';
import { useRouter } from 'next/navigation';
import PCRepairSimPuzzle from '@/components/game/PCRepairSimPuzzle';
import NetworkSimPuzzle from '@/components/game/NetworkSimPuzzle';
import Terminal from '@/components/game/Terminal';
import { getMissionById } from '@/lib/missions';
import { Badge } from '@/components/ui';
import { sound } from '@/lib/audio';

const PRACTICE_MISSIONS = [
  // PC Repair
  { id: 't1_pc_repair_sim', label: 'PC Won\'t Boot (3 Beeps & No Power)', labelId: 'PC Tidak Booting (3 Bip & Mati Total)', icon: '🔌', type: 'pc_repair', diff: 'easy' },
  { id: 't2_001', label: 'Install RAM Upgrade (16GB)', labelId: 'Pasang Upgrade RAM (16GB)', icon: '🧠', type: 'pc_repair', diff: 'easy' },
  { id: 't2_003', label: 'Overheating CPU (Thermal Paste/Dust)', labelId: 'CPU Overheat (Thermal Paste & Debu)', icon: '🌀', type: 'pc_repair', diff: 'medium' },
  { id: 't2_004', label: 'Loose RAM Reseating', labelId: 'Memasang Ulang RAM Longgar', icon: '🔊', type: 'pc_repair', diff: 'medium' },
  { id: 't2_005', label: 'Replace Grinding CPU Fan', labelId: 'Ganti Kipas CPU Berisik', icon: '💨', type: 'pc_repair', diff: 'easy' },
  
  // Network
  { id: 't1_wifi_sim', label: 'Router Cabling & PC Power (T1)', labelId: 'Perkabelan Router & Daya PC (T1)', icon: '📶', type: 'network', diff: 'easy' },
  { id: 't2_008', label: 'Gaming Cafe Switch Disconnection (T2)', labelId: 'Koneksi Switch Cafe Putus (T2)', icon: '🔀', type: 'network', diff: 'medium' },
];

const TERMINAL_TOPICS = [
  { id: 'ping',      label: 'Ping & Connectivity', labelId: 'Ping & Konektivitas', desc: 'Test network with ping commands', icon: '📡' },
  { id: 'ipconfig',  label: 'IP Configuration',    labelId: 'Konfigurasi IP',      desc: 'Read ipconfig output',           icon: '🌐' },
  { id: 'processes', label: 'Process Management',  labelId: 'Manajemen Proses',    desc: 'Use tasklist and msconfig',      icon: '⚙️' },
];

const GLOSSARY_DATA = {
  pc: [
    {
      emoji: '🧠',
      title: { en: "CPU (Processor)", id: "CPU (Prosesor)" },
      desc: { en: "The brain of the computer. It executes all programs. Requires thermal paste on top and must be securely locked in the socket before booting.", id: "Otak dari komputer. Menjalankan seluruh program. Memerlukan thermal paste di atasnya dan harus terkunci rapat di soket sebelum dinyalakan." },
      look: { en: "A small, flat square metal plate (~4x4 cm) with delicate gold pads underneath and technical model text engraved on top.", id: "Keping logam persegi kecil (sekitar 4x4 cm) dengan deretan titik tembaga emas di bawahnya dan ukiran seri model di atasnya." },
      videoUrl: "https://www.youtube.com/watch?v=34dO76t02l8"
    },
    {
      emoji: '🌬️',
      title: { en: "CPU Cooler Fan", id: "Kipas Pendingin CPU" },
      desc: { en: "Pulls heat away from the processor. Must be clean from dust and have its fan connector plugged into the CPU_FAN pin on the motherboard.", id: "Menghalau panas dari prosesor. Harus bersih dari debu dan kabel konektor kipasnya tercolok ke pin CPU_FAN di motherboard." },
      look: { en: "A circular plastic fan mounted on top of a dense stack of aluminum metal fins, with a 4-pin cable extending from it.", id: "Kipas plastik bulat yang dipasang di atas bongkahan sirip-sirip logam aluminium, dilengkapi kabel konektor kecil berisi 4 pin." },
      videoUrl: "https://www.youtube.com/watch?v=34dO76t02l8"
    },
    {
      emoji: '📼',
      title: { en: "DDR4 RAM", id: "RAM DDR4" },
      desc: { en: "Short-term temporary memory desk. Must be fully pressed down until latches click. Loose or missing RAM results in a '3 Short Beeps' POST fail code.", id: "Meja memori jangka pendek. Harus ditekan kuat ke bawah hingga pengunci mengeklik. RAM longgar/hilang memicu kode POST '3 Bip Pendek'." },
      look: { en: "A long, thin rectangular green or black circuit board (~13 cm) with dark chip squares on the sides and gold pin contacts at the bottom edge.", id: "Keping sirkuit hijau atau hitam panjang dan tipis (~13 cm) dengan kotak-kotak chip hitam di badannya dan kaki-kaki pin emas di bagian bawah." },
      videoUrl: "https://www.youtube.com/watch?v=kR205P6z_Qo"
    },
    {
      emoji: '🎮',
      title: { en: "Dedicated Graphics Card (GPU)", id: "Kartu Grafis Dedicated (GPU)" },
      desc: { en: "Produces high-quality video output for the monitor. Requires a dedicated PCIe 6-Pin auxiliary power cable from the power supply.", id: "Menghasilkan keluaran video berkualitas tinggi ke monitor. Membutuhkan kabel daya tambahan PCIe 6-Pin khusus dari power supply." },
      look: { en: "A heavy, large expansion card with 1-3 cooling fans, a long gold PCIe connector strip at the bottom, and video ports (HDMI/DP) on the metal bracket.", id: "Kartu ekspansi besar dan berat dengan 1-3 kipas pendingin, pin emas panjang di bagian bawah, dan colokan HDMI/DisplayPort di pelat belakang." },
      videoUrl: "https://www.youtube.com/watch?v=mD3Z30vSntI"
    },
    {
      emoji: '💽',
      title: { en: "SATA Solid-State Drive (SSD)", id: "SATA Solid-State Drive (SSD)" },
      desc: { en: "Fast flash storage for the Operating System and boot files. Requires both a SATA Data Cable and a SATA Power Cable connection.", id: "Penyimpanan flash cepat untuk Sistem Operasi dan file boot. Membutuhkan koneksi Kabel Data SATA dan Kabel Daya SATA sekaligus." },
      look: { en: "A lightweight, flat rectangular casing (2.5-inch size) with a gold L-shaped SATA data interface and a wider L-shaped power interface next to it.", id: "Kotak ceper ringan berukuran 2.5 inci berlapis logam/plastik dengan colokan berbentuk huruf L untuk data SATA dan daya SATA." },
      videoUrl: "https://www.youtube.com/watch?v=b0V2hJ7lGoc"
    }
  ],
  network: [
    {
      emoji: '🌐',
      title: { en: "Internet Source (ISP)", id: "Sumber Internet (ISP)" },
      desc: { en: "The provider's feed entry point. Connects to the Cable Modem using a Coaxial cable (blue). Without this connected, the modem has no signal to translate.", id: "Titik masuk kabel dari provider. Terhubung ke Cable Modem menggunakan kabel Koaksial (biru). Tanpa ini terhubung, modem tidak punya sinyal untuk diterjemahkan." },
      look: { en: "A metal wall outlet with a brass threaded cylinder connector, or a fiber optical box mounted inside/outside the building.", id: "Soket dinding logam dengan ulir silinder kuningan di tengahnya, atau kotak fiber optik hitam/putih yang terpasang di dinding." },
      videoUrl: "https://www.youtube.com/watch?v=Fpqm2sTjQos"
    },
    {
      emoji: '🔌',
      title: { en: "Power Strip", id: "Colokan Listrik (Power Strip)" },
      desc: { en: "Supplies 220V electricity to device power plugs. Every network device needs a power cable (orange) connected to the outlet to turn on.", id: "Menyuplai listrik 220V ke colokan perangkat. Setiap perangkat jaringan membutuhkan kabel daya (oranye) terhubung ke outlet ini agar dapat menyala." },
      look: { en: "A standard white or black power strip with multiple circular socket inputs pluggable to the main wall outlet.", id: "Terminal colokan listrik (stop kontak cabang) berwarna putih atau hitam untuk mencabangkan colokan listrik utama." }
    },
    {
      emoji: '📟',
      title: { en: "Cable Modem", id: "Modem Kabel" },
      desc: { en: "Bridges the ISP coax signal and your local ethernet network. Connect Coax port to ISP, and Ethernet port to the Router's WAN port.", id: "Menghubungkan sinyal koaksial ISP dengan jaringan ethernet lokal Anda. Hubungkan port Coax ke ISP, dan port Ethernet ke port WAN Router." },
      look: { en: "A standing vertical plastic box with glowing LED status indicators at the front and a brass threaded Coaxial input + RJ45 Ethernet port on the back.", id: "Kotak plastik vertikal dengan lampu indikator hijau/biru di depan, serta ulir koaksial kuningan dan port ethernet RJ45 di belakang." },
      videoUrl: "https://www.youtube.com/watch?v=kYJv1_dpe6Q"
    },
    {
      emoji: '📶',
      title: { en: "WiFi Router", id: "WiFi Router" },
      desc: { en: "Creates your local network and Wi-Fi. IMPORTANT: Cable from Modem MUST go to the WAN (Internet) port. Local PCs or Printers connect to LAN ports.", id: "Membuat jaringan lokal dan memancarkan Wi-Fi. PENTING: Kabel dari Modem HARUS dicolok ke port WAN (Internet). PC atau Printer lokal dicolok ke port LAN." },
      look: { en: "A flat device with 2-4 tall antennas, featuring one distinct blue/yellow WAN/Internet port and 4 LAN ports side-by-side on the back.", id: "Alat ceper dengan 2-4 antena pemancar tegak, memiliki 1 port WAN/Internet terpisah (warna biru/kuning) dan 4 port LAN sejajar di belakang." },
      videoUrl: "https://www.youtube.com/watch?v=Fpqm2sTjQos"
    },
    {
      emoji: '🔀',
      title: { en: "Network Switch", id: "Switch Jaringan" },
      desc: { en: "Acts like an ethernet power strip. Expands a single LAN port from the router into many ports so you can connect multiple wired PCs and printers.", id: "Bertindak seperti colokan cabang ethernet. Memperbanyak port LAN dari router agar Anda dapat menghubungkan banyak PC dan printer lewat kabel." },
      look: { en: "A long, flat metal/plastic box with a dense row of identical RJ45 Ethernet ports (ranging from 5 to 48 ports) with flashing green LEDs.", id: "Kotak logam datar panjang dengan deretan lubang colokan ethernet (RJ45) yang banyak dan identik, lengkap dengan lampu kedip hijau." },
      videoUrl: "https://www.youtube.com/watch?v=S016d7WJzII"
    }
  ]
};

export default function WorkshopPage() {
  const { t, lang } = useLanguage();
  const { completeMission, addToast, tools } = useGameStore();
  const router = useRouter();

  const [mode, setMode] = useState('menu');         // 'menu' | 'pcrepair' | 'network' | 'terminal' | 'complete'
  const [activePractice, setActivePractice] = useState(null);
  const [showGlossary, setShowGlossary] = useState(false);
  const [glossaryTab, setGlossaryTab] = useState('pc'); // 'pc' | 'network'

  const startPractice = (practice) => {
    const mission = getMissionById(practice.id);
    if (!mission) return;
    setActivePractice({ ...mission, ...practice });
    
    if (practice.type === 'pc_repair') {
      setMode('pcrepair');
    } else if (practice.type === 'network') {
      setMode('network');
    } else {
      setMode('terminal');
    }
    sound.powerOn();
  };

  const handleComplete = () => {
    sound.missionComplete();
    addToast(lang === 'id' ? 'Latihan Selesai! +50 XP' : 'Practice Complete! +50 XP', 'xp', '🔧');
    setMode('complete');
  };

  const handleBack = () => {
    setMode('menu');
    setActivePractice(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      <div className="flex items-center justify-between">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">🔧 Workshop Practice</h1>
          <p className="text-xs text-white/40 mt-0.5">
            {lang === 'id' ? 'Mode latihan simulasi perbaikan PC, kabel jaringan, dan perintah terminal.' : 'Practice repairs, networking simulation, and terminal skills.'}
          </p>
        </motion.div>
        <button
          onClick={() => { sound.click(); setShowGlossary(true); }}
          className="btn-game px-4 py-2 text-xs font-bold font-mono flex items-center gap-1.5"
          style={{ '--neon-color': 'var(--neon-cyan)' }}
        >
          <span>📖</span>
          <span>{lang === 'id' ? 'Kamus Glosarium' : 'Glossary Guide'}</span>
        </button>
      </div>

      <AnimatePresence mode="wait">

        {/* MENU */}
        {mode === 'menu' && (
          <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">

            {/* Troubleshooting Guide Banner */}
            <div className="glass p-5 rounded-2xl border border-white/10 space-y-3 bg-gradient-to-r from-blue-950/10 to-indigo-950/10">
              <div className="flex items-center gap-2">
                <span className="text-xl">💡</span>
                <h2 className="font-orbitron font-black text-xs uppercase tracking-widest text-[var(--neon-cyan)]">
                  {lang === 'id' ? 'Pusat Informasi & Tips Troubleshooting' : 'Troubleshooting Info Hub & Tips'}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px] leading-relaxed">
                <div className="bg-white/[0.02] border border-white/5 p-3.5 rounded-xl">
                  <p className="font-bold text-white mb-1.5">🖥️ PC Repair Simulator</p>
                  <p className="text-white/60">
                    {lang === 'id'
                      ? 'Selalu periksa status kabel daya dan pasang komponen dengan benar. Bunyi bip berulang menandakan kesalahan RAM, sedangkan mati mendadak setelah boot biasanya disebabkan panas berlebih (CPU overheating).'
                      : 'Always inspect power cables first. Diagnostic beeps point to memory issues, while sudden thermal shutdowns are caused by dusty coolers or dried paste.'}
                  </p>
                </div>
                <div className="bg-white/[0.02] border border-white/5 p-3.5 rounded-xl">
                  <p className="font-bold text-white mb-1.5">📶 Jaringan (Network Sim)</p>
                  <p className="text-white/60">
                    {lang === 'id'
                      ? 'Kabel ISP masuk ke port Coax Modem. Kabel Ethernet dari Modem masuk ke port WAN (Internet) Router. Port LAN Router menyalurkan internet ke Switch atau PC.'
                      : 'The ISP Coax cable must connect to the Modem. The Modem Ethernet must connect to the Router\'s WAN port. LAN ports distribute signal to PC/switches.'}
                  </p>
                </div>
                <div className="bg-white/[0.02] border border-white/5 p-3.5 rounded-xl">
                  <p className="font-bold text-white mb-1.5">💻 Terminal CLI</p>
                  <p className="text-white/60">
                    {lang === 'id'
                      ? 'Gunakan `ipconfig` untuk melihat IP, `ping [IP/Domain]` untuk tes koneksi, `tracert [Domain]` untuk melacak rute paket, dan `tasklist` untuk melihat aplikasi berjalan.'
                      : 'Use `ipconfig` to view IP settings, `ping [IP/Domain]` to test connectivity, `tracert` to trace routing hops, and `tasklist` to view running processes.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Grid Layout for sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* PC Repair Practice */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest flex items-center gap-1.5">
                  <span>🖥️</span> <span>{lang === 'id' ? 'Latihan Perbaikan PC (Sim)' : 'PC Repair Practice (Sim)'}</span>
                </h3>
                <div className="space-y-2.5">
                  {PRACTICE_MISSIONS.filter(p => p.type === 'pc_repair').map(p => (
                    <motion.button
                      key={p.id}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { sound.click(); startPractice(p); }}
                      className="w-full text-left rounded-xl p-3.5 border border-white/8 hover:border-[rgba(255,107,0,0.4)] bg-white/[0.02] hover:bg-[rgba(255,107,0,0.04)] transition-all group flex items-center gap-3.5 animate-fade-in"
                    >
                      <div className="w-10 h-10 rounded-lg border border-[rgba(255,107,0,0.3)] bg-[rgba(255,107,0,0.08)] flex items-center justify-center text-xl">{p.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-xs truncate group-hover:text-[var(--neon-orange)] transition-colors">
                          {lang === 'id' ? p.labelId : p.label}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={p.diff} size="xs">{p.diff}</Badge>
                          <span className="text-[10px] text-white/30 font-mono">Simulator</span>
                        </div>
                      </div>
                      <span className="text-white/20 group-hover:text-[var(--neon-orange)] transition-colors text-sm">→</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Network Practice */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest flex items-center gap-1.5">
                  <span>📶</span> <span>{lang === 'id' ? 'Latihan Jaringan (Sim)' : 'Network Setup Practice (Sim)'}</span>
                </h3>
                <div className="space-y-2.5">
                  {PRACTICE_MISSIONS.filter(p => p.type === 'network').map(p => (
                    <motion.button
                      key={p.id}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { sound.click(); startPractice(p); }}
                      className="w-full text-left rounded-xl p-3.5 border border-white/8 hover:border-[rgba(57,255,20,0.3)] bg-white/[0.02] hover:bg-[rgba(57,255,20,0.03)] transition-all group flex items-center gap-3.5"
                    >
                      <div className="w-10 h-10 rounded-lg border border-[rgba(57,255,20,0.2)] bg-[rgba(57,255,20,0.05)] flex items-center justify-center text-xl">{p.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-xs truncate group-hover:text-[var(--neon-green)] transition-colors">
                          {lang === 'id' ? p.labelId : p.label}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={p.diff} size="xs">{p.diff}</Badge>
                          <span className="text-[10px] text-white/30 font-mono">Simulator</span>
                        </div>
                      </div>
                      <span className="text-white/20 group-hover:text-[var(--neon-green)] transition-colors text-sm">→</span>
                    </motion.button>
                  ))}
                </div>
              </div>

            </div>

            {/* Terminal Practice */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest flex items-center gap-1.5">
                <span>💻</span> <span>{lang === 'id' ? 'Latihan Perintah Terminal' : 'Command Line Practice'}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {TERMINAL_TOPICS.map(topic => (
                  <motion.button
                    key={topic.id}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { sound.click(); setMode('terminal'); setActivePractice(topic); }}
                    className="w-full text-left rounded-xl p-4 border border-white/8 hover:border-[rgba(167,139,250,0.4)] bg-white/[0.02] hover:bg-[rgba(167,139,250,0.04)] transition-all group flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg border border-[rgba(167,139,250,0.2)] bg-[rgba(167,139,250,0.05)] flex items-center justify-center text-lg">{topic.icon}</div>
                      <p className="font-semibold text-white text-xs group-hover:text-[var(--neon-purple)] transition-colors">
                        {lang === 'id' ? topic.labelId : topic.label}
                      </p>
                    </div>
                    <p className="text-[10.5px] text-white/40 leading-relaxed font-sans">{topic.desc}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quick learn tip */}
            <div className="rounded-2xl p-4 border border-[rgba(191,0,255,0.2)] bg-[rgba(191,0,255,0.04)]">
              <p className="text-xs text-[var(--neon-purple)] font-bold mb-1">🎮 {lang === 'id' ? 'Mode Workshop Latihan' : 'Practice Workshop Mode'}</p>
              <p className="text-xs text-white/50 leading-relaxed">
                {lang === 'id'
                  ? 'Gunakan mode ini untuk mengulang materi perbaikan perangkat keras dan penataan kabel jaringan tanpa tekanan batas waktu atau skor dari mode petualangan.'
                  : 'Practice any scenario freely to build diagnostic confidence. Reset as many times as you need to perfect your hardware assembly or routing topology.'}
              </p>
            </div>
          </motion.div>
        )}

        {/* PC REPAIR MODE */}
        {mode === 'pcrepair' && activePractice && (
          <motion.div key="pcrepair" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="flex items-center gap-3">
              <button onClick={handleBack} className="text-white/40 hover:text-white text-xs transition-colors flex items-center gap-1">
                <span>←</span> <span>{lang === 'id' ? 'Kembali' : 'Back'}</span>
              </button>
              <h2 className="font-bold text-white text-sm">{lang === 'id' ? activePractice.labelId : activePractice.label}</h2>
              <Badge variant="orange" size="xs">Practice Sim</Badge>
            </div>
            <PCRepairSimPuzzle mission={activePractice} onComplete={handleComplete} onFail={handleBack} />
          </motion.div>
        )}

        {/* NETWORK MODE */}
        {mode === 'network' && activePractice && (
          <motion.div key="network" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4 font-sans">
            <div className="flex items-center gap-3">
              <button onClick={handleBack} className="text-white/40 hover:text-white text-xs transition-colors flex items-center gap-1">
                <span>←</span> <span>{lang === 'id' ? 'Kembali' : 'Back'}</span>
              </button>
              <h2 className="font-bold text-white text-sm">{lang === 'id' ? activePractice.labelId : activePractice.label}</h2>
              <Badge variant="green" size="xs">Practice Sim</Badge>
            </div>
            <NetworkSimPuzzle mission={activePractice} onComplete={handleComplete} onFail={handleBack} />
          </motion.div>
        )}

        {/* TERMINAL FREE MODE */}
        {mode === 'terminal' && (
          <motion.div key="terminal" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <button onClick={handleBack} className="text-white/40 hover:text-white text-xs transition-colors flex items-center gap-1">
                <span>←</span> <span>{lang === 'id' ? 'Kembali' : 'Back'}</span>
              </button>
              <h2 className="font-bold text-white text-sm">
                {activePractice ? (lang === 'id' ? activePractice.labelId : activePractice.label) : 'Terminal'}
              </h2>
              <Badge variant="purple" size="xs">Free CLI Mode</Badge>
            </div>
            <div className="rounded-xl p-3 border border-[rgba(167,139,250,0.15)] bg-[rgba(167,139,250,0.03)] text-white/50">
              💡 Try: <code className="text-[var(--neon-purple)]">ping 8.8.8.8</code> · <code className="text-[var(--neon-purple)]">ipconfig</code> · <code className="text-[var(--neon-purple)]">tracert google.com</code> · <code className="text-[var(--neon-purple)]">tasklist</code> · <code className="text-[var(--neon-purple)]">help</code>
            </div>
            <Terminal freeMode={true} onComplete={() => addToast('Terminal session done! +30 XP', 'xp', '💻')} />
          </motion.div>
        )}

        {/* COMPLETE */}
        {mode === 'complete' && (
          <motion.div key="complete" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
            className="text-center py-12 space-y-5">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: 2 }} className="text-6xl">🏆</motion.div>
            <h3 className="text-2xl font-bold text-[var(--neon-green)]">Practice Complete!</h3>
            <p className="text-white/50 text-sm">You've successfully completed this workshop session.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={handleBack} className="btn-game btn-game-green py-2 px-6 text-xs font-bold font-mono">Practice Again</button>
              <button onClick={() => setMode('menu')} className="px-6 py-2 text-xs text-white/40 hover:text-white border border-white/10 rounded-xl transition-colors font-mono font-bold">Back to Menu</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COMBINED GLOSSARY MODAL */}
      <AnimatePresence>
        {showGlossary && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass border border-[var(--neon-cyan)] max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[85vh]"
              style={{ background: '#070b15' }}
            >
              {/* Header */}
              <div className="border-b border-white/10 p-3 sm:p-4 flex items-center justify-between bg-[rgba(0,245,255,0.03)]">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📖</span>
                  <h3 className="font-orbitron font-black text-xs uppercase tracking-widest text-[var(--neon-cyan)]">
                    {lang === 'id' ? 'Kamus Glosarium Jaringan & PC' : 'IT Network & PC Glossary'}
                  </h3>
                </div>
                <button
                  onClick={() => { sound.click(); setShowGlossary(false); }}
                  className="text-white/40 hover:text-white transition-colors font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-white/5 bg-black/20 p-2 gap-2">
                <button
                  onClick={() => { sound.click(); setGlossaryTab('pc'); }}
                  className={`flex-1 py-2 text-center text-xs font-mono font-bold rounded-lg transition-all ${
                    glossaryTab === 'pc'
                      ? 'bg-[var(--neon-cyan)]/10 border border-[var(--neon-cyan)] text-[var(--neon-cyan)]'
                      : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  🖥️ {lang === 'id' ? 'Komponen Perangkat PC' : 'PC Hardware'}
                </button>
                <button
                  onClick={() => { sound.click(); setGlossaryTab('network'); }}
                  className={`flex-1 py-2 text-center text-xs font-mono font-bold rounded-lg transition-all ${
                    glossaryTab === 'network'
                      ? 'bg-[var(--neon-cyan)]/10 border border-[var(--neon-cyan)] text-[var(--neon-cyan)]'
                      : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  📶 {lang === 'id' ? 'Perangkat Jaringan' : 'Networking'}
                </button>
              </div>

              {/* List */}
              <div className="p-3 sm:p-6 space-y-3 sm:space-y-4 overflow-y-auto flex-1">
                <div className="space-y-3 sm:space-y-4">
                  {GLOSSARY_DATA[glossaryTab].map((item, idx) => (
                    <div key={idx} className="bg-white/[0.02] border border-white/5 hover:border-white/10 p-3 sm:p-4 rounded-xl transition-all">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl bg-black/45 w-10 h-10 rounded-lg flex items-center justify-center border border-white/5">
                          {item.emoji}
                        </span>
                        <div>
                          <h4 className="font-bold text-white text-sm">{item.title[lang] || item.title['en']}</h4>
                        </div>
                      </div>
                      <p className="text-white/70 text-xs leading-relaxed font-sans mb-3">
                        {item.desc[lang] || item.desc['en']}
                      </p>

                      {item.look && (
                        <div className="text-[11px] text-white/50 bg-black/25 p-2 rounded-lg border border-white/5 font-sans leading-relaxed">
                          <strong className="text-white">{lang === 'id' ? '🔍 Bentuk Asli:' : '🔍 Real-World Look:'} </strong>
                          {item.look[lang] || item.look['en']}
                        </div>
                      )}

                      {item.videoUrl && (
                        <div className="mt-2.5">
                          <a
                            href={item.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[11px] text-[var(--neon-cyan)] hover:underline font-mono"
                          >
                            <span>🎥</span>
                            <span className="font-bold">{lang === 'id' ? 'Tonton Video Tutorial Youtube' : 'Watch Youtube Video Tutorial'}</span>
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Close */}
              <div className="border-t border-white/10 p-3 sm:p-4 bg-black/20 text-right">
                <button
                  onClick={() => { sound.click(); setShowGlossary(false); }}
                  className="btn-game px-5 py-2 text-xs font-bold font-mono"
                  style={{ '--neon-color': 'var(--neon-cyan)' }}
                >
                  {lang === 'id' ? 'Tutup Glosarium' : 'Close Glossary'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
