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
    amenitiesSubtitle: "Wszystko, czego potrzebujesz na wyjazd",
    locationTitle: "Szczyrk – blisko stoków i szlaków",
    locationDescription: "Centrum Szczyrku, spokojna okolica, blisko restauracji i sklepów.\nSkrzyczne 850 m, SMR 2,8 km, Beskid Sport Arena 2,2 km, SKIBUS 200 m.",
    askAvailability: "Zapytaj o dostępność",
    sauna: "Sauna",
    saunaDesc: "Duża sauna bez dodatkowych opłat",
    salon: "Salon i kuchnia",
    salonDesc: "75'' TV, Netflix, w pełni wyposażona kuchnia",
    terrace: "Taras i grill",
    terraceDesc: "Przestronny taras z grillem gazowym",
    skiroom: "Narciarnia",
    skiroomDesc: "Przechowywanie sprzętu i suszarka do butów",
  },
  en: {
    home: "Home",
    amenities: "Amenities",
    location: "Location",
    contact: "Contact",
    amenitiesSubtitle: "Everything you need for your stay",
    locationTitle: "Szczyrk – close to slopes and trails",
    locationDescription: "Center of Szczyrk, quiet area, close to restaurants and shops.\nSkrzyczne 850 m, SMR 2.8 km, Beskid Sport Arena 2.2 km, SKIBUS 200 m.",
    askAvailability: "Ask about availability",
    sauna: "Sauna",
    saunaDesc: "Large sauna at no extra charge",
    salon: "Living room and kitchen",
    salonDesc: "75'' TV, Netflix, fully equipped kitchen",
    terrace: "Terrace and grill",
    terraceDesc: "Spacious terrace with gas grill",
    skiroom: "Ski room",
    skiroomDesc: "Equipment storage and boot dryer",
  },
  de: {
    home: "Start",
    amenities: "Ausstattung",
    location: "Lage",
    contact: "Kontakt",
    amenitiesSubtitle: "Alles, was Sie für Ihren Aufenthalt brauchen",
    locationTitle: "Szczyrk – nah an Pisten und Wanderwegen",
    locationDescription: "Zentrum von Szczyrk, ruhige Gegend, nah an Restaurants und Geschäften.\nSkrzyczne 850 m, SMR 2,8 km, Beskid Sport Arena 2,2 km, SKIBUS 200 m.",
    askAvailability: "Verfügbarkeit anfragen",
    sauna: "Sauna",
    saunaDesc: "Große Sauna ohne Aufpreis",
    salon: "Wohnzimmer und Küche",
    salonDesc: "75'' TV, Netflix, voll ausgestattete Küche",
    terrace: "Terrasse und Grill",
    terraceDesc: "Geräumige Terrasse mit Gasgrill",
    skiroom: "Skiraum",
    skiroomDesc: "Ausrüstungslager und Stiefeltrockner",
  },
  cs: {
    home: "Domů",
    amenities: "Vybavení",
    location: "Lokalita",
    contact: "Kontakt",
    amenitiesSubtitle: "Vše, co potřebujete k pobytu",
    locationTitle: "Szczyrk – blízko sjezdovek a stezek",
    locationDescription: "Centrum Szczyrku, klidná oblast, blízko restaurací a obchodů.\nSkrzyczne 850 m, SMR 2,8 km, Beskid Sport Arena 2,2 km, SKIBUS 200 m.",
    askAvailability: "Zeptejte se na dostupnost",
    sauna: "Sauna",
    saunaDesc: "Velká sauna bez příplatku",
    salon: "Obývací pokoj a kuchyň",
    salonDesc: "75'' TV, Netflix, plně vybavená kuchyň",
    terrace: "Terasa a gril",
    terraceDesc: "Prostorná terasa s plynovým grilem",
    skiroom: "Lyžařská místnost",
    skiroomDesc: "Skladování vybavení a sušička bot",
  },
  sk: {
    home: "Domov",
    amenities: "Vybavenie",
    location: "Lokalita",
    contact: "Kontakt",
    amenitiesSubtitle: "Všetko, čo potrebujete na pobyt",
    locationTitle: "Szczyrk – blízko svahov a chodníkov",
    locationDescription: "Centrum Szczyrku, pokojná oblasť, blízko reštaurácií a obchodov.\nSkrzyczne 850 m, SMR 2,8 km, Beskid Sport Arena 2,2 km, SKIBUS 200 m.",
    askAvailability: "Opýtajte sa na dostupnosť",
    sauna: "Sauna",
    saunaDesc: "Veľká sauna bez príplatku",
    salon: "Obývacia izba a kuchyňa",
    salonDesc: "75'' TV, Netflix, plne vybavená kuchyňa",
    terrace: "Terasa a gril",
    terraceDesc: "Priestorná terasa s plynovým grilom",
    skiroom: "Lyžiarska miestnosť",
    skiroomDesc: "Skladovanie vybavenia a sušička topánok",
  },
  uk: {
    home: "Дім",
    amenities: "Зручності",
    location: "Локація",
    contact: "Контакт",
    amenitiesSubtitle: "Все, що потрібно для вашого перебування",
    locationTitle: "Щирик – близько до схилів та стежок",
    locationDescription: "Центр Щирика, тиха місцевість, близько до ресторанів та магазинів.\nСкшичне 850 м, СМР 2,8 км, Бескид Спорт Арена 2,2 км, СКІБАС 200 м.",
    askAvailability: "Запитати про доступність",
    sauna: "Сауна",
    saunaDesc: "Велика сауна без додаткової плати",
    salon: "Вітальня та кухня",
    salonDesc: "75'' ТБ, Netflix, повністю обладнана кухня",
    terrace: "Тераса та гриль",
    terraceDesc: "Простора тераса з газовим грилем",
    skiroom: "Лижна кімната",
    skiroomDesc: "Зберігання спорядження та сушарка для взуття",
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


