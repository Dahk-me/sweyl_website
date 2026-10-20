import React from 'react'
import { useTranslation } from 'react-i18next'
import { IconArrow, IconCheck } from '../../components/Icons'
import { useMobile } from '../../hooks/useMobile'
import FormField, { FieldLabel, inputStyle } from '../../components/lead/FormField'
import ChipGroup from '../../components/lead/ChipGroup'
import Honeypot from '../../components/lead/Honeypot'
import { useLeadSubmit } from '../../components/lead/useLeadSubmit'
import { OFFER, PRO_LEVELS, PRO_ROLES } from '../../lib/leadOptions'
import { currentLanguage } from '../../i18n'
import { CONTACT_EMAIL, DEMO_ANCHOR, LEAD_PERKS } from '../copy'
import Accent from '../../components/Accent'


export default function ProLead() {
  const mobile = useMobile()
  const { t } = useTranslation('pro')
  // La valeur envoyée reste celle de leadOptions (le mail est en français), seul le libellé change.
  const levelOptions = PRO_LEVELS.map(level => [level, t(`lead.levels.${level}`)])
  const roleOptions = Object.keys(PRO_ROLES).map(role => [role, t(`lead.roles.${role}`)])
  // Niveau sans valeur par défaut : un défaut fausserait le tri des demandes.
  const [form, setForm] = React.useState({ name: '', email: '', club: '', level: '', role: 'coach', message: '' })
  const [levelMissing, setLevelMissing] = React.useState(false)
  const { loading, sent, error, submit, honeypot, setHoneypot } = useLeadSubmit()
  const set = (key) => (v) => setForm(f => ({ ...f, [key]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.level) { setLevelMissing(true); return }
    submit({ offer: OFFER.pro, language: currentLanguage(), ...form })
  }

  return (
    <section className="pro-lead" id={DEMO_ANCHOR}>
      <div className="pro-in">
        <div className="pro-lead-grid">
          <div className="pro-lead-title">
            <div className="eyebrow">{t('lead.eyebrow')}</div>
            <h2 className="display">
              <Accent text={t('lead.title')} accentClass="pro-accent" />
            </h2>
          </div>

          <div>
            <div className="pro-perks">
              {LEAD_PERKS.map(perk => (
                <div key={perk} className="pro-perk">
                  <span className="pro-check"><IconCheck size={12} stroke={2} /></span>
                  {t(`lead.perks.${perk}`)}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} style={{ background: 'var(--bg-3)', border: '1px solid var(--line)', padding: mobile ? '24px 20px' : '40px', borderRadius: '4px' }}>
              {sent ? (
                <div role="status" style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ width: '64px', height: '64px', border: '1px solid var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--primary)' }}>
                    <IconCheck size={28} stroke={2} />
                  </div>
                  <div className="display" style={{ fontSize: '40px', marginBottom: '12px' }}>{t('lead.okTitle')}</div>
                  <p style={{ color: 'var(--fg-2)', fontSize: '15px', lineHeight: 1.5 }}>{t('lead.okText')}</p>
                </div>
              ) : (
                <>
                  <Honeypot value={honeypot} onChange={setHoneypot} />

                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                    <FormField label={t('lead.fields.name')} value={form.name} onChange={set('name')} required disabled={loading} />
                    <FormField label={t('lead.fields.email')} type="email" value={form.email} onChange={set('email')} required disabled={loading} />
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <FormField label={t('lead.fields.club')} placeholder={t('lead.fields.clubPlaceholder')} value={form.club} onChange={set('club')} required disabled={loading} />
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <FieldLabel id="pro-level" required>{t('lead.fields.level')}</FieldLabel>
                    <ChipGroup
                      labelledBy="pro-level" options={levelOptions} value={form.level} invalid={levelMissing} disabled={loading}
                      onChange={v => { set('level')(v); setLevelMissing(false) }}
                      padding={mobile ? '12px 2px' : '12px 6px'} fontSize={mobile ? '11px' : '12px'} gap={mobile ? '6px' : '8px'}
                    />
                    {levelMissing && <p role="alert" style={{ fontSize: '12px', color: '#e55', marginTop: '8px' }}>{t('lead.levelMissing')}</p>}
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <FieldLabel id="pro-role">{t('lead.fields.role')}</FieldLabel>
                    <ChipGroup labelledBy="pro-role" options={roleOptions} value={form.role} onChange={set('role')} disabled={loading} padding="12px 6px" />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <FieldLabel htmlFor="pro-message">{t('lead.fields.message')}</FieldLabel>
                    <textarea
                      id="pro-message" value={form.message} onChange={e => set('message')(e.target.value)} rows={3}
                      placeholder={t('lead.fields.messagePlaceholder')} disabled={loading}
                      style={{ ...inputStyle, fontSize: '13px', resize: 'vertical', opacity: loading ? 0.55 : 1 }}
                    />
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px', marginTop: '6px', opacity: loading ? 0.7 : 1 }}>
                    {loading ? t('lead.sending') : <>{t('lead.submit')}<IconArrow size={14} /></>}
                  </button>
                  {error && <p role="alert" style={{ fontSize: '12px', color: '#e55', marginTop: '10px', textAlign: 'center' }}>{t('lead.error', { email: CONTACT_EMAIL })}</p>}
                  <p className="mono" style={{ fontSize: '9px', color: 'var(--fg-3)', letterSpacing: '0.12em', marginTop: '12px', textAlign: 'center' }}>{t('lead.noCommitment')}</p>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
