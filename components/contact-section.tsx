"use client"

import { useInView } from "@/lib/use-in-view"

export function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.1, once: false })
  return (
    <section
      id="kontakt"
      ref={ref as any}
      className={`py-24 bg-[#0a0e1a] transition-all duration-1000 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-10" />

        <div className="mx-auto max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="tel:+48501558530" className="rounded-2xl border border-white/15 bg-white/5 p-6 text-center text-white/90 hover:text-white hover:bg-white/10 transition" aria-label="Telefon +48 501 558 530" />
          <a href="mailto:kontakt@szczyrkdom.pl" className="rounded-2xl border border-white/15 bg-white/5 p-6 text-center text-white/90 hover:text-white hover:bg-white/10 transition" aria-label="Email kontakt@szczyrkdom.pl" />
          <div className="rounded-2xl border border-white/15 bg-white/5 p-6 text-center text-white/90" aria-label="Adres Szczyrk, centrum" />
        </div>
      </div>
    </section>
  )
}


