import React from 'react'
import { IconArrow } from '../../components/Icons'
import { COPY, DEMO_ANCHOR } from '../copy'
import Accent from '../Accent'
import TacticBoard from './TacticBoard'

// Un seul écran à l'arrivée, comme l'accueil de sweyl.com : la marque animée, l'accroche, la démo.
export default function ProHero() {
  const H = COPY.hero
  return (
    <section className="pro-hero">
      <div className="pro-hero-spot" />
      <TacticBoard />
      <div className="pro-hero-content">
        <div className="pro-hero-brand">
          <div className="hero-logo pro-hero-logo" aria-hidden="true" />
          <div className="hero-wordmark pro-hero-wordmark">SWEYL <span className="pro-accent">PRO</span></div>
        </div>
        <div className="eyebrow">{H.eyebrow}</div>
        <h1 className="display"><Accent text={H.title} /></h1>
        <p className="pro-hero-sub">{H.sub}</p>
        <div className="pro-hero-ctas">
          <a className="btn-primary" href={`#${DEMO_ANCHOR}`}>{H.cta}<IconArrow size={14} /></a>
          <span className="pro-devices">{H.devices}</span>
        </div>
      </div>
    </section>
  )
}
