"use client"

import React from "react"
import { I18nProvider } from "@/components/ui/lang"

export function I18nRoot({ children }: { children: React.ReactNode }) {
  return <I18nProvider>{children}</I18nProvider>
}


