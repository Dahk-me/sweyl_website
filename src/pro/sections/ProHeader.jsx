import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../contexts/theme'
import { IconSun, IconMoon } from '../../components/Icons'
import SweylProMark from '../../components/SweylProMark'
import SiteSwitch from '../../components/SiteSwitch'
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
// À droite, symétrique de sweyl.com : le passage vers l'autre site, « SWEYL CLUB ». « Réserver une
// démo » est parti dans la barre du bas, affichée dès qu'on défile (Ismail, 24/10/2026).
export default function ProHeader() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation(['pro', 'common'])
  return (
    <header className="pro-header">
      <div className="pro-header-row">
        <a href="#top" aria-label="Sweyl Pro" className="pro-header-brand"><ProBrand /></a>
        <span className="pro-header-sp" />
        <LanguageSwitch />
        <button type="button" className="pro-theme" onClick={toggleTheme}>
          {theme === 'dark' ? <IconSun size={14} /> : <IconMoon size={14} />}
          <span className="pro-theme-label">{t(theme === 'dark' ? 'common:theme.light' : 'common:theme.dark')}</span>
        </button>
        <SiteSwitch href={mainSiteUrl()} suffix="CLUB" label={t('header.back')} />
      </div>
    </header>
  )
}
