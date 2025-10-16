import { Play } from "lucide-react"

export function InspireSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/mountain-landscape-with-milky-way-stars-night-sky-.jpg"
          alt="Mountain landscape with stars"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full min-h-screen container mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 h-full">
          {/* Left Content */}
          <div className="flex-1 max-w-2xl">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-12">
              TRAVEL AND
              <br />
              INSPIRE YOUR
              <br />
              LIFE
            </h2>

            {/* Video Button */}
            <button className="flex items-center gap-4 group transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm border-2 border-primary flex items-center justify-center group-hover:bg-primary/40 group-hover:shadow-lg group-hover:shadow-primary/50 transition-all duration-300 group-hover:scale-110">
                <Play className="w-6 h-6 text-primary fill-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-white text-sm uppercase tracking-wider font-medium group-hover:text-primary transition-colors duration-300">
                Смотреть видео
              </span>
            </button>

            {/* Bottom Text */}
            <div className="mt-16">
              <p className="text-white/70 text-sm leading-relaxed max-w-md">
                Тогда будет №27 основание для многих исключительные и не просто обычные, а ещё и не просто обычные.
              </p>
            </div>
          </div>

          {/* Right Images */}
          <div className="flex-1 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              {/* Image Stack */}
              <div className="relative">
                <img
                  src="/person-standing-in-desert-canyon-arms-spread-adven.jpg"
                  alt="Adventure 1"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
                <img
                  src="/mountain-lake-reflection-sunset-landscape.jpg"
                  alt="Adventure 2"
                  className="absolute -bottom-12 -left-12 w-2/3 h-auto rounded-lg shadow-2xl border-4 border-background"
                />
                <img
                  src="/snowy-mountain-peaks-winter-landscape.jpg"
                  alt="Adventure 3"
                  className="absolute -top-12 -right-12 w-2/3 h-auto rounded-lg shadow-2xl border-4 border-background"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
