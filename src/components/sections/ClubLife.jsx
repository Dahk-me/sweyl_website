import React from 'react'
import { LiveScoreboard } from '../Instruments'
import { useMobile } from '../../hooks/useMobile'

export default function ClubLife() {
  const mobile = useMobile()

  return (
    <section style={{ padding: mobile ? '80px 0' : '140px 0', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: mobile ? '0 20px' : '0 32px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: mobile ? '1fr' : '35fr 65fr',
          gap: mobile ? '40px' : '80px',
          alignItems: 'flex-start',
        }}>

          {/* Left 35% — sticky title */}
          <div style={mobile ? {} : { position: 'sticky', top: '120px' }}>
            <div className="eyebrow" style={{ marginBottom: '20px', fontSize: mobile ? '11px' : '13px' }}>—— La plateforme</div>
            <h2 className="display" style={{ fontSize: mobile ? 'clamp(36px, 11vw, 64px)' : 'clamp(48px, 6vw, 88px)' }}>
              Le <span style={{ color: 'var(--primary)' }}>Club</span><br />qui prend vie.
            </h2>
          </div>

          {/* Right 65% — content */}
          <div data-reveal>
            <p style={{ fontSize: mobile ? '15px' : '17px', lineHeight: 1.6, color: 'var(--fg-2)', marginBottom: '36px' }}>
              SWEYL relie coachs, joueurs et dirigeants autour d'un projet commun : la vie du club, sur la saison entière.
            </p>
            <LiveScoreboard />
            {!mobile && (
              <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', padding: '16px', borderRadius: '4px' }}>
                  <div className="mono" style={{ fontSize: '9px', color: 'var(--fg-3)', letterSpacing: '0.15em', marginBottom: '6px' }}>MEILLEUR JOUEUR</div>
                  <div className="display-narrow" style={{ fontSize: '18px' }}>L. MARTIN</div>
                  <div className="mono" style={{ fontSize: '10px', color: 'var(--primary)', marginTop: '4px' }}>22 PTS · 6 AST</div>
                </div>
                <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', padding: '16px', borderRadius: '4px' }}>
                  <div className="mono" style={{ fontSize: '9px', color: 'var(--fg-3)', letterSpacing: '0.15em', marginBottom: '6px' }}>SPECTATEURS</div>
                  <div className="display-narrow" style={{ fontSize: '18px' }}>84</div>
                  <div className="mono" style={{ fontSize: '10px', color: 'var(--fg-3)', marginTop: '4px' }}>EN DIRECT</div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
