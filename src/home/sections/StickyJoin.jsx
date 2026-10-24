import React from 'react'
import { useTranslation } from 'react-i18next'
import { IconArrow } from '../../components/Icons'
import { useMobile } from '../../hooks/useMobile'
import { ANCHORS } from '../copy'

/** Le défilement à partir duquel la barre s'affiche : dès que le visiteur commence à descendre. */
const SHOW_AFTER_PX = 24

/**
 * L'appel à l'action reste affiché en bas de l'écran dès qu'on commence à défiler, sur mobile
 * comme sur ordinateur, et jusqu'au pied de page (*Ismail, 24/10/2026*). Il remplace le bouton
 * « Rejoindre » du header, qui a été retiré.
 */
export default function StickyJoin() {
  const mobile = useMobile()
  const { t } = useTranslation()
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    const check = () => setShow(window.scrollY > SHOW_AFTER_PX)
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

  return (
    <div className={`h-sticky${show ? ' is-on' : ''}`} aria-hidden={!show}>
      <div className="h-sticky-bar">
        <a href={`#${ANCHORS.join}`} className="btn-primary h-sticky-btn" tabIndex={show ? 0 : -1}>
          {t('cta.label')}
          <IconArrow size={14} stroke={2} />
        </a>
        <p className="h-sticky-micro">{t(mobile ? 'cta.microShort' : 'cta.micro')}</p>
      </div>
    </div>
  )
}
