import React from 'react'
import { useMobile } from '../../hooks/useMobile'
import { CLUB_LOGOS, PARTNER_LOGOS } from '../../lib/logos'

// Chiffres réels du club, donnés par Ismail le 29/08/2026.
// « MATCHS / SEM » est le seul reliquat à confirmer.
const stats = [['1500', 'JOUEURS'], ['90', 'COACHS'], ['4', 'CLUBS'], ['100+', 'MATCHS / SEM']]

function InteractiveMarquee({ items, renderItem, speed = 40, reverse = false }) {
  const ref = React.useRef(null)
  const rafRef = React.useRef(0)
  const lastTime = React.useRef(0)
  const paused = React.useRef(false)
  const resumeTimer = React.useRef(0)
  const accumulator = React.useRef(0)

  // Duplicate 4× so we can wrap seamlessly in both directions.
  const expanded = React.useMemo(
    () => (items.length > 0 ? [...items, ...items, ...items, ...items] : []),
    [items],
  )

  React.useEffect(() => {
    const el = ref.current
    if (!el || items.length === 0) return

    // Wait one frame for layout to settle, then center the scroll on the 2nd copy
    // so we have a base-width buffer on each side for wrapping.
    let initId = requestAnimationFrame(() => {
      const baseWidth = el.scrollWidth / 4
      el.scrollLeft = baseWidth
    })

    const tick = (time) => {
      if (!lastTime.current) lastTime.current = time
      const dt = Math.min(time - lastTime.current, 64) // cap after tab inactivity
      lastTime.current = time

      const bw = el.scrollWidth / 4
      if (bw > 0) {
        if (!paused.current) {
          // Accumulate fractional pixels browsers round scrollLeft to integer,
          // so sub-pixel increments would otherwise be lost.
          accumulator.current += ((reverse ? -1 : 1) * speed * dt) / 1000
          const intDelta = Math.trunc(accumulator.current)
          if (intDelta !== 0) {
            el.scrollLeft += intDelta
            accumulator.current -= intDelta
          }
        }
        // Wrap (covers both auto-scroll and user scroll).
        if (el.scrollLeft > bw * 2.5) el.scrollLeft -= bw
        else if (el.scrollLeft < bw * 0.5) el.scrollLeft += bw
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    const pause = () => {
      paused.current = true
      if (resumeTimer.current) clearTimeout(resumeTimer.current)
    }
    const scheduleResume = (delay) => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current)
      resumeTimer.current = setTimeout(() => {
        paused.current = false
        lastTime.current = 0
      }, delay)
    }

    const onTouchStart = () => pause()
    const onTouchEnd = () => scheduleResume(1200)
    const onWheel = () => { pause(); scheduleResume(900) }

    // Mouse drag-to-scroll (desktop): pause animation, pan with the pointer.
    let dragStartX = 0
    let dragStartScroll = 0
    let dragging = false
    const onMouseDown = (e) => {
      if (e.button !== 0) return
      dragging = true
      dragStartX = e.clientX
      dragStartScroll = el.scrollLeft
      pause()
      el.style.cursor = 'grabbing'
      e.preventDefault()
    }
    const onMouseMove = (e) => {
      if (!dragging) return
      el.scrollLeft = dragStartScroll - (e.clientX - dragStartX)
    }
    const onMouseUp = () => {
      if (!dragging) return
      dragging = false
      el.style.cursor = 'grab'
      scheduleResume(800)
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchend', onTouchEnd)
    el.addEventListener('touchcancel', onTouchEnd)
    el.addEventListener('wheel', onWheel, { passive: true })
    el.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      cancelAnimationFrame(rafRef.current)
      cancelAnimationFrame(initId)
      if (resumeTimer.current) clearTimeout(resumeTimer.current)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchEnd)
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [speed, reverse, items.length])

  return (
    <div
      ref={ref}
      style={{
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
        cursor: 'grab',
        touchAction: 'pan-x',
      }}
    >
      <div style={{ display: 'flex', width: 'max-content' }}>
        {expanded.map((item, i) => renderItem(item, i))}
      </div>
    </div>
  )
}

function StatCell({ value, label, mobile }) {
  return (
    <div style={{ background: 'var(--bg-2)', padding: mobile ? '28px 20px' : '40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div className="mono" style={{ fontSize: '10px', color: 'var(--primary)', letterSpacing: '0.18em', marginBottom: '8px', whiteSpace: 'nowrap' }}>{label}</div>
      <div className="display" style={{ fontSize: mobile ? 'clamp(48px,13vw,72px)' : 'clamp(64px,6vw,96px)', color: 'var(--fg)', lineHeight: 0.9, fontVariantNumeric: 'tabular-nums' }}>
        {value}
      </div>
    </div>
  )
}

export default function SocialProof() {
  const mobile = useMobile()
  const heading = (
    <>
      <div className="eyebrow" style={{ marginBottom: '16px', fontSize: mobile ? '11px' : '13px' }}>Saison 2026/27</div>
      <h2 className="display" style={{ fontSize: mobile ? 'clamp(28px, 8vw, 48px)' : 'clamp(36px, 4vw, 64px)', maxWidth: '700px', lineHeight: 1 }}>
        Ils ont déjà <span style={{ color: 'var(--primary)' }}>signé</span>.
      </h2>
    </>
  )

  const statsBlock = (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '2px', marginBottom: '40px', alignItems: 'start' }}>
      {stats.map(([n, l]) => (
        <StatCell key={l} value={n} label={l} mobile={mobile} />
      ))}
    </div>
  )

  const logosBlock = (
    <>
      <div style={{ padding: mobile ? '24px 20px 12px' : '32px 0 16px' }}>
        <div className="eyebrow" style={{ fontSize: mobile ? '11px' : '12px' }}>Les clubs</div>
      </div>
      <div style={{ padding: mobile ? '20px 0' : '32px 0' }}>
        <InteractiveMarquee
          items={CLUB_LOGOS}
          speed={mobile ? 18 : 22}
          renderItem={(c, i) => (
            <img
              key={i}
              src={c.src}
              alt={c.alt}
              draggable={false}
              style={{ height: mobile ? '64px' : '88px', width: 'auto', objectFit: 'contain', opacity: 0.85, marginRight: mobile ? '56px' : '96px', flexShrink: 0, userSelect: 'none', pointerEvents: 'none' }}
            />
          )}
        />
      </div>
    </>
  )

  const sponsorsBlock = (
    <>
      <div style={{ padding: mobile ? '24px 20px 12px' : '32px 0 16px' }}>
        <div className="eyebrow" style={{ fontSize: mobile ? '11px' : '12px' }}>Nos partenaires</div>
      </div>
      <div style={{ padding: mobile ? '8px 0 20px' : '12px 0 32px' }}>
        <InteractiveMarquee
          items={PARTNER_LOGOS}
          speed={mobile ? 18 : 22}
          reverse
          renderItem={(s, i) => (
            <img
              key={i}
              src={s.src}
              alt={s.alt}
              draggable={false}
              style={{ height: mobile ? '40px' : '56px', width: 'auto', objectFit: 'contain', opacity: 0.7, marginRight: mobile ? '56px' : '96px', flexShrink: 0, userSelect: 'none', pointerEvents: 'none' }}
            />
          )}
        />
      </div>
    </>
  )

  // ─── Mobile: vertical layout ───
  if (mobile) {
    return (
      <section style={{ padding: '60px 0', background: 'var(--bg-2)' }}>
        <div style={{ margin: '0 auto' }}>
          <div style={{ padding: '0 20px 48px' }} data-reveal>
            {heading}
          </div>
          {statsBlock}
          {logosBlock}
          {sponsorsBlock}
        </div>
      </section>
    )
  }

  // ─── Desktop: content LEFT 65%, sticky heading RIGHT 35% ───
  return (
    <section style={{ padding: '80px 0', background: 'var(--bg-2)' }}>
      <div
        data-reveal
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 65fr) minmax(0, 35fr)',
          maxWidth: '1300px',
          margin: '0 auto',
        }}
      >
        {/* Left 65% stats + logos + sponsors */}
        <div style={{ paddingLeft: '32px' }}>
          {statsBlock}
          {logosBlock}
          {sponsorsBlock}
        </div>
        {/* Right 35% sticky heading */}
        <div>
          <div style={{ position: mobile ? 'static' : 'sticky', top: '120px', padding: '0 52px' }}>
            {heading}
          </div>
        </div>
      </div>
    </section>
  )
}
