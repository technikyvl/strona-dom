"use client"

import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { useInView } from "@/lib/use-in-view"

export function HeroSection() {
  const [currentSlide] = useState(3)
  const totalSlides = 5

  const { ref, inView } = useInView({ threshold: 0.2, once: false })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1]
      }
    }
  }

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
      <motion.div 
        className={`relative h-full container mx-auto px-6 transition-all duration-1000 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="flex items-center h-full justify-end">
          <div className="max-w-2xl text-left pr-0 md:pr-0 lg:pr-0 mr-4 md:mr-8 lg:mr-12 -translate-y-16 md:-translate-y-20 lg:-translate-y-24 translate-x-10 md:translate-x-18 lg:translate-x-24 px-3 md:px-5 lg:px-6">
            <motion.h1
              variants={textVariants}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)] font-lexend uppercase"
            >
              <motion.span className="block" variants={textVariants}>Highlander</motion.span>
              <motion.span className="block" variants={textVariants}>House</motion.span>
              <motion.span className="block" variants={textVariants}>Szczyrk</motion.span>
            </motion.h1>
          </div>
        </div>

        {/* Quick features removed */}

        {/* Bottom Cards removed */}
      </motion.div>
    </section>
  )
}
