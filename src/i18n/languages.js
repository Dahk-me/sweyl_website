/**
 * Les langues du site, en données pures (`specs/Internationalisation.md` §9).
 *
 * Le français est la langue de référence : un texte naît en français dans `locales/fr/`, et
 * l'anglais et l'espagnol le suivent. Partagé avec les tests (`tests/translations.test.js`).
 */

import { readCookie, sharedCookie } from '../lib/sharedCookie.js'

export const SITE_LANGUAGES = ['fr', 'en', 'es']

export const DEFAULT_LANGUAGE = 'fr'

/**
 * `?lang=es` force la langue d'arrivée : c'est le lien qu'on envoie après une démo faite en
 * espagnol. Le choix est ensuite mémorisé sur l'appareil, comme celui du sélecteur.
 */
export const LANGUAGE_QUERY_PARAM = 'lang'

/** Le cookie du choix de langue, commun aux deux sites (`src/lib/sharedCookie.js`). */
export const LANGUAGE_STORAGE_KEY = 'sweyl-language'

/**
 * Le nom de chaque langue **dans sa propre langue**, jamais traduit : quelqu'un qui ne lit pas
 * la page courante doit reconnaître la sienne dans le sélecteur.
 */
export const LANGUAGE_NATIVE_NAMES = {
  fr: 'Français',
  en: 'English',
  es: 'Español',
}

export function isSiteLanguage(value) {
  return typeof value === 'string' && SITE_LANGUAGES.includes(value)
}

/**
 * La première langue prise en charge parmi des étiquettes de navigateur (`en-US`, `es`…),
 * ramenées à leur langue. Le français sinon.
 */
export function matchLanguage(tags) {
  for (const tag of tags ?? []) {
    const language = String(tag).split('-')[0].toLowerCase()
    if (isSiteLanguage(language)) return language
  }
  return DEFAULT_LANGUAGE
}

/** Le cookie qui retient la langue, posé pour les deux sites. */
export function languageCookie(language, hostname) {
  return sharedCookie(LANGUAGE_STORAGE_KEY, language, hostname)
}

/** La langue lue dans `document.cookie`, ou null si absente ou inconnue. */
export function readLanguageCookie(cookies) {
  const language = readCookie(cookies, LANGUAGE_STORAGE_KEY)
  return isSiteLanguage(language) ? language : null
}
