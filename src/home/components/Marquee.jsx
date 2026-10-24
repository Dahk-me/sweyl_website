import React from 'react'

/**
 * Le bandeau défilant des logos, repris de l'ancien accueil : il avance seul, se met en pause
 * au doigt, à la molette ou au glisser de la souris, et boucle dans les deux sens. Sur mobile,
 * aucune ligne ne tient tous les logos : c'est le défilement qui les montre tous.
 */
export default function Marquee({ items, renderItem, speed = 40, reverse = false }) {
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
