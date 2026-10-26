import React from 'react'
import { useTranslation } from 'react-i18next'
import AppShot from '../../components/AppShot'
import SectionHead from '../components/SectionHead'
import { ANCHORS, BENEFITS } from '../copy'

/**
 * La transformation : quatre bénéfices, pas des fonctionnalités, à côté de la vraie capture du
 * match en direct. Une liste à filets, le rôle en petit, la phrase en gras : ni icône, ni halo,
 * ni fil décoratif.
 */
export default function Transformation() {
  const { t } = useTranslation()

  return (
    <section id={ANCHORS.vision} className="h-section h-section--alt h-vision">
      <div className="h-wrap">
        <SectionHead eyebrow={t('vision.eyebrow')} title={t('vision.title')} sub={t('vision.intro')} />

        <div className="h-vision-layout">
          <div className="h-vision-phone" data-reveal>
            <AppShot slot="vision" width="clamp(220px, 22vw, 290px)" />
          </div>
          <ul className="h-benefits">
            {BENEFITS.map((id, i) => (
              <li key={id} className="h-benefit" data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                <p className="h-benefit-label mono">{t(`vision.benefits.${id}.label`)}</p>
                <div>
                  <h3>{t(`vision.benefits.${id}.title`)}</h3>
                  <p className="h-benefit-text">{t(`vision.benefits.${id}.text`)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
