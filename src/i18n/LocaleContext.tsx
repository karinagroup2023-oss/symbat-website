import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Dict } from './types'
import { ru } from './ru'
import { kz } from './kz'

export type Locale = 'ru' | 'kz'
const dicts: Record<Locale, Dict> = { ru, kz }

interface Ctx { locale: Locale; setLocale: (l: Locale) => void }
const LocaleCtx = createContext<Ctx | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ru')
  const setLocale = (l: Locale) => { setLocaleState(l); document.documentElement.lang = l }
  return <LocaleCtx.Provider value={{ locale, setLocale }}>{children}</LocaleCtx.Provider>
}

export function useLocale(): Ctx {
  const c = useContext(LocaleCtx)
  if (!c) throw new Error('useLocale must be used within LocaleProvider')
  return c
}

export function useT(): Dict { return dicts[useLocale().locale] }
