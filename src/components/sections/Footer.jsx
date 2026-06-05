import React from 'react'
import { useTheme } from '../../contexts/theme'
import { useMobile } from '../../hooks/useMobile'
import logoSvg from '/assets/LogoSweyl.svg'

const columns = [
  {
    t: 'Produit',
    l: [
      { label: 'Vision', href: '#vision' },
      { label: 'Pour qui ?', href: '#for-who' },
      { label: 'Saison 26/27', href: '#season' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    t: 'Contact',
    l: [
      { label: 'Demander une démo', href: '#join' },
      { label: 'contact@sweyl.com', href: 'mailto:contact@sweyl.com' },
      { label: 'Mentions légales', href: '#' },
    ],
  },
]

export default function Footer() {
  const { theme } = useTheme()
  const mobile = useMobile()

  return (
    <footer style={{ borderTop: '1px solid var(--line)', padding: mobile ? '48px 0 28px' : '56px 0 36px' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: mobile ? '0 20px' : '0 32px' }}>
        {mobile ? (
          /* Mobile layout: logo full width, then 3 cols 3 */
          <div style={{ marginBottom: '40px' }}>
            <div style={{ marginBottom: '28px' }}>
              <img src={logoSvg} alt="SWEYL" style={{ height: '24px', width: 'auto', marginBottom: '12px', filter: theme === 'light' ? 'none' : 'brightness(0) invert(1)' }} />
              <p style={{ fontSize: '12px', color: 'var(--fg-3)', lineHeight: 1.6 }}>
                La plateforme du basket amateur français.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
              {columns.map(c => (
                <div key={c.t}>
                  <div className="mono" style={{ fontSize: '9px', color: 'var(--fg-3)', letterSpacing: '0.15em', marginBottom: '12px' }}>{c.t.toUpperCase()}</div>
                  {c.l.map(li => <a key={li.label} href={li.href} style={{ display: 'block', fontSize: '12px', color: 'var(--fg-2)', marginBottom: '8px', lineHeight: 1.3 }}>{li.label}</a>)}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Desktop layout: 4 columns */
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '60px', marginBottom: '48px' }}>
            <div>
              <img src={logoSvg} alt="SWEYL" style={{ height: '28px', width: 'auto', marginBottom: '14px', filter: theme === 'light' ? 'none' : 'brightness(0) invert(1)' }} />
              <p style={{ fontSize: '13px', color: 'var(--fg-3)', lineHeight: 1.6, maxWidth: '280px' }}>
                La plateforme du basket amateur français. Plus qu'un outil, l'écosystème de votre club.
              </p>
            </div>
            {columns.map(c => (
              <div key={c.t}>
                <div className="mono" style={{ fontSize: '10px', color: 'var(--fg-3)', letterSpacing: '0.18em', marginBottom: '14px' }}>{c.t.toUpperCase()}</div>
                {c.l.map(li => <a key={li.label} href={li.href} style={{ display: 'block', fontSize: '13px', color: 'var(--fg-2)', marginBottom: '8px', transition: 'color 0.15s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--fg)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--fg-2)'}>{li.label}</a>)}
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--line)', flexWrap: 'wrap', gap: '8px' }}>
          <span className="mono" style={{ fontSize: '10px', color: 'var(--fg-4)', letterSpacing: '0.12em' }}>© 2026 SWEYL</span>
          <span className="mono" style={{ fontSize: '10px', color: 'var(--fg-4)', letterSpacing: '0.12em' }}>FAIT PAR LES CLUBS, POUR LES CLUBS</span>
        </div>
      </div>
    </footer>
  )
}
