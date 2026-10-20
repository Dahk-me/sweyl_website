/**
 * Les valeurs fermées du formulaire de démo, partagées par le site et par la fonction
 * api/submit-lead.js : le navigateur envoie la clé, le serveur la vérifie et la traduit.
 */

export const OFFER = { club: 'club', pro: 'pro' }

export const CONTACT_EMAIL = 'contact@sweyl.com'

/** Rôles du formulaire du site principal. */
export const CLUB_ROLES = { president: 'Président', coach: 'Coach', other: 'Autre' }

/** Rôles du formulaire Pro : le staff d'une équipe, jamais un joueur. */
export const PRO_ROLES = { coach: 'Coach', staff: 'Adjoint ou staff', dirigeant: 'Dirigeant' }

/** Niveaux visés par l'offre Pro, dans l'ordre d'affichage. */
export const PRO_LEVELS = ['PN', 'N3', 'N2', 'N1', 'Autre']

/** Nom du champ piège : invisible pour un humain, rempli par un robot. */
export const HONEYPOT_FIELD = 'website'
