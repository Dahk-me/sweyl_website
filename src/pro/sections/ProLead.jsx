import React from 'react'
import { IconArrow, IconCheck } from '../../components/Icons'
import { useMobile } from '../../hooks/useMobile'
import FormField, { FieldLabel, inputStyle } from '../../components/lead/FormField'
import ChipGroup from '../../components/lead/ChipGroup'
import Honeypot from '../../components/lead/Honeypot'
import { useLeadSubmit } from '../../components/lead/useLeadSubmit'
import { OFFER } from '../../lib/leadOptions'
import { COPY, DEMO_ANCHOR } from '../copy'
import Accent from '../Accent'

const L = COPY.lead
const LEVEL_OPTIONS = L.levels.map(l => [l, l])
const ROLE_OPTIONS = Object.entries(L.roles)

export default function ProLead() {
  const mobile = useMobile()
  // Niveau sans valeur par défaut : un défaut fausserait le tri des demandes.
  const [form, setForm] = React.useState({ name: '', email: '', club: '', level: '', role: 'coach', message: '' })
  const [levelMissing, setLevelMissing] = React.useState(false)
  const { loading, sent, error, submit, honeypot, setHoneypot } = useLeadSubmit()
  const set = (key) => (v) => setForm(f => ({ ...f, [key]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.level) { setLevelMissing(true); return }
    submit({ offer: OFFER.pro, ...form })
  }

  return (
    <section className="pro-lead" id={DEMO_ANCHOR}>
      <div className="pro-in">
        <div className="pro-lead-grid">
          <div className="pro-lead-title">
            <div className="eyebrow">{L.eyebrow}</div>
            <h2 className="display">
              <Accent text={L.title} />
            </h2>
          </div>

          <div>
            <div className="pro-perks">
              {L.perks.map(p => (
                <div key={p} className="pro-perk">
                  <span className="pro-check"><IconCheck size={12} stroke={2} /></span>
                  {p}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} style={{ background: 'var(--bg-3)', border: '1px solid var(--line)', padding: mobile ? '24px 20px' : '40px', borderRadius: '4px' }}>
              {sent ? (
                <div role="status" style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ width: '64px', height: '64px', border: '1px solid var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--primary)' }}>
                    <IconCheck size={28} stroke={2} />
                  </div>
                  <div className="display" style={{ fontSize: '40px', marginBottom: '12px' }}>{L.okTitle}</div>
                  <p style={{ color: 'var(--fg-2)', fontSize: '15px', lineHeight: 1.5 }}>{L.okText}</p>
                </div>
              ) : (
                <>
                  <Honeypot value={honeypot} onChange={setHoneypot} />

                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                    <FormField label={L.fields.name} value={form.name} onChange={set('name')} required disabled={loading} />
                    <FormField label={L.fields.email} type="email" value={form.email} onChange={set('email')} required disabled={loading} />
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <FormField label={L.fields.club} placeholder={L.fields.clubPlaceholder} value={form.club} onChange={set('club')} required disabled={loading} />
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <FieldLabel id="pro-level" required>{L.fields.level}</FieldLabel>
                    <ChipGroup
                      labelledBy="pro-level" options={LEVEL_OPTIONS} value={form.level} invalid={levelMissing} disabled={loading}
                      onChange={v => { set('level')(v); setLevelMissing(false) }}
                      padding={mobile ? '12px 2px' : '12px 6px'} fontSize={mobile ? '11px' : '12px'} gap={mobile ? '6px' : '8px'}
                    />
                    {levelMissing && <p role="alert" style={{ fontSize: '12px', color: '#e55', marginTop: '8px' }}>{L.levelMissing}</p>}
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <FieldLabel id="pro-role">{L.fields.role}</FieldLabel>
                    <ChipGroup labelledBy="pro-role" options={ROLE_OPTIONS} value={form.role} onChange={set('role')} disabled={loading} padding="12px 6px" />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <FieldLabel htmlFor="pro-message">{L.fields.message}</FieldLabel>
                    <textarea
                      id="pro-message" value={form.message} onChange={e => set('message')(e.target.value)} rows={3}
                      placeholder={L.fields.messagePlaceholder} disabled={loading}
                      style={{ ...inputStyle, fontSize: '13px', resize: 'vertical', opacity: loading ? 0.55 : 1 }}
                    />
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px', marginTop: '6px', opacity: loading ? 0.7 : 1 }}>
                    {loading ? L.sending : <>{L.submit}<IconArrow size={14} /></>}
                  </button>
                  {error && <p role="alert" style={{ fontSize: '12px', color: '#e55', marginTop: '10px', textAlign: 'center' }}>{L.error}</p>}
                  <p className="mono" style={{ fontSize: '9px', color: 'var(--fg-3)', letterSpacing: '0.12em', marginTop: '12px', textAlign: 'center' }}>{L.noCommitment}</p>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
