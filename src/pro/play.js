/**
 * Le système joué en boucle dans le hero : un Spain pick and roll.
 * Repère du SVG : 720 × 620, panier en haut (360, 62), ligne médiane en bas.
 * Clés : [t (s), x, y]. Une clé répétée = le joueur attend.
 * Un autre système se jouerait en changeant ce fichier seul.
 */
export const PLAY = {
  name: 'Spain pick and roll',
  period: 9,
  start: 2.2,
  off: {
    o1: { n: '1', k: [[0, 330, 545], [1.7, 330, 545], [2.4, 420, 528], [3.3, 505, 410]] },
    o2: { n: '2', k: [[0, 602, 330], [2.1, 602, 330], [2.9, 418, 452], [3.5, 418, 452], [4.3, 298, 500]] },
    o3: { n: '3', k: [[0, 76, 46]] },
    o4: { n: '4', k: [[0, 644, 46], [3.0, 644, 46], [3.8, 636, 96]] },
    o5: { n: '5', k: [[0, 360, 300], [0.8, 360, 300], [1.6, 372, 500], [2.9, 372, 500], [3.3, 352, 420], [3.9, 352, 160]] },
  },
  def: {
    x1: { k: [[0, 336, 505], [1.7, 336, 505], [2.2, 352, 488], [2.9, 440, 502], [3.6, 486, 382]] },
    x2: { k: [[0, 566, 300], [2.1, 566, 300], [2.9, 480, 400], [3.6, 408, 262], [4.4, 374, 210], [5.0, 336, 410], [5.8, 320, 454]] },
    x3: { k: [[0, 110, 96], [2.8, 110, 96], [3.6, 140, 150]] },
    x4: { k: [[0, 610, 96], [2.8, 610, 96], [3.6, 590, 150]] },
    x5: { k: [[0, 360, 250], [0.8, 360, 250], [1.6, 378, 456], [2.4, 426, 494], [2.9, 426, 490], [4.6, 422, 484], [5.6, 380, 300]] },
  },
  trails: [
    { who: 'o5', t0: 0.8, t1: 1.6, type: 'cut', screen: true },
    { who: 'o1', t0: 1.7, t1: 3.3, type: 'dribble' },
    { who: 'o2', t0: 2.1, t1: 2.9, type: 'cut', screen: true },
    { who: 'o5', t0: 2.9, t1: 3.9, type: 'cut' },
    { who: 'o4', t0: 3.0, t1: 3.8, type: 'cut' },
    { who: 'o2', t0: 3.5, t1: 4.3, type: 'cut' },
  ],
  pass: { t0: 4.5, t1: 5.0, from: 'o1', to: 'o2' },
  shot: { t0: 5.2, t1: 6.1, by: 'o2', rim: [360, 62] },
  fadeOut: [7.4, 8.2],
  fadeIn: [8.2, 8.8],
  /** Vitesse de lecture : 0,5 joue le système deux fois plus lentement que ses clés. */
  speed: 0.5,
  /** Instant figé quand le mouvement est réduit : le schéma final, tir compris. */
  frozenAt: 7.0,
}
