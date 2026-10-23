import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from './contexts/theme'
import HomePage from './home/HomePage'
import MentionsLegales from './pages/MentionsLegales'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </ThemeProvider>
  )
}
