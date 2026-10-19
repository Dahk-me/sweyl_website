/**
 * Tous les textes de pro.sweyl.com, en un seul endroit (traduction à venir).
 * Vouvoiement, « nous » pour Sweyl, lexique du terrain. Aucun prix : la seule phrase
 * tarifaire permise est « Le tarif, communiqué à la démo ».
 */
import { PRO_LEVELS, PRO_ROLES } from '../lib/leadOptions'

export const CONTACT_EMAIL = 'contact@sweyl.com'
export const DEMO_ANCHOR = 'demo'

export const COPY = {
  header: {
    back: 'Sweyl pour les clubs',
    themeLight: 'Clair',
    themeDark: 'Sombre',
    cta: 'Réserver une démo',
    ctaShort: 'Démo',
  },

  hero: {
    eyebrow: 'Sweyl Pro · Bientôt disponible',
    titleBefore: 'Le match se gagne ',
    titleAccent: 'avant',
    titleAfter: ' l’entre-deux.',
    sub: 'Vos stats, les leurs, le scouting et la vidéo calée sur chaque action. L’outil des staffs, de la prénationale à la N1.',
    cta: 'Réserver une démo',
    devices: 'Ordinateur · Tablette · Téléphone',
  },

  pillars: [
    { id: 'scouting', n: '01', title: 'Le scouting', hint: 'Leur jeu, vos duels' },
    { id: 'adverses', n: '02', title: 'Leurs stats', hint: 'Joueur par joueur' },
    { id: 'analyse', n: '03', title: 'Vos stats', hint: 'Le match expliqué' },
    { id: 'video', n: '04', title: 'La vidéo', hint: 'Calée sur chaque action' },
  ],

  trio: {
    eyebrow: 'Ordinateur · Tablette · Téléphone',
    title: 'Le même scouting, partout.',
    sub: 'Préparé au bureau, ouvert au bord du terrain. Chaque joueur lit sa fiche sur son téléphone.',
    caption: 'Fiche d’un joueur adverse, publiée à l’équipe',
  },

  sections: [
    {
      id: 'scouting',
      eyebrow: '01 · Le scouting · Avant le match',
      title: 'Leur jeu. Vos duels.',
      sub: 'Leurs systèmes, leurs défenses, leurs joueurs, sur une fiche qui grandit saison après saison. Vous posez les duels, vous publiez : chacun sait qui il prend.',
      spec: [
        ['Fiche adverse', 'Jeu, défenses, systèmes, joueurs'],
        ['Duels', 'Un adversaire, un ou plusieurs des vôtres'],
        ['Publication', 'Vous savez qui a lu, et quand'],
      ],
      shot: 'preparation',
    },
    {
      id: 'adverses',
      eyebrow: '02 · Leurs stats · Pendant le match',
      title: 'Chaque adversaire a sa ligne.',
      sub: 'Leurs numéros, leurs tirs, leurs pertes, saisis sur le même écran que les vôtres. Au buzzer, vous savez qui vous a fait mal.',
      spec: [
        ['Saisie', 'Joueur par joueur, numéros de la feuille'],
        ['Lecture', 'Éval et +/- adverses'],
        ['Quand', 'En direct, en différé ou depuis la vidéo'],
      ],
      shot: 'boxscore',
      flip: true,
    },
    {
      id: 'analyse',
      eyebrow: '03 · Vos stats · Après le match',
      title: 'Le match, expliqué.',
      sub: 'Les séries, les pannes, l’adresse des deux camps. Et chaque tir, à sa place sur le terrain.',
      spec: [
        ['Fil du match', 'Séries et pannes, panier par panier'],
        ['Adresse', 'La vôtre, la leur, face à vos habitudes'],
        ['Carte des tirs', 'Réussis et ratés, par joueur'],
      ],
      shot: 'analyse',
    },
    {
      id: 'video',
      eyebrow: '04 · La vidéo · Toute la semaine',
      title: 'Chaque action rejoue son instant.',
      sub: 'Un clic sur une statistique, le film s’y cale. Saisissez depuis la vidéo : chaque action naît synchronisée.',
      spec: [
        ['Vidéos', 'Plusieurs angles par match'],
        ['Saisie', 'Depuis le film, sans le quitter'],
        ['Supports', 'Tablette et ordinateur, le film reste chez vous'],
      ],
      shot: 'video',
      flip: true,
    },
  ],

  shotsAlt: {
    fiche: 'Fiche d’un joueur adverse, avec le duel et la façon de le défendre',
    preparation: 'Préparation du match publiée aux joueurs, avec les duels et leur lecture',
    boxscore: 'Statistiques de l’équipe adverse, joueur par joueur, avec l’Éval et le +/-',
    analyse: 'Analyse d’un match : le fil du match, l’adresse et la carte des tirs des deux camps',
    video: 'Outil vidéo calé sur une action du journal du match',
  },
  zoomClose: 'Fermer',

  lead: {
    eyebrow: 'Démo sur rendez-vous',
    titleLines: ['Voyez-le', 'sur ', 'matchs.'],
    titleAccent: 'vos',
    perks: ['Une démo sur un de vos matchs', 'Le tarif, communiqué à la démo', 'Réponse sous 24 h'],
    fields: {
      name: 'Nom',
      email: 'Email',
      club: 'Club et équipe',
      clubPlaceholder: 'Ex. Reims Université, SM1',
      level: 'Niveau de l’équipe',
      role: 'Votre rôle',
      message: 'Message (optionnel)',
      messagePlaceholder: 'Votre prochain adversaire, votre façon de filmer…',
    },
    levels: PRO_LEVELS,
    roles: PRO_ROLES,
    submit: 'Demander ma démo',
    sending: 'Envoi en cours…',
    noCommitment: 'SANS ENGAGEMENT',
    levelMissing: 'Choisissez le niveau de l’équipe.',
    error: 'L’envoi a échoué. Réessayez, ou écrivez-nous à contact@sweyl.com.',
    okTitle: 'Reçu.',
    okText: 'Nous revenons vers vous sous 24 h pour fixer la démo.',
  },

  footer: {
    line: 'La préparation des staffs, de la prénationale à la N1.',
    backTitle: 'RETOUR',
    back: 'Sweyl pour les clubs',
    contactTitle: 'CONTACT',
    legal: 'Mentions légales',
    copyright: '© 2026 SWEYL',
    madeIn: 'CONÇU À REIMS',
  },

  play: { caption: 'Spain pick and roll' },
}
