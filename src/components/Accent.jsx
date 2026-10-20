import React from 'react'

/**
 * Un titre des fichiers de langue : « *mot* » passe en orange, « \n » revient à la ligne.
 * Un accent peut enjamber un retour à la ligne (« sur *vos\nmatchs.* »). La convention vaut
 * pour les trois langues : le test de traduction vérifie que chacune garde ses astérisques.
 */
export default function Accent({ text, accentClass = 'accent' }) {
  const lines = (part, key) => part.split('\n').flatMap((l, i) => (i ? [<br key={`${key}-${i}`} />, l] : [l]))
  return text.split(/(\*[^*]+\*)/).map((part, i) =>
    part.startsWith('*') && part.endsWith('*')
      ? <span key={i} className={accentClass}>{lines(part.slice(1, -1), i)}</span>
      : <React.Fragment key={i}>{lines(part, i)}</React.Fragment>
  )
}
