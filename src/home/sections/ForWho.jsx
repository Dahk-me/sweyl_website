import React from 'react'
import { useTranslation } from 'react-i18next'
import { IconCheck, IconChevron } from '../../components/Icons'
import { useMobile } from '../../hooks/useMobile'
import AppShot from '../../components/AppShot'
import Accent from '../../components/Accent'
import SectionHead from '../components/SectionHead'
import JoinButton from '../components/JoinButton'
import { ANCHORS, ROLES } from '../copy'

/** Le détail d'un rôle : trois preuves, la vraie capture, et le bouton qui pré-remplit son rôle. */
const Panel = ({ role, onJoin }) => {
  const { t } = useTranslation()
  const text = key => t(`forWho.roles.${role.id}.${key}`)
  return (
    <div className="h-role-panel" id={`role-${role.id}`} key={role.id}>
      <div className="h-role-panel-copy">
        <p className="eyebrow h-eyebrow">{text('label')}</p>
        <p className="display h-role-panel-title"><Accent text={text('headline')} /></p>
        <ul className="h-role-proofs">
          {role.proofs.map(p => (
            <li key={p}><span className="h-check"><IconCheck size={13} stroke={2.4} /></span>{text(`proofs.${p}`)}</li>
          ))}
        </ul>
        <JoinButton role={role.leadRole} onJoin={onJoin} />
      </div>
      <div className="h-role-shot">
        <AppShot slot={role.shot} width="clamp(190px, 20vw, 250px)" />
      </div>
    </div>
  )
}

/**
 * Quatre cartes, une par rôle. Ouvrir une carte montre ce que SWEYL change pour ce rôle : sous la
 * grille sur ordinateur, sous la carte elle-même sur mobile. Le coach, cible principale, est ouvert
 * à l'arrivée.
 */
export default function ForWho({ onJoin }) {
  const { t } = useTranslation()
  const mobile = useMobile()
  const [open, setOpen] = React.useState(ROLES[0].id)
  const current = ROLES.find(r => r.id === open)

  return (
    <section id={ANCHORS.forWho} className="h-section h-section--alt h-forwho">
      <div className="h-wrap">
        <SectionHead eyebrow={t('forWho.eyebrow')} title={t('forWho.title')} sub={t('forWho.sub')} />

        <div className="h-roles" data-reveal>
          {ROLES.map(role => {
            const isOpen = role.id === open
            return (
              <React.Fragment key={role.id}>
                <button
                  type="button"
                  className={`h-role${isOpen ? ' is-open' : ''}`}
                  aria-expanded={isOpen}
                  aria-controls={`role-${role.id}`}
                  onClick={() => setOpen(mobile && isOpen ? null : role.id)}
                >
                  <span className="h-role-top">
                    <span className="h-role-icon"><role.Icon size={20} stroke={1.8} /></span>
                    <span className="h-role-label">{t(`forWho.roles.${role.id}.label`)}</span>
                  </span>
                  <span className="h-role-text">{t(`forWho.roles.${role.id}.text`)}</span>
                  <span className="h-role-more">
                    {t(`forWho.roles.${role.id}.more`)}
                    <IconChevron size={16} stroke={2} />
                  </span>
                </button>
                {mobile && isOpen && <Panel role={role} onJoin={onJoin} />}
              </React.Fragment>
            )
          })}
        </div>

        {!mobile && current && <Panel role={current} onJoin={onJoin} />}
      </div>
    </section>
  )
}
