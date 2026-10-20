import React from 'react'
import { useReveal } from '../hooks/useReveal'
import { PRO_SECTIONS } from './copy'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import ProHeader from './sections/ProHeader'
import ProHero from './sections/ProHero'
import DeviceStage from './sections/DeviceStage'
import Pillar from './sections/Pillar'
import ProLead from './sections/ProLead'
import ProFooter from './sections/ProFooter'

export default function ProPage() {
  useReveal()
  useDocumentMeta('pro')
  return (
    <div className="pro-page" id="top">
      <ProHeader />
      <main>
        <ProHero />
        <DeviceStage />
        {PRO_SECTIONS.map(s => <Pillar key={s.id} section={s} />)}
        <ProLead />
      </main>
      <ProFooter />
    </div>
  )
}
