import React from 'react'
import { useTranslation } from 'react-i18next'
import Accent from '../../components/Accent'
import SectionHead from '../components/SectionHead'
import JoinButton from '../components/JoinButton'
import { ANCHORS, STEPS } from '../copy'

/** Trois gestes, du club activé au match que tout le monde suit. Le numéro est un repère écrit, pas un rond décoratif. */
export default function HowItWorks() {
  const { t } = useTranslation()
  return (
    <section id={ANCHORS.season} className="h-section h-how">
      <div className="h-wrap">
        <SectionHead eyebrow={t('steps.eyebrow')} title={t('steps.title')} />

        <ol className="h-steps">
          {STEPS.map((id, i) => (
            <li key={id} className="h-step" data-reveal style={{ transitionDelay: `${i * 120}ms` }}>
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
