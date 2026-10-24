import React from 'react'
import { useTranslation } from 'react-i18next'
import { IconCheck } from '../../components/Icons'
import { prefersReducedMotion } from '../hooks'

/**
 * Le match en direct, dessiné en CSS : ce que la saisie produit (score, fil, fiche du joueur),
 * jamais l'écran de saisie lui-même. Un événement toutes les TICK_MS ; le fil repart de la base à
 * chaque tour pour rester crédible. `who` est un nom de joueur, ou une clé de hero.events quand
 * `team` le signale. Les noms sont inventés, aucun vrai club ni vraie personne.
 */
const TICK_MS = 2300
const STAR = { name: '#7 Inès', number: '7' }
const EVENTS = [
  { who: STAR.name, what: 'threePoints', home: 3, star: { pts: 3 } },
  { who: '#12 Malik', what: 'rebound' },
  { team: 'visitors', what: 'twoPoints', away: 2 },
  { who: STAR.name, what: 'rebound', star: { reb: 1 } },
  { who: '#4 Léo', what: 'twoPoints', home: 2 },
  { who: STAR.name, what: 'assist', star: { ast: 1 } },
  { who: '#23 Yanis', what: 'block' },
  { team: 'visitors', what: 'onePoint', away: 1 },
  { who: STAR.name, what: 'twoPoints', home: 2, star: { pts: 2 } },
  { team: 'coach', what: 'timeout' },
]
const BASE = { home: 58, away: 57, pts: 14, reb: 5, ast: 3 }
const CLOCK_START = 4 * 60 + 12
const SECONDS_PER_EVENT = 13
/** Le plafond de chaque barre de la fiche, pour qu'elle reste lisible d'un bout à l'autre du fil. */
const STAR_SCALE = { pts: 30, reb: 12, ast: 10 }

const clockAt = index => {
  const left = Math.max(0, CLOCK_START - index * SECONDS_PER_EVENT)
  return `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`
}

function stateAt(index) {
  return EVENTS.slice(0, index + 1).reduce((s, e) => ({
    home: s.home + (e.home || 0),
    away: s.away + (e.away || 0),
    pts: s.pts + (e.star?.pts || 0),
    reb: s.reb + (e.star?.reb || 0),
    ast: s.ast + (e.star?.ast || 0),
  }), BASE)
}

function useTick() {
  // On part du troisième événement : le fil est déjà plein à l'arrivée.
  const [tick, setTick] = React.useState(2)
  React.useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(() => setTick(t => t + 1), TICK_MS)
    return () => clearInterval(id)
  }, [])
  return tick
}

export default function LiveBoard() {
  const { t } = useTranslation()
  const tick = useTick()
  const index = tick % EVENTS.length
  const state = stateAt(index)
  const event = EVENTS[index]
  const feed = [0, 1, 2].map(back => tick - back).filter(n => n >= 0).map(n => ({ n, index: n % EVENTS.length }))

  return (
    <div className="h-board" aria-hidden="true">
      <div className="h-board-top mono">
        <span className="h-board-live"><span className="live-dot" /> {t('hero.board.live')}</span>
        <span className="h-board-clock">{t('hero.board.quarter')} · {clockAt(index)}</span>
      </div>

      <div className="h-board-score">
        <span className="h-board-team">{t('hero.board.home')}</span>
        <span className="h-board-points display">
          <span key={`h${event.home ? tick : 'x'}`} className={`is-home${event.home ? ' h-bump' : ''}`}>{state.home}</span>
          <span className="h-board-colon">:</span>
          <span key={`a${event.away ? tick : 'x'}`} className={event.away ? 'h-bump' : ''}>{state.away}</span>
        </span>
        <span className="h-board-team h-board-team--away">{t('hero.board.visitors')}</span>
      </div>

      <ul className="h-board-feed">
        {feed.map(({ n, index: i }) => {
          const e = EVENTS[i]
          const scored = e.home || e.away
          return (
            <li key={n}>
              <span className="h-board-feed-time mono">{clockAt(i)}</span>
              <span className="h-board-feed-who">{e.team ? t(`hero.events.${e.team}`) : e.who}</span>
              <span className={`h-board-feed-what mono${scored ? ' is-scored' : ''}`}>{t(`hero.events.${e.what}`)}</span>
            </li>
          )
        })}
      </ul>

      <div className="h-board-star">
        <div className="h-board-star-head">
          <span className="h-board-avatar">{STAR.number}</span>
          <span>{STAR.name}</span>
          <span className="h-board-sheet mono"><IconCheck size={12} stroke={2.4} />{t('hero.board.sheet')}</span>
        </div>
        <div className="h-board-bars">
          {Object.keys(STAR_SCALE).map(key => (
            <div key={key} className="h-board-bar">
              <span className="mono">{t(`hero.board.${key}`)}</span>
              <span className="h-board-track"><span className="h-board-fill" style={{ width: `${Math.min(100, (state[key] / STAR_SCALE[key]) * 100)}%` }} /></span>
              <span className="h-board-val">{state[key]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
