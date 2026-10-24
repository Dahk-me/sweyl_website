import React from 'react'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'
import { DEMO_ANCHOR, LEAD_PERKS, PRO_SECTIONS } from './copy'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import ProHeader from './sections/ProHeader'
import ProHero from './sections/ProHero'
import DeviceStage from './sections/DeviceStage'
import Pillar from './sections/Pillar'
import ProLead from './sections/ProLead'
import ProFooter from './sections/ProFooter'
import StickyCta from '../components/StickyCta'

// La réassurance de la barre du bas : les atouts déjà listés au-dessus du formulaire, sans en
// écrire de nouveaux (la seule phrase tarifaire permise y figure déjà). Sur téléphone, sans le tarif.
const SHORT_PERKS = ['demo', 'reply']

export default function ProPage() {
  const { t } = useTranslation('pro')
  const perks = ids => ids.map(id => t(`lead.perks.${id}`)).join(' · ')
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
      <StickyCta href={`#${DEMO_ANCHOR}`} label={t('hero.cta')} micro={perks(LEAD_PERKS)} microShort={perks(SHORT_PERKS)} />
    </div>
  )
}
