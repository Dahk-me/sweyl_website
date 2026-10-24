import React from 'react'
import { useTranslation } from 'react-i18next'
import { IconArrow } from '../../components/Icons'
import { ANCHORS } from '../copy'

/**
 * L'unique appel à l'action de sweyl.com, toujours suivi de sa phrase de réassurance. Il mène au
 * formulaire ; `role`, quand une carte « Pour qui » le passe, pré-remplit le rôle par `onJoin`.
 */
export default function JoinButton({ role, onJoin, id, micro = true, className = '' }) {
  const { t } = useTranslation()
  return (
    <div id={id} className={`h-join ${className}`}>
      <a href={`#${ANCHORS.join}`} className="btn-primary h-join-btn" onClick={() => onJoin?.(role)}>
        {t('cta.label')}
        <IconArrow size={15} stroke={2} />
      </a>
      {micro && <p className="h-micro">{t('cta.micro')}</p>}
    </div>
  )
}
