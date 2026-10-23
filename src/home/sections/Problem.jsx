import React from 'react'
import { useTranslation } from 'react-i18next'
import Accent from '../../components/Accent'
import SectionHead from '../components/SectionHead'
import { ANCHORS, PROBLEMS, seasonProgress } from '../copy'

/** Faire ressentir la douleur : coacher et diriger sans données. Puis la saison qui file. */
export default function Problem() {
  const { t, i18n } = useTranslation()
  const { season, ratio } = seasonProgress()
  const percent = new Intl.NumberFormat(i18n.language, { style: 'percent', maximumFractionDigits: 0 }).format(ratio)

  return (
    <section id={ANCHORS.problem} className="h-section h-problem">
      <div className="h-wrap">
        <SectionHead eyebrow={t('problem.eyebrow')} title={t('problem.title')} sub={t('problem.intro')} />

        <div className="h-problem-grid">
          {PROBLEMS.map(({ id, Icon }, i) => (
            <article key={id} className="h-problem-card" data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="h-problem-num display" aria-hidden="true">0{i + 1}</span>
              <span className="h-problem-icon"><Icon size={22} stroke={1.8} /></span>
              <h3>{t(`problem.cards.${id}.title`)}</h3>
              <p>{t(`problem.cards.${id}.text`)}</p>
            </article>
          ))}
        </div>

        <div className="h-problem-end" data-reveal>
          <p className="display h-problem-transition"><Accent text={t('problem.transition')} /></p>
          <div className="h-season" style={{ '--progress': ratio }}>
            <div className="h-season-track"><span className="h-season-fill" /></div>
            <p className="h-season-legend mono">{t('problem.season', { season, percent })}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
