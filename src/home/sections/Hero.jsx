import React from 'react'
import { useTranslation } from 'react-i18next'
import Accent from '../../components/Accent'
import JoinButton from '../components/JoinButton'
import LiveBoard from './LiveBoard'
import { ANCHORS, formatStat, statById } from '../copy'

/**
 * Le choc de reconnaissance : la question qui arrête le défilement, le produit en action à côté.
 * Aucune vidéo ni média distant, tout est dessiné en SVG et en CSS (zéro egress, accroche
 * immédiate). Il suit le thème : la salle lumières éteintes en sombre, le parquet de jour en clair.
 */

// Le parquet vu depuis les tribunes : lignes du terrain, tracées à l'arrivée (.hero-line, partagée avec le Pro).
const Court = () => (
  <div className="hero-floor" aria-hidden="true">
    <svg viewBox="0 0 1600 860" preserveAspectRatio="xMidYMid slice">
      <g fill="none" strokeWidth="2.5" vectorEffect="non-scaling-stroke">
        <rect className="hero-line" pathLength="1" x="40" y="40" width="1520" height="780" />
        <line className="hero-line" pathLength="1" x1="800" y1="40" x2="800" y2="820" />
        <circle className="hero-line hero-line--hot" pathLength="1" cx="800" cy="430" r="110" />
        <circle className="hero-line" pathLength="1" cx="800" cy="430" r="36" />
        <rect className="hero-line" pathLength="1" x="40" y="320" width="340" height="220" />
        <rect className="hero-line" pathLength="1" x="1220" y="320" width="340" height="220" />
        <path className="hero-line" pathLength="1" d="M380 320 A110 110 0 0 1 380 540" />
        <path className="hero-line" pathLength="1" d="M1220 320 A110 110 0 0 0 1220 540" />
        <path className="hero-line" pathLength="1" d="M40 90 H170 A340 340 0 0 1 170 770 H40" />
        <path className="hero-line" pathLength="1" d="M1560 90 H1430 A340 340 0 0 0 1430 770 H1560" />
      </g>
    </svg>
  </div>
)

export default function Hero() {
  const { t, i18n } = useTranslation()
  const players = formatStat(statById('players'), i18n.language)
  const coaches = formatStat(statById('coaches'), i18n.language)

  return (
    <section id={ANCHORS.top} className="h-hero">
      <div className="hero-spot h-hero-spot" aria-hidden="true" />
      <Court />
      <div className="hero-vignette" aria-hidden="true" />

      <div className="h-wrap h-hero-grid">
        <div className="h-hero-copy">
          <p className="h-badge mono hero-rise" style={{ animationDelay: '0.2s' }}>
            <span className="h-dot" />{t('cta.badge')}
          </p>
          <h1 className="display h-hero-title hero-rise" style={{ animationDelay: '0.35s' }}>
            <Accent text={t('hero.title')} />
          </h1>
          <p className="h-hero-sub hero-rise" style={{ animationDelay: '0.55s' }}>{t('hero.sub')}</p>
          <div className="hero-rise" style={{ animationDelay: '0.75s' }}>
            <JoinButton id={ANCHORS.heroJoin} />
          </div>
          <p className="h-hero-proof mono hero-rise" style={{ animationDelay: '0.95s' }}>
            {t('hero.proof', { players, coaches })}
          </p>
        </div>

        <div className="h-hero-visual hero-rise" style={{ animationDelay: '0.6s' }}>
          <LiveBoard />
        </div>
      </div>
    </section>
  )
}
