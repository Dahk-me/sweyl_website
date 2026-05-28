import React from 'react'
import { useMobile } from '../../hooks/useMobile'

const pillars = [
  ['UN', 'Plateforme', "Pas un outil — un écosystème pour toutes les voix du club."],
  ['DEUX', 'Saison entière', 'Pensé pour le long terme, pas pour un match isolé.'],
  ['TROIS', "Le club d'abord", "Chaque feature sert le collectif avant l'individu."],
]

export default function Vision() {
  const mobile = useMobile()
  return (
    <section id="vision" style={{ padding: mobile ? '80px 0' : '140px 0', position: 'relative' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: mobile ? '0 20px' : '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1.4fr', gap: mobile ? '32px' : '80px', alignItems: 'flex-start' }}>

          {/* Sticky title */}
          <div style={{ position: mobile ? 'static' : 'sticky', top: '120px' }}>
            <div className="eyebrow" style={{ marginBottom: '20px', fontSize: mobile ? '11px' : '13px' }}>—— La vision</div>
            <h2 className="display" style={{ fontSize: mobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(48px, 6vw, 88px)', marginBottom: mobile ? '0' : '28px' }}>
              On ne mesure pas<br />seulement<br /><span style={{ color: 'var(--orange)' }}>des points.</span>
            </h2>
          </div>

          {/* Content */}
          <div style={{ paddingTop: mobile ? '0' : '40px' }}>
            <p className="serif" style={{ fontSize: mobile ? '17px' : '24px', lineHeight: 1.45, color: 'var(--fg)', marginBottom: '24px', fontWeight: 500 }}>
              Les outils de statistiques existent. Ce qui n'existait pas, c'est une plateforme qui pense le club comme un écosystème — joueurs, coachs, parents, dirigeants, bénévoles, partenaires.
            </p>
            <p style={{ fontSize: mobile ? '14px' : '15px', lineHeight: 1.7, color: 'var(--fg-2)', marginBottom: '20px' }}>
              Un coach qui arrive le samedi matin, ouvre son téléphone, voit son effectif, son calendrier FFBB synchronisé, prépare son match. Un joueur qui consulte sa fiche, partage son meilleur tir sur Instagram.
            </p>
            <p style={{ fontSize: mobile ? '14px' : '15px', lineHeight: 1.7, color: 'var(--fg-2)', marginBottom: '36px' }}>
              GTS ne remplace pas les humains du club. Il leur rend visible le travail invisible. Il transforme une saison en histoire collective.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: '1px', background: 'var(--line)', border: '1px solid var(--line)' }}>
              {pillars.map(([n, t, d]) => (
                <div key={n} style={{ background: 'var(--bg)', padding: mobile ? '20px' : '24px' }}>
                  <div className="mono" style={{ fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.18em', marginBottom: '10px' }}>{n}</div>
                  <div className="display-narrow" style={{ fontSize: mobile ? '18px' : '20px', marginBottom: '6px' }}>{t}</div>
                  <div style={{ fontSize: '13px', color: 'var(--fg-3)', lineHeight: 1.5 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
