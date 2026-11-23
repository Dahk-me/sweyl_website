import { test } from 'node:test'
import assert from 'node:assert/strict'
import { interpolateLegalText } from '../src/legal/interpolate.js'
import { countMarkers } from '../src/legal/markers.js'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { SITE_LANGUAGES } from '../src/i18n/languages.js'
import { LEGAL_DOCUMENTS, PUBLISHED_LEGAL_DOCUMENTS, TERMS_API_PATH, legalFileName, termsApiUrl } from '../src/legal/documents.js'

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
 * Un document publié est lié depuis le site : il doit être complet. Les CGU restent servies non
 * publiées : seule l'application y renvoie.
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

/**
 * Les CGU se lisent dans l'API (23/11/2026) : la réécriture qui y mène doit exister, passer avant
 * celle de la SPA (Vercel applique la première qui correspond), et viser la route publique.
 */
test('les CGU se lisent dans l\'API, par une réécriture placée avant la SPA', () => {
  const { rewrites } = JSON.parse(readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'))
  const terms = rewrites.findIndex(rewrite => rewrite.source === TERMS_API_PATH)
  const spa = rewrites.findIndex(rewrite => rewrite.destination === '/index.html')

  assert.ok(terms >= 0, 'réécriture des CGU absente')
  assert.ok(terms < spa, 'la réécriture des CGU doit précéder celle de la SPA')
  assert.match(rewrites[terms].destination, /\/api\/v2\/terms\/current$/)
  assert.ok(LEGAL_DOCUMENTS.terms.api)
})

test('la langue du site devient la valeur de l\'enum Language de l\'API', () => {
  assert.equal(termsApiUrl('fr'), `${TERMS_API_PATH}?lang=Fr`)
  assert.equal(termsApiUrl('en'), `${TERMS_API_PATH}?lang=En`)
  assert.equal(termsApiUrl('es'), `${TERMS_API_PATH}?lang=Es`)
})
