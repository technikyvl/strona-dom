import { Card } from "@/components/ui/card"
import { useInView } from "@/lib/use-in-view"

const features = [
  {
    id: 1,
    title: "Sauna",
    subtitle: "Duża sauna bez dodatkowych opłat",
    image: "/sauna 1-kopia.jpeg",
  },
  {
    id: 2,
    title: "Salon i kuchnia",
    subtitle: "75'' TV, Netflix, w pełni wyposażona kuchnia",
    image: "/salon 2-kopia.jpeg",
  },
  {
    id: 3,
    title: "Taras i grill",
    subtitle: "Przestronny taras z grillem gazowym",
    image: "/plac zabaw-kopia.jpeg",
  },
  {
    id: 4,
    title: "Narciarnia",
    subtitle: "Przechowywanie sprzętu i suszarka do butów",
    image: "/suszarnia-kopia.jpeg",
  },
]

export function ToursSection() {
  const { ref, inView } = useInView({ threshold: 0.15 })
  return (
    <section
      id="udogodnienia"
      ref={ref as any}
      className={`py-24 bg-gradient-to-b from-[#0a0e1a] to-[#1a1e2e] transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-white/60 text-sm uppercase tracking-widest mb-3">Wszystko, czego potrzebujesz na wyjazd</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Udogodnienia</h2>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.id}
              className="group relative overflow-hidden bg-transparent border-none cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20"
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
                  <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/70 text-sm">{feature.subtitle}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
