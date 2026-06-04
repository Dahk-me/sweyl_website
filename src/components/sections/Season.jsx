import React from 'react'
import { useMobile } from '../../hooks/useMobile'

const roadmap = [
  ['Étape 1', 'Onboarding du club, formation coachs'],
  ['Étape 2', 'Paramétrage des effectifs et partenaires'],
  ['Étape 3', 'Tests internes, ajustements'],
  ['Étape finale', 'Démarrage de saison, tout est prêt'],
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
    <section id="season" style={{ padding: mobile ? '80px 0' : '140px 0', position: 'relative', background: 'var(--bg)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 50%, color-mix(in srgb, var(--primary) 8%, transparent), transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: '1300px', margin: '0 auto', padding: mobile ? '0 20px' : '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '35fr 65fr', gap: mobile ? '40px' : '80px', alignItems: 'flex-start' }}>

          {/* Left — sticky title */}
          <div style={mobile ? {} : { position: 'sticky', top: '120px' }}>
            <div className="mono" style={{ fontSize: '10px', color: 'var(--primary)', letterSpacing: '0.2em', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="live-dot" />SAISON 2026 / 2027 · INSCRIPTIONS OUVERTES
            </div>
            <h2 className="display" style={{ fontSize: mobile ? 'clamp(38px, 11vw, 64px)' : 'clamp(48px, 6vw, 96px)' }}>
              Début de <br /><span style={{ color: 'var(--primary)' }}>la saison</span><br />dans
            </h2>
          </div>

          {/* Right — countdown + roadmap */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'var(--line)', border: '1px solid var(--line)', marginBottom: '40px' }}>
              {[['JOURS', t.d], ['HEURES', String(t.h).padStart(2, '0')], ['MINUTES', String(t.m).padStart(2, '0')], ['SECONDES', String(t.s).padStart(2, '0')]].map(([k, v]) => (
                <div key={k} style={{ background: 'var(--bg-2)', padding: mobile ? '24px 16px' : '36px 24px' }}>
                  <div className="display" style={{ fontSize: mobile ? 'clamp(36px, 10vw, 60px)' : 'clamp(48px, 5vw, 80px)', color: 'var(--fg)', lineHeight: 1 }}>{v}</div>
                  <div className="mono" style={{ fontSize: '9px', color: 'var(--fg-3)', letterSpacing: '0.18em', marginTop: '8px' }}>{k}</div>
                </div>
              ))}
            </div>

            <p style={{ fontSize: mobile ? '14px' : '15px', lineHeight: 1.6, color: 'var(--fg-2)', marginBottom: '28px' }}>
              Pour que votre club soit prêt, les étapes suivantes doivent êtres respéctés. Effectifs, calendriers FFBB, accès, formation des coachs, on vous accompagne.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {roadmap.map(([m, txt]) => (
                <div key={m} style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: '16px', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--line)' }}>
                  <span className="mono" style={{ fontSize: '10px', color: 'var(--primary)', letterSpacing: '0.18em' }}>{m}</span>
                  <span style={{ fontSize: '13px', color: 'var(--fg-2)' }}>{txt}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
