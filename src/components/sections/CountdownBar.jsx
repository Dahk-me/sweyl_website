import React from 'react'

const useCountdown = (targetDate) => {
  const [t, setT] = React.useState({ d: 0, h: 0, m: 0, s: 0 })
  React.useEffect(() => {
    const target = new Date(targetDate).getTime()
    const tick = () => {
      const diff = Math.max(0, target - Date.now())
      setT({ d: Math.floor(diff / 86400000), h: Math.floor(diff % 86400000 / 3600000), m: Math.floor(diff % 3600000 / 60000), s: Math.floor(diff % 60000 / 1000) })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetDate])
  return t
}

export default function CountdownBar() {
  const t = useCountdown('2026-09-05T00:00:00')
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 52, background: 'var(--orange)', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 16px' }}>
        <span className="mono" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', color: '#000', whiteSpace: 'nowrap' }}>
          COUP D'ENVOI DE LA SAISON DANS
        </span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
          {[[t.d, 'J'], [String(t.h).padStart(2, '0'), 'H'], [String(t.m).padStart(2, '0'), 'M'], [String(t.s).padStart(2, '0'), 'S']].map(([v, u], i) => (
            <React.Fragment key={u}>
              {i > 0 && <span className="mono" style={{ fontSize: '11px', color: 'rgba(0,0,0,0.4)', margin: '0 1px' }}>·</span>}
              <span className="display" style={{ fontSize: '18px', color: '#000', lineHeight: 1 }}>{v}</span>
              <span className="mono" style={{ fontSize: '8px', color: 'rgba(0,0,0,0.55)', letterSpacing: '0.08em' }}>{u}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
