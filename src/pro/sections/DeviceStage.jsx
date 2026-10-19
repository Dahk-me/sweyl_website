import React from 'react'
import { COPY } from '../copy'
import { DEVICE } from '../proShots'
import DeviceShot from './DeviceShot'

// La même capture sur les trois appareils, une seule fois sur la page.
const STAGE_SHOT = 'fiche'

export default function DeviceStage() {
  const T = COPY.trio
  return (
    <section className="pro-sec pro-trio">
      <div className="pro-in">
        <div className="pro-sh" data-reveal>
          <div className="eyebrow">{T.eyebrow}</div>
          <h2 className="display">{T.title}</h2>
          <p>{T.sub}</p>
        </div>
        <div className="pro-stage" data-reveal>
          <div className="pro-stage-laptop"><DeviceShot shot={STAGE_SHOT} device={DEVICE.laptop} /></div>
          <div className="pro-stage-tablet"><DeviceShot shot={STAGE_SHOT} device={DEVICE.tablet} /></div>
          <div className="pro-stage-phone"><DeviceShot shot={STAGE_SHOT} device={DEVICE.phone} /></div>
        </div>
        <div className="pro-caption">{T.caption}</div>
      </div>
    </section>
  )
}
