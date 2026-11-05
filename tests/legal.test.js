import { test } from 'node:test'
import assert from 'node:assert/strict'
import { interpolateLegalText } from '../src/legal/interpolate.js'
import { countMarkers } from '../src/legal/markers.js'

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
