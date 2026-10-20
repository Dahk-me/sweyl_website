import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { DEFAULT_LANGUAGE, SITE_LANGUAGES } from '../src/i18n/languages.js'

/**
 * Complétude des traductions du site (`specs/Internationalisation.md` §5.4 et §9) : rien ne part
 * en production à moitié traduit.
 */
const ROOT = path.resolve(import.meta.dirname, '..')
const LOCALES = path.join(ROOT, 'src', 'i18n', 'locales')
const NAMESPACES = readdirSync(path.join(LOCALES, DEFAULT_LANGUAGE)).filter(f => f.endsWith('.json')).map(f => f.replace(/\.json$/, ''))

const read = (language, namespace) => JSON.parse(readFileSync(path.join(LOCALES, language, `${namespace}.json`), 'utf8'))

function flatten(tree, prefix = '') {
  return Object.entries(tree).flatMap(([key, value]) => {
    const keyPath = prefix ? `${prefix}.${key}` : key
    return typeof value === 'string' ? [[keyPath, value]] : flatten(value, keyPath)
  })
}

const params = text => [...text.matchAll(/\{\{\s*(\w+)\s*\}\}/g)].map(m => m[1]).sort()
const accents = text => (text.match(/\*/g) ?? []).length

test('aucun tableau dans les fichiers de langue : le classeur ne saurait pas les réécrire', () => {
  const hasArray = node => Array.isArray(node) || (typeof node === 'object' && Object.values(node).some(hasArray))
  for (const language of SITE_LANGUAGES) for (const namespace of NAMESPACES) assert.ok(!hasArray(read(language, namespace)), `${language}/${namespace}`)
})

for (const language of SITE_LANGUAGES.filter(l => l !== DEFAULT_LANGUAGE)) {
  for (const namespace of NAMESPACES) {
    test(`${language}/${namespace} : mêmes clés que le français, aucune vide, mêmes paramètres et accents`, () => {
      const reference = new Map(flatten(read(DEFAULT_LANGUAGE, namespace)))
      const translated = new Map(flatten(read(language, namespace)))
      assert.deepEqual([...translated.keys()].sort(), [...reference.keys()].sort())
      for (const [key, text] of reference) {
        const other = translated.get(key)
        assert.ok(other.trim(), `${key} vide`)
        assert.deepEqual(params(other), params(text), `${key} : paramètres`)
        assert.equal(accents(other), accents(text), `${key} : mots en orange (*mot*)`)
      }
    })
  }
}

test('les mentions légales existent dans chaque langue', () => {
  for (const language of SITE_LANGUAGES) {
    const file = language === DEFAULT_LANGUAGE ? 'mentions-legales.md' : `mentions-legales.${language}.md`
    assert.ok(existsSync(path.join(ROOT, 'public', file)), file)
  }
})

test('toute clé littérale appelée dans le code existe en français', () => {
  const sources = []
  const walk = directory => readdirSync(directory, { withFileTypes: true }).forEach(entry => {
    const full = path.join(directory, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (/\.jsx?$/.test(entry.name)) sources.push(full)
  })
  walk(path.join(ROOT, 'src'))

  const known = new Set(NAMESPACES.flatMap(namespace => flatten(read(DEFAULT_LANGUAGE, namespace)).map(([key]) => `${namespace}:${key}`)))
  const exists = key => (key.includes(':') ? known.has(key) : NAMESPACES.some(namespace => known.has(`${namespace}:${key}`)))

  for (const source of sources) {
    for (const [, key] of readFileSync(source, 'utf8').matchAll(/\bt\('([\w.:]+)'/g)) {
      assert.ok(exists(key), `${path.relative(ROOT, source)} : ${key}`)
    }
  }
})
