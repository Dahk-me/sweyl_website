import React from 'react'
import { useTheme } from '../../contexts/theme'
import { IconArrow, IconSun, IconMoon } from '../../components/Icons'
import SweylProMark from '../../components/SweylProMark'
import { COPY, DEMO_ANCHOR, MAIN_SITE_URL } from '../copy'

// Le logo du site, puis la marque Pro dans son cadre.
export function ProBrand({ size = 'md' }) {
  const { theme } = useTheme()
  return (
    <span className="pro-brand">
      <img src="/assets/LogoSweyl.svg" alt="" className="pro-logo" style={{ filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'none' }} />
      <SweylProMark size={size} />
    </span>
  )
}

// Le logo remonte en haut de la page Pro : un logo qui quitte la page perd le lead.
export default function ProHeader() {
  const { theme, toggleTheme } = useTheme()
  const H = COPY.header
  return (
    <header className="pro-header">
      <div className="pro-header-row">
        <a href="#top" aria-label="Sweyl Pro"><ProBrand /></a>
        <span className="pro-header-sp" />
        <a className="pro-header-back" href={MAIN_SITE_URL}>{H.back}</a>
        <button type="button" className="pro-theme" onClick={toggleTheme}>
          {theme === 'dark' ? <IconSun size={14} /> : <IconMoon size={14} />}
          <span className="pro-theme-label">{theme === 'dark' ? H.themeLight : H.themeDark}</span>
        </button>
        <a className="btn-primary" href={`#${DEMO_ANCHOR}`}>
          <span className="pro-long">{H.cta}</span>
          <span className="pro-short">{H.ctaShort}</span>
          <IconArrow size={12} />
        </a>
      </div>
    </header>
  )
}
