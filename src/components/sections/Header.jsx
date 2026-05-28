import React from 'react'
import { useTheme } from '../../contexts/theme'
import { IconArrow } from '../Icons'
import { useMobile } from '../../hooks/useMobile'
import logoSvg from '/assets/LogoGts.svg'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const mobile = useMobile()

  return (
    <header style={{
      position: 'fixed',
      top: '36px',
      left: 0, right: 0,
      zIndex: 50,
      background: 'var(--bg-glass)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--line)',
      transition: 'all 0.3s',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: mobile ? '56px' : '72px',
        padding: mobile ? '0 20px' : '0 32px',
        maxWidth: '1280px',
        margin: '0 auto',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={logoSvg} alt="GTS" style={{ height: '22px', width: 'auto', filter: theme === 'light' ? 'none' : 'brightness(0) invert(1)' }} />
          {!mobile && <span className="mono" style={{ fontSize: '10px', color: 'var(--fg-3)', letterSpacing: '0.2em' }}>GIMMETHESCORE</span>}
        </div>

        {/* Nav — desktop only */}
        {!mobile && (
          <nav style={{ display: 'flex', gap: '28px', fontSize: '13px', color: 'var(--fg-2)' }}>
            <a href="#vision">Vision</a>
            <a href="#capacities">Capacités</a>
            <a href="#community">Club</a>
            <a href="#season">Saison 26/27</a>
          </nav>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? '8px' : '16px' }}>
          <button
            onClick={toggleTheme}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'transparent', border: '1px solid var(--line-2)',
              color: 'var(--fg-2)', padding: mobile ? '8px 10px' : '10px 14px',
              fontSize: '11px', borderRadius: '999px', transition: 'all 0.2s', cursor: 'pointer',
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
            {!mobile && (theme === 'dark' ? ' Clair' : ' Sombre')}
          </button>
          <a href="#join" className="btn-primary" style={{ padding: mobile ? '10px 14px' : '10px 18px', fontSize: '12px' }}>
            {mobile ? 'Démo' : 'Demander une démo'}{!mobile && <IconArrow size={12} />}
          </a>
        </div>
      </div>
    </header>
  )
}
