import React from 'react'
import { PointsLeaderboard, CalendarWidget, PlayerCard, LiveScoreboard } from '../Instruments'

const targets = [
  {
    tag: '01',
    t: 'Présidents & dirigeants',
    d: "Donnez une dimension digitale à votre club. Visualisez l'engagement, valorisez vos bénévoles, attirez vos partenaires.",
    h: ['Tableau de bord club', 'Page club publique', 'Système de fidélité partenaires'],
    instrument: <PointsLeaderboard />,
  },
  {
    tag: '02',
    t: 'Coachs',
    d: 'Gérez vos effectifs, préparez vos matchs et prenez des décisions basées sur les données. Avant, pendant, après — tout est centralisé.',
    h: ['Feuilles de match digitales', 'Suivi de performances', 'Feedback joueur individualisé'],
    instrument: <CalendarWidget />,
  },
  {
    tag: '03',
    t: 'Joueurs',
    d: 'Suivez votre progression match après match. Partagez vos meilleures performances avec des visuels prêts à l\'emploi.',
    h: ['Fiche joueur détaillée', 'Comparatifs équipe', 'Partage social instantané'],
    instrument: <PlayerCard />,
  },
  {
    tag: '04',
    t: 'Fans & parents',
    d: 'Vivez les matchs en direct depuis les tribunes ou de chez vous. Suivez vos joueurs, recevez les notifications.',
    h: ['Scores en temps réel', 'Notifications de match', 'Stats de vos joueurs préférés'],
    instrument: <LiveScoreboard />,
  },
]

export default function ForWho() {
  return (
    <section style={{ padding: '140px 0', background: 'var(--bg-2)', borderTop: '1px solid var(--line)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '80px', alignItems: 'flex-start' }}>
          <div style={{ position: 'sticky', top: '120px' }}>
            <div className="eyebrow" style={{ marginBottom: '24px' }}>—— Pour qui</div>
            <h2 className="display" style={{ fontSize: 'clamp(48px, 6vw, 88px)', marginBottom: '24px' }}>
              Conçu pour<br />tous <span style={{ color: 'var(--orange)' }}>les acteurs</span><br />du terrain.
            </h2>
            <div className="mono" style={{ fontSize: '10px', color: 'var(--fg-3)', letterSpacing: '0.18em' }}>04 PROFILS</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--line)', overflow: 'hidden' }}>
            {targets.map(target => (
              <div key={target.tag} style={{ background: 'var(--bg-2)', padding: '52px 36px' }}>
                <div className="mono" style={{ fontSize: '11px', color: 'var(--orange)', letterSpacing: '0.2em', marginBottom: '12px' }}>{target.tag}</div>
                <div className="display" style={{ fontSize: 'clamp(36px,4vw,54px)', marginBottom: '14px', lineHeight: 1 }}>{target.t}</div>
                <p style={{ fontSize: '14px', color: 'var(--fg-2)', lineHeight: 1.55, marginBottom: '18px' }}>{target.d}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
                  {target.h.map(h => (
                    <li key={h} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--fg-3)' }}>
                      <span style={{ width: '20px', height: '1px', background: 'var(--orange)', flexShrink: 0 }} />{h}
                    </li>
                  ))}
                </ul>
                <div style={{ width: '100%', overflow: 'hidden' }}>{target.instrument}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
