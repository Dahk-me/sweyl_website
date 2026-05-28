import React from 'react'
import { useMobile } from '../../hooks/useMobile'
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
  const mobile = useMobile()
  return (
    <section style={{ padding: mobile ? '60px 0' : '80px 0', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: mobile ? '0 0' : '0 32px' }}>
        {/* Stats grid — 2×2 on mobile, 4 col on desktop */}
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: '2px', background: 'var(--orange)', marginBottom: '40px' }}>
          {stats.map(([n, l]) => (
            <div key={l} style={{ background: 'var(--bg)', padding: mobile ? '28px 20px' : '40px 32px' }}>
              <div className="mono" style={{ fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.18em', marginBottom: '8px' }}>★ {l}</div>
              <div className="display" style={{ fontSize: mobile ? 'clamp(48px,13vw,72px)' : 'clamp(72px,8vw,120px)', color: 'var(--fg)', lineHeight: 0.9 }}>{n}</div>
            </div>
          ))}
        </div>

        {/* Club logos */}
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: mobile ? '20px' : '24px 20px', borderTop: '1px dashed rgba(128,128,128,0.2)', borderBottom: '1px dashed rgba(128,128,128,0.2)', flexWrap: 'wrap', gap: '20px' }}>
          {clubs.map(c => (
            <img key={c.name} src={c.logo} alt={c.name} style={{ height: mobile ? '36px' : '56px', width: 'auto', objectFit: 'contain', opacity: 0.85 }} />
          ))}
        </div>
      </div>
    </section>
  )
}
