import React from 'react'
import Accent from '../../components/Accent'

/** L'en-tête d'une section, aligné à gauche : l'ancre factuelle en orange, l'idée forte, une précision. */
export default function SectionHead({ eyebrow, title, sub }) {
  return (
    <header className="h-head" data-reveal>
      {eyebrow && <p className="eyebrow h-eyebrow">{eyebrow}</p>}
      <h2 className="display h-title"><Accent text={title} /></h2>
      {sub && <p className="h-sub">{sub}</p>}
    </header>
  )
}
