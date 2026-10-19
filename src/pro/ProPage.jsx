import React from 'react'
import { useReveal } from '../hooks/useReveal'
import ProHeader from './sections/ProHeader'
import ProFooter from './sections/ProFooter'

export default function ProPage() {
  useReveal()
  return (
    <div className="pro-page" id="top">
      <ProHeader />
      <main />
      <ProFooter />
    </div>
  )
}
