import React from 'react'
import { useTranslation } from 'react-i18next'
import { IconPlus } from '../Icons'
import { useMobile } from '../../hooks/useMobile'
import Accent from '../Accent'

// Dans l'ordre d'affichage ; question et réponse vivent dans faq.items.<id>.
const faqs = [
  'different', 'price', 'statistician', 'duration', 'mistakes', 'teams',
  'parents', 'transfer', 'devices', 'ffbb', 'history', 'onboarding',
]

export default function FAQ() {
  const mobile = useMobile()
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(-1)

  const title = (
    <>
      <div className="eyebrow" style={{ marginBottom: '20px', fontSize: mobile ? '11px' : '13px' }}>{t('faq.eyebrow')}</div>
      <h2 className="display" style={{ fontSize: mobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(48px, 6vw, 80px)' }}>
        <Accent text={t('faq.title')} />
      </h2>
    </>
  )

  const list = faqs.map((id, i) => (
    <div key={id} style={{ borderTop: '1px solid var(--line)', borderBottom: i === faqs.length - 1 ? '1px solid var(--line)' : 'none' }}>
      <button
        onClick={() => setOpen(open === i ? -1 : i)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', textAlign: 'left', gap: '16px', cursor: 'pointer' }}
      >
        <span style={{ fontSize: mobile ? '14px' : '17px', fontWeight: 500, lineHeight: 1.4 }}>{t(`faq.items.${id}.q`)}</span>
        <span style={{ color: 'var(--primary)', transition: 'transform 0.2s', transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)', flexShrink: 0 }}>
          <IconPlus size={mobile ? 18 : 20} />
        </span>
      </button>
      <div style={{ maxHeight: open === i ? '400px' : '0', overflow: 'hidden', transition: 'max-height 0.3s' }}>
        <p style={{ fontSize: mobile ? '13px' : '14px', color: 'var(--fg-2)', lineHeight: 1.65, paddingBottom: '18px' }}>{t(`faq.items.${id}.a`)}</p>
      </div>
    </div>
  ))

  return (
    <section id="faq" style={{ padding: mobile ? '80px 0' : '140px 0', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: mobile ? '0 20px' : '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '35fr 65fr', gap: mobile ? '36px' : '80px', alignItems: 'flex-start' }}>

          {/* Left 35% sticky title */}
          <div style={mobile ? {} : { position: 'sticky', top: '120px' }}>
            {title}
          </div>

          {/* Right 65% questions */}
          <div style={mobile ? { marginTop: '4px' } : {}}>
            {list}
          </div>

        </div>
      </div>
    </section>
  )
}
