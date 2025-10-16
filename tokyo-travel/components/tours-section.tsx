import { Card } from "@/components/ui/card"

const tours = [
  {
    id: 1,
    title: "ТУР №1",
    subtitle: "и получите незабываемые",
    image: "/japanese-pagoda-at-dusk-traditional-architecture-k.jpg",
  },
  {
    id: 2,
    title: "ТУР №2",
    subtitle: "и получите незабываемые",
    image: "/mount-fuji-with-cherry-blossoms-black-and-white.jpg",
  },
  {
    id: 3,
    title: "ТУР №3",
    subtitle: "и получите незабываемые",
    image: "/red-japanese-pagoda-with-cherry-blossoms-spring.jpg",
  },
  {
    id: 4,
    title: "ТУР №4",
    subtitle: "и получите незабываемые",
    image: "/people-with-red-umbrellas-in-rain-japan-street.jpg",
  },
]

export function ToursSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0a0e1a] to-[#1a1e2e]">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-white/60 text-sm uppercase tracking-widest mb-3">и получите незабываемые эмоции</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">ПОПУЛЯРНЫЕ ТУРЫ</h2>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour) => (
            <Card
              key={tour.id}
              className="group relative overflow-hidden bg-transparent border-none cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20"
            >
              <div className="relative h-[400px] overflow-hidden">
                <img
                  src={tour.image || "/placeholder.svg"}
                  alt={tour.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="text-2xl font-bold text-white mb-2">{tour.title}</h3>
                  <p className="text-white/70 text-sm">{tour.subtitle}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
