import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useTheme } from '../../contexts/theme'
import { useMobile } from '../../hooks/useMobile'
import logoSvg from '/assets/LogoSweyl.svg'
import { CONTACT_EMAIL } from '../../lib/leadOptions'

const FooterLink = ({ href, children, style }) => {
  if (href.startsWith('/')) return <Link to={href} style={style}>{children}</Link>
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      style={style}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

// Libellés dans footer.columns et footer.links ; `label` seul = texte non traduit (marque, adresse).
const columns = [
  {
    id: 'product',
    l: [
      { id: 'vision', href: '#vision' },
      { id: 'forWho', href: '#for-who' },
      { id: 'season', href: '#season' },
      { id: 'faq', href: '#faq' },
    ],
  },
  {
    id: 'contact',
    l: [
      { id: 'join', href: '#join' },
      { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
      { legal: true, href: '/mentions-legales' },
    ],
  },
  {
    id: 'follow',
    l: [
      { label: 'Instagram', href: 'https://instagram.com/sweylapp' },
      { label: 'TikTok', href: 'https://tiktok.com/@sweylapp' },
    ],
  },
]

export default function Footer() {
  const { theme } = useTheme()
  const mobile = useMobile()
  const { t } = useTranslation(['home', 'common'])
  const columnTitle = c => t(`footer.columns.${c.id}`)
  const linkLabel = li => li.label ?? (li.legal ? t('common:legal.title') : t(`footer.links.${li.id}`))

  return (
    <footer style={{ borderTop: '1px solid var(--line)', padding: mobile ? '48px 0 28px' : '56px 0 36px' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: mobile ? '0 20px' : '0 32px' }}>
        {mobile ? (
          /* Mobile layout: logo full width, then 3 cols 3 */
          <div style={{ marginBottom: '40px' }}>
            <div style={{ marginBottom: '28px' }}>
              <img src={logoSvg} alt="SWEYL" style={{ height: '24px', width: 'auto', marginBottom: '12px', filter: theme === 'light' ? 'none' : 'brightness(0) invert(1)' }} />
              <p style={{ fontSize: '12px', color: 'var(--fg-3)', lineHeight: 1.6 }}>
                {t('footer.tagline')}
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
              {columns.map(c => (
                <div key={c.id}>
                  <div className="mono" style={{ fontSize: '9px', color: 'var(--fg-3)', letterSpacing: '0.15em', marginBottom: '12px' }}>{columnTitle(c).toUpperCase()}</div>
                  {c.l.map(li => <FooterLink key={li.href} href={li.href} style={{ display: 'block', fontSize: '12px', color: 'var(--fg-2)', marginBottom: '8px', lineHeight: 1.3 }}>{linkLabel(li)}</FooterLink>)}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Desktop layout: 4 columns */
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '60px', marginBottom: '48px' }}>
            <div>
              <img src={logoSvg} alt="SWEYL" style={{ height: '28px', width: 'auto', marginBottom: '14px', filter: theme === 'light' ? 'none' : 'brightness(0) invert(1)' }} />
              <p style={{ fontSize: '13px', color: 'var(--fg-3)', lineHeight: 1.6, maxWidth: '280px' }}>
                {t('footer.tagline')}
              </p>
            </div>
            {columns.map(c => (
              <div key={c.id}>
                <div className="mono" style={{ fontSize: '10px', color: 'var(--fg-3)', letterSpacing: '0.18em', marginBottom: '14px' }}>{columnTitle(c).toUpperCase()}</div>
                {c.l.map(li => <FooterLink key={li.href} href={li.href} style={{ display: 'block', fontSize: '13px', color: 'var(--fg-2)', marginBottom: '8px', transition: 'color 0.15s' }}>{linkLabel(li)}</FooterLink>)}
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--line)', flexWrap: 'wrap', gap: '12px' }}>
          <span className="mono" style={{ fontSize: '10px', color: 'var(--fg-4)', letterSpacing: '0.12em' }}>© 2026 SWEYL</span>
          <span className="mono" style={{ fontSize: '10px', color: 'var(--fg-4)', letterSpacing: '0.12em', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            {t('common:madeIn')}
          </span>
          <span className="mono" style={{ fontSize: '10px', color: 'var(--fg-4)', letterSpacing: '0.12em' }}>{t('footer.signature')}</span>
        </div>
      </div>
    </footer>
  )
}
