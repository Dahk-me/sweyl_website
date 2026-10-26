import React from 'react'
import { useTranslation } from 'react-i18next'
import { IconPlus } from '../../components/Icons'
import SectionHead from '../components/SectionHead'
import { ANCHORS, FAQS } from '../copy'

/** Les objections, levées en deux phrases. Une seule réponse ouverte à la fois. */
export default function FAQ() {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(FAQS[0])

  return (
    <section id={ANCHORS.faq} className="h-section h-faq-section">
      <div className="h-wrap h-faq-layout">
        <SectionHead eyebrow={t('faq.eyebrow')} title={t('faq.title')} />

        <div className="h-faq" data-reveal>
          {FAQS.map(id => {
            const isOpen = open === id
            return (
              <div key={id} className={`h-faq-item${isOpen ? ' is-open' : ''}`}>
                <h3>
                  <button
                    type="button"
                    className="h-faq-q"
                    id={`faq-q-${id}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${id}`}
                    onClick={() => setOpen(isOpen ? null : id)}
                  >
                    <span>{t(`faq.items.${id}.q`)}</span>
                    <span className="h-faq-plus" aria-hidden="true"><IconPlus size={16} stroke={2} /></span>
                  </button>
                </h3>
                <div className="h-faq-a" id={`faq-a-${id}`} role="region" aria-labelledby={`faq-q-${id}`}>
                  <div><p>{t(`faq.items.${id}.a`)}</p></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
