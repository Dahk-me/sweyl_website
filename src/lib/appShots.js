/**
 * Captures de l'application, produites par gts/brand-assets/screenshots.
 *
 * Chaque emplacement du site a deux variantes possibles, A et B. Pour basculer
 * un emplacement, ne change QUE la valeur dans CHOSEN : rien d'autre à toucher.
 * Les 20 fichiers sont déjà déployés dans public/assets/app.
 */

/** Les deux variantes disponibles pour chaque emplacement. */
export const VARIANTS = {
  clubLife: {
    A: { name: 'live', alt: "Suivi d'un match en direct dans l'application Sweyl" },
    B: { name: 'saisie', alt: "Saisie des statistiques pendant un match dans Sweyl" },
  },
  coachs: {
    A: { name: 'coach', alt: "Analyse vidéo : l'action revue et rattachée au joueur" },
    B: { name: 'coach2', alt: "Accueil du coach : la semaine de son équipe" },
  },
  joueurs: {
    A: { name: 'joueur', alt: "Fiche de match d'un joueur et ses points forts" },
    B: { name: 'joueur2', alt: "Profil de saison d'un joueur et sa progression" },
  },
  familles: {
    A: { name: 'familles', alt: 'Calendrier des matchs et événements du club' },
    B: { name: 'familles2', alt: "Accueil famille : résultat du week-end et prochain match" },
  },
  dirigeants: {
    A: { name: 'club', alt: "Assiduité aux entraînements, équipe par équipe" },
    B: { name: 'club2', alt: 'Vue du club : toutes les équipes de la saison' },
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
