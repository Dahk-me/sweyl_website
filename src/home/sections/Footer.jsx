import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useTheme } from '../../contexts/theme'
import logoSvg from '/assets/LogoSweyl.svg'
import { CONTACT_EMAIL } from '../../lib/leadOptions'
import { ANCHORS } from '../copy'

const FooterLink = ({ href, children }) => {
  if (href.startsWith('/')) return <Link to={href}>{children}</Link>
  const external = href.startsWith('http')
  return <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>
}

// Libellés dans footer.columns et footer.links ; `label` seul = texte non traduit (marque, adresse).
const columns = [
  {
    id: 'product',
    l: [
      { id: 'vision', href: `#${ANCHORS.vision}` },
      { id: 'forWho', href: `#${ANCHORS.forWho}` },
      { id: 'season', href: `#${ANCHORS.season}` },
      { id: 'faq', href: `#${ANCHORS.faq}` },
    ],
  },
  {
    id: 'contact',
    l: [
      { id: 'join', href: `#${ANCHORS.join}` },
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
  const { t } = useTranslation(['home', 'common'])
  const linkLabel = li => li.label ?? (li.legal ? t('common:legal.title') : t(`footer.links.${li.id}`))

  return (
    <footer id={ANCHORS.footer} className="h-footer">
      <div className="h-wrap">
        <div className="h-footer-grid">
          <div className="h-footer-brand">
            <img src={logoSvg} alt="SWEYL" style={{ filter: theme === 'light' ? 'none' : 'brightness(0) invert(1)' }} />
            <p>{t('footer.tagline')}</p>
          </div>
          {columns.map(c => (
            <div key={c.id} className="h-footer-col">
              <p className="mono">{t(`footer.columns.${c.id}`)}</p>
              {c.l.map(li => <FooterLink key={li.href} href={li.href}>{linkLabel(li)}</FooterLink>)}
            </div>
          ))}
        </div>

        <div className="h-footer-bottom mono">
          <span>© 2026 SWEYL</span>
          <span>{t('common:madeIn')}</span>
          <span>{t('footer.signature')}</span>
        </div>
      </div>
    </footer>
  )
}
