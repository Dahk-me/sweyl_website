import React from 'react'

const pillars = [
  ['UN', 'Plateforme', "Pas un outil — un écosystème pour toutes les voix du club."],
  ['DEUX', 'Saison entière', 'Pensé pour le long terme, pas pour un match isolé.'],
  ['TROIS', "Le club d'abord", "Chaque feature sert le collectif avant l'individu."],
]

export default function Vision() {
  return (
    <section id="vision" style={{ padding: '140px 0', position: 'relative' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '80px', alignItems: 'flex-start' }}>
          <div style={{ position: 'sticky', top: '120px' }}>
            <div className="eyebrow" style={{ marginBottom: '24px' }}>—— La vision</div>
            <h2 className="display" style={{ fontSize: 'clamp(48px, 6vw, 88px)', marginBottom: '28px' }}>
              On ne mesure pas<br />seulement<br /><span style={{ color: 'var(--orange)' }}>des points.</span>
            </h2>
          </div>
          <div style={{ paddingTop: '40px' }}>
            <p className="serif" style={{ fontSize: '24px', lineHeight: 1.45, color: 'var(--fg)', marginBottom: '32px', fontWeight: 500 }}>
              Les outils de statistiques existent. Ce qui n'existait pas, c'est une plateforme qui pense le club comme un écosystème — joueurs, coachs, parents, dirigeants, bénévoles, partenaires.
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--fg-2)', marginBottom: '24px' }}>
              Un coach qui arrive le samedi matin, ouvre son téléphone, voit son effectif, son calendrier FFBB synchronisé, prépare son match. Un joueur qui consulte sa fiche, partage son meilleur tir sur Instagram.
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--fg-2)', marginBottom: '40px' }}>
              GTS ne remplace pas les humains du club. Il leur rend visible le travail invisible. Il transforme une saison en histoire collective.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'var(--line)', border: '1px solid var(--line)' }}>
              {pillars.map(([n, t, d]) => (
                <div key={n} style={{ background: 'var(--bg)', padding: '24px' }}>
                  <div className="mono" style={{ fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.18em', marginBottom: '12px' }}>{n}</div>
                  <div className="display-narrow" style={{ fontSize: '20px', marginBottom: '8px' }}>{t}</div>
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
