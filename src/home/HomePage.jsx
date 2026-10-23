import React from 'react'
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
import StickyJoin from './sections/StickyJoin'
import ExitIntent from './sections/ExitIntent'
import './home.css'

/**
 * sweyl.com, pensé pour convertir (brief du 23/10/2026) : créer le besoin, prouver la
 * transformation, lever les freins, une seule action. L'ordre des sections est celui du brief.
 */
export default function HomePage() {
  useDocumentMeta('home')
  useReveal()
  // Le rôle choisi sur une carte « Pour qui » ; `at` relance le pré-remplissage au même rôle.
  const [intent, setIntent] = React.useState(null)
  const join = React.useCallback(role => { if (role) setIntent({ role, at: Date.now() }) }, [])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Transformation />
        <HowItWorks />
        <ForWho onJoin={join} />
        <Proof />
        <BeforeAfter />
        <FAQ />
        <Join intent={intent} />
      </main>
      <Footer />
      <StickyJoin />
      <ExitIntent />
    </>
  )
}
