/**
 * Les préférences du visiteur (langue, thème) communes à sweyl.com et pro.sweyl.com.
 *
 * Elles vivent dans un cookie, pas dans `localStorage` : celui-ci est propre à chaque
 * sous-domaine, et un choix fait sur sweyl.com était oublié en passant sur pro.sweyl.com. Sur un
 * hôte de `sweyl.com`, le cookie se pose sur le domaine parent pour être lu par les deux sites ;
 * ailleurs (local, prévisualisation), les deux pages partagent déjà le même serveur.
 */

/** Le domaine commun de sweyl.com et pro.sweyl.com : un cookie posé dessus vaut pour les deux. */
export const SHARED_COOKIE_DOMAIN = 'sweyl.com'

const SHARED_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

export function sharedCookie(name, value, hostname) {
  const shared = hostname === SHARED_COOKIE_DOMAIN || hostname.endsWith(`.${SHARED_COOKIE_DOMAIN}`)
  return [
    `${name}=${value}`,
    'path=/',
    `max-age=${SHARED_COOKIE_MAX_AGE}`,
    'samesite=lax',
    ...(shared ? [`domain=${SHARED_COOKIE_DOMAIN}`, 'secure'] : []),
  ].join('; ')
}

/** La valeur d'un cookie lue dans `document.cookie`, ou null s'il est absent. */
export function readCookie(cookies, name) {
  for (const cookie of String(cookies ?? '').split(';')) {
    const [key, value] = cookie.trim().split('=')
    if (key === name) return value ?? null
  }
  return null
}
