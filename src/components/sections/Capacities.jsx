import React from 'react'

const caps = [
  { n: '01', t: 'Stats temps réel', d: 'Saisie pendant le match par un joueur non-titulaire, guidée étape par étape.' },
  { n: '02', t: 'FFBB synchronisé', d: 'Calendrier officiel importé en un lien, mis à jour automatiquement.' },
  { n: '03', t: 'Lecture PDF', d: 'Glissez la feuille de match, GTS extrait les stats et les attache aux joueurs.' },
  { n: '04', t: 'Fiches joueurs', d: 'Statistiques, évolution, meilleures performances — chaque joueur a sa page.' },
  { n: '05', t: 'Comparatifs', d: "Identifiez forces et axes de progression au sein de chaque équipe." },
  { n: '06', t: 'Visuels sociaux', d: 'Partagez automatiquement les performances sur Instagram, X, TikTok.' },
]

export default function Capacities() {
  return (
    <section id="capacities" style={{ padding: '140px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '80px', alignItems: 'flex-start' }}>
          <div style={{ position: 'sticky', top: '120px' }}>
            <div className="eyebrow" style={{ marginBottom: '24px' }}>—— Capacités produit</div>
            <h2 className="display" style={{ fontSize: 'clamp(48px, 6vw, 88px)' }}>
              Tout ce dont<br />le club <span style={{ color: 'var(--orange)' }}>a besoin.</span>
            </h2>
          </div>
          <div style={{ paddingTop: '40px' }}>
            <p style={{ fontSize: '15px', color: 'var(--fg-2)', lineHeight: 1.6, marginBottom: '40px' }}>
              Six capacités conçues pour que rien ne passe à travers les mailles d'une saison. De la première feuille de match à la cérémonie de fin d'année.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1px', background: 'var(--line)', border: '1px solid var(--line)' }}>
              {caps.map(c => (
                <div key={c.n} style={{ background: 'var(--bg)', padding: '28px 24px', minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div className="mono" style={{ fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.2em' }}>{c.n} / 06</div>
                  <div>
                    <div className="display-narrow" style={{ fontSize: '20px', marginBottom: '8px' }}>{c.t}</div>
                    <p style={{ fontSize: '13px', color: 'var(--fg-3)', lineHeight: 1.55 }}>{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
