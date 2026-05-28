import React from 'react'
import logoAbgr from '/assets/clubs/LogoAbgr.png'
import logoRuc from '/assets/clubs/LogoRuc.png'
import logoWitry from '/assets/clubs/LogoWitry.png'
import logoRecy from '/assets/clubs/LogoRecy.png'

const clubs = [
  { name: 'ABGR', logo: logoAbgr },
  { name: 'RUC', logo: logoRuc },
  { name: 'Witry', logo: logoWitry },
  { name: 'Recy', logo: logoRecy },
]

const stats = [['120+', 'TESTEURS'], ['15+', 'COACHS'], ['6', 'CLUBS'], ['180+', 'MATCHS']]

export default function SocialProof() {
  return (
    <section style={{ padding: '80px 0', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '2px', background: 'var(--orange)', marginBottom: '48px' }}>
          {stats.map(([n, l]) => (
            <div key={l} style={{ background: 'var(--bg)', padding: '40px 32px' }}>
              <div className="mono" style={{ fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.18em', marginBottom: '10px' }}>★ {l}</div>
              <div className="display" style={{ fontSize: 'clamp(72px,8vw,120px)', color: 'var(--fg)', lineHeight: 0.9 }}>{n}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '24px 20px', borderTop: '1px dashed rgba(255,255,255,0.12)', borderBottom: '1px dashed rgba(255,255,255,0.12)', flexWrap: 'wrap', gap: '24px' }}>
          {clubs.map(c => (
            <img key={c.name} src={c.logo} alt={c.name} style={{ height: '56px', width: 'auto', objectFit: 'contain', opacity: 0.85 }} />
          ))}
        </div>
      </div>
    </section>
  )
}
