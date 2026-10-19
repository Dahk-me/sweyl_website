import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deux entrées : le site (index.html) et l'offre Pro (pro.html, servie sur pro.sweyl.com
// par middleware.js). Chacune porte ses propres balises d'aperçu de lien.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        pro: resolve(import.meta.dirname, 'pro.html'),
      },
    },
  },
})
