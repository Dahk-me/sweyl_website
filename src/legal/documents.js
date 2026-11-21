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
 */
export const LEGAL_DOCUMENTS = {
  legalNotice: { id: 'legalNotice', route: '/mentions-legales', file: 'mentions-legales', published: true, languages: SITE_LANGUAGES },
  terms: { id: 'terms', route: '/cgu', file: 'cgu', published: false, languages: [DEFAULT_LANGUAGE] },
  privacy: { id: 'privacy', route: '/confidentialite', file: 'confidentialite', published: true, languages: SITE_LANGUAGES },
}

export const PUBLISHED_LEGAL_DOCUMENTS = Object.values(LEGAL_DOCUMENTS).filter(document => document.published)

/**
 * Le texte long ne passe pas par le classeur de traduction (`specs/Internationalisation.md` §9) :
 * un fichier Markdown par langue dans `public/`, le français sous le nom sans suffixe. Chaque
 * fichier est exclu de la réécriture SPA dans `vercel.json`.
 */
export const legalFileName = (document, language) =>
  language === DEFAULT_LANGUAGE || !document.languages.includes(language)
    ? `${document.file}.md`
    : `${document.file}.${language}.md`
