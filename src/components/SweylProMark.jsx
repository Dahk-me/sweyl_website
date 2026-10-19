import React from 'react'

/**
 * La marque de l'offre Pro : « SWEYL » dans la couleur du texte, « PRO » en orange, dans un
 * cadre orange. Lien vers pro.sweyl.com dans le header du site, marque seule sur la page Pro.
 */
export default function SweylProMark({ href, size = 'md' }) {
  const Tag = href ? 'a' : 'span'
  return (
    <Tag className={`sweyl-pro-mark sweyl-pro-mark--${size}`} href={href} aria-label="Sweyl Pro">
      <span className="sweyl-pro-mark-word">SWEYL</span>
      <span className="sweyl-pro-mark-pro">PRO</span>
    </Tag>
  )
}
