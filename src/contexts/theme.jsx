import React from 'react'
import { readCookie, sharedCookie } from '../lib/sharedCookie'

const THEMES = ['dark', 'light']
const DEFAULT_THEME = 'dark'
/** Commun à sweyl.com et pro.sweyl.com, comme la langue (`src/lib/sharedCookie.js`). */
const THEME_STORAGE_KEY = 'sweyl-theme'

export const ThemeCtx = React.createContext({ theme: DEFAULT_THEME, toggleTheme: () => {} })

function readStoredTheme() {
  const stored = readCookie(document.cookie, THEME_STORAGE_KEY)
  return THEMES.includes(stored) ? stored : DEFAULT_THEME
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState(readStoredTheme)

  const toggleTheme = React.useCallback(() => {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
  }, [])

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.cookie = sharedCookie(THEME_STORAGE_KEY, theme, window.location.hostname)
  }, [theme])

  return (
    <ThemeCtx.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeCtx.Provider>
  )
}

export const useTheme = () => React.useContext(ThemeCtx)
