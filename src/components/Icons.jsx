import React from 'react'

const Icon = ({ size = 20, stroke = 1.5, children, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" {...props}>
    {children}
  </svg>
)

export const IconArrow = (p) => <Icon {...p}><path d="M5 12h14M13 5l7 7-7 7"/></Icon>
export const IconCheck = (p) => <Icon {...p}><path d="M5 12l5 5 9-11"/></Icon>
export const IconPlus = (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>
export const IconUser = (p) => <Icon {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></Icon>
export const IconCalendar = (p) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></Icon>
export const IconBars = (p) => <Icon {...p}><path d="M4 20V10M10 20V4M16 20v-7M22 20v-3"/></Icon>
export const IconBuilding = (p) => <Icon {...p}><path d="M4 21V8l8-4 8 4v13"/><path d="M9 21V12h6v9M4 21h16"/></Icon>
