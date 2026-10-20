import { test } from 'node:test'
import assert from 'node:assert/strict'
import { languageCookie, readLanguageCookie } from '../src/i18n/languages.js'

test('sur sweyl.com et pro.sweyl.com, la langue se pose sur le domaine commun', () => {
  for (const host of ['sweyl.com', 'www.sweyl.com', 'pro.sweyl.com']) {
    assert.match(languageCookie('en', host), /domain=sweyl\.com/)
  }
})

test('en local ou en prévisualisation, le cookie reste sur son hôte', () => {
  for (const host of ['localhost', 'sweyl-website-git-x.vercel.app', 'notsweyl.com']) {
    assert.doesNotMatch(languageCookie('en', host), /domain=/)
  }
})

test('la langue se relit parmi les autres cookies, une langue inconnue est ignorée', () => {
  assert.equal(readLanguageCookie(languageCookie('es', 'pro.sweyl.com')), 'es')
  assert.equal(readLanguageCookie('a=1; sweyl-language=en; b=2'), 'en')
  assert.equal(readLanguageCookie('sweyl-language=de'), null)
  assert.equal(readLanguageCookie(''), null)
})
