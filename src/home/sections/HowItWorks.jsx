import React from 'react'
import { useTranslation } from 'react-i18next'
import Accent from '../../components/Accent'
import SectionHead from '../components/SectionHead'
import JoinButton from '../components/JoinButton'
import { ANCHORS, STEPS } from '../copy'

/**
 * Trois gestes, du club activé au match que tout le monde suit, reliés par un fil : trois points
 * sur une ligne qui se remplit en entrant dans l'écran. Horizontal sur ordinateur, vertical sur
 * mobile (*Ismail, 24/10/2026*). Le numéro reste un repère écrit (« Geste 1 »), pas dans le point.
 */
export default function HowItWorks() {
  const { t } = useTranslation()
  return (
    <section id={ANCHORS.season} className="h-section h-how">
      <div className="h-wrap">
        <SectionHead eyebrow={t('steps.eyebrow')} title={t('steps.title')} />

        <ol className="h-steps">
          {STEPS.map((id, i) => (
            <li key={id} className="h-step" data-reveal style={{ transitionDelay: `${i * 120}ms` }}>
              <span className="h-step-node" aria-hidden="true" />
              <p className="h-step-label mono">{t('steps.label', { number: i + 1 })}</p>
              <h3>{t(`steps.items.${id}.title`)}</h3>
              <p className="h-step-text">{t(`steps.items.${id}.text`)}</p>
            </li>
          ))}
        </ol>

        <div className="h-how-end" data-reveal>
          <p className="display h-how-closing"><Accent text={t('steps.closing')} /></p>
          <JoinButton />
        </div>
      </div>
    </section>
  )
}
