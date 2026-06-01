import React from 'react'
import { useMobile } from '../../hooks/useMobile'

const PLACEHOLDER_IMG = 'https://fybnpenwtzvjwlbnbmrq.supabase.co/storage/v1/object/public/images/vision/Mobile.png'

const pillars = [
  { n: 'UN',    title: 'Plateforme',      desc: "Pas un outil un écosystème pour toutes les voix du club.", img: PLACEHOLDER_IMG },
  { n: 'DEUX',  title: 'Saison entière',  desc: 'Pensé pour le long terme, pas pour un match isolé.',        img: PLACEHOLDER_IMG },
  { n: 'TROIS', title: "Focus", desc: "Optimisé pour rester concentré sur le jeu.",         img: PLACEHOLDER_IMG },
]

const Card = ({ p, mobile }) => (
  <div style={{ borderRadius: '8px', overflow: 'hidden', background: 'var(--bg-2)', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', height: '100%' }}>
    <img src={p.img} alt={p.title} style={{ width: '100%', height: '350px', flexShrink: 0, objectFit: 'cover', display: 'block' }} />
    <div style={{ padding: mobile ? '20px' : '24px', flex: 1 }}>
      <div className="mono" style={{ fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.18em', marginBottom: '10px' }}>{p.n}</div>
      <div className="display-narrow" style={{ fontSize: '22px', marginBottom: '8px' }}>{p.title}</div>
      <div style={{ fontSize: '13px', color: 'var(--fg-3)', lineHeight: 1.55 }}>{p.desc}</div>
    </div>
  </div>
)

export default function Vision() {
  const mobile = useMobile()

  return (
    <section id="vision" style={{ padding: mobile ? '80px 0' : '140px 0', position: 'relative', background: 'var(--bg)' }}>

      {/* Container paddé — titre + texte */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: mobile ? '0 20px' : '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1.4fr', gap: mobile ? '32px' : '80px', alignItems: 'flex-start' }}>

          {/* Sticky title */}
          <div style={{ position: mobile ? 'static' : 'sticky', top: '120px' }}>
            <div className="eyebrow" style={{ marginBottom: '20px', fontSize: mobile ? '11px' : '13px' }}>—— La vision</div>
            <h2 className="display" style={{ fontSize: mobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(48px, 6vw, 88px)', marginBottom: mobile ? '0' : '28px' }}>
              On ne mesure pas<br />seulement<br /> des<span style={{ color: 'var(--orange)' }}> points</span>.
            </h2>
          </div>

          {/* Texte + cartes desktop */}
          <div style={{ paddingTop: mobile ? '0' : '40px' }}>
            <p className="serif" style={{ fontSize: mobile ? '17px' : '24px', lineHeight: 1.45, color: 'var(--fg)', marginBottom: '24px', fontWeight: 500 }}>
              Les outils de statistiques existent. Ce qui n'existait pas, c'est une plateforme qui pense le club comme un écosystème — joueurs, coachs, parents, dirigeants, bénévoles, partenaires.
            </p>
            <p style={{ fontSize: mobile ? '14px' : '15px', lineHeight: 1.7, color: 'var(--fg-2)', marginBottom: '20px' }}>
              Un coach qui arrive le samedi matin, ouvre son téléphone, voit son effectif, son calendrier FFBB synchronisé, prépare son match. Un joueur qui consulte sa fiche, partage son meilleur tir sur Instagram.
            </p>
            <p style={{ fontSize: mobile ? '14px' : '15px', lineHeight: 1.7, color: 'var(--fg-2)', marginBottom: mobile ? '0' : '36px' }}>
              SWEYL ne remplace pas les humains du club. Il leur rend visible le travail invisible. Il transforme une saison en histoire collective.
            </p>

            {/* Grille desktop uniquement */}
            {!mobile && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
                {pillars.map(p => <Card key={p.n} p={p} mobile={false} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Carousel mobile — hors du container paddé pour éviter l'overflow page */}
      {mobile && (
        <div style={{ overflow: 'hidden', marginTop: '32px' }}>
          <div style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'scroll',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            touchAction: 'pan-x',
            paddingLeft: 'calc((100vw - 78vw) / 2)',
            paddingRight: 'calc((100vw - 78vw) / 2)',
            paddingBottom: '4px',
          }}>
            {pillars.map(p => (
              <div key={p.n} style={{ flex: '0 0 78vw', scrollSnapAlign: 'center' }}>
                <Card p={p} mobile />
              </div>
            ))}
          </div>
        </div>
      )}

    </section>
  )
}
