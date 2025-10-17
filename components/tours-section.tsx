"use client"

import { Card } from "@/components/ui/card"
import { useI18n } from "@/components/ui/lang"
import { useInView } from "@/lib/use-in-view"

const features = [
  {
    id: 1,
    titleKey: "sauna",
    subtitleKey: "saunaDesc",
    image: "/sauna 1-kopia.jpeg",
  },
  {
    id: 2,
    titleKey: "salon",
    subtitleKey: "salonDesc",
    image: "/salon 2-kopia.jpeg",
  },
  {
    id: 3,
    titleKey: "terrace",
    subtitleKey: "terraceDesc",
    image: "/plac zabaw-kopia.jpeg",
  },
  {
    id: 4,
    titleKey: "skiroom",
    subtitleKey: "skiroomDesc",
    image: "/suszarnia-kopia.jpeg",
  },
]

export function ToursSection() {
  const { ref, inView } = useInView({ threshold: 0.15, once: false })
  const { t } = useI18n()
  return (
    <section id="udogodnienia" ref={ref as any} className="h-screen bg-white flex items-center">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-foreground/60 text-sm uppercase tracking-widest mb-3">{t("amenitiesSubtitle")}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-serif-brand">{t("amenities")}</h2>
        </div>

        {/* Tours Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {features.map((feature, index) => (
            <Card
              key={feature.id}
              className={`group relative overflow-hidden bg-transparent border-none cursor-pointer transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 ${inView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative h-[400px] overflow-hidden">
                <img
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="text-2xl font-bold text-white mb-2">{t(feature.titleKey as any)}</h3>
                  <p className="text-white/70 text-sm">{t(feature.subtitleKey as any)}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
