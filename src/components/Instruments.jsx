import React from 'react'

export const LiveScoreboard = ({ animate = true }) => {
  const [scores, setScores] = React.useState({ home: 60, away: 50 })
  const [q] = React.useState(3)
  const [time] = React.useState('06:24')

  React.useEffect(() => {
    if (!animate) return
    const id = setInterval(() => {
      setScores(prev => {
        const bump = Math.random() > 0.7 ? 3 : 2
        const addHome = Math.random() > 0.5
        const nh = addHome ? prev.home + bump : prev.home
        const na = !addHome ? prev.away + bump : prev.away
        if (nh >= 100 || na >= 100) return { home: 60, away: 50 }
        return { home: nh, away: na }
      })
    }, 4200)
    return () => clearInterval(id)
  }, [animate])

  const { home, away } = scores
  return (
    <div style={{ width: '100%', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: '4px', padding: '16px', fontFamily: 'JetBrains Mono, monospace', boxSizing: 'border-box', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <span style={{ fontSize: '10px', color: '#ff3b3b', letterSpacing: '0.2em', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span className="live-dot" />LIVE · Q{q} · {time}
        </span>
        <span style={{ fontSize: '10px', color: 'var(--fg-4)', letterSpacing: '0.15em' }}>NM3 · J14</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '8px', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: 'var(--fg-3)', marginBottom: '4px', letterSpacing: '0.1em' }}>ABGR</div>
          <div className="display" style={{ fontSize: 'clamp(36px, 10vw, 72px)', color: home > away ? 'var(--orange)' : 'var(--fg)', transition: 'color 0.4s' }}>{home}</div>
        </div>
        <div className="display" style={{ fontSize: 'clamp(14px, 4vw, 24px)', color: 'var(--fg-4)', padding: '0 4px' }}>—</div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '11px', color: 'var(--fg-3)', marginBottom: '4px', letterSpacing: '0.1em' }}>RUC</div>
          <div className="display" style={{ fontSize: 'clamp(36px, 10vw, 72px)', color: away > home ? 'var(--orange)' : 'var(--fg)', transition: 'color 0.4s' }}>{away}</div>
        </div>
      </div>
      <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--fg-3)', letterSpacing: '0.1em', flexWrap: 'wrap', gap: '4px' }}>
        <span>FG% 47.2</span><span>3PT 8/22</span><span>REB 31</span><span>AST 14</span>
      </div>
    </div>
  )
}

export const PlayerCard = () => (
  <div style={{ width: '100%', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: '4px', padding: '20px', position: 'relative', overflow: 'hidden', boxSizing: 'border-box' }}>
    <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'radial-gradient(circle at top right, rgba(255,102,0,0.18), transparent 70%)' }} />
    <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'flex-end', position: 'relative', flexWrap: 'wrap' }}>
      <div className="placeholder" style={{ width: '56px', height: '56px', borderRadius: '4px', flexShrink: 0 }}>
        <span className="label" style={{ fontSize: '8px' }}>PHOTO</span>
      </div>
      <div style={{ flex: 1, minWidth: '80px' }}>
        <div className="mono" style={{ fontSize: '10px', color: 'var(--fg-3)', letterSpacing: '0.15em', marginBottom: '4px' }}>#7 · MENEUR</div>
        <div className="display" style={{ fontSize: 'clamp(20px, 5vw, 34px)', lineHeight: 0.9 }}>L. MARTIN</div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div className="mono" style={{ fontSize: '9px', color: 'var(--fg-3)', letterSpacing: '0.12em' }}>SAISON</div>
        <div className="display" style={{ fontSize: 'clamp(24px, 6vw, 40px)', color: 'var(--orange)', lineHeight: 1 }}>18.4</div>
        <div className="mono" style={{ fontSize: '8px', color: 'var(--fg-4)', letterSpacing: '0.1em' }}>PTS / MATCH</div>
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'var(--line)', border: '1px solid var(--line)' }}>
      {[['REB', '5.1'], ['AST', '6.2'], ['STL', '2.4'], ['EFF', '21.3']].map(([k, v]) => (
        <div key={k} style={{ background: 'var(--bg-2)', padding: '10px 6px' }}>
          <div className="mono" style={{ fontSize: '8px', color: 'var(--fg-4)', letterSpacing: '0.1em', marginBottom: '4px' }}>{k}</div>
          <div className="display" style={{ fontSize: 'clamp(14px, 3.5vw, 24px)' }}>{v}</div>
        </div>
      ))}
    </div>
    <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
        <span className="mono" style={{ fontSize: '9px', color: 'var(--fg-3)', letterSpacing: '0.1em' }}>PROGRESSION · 12 MATCHS</span>
        <span className="mono" style={{ fontSize: '10px', color: '#3ddc97' }}>+24%</span>
      </div>
      <svg viewBox="0 0 240 50" style={{ width: '100%', height: '50px' }}>
        <polyline points="0,38 20,32 40,36 60,28 80,30 100,22 120,26 140,18 160,20 180,12 200,16 220,8 240,10"
          fill="none" stroke="var(--orange)" strokeWidth="1.5" />
        <polyline points="0,38 20,32 40,36 60,28 80,30 100,22 120,26 140,18 160,20 180,12 200,16 220,8 240,10 240,50 0,50"
          fill="url(#g1)" opacity="0.3" />
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--orange)" />
            <stop offset="1" stopColor="var(--orange)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
)

export const CalendarWidget = () => {
  const matches = [
    { date: 'SAM 14.09', opp: 'RECY', status: 'À VENIR', home: true, score: null },
    { date: 'SAM 21.09', opp: 'WITRY', status: 'V', home: false, score: '78-65' },
    { date: 'DIM 29.09', opp: 'RUC', status: 'V', home: true, score: '82-71' },
    { date: 'SAM 05.10', opp: 'ABGR', status: 'D', home: false, score: '68-74' },
    { date: 'SAM 12.10', opp: 'METZ', status: 'À VENIR', home: true, score: null },
  ]
  return (
    <div style={{ width: '100%', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: '4px', padding: '16px', boxSizing: 'border-box', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '4px' }}>
        <span className="mono" style={{ fontSize: '10px', color: 'var(--fg-3)', letterSpacing: '0.15em' }}>CALENDRIER · NM3</span>
        <span className="mono" style={{ fontSize: '9px', color: 'var(--orange)', letterSpacing: '0.12em' }}>FFBB · SYNC AUTO</span>
      </div>
      <div>
        {matches.map((m, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 52px 36px', alignItems: 'center', padding: '8px 0', borderTop: i ? '1px solid var(--line)' : 'none', gap: '6px' }}>
            <span className="mono" style={{ fontSize: '8px', color: 'var(--fg-3)', letterSpacing: '0.06em' }}>{m.date}</span>
            <span style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '5px', overflow: 'hidden' }}>
              <span style={{ fontSize: '8px', padding: '2px 4px', background: 'var(--bg-3)', borderRadius: '2px', color: 'var(--fg-3)', flexShrink: 0 }}>{m.home ? 'DOM' : 'EXT'}</span>
              <span className="display-narrow" style={{ fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.opp}</span>
            </span>
            <span className="mono" style={{ fontSize: '9px', textAlign: 'right' }}>{m.score || '—'}</span>
            <span className="mono" style={{ fontSize: '8px', padding: '2px 4px', borderRadius: '2px', textAlign: 'center',
              background: m.status === 'V' ? 'rgba(61,220,151,0.1)' : m.status === 'D' ? 'rgba(255,80,80,0.1)' : 'var(--bg-3)',
              color: m.status === 'V' ? '#3ddc97' : m.status === 'D' ? '#ff5050' : 'var(--fg-3)', letterSpacing: '0.06em' }}>{m.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const PointsLeaderboard = () => {
  const players = [
    { n: 'L. Martin', role: 'Joueur', pts: 840, delta: '+45' },
    { n: 'M. Dubois', role: 'Coach U15', pts: 720, delta: '+30' },
    { n: 'A. Rivière', role: 'Joueur', pts: 680, delta: '+12' },
    { n: 'T. Béranger', role: 'Bénévole', pts: 540, delta: '+25' },
  ]
  return (
    <div style={{ width: '100%', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: '4px', padding: '16px', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '4px' }}>
        <span className="mono" style={{ fontSize: '10px', color: 'var(--fg-3)', letterSpacing: '0.15em' }}>HÉROS DU CLUB · OCT</span>
        <span className="mono" style={{ fontSize: '9px', color: 'var(--orange)', letterSpacing: '0.12em' }}>+ 4 RÉCOMPENSES</span>
      </div>
      {players.map((p, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '20px 1fr auto auto', gap: '10px', alignItems: 'center', padding: '9px 0', borderTop: i ? '1px solid var(--line)' : 'none' }}>
          <span className="display" style={{ fontSize: '15px', color: i === 0 ? 'var(--orange)' : 'var(--fg-4)' }}>{i + 1}</span>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '13px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.n}</div>
            <div className="mono" style={{ fontSize: '8px', color: 'var(--fg-3)', letterSpacing: '0.1em', marginTop: '2px' }}>{p.role.toUpperCase()}</div>
          </div>
          <span className="mono" style={{ fontSize: '10px', color: '#3ddc97' }}>{p.delta}</span>
          <span className="display" style={{ fontSize: 'clamp(14px, 4vw, 22px)', color: 'var(--fg)' }}>{p.pts}</span>
        </div>
      ))}
    </div>
  )
}
