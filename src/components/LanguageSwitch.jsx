import React from 'react'
import { useTranslation } from 'react-i18next'
import { changeSiteLanguage, currentLanguage } from '../i18n'
import { LANGUAGE_NATIVE_NAMES, SITE_LANGUAGES } from '../i18n/languages'

/**
 * Le sélecteur de langue du header : la pastille montre le code (FR, EN, ES), la liste
 * déroulante le nom de chaque langue dans sa propre langue. Un vrai <select> posé par-dessus,
 * transparent : clavier, lecteur d'écran et liste native du téléphone viennent avec.
 */
export default function LanguageSwitch({ compact = false }) {
  const { t } = useTranslation('common')
  const language = currentLanguage()

  return (
    <span className={'lang-switch' + (compact ? ' lang-switch--compact' : '')}>
      <span aria-hidden="true">{language.toUpperCase()}</span>
      <select
        aria-label={t('language.label')}
        value={language}
        onChange={e => changeSiteLanguage(e.target.value)}
      >
        {SITE_LANGUAGES.map(code => (
          <option key={code} value={code} lang={code}>{LANGUAGE_NATIVE_NAMES[code]}</option>
        ))}
      </select>
    </span>
  )
}
