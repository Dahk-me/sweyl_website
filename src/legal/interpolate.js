import { LEGAL_FIELDS } from './fields'

const PLACEHOLDER = /\{\{([a-zA-Z0-9]+)\}\}/g

/**
 * Remplace les `{{cle}}` d'un texte juridique par la valeur du champ correspondant.
 *
 * Une même donnée (l'adresse de contact, la raison sociale) revient dans plusieurs documents et
 * plusieurs sections : elle ne s'écrit qu'une fois, dans `fields.js`. Une clé inconnue ne
 * disparaît pas en silence, elle devient un champ à compléter, donc surligné et trouvé par le grep.
 */
export function interpolateLegalText(text, fields = LEGAL_FIELDS) {
  return text.replace(PLACEHOLDER, (_, key) =>
    Object.prototype.hasOwnProperty.call(fields, key)
      ? fields[key]
      : `[[À COMPLÉTER : champ inconnu « ${key} » dans le texte]]`,
  )
}
