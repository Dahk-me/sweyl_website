import React from 'react'
import { useTranslation } from 'react-i18next'
import SectionHead from '../components/SectionHead'
import JoinButton from '../components/JoinButton'
import { BEFORE_AFTER } from '../copy'

/**
 * Le contraste : chaque ligne d'avant se barre en entrant dans l'écran, sa réponse est en face.
 * Le barré et la couleur disent lequel est lequel, sans croix ni coche dans un rond.
 */
export default function BeforeAfter() {
  const { t } = useTranslation()
  return (
    <section className="h-section h-section--alt h-ba-section">
      <div className="h-wrap">
        <SectionHead eyebrow={t('beforeAfter.eyebrow')} title={t('beforeAfter.title')} />

        <div className="h-ba" role="table" aria-label={t('beforeAfter.label')}>
          <div className="h-ba-head" role="row">
            <span className="h-ba-head-before mono" role="columnheader">{t('beforeAfter.before')}</span>
            <span className="h-ba-head-after mono" role="columnheader">{t('beforeAfter.after')}</span>
          </div>
          {BEFORE_AFTER.map((id, i) => (
            <div key={id} className="h-ba-row" role="row" data-reveal style={{ transitionDelay: `${i * 60}ms` }}>
              <span className="h-ba-cell h-ba-before" role="cell">{t(`beforeAfter.rows.${id}.before`)}</span>
              <span className="h-ba-cell h-ba-after" role="cell">{t(`beforeAfter.rows.${id}.after`)}</span>
            </div>
          ))}
        </div>

        <div className="h-ba-end" data-reveal>
          <JoinButton />
        </div>
      </div>
    </section>
  )
}
