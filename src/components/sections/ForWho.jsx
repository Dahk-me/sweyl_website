import React, { useEffect, useState } from 'react'
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

// How many px of a previous card peek above the current one once stacked
const PEEK = 48

// CountdownBar (36px fixed) + Header (56px mobile / 72px desktop) + 1px border
const HEADER_H = { mobile: 93, desktop: 109 }

export default function ForWho() {
  const mobile = useMobile()
  const fallback = mobile ? HEADER_H.mobile : HEADER_H.desktop
  const [headerH, setHeaderH] = useState(fallback)

  useEffect(() => {
    const measure = () => {
      const header = document.querySelector('header')
      if (!header) return
      const rect = header.getBoundingClientRect()
      // header.top is from viewport — its bottom = top + height. Use that as the
      // total occluded area (countdown bar + header + border).
      setHeaderH(Math.ceil(rect.bottom))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const intro = (
    <>
      <div className="eyebrow" style={{ marginBottom: '20px', fontSize: mobile ? '11px' : '13px' }}>—— Pour qui</div>
      <h2 className="display" style={{ fontSize: mobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(48px, 6vw, 88px)', marginBottom: '24px' }}>
        Conçu pour<br />tous <span style={{ color: 'var(--orange)' }}>les acteurs</span><br />du terrain.
      </h2>
      <p style={{ fontSize: mobile ? '14px' : '15px', color: 'var(--fg-2)', maxWidth: '400px', lineHeight: 1.6 }}>
        Coach, joueur ou dirigeant — SWEYL s&apos;adapte à votre rôle et à votre saison.
      </p>
    </>
  )

  const card = (c, i) => (
    <div
      key={c.tag}
      className="forwho-card"
      style={{
        position: 'sticky',
        top: headerH + i * PEEK,
        padding: mobile ? '22px 24px 36px' : '30px 48px 48px',
        boxSizing: 'border-box',
        zIndex: i + 1,
        marginTop: i === 0 ? 0 : (mobile ? 16 : 24),
        marginBottom: mobile ? 16 : 24,
        marginLeft: mobile ? 16 : 0,
        marginRight: mobile ? 16 : 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <span className="mono" style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--orange)' }}>{c.tag}</span>
        <span style={{ width: '14px', height: '1px', background: 'var(--line-2)', flexShrink: 0 }} />
        <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-4)' }}>{c.label}</span>
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
            <span style={{ width: '16px', height: '1px', background: 'var(--orange)', flexShrink: 0 }} />
            {h}
          </li>
        ))}
      </ul>

      <div style={{ width: '100%', overflow: 'hidden' }}>
        {c.instrument}
      </div>
    </div>
  )

  // ─── Mobile: vertical layout — intro on top, stack below ───
  if (mobile) {
    return (
      <section>
        <div data-reveal style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--line)', padding: '80px 22px 64px' }}>
          {intro}
        </div>
        <div style={{ position: 'relative' }}>
          {CARDS.map(card)}
        </div>
      </section>
    )
  }

  // ─── Desktop: 2-col layout — sticky intro on left, sticky cards stack on right ───
  // The intro stays pinned at top: headerH for the full duration of the grid row,
  // which is determined by the right column's natural height (sum of all card heights).
  return (
    <section>
      <div
        data-reveal
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          background: 'var(--bg-2)',
          borderTop: '1px solid var(--line)',
        }}
      >
        {/* Outer cell stretches to row height (= cards column natural height) so
            the inner sticky stays pinned until the very bottom of the section. */}
        <div>
          <div
            style={{
              position: 'sticky',
              top: headerH,
              padding: '80px 52px 0',
            }}
          >
            {intro}
          </div>
        </div>
        <div style={{ position: 'relative', paddingRight: '52px' }}>
          {CARDS.map(card)}
        </div>
      </div>
    </section>
  )
}
