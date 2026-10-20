import React from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Titre de l'onglet et description de la page dans la langue courante. Les balises d'aperçu de
 * lien (Open Graph) restent celles du HTML, en français : un aperçu se fabrique sans JavaScript.
 */
export function useDocumentMeta(namespace) {
  const { t, i18n } = useTranslation(namespace)
  React.useEffect(() => {
    document.title = t('meta.title')
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'))
  }, [t, i18n.language])
}
