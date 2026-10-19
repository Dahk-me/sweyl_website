import React from 'react'
import { useReveal } from '../hooks/useReveal'
import { COPY } from './copy'
import ProHeader from './sections/ProHeader'
import ProHero from './sections/ProHero'
import DeviceStage from './sections/DeviceStage'
import Pillar from './sections/Pillar'
import ProLead from './sections/ProLead'
import ProFooter from './sections/ProFooter'

export default function ProPage() {
  useReveal()
  return (
    <div className="pro-page" id="top">
      <ProHeader />
      <main>
        <ProHero />
        <DeviceStage />
        {COPY.sections.map(s => <Pillar key={s.id} section={s} />)}
        <ProLead />
      </main>
      <ProFooter />
    </div>
  )
}
