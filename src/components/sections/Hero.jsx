import React from 'react'
import { useTranslation } from 'react-i18next'
import { IconArrow } from '../Icons'
import { useMobile } from '../../hooks/useMobile'
import Accent from '../Accent'

/**
 * Entrée du site. Aucune vidéo ni média distant : tout est dessiné en SVG et
 * en CSS, pour une accroche immédiate et zéro egress Supabase. Pas de grain,
 * pas de texte lumineux : ce sont les tics des pages générées.
 * Il suit le thème : la salle lumières éteintes en sombre, le parquet de jour en clair.
 */

// Le fil du match : un événement toutes les TICK_MS, le score suit.
// `who` est un nom de joueur, ou une clé de hero.events quand `team` le signale.
const TICK_MS = 2400
const EVENTS = [
  { who: '#7 Inès', what: 'threePoints', home: 3 },
  { who: '#12 Malik', what: 'rebound' },
  { team: 'visitors', what: 'twoPoints', away: 2 },
  { who: '#4 Léo', what: 'steal' },
  { who: '#4 Léo', what: 'twoPoints', home: 2 },
  { who: '#23 Yanis', what: 'block' },
  { who: '#9 Sarah', what: 'onePoint', home: 1 },
  { team: 'coach', what: 'timeout' },
]
const BASE_SCORE = { home: 58, away: 57 }

function useLiveFeed() {
  const [tick, setTick] = React.useState(0)

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setTick(t => t + 1), TICK_MS)
    return () => clearInterval(id)
  }, [])

  // Le score repart de la base à chaque tour du fil, pour rester crédible.
  const index = tick % EVENTS.length
  const score = EVENTS.slice(0, index + 1).reduce(
    (s, e) => ({ home: s.home + (e.home || 0), away: s.away + (e.away || 0) }),
    BASE_SCORE,
  )
  return { tick, event: EVENTS[index], score }
}

// Le parquet vu depuis les tribunes : lignes du terrain, tracées à l'arrivée.
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

const LiveTicker = ({ mobile }) => {
  const { t } = useTranslation()
  const { tick, event, score } = useLiveFeed()
  const scored = event.home || event.away

  return (
    <div className="hero-ticker mono" aria-hidden="true">
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#ff3b3b' }}>
        <span className="live-dot" /> LIVE
      </span>
      <span className="hero-ticker-sep" />
      {!mobile && <span style={{ color: 'var(--fg-3)' }}>Q4</span>}
      <span key={`s${tick}`} className={scored ? 'hero-score hero-score--bump' : 'hero-score'}>
        {score.home} <span style={{ color: 'var(--fg-4)' }}>:</span> {score.away}
      </span>
      <span className="hero-ticker-sep" />
      <span key={`e${tick}`} className="hero-event">
        <span style={{ color: 'var(--fg)' }}>{event.team ? t(`hero.events.${event.team}`) : event.who}</span>
        <span style={{ color: scored ? 'var(--primary)' : 'var(--fg-3)' }}>{t(`hero.events.${event.what}`)}</span>
      </span>
    </div>
  )
}

export default function Hero() {
  const mobile = useMobile()
  const { t } = useTranslation()

  return (
    <section className="hero">
      <div className="hero-spot" aria-hidden="true" />
      <Court />
      <div className="hero-vignette" aria-hidden="true" />

      <div className="hero-content" style={{ padding: mobile ? '88px 20px 96px' : '120px 32px 120px' }}>
        {/* La marque : le logo, SWEYL dessous */}
        <div className="hero-brand">
          <div
            className="hero-logo"
            role="img"
            aria-label={t('hero.logoAlt')}
            style={{ width: mobile ? '64px' : '96px' }}
          />
          <div className="hero-wordmark" style={{ fontSize: mobile ? '18px' : '24px' }}>SWEYL</div>
        </div>

        <h1
          className="display hero-rise"
          style={{
            fontSize: mobile ? 'clamp(48px, 14vw, 72px)' : 'clamp(72px, 8.4vw, 128px)',
            color: 'var(--fg)',
            animationDelay: '0.55s',
          }}
        >
          <Accent text={t('hero.title')} />
        </h1>

        <p
          className="hero-rise"
          style={{
            fontSize: mobile ? '15px' : '18px',
            lineHeight: 1.5,
            color: 'var(--fg-2)',
            maxWidth: mobile ? '320px' : '560px',
            animationDelay: '0.75s',
          }}
        >
          <Accent text={t('hero.sub')} />
        </p>

        <div className="hero-rise" style={{ animationDelay: '0.95s' }}>
          <LiveTicker mobile={mobile} />
        </div>

        <div className="hero-rise" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', animationDelay: '1.1s' }}>
          <a href="#join" className="btn-primary hero-cta" style={{ padding: mobile ? '15px 26px' : '17px 32px', fontSize: mobile ? '14px' : '15px' }}>
            {t('hero.cta')}
            <IconArrow size={mobile ? 12 : 14} />
          </a>
          <span className="mono" style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-3)' }}>
            {t('hero.season')}
          </span>
        </div>
      </div>
    </section>
  )
}
