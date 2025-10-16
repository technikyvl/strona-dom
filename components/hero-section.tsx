"use client"

import { ArrowRight } from "lucide-react"
import { useState } from "react"

export function HeroSection() {
  const [currentSlide] = useState(3)
  const totalSlides = 5

  return (
    <section id="dom" className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/dom na zewnatrz-kopia.jpeg"
          alt="Dom z zewnątrz – Highlander House Szczyrk"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a1628]" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-6">
        <div className="flex items-center h-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-6">
              Highlander House
              <br />
              Szczyrk
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-xl">
              Komfortowy dom do wynajęcia w centrum Szczyrku: 4 sypialnie, 12 miejsc,
              duży salon z kuchnią, sauna, taras z grillem, narciarnia i parking na 5 aut.
            </p>
          </div>
        </div>

        {/* Quick features */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-end gap-3 text-white/80">
          {[
            "12 miejsc noclegowych",
            "4 sypialnie / 3 łazienki",
            "Sauna bez dopłat",
            "Taras z grillem",
            "Narciarnia i suszarka do butów",
          ].map((label, i) => (
            <div key={i} className={`text-right ${i === 0 ? "text-xl font-bold text-white" : "text-sm"}`}>{label}</div>
          ))}
        </div>

        {/* Bottom Cards */}
        <div className="absolute bottom-12 left-6 right-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  text:
                    "Sauna, salon z 75'' TV i Netflix, w pełni wyposażona kuchnia oraz duży taras z widokiem.",
                  cta: "Zobacz galerię",
                },
                {
                  text:
                    "W cenie: Wi‑Fi, narciarnia z suszarką do butów, parking na 5 samochodów.",
                  cta: "Sprawdź udogodnienia",
                },
                {
                  text:
                    "Lokalizacja: centrum Szczyrku, blisko stoków (Skrzyczne 850 m, SMR 2,8 km).",
                  cta: "Pokaż lokalizację",
                },
              ].map((card, i) => (
                <div key={i} className="bg-black/40 backdrop-blur-sm p-6 border-t border-white/20">
                  <p className="text-white/80 text-sm mb-4 leading-relaxed">{card.text}</p>
                  <a href={i === 0 ? "#galeria" : i === 1 ? "#udogodnienia" : "#lokalizacja"} className="inline-flex">
                    <button className="flex items-center gap-2 text-white text-sm font-medium uppercase tracking-wider hover:text-primary transition-all duration-300 hover:gap-3 group">
                      {card.cta}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
