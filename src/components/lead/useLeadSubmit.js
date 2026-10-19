import React from 'react'
import { HONEYPOT_FIELD } from '../../lib/leadOptions'

export const SUBMIT_LEAD_URL = '/api/submit-lead'

/**
 * Envoi d'une demande de démo. Porte les trois états (envoi, succès, erreur) et les deux
 * signaux du filtre anti-robots : le champ piège et le temps passé sur le formulaire.
 */
export function useLeadSubmit() {
  const [loading, setLoading] = React.useState(false)
  const [sent, setSent] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [honeypot, setHoneypot] = React.useState('')
  const shownAt = React.useRef(performance.now())

  const submit = async (payload) => {
    setLoading(true)
    setError(false)
    try {
      const res = await fetch(SUBMIT_LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          [HONEYPOT_FIELD]: honeypot,
          elapsedMs: Math.round(performance.now() - shownAt.current),
        }),
      })
      if (!res.ok) throw new Error(await res.text())
      setSent(true)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return { loading, sent, error, submit, honeypot, setHoneypot }
}
