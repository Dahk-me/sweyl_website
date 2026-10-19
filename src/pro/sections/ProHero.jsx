import React from 'react'
import { IconArrow } from '../../components/Icons'
import { COPY, DEMO_ANCHOR } from '../copy'
import TacticBoard from './TacticBoard'

export default function ProHero() {
  const H = COPY.hero
  return (
    <section className="pro-hero">
      <div className="pro-hero-spot" />
      <TacticBoard />
      <div className="pro-hero-content">
        <div className="eyebrow">{H.eyebrow}</div>
        <h1 className="display">{H.titleBefore}<span className="pro-accent">{H.titleAccent}</span>{H.titleAfter}</h1>
        <p className="pro-hero-sub">{H.sub}</p>
        <div className="pro-hero-ctas">
          <a className="btn-primary" href={`#${DEMO_ANCHOR}`}>{H.cta}<IconArrow size={14} /></a>
          <span className="pro-devices">{H.devices}</span>
        </div>
        <nav className="pro-index">
          {COPY.pillars.map(p => (
            <a key={p.id} href={`#${p.id}`}>
              <span className="pro-index-n">{p.n}</span>
              <span className="pro-index-t">{p.title}</span>
              <span className="pro-index-d">{p.hint}</span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  )
}
