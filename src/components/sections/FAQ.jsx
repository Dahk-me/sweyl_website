import React from 'react'
import { IconPlus } from '../Icons'
import { useMobile } from '../../hooks/useMobile'

const faqs = [
  { q: "Est-ce vraiment différent d'un outil de stats ?", a: "Oui. La stat est un sous-produit. SWEYL est conçu autour de la vie du club entière — calendrier, fidélisation, partage social, points communautaires." },
  { q: "Comment se passe l'onboarding pour la saison ?", a: "Démo en juin, paramétrage en juillet, tests en août, démarrage en septembre. On vous accompagne sur chaque étape." },
  { q: "Faut-il un statisticien ?", a: "Non. L'interface de saisie est pensée pour un joueur non-titulaire. L'app guide pas-à-pas, aucune formation requise." },
  { q: "Quels appareils ?", a: "SWEYL est une PWA — fonctionne comme une app native sur iOS, Android, ordinateur, sans passer par les stores." },
  { q: "Et le calendrier FFBB ?", a: "Un lien suffit. L'import et la synchronisation sont automatiques." },
  { q: "Que se passe-t-il avec mes anciens matchs ?", a: "Glissez vos feuilles de match PDF. SWEYL extrait les stats et reconstruit l'historique en quelques secondes." },
]

export default function FAQ() {
  const mobile = useMobile()
  const [open, setOpen] = React.useState(0)

  const title = (
    <>
      <div className="eyebrow" style={{ marginBottom: '20px', fontSize: mobile ? '11px' : '13px' }}>—— FAQ</div>
      <h2 className="display" style={{ fontSize: mobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(48px, 6vw, 80px)' }}>
        Questions <span style={{ color: 'var(--primary)' }}>fréquentes.</span>
      </h2>
    </>
  )

  const list = faqs.map((f, i) => (
    <div key={i} style={{ borderTop: '1px solid var(--line)', borderBottom: i === faqs.length - 1 ? '1px solid var(--line)' : 'none' }}>
      <button
        onClick={() => setOpen(open === i ? -1 : i)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', textAlign: 'left', gap: '16px', cursor: 'pointer' }}
      >
        <span style={{ fontSize: mobile ? '14px' : '17px', fontWeight: 500, lineHeight: 1.4 }}>{f.q}</span>
        <span style={{ color: 'var(--primary)', transition: 'transform 0.2s', transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)', flexShrink: 0 }}>
          <IconPlus size={mobile ? 18 : 20} />
        </span>
      </button>
      <div style={{ maxHeight: open === i ? '400px' : '0', overflow: 'hidden', transition: 'max-height 0.3s' }}>
        <p style={{ fontSize: mobile ? '13px' : '14px', color: 'var(--fg-2)', lineHeight: 1.65, paddingBottom: '18px' }}>{f.a}</p>
      </div>
    </div>
  ))

  return (
    <section id="faq" style={{ padding: mobile ? '80px 0' : '140px 0', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: mobile ? '0 20px' : '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '35fr 65fr', gap: mobile ? '36px' : '80px', alignItems: 'flex-start' }}>

          {/* Left 35% — sticky title */}
          <div style={mobile ? {} : { position: 'sticky', top: '120px' }}>
            {title}
          </div>

          {/* Right 65% — questions */}
          <div style={mobile ? { marginTop: '4px' } : {}}>
            {list}
          </div>

        </div>
      </div>
    </section>
  )
}
