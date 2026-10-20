import React from 'react'
import { useTranslation } from 'react-i18next'
import { DEVICE } from '../proShots'
import DeviceShot from './DeviceShot'
import Accent from '../../components/Accent'

export default function Pillar({ section }) {
  const { t } = useTranslation('pro')
  const text = key => t(`sections.${section.key}.${key}`)
  return (
    <section className={'pro-sec pro-pillar' + (section.flip ? ' pro-pillar--flip' : '')} id={section.id}>
      <div className="pro-in">
        <div className="pro-pillar-grid">
          <div className="pro-pillar-text pro-sh" data-reveal>
            <div className="eyebrow">{text('eyebrow')}</div>
            <h2 className="display"><Accent text={text('title')} accentClass="pro-accent" /></h2>
            <p>{text('sub')}</p>
            <dl className="pro-spec">
              {section.spec.map(id => <div key={id}><dt>{text(`spec.${id}.label`)}</dt><dd>{text(`spec.${id}.value`)}</dd></div>)}
            </dl>
          </div>
          <div className="pro-pillar-visual" data-reveal>
            <DeviceShot shot={section.shot} device={DEVICE.tablet} />
          </div>
        </div>
      </div>
    </section>
  )
}
