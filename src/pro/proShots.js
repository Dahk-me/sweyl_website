/**
 * Captures de pro.sweyl.com, produites par gts/brand-assets/screenshots (mode composition),
 * déposées dans public/assets/pro/{shot}_{device}_{theme}.webp, cadre compris.
 * Jamais l'écran de saisie : on montre ce que la saisie produit, pas le geste.
 */
export const DEVICE = { phone: 'phone', tablet: 'tablet', laptop: 'laptop' }

/** Dimensions natives des fichiers cadrés, en pixels. Servent à réserver la place. */
export const DEVICE_SIZE = {
  phone: { w: 598, h: 1180 },
  tablet: { w: 1400, h: 995 },
  laptop: { w: 1600, h: 950 },
}

/** Les captures produites. Une capture absente s'affiche en emplacement provisoire. */
export const READY = new Set([])

export const shotKey = (shot, device) => `${shot}_${device}`
export const shotSrc = (shot, device, theme) => `/assets/pro/${shot}_${device}_${theme}.webp`
