import React from 'react'
import { IconPlus } from '../Icons'

const faqs = [
  { q: "Est-ce vraiment différent d'un outil de stats ?", a: "Oui. La stat est un sous-produit. GTS est conçu autour de la vie du club entière — calendrier, fidélisation, partage social, points communautaires." },
  { q: "Comment se passe l'onboarding pour la saison ?", a: "Démo en juin, paramétrage en juillet, tests en août, démarrage en septembre. On vous accompagne sur chaque étape." },
  { q: "Faut-il un statisticien ?", a: "Non. L'interface de saisie est pensée pour un joueur non-titulaire. L'app guide pas-à-pas, aucune formation requise." },
  { q: "Quels appareils ?", a: "GTS est une PWA — fonctionne comme une app native sur iOS, Android, ordinateur, sans passer par les stores." },
  { q: "Et le calendrier FFBB ?", a: "Un lien suffit. L'import et la synchronisation sont automatiques." },
  { q: "Que se passe-t-il avec mes anciens matchs ?", a: "Glissez vos feuilles de match PDF. GTS extrait les stats et reconstruit l'historique en quelques secondes." },
]

export default function FAQ() {
  const [open, setOpen] = React.useState(0)
  return (
    <section style={{ padding: '140px 0' }}>
      <div style={{ maxWidth: '980px', margin: '0 auto', padding: '0 32px' }}>
        <div className="eyebrow" style={{ marginBottom: '24px' }}>—— FAQ</div>
        <h2 className="display" style={{ fontSize: 'clamp(48px, 6vw, 80px)', marginBottom: '48px' }}>
          Questions <span style={{ color: 'var(--orange)' }}>fréquentes.</span>
        </h2>
        {faqs.map((f, i) => (
          <div key={i} style={{ borderTop: '1px solid var(--line)', borderBottom: i === faqs.length - 1 ? '1px solid var(--line)' : 'none' }}>
            <button onClick={() => setOpen(open === i ? -1 : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', textAlign: 'left', gap: '16px' }}>
              <span style={{ fontSize: '17px', fontWeight: 500 }}>{f.q}</span>
              <span style={{ color: 'var(--orange)', transition: 'transform 0.2s', transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)', flexShrink: 0 }}>
                <IconPlus size={20} />
              </span>
            </button>
            <div style={{ maxHeight: open === i ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.3s' }}>
              <p style={{ fontSize: '14px', color: 'var(--fg-2)', lineHeight: 1.65, paddingBottom: '20px' }}>{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
