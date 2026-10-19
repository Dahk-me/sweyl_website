import React from 'react'
import { COPY, CONTACT_EMAIL, LEGAL_URL, MAIN_SITE_URL } from '../copy'

export default function ProFooter() {
  const F = COPY.footer
  return (
    <footer className="pro-footer">
      <div className="pro-in">
        <div className="pro-footer-grid">
          <div>
            <span className="pro-brand">
              <span className="pro-wordmark" style={{ fontSize: '16px' }}>SWEYL</span>
              <span className="pro-badge">PRO</span>
            </span>
            <p>{F.line}</p>
          </div>
          <div>
            <h6>{F.backTitle}</h6>
            <a href={MAIN_SITE_URL}>{F.back}</a>
          </div>
          <div>
            <h6>{F.contactTitle}</h6>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <a href={LEGAL_URL}>{F.legal}</a>
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
