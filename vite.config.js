import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deux entrées : le site (index.html) et l'offre Pro (pro.html, servie sur pro.sweyl.com
// par middleware.js). Chacune porte ses propres balises d'aperçu de lien.
export default defineConfig({
  plugins: [react()],
  // En local, la page /cgu lit l'API qui tourne sur le poste (TERMS_API_PATH, src/legal/documents.js) ;
  // en production, c'est la réécriture de vercel.json.
  server: {
    proxy: {
      '/legal-api/terms/current': {
        target: 'https://localhost:7125',
        changeOrigin: true,
        secure: false,
        // Garde la langue demandée (?lang=…), seule la route change.
        rewrite: path => path.replace('/legal-api/terms/current', '/api/v2/terms/current'),
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        pro: resolve(import.meta.dirname, 'pro.html'),
      },
    },
  },
})
