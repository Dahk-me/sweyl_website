import React from 'react'
import { useTranslation } from 'react-i18next'
import { CONTACT_EMAIL } from '../copy'
import { legalUrl, mainSiteUrl } from '../../lib/siteUrls'
import { ProBrand } from './ProHeader'
import { LEGAL_DOCUMENTS } from '../../legal/documents'

export default function ProFooter() {
  const { t } = useTranslation(['pro', 'common'])
  return (
    <footer className="pro-footer">
      <div className="pro-in">
        <div className="pro-footer-grid">
          <div>
            <ProBrand />
            <p>{t('footer.line')}</p>
          </div>
          <div>
            <h6>{t('footer.backTitle')}</h6>
            <a href={mainSiteUrl()}>{t('footer.back')}</a>
          </div>
          <div>
            <h6>{t('footer.contactTitle')}</h6>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            {Object.values(LEGAL_DOCUMENTS).map(document => (
              <a key={document.id} href={legalUrl(document)}>{t(`common:legal.documents.${document.id}`)}</a>
            ))}
          </div>
        </div>
        <div className="pro-footer-bottom">
          <span>© 2026 SWEYL</span>
          <span>{t('common:madeIn')}</span>
        </div>
      </div>
    </footer>
  )
}
