"use client"

import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { useInView } from "@/lib/use-in-view"

export function HeroSection() {
  const [currentSlide] = useState(3)
  const totalSlides = 5

  const { ref, inView } = useInView({ threshold: 0.2, once: false })

  return (
    <section id="dom" ref={ref as any} className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/dom na zewnatrz-kopia.jpeg"
          alt="Dom z zewnątrz – Highlander House Szczyrk"
          className="w-full h-full object-cover"
        />
        {/* smoother, longer bottom gradient into next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className={`relative h-full container mx-auto px-6 transition-all duration-1000 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="flex items-center h-full">
          <div className="max-w-2xl" />
        </div>

        {/* Quick features removed */}

        {/* Bottom Cards */}
        <div className="absolute bottom-12 left-6 right-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  text:
                    "Sauna, salon z 75'' TV i Netflix, w pełni wyposażona kuchnia oraz duży taras z widokiem.",
                  cta: "Sprawdź udogodnienia",
                  href: "#udogodnienia",
                },
                {
                  text:
                    "W cenie: Wi‑Fi, narciarnia z suszarką do butów, parking na 5 samochodów.",
                  cta: "Sprawdź udogodnienia",
                  href: "#udogodnienia",
                },
                {
                  text:
                    "Lokalizacja: centrum Szczyrku, blisko stoków (Skrzyczne 850 m, SMR 2,8 km).",
                  cta: "Pokaż lokalizację",
                  href: "#lokalizacja",
                },
              ].map((card, i) => (
                <div key={i} className="bg-black/40 backdrop-blur-sm p-6 border-t border-white/20">
                  <p className="text-white/80 text-sm mb-4 leading-relaxed">{card.text}</p>
                  <a href={card.href} className="inline-flex">
                    <button className="flex items-center gap-2 text-white text-sm font-medium uppercase tracking-wider hover:text-primary transition-all duration-300 hover:gap-3 group rounded-full px-4 py-2 bg-white/10 hover:bg-white/15 ring-1 ring-inset ring-white/20">
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
