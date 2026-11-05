import { test } from 'node:test'
import assert from 'node:assert/strict'
import { interpolateLegalText } from '../src/legal/interpolate.js'
import { countMarkers } from '../src/legal/markers.js'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { SITE_LANGUAGES } from '../src/i18n/languages.js'
import { LEGAL_DOCUMENTS, PUBLISHED_LEGAL_DOCUMENTS, legalFileName } from '../src/legal/documents.js'

/** Les champs des textes juridiques (`src/legal/fields.js`) : une donnée ne s'écrit qu'une fois. */
test('un champ connu est remplacé par sa valeur', () => {
  assert.equal(interpolateLegalText('Éditeur : {{name}}.', { name: 'Sweyl' }), 'Éditeur : Sweyl.')
})

test('un champ inconnu devient un champ à compléter, jamais une chaîne vide', () => {
  const text = interpolateLegalText('Contact : {{missing}}.', {})
  assert.equal(countMarkers(text), 1)
})

test('les deux marqueurs sont comptés, et eux seuls', () => {
  const text = '[[À COMPLÉTER : adresse]] puis [[À VÉRIFIER : durée]], mais pas [[autre chose]].'
  assert.equal(countMarkers(text), 2)
})

/**
 * Un document publié est lié depuis le site : il doit être complet. Les CGU et la politique de
 * confidentialité restent servies non publiées tant que `TODO-CGU.md` n'est pas soldé.
 */
const ROOT = path.resolve(import.meta.dirname, '..')
const read = file => readFileSync(path.join(ROOT, 'public', file), 'utf8')
const unpublished = Object.values(LEGAL_DOCUMENTS).filter(document => !document.published)

test('un document publié est traduit dans chaque langue', () => {
  for (const document of PUBLISHED_LEGAL_DOCUMENTS) assert.deepEqual(document.languages, SITE_LANGUAGES, document.id)
})

test('un document publié ne porte aucun champ ouvert, dans aucune langue', () => {
  for (const document of PUBLISHED_LEGAL_DOCUMENTS) {
    for (const language of SITE_LANGUAGES) {
      const file = legalFileName(document, language)
      assert.equal(countMarkers(interpolateLegalText(read(file))), 0, file)
    }
  }
})

test('un document publié ne renvoie vers aucun document non publié', () => {
  for (const document of PUBLISHED_LEGAL_DOCUMENTS) {
    for (const language of SITE_LANGUAGES) {
      const text = read(legalFileName(document, language))
      for (const hidden of unpublished) assert.ok(!text.includes(`](${hidden.route}`), `${legalFileName(document, language)} -> ${hidden.route}`)
    }
  }
})
