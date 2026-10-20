import React from 'react'
import { useTranslation } from 'react-i18next'
import { DEVICE } from '../proShots'
import DeviceShot from './DeviceShot'
import Accent from '../../components/Accent'

// La même capture sur les trois appareils, une seule fois sur la page.
const STAGE_SHOT = 'fiche'

export default function DeviceStage() {
  const { t } = useTranslation('pro')
  return (
    <section className="pro-sec pro-trio">
      <div className="pro-in">
        <div className="pro-sh" data-reveal>
          <div className="eyebrow">{t('trio.eyebrow')}</div>
          <h2 className="display"><Accent text={t('trio.title')} accentClass="pro-accent" /></h2>
          <p>{t('trio.sub')}</p>
        </div>
        <div className="pro-stage" data-reveal>
          <div className="pro-stage-laptop"><DeviceShot shot={STAGE_SHOT} device={DEVICE.laptop} /></div>
          <div className="pro-stage-tablet"><DeviceShot shot={STAGE_SHOT} device={DEVICE.tablet} /></div>
          <div className="pro-stage-phone"><DeviceShot shot={STAGE_SHOT} device={DEVICE.phone} /></div>
        </div>
        <div className="pro-caption">{t('trio.caption')}</div>
      </div>
    </section>
  )
}
