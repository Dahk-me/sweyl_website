import React from 'react'
import AppShot from '../AppShot'
import { useMobile } from '../../hooks/useMobile'

const CLAIMS = [
  ['Saisie guidée', "Un joueur non-titulaire suffit. Pas de formation, pas de tableur."],
  ['Temps réel', 'Le banc, les tribunes et la maison voient le même match.'],
  ['Après le match', 'La feuille est déjà remplie. Les stats aussi.'],
]

const Claims = ({ mobile }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? '24px' : '32px' }}>
    {CLAIMS.map(([label, text]) => (
      <div key={label}>
        <div className="mono" style={{ fontSize: '10px', color: 'var(--primary)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '8px' }}>
          {label}
        </div>
        <div style={{ fontSize: mobile ? '14px' : '16px', color: 'var(--fg-2)', lineHeight: 1.5 }}>
          {text}
        </div>
      </div>
    ))}
  </div>
)

export default function ClubLife() {
  const mobile = useMobile()

  const phone = (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
      <AppShot slot="clubLife" width={mobile ? '62vw' : 'clamp(260px, 30vw, 330px)'} priority />
    </div>
  )

  return (
    <section style={{ padding: mobile ? '80px 0' : '140px 0', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: mobile ? '0 20px' : '0 32px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: mobile ? '1fr' : '35fr 65fr',
          gap: mobile ? '40px' : '80px',
          alignItems: 'flex-start',
        }}>

          {/* Left 35% sticky title */}
          <div style={mobile ? {} : { position: 'sticky', top: '120px' }}>
            <div className="eyebrow" style={{ marginBottom: '20px', fontSize: mobile ? '11px' : '13px' }}>La plateforme</div>
            <h2 className="display" style={{ fontSize: mobile ? 'clamp(36px, 11vw, 64px)' : 'clamp(48px, 6vw, 88px)' }}>
              Le <span style={{ color: 'var(--primary)' }}>club</span><br />qui prend vie.
            </h2>
          </div>

          {/* Right 65% content */}
          <div data-reveal>
            <p style={{ fontSize: mobile ? '15px' : '17px', lineHeight: 1.6, color: 'var(--fg-2)', marginBottom: mobile ? '40px' : '56px' }}>
              SWEYL relie coachs, joueurs et dirigeants autour d&apos;un projet commun : la vie du club, sur la saison entière.
            </p>

            {mobile ? (
              <>
                {phone}
                <div style={{ marginTop: '40px' }}><Claims mobile /></div>
              </>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '56px', alignItems: 'center' }}>
                {phone}
                <Claims mobile={false} />
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
