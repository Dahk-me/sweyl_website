import React, { useEffect, useRef } from 'react'
import { useMobile } from '../../hooks/useMobile'
import { PointsLeaderboard, CalendarWidget, PlayerCard, LiveScoreboard } from '../Instruments'

const CARDS = [
  {
    tag: '01',
    label: 'Présidents & dirigeants',
    title: 'DIRIGER',
    desc: "Donnez une dimension digitale à votre club. Visualisez l'engagement, valorisez vos bénévoles, attirez vos partenaires.",
    highlights: ['Tableau de bord club', 'Page club publique', 'Système de fidélité partenaires'],
    instrument: <PointsLeaderboard />,
  },
  {
    tag: '02',
    label: 'Coachs',
    title: 'COACHER',
    desc: 'Gérez vos effectifs, préparez vos matchs et décidez avec les données. Avant, pendant, après — tout est centralisé.',
    highlights: ['Feuilles de match digitales', 'Suivi de performances', 'Feedback joueur individualisé'],
    instrument: <CalendarWidget />,
  },
  {
    tag: '03',
    label: 'Joueurs',
    title: 'PROGRESSER',
    desc: "Suivez votre saison match après match. Partagez vos meilleures perfs avec des visuels prêts à l'emploi.",
    highlights: ['Fiche joueur détaillée', 'Comparatifs équipe', 'Partage social instantané'],
    instrument: <PlayerCard />,
  },
  {
    tag: '04',
    label: 'Fans & parents',
    title: 'VIVRE',
    desc: 'Vivez les matchs en direct depuis les tribunes ou de chez vous. Suivez vos joueurs, recevez les notifications.',
    highlights: ['Scores en temps réel', 'Notifications de match', 'Stats de vos joueurs préférés'],
    instrument: <LiveScoreboard />,
  },
]

// How many px of a previous card peek above the current one
const PEEK = 48

// CountdownBar (36px fixed) + Header (56px mobile / 72px desktop)
const HEADER_H = { mobile: 92, desktop: 108 }

export default function ForWho() {
  const mobile = useMobile()
  const wrapperRef = useRef(null)
  const stickyRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    let ticking = false

    const update = () => {
      const rect = wrapper.getBoundingClientRect()
      const scrollable = wrapper.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable))
      const containerH = stickyRef.current?.offsetHeight ?? 0
      const n = CARDS.length - 1  // 3 animated cards (1, 2, 3)

      CARDS.forEach((_, i) => {
        const el = cardRefs.current[i]
        if (!el || i === 0) return  // card 0 stays fixed at translateY(0)
        const k = i - 1
        const p = Math.max(0, Math.min(1, (progress - k / n) / (1 / n)))
        // slides from below the container to its peek resting position
        const y = containerH + (i * PEEK - containerH) * p
        el.style.transform = `translateY(${y}px)`
      })
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { update(); ticking = false })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const headerH = mobile ? HEADER_H.mobile : HEADER_H.desktop

  return (
    <section>

      {/* ─── Intro ─── */}
      <div data-reveal style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--line)', padding: mobile ? '80px 22px 64px' : '120px 52px 80px' }}>
        <div className="eyebrow" style={{ marginBottom: '20px', fontSize: mobile ? '11px' : '13px' }}>—— Pour qui</div>
        <h2 className="display" style={{ fontSize: mobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(48px, 6vw, 88px)', marginBottom: '24px' }}>
          Conçu pour<br />tous <span style={{ color: 'var(--orange)' }}>les acteurs</span><br />du terrain.
        </h2>
        <p style={{ fontSize: mobile ? '14px' : '15px', color: 'var(--fg-2)', maxWidth: '400px', lineHeight: 1.6 }}>
          Coach, joueur ou dirigeant — SWEYL s&apos;adapte à votre rôle et à votre saison.
        </p>
      </div>

      {/* ─── Stack wrapper ─── */}
      {/* height: 500vh gives ~1000px dwell per animated card on a 800px viewport */}
      <div ref={wrapperRef} style={{ height: '500vh', position: 'relative' }}>

        {/* Sticky container: sticks right below the fixed header */}
        <div
          ref={stickyRef}
          style={{
            position: 'sticky',
            top: headerH,
            height: `calc(100svh - ${headerH}px)`,
            overflow: 'hidden',
            borderRadius: '20px 20px 0 0',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          {CARDS.map((card, i) => (
            <div
              key={card.tag}
              ref={el => { cardRefs.current[i] = el }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'var(--bg-2)',
                // Each card shows its rounded top edge in the peek strip above it
                borderRadius: '20px 20px 0 0',
                borderTop: i > 0 ? '1px solid rgba(255,255,255,0.14)' : 'none',
                padding: mobile ? '20px 22px 36px' : '28px 48px 48px',
                boxSizing: 'border-box',
                zIndex: i + 1,
                // Card 0: always visible (base of the stack)
                // Cards 1–3: start off-screen below, JS animates them in
                transform: i === 0 ? 'translateY(0)' : 'translateY(100%)',
                overflowY: 'auto',
              }}
            >
              {/* Tag + label — visible in the 48px peek strip */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span className="mono" style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--orange)' }}>{card.tag}</span>
                <span style={{ width: '14px', height: '1px', background: 'var(--line-2)', flexShrink: 0 }} />
                <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-4)' }}>{card.label}</span>
              </div>

              <h3 className="display" style={{ fontSize: mobile ? 'clamp(48px, 15vw, 68px)' : 'clamp(56px, 7vw, 88px)', color: 'var(--fg)', marginBottom: '16px', lineHeight: 0.9 }}>
                {card.title}
              </h3>

              <p style={{ fontSize: mobile ? '13px' : '15px', color: 'var(--fg-2)', lineHeight: 1.55, maxWidth: '480px', marginBottom: '16px' }}>
                {card.desc}
              </p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                {card.highlights.map(h => (
                  <li key={h} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--fg-3)' }}>
                    <span style={{ width: '16px', height: '1px', background: 'var(--orange)', flexShrink: 0 }} />
                    {h}
                  </li>
                ))}
              </ul>

              <div style={{ width: '100%', overflow: 'hidden' }}>
                {card.instrument}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
