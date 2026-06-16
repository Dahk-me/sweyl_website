import React from 'react'
import { useMobile } from '../../hooks/useMobile'

const verbatims = [
  {
    role: 'Assistant Coach Pré-national',
    quote: "Appli facile à prendre en main, vraiment top comme appli.",
    name: 'Big Will',
  },
  {
    role: 'Coach Départemental 1',
    quote: "Mon fils de 14 ans a pris l'appli en main ce soir pour la prise de statistiques et il a géré.",
    name: 'Amaury',
  },
  {
    role: 'Président de club',
    quote: "Une vue claire sur ce qui se passe dans toutes les équipes. Je sais où en est le club sans avoir à courir après les coachs.",
    name: 'Luc',
  },
  {
    role: 'Joueur Région 2',
    quote: "Jamais j'aurais pensé avoir des stats comme un pro à mon niveau. Trop stylé. Hâte de voir la suite.",
    name: 'Aniss',
  },
]

const Card = ({ v, mobile }) => (
  <div style={{
    background: 'var(--bg-3)',
    border: '1px solid var(--line)',
    borderRadius: '6px',
    padding: mobile ? '24px 22px' : '32px 28px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    height: '100%',
  }}>
    <div className="display" style={{ fontSize: '56px', lineHeight: 0.6, color: 'var(--primary)', height: '24px' }}>“</div>
    <p style={{ fontSize: mobile ? '15px' : '17px', lineHeight: 1.5, color: 'var(--fg)', flex: 1 }}>
      {v.quote}
    </p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingTop: '14px', borderTop: '1px solid var(--line)' }}>
      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg)' }}>{v.name}</span>
      <span className="mono" style={{ fontSize: '10px', color: 'var(--primary)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>{v.role}</span>
    </div>
  </div>
)

export default function Testimonials() {
  const mobile = useMobile()

  return (
    <section id="testimonials" style={{ padding: mobile ? '80px 0' : '120px 0', background: 'var(--bg-2)', borderTop: '1px solid var(--line)' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: mobile ? '0 20px' : '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '35fr 65fr', gap: mobile ? '32px' : '80px', alignItems: 'flex-start' }}>

          <div style={{ position: mobile ? 'static' : 'sticky', top: '120px' }}>
            <div className="eyebrow" style={{ marginBottom: '20px', fontSize: mobile ? '11px' : '13px' }}>—— Ils en parlent</div>
            <h2 className="display" style={{ fontSize: mobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(48px, 6vw, 80px)' }}>
              Le terrain<br /><span style={{ color: 'var(--primary)' }}>en parle</span>.
            </h2>
            {!mobile && (
              <p style={{ fontSize: '14px', color: 'var(--fg-3)', lineHeight: 1.6, marginTop: '20px', maxWidth: '320px' }}>
                Ceux qui ont essayé SWEYL ne reviennent plus en arrière.
              </p>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(2, 1fr)', gap: mobile ? '16px' : '20px' }}>
            {verbatims.map(v => <Card key={v.role} v={v} mobile={mobile} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
