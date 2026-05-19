'use client';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/lib/audio';
import { useLanguage } from '@/context/LanguageContext';

const NODE_ICONS = {
  internet: '🌐',
  router:   '📶',
  switch:   '🔀',
  pc:       '🖥️',
  printer:  '🖨️',
  server:   '🖧',
  modem:    '📡',
};

const NODE_COLORS = {
  internet: '#00f5ff',
  router:   '#bf00ff',
  switch:   '#ffe600',
  pc:       '#39ff14',
  printer:  '#ff6b00',
  server:   '#ff2d78',
  modem:    '#00f5ff',
};

export default function NetworkPuzzle({ mission, onComplete, onFail }) {
  const { t } = useLanguage();
  const { puzzleData } = mission;

  const [connections, setConnections] = useState(
    puzzleData.connections.map(c => ({ ...c }))
  );
  const [pingResult, setPingResult] = useState(null);
  const [pinging, setPinging] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [selectedCable, setSelectedCable] = useState(null);
  const [step, setStep] = useState(0);

  const brokenConns = connections.filter(c => c.broken);
  const allFixed = brokenConns.length === 0;

  const handleReconnect = useCallback((connId) => {
    const conn = connections.find(c => c.id === connId);
    if (!conn || !conn.broken) return;

    // If cable type selection needed
    if (puzzleData.cableTypes && !selectedCable) return;

    sound.cablePlug();
    setConnections(prev => prev.map(c =>
      c.id === connId ? { ...c, broken: false } : c
    ));
    setStep(s => s + 1);
    setPingResult(null);

    if (selectedCable) setSelectedCable(null);
  }, [connections, puzzleData, selectedCable]);

  const handlePingTest = async () => {
    if (!allFixed) {
      setPingResult({ success: false, msg: t('pingFail') + ' — check your connections!' });
      sound.wrong();
      return;
    }
    setPinging(true);
    sound.routerBeep();
    await new Promise(r => setTimeout(r, 1800));
    setPinging(false);
    setPingResult({ success: true, msg: t('pingSuccess') });
    sound.correct();
    setFixed(true);
    setTimeout(() => onComplete?.(), 2500);
  };

  // Build a simple SVG topology
  const nodeMap = {};
  puzzleData.nodes.forEach(n => { nodeMap[n.id] = n; });

  const SVG_W = 400, SVG_H = 300;

  const nodePos = (n) => ({
    x: (n.x / 100) * SVG_W,
    y: (n.y / 100) * SVG_H,
  });

  return (
    <div className="space-y-4">

      {/* Instructions */}
      <div className="glass rounded-lg px-4 py-2.5 border border-white/5 text-sm text-white/70">
        <span className="text-[var(--neon-cyan)] font-bold">🌐 {t('reconnectCable')}</span>
      </div>

      {/* Cable type picker if needed */}
      {puzzleData.cableTypes && !allFixed && (
        <div>
          <p className="text-xs text-white/40 mb-2">Select the correct cable type first:</p>
          <div className="flex flex-wrap gap-2">
            {puzzleData.cableTypes.map(cable => (
              <button
                key={cable}
                onClick={() => { sound.click(); setSelectedCable(cable); }}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                  selectedCable === cable
                    ? 'border-[var(--neon-cyan)] bg-[rgba(0,245,255,0.1)] text-[var(--neon-cyan)]'
                    : 'border-white/15 text-white/50 hover:border-white/30'
                } ${cable === puzzleData.correctCable ? '' : ''}`}
              >
                🔌 {cable}
              </button>
            ))}
          </div>
          {selectedCable && selectedCable !== puzzleData.correctCable && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-[var(--neon-pink)] mt-1"
            >
              ⚠️ Wrong cable type! Check the printer manual.
            </motion.p>
          )}
          {selectedCable === puzzleData.correctCable && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-[var(--neon-green)] mt-1"
            >
              ✓ Correct! Now click the broken connection to plug it in.
            </motion.p>
          )}
        </div>
      )}

      {/* Network Topology SVG */}
      <div className="rounded-xl overflow-hidden border border-white/10" style={{ background: '#070b14' }}>
        <svg width="100%" viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full" style={{ maxHeight: 280 }}>
          {/* Grid lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`h${i}`} x1={0} y1={(i + 1) * SVG_H / 9} x2={SVG_W} y2={(i + 1) * SVG_H / 9}
              stroke="rgba(0,245,255,0.04)" strokeWidth="1" />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`v${i}`} x1={(i + 1) * SVG_W / 11} y1={0} x2={(i + 1) * SVG_W / 11} y2={SVG_H}
              stroke="rgba(0,245,255,0.04)" strokeWidth="1" />
          ))}

          {/* Connections */}
          {connections.map(conn => {
            const from = nodeMap[conn.from];
            const to = nodeMap[conn.to];
            if (!from || !to) return null;
            const fp = nodePos(from), tp = nodePos(to);
            const broken = conn.broken;

            return (
              <g key={conn.id} onClick={() => broken && handleReconnect(conn.id)} style={{ cursor: broken ? 'pointer' : 'default' }}>
                {/* Connection line */}
                <motion.line
                  x1={fp.x} y1={fp.y} x2={tp.x} y2={tp.y}
                  stroke={broken ? '#ff2d78' : '#39ff14'}
                  strokeWidth={broken ? 2.5 : 2}
                  strokeDasharray={broken ? '6,4' : '0'}
                  animate={broken ? { opacity: [1, 0.4, 1] } : { opacity: 1 }}
                  transition={broken ? { duration: 1, repeat: Infinity } : {}}
                />
                {/* Cable label */}
                <text
                  x={(fp.x + tp.x) / 2}
                  y={(fp.y + tp.y) / 2 - 6}
                  textAnchor="middle"
                  fill={broken ? '#ff2d78' : 'rgba(255,255,255,0.3)'}
                  fontSize="8"
                  fontFamily="monospace"
                >
                  {conn.label}
                </text>
                {/* Fix button indicator on broken connection */}
                {broken && (
                  <>
                    <circle
                      cx={(fp.x + tp.x) / 2}
                      cy={(fp.y + tp.y) / 2}
                      r={10}
                      fill="rgba(255,45,120,0.2)"
                      stroke="#ff2d78"
                      strokeWidth={1}
                    />
                    <text x={(fp.x + tp.x) / 2} y={(fp.y + tp.y) / 2 + 4} textAnchor="middle" fill="#ff2d78" fontSize="10">⚡</text>
                  </>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {puzzleData.nodes.map(node => {
            const pos = nodePos(node);
            const color = NODE_COLORS[node.type] || '#ffffff';
            return (
              <g key={node.id}>
                <circle cx={pos.x} cy={pos.y} r={22} fill={`${color}18`} stroke={color} strokeWidth={1.5} />
                <text x={pos.x} y={pos.y + 5} textAnchor="middle" fontSize="16">{NODE_ICONS[node.type] || '📦'}</text>
                <text x={pos.x} y={pos.y + 34} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="monospace">
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Status legend */}
      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-0.5 bg-[var(--neon-green)] rounded" />
          <span className="text-white/40">Connected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-0.5 bg-[var(--neon-pink)] rounded border-dashed" style={{ borderTop: '2px dashed #ff2d78', background: 'transparent' }} />
          <span className="text-white/40">Broken — click to fix</span>
        </div>
        <div className="ml-auto">
          {brokenConns.length > 0
            ? <span className="text-[var(--neon-pink)] font-semibold">⚠️ {brokenConns.length} issue(s) remaining</span>
            : <span className="text-[var(--neon-green)] font-semibold">✓ All connected!</span>
          }
        </div>
      </div>

      {/* Ping Test */}
      <button
        onClick={handlePingTest}
        disabled={pinging || fixed}
        className={`w-full btn-game py-3 ${allFixed ? 'btn-game-green' : ''}`}
      >
        {pinging ? (
          <span className="flex items-center gap-2 justify-center">
            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>⏳</motion.span>
            Sending ping...
          </span>
        ) : fixed ? '✅ Connection Verified!' : `📡 ${t('pingTest')}`}
      </button>

      {/* Ping result */}
      <AnimatePresence>
        {pingResult && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`rounded-lg px-4 py-3 border text-sm font-semibold ${
              pingResult.success
                ? 'border-[var(--neon-green)] bg-[rgba(57,255,20,0.08)] text-[var(--neon-green)]'
                : 'border-[var(--neon-pink)] bg-[rgba(255,45,120,0.08)] text-[var(--neon-pink)]'
            }`}
          >
            {pingResult.success ? '✅' : '❌'} {pingResult.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
