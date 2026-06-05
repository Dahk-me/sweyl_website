import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { useTheme } from '../contexts/theme'
import { useMobile } from '../hooks/useMobile'
import logoSvg from '/assets/LogoSweyl.svg'
import CountdownBar from '../components/sections/CountdownBar'

export default function MentionsLegales() {
  const { theme, toggleTheme } = useTheme()
  const mobile = useMobile()
  const [content, setContent] = useState('')

  useEffect(() => {
    fetch('/mentions-legales.md')
      .then(r => r.text())
      .then(setContent)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <CountdownBar />
      <header style={{
        position: 'sticky',
        top: '36px',
        zIndex: 50,
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--line)',
        background: 'var(--bg-glass)',
      }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: mobile ? '0 20px' : '0 32px', height: mobile ? '56px' : '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/">
            <img src={logoSvg} alt="SWEYL" style={{ height: mobile ? '20px' : '24px', width: 'auto', filter: theme === 'light' ? 'none' : 'brightness(0) invert(1)' }} />
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link to="/" style={{ fontSize: '13px', color: 'var(--fg-2)' }}>← Retour</Link>
            <button onClick={toggleTheme} style={{ fontSize: '18px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fg-3)' }}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '760px', margin: '0 auto', padding: mobile ? '60px 20px 100px' : '80px 32px 120px' }}>
        <ReactMarkdown
          components={{
            h1: ({ children }) => <h1 className="display" style={{ fontSize: mobile ? 'clamp(36px,10vw,56px)' : 'clamp(40px,5vw,64px)', marginBottom: '48px' }}>{children}</h1>,
            h2: ({ children }) => <h2 style={{ fontFamily: "'Archivo Narrow', sans-serif", fontWeight: 700, fontSize: mobile ? '18px' : '20px', marginTop: '48px', marginBottom: '16px', color: 'var(--fg)' }}>{children}</h2>,
            p: ({ children }) => <p style={{ fontSize: mobile ? '14px' : '15px', color: 'var(--fg-2)', lineHeight: 1.75, marginBottom: '16px' }}>{children}</p>,
            a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>{children}</a>,
            hr: () => <hr style={{ border: 'none', borderTop: '1px solid var(--line)', margin: '40px 0' }} />,
            strong: ({ children }) => <strong style={{ color: 'var(--fg)', fontWeight: 600 }}>{children}</strong>,
            em: ({ children }) => <em style={{ color: 'var(--fg-3)', fontStyle: 'italic' }}>{children}</em>,
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
