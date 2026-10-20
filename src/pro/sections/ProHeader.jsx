import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../contexts/theme'
import { IconArrow, IconSun, IconMoon } from '../../components/Icons'
import SweylProMark from '../../components/SweylProMark'
import { DEMO_ANCHOR } from '../copy'
import { mainSiteUrl } from '../../lib/siteUrls'
import LanguageSwitch from '../../components/LanguageSwitch'

// Le logo du site, puis la marque Pro dans son cadre.
export function ProBrand() {
  const { theme } = useTheme()
  return (
    <span className="pro-brand">
      <img src="/assets/LogoSweyl.svg" alt="" className="pro-logo" style={{ filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'none' }} />
      <SweylProMark />
    </span>
  )
}

// Le logo remonte en haut de la page Pro : un logo qui quitte la page perd le lead.
export default function ProHeader() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation(['pro', 'common'])
  return (
    <header className="pro-header">
      <div className="pro-header-row">
        <a href="#top" aria-label="Sweyl Pro" className="pro-header-brand"><ProBrand /></a>
        <span className="pro-header-sp" />
        <a className="pro-header-back" href={mainSiteUrl()}>{t('header.back')}</a>
        <LanguageSwitch />
        <button type="button" className="pro-theme" onClick={toggleTheme}>
          {theme === 'dark' ? <IconSun size={14} /> : <IconMoon size={14} />}
          <span className="pro-theme-label">{t(theme === 'dark' ? 'common:theme.light' : 'common:theme.dark')}</span>
        </button>
        <a className="btn-primary" href={`#${DEMO_ANCHOR}`}>
          <span className="pro-long">{t('header.cta')}</span>
          <span className="pro-short">{t('header.ctaShort')}</span>
          <IconArrow size={12} />
        </a>
      </div>
    </header>
  )
}
