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

  return (
    <section id="season" style={{ padding: mobile ? '80px 0' : '140px 0', position: 'relative', background: 'var(--bg)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 50%, color-mix(in srgb, var(--primary) 8%, transparent), transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: '1300px', margin: '0 auto', padding: mobile ? '0 20px' : '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '35fr 65fr', gap: mobile ? '40px' : '80px', alignItems: 'flex-start' }}>

          {/* Left sticky title */}
          <div style={mobile ? {} : { position: 'sticky', top: '120px' }}>
            <div className="mono" style={{ fontSize: '10px', color: 'var(--primary)', letterSpacing: '0.2em', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="live-dot" />SAISON 2026 / 2027 · INSCRIPTIONS OUVERTES
            </div>
            <h2 className="display" style={{ fontSize: mobile ? 'clamp(38px, 11vw, 64px)' : 'clamp(48px, 6vw, 96px)' }}>
              La saison <br /><span style={{ color: 'var(--primary)' }}>a commencé</span>
            </h2>
          </div>

          {/* Right roadmap */}
          <div>
            <p style={{ fontSize: mobile ? '14px' : '15px', lineHeight: 1.6, color: 'var(--fg-2)', marginBottom: '28px' }}>
              Pour que votre club soit prêt, les étapes suivantes doivent être respectées. Effectifs, calendriers FFBB, accès, formation des coachs, on vous accompagne.
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
