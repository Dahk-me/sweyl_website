import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../contexts/theme'
import { useMobile } from '../../hooks/useMobile'
import { CLUB_LOGOS, PARTNER_LOGOS } from '../../lib/logos'
import SectionHead from '../components/SectionHead'
import Marquee from '../components/Marquee'
import { ANCHORS, STATS, TESTIMONIALS, formatStat } from '../copy'

/**
 * La preuve : les chiffres des clubs, des mots du terrain, les clubs qui ont signé. Les chiffres
 * sont fixes et les citations sans guillemet géant ni pastille d'initiales : un compteur qui
 * monte ou un avatar inventé font « site généré » (TODO.md, lot 12).
 */
export default function Proof() {
  const { t, i18n } = useTranslation()
  const { theme } = useTheme()
  const mobile = useMobile()

  return (
    <section id={ANCHORS.proof} className="h-section h-proof">
      <div className="h-wrap">
        <SectionHead eyebrow={t('proof.eyebrow')} title={t('proof.title')} />

        <div className="h-stats" data-reveal>
          {STATS.map(stat => (
            <div key={stat.id} className="h-stat">
              <p className="h-stat-value">{formatStat(stat, i18n.language)}</p>
              <p className="h-stat-label mono">{t(`proof.stats.${stat.id}`)}</p>
            </div>
          ))}
        </div>

        <div className="h-quotes">
          {TESTIMONIALS.map((q, i) => (
            <figure key={q.id} className="h-quote" data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              <blockquote>{t(`proof.quotes.${q.id}.quote`)}</blockquote>
              <figcaption>
                <span className="h-quote-name">{q.name}</span>
                <span className="h-quote-role mono">{t(`proof.quotes.${q.id}.role`)}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="h-signed" data-reveal>
        <p className="eyebrow h-eyebrow h-wrap">{t('proof.signed')}</p>
        <Marquee
          items={CLUB_LOGOS}
          speed={mobile ? 18 : 22}
          renderItem={(c, i) => <img key={i} className="h-marquee-club" src={c.src} alt={c.alt} draggable={false} />}
        />
        <p className="h-partners-label mono h-wrap">{t('proof.partners')}</p>
        <Marquee
          items={PARTNER_LOGOS}
          speed={mobile ? 18 : 22}
          reverse
          renderItem={(p, i) => (
            <img key={i} className="h-marquee-partner" src={theme === 'light' && p.srcLight ? p.srcLight : p.src} alt={p.alt} draggable={false} />
          )}
        />
      </div>
    </section>
  )
}
