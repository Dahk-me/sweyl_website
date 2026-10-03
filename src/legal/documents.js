/**
 * Les trois documents juridiques du site. Leurs routes sont des **URL publiques et stables** :
 * l'application y renvoie (`gts-ui-react/src/lib/legalLinks.ts`) et les fiches des stores Apple et
 * Google les citent. Renommer une route casse ces liens sans que rien ne le signale ici.
 *
 * Slugs en français, sur le modèle de `/mentions-legales` qui existait avant eux.
 */
export const LEGAL_DOCUMENTS = {
  legalNotice: { route: '/mentions-legales', source: '/mentions-legales.md', title: 'Mentions légales' },
  terms: { route: '/cgu', source: '/cgu.md', title: "Conditions générales d'utilisation" },
  privacy: { route: '/confidentialite', source: '/confidentialite.md', title: 'Politique de confidentialité' },
}
