import React from 'react'
import { useTheme } from '../../contexts/theme'
import { IconArrow } from '../Icons'
import logoSvg from '/assets/LogoGts.svg'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  return (
    <header style={{ position: 'fixed', top: '36px', left: 0, right: 0, zIndex: 50, background: 'var(--bg-glass)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--line)', transition: 'all 0.3s' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px', padding: '0 32px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={logoSvg} alt="GTS" style={{ height: '26px', width: 'auto', filter: theme === 'light' ? 'none' : 'brightness(0) invert(1)' }} />
          <span className="mono" style={{ fontSize: '10px', color: 'var(--fg-3)', letterSpacing: '0.2em' }}>GIMMETHESCORE</span>
        </div>
        <nav style={{ display: 'flex', gap: '28px', fontSize: '13px', color: 'var(--fg-2)' }}>
          <a href="#vision">Vision</a>
          <a href="#capacities">Capacités</a>
          <a href="#community">Club</a>
          <a href="#season">Saison 26/27</a>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={toggleTheme} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', border: '1px solid var(--line-2)', color: 'var(--fg-2)', padding: '10px 14px', fontSize: '12px', borderRadius: '999px', transition: 'all 0.2s', cursor: 'pointer' }}>
            {theme === 'dark' ? '☀️ Clair' : '🌙 Sombre'}
          </button>
          <a href="#join" className="btn-primary" style={{ padding: '10px 18px', fontSize: '12px' }}>
            Demander une démo<IconArrow size={12} />
          </a>
        </div>
      </div>
    </header>
  )
}
