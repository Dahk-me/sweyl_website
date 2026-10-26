/**
 * La structure de sweyl.com : sections, listes, chiffres et captures. Les textes vivent dans les
 * fichiers de langue (`src/i18n/locales/<langue>/home.json`), traduits en anglais et en espagnol.
 * Tutoiement, phrases courtes, un seul appel à l'action répété partout (`cta.label`), qui mène
 * toujours au formulaire. Dans les titres, « *mot* » passe en orange et « \n » revient à la ligne.
 */
/**
 * Les ancres de la page. `vision`, `season` et `join` existaient avant la refonte du 23/10/2026 :
 * des liens déjà envoyés aux clubs y pointent, elles ne se renomment pas.
 */
export const ANCHORS = {
  top: 'top',
  heroJoin: 'hero-join',
  problem: 'problem',
  vision: 'vision',
  season: 'season',
  forWho: 'for-who',
  proof: 'proof',
  faq: 'faq',
  join: 'join',
  footer: 'footer',
}

/** Les deux destinations des boutons : l'inscription d'un club, ou l'application pour qui y a déjà un compte. */
export const CTA = { signup: 'signup', app: 'app' }

/** Le menu du header ; libellés dans header.nav.<id>. */
export const NAV = [
  { id: 'vision', anchor: ANCHORS.vision },
  { id: 'season', anchor: ANCHORS.season },
  { id: 'contact', anchor: ANCHORS.join },
]

/** Les trois douleurs, dans problem.cards.<id>. */
export const PROBLEMS = ['instinct', 'blind', 'fog']

/** Les quatre bénéfices, en liste à côté du téléphone. Textes dans vision.benefits.<id>. */
export const BENEFITS = ['coach', 'players', 'family', 'president']

/** Les trois gestes de la mise en route, dans steps.items.<id>. */
export const STEPS = ['activate', 'bench', 'everyone']

/**
 * Les rôles du sélecteur « Pour qui », dans forWho.roles.<id>. `shot` est l'emplacement de capture
 * (`lib/appShots.js`), `cta` la destination de son bouton : le coach et le président créent leur
 * club, le joueur et le parent ne créent rien, leur club les invite, ils accèdent à l'app.
 */
export const ROLES = [
  { id: 'coach', shot: 'coachs', cta: CTA.signup, proofs: ['video', 'sheet', 'feedback'] },
  { id: 'president', shot: 'dirigeants', cta: CTA.signup, proofs: ['teams', 'attendance', 'import'] },
  { id: 'player', shot: 'joueurs', cta: CTA.app, proofs: ['season', 'progress', 'career'] },
  { id: 'parent', shot: 'familles', cta: CTA.app, proofs: ['live', 'weekend', 'next'] },
]

/**
 * Chiffres réels des clubs, donnés par Ismail le 29/08/2026 et repris par le brief du 23/10/2026.
 * « Matchs par semaine » restait à confirmer. Libellés dans proof.stats.<id>.
 */
export const STATS = [
  { id: 'players', value: 1500, plus: true },
  { id: 'coaches', value: 90, plus: true },
  { id: 'clubs', value: 4 },
  { id: 'games', value: 100, plus: true },
]

export const statById = id => STATS.find(s => s.id === id)

/** « 1 500+ » en français, « 1,500+ » en anglais : le séparateur suit la langue de la page. */
export const formatStat = (stat, language, value = stat.value) =>
  `${new Intl.NumberFormat(language).format(value)}${stat.plus ? '+' : ''}`

/** Le nom reste celui de la personne ; son rôle et sa citation vivent dans proof.quotes.<id>. */
export const TESTIMONIALS = [
  { id: 'amaury', name: 'Amaury' },
  { id: 'luc', name: 'Luc' },
  { id: 'aniss', name: 'Aniss' },
  { id: 'will', name: 'Big Will' },
]

/** Les lignes du comparatif, dans beforeAfter.rows.<id>.{before,after}. */
export const BEFORE_AFTER = ['sheet', 'memory', 'feeling', 'feedback', 'president', 'transfer']

/** Les objections, dans l'ordre d'affichage ; question et réponse dans faq.items.<id>. */
export const FAQS = ['free', 'tech', 'ffbb', 'mistakes', 'transfer', 'onboarding', 'devices']

/**
 * Avancement de la saison sportive, du 1er août au 31 juillet comme dans l'application
 * (`ISeasonService` côté API, `getSeasonYear` côté front). Le site ne dépend d'aucun des deux,
 * d'où cette seule copie, à ne pas dupliquer ailleurs dans le site.
 */
export function seasonProgress(now = new Date()) {
  const startYear = now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear() - 1
  const start = new Date(startYear, 7, 1)
  const end = new Date(startYear + 1, 7, 1)
  return {
    season: `${startYear}/${String(startYear + 1).slice(2)}`,
    ratio: Math.min(1, Math.max(0.01, (now - start) / (end - start))),
  }
}
