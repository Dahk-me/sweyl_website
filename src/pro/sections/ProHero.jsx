import React from 'react'
import { useTranslation } from 'react-i18next'
import { IconArrow } from '../../components/Icons'
import { DEMO_ANCHOR } from '../copy'
import Accent from '../../components/Accent'
import TacticBoard from './TacticBoard'

// Un seul écran à l'arrivée, comme l'accueil de sweyl.com : la marque animée, l'accroche, la démo.
export default function ProHero() {
  const { t } = useTranslation('pro')
  return (
    <section className="pro-hero">
      <div className="pro-hero-spot" />
      <TacticBoard />
      <div className="pro-hero-content">
        <div className="pro-hero-brand">
          <div className="hero-logo pro-hero-logo" aria-hidden="true" />
          <div className="hero-wordmark pro-hero-wordmark">SWEYL <span className="pro-accent">PRO</span></div>
        </div>
        {/* Entrée en cascade, comme l'accueil de sweyl.com (classe hero-rise de index.css). */}
        <div className="eyebrow hero-rise" style={{ animationDelay: '0.45s' }}>{t('hero.eyebrow')}</div>
        <h1 className="display hero-rise" style={{ animationDelay: '0.6s' }}><Accent text={t('hero.title')} accentClass="pro-accent" /></h1>
        <p className="pro-hero-sub hero-rise" style={{ animationDelay: '0.8s' }}>{t('hero.sub')}</p>
        <div className="pro-hero-ctas hero-rise" style={{ animationDelay: '1s' }}>
          <a className="btn-primary" href={`#${DEMO_ANCHOR}`}>{t('hero.cta')}<IconArrow size={14} /></a>
          <span className="pro-devices">{t('hero.devices')}</span>
        </div>
      </div>
    </section>
  )
}
