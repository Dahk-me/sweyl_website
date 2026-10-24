import React from 'react'
import { useTranslation } from 'react-i18next'
import { IconArrow, IconCheck } from '../../components/Icons'
import Accent from '../../components/Accent'
import FormField from '../../components/lead/FormField'
import ChipGroup from '../../components/lead/ChipGroup'
import Honeypot from '../../components/lead/Honeypot'
import { useLeadSubmit } from '../../components/lead/useLeadSubmit'
import { CLUB_ROLES, CONTACT_EMAIL, OFFER } from '../../lib/leadOptions'
import { currentLanguage } from '../../i18n'
import JoinButton from '../components/JoinButton'
import { ANCHORS } from '../copy'

/**
 * La décision. Le bouton principal crée le club dans l'application, seul et tout de suite. Le
 * formulaire reste à côté, en secours, pour qui préfère une démo avant de se lancer : l'équipe le
 * rappelle sous 24h (*Ismail, 24/10/2026*).
 */
export default function Join() {
  const { t } = useTranslation()
  const [form, setForm] = React.useState({ name: '', email: '', club: '', role: 'coach', message: '' })
  const { loading, sent, error, submit, honeypot, setHoneypot } = useLeadSubmit()
  const set = key => value => setForm(f => ({ ...f, [key]: value }))

  const handleSubmit = e => {
    e.preventDefault()
    submit({ offer: OFFER.club, language: currentLanguage(), ...form })
  }

  return (
    <section id={ANCHORS.join} className="h-final">
      <div className="h-wrap h-final-grid">
        <div className="h-final-copy" data-reveal>
          <p className="eyebrow h-season-tag">{t('cta.badge')}</p>
          <h2 className="display h-final-title"><Accent text={t('join.title')} /></h2>
          <p className="h-final-question">{t('join.question')}</p>
          <p className="h-final-sub">{t('join.sub')}</p>
          <JoinButton className="h-final-cta" />
          <p className="h-final-trust">{t('join.trust')}</p>
        </div>

        <form className="h-form" onSubmit={handleSubmit} data-reveal>
          {sent ? (
            <div className="h-form-ok" role="status">
              <span className="h-form-ok-icon"><IconCheck size={28} stroke={2} /></span>
              <p className="display h-form-ok-title">{t('join.okTitle')}</p>
              <p className="h-form-ok-text">{t('join.okText')}</p>
            </div>
          ) : (
            <>
              <p className="h-form-title">{t('join.formTitle')}</p>
              <Honeypot value={honeypot} onChange={setHoneypot} />

              <div className="h-form-row">
                <FormField label={t('join.fields.name')} name="name" value={form.name} onChange={set('name')} placeholder={t('join.placeholders.name')} required disabled={loading} />
                <FormField label={t('join.fields.email')} name="email" type="email" value={form.email} onChange={set('email')} placeholder={t('join.placeholders.email')} required disabled={loading} />
              </div>
              <FormField label={t('join.fields.club')} name="club" value={form.club} onChange={set('club')} placeholder={t('join.placeholders.club')} required disabled={loading} />

              <div>
                <span className="mono h-form-label" id="join-role">{t('join.fields.role')}</span>
                <ChipGroup
                  labelledBy="join-role"
                  options={Object.keys(CLUB_ROLES).map(role => [role, t(`join.roles.${role}`)])}
                  value={form.role}
                  onChange={set('role')}
                  disabled={loading}
                  padding="13px 8px"
                  fontSize="13px"
                />
              </div>

              <div>
                <label className="mono h-form-label" htmlFor="join-message">{t('join.fields.message')}</label>
                <textarea
                  id="join-message"
                  className="h-form-textarea"
                  rows={2}
                  value={form.message}
                  onChange={e => set('message')(e.target.value)}
                  placeholder={t('join.placeholders.message')}
                  disabled={loading}
                />
              </div>

              <button type="submit" disabled={loading} className="h-form-submit">
                {loading ? t('join.sending') : <>{t('join.submit')}<IconArrow size={15} stroke={2} /></>}
              </button>
              {error && <p className="h-form-error" role="alert">{t('join.error', { email: CONTACT_EMAIL })}</p>}
              <p className="h-micro h-micro--center">{t('join.micro')}</p>
            </>
          )}
        </form>
      </div>
    </section>
  )
}
