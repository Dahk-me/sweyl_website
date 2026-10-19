import React from 'react'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '../contexts/theme'
import ProPage from './ProPage'

// Origine distincte de sweyl.com, donc thème stocké à part : la page s'ouvre en sombre
// tant que le visiteur n'a rien choisi (défaut du ThemeProvider).
export default function ProApp() {
  return (
    <ThemeProvider>
      <ProPage />
      <Analytics />
    </ThemeProvider>
  )
}
