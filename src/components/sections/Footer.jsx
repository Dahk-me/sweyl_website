import React from 'react'
import { useTheme } from '../../contexts/theme'
import logoSvg from '/assets/LogoGts.svg'

const columns = [
  { t: 'Produit', l: ['Vision', 'Capacités', 'Saison 26/27', 'FAQ'] },
  { t: 'Club', l: ['Présidents', 'Coachs', 'Joueurs', 'Partenaires'] },
  { t: 'Contact', l: ['Demander une démo', 'contact@gimmethescore.com', 'Mentions légales'] },
]

export default function Footer() {
  const { theme } = useTheme()
  return (
    <footer style={{ borderTop: '1px solid var(--line)', padding: '56px 0 36px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '60px', marginBottom: '48px' }}>
          <div>
            <img src={logoSvg} alt="GTS" style={{ height: '28px', width: 'auto', marginBottom: '14px', filter: theme === 'light' ? 'none' : 'brightness(0) invert(1)' }} />
            <p style={{ fontSize: '13px', color: 'var(--fg-3)', lineHeight: 1.6, maxWidth: '280px' }}>
              La plateforme du basket amateur français. Plus qu'un outil — l'écosystème de votre club.
            </p>
          </div>
          {columns.map(c => (
            <div key={c.t}>
              <div className="mono" style={{ fontSize: '10px', color: 'var(--fg-3)', letterSpacing: '0.18em', marginBottom: '14px' }}>{c.t.toUpperCase()}</div>
              {c.l.map(li => <div key={li} style={{ fontSize: '13px', color: 'var(--fg-2)', marginBottom: '8px' }}>{li}</div>)}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid var(--line)', flexWrap: 'wrap', gap: '8px' }}>
          <span className="mono" style={{ fontSize: '10px', color: 'var(--fg-4)', letterSpacing: '0.15em' }}>© 2026 GIMMETHESCORE</span>
          <span className="mono" style={{ fontSize: '10px', color: 'var(--fg-4)', letterSpacing: '0.15em' }}>FAIT À REIMS · POUR LES CLUBS</span>
        </div>
      </div>
    </footer>
  )
}
