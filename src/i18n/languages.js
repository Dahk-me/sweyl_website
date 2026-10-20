/**
 * Les langues du site, en données pures (`specs/Internationalisation.md` §9).
 *
 * Le français est la langue de référence : un texte naît en français dans `locales/fr/`, et
 * l'anglais et l'espagnol le suivent. Partagé avec les tests (`tests/translations.test.js`).
 */

export const SITE_LANGUAGES = ['fr', 'en', 'es']

export const DEFAULT_LANGUAGE = 'fr'

/**
 * `?lang=es` force la langue d'arrivée : c'est le lien qu'on envoie après une démo faite en
 * espagnol. Le choix est ensuite mémorisé sur l'appareil, comme celui du sélecteur.
 */
export const LANGUAGE_QUERY_PARAM = 'lang'

/**
 * Le choix se range dans un cookie, pas dans le stockage du navigateur : celui-ci est propre à
 * chaque sous-domaine, et l'anglais choisi sur sweyl.com retombait en français sur pro.sweyl.com.
 */
export const LANGUAGE_STORAGE_KEY = 'sweyl-language'

/** Le domaine commun de sweyl.com et pro.sweyl.com : un cookie posé dessus vaut pour les deux. */
export const SHARED_COOKIE_DOMAIN = 'sweyl.com'

const LANGUAGE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

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

/**
 * Le cookie qui retient la langue. Sur un hôte de `sweyl.com`, il est posé sur le domaine parent
 * pour être lu par les deux sites ; ailleurs (local, prévisualisation), les deux pages partagent
 * déjà le même serveur, donc le même cookie.
 */
export function languageCookie(language, hostname) {
  const shared = hostname === SHARED_COOKIE_DOMAIN || hostname.endsWith(`.${SHARED_COOKIE_DOMAIN}`)
  return [
    `${LANGUAGE_STORAGE_KEY}=${language}`,
    'path=/',
    `max-age=${LANGUAGE_COOKIE_MAX_AGE}`,
    'samesite=lax',
    ...(shared ? [`domain=${SHARED_COOKIE_DOMAIN}`, 'secure'] : []),
  ].join('; ')
}

/** La langue lue dans `document.cookie`, ou null si absente ou inconnue. */
export function readLanguageCookie(cookies) {
  for (const cookie of String(cookies ?? '').split(';')) {
    const [name, value] = cookie.trim().split('=')
    if (name === LANGUAGE_STORAGE_KEY) return isSiteLanguage(value) ? value : null
  }
  return null
}
