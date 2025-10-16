export function GallerySection() {
  const images = [
    "/gallery-1.jpg",
    "/gallery-2.jpg",
    "/gallery-3.jpg",
    "/gallery-4.jpg",
    "/gallery-5.jpg",
    "/gallery-6.jpg",
  ]

  return (
    <section id="galeria" className="py-24 bg-gradient-to-b from-[#1a1e2e] to-[#0a0e1a]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Galeria</h2>
          <p className="text-white/60 mt-3">Zobacz wnętrza i otoczenie domu</p>
        </div>

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


