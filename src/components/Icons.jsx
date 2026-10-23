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
export const IconX = (p) => <Icon {...p}><path d="M6 6l12 12M18 6L6 18"/></Icon>
export const IconChevron = (p) => <Icon {...p}><path d="M6 9l6 6 6-6"/></Icon>
export const IconEye = (p) => <Icon {...p}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></Icon>
export const IconEyeOff = (p) => <Icon {...p}><path d="M3 3l18 18"/><path d="M10.6 5.1A10.4 10.4 0 0 1 12 5c6 0 10 7 10 7a17.6 17.6 0 0 1-3.2 3.9M6.6 6.6C3.9 8.4 2 12 2 12s4 7 10 7c1.8 0 3.4-.5 4.8-1.2"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></Icon>
export const IconHelp = (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M9.5 9.2a2.6 2.6 0 0 1 5 1c0 1.8-2.5 2.3-2.5 3.8"/><path d="M12 17.2h.01"/></Icon>
export const IconFog = (p) => <Icon {...p}><path d="M7 13a4 4 0 0 1 7.7-1.5A3 3 0 1 1 17 17H7a2 2 0 0 1 0-4z"/><path d="M3 21h12M9 6h11M5 9h6"/></Icon>
export const IconClipboard = (p) => <Icon {...p}><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="M9 10h6M9 14h6M9 18h3"/></Icon>
export const IconTrend = (p) => <Icon {...p}><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></Icon>
export const IconBroadcast = (p) => <Icon {...p}><circle cx="12" cy="12" r="2"/><path d="M7.8 16.2a6 6 0 0 1 0-8.4M16.2 7.8a6 6 0 0 1 0 8.4M4.9 19.1a10 10 0 0 1 0-14.2M19.1 4.9a10 10 0 0 1 0 14.2"/></Icon>
export const IconHeart = (p) => <Icon {...p}><path d="M12 20s-7-4.4-9.2-8.8C1.3 8.2 3 4.5 6.6 4.5c2.1 0 3.5 1.2 5.4 3.2 1.9-2 3.3-3.2 5.4-3.2 3.6 0 5.3 3.7 3.8 6.7C19 15.6 12 20 12 20z"/></Icon>
