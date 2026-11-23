import { DEFAULT_LANGUAGE, SITE_LANGUAGES } from '../i18n/languages.js'

/**
 * Les trois documents juridiques du site. Leurs routes sont des **URL publiques et stables** :
 * l'application y renvoie (`gts-ui-react/src/lib/legalLinks.ts`) et les fiches des stores Apple et
 * Google les citent. Renommer une route casse ces liens sans que rien ne le signale ici.
 *
 * Slugs en français, sur le modèle de `/mentions-legales` qui existait avant eux. Le titre de chaque
 * document est la clé `legal.documents.<id>` de `common`.
 *
 * `published` décide seul des liens : un document non publié reste servi à son URL, mais aucun pied
 * de page n'y renvoie, et aucun document publié ne peut y renvoyer non plus (test). Les CGU restent
 * à faux pour de bon : elles ne concernent que l'application, qui y renvoie avec les stores, et le
 * site n'a pas à les afficher en pied de page.
 *
 * `languages` liste les traductions présentes ; une autre langue lit le français.
 *
 * **Les CGU ne sont pas un fichier du site** (23/11/2026, *arbitrage d'Ismail*) : la version qui
 * fait foi vit dans la base de l'application, importée depuis `/platform/terms`, et la page les
 * lit à `TERMS_API_PATH` (`api: true`). Ni copie à tenir à jour, ni `languages` à déclarer : l'API
 * sert la traduction quand elle existe, le français sinon.
 */
export const LEGAL_DOCUMENTS = {
  legalNotice: { id: 'legalNotice', route: '/mentions-legales', file: 'mentions-legales', published: true, languages: SITE_LANGUAGES },
  terms: { id: 'terms', route: '/cgu', api: true, published: false },
  privacy: { id: 'privacy', route: '/confidentialite', file: 'confidentialite', published: true, languages: SITE_LANGUAGES },
}

export const PUBLISHED_LEGAL_DOCUMENTS = Object.values(LEGAL_DOCUMENTS).filter(document => document.published)

/** Les documents servis depuis un fichier Markdown de `public/`. */
export const FILE_LEGAL_DOCUMENTS = Object.values(LEGAL_DOCUMENTS).filter(document => !document.api)

/**
 * Les CGU en vigueur. Même origine que le site : `vercel.json` réécrit ce chemin vers
 * `GET /api/v2/terms/current` de l'API (le proxy de `vite.config.js` en local), donc aucun CORS à
 * ouvrir. Pas sous `/api`, qui porte les fonctions du site (`api/submit-lead.js`).
 */
export const TERMS_API_PATH = '/legal-api/terms/current'

/** Langue du site vers l'enum `Language` de l'API (`Fr`, `En`, `Es`). */
export const termsApiUrl = language =>
  `${TERMS_API_PATH}?lang=${language.charAt(0).toUpperCase()}${language.slice(1)}`

/**
 * Le texte long ne passe pas par le classeur de traduction (`specs/Internationalisation.md` §9) :
 * un fichier Markdown par langue dans `public/`, le français sous le nom sans suffixe. Chaque
 * fichier est exclu de la réécriture SPA dans `vercel.json`.
 */
export const legalFileName = (document, language) =>
  language === DEFAULT_LANGUAGE || !document.languages.includes(language)
    ? `${document.file}.md`
    : `${document.file}.${language}.md`
