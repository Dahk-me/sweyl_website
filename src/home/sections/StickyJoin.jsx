import React from 'react'
import { useTranslation } from 'react-i18next'
import { IconArrow } from '../../components/Icons'
import { useMobile } from '../../hooks/useMobile'
import { ANCHORS } from '../copy'

/**
 * Ce qui, une fois à l'écran, rend la barre inutile : un bouton « Rejoindre » de la page, le
 * formulaire, le pied de page. Relu à chaque défilement plutôt qu'observé une fois, parce que le
 * bouton du sélecteur « Pour qui » renaît à chaque changement de rôle.
 */
const COVERED_BY = `.h-join, #${ANCHORS.join}, #${ANCHORS.footer}`

const anyInView = () => [...document.querySelectorAll(COVERED_BY)].some(el => {
  const r = el.getBoundingClientRect()
  return r.bottom > 0 && r.top < window.innerHeight
})

/** Sur mobile, l'appel à l'action reste sous le pouce, sans jamais doubler un bouton déjà visible. */
export default function StickyJoin() {
  const mobile = useMobile()
  const { t } = useTranslation()
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    if (!mobile) return
    // Quelques lectures de position, sans écriture : pas de quoi étaler sur une image d'animation.
    const check = () => setShow(!anyInView())
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [mobile])

  if (!mobile) return null
  return (
    <div className={`h-sticky${show ? ' is-on' : ''}`} aria-hidden={!show}>
      <a href={`#${ANCHORS.join}`} className="btn-primary h-sticky-btn" tabIndex={show ? 0 : -1}>
        {t('cta.label')}
        <IconArrow size={14} stroke={2} />
      </a>
      <p className="h-sticky-micro">{t('cta.microShort')}</p>
    </div>
  )
}
