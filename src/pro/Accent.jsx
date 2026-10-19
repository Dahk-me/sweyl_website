import React from 'react'

/**
 * Un titre de copy.js : « *mot* » passe en orange, « \n » revient à la ligne.
 * Un accent peut enjamber un retour à la ligne (« sur *vos\nmatchs.* »).
 */
export default function Accent({ text }) {
  const lines = (part, key) => part.split('\n').flatMap((l, i) => (i ? [<br key={`${key}-${i}`} />, l] : [l]))
  return text.split(/(\*[^*]+\*)/).map((part, i) =>
    part.startsWith('*') && part.endsWith('*')
      ? <span key={i} className="pro-accent">{lines(part.slice(1, -1), i)}</span>
      : <React.Fragment key={i}>{lines(part, i)}</React.Fragment>
  )
}
