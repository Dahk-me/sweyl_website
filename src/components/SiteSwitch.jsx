import React from 'react'
import { IconArrow } from './Icons'

/**
 * Le passage d'un site à l'autre, tout à droite du header, symétrique sur les deux sites
 * (*Ismail, 24/10/2026*) : « SWEYL PRO » sur sweyl.com, « SWEYL CLUB » sur pro.sweyl.com.
 * « SWEYL » dans la couleur du texte, le suffixe en orange (classes de la marque), dans une
 * pastille cadrée d'orange qui se remplit au survol. Les marques ne se traduisent pas.
 */
export default function SiteSwitch({ href, suffix, label }) {
  return (
    <a className="site-switch" href={href} aria-label={label}>
      <span className="sweyl-pro-mark-word">SWEYL</span>
      <span className="sweyl-pro-mark-pro">{suffix}</span>
      <IconArrow size={13} stroke={2} />
    </a>
  )
}
