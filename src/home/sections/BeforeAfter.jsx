import React from 'react'
import { useTranslation } from 'react-i18next'
import { IconCheck, IconX } from '../../components/Icons'
import SectionHead from '../components/SectionHead'
import JoinButton from '../components/JoinButton'
import { BEFORE_AFTER } from '../copy'

/** Le contraste : chaque ligne d'avant se barre en entrant dans l'écran, sa réponse s'allume en face. */
export default function BeforeAfter() {
  const { t } = useTranslation()
  return (
    <section className="h-section h-section--alt h-ba-section">
      <div className="h-wrap">
        <SectionHead center eyebrow={t('beforeAfter.eyebrow')} title={t('beforeAfter.title')} />

        <div className="h-ba" role="table" aria-label={t('beforeAfter.label')}>
          <div className="h-ba-head" role="row">
            <span className="h-ba-head-before mono" role="columnheader"><IconX size={14} stroke={2.4} />{t('beforeAfter.before')}</span>
            <span className="h-ba-head-after mono" role="columnheader"><IconCheck size={14} stroke={2.4} />{t('beforeAfter.after')}</span>
          </div>
          {BEFORE_AFTER.map((id, i) => (
            <div key={id} className="h-ba-row" role="row" data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
              <span className="h-ba-cell h-ba-before" role="cell">
                <span className="h-ba-icon"><IconX size={12} stroke={2.6} /></span>
                <span className="h-ba-text">{t(`beforeAfter.rows.${id}.before`)}</span>
              </span>
              <span className="h-ba-cell h-ba-after" role="cell">
                <span className="h-ba-icon"><IconCheck size={12} stroke={2.6} /></span>
                <span className="h-ba-text">{t(`beforeAfter.rows.${id}.after`)}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="h-ba-end" data-reveal>
          <JoinButton align="center" />
        </div>
      </div>
    </section>
  )
}
