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
  publisherName: "[[À COMPLÉTER : raison sociale de l'éditeur]]",
  publisherLegalForm: '[[À COMPLÉTER : forme juridique et capital social (ou mention « entreprise individuelle »)]]',
  publisherAddress: "[[À COMPLÉTER : adresse postale du siège de l'éditeur]]",
  publisherRegistration: '[[À COMPLÉTER : numéro SIREN et ville du RCS, ou mention équivalente]]',
  publisherVat: '[[À COMPLÉTER : numéro de TVA intracommunautaire, ou mention « non applicable »]]',
  publicationDirector: '[[À COMPLÉTER : nom et qualité du directeur de la publication]]',

  // Contacts
  contactEmail: '[[À COMPLÉTER : adresse e-mail de contact générale]]',
  privacyContact: "[[À COMPLÉTER : adresse (e-mail et/ou postale) à laquelle exercer ses droits sur ses données]]",
  dpo: '[[À COMPLÉTER : délégué à la protection des données (nom ou fonction, et contact), ou mention « aucun DPO désigné »]]',

  // Versions des documents
  termsVersion: '[[À COMPLÉTER : numéro de version des CGU (identique à celui enregistré en base par le back-office)]]',
  termsEffectiveDate: "[[À COMPLÉTER : date d'entrée en vigueur des CGU]]",
  privacyEffectiveDate: "[[À COMPLÉTER : date d'entrée en vigueur de la politique de confidentialité]]",
}
