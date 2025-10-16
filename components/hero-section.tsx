"use client"

import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { useInView } from "@/lib/use-in-view"

export function HeroSection() {
  const [currentSlide] = useState(3)
  const totalSlides = 5

  const { ref, inView } = useInView({ threshold: 0.2, once: false })

  return (
    <section
      id="dom"
      ref={ref as any}
      className={`relative h-screen w-full overflow-hidden transition-all duration-1000 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
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
          <div className="max-w-2xl" />
        </div>

        {/* Quick features removed */}

        {/* Bottom Cards */}
        <div className="absolute bottom-12 left-6 right-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-black/40 backdrop-blur-sm p-6 border-t border-white/20" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
