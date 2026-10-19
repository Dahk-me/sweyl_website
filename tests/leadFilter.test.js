import { test } from 'node:test'
import assert from 'node:assert/strict'
import { classifyLead, isGibberish, MIN_FILL_MS, VERDICT } from '../api/_lib/leadFilter.js'

// Exemples inventés, qui reproduisent les formes relevées le 19/10/2026 (jamais une vraie ligne).
const BOT = { name: 'QwRtyUiOpAsDfGhJk', club: 'mNbVcXzLkJhGfDsAqW', message: 'PoIuYtReWqAsDfGhJkLm' }
const HUMANS = [
  { name: 'Martin', club: 'ABGR', message: '' },
  { name: 'Jean Baptiste', club: 'Reims université club basket', message: 'Bonjour, je suis intéressé pour voir une démo' },
  { name: 'Tosetti-Bellieud Mani', club: 'GSEM Nice basket', message: '' },
  { name: 'DUPONT', club: 'PSG', message: '' },
  { name: 'McDonaldMcKenzie', club: 'Entente gaillarde muizonnaise', message: '' },
  { name: 'Hans Thomas', club: 'JSC Chambéry', message: 'je suis alternant au club' },
]
const human = { elapsedMs: MIN_FILL_MS + 20000 }

test('un bloc sans espace qui saute de casse est du charabia', () => {
  assert.equal(isGibberish('AKGxYuNTVLxLcLrlzqRSEfZ'), true)
  assert.equal(isGibberish(BOT.club), true)
})

test('les sigles, les noms et les phrases ne sont pas du charabia', () => {
  for (const v of ['ABGR', 'RUCB', 'PSG', 'RIZO', 'GSEM Nice Basket', 'McDonald', 'Tosetti-Bellieud', '', undefined]) {
    assert.equal(isGibberish(v), false, String(v))
  }
})

test('trois champs de charabia : spam probable, la demande part quand même', () => {
  assert.equal(classifyLead(BOT, human), VERDICT.suspect)
})

test('deux champs suffisent, un seul ne suffit pas', () => {
  assert.equal(classifyLead({ ...BOT, message: '' }, human), VERDICT.suspect)
  assert.equal(classifyLead({ name: BOT.name, club: 'ABGR', message: '' }, human), VERDICT.ok)
})

test('aucun vrai contact n’est marqué', () => {
  for (const h of HUMANS) assert.equal(classifyLead(h, human), VERDICT.ok, h.name)
})

test('le champ piège rempli : robot', () => {
  assert.equal(classifyLead(HUMANS[0], { ...human, honeypot: 'https://spam.example' }), VERDICT.bot)
})

test('envoyé trop vite, ou sans mesure du temps : robot', () => {
  assert.equal(classifyLead(HUMANS[0], { elapsedMs: 800 }), VERDICT.bot)
  assert.equal(classifyLead(HUMANS[0], {}), VERDICT.bot)
})
