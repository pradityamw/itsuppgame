'use client';
import { useState, useMemo } from 'react';
import { useGame } from '@/context/GameContext';
import { KB_ARTICLES, KB_CATEGORIES, getUnlockedArticles, searchArticles } from '@/lib/knowledgeBase';

// ── Responsive breakpoints (CSS-in-JS) ─────────────────────────
const CSS = `
  *,*::before,*::after{box-sizing:border-box;}
  .kb-shell{
    min-height:100vh;
    background:linear-gradient(135deg,#070b14 0%,#0d1b35 50%,#070b14 100%);
    color:#e2e8f0;
    font-family:'Inter',sans-serif;
  }
  /* ── Topbar ── */
  .kb-topbar{
    max-width:1400px;margin:0 auto;
    padding:80px 20px 0;
  }
  .kb-hero{
    display:flex;flex-direction:column;gap:20px;
    padding-bottom:20px;
    border-bottom:1px solid rgba(255,255,255,0.06);
    margin-bottom:20px;
  }
  .kb-hero-left{flex:1;}
  .kb-hero-title{
    font-size:24px;font-weight:800;margin:0 0 4px;
    background:linear-gradient(135deg,#60a5fa,#a78bfa);
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  }
  .kb-hero-sub{color:#64748b;font-size:13px;margin:0 0 10px;}
  .kb-progress-track{background:#1e2d4a;border-radius:6px;height:5px;overflow:hidden;}
  .kb-progress-fill{height:100%;background:linear-gradient(90deg,#3b82f6,#8b5cf6);border-radius:6px;transition:width .6s;}
  .kb-progress-label{font-size:11px;color:#475569;margin-top:4px;}
  .kb-stat-row{display:flex;gap:10px;}
  .kb-stat{
    flex:1;background:#111827;border:1px solid #1e2d4a;border-radius:10px;
    padding:12px 10px;text-align:center;
  }
  .kb-stat-val{font-size:22px;font-weight:800;color:#60a5fa;line-height:1;}
  .kb-stat-lbl{font-size:10px;color:#475569;margin-top:3px;}
  /* search */
  .kb-search-wrap{padding:0 20px 16px;max-width:1400px;margin:0 auto;}
  .kb-search{
    width:100%;padding:11px 16px;
    background:#1a2540;border:1px solid #2d4a7a;border-radius:10px;
    color:#e2e8f0;font-size:14px;outline:none;transition:border-color .2s;
  }
  .kb-search:focus{border-color:#3b82f6;}
  .kb-search::placeholder{color:#475569;}
  /* chip strip */
  .kb-chips{
    display:flex;gap:7px;overflow-x:auto;padding:0 20px 14px;
    max-width:1400px;margin:0 auto;scrollbar-width:none;
  }
  .kb-chips::-webkit-scrollbar{display:none;}
  .kb-chip{
    padding:5px 13px;border-radius:20px;font-size:12px;
    cursor:pointer;border:none;white-space:nowrap;transition:all .18s;flex-shrink:0;
  }
  .kb-chip.active{background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;font-weight:700;}
  .kb-chip:not(.active){background:#1e2d4a;color:#94a3b8;}
  /* ── Body grid ── */
  .kb-body{
    max-width:1400px;margin:0 auto;padding:0 20px 100px;
    display:grid;grid-template-columns:1fr;gap:12px;
  }
  /* ── Article card ── */
  .kb-card{
    display:flex;align-items:flex-start;gap:12px;
    padding:13px 14px;background:#14213d;
    border:1px solid #1e3a5f;border-radius:12px;
    cursor:pointer;text-align:left;color:#e2e8f0;
    width:100%;transition:all .18s;
  }
  .kb-card:hover{border-color:#3b82f6;background:#1a2d50;}
  .kb-card.selected{border-color:#60a5fa;background:linear-gradient(135deg,#1a3a60,#201a50);}
  .kb-card-emoji{font-size:26px;flex-shrink:0;margin-top:2px;}
  .kb-card-title{font-weight:700;font-size:13.5px;margin-bottom:3px;}
  .kb-card-sym{color:#64748b;font-size:11.5px;margin-bottom:5px;line-height:1.4;}
  .kb-card-tags{display:flex;gap:4px;flex-wrap:wrap;}
  .kb-tag{background:#0f172a;color:#60a5fa;font-size:10px;padding:1px 7px;border-radius:9px;border:1px solid #1e3a5f;}
  .kb-card-tier{font-size:10px;color:#475569;flex-shrink:0;margin-left:auto;padding-top:2px;}
  /* locked */
  .kb-locked{
    display:flex;align-items:center;gap:12px;
    padding:12px 14px;background:#0d1524;
    border:1px solid #1a2540;border-radius:12px;opacity:.45;
  }
  /* empty */
  .kb-empty{text-align:center;padding:40px 20px;color:#64748b;}
  /* ── Detail panel ── */
  .kb-detail{
    background:#14213d;border:1px solid #1e3a5f;border-radius:16px;
    padding:22px;display:none;  /* shown via JS on mobile, always on desktop */
  }
  .kb-detail-emoji{font-size:40px;margin-bottom:8px;}
  .kb-detail-title{font-size:17px;font-weight:800;color:#e2e8f0;margin:0 0 6px;}
  .kb-detail-badge{
    display:inline-block;background:#0f172a;color:#60a5fa;
    font-size:10px;padding:2px 9px;border-radius:9px;border:1px solid #1e3a5f;
  }
  .kb-section{margin-top:15px;}
  .kb-section-lbl{color:#94a3b8;font-size:10px;font-weight:700;margin-bottom:5px;text-transform:uppercase;letter-spacing:.8px;}
  .kb-section-txt{color:#cbd5e1;font-size:12.5px;line-height:1.75;margin:0;}
  .kb-cmd{
    background:#070b14;border:1px solid #1e2d4a;border-radius:7px;
    padding:7px 11px;font-family:monospace;font-size:11.5px;color:#34d399;
    margin-bottom:5px;word-break:break-all;
  }
  .kb-close{background:none;border:none;color:#64748b;cursor:pointer;font-size:18px;float:right;transition:color .2s;}
  .kb-close:hover{color:#e2e8f0;}
  /* ── Mobile bottom sheet ── */
  .kb-overlay{
    position:fixed;inset:0;background:rgba(7,11,20,.88);z-index:200;
    backdrop-filter:blur(6px);display:flex;align-items:flex-end;padding:12px;
  }
  .kb-sheet{
    background:#14213d;border:1px solid #1e3a5f;border-radius:20px 20px 14px 14px;
    padding:20px;width:100%;max-height:82vh;overflow-y:auto;
  }

  /* ═══════════════ TABLET ≥ 768px ═══════════════ */
  @media(min-width:768px){
    .kb-topbar{padding:80px 28px 0;}
    .kb-hero{flex-direction:row;align-items:flex-start;}
    .kb-hero-title{font-size:28px;}
    .kb-stat-row{gap:12px;}
    .kb-search-wrap{padding:0 28px 18px;}
    .kb-chips{padding:0 28px 16px;}
    .kb-body{padding:0 28px 100px;grid-template-columns:1fr 340px;align-items:start;gap:16px;}
    .kb-detail{display:block;position:sticky;top:80px;max-height:calc(100vh - 100px);overflow-y:auto;}
    .kb-overlay{display:none!important;}
  }

  /* ═══════════════ DESKTOP ≥ 1080px ═════════════ */
  @media(min-width:1080px){
    .kb-topbar{padding:80px 36px 0;}
    .kb-hero-title{font-size:32px;}
    .kb-search-wrap{padding:0 36px 18px;}
    .kb-chips{display:none;}
    .kb-body{
      padding:0 36px 80px;
      grid-template-columns:200px 1fr 400px;
      gap:20px;align-items:start;
    }
    .kb-sidebar{display:flex!important;flex-direction:column;gap:2px;}
    .kb-detail{position:sticky;top:82px;max-height:calc(100vh - 104px);}
  }

  /* ═══════════════ LARGE ≥ 1320px ═══════════════ */
  @media(min-width:1320px){
    .kb-body{grid-template-columns:220px 1fr 440px;gap:24px;}
    .kb-topbar,.kb-search-wrap,.kb-chips{padding-left:44px;padding-right:44px;}
    .kb-body{padding:0 44px 80px;}
  }

  /* Sidebar */
  .kb-sidebar{
    display:none;  /* shown only on desktop via media query */
    background:#14213d;border:1px solid #1e3a5f;border-radius:14px;
    padding:14px 10px;position:sticky;top:82px;
    max-height:calc(100vh - 104px);overflow-y:auto;
  }
  .kb-sidebar-lbl{font-size:9px;color:#475569;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;padding:0 6px;}
  .kb-cat-btn{
    display:flex;align-items:center;gap:8px;width:100%;
    padding:8px 10px;border-radius:8px;border:none;cursor:pointer;
    font-size:12.5px;font-weight:500;text-align:left;transition:all .16s;
    background:transparent;color:#94a3b8;
  }
  .kb-cat-btn:hover{background:#1e2d4a;color:#e2e8f0;}
  .kb-cat-btn.active{
    background:linear-gradient(135deg,rgba(59,130,246,.18),rgba(139,92,246,.14));
    color:#60a5fa;font-weight:700;border:1px solid rgba(59,130,246,.25);
  }
  .kb-cat-count{margin-left:auto;font-size:10px;background:#0f172a;padding:1px 7px;border-radius:9px;color:#475569;}
  .kb-sidebar-div{border-top:1px solid #1e2d4a;margin:12px 0;padding-top:12px;}
`;

export default function KnowledgeBasePage() {
  const { state } = useGame();
  const completedMissions = state?.completedMissions || [];
  const lang = state?.lang || 'en';

  const [query, setQuery]       = useState('');
  const [category, setCategory] = useState('all');
  const [selected, setSelected] = useState(null);

  const unlocked = useMemo(() => getUnlockedArticles(completedMissions), [completedMissions]);
  const total    = KB_ARTICLES.length;
  const pct      = Math.round((unlocked.length / total) * 100);

  const filtered = useMemo(() => {
    let arts = category === 'all' ? unlocked : unlocked.filter(a => a.category === category);
    return searchArticles(arts, query);
  }, [unlocked, category, query]);

  const locked = useMemo(
    () => KB_ARTICLES.filter(a => !unlocked.find(u => u.id === a.id)).slice(0, 5),
    [unlocked]
  );

  const catCount = (id) => id === 'all' ? unlocked.length : unlocked.filter(a => a.category === id).length;

  const selectArticle = (article) => {
    setSelected(prev => prev?.id === article.id ? null : article);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="kb-shell">

        {/* ── Top bar: title + stats ───────────────────── */}
        <div className="kb-topbar">
          <div className="kb-hero">
            <div className="kb-hero-left">
              <div style={{ fontSize: 34, marginBottom: 6 }}>📚</div>
              <h1 className="kb-hero-title">
                {lang === 'id' ? 'Basis Pengetahuan IT' : 'IT Knowledge Base'}
              </h1>
              <p className="kb-hero-sub">
                {lang === 'id'
                  ? 'Selesaikan misi untuk membuka artikel · Cari solusi & perintah'
                  : 'Complete missions to unlock articles · Search solutions & commands'}
              </p>
              <div className="kb-progress-track">
                <div className="kb-progress-fill" style={{ width: `${pct}%` }} />
              </div>
              <p className="kb-progress-label">{pct}% {lang === 'id' ? 'terbuka' : 'unlocked'} · {unlocked.length}/{total} {lang === 'id' ? 'artikel' : 'articles'}</p>
            </div>

            <div className="kb-stat-row">
              {[
                { val: unlocked.length,                                           lbl: lang === 'id' ? 'Terbuka' : 'Unlocked',  icon: '✅' },
                { val: total - unlocked.length,                                   lbl: lang === 'id' ? 'Terkunci' : 'Locked',   icon: '🔒' },
                { val: unlocked.reduce((s, a) => s + a.commands.length, 0),       lbl: lang === 'id' ? 'Perintah' : 'Commands', icon: '💻' },
                { val: KB_CATEGORIES.length - 1,                                  lbl: lang === 'id' ? 'Kategori' : 'Cats',     icon: '🗂️' },
              ].map(s => (
                <div key={s.lbl} className="kb-stat">
                  <div style={{ fontSize: 16 }}>{s.icon}</div>
                  <div className="kb-stat-val">{s.val}</div>
                  <div className="kb-stat-lbl">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Search ─────────────────────────────────── */}
        <div className="kb-search-wrap">
          <input
            className="kb-search"
            type="text"
            placeholder={lang === 'id' ? '🔍  Cari artikel, perintah, tag...' : '🔍  Search articles, commands, tags...'}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        {/* ── Category chips (mobile + tablet only) ─── */}
        <div className="kb-chips">
          {KB_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`kb-chip ${category === cat.id ? 'active' : ''}`}
              onClick={() => setCategory(cat.id)}
            >
              {cat.emoji} {cat.label[lang] || cat.label.en} ({catCount(cat.id)})
            </button>
          ))}
        </div>

        {/* ── 3-column body ──────────────────────────── */}
        <div className="kb-body">

          {/* COL 1: Sidebar (desktop only) */}
          <div className="kb-sidebar">
            <p className="kb-sidebar-lbl">{lang === 'id' ? 'Kategori' : 'Categories'}</p>
            {KB_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`kb-cat-btn ${category === cat.id ? 'active' : ''}`}
                onClick={() => setCategory(cat.id)}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label[lang] || cat.label.en}</span>
                <span className="kb-cat-count">{catCount(cat.id)}</span>
              </button>
            ))}

            <div className="kb-sidebar-div">
              <p className="kb-sidebar-lbl">{lang === 'id' ? 'Kemajuan' : 'Progress'}</p>
              <div style={{ padding: '0 4px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'#94a3b8', marginBottom:4 }}>
                  <span>{lang === 'id' ? 'Terbuka' : 'Unlocked'}</span>
                  <span style={{ color:'#60a5fa', fontWeight:700 }}>{unlocked.length}/{total}</span>
                </div>
                <div className="kb-progress-track">
                  <div className="kb-progress-fill" style={{ width:`${pct}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* COL 2: Article list */}
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {filtered.length === 0 && (
              <div className="kb-empty">
                <div style={{ fontSize:40, marginBottom:8 }}>{query ? '🔍' : '🔒'}</div>
                <p style={{ fontSize:13 }}>
                  {query
                    ? (lang === 'id' ? 'Tidak ada hasil.' : 'No results found.')
                    : (lang === 'id' ? 'Selesaikan misi untuk membuka artikel.' : 'Complete missions to unlock articles.')}
                </p>
              </div>
            )}

            {filtered.map(article => (
              <button
                key={article.id}
                className={`kb-card ${selected?.id === article.id ? 'selected' : ''}`}
                onClick={() => selectArticle(article)}
              >
                <span className="kb-card-emoji">{article.emoji}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div className="kb-card-title">{article.title[lang] || article.title.en}</div>
                  <div className="kb-card-sym">{article.symptom[lang] || article.symptom.en}</div>
                  <div className="kb-card-tags">
                    {article.tags.slice(0, 4).map(t => <span key={t} className="kb-tag">#{t}</span>)}
                  </div>
                </div>
                <span className="kb-card-tier">T{article.tier}</span>
              </button>
            ))}

            {!query && category === 'all' && locked.map(article => (
              <div key={article.id} className="kb-locked">
                <span style={{ fontSize:22 }}>🔒</span>
                <div>
                  <div style={{ fontWeight:600, fontSize:12.5, color:'#64748b' }}>{article.title[lang] || article.title.en}</div>
                  <div style={{ fontSize:10.5, color:'#334155', marginTop:2 }}>
                    {lang === 'id' ? 'Selesaikan' : 'Complete'}: {article.unlockedBy.join(', ')}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* COL 3: Detail panel (tablet/desktop always visible) */}
          <div className="kb-detail">
            {selected
              ? <ArticleDetail article={selected} lang={lang} onClose={() => setSelected(null)} />
              : <DetailPlaceholder lang={lang} count={unlocked.length} />
            }
          </div>
        </div>
      </div>

      {/* Mobile bottom sheet (only on <768px) */}
      {selected && (
        <div className="kb-overlay" onClick={() => setSelected(null)}>
          <div className="kb-sheet" onClick={e => e.stopPropagation()}>
            <ArticleDetail article={selected} lang={lang} onClose={() => setSelected(null)} />
          </div>
        </div>
      )}
    </>
  );
}

// ── Detail placeholder ─────────────────────────────────────────
function DetailPlaceholder({ lang, count }) {
  return (
    <div style={{ textAlign:'center', padding:'64px 20px', color:'#475569' }}>
      <div style={{ fontSize:52, marginBottom:12 }}>📖</div>
      <p style={{ fontSize:15, color:'#64748b', marginBottom:6 }}>
        {lang === 'id' ? 'Pilih artikel untuk membaca' : 'Select an article to read'}
      </p>
      <p style={{ fontSize:12 }}>
        {count} {lang === 'id' ? 'artikel tersedia' : 'articles available'}
      </p>
    </div>
  );
}

// ── Article detail ─────────────────────────────────────────────
function ArticleDetail({ article, lang, onClose }) {
  return (
    <div>
      <button className="kb-close" onClick={onClose}>✕</button>
      <div className="kb-detail-emoji">{article.emoji}</div>
      <h2 className="kb-detail-title">{article.title[lang] || article.title.en}</h2>
      <span className="kb-detail-badge">Tier {article.tier} · {article.category}</span>

      <KBSection label={lang === 'id' ? '🩺 Gejala' : '🩺 Symptom'}   content={article.symptom[lang] || article.symptom.en} />
      <KBSection label={lang === 'id' ? '🔍 Penyebab' : '🔍 Cause'}   content={article.cause[lang]   || article.cause.en} />
      <KBSection label={lang === 'id' ? '✅ Solusi' : '✅ Solution'}   content={article.solution[lang] || article.solution.en} />

      {article.commands.length > 0 && (
        <div className="kb-section">
          <div className="kb-section-lbl">💻 {lang === 'id' ? 'Perintah' : 'Commands'}</div>
          {article.commands.map((cmd, i) => <div key={i} className="kb-cmd">{cmd}</div>)}
        </div>
      )}

      <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginTop:14 }}>
        {article.tags.map(t => <span key={t} className="kb-tag">#{t}</span>)}
      </div>
    </div>
  );
}

function KBSection({ label, content }) {
  return (
    <div className="kb-section">
      <div className="kb-section-lbl">{label}</div>
      <p className="kb-section-txt">{content}</p>
    </div>
  );
}
