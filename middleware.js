import { rewrite } from '@vercel/functions/middleware'

/**
 * pro.sweyl.com sert pro.html, et rien d'autre.
 *
 * Un middleware plutôt qu'une réécriture de vercel.json : les réécritures passent après
 * le système de fichiers, donc « / » aurait servi index.html (le site principal, et son
 * aperçu de lien) au lieu de la page Pro.
 */
export const PRO_HOST = 'pro.sweyl.com'

export const config = {
  matcher: ['/((?!assets/|api/|pro\\.html).*)'],
}

export default function middleware(request) {
  const url = new URL(request.url)
  if (url.hostname !== PRO_HOST) return undefined
  return rewrite(new URL('/pro.html', request.url))
}
