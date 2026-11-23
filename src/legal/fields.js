/**
 * Les données d'identité et de contact citées par les textes juridiques, appelées dans le texte par
 * `{{cle}}`.
 *
 * Les CGU n'en appellent aucune : elles ne sont pas un fichier du site, la page les lit dans l'API
 * (`TERMS_API_PATH`, `documents.js`), telles qu'importées depuis `/platform/terms`.
 *
 * Une donnée qui revient à plusieurs endroits ne s'écrit qu'ici : la changer ici la change partout.
 * Les champs propres à une seule phrase restent dans le texte, avec le même marqueur.
 *
 * Tant qu'une valeur porte le marqueur « À COMPLÉTER », elle est surlignée à l'affichage et le texte
 * n'est pas publiable. Contrôle : grep -rnE "\[\[À (COMPLÉTER|VÉRIFIER) :" public src/legal/fields.js
 */
export const LEGAL_FIELDS = {
  // Éditeur et responsable du traitement
  publisherName: "Ismail JABBOUR",
  publisherLegalForm: 'entrepreneur individuel (micro-entreprise)',
  publisherAddress: "rue de l'Abreuvoir, 51100 Reims",
  publisherRegistration: '899 457 899 RCS Reims',
  publisherVat: 'TVA non applicable, article 293 B du CGI',
  publicationDirector: "Ismail JABBOUR",

  // Contacts
  contactEmail: 'contact@sweyl.com',
  privacyContact: 'contact@sweyl.com',
  dpo: 'aucun délégué désigné',

  // Versions des documents
  legalNoticeDate: '22/11/2026',
  privacyEffectiveDate: '21/11/2026',
}
