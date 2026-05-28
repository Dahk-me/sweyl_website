import React from 'react'
import { IconArrow } from '../Icons'
import { LiveScoreboard } from '../Instruments'

export default function Hero() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', paddingTop: '156px', paddingBottom: '80px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '30%', left: '-10%', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(255,102,0,0.08), transparent 60%)', filter: 'blur(40px)', animation: 'drift 20s ease-in-out infinite' }} />
      <div className="grain" />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: '28px' }}>—— Plateforme club · Basket amateur</div>
            <h1 className="display" style={{ fontSize: 'clamp(60px, 9vw, 132px)', marginBottom: '28px' }}>
              Le club<br />est <span style={{ color: 'var(--orange)' }}>plus grand</span><br />que le score.
            </h1>
            <p style={{ fontSize: '17px', lineHeight: 1.55, color: 'var(--fg-2)', marginBottom: '36px' }}>
              GimmeTheScore relie coachs, joueurs, dirigeants et bénévoles autour d'un projet commun — la vie du club, sur la saison entière.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '48px', flexWrap: 'wrap' }}>
              <a href="#join" className="btn-primary">Réserver une démo<IconArrow size={14} /></a>
              <a href="#vision" className="btn-ghost">La vision GTS</a>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <LiveScoreboard />
            <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', padding: '16px', borderRadius: '4px' }}>
                <div className="mono" style={{ fontSize: '9px', color: 'var(--fg-3)', letterSpacing: '0.15em', marginBottom: '6px' }}>MEILLEUR JOUEUR</div>
                <div className="display-narrow" style={{ fontSize: '18px' }}>L. MARTIN</div>
                <div className="mono" style={{ fontSize: '10px', color: 'var(--orange)', marginTop: '4px' }}>22 PTS · 6 AST</div>
              </div>
              <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', padding: '16px', borderRadius: '4px' }}>
                <div className="mono" style={{ fontSize: '9px', color: 'var(--fg-3)', letterSpacing: '0.15em', marginBottom: '6px' }}>SPECTATEURS</div>
                <div className="display-narrow" style={{ fontSize: '18px' }}>284</div>
                <div className="mono" style={{ fontSize: '10px', color: 'var(--fg-3)', marginTop: '4px' }}>EN DIRECT</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
