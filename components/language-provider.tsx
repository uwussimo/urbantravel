"use client"

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react"
import type { Language } from "@/lib/translations"

interface LanguageContextValue {
  lang: Language
  setLang: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "ru",
  setLang: () => {},
})

// The chosen language lives in localStorage; useSyncExternalStore keeps React
// in sync with it without a hydration mismatch (server always renders "ru").
let listeners: Array<() => void> = []

function subscribe(listener: () => void) {
  listeners.push(listener)
  return () => {
    listeners = listeners.filter((l) => l !== listener)
  }
}

function getSnapshot(): Language {
  return localStorage.getItem("lang") === "uz" ? "uz" : "ru"
}

function getServerSnapshot(): Language {
  return "ru"
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setLang = useCallback((newLang: Language) => {
    localStorage.setItem("lang", newLang)
    listeners.forEach((l) => l())
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
