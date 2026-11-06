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
/** Un document juridique (`LEGAL_DOCUMENTS`), toujours servi par sweyl.com, y compris depuis le Pro. */
export const legalUrl = document => (onProduction() ? `https://sweyl.com${document.route}` : document.route)

/**
 * L'application. Elle n'existe qu'en production : le site local ou une prévisualisation Vercel ne
 * la servent pas, ces liens visent donc toujours app.sweyl.com.
 */
export const APP_ORIGIN = 'https://app.sweyl.com'
/** L'entrée de l'application : la connexion pour qui n'est pas connecté, l'accueil sinon. */
export const appUrl = () => `${APP_ORIGIN}/`
/** Le funnel public d'inscription d'un club (`specs/Onboarding.md`), sans code d'accès. */
export const clubSignupUrl = () => `${APP_ORIGIN}/inscription-club`
