import React from 'react'
import { DEVICE } from '../proShots'
import DeviceShot from './DeviceShot'

export default function Pillar({ section }) {
  return (
    <section className={'pro-sec pro-pillar' + (section.flip ? ' pro-pillar--flip' : '')} id={section.id}>
      <div className="pro-in">
        <div className="pro-pillar-grid">
          <div className="pro-pillar-text pro-sh" data-reveal>
            <div className="eyebrow">{section.eyebrow}</div>
            <h2 className="display">{section.title}</h2>
            <p>{section.sub}</p>
            <dl className="pro-spec">
              {section.spec.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
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
