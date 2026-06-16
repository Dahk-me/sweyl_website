import React from 'react'
import { Link } from 'react-router-dom'
import { IconArrow } from '../components/Icons'
import { useMobile } from '../hooks/useMobile'

export default function NotFound() {
  const mobile = useMobile()

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main style={{
      minHeight: '100svh',
      background: 'var(--bg)',
      color: 'var(--fg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: mobile ? '80px 24px' : '120px 32px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="grain" />

      <div className="eyebrow" style={{ marginBottom: '24px', fontSize: mobile ? '11px' : '13px' }}>
        —— Erreur 404
      </div>

      <h1 className="display" style={{
        fontSize: mobile ? 'clamp(96px, 28vw, 160px)' : 'clamp(140px, 18vw, 260px)',
        lineHeight: 0.85,
        marginBottom: '24px',
        color: 'var(--primary)',
      }}>
        404
      </h1>

      <h2 className="display" style={{
        fontSize: mobile ? 'clamp(28px, 8vw, 44px)' : 'clamp(40px, 5vw, 64px)',
        marginBottom: '20px',
        maxWidth: '720px',
      }}>
        Page hors terrain.
      </h2>

      <p style={{
        fontSize: mobile ? '14px' : '16px',
        color: 'var(--fg-2)',
        lineHeight: 1.6,
        marginBottom: '40px',
        maxWidth: '460px',
      }}>
        Cette page n&apos;existe pas. Pas grave. Le match continue.
      </p>

      <Link to="/" className="btn-primary" style={{ padding: mobile ? '14px 22px' : '16px 28px', fontSize: mobile ? '13px' : '14px' }}>
        Retour à l&apos;accueil
        <IconArrow size={mobile ? 12 : 14} />
      </Link>
    </main>
  )
}
