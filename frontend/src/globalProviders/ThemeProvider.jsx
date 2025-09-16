import { createContext, useContext, useEffect, useState } from "react"

const ThemeProviderContext = createContext({
  theme: "system",
  setTheme: () => null,
})

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultAccent = "blue",
  storageKey = "vite-ui-theme",
  storageKey2 = "vite-ui-accent",
  ...props
}) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(storageKey) || defaultTheme
  })

  const [accent, setAccent] = useState(() => {
    return localStorage.getItem(storageKey2) || defaultAccent
  })

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
        //this is for the 'system' theme which selects theme based on color scheme preference of browser; dont need to implement this for accent colors

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
    console.log(localStorage)
    console.log(root.classList)
  }, [theme])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("neutral", "red","orange","blue", "green", "violet");


    root.classList.add(accent)
    console.log(localStorage)
    console.log(root.classList)
  }, [accent])

  const value = {
    theme,
    setTheme: (theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
    accent,
    setAccent : (accent) => {
      localStorage.setItem(storageKey2, accent)
      setAccent(accent)
    }
  }

  return (
    <ThemeProviderContext.Provider value={value} {...props}>
      {/* <div data-theme={accent} className="min-h-screen"> */}
        {children}
      {/* </div> */}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}