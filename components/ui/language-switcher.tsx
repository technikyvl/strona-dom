"use client"

import { useI18n, locales } from "@/components/ui/lang"
import { cn } from "@/lib/utils"

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useI18n()
  return (
    <div className={cn("flex items-center gap-1 bg-white/60 backdrop-blur-xl border border-border rounded-full px-1 py-1 ring-1 ring-primary/20 shadow-sm", className)}>
      {locales.map((l) => (
        <button
          key={l.code}
          onClick={() => setLocale(l.code)}
          className={cn(
            "px-3 py-1 rounded-full text-xs font-lexend uppercase tracking-wide transition-all",
            locale === l.code ? "bg-primary/15 text-foreground shadow" : "text-foreground/70 hover:text-foreground"
          )}
        >
          {l.label}
        </button>
      ))}
    </div>
  )}


