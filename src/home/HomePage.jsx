import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useReveal } from '../hooks/useReveal'
import Header from './sections/Header'
import Hero from './sections/Hero'
import Problem from './sections/Problem'
import Transformation from './sections/Transformation'
import HowItWorks from './sections/HowItWorks'
import ForWho from './sections/ForWho'
import Proof from './sections/Proof'
import BeforeAfter from './sections/BeforeAfter'
import FAQ from './sections/FAQ'
import Join from './sections/Join'
import Footer from './sections/Footer'
import ExitIntent from './sections/ExitIntent'
import StickyCta from '../components/StickyCta'
import { clubSignupUrl } from '../lib/siteUrls'
import './home.css'

/**
 * sweyl.com, pensé pour convertir (brief du 23/10/2026) : créer le besoin, prouver la
 * transformation, lever les freins, une seule action, créer son club dans l'application.
 * L'ordre des sections est celui du brief.
 */
export default function HomePage() {
  const { t } = useTranslation()
  useDocumentMeta('home')
  useReveal()

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Transformation />
        <HowItWorks />
        <ForWho />
        <Proof />
        <BeforeAfter />
        <FAQ />
        <Join />
      </main>
      <Footer />
      <StickyCta href={clubSignupUrl()} label={t('cta.label')} micro={t('cta.micro')} microShort={t('cta.microShort')} />
      <ExitIntent />
    </>
  )
}
