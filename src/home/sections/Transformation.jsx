import React from 'react'
import { useTranslation } from 'react-i18next'
import AppShot from '../../components/AppShot'
import SectionHead from '../components/SectionHead'
import { ANCHORS, BENEFITS } from '../copy'

const Benefit = ({ id, Icon, side, delay }) => {
  const { t } = useTranslation()
  return (
    <article className={`h-benefit h-benefit--${side}`} data-reveal style={{ transitionDelay: `${delay}ms` }}>
      <span className="h-benefit-icon"><Icon size={26} stroke={1.7} /></span>
      <div>
        <p className="h-benefit-label mono">{t(`vision.benefits.${id}.label`)}</p>
        <h3>{t(`vision.benefits.${id}.title`)}</h3>
        <p className="h-benefit-text">{t(`vision.benefits.${id}.text`)}</p>
      </div>
    </article>
  )
}

/**
 * La transformation : quatre bénéfices, pas des fonctionnalités, reliés au même match. Sur
 * ordinateur, deux de chaque côté du téléphone ; sur mobile, le téléphone d'abord.
 */
export default function Transformation() {
  const { t } = useTranslation()
  const left = BENEFITS.slice(0, 2)
  const right = BENEFITS.slice(2)

  return (
    <section id={ANCHORS.vision} className="h-section h-section--alt h-vision">
      <div className="h-wrap">
        <SectionHead center eyebrow={t('vision.eyebrow')} title={t('vision.title')} sub={t('vision.intro')} />

        <div className="h-vision-layout">
          <div className="h-benefits">
            {left.map((b, i) => <Benefit key={b.id} {...b} side="left" delay={i * 90} />)}
          </div>
          <div className="h-vision-phone" data-reveal>
            <span className="h-vision-halo" aria-hidden="true" />
            <AppShot slot="vision" width="clamp(210px, 22vw, 280px)" />
          </div>
          <div className="h-benefits">
            {right.map((b, i) => <Benefit key={b.id} {...b} side="right" delay={180 + i * 90} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
