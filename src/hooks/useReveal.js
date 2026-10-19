import { useEffect } from 'react'

/** Fait apparaître au scroll chaque élément [data-reveal], comme l'accueil du site. */
export const useReveal = () => {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') })
    }, { threshold: 0.1 })
    document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}
