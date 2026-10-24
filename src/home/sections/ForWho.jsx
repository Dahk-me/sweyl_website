import React from 'react'
import { useTranslation } from 'react-i18next'
import AppShot from '../../components/AppShot'
import SectionHead from '../components/SectionHead'
import JoinButton from '../components/JoinButton'
import { ANCHORS, ROLES } from '../copy'

/**
 * Les quatre rôles en grands mots, comme les noms d'équipes d'un tableau d'affichage : le mot
 * choisi s'allume, les autres restent en retrait. Dessous, la vraie capture de ce rôle, ce que
 * SWEYL lui apporte, et le bouton qui pré-remplit son rôle dans le formulaire. Le coach, cible
 * principale, est choisi à l'arrivée.
 */
export default function ForWho({ onJoin }) {
  const { t } = useTranslation()
  const [current, setCurrent] = React.useState(ROLES[0].id)
  const tabs = React.useRef([])
  const role = ROLES.find(r => r.id === current)
  const text = key => t(`forWho.roles.${role.id}.${key}`)

  const select = index => {
    const next = ROLES[(index + ROLES.length) % ROLES.length]
    setCurrent(next.id)
    tabs.current[ROLES.indexOf(next)]?.focus()
  }
  const onKeyDown = index => e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); select(index + 1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); select(index - 1) }
  }

  return (
    <section id={ANCHORS.forWho} className="h-section h-section--alt h-forwho">
      <div className="h-wrap">
        <SectionHead eyebrow={t('forWho.eyebrow')} title={t('forWho.title')} sub={t('forWho.sub')} />

        <div className="h-role-tabs" role="tablist" aria-label={t('forWho.eyebrow')} data-reveal>
          {ROLES.map((r, i) => {
            const on = r.id === current
            return (
              <button
                key={r.id}
                ref={el => { tabs.current[i] = el }}
                type="button"
                role="tab"
                id={`role-tab-${r.id}`}
                aria-selected={on}
                aria-controls={`role-panel-${r.id}`}
                tabIndex={on ? 0 : -1}
                className={`display h-role-tab${on ? ' is-on' : ''}`}
                onClick={() => setCurrent(r.id)}
                onKeyDown={onKeyDown(i)}
              >
                {t(`forWho.roles.${r.id}.label`)}
              </button>
            )
          })}
        </div>

        <div
          key={role.id}
          className="h-role-panel"
          role="tabpanel"
          id={`role-panel-${role.id}`}
          aria-labelledby={`role-tab-${role.id}`}
        >
          <div className="h-role-copy">
            <p className="h-role-lead">{text('text')}</p>
            <ul className="h-role-proofs">
              {role.proofs.map(p => <li key={p}>{text(`proofs.${p}`)}</li>)}
            </ul>
            <JoinButton role={role.leadRole} onJoin={onJoin} />
          </div>
          <div className="h-role-shot">
            <AppShot slot={role.shot} width="clamp(200px, 20vw, 250px)" />
          </div>
        </div>
      </div>
    </section>
  )
}
