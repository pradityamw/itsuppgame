'use client';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { useLanguage } from '@/context/LanguageContext';
import { sound } from '@/lib/audio';
import { Badge } from '@/components/ui';

const CATEGORY_ICONS = {
  hardware:       '🔧',
  networking:     '🌐',
  network:        '🌐',
  security:       '🛡️',
  os:             '💻',
  sysadmin:       '🖥️',
  helpdesk:       '🎧',
  troubleshooting: '🔍',
};

const PUZZLE_ICONS = {
  pc_repair: '🖥️',
  network:   '📶',
  terminal:  '⌨️',
  quiz:      '📝',
  sequence:  '📋',
};

const DIFF_COLORS = {
  easy:      '#39ff14',
  medium:    '#00f5ff',
  hard:      '#ff6b00',
  epic:      '#bf00ff',
  legendary: '#ffd700',
};

export default function MissionCard({ mission, lang, onClick, compact = false }) {
  const { completedMissions, level } = useGameStore();
  const { t } = useLanguage();

  const done = completedMissions.includes(mission.id);
  const locked = mission.requiredLevel > level || mission.locked;
  const available = !locked; // completed missions are still clickable (replay)

  // Get title from locale or direct object
  const title = mission.localeKey
    ? t(`${mission.localeKey}.title`)
    : (lang === 'id' ? mission.title?.id : mission.title?.en) || mission.id;

  // Get NPC preview — try npcDialogue first, then locale
  const npcDialoguePreview = mission.npcDialogue?.[0];
  const npcMsg = npcDialoguePreview
    ? (lang === 'id' ? npcDialoguePreview.msgId : npcDialoguePreview.msgEn)
    : (mission.localeKey ? t(`${mission.localeKey}.npc`) : '');

  const diffVariant = mission.difficulty === 'hard' ? 'hard' : mission.difficulty === 'medium' ? 'medium' : 'easy';

  const statusColor = done ? '#39ff14' : locked ? 'rgba(255,255,255,0.15)' : '#00f5ff';
  const statusBg = done ? 'rgba(57,255,20,0.05)' : locked ? 'rgba(0,0,0,0.2)' : 'rgba(0,245,255,0.04)';

  if (compact) {
    return (
      <motion.div
        whileHover={available ? { x: 4 } : {}}
        onClick={() => { if (available) { sound.click(); onClick?.(mission); } }}
        className={`flex items-center gap-3 rounded-xl px-4 py-3 border transition-all ${
          done ? 'border-[rgba(57,255,20,0.2)]' :
          locked ? 'border-white/5 opacity-50' :
          'border-white/8 hover:border-[rgba(0,245,255,0.3)] cursor-pointer'
        }`}
        style={{ background: statusBg }}
      >
        <span className="text-xl">{done ? '✅' : locked ? '🔒' : PUZZLE_ICONS[mission.puzzleType] || '🎮'}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">{title}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Badge variant={diffVariant} size="xs">{mission.difficulty}</Badge>
            <span className="text-xs text-white/30">{CATEGORY_ICONS[mission.category]} {mission.category}</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xs font-bold text-[var(--neon-yellow)]">+{mission.xpReward} XP</p>
          {locked && <p className="text-[10px] text-white/30">Lv {mission.requiredLevel}</p>}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={!locked ? { y: -3, scale: 1.01 } : {}}
      onClick={() => { if (!locked) { sound.click(); onClick?.(mission); } }}
      className={`rounded-2xl border overflow-hidden transition-all ${
        done ? 'border-[rgba(57,255,20,0.4)] cursor-pointer hover:border-[rgba(57,255,20,0.7)] hover:shadow-[0_0_20px_rgba(57,255,20,0.1)]' :
        locked ? 'border-white/5 opacity-60' :
        'border-white/8 hover:border-[rgba(0,245,255,0.4)] cursor-pointer hover:shadow-[0_0_20px_rgba(0,245,255,0.1)]'
      }`}
      style={{ background: `linear-gradient(135deg, ${statusBg}, #0d1117)` }}
    >
      {/* Top accent bar */}
      <div className="h-1" style={{ background: statusColor, opacity: done ? 0.8 : locked ? 0.2 : 0.5 }} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border border-white/10"
            style={{ background: done ? 'rgba(57,255,20,0.1)' : 'rgba(255,255,255,0.04)' }}>
            {done ? '✅' : locked ? '🔒' : (CATEGORY_ICONS[mission.category] || '🎮')}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-base leading-tight mb-1">{title}</h3>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={diffVariant} size="xs">{mission.difficulty}</Badge>
              <Badge variant="default" size="xs">{PUZZLE_ICONS[mission.puzzleType]} {mission.puzzleType?.replace('_', ' ')}</Badge>
              {done && <Badge variant="green" size="xs">✓ Complete</Badge>}
              {locked && <Badge variant="default" size="xs">🔒 Level {mission.requiredLevel}</Badge>}
            </div>
          </div>
        </div>

        {/* Description or NPC preview */}
        {!locked && (npcMsg || mission.description) && (
          <div className="rounded-lg px-3 py-2.5 border border-white/5 bg-black/20 mb-3">
            {npcMsg ? (
              <p className="text-xs text-white/50 italic leading-relaxed">
                <span className="not-italic">{mission.npcAvatar} </span>
                &ldquo;{npcMsg.length > 80 ? npcMsg.slice(0, 80) + '...' : npcMsg}&rdquo;
              </p>
            ) : mission.description ? (
              <p className="text-xs text-white/55 leading-relaxed">
                {typeof mission.description === 'string'
                  ? mission.description
                  : (lang === 'id' ? mission.description?.id : mission.description?.en) || ''}
              </p>
            ) : null}
          </div>
        )}

        {/* Lesson preview for quiz missions */}
        {mission.puzzleType === 'quiz' && mission.lesson && !done && !locked && (
          <div className="rounded-lg px-3 py-2 border border-[rgba(255,230,0,0.1)] bg-[rgba(255,230,0,0.03)] mb-3">
            <p className="text-[10px] text-[var(--neon-yellow)] font-bold uppercase tracking-wider">💡 You will learn:</p>
            <p className="text-[11px] text-white/40 mt-0.5 line-clamp-2">{mission.lesson}</p>
          </div>
        )}

        {/* Rewards row */}
        <div className="flex items-center gap-3 pt-2 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">⭐</span>
            <span className="text-sm font-bold text-[var(--neon-yellow)]">
              +{done ? Math.round(mission.xpReward * 0.5) : mission.xpReward}
              {done && <span className="text-[10px] text-white/30 ml-1">(replay)</span>}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm">🪙</span>
            <span className="text-sm font-bold text-[var(--coin-color)]">
              +{done ? Math.round(mission.coinReward * 0.5) : mission.coinReward}
            </span>
          </div>
          {mission.toolUnlock && (
            <div className="flex items-center gap-1.5">
              <span className="text-sm">🔧</span>
              <span className="text-xs text-white/50">{mission.toolUnlock}</span>
            </div>
          )}
          <div className="ml-auto">
            {done ? (
              <span className="text-xs text-[var(--neon-green)] font-semibold">🔄 Play Again</span>
            ) : !locked ? (
              <span className="text-xs text-[var(--neon-cyan)] font-semibold">Start →</span>
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
