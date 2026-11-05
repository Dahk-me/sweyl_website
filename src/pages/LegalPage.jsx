import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import { useTheme } from '../contexts/theme'
import { useMobile } from '../hooks/useMobile'
import { IconSun, IconMoon } from '../components/Icons'
import logoSvg from '/assets/LogoSweyl.svg'
import LanguageSwitch from '../components/LanguageSwitch'
import { currentLanguage } from '../i18n'
import { legalFileName } from '../legal/documents'
import { interpolateLegalText } from '../legal/interpolate'
import { countMarkers } from '../legal/markers.js'
import { withMarkers } from '../legal/markers.jsx'

/**
 * Page de texte juridique : mentions légales, CGU, politique de confidentialité
 * (`LEGAL_DOCUMENTS`).
 *
 * Le texte vit en Markdown dans `public/`, un fichier par langue, et passe par
 * `interpolateLegalText` pour recevoir les champs de `legal/fields.js`. Tant qu'un champ reste
 * ouvert, il est surligné et un bandeau en donne le compte.
 */
export default function LegalPage({ document: legalDocument }) {
  const { theme, toggleTheme } = useTheme()
  const mobile = useMobile()
  const [content, setContent] = useState('')
  const { t, i18n } = useTranslation('common')

  useEffect(() => {
    let cancelled = false
    fetch(`/${legalFileName(legalDocument, currentLanguage())}`)
      .then(r => r.text())
      .then(text => { if (!cancelled) setContent(interpolateLegalText(text)) })
    return () => { cancelled = true }
  }, [legalDocument, i18n.language])

  useEffect(() => {
    document.title = `${t(`legal.documents.${legalDocument.id}`)} · SWEYL`
  }, [t, legalDocument, i18n.language])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [legalDocument])

  const openFields = countMarkers(content)

  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--line)',
        background: 'var(--bg-glass)',
      }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: mobile ? '0 20px' : '0 32px', height: mobile ? '56px' : '72px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Logo à gauche */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <img src={logoSvg} alt="SWEYL" style={{ height: '22px', width: 'auto', filter: theme === 'light' ? 'none' : 'brightness(0) invert(1)' }} />
            {!mobile && <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px', fontWeight: 600, letterSpacing: '0.3em', color: 'var(--fg)' }}>SWEYL</span>}
          </Link>

          {/* Centre SWEYL sur mobile */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {mobile && <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px', fontWeight: 600, letterSpacing: '0.3em', color: 'var(--fg)' }}>SWEYL</span>}
          </div>

          {/* Actions à droite */}
          <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? '8px' : '16px', flexShrink: 0 }}>
            <LanguageSwitch compact={mobile} />
            <button
              onClick={toggleTheme}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: 'transparent', border: '1px solid var(--line-2)',
                color: 'var(--fg)', padding: mobile ? '8px 10px' : '10px 14px',
                fontSize: '11px', borderRadius: '999px',
                transition: 'color 0.3s, border-color 0.3s', cursor: 'pointer',
              }}
            >
              {theme === 'dark' ? <IconSun size={14} /> : <IconMoon size={14} />}
              {!mobile && ` ${t(theme === 'dark' ? 'theme.light' : 'theme.dark')}`}
            </button>
            <Link to="/" className="btn-ghost" style={{ padding: mobile ? '10px 14px' : '10px 18px', fontSize: '12px', gap: '8px' }}>
              <span aria-hidden="true">←</span>{t(mobile ? 'legal.back' : 'legal.backLong')}
            </Link>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '760px', margin: '0 auto', padding: mobile ? '60px 20px 100px' : '80px 32px 120px' }}>
        {openFields > 0 && (
          <p className="legal-pending-banner mono" role="status">{t('legal.pending', { count: openFields })}</p>
        )}
        <ReactMarkdown
          components={{
            h1: ({ children }) => <h1 className="display" style={{ fontSize: mobile ? 'clamp(36px,10vw,56px)' : 'clamp(40px,5vw,64px)', marginBottom: '48px' }}>{withMarkers(children)}</h1>,
            h2: ({ children }) => <h2 style={{ fontFamily: "'Archivo Narrow', sans-serif", fontWeight: 700, fontSize: mobile ? '18px' : '20px', marginTop: '48px', marginBottom: '16px', color: 'var(--fg)' }}>{withMarkers(children)}</h2>,
            h3: ({ children }) => <h3 style={{ fontFamily: "'Archivo Narrow', sans-serif", fontWeight: 700, fontSize: mobile ? '15px' : '16px', marginTop: '28px', marginBottom: '12px', color: 'var(--fg)' }}>{withMarkers(children)}</h3>,
            p: ({ children }) => <p style={{ fontSize: mobile ? '14px' : '15px', color: 'var(--fg-2)', lineHeight: 1.75, marginBottom: '16px' }}>{withMarkers(children)}</p>,
            ul: ({ children }) => <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>{children}</ul>,
            li: ({ children }) => <li style={{ fontSize: mobile ? '14px' : '15px', color: 'var(--fg-2)', lineHeight: 1.75, marginBottom: '6px' }}>{withMarkers(children)}</li>,
            a: ({ href, children }) => href && href.startsWith('/')
              ? <Link to={href} style={{ color: 'var(--primary)', textDecoration: 'underline' }}>{children}</Link>
              : <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>{children}</a>,
            hr: () => <hr style={{ border: 'none', borderTop: '1px solid var(--line)', margin: '40px 0' }} />,
            strong: ({ children }) => <strong style={{ color: 'var(--fg)', fontWeight: 600 }}>{withMarkers(children)}</strong>,
            em: ({ children }) => <em style={{ color: 'var(--fg-3)', fontStyle: 'italic' }}>{withMarkers(children)}</em>,
          }}
        >
          {content}
        </ReactMarkdown>
      </main>

      <footer style={{ borderTop: '1px solid var(--line)', padding: '24px 32px', textAlign: 'center' }}>
        <span className="mono" style={{ fontSize: '10px', color: 'var(--fg-4)', letterSpacing: '0.12em' }}>© 2026 SWEYL</span>
      </footer>
    </>
  )
}
