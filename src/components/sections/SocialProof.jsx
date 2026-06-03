import React, { useEffect, useState } from 'react'
import { useMobile } from '../../hooks/useMobile'
import { supabase } from '../../lib/supabase'
import { STORAGE } from '../../lib/storageConfig'

const stats = [['400+', 'UTILISATEURS'], ['15+', 'COACHS'], ['10+', 'CLUBS'], ['100+', 'MATCHS / SEM']]

// CountdownBar (36px fixed) + Header (56px mobile / 72px desktop) + 1px border
const HEADER_H = { mobile: 93, desktop: 109 }

function useCountUp(target, duration = 1800) {
  const [count, setCount] = React.useState(0)
  const ref = React.useRef(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      obs.disconnect()
      const start = performance.now()
      const tick = (now) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(eased * target))
        if (progress < 1) requestAnimationFrame(tick)
        else setCount(target)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0, rootMargin: '0px 0px -25% 0px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])

  return [count, ref]
}

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
          // Accumulate fractional pixels — browsers round scrollLeft to integer,
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
  const num = parseInt(value)
  const suffix = value.replace(String(num), '')
  const [count, ref] = useCountUp(num)
  return (
    <div ref={ref} style={{ background: 'var(--bg-2)', padding: mobile ? '28px 20px' : '40px 32px' }}>
      <div className="mono" style={{ fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.18em', marginBottom: '8px', whiteSpace: 'nowrap' }}>★ {label}</div>
      <div className="display" style={{ fontSize: mobile ? 'clamp(48px,13vw,72px)' : 'clamp(64px,6vw,96px)', color: 'var(--fg)', lineHeight: 0.9, fontVariantNumeric: 'tabular-nums' }}>
        {count}{suffix}
      </div>
    </div>
  )
}

export default function SocialProof() {
  const mobile = useMobile()
  const fallback = mobile ? HEADER_H.mobile : HEADER_H.desktop
  const [headerH, setHeaderH] = useState(fallback)
  const [logos, setLogos] = React.useState([])
  const [sponsors, setSponsors] = React.useState([])

  useEffect(() => {
    const measure = () => {
      const header = document.querySelector('header')
      if (!header) return
      setHeaderH(Math.ceil(header.getBoundingClientRect().bottom))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const fetchFolder = (folder) =>
    supabase.storage
      .from(STORAGE.LOGOS_BUCKET)
      .list(folder, { limit: 100 })
      .then(({ data, error }) => {
        if (error || !data) return []
        return data
          .filter(f => f.name !== '.emptyFolderPlaceholder')
          .map(f => ({
            name: f.name.replace(/\.[^.]+$/, ''),
            url: supabase.storage
              .from(STORAGE.LOGOS_BUCKET)
              .getPublicUrl(`${folder}/${f.name}`).data.publicUrl,
          }))
      })

  React.useEffect(() => {
    fetchFolder(STORAGE.LOGOS_FOLDER).then(setLogos)
    fetchFolder(STORAGE.SPONSORS_FOLDER).then(setSponsors)
  }, [])

  const heading = (
    <>
      <div className="eyebrow" style={{ marginBottom: '16px', fontSize: mobile ? '11px' : '13px' }}>—— Ils nous font confiance</div>
      <h2 className="display" style={{ fontSize: mobile ? 'clamp(28px, 8vw, 48px)' : 'clamp(36px, 4vw, 64px)', maxWidth: '700px', lineHeight: 1 }}>
        L'<span style={{ color: 'var(--orange)' }}>exigence</span> mène à l'<span style={{ color: 'var(--orange)' }}>excellence</span>, ils l'ont déjà compris.
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

  const logosBlock = logos.length > 0 && (
    <>
      <div style={{ padding: mobile ? '24px 20px 12px' : '32px 0 16px' }}>
        <div className="eyebrow" style={{ fontSize: mobile ? '11px' : '12px' }}>—— Les clubs</div>
      </div>
      <div style={{ padding: mobile ? '20px 0' : '32px 0' }}>
        <InteractiveMarquee
          items={logos}
          speed={mobile ? 18 : 22}
          renderItem={(c, i) => (
            <img
              key={i}
              src={c.url}
              alt={c.name}
              draggable={false}
              style={{ height: mobile ? '64px' : '88px', width: 'auto', objectFit: 'contain', opacity: 0.85, marginRight: mobile ? '56px' : '96px', flexShrink: 0, userSelect: 'none', pointerEvents: 'none' }}
            />
          )}
        />
      </div>
    </>
  )

  const sponsorsBlock = sponsors.length > 0 && (
    <>
      <div style={{ padding: mobile ? '24px 20px 12px' : '32px 0 16px' }}>
        <div className="eyebrow" style={{ fontSize: mobile ? '11px' : '12px' }}>—— Nos partenaires</div>
      </div>
      <div style={{ padding: mobile ? '8px 0 20px' : '12px 0 32px' }}>
        <InteractiveMarquee
          items={sponsors}
          speed={mobile ? 18 : 22}
          reverse
          renderItem={(s, i) => (
            <img
              key={i}
              src={s.url}
              alt={s.name}
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

  // ─── Desktop: sticky heading on the left, content on the right ───
  return (
    <section style={{ padding: '80px 0', background: 'var(--bg-2)' }}>
      <div
        data-reveal
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          maxWidth: '1440px',
          margin: '0 auto',
        }}
      >
        {/* Outer cell stretches to row height — inner sticky stays until section ends */}
        <div>
          <div
            style={{
              position: 'sticky',
              top: headerH,
              padding: '0 52px',
            }}
          >
            {heading}
          </div>
        </div>
        <div style={{ paddingRight: '32px' }}>
          {statsBlock}
          {logosBlock}
          {sponsorsBlock}
        </div>
      </div>
    </section>
  )
}
