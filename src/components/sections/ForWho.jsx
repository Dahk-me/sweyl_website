import { motion, useScroll, useTransform } from 'framer-motion'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useMobile } from '../../hooks/useMobile'
import { PointsLeaderboard, CalendarWidget, PlayerCard, LiveScoreboard } from '../Instruments'

const CARDS = [
  {
    tag: '01',
    label: 'Coachs',
    title: 'COACHER',
    desc: 'Gérez vos effectifs, préparez vos matchs et décidez avec les données. Avant, pendant, après — tout est centralisé.',
    highlights: ['Feuilles de match digitales', 'Suivi de performances', 'Feedback joueur individualisé'],
    instrument: <CalendarWidget />,
  },
  {
    tag: '02',
    label: 'Joueurs',
    title: 'PROGRESSER',
    desc: "Suivez votre saison match après match. Partagez vos meilleures perfs avec des visuels prêts à l'emploi.",
    highlights: ['Fiche joueur détaillée', 'Comparatifs équipe', 'Partage social instantané'],
    instrument: <PlayerCard />,
  },
  {
    tag: '03',
    label: 'Fans & parents',
    title: 'VIVRE',
    desc: 'Vivez les matchs en direct depuis les tribunes ou de chez vous. Suivez vos joueurs, recevez les notifications.',
    highlights: ['Scores en temps réel', 'Notifications de match', 'Stats de vos joueurs préférés'],
    instrument: <LiveScoreboard />,
  },
    {
        tag: '04',
        label: 'Présidents & dirigeants',
        title: 'DIRIGER',
        desc: "Donnez une dimension digitale à votre club. Visualisez l'engagement, valorisez vos bénévoles, attirez vos partenaires.",
        highlights: ['Tableau de bord club', 'Page club publique', 'Système de fidélité partenaires'],
        instrument: <PointsLeaderboard />,
    }
]

// Vertical peek between stacked cards
const PEEK = 48

// Gap between the previous card's bottom and where the arriving card starts
const ARRIVAL_GAP = 15

// CountdownBar (36px fixed) + Header (56px mobile / 72px desktop) + 1px border
const HEADER_H = { mobile: 93, desktop: 109 }

// Total scroll length of the scene. ~75vh per card gives smooth pacing.
const SCROLL_HEIGHT_VH = 75 * CARDS.length

const AnimatedCard = ({ c, i, mobile, progress, popInY, cardRef }) => {
  const N = CARDS.length
  // First card is in place from start; the remaining N-1 cards share the timeline
  // equally so card i+1 starts arriving the instant card i finishes — no dead scroll.
  const slots = N - 1
  const arrivalStart = i === 0 ? 0 : (i - 1) / slots
  const arrivalEnd = i === 0 ? 0 : i / slots

  // Off-screen value used before the card's turn so it isn't visible at the bottom of the scene
  const HIDDEN_Y = 3000

  // Three-phase Y: hidden far below → snaps to popInY at arrivalStart → slides up to 0 at arrivalEnd
  const y = useTransform(
    progress,
    i === 0 ? [0, 1] : [arrivalStart - 0.001, arrivalStart, arrivalEnd],
    i === 0 ? [0, 0] : [HIDDEN_Y, popInY, 0]
  )

  // Once at slot, scale down so later cards visually stack on top
  const targetScale = Math.max(0.5, 1 - (N - i - 1) * 0.1)
  const scale = useTransform(progress, [arrivalEnd, 1], [1, targetScale])

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: i * PEEK,
        left: mobile ? 16 : 0,
        right: mobile ? 16 : 52,
        y,
        scale,
        transformOrigin: 'top',
        zIndex: i + 1,
      }}
    >
      <div
        ref={cardRef}
        className="forwho-card"
        style={{
          padding: mobile ? '22px 24px 36px' : '30px 48px 48px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <span className="mono" style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--primary)' }}>{c.tag} • {c.label}</span>
        </div>

        <h3 className="display" style={{ fontSize: mobile ? 'clamp(48px, 15vw, 68px)' : 'clamp(56px, 7vw, 88px)', color: 'var(--fg)', marginBottom: '16px', lineHeight: 0.9 }}>
          {c.title}
        </h3>

        <p style={{ fontSize: mobile ? '13px' : '15px', color: 'var(--fg-2)', lineHeight: 1.55, maxWidth: '480px', marginBottom: '16px' }}>
          {c.desc}
        </p>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          {c.highlights.map(h => (
            <li key={h} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--fg-3)' }}>
              <span style={{ width: '16px', height: '1px', background: 'var(--primary)', flexShrink: 0 }} />
              {h}
            </li>
          ))}
        </ul>

        <div style={{ width: '100%', overflow: 'hidden' }}>
          {c.instrument}
        </div>
      </div>
    </motion.div>
  )
}

export default function ForWho() {
  const mobile = useMobile()
  const fallback = mobile ? HEADER_H.mobile : HEADER_H.desktop
  const [headerH, setHeaderH] = useState(fallback)

  // Each card's measured height — drives the next card's starting Y so it appears
  // just below the previous one instead of sliding up from the bottom of the screen.
  const [cardHeights, setCardHeights] = useState(() => CARDS.map(() => 600))
  const cardRefs = useRef([])

  const sceneRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    const measure = () => {
      const header = document.querySelector('header')
      if (!header) return
      const rect = header.getBoundingClientRect()
      setHeaderH(Math.ceil(rect.bottom))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useLayoutEffect(() => {
    const measureHeights = () => {
      const heights = cardRefs.current.map(el => el?.offsetHeight || 600)
      setCardHeights(prev => {
        if (heights.every((h, idx) => h === prev[idx])) return prev
        return heights
      })
    }
    measureHeights()

    const observer = new ResizeObserver(measureHeights)
    cardRefs.current.forEach(el => el && observer.observe(el))
    window.addEventListener('resize', measureHeights)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measureHeights)
    }
  }, [mobile])

  const intro = (
    <>
      <div className="eyebrow" style={{ marginBottom: '20px', fontSize: mobile ? '11px' : '13px' }}>—— Pour qui</div>
      <h2 className="display" style={{ fontSize: mobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(48px, 6vw, 88px)', marginBottom: '24px' }}>
        Conçu pour<br />tous <span style={{ color: 'var(--primary)' }}>les acteurs</span><br />du terrain.
      </h2>
      <p style={{ fontSize: mobile ? '14px' : '15px', color: 'var(--fg-2)', maxWidth: '400px', lineHeight: 1.6 }}>
        Coach, joueur ou dirigeant, SWEYL s&apos;adapte à votre rôle et à votre saison.
      </p>
    </>
  )

  // ═══ popInY computation — independent formula per platform ═══
  // Mobile and desktop are dissociated here so changes to one don't affect the other.
  // Both currently use a CUMULATIVE formula: each card's start position accounts for
  // ALL previous cards' heights (not just the immediate previous), which puts cards
  // 2, 3+ off-screen below the viewport so the snap from HIDDEN_Y is invisible — they
  // slide in smoothly from below the visible area instead of popping mid-screen.
  const cards = CARDS.map((c, i) => {
    let popInY = 0
    if (mobile) {
      // ─── MOBILE ───
      for (let j = 0; j < i; j++) {
        popInY += (cardHeights[j] || 600) + ARRIVAL_GAP - PEEK
      }
    } else {
      // ─── DESKTOP ───
      for (let j = 0; j < i; j++) {
        popInY += (cardHeights[j] || 600) + ARRIVAL_GAP - PEEK
      }
    }

    return (
      <AnimatedCard
        key={c.tag}
        c={c}
        i={i}
        mobile={mobile}
        progress={scrollYProgress}
        popInY={popInY}
        cardRef={el => { cardRefs.current[i] = el }}
      />
    )
  })

  // ─── Mobile: intro on top (normal flow), then scroll-driven stack ───
  if (mobile) {
    return (
      <section>
        <div data-reveal style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--line)', padding: '80px 22px 64px' }}>
          {intro}
        </div>
        <div
          ref={sceneRef}
          style={{
            position: 'relative',
            height: `${SCROLL_HEIGHT_VH}vh`,
            background: 'var(--bg-2)',
          }}
        >
          <div
            style={{
              position: 'sticky',
              top: headerH,
              height: `calc(100vh - ${headerH}px)`,
            }}
          >
            {cards}
          </div>
        </div>
      </section>
    )
  }

  // ─── Desktop: 2-col grid with INDEPENDENT sticky elements (Vision-like) ───
  // - Left col: small sticky intro that stays at top:headerH until pushed by next section
  // - Right col: full-viewport sticky scene where cards animate
  // The two stickies have different heights so they exit at different scroll positions:
  //   • cards scene (large) exits first when the section nears its end
  //   • intro (small) stays sticky longer, only exits in the last bit before next section
  return (
    <section
      ref={sceneRef}
      data-reveal
      style={{
        position: 'relative',
        height: `${SCROLL_HEIGHT_VH}vh`,
        background: 'var(--bg-2)',
        borderTop: '1px solid var(--line)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: headerH,
          alignSelf: 'start',
          padding: '80px 52px 0',
        }}
      >
        {intro}
      </div>
      <div
        style={{
          position: 'sticky',
          top: headerH,
          height: `calc(100vh - ${headerH}px)`,
          alignSelf: 'start',
        }}
      >
        {cards}
      </div>
    </section>
  )
}
