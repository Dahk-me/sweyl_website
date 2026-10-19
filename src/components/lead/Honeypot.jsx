import React from 'react'
import { HONEYPOT_FIELD } from '../../lib/leadOptions'

// Hors de l'écran et hors du parcours clavier : seul un robot le remplit.
export default function Honeypot({ value, onChange }) {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}>
      <label>
        Site web
        <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" value={value} onChange={e => onChange(e.target.value)} />
      </label>
    </div>
  )
}
