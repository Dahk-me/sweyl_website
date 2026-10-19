import React from 'react'

/**
 * Pastilles à un tap, en vrai groupe radio : navigables au clavier (flèches), annoncées
 * comme un choix unique. `options` est une liste de [valeur, libellé].
 */
export default function ChipGroup({ options, value, onChange, labelledBy, invalid, disabled, padding = '12px 8px', fontSize = '12px', gap = '8px' }) {
  const refs = React.useRef([])
  const selected = options.findIndex(([k]) => k === value)

  const move = (from, step) => {
    const next = (from + step + options.length) % options.length
    onChange(options[next][0])
    refs.current[next]?.focus()
  }
  const onKeyDown = (i) => (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); move(i, 1) }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); move(i, -1) }
  }

  return (
    <div role="radiogroup" aria-labelledby={labelledBy} aria-invalid={invalid || undefined}
      style={{ display: 'grid', gridTemplateColumns: `repeat(${options.length},1fr)`, gap }}>
      {options.map(([k, l], i) => {
        const on = k === value
        const border = on ? 'var(--primary)' : invalid ? 'color-mix(in srgb, #e55 55%, transparent)' : 'var(--line)'
        return (
          <button
            type="button" key={k} role="radio" aria-checked={on} disabled={disabled}
            ref={el => { refs.current[i] = el }}
            tabIndex={on || (selected === -1 && i === 0) ? 0 : -1}
            onClick={() => onChange(k)} onKeyDown={onKeyDown(i)}
            style={{
              padding, border: '1px solid ' + border,
              background: on ? 'color-mix(in srgb, var(--primary) 8%, transparent)' : 'transparent',
              color: on ? 'var(--primary)' : 'var(--fg-2)', fontSize, borderRadius: '2px',
              transition: 'all 0.15s', cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.55 : 1,
            }}>
            {l}
          </button>
        )
      })}
    </div>
  )
}
