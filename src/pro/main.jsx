import React from 'react'
import ReactDOM from 'react-dom/client'
import ProApp from './ProApp'
import { initI18n } from '../i18n'
import '../index.css'
import './pro.css'

// La langue se charge avant le premier rendu : sans ça, la page clignoterait en clés brutes.
initI18n('pro').then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ProApp />
    </React.StrictMode>
  )
})
