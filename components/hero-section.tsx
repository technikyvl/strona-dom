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
          src="/dom na zewnatrz-kopia.jpeg"
          alt="Dom z zewnątrz – Highlander House Szczyrk"
          className="w-full h-full object-cover"
        />
        {/* smoother, longer bottom gradient into next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className={`relative h-full container mx-auto px-6 transition-all duration-1000 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="flex items-center h-full justify-end">
          <div className="max-w-2xl text-left pr-2 md:pr-4 lg:pr-6 -translate-y-16 md:-translate-y-20 lg:-translate-y-24 translate-x-2 md:translate-x-3 lg:translate-x-4">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white/95 drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)] font-sans"
            >
              Highlander House Szczyrk
            </motion.h1>
          </div>
        </div>

        {/* Quick features removed */}

        {/* Bottom Cards removed */}
      </div>
    </section>
  )
}
