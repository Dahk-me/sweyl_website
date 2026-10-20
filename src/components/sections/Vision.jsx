import React from 'react'
import { useTranslation } from 'react-i18next'
import { useMobile } from '../../hooks/useMobile'
import Accent from '../Accent'

// Servies par Vercel, pas par le Storage Supabase (quota d'egress partagé avec l'app).
const VISION_IMG_APP = '/assets/vision/vision-app.webp'
const VISION_IMG_TEAM = '/assets/vision/vision-team.webp'
const VISION_IMG_COACH = '/assets/vision/vision-coach.webp'

const pillars = [
  { id: 'club', img: VISION_IMG_APP },
  { id: 'season', img: VISION_IMG_TEAM },
  { id: 'roles', img: VISION_IMG_COACH },
]

const Card = ({ p, mobile }) => {
  const { t } = useTranslation()
  const title = t(`vision.pillars.${p.id}.title`)
  return (
  <div style={{ borderRadius: '8px', overflow: 'hidden', background: 'var(--bg-3)', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', height: '100%' }}>
    <img src={p.img} alt={title} loading="lazy" decoding="async" style={{ width: '100%', height: '350px', flexShrink: 0, objectFit: 'cover', display: 'block' }} />
    <div style={{ padding: mobile ? '20px' : '24px', flex: 1 }}>
      <div className="display-narrow" style={{ fontSize: '22px', marginBottom: '8px' }}>{title}</div>
      <div style={{ fontSize: '13px', color: 'var(--fg-3)', lineHeight: 1.55 }}>{t(`vision.pillars.${p.id}.desc`)}</div>
    </div>
  </div>
  )
}

export default function Vision() {
  const mobile = useMobile()
  const { t } = useTranslation()

  return (
    <section id="vision" style={{ padding: mobile ? '80px 0' : '140px 0', position: 'relative', background: 'var(--bg-2)' }}>

      {/* Container paddé titre + texte */}
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: mobile ? '0 20px' : '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '35fr 65fr', gap: mobile ? '32px' : '80px', alignItems: 'flex-start' }}>

          {/* Sticky title */}
          <div style={{ position: mobile ? 'static' : 'sticky', top: '120px' }}>
            <div className="eyebrow" style={{ marginBottom: '20px', fontSize: mobile ? '11px' : '13px' }}>{t('vision.eyebrow')}</div>
            <h2 className="display" style={{ fontSize: mobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(48px, 6vw, 88px)', marginBottom: mobile ? '0' : '28px' }}>
              <Accent text={t('vision.title')} />
            </h2>
          </div>

          {/* Texte + cartes desktop */}
          <div style={{ paddingTop: mobile ? '0' : '40px' }}>
            <p className="serif" style={{ fontSize: mobile ? '17px' : '22px', lineHeight: 1.45, color: 'var(--fg)', marginBottom: '20px', fontWeight: 500 }}>
              <Accent text={t('vision.lead')} />
            </p>
            <p style={{ fontSize: mobile ? '14px' : '15px', lineHeight: 1.7, color: 'var(--fg-2)', marginBottom: mobile ? '0' : '36px' }}>
              {t('vision.body')}
            </p>

            {/* Grille desktop uniquement */}
            {!mobile && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
                {pillars.map(p => <Card key={p.id} p={p} mobile={false} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Carousel mobile hors du container paddé pour éviter l'overflow page */}
      {mobile && (
        <div style={{ overflow: 'hidden', marginTop: '32px' }}>
          <div style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'scroll',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            touchAction: 'pan-x pan-y',
            paddingLeft: 'calc((100vw - 78vw) / 2)',
            paddingRight: 'calc((100vw - 78vw) / 2)',
            paddingBottom: '4px',
          }}>
            {pillars.map(p => (
              <div key={p.id} style={{ flex: '0 0 78vw', scrollSnapAlign: 'center' }}>
                <Card p={p} mobile />
              </div>
            ))}
          </div>
        </div>
      )}

    </section>
  )
}
