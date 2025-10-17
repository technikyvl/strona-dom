"use client"

import { useInView } from "@/lib/use-in-view"
import { useI18n } from "@/components/ui/lang"

export function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.1, once: false })
  const { t } = useI18n()
  return (
    <section id="kontakt" ref={ref as any} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-10 transition-all duration-1000 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-serif-brand">{t("contactTitle")}</h2>
          <p className="text-foreground/60 mt-3">{t("contactSubtitle")}</p>
        </div>

        <div className={`mx-auto max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <a href="tel:+48501558530" className="rounded-2xl border border-border bg-muted/50 p-6 text-center text-foreground/90 hover:text-foreground hover:bg-muted transition">
            <div className="text-sm uppercase tracking-wider">{t("phone")}</div>
            <div className="mt-2 text-lg font-semibold">+48 501 558 530</div>
          </a>
          <a href="mailto:kontakt@szczyrkdom.pl" className="rounded-2xl border border-border bg-muted/50 p-6 text-center text-foreground/90 hover:text-foreground hover:bg-muted transition">
            <div className="text-sm uppercase tracking-wider">{t("email")}</div>
            <div className="mt-2 text-lg font-semibold">kontakt@szczyrkdom.pl</div>
          </a>
          <div className="rounded-2xl border border-border bg-muted/50 p-6 text-center text-foreground/90">
            <div className="text-sm uppercase tracking-wider">{t("address")}</div>
            <div className="mt-2 text-lg font-semibold">{t("addressValue")}</div>
          </div>
        </div>
      </div>
    </section>
  )
}


