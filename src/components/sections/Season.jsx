import React from 'react'
import { useMobile } from '../../hooks/useMobile'

const roadmap = [
  ['JUIN', 'Onboarding du club, formation coachs'],
  ['JUILLET', 'Paramétrage des effectifs et partenaires'],
  ['AOÛT', 'Tests internes, ajustements'],
  ['SEPT.', 'Démarrage de saison, tout est prêt'],
]

export default function Season() {
  const mobile = useMobile()
  const [t, setT] = React.useState({ d: 0, h: 0, m: 0, s: 0 })
  React.useEffect(() => {
    const target = new Date('2026-09-05T00:00:00').getTime()
    const tick = () => {
      const diff = Math.max(0, target - Date.now())
      setT({ d: Math.floor(diff / 86400000), h: Math.floor(diff % 86400000 / 3600000), m: Math.floor(diff % 3600000 / 60000), s: Math.floor(diff % 60000 / 1000) })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="season" style={{ padding: mobile ? '80px 0' : '140px 0', position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--line)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 50%, rgba(255,102,0,0.08), transparent 60%)' }} />
      <div style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto', padding: mobile ? '0 20px' : '0 32px' }}>
        <div className="mono" style={{ fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.2em', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="live-dot" />SAISON 2026 / 2027 · INSCRIPTIONS OUVERTES
        </div>
        <h2 className="display" style={{ fontSize: mobile ? 'clamp(38px, 11vw, 64px)' : 'clamp(56px, 8vw, 120px)', marginBottom: '36px' }}>
          Le coup d'envoi<br />de <span style={{ color: 'var(--orange)' }}>la saison</span> —<br /><span style={{ color: 'var(--orange)' }}>dans</span>
        </h2>

        {/* Countdown — 2×2 on mobile, 4 cols on desktop */}
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: '1px', background: 'var(--line)', border: '1px solid var(--line)', marginBottom: '40px' }}>
          {[['JOURS', t.d], ['HEURES', String(t.h).padStart(2, '0')], ['MINUTES', String(t.m).padStart(2, '0')], ['SECONDES', String(t.s).padStart(2, '0')]].map(([k, v]) => (
            <div key={k} style={{ background: 'var(--bg)', padding: mobile ? '24px 16px' : '40px 24px' }}>
              <div className="display" style={{ fontSize: mobile ? 'clamp(36px, 10vw, 60px)' : 'clamp(56px, 7vw, 96px)', color: 'var(--fg)', lineHeight: 1 }}>{v}</div>
              <div className="mono" style={{ fontSize: '9px', color: 'var(--fg-3)', letterSpacing: '0.18em', marginTop: '8px' }}>{k}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: mobile ? '28px' : '60px', alignItems: 'center' }}>
          <p style={{ fontSize: mobile ? '14px' : '15px', lineHeight: 1.6, color: 'var(--fg-2)' }}>
            Pour que votre club soit prêt en septembre, l'onboarding démarre en juin. Effectifs, calendriers FFBB, formation des coachs, points partenaires — on vous accompagne.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {roadmap.map(([m, txt]) => (
              <div key={m} style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: '16px', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--line)' }}>
                <span className="mono" style={{ fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.18em' }}>{m}</span>
                <span style={{ fontSize: '13px', color: 'var(--fg-2)' }}>{txt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
