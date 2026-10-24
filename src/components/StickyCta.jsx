import React from 'react'
import { IconArrow } from './Icons'
import { useMobile } from '../hooks/useMobile'

/** Le défilement à partir duquel la barre s'affiche : dès que le visiteur commence à descendre. */
const SHOW_AFTER_PX = 24

/**
 * L'appel à l'action de chaque site, affiché en bas de l'écran dès qu'on commence à défiler, sur
 * mobile comme sur ordinateur, jusqu'au pied de page (*Ismail, 24/10/2026*). Il remplace le bouton
 * du header sur les deux sites ; leur pied de page lui réserve sa hauteur (`--sticky-cta-h`).
 * `micro` est la réassurance, `microShort` sa version pour téléphone.
 */
export default function StickyCta({ href, label, micro, microShort }) {
  const mobile = useMobile()
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    const check = () => setShow(window.scrollY > SHOW_AFTER_PX)
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

  return (
    <div className={`sticky-cta${show ? ' is-on' : ''}`} aria-hidden={!show}>
      <div className="sticky-cta-bar">
        <a href={href} className="btn-primary sticky-cta-btn" tabIndex={show ? 0 : -1}>
          {label}
          <IconArrow size={14} stroke={2} />
        </a>
        <p className="sticky-cta-micro">{mobile ? microShort : micro}</p>
      </div>
    </div>
  )
}
