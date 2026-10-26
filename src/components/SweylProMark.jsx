import React from 'react'

/**
 * La marque de l'offre Pro : « SWEYL » dans la couleur du texte, « PRO » en orange, dans un
 * cadre orange. Marque seule sur la page Pro ; ses classes servent aussi au bouton de passage
 * d'un site à l'autre (`SiteSwitch.jsx`).
 */
export default function SweylProMark({ href }) {
  const Tag = href ? 'a' : 'span'
  return (
    <Tag className="sweyl-pro-mark" href={href} aria-label="Sweyl Pro">
      <span className="sweyl-pro-mark-word">SWEYL</span>
      <span className="sweyl-pro-mark-pro">PRO</span>
    </Tag>
  )
}
