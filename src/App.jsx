import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from './contexts/theme'
import CountdownBar from './components/sections/CountdownBar'
import Header from './components/sections/Header'
import Hero from './components/sections/Hero'
import ClubLife from './components/sections/ClubLife'
import SocialProof from './components/sections/SocialProof'
import Vision from './components/sections/Vision'
import ForWho from './components/sections/ForWho'
import Testimonials from './components/sections/Testimonials'
import Season from './components/sections/Season'
import Lead from './components/sections/Lead'
import FAQ from './components/sections/FAQ'
import Footer from './components/sections/Footer'
import MentionsLegales from './pages/MentionsLegales'

const Home = () => {
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
      <Testimonials />
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </ThemeProvider>
  )
}
