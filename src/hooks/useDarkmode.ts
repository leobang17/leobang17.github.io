import React from 'react'
import { PaletteMode, useMediaQuery } from '@mui/material'

const THEME_TOKEN = 'gatsbt-theme-simplex-theme'
const isBrowser = typeof window !== 'undefined'

export function useDarkmode() {
  const systemTheme = useMediaQuery('(prefers-color-scheme: dark)')
    ? 'dark'
    : 'light'

  const cachedTheme = isBrowser
    ? (localStorage.getItem(THEME_TOKEN) as null | PaletteMode)
    : undefined

  const [mode, setMode] = React.useState<PaletteMode>(
    cachedTheme ?? systemTheme,
  )

  // React.useEffect(() => {
  //   const cachedTheme = localStorage.getItem(THEME_TOKEN) as null | PaletteMode
  //   if (cachedTheme) {
  //     console.log('cachedTheme이 있다.', cachedTheme)
  //     setMode(cachedTheme)
  //   } else {
  //     localStorage.setItem(THEME_TOKEN, mode)
  //   }
  // }, [])

  const { switchMode } = React.useMemo<{ switchMode: () => void }>(() => {
    return {
      switchMode: () => {
        setMode(prevMode => {
          switch (prevMode) {
            case 'dark':
              localStorage.setItem(THEME_TOKEN, 'light')
              return 'light'
            case 'light':
              localStorage.setItem(THEME_TOKEN, 'dark')
              return 'dark'
          }
        })
      },
    }
  }, [])

  console.log('current theme: ', mode)

  return { mode, switchMode }
}
