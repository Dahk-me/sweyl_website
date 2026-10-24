import React from 'react'
import { IconArrow } from '../../components/Icons'
import { proUrl } from '../../lib/siteUrls'

/**
 * Le passage vers pro.sweyl.com, en vrai bouton à droite du header : la marque seule ne se lisait
 * pas comme cliquable (*Ismail, 24/10/2026*). Elle garde ses couleurs, « SWEYL » dans la couleur du
 * texte et « PRO » en orange (classes de la marque, `index.css`), dans une pastille cadrée d'orange.
 */
export default function ProButton() {
  return (
    <a className="h-pro-btn" href={proUrl()} aria-label="Sweyl Pro">
      <span className="sweyl-pro-mark-word">SWEYL</span>
      <span className="sweyl-pro-mark-pro">PRO</span>
      <IconArrow size={13} stroke={2} />
    </a>
  )
}
