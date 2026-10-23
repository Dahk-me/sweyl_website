import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../contexts/theme'
import { CLUB_LOGOS, PARTNER_LOGOS } from '../../lib/logos'
import SectionHead from '../components/SectionHead'
import { useCountUp, useSeenOnce } from '../hooks'
import { ANCHORS, STATS, TESTIMONIALS, formatStat } from '../copy'

const Stat = ({ stat, start }) => {
  const { t, i18n } = useTranslation()
  const value = useCountUp(stat.value, start)
  return (
    <div className="h-stat">
      <p className="h-stat-value">{formatStat(stat, i18n.language, value)}</p>
      <p className="h-stat-label mono">{t(`proof.stats.${stat.id}`)}</p>
    </div>
  )
}

const initials = name => name.split(' ').map(w => w[0]).join('').slice(0, 2)

/** La preuve : des chiffres qui montent, des mots du terrain, les clubs qui ont signé. */
export default function Proof() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const statsRef = React.useRef(null)
  const seen = useSeenOnce(statsRef)

  return (
    <section id={ANCHORS.proof} className="h-section h-proof">
      <div className="h-wrap">
        <SectionHead eyebrow={t('proof.eyebrow')} title={t('proof.title')} />

        <div className="h-stats" ref={statsRef} data-reveal>
          {STATS.map(stat => <Stat key={stat.id} stat={stat} start={seen} />)}
        </div>

        <div className="h-quotes">
          {TESTIMONIALS.map((q, i) => (
            <figure key={q.id} className="h-quote" data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="h-quote-mark" aria-hidden="true">“</span>
              <blockquote>{t(`proof.quotes.${q.id}.quote`)}</blockquote>
              <figcaption>
                <span className="h-quote-avatar" aria-hidden="true">{initials(q.name)}</span>
                <span>
                  <span className="h-quote-name">{q.name}</span>
                  <span className="h-quote-role mono">{t(`proof.quotes.${q.id}.role`)}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="h-signed" data-reveal>
          <p className="eyebrow h-eyebrow">{t('proof.signed')}</p>
          <div className="h-logos">
            {CLUB_LOGOS.map(c => <img key={c.src} src={c.src} alt={c.alt} loading="lazy" decoding="async" />)}
          </div>
          <p className="h-partners-label mono">{t('proof.partners')}</p>
          <div className="h-logos h-logos--partners">
            {PARTNER_LOGOS.map(p => (
              <img key={p.src} src={theme === 'light' && p.srcLight ? p.srcLight : p.src} alt={p.alt} loading="lazy" decoding="async" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
