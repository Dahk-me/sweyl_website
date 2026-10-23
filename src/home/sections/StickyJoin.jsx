import React from 'react'
import { useTranslation } from 'react-i18next'
import { IconArrow } from '../../components/Icons'
import { useMobile } from '../../hooks/useMobile'
import { ANCHORS } from '../copy'

/**
 * Sur mobile, l'appel à l'action reste sous le pouce. Il apparaît quand le bouton du hero sort de
 * l'écran, et s'efface sur le formulaire et le pied de page, où il ferait doublon.
 */
export default function StickyJoin() {
  const mobile = useMobile()
  const { t } = useTranslation()
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    if (!mobile) return
    const targets = [ANCHORS.heroJoin, ANCHORS.join, ANCHORS.footer].map(id => document.getElementById(id)).filter(Boolean)
    const visible = new Set()
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)))
      setShow(visible.size === 0)
    })
    targets.forEach(el => obs.observe(el))
    return () => obs.disconnect()
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
