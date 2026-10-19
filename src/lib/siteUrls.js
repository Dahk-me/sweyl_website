/**
 * Liens entre sweyl.com et pro.sweyl.com.
 *
 * En production, chaque site vit sur son domaine. Partout ailleurs (serveur local, prévisualisation
 * Vercel), les deux pages sont servies par le même serveur : un lien vers le domaine de production
 * ferait quitter l'environnement qu'on est en train de tester.
 */
export const PRODUCTION_HOSTS = ['sweyl.com', 'www.sweyl.com', 'pro.sweyl.com']

const onProduction = () => typeof window !== 'undefined' && PRODUCTION_HOSTS.includes(window.location.hostname)

export const proUrl = () => (onProduction() ? 'https://pro.sweyl.com' : '/pro.html')
export const mainSiteUrl = () => (onProduction() ? 'https://sweyl.com' : '/')
export const legalUrl = () => (onProduction() ? 'https://sweyl.com/mentions-legales' : '/mentions-legales')
