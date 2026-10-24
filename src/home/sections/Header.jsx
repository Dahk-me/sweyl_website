import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../contexts/theme'
import { IconSun, IconMoon } from '../../components/Icons'
import { useMobile } from '../../hooks/useMobile'
import logoSvg from '/assets/LogoSweyl.svg'
import LanguageSwitch from '../../components/LanguageSwitch'
import SiteSwitch from '../../components/SiteSwitch'
import { proUrl } from '../../lib/siteUrls'
import { ANCHORS, NAV } from '../copy'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const mobile = useMobile()
  const { t } = useTranslation(['home', 'common'])
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`h-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="h-header-bar">
        {/* Le logo reste toujours visible, hero compris (arbitrage d'Ismail du 19/10/2026). */}
        <a href={`#${ANCHORS.top}`} className="h-header-brand" aria-label="SWEYL">
          <img src={logoSvg} alt="" style={{ filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'none' }} />
          {!mobile && <span>SWEYL</span>}
        </a>

        {!mobile && (
          <nav className="h-header-nav">
            {NAV.map(item => <a key={item.id} href={`#${item.anchor}`}>{t(`header.nav.${item.id}`)}</a>)}
          </nav>
        )}

        <div className="h-header-actions">
          <LanguageSwitch compact={mobile} />
          <button
            type="button"
            onClick={toggleTheme}
            className="h-header-theme"
            aria-label={t(theme === 'dark' ? 'common:theme.light' : 'common:theme.dark')}
          >
            {theme === 'dark' ? <IconSun size={14} /> : <IconMoon size={14} />}
            {!mobile && <span>{t(theme === 'dark' ? 'common:theme.light' : 'common:theme.dark')}</span>}
          </button>
          {/* L'offre Pro, toujours visible et tout à droite, symétrique du « SWEYL CLUB » du Pro.
              Le bouton « Rejoindre » est parti dans la barre du bas (Ismail, 24/10/2026). */}
          <SiteSwitch href={proUrl()} suffix="PRO" label="Sweyl Pro" />
        </div>
      </div>
    </header>
  )
}
