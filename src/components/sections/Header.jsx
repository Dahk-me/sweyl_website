import React from 'react'
import { useTheme } from '../../contexts/theme'
import { IconArrow } from '../Icons'
import { useMobile } from '../../hooks/useMobile'
import logoSvg from '/assets/LogoSweyl.svg'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const mobile = useMobile()
  const [inHero, setInHero] = React.useState(true)

  React.useEffect(() => {
    const onScroll = () => setInHero(window.scrollY < window.innerHeight * 0.85)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header style={{
      position: 'fixed',
      top: '36px',
      left: 0, right: 0,
      zIndex: 50,
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--line)',
      transition: 'all 0.3s',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        height: mobile ? '56px' : '72px',
        padding: mobile ? '0 20px' : '0 32px',
        maxWidth: '1280px',
        margin: '0 auto',
        gap: '16px',
      }}>
        {/* Logo — toujours à gauche */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <img src={logoSvg} alt="SWEYL" style={{ height: '22px', width: 'auto', transition: 'filter 0.3s', filter: inHero || theme === 'dark' ? 'brightness(0) invert(1)' : 'none' }} />
          {!mobile && <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px', fontWeight: 600, letterSpacing: '0.3em', transition: 'color 0.3s', color: inHero || theme === 'dark' ? '#f5f4f1' : '#100f0d' }}>SWEYL</span>}
        </div>

        {/* Centre — SWEYL sur mobile, nav sur desktop */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {mobile ? (
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px', fontWeight: 600, letterSpacing: '0.3em', transition: 'color 0.3s', color: inHero || theme === 'dark' ? '#f5f4f1' : '#100f0d' }}>SWEYL</span>
          ) : (
            <nav style={{ display: 'flex', gap: '28px', fontSize: '13px', transition: 'color 0.3s', color: inHero || theme === 'dark' ? '#f5f4f1' : '#100f0d' }}>
              <a href="#vision">Vision</a>
              <a href="#season">Saison 26/27</a>
              <a href="#join">Contact</a>
            </nav>
          )}
        </div>

        {/* Actions — toujours à droite */}
        <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? '8px' : '16px', flexShrink: 0 }}>
          <button
            onClick={toggleTheme}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'transparent', border: '1px solid var(--line-2)',
              color: inHero || theme === 'dark' ? '#f5f4f1' : '#100f0d', padding: mobile ? '8px 10px' : '10px 14px',
              fontSize: '11px', borderRadius: '999px', transition: 'color 0.3s, border-color 0.3s', cursor: 'pointer',
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
