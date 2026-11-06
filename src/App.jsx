import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from './contexts/theme'
import HomePage from './home/HomePage'
import LegalPage from './pages/LegalPage'
import { LEGAL_DOCUMENTS } from './legal/documents'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {Object.values(LEGAL_DOCUMENTS).map(document => (
            <Route key={document.id} path={document.route} element={<LegalPage document={document} />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </ThemeProvider>
  )
}
