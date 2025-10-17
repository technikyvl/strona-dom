"use client"

import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
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
        {/* smoother, longer bottom gradient into next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className={`relative h-full container mx-auto px-6 transition-all duration-1000 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="flex items-center h-full justify-end">
          <div className="max-w-2xl text-left pr-0 md:pr-0 lg:pr-0 mr-4 md:mr-8 lg:mr-12 -translate-y-16 md:-translate-y-20 lg:-translate-y-24 -translate-x-2 md:-translate-x-1 lg:translate-x-0 px-3 md:px-5 lg:px-6">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight text-white/95 drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)] font-lexend uppercase"
            >
              <span className="block">Highlander</span>
              <span className="block">House</span>
              <span className="block">Szczyrk</span>
            </motion.h1>
          </div>
        </div>

        {/* Quick features removed */}

        {/* Bottom Cards removed */}
      </div>
    </section>
  )
}
