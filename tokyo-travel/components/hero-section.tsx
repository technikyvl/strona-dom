"use client"

import { ArrowRight } from "lucide-react"
import { useState } from "react"

export function HeroSection() {
  const [currentSlide] = useState(3)
  const totalSlides = 5

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/japanese-torii-gate-at-sunset-over-water-dramatic-.jpg"
          alt="Tokyo Torii Gate"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a1628]" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-6">
        <div className="flex items-center h-full">
          <div className="max-w-2xl">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-white leading-none mb-8">
              VISIT
              <br />
              TOKYO
            </h1>
          </div>
        </div>

        {/* Pagination */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <div
              key={i}
              className={`text-right ${
                i + 1 === currentSlide ? "text-white text-2xl font-bold" : "text-white/40 text-sm"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
          ))}
        </div>

        {/* Bottom Cards */}
        <div className="absolute bottom-12 left-6 right-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-black/40 backdrop-blur-sm p-6 border-t border-white/20">
                  <p className="text-white/80 text-sm mb-4 leading-relaxed">
                    Тому необходимо тогда и в ещё что-нибудь, исключительные для получения.
                  </p>
                  <button className="flex items-center gap-2 text-white text-sm font-medium uppercase tracking-wider hover:text-primary transition-all duration-300 hover:gap-3 group">
                    Подробнее
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
