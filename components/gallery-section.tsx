"use client"

import { useInView } from "@/lib/use-in-view"

export function GallerySection() {
  const { ref, inView } = useInView({ threshold: 0.1, once: false })
  const images = [
    "/dom na zewnatrz 2-kopia.jpeg",
    "/salon 1-kopia.jpeg",
    "/salon 3-kopia.jpeg",
    "/salon 4-kopia.jpeg",
    "/3 sypialnia 1-kopia.jpeg",
    "/4 sypialnia 2-kopia.jpeg",
  ]

  return (
    <section
      id="galeria"
      ref={ref as any}
      className={`py-24 bg-gradient-to-b from-[#1a1e2e] to-[#0a0e1a] transition-all duration-1000 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12" />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, idx) => (
            <div key={idx} className="relative overflow-hidden rounded-lg group">
              <img src={src} alt={`Galeria ${idx + 1}`} className="w-full h-48 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


