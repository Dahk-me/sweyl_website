import React from 'react'
import { useTranslation } from 'react-i18next'
import { useMobile } from '../../hooks/useMobile'
import Accent from '../Accent'

// Le nom reste celui de la personne ; son rôle et sa citation vivent dans testimonials.items.<id>.
const verbatims = [
  { id: 'will', name: 'Big Will' },
  { id: 'amaury', name: 'Amaury' },
  { id: 'luc', name: 'Luc' },
  { id: 'aniss', name: 'Aniss' },
]

const Card = ({ v, mobile }) => {
  const { t } = useTranslation()
  return (
  <div style={{
    background: 'var(--bg-3)',
    border: '1px solid var(--line)',
    borderRadius: '6px',
    padding: mobile ? '24px 22px' : '32px 28px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    height: '100%',
  }}>
    <p style={{ fontSize: mobile ? '15px' : '17px', lineHeight: 1.5, color: 'var(--fg)', flex: 1 }}>
      {t(`testimonials.items.${v.id}.quote`)}
    </p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingTop: '14px', borderTop: '1px solid var(--line)' }}>
      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg)' }}>{v.name}</span>
      <span className="mono" style={{ fontSize: '10px', color: 'var(--primary)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>{t(`testimonials.items.${v.id}.role`)}</span>
    </div>
  </div>
  )
}

export default function Testimonials() {
  const mobile = useMobile()
  const { t } = useTranslation()

  return (
    <section id="testimonials" style={{ padding: mobile ? '80px 0' : '120px 0', background: 'var(--bg-2)', borderTop: '1px solid var(--line)' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: mobile ? '0 20px' : '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '35fr 65fr', gap: mobile ? '32px' : '80px', alignItems: 'flex-start' }}>

          <div style={{ position: mobile ? 'static' : 'sticky', top: '120px' }}>
            <div className="eyebrow" style={{ marginBottom: '20px', fontSize: mobile ? '11px' : '13px' }}>{t('testimonials.eyebrow')}</div>
            <h2 className="display" style={{ fontSize: mobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(48px, 6vw, 80px)' }}>
              <Accent text={t('testimonials.title')} />
            </h2>
            {!mobile && (
              <p style={{ fontSize: '14px', color: 'var(--fg-3)', lineHeight: 1.6, marginTop: '20px', maxWidth: '320px' }}>
                {t('testimonials.sub')}
              </p>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(2, 1fr)', gap: mobile ? '16px' : '20px' }}>
            {verbatims.map(v => <Card key={v.id} v={v} mobile={mobile} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
