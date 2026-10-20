import { CLUB_ROLES, OFFER, PRO_LEVELS, PRO_ROLES } from '../../src/lib/leadOptions.js'
import { DEFAULT_LANGUAGE, isSiteLanguage } from '../../src/i18n/languages.js'

const MAX_FIELD = 200
const MAX_MESSAGE = 4000

const clean = (value, max) => String(value ?? '').trim().slice(0, max)

/**
 * Vérifie et normalise une demande. Rend { lead } ou { error }.
 * Une demande sans offre vient du site principal (le formulaire d'avant le Pro). La langue est
 * celle de la page au moment de l'envoi : c'est celle dans laquelle on répond.
 */
export function validateLead(body) {
  const offer = body?.offer === OFFER.pro ? OFFER.pro : OFFER.club
  const lead = {
    offer,
    name: clean(body?.name, MAX_FIELD),
    email: clean(body?.email, MAX_FIELD),
    club: clean(body?.club, MAX_FIELD),
    role: clean(body?.role, MAX_FIELD),
    message: clean(body?.message, MAX_MESSAGE),
    language: isSiteLanguage(body?.language) ? body.language : DEFAULT_LANGUAGE,
  }
  if (!lead.name || !lead.email || !lead.club || !lead.role) return { error: 'Champs requis manquants' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return { error: 'Email invalide' }

  if (offer === OFFER.pro) {
    lead.level = clean(body?.level, MAX_FIELD)
    if (!PRO_LEVELS.includes(lead.level)) return { error: 'Niveau invalide' }
    if (!Object.hasOwn(PRO_ROLES, lead.role)) return { error: 'Rôle invalide' }
  } else if (!Object.hasOwn(CLUB_ROLES, lead.role)) {
    return { error: 'Rôle invalide' }
  }
  return { lead }
}
