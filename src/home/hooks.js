import React from 'react'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Vrai dès que l'élément entre dans l'écran, et le reste : sert aux animations jouées une fois. */
export function useSeenOnce(ref, threshold = 0.3) {
  const [seen, setSeen] = React.useState(false)
  React.useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setSeen(true); obs.disconnect() }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, seen, threshold])
  return seen
}

/** Un chiffre qui monte de 0 à `target` quand `start` passe à vrai. Immobile si le visiteur coupe les animations. */
export function useCountUp(target, start, duration = 1400) {
  const [value, setValue] = React.useState(() => (prefersReducedMotion() ? target : 0))
  React.useEffect(() => {
    if (!start) return
    if (prefersReducedMotion()) { setValue(target); return }
    let frame = 0
    const begin = performance.now()
    const tick = now => {
      const progress = Math.min(1, (now - begin) / duration)
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, start, duration])
  return value
}
