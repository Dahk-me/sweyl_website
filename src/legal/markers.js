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

export const VERIFY_PREFIX = '[[À VÉRIFIER'

/** Nombre de marqueurs encore présents dans un texte. */
export function countMarkers(text) {
  return (text.match(MARKER_PATTERN) || []).length
}
