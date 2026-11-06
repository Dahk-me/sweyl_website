import React from 'react'
import { MARKER_PATTERN, VERIFY_PREFIX } from './markers.js'

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
