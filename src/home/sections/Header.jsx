import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../contexts/theme'
import { IconArrow, IconSun, IconMoon } from '../../components/Icons'
import { useMobile } from '../../hooks/useMobile'
import logoSvg from '/assets/LogoSweyl.svg'
import SweylProMark from '../../components/SweylProMark'
import LanguageSwitch from '../../components/LanguageSwitch'
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
          {/* L'offre Pro, toujours visible : un bandeau disparaissait au premier défilement. */}
          <SweylProMark href={proUrl()} />
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
          <a href={`#${ANCHORS.join}`} className="btn-primary h-header-cta">
            {mobile ? t('cta.short') : t('cta.label')}
            {!mobile && <IconArrow size={12} stroke={2} />}
          </a>
        </div>
      </div>
    </header>
  )
}
