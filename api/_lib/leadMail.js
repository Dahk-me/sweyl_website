import { CLUB_ROLES, OFFER, PRO_ROLES } from '../../src/lib/leadOptions.js'

export const SPAM_PREFIX = '[Spam probable] '

const PARIS_DATE = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', day: '2-digit', month: '2-digit', year: 'numeric' })
const PARIS_TIME = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit' })

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Le mail reçu sur contact@sweyl.com. Le sujet porte l'offre et, pour le Pro, le niveau
 * avant le club : le tri se fait dans la liste de la boîte, sans ouvrir.
 *
 * @param {object} lead demande validée ({ offer, name, email, club, role, level?, message? })
 * @param {{ suspect?: boolean, now?: Date }} options
 */
export function buildLeadMail(lead, { suspect = false, now = new Date() } = {}) {
  const isPro = lead.offer === OFFER.pro
  const roleLabel = (isPro ? PRO_ROLES : CLUB_ROLES)[lead.role] ?? lead.role

  const subject = (suspect ? SPAM_PREFIX : '') + (isPro
    ? `PRO · Démo ${lead.level} · ${lead.club}`
    : `Nouvelle demande de démo ${lead.club}`)

  const rows = isPro
    ? [['Offre', 'Sweyl Pro'], ['Niveau', lead.level], ['Nom', lead.name], ['Email', lead.email], ['Club et équipe', lead.club], ['Rôle', roleLabel]]
    : [['Nom', lead.name], ['Email', lead.email], ['Club', lead.club], ['Rôle', roleLabel]]
  if (lead.message) rows.push(['Message', lead.message])

  const origin = isPro ? 'pro.sweyl.com' : 'sweyl.com'
  const sentAt = `Envoyé depuis ${origin} le ${PARIS_DATE.format(now)} à ${PARIS_TIME.format(now).replace(':', ' h ')}`

  const text = [...rows.map(([k, v]) => `${k} : ${v}`), '', sentAt].join('\n')
  const html = `
    <h2>${isPro ? 'Nouvelle demande de démo Pro' : 'Nouvelle demande de démo'}</h2>
    <table>
      ${rows.map(([k, v]) => k === 'Email'
        ? `<tr><td><strong>${k}</strong></td><td><a href="mailto:${escapeHtml(v)}">${escapeHtml(v)}</a></td></tr>`
        : `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`).join('\n      ')}
    </table>
    <p>${escapeHtml(sentAt)}</p>
  `

  return { fromName: isPro ? 'SWEYL Pro' : 'SWEYL Site', subject, text, html }
}
