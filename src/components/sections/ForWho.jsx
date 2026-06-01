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
    bg: '#161616',
    textColor: 'var(--fg)',
    accentColor: 'var(--orange)',
    subColor: 'var(--fg-2)',
    hlColor: 'var(--fg-3)',
  },
  {
    tag: '02',
    label: 'Coachs',
    title: 'COACHER',
    desc: 'Gérez vos effectifs, préparez vos matchs et décidez avec les données. Avant, pendant, après — tout est centralisé.',
    highlights: ['Feuilles de match digitales', 'Suivi de performances', 'Feedback joueur individualisé'],
    instrument: <CalendarWidget />,
    bg: '#1c1c1c',
    textColor: 'var(--fg)',
    accentColor: 'var(--orange)',
    subColor: 'var(--fg-2)',
    hlColor: 'var(--fg-3)',
  },
  {
    tag: '03',
    label: 'Joueurs',
    title: 'PROGRESSER',
    desc: "Suivez votre saison match après match. Partagez vos meilleures perfs avec des visuels prêts à l'emploi.",
    highlights: ['Fiche joueur détaillée', 'Comparatifs équipe', 'Partage social instantané'],
    instrument: <PlayerCard />,
    bg: '#111111',
    textColor: 'var(--fg)',
    accentColor: 'var(--orange)',
    subColor: 'var(--fg-2)',
    hlColor: 'var(--fg-3)',
  },
  {
    tag: '04',
    label: 'Fans & parents',
    title: 'VIVRE',
    desc: 'Vivez les matchs en direct depuis les tribunes ou de chez vous. Suivez vos joueurs, recevez les notifications.',
    highlights: ['Scores en temps réel', 'Notifications de match', 'Stats de vos joueurs préférés'],
    instrument: <LiveScoreboard />,
    bg: 'var(--orange)',
    textColor: '#0a0a0a',
    accentColor: '#0a0a0a',
    subColor: 'rgba(0,0,0,0.65)',
    hlColor: 'rgba(0,0,0,0.55)',
  },
]

// Final resting Y (px) for each card — creates the peek stack effect
const FINAL_Y = [-90, -60, -30, 0]

export default function ForWho() {
  const mobile = useMobile()
  const wrapperRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    let ticking = false

    const update = () => {
      const rect = wrapper.getBoundingClientRect()
      const scrollable = wrapper.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      // progress = 0 when sticky kicks in (card 0 at top), 1 at end of section
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable))
      const n = CARDS.length - 1  // 3 animated cards

      CARDS.forEach((_, i) => {
        const el = cardRefs.current[i]
        if (!el) return
        if (i === 0) return  // card 0 is always at its final position
        const k = i - 1
        const p = Math.max(0, Math.min(1, (progress - k / n) / (1 / n)))
        const y = window.innerHeight + (FINAL_Y[i] - window.innerHeight) * p
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

      {/* ─── Card stack ─── */}
      <div ref={wrapperRef} style={{ height: '500vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#161616' }}>
          {CARDS.map((card, i) => (
            <div
              key={card.tag}
              ref={el => { cardRefs.current[i] = el }}
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                borderRadius: '20px 20px 0 0',
                background: card.bg,
                padding: mobile ? '36px 22px 44px' : '52px 48px 60px',
                boxSizing: 'border-box',
                zIndex: i + 1,
                transform: i === 0 ? `translateY(${FINAL_Y[0]}px)` : 'translateY(100%)',
              }}
            >
              {/* Card header */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
                <span className="mono" style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: card.accentColor, opacity: 0.7 }}>{card.tag}</span>
                <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.12em', textTransform: 'uppercase', color: card.hlColor }}>— {card.label}</span>
              </div>

              {/* Title */}
              <h3 className="display" style={{ fontSize: mobile ? 'clamp(56px, 17vw, 80px)' : 'clamp(72px, 9vw, 110px)', color: card.textColor, marginBottom: '20px', lineHeight: 0.9 }}>
                {card.title}
              </h3>

              {/* Description */}
              <p style={{ fontSize: mobile ? '13px' : '15px', color: card.subColor, lineHeight: 1.55, maxWidth: '480px', marginBottom: '20px' }}>
                {card.desc}
              </p>

              {/* Highlights */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                {card.highlights.map(h => (
                  <li key={h} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: card.hlColor }}>
                    <span style={{ width: '18px', height: '1px', background: card.accentColor, flexShrink: 0 }} />
                    {h}
                  </li>
                ))}
              </ul>

              {/* Instrument */}
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
