import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildLeadMail, SPAM_PREFIX } from '../api/_lib/leadMail.js'
import { validateLead } from '../api/_lib/leadValidation.js'

const NOW = new Date('2026-10-23T19:14:00Z') // 21 h 14 à Paris
const PRO = { offer: 'pro', name: 'Thomas Garnier', email: 't.garnier@exemple.fr', club: 'Reims Université SM1', level: 'N2', role: 'coach', message: 'On joue samedi.' }
const CLUB = { name: 'Léa Martin', email: 'lea@exemple.fr', club: 'ABGR', role: 'president' }

test('sujet Pro : offre, niveau puis club', () => {
  const { lead } = validateLead(PRO)
  const mail = buildLeadMail(lead, { now: NOW })
  assert.equal(mail.subject, 'PRO · Démo N2 · Reims Université SM1')
  assert.equal(mail.fromName, 'SWEYL Pro')
  assert.match(mail.text, /^Offre : Sweyl Pro\nNiveau : N2\nNom : Thomas Garnier/)
  assert.match(mail.text, /Rôle : Coach/)
  assert.match(mail.text, /Envoyé depuis pro\.sweyl\.com le 23\/10\/2026 à 21 h 14$/)
})

test('le site principal garde son sujet', () => {
  const { lead } = validateLead(CLUB)
  assert.equal(buildLeadMail(lead, { now: NOW }).subject, 'Nouvelle demande de démo ABGR')
})

test('spam probable : le préfixe passe devant', () => {
  const { lead } = validateLead(PRO)
  assert.equal(buildLeadMail(lead, { suspect: true }).subject, `${SPAM_PREFIX}PRO · Démo N2 · Reims Université SM1`)
})

test('les valeurs saisies sont échappées dans le HTML', () => {
  const { lead } = validateLead({ ...PRO, message: '<img src=x onerror=alert(1)>' })
  const { html } = buildLeadMail(lead)
  assert.ok(!html.includes('<img'))
  assert.ok(html.includes('&lt;img'))
})

test('Pro : niveau et rôle exigés dans leur liste fermée', () => {
  assert.ok(validateLead({ ...PRO, level: '' }).error)
  assert.ok(validateLead({ ...PRO, level: 'NM1' }).error)
  assert.ok(validateLead({ ...PRO, role: 'president' }).error)
  assert.ok(validateLead({ ...PRO, role: 'joueur' }).error)
})

test('une demande en français ne porte pas de ligne de langue', () => {
  const { lead } = validateLead(PRO)
  assert.equal(lead.language, 'fr')
  assert.doesNotMatch(buildLeadMail(lead, { now: NOW }).text, /Langue/)
})

test('une demande venue d\'une page traduite dit dans quelle langue répondre', () => {
  const { lead } = validateLead({ ...PRO, language: 'es' })
  assert.match(buildLeadMail(lead, { now: NOW }).text, /Rôle : Coach\nLangue : Español\nMessage/)
})

test('une langue inconnue retombe sur le français', () => {
  assert.equal(validateLead({ ...CLUB, language: 'de' }).lead.language, 'fr')
})

test('site principal : les rôles du club, pas ceux du Pro', () => {
  assert.ok(validateLead({ ...CLUB, role: 'staff' }).error)
  assert.ok(validateLead({ ...CLUB, email: 'pas-un-mail' }).error)
})
