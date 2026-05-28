import React from 'react'
import { IconArrow, IconCheck } from '../Icons'

const FormField = ({ label, type = 'text', value, onChange, required }) => (
  <div>
    <label className="mono" style={{ fontSize: '10px', color: 'var(--fg-3)', letterSpacing: '0.15em', marginBottom: '8px', display: 'block' }}>
      {label.toUpperCase()}{required && <span style={{ color: 'var(--orange)' }}> *</span>}
    </label>
    <input
      type={type} value={value} onChange={e => onChange(e.target.value)} required={required}
      style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--line)', color: 'var(--fg)', padding: '14px', fontSize: '13px', fontFamily: 'inherit', borderRadius: '2px', outline: 'none' }}
    />
  </div>
)

const perks = [
  'Réponse sous 24h',
  'Démo personnalisée à votre club',
  "Accès bêta gratuit jusqu'au lancement",
]

export default function Lead() {
  const [form, setForm] = React.useState({ name: '', email: '', club: '', role: 'president', message: '' })
  const [sent, setSent] = React.useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // TODO: Connect to backend (e.g. POST /api/leads or Formspree)
    setSent(true)
  }

  return (
    <section id="join" style={{ padding: '140px 0', background: 'var(--bg)', borderTop: '1px solid var(--line)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '80px' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: '24px' }}>—— Réserver une démo</div>
            <h2 className="display" style={{ fontSize: 'clamp(48px, 6vw, 80px)', marginBottom: '24px' }}>
              Voyons ensemble<br />ce que <span style={{ color: 'var(--orange)' }}>GTS</span><br />peut faire pour<br />votre club.
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--fg-2)', lineHeight: 1.6, marginBottom: '32px' }}>
              30 minutes avec vous. On vous montre l'app sur votre cas réel gratuitement. Sans engagement.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {perks.map(h => (
                <div key={h} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '24px', height: '24px', border: '1px solid var(--orange)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)', flexShrink: 0 }}>
                    <IconCheck size={12} stroke={2} />
                  </div>
                  <span style={{ fontSize: '14px', color: 'var(--fg)' }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', padding: '40px', borderRadius: '4px' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: '64px', height: '64px', border: '1px solid var(--orange)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--orange)' }}>
                  <IconCheck size={28} stroke={2} />
                </div>
                <div className="display" style={{ fontSize: '40px', marginBottom: '12px' }}>Reçu.</div>
                <p style={{ color: 'var(--fg-2)' }}>Je reviens vers vous sous 24h.</p>
              </div>
            ) : (
              <>
                <div className="mono" style={{ fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.18em', marginBottom: '24px' }}>—— FORMULAIRE QUALIFIÉ</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <FormField label="Nom" value={form.name} onChange={v => setForm({ ...form, name: v })} required />
                  <FormField label="Email" type="email" value={form.email} onChange={v => setForm({ ...form, email: v })} required />
                </div>
                <div style={{ marginBottom: '14px' }}>
                  <FormField label="Club" value={form.club} onChange={v => setForm({ ...form, club: v })} required />
                </div>
                <div style={{ marginBottom: '14px' }}>
                  <label className="mono" style={{ fontSize: '10px', color: 'var(--fg-3)', letterSpacing: '0.15em', marginBottom: '10px', display: 'block' }}>VOTRE RÔLE</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px' }}>
                    {[['president', 'Président'], ['coach', 'Coach'], ['other', 'Autre']].map(([k, l]) => (
                      <button type="button" key={k} onClick={() => setForm({ ...form, role: k })}
                        style={{ padding: '12px', border: '1px solid ' + (form.role === k ? 'var(--orange)' : 'var(--line)'), background: form.role === k ? 'rgba(255,102,0,0.08)' : 'transparent', color: form.role === k ? 'var(--orange)' : 'var(--fg-2)', fontSize: '13px', borderRadius: '2px', transition: 'all 0.15s' }}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label className="mono" style={{ fontSize: '10px', color: 'var(--fg-3)', letterSpacing: '0.15em', marginBottom: '10px', display: 'block' }}>MESSAGE (OPTIONNEL)</label>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={3}
                    style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--line)', color: 'var(--fg)', padding: '14px', fontSize: '13px', fontFamily: 'inherit', resize: 'vertical', borderRadius: '2px', outline: 'none' }} />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px' }}>
                  Envoyer ma demande<IconArrow size={14} />
                </button>
                <p className="mono" style={{ fontSize: '9px', color: 'var(--fg-3)', letterSpacing: '0.12em', marginTop: '14px', textAlign: 'center' }}>RÉPONSE SOUS 24H · SANS ENGAGEMENT</p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
