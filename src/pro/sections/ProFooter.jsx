import React from 'react'
import { COPY, CONTACT_EMAIL } from '../copy'
import { legalUrl, mainSiteUrl } from '../../lib/siteUrls'
import { ProBrand } from './ProHeader'

export default function ProFooter() {
  const F = COPY.footer
  return (
    <footer className="pro-footer">
      <div className="pro-in">
        <div className="pro-footer-grid">
          <div>
            <ProBrand />
            <p>{F.line}</p>
          </div>
          <div>
            <h6>{F.backTitle}</h6>
            <a href={mainSiteUrl()}>{F.back}</a>
          </div>
          <div>
            <h6>{F.contactTitle}</h6>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <a href={legalUrl()}>{F.legal}</a>
          </div>
        </div>
        <div className="pro-footer-bottom">
          <span>{F.copyright}</span>
          <span>{F.madeIn}</span>
        </div>
      </div>
    </footer>
  )
}
