import React from 'react'
import { useMobile } from '../../hooks/useMobile'

const actions = [
  ['TABLE', '+15'], ['MAILLOTS', '+10'], ['CARITATIF', '+25'],
  ['CONTENU', '+5'], ['ARBITRAGE', '+20'], ['ENCADRER', '+30'],
]

export default function Community() {
  const mobile = useMobile()
  return (
    <section id="community" style={{ padding: mobile ? '80px 0' : '120px 0', background: 'var(--orange)', color: '#000', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(0,0,0,0.04) 60px, rgba(0,0,0,0.04) 62px)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: '1440px', margin: '0 auto', padding: mobile ? '0 20px' : '0 32px' }}>
        <h2 className="display" style={{ fontSize: mobile ? 'clamp(56px, 18vw, 100px)' : 'clamp(72px, 14vw, 220px)', lineHeight: 0.85, marginBottom: '40px' }}>
          POINTS<br />CLUB ★
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: mobile ? '36px' : '60px', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: mobile ? '15px' : '19px', lineHeight: 1.5, marginBottom: '16px', fontWeight: 500 }}>
              Un système de récompense communautaire <strong>EXCLUSIF GTS</strong>. Chaque action bénéfique au club génère des points convertibles en bons d'achat chez vos partenaires.
            </p>
            <p style={{ fontSize: '14px', lineHeight: 1.6, opacity: 0.85 }}>
              Les bénévoles sont récompensés. Les commerces locaux gagnent en visibilité. Le club construit une vraie économie de la fidélité.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
            {actions.map(([t, p]) => (
              <div key={t} style={{ background: '#000', padding: mobile ? '14px 12px' : '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="display" style={{ fontSize: mobile ? 'clamp(13px, 4vw, 18px)' : '22px', color: '#fff' }}>{t}</span>
                <span className="display" style={{ fontSize: mobile ? 'clamp(13px, 4vw, 18px)' : '22px', color: 'var(--orange)' }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
