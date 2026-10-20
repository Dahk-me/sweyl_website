import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_QUERY_PARAM,
  SITE_LANGUAGES,
  isSiteLanguage,
  languageCookie,
  matchLanguage,
  readLanguageCookie,
} from './languages'

/**
 * Traduction du site (`specs/Internationalisation.md` §9), même socle que l'application :
 * un fichier JSON par espace de noms et par langue, sous `locales/<langue>/<espace>.json`.
 * Seuls le français (référence, et repli d'une clé absente) et la langue courante se chargent.
 *
 * La langue se choisit dans cet ordre : `?lang=` dans l'adresse, puis le choix mémorisé (un
 * cookie commun à sweyl.com et pro.sweyl.com), puis la langue du navigateur. Le site n'a pas de
 * compte : rien ne se range ailleurs.
 */

const loaders = import.meta.glob('./locales/*/*.json')

/** Le chemin `./locales/fr/home.json` donne la langue `fr` et l'espace `home`. */
function parseBundlePath(path) {
  const [, , language, file] = path.split('/')
  return { language, namespace: file.replace(/\.json$/, '') }
}

const NAMESPACES = [...new Set(Object.keys(loaders).map(path => parseBundlePath(path).namespace))]

const loadedLanguages = new Set()

async function loadLanguage(language) {
  if (loadedLanguages.has(language)) return
  await Promise.all(
    Object.entries(loaders)
      .filter(([path]) => parseBundlePath(path).language === language)
      .map(async ([path, load]) => {
        const bundle = await load()
        i18n.addResourceBundle(language, parseBundlePath(path).namespace, bundle.default, true, true)
      }),
  )
  loadedLanguages.add(language)
}

function readStoredLanguage() {
  return readLanguageCookie(document.cookie)
}

function storeLanguage(language) {
  document.cookie = languageCookie(language, window.location.hostname)
}

function readQueryLanguage() {
  const requested = new URLSearchParams(window.location.search).get(LANGUAGE_QUERY_PARAM)
  return isSiteLanguage(requested) ? requested : null
}

/** Un lien `?lang=` reste juste après un changement au sélecteur, s'il est recopié. */
function syncQueryLanguage(language) {
  const url = new URL(window.location.href)
  if (!url.searchParams.has(LANGUAGE_QUERY_PARAM)) return
  url.searchParams.set(LANGUAGE_QUERY_PARAM, language)
  window.history.replaceState(window.history.state, '', url)
}

function detectLanguage() {
  const requested = readQueryLanguage()
  if (requested) {
    storeLanguage(requested)
    return requested
  }
  return readStoredLanguage() ?? matchLanguage(navigator.languages)
}

function applyDocumentLanguage(language) {
  document.documentElement.lang = language
}

/** À attendre avant le premier rendu : sans elle, la page clignoterait en clés brutes. */
export async function initI18n(defaultNamespace) {
  let language = detectLanguage()
  await i18n.use(initReactI18next).init({
    lng: language,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SITE_LANGUAGES,
    ns: NAMESPACES,
    defaultNS: defaultNamespace,
    resources: {},
    partialBundledLanguages: true,
    // React échappe déjà ce qu'il affiche : échapper ici doublerait les entités.
    interpolation: { escapeValue: false },
    returnNull: false,
  })
  await loadLanguage(DEFAULT_LANGUAGE)
  try {
    await loadLanguage(language)
  } catch {
    // Un fichier de langue qui ne se charge pas (réseau coupé, déploiement en cours) ne doit pas
    // laisser la page blanche : elle s'affiche en français.
    language = DEFAULT_LANGUAGE
    await i18n.changeLanguage(language)
  }
  applyDocumentLanguage(language)
}

export function currentLanguage() {
  const language = i18n.resolvedLanguage ?? i18n.language
  return isSiteLanguage(language) ? language : DEFAULT_LANGUAGE
}

export async function changeSiteLanguage(language) {
  await loadLanguage(language)
  await i18n.changeLanguage(language)
  storeLanguage(language)
  syncQueryLanguage(language)
  applyDocumentLanguage(language)
}

export { i18n }
