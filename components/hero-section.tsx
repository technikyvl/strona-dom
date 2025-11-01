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
          src="/upscalemedia-transformed.jpeg"
          alt="Dom z zewnątrz – Highlander House Szczyrk"
          className="w-full h-full object-cover"
        />
        {/* smoother, light fade into white sections */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
      </div>

      {/* Content */}
      <div className={`relative h-full container mx-auto px-4 sm:px-6 transition-all duration-1000 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="flex items-center h-full justify-center sm:justify-end">
          <div className="max-w-2xl text-center sm:text-left -translate-y-12 sm:-translate-y-16 md:-translate-y-20 lg:-translate-y-24 px-4 sm:px-6">
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)] font-lexend uppercase transition-all duration-1000 ease-out delay-200 ${inView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}>
              <span className={`block transition-all duration-1000 ease-out delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>Highlander</span>
              <span className={`block transition-all duration-1000 ease-out delay-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>House</span>
              <span className={`block transition-all duration-1000 ease-out delay-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>Szczyrk</span>
            </h1>
          </div>
        </div>

        {/* Quick features removed */}

        {/* Bottom Cards removed */}
      </div>
    </section>
  )
}
