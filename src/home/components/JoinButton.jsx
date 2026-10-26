import React from 'react'
import { useTranslation } from 'react-i18next'
import { IconArrow } from '../../components/Icons'
import { appUrl, clubSignupUrl } from '../../lib/siteUrls'
import { CTA } from '../copy'

/**
 * L'appel à l'action de sweyl.com, toujours suivi de sa phrase de réassurance. Par défaut « Créer
 * mon club », vers l'inscription publique de l'application : le club s'inscrit seul, sans attendre
 * qu'on le rappelle (*Ismail, 24/10/2026*, chemin critique « est-ce que ça me retire de la
 * boucle ? »). Pour un joueur ou un parent, que son club invite, « Accéder à l'app ».
 */
const KINDS = {
  [CTA.signup]: { href: clubSignupUrl, label: 'cta.label', micro: 'cta.micro' },
  [CTA.app]: { href: appUrl, label: 'cta.app', micro: 'cta.appMicro' },
}

export default function JoinButton({ kind = CTA.signup, id, micro = true, className = '' }) {
  const { t } = useTranslation()
  const cta = KINDS[kind]
  return (
    <div id={id} className={`h-join ${className}`}>
      <a href={cta.href()} className="btn-primary h-join-btn">
        {t(cta.label)}
        <IconArrow size={15} stroke={2} />
      </a>
      {micro && <p className="h-micro">{t(cta.micro)}</p>}
    </div>
  )
}
