import React from 'react'
import { IconArrow } from '../Icons'
import { useMobile } from '../../hooks/useMobile'

export default function Hero() {
  const mobile = useMobile()

  // bar 36 + header (desktop 72 / mobile 56) + breathing
  const pt = mobile ? '116px' : '156px'

  return (
    <section style={{ position: 'relative', minHeight: '100svh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {/* Video background */}
      <video
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        autoPlay loop muted playsInline
        preload="metadata"
        poster="/assets/hero-poster.jpg"
      >
        <source src="https://fybnpenwtzvjwlbnbmrq.supabase.co/storage/v1/object/public/video_hero/hero-mobile.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.72) 100%)', zIndex: 1 }} />

      <div className="grain" style={{ zIndex: 2 }} />

      {/* Content */}
      <div style={{ position: 'absolute', bottom: '20px', zIndex: 3, maxWidth: '1280px', margin: '0 auto', width: '100%', padding: mobile ? `${pt} 20px 20px` : `${pt} 32px 100px` }}>
        <div className="eyebrow" style={{ marginBottom: '20px', fontSize: mobile ? '11px' : '13px' }}>—— SWEYL</div>
        <h1 className="display" style={{ fontSize: mobile ? 'clamp(56px, 16vw, 88px)' : 'clamp(80px, 11vw, 160px)', marginBottom: '20px', maxWidth: mobile ? '100%' : '70%', color: '#f5f4f1' }}>
          Tes <span style={{ color: 'var(--primary)' }}>étoiles</span>.<br />Ton <span style={{ color: 'var(--primary)' }}>terrain</span>.
        </h1>
          <p style={{ fontSize: mobile ? '14px' : '17px', color: 'rgba(245,244,241,0.85)', maxWidth: mobile ? '100%' : '55%', marginBottom: '32px', lineHeight: 1.5 }}>
              <p>Chaque sportif amateur est une <span style={{ color: 'var(--primary)' }}><strong>étoile</strong></span> qui s&apos;ignore.</p>
              <p><span style={{ color: 'var(--primary)' }}><strong>SWEYL</strong></span> les accompagne pour les faire <span style={{ color: 'var(--primary)' }}><strong>briller</strong></span> à leur plein potentiel.</p>
          </p>
        <a href="#join" className="btn-primary" style={{ padding: mobile ? '14px 22px' : '16px 28px', fontSize: mobile ? '13px' : '14px' }}>
          J&apos;obtiens mes accès
          <IconArrow size={mobile ? 12 : 14} />
        </a>
      </div>
    </section>
  )
}
