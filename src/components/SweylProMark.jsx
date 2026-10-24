import React from 'react'

/**
 * La marque de l'offre Pro : « SWEYL » dans la couleur du texte, « PRO » en orange, dans un
 * cadre orange. Marque seule sur la page Pro ; le header de sweyl.com en fait un bouton
 * (`src/home/components/ProButton.jsx`), qui reprend ses classes.
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
