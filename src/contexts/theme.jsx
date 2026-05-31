import React from 'react'

export const ThemeCtx = React.createContext({ theme: 'dark', toggleTheme: () => {} })

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState(
    () => localStorage.getItem('sweyl-theme') || 'dark'
  )

  const toggleTheme = React.useCallback(() => {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
  }, [])

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('sweyl-theme', theme)
  }, [theme])

  return (
    <ThemeCtx.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeCtx.Provider>
  )
}

export const useTheme = () => React.useContext(ThemeCtx)
