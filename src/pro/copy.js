/**
 * La structure de pro.sweyl.com : sections, captures, valeurs du formulaire. Les textes vivent
 * dans les fichiers de langue (`src/i18n/locales/<langue>/pro.json`), traduits en anglais et en
 * espagnol. Vouvoiement en français, *usted* en espagnol, « nous » pour Sweyl, lexique du
 * terrain. Aucun prix : la seule phrase tarifaire permise est « Le tarif, communiqué à la démo ».
 * Dans les titres, « *mot* » passe en orange et « \n » revient à la ligne (voir Accent.jsx).
 */
export { CONTACT_EMAIL } from '../lib/leadOptions'

export const DEMO_ANCHOR = 'demo'

/** Les quatre piliers, dans l'ordre de la page. `key` désigne leur texte dans sections.<key>. */
export const PRO_SECTIONS = [
  { id: 'scouting', key: 'scouting', spec: ['sheet', 'duels', 'publication'], shot: 'preparation' },
  { id: 'adverses', key: 'opponents', spec: ['entry', 'reading', 'when'], shot: 'boxscore', flip: true },
  { id: 'analyse', key: 'analysis', spec: ['flow', 'shooting', 'shotChart'], shot: 'analyse' },
  { id: 'video', key: 'video', spec: ['videos', 'entry', 'devices'], shot: 'video', flip: true },
]

/** Les trois atouts listés au-dessus du formulaire, dans lead.perks.<id>. */
export const LEAD_PERKS = ['demo', 'price', 'reply']
