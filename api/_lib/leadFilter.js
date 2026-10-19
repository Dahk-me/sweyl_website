/**
 * Filtre anti-robots du formulaire de démo, en trois couches.
 *
 * 1. Le champ piège : invisible pour un humain, rempli par un robot.
 * 2. Le temps de remplissage : moins de MIN_FILL_MS entre l'affichage et l'envoi.
 * 3. Le charabia : des blocs de lettres sans espace qui sautent de la minuscule à la
 *    majuscule (« AKGxYuNTVLxLcLrlzqRSEfZ »), sur au moins deux champs.
 *
 * Calibré le 19/10/2026 sur les 29 demandes reçues depuis juin : 13 robots sur 13
 * détectés, 0 vrai contact sur 15. Aucun vrai contact n'avait un seul passage
 * minuscule-majuscule, les robots en avaient de 3 à 7. Les couches 1 et 2 rejettent sans
 * bruit ; la couche 3 ne supprime rien, elle marque la demande comme spam probable.
 */

export const MIN_FILL_MS = 3000
export const MIN_GIBBERISH_LENGTH = 12
export const MIN_CASE_SWITCHES = 3
export const MIN_SUSPECT_FIELDS = 2

export const VERDICT = { ok: 'ok', suspect: 'suspect', bot: 'bot' }

const CASE_SWITCH = /[a-z][A-Z]/g

export function isGibberish(value) {
  const text = String(value ?? '').trim()
  if (text.length < MIN_GIBBERISH_LENGTH || /\s/.test(text)) return false
  return (text.match(CASE_SWITCH) ?? []).length >= MIN_CASE_SWITCHES
}

/**
 * @param {{ name?: string, club?: string, message?: string }} fields
 * @param {{ honeypot?: string, elapsedMs?: number }} signals
 */
export function classifyLead(fields, { honeypot, elapsedMs } = {}) {
  if (honeypot && String(honeypot).trim() !== '') return VERDICT.bot
  if (!Number.isFinite(elapsedMs) || elapsedMs < MIN_FILL_MS) return VERDICT.bot
  const suspects = [fields.name, fields.club, fields.message].filter(isGibberish).length
  return suspects >= MIN_SUSPECT_FIELDS ? VERDICT.suspect : VERDICT.ok
}
