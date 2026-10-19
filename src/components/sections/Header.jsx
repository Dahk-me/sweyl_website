import React from 'react'
import { useTheme } from '../../contexts/theme'
import { IconArrow, IconSun, IconMoon } from '../Icons'
import { useMobile } from '../../hooks/useMobile'
import logoSvg from '/assets/LogoSweyl.svg'

const PRO_URL = 'https://pro.sweyl.com'
// Hauteurs du bandeau Pro ; 44 px sur mobile, la cible tactile minimale du site.
const BANNER_HEIGHT = { desktop: 36, mobile: 44 }

/**
 * Bandeau de l'offre Pro, au-dessus du header. Toujours sombre, non fermable : fermé, il
 * disparaîtrait pour le coach qui revient après la démo. Il défile avec la page.
 */
function ProBanner({ height }) {
  return (
    <a className="pro-banner" href={PRO_URL} style={{ height }}>
      <span className="pro-banner-badge">PRO</span>
      <span className="pro-banner-text pro-banner-desktop"><b>Sweyl Pro</b> · La préparation des staffs, de la PN à la N1. Bientôt disponible.</span>
      <span className="pro-banner-text pro-banner-mobile"><b>Sweyl Pro</b> · Staffs PN à N1</span>
      <span className="pro-banner-go">Découvrir<IconArrow size={12} /></span>
    </a>
  )
}

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const mobile = useMobile()
  // Sur l'entrée, le hero porte déjà la marque en grand : le logo du header s'efface.
  const [inHero, setInHero] = React.useState(true)
  const bannerHeight = mobile ? BANNER_HEIGHT.mobile : BANNER_HEIGHT.desktop
  // Le header fixe reste sous le bandeau, puis reprend le haut dès que celui-ci est sorti.
  const [top, setTop] = React.useState(bannerHeight)

  React.useEffect(() => {
    const onScroll = () => {
      setInHero(window.scrollY < window.innerHeight * 0.85)
      setTop(Math.max(0, bannerHeight - window.scrollY))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [bannerHeight])

  return (
    <>
    <ProBanner height={bannerHeight} />
    <header style={{
      position: 'fixed',
      top,
      left: 0, right: 0,
      zIndex: 50,
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--line)',
      transition: 'background 0.3s, border-color 0.3s',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        height: mobile ? '56px' : '72px',
        padding: mobile ? '0 20px' : '0 32px',
        maxWidth: '1300px',
        margin: '0 auto',
        gap: '16px',
      }}>
        {/* Logo toujours à gauche */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, opacity: inHero ? 0 : 1, transition: 'opacity 0.4s' }}>
          <img src={logoSvg} alt="SWEYL" style={{ height: '22px', width: 'auto', filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'none' }} />
          {!mobile && <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px', fontWeight: 600, letterSpacing: '0.3em', color: 'var(--fg)' }}>SWEYL</span>}
        </div>

        {/* Centre SWEYL sur mobile, nav sur desktop */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {mobile ? (
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px', fontWeight: 600, letterSpacing: '0.3em', transition: 'opacity 0.4s', opacity: inHero ? 0 : 1, color: 'var(--fg)' }}>SWEYL</span>
          ) : (
            <nav style={{ display: 'flex', gap: '28px', fontSize: '13px', color: 'var(--fg)' }}>
              <a href="#vision">Vision</a>
              <a href="#season">Saison 26/27</a>
              <a href="#join">Contact</a>
            </nav>
          )}
        </div>

        {/* Actions toujours à droite */}
        <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? '8px' : '16px', flexShrink: 0 }}>
          <button
            onClick={toggleTheme}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'transparent', border: '1px solid var(--line-2)',
              color: 'var(--fg)', padding: mobile ? '8px 10px' : '10px 14px',
              fontSize: '11px', borderRadius: '999px', cursor: 'pointer',
            }}
          >
            {theme === 'dark' ? <IconSun size={14} /> : <IconMoon size={14} />}
            {!mobile && (theme === 'dark' ? ' Clair' : ' Sombre')}
          </button>
          <a href="#join" className="btn-primary" style={{ padding: mobile ? '10px 14px' : '10px 18px', fontSize: '12px' }}>
            {mobile ? 'Rejoindre' : "Rejoindre l'expérience"}{!mobile && <IconArrow size={12} />}
          </a>
        </div>
      </div>
    </header>
    </>
  )
}
