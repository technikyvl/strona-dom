"use client"

import React, { createContext, useContext, useMemo, useState } from "react"

type Locale = "pl" | "en" | "de" | "cs" | "sk" | "uk"

type Dict = Record<string, string>

const dictionaries: Record<Locale, Dict> = {
  pl: {
    home: "Dom",
    amenities: "Udogodnienia",
    location: "Lokalizacja",
    contact: "Kontakt",
  },
  en: {
    home: "Home",
    amenities: "Amenities",
    location: "Location",
    contact: "Contact",
  },
  de: {
    home: "Start",
    amenities: "Ausstattung",
    location: "Lage",
    contact: "Kontakt",
  },
  cs: {
    home: "Domů",
    amenities: "Vybavení",
    location: "Lokalita",
    contact: "Kontakt",
  },
  sk: {
    home: "Domov",
    amenities: "Vybavenie",
    location: "Lokalita",
    contact: "Kontakt",
  },
  uk: {
    home: "Дім",
    amenities: "Зручності",
    location: "Локація",
    contact: "Контакт",
  },
}

type I18nContextValue = {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: keyof Dict) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("pl")
  const value = useMemo<I18nContextValue>(() => ({
    locale,
    setLocale,
    t: (key) => dictionaries[locale][key] ?? String(key),
  }), [locale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}

export const locales: { code: Locale; label: string }[] = [
  { code: "pl", label: "PL" },
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
  { code: "cs", label: "CS" },
  { code: "sk", label: "SK" },
  { code: "uk", label: "UK" },
]


