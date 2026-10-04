import React from 'react'

const Icon = ({ size = 20, stroke = 1.5, children, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" {...props}>
    {children}
  </svg>
)

export const IconSun = (p) => <Icon {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></Icon>
export const IconMoon = (p) => <Icon {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></Icon>
export const IconArrow = (p) => <Icon {...p}><path d="M5 12h14M13 5l7 7-7 7"/></Icon>
export const IconCheck = (p) => <Icon {...p}><path d="M5 12l5 5 9-11"/></Icon>
export const IconPlus = (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>
export const IconUser = (p) => <Icon {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></Icon>
export const IconCalendar = (p) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></Icon>
export const IconBars = (p) => <Icon {...p}><path d="M4 20V10M10 20V4M16 20v-7M22 20v-3"/></Icon>
export const IconBuilding = (p) => <Icon {...p}><path d="M4 21V8l8-4 8 4v13"/><path d="M9 21V12h6v9M4 21h16"/></Icon>
