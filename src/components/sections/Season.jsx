import React from 'react'
import { useTranslation } from 'react-i18next'
import { useMobile } from '../../hooks/useMobile'
import Accent from '../Accent'

const roadmap = ['kickoff', 'setup', 'tests', 'firstGame']

export default function Season() {
  const mobile = useMobile()
  const { t } = useTranslation()

  return (
    <section id="season" style={{ padding: mobile ? '80px 0' : '140px 0', position: 'relative', background: 'var(--bg)' }}>
      <div style={{ position: 'relative', maxWidth: '1300px', margin: '0 auto', padding: mobile ? '0 20px' : '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '35fr 65fr', gap: mobile ? '40px' : '80px', alignItems: 'flex-start' }}>

          {/* Left sticky title */}
          <div style={mobile ? {} : { position: 'sticky', top: '120px' }}>
            <div className="mono" style={{ fontSize: '10px', color: 'var(--primary)', letterSpacing: '0.2em', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {t('season.eyebrow')}
            </div>
            <h2 className="display" style={{ fontSize: mobile ? 'clamp(38px, 11vw, 64px)' : 'clamp(48px, 6vw, 96px)' }}>
              <Accent text={t('season.title')} />
            </h2>
          </div>

          {/* Right roadmap */}
          <div>
            <p style={{ fontSize: mobile ? '14px' : '15px', lineHeight: 1.6, color: 'var(--fg-2)', marginBottom: '28px' }}>
              {t('season.intro')}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {roadmap.map((step, i) => (
                <div key={step} style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: '16px', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--line)' }}>
                  <span className="mono" style={{ fontSize: '10px', color: 'var(--primary)', letterSpacing: '0.18em' }}>{t('season.step', { number: i + 1 })}</span>
                  <span style={{ fontSize: '13px', color: 'var(--fg-2)' }}>{t(`season.steps.${step}`)}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
