import React from 'react'
import { useMobile } from '../../hooks/useMobile'

export default function Founder() {
  const mobile = useMobile()

  return (
    <section id="founder" style={{ padding: mobile ? '80px 0' : '120px 0', background: 'var(--bg)', borderTop: '1px solid var(--line)' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: mobile ? '0 20px' : '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '35fr 65fr', gap: mobile ? '32px' : '80px', alignItems: 'flex-start' }}>

          <div style={{ position: mobile ? 'static' : 'sticky', top: '120px' }}>
            <div className="eyebrow" style={{ marginBottom: '20px', fontSize: mobile ? '11px' : '13px' }}>—— L&apos;histoire</div>
            <h2 className="display" style={{ fontSize: mobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(48px, 6vw, 80px)' }}>
              Né sur le<br /><span style={{ color: 'var(--primary)' }}>terrain</span>.<br />Pas dans un<br />bureau.
            </h2>
          </div>

          <div style={{ paddingTop: mobile ? '0' : '40px', position: 'relative' }}>
            {/* Accent vertical */}
            <div style={{
              position: 'absolute',
              left: mobile ? 0 : '-24px',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'var(--primary)',
              opacity: 0.8,
            }} />

            <div style={{ paddingLeft: mobile ? '20px' : '0' }}>
              <p className="serif" style={{ fontSize: mobile ? '17px' : '22px', lineHeight: 1.45, color: 'var(--fg)', marginBottom: '24px', fontWeight: 500 }}>
                Pendant des années, le basket amateur a fait sans outil dédié. Les coachs se débrouillaient avec un cahier ou un fichier excel. Les clubs comptaient sur la mémoire.
              </p>
              <p style={{ fontSize: mobile ? '14px' : '16px', lineHeight: 1.7, color: 'var(--fg-2)', marginBottom: '24px' }}>
                SWEYL est la réponse. L&apos;outil qu&apos;un coach amateur aurait voulu avoir depuis toujours. Construit par quelqu&apos;un qui a vu ce qu&apos;il manquait et qui refuse que le sport amateur reste l&apos;angle mort de la tech.
              </p>
              <p style={{ fontSize: mobile ? '14px' : '16px', lineHeight: 1.7, color: 'var(--fg-2)', marginBottom: '32px' }}>
                Pas une application de plus. Une plateforme complète, dédié au club, un standard pour celles et ceux qui font vivre les clubs chaque week-end.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '20px', borderTop: '1px solid var(--line)' }}>
                <div style={{ width: '32px', height: '1px', background: 'var(--primary)' }} />
                <span className="mono" style={{ fontSize: '11px', color: 'var(--fg-3)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  Le fondateur · SWEYL
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
