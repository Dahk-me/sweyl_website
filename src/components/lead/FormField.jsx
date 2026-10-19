import React from 'react'

export const fieldLabelStyle = { fontSize: '10px', color: 'var(--fg-3)', letterSpacing: '0.15em', marginBottom: '8px', display: 'block' }

export const inputStyle = {
  width: '100%', background: 'var(--bg)', border: '1px solid var(--line)', color: 'var(--fg)',
  padding: '14px', fontSize: '16px', fontFamily: 'inherit', borderRadius: '2px', outline: 'none',
}

export const FieldLabel = ({ children, required, htmlFor, id }) => (
  <label className="mono" htmlFor={htmlFor} id={id} style={fieldLabelStyle}>
    {String(children).toUpperCase()}{required && <span style={{ color: 'var(--primary)' }}> *</span>}
  </label>
)

export default function FormField({ label, type = 'text', value, onChange, required, placeholder, disabled, name }) {
  const id = React.useId()
  return (
    <div>
      <FieldLabel htmlFor={id} required={required}>{label}</FieldLabel>
      <input
        id={id} name={name} type={type} value={value} onChange={e => onChange(e.target.value)}
        required={required} placeholder={placeholder} disabled={disabled}
        style={{ ...inputStyle, opacity: disabled ? 0.55 : 1 }}
      />
    </div>
  )
}
