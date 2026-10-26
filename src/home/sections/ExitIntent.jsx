import React from 'react'
import { useTranslation } from 'react-i18next'
import Accent from '../../components/Accent'
import { IconArrow, IconX } from '../../components/Icons'
import { useMobile } from '../../hooks/useMobile'
import { clubSignupUrl } from '../../lib/siteUrls'
import { ANCHORS } from '../copy'

/** Une fois par session : le drapeau vit dans sessionStorage, qui peut manquer ou refuser l'écriture. */
const SHOWN_KEY = 'sweyl-exit-intent'
const ARM_DELAY_MS = 8000
const wasShown = () => { try { return sessionStorage.getItem(SHOWN_KEY) === '1' } catch { return false } }
const markShown = () => { try { sessionStorage.setItem(SHOWN_KEY, '1') } catch { /* navigation privée */ } }

const joinInView = () => {
  const el = document.getElementById(ANCHORS.join)
  if (!el) return false
  const r = el.getBoundingClientRect()
  return r.top < window.innerHeight && r.bottom > 0
}

/**
 * Sur ordinateur, quand la souris quitte la page par le haut (vers les onglets ou la barre
 * d'adresse), une dernière invitation. Jamais sur mobile, où ce geste n'existe pas, jamais avant
 * quelques secondes de lecture, jamais quand le formulaire est déjà à l'écran.
 */
export default function ExitIntent() {
  const mobile = useMobile()
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)
  const ctaRef = React.useRef(null)

  React.useEffect(() => {
    if (mobile || wasShown() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let armed = false
    const arm = setTimeout(() => { armed = true }, ARM_DELAY_MS)
    const onOut = e => {
      if (!armed || e.relatedTarget || e.clientY > 0 || joinInView()) return
      markShown()
      setOpen(true)
      document.removeEventListener('mouseout', onOut)
    }
    document.addEventListener('mouseout', onOut)
    return () => { clearTimeout(arm); document.removeEventListener('mouseout', onOut) }
  }, [mobile])

  React.useEffect(() => {
    if (!open) return
    const previous = document.activeElement
    ctaRef.current?.focus()
    const onKey = e => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey); previous?.focus?.() }
  }, [open])

  if (!open) return null
  return (
    <div className="h-exit" onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}>
      <div className="h-exit-dialog" role="dialog" aria-modal="true" aria-labelledby="exit-title">
        <button type="button" className="h-exit-close" onClick={() => setOpen(false)} aria-label={t('exit.close')}>
          <IconX size={18} stroke={2} />
        </button>
        <p className="eyebrow h-season-tag">{t('cta.badge')}</p>
        <p className="display h-exit-title" id="exit-title"><Accent text={t('exit.title')} /></p>
        <p className="h-exit-text">{t('exit.text')}</p>
        <a ref={ctaRef} href={clubSignupUrl()} className="btn-primary h-join-btn">
          {t('cta.label')}
          <IconArrow size={15} stroke={2} />
        </a>
        <button type="button" className="h-exit-dismiss" onClick={() => setOpen(false)}>{t('exit.dismiss')}</button>
      </div>
    </div>
  )
}
