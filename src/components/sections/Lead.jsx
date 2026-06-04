import React from 'react'
import { IconArrow, IconCheck } from '../Icons'
import { useMobile } from '../../hooks/useMobile'

const FormField = ({ label, type = 'text', value, onChange, required }) => (
  <div>
    <label className="mono" style={{ fontSize: '10px', color: 'var(--fg-3)', letterSpacing: '0.15em', marginBottom: '8px', display: 'block' }}>
      {label.toUpperCase()}{required && <span style={{ color: 'var(--orange)' }}> *</span>}
    </label>
    <input
      type={type} value={value} onChange={e => onChange(e.target.value)} required={required}
      style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--line)', color: 'var(--fg)', padding: '14px', fontSize: '16px', fontFamily: 'inherit', borderRadius: '2px', outline: 'none' }}
    />
  </div>
)

const perks = [
  'Reservez un échange avec notre équipe',
  'Réponse sous 24h',
  'Démo personnalisée à votre club',
  "Accès bêta gratuit jusqu'au lancement",
]

export default function Lead() {
  const mobile = useMobile()
  const [form, setForm] = React.useState({ name: '', email: '', club: '', role: 'president', message: '' })
  const [sent, setSent] = React.useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // TODO: POST to backend or Formspree endpoint
    setSent(true)
  }

  return (
    <section id="join" style={{ padding: mobile ? '80px 0' : '140px 0', background: 'var(--bg-2)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: mobile ? '0 20px' : '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1.1fr', gap: mobile ? '48px' : '80px', alignItems: 'start' }}>

          {/* Left — sticky title */}
          <div style={mobile ? {} : { position: 'sticky', top: '120px' }}>
            <div className="eyebrow" style={{ marginBottom: '20px', fontSize: mobile ? '11px' : '13px' }}>—— Réserver une démo</div>
            <h2 className="display" style={{ fontSize: mobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(48px, 6vw, 80px)' }}>
              Voyons ensemble<br />ce que <span style={{ color: 'var(--orange)' }}>SWEYL</span><br />peut faire pour<br />votre <span style={{ color: 'var(--orange)' }}>club</span>.
            </h2>
          </div>

          {/* Right — text + form */}
          <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                {perks.map(h => (
                  <div key={h} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '24px', height: '24px', border: '1px solid var(--orange)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)', flexShrink: 0 }}>
                      <IconCheck size={12} stroke={2} />
                    </div>
                    <span style={{ fontSize: '14px', color: 'var(--fg)' }}>{h}</span>
                  </div>
                ))}
              </div>
            <form onSubmit={handleSubmit} style={{ background: 'var(--bg-3)', border: '1px solid var(--line)', padding: mobile ? '24px 20px' : '40px', borderRadius: '4px' }}>
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
                <div className="mono" style={{ fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.18em', marginBottom: '20px' }}>—— FORMULAIRE QUALIFIÉ</div>

                {/* Name + Email — stacked on mobile */}
                <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <FormField label="Nom" value={form.name} onChange={v => setForm({ ...form, name: v })} required />
                  <FormField label="Email" type="email" value={form.email} onChange={v => setForm({ ...form, email: v })} required />
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <FormField label="Club" value={form.club} onChange={v => setForm({ ...form, club: v })} required />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label className="mono" style={{ fontSize: '10px', color: 'var(--fg-3)', letterSpacing: '0.15em', marginBottom: '10px', display: 'block' }}>VOTRE RÔLE</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px' }}>
                    {[['president', 'Président'], ['coach', 'Coach'], ['other', 'Autre']].map(([k, l]) => (
                      <button type="button" key={k} onClick={() => setForm({ ...form, role: k })}
                        style={{ padding: '12px 8px', border: '1px solid ' + (form.role === k ? 'var(--orange)' : 'var(--line)'), background: form.role === k ? 'rgba(255,102,0,0.08)' : 'transparent', color: form.role === k ? 'var(--orange)' : 'var(--fg-2)', fontSize: '12px', borderRadius: '2px', transition: 'all 0.15s', cursor: 'pointer' }}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                {!mobile && (
                  <div style={{ marginBottom: '20px' }}>
                    <label className="mono" style={{ fontSize: '10px', color: 'var(--fg-3)', letterSpacing: '0.15em', marginBottom: '10px', display: 'block' }}>MESSAGE (OPTIONNEL)</label>
                    <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={3}
                      style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--line)', color: 'var(--fg)', padding: '14px', fontSize: '13px', fontFamily: 'inherit', resize: 'vertical', borderRadius: '2px', outline: 'none' }} />
                  </div>
                )}

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px', marginTop: '4px' }}>
                  Envoyer ma demande<IconArrow size={14} />
                </button>
                <p className="mono" style={{ fontSize: '9px', color: 'var(--fg-3)', letterSpacing: '0.12em', marginTop: '12px', textAlign: 'center' }}>RÉPONSE SOUS 24H · SANS ENGAGEMENT</p>
              </>
            )}
          </form>
          </div>
        </div>
      </div>
    </section>
  )
}
