/**
 * Logos affichés dans la section SocialProof, servis par Vercel depuis
 * public/assets. Ils vivaient dans le Storage Supabase, partagé avec l'app :
 * chaque visite du site consommait son quota d'egress.
 * Pour ajouter un club ou un partenaire : déposer le fichier (WebP, 176px de
 * haut pour un club, 112px pour un partenaire) et ajouter sa ligne ici.
 * `srcLight` : variante pour le thème clair, quand le logo a des parties blanches.
 */
export const CLUB_LOGOS = [
  { src: '/assets/clubs/abgr.webp', alt: 'ABGR' },
  { src: '/assets/clubs/gsem.webp', alt: 'GSEM' },
  { src: '/assets/clubs/ruc.webp', alt: 'RUC' },
]

export const PARTNER_LOGOS = [
  { src: '/assets/partners/sacre-cookie.webp', alt: 'Sacré Cookie' },
  { src: '/assets/partners/quest-for-change.svg', srcLight: '/assets/partners/quest-for-change-light.svg', alt: 'Quest for Change' },
  { src: '/assets/partners/innovact.webp', alt: 'Innovact' },
]
