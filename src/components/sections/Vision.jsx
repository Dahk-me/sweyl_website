import React from 'react'
import { useMobile } from '../../hooks/useMobile'

const PLACEHOLDER_IMG = 'https://fybnpenwtzvjwlbnbmrq.supabase.co/storage/v1/object/public/images/vision/Mobile.png'
const PLACEHOLDER_IMG2 = 'https://fybnpenwtzvjwlbnbmrq.supabase.co/storage/v1/object/public/images/vision/TeamSucces.png'
const PLACEHOLDER_IMG3 = 'https://fybnpenwtzvjwlbnbmrq.supabase.co/storage/v1/object/public/images/vision/CoachStats.png'

const pillars = [
  { n: 'UN',    title: 'Plateforme',      desc: "Pas un outil un écosystème pour toutes les voix du club.", img: PLACEHOLDER_IMG },
  { n: 'DEUX',  title: 'Saison entière',  desc: 'Pensé pour le long terme, un match seul n\'est qu\'un chiffre dans l\'équation. C\'est tout le chemin parcouru ensemble qui fait la différence.',        img: PLACEHOLDER_IMG2 },
  { n: 'TROIS', title: "Focus", desc: "Chaque rôle a sa mission. Sweyl fournit à chacun les outils adaptés pour rester concentré sur l'essentiel",         img: PLACEHOLDER_IMG3 },
]

const Card = ({ p, mobile }) => (
  <div style={{ borderRadius: '8px', overflow: 'hidden', background: 'var(--bg-3)', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', height: '100%' }}>
    <img src={p.img} alt={p.title} style={{ width: '100%', height: '350px', flexShrink: 0, objectFit: 'cover', display: 'block' }} />
    <div style={{ padding: mobile ? '20px' : '24px', flex: 1 }}>
      <div className="mono" style={{ fontSize: '10px', color: 'var(--primary)', letterSpacing: '0.18em', marginBottom: '10px' }}>{p.n}</div>
      <div className="display-narrow" style={{ fontSize: '22px', marginBottom: '8px' }}>{p.title}</div>
      <div style={{ fontSize: '13px', color: 'var(--fg-3)', lineHeight: 1.55 }}>{p.desc}</div>
    </div>
  </div>
)

export default function Vision() {
  const mobile = useMobile()

  return (
    <section id="vision" style={{ padding: mobile ? '80px 0' : '140px 0', position: 'relative', background: 'var(--bg-2)' }}>

      {/* Container paddé titre + texte */}
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: mobile ? '0 20px' : '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '35fr 65fr', gap: mobile ? '32px' : '80px', alignItems: 'flex-start' }}>

          {/* Sticky title */}
          <div style={{ position: mobile ? 'static' : 'sticky', top: '120px' }}>
            <div className="eyebrow" style={{ marginBottom: '20px', fontSize: mobile ? '11px' : '13px' }}>—— La vision</div>
            <h2 className="display" style={{ fontSize: mobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(48px, 6vw, 88px)', marginBottom: mobile ? '0' : '28px' }}>
              On ne mesure pas<br />seulement<br /> des<span style={{ color: 'var(--primary)' }}> points</span>.
            </h2>
          </div>

          {/* Texte + cartes desktop */}
          <div style={{ paddingTop: mobile ? '0' : '40px' }}>
            <p className="serif" style={{ fontSize: mobile ? '17px' : '22px', lineHeight: 1.45, color: 'var(--fg)', marginBottom: '20px', fontWeight: 500 }}>
              Aucun outil n'a jamais été pensé pour le coach amateur. Aucun standard n'existe.<br />SWEYL est le premier.
            </p>
            <p style={{ fontSize: mobile ? '14px' : '15px', lineHeight: 1.7, color: 'var(--fg-2)', marginBottom: mobile ? '0' : '36px' }}>
              Un seul outil pour le coach, les joueurs et les dirigeants. Chacun avec sa vision, tous dans la même direction.
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

      {/* Carousel mobile hors du container paddé pour éviter l'overflow page */}
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
            touchAction: 'pan-x pan-y',
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
