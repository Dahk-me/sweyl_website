import React from 'react'
import { ThemeProvider } from './contexts/theme'
import CountdownBar from './components/sections/CountdownBar'
import Header from './components/sections/Header'
import Hero from './components/sections/Hero'
import ClubLife from './components/sections/ClubLife'
import SocialProof from './components/sections/SocialProof'
import Vision from './components/sections/Vision'
import ForWho from './components/sections/ForWho'
import Season from './components/sections/Season'
import Lead from './components/sections/Lead'
import FAQ from './components/sections/FAQ'
import Footer from './components/sections/Footer'

const Page = () => {
  React.useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') })
    }, { threshold: 0.1 })
    document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <CountdownBar />
      <Header />
      <Hero />
      <ClubLife />
      <SocialProof />
      <Vision />
      <ForWho />
      <Season />
      <Lead />
      <FAQ />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  )
}
