import React from 'react'
import { useMobile } from '../../hooks/useMobile'
import { supabase } from '../../lib/supabase'
import { STORAGE } from '../../lib/storageConfig'

const stats = [['400+', 'UTILISATEURS'], ['15+', 'COACHS'], ['10+', 'CLUBS'], ['100+', 'MATCHS / SEM']]

function useCountUp(target, duration = 1800) {
  const [count, setCount] = React.useState(0)
  const ref = React.useRef(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      obs.disconnect()
      const start = performance.now()
      const tick = (now) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(eased * target))
        if (progress < 1) requestAnimationFrame(tick)
        else setCount(target)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0, rootMargin: '0px 0px -25% 0px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])

  return [count, ref]
}

function StatCell({ value, label, mobile }) {
  const num = parseInt(value)
  const suffix = value.replace(String(num), '')
  const [count, ref] = useCountUp(num)
  return (
    <div ref={ref} style={{ background: 'var(--bg-2)', padding: mobile ? '28px 20px' : '40px 32px' }}>
      <div className="mono" style={{ fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.18em', marginBottom: '8px' }}>★ {label}</div>
      <div className="display" style={{ fontSize: mobile ? 'clamp(48px,13vw,72px)' : 'clamp(72px,8vw,120px)', color: 'var(--fg)', lineHeight: 0.9 }}>
        {count}{suffix}
      </div>
    </div>
  )
}

export default function SocialProof() {
  const mobile = useMobile()
  const [logos, setLogos] = React.useState([])
  const [sponsors, setSponsors] = React.useState([])

  const fetchFolder = (folder) =>
    supabase.storage
      .from(STORAGE.LOGOS_BUCKET)
      .list(folder, { limit: 100 })
      .then(({ data, error }) => {
        if (error || !data) return []
        return data
          .filter(f => f.name !== '.emptyFolderPlaceholder')
          .map(f => ({
            name: f.name.replace(/\.[^.]+$/, ''),
            url: supabase.storage
              .from(STORAGE.LOGOS_BUCKET)
              .getPublicUrl(`${folder}/${f.name}`).data.publicUrl,
          }))
      })

  React.useEffect(() => {
    fetchFolder(STORAGE.LOGOS_FOLDER).then(setLogos)
    fetchFolder(STORAGE.SPONSORS_FOLDER).then(setSponsors)
  }, [])

  return (
    <section style={{ padding: mobile ? '60px 0' : '80px 0', background: 'var(--bg-2)' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: mobile ? '0 0' : '0 32px' }}>
        {/* Header */}
        <div style={{ padding: mobile ? '0 20px 48px' : '0 0 64px' }} data-reveal>
          <div className="eyebrow" style={{ marginBottom: '16px', fontSize: mobile ? '11px' : '13px' }}>—— Ils nous font confiance</div>
          <h2 className="display" style={{ fontSize: mobile ? 'clamp(28px, 8vw, 48px)' : 'clamp(36px, 4vw, 64px)', maxWidth: '700px', lineHeight: 1 }}>
            L'<span style={{ color: 'var(--orange)' }}>exigence</span> mène à l'<span style={{ color: 'var(--orange)' }}>excellence</span>, ils l'ont déjà compris.
          </h2>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: '2px', marginBottom: '40px' }}>
          {stats.map(([n, l]) => (
            <StatCell key={l} value={n} label={l} mobile={mobile} />
          ))}
        </div>

        {/* Club logos — marquee */}
        {logos.length > 0 && (
            <>
                <div style={{ padding: mobile ? '24px 20px 12px' : '32px 0 16px' }}>
                    <div className="eyebrow" style={{ fontSize: mobile ? '11px' : '12px' }}>—— Les clubs</div>
                </div>
          <div style={{ overflow: 'hidden', padding: mobile ? '20px 0' : '32px 0' }}>
            <div className="marquee" style={{ willChange: 'transform' }}>
              {[...logos, ...logos, ...logos, ...logos].map((c, i) => (
                <img key={i} src={c.url} alt={c.name} style={{ height: mobile ? '64px' : '88px', width: 'auto', objectFit: 'contain', opacity: 0.85, marginRight: mobile ? '56px' : '96px', flexShrink: 0 }} />
              ))}
            </div>
          </div>
    </>
        )}

        {/* Sponsors — marquee inversé */}
        {sponsors.length > 0 && (
          <>
            <div style={{ padding: mobile ? '24px 20px 12px' : '32px 0 16px' }}>
              <div className="eyebrow" style={{ fontSize: mobile ? '11px' : '12px' }}>—— Nos partenaires</div>
            </div>
            <div style={{ overflow: 'hidden', padding: mobile ? '8px 0 20px' : '12px 0 32px' }}>
              <div className="marquee-reverse" style={{ willChange: 'transform' }}>
                {[...sponsors, ...sponsors, ...sponsors, ...sponsors].map((s, i) => (
                  <img key={i} src={s.url} alt={s.name} style={{ height: mobile ? '40px' : '56px', width: 'auto', objectFit: 'contain', opacity: 0.7, marginRight: mobile ? '56px' : '96px', flexShrink: 0 }} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
