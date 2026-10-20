/**
 * Captures de l'application, produites par gts/brand-assets/screenshots.
 *
 * Chaque emplacement du site a deux variantes possibles, A et B. Pour basculer
 * un emplacement, ne change QUE la valeur dans CHOSEN : rien d'autre à toucher.
 * Les 20 fichiers sont déjà déployés dans public/assets/app. Le texte alternatif de chaque
 * capture vit dans shots.<name> des fichiers de langue (espace home).
 */

/** Les deux variantes disponibles pour chaque emplacement. */
export const VARIANTS = {
  clubLife: {
    A: { name: 'live' },
    B: { name: 'saisie' },
  },
  coachs: {
    A: { name: 'coach' },
    B: { name: 'coach2' },
  },
  joueurs: {
    A: { name: 'joueur' },
    B: { name: 'joueur2' },
  },
  familles: {
    A: { name: 'familles' },
    B: { name: 'familles2' },
  },
  dirigeants: {
    A: { name: 'club' },
    B: { name: 'club2' },
  },
}

/** La variante retenue pour chaque emplacement. Bascule A vers B ici. */
export const CHOSEN = {
  clubLife: 'A',   // live      · le match en direct
  coachs: 'A',     // coach     · l'analyse vidéo
  joueurs: 'B',    // joueur2   · le profil de saison
  familles: 'B',   // familles2 · l'accueil famille
  dirigeants: 'B', // club2     · la vue du club
}

/** Dimensions natives des fichiers, en pixels. Sert à réserver la place (CLS). */
export const SHOT_SIZE = { w: 598, h: 1180 }

export const shotFor = (slot) => VARIANTS[slot][CHOSEN[slot]]
