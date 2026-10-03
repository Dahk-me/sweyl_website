import React from 'react'

/**
 * Les champs laissés ouverts dans les textes juridiques.
 *
 * Deux marqueurs, et deux seulement, toujours écrits de la même façon pour qu'un seul grep les
 * retrouve tous avant publication :
 * - « À COMPLÉTER » : une donnée que seul l'éditeur connaît (identité, contact, durées, dates).
 * - « À VÉRIFIER » : une affirmation tirée du code, à confirmer avant de l'engager publiquement.
 *
 * Commande de contrôle (doit ne rien rendre avant la mise en ligne) :
 *   grep -rnE "\[\[À (COMPLÉTER|VÉRIFIER) :" public src/legal/fields.js
 */
export const MARKER_PATTERN = /(\[\[À (?:COMPLÉTER|VÉRIFIER) : [^\]]*\]\])/g

const VERIFY_PREFIX = '[[À VÉRIFIER'

/** Nombre de marqueurs encore présents dans un texte. */
export function countMarkers(text) {
  return (text.match(MARKER_PATTERN) || []).length
}

function highlightString(text, keyPrefix) {
  const parts = text.split(MARKER_PATTERN)
  if (parts.length === 1) return text
  return parts.map((part, index) => {
    if (index % 2 === 0) return part
    const kind = part.startsWith(VERIFY_PREFIX) ? 'verify' : 'todo'
    return <mark key={`${keyPrefix}-${index}`} className={`legal-marker legal-marker--${kind}`}>{part}</mark>
  })
}

/**
 * Surligne les marqueurs dans les enfants d'un nœud rendu par ReactMarkdown. Un champ ouvert doit
 * sauter aux yeux à la relecture : c'est ce qui garantit qu'aucun ne parte en ligne par oubli.
 */
export function withMarkers(children) {
  return React.Children.map(children, (child, index) =>
    typeof child === 'string' ? highlightString(child, index) : child,
  )
}
