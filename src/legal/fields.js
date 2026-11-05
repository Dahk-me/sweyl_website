/**
 * Les données d'identité et de contact citées par les textes juridiques (`public/cgu.md`,
 * `public/confidentialite.md`), appelées dans le texte par `{{cle}}`.
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
  termsVersion: '1.0',
  termsEffectiveDate: "[[À COMPLÉTER : date d'entrée en vigueur des CGU]]",
  privacyEffectiveDate: "[[À COMPLÉTER : date d'entrée en vigueur de la politique de confidentialité]]",
}
