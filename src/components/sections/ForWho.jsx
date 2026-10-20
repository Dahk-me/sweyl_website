import React from 'react'
import { useTranslation } from 'react-i18next'
import { useMobile } from '../../hooks/useMobile'
import AppShot from '../AppShot'
import Accent from '../Accent'

// Les textes vivent dans forWho.cards.<id> des fichiers de langue.
const CARDS = [
  { id: 'coaches', highlights: ['video', 'performance', 'feedback'], slot: 'coachs' },
  { id: 'players', highlights: ['profile', 'progress', 'share'], slot: 'joueurs' },
  { id: 'fans', highlights: ['live', 'notifications', 'favorites'], slot: 'familles' },
  { id: 'leaders', highlights: ['dashboard', 'seasonView', 'attendance'], slot: 'dirigeants' },
]

const Copy = ({ c, mobile }) => {
  const { t } = useTranslation()
  const text = key => t(`forWho.cards.${c.id}.${key}`)
  return (
  <>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
      <span className="mono" style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--primary)' }}>{text('label')}</span>
    </div>

    <h3 className="display" style={{ fontSize: mobile ? 'clamp(48px, 15vw, 68px)' : 'clamp(52px, 5.6vw, 80px)', color: 'var(--fg)', marginBottom: '16px', lineHeight: 0.9 }}>
      {text('title')}
    </h3>

    <p style={{ fontSize: mobile ? '13px' : '15px', color: 'var(--fg-2)', lineHeight: 1.55, maxWidth: '440px', marginBottom: '20px' }}>
      {text('desc')}
    </p>

    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {c.highlights.map(h => (
        <li key={h} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--fg-3)' }}>
          <span style={{ width: '16px', height: '1px', background: 'var(--primary)', flexShrink: 0 }} />
          {text(`highlights.${h}`)}
        </li>
      ))}
    </ul>
  </>
  )
}

/**
 * Le téléphone est montré en entier. Une version débordante avait été essayée :
 * avec `align-items: center`, la carte se cale sur la hauteur réduite du
 * téléphone et le rogne AUSSI par le haut sur les cartes inversées. Corrigé le
 * 29/08/2026, ne pas réintroduire de marge négative ici.
 */
const Card = ({ c, mobile, flip }) => {
  if (mobile) {
    return (
      <div className="forwho-card" style={{ padding: '22px 24px 32px', boxSizing: 'border-box' }}>
        <Copy c={c} mobile />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
          <AppShot slot={c.slot} width="min(240px, 70%)" />
        </div>
      </div>
    )
  }

  const copy = <div key="copy" style={{ minWidth: 0 }}><Copy c={c} mobile={false} /></div>
  const shot = (
    <div key="shot" style={{ display: 'flex', justifyContent: 'center' }}>
      <AppShot slot={c.slot} width="clamp(200px, 23vw, 258px)" />
    </div>
  )

  return (
    <div
      className="forwho-card"
      style={{
        padding: '44px 48px',
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateColumns: flip ? '42fr 58fr' : '58fr 42fr',
        gap: '32px',
        alignItems: 'center',
      }}
    >
      {flip ? [shot, copy] : [copy, shot]}
    </div>
  )
}

export default function ForWho() {
  const mobile = useMobile()
  const { t } = useTranslation()

  const intro = (
    <>
      <div className="eyebrow" style={{ marginBottom: '20px', fontSize: mobile ? '11px' : '13px' }}>{t('forWho.eyebrow')}</div>
      <h2 className="display" style={{ fontSize: mobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(48px, 6vw, 88px)', marginBottom: '24px' }}>
        <Accent text={t('forWho.title')} />
      </h2>
      <p style={{ fontSize: mobile ? '14px' : '15px', color: 'var(--fg-2)', maxWidth: '400px', lineHeight: 1.6 }}>
        {t('forWho.intro')}
      </p>
    </>
  )

  const cards = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? '16px' : '24px' }}>
      {CARDS.map((c, i) => (
        <Card key={c.id} c={c} mobile={mobile} flip={i % 2 === 1} />
      ))}
    </div>
  )

  if (mobile) {
    return (
      <section id="for-who" style={{ background: 'var(--bg)', borderTop: '1px solid var(--line)' }}>
        <div style={{ padding: '80px 22px 32px' }}>
          {intro}
        </div>
        <div style={{ padding: '0 16px 64px' }}>
          {cards}
        </div>
      </section>
    )
  }

  return (
    <section
      id="for-who"
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--line)',
        padding: '80px 0',
      }}
    >
      <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: '65fr 35fr', gap: '32px', alignItems: 'start' }}>
        <div>{cards}</div>
        <div style={{ padding: '0 52px', position: 'sticky', top: '120px' }}>
          {intro}
        </div>
      </div>
    </section>
  )
}
