import { DEFAULT_LANGUAGE } from '../i18n/languages.js'

/**
 * Les trois documents juridiques du site. Leurs routes sont des **URL publiques et stables** :
 * l'application y renvoie (`gts-ui-react/src/lib/legalLinks.ts`) et les fiches des stores Apple et
 * Google les citent. Renommer une route casse ces liens sans que rien ne le signale ici.
 *
 * Slugs en français, sur le modèle de `/mentions-legales` qui existait avant eux. Le titre de chaque
 * document est la clé `legal.documents.<id>` de `common`.
 */
export const LEGAL_DOCUMENTS = {
  legalNotice: { id: 'legalNotice', route: '/mentions-legales', file: 'mentions-legales' },
  terms: { id: 'terms', route: '/cgu', file: 'cgu' },
  privacy: { id: 'privacy', route: '/confidentialite', file: 'confidentialite' },
}

/**
 * Le texte long ne passe pas par le classeur de traduction (`specs/Internationalisation.md` §9) :
 * un fichier Markdown par langue dans `public/`, le français sous le nom sans suffixe. Chaque
 * fichier est exclu de la réécriture SPA dans `vercel.json`.
 */
export const legalFileName = (document, language) =>
  language === DEFAULT_LANGUAGE ? `${document.file}.md` : `${document.file}.${language}.md`
