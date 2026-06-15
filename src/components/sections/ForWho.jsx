import React from 'react'
import { useMobile } from '../../hooks/useMobile'
import { PointsLeaderboard, CalendarWidget, PlayerCard, LiveScoreboard } from '../Instruments'

const CARDS = [
  {
    tag: '01',
    label: 'Coachs',
    title: 'COACHER',
    desc: 'Gérez vos effectifs, préparez vos matchs et décidez avec les données. Avant, pendant, après tout est centralisé.',
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
  },
]

const Card = ({ c, mobile }) => (
  <div
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
)

export default function ForWho() {
  const mobile = useMobile()

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

  const cards = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? '16px' : '24px' }}>
      {CARDS.map(c => (
        <Card key={c.tag} c={c} mobile={mobile} />
      ))}
    </div>
  )

  if (mobile) {
    return (
      <section id="for-who" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--line)' }}>
        <div style={{ padding: '80px 22px 32px' }}>
          {intro}
        </div>
        <div style={{ padding: '0 16px 64px' }}>
          {cards}
        </div>
      </section>
    )
  }

  return (
    <section
      id="for-who"
      style={{
        background: 'var(--bg-2)',
        borderTop: '1px solid var(--line)',
        padding: '80px 0',
      }}
    >
      <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: '65fr 35fr', gap: '32px', alignItems: 'start' }}>
        <div>{cards}</div>
        <div style={{ padding: '0 52px', position: 'sticky', top: '120px' }}>
          {intro}
        </div>
      </div>
    </section>
  )
}
